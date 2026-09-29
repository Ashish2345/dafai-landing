// =============================================================================
// Nepal VAT — VAT Act 2052 as amended by Finance Act 2083.
//
// Rates:
//   13%  standard rate on taxable goods and services.
//    5%  ride-sharing services on registered platforms and electricity
//        supplied to end users (new s.7(1Kha), Finance Act 2083).
//    0%  zero-rated (exports) or VAT-exempt (Schedule 1) supplies.
//
// Digital-payment rebate (s.25Ga1): a consumer paying digitally for goods and
// services listed in the IRD notice gets 10% of the VAT back — from FY 2083/84
// as an immediate rebate on the invoice rather than a later refund.
//
// Calculation directions (r = rate):
//   Exclusive → Inclusive (add VAT):    gross = net × (1 + r)
//   Inclusive → Exclusive (remove VAT): net   = gross / (1 + r)
//
// Rounding: results rounded to 2 decimals (paisa-level precision).
// =============================================================================

export const VAT_RATE = 0.13

export type VatRateKey = 'standard' | 'reduced' | 'exempt'

export const VAT_RATES: Record<VatRateKey, { rate: number; label: string; hint: string }> = {
  standard: { rate: 0.13, label: '13%', hint: 'Standard rate' },
  reduced: { rate: 0.05, label: '5%', hint: 'Ride-sharing, electricity' },
  exempt: { rate: 0, label: '0%', hint: 'Exempt / zero-rated' },
}

/** Share of VAT returned to consumers who pay digitally for notified items. */
export const DIGITAL_PAYMENT_REBATE_RATE = 0.10

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
  rate: number = VAT_RATE,
): { net: number; vat: number; gross: number } {
  if (!Number.isFinite(amount) || amount <= 0) {
    return { net: 0, vat: 0, gross: 0 }
  }
  if (mode === 'exclusive') {
    const net = round2(amount)
    const vat = round2(net * rate)
    const gross = round2(net + vat)
    return { net, vat, gross }
  }
  // inclusive — extract VAT from a VAT-inclusive amount.
  const gross = round2(amount)
  const net = round2(gross / (1 + rate))
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
