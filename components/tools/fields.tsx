'use client'

import type { ReactNode } from 'react'


// Shared calculator primitives — same look as the original tool pages.

/** Nepali translation shown beside an English label. */
export function Ne({ children }: { children?: string }) {
  if (!children) return null
  return (
    <span lang="ne" className="ml-1.5 font-normal normal-case tracking-normal text-slate-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
      · {children}
    </span>
  )
}

const INPUT =
  'w-full rounded-lg border border-slate-200 bg-white py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#09383e]/20 focus:border-[#09383e]'

export function CalcGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">{children}</div>
}

export function InputCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <form
      className="rounded-xl border border-slate-200 bg-white divide-y divide-slate-200"
      onSubmit={(e) => e.preventDefault()}
      aria-label={label}
    >
      {children}
    </form>
  )
}

export function FormSection({ label, ne, hint, children }: { label: string; ne?: string; hint?: ReactNode; children: ReactNode }) {
  return (
    <div className="px-4 py-4 sm:px-5">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#09383e] mb-2">
        {label}
        <Ne>{ne}</Ne>
      </p>
      {hint && <p className="text-xs text-slate-500 mb-3 leading-snug">{hint}</p>}
      <div className={`space-y-3 ${hint ? '' : 'mt-2'}`}>{children}</div>
    </div>
  )
}

export function NumberField({
  id,
  label,
  ne,
  value,
  onChange,
  prefix = 'Rs',
  suffix,
  help,
  step,
}: {
  id: string
  label: string
  ne?: string
  value: number
  onChange: (v: number) => void
  prefix?: string | null
  suffix?: string
  help?: ReactNode
  step?: number
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
        <Ne>{ne}</Ne>
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
          inputMode="decimal"
          min={0}
          step={step ?? 'any'}
          placeholder="0"
          value={value === 0 ? '' : Number.isFinite(value) ? value : ''}
          onChange={(e) => {
            const raw = e.target.value
            if (raw === '') return onChange(0)
            const n = Number(raw)
            onChange(Number.isFinite(n) ? n : 0)
          }}
          onWheel={(e) => e.currentTarget.blur()}
          className={`${INPUT} ${prefix ? 'pl-9' : 'pl-3'} ${suffix ? 'pr-14' : 'pr-3'}`}
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

export function DateField({ id, label, ne, value, onChange, help }: { id: string; label: string; ne?: string; value: string; onChange: (v: string) => void; help?: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
        <Ne>{ne}</Ne>
      </label>
      <input id={id} type="date" value={value} onChange={(e) => onChange(e.target.value)} className={`${INPUT} px-3`} />
      {help && <p className="text-xs text-slate-500 mt-1.5 leading-snug">{help}</p>}
    </div>
  )
}

export function SelectField<T extends string>({
  id,
  label,
  ne,
  value,
  onChange,
  options,
  help,
}: {
  id: string
  label: string
  ne?: string
  value: T
  onChange: (v: T) => void
  options: { value: T; label: string; group?: string }[]
  help?: ReactNode
}) {
  const groups = Array.from(new Set(options.map((o) => o.group ?? '')))
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
        <Ne>{ne}</Ne>
      </label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value as T)} className={`${INPUT} px-3`}>
        {groups.map((g) =>
          g ? (
            <optgroup key={g} label={g}>
              {options.filter((o) => o.group === g).map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </optgroup>
          ) : (
            options.filter((o) => !o.group).map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))
          ),
        )}
      </select>
      {help && <p className="text-xs text-slate-500 mt-1.5 leading-snug">{help}</p>}
    </div>
  )
}

export function Segmented<T extends string>({
  value,
  onChange,
  options,
  label,
  ne,
}: {
  value: T
  onChange: (v: T) => void
  options: { value: T; label: string }[]
  label?: string
  ne?: string
}) {
  return (
    <div>
      {label && (
        <p className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
          <Ne>{ne}</Ne>
        </p>
      )}
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            aria-pressed={value === o.value}
            className={`rounded-lg border px-2 py-2.5 text-[13px] sm:text-sm font-medium transition-colors ${
              value === o.value
                ? 'border-[#09383e] bg-[#09383e]/5 text-[#09383e]'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export function Checkbox({ checked, onChange, label, ne, help }: { checked: boolean; onChange: (v: boolean) => void; label: string; ne?: string; help?: string }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#09383e] focus:ring-[#09383e]/30"
      />
      <span className="min-w-0">
        <span className="block text-sm text-slate-800 leading-snug">
          {label}
          <Ne>{ne}</Ne>
        </span>
        {help && <span className="block text-xs text-slate-500 mt-0.5 leading-snug">{help}</span>}
      </span>
    </label>
  )
}

export function ResultPanel({ children }: { children: ReactNode }) {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start space-y-3" aria-live="polite">
      {children}
    </aside>
  )
}

export function Headline({ label, ne, value, sub, tone = 'teal' }: { label: string; ne?: string; value: string; sub?: ReactNode; tone?: 'teal' | 'green' | 'red' }) {
  const color = tone === 'green' ? '#059669' : tone === 'red' ? '#b91c1c' : '#09383e'
  return (
    <div className="rounded-xl border-2 bg-white p-5" style={{ borderColor: color }}>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
        {label}
        <Ne>{ne}</Ne>
      </p>
      <p className="font-display font-bold text-3xl sm:text-4xl mb-2 leading-none tabular-nums break-words" style={{ color }}>
        {value}
      </p>
      {sub && <div className="text-sm text-slate-600">{sub}</div>}
    </div>
  )
}

export function Breakdown({ title, ne, children }: { title?: string; ne?: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 sm:px-5">
      {title && (
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#09383e] mt-1 mb-1">
          {title}
          <Ne>{ne}</Ne>
        </p>
      )}
      {children}
    </div>
  )
}

export function Row({
  label,
  ne,
  sublabel,
  value,
  strong,
  negative,
}: {
  label: string
  ne?: string
  sublabel?: string
  value: string
  strong?: boolean
  negative?: boolean
}) {
  return (
    <div className={`flex items-baseline justify-between gap-3 py-2 ${strong ? 'mt-1 pt-2.5 border-t border-slate-200' : ''}`}>
      <div className="min-w-0 flex-1">
        <p className={`text-sm leading-tight ${strong ? 'font-semibold text-slate-900' : 'text-slate-700'}`}>
          {label}
          <Ne>{ne}</Ne>
        </p>
        {sublabel && <p className="text-[11px] text-slate-400 leading-tight mt-0.5">{sublabel}</p>}
      </div>
      <span
        className={`whitespace-nowrap tabular-nums ${strong ? 'text-base font-bold text-slate-900' : negative ? 'text-sm text-rose-600' : 'text-sm text-slate-900'}`}
      >
        {negative && '− '}
        {value}
      </span>
    </div>
  )
}

export function Disclaimer({ children }: { children: ReactNode }) {
  return <p className="text-xs text-slate-500 leading-relaxed px-1">{children}</p>
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-600 leading-relaxed">{children}</p>
    </div>
  )
}
