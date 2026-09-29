'use client'

import { useMemo, useState } from 'react'
import {
  Breakdown,
  CalcGrid,
  Checkbox,
  DateField,
  Disclaimer,
  EmptyState,
  FormSection,
  Headline,
  InputCard,
  NumberField,
  ResultPanel,
  Row,
  Segmented,
  SelectField,
} from '@/components/tools/fields'
import { npr, pct } from '@/lib/format'
import {
  computeProperty,
  LOCAL_LEVELS,
  type BuyerType,
  type LocalLevel,
  type PropertyInput,
} from '@/lib/tax/property-nepal'

function today() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const DEFAULTS: PropertyInput = {
  salePrice: 0,
  govValuation: 0,
  localLevel: 'valley-metro',
  customRate: 0,
  buyer: 'man',
  purchasePrice: 0,
  purchaseCosts: 0,
  purchaseDate: '',
  saleDate: today(),
  compulsoryAcquisition: false,
  ownResidence10Years: false,
}

export function PropertyCalculator() {
  const [i, setI] = useState<PropertyInput>(DEFAULTS)
  const set = <K extends keyof PropertyInput>(k: K, v: PropertyInput[K]) => setI((p) => ({ ...p, [k]: v }))
  const r = useMemo(() => computeProperty(i), [i])
  const sellerReady = i.purchasePrice > 0 && !!i.purchaseDate

  return (
    <CalcGrid>
      <InputCard label="Property tax calculator inputs">
        <FormSection label="Deal" ne="कारोबार">
          <NumberField id="salePrice" label="Sale price on the deed" ne="लिखतमा उल्लेखित बिक्री मूल्य" value={i.salePrice} onChange={(v) => set('salePrice', v)} />
          <NumberField
            id="govValuation"
            label="Government minimum valuation (optional)" ne="सरकारी न्यूनतम मूल्याङ्कन (ऐच्छिक)"
            value={i.govValuation}
            onChange={(v) => set('govValuation', v)}
            help="Malpot charges on whichever is higher — the deed price or the official minimum rate for that area."
          />
        </FormSection>

        <FormSection label="Buyer — registration fee" ne="खरिदकर्ता — रजिष्ट्रेशन दस्तुर">
          <SelectField<LocalLevel>
            id="localLevel"
            label="Where is the property?" ne="घरजग्गा कहाँ छ?"
            value={i.localLevel}
            onChange={(v) => set('localLevel', v)}
            options={LOCAL_LEVELS.map((l) => ({ value: l.value, label: l.rate ? `${l.label} — ${pct(l.rate)}` : l.label }))}
          />
          {i.localLevel === 'custom' && (
            <NumberField id="customRate" label="Registration fee rate" ne="रजिष्ट्रेशन दस्तुर दर" prefix={null} suffix="%" value={i.customRate} onChange={(v) => set('customRate', v)} help="From your province's Finance Act or the Malpot office notice board." />
          )}
          <Segmented<BuyerType>
            label="Registered in the name of" ne="कसको नाममा पास हुने"
            value={i.buyer}
            onChange={(v) => set('buyer', v)}
            options={[
              { value: 'man', label: 'Man · पुरुष' },
              { value: 'woman', label: 'Woman · महिला (−25%)' },
              { value: 'single-woman', label: 'Single woman · एकल महिला (−35%)' },
            ]}
          />
        </FormSection>

        <FormSection label="Seller — capital gains tax" ne="बिक्रेता — पुँजीगत लाभ कर">
          <NumberField id="purchasePrice" label="Original purchase price" ne="सुरुको खरिद मूल्य" value={i.purchasePrice} onChange={(v) => set('purchasePrice', v)} help="From your purchase deed. For inherited property, the value at inheritance." />
          <NumberField id="purchaseCosts" label="Purchase costs & improvements" ne="खरिद खर्च र सुधार लागत" value={i.purchaseCosts} onChange={(v) => set('purchaseCosts', v)} help="Registration fee you paid, construction/renovation with receipts." />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DateField id="purchaseDate" label="Bought on" ne="खरिद मिति" value={i.purchaseDate} onChange={(v) => set('purchaseDate', v)} />
            <DateField id="saleDate" label="Sold on" ne="बिक्री मिति" value={i.saleDate} onChange={(v) => set('saleDate', v)} />
          </div>
          <Checkbox checked={i.ownResidence10Years} onChange={(v) => set('ownResidence10Years', v)} label="This is my own house and I have lived in it for 10+ years" ne="१० वर्षभन्दा बढी बसेको आफ्नै घर" help="Private residences held and occupied for 10 years or more are exempt." />
          <Checkbox checked={i.compulsoryAcquisition} onChange={(v) => set('compulsoryAcquisition', v)} label="Compulsory acquisition by the government" ne="सरकारी अनिवार्य अधिग्रहण" help="Concessional 2.5% rate (Finance Act 2083)." />
        </FormSection>
      </InputCard>

      <ResultPanel>
        {i.salePrice <= 0 ? (
          <EmptyState>Enter the sale price to see the buyer&apos;s registration fee and the seller&apos;s capital gains tax.</EmptyState>
        ) : (
          <>
            <Headline
              label="Buyer pays — registration fee" ne="खरिदकर्ताले तिर्ने दस्तुर"
              value={npr(r.registrationFee)}
              sub={
                <>
                  {pct(r.registrationRate)} of {npr(r.registrationBase)}
                  {r.discount > 0 && ` less ${pct(r.discount)} concession`}
                </>
              }
            />
            <Headline
              label="Seller pays — capital gains tax" ne="बिक्रेताले तिर्ने पुँजीगत लाभ कर"
              value={sellerReady ? npr(r.cgt) : '—'}
              tone={sellerReady && r.cgt === 0 ? 'green' : 'teal'}
              sub={
                !sellerReady ? (
                  'Enter the purchase price and date to calculate.'
                ) : r.exemptReason ? (
                  <>Exempt — {r.exemptReason.toLowerCase()}.</>
                ) : (
                  <>
                    {pct(r.cgtRate)} of {npr(r.gain)} gain · held {r.holdingYears ?? '?'} years ({r.regimeLabel})
                  </>
                )
              }
            />
            {sellerReady && (
              <Breakdown title="Capital gain" ne="पुँजीगत लाभ">
                <Row label="Sale value" ne="बिक्री मूल्य" sublabel="higher of deed price / minimum valuation" value={npr(r.registrationBase)} />
                <Row label="Less purchase price" ne="खरिद मूल्य घटाउँदा" value={npr(i.purchasePrice)} negative />
                {i.purchaseCosts > 0 && <Row label="Less purchase costs" ne="खरिद खर्च घटाउँदा" value={npr(i.purchaseCosts)} negative />}
                <Row label="Taxable gain" ne="करयोग्य लाभ" value={npr(Math.max(0, r.gain))} strong />
                <Row label={`CGT @ ${pct(r.cgtRate)}`} sublabel={r.longTerm ? 'owned 5 years or more' : 'owned under 5 years'} value={npr(r.cgt)} negative />
                <Row label="Seller receives" ne="बिक्रेताले पाउने" sublabel="sale price less CGT" value={npr(r.sellerNet)} strong />
              </Breakdown>
            )}
            <Disclaimer>
              Registration rates are the Bagmati Province Finance Act 2083 schedule;
              other provinces and some local levels differ — confirm at the Malpot
              office. Excludes ward recommendation, deed-writer and kitta-kat
              (plot split) charges. CGT is a final tax for individuals.
            </Disclaimer>
          </>
        )}
      </ResultPanel>
    </CalcGrid>
  )
}
