'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { WaitlistModal } from '@/components/ui/WaitlistModal'

export function CtaBanner() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div className="mx-auto max-w-[1620px] px-4 sm:px-6 py-8 sm:py-10">
        <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
          {/* Background — deep teal-dark gradient matching hero */}
          <div className="absolute inset-0 -z-10" style={{
            background: 'linear-gradient(180deg, #0B1120 0%, #111a2e 50%, #0f1829 100%)',
          }} />

          {/* Subtle grid */}
          <div className="absolute inset-0 -z-10 opacity-[0.02]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }} />

          {/* Ambient teal glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] -z-10 pointer-events-none" style={{
            background: 'radial-gradient(ellipse at center, rgba(9,56,62,0.35) 0%, transparent 70%)',
          }} />

          {/* Left orb */}
          <div className="absolute -left-24 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full -z-10 pointer-events-none" style={{
            background: 'radial-gradient(circle, rgba(9,56,62,0.25) 0%, transparent 70%)',
          }} />

          {/* Right orb */}
          <div className="absolute -right-24 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full -z-10 pointer-events-none" style={{
            background: 'radial-gradient(circle, rgba(13,79,87,0.2) 0%, transparent 70%)',
          }} />

          {/* Content */}
          <div className="mx-auto max-w-2xl px-5 sm:px-8 py-20 sm:py-28 flex flex-col items-center text-center">
            {/* Pill */}
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-medium mb-6"
              style={{
                border: '1px solid rgba(9,56,62,0.4)',
                backgroundColor: 'rgba(9,56,62,0.15)',
                color: '#2DD4BF',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
              Early access — limited spots
            </span>

            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight tracking-tight mb-4">
              Ready to transform your
              <br className="hidden sm:block" />
              compliance workflow?
            </h2>

            <p className="text-slate-400 text-sm sm:text-base max-w-md mb-8 leading-relaxed">
              Join 500+ CAs and finance professionals who are already on the waitlist
              for Nepal&apos;s smartest legal research tool.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="primary" size="md" onClick={() => setModalOpen(true)}>
                Get early access — free
              </Button>
              <Button variant="outline" size="md" onClick={() => { window.location.href = '#pricing' }}>
                View pricing
              </Button>
            </div>
          </div>
        </section>
      </div>

      <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} source="cta-banner" />
    </>
  )
}
