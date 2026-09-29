import Link from 'next/link'
import { TdsCalculator } from './Calculator'
import { Example, H2, Note, P, Table, ToolPageShell, toolMetadata, UL } from '@/components/tools/ToolPageShell'
import { pct } from '@/lib/format'
import { TDS_CATEGORIES, TDS_ROWS } from '@/lib/tax/tds-nepal'

const DESCRIPTION =
  'Free Nepal TDS calculator and full FY 2083/84 TDS rate table — rent 10%, service fee 1.5%/15%, contract 1.5%, interest 6%/15%, dividend 5%, insurance agent 20%. Section, rate and final-withholding status.'

export const metadata = toolMetadata({
  slug: 'tds-calculator',
  seoTitle: 'TDS Calculator Nepal 2083/84 — TDS Rates Table',
  description: DESCRIPTION,
  keywords: ['TDS calculator Nepal', 'TDS rate in Nepal 2083/84', 'TDS on rent Nepal', 'TDS on service fee Nepal', 'withholding tax Nepal', 'अग्रिम कर कट्टी'],
})

const FAQ = [
  {
    question: 'What are the TDS rates in Nepal for FY 2083/84?',
    answer:
      'The main rates are: rent 10%; service or consultancy fee 1.5% to a VAT-registered provider and 15% to a PAN-only provider; contract payments above Rs 50,000 1.5%; interest on bank deposits to individuals 6% (final) and other interest 15%; dividends 5% (final); commission 15%; insurance agent commission 20% (raised from 15% by Finance Act 2083); windfall gains 25%; and 1% on ride-sharing and e-commerce platform payouts.',
  },
  {
    question: 'Is TDS calculated on the amount including VAT?',
    answer:
      'No. TDS is always calculated on the taxable value excluding VAT. On a VAT invoice of Rs 1,13,000 for services, the VAT is Rs 13,000 and TDS at 1.5% is charged on Rs 1,00,000 — Rs 1,500 — not on Rs 1,13,000.',
  },
  {
    question: 'What is the TDS on house rent in Nepal?',
    answer:
      'Rent paid by a business, organisation or other person required to withhold is subject to 10% TDS under Section 88 of the Income Tax Act. For an individual landlord who is not in the property business, this 10% is a final tax. Many local levels also levy rent tax under their own Finance Acts, so check with your ward or municipality.',
  },
  {
    question: 'When is TDS deducted on contract payments?',
    answer:
      'Under Section 89, TDS of 1.5% applies to contract payments to resident persons only when the payment exceeds Rs 50,000. Contract covers the supply of goods or labour, construction, or other work the IRD treats as a contract. Payments to non-resident contractors are withheld at 5%.',
  },
  {
    question: 'What does final withholding mean?',
    answer:
      'For final withholding payments — such as bank interest to individuals, dividends, windfall gains, meeting allowances and rent to individual landlords — the tax withheld is the end of the matter. The payee does not include that income in an annual return and cannot claim expenses against it. For non-final TDS (service fees, contracts, commission), the payee includes the income and claims the TDS as a credit.',
  },
  {
    question: 'When must TDS be deposited?',
    answer:
      'TDS deducted in a Nepali month must be deposited and the e-TDS return filed within 25 days after the month ends. Late deposit attracts interest at 15% per annum under Section 119, and not filing the TDS return attracts a fee of 2.5% per annum of the TDS amount.',
  },
  {
    question: 'What changed in TDS under Finance Act 2083?',
    answer:
      'Finance Act 2083 raised TDS on commission paid to individual insurance agents from 15% to 20% and made it final, introduced 1% advance tax on payments by ride-sharing platforms to drivers, treated capital gains tax on listed shares as final, and raised capital gains rates on land and buildings (7.5% for 5+ years, 10% below 5 years).',
  },
]

