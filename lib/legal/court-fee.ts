// =============================================================================
// Court fee (कोर्ट फी) — Muluki Civil Procedure (Code) Act 2074 (2017)
//
// s.63: court fee is paid when filing a plaint, counter-claim or appeal, based
//       on the value claimed.
// s.69: progressive slabs on the claim value —
//         first Rs 25,000 ............ Rs 500 flat
//         Rs 25,001 – 50,000 ......... 5%
//         Rs 50,001 – 1,00,000 ....... 3.5%
//         Rs 1,00,001 – 5,00,000 ..... 2%
//         Rs 5,00,001 – 25,00,000 .... 1.5%
//         above Rs 25,00,000 ......... 1%
//       Each rate applies to the part of the claim inside that slab (a flat
//       rate on the whole claim would make the fee fall as claims rise).
// s.70: suits without a monetary value (partition, eviction, declaration,
//       voiding a deed …) — Rs 500 flat.
// Appeals (District → High Court, High Court → Supreme Court): the plaint fee
//       plus 15%.
// Exempt: Government of Nepal, provincial governments; the court may waive
//       the fee for a party unable to pay.
// =============================================================================

export type FeeSlab = { upTo: number | null; rate: number; label: string }

export const FLAT_FIRST = 500
export const FLAT_FIRST_UPTO = 25_000
export const NON_MONETARY_FEE = 500
export const APPEAL_MARKUP = 0.15

export const SLABS: FeeSlab[] = [
  { upTo: 50_000, rate: 0.05, label: 'Rs 25,001 – 50,000' },
  { upTo: 100_000, rate: 0.035, label: 'Rs 50,001 – 1,00,000' },
  { upTo: 500_000, rate: 0.02, label: 'Rs 1,00,001 – 5,00,000' },
  { upTo: 2_500_000, rate: 0.015, label: 'Rs 5,00,001 – 25,00,000' },
  { upTo: null, rate: 0.01, label: 'Above Rs 25,00,000' },
]

export type CaseKind = 'monetary' | 'non-monetary'
export type Stage = 'plaint' | 'appeal'

export type CourtFeeLine = { label: string; amount: number; fee: number; rate: number | null }

export type CourtFeeResult = {
  lines: CourtFeeLine[]
  plaintFee: number
  appealExtra: number
  total: number
  effectiveRate: number
}

function round2(n: number) {
  return Math.round(n * 100) / 100
}

export function computeCourtFee(claim: number, kind: CaseKind, stage: Stage): CourtFeeResult {
  const lines: CourtFeeLine[] = []
  let plaintFee = 0
  const c = Math.max(0, claim || 0)

  if (kind === 'non-monetary') {
    plaintFee = NON_MONETARY_FEE
    lines.push({ label: 'Suit without monetary value (s.70)', amount: 0, fee: NON_MONETARY_FEE, rate: null })
  } else if (c > 0) {
    plaintFee = FLAT_FIRST
    lines.push({ label: 'First Rs 25,000', amount: Math.min(c, FLAT_FIRST_UPTO), fee: FLAT_FIRST, rate: null })
    let lower = FLAT_FIRST_UPTO
    for (const s of SLABS) {
      if (c <= lower) break
      const upper = s.upTo ?? Infinity
      const part = Math.min(c, upper) - lower
      const fee = round2(part * s.rate)
      lines.push({ label: s.label, amount: part, fee, rate: s.rate })
      plaintFee += fee
      lower = upper
    }
  }

  plaintFee = round2(plaintFee)
  const appealExtra = stage === 'appeal' ? round2(plaintFee * APPEAL_MARKUP) : 0
  const total = round2(plaintFee + appealExtra)
  return { lines, plaintFee, appealExtra, total, effectiveRate: c > 0 && kind === 'monetary' ? total / c : 0 }
}
