// =============================================================================
// NEPSE Share Trading — Net Profit & Capital Gains Tax (CGT) calculator
//
// Sources baked in (verify against the latest before deploy):
// - SEBON Brokerage Commission Regulation — equity tier table.
// - SEBON Regulatory Fee — 0.015% on each leg.
// - CDSC Demat / DP Charge — Rs 25 per transaction (each leg separately).
// - Income Tax Act 2058 + Finance Act 2081 — CGT rates on disposal of
//   listed securities:
//     • Resident individual, holding ≤ 365 days  → 7.5%
//     • Resident individual, holding > 365 days  → 5%
//     • Resident entity (institutional)          → 10% (flat, no holding-period rule)
//
// Rounding: 2 decimals (paisa) for every monetary value. The compute fn
// rounds at each line so the displayed breakdown sums exactly to the totals.
//
// !!  CRITICAL: this file is the single source of truth for rates. To revise  !!
// !!  for FY 2082/83, copy to nepse-cgt-fy-2082-83.ts and update constants.   !!
// =============================================================================

export type InvestorType = 'individual' | 'institutional'

// -----------------------------------------------------------------------------
// SEBON Brokerage commission tiers — equity, per transaction (each leg)
// -----------------------------------------------------------------------------

export type BrokerTier = {
  /** Upper bound of the slab (inclusive). null = "and above". */
  upTo: number | null
  /** Commission rate as a decimal (e.g. 0.0040 = 0.40%). */
  rate: number
  /** Display label. */
  label: string
}

export const BROKER_TIERS: BrokerTier[] = [
  { upTo:    50_000, rate: 0.0040, label: 'Up to Rs 50,000' },
  { upTo:   500_000, rate: 0.0037, label: 'Rs 50,001 – Rs 5,00,000' },
  { upTo: 2_000_000, rate: 0.0034, label: 'Rs 5,00,001 – Rs 20,00,000' },
  { upTo:10_000_000, rate: 0.0030, label: 'Rs 20,00,001 – Rs 1 crore' },
  { upTo:      null, rate: 0.0027, label: 'Above Rs 1 crore' },
]

/** Minimum brokerage charged per transaction by SEBON regulation. */
export const MIN_BROKER_COMMISSION = 10

/** Returns the applicable broker commission rate for a transaction value. */
export function brokerRateFor(transactionValue: number): number {
  for (const tier of BROKER_TIERS) {
    if (tier.upTo === null) return tier.rate
    if (transactionValue <= tier.upTo) return tier.rate
  }
  return BROKER_TIERS[BROKER_TIERS.length - 1].rate
}

/** Computes broker commission for one leg, applying the per-transaction minimum. */
export function brokerCommission(transactionValue: number): number {
  if (!Number.isFinite(transactionValue) || transactionValue <= 0) return 0
  const computed = transactionValue * brokerRateFor(transactionValue)
  return Math.max(MIN_BROKER_COMMISSION, computed)
}

// -----------------------------------------------------------------------------
// Other regulatory charges
// -----------------------------------------------------------------------------

/** SEBON regulatory fee — 0.015% of transaction value, applied to each leg. */
export const SEBON_FEE_RATE = 0.00015

/** CDSC depository charge — flat Rs 25 per transaction (each leg). */
export const DP_CHARGE = 25

// -----------------------------------------------------------------------------
// CGT rates
// -----------------------------------------------------------------------------

/** CGT rate as a decimal, given holding period and investor type. */
export function cgtRateFor(
  holdingDays: number,
  investorType: InvestorType,
): number {
  if (investorType === 'institutional') return 0.10
  return holdingDays > 365 ? 0.05 : 0.075
}

// -----------------------------------------------------------------------------
// Inputs / outputs
// -----------------------------------------------------------------------------

export type CgtInputs = {
  /** Number of shares (units, integer). */
  quantity: number
  /** Buy price per share (NPR). */
  buyPrice: number
  /** Sell price per share (NPR). */
  sellPrice: number
  /** Buy date as YYYY-MM-DD (AD calendar). */
  buyDate: string
  /** Sell date as YYYY-MM-DD (AD calendar). */
  sellDate: string
  /** Investor type — drives CGT rate selection. */
  investorType: InvestorType
}

