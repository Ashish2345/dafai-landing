'use client'

import { useMemo, useState } from 'react'
import {
  calculateVat,
  formatNprVat,
  sumVatRows,
  VAT_RATE,
  type VatMode,
} from '@/lib/tax/vat-nepal'

const TEAL = '#09383e'

type Line = {
  id: string
  label: string
  amount: number
}

let _idCounter = 0
function newId(): string {
  _idCounter += 1
  return `line-${_idCounter}`
}

const INITIAL_LINES: Line[] = [{ id: newId(), label: '', amount: 0 }]

export function VatCalculator() {
  const [mode, setMode] = useState<VatMode>('exclusive')
  const [lines, setLines] = useState<Line[]>(INITIAL_LINES)

  const computedRows = useMemo(
    () => lines.map((line) => ({ ...line, ...calculateVat(line.amount, mode) })),
    [lines, mode],
  )

  const totals = useMemo(() => sumVatRows(computedRows), [computedRows])

  function updateLine(id: string, patch: Partial<Line>) {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)))
  }
  function addLine() {
    setLines((prev) => [...prev, { id: newId(), label: '', amount: 0 }])
  }
  function removeLine(id: string) {
    setLines((prev) => (prev.length === 1 ? prev : prev.filter((l) => l.id !== id)))
  }
  function reset() {
    setLines([{ id: newId(), label: '', amount: 0 }])
    setMode('exclusive')
  }

  const inputColLabel =
    mode === 'exclusive' ? 'Base price' : 'Total price'

  return (
    <div className="space-y-8">
      {/* Mode toggle */}
      <fieldset>
        <legend className="block text-sm font-semibold text-slate-900 mb-3">
          What do you want to do?
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <ModeButton
            active={mode === 'exclusive'}
            onClick={() => setMode('exclusive')}
            iconKind="plus"
            title="Add 13% VAT"
            subtitle="My prices don't include VAT — add 13% to every line."
          />
          <ModeButton
            active={mode === 'inclusive'}
            onClick={() => setMode('inclusive')}
            iconKind="search"
            title="Find 13% VAT"
            subtitle="My prices already include VAT — show 13% inside every line."
          />
        </div>
      </fieldset>

      {/* Line items */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-semibold text-slate-900 text-base">
            Line items
          </h3>
          <span className="text-xs text-slate-500">
            {lines.length} {lines.length === 1 ? 'line' : 'lines'}
          </span>
        </div>

        <div className="space-y-3">
          {lines.map((line, idx) => (
            <LineRow
              key={line.id}
              index={idx}
              label={line.label}
              amount={line.amount}
              inputLabel={inputColLabel}
              onLabelChange={(label) => updateLine(line.id, { label })}
              onAmountChange={(amount) => updateLine(line.id, { amount })}
              onRemove={lines.length > 1 ? () => removeLine(line.id) : undefined}
            />
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={addLine}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#09383e] hover:underline underline-offset-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add line
          </button>
          <button
            type="button"
            onClick={reset}
            className="text-sm text-slate-500 hover:text-[#09383e] underline-offset-2 hover:underline"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Totals */}
      <div
        className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7"
        aria-live="polite"
      >
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-4">
          Invoice totals
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <TotalCard
            label="Subtotal"
            sublabel="excl. VAT"
            value={formatNprVat(totals.totalNet)}
          />
          <TotalCard
            label="VAT (13%)"
            value={formatNprVat(totals.totalVat)}
            highlight
          />
          <TotalCard
            label="Grand total"
            sublabel="incl. VAT"
            value={formatNprVat(totals.totalGross)}
            strong
          />
        </div>
      </div>

      <p className="text-xs text-slate-500 leading-relaxed">
        Calculations use the standard Nepal VAT rate of {(VAT_RATE * 100).toFixed(0)}%
        (VAT Act 2052, last revised by Finance Act 2081). Some goods and services
        are zero-rated or VAT-exempt — for those, the rate above does not apply.
        Amounts are rounded to two decimal places (paisa).
      </p>
    </div>
  )
}

// -----------------------------------------------------------------------------
// Sub-components
// -----------------------------------------------------------------------------

function ModeButton({
  active,
  onClick,
  title,
  subtitle,
  iconKind,
}: {
  active: boolean
  onClick: () => void
  title: string
  subtitle: string
  iconKind: 'plus' | 'search'
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-start gap-3 text-left rounded-xl border p-4 transition-all ${
        active
          ? 'border-[#09383e] bg-[#09383e]/5 ring-2 ring-[#09383e]/20'
          : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      <span
        className={`flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg ${
          active ? 'bg-[#09383e] text-white' : 'bg-slate-100 text-slate-600'
        }`}
        aria-hidden
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.4}
        >
          {iconKind === 'plus' ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          )}
        </svg>
      </span>
      <span className="flex-1 min-w-0">
        <p
          className={`text-sm font-semibold mb-0.5 ${
            active ? 'text-[#09383e]' : 'text-slate-900'
          }`}
        >
          {title}
        </p>
        <p className="text-xs text-slate-500 leading-snug">{subtitle}</p>
      </span>
    </button>
  )
}

function LineRow({
  index,
  label,
  amount,
  inputLabel,
  onLabelChange,
  onAmountChange,
  onRemove,
}: {
  index: number
  label: string
  amount: number
  inputLabel: string
  onLabelChange: (v: string) => void
  onAmountChange: (v: number) => void
  onRemove?: () => void
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_180px_auto] gap-3 items-start">
        {/* Label input */}
        <div className="min-w-0">
          <label
            htmlFor={`label-${index}`}
            className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5"
          >
            Item {index + 1}
          </label>
          <input
            id={`label-${index}`}
            type="text"
            value={label}
            onChange={(e) => onLabelChange(e.target.value)}
            placeholder="e.g. Office stationery"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#09383e]/20 focus:border-[#09383e]"
          />
        </div>

        {/* Amount input */}
        <div>
          <label
            htmlFor={`amount-${index}`}
            className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5 whitespace-nowrap"
          >
            {inputLabel}
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 select-none pointer-events-none">
              Rs
            </span>
            <input
              id={`amount-${index}`}
              type="number"
              inputMode="decimal"
              min={0}
              step={100}
              placeholder="0"
              value={amount === 0 ? '' : Number.isFinite(amount) ? amount : ''}
              onChange={(e) => {
                const raw = e.target.value
                if (raw === '') return onAmountChange(0)
                const n = Number(raw)
                onAmountChange(Number.isFinite(n) ? n : 0)
              }}
              onFocus={(e) => e.currentTarget.select()}
              onWheel={(e) => e.currentTarget.blur()}
              onKeyDown={(e) => {
                if (e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault()
              }}
              className="w-full rounded-lg border border-slate-200 bg-white pl-9 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#09383e]/20 focus:border-[#09383e]"
            />
          </div>
        </div>

        {/* Remove button */}
        <div className="sm:pt-7">
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              aria-label={`Remove line ${index + 1}`}
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

    </div>
  )
}

function TotalCard({
  label,
  sublabel,
  value,
  highlight,
  strong,
}: {
  label: string
  sublabel?: string
  value: string
  highlight?: boolean
  strong?: boolean
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
        {label}
        {sublabel && (
          <span className="ml-1.5 normal-case tracking-normal font-medium text-slate-400">
            · {sublabel}
          </span>
        )}
      </p>
      <p
        className={`font-display whitespace-nowrap ${
          strong
            ? 'text-2xl font-bold text-slate-900'
            : highlight
              ? 'text-2xl font-bold'
              : 'text-2xl font-semibold text-slate-700'
        }`}
        style={highlight ? { color: TEAL } : undefined}
      >
        {value}
      </p>
    </div>
  )
}
