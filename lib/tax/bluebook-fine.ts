// =============================================================================
// Nepal Vehicle Renewal Tax + Bluebook Fine Calculator — FY 2083/84
//
// Inputs:  province, vehicle type (petrol/diesel by cc, or EV by motor power),
//          bluebook expiry date, "as of" date.
// Outputs: every year of tax owed, the fine on each year, renewal fee, total.
//
// How the fine works (provincial Vehicle & Transport Management Acts):
//   1. Tax for a year falls due on the bluebook expiry date.
//   2. There is a 90-day grace window after expiry with no fine.
//   3. After grace, the fine grows in bands until the end of that fiscal year
//      (Bagmati: 5% for the first 30 days, 10% up to 45 days, then 20%).
//   4. Once the fiscal year (Ashadh end ≈ 15 July) has passed, the year is in
//      arrears and carries the province's arrears rate (Bagmati: 32% per year;
//      Gandaki/Lumbini escalate with each extra fiscal year).
//   5. Each unpaid year is taxed separately — two missed years means two years
//      of tax, each with its own fine.
//   6. A late renewal also doubles the bluebook renewal fee (100% fine).
//
// Rate sources (FY 2083/84 provincial Finance Acts):
//   - Bagmati: cross-checked against two published FY 2083/84 schedules.
//   - Other provinces: published FY 2083/84 schedules (Sudurpaschim still on
//     2082/83 rates at the time of writing).
//
// !!  Rates change every Shrawan via each provincial Finance Act. To revise,  !!
// !!  edit PROVINCES below. The UI always offers a manual base-tax override.  !!
// =============================================================================

export type VehicleType = 'two-wheeler' | 'four-wheeler'
export type Powertrain = 'fuel' | 'electric'

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

export const ALL_PROVINCES: Province[] = [
  'bagmati',
  'koshi',
  'madhesh',
  'gandaki',
  'lumbini',
  'karnali',
  'sudurpaschim',
]

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

/** Builds cc tiers from [upTo, tax] pairs so each province stays one line per slab. */
function tiers(unit: string, rows: [number | null, number][]): CcTier[] {
  let prev = 0
  return rows.map(([upTo, baseTax]) => {
    const label =
      upTo === null
        ? `Above ${prev.toLocaleString('en-IN')} ${unit}`
        : prev === 0
          ? `Up to ${upTo.toLocaleString('en-IN')} ${unit}`
          : `${(prev + 1).toLocaleString('en-IN')} – ${upTo.toLocaleString('en-IN')} ${unit}`
    if (upTo !== null) prev = upTo
    return { upTo, baseTax, label }
  })
}

const BIKE_CC = [125, 150, 225, 400, 650, null] as const
const CAR_CC = [1_000, 1_500, 2_000, 2_500, 3_000, 3_500, null] as const

function bikeTiers(taxes: number[]): CcTier[] {
  return tiers('cc', BIKE_CC.map((cc, i) => [cc, taxes[i]]))
}
function carTiers(taxes: number[]): CcTier[] {
  return tiers('cc', CAR_CC.map((cc, i) => [cc, taxes[i]]))
}

// -----------------------------------------------------------------------------
// Penalty rules
// -----------------------------------------------------------------------------

export type PenaltyBand = {
  /** Upper bound on days late AFTER the grace window (inclusive). null = until FY end. */
  toDaysAfterGrace: number | null
  /** Fine as a decimal of that year's base tax. */
  rate: number
  label: string
}

export type PenaltyRule = {
  /** Days after expiry with no fine. */
  graceDays: number
  /** Bands that apply until the end of the fiscal year the tax fell due in. */
  bands: PenaltyBand[]
  /**
   * Fine once the fiscal year has ended. Index 0 = first fiscal year in
   * arrears, index 1 = second, … The last value repeats.
   */
  arrearsRates: number[]
  /** Short human summary for the UI. */
  summary: string
}

const STANDARD_BANDS: PenaltyBand[] = [
  { toDaysAfterGrace: 30,   rate: 0.05, label: 'First 30 days after grace' },
  { toDaysAfterGrace: 45,   rate: 0.10, label: '31 – 45 days after grace' },
  { toDaysAfterGrace: null, rate: 0.20, label: 'Rest of the fiscal year' },
]

