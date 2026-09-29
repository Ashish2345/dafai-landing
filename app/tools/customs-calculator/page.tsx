import type { Metadata } from 'next'
import Link from 'next/link'
import { CustomsCalculator } from './Calculator'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  breadcrumbListSchema,
  faqPageSchema,
  softwareToolSchema,
  SITE_URL,
} from '@/lib/seo/schema'
import { socialMeta } from '@/lib/seo/metadata'

const PAGE_URL = `${SITE_URL}/tools/customs-calculator`
// SEO title bypasses the layout-wide "%s — Mero Dafa" template via { absolute }
// so we control the full SERP string and stay under the 60-char pixel cutoff.
const SEO_TITLE = 'Nepal Customs Calculator — Gold (Tola), Mobile, TV'
const PAGE_TITLE = 'Nepal Customs Duty Calculator (Gold, Mobile, TV)'
const PAGE_DESCRIPTION =
  "Free Nepal customs duty calculator — gold in tola or grams, raw gold, mobile phones (iPhone & Samsung), and TVs. Personal-baggage rules for Tribhuvan Airport & land borders."

export const metadata: Metadata = {
  title: { absolute: SEO_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/tools/customs-calculator' },
  ...socialMeta({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: '/tools/customs-calculator',
  }),
}

const FAQ = [
  {
    question: 'How much gold can I bring to Nepal without paying customs duty?',
    answer:
      "Under the FY 2083/84 passenger-baggage rules, a woman can bring 50 grams (~4.3 tola) of gold jewelry duty-free and a man 25 grams (~2.1 tola). Either may bring up to 100 grams more by paying duty: 20% of value on the first 50 g over the free limit and 23% on the next 50 g. Gold beyond that (150 g for women, 125 g for men) is confiscated under the Customs Act 2082.",
  },
  {
    question: 'How does tola convert to grams for Nepal customs?',
    answer:
      "1 tola (तोला) equals exactly 11.6638 grams — the same as the Indian tola. Nepali jewelers price and weigh gold in tola, while Nepal Customs writes its limits in grams, so the conversion matters at the customs counter. The 50 g duty-free limit for women is about 4.3 tola, the 25 g limit for men about 2.1 tola, and the 100 g raw-gold limit about 8.6 tola. The calculator above accepts input in either unit.",
  },
  {
    question: 'How much customs duty for 5 tola of gold in Nepal?',
    answer:
      "5 tola is 58.32 g. For a woman, 8.32 g is over the 50 g free limit and is charged 20% of its value; at a customs value of Rs 2,50,000 per tola that is about Rs 35,700. For a man, 33.32 g is over the 25 g limit, so the duty is about Rs 1,42,800. Because duty is now a percentage of value, enter the current gold price in the calculator above for the exact figure.",
  },
  {
    question: 'How much customs duty for an iPhone in Nepal?',
    answer:
      "A used iPhone in active personal use is free. A new iPhone is taxable on a slab-based rate determined by its CIF value: an iPhone 15 around Rs 90,000 falls in the 35% band (~Rs 31,500 duty); an iPhone 15 Pro at Rs 1,50,000 falls in the 40%+ band (~Rs 60,000+ duty); an iPhone 16 Pro Max 1TB at Rs 2,30,000 incurs roughly Rs 92,000+ in customs duty. All phones (including the personal one in your pocket) must have their IMEI registered with NTA at the customs desk on arrival.",
  },
  {
    question: 'Are customs rules different at TIA, Bhairahawa, Pokhara, or land borders?',
    answer:
      "No. The personal-baggage allowances and rate tables are the same at every Nepal entry point — Tribhuvan International Airport (TIA), Gautam Buddha International Airport (Bhairahawa), Pokhara Regional International Airport, and land borders including Belahiya, Birgunj, Bhairahawa, Kakarbhitta, and Nepalgunj. Enforcement strictness varies (TIA is the strictest, with X-ray and routine sampling), but the limits and duty rates are identical.",
  },
  {
    question: 'Can a tourist bring raw gold (gold bars or biscuits) into Nepal?',
    answer:
      "A passenger may bring up to 100 g of raw gold (bars, biscuits, coins), but all of it is dutiable at 20% of value — there is no free portion. Anything above 100 g is confiscated. Foreign tourists should declare gold they intend to take back out; customs can hold excess ornaments in transit and return them on departure.",
  },
  {
    question: 'What is the customs duty on televisions brought to Nepal?',
    answer:
      'Since Finance Act 2083, a traveller who has lived abroad for at least 12 consecutive months may bring one TV up to 65 inches duty-free (up from 32 inches). Larger TVs, or TVs brought by travellers abroad for less than a year, are taxable — customs duty is computed on the CIF (Cost + Insurance + Freight) value from the purchase invoice, plus applicable excise and VAT. Always carry the original invoice; under-declared values are reassessed against the customs reference price.',
  },
  {
    question: 'Do I have to pay customs on a mobile phone in my pocket?',
    answer:
      'No. A used phone in active personal use is treated as personal baggage and is duty-free. A new phone in original packaging is taxable on a slab-based rate determined by the phone price (CIF value): roughly 15% for phones up to Rs 10,000, 18% from Rs 10,000 to 25,000, 25% from Rs 25,000 to 50,000, 35% from Rs 50,000 to Rs 1,00,000, and 40%+ for phones above Rs 1,00,000. Foreign workers returning to Nepal after 6+ months are allowed one extra new phone duty-free on top of their personal phone. All phones (including duty-free ones) must have their IMEI registered with NTA at the customs desk on arrival.',
  },
  {
    question: 'Is this customs calculator official?',
    answer:
      'No. This is a reference calculator built around the FY 2083/84 personal-baggage schedule (Finance Act 2083). Rates, reference prices, and item-specific concessions can be updated by the Department of Customs via circular. Always verify at the customs desk on arrival, and consult a Chartered Accountant or licensed customs agent for commercial imports.',
  },
  {
    question: 'What is Shram Swikriti?',
    answer:
      'Shram Swikriti (श्रम स्वीकृति) is the foreign-employment permit issued by the Department of Foreign Employment to Nepali workers going abroad. It is required to qualify for the additional duty-free mobile phone allowance for returning workers. Tourists and students do not hold Shram Swikriti and therefore cannot claim these allowances.',
  },
  {
    question: 'What other items have free personal-baggage allowances?',
    answer:
      'Beyond the items in this calculator (gold, raw gold, silver, TV and phone), Nepal Customs allows personal-baggage concessions on items like a laptop or tablet (1 unit, used), one camera per passenger, limited quantities of liquor and cigarettes, and personal medications with a prescription. Quantities and categories are revised periodically — confirm the current list at the customs desk or via the Department of Customs website before travel.',
  },
]

export default function CustomsCalculatorPage() {
  return (
    <main className="bg-white pb-16 pt-8">
      <JsonLd
        id="ld-customs-software"
        data={softwareToolSchema({
          name: PAGE_TITLE,
          url: PAGE_URL,
          description: PAGE_DESCRIPTION,
        })}
      />
      <JsonLd id="ld-customs-faq" data={faqPageSchema(FAQ)} />
      <JsonLd
        id="ld-customs-breadcrumb"
        data={breadcrumbListSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Tools', url: `${SITE_URL}/tools` },
          { name: 'Customs Calculator', url: PAGE_URL },
        ])}
      />

      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-[1100px]">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="text-sm text-slate-500 mb-6 flex items-center gap-1.5"
          >
            <Link href="/" className="hover:text-[#09383e] transition-colors">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link href="/tools" className="hover:text-[#09383e] transition-colors">
              Tools
            </Link>
            <span aria-hidden>/</span>
            <span className="text-slate-700">Customs Calculator</span>
          </nav>

          {/* Header */}
          <header className="mb-6 max-w-3xl">
            <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 leading-tight tracking-tight mb-1.5">
              Nepal Customs Duty Calculator{' '}
              <span className="text-slate-500 font-medium">— Personal Baggage</span>
            </h1>
            <p
              className="text-slate-500 text-sm mb-3"
              lang="ne"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              नेपाल भन्सार महसुल क्यालकुलेटर — सुन, मोबाइल, टिभी
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-3">
              Free Nepal customs duty calculator for arriving passengers — enter
              gold weight in <strong>tola</strong> or <strong>grams</strong>,
              phone price (iPhone, Samsung, Redmi), or TV size, and find out
              whether your item is duty-free, taxable, or not allowed under
              the personal-baggage rules. Works for Tribhuvan International
              Airport (TIA), Bhairahawa, Pokhara, and all land borders. Updated
              for the FY 2083/84 rules — 20% gold duty, gender-based gold
              allowance, 500 g silver and 65&quot; TVs.
            </p>
            <p className="text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Verified against Nepal Customs personal-baggage practice by
                Sabin Adhikari, CA · Last reviewed April 2026 · Rules updated for Finance Act 2083 (September 2026)
              </span>
            </p>
          </header>

          {/* Calculator card */}
          <section
            className="rounded-2xl sm:rounded-3xl border-0 sm:border border-slate-200 bg-white p-0 sm:p-6 lg:p-8 mb-10"
            aria-labelledby="customs-calculator-heading"
          >
            <h2 id="customs-calculator-heading" className="sr-only">
              Customs duty calculator
            </h2>
            <CustomsCalculator />
          </section>

          {/* Long-form explainer (collapsed by default) */}
          <details className="group max-w-3xl mx-auto rounded-xl border border-slate-200 bg-white">
            <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer list-none">
              <span className="flex items-center gap-2 text-sm font-medium text-slate-900">
                <svg
                  className="w-4 h-4 text-[#09383e]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Gold limits, mobile-phone rules, common mistakes & FAQ
              </span>
              <svg
                className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <article className="px-5 sm:px-8 py-6 border-t border-slate-100 prose prose-slate max-w-none">
              <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900 leading-tight mt-2 mb-5">
                How Nepal customs duty works on personal baggage
              </h2>
              <p className="text-slate-700 text-base leading-relaxed mb-5">
                Every passenger arriving in Nepal — whether at{' '}
                <strong>Tribhuvan International Airport (TIA)</strong>,
                Bhairahawa, Pokhara International, or a land border — is screened
                against the personal-baggage rules issued by the{' '}
                <a
                  href="https://www.customs.gov.np/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#09383e] underline-offset-2 hover:underline"
                >
                  Department of Customs
                </a>
                . Each item type has a duty-free allowance, a taxable range, and
                in some cases a hard ceiling above which the item is confiscated
                under the Customs Act 2082.
              </p>
              <p className="text-slate-700 text-base leading-relaxed mb-5">
                This calculator covers the items most travellers ask about —
                gold jewelry, raw gold, silver jewelry, televisions, and mobile
                phones. For
                everything else (laptops, cameras, liquor, cigarettes, gifts),
                ask the customs officer or carry the receipt.
              </p>

              <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
                Gold jewelry — 50 g for women, 25 g for men
              </h2>
              <p className="text-slate-700 text-base leading-relaxed mb-3">
                Nepali jewelers price gold in <strong>tola</strong> (तोला);
                customs writes its limits in grams (<strong>1 tola = 11.6638
                g</strong>). Under the FY 2083/84 baggage rules a woman may bring{' '}
                <strong>50 g (~4.3 tola)</strong> of gold jewelry duty-free and a
                man <strong>25 g (~2.1 tola)</strong>. Either may bring up to{' '}
                <strong>100 g more</strong> by paying duty. Finance Act 2083
                doubled the gold tariff from 10% to <strong>20%</strong>: the
                first 50 g over the free limit is charged 20% of its value and
                the next 50 g 23% (20% + 3% additional duty). Anything beyond
                that is confiscated.
              </p>
              <div className="overflow-x-auto rounded-lg border border-slate-200 mb-5">
                <table className="w-full min-w-[560px] text-sm">
                  <thead className="bg-slate-50 text-slate-900">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold">Passenger</th>
                      <th className="text-left px-4 py-3 font-semibold">Duty-free</th>
                      <th className="text-left px-4 py-3 font-semibold">With duty</th>
                      <th className="text-left px-4 py-3 font-semibold">Confiscated above</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    <tr className="border-t border-slate-200">
                      <td className="px-4 py-3">Woman</td>
                      <td className="px-4 py-3">50 g (~4.3 tola)</td>
                      <td className="px-4 py-3">Next 50 g @ 20% + next 50 g @ 23%</td>
                      <td className="px-4 py-3">150 g (~12.9 tola)</td>
                    </tr>
                    <tr className="border-t border-slate-200 bg-slate-50/40">
                      <td className="px-4 py-3">Man</td>
                      <td className="px-4 py-3">25 g (~2.1 tola)</td>
                      <td className="px-4 py-3">Next 50 g @ 20% + next 50 g @ 23%</td>
                      <td className="px-4 py-3">125 g (~10.7 tola)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
                Raw gold, silver and TVs
              </h2>
              <ul className="space-y-2 text-slate-700 mb-5 list-disc pl-5">
                <li>
                  <strong>Raw gold</strong> (bars, biscuits, coins) — up to{' '}
                  <strong>100 g (~8.6 tola)</strong> per passenger, all of it
                  dutiable at 20% of value; there is no free portion. Bullion
                  bent into bangles or rings is still treated as raw gold.
                </li>
                <li>
                  <strong>Silver jewelry</strong> — up to{' '}
                  <strong>500 g</strong> duty-free, and a further 500 g on
                  payment of duty (Finance Act 2083).
                </li>
                <li>
                  <strong>Television</strong> — one TV up to{' '}
                  <strong>65 inches</strong> is duty-free for a traveller who
                  has lived abroad for 12 consecutive months or more (raised
                  from 32&quot;). Larger sets, or travellers abroad for less
                  than a year, pay duty on the invoice (CIF) value.
                </li>
              </ul>

              <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
                Mobile phone — used vs new, slab-based duty
              </h2>
              <ul className="space-y-2 text-slate-700 mb-5 list-disc pl-5">
                <li>
                  <strong>Used phone in active use</strong> — always free,
                  whether you&apos;re a tourist, student, worker, or returning
                  Nepali. Counts as personal baggage.
                </li>
                <li>
                  <strong>New phone + returning worker (≥6 months)</strong> —
                  one extra new phone is allowed duty-free for foreign workers
                  returning to Nepal after at least 6 months on Shram Swikriti.
                </li>
                <li>
                  <strong>New phone + tourist / student / short-trip Nepali</strong>{' '}
                  — taxable. The composite rate (customs duty + excise + VAT)
                  is slab-based on the phone&apos;s CIF (Cost + Insurance +
                  Freight) value, not flat. Premium phones get hit much harder
                  than entry-level ones.
                </li>
              </ul>

              <p className="text-slate-700 text-base leading-relaxed mb-3">
                Approximate composite rates by phone price (slabs are revised
                annually by the Department of Customs — verify at the customs
                desk before paying):
              </p>
              <div className="overflow-x-auto rounded-lg border border-slate-200 mb-5">
                <table className="w-full min-w-[480px] text-sm">
                  <thead className="bg-slate-50 text-slate-900">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold">Phone price (CIF, NPR)</th>
                      <th className="text-left px-4 py-3 font-semibold">Composite rate</th>
                      <th className="text-left px-4 py-3 font-semibold">Duty on Rs 50,000 phone</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    <tr className="border-t border-slate-200">
                      <td className="px-4 py-3">≤ Rs 10,000</td>
                      <td className="px-4 py-3 font-semibold">~15%</td>
                      <td className="px-4 py-3 text-slate-400">—</td>
                    </tr>
                    <tr className="border-t border-slate-200 bg-slate-50/40">
                      <td className="px-4 py-3">Rs 10,001 – 25,000</td>
                      <td className="px-4 py-3 font-semibold">~18%</td>
                      <td className="px-4 py-3 text-slate-400">—</td>
                    </tr>
                    <tr className="border-t border-slate-200">
                      <td className="px-4 py-3">Rs 25,001 – 50,000</td>
                      <td className="px-4 py-3 font-semibold">~25%</td>
                      <td className="px-4 py-3">Rs 12,500</td>
                    </tr>
                    <tr className="border-t border-slate-200 bg-slate-50/40">
                      <td className="px-4 py-3">Rs 50,001 – 1,00,000</td>
                      <td className="px-4 py-3 font-semibold">~35%</td>
                      <td className="px-4 py-3 text-slate-400">—</td>
                    </tr>
                    <tr className="border-t border-slate-200">
                      <td className="px-4 py-3">Above Rs 1,00,000</td>
                      <td className="px-4 py-3 font-semibold">~40%+</td>
                      <td className="px-4 py-3 text-slate-400">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-amber-700 mb-5">
                ⚠ All phones — even duty-free ones — must have their IMEI
                registered with NTA at the customs desk on arrival. Unregistered
                phones get their SIM blocked on Nepali networks after the
                visitor window (typically 90 days).
              </p>

              <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
                Worked examples — how much customs duty for X tola of gold?
              </h2>
              <p className="text-slate-700 text-base leading-relaxed mb-3">
                Duty is now a percentage of the gold&apos;s value, so the rupee
                figure moves with the gold price. The table assumes a customs
                value of <strong>Rs 2,50,000 per tola</strong> — enter today&apos;s
                price in the calculator for your exact figure.
              </p>
              <div className="overflow-x-auto rounded-lg border border-slate-200 mb-5">
                <table className="w-full min-w-[560px] text-sm">
                  <thead className="bg-slate-50 text-slate-900">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold">Gold jewelry</th>
                      <th className="text-left px-4 py-3 font-semibold">In grams</th>
                      <th className="text-left px-4 py-3 font-semibold">Duty — woman</th>
                      <th className="text-left px-4 py-3 font-semibold">Duty — man</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    <tr className="border-t border-slate-200">
                      <td className="px-4 py-3 font-semibold">1 tola</td>
                      <td className="px-4 py-3">11.66 g</td>
                      <td className="px-4 py-3">Free</td>
                      <td className="px-4 py-3">Free</td>
                    </tr>
                    <tr className="border-t border-slate-200 bg-slate-50/40">
                      <td className="px-4 py-3 font-semibold">2 tola</td>
                      <td className="px-4 py-3">23.33 g</td>
                      <td className="px-4 py-3">Free</td>
                      <td className="px-4 py-3">Free</td>
                    </tr>
                    <tr className="border-t border-slate-200">
                      <td className="px-4 py-3 font-semibold">3 tola</td>
                      <td className="px-4 py-3">34.99 g</td>
                      <td className="px-4 py-3">Free</td>
                      <td className="px-4 py-3">~Rs 42,831</td>
                    </tr>
                    <tr className="border-t border-slate-200 bg-slate-50/40">
                      <td className="px-4 py-3 font-semibold">4 tola</td>
                      <td className="px-4 py-3">46.66 g</td>
                      <td className="px-4 py-3">Free</td>
                      <td className="px-4 py-3">~Rs 92,831</td>
                    </tr>
                    <tr className="border-t border-slate-200">
                      <td className="px-4 py-3 font-semibold">5 tola</td>
                      <td className="px-4 py-3">58.32 g</td>
                      <td className="px-4 py-3">~Rs 35,662</td>
                      <td className="px-4 py-3">~Rs 1,42,831</td>
                    </tr>
                    <tr className="border-t border-slate-200 bg-slate-50/40">
                      <td className="px-4 py-3 font-semibold">8 tola</td>
                      <td className="px-4 py-3">93.31 g</td>
                      <td className="px-4 py-3">~Rs 1,85,662</td>
                      <td className="px-4 py-3">~Rs 3,04,605</td>
                    </tr>
                    <tr className="border-t border-slate-200">
                      <td className="px-4 py-3 font-semibold">10 tola</td>
                      <td className="px-4 py-3">116.64 g</td>
                      <td className="px-4 py-3">~Rs 2,96,360</td>
                      <td className="px-4 py-3">~Rs 4,19,605</td>
                    </tr>
                    <tr className="border-t border-slate-200 bg-slate-50/40">
                      <td className="px-4 py-3 font-semibold">12 tola</td>
                      <td className="px-4 py-3">139.97 g</td>
                      <td className="px-4 py-3">~Rs 4,11,360</td>
                      <td className="px-4 py-3">Not allowed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-500 mb-5">
                At 20% on the first 50 g over the free limit and 23% on the next
                50 g. Customs values gold at the international price converted
                at the NRB rate, which is usually a little below the Kathmandu
                retail price.
              </p>

              <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
                Premium phone customs duty — iPhone &amp; Samsung examples
              </h2>
              <p className="text-slate-700 text-base leading-relaxed mb-3">
                For the new-phone duty bands, here&apos;s what real handsets
                typically cost at customs in Nepal (CIF / invoice value drives
                the slab — exchange rate is approximate):
              </p>
              <div className="overflow-x-auto rounded-lg border border-slate-200 mb-5">
                <table className="w-full min-w-[600px] text-sm">
                  <thead className="bg-slate-50 text-slate-900">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold">Phone (example)</th>
                      <th className="text-left px-4 py-3 font-semibold">Approx CIF (NPR)</th>
                      <th className="text-left px-4 py-3 font-semibold">Band</th>
                      <th className="text-left px-4 py-3 font-semibold">Duty</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    <tr className="border-t border-slate-200">
                      <td className="px-4 py-3">Entry Android (Redmi A-series)</td>
                      <td className="px-4 py-3">~Rs 9,000</td>
                      <td className="px-4 py-3">15%</td>
                      <td className="px-4 py-3 font-mono">~Rs 1,350</td>
                    </tr>
                    <tr className="border-t border-slate-200 bg-slate-50/40">
                      <td className="px-4 py-3">Mid-range Android (Redmi Note)</td>
                      <td className="px-4 py-3">~Rs 22,000</td>
                      <td className="px-4 py-3">18%</td>
                      <td className="px-4 py-3 font-mono">~Rs 3,960</td>
                    </tr>
                    <tr className="border-t border-slate-200">
                      <td className="px-4 py-3">Mid-flagship (Samsung A55, OnePlus Nord)</td>
                      <td className="px-4 py-3">~Rs 45,000</td>
                      <td className="px-4 py-3">25%</td>
                      <td className="px-4 py-3 font-mono">~Rs 11,250</td>
                    </tr>
                    <tr className="border-t border-slate-200 bg-slate-50/40">
                      <td className="px-4 py-3">iPhone 15 / Samsung S24</td>
                      <td className="px-4 py-3">~Rs 90,000</td>
                      <td className="px-4 py-3">35%</td>
                      <td className="px-4 py-3 font-mono">~Rs 31,500</td>
                    </tr>
                    <tr className="border-t border-slate-200">
                      <td className="px-4 py-3">iPhone 15 Pro / 16 Pro Max</td>
                      <td className="px-4 py-3">~Rs 1,50,000</td>
                      <td className="px-4 py-3">40%+</td>
                      <td className="px-4 py-3 font-mono">~Rs 60,000+</td>
                    </tr>
                    <tr className="border-t border-slate-200 bg-slate-50/40">
                      <td className="px-4 py-3">iPhone 16 Pro Max 1TB</td>
                      <td className="px-4 py-3">~Rs 2,30,000</td>
                      <td className="px-4 py-3">40%+</td>
                      <td className="px-4 py-3 font-mono">~Rs 92,000+</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-500 mb-5">
                Phone prices and slab rates revised annually by the Department
                of Customs. Premium phones at the upper end can incur effective
                rates above 40% once excise on luxury electronics is layered on
                top of customs duty + VAT.
              </p>

              <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
                Where Nepal customs is enforced — TIA, Bhairahawa, Pokhara &amp; land borders
              </h2>
              <p className="text-slate-700 text-base leading-relaxed mb-5">
                The same personal-baggage rules apply at every Nepal entry
                point — <strong>Tribhuvan International Airport (TIA)</strong>{' '}
                in Kathmandu, <strong>Gautam Buddha International Airport</strong>{' '}
                (Bhairahawa), <strong>Pokhara Regional International Airport</strong>,
                and major land borders including <strong>Belahiya</strong>,{' '}
                <strong>Birgunj</strong>, <strong>Bhairahawa</strong>,{' '}
                <strong>Kakarbhitta</strong>, and <strong>Nepalgunj</strong>.
                Enforcement intensity varies — TIA has the strictest screening,
                including X-ray and routine sampling — but the rate tables and
                ceilings are identical at every port. Plan as if you&apos;re
                arriving at TIA and you&apos;ll never be surprised.
              </p>

              <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
                Common mistakes passengers make at Nepal customs
              </h2>
              <ul className="space-y-2 text-slate-700 mb-5 list-disc pl-5">
                <li>
                  <strong>Assuming the free limit is the same for everyone.</strong>{' '}
                  Women get 50 g duty-free, men only 25 g. Above that you owe
                  20–23% of the gold&apos;s value, and beyond another 100 g it
                  is seized.
                </li>
                <li>
                  <strong>Thinking raw gold has a free allowance.</strong> Bars,
                  biscuits and coins are dutiable from the first gram and capped
                  at 100 g. Bullion reshaped into bangles is still raw gold.
                </li>
                <li>
                  <strong>Forgetting to register the new phone IMEI.</strong>{' '}
                  Even duty-free phones must be registered with the customs
                  desk on arrival — otherwise the IMEI gets blocked on Nepali
                  networks after the temporary visitor window.
                </li>
                <li>
                  <strong>Carrying gold jewelry as a gift.</strong> The free
                  limit is per passenger, not per recipient. Distributing
                  jewelry across travellers does not unlock additional
                  allowance — each passenger owns what they declare.
                </li>
              </ul>

              <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
                Who should use this Nepal customs calculator?
              </h2>
              <ul className="space-y-2 text-slate-700 mb-5 list-disc pl-5">
                <li>
                  <strong>Travellers arriving in Nepal</strong> — check duty
                  liability before you fly, so you can budget cash or rethink
                  what to bring
                </li>
                <li>
                  <strong>Returning Nepali workers (Shram Swikriti)</strong> —
                  confirm your gold and phone allowances before remitting
                </li>
                <li>
                  <strong>NRNs &amp; diaspora visiting Nepal</strong> — verify
                  the personal-baggage allowances on jewelry, phones, and
                  electronics
                </li>
                <li>
                  <strong>Customs agents &amp; travel advisors</strong> — quick
                  client briefing on personal-baggage rules. For tax, also see
                  our{' '}
                  <Link
                    href="/tools/salary-tax-calculator"
                    className="text-[#09383e] underline-offset-2 hover:underline"
                  >
                    Nepal salary tax calculator
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="/tools/share-cgt-calculator"
                    className="text-[#09383e] underline-offset-2 hover:underline"
                  >
                    NEPSE CGT calculator
                  </Link>
                </li>
              </ul>

              <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
                FAQ
              </h2>
              <div className="space-y-5">
                {FAQ.map((it) => (
                  <div key={it.question}>
                    <h3 className="font-display font-semibold text-base text-slate-900 mb-1.5">
                      {it.question}
                    </h3>
                    <p className="text-slate-700 text-[15px] leading-relaxed">
                      {it.answer}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </details>

          {/* Cross-link CTA */}
          <aside
            className="mt-16 rounded-2xl px-8 py-10 flex flex-col items-center text-center gap-3 max-w-3xl mx-auto"
            style={{ background: 'linear-gradient(135deg, #09383e 0%, #0d4f57 100%)' }}
          >
            <h2 className="font-display font-bold text-2xl text-white max-w-md">
              Need the full Customs Act, not just the math?
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed max-w-md">
              Mero Dafa indexes the Customs Act 2064, every Finance Act amendment
              to tariff and excise rates, and Department of Customs circulars —
              with the exact section reference and the original Gazette page
              beside every answer.
            </p>
            <Link
              href="/pricing"
              className="mt-3 inline-flex items-center justify-center rounded-full bg-white font-semibold px-6 py-3 text-sm transition-all duration-200 hover:brightness-95 cursor-pointer"
              style={{ color: '#09383e' }}
            >
              Try Mero Dafa free →
            </Link>
          </aside>
        </div>
      </section>
    </main>
  )
}
