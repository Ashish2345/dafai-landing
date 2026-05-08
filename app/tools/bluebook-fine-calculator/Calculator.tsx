'use client'

import { useMemo, useState } from 'react'
import {
  computeBluebookFine,
  formatNprBluebook,
  formatPercentBluebook,
  getTiers,
  PROVINCE_LABELS,
  SUPPORTED_PROVINCES,
  type BluebookInputs,
  type Province,
  type VehicleType,
} from '@/lib/tax/bluebook-fine'

const TEAL = '#09383e'

function todayYmd(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const ALL_PROVINCES: Province[] = [
  'bagmati',
  'koshi',
  'madhesh',
  'gandaki',
  'lumbini',
  'karnali',
  'sudurpaschim',
]

const DEFAULTS: BluebookInputs = {
  vehicleType: 'two-wheeler',
  cc: 0,
  province: 'bagmati',
  expiryDate: '',
  asOfDate: todayYmd(),
  baseTaxOverride: 0,
}

export function BluebookCalculator() {
  const [inputs, setInputs] = useState<BluebookInputs>(DEFAULTS)
  const [useOverride, setUseOverride] = useState(false)

  const result = useMemo(() => {
    return computeBluebookFine({
      ...inputs,
      baseTaxOverride: useOverride ? inputs.baseTaxOverride : 0,
    })
  }, [inputs, useOverride])

  function set<K extends keyof BluebookInputs>(key: K, value: BluebookInputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  const provinceSupported = SUPPORTED_PROVINCES.includes(inputs.province)
  const tiers = provinceSupported ? getTiers(inputs.province, inputs.vehicleType) : null
  const matchedTier = tiers
    ? tiers.find((t, i, arr) =>
        t.upTo === null
          ? inputs.cc > (arr[i - 1]?.upTo ?? 0)
          : inputs.cc <= t.upTo,
      )
    : null

  const ready =
    inputs.expiryDate &&
    inputs.asOfDate &&
    ((provinceSupported && inputs.cc > 0) ||
      (useOverride && (inputs.baseTaxOverride ?? 0) > 0))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
      {/* ============================ INPUTS ============================ */}
      <form
        className="rounded-xl border border-slate-200 bg-white divide-y divide-slate-200"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Bluebook fine calculator inputs"
      >
        {/* Vehicle */}
        <FormSection label="Vehicle">
          <div className="grid grid-cols-2 gap-2">
            {(['two-wheeler', 'four-wheeler'] as VehicleType[]).map((vt) => (
              <button
                key={vt}
                type="button"
                onClick={() => set('vehicleType', vt)}
                aria-pressed={inputs.vehicleType === vt}
                className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                  inputs.vehicleType === vt
                    ? 'border-[#09383e] bg-[#09383e]/5 text-[#09383e]'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                {vt === 'two-wheeler' ? 'Two-wheeler' : 'Four-wheeler'}
              </button>
            ))}
          </div>
          <NumberField
            id="cc"
            label="Engine capacity"
            inlineLabel="cc"
            value={inputs.cc}
            onChange={(v) => set('cc', Math.floor(v))}
            integer
            help={
              matchedTier
                ? `Tier: ${matchedTier.label}`
                : provinceSupported
                  ? undefined
                  : useOverride
                    ? undefined
                    : 'No rate table — enable manual base tax below.'
            }
          />
        </FormSection>

        {/* Province */}
        <FormSection label="Province">
          <select
            value={inputs.province}
            onChange={(e) => set('province', e.target.value as Province)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#09383e]/20 focus:border-[#09383e]"
            aria-label="Province"
          >
            {ALL_PROVINCES.map((p) => {
              const supported = SUPPORTED_PROVINCES.includes(p)
              return (
                <option key={p} value={p}>
                  {PROVINCE_LABELS[p]}
                  {!supported ? ' — manual override needed' : ''}
                </option>
              )
            })}
          </select>

          <label className="flex items-center gap-2 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={useOverride}
              onChange={(e) => setUseOverride(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-[#09383e] focus:ring-[#09383e]"
            />
            <span className="text-sm text-slate-700">
              Enter base tax manually
            </span>
          </label>

          {useOverride && (
            <NumberField
              id="overrideTax"
              label="Base vehicle tax (annual)"
              value={inputs.baseTaxOverride ?? 0}
              onChange={(v) => set('baseTaxOverride', v)}
            />
          )}
        </FormSection>

        {/* Dates */}
        <FormSection label="Dates">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DateField
              id="expiry"
              label="Registration expiry"
              value={inputs.expiryDate}
              onChange={(v) => set('expiryDate', v)}
            />
            <DateField
              id="asof"
              label="As of"
              value={inputs.asOfDate}
              onChange={(v) => set('asOfDate', v)}
            />
          </div>
          <button
            type="button"
            onClick={() => {
              setInputs(DEFAULTS)
              setUseOverride(false)
            }}
            className="text-xs text-slate-500 hover:text-[#09383e] underline-offset-2 hover:underline transition-colors mt-1"
          >
            Reset
          </button>
        </FormSection>
      </form>

      {/* ============================ RESULTS ============================ */}
      <aside
        className="lg:sticky lg:top-24 lg:self-start space-y-4"
        aria-live="polite"
      >
        {!ready ? (
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-600 leading-relaxed">
              Fill in vehicle, province (or manual base tax), and your registration
              expiry date to see the breakdown.
            </p>
          </div>
        ) : (
          <>
            {/* Headline */}
            <div className="rounded-xl border-2 border-[#09383e] bg-white p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                Total payable today
              </p>
              <p
                className="font-display font-bold text-4xl mb-2 leading-none tabular-nums"
                style={{ color: TEAL, fontVariantNumeric: 'tabular-nums' }}
              >
                {formatNprBluebook(result.totalPayable)}
              </p>
              <p className="text-sm text-slate-600">
                {result.daysLate !== null && result.daysLate > 0 ? (
                  <>
                    <strong className="tabular-nums" style={{ fontVariantNumeric: 'tabular-nums' }}>
                      {result.daysLate} days
                    </strong>{' '}
                    late · penalty{' '}
                    {formatPercentBluebook(result.penaltyRate)}
                    {result.isPastFyEnd && ' (past FY end)'}
                  </>
                ) : (
                  <>On time — no penalty.</>
                )}
              </p>
            </div>

            {/* Combined breakdown */}
            <div className="rounded-xl border border-slate-200 bg-white divide-y divide-slate-100">
              <BreakdownRow
                label="Base vehicle tax"
                sublabel={
                  result.baseTaxIsOverride
                    ? 'manual override'
                    : result.tier
                      ? `${PROVINCE_LABELS[result.province]} · ${result.tier.label}`
                      : ''
                }
                value={formatNprBluebook(result.baseTax)}
              />
              <BreakdownRow
                label={`Penalty · ${formatPercentBluebook(result.penaltyRate)}`}
                sublabel={
                  result.appliedBand
                    ? result.appliedBand.label
                    : 'within grace period'
                }
                value={formatNprBluebook(result.penaltyAmount)}
                negative={result.penaltyAmount > 0}
              />
              <BreakdownRow
                label="Total payable"
                value={formatNprBluebook(result.totalPayable)}
                strong
                accent
              />
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-slate-500 leading-relaxed px-1">
              Rates revise annually via provincial Finance Act — verify against your
              transport-office leaflet. Excludes pollution tax, insurance, road tax,
              and route-permit fees.
            </p>
          </>
        )}
      </aside>
    </div>
  )
}

// =============================================================================
// Compact form section (no per-section card chrome — just a small label)
// =============================================================================

function FormSection({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="px-4 py-4 sm:px-5">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#09383e] mb-3">
        {label}
      </p>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

// =============================================================================
// Right-side breakdown row
// =============================================================================

function BreakdownRow({
  label,
  sublabel,
  value,
  strong,
  accent,
  negative,
}: {
  label: string
  sublabel?: string
  value: string
  strong?: boolean
  accent?: boolean
  negative?: boolean
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-3 px-4 py-3.5 sm:px-5 ${
        strong ? 'bg-slate-50' : ''
      }`}
    >
      <div className="min-w-0 flex-1">
        <p className={`text-sm leading-tight ${strong ? 'font-semibold text-slate-900' : 'text-slate-700'}`}>
          {label}
        </p>
        {sublabel && (
          <p className="text-xs text-slate-400 leading-tight mt-0.5">{sublabel}</p>
        )}
      </div>
      <span
        className={`whitespace-nowrap tabular-nums ${
          strong
            ? `text-base font-bold ${accent ? 'text-[#09383e]' : 'text-slate-900'}`
            : negative
              ? 'text-sm text-rose-600'
              : 'text-sm text-slate-900'
        }`}
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {negative && '+ '}
        {value}
      </span>
    </div>
  )
}

// =============================================================================
// Field primitives
// =============================================================================

function NumberField({
  id,
  label,
  help,
  value,
  onChange,
  integer,
  inlineLabel,
}: {
  id: string
  label: string
  help?: string
  value: number
  onChange: (v: number) => void
  integer?: boolean
  inlineLabel?: string
}) {
  const prefix = integer ? null : 'Rs'
  const suffix = inlineLabel ?? null
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-700 mb-1.5"
      >
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 select-none pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={0}
          step={integer ? 1 : 100}
          placeholder="0"
          value={value === 0 ? '' : Number.isFinite(value) ? value : ''}
          onChange={(e) => {
            const raw = e.target.value
            if (raw === '') return onChange(0)
            const n = Number(raw)
            onChange(Number.isFinite(n) ? n : 0)
          }}
          onFocus={(e) => e.currentTarget.select()}
          onWheel={(e) => e.currentTarget.blur()}
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault()
          }}
          className={`w-full rounded-lg border border-slate-200 bg-white py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#09383e]/20 focus:border-[#09383e] ${
            prefix ? 'pl-9' : 'pl-4'
          } ${suffix ? 'pr-12' : 'pr-4'}`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 select-none pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
      {help && <p className="text-xs text-slate-500 mt-1.5 leading-snug">{help}</p>}
    </div>
  )
}

function DateField({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-700 mb-1.5"
      >
        {label}
      </label>
      <input
        id={id}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#09383e]/20 focus:border-[#09383e]"
      />
    </div>
  )
}
