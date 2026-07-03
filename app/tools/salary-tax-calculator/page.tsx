import type { Metadata } from 'next'
import Link from 'next/link'
import { SalaryTaxCalculator } from './Calculator'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  breadcrumbListSchema,
  faqPageSchema,
  softwareToolSchema,
  webPageReviewedSchema,
  SITE_URL,
} from '@/lib/seo/schema'
import { socialMeta } from '@/lib/seo/metadata'

const PAGE_URL = `${SITE_URL}/tools/salary-tax-calculator`
const PAGE_TITLE = 'Nepal Salary Tax Calculator FY 2083/84 (2026/27)'
const PAGE_DESCRIPTION =
  'Free Nepal salary TDS calculator for FY 2083/84 (2026/27). New Budget 2083/84 slabs (1% / 10% / 20% / 27% / 29%) — unified single & couple, first Rs 10 lakh at 1%, with SSF, PF/EPF, CIT, life & health insurance and the women’s rebate. FY 2082/83 also included. Reviewed by Nepali Chartered Accountants.'

const PAGE_PUBLISHED = '2026-04-20'
const PAGE_MODIFIED = '2026-07-03'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    'Nepal salary tax calculator',
    'salary tax Nepal 2083/84',
    'income tax Nepal 2083/84',
    'Nepal TDS calculator',
    'FY 2083/84',
    'income tax slab Nepal 2083/84',
    'Budget 2083/84 tax',
    'Nepal income tax slabs 2026/27',
    'new tax slab Nepal',
    'SSF PF CIT tax Nepal',
  ],
  alternates: { canonical: '/tools/salary-tax-calculator' },
  ...socialMeta({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/tools/salary-tax-calculator',
  }),
}

// Slab rows for the visual infographic. Bar width ∝ rate (max 29% = 100%),
// with a visible floor for the 1% band.
const SLAB_INFOGRAPHIC = [
  { range: 'Up to Rs 10,00,000', note: '0% for SSF / approved retirement-fund members', rate: '1%', color: '#38bdf8', barWidth: '7%' },
  { range: 'Rs 10,00,001 – 15,00,000', note: undefined, rate: '10%', color: '#34d399', barWidth: '34%' },
  { range: 'Rs 15,00,001 – 25,00,000', note: undefined, rate: '20%', color: '#facc15', barWidth: '69%' },
  { range: 'Rs 25,00,001 – 40,00,000', note: undefined, rate: '27%', color: '#fb923c', barWidth: '93%' },
  { range: 'Above Rs 40,00,000', note: '27% base + 2% surcharge', rate: '29%', color: '#ef4444', barWidth: '100%' },
] as const

