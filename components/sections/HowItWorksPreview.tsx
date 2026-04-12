'use client'
import { useRef, useEffect, useState } from 'react'

const steps = [
  {
    number: '01',
    title: 'Browse the Library',
    description: 'Choose from pre-loaded Acts, NRB Directives, IRD Circulars, Finance Acts, and Gazette publications.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    visual: (
      <div className="flex gap-2">
        {['Income Tax Act', 'VAT Act', 'NRB Directive'].map((t) => (
          <div key={t} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-medium text-slate-600 shadow-sm">{t}</div>
        ))}
      </div>
    ),
  },
  {
    number: '02',
    title: 'Open a Workspace',
    description: 'Select any document to open a split-pane workspace — chat on the left, original gazette on the right.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
      </svg>
    ),
    visual: (
      <div className="flex rounded-lg border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="flex-1 border-r border-slate-100 p-2">
          <div className="h-1.5 w-3/4 bg-slate-200 rounded mb-1" />
          <div className="h-1.5 w-1/2 bg-slate-100 rounded" />
        </div>
        <div className="flex-1 p-2">
          <div className="h-1.5 w-full bg-slate-100 rounded mb-1" />
          <div className="h-3 w-full rounded" style={{ backgroundColor: 'rgba(9,56,62,0.08)', border: '1px solid rgba(9,56,62,0.15)' }} />
          <div className="h-1.5 w-2/3 bg-slate-100 rounded mt-1" />
        </div>
      </div>
    ),
  },
  {
    number: '03',
    title: 'Ask Your Question',
    description: 'Type in plain English or Nepali. The AI navigates the legal hierarchy to find the precise section.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    visual: (
      <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
        <p className="text-[10px] text-slate-500 italic">&ldquo;What is the TDS on consulting fees?&rdquo;</p>
      </div>
    ),
  },
  {
    number: '04',
    title: 'Get Cited Answers',
    description: 'Receive answers with exact source citations. Click any to see the highlighted section in the gazette.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    visual: (
      <div className="flex gap-1.5">
        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-medium text-white" style={{ backgroundColor: '#09383e' }}>ITA §88</span>
        <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] font-medium text-slate-500" style={{ borderColor: 'rgba(9,56,62,0.2)' }}>Finance Act 2081</span>
      </div>
    ),
  },
]

function StepCard({ step, index, activeIndex }: { step: typeof steps[0]; index: number; activeIndex: number }) {
  const isActive = index === activeIndex
  const isPast = index < activeIndex

  return (
    <div
      className="relative flex gap-5 sm:gap-6 transition-all duration-500"
      style={{ opacity: isPast ? 0.5 : 1 }}
    >
      {/* Left — timeline */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Number circle */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 relative z-10"
          style={{
            backgroundColor: isActive ? '#09383e' : isPast ? 'rgba(9,56,62,0.1)' : '#f1f5f9',
            color: isActive ? '#fff' : isPast ? '#09383e' : '#94a3b8',
            boxShadow: isActive ? '0 0 0 6px rgba(9,56,62,0.1), 0 4px 12px rgba(9,56,62,0.2)' : 'none',
            transform: isActive ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          {step.number}
        </div>
        {/* Connecting line */}
        {index < steps.length - 1 && (
          <div className="w-0.5 flex-1 my-2 rounded-full transition-colors duration-500" style={{
            backgroundColor: isPast ? '#09383e' : 'rgba(9,56,62,0.1)',
          }} />
        )}
      </div>

      {/* Right — content */}
      <div className="pb-12 sm:pb-14 pt-1 flex-1 min-w-0">
        <div
          className="rounded-2xl p-6 transition-all duration-500"
          style={{
            backgroundColor: isActive ? 'rgba(9,56,62,0.03)' : 'transparent',
            border: isActive ? '1px solid rgba(9,56,62,0.08)' : '1px solid transparent',
          }}
        >
          {/* Icon + title row */}
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500"
              style={{
                backgroundColor: isActive ? '#09383e' : 'rgba(9,56,62,0.06)',
                color: isActive ? '#fff' : '#09383e',
              }}
            >
              {step.icon}
            </div>
            <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
          </div>

          <p className="text-sm text-slate-500 leading-relaxed mb-4 ml-[52px]">{step.description}</p>

          {/* Mini visual */}
          <div
            className="ml-[52px] transition-all duration-500"
            style={{
              opacity: isActive ? 1 : 0.4,
              transform: isActive ? 'translateX(0)' : 'translateX(-8px)',
            }}
          >
            {step.visual}
          </div>
        </div>
      </div>
    </div>
  )
}

export function HowItWorksPreview() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // Auto-advance active step on scroll position within the section
  useEffect(() => {
    function onScroll() {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionHeight = rect.height
      const viewportMiddle = window.innerHeight / 2
      const progress = (viewportMiddle - rect.top) / sectionHeight
      const clamped = Math.max(0, Math.min(1, progress))
      const index = Math.min(steps.length - 1, Math.floor(clamped * steps.length))
      setActiveIndex(index)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="bg-white py-24 sm:py-32" ref={sectionRef}>
      <div className="mx-auto max-w-[1620px] px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 max-w-6xl mx-auto">
          {/* Left — sticky header */}
          <div className="lg:w-[340px] flex-shrink-0 lg:sticky lg:top-32 lg:self-start">
            <span
              className="inline-flex items-center gap-2 text-[12px] uppercase tracking-widest font-semibold mb-4"
              style={{ color: '#09383e' }}
            >
              <span className="w-8 h-px" style={{ backgroundColor: '#09383e' }} />
              How it works
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 leading-tight mb-4">
              From document to answer
              <span style={{ color: '#09383e' }}> in four steps.</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              No setup, no configuration. Browse our indexed library and start asking questions immediately.
            </p>

            {/* Progress dots */}
            <div className="flex gap-2 mt-8">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: i === activeIndex ? '32px' : '8px',
                    backgroundColor: i === activeIndex ? '#09383e' : i < activeIndex ? 'rgba(9,56,62,0.3)' : 'rgba(9,56,62,0.1)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right — steps timeline */}
          <div className="flex-1 min-w-0">
            {steps.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} activeIndex={activeIndex} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
