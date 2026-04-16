'use client'
import { motion } from 'framer-motion'

type Feature = {
  title: string
  description: string
  visual: React.ReactNode
}

function CitationChips() {
  const chips = [
    { label: 'ITA 2058, \u00a788', primary: true },
    { label: 'Finance Act 2081', primary: false },
    { label: 'NRB Directive 2080', primary: true },
    { label: 'IRD Circular 25', primary: false },
  ]
  return (
    <motion.div
      className="flex flex-wrap gap-2"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.12 } },
      }}
    >
      {chips.map((c) => (
        <motion.span
          key={c.label}
          variants={{
            hidden: { opacity: 0, y: 8, scale: 0.9 },
            show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: 'easeOut' } },
          }}
          className="inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-semibold"
          style={
            c.primary
              ? { backgroundColor: 'rgba(9,56,62,0.08)', color: '#09383e' }
              : { border: '1px solid rgb(226,232,240)', color: 'rgb(71,85,105)' }
          }
        >
          {c.label}
        </motion.span>
      ))}
    </motion.div>
  )
}

function ScanningDoc() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-sm relative">
      <div className="px-3 py-2 border-b border-slate-100 flex items-center gap-2">
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
          <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
          <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
        </div>
        <span className="text-[10px] font-mono text-slate-400 truncate">Finance_Act_2081.pdf</span>
      </div>
      <div className="p-3 flex flex-col gap-1.5 relative overflow-hidden">
        <div className="h-1.5 rounded bg-slate-200 w-full" />
        <div className="h-1.5 rounded bg-slate-200 w-10/12" />
        <div
          className="h-1.5 rounded w-8/12"
          style={{ backgroundColor: 'rgba(9,56,62,0.25)' }}
        />
        <div className="h-1.5 rounded bg-slate-200 w-11/12" />

        {/* Animated scan line */}
        <motion.div
          className="absolute left-0 right-0 h-[2px] pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, transparent, rgba(9,56,62,0.4), transparent)',
            boxShadow: '0 0 10px rgba(9,56,62,0.35)',
          }}
          initial={{ top: '0%', opacity: 0 }}
          whileInView={{
            top: ['0%', '100%', '0%'],
            opacity: [0, 1, 1, 0],
          }}
          viewport={{ once: false, margin: '-40px' }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.5, 1],
          }}
        />
      </div>
    </div>
  )
}

function LanguageToggle() {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex items-stretch overflow-hidden rounded-full border"
        style={{ borderColor: 'rgba(9,56,62,0.2)' }}
      >
        <span
          className="px-4 py-2 text-[13px] font-bold text-white"
          style={{ backgroundColor: '#09383e' }}
        >
          EN
        </span>
        <span className="px-4 py-2 text-[13px] font-semibold text-slate-500 bg-white">
          ने
        </span>
      </div>
      <motion.div
        className="flex flex-col gap-0.5"
        initial={{ opacity: 0, x: 8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <span className="text-[12px] font-medium text-slate-700">English selected</span>
        <span className="text-[10px] text-slate-400">Switch anytime with one click</span>
      </motion.div>
    </div>
  )
}

function SaveExportVisual() {
  const items = [
    { icon: '⭐', label: 'Star response', action: 'Saved' },
    { icon: '📄', label: 'Download PDF', action: '3.2 MB' },
    { icon: '📋', label: 'Copy with citations', action: 'Copied' },
  ]
  return (
    <motion.div
      className="flex flex-col gap-1.5"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
    >
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          variants={{
            hidden: { opacity: 0, x: -8 },
            show: { opacity: 1 - i * 0.08, x: 0, transition: { duration: 0.35, ease: 'easeOut' } },
          }}
          className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2"
        >
          <span className="flex items-center gap-2">
            <span className="text-[12px]">{item.icon}</span>
            <span className="text-[12px] font-medium text-slate-700">{item.label}</span>
          </span>
          <span
            className="text-[10px] font-semibold rounded-full px-2 py-0.5"
            style={{ backgroundColor: 'rgba(9,56,62,0.08)', color: '#09383e' }}
          >
            {item.action}
          </span>
        </motion.div>
      ))}
    </motion.div>
  )
}

const FEATURES: Feature[] = [
  {
    title: 'Answers in seconds',
    description:
      'Skip the 200-page PDF scroll. Ask a question, get an answer with the exact page number and section reference.',
    visual: <ScanningDoc />,
  },
  {
    title: 'Every answer has a source',
    description:
      'Click any reference to jump to the exact page in the original document — verify before you act on it.',
    visual: <CitationChips />,
  },
  {
    title: 'Ask in English or नेपाली',
    description:
      'Switch languages with one click. Answers come back in the language you choose, citing the original text.',
    visual: <LanguageToggle />,
  },
  {
    title: 'Save & export your research',
    description:
      'Star important answers, download documents as PDF, and copy responses with full citations for your reports.',
    visual: <SaveExportVisual />,
  },
]

export function FeaturesBento() {
  return (
    <section id="features" className="px-4 sm:px-6 py-10 sm:py-14">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider mb-4"
            style={{ backgroundColor: 'rgba(9,56,62,0.1)', color: '#09383e' }}
          >
            Advantages
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 leading-tight">
            Why use Mero Dafa.
          </h2>
        </div>

        {/* 2x2 grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {FEATURES.map((f) => (
            <motion.div
              key={f.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
              }}
              className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col gap-4 hover:border-[#09383e]/25 hover:shadow-[0_4px_24px_rgba(9,56,62,0.06)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex flex-col gap-2">
                <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{f.description}</p>
              </div>
              <div className="mt-auto pt-2">{f.visual}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
