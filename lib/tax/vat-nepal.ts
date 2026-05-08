// =============================================================================
// Nepal VAT — flat 13% rate per VAT Act 2052 (last revised by Finance Act 2081).
//
// Calculation directions:
//   Exclusive → Inclusive (add VAT):    gross = net × 1.13
//   Inclusive → Exclusive (remove VAT): net   = gross / 1.13
//
// Rounding: results rounded to 2 decimals (paisa-level precision).
// =============================================================================

export const VAT_RATE = 0.13

/** Mode flag: is the user-entered amount the base price or VAT-inclusive? */
export type VatMode = 'exclusive' | 'inclusive'

export type VatRow = {
  /** Stable identifier for React keys; not used by the math. */
  id: string
  /** Optional row label / description (e.g. line item name). */
  label?: string
  /** Net (base) amount before VAT. */
  net: number
  /** VAT amount (13% of net). */
  vat: number
  /** Gross amount including VAT. */
  gross: number
}

export type VatTotals = {
  totalNet: number
  totalVat: number
  totalGross: number
}

function round2(n: number): number {
  return Math.round(n * 100) / 100
}

/**
 * Compute net / vat / gross from a single amount, given which side it sits on.
 * Returns all-zero when the input is invalid or non-positive.
 */
export function calculateVat(
  amount: number,
  mode: VatMode,
): { net: number; vat: number; gross: number } {
  if (!Number.isFinite(amount) || amount <= 0) {
    return { net: 0, vat: 0, gross: 0 }
  }
  if (mode === 'exclusive') {
    const net = round2(amount)
    const vat = round2(net * VAT_RATE)
    const gross = round2(net + vat)
    return { net, vat, gross }
  }
  // inclusive — extract VAT from a VAT-inclusive amount.
  const gross = round2(amount)
  const net = round2(gross / (1 + VAT_RATE))
  const vat = round2(gross - net)
  return { net, vat, gross }
}

/** Sum a list of computed rows into a single totals object. */
export function sumVatRows(rows: { net: number; vat: number; gross: number }[]): VatTotals {
  const totals = rows.reduce(
    (acc, r) => ({
      totalNet: acc.totalNet + r.net,
      totalVat: acc.totalVat + r.vat,
      totalGross: acc.totalGross + r.gross,
    }),
    { totalNet: 0, totalVat: 0, totalGross: 0 },
  )
  return {
    totalNet: round2(totals.totalNet),
    totalVat: round2(totals.totalVat),
    totalGross: round2(totals.totalGross),
  }
}

/** Currency formatter (en-IN style: lakh/crore grouping with Rs prefix). */
const NPR = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'NPR',
  maximumFractionDigits: 2,
})

export function formatNprVat(value: number): string {
  return NPR.format(value).replace('NPR', 'Rs')
}
