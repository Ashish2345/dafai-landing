'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Team', href: '/team' },
]

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:5173'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 10) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setMobileOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="sticky top-0 z-50 px-4 sm:px-6 pt-4 pb-3">
      {/* Frosted backdrop — masks scrolling content behind the pill */}
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 transition-opacity duration-300',
          scrolled ? 'opacity-100' : 'opacity-0',
        )}
        style={{
          background:
            'linear-gradient(to bottom, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.85) 60%, rgba(255,255,255,0) 100%)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      />

      <div
        className={cn(
          'relative mx-auto max-w-[1280px] rounded-2xl border bg-white transition-shadow duration-300',
          scrolled ? 'shadow-lg shadow-slate-900/[0.08] border-slate-200' : 'border-slate-200',
        )}
      >
        <div className="flex h-14 sm:h-16 items-center justify-between gap-4 px-4 sm:px-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <span
              className="text-xl sm:text-2xl font-bold tracking-tight"
              style={{ color: '#09383e', fontFamily: 'var(--font-lora), Georgia, serif' }}
            >
              merodafa
            </span>
          </Link>

          {/* Desktop nav links — flat */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="px-3 py-2 text-[14px] font-medium text-slate-700 hover:text-[#09383e] rounded-lg transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right — single dark CTA that launches the app */}
          <div className="flex items-center gap-2">
            <Link
              href={APP_URL}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-200 hover:brightness-110"
              style={{
                background: 'linear-gradient(135deg, #09383e 0%, #0d4f57 100%)',
                boxShadow: '0 4px 12px rgba(9,56,62,0.25)',
              }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <span className="hidden sm:inline">Launch app</span>
              <span className="sm:hidden">Launch</span>
            </Link>

            {/* Mobile menu toggle — only on mobile */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-[#09383e] hover:bg-slate-100 transition-colors"
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu — floating card below pill */}
      <div
        className={cn(
          'lg:hidden mx-auto max-w-[1280px] overflow-hidden transition-all duration-300 mt-2',
          mobileOpen ? 'max-h-[480px]' : 'max-h-0',
        )}
      >
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <nav className="flex flex-col">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-[15px] font-medium text-slate-700 hover:text-[#09383e] rounded-lg transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
