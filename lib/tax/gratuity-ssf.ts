// =============================================================================
// Gratuity, Provident Fund & Social Security Fund — Labour Act 2074,
// Contribution-based Social Security Act 2074, Income Tax Act 2058.
//
// Two schemes an employee can be under (all % of monthly BASIC salary):
//   PF + gratuity (Labour Act s.52–53):
//     employee PF 10% · employer PF 10% · employer gratuity 8.33%
//     (8.33% a month ≈ one month's basic salary per year of service)
//   SSF (Social Security Act; replaces PF + gratuity when enrolled):
//     employee 11% · employer 20% = 31%, split as
//       old-age protection 28.33% · medical/health/maternity 1%
//       accident & disability 1.4% · dependent family 0.27%
//
// Tax on a lump-sum retirement payment from an approved retirement fund
// (Income Tax Act s.88(1) proviso): 5% final withholding on the amount left
// after deducting the higher of 50% of the payment or Rs 5,00,000.
// =============================================================================

export type Scheme = 'pf' | 'ssf'

export const PF_EMPLOYEE = 0.10
export const PF_EMPLOYER = 0.10
export const GRATUITY = 0.0833
export const SSF_EMPLOYEE = 0.11
export const SSF_EMPLOYER = 0.20
export const SSF_SPLIT = [
  { label: 'Old-age protection', rate: 0.2833 },
  { label: 'Medical, health & maternity', rate: 0.01 },
  { label: 'Accident & disability', rate: 0.014 },
  { label: 'Dependent family protection', rate: 0.0027 },
]
export const RETIREMENT_TAX_RATE = 0.05
export const RETIREMENT_EXEMPT_MIN = 500_000
export const RETIREMENT_EXEMPT_SHARE = 0.5

export type GratuityInput = {
  monthlyBasic: number
  scheme: Scheme
  /** Years + months of service (or expected service). */
  years: number
  months: number
  /** Expected annual return on the fund balance, % (0 = contributions only). */
  annualReturnPct: number
}

export type GratuityResult = {
  monthly: {
    employee: number
    employer: number
    gratuity: number
    total: number
  }
  totalMonths: number
  employeeTotal: number
  employerTotal: number
  gratuityTotal: number
  contributions: number
  growth: number
  balance: number
  /** Lump-sum withdrawal tax (estimate). */
  exemptPortion: number
  withdrawalTax: number
  netWithdrawal: number
  /** Gratuity by the "one month's basic per year" rule of thumb. */
  gratuityRuleOfThumb: number
}

function round2(n: number) {
  return Math.round(n * 100) / 100
}

export function computeGratuity(i: GratuityInput): GratuityResult {
  const basic = Math.max(0, i.monthlyBasic || 0)
  const totalMonths = Math.max(0, Math.floor(i.years || 0) * 12 + Math.floor(i.months || 0))

  const employee = round2(basic * (i.scheme === 'ssf' ? SSF_EMPLOYEE : PF_EMPLOYEE))
  const employer = round2(basic * (i.scheme === 'ssf' ? SSF_EMPLOYER : PF_EMPLOYER))
  const gratuity = i.scheme === 'ssf' ? 0 : round2(basic * GRATUITY)
  const total = round2(employee + employer + gratuity)

  // Month-by-month accumulation with optional monthly-compounded return.
  const r = Math.max(0, i.annualReturnPct || 0) / 100 / 12
  let balance = 0
  for (let m = 0; m < totalMonths; m++) balance = balance * (1 + r) + total
  balance = round2(balance)

  const contributions = round2(total * totalMonths)
  const exemptPortion = round2(Math.min(balance, Math.max(RETIREMENT_EXEMPT_MIN, balance * RETIREMENT_EXEMPT_SHARE)))
  const withdrawalTax = round2((balance - exemptPortion) * RETIREMENT_TAX_RATE)

  return {
    monthly: { employee, employer, gratuity, total },
    totalMonths,
    employeeTotal: round2(employee * totalMonths),
    employerTotal: round2(employer * totalMonths),
    gratuityTotal: round2(gratuity * totalMonths),
    contributions,
    growth: round2(balance - contributions),
    balance,
    exemptPortion,
    withdrawalTax,
    netWithdrawal: round2(balance - withdrawalTax),
    gratuityRuleOfThumb: round2(basic * (totalMonths / 12)),
  }
}
