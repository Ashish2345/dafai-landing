'use client'
import { PricingCard } from '@/components/ui/PricingCard'

const plans = [
  {
    tier: 'Starter',
    description: 'Solo CAs & students',
    price: 'Free',
    period: undefined,
    features: [
      '10 questions per day',
      'Latest 2 years of Gazette',
      'English & Nepali answers',
      '3 PDF downloads per day',
      'Star & save responses',
      'Email support',
    ],
    cta: 'Create free account',
    highlighted: false,
    ctaTier: 'starter',
  },
  {
    tier: 'Pro',
    description: 'Audit firms & busy CAs',
    price: 'रू 7,999',
    period: '/mo',
    features: [
      'Everything in Starter',
      'Unlimited questions & PDFs',
      'Full archive (2015\u20132081)',
      'Unlimited chat history',
      '50 starred responses',
      'Priority email support',
    ],
    cta: 'Upgrade to Pro',
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
      'On-premise / private cloud',
      'API access',
      'Custom legal logic',
    ],
    cta: 'Contact Sales',
    highlighted: false,
    ctaTier: 'enterprise',
  },
]

export function Pricing() {
  function handleCta(plan: (typeof plans)[number]) {
    if (plan.ctaTier === 'enterprise') {
      window.location.href = 'mailto:support@merodafa.com'
    } else {
      window.location.href = 'https://app.merodafa.com/signup'
    }
  }

  return (
    <>
      <section id="pricing" className="px-4 sm:px-6 py-10 sm:py-14">
        <div className="mx-auto max-w-[1400px]">
          {/* Outer card — subtle tint, decorative rings, matches hero rhythm */}
          <div
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200"
            style={{ backgroundColor: '#f6faf9' }}
          >
            {/* Decorative layer */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
              <div
                className="absolute -top-28 -right-28 w-80 h-80 rounded-full border"
                style={{ borderColor: 'rgba(9,56,62,0.06)' }}
              />
              <div
                className="absolute -top-52 -right-52 w-[28rem] h-[28rem] rounded-full border"
                style={{ borderColor: 'rgba(9,56,62,0.04)' }}
              />
              <div
                className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full border"
                style={{ borderColor: 'rgba(9,56,62,0.06)' }}
              />
              <div
                className="absolute top-[22%] right-[8%] w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: 'rgba(9,56,62,0.3)' }}
              />
              <div
                className="absolute bottom-[18%] left-[9%] w-2 h-2 rounded-full"
                style={{ backgroundColor: 'rgba(9,56,62,0.22)' }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 px-6 sm:px-10 py-14 sm:py-16">
              {/* Section header */}
              <div className="flex flex-col items-center text-center gap-4 mb-12">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-semibold bg-white border"
                  style={{ borderColor: 'rgba(9,56,62,0.15)', color: '#09383e' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#09383e' }} />
                  Pricing
                </span>
                <h2 className="font-display font-bold text-slate-900 text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight tracking-tight max-w-2xl">
                  Pricing that{' '}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #09383e 0%, #0d4f57 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    fits how you work.
                  </span>
                </h2>
                <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                  Start with the free Starter plan. Upgrade when you need unlimited questions and full archive access.
                </p>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
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
          </div>
        </div>
      </section>

    </>
  )
}
