'use client'

import { useMemo, useState } from 'react'
import {
  computeSalaryTax,
  formatNpr,
  formatPercent,
  type CalculatorInputs,
  type FilingStatus,
} from '@/lib/tax/fy-2081-82'

const TEAL = '#09383e'

const DEFAULT_INPUTS: CalculatorInputs = {
  monthlyBasic: 0,
  monthlyAllowances: 0,
  festivalBonus: 0,
  status: 'single',
  citContribution: 0,
  lifeInsurancePremium: 0,
  healthInsurancePremium: 0,
  ssfContribution: 0,
  pfContribution: 0,
}

export function SalaryTaxCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS)

  const result = useMemo(() => computeSalaryTax(inputs), [inputs])

  function set<K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-6">
      {/* ============================ INPUTS ============================ */}
      <form
        className="space-y-4"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Salary tax calculator inputs"
      >
        {/* Filing status */}
        <fieldset className="rounded-xl border border-slate-200 bg-white p-4">
          <legend className="px-1 text-sm font-semibold text-slate-900">
            Filing status
          </legend>
          <div className="grid grid-cols-2 gap-2 mt-1">
            {(['single', 'couple'] as FilingStatus[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => set('status', s)}
                className={`rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                  inputs.status === s
                    ? 'border-[#09383e] bg-[#09383e]/5 text-[#09383e]'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
                aria-pressed={inputs.status === s}
              >
                {s === 'single' ? 'Single / Unmarried' : 'Married / Couple'}
              </button>
            ))}
          </div>
        </fieldset>

        {/* Income */}
        <InputSection
          title="Income"
          subtitle="annual gross — basic + allowances + bonus"
          tone="in"
        >
          <NumberField
            id="monthlyBasic"
            label="Monthly basic salary"
            help="Your basic pay (excludes allowances)."
            value={inputs.monthlyBasic}
            onChange={(v) => set('monthlyBasic', v)}
          />
          <NumberField
            id="monthlyAllowances"
            label="Monthly allowances"
            help="Dearness, transport, communication, grade — combined."
            value={inputs.monthlyAllowances}
            onChange={(v) => set('monthlyAllowances', v)}
          />
          <NumberField
            id="festivalBonus"
            label="Festival bonus (Dashain Kharcha)"
            help="One-off annual bonus. Typically equals 1 month's basic."
            value={inputs.festivalBonus}
            onChange={(v) => set('festivalBonus', v)}
          />
        </InputSection>

        {/* Retirement contributions */}
        <InputSection
          title="Retirement contributions"
          subtitle="combined SSF + PF + CIT — capped at lowest of actual / 1/3 of gross / Rs 5,00,000"
          tone="retire"
        >
          <NumberField
            id="ssf"
            label="SSF (Social Security Fund)"
            help="Annual employee contribution. Any non-zero amount also makes the first slab 0% (1% SST exemption)."
            value={inputs.ssfContribution}
            onChange={(v) => set('ssfContribution', v)}
          />
          <NumberField
            id="pf"
            label="PF / EPF (Provident Fund)"
            help="Annual employee contribution."
            value={inputs.pfContribution}
            onChange={(v) => set('pfContribution', v)}
          />
          <NumberField
            id="cit"
            label="CIT (Citizen Investment Trust)"
            help="Annual contribution. Counts toward the combined retirement cap above."
            value={inputs.citContribution}
            onChange={(v) => set('citContribution', v)}
          />
        </InputSection>

        {/* Other deductions */}
        <InputSection
          title="Other annual deductions"
          subtitle="capped individually, applied separately from the retirement cap"
          tone="other"
        >
          <NumberField
            id="life"
            label="Life insurance premium"
            help="Capped at Rs 40,000."
            value={inputs.lifeInsurancePremium}
            onChange={(v) => set('lifeInsurancePremium', v)}
            cap={40_000}
          />
          <NumberField
            id="health"
            label="Health insurance premium"
            help="Capped at Rs 20,000."
            value={inputs.healthInsurancePremium}
            onChange={(v) => set('healthInsurancePremium', v)}
            cap={20_000}
          />
        </InputSection>

        <button
          type="button"
          onClick={() => setInputs(DEFAULT_INPUTS)}
          className="text-sm text-slate-500 hover:text-[#09383e] underline-offset-2 hover:underline transition-colors"
        >
          Reset to defaults
        </button>
      </form>

      {/* ============================ RESULTS ============================ */}
      <aside
        className="space-y-4 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto scrollbar-hide"
        aria-live="polite"
      >
        {/* Headline */}
        <div className="rounded-xl border-2 border-[#09383e] bg-white p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
            Your monthly TDS
          </p>
          <p
            className="font-display font-bold text-4xl mb-2 leading-none tabular-nums"
            style={{ color: TEAL, fontVariantNumeric: 'tabular-nums' }}
          >
            {formatNpr(result.monthlyTds)}
          </p>
          <p className="text-sm text-slate-600">
            Annual tax{' '}
            <span className="tabular-nums" style={{ fontVariantNumeric: 'tabular-nums' }}>
              {formatNpr(result.annualTax)}
            </span>{' '}
            · Effective{' '}
            <span className="tabular-nums" style={{ fontVariantNumeric: 'tabular-nums' }}>
              {formatPercent(result.effectiveRate)}
            </span>
          </p>
        </div>

        {/* Income summary */}
        <ResultCard
          title="Income summary"
          subtitle="gross → taxable"
          tone="in"
          total={{
            label: 'Taxable income',
            value: formatNpr(result.taxableIncome),
          }}
        >
          <DataRow
            label="Annual gross income"
            value={formatNpr(result.grossAnnualIncome)}
          />
          <DataRow
            label="Total deductions"
            sublabel="retirement + life + health"
            value={formatNpr(result.totalDeductions)}
            negative
          />
        </ResultCard>

        {/* Retirement deduction */}
        {result.combinedRetirementInput > 0 && (
          <ResultCard
            title="Retirement deduction"
            subtitle="combined cap — lowest of three"
            tone="retire"
            total={{
              label: 'Allowed deduction',
              sublabel: bindingLabel(result.retirementBindingRule),
              value: formatNpr(result.allowedRetirementDeduction),
            }}
          >
            <CapRow
              label="Actual contribution"
              sublabel="SSF + PF + CIT entered"
              value={result.combinedRetirementInput}
              binding={result.retirementBindingRule === 'actual'}
            />
            <CapRow
              label="1/3 of gross income"
              value={result.oneThirdGrossLimit}
              binding={result.retirementBindingRule === 'one-third-gross'}
            />
            <CapRow
              label="Statutory cap"
              value={result.absoluteRetirementCap}
              binding={result.retirementBindingRule === 'absolute-cap'}
            />
            {result.allowedRetirementDeduction < result.combinedRetirementInput && (
              <div className="mt-2 -mx-1 px-3 py-2 rounded-md bg-amber-50 border border-amber-200">
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>{formatNpr(
                    result.combinedRetirementInput -
                      result.allowedRetirementDeduction,
                  )}</strong>{' '}
                  exceeds the cap and won&apos;t reduce your taxable income (still
                  saved into retirement accounts).
                </p>
              </div>
            )}
          </ResultCard>
        )}

        {/* Other deductions */}
        {(result.lifeInsuranceDeduction > 0 ||
          result.healthInsuranceDeduction > 0) && (
          <ResultCard
            title="Other deductions"
            subtitle="applied separately from retirement"
            tone="other"
          >
            {result.lifeInsuranceDeduction > 0 && (
              <DataRow
                label="Life insurance"
                value={formatNpr(result.lifeInsuranceDeduction)}
              />
            )}
            {result.healthInsuranceDeduction > 0 && (
              <DataRow
                label="Health insurance"
                value={formatNpr(result.healthInsuranceDeduction)}
              />
            )}
          </ResultCard>
        )}

        {/* Slab breakdown */}
        <ResultCard
          title={`Slab breakdown · ${inputs.status === 'single' ? 'Single' : 'Couple'}`}
          subtitle={
            result.ssfParticipant
              ? '1% SST slab → 0% (SSF participant)'
              : 'standard slabs'
          }
          tone="tax"
          total={{
            label: 'Annual tax',
            value: formatNpr(result.annualTax),
          }}
        >
          {result.breakdown.map((b) => {
            const active = b.amountInBracket > 0
            return (
              <div
                key={b.label}
                className={`flex items-baseline justify-between gap-3 py-2 border-b border-slate-100 last:border-0 ${
                  !active ? 'opacity-50' : ''
                }`}
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-slate-700 leading-tight">{b.label}</p>
                  <p
                    className="text-xs text-slate-400 leading-tight mt-0.5 tabular-nums"
                    style={{ fontVariantNumeric: 'tabular-nums' }}
                  >
                    {formatNpr(b.amountInBracket)} × {(b.rate * 100).toFixed(b.rate === 0.075 ? 1 : 0)}%
                  </p>
                </div>
                <span
                  className="text-sm font-medium text-slate-900 whitespace-nowrap tabular-nums"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {formatNpr(b.taxFromBracket)}
                </span>
              </div>
            )
          })}
        </ResultCard>

        {/* Disclaimer */}
        <p className="text-xs text-slate-500 leading-relaxed px-1">
          Standard salaried-employee slabs from Finance Act 2081 (FY 2081/82). Edge
          cases — disability, women&apos;s rebate, remote-area allowance, foreign
          income — not modelled. Verify with your CA before filing.
        </p>
      </aside>
    </div>
  )
}

function bindingLabel(rule: 'actual' | 'one-third-gross' | 'absolute-cap'): string {
  if (rule === 'actual') return 'actual contribution applies'
  if (rule === 'one-third-gross') return '1/3 of gross binds'
  return 'statutory cap binds'
}

// =============================================================================
// Section / Row primitives — input side (with icon-tinted card headers)
// =============================================================================

type InputTone = 'in' | 'retire' | 'other'

function InputSection({
  title,
  subtitle,
  tone,
  children,
}: {
  title: string
  subtitle?: string
  tone: InputTone
  children: React.ReactNode
}) {
  const tones: Record<InputTone, { bg: string; fg: string; ring: string }> = {
    in:    { bg: 'bg-emerald-50', fg: 'text-emerald-700', ring: 'ring-emerald-100' },
    retire:{ bg: 'bg-indigo-50',  fg: 'text-indigo-700',  ring: 'ring-indigo-100'  },
    other: { bg: 'bg-slate-100',  fg: 'text-slate-700',   ring: 'ring-slate-200'   },
  }
  const t = tones[tone]
  return (
    <section className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="flex items-start gap-2.5 px-4 py-3 border-b border-slate-200">
        <span
          aria-hidden
          className={`flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg ring-2 ${t.bg} ${t.fg} ${t.ring}`}
        >
          <InputSectionIcon tone={tone} />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900 leading-tight">{title}</p>
          {subtitle && (
            <p className="text-xs text-slate-500 leading-tight mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="px-4 py-4 space-y-3">{children}</div>
    </section>
  )
}

function InputSectionIcon({ tone }: { tone: InputTone }) {
  if (tone === 'in') {
    // arrow-up = income coming in
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    )
  }
  if (tone === 'retire') {
    // shield = retirement / saved
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  }
  // other = sliders
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
  )
}

// =============================================================================
// Section / Row primitives — results side (with icon-tinted card headers)
// =============================================================================

type ResultTone = 'in' | 'retire' | 'other' | 'tax'

function ResultCard({
  title,
  subtitle,
  tone,
  total,
  children,
}: {
  title: string
  subtitle?: string
  tone: ResultTone
  total?: { label: string; sublabel?: string; value: string }
  children: React.ReactNode
}) {
  const tones: Record<ResultTone, { bg: string; fg: string; ring: string }> = {
    in:    { bg: 'bg-emerald-50', fg: 'text-emerald-700', ring: 'ring-emerald-100' },
    retire:{ bg: 'bg-indigo-50',  fg: 'text-indigo-700',  ring: 'ring-indigo-100'  },
    other: { bg: 'bg-slate-100',  fg: 'text-slate-700',   ring: 'ring-slate-200'   },
    tax:   { bg: 'bg-amber-50',   fg: 'text-amber-700',   ring: 'ring-amber-100'   },
  }
  const t = tones[tone]
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="flex items-start gap-2.5 px-4 py-3 border-b border-slate-200">
        <span
          aria-hidden
          className={`flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg ring-2 ${t.bg} ${t.fg} ${t.ring}`}
        >
          <ResultSectionIcon tone={tone} />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900 leading-tight">{title}</p>
          {subtitle && (
            <p className="text-xs text-slate-500 leading-tight mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="px-4 py-2">{children}</div>
      {total && (
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">
          <div className="flex items-baseline justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900">{total.label}</p>
              {total.sublabel && (
                <p className="text-xs text-slate-400 mt-0.5">{total.sublabel}</p>
              )}
            </div>
            <span
              className="text-base font-bold text-slate-900 tabular-nums whitespace-nowrap"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {total.value}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

function ResultSectionIcon({ tone }: { tone: ResultTone }) {
  if (tone === 'in') {
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    )
  }
  if (tone === 'retire') {
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  }
  if (tone === 'tax') {
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  }
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
  )
}

function DataRow({
  label,
  sublabel,
  value,
  strong,
  negative,
}: {
  label: string
  sublabel?: string
  value: string
  strong?: boolean
  negative?: boolean
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-2 border-b border-slate-100 last:border-0">
      <div className="min-w-0 flex-1">
        <p className={`text-sm leading-tight ${strong ? 'font-medium text-slate-900' : 'text-slate-700'}`}>
          {label}
        </p>
        {sublabel && (
          <p className="text-xs text-slate-400 leading-tight mt-0.5">{sublabel}</p>
        )}
      </div>
      <span
        className={`text-sm whitespace-nowrap tabular-nums ${
          strong ? 'font-semibold text-slate-900' : negative ? 'text-rose-600' : 'text-slate-900'
        }`}
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {negative && '− '}
        {value}
      </span>
    </div>
  )
}

function CapRow({
  label,
  sublabel,
  value,
  binding,
}: {
  label: string
  sublabel?: string
  value: number
  binding: boolean
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-3 py-2 border-b border-slate-100 last:border-0 ${
        binding ? '' : 'opacity-70'
      }`}
    >
      <div className="min-w-0 flex-1 flex items-start gap-2">
        {binding && (
          <span
            aria-hidden
            className="mt-1.5 flex-shrink-0 inline-block w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: TEAL }}
          />
        )}
        <div className="min-w-0">
          <p
            className={`text-sm leading-tight ${
              binding ? 'font-semibold text-[#09383e]' : 'text-slate-700'
            }`}
          >
            {label}
          </p>
          {sublabel && (
            <p className="text-xs text-slate-400 leading-tight mt-0.5">{sublabel}</p>
          )}
        </div>
      </div>
      <span
        className={`text-sm whitespace-nowrap tabular-nums ${
          binding ? 'font-semibold text-[#09383e]' : 'text-slate-500'
        }`}
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {formatNpr(value)}
      </span>
    </div>
  )
}

