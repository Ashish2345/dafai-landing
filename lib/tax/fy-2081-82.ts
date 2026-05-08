// =============================================================================
// Nepal Salary Tax — Fiscal Year 2081/82 (Shrawan 2081 → Ashadh 2082)
//
// Source: Finance Act 2081 (Income Tax Act 2058 as amended).
//
// !!  VERIFY before deploy: cross-check the slab boundaries and rates against  !!
// !!  your latest IRD reference. This file is the single source of truth — to  !!
// !!  ship FY 2082/83 just copy this file to fy-2082-83.ts and update values.  !!
//
// Notes baked in:
// - First slab is 1% Social Security Tax (SST). For employees who contribute to
//   the Social Security Fund (SSF), the 1% SST is exempt → first slab is 0%.
// - Top slab effective rate is 36% = 30% base + 20% surcharge.
// - Deduction caps below are statutory maxima from Finance Act 2081.
// =============================================================================

export type FilingStatus = 'single' | 'couple'

export type Slab = {
  /** Lower bound of taxable income (inclusive) in NPR. */
  from: number
  /** Upper bound (exclusive) — null means "and above". */
  to: number | null
  /** Standard rate as a decimal, e.g. 0.10 for 10%. */
  rate: number
  /** If this slab gets the SSF→0% exemption, the alternate rate. Else undefined. */
  rateIfSsf?: number
  /** Human label for the breakdown UI. */
  label: string
}

export const SLABS: Record<FilingStatus, Slab[]> = {
  single: [
    { from: 0,         to: 500_000,   rate: 0.01, rateIfSsf: 0.0, label: 'First Rs 5,00,000 (SST)' },
    { from: 500_000,   to: 700_000,   rate: 0.10, label: 'Next Rs 2,00,000' },
    { from: 700_000,   to: 1_000_000, rate: 0.20, label: 'Next Rs 3,00,000' },
    { from: 1_000_000, to: 2_000_000, rate: 0.30, label: 'Next Rs 10,00,000' },
    { from: 2_000_000, to: null,      rate: 0.36, label: 'Above Rs 20,00,000 (30% + 20% surcharge)' },
  ],
  couple: [
    { from: 0,         to: 600_000,   rate: 0.01, rateIfSsf: 0.0, label: 'First Rs 6,00,000 (SST)' },
    { from: 600_000,   to: 800_000,   rate: 0.10, label: 'Next Rs 2,00,000' },
    { from: 800_000,   to: 1_100_000, rate: 0.20, label: 'Next Rs 3,00,000' },
    { from: 1_100_000, to: 2_000_000, rate: 0.30, label: 'Next Rs 9,00,000' },
    { from: 2_000_000, to: null,      rate: 0.36, label: 'Above Rs 20,00,000 (30% + 20% surcharge)' },
  ],
}

/** Statutory deduction caps per Finance Act 2081. */
export const DEDUCTION_CAPS = {
  /**
   * Combined retirement deduction cap — applies to CIT + PF + SSF together.
   * Allowable retirement deduction = MIN(actual_combined, 1/3 of assessable income, this cap).
   */
  combinedRetirement: 500_000,
  /** Life insurance premium (separate from retirement cap). */
  lifeInsurance: 40_000,
  /** Health insurance premium (separate from retirement cap). */
  healthInsurance: 20_000,
} as const

/**
 * The retirement-deduction rule bounds the deduction at 1/3 of assessable
 * (gross) income from employment. Per Section 63 of the Income Tax Act 2058
 * read alongside common Nepal CA practice for FY 2081/82.
 */
export const RETIREMENT_INCOME_FRACTION = 1 / 3

/** SSF employee contribution rate (% of basic salary). */
export const SSF_EMPLOYEE_RATE = 0.11

/** PF / EPF employee contribution rate (% of basic salary). */
export const PF_EMPLOYEE_RATE = 0.10

// -----------------------------------------------------------------------------
// Inputs / outputs
// -----------------------------------------------------------------------------

