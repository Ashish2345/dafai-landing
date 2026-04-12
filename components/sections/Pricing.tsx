'use client'
import { useState } from 'react'
import { PricingCard } from '@/components/ui/PricingCard'
import { WaitlistModal } from '@/components/ui/WaitlistModal'

const plans = [
  {
    tier: 'Starter',
    description: 'Solo CAs',
    price: 'रू 1,999',
    period: '/mo',
    features: [
      'Unlimited search',
      'Latest 2 years of Gazette',
      'Standard RAG chat',
      '5 PDF downloads/day',
      'Email support',
    ],
    cta: 'Get Early Access',
    highlighted: false,
    ctaTier: 'starter',
  },
  {
    tier: 'Pro',
    description: 'Audit Firms (5–20 staff)',
    price: 'रू 7,999',
    period: '/mo',
    features: [
      'Everything in Starter',
      'Full archive (2015–2081)',
      'Priority table parsing',
      'Unlimited PDF downloads',
      'Team collaboration folders',
    ],
    cta: 'Get Early Access',
    highlighted: true,
    ctaTier: 'pro',
  },
  {
    tier: 'Enterprise',
    description: 'Banks, Insurance & MNCs',
    price: 'Contact Sales',
    period: undefined,
    features: [
      'Everything in Pro',
      'Dedicated account manager',
      'On-prem / private cloud',
      'API access',
      'Custom legal logic',
    ],
    cta: 'Contact Sales',
    highlighted: false,
    ctaTier: 'enterprise',
  },
]

export function Pricing() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState<string | undefined>(undefined)

  function handleCta(plan: (typeof plans)[number]) {
    if (plan.ctaTier === 'enterprise') {
      window.location.href = 'mailto:sales@dafa.ai'
    } else {
      setSelectedTier(plan.ctaTier)
      setModalOpen(true)
    }
  }

  return (
    <>
      <section id="pricing" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-[1620px] px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="flex flex-col items-center text-center gap-4 mb-14">
            <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: '#09383e' }}>
              PRICING
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-midnight">
              Simple, Transparent Pricing.
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Start free during early access. Lock in founding-member rates before we launch publicly.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <PricingCard
                key={plan.tier}
                tier={plan.tier}
                description={plan.description}
                price={plan.price}
                period={plan.period}
                features={plan.features}
                cta={plan.cta}
                highlighted={plan.highlighted}
                onCtaClick={() => handleCta(plan)}
              />
            ))}
          </div>
        </div>
      </section>

      <WaitlistModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        tier={selectedTier}
        source="pricing"
      />
    </>
  )
}
