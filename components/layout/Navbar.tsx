'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { WaitlistModal } from '@/components/ui/WaitlistModal'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 10) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setDrawerOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full bg-white transition-shadow duration-300',
          scrolled ? 'shadow-md shadow-slate-900/5' : '',
        )}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex h-20 items-center justify-between">
            {/* Left — Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <span className="text-2xl font-bold tracking-tight" style={{ color: '#09383e', fontFamily: 'var(--font-lora), Georgia, serif' }}>
                merodafa
              </span>
            </Link>

            {/* Right — Nav + Buttons (desktop) */}
            <div className="hidden lg:flex items-center gap-2">
              <NavDropdown label="Product" items={[
                { label: 'Features', href: '#features' },
                { label: 'How it Works', href: '/how-it-works' },
                { label: 'Workspace', href: '#workspace' },
              ]} />

              <NavDropdown label="Resources" items={[
                { label: 'Blog', href: '/blog' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'Team', href: '/team' },
              ]} />

              {/* Divider */}
              <div className="w-px h-6 bg-slate-200 mx-3" />

              {/* Get Started — styled outline */}
              <Link
                href="http://localhost:5173"
                className="group relative px-5 py-2.5 text-sm font-semibold rounded-full overflow-hidden transition-all duration-300"
                style={{ color: '#09383e', border: '1.5px solid #09383e' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.backgroundColor = '#09383e' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#09383e'; e.currentTarget.style.backgroundColor = 'transparent' }}
              >
                Get started →
              </Link>

              {/* Contact — solid pill with icon */}
              <button
                onClick={() => setModalOpen(true)}
                className="cursor-pointer flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #09383e 0%, #0d4f57 100%)', boxShadow: '0 4px 12px rgba(9,56,62,0.3)' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                Contact
              </button>

              {/* Hamburger — even on desktop, like Makalu */}
              <button
                onClick={() => setDrawerOpen(!drawerOpen)}
                className="ml-2 p-2.5 rounded-full text-slate-400 hover:text-midnight hover:bg-slate-100 transition-colors"
                aria-label="Menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {drawerOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile — just hamburger + contact */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setModalOpen(true)}
                className="cursor-pointer px-4 py-2 text-sm font-semibold text-white bg-[#09383e] rounded-full"
              >
                Contact
              </button>
              <button
                onClick={() => setDrawerOpen(!drawerOpen)}
                className="p-2 rounded-full text-slate-400 hover:text-midnight hover:bg-slate-100 transition-colors"
                aria-label="Menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {drawerOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Full drawer — slides down */}
        <div
          className={cn(
            'overflow-hidden transition-all duration-300 bg-white',
            drawerOpen ? 'max-h-[500px] border-t border-slate-100' : 'max-h-0',
          )}
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <DrawerSection title="Product" links={[
                { label: 'Features', href: '#features' },
                { label: 'How it Works', href: '/how-it-works' },
                { label: 'Workspace', href: '#workspace' },
              ]} onClose={() => setDrawerOpen(false)} />
              <DrawerSection title="Resources" links={[
                { label: 'Blog', href: '/blog' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'Team', href: '/team' },
              ]} onClose={() => setDrawerOpen(false)} />
              <DrawerSection title="Company" links={[
                { label: 'About', href: '/team' },
                { label: 'Careers', href: '/team' },
                { label: 'Contact', href: 'mailto:support@dafa.ai' },
              ]} onClose={() => setDrawerOpen(false)} />
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Get Started</h4>
                <p className="text-sm text-slate-500 mb-4">
                  Join 500+ CAs and finance professionals using Nepal&apos;s smartest legal research tool.
                </p>
                <div className="flex flex-col gap-2">
                  <Link
                    href="http://localhost:5173"
                    onClick={() => setDrawerOpen(false)}
                    className="text-center px-4 py-2.5 text-sm font-semibold text-midnight border border-slate-200 rounded-full hover:bg-slate-50"
                  >
                    Sign in
                  </Link>
                  <button
                    onClick={() => { setDrawerOpen(false); setModalOpen(true) }}
                    className="cursor-pointer px-4 py-2.5 text-sm font-semibold text-white bg-[#09383e] rounded-full"
                  >
                    Get early access
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} source="navbar" />
    </>
  )
}

/* ── Desktop dropdown ── */
function NavDropdown({ label, items }: { label: string; items: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        className="flex cursor-pointer items-center gap-1.5 px-4 py-2.5 text-[15px] font-medium text-slate-600 hover:text-midnight transition-colors rounded-lg"
        onClick={() => setOpen(!open)}
      >
        {label}
        <svg className={cn('w-4 h-4 text-slate-400 transition-transform', open && 'rotate-180')} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1 w-52 rounded-xl border border-slate-100 bg-white py-2 shadow-xl shadow-slate-900/10">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-sm text-slate-600 hover:text-midnight hover:bg-slate-50 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Drawer section for full menu ── */
function DrawerSection({ title, links, onClose }: { title: string; links: { label: string; href: string }[]; onClose: () => void }) {
  return (
    <div>
      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">{title}</h4>
      <div className="flex flex-col gap-1">
        {links.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={onClose}
            className="text-sm text-slate-600 hover:text-midnight py-1.5 transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