export type CalculatorInputs = {
  /** Monthly basic salary (NPR). */
  monthlyBasic: number
  /** Monthly allowances (e.g. dearness, transport, communication). */
  monthlyAllowances: number
  /** One-off festival bonus (e.g. Dashain Kharcha) paid annually. */
  festivalBonus: number
  /** Filing status: single or married couple. */
  status: FilingStatus
  /** Annual contribution to Citizen Investment Trust (CIT). Capped at 3,00,000. */
  citContribution: number
  /** Annual life insurance premium. Capped at 40,000. */
  lifeInsurancePremium: number
  /** Annual health insurance premium. Capped at 20,000. */
  healthInsurancePremium: number
  /** Annual SSF (Social Security Fund) contribution. Any amount > 0 also makes the
   *  first slab 0% (1% Social Security Tax exemption). Typically 11% of annual basic. */
  ssfContribution: number
  /** Annual PF / EPF (Provident Fund) contribution. Typically 10% of annual basic. */
  pfContribution: number
}

export type SlabBreakdown = {
  label: string
  rate: number
  amountInBracket: number
  taxFromBracket: number
}

export type CalculatorResult = {
  /** Annual gross salary income (basic + allowances × 12 + festival bonus). */
  grossAnnualIncome: number

  // --- Raw retirement inputs (what the user entered, unclamped) ---
  /** SSF contribution as entered. */
  ssfContributionInput: number
  /** PF / EPF contribution as entered. */
  pfContributionInput: number
  /** CIT contribution as entered. */
  citContributionInput: number
  /** Sum of CIT + PF + SSF as entered. */
  combinedRetirementInput: number

  // --- Combined retirement cap rule ---
  /**
   * 1/3 of assessable (gross) income from employment, after subtracting
   * life and health insurance deductions. Per Section 63 of the Income Tax
   * Act 2058: equals (gross − life − health) / 3.
   */
  oneThirdGrossLimit: number
  /** Statutory absolute cap (Rs 5,00,000). */
  absoluteRetirementCap: number
  /** Final allowed retirement deduction = MIN(combined input, 1/3-of-gross, absolute cap). */
  allowedRetirementDeduction: number
  /** Which of the three rules bound the allowed deduction. */
  retirementBindingRule: 'actual' | 'one-third-gross' | 'absolute-cap'

  // --- Other deductions (capped individually) ---
  lifeInsuranceDeduction: number
  healthInsuranceDeduction: number

  /** Sum of all deductions actually applied (retirement + life + health). */
  totalDeductions: number
  /** Income subject to slab-based tax. */
  taxableIncome: number
  /** True if SSF contribution > 0 (drives the 0% first-slab rate). */
  ssfParticipant: boolean
  /** Slab-by-slab breakdown of how the tax was calculated. */
  breakdown: SlabBreakdown[]
  /** Total annual tax. */
  annualTax: number
  /** Monthly TDS (annualTax / 12). */
  monthlyTds: number
  /** Effective tax rate as a decimal. */
  effectiveRate: number
}

// -----------------------------------------------------------------------------
// Compute
// -----------------------------------------------------------------------------

function clampDeduction(value: number, cap: number): number {
  if (!Number.isFinite(value) || value < 0) return 0
  return Math.min(value, cap)
}