// =============================================================================
// Number input
// =============================================================================

function NumberField({
  id,
  label,
  help,
  value,
  onChange,
  cap,
}: {
  id: string
  label: string
  help?: string
  value: number
  onChange: (v: number) => void
  cap?: number
}) {
  const hasOverflow = cap !== undefined && value > cap
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-900 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 select-none pointer-events-none">
          Rs
        </span>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={0}
          step={1000}
          placeholder="0"
          value={value === 0 ? '' : Number.isFinite(value) ? value : ''}
          onChange={(e) => {
            const raw = e.target.value
            if (raw === '') {
              onChange(0)
              return
            }
            const n = Number(raw)
            onChange(Number.isFinite(n) ? n : 0)
          }}
          onFocus={(e) => e.currentTarget.select()}
          onWheel={(e) => e.currentTarget.blur()}
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault()
          }}
          className="w-full rounded-lg border border-slate-200 bg-white pl-9 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#09383e]/20 focus:border-[#09383e]"
        />
      </div>
      {help && (
        <p className="text-xs text-slate-500 mt-1.5 leading-snug">
          {help}
          {hasOverflow && (
            <span className="text-amber-700 ml-1">
              (Excess will be ignored — only Rs {cap?.toLocaleString('en-IN')} counts.)
            </span>
          )}
        </p>
      )}
    </div>
  )
}
