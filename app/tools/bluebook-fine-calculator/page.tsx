import type { Metadata } from 'next'
import Link from 'next/link'
import { BluebookCalculator } from './Calculator'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  breadcrumbListSchema,
  faqPageSchema,
  howToSchema,
  softwareToolSchema,
  SITE_URL,
} from '@/lib/seo/schema'

const PAGE_URL = `${SITE_URL}/tools/bluebook-fine-calculator`
const PAGE_TITLE = 'Bluebook Fine & Vehicle Tax Renewal Calculator'
const PAGE_DESCRIPTION =
  'Find out exactly how much you owe to renew your bike or car bluebook in Nepal — provincial vehicle tax + late renewal penalty (5%, 10%, 20%, 32% bands) calculated automatically.'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/tools/bluebook-fine-calculator' },
  keywords: [
    'bluebook fine calculator nepal',
    'vehicle renewal penalty nepal',
    'bike tax bagmati',
    'car tax nepal',
    'yatayat tax calculator',
    'sawari sadhan kar',
    'bluebook renewal late fee',
    'motor vehicle tax nepal',
    'vehicle registration renewal nepal',
    'transport tax bagmati',
  ],
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/tools/bluebook-fine-calculator',
    type: 'website',
  },
}

const FAQ = [
  {
    question: 'What is the bluebook renewal penalty in Nepal?',
    answer:
      'Per the Department of Transport Management practice: 0% in the first 30 days from your registration expiry (grace period), 5% from days 31–45, 10% from days 46–60, 20% from day 61 until the end of the current fiscal year, and 32% if you renew after the fiscal year ends (Ashadh 31, ~July 15). The penalty is computed as a percentage of your annual base vehicle tax.',
  },
  {
    question: 'When does the Nepali fiscal year end for vehicle tax purposes?',
    answer:
      'The Nepali fiscal year ends on Ashadh 31, which is approximately July 15 in the Gregorian calendar each year. If your registration expired during the current fiscal year and you renew before that date, you pay 0–20% penalty depending on how late you are. Once Ashadh 31 passes, the penalty jumps to 32%.',
  },
  {
    question: 'How do I find my exact base vehicle tax amount?',
    answer:
      'Vehicle tax rates differ by province and are revised every year via the provincial Finance Act. Bagmati Province publishes its rates around the start of each fiscal year. You can also check the leaflet posted at any Yatayat Vyavasthapan Karyalaya (transport office) — these are usually the most up-to-date sources. If your province isn’t in the calculator yet, use the manual override field with the rate from your transport-office reference.',
  },
  {
    question: 'Does this calculator include pollution tax and insurance?',
    answer:
      'No. This calculator handles only the annual vehicle tax (सवारी कर) and the late-renewal penalty. Other components of a renewal bill — pollution tax (4-wheelers), third-party insurance (mandatory), road tax, and route-permit fees for commercial vehicles — are billed separately and have their own rate structures.',
  },
  {
    question: 'What happens if I drive without renewing?',
    answer:
      'Driving an unregistered or expired-registration vehicle is an offense under the Motor Vehicles and Transport Management Act 2049. Traffic police can fine you on-spot and impound the vehicle. The on-spot fine is separate from — and on top of — the renewal penalty you’ll owe at the transport office. The longer you wait, the more both costs grow.',
  },
  {
    question: 'Are EVs and commercial vehicles handled the same way?',
    answer:
      'No. EVs (electric vehicles) have a different tax structure and often qualify for reduced or zero vehicle tax under provincial Finance Acts. Commercial vehicles, taxis, public transport, and route-permit holders pay different annual rates. This calculator targets private two- and four-wheelers; for commercial use, consult your transport office or a CA.',
  },
]

const HOW_TO_STEPS = [
  {
    name: 'Enter your vehicle and engine size',
    text: 'Pick two-wheeler or four-wheeler, then type your engine capacity in cc. The calculator matches your cc to the right tier in the provincial rate table.',
  },
  {
    name: 'Pick your province',
    text: 'Bagmati province has the rate table shipped by default. For other provinces, tick "Enter base tax manually" and type the amount from your transport-office leaflet.',
  },
  {
    name: 'Enter your registration expiry date',
    text: 'This is the date printed on your bluebook (registration certificate). The calculator counts days from this date to today and applies the correct penalty band — 0%, 5%, 10%, 20%, or 32%.',
  },
  {
    name: 'Read the breakdown',
    text: 'The right-side panel shows your base vehicle tax, the penalty applied, and the total amount you need to take to the transport office today.',
  },
]

