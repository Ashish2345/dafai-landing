'use client'
import { useState } from 'react'
import Link from 'next/link'
import { submitWaitlist } from '@/lib/api'
import { cn } from '@/lib/utils'

const PRODUCT_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it Works', href: '/how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Blog', href: '/blog' },
]

const COMPANY_LINKS = [
  { label: 'About', href: '/team' },
  { label: 'Careers', href: '/team' },
  { label: 'Contact', href: 'mailto:support@dafa.ai' },
]

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
]

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: '#',
    icon: (
      <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.261 5.636 5.903-5.636zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
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
      <div className="mx-auto max-w-[1620px] px-5 sm:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand + newsletter — takes more space */}
          <div className="lg:col-span-5">
            {/* Logo wordmark */}
            <Link href="/" className="inline-block mb-5">
              <span
                className="text-3xl font-bold tracking-tight"
                style={{ color: '#fff', fontFamily: 'var(--font-lora), Georgia, serif' }}
              >
                merodafa
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              Nepal&apos;s first AI-powered legal intelligence platform. Ask questions
              about any Act, Directive, or Gazette — get cited answers instantly.
            </p>

            {/* Newsletter inline */}
            <div className="mb-8">
              <h4 className="text-white text-sm font-semibold mb-3">Weekly Gazette Roundup</h4>
              <NewsletterForm />
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 hover:border-white/15 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Product */}
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

            {/* Company */}
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

            {/* Legal */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">Legal</h4>
              <ul className="space-y-3">
                {LEGAL_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1620px] px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">© 2026 Mero Dafa Pvt. Ltd. All rights reserved.</p>
          <p className="text-xs text-slate-600">Kathmandu, Nepal</p>
        </div>
      </div>
    </footer>
  )
}
