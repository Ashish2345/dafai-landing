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
import { computeCourtFee, type CaseKind, type Stage } from '@/lib/legal/court-fee'

export function CourtFeeCalculator() {
  const [kind, setKind] = useState<CaseKind>('monetary')
  const [stage, setStage] = useState<Stage>('plaint')
  const [claim, setClaim] = useState(0)
  const r = useMemo(() => computeCourtFee(claim, kind, stage), [claim, kind, stage])
  const ready = kind === 'non-monetary' || claim > 0

  return (
    <CalcGrid>
      <InputCard label="Court fee calculator inputs">
        <FormSection label="Type of case" ne="मुद्दाको प्रकार">
          <Segmented<CaseKind>
            value={kind}
            onChange={setKind}
            options={[
              { value: 'monetary', label: 'Money claim · बिगो दाबी' },
              { value: 'non-monetary', label: 'No money value · बिगो नखुलेको' },
            ]}
          />
          {kind === 'non-monetary' && (
            <p className="text-xs text-slate-500 leading-snug">
              Partition, eviction, declaratory relief, voiding a deed and similar
              suits pay a flat Rs 500 (Section 70).
            </p>
          )}
        </FormSection>
        {kind === 'monetary' && (
          <FormSection label="Claim value" ne="बिगो / दाबी रकम" hint="The amount claimed, or the value of the property in dispute.">
            <NumberField id="claim" label="Value claimed" ne="दाबी गरिएको रकम" value={claim} onChange={setClaim} />
          </FormSection>
        )}
        <FormSection label="Filing" ne="दाखिला">
          <Segmented<Stage>
            value={stage}
            onChange={setStage}
            options={[
              { value: 'plaint', label: 'Plaint · फिराद' },
              { value: 'appeal', label: 'Appeal · पुनरावेदन (+15%)' },
            ]}
          />
        </FormSection>
      </InputCard>

      <ResultPanel>
        {!ready ? (
          <EmptyState>Enter the value claimed to see the court fee.</EmptyState>
        ) : (
          <>
            <Headline
              label={stage === 'appeal' ? 'Court fee on appeal' : 'Court fee on the plaint'}
              ne={stage === 'appeal' ? 'पुनरावेदनमा कोर्ट फी' : 'फिरादपत्रमा कोर्ट फी'}
              value={npr(r.total)}
              sub={r.effectiveRate > 0 ? <>Effective rate {pct(Math.round(r.effectiveRate * 10000) / 10000)} of the claim</> : 'Flat fee'}
            />
            <Breakdown title="Slab by slab" ne="तहगत हिसाब">
              {r.lines.map((l) => (
                <Row
                  key={l.label}
                  label={l.label}
                  sublabel={l.rate === null ? 'flat' : `${pct(l.rate)} of ${npr(l.amount)}`}
                  value={npr(l.fee)}
                />
              ))}
              <Row label="Plaint fee" ne="फिराद दस्तुर" value={npr(r.plaintFee)} strong />
              {stage === 'appeal' && <Row label="Appeal addition (15%)" ne="पुनरावेदन थप" value={npr(r.appealExtra)} />}
              {stage === 'appeal' && <Row label="Total on appeal" ne="पुनरावेदनमा जम्मा" value={npr(r.total)} strong />}
            </Breakdown>
            <Disclaimer>
              Muluki Civil Procedure (Code) Act 2074, Sections 63, 69 and 70.
              Government bodies are exempt, and the court may waive the fee for a
              party who cannot pay. Excludes lawyer fees, service-of-process and
              copy charges.
            </Disclaimer>
          </>
        )}
      </ResultPanel>
    </CalcGrid>
  )
}
