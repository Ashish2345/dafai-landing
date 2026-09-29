import { CourtFeeCalculator } from './Calculator'
import { Example, H2, Note, P, Table, ToolPageShell, toolMetadata, UL } from '@/components/tools/ToolPageShell'
import { npr } from '@/lib/format'
import { computeCourtFee } from '@/lib/legal/court-fee'

const DESCRIPTION =
  'Free Nepal court fee (कोर्ट फी) calculator under Section 69 of the Muluki Civil Procedure Code 2074 — slab-by-slab fee on any claim, the 15% appeal addition, and the Rs 500 fee for non-monetary suits.'

export const metadata = toolMetadata({
  slug: 'court-fee-calculator',
  seoTitle: 'Court Fee Calculator Nepal — कोर्ट फी (Civil Code 2074)',
  description: DESCRIPTION,
  keywords: ['court fee calculator Nepal', 'court fee Nepal', 'कोर्ट फी', 'अदालती शुल्क', 'civil procedure code 2074 section 69', 'appeal fee Nepal'],
})

const SAMPLE_CLAIMS = [25_000, 50_000, 100_000, 500_000, 1_000_000, 2_500_000, 5_000_000, 10_000_000]

const FAQ = [
  {
    question: 'How is court fee calculated in Nepal?',
    answer:
      'Section 69 of the Muluki Civil Procedure (Code) Act 2074 sets a progressive fee on the value claimed: Rs 500 for the first Rs 25,000, then 5% of the part from Rs 25,001 to 50,000, 3.5% from Rs 50,001 to 1 lakh, 2% from Rs 1 lakh to 5 lakh, 1.5% from Rs 5 lakh to 25 lakh, and 1% on anything above Rs 25 lakh. Each rate applies only to the part of the claim inside its slab.',
  },
  {
    question: 'How much is the court fee for a Rs 10 lakh claim?',
    answer:
      'Rs 19,000: Rs 500 on the first 25,000 + Rs 1,250 (5% of the next 25,000) + Rs 1,750 (3.5% of the next 50,000) + Rs 8,000 (2% of the next 4 lakh) + Rs 7,500 (1.5% of the last 5 lakh).',
  },
  {
    question: 'What is the court fee for an appeal?',
    answer:
      'When appealing from the District Court to the High Court, or from the High Court to the Supreme Court, the fee is the amount payable on the original plaint plus an additional 15%.',
  },
  {
    question: 'What is the court fee for divorce or partition cases?',
    answer:
      'Suits that have no monetary value — such as partition (अंशबण्डा), eviction, declaratory relief or voiding a deed — pay a flat Rs 500 under Section 70. Where a claim for money or property is attached, the Section 69 slabs apply to that amount.',
  },
  {
    question: 'Who is exempt from paying court fee?',
    answer:
      'The Government of Nepal and provincial governments do not pay court fee. A court can also exempt a party, fully or partly, if it finds they cannot afford it — commonly used for legal-aid cases.',
  },
  {
    question: 'When is court fee paid?',
    answer:
      'Under Section 63, the fee is paid when the plaint, counter-claim or appeal is registered, based on the value claimed at that time. If the claim is later amended upward, the additional fee must be paid.',
  },
]

export default function CourtFeePage() {
  return (
    <ToolPageShell
      slug="court-fee-calculator"
      title="Court Fee Calculator"
      titleAccent="Nepal"
      nepaliTitle="कोर्ट फी (अदालती शुल्क) क्यालकुलेटर — मुलुकी देवानी कार्यविधि संहिता, २०७४"
      description={DESCRIPTION}
      intro={
        <p>
          Filing a civil case? Enter the amount or property value in dispute to
          get the exact <strong>court fee</strong> under Section 69 of the
          Muluki Civil Procedure Code 2074, broken down slab by slab — and what
          it becomes on <strong>appeal</strong>.
        </p>
      }
      updatedNote="Muluki Civil Procedure (Code) Act 2074, Sections 63, 69–70 · Updated September 2026"
      faq={FAQ}
      related={['property-tax-calculator', 'tax-penalty-calculator', 'gratuity-ssf-calculator', 'tds-calculator']}
      cta={{
        title: 'Drafting a plaint?',
        body: 'Mero Dafa searches the Muluki Civil Code, Civil Procedure Code and Supreme Court precedents — answering with the exact section and the original Gazette page beside it.',
      }}
      article={
        <>
          <H2>Court fee slabs (Section 69)</H2>
          <Table
            head={['Part of the claim', 'Court fee']}
            rows={[
              ['First Rs 25,000', 'Rs 500 flat'],
              ['Rs 25,001 – 50,000', '5%'],
              ['Rs 50,001 – 1,00,000', '3.5%'],
              ['Rs 1,00,001 – 5,00,000', '2%'],
              ['Rs 5,00,001 – 25,00,000', '1.5%'],
              ['Above Rs 25,00,000', '1%'],
            ]}
          />
          <Note>Non-monetary suits: Rs 500 flat (Section 70). Appeals: plaint fee + 15%.</Note>

          <H2>Court fee for common claim amounts</H2>
          <Table
            head={['Claim value', 'Plaint fee', 'On appeal']}
            rows={SAMPLE_CLAIMS.map((c) => {
              const plaint = computeCourtFee(c, 'monetary', 'plaint').total
              const appeal = computeCourtFee(c, 'monetary', 'appeal').total
              return [npr(c), <strong key="p">{npr(plaint)}</strong>, npr(appeal)]
            })}
          />

          <H2>Worked example</H2>
          <Example
            title={<>A money-recovery suit for <strong>Rs 10,00,000</strong>.</>}
            lines={[
              'First 25,000 → Rs 500',
              '25,001–50,000 @ 5% → Rs 1,250',
              '50,001–1,00,000 @ 3.5% → Rs 1,750',
              '1,00,001–5,00,000 @ 2% → Rs 8,000',
              '5,00,001–10,00,000 @ 1.5% → Rs 7,500',
            ]}
            total="Court fee Rs 19,000 · on appeal Rs 21,850"
          />

          <H2>Points to remember</H2>
          <UL>
            <li><strong>Value the claim carefully</strong> — the fee follows the amount you claim, including property value.</li>
            <li><strong>Counter-claims pay too</strong> — the defendant pays court fee on the value of a counter-claim.</li>
            <li><strong>Apply for a waiver</strong> if the party genuinely cannot pay; the court can exempt fully or partly.</li>
          </UL>
          <P>
            Court fee is only one cost of litigation — lawyer fees, notices and
            certified copies are extra.
          </P>
        </>
      }
    >
      <CourtFeeCalculator />
    </ToolPageShell>
  )
}
