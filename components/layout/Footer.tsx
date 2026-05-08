import Link from 'next/link'
import { NewsletterForm } from './NewsletterForm'

const PRODUCT_LINKS = [
  { label: 'Features', href: '/#features' },
  { label: 'How it Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
]

const TOOLS_LINKS = [
  { label: 'Salary Tax Calculator', href: '/tools/salary-tax-calculator' },
  { label: 'NEPSE CGT Calculator', href: '/tools/share-cgt-calculator' },
  { label: 'VAT Calculator (13%)', href: '/tools/vat-calculator' },
  { label: 'Bluebook Fine Calculator', href: '/tools/bluebook-fine-calculator' },
  { label: 'All free tools →', href: '/tools' },
]

const COMPANY_LINKS = [
  { label: 'Team', href: '/team' },
  { label: 'Blog', href: '/blog' },
]

const COL_HEADING = 'text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4'
const COL_LINK = 'text-sm text-slate-400 hover:text-white transition-colors duration-200'

export function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(180deg, #0a0f1a 0%, #080c15 100%)' }}>
      {/* Top section — brand + link columns */}
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">

          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-4">
              <span
                className="text-3xl font-bold tracking-tight text-white"
                style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
              >
                merodafa
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              AI-powered legal research for Nepal&apos;s finance professionals. Cited
              answers from any Act, Directive, or Gazette &mdash; in seconds.
            </p>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className={COL_HEADING}>Product</h4>
              <ul className="space-y-3">
                {PRODUCT_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={COL_LINK}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className={COL_HEADING}>Free Tools</h4>
              <ul className="space-y-3">
                {TOOLS_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={COL_LINK}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className={COL_HEADING}>Company</h4>
              <ul className="space-y-3">
                {COMPANY_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={COL_LINK}>{l.label}</Link>
                  </li>
                ))}
                <li>
                  <a href="mailto:support@merodafa.com" className={COL_LINK}>
                    support@merodafa.com
                  </a>
                </li>
                <li>
                  <a href="tel:+9779823380132" className={COL_LINK}>
                    +977 9823380132
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter band */}
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div className="max-w-md">
              <h4 className={COL_HEADING + ' mb-1.5'}>Weekly Gazette Roundup</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                A short email each Monday — what changed in Nepal&apos;s tax &amp; compliance world last week.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} Mero Dafa Pvt. Ltd. &middot; Kathmandu, Nepal
          </p>
          <p className="text-xs text-slate-600">
            Built by engineers, verified by CAs.
          </p>
        </div>
      </div>
    </footer>
  )
}
