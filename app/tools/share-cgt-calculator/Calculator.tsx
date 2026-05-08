'use client'

import { useMemo, useState } from 'react'
import {
  computeCgt,
  formatNprCgt,
  formatPercentCgt,
  type CgtInputs,
  type InvestorType,
} from '@/lib/tax/nepse-cgt'

const TEAL = '#09383e'

const DEFAULT_INPUTS: CgtInputs = {
  quantity: 0,
  buyPrice: 0,
  sellPrice: 0,
  buyDate: '',
  sellDate: '',
  investorType: 'individual',
}

export function NepseCgtCalculator() {
  const [inputs, setInputs] = useState<CgtInputs>(DEFAULT_INPUTS)

  const result = useMemo(() => computeCgt(inputs), [inputs])

  function set<K extends keyof CgtInputs>(key: K, value: CgtInputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  const hasTrade = inputs.quantity > 0 && inputs.buyPrice > 0 && inputs.sellPrice > 0
  const dateError =
    inputs.buyDate && inputs.sellDate && result.holdingDays === null
      ? 'Sell date must be on or after buy date.'
      : null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
      {/* ============================ INPUTS ============================ */}
      <form
        className="rounded-xl border border-slate-200 bg-white divide-y divide-slate-200"
        onSubmit={(e) => e.preventDefault()}
        aria-label="NEPSE CGT calculator inputs"
      >
        {/* Investor type */}
        <FormSection
          label="Investor type"
          hint={
            inputs.investorType === 'individual'
              ? 'CGT: 7.5% if held ≤ 365 days, 5% if > 365 days'
              : 'CGT: 10% flat (no holding-period rule)'
          }
        >
          <div className="grid grid-cols-2 gap-2">
            {(['individual', 'institutional'] as InvestorType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => set('investorType', t)}
                aria-pressed={inputs.investorType === t}
                className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                  inputs.investorType === t
                    ? 'border-[#09383e] bg-[#09383e]/5 text-[#09383e]'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                {t === 'individual' ? 'Individual' : 'Institutional'}
              </button>
            ))}
          </div>
        </FormSection>

        {/* Trade details */}
        <FormSection label="Trade">
          <NumberField
            id="qty"
            label="Quantity (shares)"
            value={inputs.quantity}
            onChange={(v) => set('quantity', Math.floor(v))}
            integer
          />
          <div className="grid grid-cols-2 gap-3">
            <NumberField
              id="buyPrice"
              label="Buy price"
              value={inputs.buyPrice}
              onChange={(v) => set('buyPrice', v)}
            />
            <NumberField
              id="sellPrice"
              label="Sell price"
              value={inputs.sellPrice}
              onChange={(v) => set('sellPrice', v)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <DateField
              id="buyDate"
              label="Buy date"
              value={inputs.buyDate}
              onChange={(v) => set('buyDate', v)}
            />
            <DateField
              id="sellDate"
              label="Sell date"
              value={inputs.sellDate}
              onChange={(v) => set('sellDate', v)}
            />
          </div>
          {dateError && (
            <p className="text-[11px] text-amber-700">{dateError}</p>
          )}
          <button
            type="button"
            onClick={() => setInputs(DEFAULT_INPUTS)}
            className="text-xs text-slate-500 hover:text-[#09383e] underline-offset-2 hover:underline transition-colors mt-1"
          >
            Reset
          </button>
        </FormSection>
      </form>

      {/* ============================ RESULTS ============================ */}
      <aside
        className="lg:sticky lg:top-24 lg:self-start space-y-3"
        aria-live="polite"
      >
        {!hasTrade ? (
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-600 leading-relaxed">
              Enter quantity, buy & sell prices to see the breakdown.
            </p>
          </div>
        ) : (
          <>
            {/* Headline */}
            <div className="rounded-xl border-2 border-[#09383e] bg-white p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                {result.netProfit >= 0 ? 'Net profit' : 'Net loss'}
              </p>
              <p
                className="font-display font-bold text-4xl mb-2 leading-none tabular-nums"
                style={{
                  color: result.netProfit >= 0 ? TEAL : '#b91c1c',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {formatNprCgt(Math.abs(result.netProfit))}
              </p>
              <p className="text-sm text-slate-600 mb-1">
                Bank credit:{' '}
                <strong className="tabular-nums" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {formatNprCgt(result.netReceivedInBank)}
                </strong>
              </p>
              <p className="text-xs text-slate-500">
                {result.holdingDays !== null
                  ? `${result.holdingDays} days · `
                  : 'Dates not set · '}
                CGT {formatPercentCgt(result.cgtRate, result.cgtRate === 0.075 ? 1 : 0)}
                {result.holdingDays !== null && (
                  <span> ({result.isLongTerm ? 'long-term' : 'short-term'})</span>
                )}
              </p>
            </div>

            {/* Combined breakdown */}
            <div className="rounded-xl border border-slate-200 bg-white divide-y divide-slate-200">
              <ResultSection label="Buy leg" hint="cash out">
                <Row
                  label="Shares value"
                  sublabel={`${result.quantity} × ${formatNprCgt(result.buyPrice)}`}
                  value={formatNprCgt(result.buyTurnover)}
                />
                <Row
                  label="Broker commission"
                  sublabel={`@ ${formatPercentCgt(result.buyCommissionRate, 2)}`}
                  value={formatNprCgt(result.buyCommission)}
                />
                <Row label="SEBON @ 0.015%" value={formatNprCgt(result.buySebonFee)} />
                <Row label="DP charge" value={formatNprCgt(result.buyDpCharge)} />
                <Row label="Total cost" value={formatNprCgt(result.totalBuyCost)} strong />
              </ResultSection>

              <ResultSection label="Sell leg" hint="gross & expenses">
                <Row
                  label="Shares value"
                  sublabel={`${result.quantity} × ${formatNprCgt(result.sellPrice)}`}
                  value={formatNprCgt(result.sellTurnover)}
                />
                <Row
                  label="Broker commission"
                  sublabel={`@ ${formatPercentCgt(result.sellCommissionRate, 2)}`}
                  value={formatNprCgt(result.sellCommission)}
                  negative
                />
                <Row label="SEBON @ 0.015%" value={formatNprCgt(result.sellSebonFee)} negative />
                <Row label="DP charge" value={formatNprCgt(result.sellDpCharge)} negative />
                <Row
                  label="Net proceeds"
                  sublabel="before CGT"
                  value={formatNprCgt(result.sellTurnover - result.totalSellExpenses)}
                  strong
                />
              </ResultSection>

              <ResultSection
                label="Capital gain & tax"
                hint={
                  result.capitalGain > 0
                    ? `${formatPercentCgt(result.cgtRate, result.cgtRate === 0.075 ? 1 : 0)} CGT`
                    : 'no CGT'
                }
              >
                <Row label="Gross profit / (loss)" value={formatNprCgt(result.grossProfit)} negative={result.grossProfit < 0} />
                <Row
                  label="Total tx costs"
                  sublabel="6 expense lines"
                  value={formatNprCgt(result.totalTransactionCosts)}
                  negative
                />
                <Row
                  label={result.capitalGain >= 0 ? 'Capital gain' : 'Capital loss'}
                  value={formatNprCgt(result.capitalGain)}
                  negative={result.capitalGain < 0}
                  strong
                />
                {result.capitalGain > 0 && (
                  <Row
                    label="CGT"
                    sublabel={`@ ${formatPercentCgt(result.cgtRate, result.cgtRate === 0.075 ? 1 : 0)}`}
                    value={formatNprCgt(result.cgtAmount)}
                    negative
                  />
                )}
              </ResultSection>

              <ResultSection label="Bottom line">
                <Row
                  label={result.netProfit >= 0 ? 'Net profit' : 'Net loss'}
                  value={formatNprCgt(result.netProfit)}
                  strong
                />
                <Row label="Bank credit" value={formatNprCgt(result.netReceivedInBank)} strong accent />
                {result.totalBuyCost > 0 && (
                  <Row
                    label="Return on investment"
                    value={formatPercentCgt(result.effectiveReturnOnInvestment, 2)}
                  />
                )}
              </ResultSection>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed px-1">
              SEBON regulation, CDSC schedule, Income Tax Act 2058 + Finance Act
              2081. Excludes mutual funds, IPO/FPO/auction shares, bonus/right
              cost-base, NRN/foreign rates.
            </p>
          </>
        )}
      </aside>
    </div>
  )
}

// =============================================================================
// Compact form & result sections
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

function ResultSection({
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
      <div className="flex items-baseline justify-between gap-2 mb-2.5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#09383e]">
          {label}
        </p>
        {hint && (
          <p className="text-[11px] text-slate-400 truncate ml-2 normal-case tracking-normal">
            {hint}
          </p>
        )}
      </div>
      <div>{children}</div>
    </div>
  )
}

function Row({
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
      className={`flex items-baseline justify-between gap-3 py-2 ${
        strong ? 'mt-1 pt-2.5 border-t border-slate-200' : ''
      }`}
    >
      <div className="min-w-0 flex-1">
        <p className={`text-sm leading-tight ${strong ? 'font-semibold text-slate-900' : 'text-slate-700'}`}>
          {label}
        </p>
        {sublabel && (
          <p className="text-[11px] text-slate-400 leading-tight mt-0.5">{sublabel}</p>
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
        {negative && '− '}
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
  value,
  onChange,
  integer,
}: {
  id: string
  label: string
  value: number
  onChange: (v: number) => void
  integer?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        {!integer && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 select-none pointer-events-none">
            Rs
          </span>
        )}
        <input
          id={id}
          type="number"
          inputMode={integer ? 'numeric' : 'decimal'}
          min={0}
          step={integer ? 1 : 0.01}
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
          className={`w-full rounded-lg border border-slate-200 bg-white ${integer ? 'pl-4' : 'pl-9'} pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#09383e]/20 focus:border-[#09383e]`}
        />
      </div>
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
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">
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
