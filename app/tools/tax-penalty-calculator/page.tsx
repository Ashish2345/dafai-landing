import { TaxPenaltyCalculator } from './Calculator'
import { Example, H2, Note, P, Table, ToolPageShell, toolMetadata, UL } from '@/components/tools/ToolPageShell'

const DESCRIPTION =
  'Free IRD late tax return fine and interest calculator for Nepal — Section 117 late-filing fee (0.1% of gross income or Rs 100/month), 15% interest on unpaid tax (Section 119), and fees for missed estimated and TDS returns.'

export const metadata = toolMetadata({
  slug: 'tax-penalty-calculator',
  seoTitle: 'IRD Late Tax Return Fine & Interest Calculator Nepal',
  description: DESCRIPTION,
  keywords: ['income tax fine calculator Nepal', 'IRD penalty late filing', 'late tax return fee Nepal', 'interest on unpaid tax Nepal section 119', 'कर विलम्ब शुल्क', 'आयकर जरिवाना'],
})

const FAQ = [
  {
    question: 'What is the penalty for filing an income tax return late in Nepal?',
    answer:
      'Under Section 117 of the Income Tax Act 2058, a presumptive (small) taxpayer pays Rs 100 for each month of delay if the return is less than a year late, or Rs 1,200 per return after that. Other taxpayers pay the higher of 0.1% a year of gross assessable income (income before deducting expenses) and that same Rs 100-per-month / Rs 1,200 amount.',
  },
  {
    question: 'How much interest does the IRD charge on unpaid tax?',
    answer:
      'Section 119 charges interest at the normal interest rate — 15% per annum under Section 2 — on tax not paid by its due date. Each month or part of a month counts as a full month, so tax paid one day late is charged one month of interest.',
  },
  {
    question: 'When is the income tax return due in Nepal?',
    answer:
      'The annual return is due within three months of the end of the fiscal year — by Asoj end (around mid-October). For FY 2082/83 that is Asoj end 2083, about 17 October 2026. You can apply for up to three months’ extension for filing, but tax paid after Asoj end still attracts interest.',
  },
  {
    question: 'What is the fee for not filing the estimated income return?',
    answer:
      'Taxpayers who must pay advance tax in instalments must file an estimated income return by Poush end. Missing it attracts a fee of the higher of Rs 5,000 or 0.01% of assessable income.',
  },
  {
    question: 'What is the fine for filing a TDS return late?',
    answer:
      'Not filing the monthly TDS return under Section 90 attracts a fee of 2.5% per annum of the TDS that should have been reported, in addition to 15% per annum interest on any TDS deposited late.',
  },
  {
    question: 'Can IRD fines and interest be waived?',
    answer:
      'Ordinary interest is not waived. Budgets sometimes announce one-off settlement schemes — Finance Act 2083, for example, lets taxpayers with disputed assessments withdraw the case and pay the tax plus 1% to have fees, interest and penalties waived within a set deadline. Check the current scheme with a CA before relying on it.',
  },
]

export default function TaxPenaltyPage() {
  return (
    <ToolPageShell
      slug="tax-penalty-calculator"
      title="Late Tax Return Fine"
      titleAccent="& Interest Calculator"
      nepaliTitle="आयकर विवरण ढिला बुझाउँदा लाग्ने शुल्क र ब्याज क्यालकुलेटर"
      description={DESCRIPTION}
      intro={
        <p>
          Missed the Asoj deadline? Enter your due date, the date you file and
          any unpaid tax to see the <strong>Section 117 late fee</strong> and
          the <strong>15% interest</strong> the Inland Revenue Department will
          add — plus fees for a missed estimated return or late TDS return.
        </p>
      }
      updatedNote="Income Tax Act 2058, Sections 2, 117–119 · Updated September 2026"
      faq={FAQ}
      related={['salary-tax-calculator', 'tds-calculator', 'vat-calculator', 'court-fee-calculator']}
      cta={{
        title: 'Facing an IRD notice?',
        body: 'Mero Dafa answers from the Income Tax Act, Tax Rules and IRD circulars — including every settlement scheme — with the exact section and the original Gazette page beside it.',
      }}
      article={
        <>
          <H2>Fees and interest at a glance</H2>
          <Table
            head={['Failure', 'Fee or interest', 'Section']}
            rows={[
              ['Late annual return — small / presumptive taxpayer', 'Rs 100 per month (under 1 year) or Rs 1,200 per return', '117'],
              ['Late annual return — others', 'Higher of 0.1% p.a. of gross assessable income or the amount above', '117'],
              ['Estimated income return not filed', 'Higher of Rs 5,000 or 0.01% of assessable income', '117'],
              ['TDS return not filed', '2.5% p.a. of the TDS amount', '117'],
              ['Tax not paid by the due date', <strong key="i">15% p.a. interest</strong>, '119'],
              ['Advance tax instalments underestimated', '15% p.a. on the shortfall', '118'],
            ]}
          />
          <Note>Part of a month counts as a full month for interest. Gross assessable income means income before deducting any expenses.</Note>

          <H2>Worked example</H2>
          <Example
            title={<>A business with gross income of <strong>Rs 80,00,000</strong> files 5 months late with <strong>Rs 2,00,000</strong> of tax unpaid.</>}
            lines={[
              'Late fee: higher of 0.1% × 80,00,000 = Rs 8,000 or Rs 100 × 5 = Rs 500 → Rs 8,000',
              'Interest: 2,00,000 × 15% × 5/12 = Rs 12,500',
            ]}
            total="Total added by IRD: Rs 20,500"
          />

          <H2>How to keep the cost down</H2>
          <UL>
            <li><strong>Pay before you file.</strong> Interest runs on unpaid tax from the due date, even if you have an extension to file.</li>
            <li><strong>Every started month counts.</strong> Paying on the 1st of a month instead of the 30th of the previous one adds a full month of interest.</li>
            <li><strong>File even if you cannot pay.</strong> The late-filing fee and interest are separate — filing stops one of them growing.</li>
            <li><strong>Watch for budget settlement schemes</strong> that waive interest and fees for a limited window.</li>
          </UL>
          <P>
            This calculator estimates statutory fees and interest. The IRD may
            separately impose penalties for false or misleading statements or
            for tax evasion.
          </P>
        </>
      }
    >
      <TaxPenaltyCalculator />
    </ToolPageShell>
  )
}
