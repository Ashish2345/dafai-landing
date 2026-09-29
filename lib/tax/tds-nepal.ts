// =============================================================================
// Nepal TDS (withholding tax) — Income Tax Act 2058 s.87–89, 88Ka, 95Ka,
// as amended by Finance Act 2083 (FY 2083/84).
//
// Sources: Income Tax Act 2058 (IRD unofficial translation), ICAN "Highlights
// of Federal Budget 2083/84" (Finance Act 2083 amendments: 20% on insurance
// agent commission, 1% on ride-sharing drivers), and CA-firm tax fact sheets.
//
// Rules baked in:
//   - TDS is computed on the amount EXCLUDING VAT.
//   - Contract payments (s.89) attract TDS only above Rs 50,000.
//   - "Final" = final withholding: the payee does not include the income in
//     a return and cannot claim expenses against it.
//   - Deposit TDS with IRD within 25 days after the end of the Nepali month.
// =============================================================================

export type TdsCategory = 'Rent' | 'Services & commission' | 'Contracts' | 'Interest' | 'Investment income' | 'Platforms & other'

export type TdsRow = {
  id: string
  category: TdsCategory
  label: string
  /** Who is being paid / condition. */
  payee: string
  rate: number
  section: string
  final: boolean
  /** Contract threshold (s.89): no TDS at or below this amount. */
  threshold?: number
  /** Whether the payee is typically VAT-registered (drives the VAT toggle default). */
  vatRegistered?: boolean
  note?: string
}

export const TDS_ROWS: TdsRow[] = [
  // --- Rent ---
  { id: 'rent-property', category: 'Rent', label: 'House / land / office rent', payee: 'Resident landlord', rate: 0.10, section: '88(1)', final: true,
    note: 'Final for an individual landlord not in the property business. Local levels may also collect rent tax under their own Finance Acts.' },
  { id: 'rent-vehicle-vat', category: 'Rent', label: 'Vehicle hire / carriage service', payee: 'VAT-registered transporter', rate: 0.015, section: '88(1)', final: false, vatRegistered: true },
  { id: 'rent-vehicle', category: 'Rent', label: 'Vehicle hire / carriage service', payee: 'Not VAT-registered', rate: 0.025, section: '88(1)', final: true,
    note: 'Final for an individual (not a private firm).' },
  { id: 'rent-telecom', category: 'Rent', label: 'Satellite, bandwidth, optical fibre, transmission line', payee: 'Any resident', rate: 0.10, section: '88(1)', final: false },
  { id: 'rent-aircraft', category: 'Rent', label: 'Aircraft lease', payee: 'Any', rate: 0.10, section: '88(1)', final: false },

  // --- Services & commission ---
  { id: 'service-vat', category: 'Services & commission', label: 'Service / consultancy fee', payee: 'VAT-registered provider', rate: 0.015, section: '88(1)', final: false, vatRegistered: true },
  { id: 'service-vat-exempt', category: 'Services & commission', label: 'Service fee', payee: 'Resident entity exempt from VAT', rate: 0.015, section: '88(1)', final: false },
  { id: 'service-pan', category: 'Services & commission', label: 'Service / consultancy / professional fee', payee: 'PAN-only (not VAT-registered)', rate: 0.15, section: '88(1)', final: false },
  { id: 'commission', category: 'Services & commission', label: 'Commission', payee: 'Resident agent', rate: 0.15, section: '88(1)', final: false },
  { id: 'insurance-agent', category: 'Services & commission', label: 'Insurance agent commission / service charge', payee: 'Resident individual agent', rate: 0.20, section: '88(1)(14)', final: true,
    note: 'Raised from 15% to 20% and made final by Finance Act 2083.' },
  { id: 'sales-bonus', category: 'Services & commission', label: 'Sales bonus', payee: 'Any resident', rate: 0.15, section: '88(1)', final: false },
  { id: 'royalty', category: 'Services & commission', label: 'Royalty', payee: 'Any resident', rate: 0.15, section: '88(1)', final: false },
  { id: 'royalty-literature', category: 'Services & commission', label: 'Royalty for literary work', payee: 'Resident writer', rate: 0.015, section: '88(1)', final: false },
  { id: 'meeting-allowance', category: 'Services & commission', label: 'Meeting allowance, occasional lecture, question setting, answer-sheet checking', payee: 'Individual', rate: 0.15, section: '88(1)', final: true },
  { id: 'natural-resource', category: 'Services & commission', label: 'Payment for natural resources', payee: 'Any resident', rate: 0.15, section: '88(1)', final: false },

  // --- Contracts ---
  { id: 'contract', category: 'Contracts', label: 'Contract / supply of goods or labour / construction', payee: 'Resident contractor', rate: 0.015, section: '89(1)', final: false, threshold: 50_000,
    note: 'Only when the contract payment exceeds Rs 50,000.' },
  { id: 'contract-nonresident', category: 'Contracts', label: 'Contract payment', payee: 'Non-resident', rate: 0.05, section: '89(3)', final: true },
  { id: 'insurance-nonresident', category: 'Contracts', label: 'Insurance premium', payee: 'Non-resident insurer', rate: 0.015, section: '89(3)', final: true },

  // --- Interest ---
  { id: 'interest-deposit', category: 'Interest', label: 'Interest on bank / cooperative deposits, bonds, debentures', payee: 'Individual (not business)', rate: 0.06, section: '88(1)', final: true },
  { id: 'interest-life-insurer', category: 'Interest', label: 'Interest on fixed deposit', payee: 'Life insurance company', rate: 0.05, section: '88(1)', final: false },
  { id: 'interest-other', category: 'Interest', label: 'Interest on loans and other interest', payee: 'Any other resident', rate: 0.15, section: '88(1)', final: false },
  { id: 'interest-bank', category: 'Interest', label: 'Interest paid to a resident bank / financial institution', payee: 'Bank or FI', rate: 0, section: '88(4)', final: false },

  // --- Investment income ---
  { id: 'dividend', category: 'Investment income', label: 'Dividend (cash or bonus share)', payee: 'Shareholder', rate: 0.05, section: '88(2)', final: true },
  { id: 'mutual-fund-individual', category: 'Investment income', label: 'Mutual fund distribution', payee: 'Individual', rate: 0.05, section: '88(1)', final: true },
  { id: 'mutual-fund-entity', category: 'Investment income', label: 'Mutual fund distribution', payee: 'Entity', rate: 0.15, section: '88(1)', final: false },
  { id: 'investment-insurance', category: 'Investment income', label: 'Gain from investment (endowment) insurance', payee: 'Individual', rate: 0.05, section: '88(2)', final: true },
  { id: 'windfall', category: 'Investment income', label: 'Windfall gain — lottery, prize, gift, award', payee: 'Any', rate: 0.25, section: '88Ka', final: true,
    note: 'National/international awards for literature, art, sport, science etc. up to Rs 5,00,000 are exempt.' },

  // --- Platforms & other ---
  { id: 'ride-sharing', category: 'Platforms & other', label: 'Ride-sharing platform payout to drivers', payee: 'Individual driver', rate: 0.01, section: '95Ka', final: true,
    note: 'New in Finance Act 2083 — collected by the platform operator.' },
  { id: 'e-commerce', category: 'Platforms & other', label: 'E-commerce platform payout to sellers', payee: 'Seller on the platform', rate: 0.01, section: '95Ka', final: false },
  { id: 'foreign-education', category: 'Platforms & other', label: 'Tuition, registration or exam fee to a foreign school/university', payee: 'Foreign institution', rate: 0.05, section: '88(1)', final: true },
]

