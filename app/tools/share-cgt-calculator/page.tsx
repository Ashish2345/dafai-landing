import type { Metadata } from 'next'
import Link from 'next/link'
import { NepseCgtCalculator } from './Calculator'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  breadcrumbListSchema,
  faqPageSchema,
  softwareToolSchema,
  SITE_URL,
} from '@/lib/seo/schema'
import { socialMeta } from '@/lib/seo/metadata'

const PAGE_URL = `${SITE_URL}/tools/share-cgt-calculator`
const PAGE_TITLE = 'NEPSE Share Profit & CGT Calculator'
const PAGE_DESCRIPTION =
  'Calculate real bankable profit on NEPSE trades — broker commission, SEBON fee, DP charge, and CGT (10%/7.5% under Finance Act 2083) all handled.'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/tools/share-cgt-calculator' },
  ...socialMeta({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/tools/share-cgt-calculator',
  }),
}

const FAQ = [
  {
    question: 'What is the Capital Gains Tax rate on NEPSE shares?',
    answer:
      'For shares sold on or after 17 July 2026 (Shrawan 1, 2083), Finance Act 2083 sets CGT for resident individuals at 10% if held for 365 days or less (short-term) and 7.5% if held for more than 365 days (long-term). Resident entities (companies, mutual funds) pay 10% flat, and non-residents/other persons pay 25%. Sales before that date used the old 7.5% / 5% individual rates. CGT only applies on a positive capital gain — losses do not generate a tax obligation.',
  },
  {
    question: 'How is the holding period counted for CGT?',
    answer:
      'The holding period is the number of days between the buy date (T+settlement) and the sell date. If the gap is 365 days or less, the trade is short-term and CGT is 10% for individuals (FY 2083/84). If the gap is more than 365 days, the trade is long-term and CGT drops to 7.5%. For institutional investors the holding period does not change the rate (10% flat). For IPO, bonus or right shares, the holding period generally runs from the date the shares were credited to your demat account.',
  },
  {
    question: 'How is broker commission calculated on NEPSE?',
    answer:
      'Per the SEBON Brokerage Commission Regulation (sebon.gov.np), commission rates are slabbed by transaction value: up to Rs 2,500 → flat Rs 10; Rs 2,501–50,000 → 0.36%; Rs 50,001–5,00,000 → 0.33%; Rs 5,00,001–20,00,000 → 0.31%; Rs 20,00,001–1,00,00,000 → 0.27%; above Rs 1 crore → 0.24%. The minimum commission per transaction is Rs 10. Commission is charged on both the buy and the sell leg separately.',
  },
  {
    question: 'What other charges apply besides broker commission?',
    answer:
      'Two more deductions besides broker commission: (1) SEBON Regulatory Fee at 0.015% of transaction value, on both buy and sell legs; (2) CDSC Depository (DP) Charge of Rs 25 per transaction by CDS and Clearing Limited (cdscnepal.com), also on both legs. Plus, on the sell side, Capital Gains Tax is deducted at source by the broker before crediting your bank.',
  },
  {
    question: 'Is the CGT amount deducted automatically?',
    answer:
      'Yes. The broker deducts CGT at source from your sell-side proceeds and remits it to the Inland Revenue Department (ird.gov.np) on your behalf, just like TDS on salary. The amount you see credited to your bank is already net of CGT. From FY 2083/84, Finance Act 2083 treats CGT withheld on listed securities as a final withholding tax — no further tax is due on that gain, and it is not credited against your other income.',
  },
  {
    question: 'What if I sold at a loss?',
    answer:
      'No CGT applies on a loss. Capital losses on listed securities can be carried forward and set off against future capital gains under Section 36 of the Income Tax Act 2058 (published by the IRD at ird.gov.np) — but only against capital gains, not against business or salary income. Keep transaction records (broker contract notes, DP bills) for the carry-forward claim.',
  },
  {
    question: 'Are bonus shares and right shares handled differently?',
    answer:
      'Yes — and this calculator does NOT model them. For bonus shares, the IRD treats the cost base as the average of all holdings (existing + bonus) at the original purchase prices, weighted by quantity. For right shares, the cost base is the right-issue price you paid plus your share of original costs. Tip: enter your WACC (weighted average cost, shown in MeroShare) as the buy price for a close estimate. Consult a CA for portfolio-level CGT involving corporate actions.',
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
            <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 leading-tight tracking-tight mb-1.5">
              NEPSE Share Profit{' '}
              <span className="text-slate-500 font-medium">& CGT Calculator</span>
            </h1>
            <p
              className="text-slate-500 text-sm mb-3"
              lang="ne"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              नेप्से शेयर नाफा र पुँजीगत लाभ कर क्यालकुलेटर
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-3">
              Free Nepal capital gains tax calculator for NEPSE share trades. Computes
              real bankable profit after SEBON broker commission, SEBON regulatory
              fee, CDSC DP charge, and Capital Gains Tax (10% short-term / 7.5%
              long-term for individuals, 10% flat for institutional investors,
              under Finance Act 2083 — the rate is picked automatically from
              your sell date).
            </p>
            <p className="text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Verified against SEBON regulations &amp; Income Tax Act 2058 by Sabin Adhikari, CA · Last reviewed April 2026 · Rates updated for Finance Act 2083 (September 2026)
              </span>
            </p>
          </header>

          {/* Calculator card */}
          <section
            className="rounded-2xl sm:rounded-3xl border-0 sm:border border-slate-200 bg-white p-0 sm:p-6 lg:p-8 mb-10"
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
              How to calculate NEPSE share profit and Capital Gains Tax in Nepal
            </h2>
            <p className="text-slate-700 text-base leading-relaxed mb-5">
              When you sell a share on NEPSE, what you actually receive in your
              bank is meaningfully different from <em>(sell price − buy price) × quantity</em>.
              Three regulatory deductions — broker commission set by{' '}
              <a
                href="https://sebon.gov.np/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#09383e] underline-offset-2 hover:underline"
              >
                SEBON
              </a>
              , the SEBON regulatory fee, and the{' '}
              <a
                href="https://cdscnepal.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#09383e] underline-offset-2 hover:underline"
              >
                CDSC
              </a>{' '}
              depository charge — sit between you and the gross profit, then
              Capital Gains Tax under the{' '}
              <a
                href="https://ird.gov.np/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#09383e] underline-offset-2 hover:underline"
              >
                Income Tax Act 2058
              </a>{' '}
              is deducted at source on the sell side. This calculator walks
              through each one in the order brokers apply them.
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
                    <td className="px-4 py-3">Up to Rs 2,500</td>
                    <td className="px-4 py-3">Flat Rs 10</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50/40">
                    <td className="px-4 py-3">Rs 2,501 – Rs 50,000</td>
                    <td className="px-4 py-3">0.36%</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3">Rs 50,001 – Rs 5,00,000</td>
                    <td className="px-4 py-3">0.33%</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50/40">
                    <td className="px-4 py-3">Rs 5,00,001 – Rs 20,00,000</td>
                    <td className="px-4 py-3">0.31%</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3">Rs 20,00,001 – Rs 1,00,00,000</td>
                    <td className="px-4 py-3">0.27%</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50/40">
                    <td className="px-4 py-3">Above Rs 1 crore</td>
                    <td className="px-4 py-3">0.24%</td>
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
                    <th className="text-left px-4 py-3 font-semibold">FY 2083/84</th>
                    <th className="text-left px-4 py-3 font-semibold">Before 17 Jul 2026</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3">Individual</td>
                    <td className="px-4 py-3">≤ 365 days (short-term)</td>
                    <td className="px-4 py-3 font-semibold">10%</td>
                    <td className="px-4 py-3">7.5%</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50/40">
                    <td className="px-4 py-3">Individual</td>
                    <td className="px-4 py-3">&gt; 365 days (long-term)</td>
                    <td className="px-4 py-3 font-semibold">7.5%</td>
                    <td className="px-4 py-3">5%</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3">Institutional</td>
                    <td className="px-4 py-3">Any (no holding rule)</td>
                    <td className="px-4 py-3 font-semibold">10%</td>
                    <td className="px-4 py-3">10%</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50/40">
                    <td className="px-4 py-3">Non-resident / other</td>
                    <td className="px-4 py-3">Any</td>
                    <td className="px-4 py-3 font-semibold">25%</td>
                    <td className="px-4 py-3">25%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              Source: Income Tax Act 2058 s.95Ka(2)(Ka) as amended by Finance Act
              2083. The rate follows the sale date; CGT on listed shares is now a
              final withholding tax.
            </p>

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
                <li>Buy commission @ 0.33%: Rs 264</li>
                <li>Buy SEBON @ 0.015%: Rs 12</li>
                <li>Buy DP charge: Rs 25</li>
                <li className="font-semibold text-slate-900">
                  Total cash paid: Rs 80,301
                </li>
                <li>&nbsp;</li>
                <li>Sell turnover: 100 × 1,000 = Rs 1,00,000</li>
                <li>Sell commission @ 0.33%: Rs 330</li>
                <li>Sell SEBON @ 0.015%: Rs 15</li>
                <li>Sell DP charge: Rs 25</li>
                <li>&nbsp;</li>
                <li>Gross profit: 1,00,000 − 80,000 = Rs 20,000</li>
                <li>Total transaction costs: Rs 671</li>
                <li>Capital gain: Rs 19,329</li>
                <li>CGT @ 10% (short-term, FY 2083/84): Rs 1,932.90</li>
                <li>&nbsp;</li>
                <li className="font-semibold text-slate-900">
                  Net profit: Rs 17,396.10
                </li>
                <li className="font-semibold text-slate-900">
                  Net to bank: Rs 97,697.10
                </li>
              </ul>
              <p className="text-xs text-slate-500">
                The screen showed Rs 20,000 profit. Your bank actually received
                Rs 17,396.10 of that as profit — the remaining Rs 2,603.90 went
                to broker commission, SEBON, DP, and CGT.
              </p>
            </div>

            <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
              Where NEPSE investors get CGT wrong
            </h2>
            <p className="text-slate-700 text-base leading-relaxed mb-3">
              Most retail NEPSE investors do this math in a notebook or in their
              broker app, and three errors come up over and over — overstating
              profit by Rs 500 to Rs 5,000 per trade on a 100-share position:
            </p>
            <ul className="space-y-2 text-slate-700 mb-5 list-disc pl-5">
              <li>
                <strong>Forgetting fees are charged on both legs.</strong> Broker
                commission, SEBON regulatory fee, and the Rs 25 DP charge apply to
                the buy leg <em>and</em> the sell leg separately — so a round-trip
                trade incurs six fees, not three. Mental shortcuts that only count
                the sell leg systematically overestimate net profit.
              </li>
              <li>
                <strong>Using last year&apos;s CGT rates.</strong> Since 17 July
                2026 individuals pay 10% if held ≤365 days and 7.5% if held
                &gt;365 days (up from 7.5% / 5%). Companies and mutual funds pay 10%
                regardless of holding period. Trading through a private company
                changes the math.
              </li>
              <li>
                <strong>Applying CGT to gross profit instead of capital gain.</strong>{' '}
                CGT applies to <em>(sell − buy − all six fees)</em>, not to
                (sell − buy). The fees are deductible from the capital-gain base
                before the tax is calculated.
              </li>
            </ul>
            <p className="text-slate-700 text-base leading-relaxed mb-5">
              This calculator handles all three correctly and shows the math step
              by step — including the SEBON commission slab that applies to your
              specific transaction value.
            </p>

            <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
              Who should use this NEPSE CGT calculator?
            </h2>
            <ul className="space-y-2 text-slate-700 mb-5 list-disc pl-5">
              <li>
                <strong>Retail NEPSE investors</strong> — verify the net bank
                credit before you place a trade, especially on large round-trips
                where the slab tiers actually shift
              </li>
              <li>
                <strong>Day traders &amp; swing traders</strong> — see whether a
                Rs 2 / share gain even covers the buy + sell fee stack before
                CGT
              </li>
              <li>
                <strong>Long-term investors</strong> — compare net profit at the
                7.5% long-term rate vs the 10% short-term rate to time exits past
                the 365-day mark
              </li>
              <li>
                <strong>Brokers, CAs &amp; tax consultants</strong> — quick sanity
                check on client contract notes, or use alongside our{' '}
                <Link href="/tools/salary-tax-calculator" className="text-[#09383e] underline-offset-2 hover:underline">
                  Nepal salary tax calculator
                </Link>{' '}
                and{' '}
                <Link href="/tools/vat-calculator" className="text-[#09383e] underline-offset-2 hover:underline">
                  VAT calculator
                </Link>{' '}
                for full-portfolio tax planning
              </li>
            </ul>

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