const FAQ = [
  {
    question: 'What are the new income tax slabs for FY 2083/84 in Nepal?',
    answer:
      'Budget 2083/84 (2026/27) merged the single and couple schedules into one unified table for all resident individuals: 1% on the first Rs 10,00,000, 10% on Rs 10–15 lakh, 20% on Rs 15–25 lakh, 27% on Rs 25–40 lakh, and 29% on income above Rs 40,00,000 (structured as 27% + 2% surcharge). The 1% Social Security Tax slab becomes 0% for employees who contribute to the SSF or an approved retirement fund. These rates apply from 1 Shrawan 2083 (about 17 July 2026), subject to the gazetted Finance Act 2083.',
  },
  {
    question: 'What changed in FY 2083/84 compared to FY 2082/83?',
    answer:
      'Three big changes. (1) The single and couple slabs were merged — everyone now uses one schedule. (2) The 1% band was doubled from Rs 5,00,000 to Rs 10,00,000, so the first Rs 10 lakh is taxed at just 1% (0% for SSF members). (3) The peak rate was cut from 39% to 29%, and the slab count dropped from six to five. The result is a large tax cut across the board — a taxpayer with Rs 15,00,000 taxable income pays roughly Rs 60,000 under FY 2083/84 versus about Rs 2,35,000 under FY 2082/83.',
  },
  {
    question: 'How is monthly TDS calculated from annual salary in Nepal (FY 2083/84)?',
    answer:
      'Annual gross income is computed (basic + allowances × 12 + festival bonus). Then deductions are applied: SSF + PF + CIT are summed and capped at the lowest of (a) actual contribution, (b) 1/3 of gross income, or (c) Rs 5,00,000; life insurance is capped separately at Rs 40,000; health insurance at Rs 20,000. The remaining taxable income runs through the unified FY 2083/84 slab table. Annual tax is divided by 12 to give the monthly TDS that HR deducts.',
  },
  {
    question: 'Is the single vs married couple distinction gone in FY 2083/84?',
    answer:
      'Yes. Under FY 2082/83, couples had a higher first band (Rs 6,00,000 vs Rs 5,00,000 for singles). Budget 2083/84 removed that distinction — all resident individuals, single or married, now use the same unified schedule where the first Rs 10,00,000 is taxed at 1%. Filing status no longer changes the slabs. (Select FY 2082/83 in the calculator if you still need the old single/couple split for a prior-year filing.)',
  },
  {
    question: 'What deductions can a salaried employee claim in Nepal?',
    answer:
      'Retirement contributions (SSF + PF/EPF + CIT) are deductible together, capped at the lowest of: the actual amount contributed, one-third of gross annual income, or Rs 5,00,000. On top of that, life insurance premiums up to Rs 40,000 and health insurance premiums up to Rs 20,000 are deductible separately. These caps are unchanged from Finance Act 2082.',
  },
  {
    question: 'Is there still a tax rebate for women in FY 2083/84?',
    answer:
      'Yes. Resident single (unmarried) women with only employment income are entitled to a 10% rebate on the computed income tax. The rebate does not apply to married women filing as a couple. Tick the "Single woman — 10% rebate" option in the calculator to apply it. As with all FY 2083/84 figures, confirm against the gazetted Finance Act 2083.',
  },
  {
    question: 'Why is the top rate 29% shown as 27% + 2% surcharge?',
    answer:
      'The FY 2083/84 top band (income above Rs 40,00,000) is a composite rate — a 27% base plus a 2% surcharge, giving 29% effective. This calculator applies the 29% directly, so you do not need to add the surcharge yourself. It replaces the FY 2082/83 structure where income above Rs 50 lakh was 39% (30% + 30% surcharge).',
  },
  {
    question: "What's the difference between SSF and PF (Provident Fund)?",
    answer:
      'SSF (Social Security Fund) is the contributory scheme administered by the Social Security Fund Secretariat (ssf.gov.np) — employees contribute 11% of basic salary, employers contribute 20%, and participating employees are exempt from the 1% Social Security Tax on the first slab. PF (Provident Fund / EPF) is administered by the Employees Provident Fund — employees and employers each typically contribute 10% of basic salary. Both are deductible from taxable income, but they are separate schemes with different governing laws.',
  },
  {
    question: 'Are the FY 2083/84 rates final?',
    answer:
      'They are as proposed in Budget 2083/84, presented on 15 Jestha 2083 (29 May 2026), and apply from 1 Shrawan 2083 (about 17 July 2026). The annual Finance Act 2083 gives them legal force. Until the Finance Act is gazetted, treat the figures as provisional and verify with a practicing Chartered Accountant before filing.',
  },
  {
    question: 'Is this calculator official?',
    answer:
      'No. This calculator implements the standard salaried-employee slabs from Budget 2083/84 (and Finance Act 2082 for FY 2082/83) and is provided for reference. It does not model edge cases like disability exemption, foreign-source income, or remote-area allowances. Always verify with a practicing Chartered Accountant before filing.',
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
      <JsonLd id="ld-tool-faq" data={faqPageSchema(FAQ)} />
      <JsonLd
        id="ld-tool-breadcrumb"
        data={breadcrumbListSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Tools', url: `${SITE_URL}/tools` },
          { name: 'Salary Tax Calculator', url: PAGE_URL },
        ])}
      />
      <JsonLd
        id="ld-tool-webpage"
        data={webPageReviewedSchema({
          name: PAGE_TITLE,
          url: PAGE_URL,
          description: PAGE_DESCRIPTION,
          datePublished: PAGE_PUBLISHED,
          dateModified: PAGE_MODIFIED,
          reviewer: {
            name: 'Sabin Adhikari',
            slug: 'sabin-adhikari',
            role: 'Chartered Accountant',
          },
          author: {
            name: 'Aashish Rayamajhi',
            slug: 'aashish-rayamajhi',
            role: 'Co-founder, Mero Dafa',
          },
          about: 'Nepal salary income tax FY 2083/84 (2026/27)',
        })}
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
            <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 leading-tight tracking-tight mb-1.5">
              Nepal Salary Tax Calculator{' '}
              <span className="text-slate-500 font-medium">FY 2083/84 (2026/27)</span>
            </h1>
            <p
              className="text-slate-500 text-sm mb-3"
              lang="ne"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              नेपाली तलब कर क्यालकुलेटर — आर्थिक वर्ष २०८३/८४
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-3">
              Free monthly TDS calculator for salaried employees in Nepal, updated for
              the <strong>new Budget 2083/84 slabs</strong> — one unified schedule for
              single and married filers, the <strong>first Rs 10,00,000 taxed at just
              1%</strong>, and a top rate cut to 29%. SSF, PF / EPF, CIT, life and
              health insurance deductions and the women&apos;s rebate are handled
              automatically. Switch to FY 2082/83 for prior-year filings.
            </p>
            <p className="text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Reviewed against Budget 2083/84 by{' '}
                <Link
                  href="/authors/sabin-adhikari"
                  className="font-medium text-[#09383e] hover:underline underline-offset-2"
                >
                  Sabin Adhikari, CA
                </Link>
                {' '}· Authored by{' '}
                <Link
                  href="/authors/aashish-rayamajhi"
                  className="font-medium text-[#09383e] hover:underline underline-offset-2"
                >
                  Aashish Rayamajhi
                </Link>
                {' '}· Last reviewed{' '}
                <time dateTime={PAGE_MODIFIED}>3 July 2026</time>
              </span>
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

          {/* Visual slab infographic — HTML/CSS (crawlable, retina-crisp, correct year) */}
          <figure className="max-w-3xl mx-auto mb-10">
            <div className="overflow-hidden rounded-2xl border border-slate-800 shadow-lg">
              <div
                className="px-5 sm:px-7 py-6"
                style={{
                  background:
                    'radial-gradient(120% 140% at 15% 0%, #12324a 0%, #0b1e33 45%, #1a1140 100%)',
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <h2 className="font-display font-bold text-white text-lg sm:text-2xl leading-tight tracking-tight">
                      Nepal Individual Income Tax Slabs
                    </h2>
                    <p className="text-sky-300 text-sm sm:text-base font-semibold mt-0.5">
                      FY 2083/84 (2026/27)
                    </p>
                  </div>
                  <span className="hidden sm:block text-[11px] text-slate-400 text-right leading-snug pt-1">
                    Unified schedule —<br />all resident individuals
                  </span>
                </div>

                {/* Slab rows */}
                <div className="space-y-2.5">
                  {SLAB_INFOGRAPHIC.map((s, i) => (
                    <div
                      key={s.range}
                      className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1.4fr_1fr_1.3fr] items-center gap-3 sm:gap-4 rounded-xl bg-white/[0.04] ring-1 ring-white/10 px-3 sm:px-4 py-3"
                    >
                      {/* Ordinal badge */}
                      <span
                        className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold text-white"
                        style={{ background: s.color }}
                      >
                        {i + 1}
                      </span>
                      {/* Range */}
                      <div className="min-w-0">
                        <p className="text-white text-sm sm:text-[15px] font-medium leading-tight">
                          {s.range}
                        </p>
                        {s.note && (
                          <p className="text-slate-400 text-[11px] leading-tight mt-0.5">
                            {s.note}
                          </p>
                        )}
                      </div>
                      {/* Rate */}
                      <div className="text-right sm:text-left">
                        <span
                          className="font-display font-bold text-lg sm:text-xl tabular-nums"
                          style={{ color: s.color, fontVariantNumeric: 'tabular-nums' }}
                        >
                          {s.rate}
                        </span>
                      </div>
                      {/* Bar */}
                      <div className="hidden sm:block">
                        <div className="h-4 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: s.barWidth, background: s.color }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between gap-3 mt-5 pt-4 border-t border-white/10">
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Source: Budget 2083/84 (Income Tax Act 2058, as amended).
                  </p>
                  <p className="text-[11px] text-slate-400 text-right leading-snug">
                    As proposed · verify with your CA
                  </p>
                </div>
              </div>
            </div>
            <figcaption className="mt-2 text-xs text-slate-500 text-center">
              Nepal income tax slabs for FY 2083/84 (2026/27) — unified schedule for all
              resident individuals, 1% to 29%, per Budget 2083/84.
            </figcaption>
          </figure>

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
                Slab tables, what changed, deductions explainer & FAQ
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
              How is monthly salary income tax calculated in Nepal (FY 2083/84)?
            </h2>
            <p className="text-slate-700 text-base leading-relaxed mb-5">
              Nepal uses a progressive slab system for salaried employees, set each
              year in the Finance Act. For FY 2083/84 (Shrawan 2083 – Ashadh 2084),
              the slabs were rewritten in{' '}
              <strong>
                <a
                  href="https://mof.gov.np/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#09383e] underline-offset-2 hover:underline"
                >
                  Budget 2083/84
                </a>
              </strong>{' '}
              — amending the{' '}
              <a
                href="https://ird.gov.np/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#09383e] underline-offset-2 hover:underline"
              >
                Income Tax Act 2058
              </a>{' '}
              — and, for the first time, a single unified schedule applies to every
              resident individual regardless of marital status. Below the calculator
              output, you can see exactly which slab each rupee of your taxable income
              falls into.
            </p>

            <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
              Income tax slabs for FY 2083/84
            </h2>

            <div className="overflow-x-auto rounded-lg border border-slate-200 mb-3">
              <table className="w-full min-w-[520px] text-sm">
                <thead className="bg-slate-50 text-slate-900">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">Annual taxable income (all residents)</th>
                    <th className="text-left px-4 py-3 font-semibold">Rate</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3">First Rs 10,00,000</td>
                    <td className="px-4 py-3">1% (SST) — 0% if SSF participant</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50/40">
                    <td className="px-4 py-3">Rs 10,00,001 – 15,00,000</td>
                    <td className="px-4 py-3">10%</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3">Rs 15,00,001 – 25,00,000</td>
                    <td className="px-4 py-3">20%</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50/40">
                    <td className="px-4 py-3">Rs 25,00,001 – 40,00,000</td>
                    <td className="px-4 py-3">27%</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3">Above Rs 40,00,000</td>
                    <td className="px-4 py-3 font-medium text-[#09383e]">29% (27% + 2% surcharge)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mb-8">
              Source: Budget 2083/84 (Income Tax Act 2058 as amended), effective 1
              Shrawan 2083 (~17 July 2026), pending the gazetted Finance Act 2083. See
              our{' '}
              <Link
                href="/blog/nepal-income-tax-slabs-fy-2083-84"
                className="text-[#09383e] underline-offset-2 hover:underline"
              >
                full FY 2083/84 slabs guide
              </Link>
              {' '}for the section-level detail.
            </p>

            <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
              What changed in FY 2083/84 vs FY 2082/83?
            </h2>
            <p className="text-slate-700 text-base leading-relaxed mb-3">
              Budget 2083/84 is the most taxpayer-friendly personal-income rewrite in
              years. Three changes stand out:
            </p>
            <ul className="space-y-2 text-slate-700 mb-5 list-disc pl-5">
              <li>
                <strong>Single and couple slabs merged.</strong> Previously couples
                had a higher first band (Rs 6,00,000 vs Rs 5,00,000). Now everyone uses
                one schedule.
              </li>
              <li>
                <strong>1% band doubled to Rs 10,00,000.</strong> The first Rs 10 lakh
                of taxable income is taxed at just 1% (0% for SSF members) — up from
                Rs 5 lakh.
              </li>
              <li>
                <strong>Top rate cut from 39% to 29%,</strong> and the number of slabs
                dropped from six to five.
              </li>
            </ul>

            <div className="overflow-x-auto rounded-lg border border-slate-200 mb-3">
              <table className="w-full min-w-[520px] text-sm">
                <thead className="bg-slate-50 text-slate-900">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">Taxable income (single)</th>
                    <th className="text-left px-4 py-3 font-semibold">FY 2082/83 tax</th>
                    <th className="text-left px-4 py-3 font-semibold">FY 2083/84 tax</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3">Rs 10,00,000</td>
                    <td className="px-4 py-3">Rs 85,000</td>
                    <td className="px-4 py-3 font-medium text-[#09383e]">Rs 10,000</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50/40">
                    <td className="px-4 py-3">Rs 15,00,000</td>
                    <td className="px-4 py-3">Rs 2,35,000</td>
                    <td className="px-4 py-3 font-medium text-[#09383e]">Rs 60,000</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3">Rs 25,00,000</td>
                    <td className="px-4 py-3">Rs 5,65,000</td>
                    <td className="px-4 py-3 font-medium text-[#09383e]">Rs 2,60,000</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50/40">
                    <td className="px-4 py-3">Rs 50,00,000</td>
                    <td className="px-4 py-3">Rs 14,65,000</td>
                    <td className="px-4 py-3 font-medium text-[#09383e]">Rs 9,55,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mb-8">
              Illustrative, non-SSF, no deductions. Actual tax depends on your SSF/PF/CIT
              contributions and insurance deductions — use the calculator above.
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
              SSF participation also makes the first 1% Social Security Tax slab become
              0% — so SSF members save both on the deduction and on the first-slab
              rate. Resident single women with only employment income get a further 10%
              rebate on the computed tax.
            </p>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 mb-4">
              <p className="font-semibold text-slate-900 text-sm mb-2">
                Worked example A — mid earner, FY 2083/84
              </p>
              <p className="text-slate-700 text-sm leading-relaxed mb-2">
                Gross annual income <strong>Rs 20,00,000</strong>, combined CIT + PF +
                SSF contribution of <strong>Rs 5,00,000</strong> (statutory cap binds).
                Taxable income = Rs 15,00,000.
              </p>
              <ul className="space-y-0.5 text-sm text-slate-600 list-none pl-0 mb-2 font-mono">
                <li>Rs 10,00,000 × 1%  = Rs 10,000</li>
                <li>Rs 5,00,000 × 10% = Rs 50,000</li>
                <li className="font-semibold text-slate-900">
                  Total annual tax  = Rs 60,000 (Rs 5,000 / month)
                </li>
              </ul>
              <p className="text-xs text-slate-500">
                If this employee is an SSF participant, the first slab becomes 0% —
                annual tax drops to Rs 50,000. Under FY 2082/83 the same taxable income
                cost Rs 2,35,000.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 mb-4">
              <p className="font-semibold text-slate-900 text-sm mb-2">
                Worked example B — 1/3-of-gross binds
              </p>
              <p className="text-slate-700 text-sm leading-relaxed mb-2">
                Gross annual income <strong>Rs 12,00,000</strong>, combined CIT + PF +
                SSF contribution of <strong>Rs 5,00,000</strong>.
              </p>
              <ul className="space-y-1 text-sm text-slate-600 list-disc pl-5 mb-3">
                <li>Actual contribution: Rs 5,00,000</li>
                <li>
                  1/3 of gross (Rs 12,00,000 ÷ 3): Rs 4,00,000 ←{' '}
                  <strong>lowest, applies</strong>
                </li>
                <li>Statutory cap: Rs 5,00,000</li>
              </ul>
              <p className="text-slate-700 text-sm leading-relaxed mb-3">
                Allowed deduction is Rs 4,00,000 → taxable income becomes Rs 8,00,000,
                entirely within the 1% band.
              </p>
              <ul className="space-y-0.5 text-sm text-slate-600 list-none pl-0 mb-2 font-mono">
                <li>Rs 8,00,000 × 1%  = Rs 8,000</li>
                <li className="font-semibold text-slate-900">
                  Total annual tax  = Rs 8,000 (Rs 667 / month)
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 mb-5">
              <p className="font-semibold text-slate-900 text-sm mb-2">
                Worked example C — high earner with the new 29% slab
              </p>
              <p className="text-slate-700 text-sm leading-relaxed mb-2">
                Taxable income <strong>Rs 50,00,000</strong> for a resident individual.
              </p>
              <ul className="space-y-0.5 text-sm text-slate-600 list-none pl-0 mb-2 font-mono">
                <li>Rs 10,00,000 × 1%  = Rs 10,000</li>
                <li>Rs 5,00,000 × 10% = Rs 50,000</li>
                <li>Rs 10,00,000 × 20% = Rs 2,00,000</li>
                <li>Rs 15,00,000 × 27% = Rs 4,05,000</li>
                <li>Rs 10,00,000 × 29% = Rs 2,90,000</li>
                <li className="font-semibold text-slate-900">
                  Total annual tax  = Rs 9,55,000 (Rs 79,583 / month)
                </li>
              </ul>
              <p className="text-xs text-slate-500">
                Under FY 2082/83 (39% above Rs 50 lakh, 36% on Rs 20–50 lakh), the same
                taxable income cost Rs 14,65,000 — a Rs 5,10,000 saving.
              </p>
            </div>

            <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
              Calculator vs manual Excel calculation
            </h2>
            <p className="text-slate-700 text-base leading-relaxed mb-3">
              Most HR teams in Nepal still compute monthly TDS in Excel — copying last
              year&apos;s slab table and patching the formula every Shrawan. With the
              FY 2083/84 rewrite, the old spreadsheets are now wrong in four ways:
            </p>
            <ul className="space-y-2 text-slate-700 mb-5 list-disc pl-5">
              <li>
                <strong>Still splitting single vs couple.</strong> FY 2083/84 uses one
                unified schedule — a couple formula now over- or under-deducts.
              </li>
              <li>
                <strong>Old Rs 5 lakh first band.</strong> The 1% band is now Rs 10
                lakh; a spreadsheet still stopping at Rs 5 lakh massively over-taxes.
              </li>
              <li>
                <strong>Missing the new 27% / 29% bands.</strong> The 30/36/39 chain no
                longer exists — carrying it forward over-deducts for high earners.
              </li>
              <li>
                <strong>Forgetting the 1/3-of-gross retirement ceiling</strong> and the
                women&apos;s 10% rebate — both still apply.
              </li>
            </ul>
            <p className="text-slate-700 text-base leading-relaxed mb-5">
              This online Nepali income tax calculator handles all of the above, keeps
              FY 2082/83 available for prior-year filings, and updates every time the
              Finance Act changes.
            </p>

            <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
              Who should use this Nepal income tax calculator?
            </h2>
            <ul className="space-y-2 text-slate-700 mb-5 list-disc pl-5">
              <li>
                <strong>Salaried employees in Nepal</strong> — see how much the new FY
                2083/84 slabs cut your monthly TDS
              </li>
              <li>
                <strong>HR &amp; payroll teams</strong> — recompute TDS on the unified
                schedule with SSF, PF / EPF, CIT contributions in one place
              </li>
              <li>
                <strong>Chartered Accountants &amp; tax consultants</strong> — quick
                sanity-check against Budget 2083/84 during audit or client onboarding
              </li>
              <li>
                <strong>NEPSE investors &amp; freelancers</strong> — pair this with our{' '}
                <Link href="/tools/share-cgt-calculator" className="text-[#09383e] underline-offset-2 hover:underline">
                  NEPSE CGT calculator
                </Link>{' '}
                and{' '}
                <Link href="/tools/vat-calculator" className="text-[#09383e] underline-offset-2 hover:underline">
                  VAT calculator
                </Link>{' '}
                for full-picture tax planning
              </li>
            </ul>

            <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
              Nepal Salary Tax FAQ — FY 2083/84
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