export type CgtResult = {
  // -------- Trade context --------
  quantity: number
  buyPrice: number
  sellPrice: number
  holdingDays: number | null
  isLongTerm: boolean

  // -------- Buy leg --------
  buyTurnover: number      // buyPrice × qty
  buyCommission: number
  buyCommissionRate: number
  buySebonFee: number
  buyDpCharge: number
  totalBuyCost: number     // turnover + all buy expenses (cash out at purchase)

  // -------- Sell leg --------
  sellTurnover: number     // sellPrice × qty
  sellCommission: number
  sellCommissionRate: number
  sellSebonFee: number
  sellDpCharge: number
  totalSellExpenses: number  // commission + sebon + dp on sell side

  // -------- CGT --------
  grossProfit: number       // (sell - buy) × qty (no expenses considered)
  totalTransactionCosts: number  // sum of all 6 expense lines
  capitalGain: number       // grossProfit - totalTransactionCosts (taxable, can be negative)
  cgtRate: number           // 0.075 / 0.05 / 0.10
  cgtAmount: number         // max(0, capitalGain) × rate

  // -------- Bottom line --------
  netProfit: number              // capitalGain - cgtAmount
  netReceivedInBank: number      // sellTurnover - sell expenses - cgt
  effectiveReturnOnInvestment: number  // netProfit / totalBuyCost
}

// -----------------------------------------------------------------------------
// Compute
// -----------------------------------------------------------------------------

function round2(n: number): number {
  return Math.round(n * 100) / 100
}

/** Inclusive day count between two YYYY-MM-DD AD dates, or null if invalid. */
export function daysBetween(buyDate: string, sellDate: string): number | null {
  if (!buyDate || !sellDate) return null
  const b = new Date(buyDate)
  const s = new Date(sellDate)
  if (Number.isNaN(b.getTime()) || Number.isNaN(s.getTime())) return null
  const ms = s.getTime() - b.getTime()
  if (ms < 0) return null
  return Math.round(ms / (1000 * 60 * 60 * 24))
}

export function computeCgt(input: CgtInputs): CgtResult {
  const quantity = Math.max(0, Math.floor(input.quantity || 0))
  const buyPrice = Math.max(0, input.buyPrice || 0)
  const sellPrice = Math.max(0, input.sellPrice || 0)

  const buyTurnover = round2(quantity * buyPrice)
  const sellTurnover = round2(quantity * sellPrice)

  // Buy leg expenses
  const buyCommissionRate = brokerRateFor(buyTurnover)
  const buyCommission = round2(brokerCommission(buyTurnover))
  const buySebonFee = round2(buyTurnover * SEBON_FEE_RATE)
  const buyDpCharge = quantity > 0 ? DP_CHARGE : 0

  // Sell leg expenses
  const sellCommissionRate = brokerRateFor(sellTurnover)
  const sellCommission = round2(brokerCommission(sellTurnover))
  const sellSebonFee = round2(sellTurnover * SEBON_FEE_RATE)
  const sellDpCharge = quantity > 0 ? DP_CHARGE : 0

  const totalBuyCost = round2(
    buyTurnover + buyCommission + buySebonFee + buyDpCharge,
  )
  const totalSellExpenses = round2(sellCommission + sellSebonFee + sellDpCharge)

  // Profit / capital gain
  const grossProfit = round2(sellTurnover - buyTurnover)
  const totalTransactionCosts = round2(
    buyCommission + sellCommission + buySebonFee + sellSebonFee + buyDpCharge + sellDpCharge,
  )
  const capitalGain = round2(grossProfit - totalTransactionCosts)

  // CGT
  const holdingDays = daysBetween(input.buyDate, input.sellDate)
  const isLongTerm = holdingDays !== null && holdingDays > 365
  // If dates are missing, default to short-term (more conservative — higher rate).
  const effectiveDays = holdingDays ?? 0
  const cgtRate = cgtRateFor(effectiveDays, input.investorType)
  const cgtAmount = round2(Math.max(0, capitalGain) * cgtRate)

  // Bottom line
  const netProfit = round2(capitalGain - cgtAmount)
  const netReceivedInBank = round2(sellTurnover - totalSellExpenses - cgtAmount)
  const effectiveReturnOnInvestment =
    totalBuyCost > 0 ? netProfit / totalBuyCost : 0

  return {
    quantity,
    buyPrice,
    sellPrice,
    holdingDays,
    isLongTerm,

    buyTurnover,
    buyCommission,
    buyCommissionRate,
    buySebonFee,
    buyDpCharge,
    totalBuyCost,

    sellTurnover,
    sellCommission,
    sellCommissionRate,
    sellSebonFee,
    sellDpCharge,
    totalSellExpenses,

    grossProfit,
    totalTransactionCosts,
    capitalGain,
    cgtRate,
    cgtAmount,

    netProfit,
    netReceivedInBank,
    effectiveReturnOnInvestment,
  }
}

// -----------------------------------------------------------------------------
// Formatters
// -----------------------------------------------------------------------------

const NPR_NF = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'NPR',
  maximumFractionDigits: 2,
})

export function formatNprCgt(value: number): string {
  return NPR_NF.format(value).replace('NPR', 'Rs')
}

export function formatPercentCgt(value: number, digits = 2): string {
  return `${(value * 100).toFixed(digits)}%`
}
