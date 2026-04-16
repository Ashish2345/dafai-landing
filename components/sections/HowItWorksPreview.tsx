'use client'
import { motion } from 'framer-motion'

type Step = {
  number: string
  title: string
  description: string
}

const STEPS: Step[] = [
  {
    number: '01',
    title: 'Pick a document',
    description:
      'Open any act, directive, or circular from the Library. Income Tax, VAT, NRB, IRD, Company Act, case law \u2014 all pre-loaded.',
  },
  {
    number: '02',
    title: 'Ask in plain language',
    description:
      'Type your question in English or \u0928\u0947\u092A\u093E\u0932\u0940. No keywords needed \u2014 ask the way you\u2019d ask a colleague.',
  },
  {
    number: '03',
    title: 'Get a sourced answer',
    description:
      'A clear answer with exact page numbers and section references. Click any source to see it in the original document.',
  },
]

export function HowItWorksPreview() {
  return (
    <section className="px-4 sm:px-6 py-10 sm:py-14">
      <div className="mx-auto max-w-[1400px]">
        <div
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl"
          style={{ background: 'linear-gradient(180deg, #0a2024 0%, #071619 100%)' }}
        >
          {/* Subtle teal glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 50% 0%, rgba(9,56,62,0.4) 0%, transparent 60%)',
            }}
          />

          {/* Faint grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
            }}
          />

          <div className="relative z-10 px-6 sm:px-10 py-14 sm:py-20">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-12 sm:mb-14">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider mb-4 border"
                style={{
                  backgroundColor: 'rgba(94,234,212,0.08)',
                  color: '#5eead4',
                  borderColor: 'rgba(94,234,212,0.2)',
                }}
              >
                How it works
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-[2.25rem] text-white leading-tight max-w-2xl">
                From question to verified answer in{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #5eead4 0%, #14b8a6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  3 steps.
                </span>
              </h2>
            </div>

            {/* Connecting line behind steps — desktop only */}
            <div className="relative max-w-4xl mx-auto">
              <motion.div
                className="hidden md:block absolute top-[22px] left-[12%] right-[12%] h-[2px] rounded-full origin-left"
                style={{
                  background:
                    'linear-gradient(to right, rgba(94,234,212,0.15), rgba(94,234,212,0.5), rgba(94,234,212,0.15))',
                }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
              />

              {/* Steps */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
                }}
              >
                {STEPS.map((step) => (
                  <motion.div
                    key={step.number}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, ease: 'easeOut' },
                      },
                    }}
                    className="relative rounded-xl p-5 sm:p-6 flex flex-col gap-3 border backdrop-blur-sm"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      borderColor: 'rgba(255,255,255,0.08)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {/* Pulsing number badge */}
                      <span className="relative inline-flex">
                        <motion.span
                          className="absolute inset-0 rounded-lg"
                          style={{ backgroundColor: 'rgba(94,234,212,0.2)' }}
                          animate={{ opacity: [0.4, 0, 0.4], scale: [1, 1.4, 1] }}
                          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <span
                          className="relative inline-flex items-center justify-center w-8 h-8 rounded-lg font-mono text-[13px] font-bold"
                          style={{
                            backgroundColor: 'rgba(94,234,212,0.1)',
                            color: '#5eead4',
                            border: '1px solid rgba(94,234,212,0.25)',
                          }}
                        >
                          {step.number}
                        </span>
                      </span>
                      <h3 className="font-display font-semibold text-white text-base">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-slate-400 text-[13px] leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
