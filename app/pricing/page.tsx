import { Pricing } from '@/components/sections/Pricing'

const tableRows: {
  feature: string
  starter: string | boolean
  pro: string | boolean
  enterprise: string | boolean
}[] = [
  {
    feature: 'Unlimited Search',
    starter: true,
    pro: true,
    enterprise: true,
  },
  {
    feature: 'Gazette Archive',
    starter: 'Last 2 years',
    pro: 'Full (2015–2081)',
    enterprise: 'Full + Custom',
  },
  {
    feature: 'RAG Chat',
    starter: 'Standard',
    pro: 'Priority',
    enterprise: 'Custom Logic',
  },
  {
    feature: 'PDF Downloads',
    starter: '5/day',
    pro: 'Unlimited',
    enterprise: 'Unlimited',
  },
  {
    feature: 'Table Extraction',
    starter: 'Basic',
    pro: 'Priority Docsumo',
    enterprise: 'Custom Pipeline',
  },
  {
    feature: 'Team Collaboration',
    starter: false,
    pro: true,
    enterprise: true,
  },
  {
    feature: 'API Access',
    starter: false,
    pro: false,
    enterprise: true,
  },
  {
    feature: 'Dedicated Account Manager',
    starter: false,
    pro: false,
    enterprise: true,
  },
  {
    feature: 'On-Prem / Private Cloud',
    starter: false,
    pro: false,
    enterprise: true,
  },
  {
    feature: 'Custom Legal Logic',
    starter: false,
    pro: false,
    enterprise: true,
  },
  {
    feature: 'Support',
    starter: 'Email',
    pro: 'Priority Email',
    enterprise: 'Dedicated',
  },
]

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-emerald mx-auto"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function DashIcon() {
  return (
    <svg
      className="w-5 h-5 text-slate-300 mx-auto"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
    </svg>
  )
}

function CellValue({ value }: { value: string | boolean }) {
  if (value === true) return <CheckIcon />
  if (value === false) return <DashIcon />
  return <span className="text-sm text-slate-600">{value}</span>
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white pt-16">
      {/* Reuse the Pricing section component */}
      <Pricing />

      {/* Feature comparison table */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-midnight mb-3">
              Full Feature Comparison
            </h2>
            <p className="text-slate-500 text-base">
              Everything you need to pick the right plan.
            </p>
          </div>

          {/* Scrollable wrapper for mobile */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              {/* Sticky header */}
              <thead className="sticky top-0 z-10">
                <tr className="bg-midnight text-white">
                  <th className="sticky left-0 bg-midnight z-20 text-left px-5 py-4 font-semibold text-sm w-48 min-w-[10rem]">
                    Feature
                  </th>
                  <th className="px-5 py-4 font-semibold text-center text-slate-300 w-36">
                    Starter
                  </th>
                  <th className="px-5 py-4 font-semibold text-center w-36">
                    <span className="inline-flex items-center gap-1.5">
                      Pro
                      <span className="text-[10px] bg-electric px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                        Popular
                      </span>
                    </span>
                  </th>
                  <th className="px-5 py-4 font-semibold text-center text-slate-300 w-36">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, idx) => (
                  <tr
                    key={row.feature}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                  >
                    {/* Sticky first column */}
                    <td
                      className={`
                        sticky left-0 z-10 px-5 py-3.5 font-medium text-midnight border-r border-slate-100
                        ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                      `}
                    >
                      {row.feature}
                    </td>
                    <td className="px-5 py-3.5 text-center border-r border-slate-100">
                      <CellValue value={row.starter} />
                    </td>
                    <td className="px-5 py-3.5 text-center border-r border-slate-100 bg-electric/[0.03]">
                      <CellValue value={row.pro} />
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <CellValue value={row.enterprise} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-slate-400 text-xs text-center mt-5">
            All plans include SSL encryption and GDPR-compliant data handling.
          </p>
        </div>
      </section>
    </main>
  )
}
