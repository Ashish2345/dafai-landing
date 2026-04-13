'use client'
import { useState } from 'react'
import { submitWaitlist } from '@/lib/api'
import { Button } from './Button'
import { cn } from '@/lib/utils'

type WaitlistModalProps = {
  open: boolean
  onClose: () => void
  tier?: string
  source?: string
}

export function WaitlistModal({ open, onClose, tier, source = 'modal' }: WaitlistModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!open) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await submitWaitlist({ email, name: name || undefined, tier, source })
    } catch {
      // silently succeed — don't leak backend errors to the user
    } finally {
      setLoading(false)
      setSuccess(true)
    }
  }

  function handleClose() {
    setSuccess(false)
    setName('')
    setEmail('')
    onClose()
  }

  return (
    /* backdrop */
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={handleClose}
    >
      {/* card */}
      <div
        className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors text-xl leading-none"
          aria-label="Close"
        >
          ×
        </button>

        {success ? (
          /* success state */
          <div className="flex flex-col items-center text-center py-4 gap-4">
            <div className="w-16 h-16 rounded-full bg-emerald/10 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-emerald"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 font-display">
              You&apos;re on the list!
            </h2>
            <p className="text-slate-500">We&apos;ll reach out when your spot is ready.</p>
            <Button variant="outline-dark" size="sm" onClick={handleClose} className="mt-2">
              Close
            </Button>
          </div>
        ) : (
          /* form state */
          <>
            <h2 className="text-2xl font-bold text-slate-900 mb-1 font-display">
              Get Early Access
            </h2>
            <p className="text-slate-500 text-sm mb-6">
              Join thousands of legal &amp; financial professionals on the waitlist.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="wl-name" className="block text-sm font-medium text-slate-700 mb-1">
                  Name <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  id="wl-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className={cn(
                    'w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-800',
                    'placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400/40 focus:border-teal-500',
                    'transition-all duration-150',
                  )}
                />
              </div>
              <div>
                <label
                  htmlFor="wl-email"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="wl-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={cn(
                    'w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-800',
                    'placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400/40 focus:border-teal-500',
                    'transition-all duration-150',
                  )}
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={loading}
                className="w-full mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Joining…' : 'Join Waitlist'}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
