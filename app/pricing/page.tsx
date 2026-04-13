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
    <main className="bg-white pb-16">
      {/* Reuse the Pricing section component */}
      <Pricing />

      {/* Feature comparison — wrapped in bordered card matching theme */}
      <section className="px-4 sm:px-6 pt-2 sm:pt-4 pb-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200 bg-white px-6 sm:px-10 py-12 sm:py-14">
            <div className="text-center mb-10">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-semibold mb-4 bg-white border"
                style={{ borderColor: 'rgba(9,56,62,0.15)', color: '#09383e' }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#09383e' }} />
                Full comparison
              </span>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900 mb-3">
                Everything, side by side.
              </h2>
              <p className="text-slate-600 text-base">
                Pick the plan that fits how your team works.
              </p>
            </div>

            {/* Scrollable wrapper for mobile */}
            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm mx-auto max-w-4xl">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead className="sticky top-0 z-10">
                  <tr style={{ backgroundColor: '#09383e' }} className="text-white">
                    <th
                      className="sticky left-0 z-20 text-left px-5 py-4 font-semibold text-sm w-48 min-w-[10rem]"
                      style={{ backgroundColor: '#09383e' }}
                    >
                      Feature
                    </th>
                    <th className="px-5 py-4 font-semibold text-center text-slate-300 w-36">
                      Starter
                    </th>
                    <th className="px-5 py-4 font-semibold text-center w-36">
                      <span className="inline-flex items-center gap-1.5">
                        Pro
                        <span
                          className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wider"
                          style={{ backgroundColor: '#5eead4', color: '#09383e' }}
                        >
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
                      <td
                        className={`sticky left-0 z-10 px-5 py-3.5 font-medium text-slate-900 border-r border-slate-100 ${
                          idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                        }`}
                      >
                        {row.feature}
                      </td>
                      <td className="px-5 py-3.5 text-center border-r border-slate-100">
                        <CellValue value={row.starter} />
                      </td>
                      <td
                        className="px-5 py-3.5 text-center border-r border-slate-100"
                        style={{ backgroundColor: 'rgba(9,56,62,0.03)' }}
                      >
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

            <p className="text-slate-500 text-xs text-center mt-5">
              All plans include SSL encryption and privacy-first data handling.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
