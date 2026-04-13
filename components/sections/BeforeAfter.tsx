'use client'
import { motion } from 'framer-motion'

const DOC_LINES = [
  'w-11/12', 'w-10/12', 'w-full', 'w-9/12', 'w-10/12',
  'w-11/12', 'w-8/12', 'w-10/12', 'w-11/12', 'w-9/12',
]

const CITATIONS = [
  { label: 'ITA 2058, \u00a788', primary: true },
  { label: 'Finance Act 2081', primary: false },
]

export function BeforeAfter() {
  return (
    <section className="px-4 sm:px-6 py-8 sm:py-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Before card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col gap-4">
            <span
              className="self-start inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider"
              style={{ backgroundColor: 'rgba(239,68,68,0.08)', color: '#b91c1c' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Before
            </span>

            <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 leading-snug">
              200+ pages of the Finance Act, every amendment buried somewhere.
            </h3>

            {/* Animated document lines — stagger in on view */}
            <motion.div
              className="mt-1 rounded-lg bg-slate-50 border border-slate-100 p-4 flex flex-col gap-1.5 overflow-hidden"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08 } },
              }}
            >
              {DOC_LINES.map((w, i) => (
                <motion.div
                  key={i}
                  className={`h-2 rounded bg-slate-200 ${w}`}
                  style={{ opacity: 1 - i * 0.07 }}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    show: { opacity: 1 - i * 0.07, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* After card */}
          <div
            className="rounded-2xl border p-6 sm:p-8 flex flex-col gap-4"
            style={{ borderColor: 'rgba(9,56,62,0.18)', backgroundColor: 'rgba(9,56,62,0.03)' }}
          >
            <span
              className="self-start inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider"
              style={{ backgroundColor: 'rgba(9,56,62,0.1)', color: '#09383e' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#09383e' }} /> After
            </span>

            <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 leading-snug">
              One plain-language answer, with the exact section cited.
            </h3>

            {/* Answer card with animated citation chips */}
            <motion.div
              className="mt-1 rounded-lg border border-slate-200 bg-white p-4 flex flex-col gap-3"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <p className="text-[13px] text-slate-700 leading-relaxed">
                Consulting fees to a resident:{' '}
                <span className="font-semibold text-slate-900">1.5% TDS</span> with
                VAT invoice,{' '}
                <span className="font-semibold text-slate-900">15%</span> without.
              </p>
              <motion.div
                className="flex flex-wrap gap-1.5"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.15, delayChildren: 0.5 } },
                }}
              >
                {CITATIONS.map((c) => (
                  <motion.span
                    key={c.label}
                    variants={{
                      hidden: { opacity: 0, y: 6, scale: 0.9 },
                      show: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: { duration: 0.3, ease: 'easeOut' },
                      },
                    }}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"
                    style={
                      c.primary
                        ? { backgroundColor: 'rgba(9,56,62,0.08)', color: '#09383e' }
                        : { border: '1px solid rgb(226,232,240)', color: 'rgb(100,116,139)' }
                    }
                  >
                    {c.label}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
