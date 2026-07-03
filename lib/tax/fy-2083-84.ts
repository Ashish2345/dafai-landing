// =============================================================================
// Nepal Salary Tax — Fiscal Year 2083/84 (Shrawan 2083 → Ashadh 2084 / 2026-27)
//
// Source: Budget 2083/84 (2026/27), presented 15 Jestha 2083 (29 May 2026) by
// Finance Minister Dr. Swarnim Wagle, amending the Income Tax Act 2058. Legal
// force comes from the Finance Act 2083.
//
// !!  AS PROPOSED — pending the gazetted Finance Act 2083. VERIFY slab          !!
// !!  boundaries, rates and caps against the final IRD publication before use.  !!
//
// What changed vs FY 2082/83 (the biggest personal-tax rewrite in years):
// - The separate SINGLE vs COUPLE schedules were MERGED into one unified table
//   that applies to all resident individuals.
// - The 1% band (Social Security Tax) was doubled: Rs 5,00,000 → Rs 10,00,000.
// - The number of slabs dropped from 6 to 5.
// - The peak rate was cut from 39% to 29% (structured as 27% + 2% surcharge).
//
// Notes baked in:
// - First slab is 1% Social Security Tax (SST). For employees who contribute to
//   the Social Security Fund (SSF) or an approved retirement fund, the 1% SST is
//   exempt → first slab is 0%.
// - Deduction caps are unchanged from Finance Act 2082.
// - Resident single women with only employment income get a 10% rebate on the
//   computed tax (opt-in in this calculator). Not available to couples.
// =============================================================================

import type { FilingStatus, Slab, SlabBreakdown } from './fy-2082-83'

export type { FilingStatus, Slab, SlabBreakdown }

/**
 * FY 2083/84 uses ONE unified schedule for all resident individuals — the
 * single/couple distinction was removed. We keep the same array shape as the
 * prior year so the compute + UI code stays uniform.
 */
export const SLABS: Slab[] = [
  { from: 0,         to: 1_000_000, rate: 0.01, rateIfSsf: 0.0, label: 'First Rs 10,00,000 (SST)' },
  { from: 1_000_000, to: 1_500_000, rate: 0.10, label: 'Next Rs 5,00,000' },
  { from: 1_500_000, to: 2_500_000, rate: 0.20, label: 'Next Rs 10,00,000' },
  { from: 2_500_000, to: 4_000_000, rate: 0.27, label: 'Rs 25,00,001 – 40,00,000' },
  { from: 4_000_000, to: null,      rate: 0.29, label: 'Above Rs 40,00,000 (27% + 2% surcharge)' },
]

/** Statutory deduction caps (unchanged from Finance Act 2082). */
export const DEDUCTION_CAPS = {
  /** Combined retirement deduction cap — CIT + PF + SSF together. */
  combinedRetirement: 500_000,
  /** Life insurance premium (separate from retirement cap). */
  lifeInsurance: 40_000,
  /** Health insurance premium (separate from retirement cap). */
  healthInsurance: 20_000,
} as const

/** Retirement deduction is bounded at 1/3 of assessable employment income. */
export const RETIREMENT_INCOME_FRACTION = 1 / 3

/** Rebate for resident single women with only employment income. */
export const WOMEN_REBATE_RATE = 0.10

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
  /** Annual contribution to Citizen Investment Trust (CIT). */
  citContribution: number
  /** Annual life insurance premium. Capped at 40,000. */
  lifeInsurancePremium: number
  /** Annual health insurance premium. Capped at 20,000. */
  healthInsurancePremium: number
  /** Annual SSF contribution. Any amount > 0 also makes the first slab 0%. */
  ssfContribution: number
  /** Annual PF / EPF (Provident Fund) contribution. */
  pfContribution: number
  /** Resident single woman with only employment income → 10% tax rebate. */
  applyWomenRebate: boolean
}

export type CalculatorResult = {
  /** Annual gross salary income (basic + allowances × 12 + festival bonus). */
  grossAnnualIncome: number

  // --- Raw retirement inputs (what the user entered, unclamped) ---
  ssfContributionInput: number
  pfContributionInput: number
  citContributionInput: number
  combinedRetirementInput: number

  // --- Combined retirement cap rule ---
  oneThirdGrossLimit: number
  absoluteRetirementCap: number
  allowedRetirementDeduction: number
  retirementBindingRule: 'actual' | 'one-third-gross' | 'absolute-cap'

  // --- Other deductions (capped individually) ---
  lifeInsuranceDeduction: number
  healthInsuranceDeduction: number

  totalDeductions: number
  taxableIncome: number
  ssfParticipant: boolean
  breakdown: SlabBreakdown[]

  /** Tax after slabs, before the women's rebate. */
  taxBeforeRebate: number
  /** Women's rebate amount (0 unless applyWomenRebate). */
  womenRebate: number
  /** Final annual tax (after rebate). */
  annualTax: number
  monthlyTds: number
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

  const ssfContributionInput = Math.max(0, input.ssfContribution || 0)
  const pfContributionInput = Math.max(0, input.pfContribution || 0)
  const citContributionInput = Math.max(0, input.citContribution || 0)
  const combinedRetirementInput =
    ssfContributionInput + pfContributionInput + citContributionInput

  const ssfParticipant = ssfContributionInput > 0

  const lifeInsuranceDeduction = clampDeduction(
    input.lifeInsurancePremium,
    DEDUCTION_CAPS.lifeInsurance,
  )
  const healthInsuranceDeduction = clampDeduction(
    input.healthInsurancePremium,
    DEDUCTION_CAPS.healthInsurance,
  )

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

  const breakdown: SlabBreakdown[] = []
  let remaining = taxableIncome
  let taxBeforeRebate = 0

  for (const slab of SLABS) {
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
    taxBeforeRebate += taxFromBracket
    remaining -= amountInBracket
  }

  taxBeforeRebate = Math.round(taxBeforeRebate * 100) / 100
  const womenRebate = input.applyWomenRebate
    ? Math.round(taxBeforeRebate * WOMEN_REBATE_RATE * 100) / 100
    : 0
  const annualTax = Math.round((taxBeforeRebate - womenRebate) * 100) / 100
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
    taxBeforeRebate,
    womenRebate,
    annualTax,
    monthlyTds,
    effectiveRate,
  }
}

// -----------------------------------------------------------------------------
// Formatting helpers (re-exported from the prior year — identical behaviour)
// -----------------------------------------------------------------------------

export { formatNpr, formatNprPrecise, formatPercent } from './fy-2082-83'