const GRACE_DAYS = 90

// -----------------------------------------------------------------------------
// Province tables
// -----------------------------------------------------------------------------

export type ProvinceRates = {
  /** Fiscal year the schedule belongs to. */
  fiscalYear: string
  /** Confidence note shown under the result. */
  sourceNote: string
  twoWheeler: CcTier[]
  fourWheeler: CcTier[]
  /** EV two-wheelers by motor power in watts. Absent → manual override. */
  evTwoWheeler?: CcTier[]
  /** EV four-wheelers by motor power in kW. Absent → manual override. */
  evFourWheeler?: CcTier[]
  /** Bluebook renewal fee (doubled when renewed late). */
  renewalFee: Record<VehicleType, number>
  penalty: PenaltyRule
}

export const PROVINCES: Record<Province, ProvinceRates> = {
  bagmati: {
    fiscalYear: '2083/84',
    sourceNote: 'Bagmati Province Finance Act 2083 schedule.',
    twoWheeler: bikeTiers([3_000, 5_000, 6_500, 12_000, 25_000, 35_000]),
    fourWheeler: carTiers([22_000, 25_000, 27_000, 37_000, 50_000, 65_000, 70_000]),
    evTwoWheeler: tiers('W', [
      [50, 1_000],
      [350, 1_500],
      [1_000, 2_000],
      [1_500, 2_500],
      [null, 3_000],
    ]),
    evFourWheeler: tiers('kW', [
      [50, 5_000],
      [125, 15_000],
      [200, 20_000],
      [null, 30_000],
    ]),
    renewalFee: { 'two-wheeler': 300, 'four-wheeler': 500 },
    penalty: {
      graceDays: GRACE_DAYS,
      bands: STANDARD_BANDS,
      arrearsRates: [0.32],
      summary: '90-day grace · 5% → 10% → 20% within the FY · 32% per year in arrears',
    },
  },
  koshi: {
    fiscalYear: '2083/84',
    sourceNote: 'Koshi Province FY 2083/84 schedule — confirm at your transport office.',
    twoWheeler: bikeTiers([3_100, 5_100, 6_500, 8_000, 11_000, 20_000]),
    fourWheeler: carTiers([23_000, 25_000, 32_000, 38_000, 46_000, 63_000, 70_000]),
    renewalFee: { 'two-wheeler': 300, 'four-wheeler': 500 },
    penalty: {
      graceDays: GRACE_DAYS,
      bands: [
        { toDaysAfterGrace: 75,   rate: 0.10, label: 'First 75 days after grace' },
        { toDaysAfterGrace: null, rate: 0.20, label: 'Rest of the fiscal year' },
      ],
      arrearsRates: [0.20],
      summary: '90-day grace · 10% → 20% within the FY · 20% per year in arrears',
    },
  },
  madhesh: {
    fiscalYear: '2083/84',
    sourceNote: 'Madhesh Province FY 2083/84 schedule — confirm at your transport office.',
    twoWheeler: bikeTiers([3_000, 5_000, 6_500, 11_000, 11_000, 20_000]),
    fourWheeler: carTiers([22_000, 25_000, 27_000, 37_000, 50_000, 60_000, 60_000]),
    renewalFee: { 'two-wheeler': 300, 'four-wheeler': 500 },
    penalty: {
      graceDays: GRACE_DAYS,
      bands: STANDARD_BANDS,
      arrearsRates: [0.30],
      summary: '90-day grace · 5% → 10% → 20% within the FY · 30% per year in arrears',
    },
  },
  gandaki: {
    fiscalYear: '2083/84',
    sourceNote: 'Gandaki Province Finance Act 2083 schedule — confirm at your transport office.',
    twoWheeler: bikeTiers([3_000, 5_000, 6_500, 11_000, 20_000, 30_000]),
    fourWheeler: carTiers([22_000, 25_000, 27_000, 37_000, 50_000, 60_000, 65_000]),
    renewalFee: { 'two-wheeler': 300, 'four-wheeler': 500 },
    penalty: {
      graceDays: GRACE_DAYS,
      bands: STANDARD_BANDS,
      arrearsRates: [0.40, 0.60, 0.80, 1.00],
      summary: '90-day grace · 5% → 10% → 20% within the FY · 40%, 60%, 80%, 100% for older years',
    },
  },
  lumbini: {
    fiscalYear: '2083/84',
    sourceNote: 'Lumbini Province FY 2083/84 schedule — confirm at your transport office.',
    twoWheeler: bikeTiers([3_000, 5_000, 6_500, 11_000, 20_000, 30_000]),
    fourWheeler: carTiers([22_000, 25_000, 27_000, 37_000, 50_000, 60_000, 65_000]),
    renewalFee: { 'two-wheeler': 300, 'four-wheeler': 500 },
    penalty: {
      graceDays: GRACE_DAYS,
      bands: [{ toDaysAfterGrace: null, rate: 0.20, label: 'Within the fiscal year' }],
      arrearsRates: [0.40, 0.60, 0.80, 1.00, 1.20],
      summary: '90-day grace · 20% within the FY · 40% → 120% for older years',
    },
  },
  karnali: {
    fiscalYear: '2083/84',
    sourceNote: 'Karnali Province Finance Act 2083 schedule — confirm at your transport office.',
    twoWheeler: bikeTiers([2_700, 4_300, 5_500, 10_000, 16_000, 20_000]),
    fourWheeler: carTiers([21_000, 23_000, 26_000, 35_000, 40_000, 56_000, 62_000]),
    renewalFee: { 'two-wheeler': 300, 'four-wheeler': 500 },
    penalty: {
      graceDays: GRACE_DAYS,
      bands: [{ toDaysAfterGrace: null, rate: 0.20, label: 'Within the fiscal year' }],
      arrearsRates: [0.30],
      summary: '90-day grace · 20% within the FY · 30% per year in arrears',
    },
  },
  sudurpaschim: {
    fiscalYear: '2082/83',
    sourceNote:
      'Sudurpaschim is still on FY 2082/83 rates pending its 2083 budget — confirm at your transport office.',
    twoWheeler: bikeTiers([2_800, 5_000, 6_500, 11_000, 20_000, 30_000]),
    fourWheeler: carTiers([22_000, 25_000, 27_000, 37_000, 50_000, 65_000, 70_000]),
    renewalFee: { 'two-wheeler': 300, 'four-wheeler': 500 },
    penalty: {
      graceDays: GRACE_DAYS,
      bands: STANDARD_BANDS,
      arrearsRates: [0.30],
      summary: '90-day grace · 5% → 10% → 20% within the FY · 30% per year in arrears',
    },
  },
}

