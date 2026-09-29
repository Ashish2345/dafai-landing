import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbListSchema, SITE_URL } from '@/lib/seo/schema'
import { socialMeta } from '@/lib/seo/metadata'
import { ToolIcon } from '@/components/tools/ToolIcon'
import { TOOLS } from '@/lib/tools-registry'

const PAGE_TITLE = 'Free Tools — Nepal Tax & Compliance'
const PAGE_DESCRIPTION =
  "Free calculators for Nepal tax, law and compliance — salary tax, TDS, VAT, property registration & CGT, NEPSE, gratuity & SSF, court fee, vehicle tax and customs. Updated for Finance Act 2083."

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/tools' },
  ...socialMeta({
    title: 'Free Tools for Nepal Tax & Compliance — Mero Dafa',
    description: PAGE_DESCRIPTION,
    url: '/tools',
  }),
}

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
            url: `${SITE_URL}/tools/${t.slug}`,
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
                <Link key={t.slug} href={`/tools/${t.slug}`} className="block h-full">
                  {card}
                </Link>
              ) : (
                <div key={t.slug} className="block h-full" aria-disabled>
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
