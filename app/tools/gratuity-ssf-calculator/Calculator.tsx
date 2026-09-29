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
  Segmented,
} from '@/components/tools/fields'
import { npr, pct } from '@/lib/format'
import { computeGratuity, SSF_SPLIT, type GratuityInput, type Scheme } from '@/lib/tax/gratuity-ssf'

const DEFAULTS: GratuityInput = { monthlyBasic: 0, scheme: 'pf', years: 5, months: 0, annualReturnPct: 0 }

export function GratuityCalculator() {
  const [i, setI] = useState<GratuityInput>(DEFAULTS)
  const set = <K extends keyof GratuityInput>(k: K, v: GratuityInput[K]) => setI((p) => ({ ...p, [k]: v }))
  const r = useMemo(() => computeGratuity(i), [i])
  const ssf = i.scheme === 'ssf'

  return (
    <CalcGrid>
      <InputCard label="Gratuity and SSF calculator inputs">
        <FormSection label="Scheme" ne="योजना" hint="SSF-enrolled employers pay into SSF instead of separate PF and gratuity.">
          <Segmented<Scheme>
            value={i.scheme}
            onChange={(v) => set('scheme', v)}
            options={[
              { value: 'pf', label: 'PF + Gratuity · उपदान' },
              { value: 'ssf', label: 'SSF · सामाजिक सुरक्षा' },
            ]}
          />
        </FormSection>
        <FormSection label="Salary & service" ne="तलब र सेवा अवधि">
          <NumberField id="basic" label="Monthly basic salary" ne="मासिक आधारभूत तलब" value={i.monthlyBasic} onChange={(v) => set('monthlyBasic', v)} help="Contributions are on basic pay only — allowances are excluded." />
          <div className="grid grid-cols-2 gap-3">
            <NumberField id="years" label="Years of service" ne="सेवा वर्ष" prefix={null} suffix="yrs" step={1} value={i.years} onChange={(v) => set('years', v)} />
            <NumberField id="months" label="Extra months" ne="थप महिना" prefix={null} suffix="mo" step={1} value={i.months} onChange={(v) => set('months', Math.min(11, v))} />
          </div>
          <NumberField
            id="return"
            label="Expected annual return on the fund (optional)" ne="कोषको अनुमानित वार्षिक प्रतिफल (ऐच्छिक)"
            prefix={null}
            suffix="%"
            value={i.annualReturnPct}
            onChange={(v) => set('annualReturnPct', v)}
            help="Leave at 0 to see contributions only. Funds credit interest yearly at rates they announce."
          />
        </FormSection>
      </InputCard>

      <ResultPanel>
        {i.monthlyBasic <= 0 ? (
          <EmptyState>Enter your monthly basic salary to see contributions and your retirement balance.</EmptyState>
        ) : (
          <>
            <Headline
              label={`Balance after ${Math.floor(r.totalMonths / 12)} yrs ${r.totalMonths % 12} mo`}
              ne="कोष मौज्दात"
              value={npr(r.balance)}
              sub={
                <>
                  {npr(r.monthly.total)} a month · take-home after withdrawal tax{' '}
                  <strong className="tabular-nums">{npr(r.netWithdrawal)}</strong>
                </>
              }
            />
            <Breakdown title="Every month" ne="हरेक महिना">
              <Row label={`Your contribution (${ssf ? '11%' : '10%'})`} ne="तपाईंको योगदान" sublabel="deducted from salary" value={npr(r.monthly.employee)} />
              <Row label={`Employer ${ssf ? 'SSF (20%)' : 'PF (10%)'}`} ne="रोजगारदाताको योगदान" value={npr(r.monthly.employer)} />
              {!ssf && <Row label="Employer gratuity (8.33%)" ne="उपदान" value={npr(r.monthly.gratuity)} />}
              <Row label="Total into your fund" ne="कोषमा जम्मा हुने कुल" value={npr(r.monthly.total)} strong />
            </Breakdown>
            {ssf && (
              <Breakdown title="Where the 31% goes" ne="३१% कहाँ जान्छ">
                {SSF_SPLIT.map((s) => (
                  <Row key={s.label} label={s.label} sublabel={pct(s.rate)} value={npr(i.monthlyBasic * s.rate)} />
                ))}
              </Breakdown>
            )}
            <Breakdown title="Over your service" ne="सेवा अवधिभर">
              <Row label="Your contributions" ne="तपाईंको योगदान" value={npr(r.employeeTotal)} />
              <Row label="Employer contributions" ne="रोजगारदाताको योगदान" value={npr(r.employerTotal + r.gratuityTotal)} />
              {r.growth > 0 && <Row label="Returns" ne="प्रतिफल" value={npr(r.growth)} />}
              <Row label="Fund balance" ne="कोष मौज्दात" value={npr(r.balance)} strong />
              <Row label="Tax-free portion" ne="करमुक्त अंश" sublabel="higher of 50% or Rs 5 lakh" value={npr(r.exemptPortion)} />
              <Row label="Withdrawal tax @ 5%" ne="भुक्तानीमा कर" sublabel="final, on the rest" value={npr(r.withdrawalTax)} negative />
              <Row label="You receive" ne="तपाईंले पाउने" value={npr(r.netWithdrawal)} strong />
            </Breakdown>
            {!ssf && (
              <Disclaimer>
                Gratuity alone: {npr(r.gratuityTotal)} — about one month&apos;s basic
                ({npr(i.monthlyBasic)}) per year of service.
              </Disclaimer>
            )}
            <Disclaimer>
              Labour Act 2074, Social Security Act 2074 and Income Tax Act 2058.
              SSF old-age benefits may be paid as a pension rather than a lump sum.
              Withdrawal tax assumes an approved retirement fund.
            </Disclaimer>
          </>
        )}
      </ResultPanel>
    </CalcGrid>
  )
}