/** Unit the size input is measured in. */
export function sizeUnit(vehicleType: VehicleType, powertrain: Powertrain): 'cc' | 'W' | 'kW' {
  if (powertrain === 'fuel') return 'cc'
  return vehicleType === 'two-wheeler' ? 'W' : 'kW'
}

export function getTiers(
  province: Province,
  vehicleType: VehicleType,
  powertrain: Powertrain = 'fuel',
): CcTier[] | null {
  const p = PROVINCES[province]
  if (powertrain === 'electric') {
    return (vehicleType === 'two-wheeler' ? p.evTwoWheeler : p.evFourWheeler) ?? null
  }
  return vehicleType === 'two-wheeler' ? p.twoWheeler : p.fourWheeler
}

/** Returns the slab a given size falls into, or null if no rate data. */
export function findTier(
  province: Province,
  vehicleType: VehicleType,
  size: number,
  powertrain: Powertrain = 'fuel',
): CcTier | null {
  const list = getTiers(province, vehicleType, powertrain)
  if (!list || !(size > 0)) return null
  for (const tier of list) {
    if (tier.upTo === null || size <= tier.upTo) return tier
  }
  return null
}

// -----------------------------------------------------------------------------
// Date helpers (string-based YYYY-MM-DD to avoid TZ drift)
// -----------------------------------------------------------------------------

function parseYmd(ymd: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(ymd)) return null
  const d = new Date(`${ymd}T00:00:00Z`)
  return Number.isNaN(d.getTime()) ? null : d
}

