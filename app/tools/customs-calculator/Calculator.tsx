'use client'

import { useState } from 'react'

const TEAL = '#09383e'

// =============================================================================
// Types & item config
// =============================================================================

type ItemKey = 'gold-jewelry' | 'raw-gold' | 'silver-jewelry' | 'television' | 'mobile-phone'

type Gender = 'female' | 'male'

type Verdict = 'free' | 'pay' | 'illegal'

type CalcResult = {
  verdict: Verdict
  headline: string
  detail: string
  note?: string
  taxRs?: number
}

const ITEMS: { key: ItemKey; label: string; ne: string; icon: React.ReactNode }[] = [
  {
    key: 'gold-jewelry',
    label: 'Gold Jewelry',
    ne: 'सुनको गहना',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8a4 4 0 100 8 4 4 0 000-8zm0 0V4m0 16v-4m8-4h-4M4 12H0" />
      </svg>
    ),
  },
  {
    key: 'raw-gold',
    label: 'Raw Gold',
    ne: 'कच्चा सुन',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9-4 9 4-9 4-9-4zm0 0v10l9 4 9-4V7" />
      </svg>
    ),
  },
  {
    key: 'silver-jewelry',
    label: 'Silver Jewelry',
    ne: 'चाँदीको गहना',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.6 7.1 18.2l.9-5.5-4-3.9 5.5-.8L12 3z" />
      </svg>
    ),
  },
  {
    key: 'television',
    label: 'Television',
    ne: 'टेलिभिजन',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM8 21h8" />
      </svg>
    ),
  },
  {
    key: 'mobile-phone',
    label: 'Mobile Phone',
    ne: 'मोबाइल फोन',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 3h8a2 2 0 012 2v14a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2zm4 15h.01" />
      </svg>
    ),
  },
]

// =============================================================================
// Pure compute logic — keeps the spec rules in one auditable place
// =============================================================================

// Nepali / South-Asian tola (also Indian tola) — fixed at 11.6638 grams.
// This is the unit jewelers actually quote in. Customs rules are written in
// grams, so we convert at the input boundary.
const GRAMS_PER_TOLA = 11.6638

type WeightUnit = 'g' | 'tola'

function toGrams(value: number, unit: WeightUnit): number {
  return unit === 'g' ? value : value * GRAMS_PER_TOLA
}

function formatNpr(n: number): string {
  return 'Rs ' + n.toLocaleString('en-IN', { maximumFractionDigits: 0 })
}

function formatGrams(g: number): string {
  return `${g.toLocaleString('en-IN', { maximumFractionDigits: 2 })} g`
}

function formatTola(g: number): string {
  return `${(g / GRAMS_PER_TOLA).toLocaleString('en-IN', { maximumFractionDigits: 2 })} tola`
}

// -----------------------------------------------------------------------------
// FY 2083/84 passenger-baggage rules (Customs Tariff Annex 4 + Finance Act 2083)
//   Gold jewelry: duty-free 50 g (women) / 25 g (men); up to 100 g more with
//     duty — first 50 g at the gold tariff rate, next 50 g at rate + 3%.
//     Anything beyond is confiscated.
//   Raw gold: up to 100 g, dutiable (no free portion).
//   Gold tariff: 20% (doubled from 10% by Finance Act 2083), assessed on the
//     international market value converted at the NRB rate.
//   Silver jewelry: 500 g duty-free, next 500 g dutiable.
//   TV: one set up to 65" duty-free after 12+ consecutive months abroad.
// -----------------------------------------------------------------------------

const GOLD_DUTY_RATE = 0.20
const GOLD_SECOND_BAND_SURCHARGE = 0.03
const GOLD_DUTIABLE_BAND_G = 50
const GOLD_MAX_DUTIABLE_G = 100
const GOLD_FREE_G: Record<Gender, number> = { female: 50, male: 25 }
const RAW_GOLD_MAX_G = 100
const SILVER_FREE_G = 500
const SILVER_MAX_DUTIABLE_G = 500
const TV_FREE_MAX_INCHES = 65

