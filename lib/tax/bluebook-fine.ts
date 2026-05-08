// =============================================================================
// Nepal Vehicle Renewal Tax + Bluebook Fine Calculator
//
// Inputs:  vehicle type, CC capacity, province, renewal-due date, today.
// Outputs: base tax (provincial), days late, penalty rate, penalty amount, total.
//
// Penalty logic (Department of Transport Management practice):
//   ≤ 30 days late          → 0% (grace period)
//   31–45 days              → 5% of base tax
//   46–60 days              → 10%
//   61+ days, same FY       → 20%
//   Past current FY end     → 32%
//
// Fiscal Year end is Ashadh 31 (~July 15 in Gregorian).
//
// !!  CRITICAL: rates differ by province AND change every year via the         !!
// !!  provincial Finance Act. The Bagmati table below is PLACEHOLDER pending   !!
// !!  the user's authoritative source. To revise: edit the BAGMATI_* tables.   !!
// =============================================================================

export type VehicleType = 'two-wheeler' | 'four-wheeler'

export type Province =
  | 'bagmati'
  | 'koshi'
  | 'madhesh'
  | 'gandaki'
  | 'lumbini'
  | 'karnali'
  | 'sudurpaschim'

export const PROVINCE_LABELS: Record<Province, string> = {
  bagmati:      'Bagmati',
  koshi:        'Koshi',
  madhesh:      'Madhesh',
  gandaki:      'Gandaki',
  lumbini:      'Lumbini',
  karnali:      'Karnali',
  sudurpaschim: 'Sudurpaschim',
}

/** Provinces with rate data shipped. Others fall back to manual-override mode. */
export const SUPPORTED_PROVINCES: Province[] = ['bagmati']

// -----------------------------------------------------------------------------
// Rate tiers
// -----------------------------------------------------------------------------

export type CcTier = {
  /** Upper bound of the slab (inclusive). null = "and above". */
  upTo: number | null
  /** Annual base tax in NPR. */
  baseTax: number
  /** Display label. */
  label: string
}

/**
 * Bagmati Province two-wheeler tiers (FY 2081/82).
 * !! VERIFY against Bagmati provincial Finance Act 2081 before deploy. !!
 */
const BAGMATI_TWO_WHEELER: CcTier[] = [
  { upTo:  125, baseTax:  3_000, label: 'Up to 125 cc' },
  { upTo:  250, baseTax:  6_500, label: '126 – 250 cc' },
  { upTo:  400, baseTax: 12_000, label: '251 – 400 cc' },
  { upTo:  650, baseTax: 25_000, label: '401 – 650 cc' },
  { upTo: null, baseTax: 36_000, label: 'Above 650 cc' },
]

/**
 * Bagmati Province four-wheeler tiers (cars / jeeps / vans, private use).
 * !! VERIFY before deploy. Excludes commercial vehicles, taxis, EVs. !!
 */
const BAGMATI_FOUR_WHEELER: CcTier[] = [
  { upTo: 1_000, baseTax: 21_000, label: 'Up to 1,000 cc' },
  { upTo: 1_500, baseTax: 23_500, label: '1,001 – 1,500 cc' },
  { upTo: 2_000, baseTax: 25_500, label: '1,501 – 2,000 cc' },
  { upTo: 2_500, baseTax: 35_500, label: '2,001 – 2,500 cc' },
  { upTo: 2_900, baseTax: 41_000, label: '2,501 – 2,900 cc' },
  { upTo: 3_500, baseTax: 49_000, label: '2,901 – 3,500 cc' },
  { upTo:  null, baseTax: 58_000, label: 'Above 3,500 cc' },
]

const RATE_TABLE: Partial<Record<Province, Record<VehicleType, CcTier[]>>> = {
  bagmati: {
    'two-wheeler':  BAGMATI_TWO_WHEELER,
    'four-wheeler': BAGMATI_FOUR_WHEELER,
  },
}

/** Returns the slab a given CC falls into, or null if no rate data for province. */
export function findTier(
  province: Province,
  vehicleType: VehicleType,
  cc: number,
): CcTier | null {
  const tiers = RATE_TABLE[province]?.[vehicleType]
  if (!tiers) return null
  for (const tier of tiers) {
    if (tier.upTo === null) return tier
    if (cc <= tier.upTo) return tier
  }
  return null
}

export function getTiers(
  province: Province,
  vehicleType: VehicleType,
): CcTier[] | null {
  return RATE_TABLE[province]?.[vehicleType] ?? null
}

// -----------------------------------------------------------------------------
// Penalty logic
// -----------------------------------------------------------------------------

export type PenaltyBand = {
  /** Inclusive lower bound on days late (0 = "from day 1"). */
  fromDays: number
  /** Inclusive upper bound. null means "and beyond, until FY end". */
  toDays: number | null
  /** Penalty rate as a decimal of base tax. */
  rate: number
  /** Display label. */
  label: string
}

export const PENALTY_BANDS: PenaltyBand[] = [
  { fromDays:  0, toDays: 30,   rate: 0.00, label: 'On time / grace period (≤ 30 days)' },
  { fromDays: 31, toDays: 45,   rate: 0.05, label: '31 – 45 days late' },
  { fromDays: 46, toDays: 60,   rate: 0.10, label: '46 – 60 days late' },
  { fromDays: 61, toDays: null, rate: 0.20, label: '61+ days late (within current FY)' },
]

/** Penalty rate when past the FY end. */
export const POST_FY_END_PENALTY_RATE = 0.32

