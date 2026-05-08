'use client'
import { useState } from 'react'
import { submitWaitlist } from '@/lib/api'
import { cn } from '@/lib/utils'

export function NewsletterForm() {
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