function pricePerGram(pricePerTola: number): number {
  return pricePerTola > 0 ? pricePerTola / GRAMS_PER_TOLA : 0
}

function computeGoldJewelry(weightG: number, gender: Gender, pricePerTola: number): CalcResult {
  if (weightG <= 0) {
    return {
      verdict: 'free',
      headline: '—',
      detail: 'Enter a weight to calculate.',
    }
  }
  const free = GOLD_FREE_G[gender]
  const who = gender === 'female' ? 'women' : 'men'
  if (weightG <= free) {
    return {
      verdict: 'free',
      headline: 'FREE',
      detail: `Rs 0 duty. Up to ${free} g (${formatTola(free)}) of gold jewelry is duty-free for ${who}.`,
      note: 'Must be worn/finished jewelry. Bullion bent into bangles or rings is treated as raw gold.',
    }
  }
  const ceiling = free + GOLD_MAX_DUTIABLE_G
  if (weightG > ceiling) {
    return {
      verdict: 'illegal',
      headline: 'ILLEGAL',
      detail: `Confiscation risk. ${who[0].toUpperCase() + who.slice(1)} may bring at most ${ceiling} g (${formatTola(ceiling)}) of gold jewelry — ${free} g free plus 100 g with duty.`,
      note: 'Gold above the passenger limit is seized under the Customs Act 2082.',
    }
  }
  const dutiable = weightG - free
  const band1 = Math.min(dutiable, GOLD_DUTIABLE_BAND_G)
  const band2 = Math.max(0, dutiable - GOLD_DUTIABLE_BAND_G)
  const rate1 = GOLD_DUTY_RATE
  const rate2 = GOLD_DUTY_RATE + GOLD_SECOND_BAND_SURCHARGE
  const perG = pricePerGram(pricePerTola)
  const bandText =
    `${formatGrams(band1)} at ${Math.round(rate1 * 100)}%` +
    (band2 > 0 ? ` + ${formatGrams(band2)} at ${Math.round(rate2 * 100)}%` : '')
  if (perG === 0) {
    return {
      verdict: 'pay',
      headline: 'PAY TAX',
      detail: `${formatGrams(dutiable)} is dutiable: ${bandText} of its value. Enter the gold price per tola to see the rupee amount.`,
      note: `First ${free} g is free for ${who}.`,
    }
  }
  const tax = band1 * perG * rate1 + band2 * perG * rate2
  return {
    verdict: 'pay',
    headline: 'PAY TAX',
    detail: `You must pay about ${formatNpr(tax)} at customs on arrival.`,
    taxRs: tax,
    note: `First ${free} g is free for ${who}. Duty = ${bandText} of value at ${formatNpr(pricePerTola)}/tola (${formatNpr(perG)}/g). Customs values gold at the international price converted at the NRB rate, so the final figure can differ slightly.`,
  }
}

function computeRawGold(weightG: number, pricePerTola: number): CalcResult {
  if (weightG <= 0) {
    return {
      verdict: 'free',
      headline: '—',
      detail: 'Enter a weight to calculate.',
    }
  }
  if (weightG > RAW_GOLD_MAX_G) {
    return {
      verdict: 'illegal',
      headline: 'ILLEGAL',
      detail: `Confiscation risk. A passenger may bring at most ${RAW_GOLD_MAX_G} g (${formatTola(RAW_GOLD_MAX_G)}) of raw gold, and all of it is dutiable.`,
      note: 'Excess gold is seized at the border.',
    }
  }
  const perG = pricePerGram(pricePerTola)
  if (perG === 0) {
    return {
      verdict: 'pay',
      headline: 'PAY TAX',
      detail: `Raw gold has no duty-free allowance — all ${formatGrams(weightG)} is dutiable at ${Math.round(GOLD_DUTY_RATE * 100)}% of value. Enter the gold price per tola to see the rupee amount.`,
    }
  }
  const tax = weightG * perG * GOLD_DUTY_RATE
  return {
    verdict: 'pay',
    headline: 'PAY TAX',
    detail: `You must pay about ${formatNpr(tax)} at customs on arrival.`,
    taxRs: tax,
    note: `Duty = ${formatGrams(weightG)} × ${formatNpr(perG)}/g × ${Math.round(GOLD_DUTY_RATE * 100)}%. Bars, biscuits and coins count as raw gold. Customs may add further levies on bullion — confirm at the desk.`,
  }
}

