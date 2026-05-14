'use client'
import { PricingCard } from '@/components/ui/PricingCard'

const plans = [
  {
    tier: 'Free',
    description: 'Students, lawyers, CAs & curious professionals',
    price: 'Rs 0',
    period: undefined,
    features: [
      '5 questions per day',
      'Latest 1 year of Nepal Gazette',
      'English & Nepali answers',
      'Star & save responses',
      'Email support',
    ],
    cta: 'Create free account',
    highlighted: false,
    ctaTier: 'free',
  },
  {
    tier: 'Pro',
    description: 'Solo CAs, tax lawyers & busy professionals',
    price: 'Rs 499',
    period: '/mo',
    features: [
      'Unlimited questions',
      'Full archive (Gazette 2015–2081)',
      'Unlimited chat history',
      'Hierarchy-aware citations',
      'Priority email support',
      'Single user seat',
    ],
    cta: 'Upgrade to Pro',
    highlighted: true,
    ctaTier: 'pro',
  },
  {
    tier: 'Firm',
    description: 'Audit firms, law firms & in-house tax teams',
    price: 'Rs 2,499',
    period: '/mo',
    features: [
      'Everything in Pro',
      'Up to 10 team seats',
      'Shared workspace & saved searches',
      'Team admin & seat management',
      'Priority chat support',
      'Quarterly review call with a CA',
    ],
    cta: 'Upgrade to Firm',
    highlighted: false,
    ctaTier: 'firm',
  },
]

export function Pricing({ headingAs = 'h2' }: { headingAs?: 'h1' | 'h2' } = {}) {
  const Heading = headingAs

  function handleCta() {
    window.location.href = 'https://app.merodafa.com/signup'
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
                <Heading className="font-display font-bold text-slate-900 text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight tracking-tight max-w-2xl">
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
                </Heading>
                <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                  Start free, upgrade to Pro for Rs 499/mo when you need unlimited questions and the full Gazette archive.
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
                    onCtaClick={handleCta}
                  />
                ))}
              </div>

              {/* Enterprise / BFSI footnote */}
              <p className="text-center text-sm text-slate-500 mt-10 max-w-2xl mx-auto leading-relaxed">
                Need on-premise deployment, API access, or BFSI compliance for a bank or insurance company?{' '}
                <a
                  href="mailto:support@merodafa.com?subject=Enterprise%20%2F%20BFSI%20enquiry"
                  className="font-medium underline-offset-2 hover:underline"
                  style={{ color: '#09383e' }}
                >
                  Talk to us about Enterprise
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
