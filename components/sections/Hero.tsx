'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { WaitlistModal } from '@/components/ui/WaitlistModal'

export function Hero() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      {/* Outer — white with padding so banner doesn't stick to edges */}
      <section className="bg-white px-4 sm:px-6 pt-3 pb-0">
        {/* Inner banner card — rounded, dark background */}
        <div
          className="relative mx-auto max-w-[1620px] overflow-hidden rounded-2xl sm:rounded-3xl"
          style={{
            background: 'linear-gradient(170deg, #0B1120 0%, #111a2e 25%, #14203a 55%, #0f1829 100%)',
          }}
        >
          {/* Grid texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
            }}
          />

          {/* Ambient orbs — brand teal */}
          <div className="absolute -top-48 left-1/4 w-[700px] h-[500px] pointer-events-none" style={{
            background: 'radial-gradient(ellipse at center, rgba(9,56,62,0.35) 0%, transparent 70%)',
          }} />
          <div className="absolute top-1/3 -right-24 w-[400px] h-[400px] pointer-events-none" style={{
            background: 'radial-gradient(circle at center, rgba(13,79,87,0.2) 0%, transparent 70%)',
          }} />
          <div className="absolute -bottom-24 left-1/2 w-[500px] h-[350px] pointer-events-none" style={{
            background: 'radial-gradient(ellipse at center, rgba(9,56,62,0.15) 0%, transparent 70%)',
          }} />

          {/* Content */}
          <div className="relative z-10 px-6 sm:px-10 lg:px-16 pt-16 pb-16 lg:pt-20 lg:pb-20">
            {/* Center text */}
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14 lg:mb-16">
              {/* Pill */}
              <div className="mb-5">
                <span className="inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-500/10 px-4 py-1.5 text-[13px] text-teal-300 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  Nepal&apos;s first AI-powered legal intelligence
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-display font-bold text-white text-[2.25rem] sm:text-[2.75rem] lg:text-5xl leading-[1.1] tracking-tight mb-4">
                Compliance at the{' '}
                <br className="hidden sm:block" />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #5eead4 0%, #14b8a6 50%, #0d9488 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  speed of thought.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-slate-400 text-[15px] sm:text-base leading-relaxed max-w-lg mb-7">
                Ask questions in plain language. Get cited answers from Nepal&apos;s official
                gazette — with the source document right beside every response.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="primary" size="md" onClick={() => setModalOpen(true)}>
                  Get early access
                </Button>
                <Button variant="outline" size="md" className="gap-2">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/10 text-[10px]">▶</span>
                  Watch demo
                </Button>
              </div>

              {/* Social proof */}
              <p className="mt-5 text-slate-500 text-sm">
                Trusted by <span className="text-slate-300 font-medium">500+</span> CAs and finance professionals
              </p>
            </div>

            {/* Product mockup */}
            <div className="hidden sm:block">
              <ProductMockup />
            </div>
          </div>
        </div>
      </section>

      <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} source="hero" />
    </>
  )
}

function ProductMockup() {
  return (
    <div className="relative mx-auto max-w-4xl">
      {/* Glow */}
      <div className="absolute inset-x-8 -inset-y-4 rounded-3xl pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 40%, rgba(9,56,62,0.3) 0%, transparent 70%)',
        filter: 'blur(48px)',
      }} />

      {/* Card */}
      <div className="relative rounded-xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-sm overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.4)]">
        {/* Chrome */}
        <div className="flex items-center gap-2 px-5 py-2.5 border-b border-white/[0.06] bg-white/[0.03]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-2 rounded-md bg-white/[0.04] border border-white/[0.06] px-3 py-1">
              <svg className="w-3 h-3 text-teal-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
              <span className="text-slate-500 text-[11px] font-mono">merodafa.com/workspace</span>
            </div>
          </div>
        </div>

        {/* Split pane */}
        <div className="flex" style={{ minHeight: '300px' }}>
          {/* Chat */}
          <div className="flex-1 p-4 flex flex-col gap-2.5 border-r border-white/[0.06]" style={{ minWidth: 0 }}>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Chat</span>

            <div className="flex justify-end">
              <div className="rounded-2xl rounded-tr-md bg-teal-500/15 border border-teal-400/20 px-3.5 py-2 max-w-[85%]">
                <p className="text-white/90 text-[12px] leading-relaxed">What is the TDS rate on consulting fees?</p>
              </div>
            </div>

            <div className="rounded-2xl rounded-tl-md bg-white/[0.04] border border-white/[0.06] px-3.5 py-2.5 max-w-[92%]">
              <p className="text-slate-300 text-[12px] leading-relaxed mb-2">
                Consulting fees to a resident: <span className="text-white font-semibold">1.5% TDS</span> with VAT invoice, <span className="text-white font-semibold">15%</span> without.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-400/20 text-teal-300 text-[10px] font-medium">
                  ITA 2058, §88
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-500 text-[10px]">
                  Finance Act 2081
                </span>
              </div>
            </div>

            <div className="mt-auto flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2">
              <span className="flex-1 text-slate-600 text-[12px]">Ask a legal question…</span>
              <div className="w-6 h-6 rounded-md bg-teal-700 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
            </div>
          </div>

          {/* Document */}
          <div className="flex-1 p-4 flex flex-col gap-2.5 bg-white/[0.01]" style={{ minWidth: 0 }}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Document</span>
              <span className="text-[10px] text-slate-600 font-mono">Income Tax Act 2058</span>
            </div>

            <div className="flex-1 rounded-lg bg-white p-4 flex flex-col gap-2 shadow-inner">
              <div className="flex flex-col gap-1 pb-2 border-b border-slate-100">
                <div className="h-2 w-2/3 bg-slate-200 rounded-sm" />
                <div className="h-1.5 w-1/3 bg-slate-100 rounded-sm" />
              </div>
              <div className="space-y-[4px]">
                {[82, 96, 68, 88].map((w, i) => (
                  <div key={i} className="h-[4px] bg-slate-100 rounded-sm" style={{ width: `${w}%` }} />
                ))}
              </div>
              {/* Highlighted section — teal accent */}
              <div className="rounded-md border-2 border-teal-400/40 bg-teal-50/50 px-3 py-2.5 space-y-[4px]">
                <span className="text-teal-600 text-[9px] font-bold uppercase tracking-wider">§88 — Matched</span>
                <div className="h-[4px] bg-teal-400/25 rounded-sm w-full" />
                <div className="h-[4px] bg-teal-400/20 rounded-sm w-11/12" />
                <div className="h-[4px] bg-teal-400/25 rounded-sm w-4/5" />
              </div>
              <div className="space-y-[4px]">
                {[75, 92, 58].map((w, i) => (
                  <div key={i} className="h-[4px] bg-slate-100 rounded-sm" style={{ width: `${w}%` }} />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-500">
              <span className="font-mono">Page 47 of 312</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