function computeSilverJewelry(weightG: number): CalcResult {
  if (weightG <= 0) {
    return {
      verdict: 'free',
      headline: '—',
      detail: 'Enter a weight to calculate.',
    }
  }
  if (weightG <= SILVER_FREE_G) {
    return {
      verdict: 'free',
      headline: 'FREE',
      detail: `Rs 0 duty. Up to ${SILVER_FREE_G} g (${formatTola(SILVER_FREE_G)}) of silver jewelry is duty-free.`,
      note: 'Raised by Finance Act 2083.',
    }
  }
  if (weightG <= SILVER_FREE_G + SILVER_MAX_DUTIABLE_G) {
    return {
      verdict: 'pay',
      headline: 'PAY TAX',
      detail: `${formatGrams(weightG - SILVER_FREE_G)} above the free ${SILVER_FREE_G} g is charged duty at the prevailing silver tariff rate.`,
      note: `Up to ${SILVER_MAX_DUTIABLE_G} g beyond the free allowance may be brought in on payment of duty.`,
    }
  }
  return {
    verdict: 'illegal',
    headline: 'ILLEGAL',
    detail: `Confiscation risk. Silver jewelry above ${SILVER_FREE_G + SILVER_MAX_DUTIABLE_G} g (${formatTola(SILVER_FREE_G + SILVER_MAX_DUTIABLE_G)}) exceeds the passenger allowance.`,
  }
}

function computeTelevision(inches: number, abroad12Months: boolean): CalcResult {
  if (inches <= 0) {
    return {
      verdict: 'free',
      headline: '—',
      detail: 'Enter the TV screen size in inches.',
    }
  }
  if (!abroad12Months) {
    return {
      verdict: 'pay',
      headline: 'PAY TAX',
      detail: 'The duty-free TV allowance only applies after living abroad for 12 consecutive months or more. Duty is charged on the invoice (CIF) value.',
      note: 'Bring the original invoice; under-declared value gets reassessed at the published reference price.',
    }
  }
  if (inches <= TV_FREE_MAX_INCHES) {
    return {
      verdict: 'free',
      headline: 'FREE',
      detail: `Rs 0 duty. One TV up to ${TV_FREE_MAX_INCHES} inches is duty-free after 12+ months abroad.`,
      note: 'Limit raised from 32" to 65" by Finance Act 2083. One set per passenger.',
    }
  }
  return {
    verdict: 'pay',
    headline: 'PAY TAX',
    detail: `Taxable. TVs above ${TV_FREE_MAX_INCHES} inches are charged duty on the purchase invoice (CIF value × applicable rate).`,
    note: 'Bring the original invoice; under-declared value gets reassessed at the published reference price.',
  }
}

// Approximate composite rates (customs duty + excise + VAT) for new phone
// imports under personal baggage. Slabs are revised annually by the Department
// of Customs — verify at the customs desk before paying.
const PHONE_DUTY_SLABS = [
  { upTo: 10_000, rate: 0.15, label: '≤ Rs 10,000' },
  { upTo: 25_000, rate: 0.18, label: 'Rs 10,001 – 25,000' },
  { upTo: 50_000, rate: 0.25, label: 'Rs 25,001 – 50,000' },
  { upTo: 100_000, rate: 0.35, label: 'Rs 50,001 – 1,00,000' },
  { upTo: Infinity, rate: 0.4, label: 'Above Rs 1,00,000' },
] as const

function phoneDutyRate(priceNpr: number): { rate: number; band: string } {
  for (const s of PHONE_DUTY_SLABS) {
    if (priceNpr <= s.upTo) return { rate: s.rate, band: s.label }
  }
  return { rate: 0.4, band: 'Above Rs 1,00,000' }
}

