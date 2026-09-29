import { GratuityCalculator } from './Calculator'
import { Example, H2, Note, P, Table, ToolPageShell, toolMetadata, UL } from '@/components/tools/ToolPageShell'

const DESCRIPTION =
  'Free Nepal gratuity, provident fund and SSF calculator — Labour Act 2074 gratuity (8.33%), PF 10% + 10%, SSF 11% + 20%, your retirement balance and the 5% tax on withdrawal.'

export const metadata = toolMetadata({
  slug: 'gratuity-ssf-calculator',
  seoTitle: 'Gratuity & SSF Calculator Nepal — PF, Labour Act 2074',
  description: DESCRIPTION,
  keywords: ['gratuity calculator Nepal', 'SSF calculator Nepal', 'provident fund calculator Nepal', 'Labour Act 2074 gratuity', 'उपदान गणना', 'सामाजिक सुरक्षा कोष योगदान'],
})

const FAQ = [
  {
    question: 'How is gratuity calculated in Nepal?',
    answer:
      'Under Section 53 of the Labour Act 2074, the employer sets aside 8.33% of your monthly basic salary as gratuity from your first day of work. Over a year that equals about one month’s basic salary, so gratuity ≈ monthly basic × years of service. It is deposited in a gratuity/retirement fund or, if your employer is enrolled, included in the SSF contribution.',
  },
  {
    question: 'What is the SSF contribution rate in Nepal?',
    answer:
      'The Social Security Fund contribution is 31% of basic salary: 11% deducted from the employee and 20% paid by the employer. It is split into old-age protection (28.33%), medical, health and maternity (1%), accident and disability (1.4%) and dependent family protection (0.27%). SSF replaces separate provident fund and gratuity contributions.',
  },
  {
    question: 'How much is the provident fund contribution?',
    answer:
      'Under Section 52 of the Labour Act 2074, the employee contributes 10% of basic salary and the employer adds another 10%, deposited monthly in the Employees Provident Fund or another approved fund. Together with the 8.33% gratuity, the non-SSF scheme puts 28.33% of basic into your retirement savings.',
  },
  {
    question: 'Do I get gratuity if I am in SSF?',
    answer:
      'Not separately. When your employer is enrolled in the Social Security Fund, the employer’s 20% SSF contribution covers gratuity, provident fund, medical, accident and pension benefits together.',
  },
  {
    question: 'Is gratuity or provident fund withdrawal taxable?',
    answer:
      'A lump-sum retirement payment from an approved retirement fund is taxed at 5% as a final withholding, after deducting the higher of 50% of the payment or Rs 5,00,000. So a Rs 6,00,000 withdrawal has Rs 5,00,000 tax-free and pays 5% on Rs 1,00,000 — Rs 5,000.',
  },
  {
    question: 'Are PF, SSF and CIT contributions tax-deductible?',
    answer:
      'Yes. Contributions to approved retirement funds (SSF, PF, CIT) are deductible up to the lowest of the actual contribution, one-third of assessable income, or Rs 5,00,000 a year. SSF contributors are also exempt from the 1% social security tax on the first slab. Use the salary tax calculator to see the effect on your monthly TDS.',
  },
]

export default function GratuityPage() {
  return (
    <ToolPageShell
      slug="gratuity-ssf-calculator"
      title="Gratuity, PF & SSF Calculator"
      titleAccent="Nepal"
      nepaliTitle="उपदान, सञ्चय कोष र सामाजिक सुरक्षा कोष (SSF) क्यालकुलेटर"
      description={DESCRIPTION}
      intro={
        <p>
          See what goes into your retirement fund every month under the
          Labour Act 2074 — <strong>gratuity</strong>, <strong>provident
          fund</strong> or <strong>SSF</strong> — how much builds up over your
          service, and what you take home after the 5% withdrawal tax.
        </p>
      }
      updatedNote="Labour Act 2074 · Contribution-based Social Security Act 2074 · Income Tax Act 2058 · Updated September 2026"
      faq={FAQ}
      related={['salary-tax-calculator', 'tds-calculator', 'tax-penalty-calculator', 'court-fee-calculator']}
      cta={{
        title: 'HR question the calculator can’t answer?',
        body: 'Mero Dafa answers from the Labour Act, Labour Rules, Social Security Act and SSF directives — with the exact section and the original Gazette page beside it.',
      }}
      article={
        <>
          <H2>Contribution rates at a glance</H2>
          <Table
            head={['Contribution', 'PF + gratuity scheme', 'SSF scheme']}
            rows={[
              ['Employee (from salary)', '10% PF', '11%'],
              ['Employer', '10% PF + 8.33% gratuity', '20%'],
              ['Total into your fund', <strong key="a">28.33%</strong>, <strong key="b">31%</strong>],
              ['Law', 'Labour Act 2074 s.52–53', 'Social Security Act 2074'],
            ]}
          />
          <Note>All percentages are of monthly basic salary. Dearness, transport and other allowances are not included.</Note>

          <H2>Worked example — Rs 40,000 basic, 5 years</H2>
          <Example
            title={<>PF + gratuity scheme, monthly basic <strong>Rs 40,000</strong>, 5 years of service.</>}
            lines={[
              'Employee PF 10% = Rs 4,000 / month',
              'Employer PF 10% = Rs 4,000 / month',
              'Gratuity 8.33% = Rs 3,332 / month',
              'Balance after 60 months = Rs 6,79,920',
              'Tax: 5% × (6,79,920 − 5,00,000) = Rs 8,996',
            ]}
            total="You receive about Rs 6,70,924"
          />
          <Example
            title={<>Same salary under <strong>SSF</strong>.</>}
            lines={['11% + 20% = Rs 12,400 / month', 'Balance after 60 months = Rs 7,44,000', 'Tax: 5% × (7,44,000 − 5,00,000) = Rs 12,200']}
            total="You receive about Rs 7,31,800"
          />

          <H2>Things employees often miss</H2>
          <UL>
            <li><strong>Gratuity starts on day one.</strong> Under the 2074 Act there is no minimum service before gratuity accrues.</li>
            <li><strong>It is on basic pay only.</strong> A high-allowance salary structure lowers your retirement contributions.</li>
            <li><strong>Contributions cut your tax.</strong> Up to Rs 5 lakh a year of PF/SSF/CIT is deductible.</li>
            <li><strong>Withdrawals are mostly tax-free.</strong> The first Rs 5 lakh or half the payment (whichever is more) is exempt.</li>
          </UL>
          <P>
            Balances here exclude interest unless you enter an expected return.
            Your fund statement is the final word on the actual balance.
          </P>
        </>
      }
    >
      <GratuityCalculator />
    </ToolPageShell>
  )
}
