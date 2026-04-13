import { Button } from '@/components/ui/Button'

type PricingCardProps = {
  tier: string
  description: string
  price: string
  period?: string
  features: string[]
  cta: string
  highlighted?: boolean
  onCtaClick: () => void
}

export function PricingCard({
  tier,
  description,
  price,
  period,
  features,
  cta,
  highlighted = false,
  onCtaClick,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl p-8 flex flex-col gap-6 bg-white ${
        highlighted
          ? 'border-2 shadow-lg'
          : 'border border-slate-200'
      }`}
      style={highlighted ? { borderColor: '#09383e', boxShadow: '0 8px 30px rgba(9,56,62,0.12)' } : undefined}
    >
      {/* Most Popular badge */}
      {highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-block text-white text-xs font-semibold uppercase tracking-widest px-4 py-1 rounded-full shadow-sm" style={{ backgroundColor: '#09383e' }}>
            Most Popular
          </span>
        </div>
      )}

      {/* Tier + description */}
      <div className="flex flex-col gap-1.5">
        <h3 className="text-lg font-semibold text-slate-900">{tier}</h3>
        <p className="text-slate-500 text-sm">{description}</p>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-extrabold text-slate-900">{price}</span>
        {period && <span className="text-slate-400 text-sm">{period}</span>}
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-3 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600">
            <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-emerald/10 flex items-center justify-center">
              <svg
                className="w-2.5 h-2.5 text-emerald"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        variant={highlighted ? 'primary' : 'outline-dark'}
        size="md"
        className="w-full"
        onClick={onCtaClick}
      >
        {cta}
      </Button>
    </div>
  )
}
