import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'

const steps = [
  {
    number: '1',
    label: 'Browse',
    summary: 'Open any act, directive, or circular from the Library.',
    description:
      'Income Tax Act, VAT Act, Company Act, NRB directives, IRD circulars, Finance Acts, and Supreme Court case law — all pre-loaded and ready to search.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    number: '2',
    label: 'Ask',
    summary: 'Type your question in English or नेपाली.',
    description:
      'No keywords or legal jargon needed. Ask the way you\u2019d ask a colleague — "What is the TDS rate on consulting fees?" or "कम्पनी दर्ताको प्रक्रिया के हो?"',
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
  {
    number: '3',
    label: 'Read',
    summary: 'Get a clear answer with exact citations.',
    description:
      'Every answer includes page numbers and section references. Click any citation to jump to the exact location in the original document and see it side-by-side.',
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
    number: '4',
    label: 'Save',
    summary: 'Star answers, download PDFs, and keep researching.',
    description:
      'Star important responses to revisit later. Download documents as PDF. AI suggests follow-up questions so you can dig deeper without starting over.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    ),
  },
]

export default function HowItWorksPage() {
  return (
    <main className="bg-white pb-16">
      <PageHero
        kicker="How it works"
        title="From question to"
        titleAccent="cited answer in seconds."
        description={<>Pick a document, ask your question, get an answer with exact citations. Here&apos;s the workflow.</>}
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
              Ready to try it yourself?
            </h2>
            <Link
              href="https://app.merodafa.com/signup"
              className="relative inline-flex items-center justify-center rounded-xl font-semibold px-7 py-3.5 text-[15px] text-white transition-all duration-200 hover:brightness-110"
              style={{
                background: 'linear-gradient(135deg, #09383e 0%, #0d4f57 100%)',
                boxShadow: '0 6px 18px rgba(9,56,62,0.35)',
              }}
            >
              Create free account
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
