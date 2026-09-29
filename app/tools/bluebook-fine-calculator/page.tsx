import type { Metadata } from 'next'
import Link from 'next/link'
import { BluebookCalculator } from './Calculator'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  breadcrumbListSchema,
  faqPageSchema,
  softwareToolSchema,
  SITE_URL,
} from '@/lib/seo/schema'
import { socialMeta } from '@/lib/seo/metadata'
import { ALL_PROVINCES, PROVINCE_LABELS, PROVINCES } from '@/lib/tax/bluebook-fine'

const PAGE_URL = `${SITE_URL}/tools/bluebook-fine-calculator`
const PAGE_TITLE = 'Bluebook Fine & Vehicle Tax Renewal Calculator'
const PAGE_DESCRIPTION =
  'Calculate exact bluebook renewal cost in Nepal — provincial vehicle tax + late fine for all 7 provinces, EVs and multi-year arrears (FY 2083/84).'

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/tools/bluebook-fine-calculator' },
  ...socialMeta({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/tools/bluebook-fine-calculator',
  }),
}

const FAQ = [
  {
    question: 'What is the bluebook renewal penalty in Nepal?',
    answer:
      'In Bagmati there is no fine for 90 days after your bluebook expires. After that grace window the fine is 5% of the annual tax for the first 30 days, 10% up to 45 days, and 20% until the fiscal year ends (Ashadh end, ~15 July). Once the fiscal year has passed, each year in arrears carries a 32% fine, and a late renewal also doubles the renewal fee. Other provinces differ — Gandaki and Lumbini escalate to 100–120% for old arrears, while Madhesh, Karnali and Sudurpaschim charge 30% per year in arrears.',
  },
  {
    question: 'When does the Nepali fiscal year end for vehicle tax purposes?',
    answer:
      'The Nepali fiscal year ends on Ashadh 31, which is approximately July 15 in the Gregorian calendar each year. If you renew before the fiscal year ends you pay 0–20% depending on how late you are. Once it passes, that year moves into arrears and the fine jumps (32% in Bagmati).',
  },
  {
    question: 'How do I find my exact base vehicle tax amount?',
    answer:
      'Vehicle tax rates differ by province and are revised every year via the provincial Finance Act. This calculator ships the FY 2083/84 schedule for all seven provinces (Sudurpaschim still uses 2082/83 rates). You can also check the leaflet posted at any Yatayat Vyavasthapan Karyalaya (transport office). If your office quotes a different figure, use the manual base-tax field and the fine math still applies.',
  },
  {
    question: 'Does this calculator include pollution tax and insurance?',
    answer:
      'Not fully. This calculator covers the annual vehicle tax (सवारी कर), the late fine and the bluebook renewal fee. Other components of a renewal bill — pollution tax (4-wheelers), third-party insurance (mandatory), road tax, and route-permit fees for commercial vehicles — are billed separately and have their own rate structures.',
  },
  {
    question: 'What happens if I drive without renewing?',
    answer:
      'Driving an unregistered or expired-registration vehicle is an offense under the Motor Vehicles and Transport Management Act 2049. Traffic police can fine you on-spot and impound the vehicle. The on-spot fine is separate from — and on top of — the renewal penalty you’ll owe at the transport office. The longer you wait, the more both costs grow.',
  },
  {
    question: 'Are EVs and commercial vehicles handled the same way?',
    answer:
      'EVs are taxed by motor power instead of engine cc. In Bagmati an electric scooter pays Rs 1,000–3,000 a year by wattage, and an electric car pays Rs 5,000–30,000 by kW — switch the calculator to “Electric (EV)”. For other provinces, enter the EV rate from your transport office manually. Commercial vehicles, taxis and route-permit holders pay different rates and are not covered.',
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
            <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 leading-tight tracking-tight mb-1.5">
              Bluebook Fine{' '}
              <span className="text-slate-500 font-medium">& Vehicle Tax Calculator</span>
            </h1>
            <p
              className="text-slate-500 text-sm mb-3"
              lang="ne"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              ब्लूबुक नवीकरण जरिवाना र सवारी कर क्यालकुलेटर — नेपाल
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-3">
              Free Nepal bluebook renewal calculator for bikes and cars. Computes
              annual vehicle tax (सवारी कर), the late fine after the 90-day grace
              window, multi-year arrears and the renewal fee — using FY 2083/84
              rates for all seven provinces, including EVs in Bagmati.
            </p>
            <p className="text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Verified against Bagmati Provincial Finance Act 2081 by Sabin Adhikari, CA · Last reviewed April 2026 · Rates updated to FY 2083/84 (September 2026)
              </span>
            </p>
          </header>

          {/* Calculator card */}
          <section
            className="rounded-2xl sm:rounded-3xl border-0 sm:border border-slate-200 bg-white p-0 sm:p-6 lg:p-8 mb-10"
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
                Penalty bands, provincial rate tables & FAQ
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
              How the Nepal bluebook renewal penalty works
            </h2>
            <p className="text-slate-700 text-base leading-relaxed mb-5">
              Nepal&apos;s vehicle registration system runs annually. Your
              bluebook (the registration certificate) shows the date your
              current registration expires, usually one year from your last
              renewal. Once that date passes, the{' '}
              <a
                href="https://www.dotm.gov.np/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#09383e] underline-offset-2 hover:underline"
              >
                Department of Transport Management
              </a>{' '}
              applies a graduated penalty — small at first, then steeper the
              longer you delay. Vehicle tax rates themselves are set province by
              province; Bagmati Province publishes its rates via its{' '}
              <a
                href="https://ofmcm.bagamati.gov.np/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#09383e] underline-offset-2 hover:underline"
              >
                Provincial Finance Act
              </a>{' '}
              each year.
            </p>

            <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
              Penalty bands (Bagmati)
            </h2>
            <div className="overflow-x-auto rounded-lg border border-slate-200 mb-3">
              <table className="w-full min-w-[480px] text-sm">
                <thead className="bg-slate-50 text-slate-900">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">When you pay</th>
                    <th className="text-left px-4 py-3 font-semibold">Fine</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3">Within 90 days of expiry</td>
                    <td className="px-4 py-3 font-semibold">0% — grace period</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50/40">
                    <td className="px-4 py-3">First 30 days after grace</td>
                    <td className="px-4 py-3 font-semibold">5% of annual tax</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3">31 – 45 days after grace</td>
                    <td className="px-4 py-3 font-semibold">10% of annual tax</td>
                  </tr>
                  <tr className="border-t border-slate-200 bg-slate-50/40">
                    <td className="px-4 py-3">Later, but before the fiscal year ends</td>
                    <td className="px-4 py-3 font-semibold">20% of annual tax</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3">After Ashadh end (each year in arrears)</td>
                    <td className="px-4 py-3 font-semibold">32% of that year&apos;s tax</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Each missed year is taxed and fined separately, and a late renewal
              also doubles the bluebook renewal fee. Other provinces use
              different fines:
            </p>
            <ul className="space-y-1 text-sm text-slate-700 mb-5 list-disc pl-5">
              {ALL_PROVINCES.filter((p) => p !== 'bagmati').map((p) => (
                <li key={p}>
                  <strong>{PROVINCE_LABELS[p]}:</strong> {PROVINCES[p].penalty.summary}
                </li>
              ))}
            </ul>

            <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
              Vehicle tax by province (FY 2083/84)
            </h2>
            <p className="text-xs text-amber-700 mb-3">
              ⚠ Rates change every Shrawan through each provincial Finance Act.
              Confirm with your transport office before paying.
            </p>
            <h3 className="font-display font-semibold text-base text-slate-900 mb-2">
              Two-wheelers (annual tax, Rs)
            </h3>
            <RateMatrix kind="twoWheeler" />
            <h3 className="font-display font-semibold text-base text-slate-900 mb-2">
              Four-wheelers — private cars / jeeps / vans (annual tax, Rs)
            </h3>
            <RateMatrix kind="fourWheeler" />

            <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
              Worked example
            </h2>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 mb-5">
              <p className="text-slate-700 text-sm leading-relaxed mb-2">
                Bagmati two-wheeler, <strong>150 cc</strong>, bluebook expired{' '}
                <strong>110 days ago</strong> (same fiscal year).
              </p>
              <ul className="space-y-0.5 text-sm text-slate-600 list-none pl-0 mb-3 font-mono">
                <li>Tier: 126–150 cc → Rs 5,000 / year</li>
                <li>Days late: 110 → 20 days past the 90-day grace</li>
                <li>Fine: 5% × Rs 5,000 = Rs 250</li>
                <li>Renewal fee Rs 300 + 100% late fine Rs 300</li>
                <li className="font-semibold text-slate-900">
                  Total payable: Rs 5,850
                </li>
              </ul>
            </div>

            <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
              Common bluebook renewal mistakes in Nepal
            </h2>
            <p className="text-slate-700 text-base leading-relaxed mb-3">
              Three mistakes turn a routine bluebook renewal into an unexpected
              bill — usually Rs 1,000 to Rs 15,000 more than expected:
            </p>
            <ul className="space-y-2 text-slate-700 mb-5 list-disc pl-5">
              <li>
                <strong>Misreading the grace period.</strong> The 90-day,
                no-fine window runs <em>from the expiry date</em> printed on
                your bluebook. Day 91 starts the 5% band and doubles your
                renewal fee.
              </li>
              <li>
                <strong>Forgetting Ashadh 31 is the cliff.</strong> Crossing the
                fiscal-year boundary (~July 15 in the Gregorian calendar) jumps
                the penalty from 20% to <strong>32%</strong> overnight. A renewal
                that costs Rs 7,800 on Ashadh 30 costs Rs 8,580 on Shrawan 1.
                Plan your transport-office visit before the FY ends.
              </li>
              <li>
                <strong>Confusing province rates.</strong> Vehicle tax differs
                meaningfully across Nepal&apos;s seven provinces — a 1,500 cc
                car taxed Rs 27,000 in Bagmati is Rs 32,000 in Koshi and Rs 26,000
                in Karnali. Always check your province&apos;s current
                Finance Act, not last year&apos;s or another province&apos;s.
              </li>
            </ul>
            <p className="text-slate-700 text-base leading-relaxed mb-5">
              This Nepal vehicle tax calculator carries every province&apos;s
              rate table and fine rule, and adds up each missed year separately
              — so the total matches what the transport office will charge.
            </p>

            <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
              Who should use this bluebook fine calculator?
            </h2>
            <ul className="space-y-2 text-slate-700 mb-5 list-disc pl-5">
              <li>
                <strong>Bike &amp; car owners</strong> — find out exactly what
                you owe before queuing at the Yatayat Vyavasthapan Karyalaya,
                with no surprises at the cashier
              </li>
              <li>
                <strong>Delayed renewals</strong> — see whether it&apos;s worth
                paying the penalty now versus waiting (hint: never wait past
                Ashadh 31 — the 32% cliff costs more than the wait saves)
              </li>
              <li>
                <strong>Used-vehicle buyers</strong> — confirm the renewal
                liability you&apos;ll inherit before agreeing on a price
              </li>
              <li>
                <strong>Salaried employees &amp; investors</strong> — pair with
                our{' '}
                <Link href="/tools/salary-tax-calculator" className="text-[#09383e] underline-offset-2 hover:underline">
                  Nepal salary tax calculator
                </Link>{' '}
                and{' '}
                <Link href="/tools/share-cgt-calculator" className="text-[#09383e] underline-offset-2 hover:underline">
                  NEPSE CGT calculator
                </Link>{' '}
                for the full personal-tax picture
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

function RateMatrix({ kind }: { kind: 'twoWheeler' | 'fourWheeler' }) {
  const rows = PROVINCES.bagmati[kind]
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 mb-5">
      <table className="w-full min-w-[640px] text-sm">
        <thead className="bg-slate-50 text-slate-900">
          <tr>
            <th className="text-left px-3 py-3 font-semibold">Engine cc</th>
            {ALL_PROVINCES.map((p) => (
              <th key={p} className="text-right px-3 py-3 font-semibold">
                {PROVINCE_LABELS[p]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-slate-700 tabular-nums">
          {rows.map((row, i) => (
            <tr key={row.label} className={`border-t border-slate-200 ${i % 2 ? 'bg-slate-50/40' : ''}`}>
              <td className="px-3 py-2.5 whitespace-nowrap">{row.label}</td>
              {ALL_PROVINCES.map((p) => (
                <td key={p} className="px-3 py-2.5 text-right">
                  {PROVINCES[p][kind][i].baseTax.toLocaleString('en-IN')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
