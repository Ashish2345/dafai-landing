'use client'

import { useMemo, useState } from 'react'
import {
  Breakdown,
  CalcGrid,
  Disclaimer,
  EmptyState,
  FormSection,
  Headline,
  InputCard,
  NumberField,
  ResultPanel,
  Row,
} from '@/components/tools/fields'
import { npr } from '@/lib/format'
import { computeCorporateAction, type CorporateActionInput } from '@/lib/tax/nepse-corporate-action'

const DEFAULTS: CorporateActionInput = {
  marketPrice: 0,
  sharesHeld: 0,
  bonusPct: 0,
  cashDividendPct: 0,
  rightPct: 0,
  rightPrice: 100,
}

function units(n: number) {
  return `${n.toLocaleString('en-IN', { maximumFractionDigits: 2 })} units`
}

export function CorporateActionCalculator() {
  const [i, setI] = useState<CorporateActionInput>(DEFAULTS)
  const set = <K extends keyof CorporateActionInput>(k: K, v: CorporateActionInput[K]) => setI((p) => ({ ...p, [k]: v }))
  const r = useMemo(() => computeCorporateAction(i), [i])
  const hasAction = i.bonusPct > 0 || i.rightPct > 0 || i.cashDividendPct > 0

  return (
    <CalcGrid>
      <InputCard label="Bonus and right share calculator inputs">
        <FormSection label="Before book closure" ne="बुक क्लोज अघि">
          <NumberField id="mp" label="Market price (LTP) per share" ne="प्रति सेयर बजार मूल्य" value={i.marketPrice} onChange={(v) => set('marketPrice', v)} />
          <NumberField id="held" label="Shares you hold (optional)" ne="तपाईंसँग भएका सेयर (ऐच्छिक)" prefix={null} suffix="units" step={1} value={i.sharesHeld} onChange={(v) => set('sharesHeld', v)} help="Add this to see your new shares, right cost and dividend tax." />
        </FormSection>
        <FormSection label="Announced dividend / issue" ne="घोषित लाभांश / निष्कासन">
          <div className="grid grid-cols-2 gap-3">
            <NumberField id="bonus" label="Bonus share" ne="बोनस सेयर" prefix={null} suffix="%" value={i.bonusPct} onChange={(v) => set('bonusPct', v)} />
            <NumberField id="cash" label="Cash dividend" ne="नगद लाभांश" prefix={null} suffix="%" value={i.cashDividendPct} onChange={(v) => set('cashDividendPct', v)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <NumberField id="right" label="Right share" ne="हकप्रद सेयर" prefix={null} suffix="%" value={i.rightPct} onChange={(v) => set('rightPct', v)} help="e.g. 1:1 = 100%, 1:0.5 = 50%" />
            <NumberField id="rightPrice" label="Right issue price" ne="हकप्रद सेयर मूल्य" value={i.rightPrice} onChange={(v) => set('rightPrice', v)} help="Usually Rs 100 (par)" />
          </div>
        </FormSection>
      </InputCard>

      <ResultPanel>
        {i.marketPrice <= 0 || !hasAction ? (
          <EmptyState>Enter the market price and the announced bonus, right or cash dividend.</EmptyState>
        ) : (
          <>
            <Headline
              label="Adjusted price after book closure" ne="बुक क्लोजपछिको समायोजित मूल्य"
              value={npr(r.adjustedPrice)}
              sub={r.priceDrop > 0 ? <>Down {npr(r.priceDrop)} from {npr(i.marketPrice)}</> : 'No price adjustment for a cash-only dividend'}
            />
            {i.sharesHeld > 0 && (
              <>
                <Breakdown title="Your shares" ne="तपाईंका सेयर">
                  <Row label="Held now" ne="हाल भएको" value={units(i.sharesHeld)} />
                  {r.bonusShares > 0 && <Row label="Bonus shares" ne="बोनस सेयर" value={units(r.bonusShares)} />}
                  {r.rightShares > 0 && <Row label="Right shares" ne="हकप्रद सेयर" sublabel={`cost ${npr(r.rightCost)} to subscribe`} value={units(r.rightShares)} />}
                  <Row label="After the issue" ne="निष्कासनपछि" value={units(r.totalShares)} strong />
                </Breakdown>
                <Breakdown title="Dividend tax (5%, final)" ne="लाभांश कर">
                  {r.cashDividend > 0 && <Row label="Cash dividend" ne="नगद लाभांश" value={npr(r.cashDividend)} />}
                  {r.bonusFaceValue > 0 && <Row label="Bonus at face value" ne="अंकित मूल्यमा बोनस" sublabel="taxed like a dividend" value={npr(r.bonusFaceValue)} />}
                  <Row label="Tax @ 5%" ne="५% कर" value={npr(r.dividendTax)} negative />
                  <Row
                    label={r.netCash >= 0 ? 'Cash credited to you' : 'Tax you must pay'}
                    sublabel={r.netCash < 0 ? 'cash dividend does not cover the bonus tax' : undefined}
                    value={npr(Math.abs(r.netCash))}
                    strong
                  />
                </Breakdown>
              </>
            )}
            <Disclaimer>
              NEPSE adjusts the price on the book-closure date using this formula.
              Fractional bonus units are handled by the company&apos;s share registrar.
              Dividend tax per Income Tax Act 2058 s.88(2).
            </Disclaimer>
          </>
        )}
      </ResultPanel>
    </CalcGrid>
  )
}
