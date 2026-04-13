import type { ReactNode } from 'react'

type PageHeroProps = {
  kicker: string
  title: ReactNode
  /** If provided, this string is gradient-colored at the end of the title. */
  titleAccent?: string
  description?: ReactNode
  children?: ReactNode
}

/**
 * Shared page header — matches the home page Hero treatment:
 * bordered card, subtle teal tint, decorative rings & dots,
 * pill kicker, gradient accent on title.
 */
export function PageHero({ kicker, title, titleAccent, description, children }: PageHeroProps) {
  return (
    <section className="px-4 sm:px-6 pt-8">
      <div
        className="relative mx-auto max-w-[1400px] overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200"
        style={{ backgroundColor: '#f6faf9' }}
      >
        {/* Decorative layer */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute -top-20 -left-20 w-64 h-64 rounded-full border"
            style={{ borderColor: 'rgba(9,56,62,0.08)' }}
          />
          <div
            className="absolute -top-40 -left-40 w-[26rem] h-[26rem] rounded-full border"
            style={{ borderColor: 'rgba(9,56,62,0.05)' }}
          />
          <div
            className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full border"
            style={{ borderColor: 'rgba(9,56,62,0.08)' }}
          />
          <div
            className="absolute -bottom-44 -right-44 w-[28rem] h-[28rem] rounded-full border"
            style={{ borderColor: 'rgba(9,56,62,0.05)' }}
          />

          {/* Floating dots */}
          <div
            className="absolute top-[25%] right-[12%] w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: 'rgba(9,56,62,0.28)' }}
          />
          <div
            className="absolute bottom-[30%] left-[10%] w-2 h-2 rounded-full"
            style={{ backgroundColor: 'rgba(9,56,62,0.22)' }}
          />

          {/* Radial glow */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[280px] rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(ellipse, rgba(9,56,62,0.08) 0%, transparent 70%)',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-14 pb-14 lg:pt-20 lg:pb-20 flex flex-col items-center text-center">
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-semibold mb-5 bg-white border"
            style={{ borderColor: 'rgba(9,56,62,0.15)', color: '#09383e' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#09383e' }} />
            {kicker}
          </span>

          <h1 className="font-display font-bold text-slate-900 text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.08] tracking-tight max-w-3xl mb-5">
            {title}
            {titleAccent && (
              <>
                {' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #09383e 0%, #0d4f57 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {titleAccent}
                </span>
              </>
            )}
          </h1>

          {description && (
            <p className="text-slate-600 text-[15px] sm:text-base leading-relaxed max-w-xl">
              {description}
            </p>
          )}

          {children && <div className="mt-8 w-full flex justify-center">{children}</div>}
        </div>
      </div>
    </section>
  )
}
