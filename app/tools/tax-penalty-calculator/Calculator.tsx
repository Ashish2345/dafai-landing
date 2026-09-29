'use client'

import { useMemo, useState } from 'react'
import {
  Breakdown,
  CalcGrid,
  Checkbox,
  DateField,
  Disclaimer,
  FormSection,
  Headline,
  InputCard,
  NumberField,
  ResultPanel,
  Row,
  Segmented,
} from '@/components/tools/fields'
import { npr } from '@/lib/format'
import { computePenalty, type PenaltyInput, type TaxpayerType } from '@/lib/tax/tax-penalty'

function today() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// FY 2082/83 annual return due: Asoj end 2083 ≈ 17 October 2026.
const DEFAULTS: PenaltyInput = {
  taxpayer: 'other',
  dueDate: '2026-10-17',
  actualDate: today(),
  grossAssessableIncome: 0,
  unpaidTax: 0,
  missedEstimatedReturn: false,
  lateTdsAmount: 0,
  lateTdsMonths: 0,
}

export function TaxPenaltyCalculator() {
  const [i, setI] = useState<PenaltyInput>(DEFAULTS)
  const set = <K extends keyof PenaltyInput>(k: K, v: PenaltyInput[K]) => setI((p) => ({ ...p, [k]: v }))
  const r = useMemo(() => computePenalty(i), [i])

  return (
    <CalcGrid>
      <InputCard label="Tax penalty calculator inputs">
        <FormSection label="Taxpayer" ne="करदाता">
          <Segmented<TaxpayerType>
            value={i.taxpayer}
            onChange={(v) => set('taxpayer', v)}
            options={[
              { value: 'other', label: 'Individual / business · व्यक्ति / व्यवसाय' },
              { value: 'small', label: 'Presumptive · अनुमानित कर' },
            ]}
          />
        </FormSection>
        <FormSection label="Annual return" ne="वार्षिक आय विवरण" hint="The return for FY 2082/83 is due by Asoj end 2083 (≈ 17 Oct 2026). Change the dates for another year.">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DateField id="dueDate" label="Due date" ne="अन्तिम म्याद" value={i.dueDate} onChange={(v) => set('dueDate', v)} />
            <DateField id="actualDate" label="Filed / paid on" ne="बुझाएको मिति" value={i.actualDate} onChange={(v) => set('actualDate', v)} />
          </div>
          {i.taxpayer === 'other' && (
            <NumberField id="gross" label="Gross assessable income" ne="कुल निर्धारणयोग्य आय" value={i.grossAssessableIncome} onChange={(v) => set('grossAssessableIncome', v)} help="Total income before any expenses or deductions — the late fee is 0.1% of this per year." />
          )}
          <NumberField id="unpaid" label="Tax still unpaid" ne="तिर्न बाँकी कर" value={i.unpaidTax} onChange={(v) => set('unpaidTax', v)} help="15% a year interest runs on this from the due date." />
        </FormSection>
        <FormSection label="Other missed filings (optional)" ne="अन्य छुटेका विवरण (ऐच्छिक)">
          <Checkbox checked={i.missedEstimatedReturn} onChange={(v) => set('missedEstimatedReturn', v)} label="I did not file the estimated income return (due Poush end)" ne="अनुमानित आय विवरण बुझाइएन" />
          <div className="grid grid-cols-2 gap-3">
            <NumberField id="tds" label="TDS in a late TDS return" ne="ढिला TDS विवरणको कर" value={i.lateTdsAmount} onChange={(v) => set('lateTdsAmount', v)} />
            <NumberField id="tdsMonths" label="Months late" ne="ढिला महिना" prefix={null} suffix="mo" step={1} value={i.lateTdsMonths} onChange={(v) => set('lateTdsMonths', v)} />
          </div>
        </FormSection>
      </InputCard>

      <ResultPanel>
        <Headline
          label="Total fees & interest" ne="कुल शुल्क र ब्याज"
          value={npr(r.total)}
          tone={r.total === 0 ? 'green' : 'red'}
          sub={r.monthsLate === 0 ? 'Filed on time — no late-filing fee.' : `${r.monthsLate} month${r.monthsLate === 1 ? '' : 's'} late (part months count as full months)`}
        />
        <Breakdown title="Breakdown" ne="विवरण">
          <Row label="Late return fee" ne="विलम्ब शुल्क" sublabel={r.monthsLate ? `Section 117 · ${r.lateFilingBasis}` : 'Section 117'} value={npr(r.lateFilingFee)} />
          <Row label="Interest on unpaid tax" ne="बाँकी करमा ब्याज" sublabel={`Section 119 · 15% p.a. × ${r.monthsLate} months`} value={npr(r.interest)} />
          {r.estimateFee > 0 && <Row label="Estimated return not filed" ne="अनुमानित विवरण नबुझाएको" sublabel="higher of Rs 5,000 or 0.01% of income" value={npr(r.estimateFee)} />}
          {r.tdsReturnFee > 0 && <Row label="Late TDS return" ne="ढिला TDS विवरण" sublabel="2.5% p.a. of the TDS" value={npr(r.tdsReturnFee)} />}
          <Row label="Total" ne="जम्मा" value={npr(r.total)} strong />
        </Breakdown>
        <Disclaimer>
          Income Tax Act 2058, Sections 117–119. The IRD may also impose
          penalties for false statements (s.120) and review settlement schemes
          announced in the budget. Interest cannot be waived by filing an
          extension — the extension only moves the filing deadline.
        </Disclaimer>
      </ResultPanel>
    </CalcGrid>
  )
}
