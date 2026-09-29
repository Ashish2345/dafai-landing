import { CorporateActionCalculator } from './Calculator'
import { Example, H2, Note, P, Table, ToolPageShell, toolMetadata, UL } from '@/components/tools/ToolPageShell'

const DESCRIPTION =
  'Free NEPSE bonus and right share price adjustment calculator — adjusted price after book closure, new share count, right subscription cost, and the 5% dividend tax on cash and bonus dividends.'

export const metadata = toolMetadata({
  slug: 'bonus-right-share-calculator',
  seoTitle: 'Bonus & Right Share Adjustment Calculator — NEPSE',
  description: DESCRIPTION,
  keywords: ['bonus share calculator Nepal', 'right share adjustment calculator', 'NEPSE price adjustment', 'dividend tax Nepal', 'बोनस सेयर मूल्य समायोजन', 'हकप्रद सेयर'],
})

const FAQ = [
  {
    question: 'How is share price adjusted after a bonus share in NEPSE?',
    answer:
      'After book closure NEPSE divides the last price by (1 + bonus %). A share trading at Rs 600 before a 20% bonus opens at 600 ÷ 1.20 = Rs 500. Your holding is worth the same — you have 20% more shares at a lower price.',
  },
  {
    question: 'How is share price adjusted after a right issue?',
    answer:
      'Adjusted price = (market price + right price × right %) ÷ (1 + right %). For a 1:1 right share (100%) at Rs 100 on a stock trading at Rs 400, the adjusted price is (400 + 100) ÷ 2 = Rs 250. When bonus and right are announced together, both percentages go in the denominator: (MP + 100 × R%) ÷ (1 + B% + R%).',
  },
  {
    question: 'Is tax charged on bonus shares in Nepal?',
    answer:
      'Yes. Bonus shares are treated as a dividend and taxed at 5% of their face value (Rs 100 per share) as a final withholding tax. Companies usually declare a small cash dividend alongside the bonus so the tax can be deducted from it; if the cash is not enough, the shareholder pays the difference.',
  },
  {
    question: 'What is the dividend tax rate in Nepal?',
    answer:
      'Dividends paid by resident companies are subject to 5% final withholding tax under Section 88(2) of the Income Tax Act. It applies to both cash dividends and bonus shares, and the shareholder does not need to include the dividend in an annual return.',
  },
  {
    question: 'What does 1:1 or 10:3 right share mean?',
    answer:
      'The ratio shows how many right shares you may buy for the shares you hold. 1:1 means one right share per share held (100%); 10:3 means three for every ten (30%); 1:0.5 means 50%. Right shares are usually offered at the Rs 100 par value.',
  },
  {
    question: 'How do I calculate my cost price (WACC) after bonus shares?',
    answer:
      'Bonus shares count at a cost of Rs 0 in MeroShare’s WACC (weighted average cost), which lowers your average cost per share. Right shares are added at the price you paid (usually Rs 100). Use the adjusted WACC as the buy price in our NEPSE CGT calculator.',
  },
]

export default function CorporateActionPage() {
  return (
    <ToolPageShell
      slug="bonus-right-share-calculator"
      title="Bonus & Right Share"
      titleAccent="Price Adjustment + Dividend Tax"
      nepaliTitle="बोनस र हकप्रद सेयर मूल्य समायोजन तथा लाभांश कर क्यालकुलेटर — नेप्से"
      description={DESCRIPTION}
      intro={
        <p>
          Company announced a <strong>bonus</strong>, <strong>right share</strong>{' '}
          or <strong>cash dividend</strong>? See the price NEPSE will adjust to
          after book closure, how many new shares you get, what the right issue
          costs, and the 5% dividend tax.
        </p>
      }
      updatedNote="NEPSE price-adjustment method · Income Tax Act 2058 s.88(2) · Updated September 2026"
      faq={FAQ}
      related={['share-cgt-calculator', 'tds-calculator', 'salary-tax-calculator', 'property-tax-calculator']}
      cta={{
        title: 'Tracking SEBON and NEPSE rules?',
        body: 'Mero Dafa answers from the Securities Act, SEBON directives and Income Tax Act — with the exact section and the original Gazette page beside it.',
      }}
      article={
        <>
          <H2>Price adjustment formulas</H2>
          <Table
            head={['Announcement', 'Adjusted price']}
            rows={[
              ['Bonus only', 'Market price ÷ (1 + bonus %)'],
              ['Right only', '(Market price + right price × right %) ÷ (1 + right %)'],
              ['Bonus + right', '(Market price + right price × right %) ÷ (1 + bonus % + right %)'],
              ['Cash dividend only', 'No price adjustment'],
            ]}
          />
          <Note>Right shares are normally priced at Rs 100 (par). Percentages are written as decimals in the formula (20% = 0.20).</Note>

          <H2>Worked examples</H2>
          <Example
            title={<>Stock at <strong>Rs 600</strong> announces a <strong>20% bonus</strong>.</>}
            lines={['600 ÷ 1.20']}
            total="Adjusted price Rs 500"
          />
          <Example
            title={<>Stock at <strong>Rs 400</strong> announces a <strong>1:1 right</strong> at Rs 100.</>}
            lines={['(400 + 100 × 1) ÷ (1 + 1)']}
            total="Adjusted price Rs 250"
          />
          <Example
            title={<>You hold <strong>100 shares</strong>; the company declares <strong>10% bonus + 0.53% cash</strong>.</>}
            lines={[
              'Bonus: 10 shares × Rs 100 face value = Rs 1,000',
              'Cash dividend: 100 × Rs 100 × 0.53% = Rs 53',
              'Tax: 5% × (1,000 + 53) = Rs 52.65',
            ]}
            total="Cash credited ≈ Rs 0.35 — the cash covers the bonus tax"
          />

          <H2>Things investors miss</H2>
          <UL>
            <li><strong>Bonus is not free money.</strong> The price drops by the same proportion, so your holding value is unchanged.</li>
            <li><strong>Bonus shares are taxed.</strong> 5% of face value, usually netted from the cash dividend.</li>
            <li><strong>Unsubscribed rights lose value.</strong> If you don&apos;t apply, the price still adjusts down and you don&apos;t get the shares.</li>
          </UL>
          <P>
            When you later sell, capital gains tax applies to the gain over your
            adjusted cost — see the NEPSE CGT calculator.
          </P>
        </>
      }
    >
      <CorporateActionCalculator />
    </ToolPageShell>
  )
}
