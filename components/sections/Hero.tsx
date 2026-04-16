'use client'
import Link from 'next/link'
import { AnimatedQuery } from '@/components/ui/AnimatedQuery'

const TOPICS = [
  'Income Tax Act',
  'VAT Act',
  'नजिर / Case Law',
  'NRB Directives',
  'Company Act',
  'Finance Act 2081',
  'IRD Circulars',
]

export function Hero() {
  return (
    <>
      <section className="px-4 sm:px-6 pt-8">
        {/* Outer bordered card — faint teal tint to separate from page */}
        <div
          className="relative mx-auto max-w-[1400px] overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200"
          style={{ backgroundColor: '#f6faf9' }}
        >
          {/* Abstract decoration layer — no strips, just soft shapes */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            {/* Soft radial glow behind content */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[400px] rounded-full blur-3xl"
              style={{
                background: 'radial-gradient(ellipse, rgba(9,56,62,0.1) 0%, transparent 70%)',
              }}
            />

            {/* Corner accent rings — top-left cluster */}
            <div
              className="absolute -top-20 -left-20 w-64 h-64 rounded-full border"
              style={{ borderColor: 'rgba(9,56,62,0.08)' }}
            />
            <div
              className="absolute -top-40 -left-40 w-[26rem] h-[26rem] rounded-full border"
              style={{ borderColor: 'rgba(9,56,62,0.05)' }}
            />
            <div
              className="absolute -top-64 -left-64 w-[34rem] h-[34rem] rounded-full border"
              style={{ borderColor: 'rgba(9,56,62,0.03)' }}
            />

            {/* Corner accent rings — bottom-right cluster */}
            <div
              className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full border"
              style={{ borderColor: 'rgba(9,56,62,0.08)' }}
            />
            <div
              className="absolute -bottom-44 -right-44 w-[28rem] h-[28rem] rounded-full border"
              style={{ borderColor: 'rgba(9,56,62,0.05)' }}
            />

            {/* Floating dot accents */}
            <div
              className="absolute top-[20%] left-[10%] w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: 'rgba(9,56,62,0.3)' }}
            />
            <div
              className="absolute top-[32%] right-[14%] w-2 h-2 rounded-full"
              style={{ backgroundColor: 'rgba(9,56,62,0.22)' }}
            />
            <div
              className="absolute bottom-[28%] left-[16%] w-1 h-1 rounded-full"
              style={{ backgroundColor: 'rgba(9,56,62,0.26)' }}
            />
            <div
              className="absolute bottom-[36%] right-[10%] w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: 'rgba(9,56,62,0.22)' }}
            />

            {/* Dotted grid patch — top right */}
            <svg
              className="absolute top-10 right-10 w-28 h-28 opacity-50"
              viewBox="0 0 100 100"
              aria-hidden
            >
              {Array.from({ length: 6 }).map((_, row) =>
                Array.from({ length: 6 }).map((_, col) => (
                  <circle
                    key={`${row}-${col}`}
                    cx={10 + col * 16}
                    cy={10 + row * 16}
                    r="1"
                    fill="#09383e"
                  />
                )),
              )}
            </svg>

            {/* Dotted grid patch — bottom left */}
            <svg
              className="absolute bottom-10 left-10 w-28 h-28 opacity-50"
              viewBox="0 0 100 100"
              aria-hidden
            >
              {Array.from({ length: 6 }).map((_, row) =>
                Array.from({ length: 6 }).map((_, col) => (
                  <circle
                    key={`${row}-${col}`}
                    cx={10 + col * 16}
                    cy={10 + row * 16}
                    r="1"
                    fill="#09383e"
                  />
                )),
              )}
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-16 pb-16 lg:pt-24 lg:pb-24 flex flex-col items-center text-center">
            {/* Kicker pill */}
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-semibold mb-6 bg-white border"
              style={{
                borderColor: 'rgba(9,56,62,0.15)',
                color: '#09383e',
              }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping" style={{ backgroundColor: '#09383e' }} />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: '#09383e' }} />
              </span>
              Built for Nepal&apos;s legal &amp; finance professionals
            </span>

            {/* Headline */}
            <h1 className="font-display font-bold text-slate-900 text-[2.5rem] sm:text-[3rem] lg:text-[3.75rem] leading-[1.05] tracking-tight max-w-3xl mb-5">
              Your smart AI{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #09383e 0%, #0d4f57 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                legal research partner.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-slate-600 text-[15px] sm:text-base leading-relaxed max-w-xl mb-9">
              Ask any question about Nepal&apos;s Acts, directives, and gazettes. Get a
              clear answer with the exact source beside it &mdash; in seconds, not hours.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href="https://app.merodafa.com/signup"
                className="inline-flex items-center justify-center px-6 py-3 text-[15px] font-semibold rounded-xl text-white transition-all duration-200 hover:brightness-110"
                style={{
                  background: 'linear-gradient(135deg, #09383e 0%, #0d4f57 100%)',
                  boxShadow: '0 4px 14px rgba(9,56,62,0.3)',
                }}
              >
                Start researching
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center px-6 py-3 text-[15px] font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
              >
                See how it works
              </Link>
            </div>

            {/* Live query demo — rotates through real example questions */}
            <div className="w-full flex justify-center mb-8">
              <AnimatedQuery />
            </div>

            {/* Topic chips */}
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
              {TOPICS.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border bg-white px-3 py-1.5 text-[12px] font-medium text-slate-700 shadow-sm"
                  style={{ borderColor: 'rgba(9,56,62,0.15)' }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
