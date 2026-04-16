'use client'
import { useState } from 'react'
import Link from 'next/link'
import { submitWaitlist } from '@/lib/api'
import { cn } from '@/lib/utils'

const PRODUCT_LINKS = [
  { label: 'Features', href: '/#features' },
  { label: 'How it Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Blog', href: '/blog' },
]

const COMPANY_LINKS = [
  { label: 'Team', href: '/team' },
  { label: 'Contact', href: 'mailto:support@merodafa.com' },
]

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      await submitWaitlist({ email, source: 'newsletter' })
    } catch { /* show success anyway */ }
    setStatus('success')
    setEmail('')
  }

  return status === 'success' ? (
    <p className="text-sm font-medium flex items-center gap-2" style={{ color: '#2DD4BF' }}>
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      You&apos;re subscribed!
    </p>
  ) : (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full sm:w-auto">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className={cn(
          'flex-1 min-w-0 sm:w-56 rounded-xl bg-white/[0.06] border border-white/10 px-4 py-2.5 text-sm text-white',
          'placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400/40',
          'transition-all duration-200',
        )}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="flex-shrink-0 cursor-pointer rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 disabled:opacity-60"
        style={{ backgroundColor: '#09383e' }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0d4f57' }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#09383e' }}
      >
        Subscribe
      </button>
    </form>
  )
}

export function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(180deg, #0a0f1a 0%, #080c15 100%)' }}>
      {/* Main content */}
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Brand + newsletter */}
          <div className="lg:col-span-6">
            <Link href="/" className="inline-block mb-4">
              <span
                className="text-3xl font-bold tracking-tight"
                style={{ color: '#fff', fontFamily: 'var(--font-lora), Georgia, serif' }}
              >
                merodafa
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              AI-powered legal research for Nepal&apos;s finance professionals. Ask
              questions about any Act, Directive, or Gazette &mdash; get answers with exact sources.
            </p>

            {/* Newsletter inline */}
            <div>
              <h4 className="text-white text-sm font-semibold mb-3">Weekly Gazette Roundup</h4>
              <NewsletterForm />
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-6 grid grid-cols-3 gap-8">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">Product</h4>
              <ul className="space-y-3">
                {PRODUCT_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">Company</h4>
              <ul className="space-y-3">
                {COMPANY_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">Contact</h4>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:support@merodafa.com" className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
                    support@merodafa.com
                  </a>
                </li>
                <li>
                  <a href="tel:+9779823380132" className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
                    +977 9823380132
                  </a>
                </li>
                <li className="text-sm text-slate-500">Kathmandu, Nepal</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">&copy; {new Date().getFullYear()} Mero Dafa. Kathmandu, Nepal.</p>
          <p className="text-xs text-slate-600">Built for Nepal&apos;s legal &amp; finance professionals.</p>
        </div>
      </div>
    </footer>
  )
}
