import type { Metadata } from 'next'
import Link from 'next/link'
import { SalaryTaxCalculator } from './Calculator'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  breadcrumbListSchema,
  faqPageSchema,
  howToSchema,
  softwareToolSchema,
  SITE_URL,
} from '@/lib/seo/schema'

const PAGE_URL = `${SITE_URL}/tools/salary-tax-calculator`
const PAGE_TITLE = 'Nepal Salary Tax Calculator (FY 2081/82)'
const PAGE_DESCRIPTION =
  "Calculate your monthly salary TDS for FY 2081/82 in seconds. Per Finance Act 2081 slabs. Handles SSF, PF/EPF, CIT, life and health insurance deductions for single & married employees in Nepal."

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/tools/salary-tax-calculator' },
  keywords: [
    'salary tax calculator nepal',
    'nepal income tax calculator',
    'tds calculator nepal',
    'monthly tds calculator',
    'fy 2081/82 tax calculator',
    'finance act 2081',
    'nepal salary tax slab',
    'pf calculator nepal',
    'ssf calculator nepal',
    'epf deduction nepal',
    'CA TDS calculator',
  ],
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/tools/salary-tax-calculator',
    type: 'website',
  },
}

const FAQ = [
  {
    question: 'What are the salary tax slabs for FY 2081/82 in Nepal?',
    answer:
      "For single/unmarried individuals: 1% on the first Rs 5,00,000, 10% on Rs 5–7L, 20% on Rs 7–10L, 30% on Rs 10–20L, and 36% (30% + 20% surcharge) on income above Rs 20,00,000. For married couples filing jointly: 1% on the first Rs 6,00,000, 10% on Rs 6–8L, 20% on Rs 8–11L, 30% on Rs 11–20L, and 36% above Rs 20,00,000. The 1% Social Security Tax slab becomes 0% for SSF participants.",
  },
  {
    question: 'How is monthly TDS calculated from annual salary in Nepal?',
    answer:
      "Annual gross income is computed (basic + allowances × 12 + festival bonus). Then deductions are applied: SSF + PF + CIT are summed and capped at the lowest of (a) actual contribution, (b) 1/3 of gross income, or (c) Rs 5,00,000; life insurance is capped separately at Rs 40,000; health insurance at Rs 20,000. The remaining taxable income runs through the slab table. Annual tax is divided by 12 to give the monthly TDS that HR deducts.",
  },
  {
    question: 'What deductions can a salaried employee claim in Nepal?',
    answer:
      "Retirement contributions (SSF + PF/EPF + CIT) are deductible together — but the combined deduction is capped at the lowest of: the actual amount contributed, one-third of gross annual income, or Rs 5,00,000. On top of the retirement cap, life insurance premiums up to Rs 40,000 and health insurance premiums up to Rs 20,000 are deductible separately. Additional exemptions exist for disabled employees, women in some categories, and remote-area allowances — consult your CA for those edge cases.",
  },
  {
    question: 'How does the combined retirement deduction cap work?',
    answer:
      "Per Section 63 of the Income Tax Act 2058, your CIT, PF, and SSF contributions are added together, and the deductible portion is the lowest of three values: (1) the actual combined contribution, (2) one-third of gross annual income, and (3) Rs 5,00,000. Example: on Rs 13,00,000 gross income with Rs 6,00,000 combined retirement contribution, 1/3 of gross is Rs 4,33,333 — lower than both the actual contribution and the Rs 5,00,000 cap — so Rs 4,33,333 is the allowed deduction and taxable income becomes Rs 8,66,667. The remaining Rs 1,66,667 is still saved into your retirement accounts but does not reduce TDS this year.",
  },
  {
    question: "What's the difference between SSF and PF (Provident Fund)?",
    answer:
      "SSF (Social Security Fund) is the contributory scheme administered by the Social Security Fund Secretariat — employees contribute 11% of basic salary, employers contribute 20%, and participating employees are exempt from the 1% Social Security Tax. PF (Provident Fund / EPF) is administered by the Employees Provident Fund — employees and employers each typically contribute 10% of basic salary. Both contributions are deductible from taxable income, but they are separate schemes and have different governing laws. Many private-sector employees contribute to PF; SSF is mandatory for some employer categories.",
  },
  {
    question: 'What is the difference between SST, SSF, and TDS?',
    answer:
      "SST (Social Security Tax) is the 1% tax on the first slab of taxable income, paid into a national pool. SSF (Social Security Fund) is a separate contributory scheme — employees contribute 11% of basic salary and employers contribute 20%; participating employees are exempt from the 1% SST. TDS (Tax Deducted at Source) is the broader mechanism by which the employer withholds and pays your monthly income tax to the IRD on your behalf.",
  },
  {
    question: 'Is this calculator official?',
    answer:
      "No. This calculator implements the standard salaried-employee slabs from Finance Act 2081 and is provided for reference. It does not model edge cases like disability exemption, women's rebate, foreign-source income, or remote-area allowances. Always verify with a practicing Chartered Accountant before filing.",
  },
]

