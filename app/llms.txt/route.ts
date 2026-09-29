import { getAllPosts } from '@/lib/mdx'

export const dynamic = 'force-static'

export async function GET() {
  const posts = getAllPosts()

  const body = `# Mero Dafa

> AI legal research for Nepal — ask questions about tax acts, NRB directives, and IRD circulars. Get cited answers with exact section references and the original Gazette page beside every answer.

## About

Mero Dafa is a hierarchy-aware AI for Nepali financial professionals. Built for Chartered Accountants, banking compliance heads, CFOs, and tax lawyers. We index the Nepal Gazette, NRB directives, IRD circulars, and the Income Tax Act 2058 (with all Finance Act amendments through 2081), and surface section-level citations alongside scanned source images so every answer can be verified.

Key differentiators:
- Hierarchy-aware reasoning: the AI knows a Circular overrides a Rule, which overrides an Act. It flags contradictions automatically.
- Amended-in-place: the current law is shown, not the old text. Every floating amendment from the annual Finance Act is tracked.
- Bilingual: search in English; we find the answer in the original Nepali Rajpatra.
- Verified by CAs: a network of practicing Chartered Accountants reviews the AI's legal interpretation.

## Core pages

- [Home](${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://merodafa.com'}/): Product overview, features, pricing summary, FAQ.
- [How It Works](${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://merodafa.com'}/how-it-works): The pipeline — Scrape, Parse, Verify, Answer.
- [Pricing](${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://merodafa.com'}/pricing): Free (Rs 0), Pro (Rs 499/mo), Firm (Rs 2,499/mo — up to 10 team seats). On-prem / API / BFSI: contact sales.
- [Team](${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://merodafa.com'}/team): The engineers and CAs behind Mero Dafa.

## Free tools

- [Tools index](https://merodafa.com/tools): Free, no-signup calculators for Nepal tax & compliance.
- [Salary Tax Calculator (FY 2083/84)](https://merodafa.com/tools/salary-tax-calculator): Monthly TDS for salaried employees in Nepal on the Finance Act 2083 slabs (1% up to Rs 10,00,000, 10% / 20% / 27%, 29% above Rs 40,00,000; single & couple schedules merged), with SSF, pension-fund, PF/EPF, CIT, life, health and house insurance deductions and the single-woman 10% rebate handled. FY 2082/83 also selectable for prior-year filings.
- [VAT Calculator](https://merodafa.com/tools/vat-calculator): Add or extract Nepal VAT on any invoice — 13% standard, 5% (ride-sharing, electricity) or exempt per line, plus the 10% digital-payment VAT rebate. Per VAT Act 2052 as amended by Finance Act 2083.
- [NEPSE Share Profit & CGT Calculator](https://merodafa.com/tools/share-cgt-calculator): Real bankable profit on NEPSE trades — broker commission (0.24%–0.36% slabs, Rs 10 minimum), SEBON fee (0.015%), CDSC DP charge (Rs 25), and Capital Gains Tax (FY 2083/84: 10% ≤365 days / 7.5% >365 days for individuals, 10% institutional, 25% non-resident; older rates applied automatically for sales before 17 Jul 2026) all handled. Per SEBON regulations and Income Tax Act 2058 as amended by Finance Act 2083.
- [Bluebook Fine & Vehicle Tax Calculator](https://merodafa.com/tools/bluebook-fine-calculator): FY 2083/84 vehicle tax for all 7 provinces (bikes, cars, Bagmati EVs) with late fines: 90-day grace, then 5% / 10% / 20% within the FY and 32% per year in arrears in Bagmati (province-specific rules elsewhere), multi-year arrears and renewal fee.
- [Customs Duty Calculator](https://merodafa.com/tools/customs-calculator): FY 2083/84 passenger-baggage rules for Nepal — gold jewelry (50 g women / 25 g men duty-free, next 100 g at 20% then 23% of value), raw gold (≤100 g, dutiable), silver jewelry (500 g free), TVs (≤65\" free after 12+ months abroad) and mobile phones.
- [TDS Calculator](https://merodafa.com/tools/tds-calculator): FY 2083/84 withholding tax on rent (10%), service fees (1.5% VAT-registered / 15% PAN), contracts over Rs 50,000 (1.5%), interest (6% deposits / 15% other), dividends (5%), insurance agent commission (20%), ride-sharing (1%) — with Income Tax Act section and final-withholding status.
- [Land & House Registration Fee + CGT Calculator](https://merodafa.com/tools/property-tax-calculator): Malpot registration fee (Bagmati Finance Act 2083: 5.3% Kathmandu/Lalitpur metro, 25% women's concession) and seller capital gains tax (Finance Act 2083: 7.5% if owned 5+ years, 10% under 5 years, exempt below Rs 10 lakh).
- [Gratuity, PF & SSF Calculator](https://merodafa.com/tools/gratuity-ssf-calculator): Labour Act 2074 gratuity 8.33%, PF 10% + 10%, SSF 11% + 20% of basic salary; retirement balance and 5% withdrawal tax after the higher of 50% or Rs 5 lakh exemption.
- [Late Tax Return Fine & Interest Calculator](https://merodafa.com/tools/tax-penalty-calculator): Income Tax Act s.117 late-filing fee (0.1% p.a. of gross assessable income or Rs 100/month), s.119 interest at 15% p.a. with part months counted as full months, estimated-return and TDS-return fees.
- [Court Fee Calculator](https://merodafa.com/tools/court-fee-calculator): Court fee under Muluki Civil Procedure Code 2074 s.69 — Rs 500 on the first Rs 25,000 then 5% / 3.5% / 2% / 1.5% / 1% slabs, +15% on appeal, Rs 500 for non-monetary suits.
- [Bonus & Right Share Adjustment Calculator](https://merodafa.com/tools/bonus-right-share-calculator): NEPSE adjusted price after book closure = (MP + right price × R%) ÷ (1 + B% + R%), new share count, and 5% dividend tax on cash and bonus dividends.

## Blog — Nepal tax & compliance analysis

${posts.length === 0 ? '_No posts yet._' : posts.map((p) => `- [${p.title}](https://merodafa.com/blog/${p.slug}): ${p.excerpt}`).join('\n')}

## Contact

- Email: support@merodafa.com
- Phone: +977 9823380132
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