function toYmd(d: Date): string {
  return d.toISOString().slice(0, 10)
}

function addDays(ymd: string, days: number): string {
  const d = parseYmd(ymd)!
  d.setUTCDate(d.getUTCDate() + days)
  return toYmd(d)
}

function addYears(ymd: string, years: number): string {
  const d = parseYmd(ymd)!
  d.setUTCFullYear(d.getUTCFullYear() + years)
  return toYmd(d)
}

function diffDays(fromYmd: string, toYmdStr: string): number {
  return Math.round(
    (parseYmd(toYmdStr)!.getTime() - parseYmd(fromYmd)!.getTime()) / 86_400_000,
  )
}

/**
 * Approximate Nepali fiscal-year end (Ashadh end) for a date, as YYYY-MM-DD.
 * Ashadh end falls on 15–16 July; 15 July is used as the cut-off.
 */
export function fiscalYearEndOfDateYmd(ymd: string): string {
  const [year, month, day] = ymd.split('-').map((s) => parseInt(s, 10))
  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) return ''
  if (month < 7 || (month === 7 && day <= 15)) return `${year}-07-15`
  return `${year + 1}-07-15`
}

/** How many fiscal-year ends lie after `fromYmd` and strictly before `asOfYmd`. */
function fiscalYearEndsPassed(fromYmd: string, asOfYmd: string): number {
  let count = 0
  let fyEnd = fiscalYearEndOfDateYmd(fromYmd)
  while (fyEnd && asOfYmd > fyEnd) {
    count += 1
    fyEnd = `${parseInt(fyEnd.slice(0, 4), 10) + 1}-07-15`
  }
  return count
}

// -----------------------------------------------------------------------------
// Inputs / outputs
// -----------------------------------------------------------------------------

export type BluebookInputs = {
  vehicleType: VehicleType
  /** Fuel (cc-based) or electric (motor-power based). */
  powertrain?: Powertrain
  /** Engine cc, or motor power (W for EV bikes, kW for EV cars). */
  cc: number
  province: Province
  /** Bluebook expiry / last tax-paid-until date, YYYY-MM-DD. */
  expiryDate: string
  /** "As of" date — typically today. YYYY-MM-DD. */
  asOfDate: string
  /** Manual annual base tax. When > 0 it replaces the provincial table. */
  baseTaxOverride?: number
  /** Include the bluebook renewal fee (and its late fine). Default true. */
  includeRenewalFee?: boolean
}

export type YearLine = {
  /** 1-based year number counted from the expiry date. */
  index: number
  /** Date this year's tax fell due (YYYY-MM-DD). */
  dueDate: string
  /** Days late on this year, measured from its due date. */
  daysLate: number
  baseTax: number
  penaltyRate: number
  penaltyAmount: number
  /** Explanation of the band used. */
  penaltyLabel: string
}

export type BluebookResult = {
  vehicleType: VehicleType
  powertrain: Powertrain
  cc: number
  province: Province
  expiryDate: string
  asOfDate: string

  tier: CcTier | null
  baseTaxFromTable: number | null
  baseTax: number
  baseTaxIsOverride: boolean
  rule: PenaltyRule

  /** Days since expiry (0 if not yet expired, null if dates invalid). */
  daysLate: number | null
  /** Date the grace window ends. */
  graceEndsOn: string | null
  /** True once the latest year is past its fiscal-year end. */
  isPastFyEnd: boolean
  /** Every tax year owed as of `asOfDate` (at least one). */
  years: YearLine[]

  totalTax: number
  penaltyAmount: number
  /** Rate on the most recent year (the headline figure). */
  penaltyRate: number

  renewalFee: number
  renewalFine: number

  totalPayable: number
}

// -----------------------------------------------------------------------------
// Compute
// -----------------------------------------------------------------------------

function round2(n: number): number {
  return Math.round(n * 100) / 100
}

