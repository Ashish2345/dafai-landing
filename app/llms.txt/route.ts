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
- [Salary Tax Calculator (FY 2083/84)](https://merodafa.com/tools/salary-tax-calculator): Monthly TDS for salaried employees in Nepal on the new Budget 2083/84 slabs (1% up to Rs 10,00,000, 10% / 20% / 27%, 29% above Rs 40,00,000; single & couple schedules merged), with SSF, PF/EPF, CIT, life and health insurance deductions and the single-woman 10% rebate handled. FY 2082/83 also selectable for prior-year filings.
- [VAT Calculator (13%)](https://merodafa.com/tools/vat-calculator): Add or extract 13% Nepal VAT on any invoice. Multi-line mode for line-item invoices with running totals. Per VAT Act 2052.
- [NEPSE Share Profit & CGT Calculator](https://merodafa.com/tools/share-cgt-calculator): Real bankable profit on NEPSE trades — broker commission (0.27%–0.40% slabs), SEBON fee (0.015%), CDSC DP charge (Rs 25), and Capital Gains Tax (7.5%/5% individual, 10% institutional) all handled. Per SEBON regulations and Income Tax Act 2058.
- [Bluebook Fine & Vehicle Tax Calculator](https://merodafa.com/tools/bluebook-fine-calculator): Annual vehicle tax + late renewal penalty for two- and four-wheelers. Penalty bands: 0% (≤30 days), 5% (31–45), 10% (46–60), 20% (61+ within FY), 32% (past FY end / Ashadh 31). Bagmati rate table shipped; manual override for other provinces.

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
