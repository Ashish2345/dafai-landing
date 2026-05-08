import type { Metadata } from 'next'
import Link from 'next/link'
import { VatCalculator } from './Calculator'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  breadcrumbListSchema,
  faqPageSchema,
  howToSchema,
  softwareToolSchema,
  SITE_URL,
} from '@/lib/seo/schema'

const PAGE_URL = `${SITE_URL}/tools/vat-calculator`
const PAGE_TITLE = 'Nepal VAT Calculator (13%)'
const PAGE_DESCRIPTION =
  'Add or extract 13% Nepal VAT on any invoice. Multi-line invoice mode with running totals. Per VAT Act 2052 (last revised by Finance Act 2081).'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/tools/vat-calculator' },
  keywords: [
    'vat calculator nepal',
    '13 percent vat calculator',
    'nepal vat calculation',
    'remove vat nepal',
    'add vat nepal',
    'vat inclusive exclusive nepal',
    'vat invoice nepal',
    'extract vat from inclusive amount',
    'reverse vat calculator nepal',
  ],
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/tools/vat-calculator',
    type: 'website',
  },
}

const FAQ = [
  {
    question: 'What is the VAT rate in Nepal?',
    answer:
      'The standard VAT rate in Nepal is 13%, set by the VAT Act 2052 and revised periodically through the annual Finance Act. The rate has been 13% continuously since FY 2062/63. Some goods and services are zero-rated (notably exports) and some are VAT-exempt (basic foodstuffs, education, health, financial services) — those are taxed at 0% or fall outside the VAT system entirely.',
  },
  {
    question: 'How do I add 13% VAT to a price in Nepal?',
    answer:
      'Multiply the base price by 1.13. Example: a base price of Rs 1,000 becomes Rs 1,000 × 1.13 = Rs 1,130 inclusive of VAT, with Rs 130 as the VAT component. The calculator above does this in "Excluding VAT" mode.',
  },
  {
    question: 'How do I extract VAT from a VAT-inclusive amount?',
    answer:
      'Divide the inclusive amount by 1.13 to get the base, then subtract to find the VAT. Example: Rs 1,130 ÷ 1.13 = Rs 1,000 base; VAT = Rs 1,130 − Rs 1,000 = Rs 130. Equivalently, the VAT portion is the inclusive amount × 13/113. The calculator above does this in "Including VAT" mode.',
  },
  {
    question: 'Who needs to register for VAT in Nepal?',
    answer:
      'Per the VAT Act 2052, any business with annual turnover exceeding Rs 50,00,000 from goods (or Rs 20,00,000 from services, or a mix) must register for VAT with the Inland Revenue Department. Voluntary registration below the threshold is allowed. Some sectors — tobacco, liquor, hardware, electronics, software, education consultancy and others — must register regardless of turnover.',
  },
  {
    question: 'What is the difference between zero-rated and VAT-exempt?',
    answer:
      'Zero-rated supplies are inside the VAT system but charged at 0% — most notably exports. Businesses making zero-rated supplies can still claim input VAT credits. VAT-exempt supplies are outside the VAT system — basic foodstuffs, education, health services, financial services. Businesses making exempt supplies cannot claim input VAT on related purchases.',
  },
  {
    question: 'When are VAT returns filed in Nepal?',
    answer:
      'VAT returns are filed monthly in Nepal — by the 25th of the month following the tax period (Nepali calendar). Some small registrants file quarterly with prior approval from the IRD. Returns must be filed even if there were no taxable transactions during the period (nil return).',
  },
]

const HOW_TO_STEPS = [
  {
    name: 'Choose your input mode',
    text: "Pick whether your amount is the base price (excluding VAT — the calculator will add 13%) or the total price (including VAT — the calculator will extract the 13% VAT component).",
  },
  {
    name: 'Enter line items',
    text: 'Type a description and amount for each item on your invoice. Add as many lines as needed using the "Add line" button. Each line is computed independently, then summed into totals.',
  },
  {
    name: 'Read off net, VAT, and gross',
    text: "Each line shows its own breakdown — Net (excl. VAT), VAT (13%), and Gross (incl. VAT). The Totals card at the bottom sums every line for invoice-ready figures.",
  },
]