/**
 * Approximate Nepali fiscal year end (Ashadh 31) in Gregorian, returned as
 * YYYY-MM-DD. Real Ashadh 31 falls between July 15–17; July 15 is close
 * enough for the 20% → 32% cutoff. String-based to avoid TZ drift.
 */
export function fiscalYearEndOfDateYmd(expiryYmd: string): string {
  const parts = expiryYmd.split('-').map((s) => parseInt(s, 10))
  const [year, month, day] = parts
  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
    return ''
  }
  // If date is on/before July 15, FY ends July 15 of same year.
  // If date is after July 15, FY ends July 15 of next year.
  if (month < 7 || (month === 7 && day <= 15)) {
    return `${year}-07-15`
  }
  return `${year + 1}-07-15`
}

// -----------------------------------------------------------------------------
// Inputs / outputs
// -----------------------------------------------------------------------------

export type BluebookInputs = {
  vehicleType: VehicleType
  /** Engine capacity in cc — used to look up the tier. Ignored if base-tax override is provided. */
  cc: number
  /** Province key. */
  province: Province
  /** Renewal-due / registration-expiry date as YYYY-MM-DD. */
  expiryDate: string
  /** "As of" date — typically today. YYYY-MM-DD. */
  asOfDate: string
  /**
   * Optional manual base-tax override. When provided (>0), the calculator
   * uses this instead of the provincial table. Useful when:
   *   - Province has no shipped rate table.
   *   - User has a more current rate from their transport office.
   */
  baseTaxOverride?: number
}

export type BluebookResult = {
  // Trade context
  vehicleType: VehicleType
  cc: number
  province: Province
  expiryDate: string
  asOfDate: string

  // Tier lookup
  tier: CcTier | null
  baseTaxFromTable: number | null
  baseTax: number              // table OR override (whichever is in use)
  baseTaxIsOverride: boolean

  // Penalty
  daysLate: number | null      // null if dates invalid
  isPastFyEnd: boolean
  appliedBand: PenaltyBand | null
  penaltyRate: number          // 0 if dates invalid or before grace ends
  penaltyAmount: number

  // Total
  totalPayable: number
}

// -----------------------------------------------------------------------------
// Compute
// -----------------------------------------------------------------------------

function round2(n: number): number {
  return Math.round(n * 100) / 100
}

function daysBetween(fromIso: string, toIso: string): number | null {
  if (!fromIso || !toIso) return null
  const a = new Date(fromIso)
  const b = new Date(toIso)
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return null
  // Whole days late, can be negative if asOf < expiry (renewal not yet due).
  return Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24))
}

export function computeBluebookFine(input: BluebookInputs): BluebookResult {
  const tier = findTier(input.province, input.vehicleType, input.cc)
  const baseTaxFromTable = tier ? tier.baseTax : null

  const overrideValue =
    typeof input.baseTaxOverride === 'number' && input.baseTaxOverride > 0
      ? input.baseTaxOverride
      : 0
  const baseTaxIsOverride = overrideValue > 0
  const baseTax = baseTaxIsOverride ? overrideValue : baseTaxFromTable ?? 0

  const daysLateRaw = daysBetween(input.expiryDate, input.asOfDate)
  const daysLate = daysLateRaw !== null && daysLateRaw < 0 ? 0 : daysLateRaw

  // FY-end check: did the asOf date pass the FY end of the FY in which the
  // expiry falls? String comparison works because YYYY-MM-DD sorts in date
  // order, and avoids any timezone drift around the July 15 boundary.
  let isPastFyEnd = false
  if (input.expiryDate && input.asOfDate) {
    const fyEnd = fiscalYearEndOfDateYmd(input.expiryDate)
    if (fyEnd) {
      isPastFyEnd = input.asOfDate > fyEnd
    }
  }

  // Pick penalty rate
  let penaltyRate = 0
  let appliedBand: PenaltyBand | null = null
  if (daysLate !== null && daysLate >= 0) {
    if (isPastFyEnd) {
      penaltyRate = POST_FY_END_PENALTY_RATE
      // Synthetic band for display
      appliedBand = {
        fromDays: 0,
        toDays: null,
        rate: POST_FY_END_PENALTY_RATE,
        label: `Past current FY end (Ashadh 31 ≈ July 15)`,
      }
    } else {
      for (const band of PENALTY_BANDS) {
        const upper = band.toDays === null ? Infinity : band.toDays
        if (daysLate >= band.fromDays && daysLate <= upper) {
          penaltyRate = band.rate
          appliedBand = band
          break
        }
      }
    }
  }

  const penaltyAmount = round2(baseTax * penaltyRate)
  const totalPayable = round2(baseTax + penaltyAmount)

  return {
    vehicleType: input.vehicleType,
    cc: input.cc,
    province: input.province,
    expiryDate: input.expiryDate,
    asOfDate: input.asOfDate,

    tier,
    baseTaxFromTable,
    baseTax,
    baseTaxIsOverride,

    daysLate,
    isPastFyEnd,
    appliedBand,
    penaltyRate,
    penaltyAmount,

    totalPayable,
  }
}

// -----------------------------------------------------------------------------
// Formatters
// -----------------------------------------------------------------------------

const NPR_BB = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'NPR',
  maximumFractionDigits: 2,
})

export function formatNprBluebook(value: number): string {
  return NPR_BB.format(value).replace('NPR', 'Rs')
}

export function formatPercentBluebook(value: number, digits = 0): string {
  return `${(value * 100).toFixed(digits)}%`
}