export const TDS_CATEGORIES: TdsCategory[] = [
  'Rent',
  'Services & commission',
  'Contracts',
  'Interest',
  'Investment income',
  'Platforms & other',
]

export const VAT_RATE = 0.13

export type TdsInput = {
  rowId: string
  amount: number
  /** The entered amount includes 13% VAT (VAT is excluded from the TDS base). */
  includesVat: boolean
}

export type TdsResult = {
  row: TdsRow
  gross: number
  vat: number
  base: number
  belowThreshold: boolean
  tds: number
  /** What the payer actually transfers to the payee. */
  netToPayee: number
}

function round2(n: number) {
  return Math.round(n * 100) / 100
}

export function computeTds(input: TdsInput): TdsResult {
  const row = TDS_ROWS.find((r) => r.id === input.rowId) ?? TDS_ROWS[0]
  const gross = Math.max(0, input.amount || 0)
  const base = input.includesVat ? round2(gross / (1 + VAT_RATE)) : gross
  const vat = input.includesVat ? round2(gross - base) : 0
  const belowThreshold = row.threshold !== undefined && base <= row.threshold
  const tds = belowThreshold ? 0 : round2(base * row.rate)
  return { row, gross, vat, base, belowThreshold, tds, netToPayee: round2(gross - tds) }
}

/** For the "gross up" question: what to pay so the payee nets `net` after TDS. */
export function grossUp(net: number, rate: number): number {
  if (rate >= 1) return 0
  return round2(net / (1 - rate))
}