export default function BluebookCalculatorPage() {
  return (
    <main className="bg-white pb-16 pt-8">
      <JsonLd
        id="ld-bb-software"
        data={softwareToolSchema({
          name: PAGE_TITLE,
          url: PAGE_URL,
          description: PAGE_DESCRIPTION,
        })}
      />
      <JsonLd
        id="ld-bb-howto"
        data={howToSchema({
          name: 'How to calculate your Nepal bluebook renewal cost',
          description:
            'Find out exactly how much your delayed bluebook renewal will cost — vehicle tax plus penalty.',
          url: PAGE_URL,
          totalTimeIso: 'PT1M',
          tools: ['Mero Dafa Bluebook Fine Calculator'],
          steps: HOW_TO_STEPS.map((s) => ({ ...s, url: PAGE_URL })),
        })}
      />
      <JsonLd id="ld-bb-faq" data={faqPageSchema(FAQ)} />
      <JsonLd
        id="ld-bb-breadcrumb"
        data={breadcrumbListSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Tools', url: `${SITE_URL}/tools` },
          { name: 'Bluebook Fine Calculator', url: PAGE_URL },
        ])}
      />

      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-[1100px]">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="text-sm text-slate-500 mb-6 flex items-center gap-1.5"
          >
            <Link href="/" className="hover:text-[#09383e] transition-colors">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link href="/tools" className="hover:text-[#09383e] transition-colors">
              Tools
            </Link>
            <span aria-hidden>/</span>
            <span className="text-slate-700">Bluebook Fine Calculator</span>
          </nav>

          {/* Header */}
          <header className="mb-6 max-w-3xl">
            <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 leading-tight tracking-tight mb-2">
              Bluebook Fine{' '}
              <span className="text-slate-500 font-medium">& Vehicle Tax Calculator</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Annual vehicle tax + late-renewal penalty (5% → 10% → 20% → 32%) for
              two- and four-wheelers. Bagmati rates shipped, manual override for
              other provinces.
            </p>
          </header>

          {/* Calculator card */}
          <section
            className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 lg:p-8 mb-10"
            aria-labelledby="bb-calculator-heading"
          >
            <h2 id="bb-calculator-heading" className="sr-only">
              Calculator
            </h2>
            <BluebookCalculator />
          </section>

          {/* Long-form explainer (collapsed by default — for SEO + curious readers) */}
          <details className="group max-w-3xl mx-auto rounded-xl border border-slate-200 bg-white">
            <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer list-none">
              <span className="flex items-center gap-2 text-sm font-medium text-slate-900">
                <svg
                  className="w-4 h-4 text-[#09383e]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Penalty bands, Bagmati rate tables & FAQ
              </span>
              <svg
                className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <article className="px-5 sm:px-8 py-6 border-t border-slate-100 prose prose-slate max-w-none">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900 leading-tight mt-2 mb-5">
              How the bluebook renewal penalty works
            </h2>
            <p className="text-slate-700 text-base leading-relaxed mb-5">
              Nepal&apos;s vehicle registration system runs annually. Your
              bluebook (the registration certificate) shows the date your
              current registration expires, usually one year from your last
              renewal. Once that date passes, the Department of Transport
              Management applies a graduated penalty — small at first, then
              steeper the longer you delay.
            </p>

            <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
              Penalty bands
            </h2>
            <div className="overflow-x-auto rounded-lg border border-slate-200 mb-5">
              <table className="w-full min-w-[480px] text-sm">
                <thead className="bg-slate-50 text-slate-900">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">Days late</th>
                    <th className="text-left px-4 py-3 font-semibold">Penalty</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3">≤ 30 days</td>
                    <td className="px-4 py-3 font-semibold">0% — grace period</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50/40">
                    <td className="px-4 py-3">31 – 45 days</td>
                    <td className="px-4 py-3 font-semibold">5% of base tax</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3">46 – 60 days</td>
                    <td className="px-4 py-3 font-semibold">10% of base tax</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50/40">
                    <td className="px-4 py-3">61+ days, same FY</td>
                    <td className="px-4 py-3 font-semibold">20% of base tax</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3">After Ashadh 31 (next FY)</td>
                    <td className="px-4 py-3 font-semibold">32% of base tax</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
              Bagmati Province vehicle tax (FY 2081/82)
            </h2>
            <p className="text-xs text-amber-700 mb-3">
              ⚠ Verify against the Bagmati Provincial Finance Act 2081 or your
              transport-office leaflet before paying. Rates revise annually.
            </p>
            <h3 className="font-display font-semibold text-base text-slate-900 mb-2">
              Two-wheelers
            </h3>
            <div className="overflow-x-auto rounded-lg border border-slate-200 mb-4">
              <table className="w-full min-w-[400px] text-sm">
                <thead className="bg-slate-50 text-slate-900">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">Engine cc</th>
                    <th className="text-left px-4 py-3 font-semibold">Annual tax</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3">Up to 125 cc</td>
                    <td className="px-4 py-3">Rs 3,000</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50/40">
                    <td className="px-4 py-3">126 – 250 cc</td>
                    <td className="px-4 py-3">Rs 6,500</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3">251 – 400 cc</td>
                    <td className="px-4 py-3">Rs 12,000</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50/40">
                    <td className="px-4 py-3">401 – 650 cc</td>
                    <td className="px-4 py-3">Rs 25,000</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3">Above 650 cc</td>
                    <td className="px-4 py-3">Rs 36,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-display font-semibold text-base text-slate-900 mb-2">
              Four-wheelers (private cars / jeeps / vans)
            </h3>
            <div className="overflow-x-auto rounded-lg border border-slate-200 mb-5">
              <table className="w-full min-w-[400px] text-sm">
                <thead className="bg-slate-50 text-slate-900">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">Engine cc</th>
                    <th className="text-left px-4 py-3 font-semibold">Annual tax</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3">Up to 1,000 cc</td>
                    <td className="px-4 py-3">Rs 21,000</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50/40">
                    <td className="px-4 py-3">1,001 – 1,500 cc</td>
                    <td className="px-4 py-3">Rs 23,500</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3">1,501 – 2,000 cc</td>
                    <td className="px-4 py-3">Rs 25,500</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50/40">
                    <td className="px-4 py-3">2,001 – 2,500 cc</td>
                    <td className="px-4 py-3">Rs 35,500</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3">2,501 – 2,900 cc</td>
                    <td className="px-4 py-3">Rs 41,000</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50/40">
                    <td className="px-4 py-3">2,901 – 3,500 cc</td>
                    <td className="px-4 py-3">Rs 49,000</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3">Above 3,500 cc</td>
                    <td className="px-4 py-3">Rs 58,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
              Worked example
            </h2>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 mb-5">
              <p className="text-slate-700 text-sm leading-relaxed mb-2">
                Bagmati two-wheeler, <strong>150 cc</strong>, registration expired{' '}
                <strong>50 days ago</strong> (still within current FY).
              </p>
              <ul className="space-y-0.5 text-sm text-slate-600 list-none pl-0 mb-3 font-mono">
                <li>Tier: 126–250 cc</li>
                <li>Base annual tax: Rs 6,500</li>
                <li>Days late: 50 → falls in 46–60 band</li>
                <li>Penalty rate: 10%</li>
                <li>Penalty: Rs 6,500 × 10% = Rs 650</li>
                <li className="font-semibold text-slate-900">
                  Total payable: Rs 7,150
                </li>
              </ul>
            </div>

            <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
              FAQ
            </h2>
            <div className="space-y-5">
              {FAQ.map((it) => (
                <div key={it.question}>
                  <h3 className="font-display font-semibold text-base text-slate-900 mb-1.5">
                    {it.question}
                  </h3>
                  <p className="text-slate-700 text-[15px] leading-relaxed">
                    {it.answer}
                  </p>
                </div>
              ))}
            </div>
            </article>
          </details>

          {/* Cross-link CTA */}
          <aside
            className="mt-16 rounded-2xl px-8 py-10 flex flex-col items-center text-center gap-3 max-w-3xl mx-auto"
            style={{ background: 'linear-gradient(135deg, #09383e 0%, #0d4f57 100%)' }}
          >
            <h2 className="font-display font-bold text-2xl text-white max-w-md">
              Need the full Motor Vehicles Act, not just the math?
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed max-w-md">
              Mero Dafa indexes the Motor Vehicles and Transport Management Act
              2049, every provincial Finance Act revision of vehicle tax, and
              IRD circulars on transport — answered with the exact section
              reference and the original Gazette page beside it.
            </p>
            <Link
              href="/pricing"
              className="mt-3 inline-flex items-center justify-center rounded-full bg-white font-semibold px-6 py-3 text-sm transition-all duration-200 hover:brightness-95 cursor-pointer"
              style={{ color: '#09383e' }}
            >
              Try Mero Dafa free →
            </Link>
          </aside>
        </div>
      </section>
    </main>
  )
}
