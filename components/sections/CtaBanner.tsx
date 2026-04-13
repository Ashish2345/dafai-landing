'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { WaitlistModal } from '@/components/ui/WaitlistModal'

export function CtaBanner() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 py-8 sm:py-10">
        <section
          className="relative overflow-hidden rounded-2xl"
          style={{ background: 'linear-gradient(135deg, #0a2024 0%, #071619 60%, #050f11 100%)' }}
        >
          {/* Ambient teal glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 20% 50%, rgba(9,56,62,0.45) 0%, transparent 55%)',
            }}
            aria-hidden
          />

          {/* Animated shimmer across the headline area */}
          <motion.div
            className="absolute inset-y-0 pointer-events-none"
            style={{
              width: '30%',
              background:
                'linear-gradient(90deg, transparent, rgba(94,234,212,0.08), transparent)',
            }}
            animate={{ left: ['-35%', '125%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            aria-hidden
          />

          {/* Content — compact horizontal layout */}
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 px-6 sm:px-8 py-8 sm:py-9">
            <div className="flex flex-col gap-2">
              <span
                className="self-start inline-flex items-center gap-2 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold"
                style={{
                  borderColor: 'rgba(94,234,212,0.25)',
                  backgroundColor: 'rgba(94,234,212,0.08)',
                  color: '#5eead4',
                }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping"
                    style={{ backgroundColor: '#5eead4' }}
                  />
                  <span
                    className="relative inline-flex h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: '#5eead4' }}
                  />
                </span>
                Early access open
              </span>

              <h2 className="font-display font-bold text-xl sm:text-2xl text-white leading-snug">
                Ready to research the law, cited?
              </h2>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="flex-shrink-0 self-start sm:self-auto inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[14px] font-semibold text-white cursor-pointer transition-all duration-200 hover:brightness-110"
              style={{
                background: 'linear-gradient(135deg, #09383e 0%, #0d4f57 100%)',
                boxShadow: '0 6px 18px rgba(9,56,62,0.35)',
              }}
            >
              Get early access
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </section>
      </div>

      <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} source="cta-banner" />
    </>
  )
}
