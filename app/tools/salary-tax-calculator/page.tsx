import type { Metadata } from 'next'
import Image from 'next/image'
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
const PAGE_TITLE = 'Nepal Salary Tax Calculator FY 2082/83 (2025/26)'
const PAGE_DESCRIPTION =
  'Free Nepal salary TDS calculator for FY 2082/83 (2025/26). Finance Act 2082 slabs (1% / 10% / 20% / 30% / 36% / 39%) with SSF, PF/EPF, CIT, life & health insurance deductions. Reviewed by Nepali Chartered Accountants.'

const PAGE_PUBLISHED = '2026-04-20'
const PAGE_MODIFIED = '2026-05-16'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    'Nepal salary tax calculator',
    'salary tax Nepal',
    'income tax Nepal',
    'Nepal TDS calculator',
    'FY 2082/83',
    'Finance Act 2082',
    'Nepal income tax slabs 2025/26',
    'tax calculator Nepal',
    'SSF PF CIT tax Nepal',
  ],
  alternates: { canonical: '/tools/salary-tax-calculator' },
  ...socialMeta({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/tools/salary-tax-calculator',
    image: '/images/nepal-tax-slabs-fy-2082-83.jpg',
  }),
}

const FAQ = [
  {
    question: 'What are the salary tax slabs for FY 2082/83 in Nepal?',
    answer:
      "For single/unmarried individuals: 1% on the first Rs 5,00,000, 10% on Rs 5–7L, 20% on Rs 7–10L, 30% on Rs 10–20L, 36% on Rs 20–50L (30% + 20% surcharge), and 39% on income above Rs 50,00,000 (30% + 30% surcharge). For married couples filing jointly: 1% on the first Rs 6,00,000, 10% on Rs 6–8L, 20% on Rs 8–11L, 30% on Rs 11–20L, 36% on Rs 20–50L, and 39% above Rs 50,00,000. The 1% Social Security Tax slab becomes 0% for SSF participants.",
  },
  {
    question: 'How is monthly TDS calculated from annual salary in Nepal?',
    answer:
      "Annual gross income is computed (basic + allowances × 12 + festival bonus). Then deductions are applied: SSF + PF + CIT are summed and capped at the lowest of (a) actual contribution, (b) 1/3 of gross income, or (c) Rs 5,00,000; life insurance is capped separately at Rs 40,000; health insurance at Rs 20,000. The remaining taxable income runs through the FY 2082/83 slab table. Annual tax is divided by 12 to give the monthly TDS that HR deducts.",
  },
  {
    question: 'What is new in FY 2082/83 compared to FY 2081/82?',
    answer:
      "The biggest change is the new 39% top slab on income above Rs 50,00,000. Under FY 2081/82 everything above Rs 20,00,000 was taxed at a flat 36% (30% + 20% surcharge). Under FY 2082/83 the band from Rs 20,00,001 to Rs 50,00,000 stays at 36%, but income above Rs 50,00,000 now attracts a 39% rate (30% + 30% surcharge). Slabs below Rs 20,00,000 and the deduction caps (Rs 5,00,000 retirement, Rs 40,000 life insurance, Rs 20,000 health insurance) remain unchanged.",
  },
  {
    question: 'What deductions can a salaried employee claim in Nepal?',
    answer:
      "Retirement contributions (SSF + PF/EPF + CIT) are deductible together — but the combined deduction is capped at the lowest of: the actual amount contributed, one-third of gross annual income, or Rs 5,00,000. On top of the retirement cap, life insurance premiums up to Rs 40,000 and health insurance premiums up to Rs 20,000 are deductible separately. Additional exemptions exist for disabled employees, women in some categories, and remote-area allowances — consult your CA for those edge cases.",
  },
  {
    question: 'How does the combined retirement deduction cap work?',
    answer:
      "Per Section 63 of the Income Tax Act 2058 (published by the Inland Revenue Department at ird.gov.np), your CIT, PF, and SSF contributions are added together, and the deductible portion is the lowest of three values: (1) the actual combined contribution, (2) one-third of gross annual income, and (3) Rs 5,00,000. Example: on Rs 13,00,000 gross income with Rs 6,00,000 combined retirement contribution, 1/3 of gross is Rs 4,33,333 — lower than both the actual contribution and the Rs 5,00,000 cap — so Rs 4,33,333 is the allowed deduction and taxable income becomes Rs 8,66,667. The remaining Rs 1,66,667 is still saved into your retirement accounts but does not reduce TDS this year.",
  },
  {
    question: "What's the difference between SSF and PF (Provident Fund)?",
    answer:
      "SSF (Social Security Fund) is the contributory scheme administered by the Social Security Fund Secretariat (ssf.gov.np) — employees contribute 11% of basic salary, employers contribute 20%, and participating employees are exempt from the 1% Social Security Tax. PF (Provident Fund / EPF) is administered by the Employees Provident Fund — employees and employers each typically contribute 10% of basic salary. Both contributions are deductible from taxable income, but they are separate schemes and have different governing laws. Many private-sector employees contribute to PF; SSF is mandatory for some employer categories.",
  },
  {
    question: 'What is the difference between SST, SSF, and TDS?',
    answer:
      "SST (Social Security Tax) is the 1% tax on the first slab of taxable income, paid into a national pool. SSF (Social Security Fund) is a separate contributory scheme — employees contribute 11% of basic salary and employers contribute 20%; participating employees are exempt from the 1% SST. TDS (Tax Deducted at Source) is the broader mechanism by which the employer withholds and pays your monthly income tax to the IRD on your behalf.",
  },
  {
    question: 'Is there a tax rebate for women in Nepal?',
    answer:
      "Yes. Single women with only employment income are entitled to a 10% rebate on the income tax payable. The rebate is not available for married women filing jointly (couple status). This calculator implements the standard slabs and does not auto-apply the women's rebate — apply a 10% reduction to the annual tax output if you qualify, or consult a Chartered Accountant.",
  },
  {
    question: 'Is this calculator official?',
    answer:
      "No. This calculator implements the standard salaried-employee slabs from Finance Act 2082 and is provided for reference. It does not model edge cases like disability exemption, women's rebate, foreign-source income, or remote-area allowances. Always verify with a practicing Chartered Accountant before filing.",
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
          about: 'Nepal salary income tax FY 2082/83 (2025/26)',
          image: `${SITE_URL}/images/nepal-tax-slabs-fy-2082-83.jpg`,
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
              <span className="text-slate-500 font-medium">FY 2082/83 (2025/26)</span>
            </h1>
            <p
              className="text-slate-500 text-sm mb-3"
              lang="ne"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              नेपाली तलब कर क्यालकुलेटर — आर्थिक वर्ष २०८२/८३
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-3">
              Free monthly TDS calculator for salaried employees in Nepal. Computes
              income tax for single and married filers using Finance Act 2082 slabs —
              including the new <strong>39% slab on income above Rs 50,00,000</strong> —
              with SSF, PF / EPF, CIT, life insurance and health insurance deductions
              handled automatically.
            </p>
            <p className="text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Verified against Finance Act 2082 by{' '}
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
                <time dateTime={PAGE_MODIFIED}>16 May 2026</time>
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

          {/* Tax slab infographic — single vs married, FY 2082/83 */}
          <figure className="max-w-3xl mx-auto mb-10">
            <Image
              src="/images/nepal-tax-slabs-fy-2082-83.jpg"
              alt="Nepal income tax slabs FY 2082/83 — single individual vs married couple progressive tax system, 1% to 39% rates"
              width={1280}
              height={760}
              className="w-full h-auto rounded-xl border border-slate-200"
              sizes="(min-width: 768px) 720px, 100vw"
              priority={false}
            />
            <figcaption className="mt-2 text-xs text-slate-500 text-center">
              Nepal income tax slabs for FY 2082/83 (2025/26) — single vs married, per
              Finance Act 2082.
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
              How is monthly salary income tax calculated in Nepal (FY 2082/83)?
            </h2>
            <p className="text-slate-700 text-base leading-relaxed mb-5">
              Nepal uses a progressive slab system for salaried employees, set each
              year in the Finance Act. For FY 2082/83 (Shrawan 2082 – Ashadh 2083),
              the slabs were defined in{' '}
              <strong>
                <a
                  href="https://mof.gov.np/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#09383e] underline-offset-2 hover:underline"
                >
                  Finance Act 2082
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
              — and they differ between single (unmarried) and married (couple)
              filing status. Below the calculator output, you can see exactly which
              slab each rupee of your taxable income falls into.
            </p>

            <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
              Income tax slabs for FY 2082/83
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
                    <td className="px-4 py-3">Rs 20,00,001 – 50,00,000</td>
                    <td className="px-4 py-3">Rs 20,00,001 – 50,00,000</td>
                    <td className="px-4 py-3">36% (30% + 20% surcharge)</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50/40">
                    <td className="px-4 py-3">Above Rs 50,00,000</td>
                    <td className="px-4 py-3">Above Rs 50,00,000</td>
                    <td className="px-4 py-3 font-medium text-[#09383e]">39% (30% + 30% surcharge) — new in FY 2082/83</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mb-8">
              Source: Finance Act 2082 (Income Tax Act 2058 as amended). For
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
              What changed in FY 2082/83 vs FY 2081/82?
            </h2>
            <p className="text-slate-700 text-base leading-relaxed mb-3">
              The headline change in Finance Act 2082 is the splitting of the
              previously flat top slab into two:
            </p>
            <ul className="space-y-2 text-slate-700 mb-5 list-disc pl-5">
              <li>
                <strong>Rs 20,00,001 – Rs 50,00,000</strong> stays at the existing
                36% rate (30% base + 20% surcharge).
              </li>
              <li>
                <strong>Above Rs 50,00,000</strong> attracts a new 39% rate (30%
                base + 30% surcharge). Previously, all income above Rs 20,00,000 was
                a flat 36%.
              </li>
            </ul>
            <p className="text-slate-700 text-base leading-relaxed mb-5">
              For employees with annual taxable income below Rs 50,00,000, monthly
              TDS is unchanged between FY 2081/82 and FY 2082/83. The new 39% slab
              affects only the portion of income above Rs 50 lakh — typically senior
              executives, partners, and high-earning consultants. Deduction caps
              (Rs 5,00,000 combined retirement, Rs 40,000 life insurance, Rs 20,000
              health insurance) and the 1/3-of-gross retirement ceiling all remain
              unchanged.
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

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 mb-4">
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

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 mb-5">
              <p className="font-semibold text-slate-900 text-sm mb-2">
                Worked example C — high earner with new 39% slab
              </p>
              <p className="text-slate-700 text-sm leading-relaxed mb-2">
                Gross annual income <strong>Rs 60,00,000</strong> for a single filer,
                with combined CIT + PF + SSF contribution of <strong>Rs 5,00,000</strong>
                {' '}(retirement cap binds).
              </p>
              <p className="text-slate-700 text-sm leading-relaxed mb-2">
                Taxable income = Rs 55,00,000.
              </p>
              <ul className="space-y-0.5 text-sm text-slate-600 list-none pl-0 mb-2 font-mono">
                <li>Rs 5,00,000 × 1%  = Rs 5,000</li>
                <li>Rs 2,00,000 × 10% = Rs 20,000</li>
                <li>Rs 3,00,000 × 20% = Rs 60,000</li>
                <li>Rs 10,00,000 × 30% = Rs 3,00,000</li>
                <li>Rs 30,00,000 × 36% = Rs 10,80,000</li>
                <li>Rs 5,00,000 × 39% = Rs 1,95,000</li>
                <li className="font-semibold text-slate-900">
                  Total annual tax  = Rs 16,60,000 (Rs 1,38,333 /month)
                </li>
              </ul>
              <p className="text-xs text-slate-500">
                Under FY 2081/82 (flat 36% above 20L), the same employee would have
                paid Rs 16,45,000. The new 39% slab adds Rs 15,000 / year for every
                Rs 5,00,000 above the Rs 50 lakh threshold.
              </p>
            </div>

            <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
              Calculator vs manual Excel calculation
            </h2>
            <p className="text-slate-700 text-base leading-relaxed mb-3">
              Most HR teams in Nepal still compute monthly TDS in Excel — copying
              last year&apos;s slab table, manually adjusting for Finance Act 2082
              amendments, and patching the formula every time SSF rules or the
              retirement cap change. Four common mistakes we see in manual
              spreadsheets:
            </p>
            <ul className="space-y-2 text-slate-700 mb-5 list-disc pl-5">
              <li>
                <strong>Missing the new 39% slab above Rs 50 lakh.</strong> Many
                FY 2081/82 spreadsheets simply extend the 36% rate to infinity. For
                executives crossing Rs 50,00,000 of taxable income, this under-deducts
                tax and creates year-end shortfalls.
              </li>
              <li>
                <strong>Forgetting the 1/3-of-gross retirement ceiling.</strong>{' '}
                Excel formulas often hard-code the Rs 5,00,000 cap and miss that for
                lower-income employees the proportional ceiling binds first.
              </li>
              <li>
                <strong>Wrong SSF treatment.</strong> SSF participants&apos; first
                slab is 0%, not 1%. Manual calculators frequently overtax SSF
                members by Rs 5,000–6,000 per year.
              </li>
              <li>
                <strong>Missing the surcharge in the 36% and 39% brackets.</strong>{' '}
                The effective rates are 36% (30% + 20% surcharge) and 39% (30% +
                30% surcharge), not flat 30%. Easy to miss in a slab-formula chain.
              </li>
            </ul>
            <p className="text-slate-700 text-base leading-relaxed mb-5">
              This online Nepali income tax calculator handles all four correctly,
              and updates every time the Finance Act changes — so HR teams,
              salaried employees, and CAs don&apos;t have to rebuild their
              spreadsheet each Shrawan.
            </p>

            <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
              Who should use this Nepal income tax calculator?
            </h2>
            <ul className="space-y-2 text-slate-700 mb-5 list-disc pl-5">
              <li>
                <strong>Salaried employees in Nepal</strong> — verify your monthly
                TDS deduction is correct before HR finalises payroll
              </li>
              <li>
                <strong>HR &amp; payroll teams</strong> — compute TDS for single
                and married couple employees with SSF, PF / EPF, CIT contributions
                in one place
              </li>
              <li>
                <strong>Chartered Accountants &amp; tax consultants</strong> —
                quick sanity-check during audit or client onboarding, including the
                new FY 2082/83 39% top slab
              </li>
              <li>
                <strong>NEPSE investors &amp; freelancers</strong> — pair this
                with our{' '}
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
              Nepal Salary Tax FAQ — FY 2082/83
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
