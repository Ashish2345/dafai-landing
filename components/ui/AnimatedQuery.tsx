'use client'
import { useEffect, useState } from 'react'

type Demo = {
  question: string
  answerHighlight: string
  answerAfter: string
  citations: string[]
}

const DEMOS: Demo[] = [
  {
    question: 'What is the TDS rate on consulting fees?',
    answerHighlight: '1.5% TDS',
    answerAfter: ' with VAT invoice, 15% without.',
    citations: ['ITA 2058, \u00a788', 'Finance Act 2081'],
  },
  {
    question: 'VAT registration threshold for services?',
    answerHighlight: 'NPR 20 lakh',
    answerAfter: ' annual turnover for service providers.',
    citations: ['VAT Act 2052', 'IRD Circular'],
  },
  {
    question: 'Corporate tax rate for manufacturers?',
    answerHighlight: '20%',
    answerAfter: ' for resident manufacturing companies.',
    citations: ['ITA 2058, Sch. 1', 'Finance Act 2081'],
  },
]

const TYPING_SPEED = 45 // ms per char
const ANSWER_DELAY = 700 // ms after finished typing
const HOLD_DURATION = 3200 // ms to display full answer
const CLEAR_DURATION = 500 // ms to fade answer out

type Phase = 'typing' | 'thinking' | 'answering' | 'holding' | 'clearing'

export function AnimatedQuery() {
  const [demoIndex, setDemoIndex] = useState(0)
  const [typed, setTyped] = useState('')
  const [phase, setPhase] = useState<Phase>('typing')

  const demo = DEMOS[demoIndex]

  // Typing effect
  useEffect(() => {
    if (phase !== 'typing') return
    if (typed.length >= demo.question.length) {
      const t = setTimeout(() => setPhase('thinking'), ANSWER_DELAY)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setTyped(demo.question.slice(0, typed.length + 1))
    }, TYPING_SPEED)
    return () => clearTimeout(t)
  }, [typed, phase, demo.question])

  // Thinking → answering → holding → clearing → next demo
  useEffect(() => {
    if (phase === 'thinking') {
      const t = setTimeout(() => setPhase('answering'), 900)
      return () => clearTimeout(t)
    }
    if (phase === 'answering') {
      const t = setTimeout(() => setPhase('holding'), 300)
      return () => clearTimeout(t)
    }
    if (phase === 'holding') {
      const t = setTimeout(() => setPhase('clearing'), HOLD_DURATION)
      return () => clearTimeout(t)
    }
    if (phase === 'clearing') {
      const t = setTimeout(() => {
        setDemoIndex((i) => (i + 1) % DEMOS.length)
        setTyped('')
        setPhase('typing')
      }, CLEAR_DURATION)
      return () => clearTimeout(t)
    }
  }, [phase])

  const showAnswer = phase === 'answering' || phase === 'holding'
  const showCursor = phase === 'typing'
  const fading = phase === 'clearing'

  return (
    <div
      className="w-full max-w-xl rounded-xl border bg-white overflow-hidden shadow-sm transition-opacity duration-500"
      style={{
        borderColor: 'rgba(9,56,62,0.15)',
        opacity: fading ? 0.3 : 1,
      }}
    >
      {/* Question row — search-bar style */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
        <svg
          className="flex-shrink-0 w-4 h-4 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <div className="flex-1 min-w-0 text-left">
          <span className="text-[13px] sm:text-sm text-slate-800 font-medium">
            {typed}
            {showCursor && <span className="inline-block w-[1px] h-3.5 align-middle ml-0.5 bg-slate-800 animate-pulse" />}
          </span>
        </div>
        {phase === 'thinking' && (
          <span className="flex items-center gap-1 flex-shrink-0">
            <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
          </span>
        )}
      </div>

      {/* Answer row */}
      <div
        className="px-4 py-3 text-left transition-all duration-300 overflow-hidden"
        style={{
          maxHeight: showAnswer ? '200px' : '0px',
          opacity: showAnswer ? 1 : 0,
          paddingTop: showAnswer ? '0.75rem' : '0',
          paddingBottom: showAnswer ? '0.75rem' : '0',
        }}
      >
        <p className="text-[13px] sm:text-sm text-slate-700 leading-relaxed mb-2">
          <span className="font-semibold" style={{ color: '#09383e' }}>
            {demo.answerHighlight}
          </span>
          {demo.answerAfter}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {demo.citations.map((c, i) => (
            <span
              key={c}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold"
              style={{
                backgroundColor: 'rgba(9,56,62,0.08)',
                color: '#09383e',
                animation: showAnswer ? `fadeInUp 0.4s ease-out ${i * 0.1}s both` : 'none',
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