const HOW_TO_STEPS = [
  {
    name: 'Calculate annual gross income',
    text: 'Multiply your monthly basic salary by 12, add the annual sum of allowances (basic × 12 + allowances × 12), then add any annual festival bonus (Dashain Kharcha).',
  },
  {
    name: 'Apply allowed deductions',
    text: 'Sum SSF + PF + CIT and apply the combined retirement cap — lowest of actual contribution, 1/3 of gross annual income, or Rs 5,00,000. Life insurance premium (max Rs 40,000) and health insurance premium (max Rs 20,000) are deducted separately on top.',
  },
  {
    name: 'Run the remainder through the slab table',
    text: 'Use the FY 2081/82 slabs for your filing status (single or couple). Each slab applies its rate only to the portion of income that falls within it.',
  },
  {
    name: 'Divide annual tax by 12',
    text: 'The result is your monthly TDS — the amount your employer will withhold each month. Multiply back by 12 to validate the annual figure.',
  },
]

export default function SalaryTaxCalculatorPage() {
  return (
    <main className="bg-white pb-16 pt-8">
      <JsonLd
        id="ld-tool-software"
        data={softwareToolSchema({
          name: PAGE_TITLE,
          url: PAGE_URL,
          description: PAGE_DESCRIPTION,
        })}
      />
      <JsonLd
        id="ld-tool-howto"
        data={howToSchema({
          name: 'How to calculate monthly salary TDS in Nepal (FY 2081/82)',
          description:
            'Compute your monthly Tax Deducted at Source from annual gross salary using Finance Act 2081 slabs.',
          url: PAGE_URL,
          totalTimeIso: 'PT3M',
          tools: ['Mero Dafa Salary Tax Calculator'],
          steps: HOW_TO_STEPS.map((s) => ({ ...s, url: PAGE_URL })),
        })}
      />
      <JsonLd id="ld-tool-faq" data={faqPageSchema(FAQ)} />
      <JsonLd
        id="ld-tool-breadcrumb"
        data={breadcrumbListSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Tools', url: `${SITE_URL}/tools` },
          { name: 'Salary Tax Calculator', url: PAGE_URL },
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
            <span className="text-slate-700">Salary Tax Calculator</span>
          </nav>

          {/* Header */}
          <header className="mb-6 max-w-3xl">
            <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 leading-tight tracking-tight mb-2">
              Nepal Salary Tax Calculator{' '}
              <span className="text-slate-500 font-medium">FY 2081/82</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Monthly TDS for single and married salaried employees. Finance Act 2081
              slabs with SSF, PF, CIT, life and health insurance deductions handled.
            </p>
          </header>

          {/* Calculator card */}
          <section
            className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 lg:p-8 mb-10"
            aria-labelledby="calculator-heading"
          >
            <h2 id="calculator-heading" className="sr-only">
              Calculator
            </h2>
            <SalaryTaxCalculator />
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
                Slab tables, deductions explainer & FAQ
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
              How is salary tax calculated in Nepal for FY 2081/82?
            </h2>
            <p className="text-slate-700 text-base leading-relaxed mb-5">
              Nepal uses a progressive slab system for salaried employees, set each
              year in the Finance Act. For FY 2081/82 (Shrawan 2081 – Ashadh 2082),
              the slabs were defined in <strong>Finance Act 2081</strong> — and they
              differ between single (unmarried) and married (couple) filing status.
              Below the calculator output, you can see exactly which slab each rupee
              of your taxable income falls into.
            </p>

            <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
              Income tax slabs for FY 2081/82
            </h2>

            <div className="overflow-x-auto rounded-lg border border-slate-200 mb-3">
              <table className="w-full min-w-[560px] text-sm">
                <thead className="bg-slate-50 text-slate-900">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">Single</th>
                    <th className="text-left px-4 py-3 font-semibold">Couple</th>
                    <th className="text-left px-4 py-3 font-semibold">Rate</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3">First Rs 5,00,000</td>
                    <td className="px-4 py-3">First Rs 6,00,000</td>
                    <td className="px-4 py-3">1% (SST) — 0% if SSF participant</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50/40">
                    <td className="px-4 py-3">Rs 5,00,001 – 7,00,000</td>
                    <td className="px-4 py-3">Rs 6,00,001 – 8,00,000</td>
                    <td className="px-4 py-3">10%</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3">Rs 7,00,001 – 10,00,000</td>
                    <td className="px-4 py-3">Rs 8,00,001 – 11,00,000</td>
                    <td className="px-4 py-3">20%</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50/40">
                    <td className="px-4 py-3">Rs 10,00,001 – 20,00,000</td>
                    <td className="px-4 py-3">Rs 11,00,001 – 20,00,000</td>
                    <td className="px-4 py-3">30%</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3">Above Rs 20,00,000</td>
                    <td className="px-4 py-3">Above Rs 20,00,000</td>
                    <td className="px-4 py-3">36% (30% + 20% surcharge)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mb-8">
              Source: Finance Act 2081 (Income Tax Act 2058 as amended). For
              section-level detail, see our{' '}
              <Link
                href="/blog/tds-rates-nepal-2081-complete-guide"
                className="text-[#09383e] underline-offset-2 hover:underline"
              >
                complete TDS guide
              </Link>
              .
            </p>

            <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
              What deductions can a salaried employee claim?
            </h2>
            <p className="text-slate-700 text-base leading-relaxed mb-3">
              The retirement contributions <strong>SSF</strong>,{' '}
              <strong>PF / EPF</strong>, and <strong>CIT</strong> are added together
              and capped at the lowest of three values:
            </p>
            <ol className="space-y-1.5 text-slate-700 mb-5 list-decimal pl-5">
              <li>The actual amount you contributed.</li>
              <li>
                <strong>One-third of your gross annual income</strong> (the
                proportional ceiling).
              </li>
              <li>
                <strong>Rs 5,00,000</strong> per year (the absolute statutory cap).
              </li>
            </ol>
            <p className="text-slate-700 text-base leading-relaxed mb-5">
              Whichever is smallest — that is your allowable retirement deduction.
              Anything contributed above that limit is still saved into your retirement
              account, but does not reduce your taxable income for the year.
            </p>
            <p className="text-slate-700 text-base leading-relaxed mb-3">
              Two other deductions are applied on top of the retirement cap:
            </p>
            <ul className="space-y-2 text-slate-700 mb-5 list-disc pl-5">
              <li>
                <strong>Life insurance premium</strong> — deductible up to{' '}
                <strong>Rs 40,000</strong> annually.
              </li>
              <li>
                <strong>Health insurance premium</strong> — deductible up to{' '}
                <strong>Rs 20,000</strong> annually.
              </li>
            </ul>
            <p className="text-slate-700 text-base leading-relaxed mb-5">
              SSF participation also makes the first 1% Social Security Tax slab
              become 0% — so SSF members save both on the deduction and on the
              first-slab rate.
            </p>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 mb-4">
              <p className="font-semibold text-slate-900 text-sm mb-2">
                Worked example A — statutory cap binds
              </p>
              <p className="text-slate-700 text-sm leading-relaxed mb-2">
                Gross annual income <strong>Rs 20,00,000</strong>, with combined
                CIT + PF + SSF contribution of <strong>Rs 7,00,000</strong>.
              </p>
              <ul className="space-y-1 text-sm text-slate-600 list-disc pl-5 mb-3">
                <li>Actual contribution: Rs 7,00,000</li>
                <li>1/3 of gross (Rs 20,00,000 ÷ 3): Rs 6,66,667</li>
                <li>Statutory cap: Rs 5,00,000 ← <strong>lowest, applies</strong></li>
              </ul>
              <p className="text-slate-700 text-sm leading-relaxed mb-3">
                Allowed deduction is Rs 5,00,000 → taxable income becomes
                Rs 15,00,000.
              </p>
              <ul className="space-y-0.5 text-sm text-slate-600 list-none pl-0 mb-2 font-mono">
                <li>Rs 5,00,000 × 1%  = Rs 5,000</li>
                <li>Rs 2,00,000 × 10% = Rs 20,000</li>
                <li>Rs 3,00,000 × 20% = Rs 60,000</li>
                <li>Rs 5,00,000 × 30% = Rs 1,50,000</li>
                <li className="font-semibold text-slate-900">
                  Total annual tax  = Rs 2,35,000
                </li>
              </ul>
              <p className="text-xs text-slate-500">
                If the same employee is an SSF participant, the first 1% slab becomes
                0% — annual tax drops to Rs 2,30,000.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 mb-5">
              <p className="font-semibold text-slate-900 text-sm mb-2">
                Worked example B — 1/3-of-gross binds
              </p>
              <p className="text-slate-700 text-sm leading-relaxed mb-2">
                Gross annual income <strong>Rs 13,00,000</strong>, with combined
                CIT + PF + SSF contribution of <strong>Rs 6,00,000</strong>.
              </p>
              <ul className="space-y-1 text-sm text-slate-600 list-disc pl-5 mb-3">
                <li>Actual contribution: Rs 6,00,000</li>
                <li>
                  1/3 of gross (Rs 13,00,000 ÷ 3): Rs 4,33,333 ←{' '}
                  <strong>lowest, applies</strong>
                </li>
                <li>Statutory cap: Rs 5,00,000</li>
              </ul>
              <p className="text-slate-700 text-sm leading-relaxed mb-3">
                Allowed deduction is Rs 4,33,333 → taxable income becomes
                Rs 8,66,667. The remaining Rs 1,66,667 of contribution stays in
                retirement accounts but doesn&apos;t reduce TDS this year.
              </p>
              <ul className="space-y-0.5 text-sm text-slate-600 list-none pl-0 mb-2 font-mono">
                <li>Rs 5,00,000 × 1%  = Rs 5,000</li>
                <li>Rs 2,00,000 × 10% = Rs 20,000</li>
                <li>Rs 1,66,667 × 20% = Rs 33,333</li>
                <li className="font-semibold text-slate-900">
                  Total annual tax  ≈ Rs 58,333
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
              Why are CAs slow today? Because the law moves faster than Excel.
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed max-w-md">
              Mero Dafa indexes every Finance Act amendment, NRB directive, and IRD
              circular — and answers your questions with the exact section reference
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