/** Fine for one tax year that fell due on `dueDate`, as of `asOfDate`. */
function penaltyFor(
  rule: PenaltyRule,
  dueDate: string,
  asOfDate: string,
): { rate: number; label: string } {
  const daysLate = diffDays(dueDate, asOfDate)
  if (daysLate <= rule.graceDays) {
    return { rate: 0, label: daysLate <= 0 ? 'Not yet due' : 'Within the 90-day grace window' }
  }
  const graceEnd = addDays(dueDate, rule.graceDays)
  const fyEndsPassed = fiscalYearEndsPassed(graceEnd, asOfDate)
  if (fyEndsPassed > 0) {
    const i = Math.min(fyEndsPassed - 1, rule.arrearsRates.length - 1)
    const rate = rule.arrearsRates[i]
    return {
      rate,
      label:
        fyEndsPassed === 1
          ? 'Fiscal year ended unpaid (arrears)'
          : `${fyEndsPassed} fiscal years in arrears`,
    }
  }
  const afterGrace = daysLate - rule.graceDays
  for (const band of rule.bands) {
    if (band.toDaysAfterGrace === null || afterGrace <= band.toDaysAfterGrace) {
      return { rate: band.rate, label: band.label }
    }
  }
  const last = rule.bands[rule.bands.length - 1]
  return { rate: last.rate, label: last.label }
}

/** Arrears beyond this many years are capped — registration is liable to lapse. */
export const MAX_YEARS = 10

export function computeBluebookFine(input: BluebookInputs): BluebookResult {
  const powertrain = input.powertrain ?? 'fuel'
  const province = PROVINCES[input.province]
  const rule = province.penalty
  const tier = findTier(input.province, input.vehicleType, input.cc, powertrain)
  const baseTaxFromTable = tier ? tier.baseTax : null

  const overrideValue =
    typeof input.baseTaxOverride === 'number' && input.baseTaxOverride > 0
      ? input.baseTaxOverride
      : 0
  const baseTaxIsOverride = overrideValue > 0
  const baseTax = baseTaxIsOverride ? overrideValue : baseTaxFromTable ?? 0

  const datesValid = !!parseYmd(input.expiryDate) && !!parseYmd(input.asOfDate)
  const rawDaysLate = datesValid ? diffDays(input.expiryDate, input.asOfDate) : null
  const daysLate = rawDaysLate === null ? null : Math.max(0, rawDaysLate)

  const years: YearLine[] = []
  if (datesValid) {
    // Year k (0-based) falls due on expiry + k years. Every due date on or
    // before the as-of date is owed; if nothing is due yet, show the upcoming year.
    for (let k = 0; k < MAX_YEARS; k++) {
      const dueDate = addYears(input.expiryDate, k)
      if (k > 0 && dueDate > input.asOfDate) break
      const { rate, label } = penaltyFor(rule, dueDate, input.asOfDate)
      years.push({
        index: k + 1,
        dueDate,
        daysLate: Math.max(0, diffDays(dueDate, input.asOfDate)),
        baseTax,
        penaltyRate: rate,
        penaltyAmount: round2(baseTax * rate),
        penaltyLabel: label,
      })
    }
  }

  const latest = years[years.length - 1]
  const totalTax = round2(years.reduce((s, y) => s + y.baseTax, 0))
  const penaltyAmount = round2(years.reduce((s, y) => s + y.penaltyAmount, 0))

  const includeRenewal = input.includeRenewalFee !== false
  const renewalFee = includeRenewal ? province.renewalFee[input.vehicleType] : 0
  const pastGrace = daysLate !== null && daysLate > rule.graceDays
  const renewalFine = includeRenewal && pastGrace ? renewalFee : 0

  return {
    vehicleType: input.vehicleType,
    powertrain,
    cc: input.cc,
    province: input.province,
    expiryDate: input.expiryDate,
    asOfDate: input.asOfDate,

    tier,
    baseTaxFromTable,
    baseTax,
    baseTaxIsOverride,
    rule,

    daysLate,
    graceEndsOn: datesValid ? addDays(input.expiryDate, rule.graceDays) : null,
    isPastFyEnd: years.some((y) => y.penaltyLabel.includes('arrears')),
    years,

    totalTax,
    penaltyAmount,
    penaltyRate: latest?.penaltyRate ?? 0,

    renewalFee,
    renewalFine,

    totalPayable: round2(totalTax + penaltyAmount + renewalFee + renewalFine),
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
