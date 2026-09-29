// =============================================================================
// NEPSE corporate actions — bonus / right price adjustment + dividend tax
//
// Price adjustment (NEPSE practice after book closure):
//   adjusted = (market price + right price × R%) ÷ (1 + B% + R%)
//   bonus only → MP ÷ (1 + B%) · right only → (MP + 100 × R%) ÷ (1 + R%)
//   Right shares are normally issued at par (Rs 100).
//
// Dividend tax (Income Tax Act s.88(2)): 5% final withholding on the cash
// dividend AND on the face value of bonus shares. Companies usually declare a
// small cash dividend so the tax on bonus shares can be deducted from it.
// =============================================================================

export const FACE_VALUE = 100
export const DIVIDEND_TAX_RATE = 0.05

export type CorporateActionInput = {
  marketPrice: number
  sharesHeld: number
  bonusPct: number
  cashDividendPct: number
  rightPct: number
  rightPrice: number
}

export type CorporateActionResult = {
  adjustedPrice: number
  priceDrop: number
  bonusShares: number
  rightShares: number
  totalShares: number
  rightCost: number
  cashDividend: number
  bonusFaceValue: number
  dividendTax: number
  netCash: number
  /** Portfolio value before book close vs after at the adjusted price. */
  valueBefore: number
  valueAfter: number
}

function round2(n: number) {
  return Math.round(n * 100) / 100
}

export function computeCorporateAction(i: CorporateActionInput): CorporateActionResult {
  const mp = Math.max(0, i.marketPrice || 0)
  const held = Math.max(0, Math.floor(i.sharesHeld || 0))
  const b = Math.max(0, i.bonusPct || 0) / 100
  const r = Math.max(0, i.rightPct || 0) / 100
  const rightPrice = i.rightPrice > 0 ? i.rightPrice : FACE_VALUE

  const adjustedPrice = mp > 0 ? round2((mp + rightPrice * r) / (1 + b + r)) : 0
  const bonusShares = round2(held * b)
  const rightShares = round2(held * r)
  const rightCost = round2(rightShares * rightPrice)

  const cashDividend = round2(held * FACE_VALUE * (Math.max(0, i.cashDividendPct || 0) / 100))
  const bonusFaceValue = round2(bonusShares * FACE_VALUE)
  const dividendTax = round2((cashDividend + bonusFaceValue) * DIVIDEND_TAX_RATE)

  return {
    adjustedPrice,
    priceDrop: round2(mp - adjustedPrice),
    bonusShares,
    rightShares,
    totalShares: round2(held + bonusShares + rightShares),
    rightCost,
    cashDividend,
    bonusFaceValue,
    dividendTax,
    netCash: round2(cashDividend - dividendTax),
    valueBefore: round2(held * mp),
    valueAfter: round2((held + bonusShares + rightShares) * adjustedPrice),
  }
}
