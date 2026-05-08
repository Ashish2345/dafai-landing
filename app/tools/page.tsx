import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbListSchema, SITE_URL } from '@/lib/seo/schema'

export const metadata: Metadata = {
  title: 'Free Tools — Nepal Tax & Compliance',
  description:
    "Free, no-signup calculators and reference tools for Nepal's salaried employees, CAs, and HR teams. Salary TDS, VAT, and more — all kept current with the latest Finance Act.",
  alternates: { canonical: '/tools' },
  openGraph: {
    title: 'Free Tools for Nepal Tax & Compliance — Mero Dafa',
    description:
      "Free calculators for Nepal's salaried employees, CAs, and HR teams. Always updated with the latest Finance Act.",
    url: '/tools',
    type: 'website',
  },
}

type Tool = {
  href: string
  title: string
  description: string
  audience: string
  status: 'live' | 'soon'
  icon: 'calc' | 'doc' | 'percent' | 'chart' | 'car'
}

const TOOLS: Tool[] = [
  {
    href: '/tools/salary-tax-calculator',
    title: 'Salary Tax Calculator (FY 2081/82)',
    description:
      'Calculate monthly TDS for any salaried employee in Nepal. Single & couple slabs, with CIT, SSF, life and health insurance deductions handled.',
    audience: 'Employees · HR · CAs',
    status: 'live',
    icon: 'calc',
  },
  {
    href: '/tools/vat-calculator',
    title: 'VAT Calculator (13%)',
    description:
      'Add or extract 13% Nepal VAT on any invoice. Multi-line mode for line-item invoices with running totals.',
    audience: 'Accountants · Small businesses',
    status: 'live',
    icon: 'percent',
  },
  {
    href: '/tools/share-cgt-calculator',
    title: 'NEPSE Share Profit & CGT Calculator',
    description:
      'See your real bankable profit on NEPSE trades — broker commission, SEBON fee, DP charge, and Capital Gains Tax (7.5%/5%/10%) all handled.',
    audience: 'Investors · Brokers · CAs',
    status: 'live',
    icon: 'chart',
  },
  {
    href: '/tools/bluebook-fine-calculator',
    title: 'Bluebook Fine & Vehicle Tax Calculator',
    description:
      'Vehicle tax + late renewal penalty (5%/10%/20%/32% bands) for two- and four-wheelers. Bagmati rates with manual override for other provinces.',
    audience: 'Vehicle owners · Bike & car drivers',
    status: 'live',
    icon: 'car',
  },
  {
    href: '/tools/finance-act-changelog',
    title: 'Finance Act Changelog',
    description:
      'Side-by-side diff of every Finance Act change since 2078 — what was deleted, what was added, what was amended.',
    audience: 'CAs · Tax lawyers',
    status: 'soon',
    icon: 'doc',
  },
]

export default function ToolsIndexPage() {
  return (
    <main className="bg-white pb-16">
      <JsonLd
        id="ld-tools-breadcrumb"
        data={breadcrumbListSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Tools', url: `${SITE_URL}/tools` },
        ])}
      />
      <JsonLd
        id="ld-tools-collection"
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Free Tools — Nepal Tax & Compliance',
          url: `${SITE_URL}/tools`,
          description:
            "Free, no-signup calculators for Nepal's salaried employees, CAs, and HR teams.",
          hasPart: TOOLS.filter((t) => t.status === 'live').map((t) => ({
            '@type': 'WebApplication',
            name: t.title,
            url: `${SITE_URL}${t.href}`,
            applicationCategory: 'FinanceApplication',
            description: t.description,
            isAccessibleForFree: true,
          })),
        }}
      />

      <PageHero
        kicker="Free tools"
        title="Calculators that"
        titleAccent="stay current."
        description={
          <>
            Free, no-signup tools for Nepal&apos;s salaried employees, CAs, and HR
            teams. Always updated with the latest Finance Act.
          </>
        }
      />

      <section className="px-4 sm:px-6 pt-8 sm:pt-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOOLS.map((t) => {
              const card = (
                <div
                  className={`group flex flex-col h-full bg-white rounded-2xl border border-slate-200 p-7 transition-all duration-200 ${
                    t.status === 'live'
                      ? 'hover:border-[#09383e]/30 hover:shadow-[0_4px_18px_rgba(9,56,62,0.06)]'
                      : 'opacity-70'
                  }`}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{
                      backgroundColor: 'rgba(9,56,62,0.08)',
                      color: '#09383e',
                    }}
                  >
                    <ToolIcon name={t.icon} />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="font-display font-semibold text-lg text-slate-900 leading-snug group-hover:text-[#09383e] transition-colors flex-1">
                      {t.title}
                    </h2>
                    {t.status === 'soon' && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
                        Soon
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-4">
                    {t.description}
                  </p>
                  <p className="text-xs text-slate-400">{t.audience}</p>
                  {t.status === 'live' && (
                    <p className="mt-4 text-sm font-medium inline-flex items-center gap-1.5"
                       style={{ color: '#09383e' }}>
                      Open tool
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </p>
                  )}
                </div>
              )
              return t.status === 'live' ? (
                <Link key={t.href} href={t.href} className="block h-full">
                  {card}
                </Link>
              ) : (
                <div key={t.href} className="block h-full" aria-disabled>
                  {card}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

function ToolIcon({ name }: { name: 'calc' | 'doc' | 'percent' | 'chart' | 'car' }) {
  if (name === 'calc') {
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m-6 4h6m-6 4h4M5 5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5z" />
      </svg>
    )
  }
  if (name === 'percent') {
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 5L5 19m2-12a2 2 0 11-4 0 2 2 0 014 0zm14 12a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  }
  if (name === 'chart') {
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M7 14l4-4 4 4 5-7" />
      </svg>
    )
  }
  if (name === 'car') {
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l1.5-4.5A2 2 0 016.4 3h11.2a2 2 0 011.9 1.5L21 9m-18 0v9a1 1 0 001 1h2a1 1 0 001-1v-2h12v2a1 1 0 001 1h2a1 1 0 001-1V9m-18 0h18M7 14a1 1 0 100-2 1 1 0 000 2zm10 0a1 1 0 100-2 1 1 0 000 2z" />
      </svg>
    )
  }
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" />
    </svg>
  )
}
