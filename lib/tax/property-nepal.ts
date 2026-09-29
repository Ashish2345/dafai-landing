// =============================================================================
// Nepal land & house transaction costs
//
// BUYER — registration fee (रजिष्ट्रेशन दस्तुर) collected by the Land Revenue
// (Malpot) Office on the higher of the deed price and the government minimum
// valuation. Rates are set by each PROVINCE's Finance Act; presets below are
// Bagmati Province Finance Act 2083 (effective 1 Shrawan 2083). Other
// provinces → custom rate.
//   Concessions: 25% off when ownership passes to a woman (also senior
//   citizens over 70 and parentless minors), 35% off for a single woman.
//
// SELLER — capital gains tax (Income Tax Act 2058 s.95Ka(5), Finance Act 2083),
// collected as final advance tax at registration, individuals only:
//   Sold on/after 17 Jul 2026:  owned ≥ 5 years 7.5% · < 5 years 10%
//                               compulsory government acquisition 2.5%
//   Sold before 17 Jul 2026:    owned ≥ 5 years 5% · < 5 years 7.5%
//   Exempt: sale value below Rs 10 lakh; a private house owned and lived in
//   continuously for 10+ years; donation to government; inheritance/gift
//   within the family (taxed only on a later third-party sale).
// =============================================================================

export type LocalLevel =
  | 'valley-metro'
  | 'valley-municipality'
  | 'metro'
  | 'sub-metro'
  | 'municipality'
  | 'rural'
  | 'custom'

export const LOCAL_LEVELS: { value: LocalLevel; label: string; rate: number | null }[] = [
  { value: 'valley-metro', label: 'Kathmandu / Lalitpur Metropolitan', rate: 0.053 },
  { value: 'valley-municipality', label: 'Other municipality in Kathmandu Valley', rate: 0.048 },
  { value: 'metro', label: 'Metropolitan city outside the Valley (Bagmati)', rate: 0.0515 },
  { value: 'sub-metro', label: 'Sub-metropolitan city (Bagmati)', rate: 0.0465 },
  { value: 'municipality', label: 'Municipality outside the Valley (Bagmati)', rate: 0.045 },
  { value: 'rural', label: 'Rural municipality (Bagmati)', rate: 0.03 },
  { value: 'custom', label: 'Other province — enter rate', rate: null },
]

export type BuyerType = 'man' | 'woman' | 'single-woman'

export const BUYER_DISCOUNT: Record<BuyerType, number> = {
  man: 0,
  woman: 0.25,
  'single-woman': 0.35,
}

export const CGT_EXEMPT_BELOW = 1_000_000
export const NEW_REGIME_FROM = '2026-07-17'

export type PropertyInput = {
  salePrice: number
  /** Government minimum valuation (0 = unknown / not higher). */
  govValuation: number
  localLevel: LocalLevel
  customRate: number
  buyer: BuyerType

  purchasePrice: number
  /** Registration fee paid at purchase, improvements, broker fee — with receipts. */
  purchaseCosts: number
  purchaseDate: string
  saleDate: string
  compulsoryAcquisition: boolean
  ownResidence10Years: boolean
}

export type PropertyResult = {
  registrationBase: number
  registrationRate: number
  discount: number
  registrationFee: number

  holdingYears: number | null
  longTerm: boolean
  gain: number
  cgtRate: number
  exemptReason: string | null
  cgt: number
  regimeLabel: string
  sellerNet: number
}

function round2(n: number) {
  return Math.round(n * 100) / 100
}

/** Full years between two YYYY-MM-DD dates (anniversary-based). */
export function fullYears(from: string, to: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(from) || !/^\d{4}-\d{2}-\d{2}$/.test(to) || to < from) return null
  const [fy, fm, fd] = from.split('-').map(Number)
  const [ty, tm, td] = to.split('-').map(Number)
  let years = ty - fy
  if (tm < fm || (tm === fm && td < fd)) years -= 1
  return years
}

export function computeProperty(i: PropertyInput): PropertyResult {
  const salePrice = Math.max(0, i.salePrice || 0)
  const registrationBase = Math.max(salePrice, i.govValuation || 0)
  const preset = LOCAL_LEVELS.find((l) => l.value === i.localLevel)
  const registrationRate = preset?.rate ?? Math.max(0, i.customRate || 0) / 100
  const discount = BUYER_DISCOUNT[i.buyer]
  const registrationFee = round2(registrationBase * registrationRate * (1 - discount))

  const holdingYears = fullYears(i.purchaseDate, i.saleDate)
  const longTerm = holdingYears !== null && holdingYears >= 5
  const newRegime = !i.saleDate || i.saleDate >= NEW_REGIME_FROM
  const regimeLabel = newRegime ? 'Finance Act 2083 rates' : 'pre-2083 rates (sale before 17 Jul 2026)'

  // The Land Revenue Office uses the higher of deed price and minimum valuation.
  const saleValue = registrationBase
  const gain = round2(saleValue - Math.max(0, i.purchasePrice || 0) - Math.max(0, i.purchaseCosts || 0))

  let cgtRate: number
  if (i.compulsoryAcquisition) cgtRate = 0.025
  else if (newRegime) cgtRate = longTerm ? 0.075 : 0.10
  else cgtRate = longTerm ? 0.05 : 0.075

  let exemptReason: string | null = null
  if (saleValue > 0 && saleValue < CGT_EXEMPT_BELOW) exemptReason = 'Sale value below Rs 10 lakh'
  else if (i.ownResidence10Years) exemptReason = 'Own house lived in for 10+ years'
  else if (gain <= 0) exemptReason = 'No gain'

  const cgt = exemptReason ? 0 : round2(gain * cgtRate)

  return {
    registrationBase,
    registrationRate,
    discount,
    registrationFee,
    holdingYears,
    longTerm,
    gain,
    cgtRate,
    exemptReason,
    cgt,
    regimeLabel,
    sellerNet: round2(salePrice - cgt),
  }
}
