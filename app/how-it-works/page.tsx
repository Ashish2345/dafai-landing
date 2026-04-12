import Link from 'next/link'

const steps = [
  {
    number: '1',
    label: 'Scrape',
    colorClass: 'bg-electric/10 text-electric border-electric/30',
    badgeClass: 'bg-electric text-white',
    lineColor: 'bg-electric',
    summary: 'We monitor the Department of Printing, NRB, and IRD 24/7.',
    description:
      "Nepal's legal landscape changes constantly. Our scrapers watch every official source and capture new documents within hours of publication.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
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
    colorClass: 'bg-emerald/10 text-emerald border-emerald/30',
    badgeClass: 'bg-emerald text-white',
    lineColor: 'bg-emerald',
    summary: 'Our Docsumo-grade engine turns scanned images into searchable data.',
    description:
      'Using advanced OCR with table extraction, we convert even the worst-quality scanned PDFs into structured, searchable content with 99.9% accuracy.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
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
    colorClass: 'border-orange-600/30',
    badgeClass: 'text-white',
    iconColor: '#EA580C',
    badgeBg: '#EA580C',
    summary: 'A team of CA collaborators audits the AI\'s legal logic daily.',
    description:
      "AI is powerful but not infallible. Our network of practicing Chartered Accountants reviews the AI's interpretations to ensure legal accuracy.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
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
    colorClass: 'border-purple-700/30',
    badgeClass: 'text-white',
    iconColor: '#7C3AED',
    badgeBg: '#7C3AED',
    summary: 'You get instant, accurate, and cited financial intelligence.',
    description:
      'Ask any question in plain English or Nepali. Get cited answers with direct links to the original gazette pages.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
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
    <main className="min-h-screen bg-white pt-24 pb-20">
      {/* Page header */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center mb-20">
        <span className="text-electric text-xs uppercase tracking-widest font-semibold mb-4 block">
          THE PROCESS
        </span>
        <h1 className="font-display font-bold text-4xl md:text-5xl text-midnight leading-tight mb-6">
          How Mero Dafa Works
        </h1>
        <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
          From raw government publications to cited, accurate answers — a four-step pipeline built
          for Nepal&apos;s legal landscape.
        </p>
      </div>

      {/* Timeline */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Vertical connector line — desktop center, mobile left */}
          <div
            className="
              absolute top-0 bottom-0 w-0.5 bg-slate-200
              left-8 md:left-1/2 md:-translate-x-px
            "
            aria-hidden="true"
          />

          <div className="flex flex-col gap-0">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0

              return (
                <div key={step.number} className="relative">
                  {/* Step container: alternates on desktop */}
                  <div
                    className={`
                      flex items-start gap-6
                      md:gap-0
                      ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}
                      mb-12 md:mb-16
                    `}
                  >
                    {/* Content card — takes up half on desktop */}
                    <div
                      className={`
                        flex-1 ml-20 md:ml-0
                        ${isEven ? 'md:pr-14 md:text-right' : 'md:pl-14 md:text-left'}
                        md:w-1/2
                      `}
                    >
                      <div
                        className={`
                          inline-flex items-center gap-2 mb-3
                          ${isEven ? 'md:flex-row-reverse' : ''}
                        `}
                      >
                        {/* Icon badge */}
                        <span
                          className={`
                            inline-flex items-center justify-center
                            w-10 h-10 rounded-xl border
                            ${step.colorClass}
                          `}
                          style={
                            step.iconColor
                              ? {
                                  background: `${step.iconColor}18`,
                                  color: step.iconColor,
                                  borderColor: `${step.iconColor}4D`,
                                }
                              : undefined
                          }
                        >
                          {step.icon}
                        </span>
                        <span
                          className="text-xs font-bold uppercase tracking-widest"
                          style={step.iconColor ? { color: step.iconColor } : undefined}
                        >
                          {step.label}
                        </span>
                      </div>

                      <p className="font-semibold text-midnight text-lg leading-snug mb-2">
                        {step.summary}
                      </p>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Center node — absolutely positioned on desktop, inline on mobile */}
                    <div
                      className={`
                        absolute left-8 md:left-1/2 md:-translate-x-1/2
                        flex-shrink-0
                      `}
                      style={{ top: '0px' }}
                    >
                      <div
                        className={`
                          w-16 h-16 rounded-full flex items-center justify-center
                          font-display font-bold text-2xl text-white
                          shadow-lg ring-4 ring-white
                          ${step.badgeClass}
                        `}
                        style={step.badgeBg ? { background: step.badgeBg } : undefined}
                      >
                        {step.number}
                      </div>
                    </div>

                    {/* Empty spacer for the other side on desktop */}
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-8 flex flex-col items-center gap-4 px-4">
        <p className="text-slate-500 text-base">Ready to experience it for yourself?</p>
        <Link
          href="/#pricing"
          className="inline-flex items-center justify-center rounded-lg bg-electric text-white font-semibold px-8 py-4 text-lg shadow-lg shadow-electric/25 hover:brightness-110 transition-all duration-200"
        >
          Start Using Mero Dafa
        </Link>
      </div>
    </main>
  )
}