export default function TdsCalculatorPage() {
  return (
    <ToolPageShell
      slug="tds-calculator"
      title="TDS Calculator Nepal"
      titleAccent="FY 2083/84"
      nepaliTitle="अग्रिम कर कट्टी (TDS) क्यालकुलेटर र दर तालिका — आर्थिक वर्ष २०८३/८४"
      description={DESCRIPTION}
      intro={
        <p>
          Work out the tax to withhold on any payment in Nepal — rent, service
          fees, contracts, interest, dividends, commission and more. Pick the
          payment, enter the amount, and get the TDS, the Income Tax Act section,
          whether it is final, and the net amount to pay. Updated for the
          Finance Act 2083 changes.
        </p>
      }
      updatedNote="Rates per Income Tax Act 2058 as amended by Finance Act 2083 · Updated September 2026"
      faq={FAQ}
      related={['salary-tax-calculator', 'vat-calculator', 'tax-penalty-calculator', 'property-tax-calculator']}
      cta={{
        title: 'Need the section text, not just the rate?',
        body: 'Mero Dafa answers TDS questions from Sections 87–95Ka of the Income Tax Act, every Finance Act amendment and IRD circulars — with the exact section and the original Gazette page beside it.',
      }}
      article={
        <>
          <H2>TDS rates in Nepal for FY 2083/84</H2>
          <P>
            Tax Deducted at Source (TDS, अग्रिम कर कट्टी) is collected by the
            person making a payment and deposited with the Inland Revenue
            Department. The full rate table the calculator uses:
          </P>
          {TDS_CATEGORIES.map((cat) => (
            <div key={cat}>
              <h3 className="font-display font-semibold text-lg text-slate-900 mt-6 mb-2">{cat}</h3>
              <Table
                head={['Payment', 'Paid to', 'Rate', 'Section', 'Final?']}
                rows={TDS_ROWS.filter((r) => r.category === cat).map((r) => [
                  r.label,
                  r.payee,
                  <strong key="r">{pct(r.rate)}</strong>,
                  r.section,
                  r.final ? 'Yes' : 'No',
                ])}
              />
            </div>
          ))}
          <Note>
            Source: Income Tax Act 2058, Sections 87–89, 88Ka and 95Ka, as amended by
            Finance Act 2083. Payments by an individual for personal (non-business)
            purposes do not require TDS.
          </Note>

          <H2>How to calculate TDS</H2>
          <UL>
            <li>Start from the amount <strong>excluding VAT</strong>.</li>
            <li>Multiply by the rate for that payment type and payee.</li>
            <li>For contracts, apply 1.5% only if the payment is above Rs 50,000.</li>
            <li>Pay the payee the invoice amount minus TDS; deposit the TDS by the 25th of the next Nepali month.</li>
          </UL>
          <Example
            title={<>A company pays a VAT-registered consultant an invoice of <strong>Rs 1,13,000</strong> (including VAT).</>}
            lines={[
              'VAT = 1,13,000 − 1,13,000 ÷ 1.13 = Rs 13,000',
              'TDS base = Rs 1,00,000',
              'TDS @ 1.5% = Rs 1,500',
            ]}
            total="Pay consultant Rs 1,11,500 · deposit Rs 1,500 TDS"
          />
          <Example
            title={<>The same Rs 1,00,000 fee paid to a <strong>PAN-only</strong> freelancer (no VAT).</>}
            lines={['TDS @ 15% = Rs 15,000']}
            total="Pay freelancer Rs 85,000 · deposit Rs 15,000 TDS"
          />

          <H2>Common TDS mistakes</H2>
          <UL>
            <li><strong>Deducting TDS on the VAT.</strong> VAT is never part of the TDS base.</li>
            <li><strong>Using 15% for a VAT-registered provider.</strong> Service fees to VAT-registered persons are withheld at 1.5%.</li>
            <li><strong>Missing the insurance-agent change.</strong> From FY 2083/84 it is 20% and final, not 15%.</li>
            <li><strong>Depositing late.</strong> Interest runs at 15% a year — see our{' '}
              <Link href="/tools/tax-penalty-calculator" className="text-[#09383e] underline-offset-2 hover:underline">tax fine & interest calculator</Link>.</li>
          </UL>
        </>
      }
    >
      <TdsCalculator />
    </ToolPageShell>
  )
}
