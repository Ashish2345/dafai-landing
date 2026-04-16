'use client'
import { useState } from 'react'

type QA = { q: string; a: string }

const FAQS: QA[] = [
  {
    q: 'What sources does Mero Dafa draw from?',
    a: 'Nepal\u2019s official legal corpus \u2014 the Income Tax Act, VAT Act, Company Act, Finance Acts, NRB directives, IRD circulars, Nepal Gazette, and Supreme Court case law. Every answer cites the specific section and page number it came from.',
  },
  {
    q: 'How current is the information?',
    a: 'We index new gazettes and directives as they\u2019re published. The citation beside every answer tells you the exact source and version, so you can verify it\u2019s the latest applicable rule.',
  },
  {
    q: 'Can I ask in Nepali?',
    a: 'Yes. You can switch between English and Nepali with one click. Answers come back in the language you choose, with citations pointing to the original document text.',
  },
  {
    q: 'Can I save answers for later?',
    a: 'Yes. Star any response to save it to your Starred collection. You can also download documents as PDFs and copy answers with full citations for your reports.',
  },
  {
    q: 'Does Mero Dafa replace my CA or legal advisor?',
    a: 'No. Mero Dafa is a research tool that helps you find the right section fast and understand it in plain language. For filings, planning, or anything binding, your CA is still the professional call.',
  },
  {
    q: 'Is my data private?',
    a: 'Your questions and documents are yours. We don\u2019t sell your data, and we don\u2019t use your queries to train public models.',
  },
  {
    q: 'Is there a free plan?',
    a: 'Yes. The Starter plan is free and includes 10 questions per day, 3 PDF downloads, and access to the last 2 years of Gazette content. No credit card required.',
  },
]

export function FAQ() {
  return (
    <section id="faq" className="px-4 sm:px-6 py-14 sm:py-20">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider mb-4"
            style={{ backgroundColor: 'rgba(9,56,62,0.1)', color: '#09383e' }}
          >
            FAQ
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 leading-tight">
            Have a question?
          </h2>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {FAQS.map((item, i) => (
            <FAQItem key={i} item={item} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItem({ item, defaultOpen }: { item: QA; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen)

  return (
    <div
      className="rounded-xl border bg-white overflow-hidden transition-colors"
      style={{ borderColor: open ? 'rgba(9,56,62,0.25)' : 'rgb(226,232,240)' }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
        aria-expanded={open}
      >
        <span className="font-semibold text-slate-900 text-[15px]">{item.q}</span>
        <span
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform"
          style={{
            backgroundColor: open ? '#09383e' : 'rgba(9,56,62,0.08)',
            color: open ? '#fff' : '#09383e',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      <div
        className="overflow-hidden transition-[max-height,opacity] duration-300"
        style={{ maxHeight: open ? '400px' : '0px', opacity: open ? 1 : 0 }}
      >
        <div className="px-5 pb-4 text-[14px] text-slate-600 leading-relaxed">{item.a}</div>
      </div>
    </div>
  )
}
