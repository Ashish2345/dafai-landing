import type { Metadata } from 'next'
import Link from 'next/link'
import { NepseCgtCalculator } from './Calculator'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  breadcrumbListSchema,
  faqPageSchema,
  howToSchema,
  softwareToolSchema,
  SITE_URL,
} from '@/lib/seo/schema'

const PAGE_URL = `${SITE_URL}/tools/share-cgt-calculator`
const PAGE_TITLE = 'NEPSE Share Profit & CGT Calculator'
const PAGE_DESCRIPTION =
  'Calculate your real bankable profit on NEPSE share trades — broker commission, SEBON fee, DP charge, and Capital Gains Tax (7.5%/5%/10%) all handled. For individual & institutional investors.'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/tools/share-cgt-calculator' },
  keywords: [
    'nepse cgt calculator',
    'capital gains tax nepal',
    'nepse share profit calculator',
    'broker commission calculator nepal',
    'sebon fee calculator',
    'cgt nepal 7.5 percent',
    'long term capital gains nepal',
    'short term capital gains nepal',
    'share trading tax nepal',
    'dp charge cdsc',
  ],
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/tools/share-cgt-calculator',
    type: 'website',
  },
}

const FAQ = [
  {
    question: 'What is the Capital Gains Tax rate on NEPSE shares?',
    answer:
      'For resident individual investors: 7.5% if shares are held for 365 days or less (short-term), 5% if held for more than 365 days (long-term). For resident institutional investors (companies, mutual funds): 10% flat, regardless of holding period. CGT only applies on a positive capital gain — losses do not generate a tax obligation.',
  },
  {
    question: 'How is the holding period counted for CGT?',
    answer:
      'The holding period is the number of days between the buy date (T+settlement) and the sell date. If the gap is 365 days or less, the trade is short-term and CGT is 7.5% (individuals). If the gap is more than 365 days, the trade is long-term and CGT drops to 5%. For institutional investors the holding period does not change the rate (10% flat).',
  },
  {
    question: 'How is broker commission calculated on NEPSE?',
    answer:
      'Per the SEBON Brokerage Commission Regulation, commission rates are slabbed by transaction value: up to Rs 50,000 → 0.40%; Rs 50,001–5,00,000 → 0.37%; Rs 5,00,001–20,00,000 → 0.34%; Rs 20,00,001–1,00,00,000 → 0.30%; above Rs 1 crore → 0.27%. The minimum commission per transaction is Rs 10. Commission is charged on both the buy and the sell leg separately.',
  },
  {
    question: 'What other charges apply besides broker commission?',
    answer:
      'Two more deductions besides broker commission: (1) SEBON Regulatory Fee at 0.015% of transaction value, on both buy and sell legs; (2) CDSC Depository (DP) Charge of Rs 25 per transaction, also on both legs. Plus, on the sell side, Capital Gains Tax is deducted at source by the broker before crediting your bank.',
  },
  {
    question: 'Is the CGT amount deducted automatically?',
    answer:
      'Yes. The broker deducts CGT at source from your sell-side proceeds and remits it to the Inland Revenue Department on your behalf, just like TDS on salary. The amount you see credited to your bank is already net of CGT. You should still report your capital gains in your annual income tax return — the CGT deducted is a credit you can offset against your overall tax liability.',
  },
  {
    question: 'What if I sold at a loss?',
    answer:
      'No CGT applies on a loss. Capital losses on listed securities can be carried forward and set off against future capital gains under Section 36 of the Income Tax Act 2058 — but only against capital gains, not against business or salary income. Keep transaction records (broker contract notes, DP bills) for the carry-forward claim.',
  },
  {
    question: 'Are bonus shares and right shares handled differently?',
    answer:
      'Yes — and this calculator does NOT model them. For bonus shares, the IRD treats the cost base as the average of all holdings (existing + bonus) at the original purchase prices, weighted by quantity. For right shares, the cost base is the right-issue price you paid plus your share of original costs. Consult a CA for portfolio-level CGT calculations involving corporate actions.',
  },
]