function computeMobilePhone(
  personal: boolean,
  foreignWorker: boolean,
  priceNpr: number,
): CalcResult {
  if (personal) {
    return {
      verdict: 'free',
      headline: 'FREE',
      detail: 'Your personal used phone is free.',
      note: 'One used phone in active use is treated as personal baggage and not taxable. You still need to register the IMEI at the customs desk on arrival — otherwise the SIM gets blocked on Nepali networks after the visitor window.',
    }
  }
  if (foreignWorker) {
    return {
      verdict: 'free',
      headline: 'FREE',
      detail: 'You are allowed 1 extra new phone duty-free as a returning foreign worker.',
      note: 'Concession available to workers returning to Nepal after 6 months on Shram Swikriti. The duty-free phone still needs IMEI registration at customs.',
    }
  }
  if (priceNpr <= 0) {
    return {
      verdict: 'pay',
      headline: 'PAY TAX',
      detail: 'Enter your phone price in NPR to see the exact duty.',
      note: 'Duty is slab-based on CIF (Cost + Insurance + Freight) value, roughly 15% to 40%+ depending on phone price.',
    }
  }
  const { rate, band } = phoneDutyRate(priceNpr)
  const tax = priceNpr * rate
  return {
    verdict: 'pay',
    headline: 'PAY TAX',
    detail: `You must pay approximately ${formatNpr(tax)} at customs.`,
    taxRs: tax,
    note: `Phone in band "${band}" → composite rate ~${Math.round(rate * 100)}% (customs duty + excise + VAT). Duty = ${formatNpr(priceNpr)} × ${Math.round(rate * 100)}% = ${formatNpr(tax)}. IMEI must be registered at the customs desk regardless.`,
  }
}

// =============================================================================
// Component
// =============================================================================