export default function VatCalculatorPage() {
  return (
    <main className="bg-white pb-16 pt-8">
      <JsonLd
        id="ld-vat-software"
        data={softwareToolSchema({
          name: PAGE_TITLE,
          url: PAGE_URL,
          description: PAGE_DESCRIPTION,
        })}
      />
      <JsonLd
        id="ld-vat-howto"
        data={howToSchema({
          name: 'How to add or extract 13% VAT in Nepal',
          description:
            'Compute net, VAT, and gross amounts for any Nepal invoice using the standard 13% VAT rate.',
          url: PAGE_URL,
          totalTimeIso: 'PT1M',
          tools: ['Mero Dafa VAT Calculator'],
          steps: HOW_TO_STEPS.map((s) => ({ ...s, url: PAGE_URL })),
        })}
      />
      <JsonLd id="ld-vat-faq" data={faqPageSchema(FAQ)} />
      <JsonLd
        id="ld-vat-breadcrumb"
        data={breadcrumbListSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Tools', url: `${SITE_URL}/tools` },
          { name: 'VAT Calculator', url: PAGE_URL },
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
            <span className="text-slate-700">VAT Calculator</span>
          </nav>

          {/* Header */}
          <header className="mb-6 max-w-3xl">
            <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 leading-tight tracking-tight mb-2">
              Nepal VAT Calculator{' '}
              <span className="text-slate-500 font-medium">13%</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Add or extract 13% VAT on any Nepal invoice. Multi-line mode with
              running totals. Per VAT Act 2052.
            </p>
          </header>

          {/* Calculator card */}
          <section
            className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 lg:p-8 mb-10"
            aria-labelledby="vat-calculator-heading"
          >
            <h2 id="vat-calculator-heading" className="sr-only">
              VAT Calculator
            </h2>
            <VatCalculator />
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
                VAT calculation directions, registration thresholds & FAQ
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
              How VAT works in Nepal
            </h2>
            <p className="text-slate-700 text-base leading-relaxed mb-5">
              Value Added Tax in Nepal is a flat <strong>13%</strong> consumption
              tax governed by the <strong>VAT Act 2052</strong> and administered
              by the Inland Revenue Department (IRD). The rate hasn&apos;t changed
              since FY 2062/63 — though the surrounding rules (registration
              thresholds, exempt schedules, filing frequencies) are revised in
              most annual Finance Acts. Every VAT-registered business charges 13%
              on taxable supplies and remits the net (output VAT minus input VAT)
              to the IRD by the 25th of the following month.
            </p>

            <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
              The two calculation directions
            </h2>
            <p className="text-slate-700 text-base leading-relaxed mb-3">
              Most VAT calculations fall into one of two flows:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <p className="font-semibold text-slate-900 text-sm mb-2">
                  Adding VAT (Excluding → Including)
                </p>
                <p className="text-slate-700 text-sm leading-relaxed mb-2">
                  You have a base price and need the total to charge.
                </p>
                <p className="font-mono text-sm text-slate-700 mb-2">
                  Gross = Net × 1.13
                </p>
                <p className="text-xs text-slate-500">
                  Example: Net Rs 10,000 → VAT Rs 1,300 → Gross Rs 11,300.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <p className="font-semibold text-slate-900 text-sm mb-2">
                  Extracting VAT (Including → Excluding)
                </p>
                <p className="text-slate-700 text-sm leading-relaxed mb-2">
                  You have a VAT-inclusive amount and need the base.
                </p>
                <p className="font-mono text-sm text-slate-700 mb-2">
                  Net = Gross / 1.13
                </p>
                <p className="text-xs text-slate-500">
                  Example: Gross Rs 11,300 → Net Rs 10,000 → VAT Rs 1,300.
                </p>
              </div>
            </div>

            <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
              VAT registration thresholds
            </h2>
            <p className="text-slate-700 text-base leading-relaxed mb-3">
              Compulsory VAT registration kicks in when annual turnover exceeds:
            </p>
            <ul className="space-y-2 text-slate-700 mb-5 list-disc pl-5">
              <li>
                <strong>Rs 50,00,000</strong> for businesses dealing primarily in goods
              </li>
              <li>
                <strong>Rs 20,00,000</strong> for businesses dealing primarily in
                services (or a mix of goods and services)
              </li>
              <li>
                <strong>Any turnover</strong> for sectors with mandatory registration
                regardless of size — currently liquor, tobacco products, cement,
                hardware, electronics, software, motor vehicles, education
                consultancy, customs agents, and a few others. The latest list is
                in Schedule 2 of the VAT Rules.
              </li>
            </ul>

            <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
              Zero-rated vs VAT-exempt
            </h2>
            <p className="text-slate-700 text-base leading-relaxed mb-5">
              Both have a 0% effective rate, but they behave very differently for
              the registered business.{' '}
              <strong>Zero-rated supplies</strong> (Schedule 2 of the VAT Act —
              chiefly exports) are inside the VAT system: the business charges 0%
              output VAT but can still claim back input VAT on related purchases.{' '}
              <strong>Exempt supplies</strong> (Schedule 1 — basic foodstuffs,
              education, health, financial services, residential rent) are outside
              the VAT system: no output VAT charged, no input VAT recoverable.
              For a calculator focused on standard 13% taxable supplies, you
              don&apos;t need to handle either category — leave VAT-exempt and
              zero-rated invoices off this tool.
            </p>

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
              Looking for the full VAT Act, not just the math?
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed max-w-md">
              Mero Dafa indexes every section of the VAT Act 2052, every Finance
              Act amendment, and every IRD circular — and answers your questions
              with the exact section reference and the original Gazette page
              beside it.
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
