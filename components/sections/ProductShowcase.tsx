'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/*
 * Animated replica of the actual MeroDafa workspace UI.
 * Shows chat + document side-by-side with a realistic interaction flow.
 */

const FLOW = {
  question: 'What is the TDS rate on consulting fees?',
  status: [
    'Opening the document…',
    'Searching for relevant sections…',
    'Reading 5 sections from आयकर ऐन, २०५८…',
    'Writing your answer…',
  ],
  answer:
    'Consulting fees paid to a resident: **1.5% TDS** with a VAT invoice, **15%** without. This applies to payments exceeding NPR 50,000 in aggregate during a fiscal year.',
  citations: [
    { label: 'Page 107, §88 — TDS on payments', page: 107 },
    { label: 'Page 111, §89 — Contract payments', page: 111 },
    { label: 'Page 207, §28.17 — Amendment', page: 207 },
  ],
  followUps: [
    'What are the exact penalty amounts?',
    'Who qualifies for exemption?',
    'What changed in the latest amendment?',
  ],
  docTitle: 'आयकर ऐन, २०५८',
}

type Phase = 'typing' | 'status' | 'answering' | 'complete' | 'idle'

export function ProductShowcase() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [typed, setTyped] = useState('')
  const [statusIdx, setStatusIdx] = useState(0)
  const [answerVisible, setAnswerVisible] = useState(false)
  const [highlightedPage, setHighlightedPage] = useState<number | null>(null)
  const [hasRun, setHasRun] = useState(false)

  // Start animation when component enters viewport
  function startDemo() {
    if (hasRun) return
    setHasRun(true)
    setPhase('typing')
    setTyped('')
    setStatusIdx(0)
    setAnswerVisible(false)
    setHighlightedPage(null)
  }

  // Typing
  useEffect(() => {
    if (phase !== 'typing') return
    if (typed.length >= FLOW.question.length) {
      const t = setTimeout(() => setPhase('status'), 500)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setTyped(FLOW.question.slice(0, typed.length + 1)), 40)
    return () => clearTimeout(t)
  }, [typed, phase])

  // Status progression
  useEffect(() => {
    if (phase !== 'status') return
    if (statusIdx >= FLOW.status.length) {
      const t = setTimeout(() => setPhase('answering'), 300)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setStatusIdx((i) => i + 1), 900)
    return () => clearTimeout(t)
  }, [statusIdx, phase])

  // Answer reveal
  useEffect(() => {
    if (phase !== 'answering') return
    setAnswerVisible(true)
    const t = setTimeout(() => setPhase('complete'), 800)
    return () => clearTimeout(t)
  }, [phase])

  // Auto-highlight citation after complete
  useEffect(() => {
    if (phase !== 'complete') return
    const t = setTimeout(() => setHighlightedPage(107), 1200)
    return () => clearTimeout(t)
  }, [phase])

  const showStatus = phase === 'status'
  const showAnswer = phase === 'answering' || phase === 'complete'

  return (
    <section className="px-4 sm:px-6 py-10 sm:py-14">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider mb-4"
            style={{ backgroundColor: 'rgba(9,56,62,0.1)', color: '#09383e' }}
          >
            See it in action
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 leading-tight">
            Research that feels like a conversation.
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Ask a question on the left, see the source document on the right. Click any reference to jump to the exact page.
          </p>
        </div>

        {/* App mockup */}
        <motion.div
          className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden"
          onViewportEnter={startDemo}
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Title bar */}
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-slate-100 bg-slate-50/80">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-slate-200" />
              <div className="w-3 h-3 rounded-full bg-slate-200" />
              <div className="w-3 h-3 rounded-full bg-slate-200" />
            </div>
            <div className="flex items-center gap-1.5 text-[12px] text-slate-500">
              <span className="text-slate-400">Library</span>
              <svg className="w-3 h-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <span className="font-medium text-slate-700">{FLOW.docTitle}</span>
            </div>
          </div>

          {/* Workspace split */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] min-h-[420px]">
            {/* Chat side */}
            <div className="flex flex-col border-r border-slate-100">
              {/* Chat header */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100">
                <span className="text-[13px] font-semibold text-slate-800" style={{ fontFamily: 'Georgia, serif' }}>
                  {FLOW.docTitle}
                </span>
                <span className="text-[11px] text-slate-400 border border-slate-200 rounded px-2 py-0.5">
                  Download PDF
                </span>
              </div>

              {/* Messages area */}
              <div className="flex-1 px-4 py-4 flex flex-col gap-4 overflow-hidden">
                {/* User message */}
                <AnimatePresence>
                  {typed.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-end"
                    >
                      <div
                        className="rounded-2xl rounded-br-md px-3.5 py-2.5 text-[13px] text-white max-w-[85%]"
                        style={{ backgroundColor: '#09383e' }}
                      >
                        {typed}
                        {phase === 'typing' && (
                          <span className="inline-block w-[2px] h-3.5 bg-white/70 ml-0.5 align-middle animate-pulse" />
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Status messages */}
                <AnimatePresence>
                  {showStatus && statusIdx > 0 && (
                    <motion.div
                      key={`status-${statusIdx}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="rounded-2xl rounded-tl-md bg-slate-100 px-3.5 py-2.5 text-[13px] text-slate-500 italic">
                        {FLOW.status[statusIdx - 1]}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Answer */}
                <AnimatePresence>
                  {showAnswer && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex justify-start"
                    >
                      <div className="max-w-[90%] space-y-2.5">
                        {/* Confidence badge */}
                        <div className="flex items-center gap-1.5">
                          <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Verified
                          </span>
                          <span className="text-[10px] text-slate-400">Rank 1: {FLOW.docTitle}</span>
                        </div>

                        {/* Answer text */}
                        <div className="rounded-2xl rounded-tl-md bg-slate-50 border border-slate-200/70 px-3.5 py-2.5 text-[13px] text-slate-700 leading-relaxed">
                          Consulting fees paid to a resident: <strong className="text-slate-900">1.5% TDS</strong> with a VAT invoice, <strong className="text-slate-900">15%</strong> without. This applies to payments exceeding NPR 50,000 in aggregate during a fiscal year.
                        </div>

                        {/* Citation chips */}
                        <motion.div
                          className="flex flex-wrap gap-1.5"
                          initial="hidden"
                          animate="show"
                          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } }}
                        >
                          {FLOW.citations.map((c, i) => (
                            <motion.button
                              key={c.label}
                              variants={{
                                hidden: { opacity: 0, y: 6, scale: 0.9 },
                                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
                              }}
                              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold transition-colors cursor-pointer"
                              style={{
                                backgroundColor: highlightedPage === c.page ? 'rgba(9,56,62,0.15)' : 'rgba(9,56,62,0.06)',
                                color: '#09383e',
                                border: highlightedPage === c.page ? '1px solid rgba(9,56,62,0.3)' : '1px solid transparent',
                              }}
                              onClick={() => setHighlightedPage(c.page)}
                            >
                              <span className="w-3.5 h-3.5 rounded-full bg-[#09383e] text-white text-[8px] flex items-center justify-center font-bold">
                                {i + 1}
                              </span>
                              {c.label}
                            </motion.button>
                          ))}
                        </motion.div>

                        {/* Follow-up chips */}
                        {phase === 'complete' && (
                          <motion.div
                            className="flex flex-wrap gap-1.5 pt-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                          >
                            {FLOW.followUps.map((q) => (
                              <span
                                key={q}
                                className="rounded-full border px-2.5 py-1 text-[10px] text-slate-600"
                                style={{ borderColor: 'rgba(9,56,62,0.15)', backgroundColor: 'rgba(9,56,62,0.03)' }}
                              >
                                {q}
                              </span>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Input bar */}
              <div className="px-3 py-2.5 border-t border-slate-100">
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
                  <span className="flex-1 text-[13px] text-slate-400">Message…</span>
                  <div className="flex items-center gap-1.5">
                    <span className="flex items-stretch overflow-hidden rounded-full border border-slate-200 text-[10px] font-semibold">
                      <span className="px-2 py-0.5 bg-[#09383e] text-white">EN</span>
                      <span className="px-2 py-0.5 text-slate-400">ने</span>
                    </span>
                    <div className="w-7 h-7 rounded-lg bg-[#09383e] flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Document side */}
            <div className="hidden lg:flex flex-col bg-slate-50/50">
              {/* Page indicator */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2 text-[12px] text-slate-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  Page {highlightedPage || 107} of 312
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-6 h-6 rounded border border-slate-200 bg-white flex items-center justify-center text-slate-400">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </span>
                  <span className="w-6 h-6 rounded border border-slate-200 bg-white flex items-center justify-center text-slate-400">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Document body — simulated lines with highlight */}
              <div className="flex-1 p-5 flex flex-col gap-2 overflow-hidden">
                {Array.from({ length: 14 }).map((_, i) => {
                  const isHighlighted = highlightedPage && (i === 4 || i === 5 || i === 6)
                  const widths = ['w-full', 'w-11/12', 'w-10/12', 'w-full', 'w-9/12', 'w-full', 'w-10/12', 'w-11/12', 'w-8/12', 'w-full', 'w-9/12', 'w-11/12', 'w-10/12', 'w-7/12']
                  return (
                    <motion.div
                      key={i}
                      className={`h-2 rounded ${widths[i]}`}
                      animate={{
                        backgroundColor: isHighlighted ? 'rgba(9,56,62,0.18)' : 'rgb(226,232,240)',
                        scale: isHighlighted ? 1.01 : 1,
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  )
                })}

                {/* Highlight overlay label */}
                <AnimatePresence>
                  {highlightedPage && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-2 inline-flex self-start items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium border"
                      style={{ backgroundColor: 'rgba(9,56,62,0.06)', borderColor: 'rgba(9,56,62,0.15)', color: '#09383e' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#09383e]" />
                      Highlighted: §88 — TDS on payments to residents
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
