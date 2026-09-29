import { PropertyCalculator } from './Calculator'
import { Example, H2, Note, P, Table, ToolPageShell, toolMetadata, UL } from '@/components/tools/ToolPageShell'

const DESCRIPTION =
  'Free Nepal land and house registration fee (malpot) and capital gains tax calculator for FY 2083/84 — 5.3% Kathmandu registration, 25% women’s concession, and seller CGT at 7.5% (5+ years) or 10%.'

export const metadata = toolMetadata({
  slug: 'property-tax-calculator',
  seoTitle: 'Land Registration Fee & Property Tax Calculator Nepal',
  description: DESCRIPTION,
  keywords: ['land registration fee Nepal', 'malpot fee calculator', 'ghar jagga registration fee', 'capital gain tax on land Nepal 2083', 'property tax Nepal', 'रजिष्ट्रेशन दस्तुर', 'घरजग्गा पुँजीगत लाभ कर'],
})

const FAQ = [
  {
    question: 'How much is the land registration fee in Kathmandu?',
    answer:
      'Under the Bagmati Province Finance Act 2083, registration fee is 5.3% of the property value in Kathmandu and Lalitpur metropolitan cities and 4.8% in other Kathmandu Valley municipalities. It is charged on the higher of the deed price and the government minimum valuation, and paid by the buyer at the Land Revenue (Malpot) Office.',
  },
  {
    question: 'Is there a discount if the land is registered in a woman’s name?',
    answer:
      'Yes. Registration fee is reduced by 25% when ownership passes to a woman (the same concession applies to senior citizens over 70 and parentless minors), and by 35% for a single woman. Joint registration in the names of husband and wife also receives the women’s concession.',
  },
  {
    question: 'What is the capital gains tax on selling land or a house in Nepal?',
    answer:
      'From 17 July 2026 (Finance Act 2083), an individual selling land or a building pays capital gains tax of 7.5% of the gain if they owned it for five years or more, and 10% if owned for less than five years. Before that date the rates were 5% and 7.5%. The Land Revenue Office collects it as a final tax at registration. Compulsory government acquisition is taxed at 2.5%.',
  },
  {
    question: 'When is property sale exempt from capital gains tax?',
    answer:
      'No capital gains tax applies when the sale value is below Rs 10 lakh, when an individual sells a private house they have owned and lived in continuously for 10 years or more, when land is donated to a government body, or on transfers by inheritance or gift within the family (tax arises only on a later sale to a third party).',
  },
  {
    question: 'How is the gain on property calculated?',
    answer:
      'Gain = sale value (the higher of the deed price and the government minimum valuation) − original purchase price − allowable costs such as the registration fee you paid when buying and documented improvements. For inherited property, the cost base is the value when you inherited it.',
  },
  {
    question: 'Who pays registration fee and who pays capital gains tax?',
    answer:
      'By practice the buyer pays the registration fee and the seller pays the capital gains tax, both at the Land Revenue Office on the day of registration. Parties can agree otherwise in the deal.',
  },
]

export default function PropertyTaxPage() {
  return (
    <ToolPageShell
      slug="property-tax-calculator"
      title="Land & House Registration Fee"
      titleAccent="+ Capital Gains Tax Calculator"
      nepaliTitle="घरजग्गा रजिष्ट्रेशन दस्तुर र पुँजीगत लाभ कर क्यालकुलेटर — २०८३/८४"
      description={DESCRIPTION}
      intro={
        <p>
          Buying or selling land, a house or a flat in Nepal? Enter the deal
          value to see the <strong>registration fee</strong> the buyer pays at
          the Malpot office and the <strong>capital gains tax</strong>{' '}the seller
          pays — with the women&apos;s concession, the 5-year rule and the new
          Finance Act 2083 rates.
        </p>
      }
      updatedNote="Registration: Bagmati Province Finance Act 2083 · CGT: Income Tax Act s.95Ka(5) as amended by Finance Act 2083 · Updated September 2026"
      faq={FAQ}
      related={['tds-calculator', 'salary-tax-calculator', 'share-cgt-calculator', 'court-fee-calculator']}
      cta={{
        title: 'Buying land? Read the law, not a forum post.',
        body: 'Mero Dafa answers from the Land Act, Land Revenue Act, Income Tax Act and every provincial Finance Act — with the exact section and the original Gazette page beside it.',
      }}
      article={
        <>
          <H2>Registration fee rates (Bagmati Province, FY 2083/84)</H2>
          <Table
            head={['Where the property is', 'Registration fee']}
            rows={[
              ['Kathmandu / Lalitpur Metropolitan City', '5.3%'],
              ['Other municipalities in Kathmandu Valley', '4.8%'],
              ['Metropolitan city outside the Valley', '5.15%'],
              ['Sub-metropolitan city', '4.65%'],
              ['Municipality outside the Valley', '4.5%'],
              ['Rural municipality', '3%'],
            ]}
          />
          <Note>
            Concession: 25% off for registration in a woman&apos;s name, 35% off for a
            single woman. Other provinces set their own rates in their Finance Acts —
            use the &ldquo;Other province&rdquo; option and enter the rate from the Malpot
            notice board.
          </Note>

          <H2>Capital gains tax on land and houses</H2>
          <Table
            head={['Seller (individual)', 'Sold from 17 Jul 2026', 'Sold before']}
            rows={[
              ['Owned 5 years or more', <strong key="a">7.5% of gain</strong>, '5%'],
              ['Owned under 5 years', <strong key="b">10% of gain</strong>, '7.5%'],
              ['Compulsory government acquisition', <strong key="c">2.5%</strong>, '—'],
              ['Sale value below Rs 10 lakh', 'Exempt', 'Exempt'],
              ['Own house lived in 10+ years', 'Exempt', 'Exempt'],
            ]}
          />
          <Note>Source: Income Tax Act 2058, Section 95Ka(5) and Section 10, as amended by Finance Act 2083.</Note>

          <H2>Worked example — Rs 1 crore house in Kathmandu</H2>
          <Example
            title={<>Deed price <strong>Rs 1,00,00,000</strong>, Kathmandu Metropolitan City. Seller bought it for Rs 70,00,000 three years ago.</>}
            lines={[
              'Buyer (man): 5.3% × 1 crore = Rs 5,30,000',
              'Buyer (woman): 5,30,000 − 25% = Rs 3,97,500',
              'Seller gain: 1,00,00,000 − 70,00,000 = Rs 30,00,000',
              'Seller CGT (under 5 years): 10% = Rs 3,00,000',
            ]}
            total="Had the seller held it 5+ years: 7.5% = Rs 2,25,000"
          />

          <H2>Ways buyers and sellers overpay</H2>
          <UL>
            <li><strong>Ignoring the women&apos;s concession</strong> — registering in a woman&apos;s name saves 25% of the fee.</li>
            <li><strong>Selling just before the 5-year mark</strong> — waiting until the fifth anniversary cuts CGT from 10% to 7.5%.</li>
            <li><strong>Losing purchase receipts</strong> — registration fee paid and documented construction costs reduce the taxable gain.</li>
            <li><strong>Under-declaring the price</strong> — the Malpot office charges on the government minimum valuation anyway.</li>
          </UL>
          <P>
            Registration also involves a ward recommendation letter, deed writer
            fees and, for plot splits, kitta-kat charges — budget a little extra
            beyond the figures above.
          </P>
        </>
      }
    >
      <PropertyCalculator />
    </ToolPageShell>
  )
}
