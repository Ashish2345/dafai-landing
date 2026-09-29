// =============================================================================
// Income Tax Act 2058 — fees and interest for late compliance (Chapter 22)
//
// s.117 late annual return:
//   Small / presumptive taxpayers (s.4(4)): Rs 100 per month (part month =
//     full month) if less than a year late, otherwise Rs 1,200 per return.
//   Others: the higher of 0.1% a year of GROSS assessable income (income
//     before any deductions) and the small-taxpayer amount above.
// s.117 missed estimated-income return: higher of Rs 5,000 or 0.01% of
//   assessable income.
// s.117 TDS return not filed (s.90): 2.5% a year of the TDS amount.
// s.119 unpaid tax: 15% a year ("normal interest rate", s.2), counted per
//   month with any part of a month as a full month.
//
// Annual return due date: Asoj end (≈ mid-October) after the fiscal year;
// extendable by 3 months for filing only — interest still runs from Asoj end.
// =============================================================================

export type TaxpayerType = 'small' | 'other'

export const INTEREST_RATE = 0.15
export const SMALL_FEE_PER_MONTH = 100
export const SMALL_FEE_PER_RETURN = 1_200
export const GROSS_INCOME_FEE_RATE = 0.001
export const ESTIMATE_FEE_MIN = 5_000
export const ESTIMATE_FEE_RATE = 0.0001
export const TDS_RETURN_FEE_RATE = 0.025

export type PenaltyInput = {
  taxpayer: TaxpayerType
  /** Annual return due date (YYYY-MM-DD). */
  dueDate: string
  /** Date you file / pay (YYYY-MM-DD). */
  actualDate: string
  grossAssessableIncome: number
  unpaidTax: number
  missedEstimatedReturn: boolean
  /** TDS that should have been reported in a late TDS return. */
  lateTdsAmount: number
  /** Months the TDS return is late. */
  lateTdsMonths: number
}

export type PenaltyResult = {
  monthsLate: number
  yearsLate: number
  lateFilingFee: number
  lateFilingBasis: string
  interest: number
  estimateFee: number
  tdsReturnFee: number
  total: number
}

function round2(n: number) {
  return Math.round(n * 100) / 100
}

/** Whole months from `from` to `to`, counting any part month as a full month. */
export function monthsLateBetween(from: string, to: string): number {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(from) || !/^\d{4}-\d{2}-\d{2}$/.test(to) || to <= from) return 0
  const [fy, fm, fd] = from.split('-').map(Number)
  const [ty, tm, td] = to.split('-').map(Number)
  let months = (ty - fy) * 12 + (tm - fm)
  if (td > fd) months += 1
  return Math.max(1, months)
}

export function computePenalty(i: PenaltyInput): PenaltyResult {
  const monthsLate = monthsLateBetween(i.dueDate, i.actualDate)
  const yearsLate = monthsLate === 0 ? 0 : Math.ceil(monthsLate / 12)

  const smallFee = monthsLate === 0 ? 0 : monthsLate < 12 ? monthsLate * SMALL_FEE_PER_MONTH : SMALL_FEE_PER_RETURN
  let lateFilingFee = smallFee
  let lateFilingBasis = monthsLate < 12 ? `Rs 100 × ${monthsLate} month${monthsLate === 1 ? '' : 's'}` : 'Rs 1,200 per return (1 year or more)'
  if (i.taxpayer === 'other' && monthsLate > 0) {
    const incomeFee = round2(Math.max(0, i.grossAssessableIncome) * GROSS_INCOME_FEE_RATE * yearsLate)
    if (incomeFee > smallFee) {
      lateFilingFee = incomeFee
      lateFilingBasis = `0.1% × gross income × ${yearsLate} year${yearsLate === 1 ? '' : 's'}`
    }
  }

  const interest = round2(Math.max(0, i.unpaidTax) * INTEREST_RATE * (monthsLate / 12))
  const estimateFee = i.missedEstimatedReturn
    ? round2(Math.max(ESTIMATE_FEE_MIN, Math.max(0, i.grossAssessableIncome) * ESTIMATE_FEE_RATE))
    : 0
  const tdsReturnFee = round2(Math.max(0, i.lateTdsAmount) * TDS_RETURN_FEE_RATE * (Math.max(0, i.lateTdsMonths) / 12))

  return {
    monthsLate,
    yearsLate,
    lateFilingFee,
    lateFilingBasis,
    interest,
    estimateFee,
    tdsReturnFee,
    total: round2(lateFilingFee + interest + estimateFee + tdsReturnFee),
  }
}