const HOW_TO_STEPS = [
  {
    name: 'Choose investor type',
    text: 'Pick "Individual" for a person trading in their own name, or "Institutional" for a company, mutual fund, or other registered entity. This determines the CGT rate (7.5%/5% holding-period-based for individuals, 10% flat for institutions).',
  },
  {
    name: 'Enter trade details',
    text: 'Type the quantity of shares, the buy price per share, the sell price per share, the buy date, and the sell date. The calculator computes the holding period from the dates and applies the correct CGT rate automatically.',
  },
  {
    name: 'Read the breakdown',
    text: 'The right-side panel shows your buy-leg total cost (including broker commission, SEBON fee, and DP charge), your sell-leg expenses, the resulting capital gain, the CGT applied, and finally the exact net amount you will receive in your bank.',
  },
]

export default function SharCgtCalculatorPage() {
  return (
    <main className="bg-white pb-16 pt-8">
      <JsonLd
        id="ld-cgt-software"
        data={softwareToolSchema({
          name: PAGE_TITLE,
          url: PAGE_URL,
          description: PAGE_DESCRIPTION,
        })}
      />
      <JsonLd
        id="ld-cgt-howto"
        data={howToSchema({
          name: 'How to calculate net profit and CGT on NEPSE shares',
          description:
            'Compute your real bankable profit on a NEPSE share trade — including all transaction costs and Capital Gains Tax.',
          url: PAGE_URL,
          totalTimeIso: 'PT2M',
          tools: ['Mero Dafa NEPSE CGT Calculator'],
          steps: HOW_TO_STEPS.map((s) => ({ ...s, url: PAGE_URL })),
        })}
      />
      <JsonLd id="ld-cgt-faq" data={faqPageSchema(FAQ)} />
      <JsonLd
        id="ld-cgt-breadcrumb"
        data={breadcrumbListSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Tools', url: `${SITE_URL}/tools` },
          { name: 'Share Profit & CGT Calculator', url: PAGE_URL },
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
            <span className="text-slate-700">Share Profit & CGT Calculator</span>
          </nav>

          {/* Header */}
          <header className="mb-6 max-w-3xl">
            <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 leading-tight tracking-tight mb-2">
              NEPSE Share Profit{' '}
              <span className="text-slate-500 font-medium">& CGT Calculator</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Real bankable profit after broker commission, SEBON fee, DP charge, and
              CGT (7.5% / 5% / 10%) — for individual and institutional investors.
            </p>
          </header>

          {/* Calculator card */}
          <section
            className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 lg:p-8 mb-10"
            aria-labelledby="cgt-calculator-heading"
          >
            <h2 id="cgt-calculator-heading" className="sr-only">
              Calculator
            </h2>
            <NepseCgtCalculator />
          </section>

          {/* Long-form explainer (collapsed by default) */}
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
                Broker tiers, CGT rates, worked example & FAQ
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
              The math behind your NEPSE profit
            </h2>
            <p className="text-slate-700 text-base leading-relaxed mb-5">
              When you sell a share, what you actually receive in your bank is
              meaningfully different from <em>(sell price − buy price) × quantity</em>.
              Three regulatory deductions and one tax sit between you and the
              gross profit you see on screen. This calculator walks through each
              one in the order brokers apply them.
            </p>

            <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
              SEBON broker commission tiers
            </h2>
            <div className="overflow-x-auto rounded-lg border border-slate-200 mb-3">
              <table className="w-full min-w-[480px] text-sm">
                <thead className="bg-slate-50 text-slate-900">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">Transaction value (per leg)</th>
                    <th className="text-left px-4 py-3 font-semibold">Rate</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3">Up to Rs 50,000</td>
                    <td className="px-4 py-3">0.40%</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50/40">
                    <td className="px-4 py-3">Rs 50,001 – Rs 5,00,000</td>
                    <td className="px-4 py-3">0.37%</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3">Rs 5,00,001 – Rs 20,00,000</td>
                    <td className="px-4 py-3">0.34%</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50/40">
                    <td className="px-4 py-3">Rs 20,00,001 – Rs 1,00,00,000</td>
                    <td className="px-4 py-3">0.30%</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3">Above Rs 1 crore</td>
                    <td className="px-4 py-3">0.27%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mb-8">
              Source: SEBON Brokerage Commission Regulation. Minimum Rs 10 per
              transaction. Applied to both buy and sell legs separately.
            </p>

            <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
              Capital Gains Tax rates
            </h2>
            <div className="overflow-x-auto rounded-lg border border-slate-200 mb-5">
              <table className="w-full min-w-[480px] text-sm">
                <thead className="bg-slate-50 text-slate-900">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">Investor</th>
                    <th className="text-left px-4 py-3 font-semibold">Holding period</th>
                    <th className="text-left px-4 py-3 font-semibold">CGT rate</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3">Individual</td>
                    <td className="px-4 py-3">≤ 365 days (short-term)</td>
                    <td className="px-4 py-3 font-semibold">7.5%</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50/40">
                    <td className="px-4 py-3">Individual</td>
                    <td className="px-4 py-3">&gt; 365 days (long-term)</td>
                    <td className="px-4 py-3 font-semibold">5%</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3">Institutional</td>
                    <td className="px-4 py-3">Any (no holding rule)</td>
                    <td className="px-4 py-3 font-semibold">10%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
              The full calculation
            </h2>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 mb-5 font-mono text-sm">
              <p className="mb-2 text-slate-700">
                <span className="text-slate-500">// Buy leg (cash out)</span>
              </p>
              <p className="mb-2 text-slate-700">
                Total buy cost = (qty × buy_price) + buy_commission + buy_sebon + Rs 25
              </p>
              <p className="mb-2 text-slate-700">
                <span className="text-slate-500">// Sell leg (gross proceeds)</span>
              </p>
              <p className="mb-2 text-slate-700">
                Sell turnover = qty × sell_price
              </p>
              <p className="mb-2 text-slate-700">
                Sell expenses = sell_commission + sell_sebon + Rs 25
              </p>
              <p className="mb-2 text-slate-700">
                <span className="text-slate-500">// CGT</span>
              </p>
              <p className="mb-2 text-slate-700">
                Capital gain = (sell_turnover − buy_turnover) − all_6_expenses
              </p>
              <p className="mb-2 text-slate-700">
                CGT = max(0, capital_gain) × rate
              </p>
              <p className="text-slate-700">
                <span className="text-slate-500">// Bottom line</span>
              </p>
              <p className="text-slate-900 font-semibold">
                Bank credit = sell_turnover − sell_expenses − CGT
              </p>
            </div>

            <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
              Worked example
            </h2>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 mb-5">
              <p className="text-slate-700 text-sm leading-relaxed mb-2">
                Individual investor buys <strong>100 NTC shares at Rs 800</strong>{' '}
                each, holds for <strong>200 days</strong>, sells at{' '}
                <strong>Rs 1,000</strong> each.
              </p>
              <ul className="space-y-0.5 text-sm text-slate-600 list-none pl-0 mb-3 font-mono">
                <li>Buy turnover: 100 × 800 = Rs 80,000</li>
                <li>Buy commission @ 0.37%: Rs 296</li>
                <li>Buy SEBON @ 0.015%: Rs 12</li>
                <li>Buy DP charge: Rs 25</li>
                <li className="font-semibold text-slate-900">
                  Total cash paid: Rs 80,333
                </li>
                <li>&nbsp;</li>
                <li>Sell turnover: 100 × 1,000 = Rs 1,00,000</li>
                <li>Sell commission @ 0.37%: Rs 370</li>
                <li>Sell SEBON @ 0.015%: Rs 15</li>
                <li>Sell DP charge: Rs 25</li>
                <li>&nbsp;</li>
                <li>Gross profit: 1,00,000 − 80,000 = Rs 20,000</li>
                <li>Total transaction costs: Rs 743</li>
                <li>Capital gain: Rs 19,257</li>
                <li>CGT @ 7.5% (short-term): Rs 1,444.28</li>
                <li>&nbsp;</li>
                <li className="font-semibold text-slate-900">
                  Net profit: Rs 17,812.72
                </li>
                <li className="font-semibold text-slate-900">
                  Net to bank: Rs 98,145.72
                </li>
              </ul>
              <p className="text-xs text-slate-500">
                The screen showed Rs 20,000 profit. Your bank actually received
                Rs 17,812.72 of that as profit — the remaining Rs 2,187.28 went
                to broker commission, SEBON, DP, and CGT.
              </p>
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
              Need the full Income Tax Act, not just the math?
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed max-w-md">
              Mero Dafa indexes Section 36 (capital losses), Section 38 (gain
              from disposal), every Finance Act CGT amendment, and IRD circulars
              on share transactions — answered with the exact section reference
              and the original Gazette page beside it.
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