export function computeSalaryTax(input: CalculatorInputs): CalculatorResult {
  const monthlyBasic = Math.max(0, input.monthlyBasic)
  const monthlyAllowances = Math.max(0, input.monthlyAllowances)
  const festivalBonus = Math.max(0, input.festivalBonus)

  const annualBasic = monthlyBasic * 12
  const annualAllowances = monthlyAllowances * 12
  const grossAnnualIncome = annualBasic + annualAllowances + festivalBonus

  // --- Raw retirement inputs ---
  const ssfContributionInput = Math.max(0, input.ssfContribution || 0)
  const pfContributionInput = Math.max(0, input.pfContribution || 0)
  const citContributionInput = Math.max(0, input.citContribution || 0)
  const combinedRetirementInput =
    ssfContributionInput + pfContributionInput + citContributionInput

  // SSF participation (drives 0% first-slab rate) is implied by a non-zero
  // SSF contribution, even if the combined retirement cap blocks part of it.
  const ssfParticipant = ssfContributionInput > 0

  // Other deductions are capped individually and are subtracted from gross
  // BEFORE applying the retirement cap (they are the "non-retirement" floor).
  const lifeInsuranceDeduction = clampDeduction(
    input.lifeInsurancePremium,
    DEDUCTION_CAPS.lifeInsurance,
  )
  const healthInsuranceDeduction = clampDeduction(
    input.healthInsurancePremium,
    DEDUCTION_CAPS.healthInsurance,
  )

  // --- Combined retirement deduction cap (Section 63 / Schedule 1 logic) ---
  // Allowed deduction = MIN(actual combined, 1/3 of assessable income, Rs 5,00,000).
  // Assessable income = gross − life − health (the income left after
  // non-retirement deductions).
  const assessableForRetirement = Math.max(
    0,
    grossAnnualIncome - lifeInsuranceDeduction - healthInsuranceDeduction,
  )
  const oneThirdGrossLimit = assessableForRetirement * RETIREMENT_INCOME_FRACTION
  const absoluteRetirementCap = DEDUCTION_CAPS.combinedRetirement

  let allowedRetirementDeduction = combinedRetirementInput
  let retirementBindingRule: 'actual' | 'one-third-gross' | 'absolute-cap' =
    'actual'

  if (oneThirdGrossLimit < allowedRetirementDeduction) {
    allowedRetirementDeduction = oneThirdGrossLimit
    retirementBindingRule = 'one-third-gross'
  }
  if (absoluteRetirementCap < allowedRetirementDeduction) {
    allowedRetirementDeduction = absoluteRetirementCap
    retirementBindingRule = 'absolute-cap'
  }

  const totalDeductions =
    allowedRetirementDeduction + lifeInsuranceDeduction + healthInsuranceDeduction
  const taxableIncome = Math.max(0, grossAnnualIncome - totalDeductions)

  const slabs = SLABS[input.status]
  const breakdown: SlabBreakdown[] = []
  let remaining = taxableIncome
  let annualTax = 0

  for (const slab of slabs) {
    const slabSize = slab.to === null ? Infinity : slab.to - slab.from
    const effectiveRate =
      ssfParticipant && slab.rateIfSsf !== undefined ? slab.rateIfSsf : slab.rate
    if (remaining <= 0) {
      breakdown.push({
        label: slab.label,
        rate: effectiveRate,
        amountInBracket: 0,
        taxFromBracket: 0,
      })
      continue
    }
    const amountInBracket = Math.min(remaining, slabSize)
    const taxFromBracket = amountInBracket * effectiveRate
    breakdown.push({
      label: slab.label,
      rate: effectiveRate,
      amountInBracket,
      taxFromBracket,
    })
    annualTax += taxFromBracket
    remaining -= amountInBracket
  }

  // Round annual tax to 2 decimals (currency-friendly).
  annualTax = Math.round(annualTax * 100) / 100
  const monthlyTds = Math.round((annualTax / 12) * 100) / 100
  const effectiveRate = grossAnnualIncome > 0 ? annualTax / grossAnnualIncome : 0

  return {
    grossAnnualIncome,
    ssfContributionInput,
    pfContributionInput,
    citContributionInput,
    combinedRetirementInput,
    oneThirdGrossLimit,
    absoluteRetirementCap,
    allowedRetirementDeduction,
    retirementBindingRule,
    lifeInsuranceDeduction,
    healthInsuranceDeduction,
    totalDeductions,
    taxableIncome,
    ssfParticipant,
    breakdown,
    annualTax,
    monthlyTds,
    effectiveRate,
  }
}

// -----------------------------------------------------------------------------
// Formatting helpers
// -----------------------------------------------------------------------------

const NPR = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'NPR',
  maximumFractionDigits: 0,
})

const NPR_DECIMAL = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'NPR',
  maximumFractionDigits: 2,
})

export function formatNpr(value: number): string {
  return NPR.format(Math.round(value)).replace('NPR', 'Rs')
}

export function formatNprPrecise(value: number): string {
  return NPR_DECIMAL.format(value).replace('NPR', 'Rs')
}

export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(2)}%`
}
