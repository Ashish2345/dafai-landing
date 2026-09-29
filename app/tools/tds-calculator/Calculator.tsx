'use client'

import { useMemo, useState } from 'react'
import {
  Breakdown,
  CalcGrid,
  Checkbox,
  Disclaimer,
  EmptyState,
  FormSection,
  Headline,
  InputCard,
  NumberField,
  ResultPanel,
  Row,
  SelectField,
} from '@/components/tools/fields'
import { npr, pct } from '@/lib/format'
import { computeTds, grossUp, TDS_ROWS } from '@/lib/tax/tds-nepal'

const OPTIONS = TDS_ROWS.map((r) => ({
  value: r.id,
  label: `${r.label} — ${r.payee} (${pct(r.rate)})`,
  group: r.category,
}))

export function TdsCalculator() {
  const [rowId, setRowId] = useState('service-pan')
  const [amount, setAmount] = useState(0)
  const [includesVat, setIncludesVat] = useState(false)

  const row = TDS_ROWS.find((r) => r.id === rowId)!
  const result = useMemo(() => computeTds({ rowId, amount, includesVat }), [rowId, amount, includesVat])

  return (
    <CalcGrid>
      <InputCard label="TDS calculator inputs">
        <FormSection label="Payment type" ne="भुक्तानीको प्रकार" hint="Pick what you are paying for and who you are paying.">
          <SelectField
            id="tdsType"
            label="Payment" ne="भुक्तानी"
            value={rowId}
            onChange={(v) => {
              setRowId(v)
              const next = TDS_ROWS.find((r) => r.id === v)
              setIncludesVat(!!next?.vatRegistered && includesVat)
            }}
            options={OPTIONS}
            help={
              <>
                Rate <strong>{pct(row.rate)}</strong> · Section {row.section} ·{' '}
                {row.final ? 'final withholding' : 'advance tax (payee claims credit)'}
                {row.note ? ` · ${row.note}` : ''}
              </>
            }
          />
        </FormSection>
        <FormSection label="Amount" ne="रकम">
          <NumberField id="tdsAmount" label="Payment amount" ne="भुक्तानी रकम" value={amount} onChange={setAmount} />
          <Checkbox
            checked={includesVat}
            onChange={setIncludesVat}
            label="This amount includes 13% VAT" ne="यो रकममा १३% भ्याट समावेश छ"
            help="TDS is always calculated on the amount before VAT. Tick this if you are entering a VAT invoice total."
          />
        </FormSection>
      </InputCard>

      <ResultPanel>
        {result.gross <= 0 ? (
          <EmptyState>Choose a payment type and enter the amount to see the TDS.</EmptyState>
        ) : (
          <>
            <Headline
              label="TDS to deduct" ne="कट्टा गर्नुपर्ने अग्रिम कर"
              value={npr(result.tds)}
              sub={
                result.belowThreshold ? (
                  <>No TDS — contract payments up to Rs 50,000 are below the Section 89 threshold.</>
                ) : (
                  <>
                    {pct(row.rate)} of {npr(result.base)} · pay{' '}
                    <strong className="tabular-nums">{npr(result.netToPayee)}</strong> to the payee
                  </>
                )
              }
            />
            <Breakdown title="Breakdown" ne="विवरण">
              <Row label="Invoice amount" ne="बिल रकम" value={npr(result.gross)} />
              {result.vat > 0 && <Row label="Less VAT (13%)" ne="भ्याट घटाउँदा" sublabel="not part of the TDS base" value={npr(result.vat)} negative />}
              <Row label="TDS base" ne="कर कट्टीको आधार" value={npr(result.base)} />
              <Row label={`TDS @ ${pct(row.rate)}`} ne="अग्रिम कर" sublabel={`Section ${row.section}`} value={npr(result.tds)} negative />
              <Row label="Net payment to payee" ne="भुक्तानी पाउनेलाई खुद रकम" value={npr(result.netToPayee)} strong />
            </Breakdown>
            <Breakdown title="Filing" ne="दाखिला">
              <Row label="Deposit TDS by" ne="कर दाखिला म्याद" value="25th of next month" sublabel="Nepali month, with the e-TDS return" />
              <Row label="Final withholding?" ne="अन्तिम कर कट्टी?" value={row.final ? 'Yes' : 'No'} sublabel={row.final ? 'payee has no further tax on it' : 'payee claims it as credit'} />
              {row.rate > 0 && (
                <Row
                  label={`Gross-up to net ${npr(result.base)}`}
                  sublabel="if the payee wants this amount after TDS"
                  value={npr(grossUp(result.base, row.rate))}
                />
              )}
            </Breakdown>
            <Disclaimer>
              Income Tax Act 2058 as amended by Finance Act 2083. Double-tax treaties
              can lower rates for non-residents. Late deposit attracts 15% p.a.
              interest (Section 119).
            </Disclaimer>
          </>
        )}
      </ResultPanel>
    </CalcGrid>
  )
}
