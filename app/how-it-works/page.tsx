import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'

const steps = [
  {
    number: '1',
    label: 'Scrape',
    summary: 'We monitor the Department of Printing, NRB, and IRD 24/7.',
    description:
      "Nepal's legal landscape changes constantly. Our scrapers watch every official source and capture new documents within hours of publication.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        />
      </svg>
    ),
  },
  {
    number: '2',
    label: 'Parse',
    summary: 'Our parsing engine turns scanned images into searchable, structured data.',
    description:
      'Using OCR with table extraction, we convert scanned gazette PDFs into structured, searchable content so you can cite specific sections and tables.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    number: '3',
    label: 'Verify',
    summary: 'A chartered accountant audits the AI\u2019s legal interpretation.',
    description:
      "AI is powerful but not infallible. A practicing CA on the team reviews how Mero Dafa interprets Nepal's tax law to keep the answers accurate.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    number: '4',
    label: 'Answer',
    summary: 'You get instant, accurate, and cited financial intelligence.',
    description:
      'Ask any question in plain English or Nepali. Get cited answers with direct links to the original gazette pages.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
  },
]

export default function HowItWorksPage() {
  return (
    <main className="bg-white pb-16">
      <PageHero
        kicker="The process"
        title="How Mero Dafa"
        titleAccent="turns gazettes into cited answers."
        description={<>From raw government publications to cited, accurate answers &mdash; a four-step pipeline built for Nepal&apos;s legal landscape.</>}
      />

      {/* Timeline card */}
      <section className="px-4 sm:px-6 pt-8 sm:pt-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 bg-white">
            <div className="relative z-10 px-6 sm:px-10 py-12 sm:py-16">
              <div className="mx-auto max-w-3xl">
                <div className="relative">
                  {/* Vertical teal connector */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 left-8 md:left-1/2 md:-translate-x-px"
                    style={{ backgroundColor: 'rgba(9,56,62,0.12)' }}
                    aria-hidden="true"
                  />

                  <div className="flex flex-col gap-0">
                    {steps.map((step, idx) => {
                      const isEven = idx % 2 === 0
                      return (
                        <div key={step.number} className="relative">
                          <div
                            className={`flex items-start gap-6 md:gap-0 ${
                              isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                            } mb-12 md:mb-14`}
                          >
                            {/* Content */}
                            <div
                              className={`flex-1 ml-20 md:ml-0 ${
                                isEven ? 'md:pr-14 md:text-right' : 'md:pl-14 md:text-left'
                              } md:w-1/2`}
                            >
                              <div
                                className={`inline-flex items-center gap-2 mb-3 ${
                                  isEven ? 'md:flex-row-reverse' : ''
                                }`}
                              >
                                <span
                                  className="inline-flex items-center justify-center w-9 h-9 rounded-xl border"
                                  style={{
                                    backgroundColor: 'rgba(9,56,62,0.08)',
                                    color: '#09383e',
                                    borderColor: 'rgba(9,56,62,0.2)',
                                  }}
                                >
                                  {step.icon}
                                </span>
                                <span
                                  className="text-[11px] font-bold uppercase tracking-widest"
                                  style={{ color: '#09383e' }}
                                >
                                  {step.label}
                                </span>
                              </div>

                              <p className="font-semibold text-slate-900 text-lg leading-snug mb-2">
                                {step.summary}
                              </p>
                              <p className="text-slate-600 text-sm leading-relaxed">
                                {step.description}
                              </p>
                            </div>

                            {/* Center node */}
                            <div
                              className="absolute left-8 md:left-1/2 md:-translate-x-1/2 flex-shrink-0"
                              style={{ top: '0px' }}
                            >
                              <div
                                className="w-14 h-14 rounded-full flex items-center justify-center font-display font-bold text-xl text-white shadow-lg ring-4 ring-white"
                                style={{ background: 'linear-gradient(135deg, #09383e 0%, #0d4f57 100%)' }}
                              >
                                {step.number}
                              </div>
                            </div>

                            <div className="hidden md:block md:w-1/2" />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA — dark gradient card, matches home page */}
      <section className="px-4 sm:px-6 pt-10">
        <div className="mx-auto max-w-[1400px]">
          <div
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl px-6 sm:px-10 py-14 sm:py-16 flex flex-col items-center text-center gap-5"
            style={{ background: 'linear-gradient(135deg, #0a2024 0%, #071619 60%, #050f11 100%)' }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(9,56,62,0.45) 0%, transparent 65%)' }}
              aria-hidden
            />
            <h2 className="relative font-display font-bold text-2xl sm:text-3xl text-white">
              Ready to experience it for yourself?
            </h2>
            <Link
              href="/#pricing"
              className="relative inline-flex items-center justify-center rounded-xl font-semibold px-7 py-3.5 text-[15px] text-white transition-all duration-200 hover:brightness-110"
              style={{
                background: 'linear-gradient(135deg, #09383e 0%, #0d4f57 100%)',
                boxShadow: '0 6px 18px rgba(9,56,62,0.35)',
              }}
            >
              Start using Mero Dafa
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
