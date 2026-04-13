'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { WaitlistModal } from '@/components/ui/WaitlistModal'

type Query = { topic: string; question: string }

const QUERIES: Query[] = [
  { topic: 'TDS', question: 'What is the TDS rate on consulting fees paid to a resident?' },
  { topic: 'VAT', question: 'What is the VAT registration threshold for service providers?' },
  { topic: 'Income Tax', question: 'How is capital gain on share sale of a listed company taxed?' },
  { topic: 'Finance Act 2081', question: 'What changed for small taxpayers in the latest Finance Act?' },
  { topic: 'NRB', question: 'What are the reporting requirements for foreign currency transactions?' },
  { topic: 'Corporate', question: 'What is the current corporate tax rate for a manufacturing company?' },
]

export function UseCases() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <section className="px-4 sm:px-6 py-10 sm:py-14">
        <div className="mx-auto max-w-[1400px]">
          <div className="rounded-2xl sm:rounded-3xl bg-slate-50 border border-slate-200 px-6 sm:px-10 py-12 sm:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 lg:gap-14 items-start">
              {/* Left: intro */}
              <div className="flex flex-col gap-4">
                <span
                  className="self-start inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider"
                  style={{ backgroundColor: 'rgba(9,56,62,0.1)', color: '#09383e' }}
                >
                  Use cases
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 leading-tight">
                  Questions Mero Dafa is built to answer.
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Ask anything grounded in Nepal&apos;s Acts, directives, and gazettes.
                  Every answer links back to the original source.
                </p>
                <div className="mt-2">
                  <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
                    Try it in early access
                  </Button>
                </div>
              </div>

              {/* Right: query cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {QUERIES.map((q) => (
                  <div
                    key={q.question}
                    className="rounded-xl bg-white border border-slate-200 p-4 flex flex-col gap-2 hover:border-[#09383e]/30 hover:shadow-sm transition-all duration-200"
                  >
                    <span
                      className="self-start inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                      style={{ backgroundColor: 'rgba(9,56,62,0.08)', color: '#09383e' }}
                    >
                      {q.topic}
                    </span>
                    <p className="text-[13px] text-slate-700 leading-snug">
                      &ldquo;{q.question}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} source="use-cases" />
    </>
  )
}
