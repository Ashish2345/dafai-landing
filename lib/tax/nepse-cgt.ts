// =============================================================================
// NEPSE Share Trading — Net Profit & Capital Gains Tax (CGT) calculator
//
// Sources baked in (verify against the latest before deploy):
// - SEBON Brokerage Commission Regulation — equity tier table (0.36% → 0.24%,
//   flat Rs 10 for trades up to Rs 2,500).
// - SEBON Regulatory Fee — 0.015% on each leg.
// - CDSC Demat / DP Charge — Rs 25 per transaction (each leg separately).
// - Income Tax Act 2058 s.95Ka(2)(Ka) — CGT (advance tax, collected by the
//   broker/CDSC) on disposal of listed securities. The rate depends on the
//   fiscal year of the SALE:
//
//     Sold on/after 1 Shrawan 2083 (17 Jul 2026) — Finance Act 2083:
//       • Resident individual, holding ≤ 365 days → 10%
//       • Resident individual, holding > 365 days → 7.5%
//       • Resident entity (institutional)         → 10%
//       • Others (non-resident etc.)              → 25%
//       CGT on listed securities is now a FINAL withholding tax (s.92).
//
//     Sold before 17 Jul 2026 — Finance Act 2081/2082:
//       • Resident individual: 7.5% (≤ 365 days) / 5% (> 365 days)
//       • Resident entity: 10% · Others: 25%
//
// Rounding: 2 decimals (paisa) for every monetary value. The compute fn
// rounds at each line so the displayed breakdown sums exactly to the totals.
//
// !!  CRITICAL: this file is the single source of truth for rates. To revise  !!
// !!  for FY 2082/83, copy to nepse-cgt-fy-2082-83.ts and update constants.   !!
// =============================================================================

export type InvestorType = 'individual' | 'institutional' | 'other'

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
  { upTo:     2_500, rate: 0.0036, label: 'Up to Rs 2,500 (flat Rs 10)' },
  { upTo:    50_000, rate: 0.0036, label: 'Rs 2,501 – Rs 50,000' },
  { upTo:   500_000, rate: 0.0033, label: 'Rs 50,001 – Rs 5,00,000' },
  { upTo: 2_000_000, rate: 0.0031, label: 'Rs 5,00,001 – Rs 20,00,000' },
  { upTo:10_000_000, rate: 0.0027, label: 'Rs 20,00,001 – Rs 1 crore' },
  { upTo:      null, rate: 0.0024, label: 'Above Rs 1 crore' },
]

/** Minimum brokerage per transaction — trades up to Rs 2,500 pay a flat Rs 10. */
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

export type CgtRegime = {
  key: 'fy-2083-84' | 'fy-2082-83'
  label: string
  /** First sale date (YYYY-MM-DD, AD) this regime applies to. */
  effectiveFrom: string
  individualShortTerm: number
  individualLongTerm: number
  institutional: number
  other: number
  /** Whether CGT is a final withholding tax under this regime. */
  isFinal: boolean
}

/** Newest first. */
export const CGT_REGIMES: CgtRegime[] = [
  {
    key: 'fy-2083-84',
    label: 'FY 2083/84 (Finance Act 2083)',
    effectiveFrom: '2026-07-17',
    individualShortTerm: 0.10,
    individualLongTerm: 0.075,
    institutional: 0.10,
    other: 0.25,
    isFinal: true,
  },
  {
    key: 'fy-2082-83',
    label: 'FY 2082/83 and earlier',
    effectiveFrom: '0000-01-01',
    individualShortTerm: 0.075,
    individualLongTerm: 0.05,
    institutional: 0.10,
    other: 0.25,
    isFinal: false,
  },
]

/** Regime for a sale date. Missing/invalid date → the current regime. */
export function cgtRegimeFor(sellDate: string): CgtRegime {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(sellDate)) return CGT_REGIMES[0]
  return CGT_REGIMES.find((r) => sellDate >= r.effectiveFrom) ?? CGT_REGIMES[0]
}

/** CGT rate as a decimal, given holding period, investor type and regime. */
export function cgtRateFor(
  holdingDays: number,
  investorType: InvestorType,
  regime: CgtRegime = CGT_REGIMES[0],
): number {
  if (investorType === 'institutional') return regime.institutional
  if (investorType === 'other') return regime.other
  return holdingDays > 365 ? regime.individualLongTerm : regime.individualShortTerm
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
  cgtRate: number           // e.g. 0.10 / 0.075 / 0.25
  cgtRegime: CgtRegime      // fiscal-year rate table picked from the sell date
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
  const cgtRegime = cgtRegimeFor(input.sellDate)
  const cgtRate = cgtRateFor(effectiveDays, input.investorType, cgtRegime)
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
    cgtRegime,
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