export function CustomsCalculator() {
  const [item, setItem] = useState<ItemKey>('gold-jewelry')

  // Gold (shared price input)
  const [goldPricePerTola, setGoldPricePerTola] = useState<string>('')

  // Gold Jewelry
  const [gender, setGender] = useState<Gender>('female')
  const [jewelryWeight, setJewelryWeight] = useState<string>('')
  const [jewelryUnit, setJewelryUnit] = useState<WeightUnit>('tola')

  // Raw Gold
  const [rawWeight, setRawWeight] = useState<string>('')
  const [rawUnit, setRawUnit] = useState<WeightUnit>('tola')

  // Silver Jewelry
  const [silverWeight, setSilverWeight] = useState<string>('')
  const [silverUnit, setSilverUnit] = useState<WeightUnit>('tola')

  // Television
  const [tvInches, setTvInches] = useState<string>('')
  const [abroad12Months, setAbroad12Months] = useState<boolean>(true)

  // Mobile Phone
  const [personalUsed, setPersonalUsed] = useState<boolean>(false)
  const [returningWorker, setReturningWorker] = useState<boolean>(false)
  const [phonePriceNpr, setPhonePriceNpr] = useState<string>('')

  const [result, setResult] = useState<CalcResult | null>(null)

  function handleCalculate() {
    let r: CalcResult
    switch (item) {
      case 'gold-jewelry':
        r = computeGoldJewelry(
          toGrams(Number(jewelryWeight) || 0, jewelryUnit),
          gender,
          Number(goldPricePerTola) || 0,
        )
        break
      case 'raw-gold':
        r = computeRawGold(toGrams(Number(rawWeight) || 0, rawUnit), Number(goldPricePerTola) || 0)
        break
      case 'silver-jewelry':
        r = computeSilverJewelry(toGrams(Number(silverWeight) || 0, silverUnit))
        break
      case 'television':
        r = computeTelevision(Number(tvInches) || 0, abroad12Months)
        break
      case 'mobile-phone':
        r = computeMobilePhone(personalUsed, returningWorker, Number(phonePriceNpr) || 0)
        break
    }
    setResult(r)
  }

  function handleReset() {
    setJewelryWeight('')
    setRawWeight('')
    setSilverWeight('')
    setGoldPricePerTola('')
    setTvInches('')
    setAbroad12Months(true)
    setPersonalUsed(false)
    setReturningWorker(false)
    setPhonePriceNpr('')
    setResult(null)
  }

  // Reset result when the item changes (stale answers are misleading)
  function selectItem(key: ItemKey) {
    setItem(key)
    setResult(null)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
      {/* ============================ INPUTS ============================ */}
      <form
        className="rounded-xl border border-slate-200 bg-white divide-y divide-slate-200"
        onSubmit={(e) => {
          e.preventDefault()
          handleCalculate()
        }}
        aria-label="Nepal customs calculator inputs"
      >
        {/* Item selector */}
        <FormSection
          label="What are you bringing? · के ल्याउँदै हुनुहुन्छ?"
          hint="Personal-baggage allowance varies by item type"
        >
          <div className="grid grid-cols-2 gap-2">
            {ITEMS.map((it) => (
              <button
                key={it.key}
                type="button"
                onClick={() => selectItem(it.key)}
                aria-pressed={item === it.key}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors text-left ${
                  item === it.key
                    ? 'border-[#09383e] bg-[#09383e]/5 text-[#09383e]'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <span className={item === it.key ? 'text-[#09383e]' : 'text-slate-400'}>
                  {it.icon}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block leading-tight">{it.label}</span>
                  <span
                    className="block text-[11px] text-slate-400 leading-tight mt-0.5"
                    lang="ne"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  >
                    {it.ne}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </FormSection>

        {/* Conditional inputs */}
        {item === 'gold-jewelry' && (
          <FormSection
            label="Passenger & weight · यात्रु र तौल"
            hint={`Free: ≤ ${GOLD_FREE_G[gender]} g · With duty: next 100 g (20%, then 23%) · Not allowed: > ${GOLD_FREE_G[gender] + GOLD_MAX_DUTIABLE_G} g`}
          >
            <div className="grid grid-cols-2 gap-2">
              {(['female', 'male'] as Gender[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  aria-pressed={gender === g}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                    gender === g
                      ? 'border-[#09383e] bg-[#09383e]/5 text-[#09383e]'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {g === 'female' ? 'Woman (50 g free)' : 'Man (25 g free)'}
                </button>
              ))}
            </div>
            <WeightField
              id="jewelryWeight"
              label="Total weight · जम्मा तौल"
              value={jewelryWeight}
              onChange={setJewelryWeight}
              unit={jewelryUnit}
              onUnitChange={setJewelryUnit}
            />
            <GoldPriceField value={goldPricePerTola} onChange={setGoldPricePerTola} />
          </FormSection>
        )}

        {item === 'raw-gold' && (
          <FormSection
            label="Weight · तौल"
            hint="Bars, biscuits and coins: up to 100 g (~8.6 tola) with 20% duty — no free portion"
          >
            <WeightField
              id="rawWeight"
              label="Total weight · जम्मा तौल"
              value={rawWeight}
              onChange={setRawWeight}
              unit={rawUnit}
              onUnitChange={setRawUnit}
            />
            <GoldPriceField value={goldPricePerTola} onChange={setGoldPricePerTola} />
          </FormSection>
        )}

        {item === 'silver-jewelry' && (
          <FormSection
            label="Weight · तौल"
            hint="Free: ≤ 500 g (~42.9 tola) · With duty: next 500 g · Not allowed: > 1 kg"
          >
            <WeightField
              id="silverWeight"
              label="Total weight · जम्मा तौल"
              value={silverWeight}
              onChange={setSilverWeight}
              unit={silverUnit}
              onUnitChange={setSilverUnit}
            />
          </FormSection>
        )}

        {item === 'television' && (
          <FormSection
            label="TV size · टिभीको साइज"
            hint={`One TV up to ${TV_FREE_MAX_INCHES}" is duty-free after 12+ months abroad. Otherwise it is taxed on invoice value.`}
          >
            <Checkbox
              id="abroad12Months"
              label="I have lived abroad for 12 consecutive months or more · लगातार १२ महिना वा बढी विदेश बसेको"
              checked={abroad12Months}
              onChange={setAbroad12Months}
            />
            <NumberField
              id="tvInches"
              label="Screen size (inches) · स्क्रिन साइज (इन्च)"
              suffix="in"
              value={tvInches}
              onChange={setTvInches}
            />
          </FormSection>
        )}

        {item === 'mobile-phone' && (
          <FormSection
            label="Phone status · फोनको अवस्था"
            hint="Personal used phone is always free. Returning workers get one extra free new phone. Otherwise, duty is slab-based on the phone's price."
          >
            <Checkbox
              id="personalUsed"
              label="This is a used phone in active personal use (in your pocket) · प्रयोगमा रहेको आफ्नै पुरानो फोन"
              checked={personalUsed}
              onChange={(v) => {
                setPersonalUsed(v)
                if (v) setReturningWorker(false)
              }}
            />
            <Checkbox
              id="returningWorker"
              label="I am a foreign worker returning after 6+ months · ६ महिनापछि फर्केको वैदेशिक रोजगार कामदार"
              checked={returningWorker}
              onChange={setReturningWorker}
              disabled={personalUsed}
            />
            {!personalUsed && !returningWorker && (
              <div>
                <NumberField
                  id="phonePriceNpr"
                  label="Phone price (NPR) · फोनको मूल्य"
                  suffix="Rs"
                  value={phonePriceNpr}
                  onChange={setPhonePriceNpr}
                />
                <p className="text-[11px] text-slate-500 mt-1.5 leading-snug">
                  Use the bill / invoice value (CIF). Approx slab rates:{' '}
                  ≤ Rs 10k → 15% · Rs 10k–25k → 18% · Rs 25k–50k → 25% · Rs
                  50k–1 lakh → 35% · &gt; 1 lakh → 40%+
                </p>
              </div>
            )}
            <p className="text-[11px] text-amber-700 leading-snug">
              ⚠ All phones — even duty-free ones — must have their IMEI
              registered at the customs desk on arrival, or the SIM gets blocked
              on Nepali networks after the visitor window.
            </p>
          </FormSection>
        )}

        {/* Actions */}
        <div className="px-4 py-4 sm:px-5 flex items-center gap-3">
          <button
            type="submit"
            className="rounded-lg bg-[#09383e] px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110 transition-all cursor-pointer"
          >
            Calculate
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="text-sm text-slate-500 hover:text-[#09383e] underline-offset-2 hover:underline transition-colors"
          >
            Reset
          </button>
        </div>
      </form>

      {/* ============================ RESULT ============================ */}
      <aside
        className="lg:sticky lg:top-24 lg:self-start space-y-3"
        aria-live="polite"
      >
        {result === null ? (
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Customs verdict · भन्सार नतिजा
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Pick an item, enter the details, and press <strong>Calculate</strong> to
              see whether it&apos;s free, taxable, or restricted.
            </p>
          </div>
        ) : (
          <>
            <VerdictCard result={result} />
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Details
              </p>
              <p className="text-sm text-slate-700 leading-relaxed mb-3">
                {result.detail}
              </p>
              {result.note && (
                <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
                  {result.note}
                </p>
              )}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed px-1">
              Rules reflect the FY 2083/84 passenger-baggage schedule (Finance
              Act 2083). Confirm at your arrival port — the customs value of
              gold, the exchange rate and reference prices change daily.
            </p>
          </>
        )}
      </aside>
    </div>
  )
}

// =============================================================================
// Primitives
// =============================================================================

function FormSection({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="px-4 py-4 sm:px-5">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#09383e] mb-2">
        {label}
      </p>
      {hint && <p className="text-xs text-slate-500 mb-3 leading-snug">{hint}</p>}
      <div className={`space-y-3 ${hint ? '' : 'mt-2'}`}>{children}</div>
    </div>
  )
}

function WeightField({
  id,
  label,
  value,
  onChange,
  unit,
  onUnitChange,
  helpHint,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  unit: WeightUnit
  onUnitChange: (u: WeightUnit) => void
  helpHint?: string
}) {
  const numeric = Number(value) || 0
  const grams = toGrams(numeric, unit)
  const otherUnitLabel =
    unit === 'tola' ? formatGrams(grams) : formatTola(grams)
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2 mb-1">
        <label htmlFor={id} className="block text-xs font-medium text-slate-700">
          {label}
        </label>
        <div
          role="tablist"
          aria-label="Weight unit"
          className="inline-flex rounded-md border border-slate-200 bg-slate-50 p-0.5 text-[11px]"
        >
          {(['tola', 'g'] as WeightUnit[]).map((u) => (
            <button
              key={u}
              type="button"
              role="tab"
              aria-selected={unit === u}
              onClick={() => onUnitChange(u)}
              className={`px-2 py-0.5 rounded font-medium transition-colors ${
                unit === u
                  ? 'bg-white text-[#09383e] shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {u === 'tola' ? 'tola' : 'gram'}
            </button>
          ))}
        </div>
      </div>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={0}
          step="any"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full rounded-lg border border-slate-200 bg-white text-sm text-slate-900 px-3 py-2.5 pr-12 focus:outline-none focus:ring-2 focus:ring-[#09383e]/20 focus:border-[#09383e]/40 transition-colors"
          placeholder="0"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">
          {unit === 'tola' ? 'tola' : 'g'}
        </span>
      </div>
      {numeric > 0 && (
        <p className="text-[11px] text-slate-500 mt-1.5">
          ≈ <span className="tabular-nums">{otherUnitLabel}</span>
        </p>
      )}
      {helpHint && (
        <p className="text-[11px] text-slate-500 mt-2 leading-snug">{helpHint}</p>
      )}
    </div>
  )
}

function GoldPriceField({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <NumberField
        id="goldPrice"
        label="Gold value per tola (optional) · प्रति तोला सुनको मूल्य (ऐच्छिक)"
        suffix="Rs"
        value={value}
        onChange={onChange}
      />
      <p className="text-[11px] text-slate-500 mt-1.5 leading-snug">
        Customs uses the international price at the NRB exchange rate, which is
        a little below the Kathmandu retail price. Leave blank to see the rule
        only.
      </p>
    </div>
  )
}

function NumberField({
  id,
  label,
  value,
  onChange,
  suffix,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  suffix?: string
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-medium text-slate-700 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={0}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`block w-full rounded-lg border border-slate-200 bg-white text-sm text-slate-900 px-3 py-2.5 ${
            suffix ? 'pr-10' : ''
          } focus:outline-none focus:ring-2 focus:ring-[#09383e]/20 focus:border-[#09383e]/40 transition-colors`}
          placeholder="0"
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}

function Checkbox({
  id,
  label,
  checked,
  onChange,
  disabled,
}: {
  id: string
  label: string
  checked: boolean
  onChange: (v: boolean) => void
  disabled?: boolean
}) {
  return (
    <label
      htmlFor={id}
      className={`flex items-start gap-3 cursor-pointer ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#09383e] focus:ring-[#09383e]/30 cursor-pointer disabled:cursor-not-allowed"
      />
      <span className="text-sm text-slate-700 leading-snug select-none">
        {label}
      </span>
    </label>
  )
}

function VerdictCard({ result }: { result: CalcResult }) {
  const tone =
    result.verdict === 'free'
      ? { border: 'border-emerald-500', color: '#059669', label: 'Free of duty' }
      : result.verdict === 'pay'
      ? { border: 'border-[#09383e]', color: TEAL, label: 'Pay customs duty' }
      : { border: 'border-red-500', color: '#dc2626', label: 'Not allowed' }
  return (
    <div className={`rounded-xl border-2 ${tone.border} bg-white p-5`}>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
        {tone.label}
      </p>
      <p
        className="font-display font-bold text-4xl mb-2 leading-none"
        style={{ color: tone.color }}
      >
        {result.headline}
      </p>
      {typeof result.taxRs === 'number' && result.taxRs > 0 && (
        <p className="text-sm text-slate-600">
          Approx duty:{' '}
          <strong className="tabular-nums" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {formatNpr(result.taxRs)}
          </strong>
        </p>
      )}
    </div>
  )
}
