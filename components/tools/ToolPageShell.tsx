import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { JsonLd } from '@/components/seo/JsonLd'
import { ToolIcon } from '@/components/tools/ToolIcon'
import {
  breadcrumbListSchema,
  faqPageSchema,
  softwareToolSchema,
  SITE_URL,
} from '@/lib/seo/schema'
import { socialMeta } from '@/lib/seo/metadata'
import { toolBySlug } from '@/lib/tools-registry'

export type FaqItem = { question: string; answer: string }

/** Standard metadata for a tool page — keeps titles/canonicals consistent. */
export function toolMetadata(p: {
  slug: string
  /** Full SERP title (≤ 60 chars); bypasses the site-wide title template. */
  seoTitle: string
  description: string
  keywords?: string[]
}): Metadata {
  return {
    title: { absolute: p.seoTitle },
    description: p.description,
    keywords: p.keywords,
    alternates: { canonical: `/tools/${p.slug}` },
    ...socialMeta({ title: p.seoTitle, description: p.description, url: `/tools/${p.slug}` }),
  }
}

type Props = {
  slug: string
  /** H1, main part. */
  title: string
  /** H1, muted trailing part. */
  titleAccent?: string
  /** Nepali-language title line (targets Devanagari searches). */
  nepaliTitle: string
  intro: ReactNode
  /** Visible "last updated" note (E-E-A-T freshness signal). */
  updatedNote: string
  /** Meta description, reused in JSON-LD. */
  description: string
  faq: FaqItem[]
  related: string[]
  /** The interactive calculator. */
  children: ReactNode
  /** Long-form explainer, rendered open (indexable, not collapsed). */
  article: ReactNode
  cta: { title: string; body: string }
}

export function ToolPageShell(p: Props) {
  const tool = toolBySlug(p.slug)
  const url = `${SITE_URL}/tools/${p.slug}`
  return (
    <main className="bg-white pb-16 pt-6 sm:pt-8">
      <JsonLd
        id={`ld-${p.slug}-software`}
        data={softwareToolSchema({ name: tool.title, url, description: p.description })}
      />
      <JsonLd id={`ld-${p.slug}-faq`} data={faqPageSchema(p.faq)} />
      <JsonLd
        id={`ld-${p.slug}-breadcrumb`}
        data={breadcrumbListSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Tools', url: `${SITE_URL}/tools` },
          { name: tool.shortTitle, url },
        ])}
      />

      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-[1100px]">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-500 mb-5 flex flex-wrap items-center gap-1.5">
            <Link href="/" className="hover:text-[#09383e] transition-colors">Home</Link>
            <span aria-hidden>/</span>
            <Link href="/tools" className="hover:text-[#09383e] transition-colors">Tools</Link>
            <span aria-hidden>/</span>
            <span className="text-slate-700">{tool.shortTitle}</span>
          </nav>

          <header className="mb-6 max-w-3xl">
            <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 leading-tight tracking-tight mb-1.5">
              {p.title}
              {p.titleAccent && (
                <>
                  {' '}
                  <span className="text-slate-500 font-medium">{p.titleAccent}</span>
                </>
              )}
            </h1>
            <p className="text-slate-500 text-sm mb-3" lang="ne" style={{ fontFamily: 'system-ui, sans-serif' }}>
              {p.nepaliTitle}
            </p>
            <div className="text-slate-600 text-sm sm:text-base leading-relaxed mb-3">{p.intro}</div>
            <p className="text-xs text-slate-500 inline-flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {p.updatedNote}
            </p>
          </header>

          <section
            className="rounded-2xl sm:rounded-3xl border-0 sm:border border-slate-200 bg-white p-0 sm:p-6 lg:p-8 mb-10"
            aria-label="Calculator"
          >
            {p.children}
          </section>

          <article className="max-w-3xl mx-auto tool-article">
            {p.article}

            <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4">
              Frequently asked questions
            </h2>
            <div className="space-y-5">
              {p.faq.map((it) => (
                <div key={it.question}>
                  <h3 className="font-display font-semibold text-base text-slate-900 mb-1.5">{it.question}</h3>
                  <p className="text-slate-700 text-[15px] leading-relaxed">{it.answer}</p>
                </div>
              ))}
            </div>
          </article>

          <RelatedTools slugs={p.related} />

          <aside
            className="mt-12 rounded-2xl px-6 sm:px-8 py-10 flex flex-col items-center text-center gap-3 max-w-3xl mx-auto"
            style={{ background: 'linear-gradient(135deg, #09383e 0%, #0d4f57 100%)' }}
          >
            <h2 className="font-display font-bold text-2xl text-white max-w-md">{p.cta.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed max-w-md">{p.cta.body}</p>
            <Link
              href="/pricing"
              className="mt-3 inline-flex items-center justify-center rounded-full bg-white font-semibold px-6 py-3 text-sm transition-all duration-200 hover:brightness-95"
              style={{ color: '#09383e' }}
            >
              Try Mero Dafa free →
            </Link>
          </aside>
        </div>
      </section>
    </main>
  )
}

function RelatedTools({ slugs }: { slugs: string[] }) {
  const tools = slugs.map(toolBySlug)
  return (
    <nav aria-label="Related tools" className="max-w-3xl mx-auto mt-12">
      <h2 className="font-display font-bold text-xl text-slate-900 mb-4">Related free tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tools.map((t) => (
          <Link
            key={t.slug}
            href={`/tools/${t.slug}`}
            className="flex items-start gap-3 rounded-xl border border-slate-200 p-4 hover:border-[#09383e]/30 transition-colors"
          >
            <span className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(9,56,62,0.08)', color: '#09383e' }}>
              <ToolIcon name={t.icon} className="w-4 h-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-slate-900">{t.shortTitle}</span>
              <span className="block text-xs text-slate-500 leading-snug mt-0.5 line-clamp-2">{t.description}</span>
            </span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

/** Article building blocks — consistent typography without a prose plugin. */
export function H2({ children }: { children: ReactNode }) {
  return <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight mt-10 mb-4 first:mt-0">{children}</h2>
}
export function P({ children }: { children: ReactNode }) {
  return <p className="text-slate-700 text-base leading-relaxed mb-4">{children}</p>
}
export function UL({ children }: { children: ReactNode }) {
  return <ul className="space-y-2 text-slate-700 mb-5 list-disc pl-5">{children}</ul>
}
export function Note({ children }: { children: ReactNode }) {
  return <p className="text-xs text-slate-500 mb-6 leading-relaxed">{children}</p>
}
export function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 mb-3">
      <table className="w-full min-w-[480px] text-sm">
        <thead className="bg-slate-50 text-slate-900">
          <tr>
            {head.map((h) => (
              <th key={h} className="text-left px-4 py-3 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-slate-700">
          {rows.map((r, i) => (
            <tr key={i} className={`border-t border-slate-200 ${i % 2 ? 'bg-slate-50/40' : ''}`}>
              {r.map((c, j) => (
                <td key={j} className="px-4 py-3 align-top">{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export function Example({ title, lines, total }: { title: ReactNode; lines: string[]; total: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 mb-6">
      <p className="text-slate-700 text-sm leading-relaxed mb-2">{title}</p>
      <ul className="space-y-0.5 text-sm text-slate-600 list-none pl-0 font-mono">
        {lines.map((l) => (
          <li key={l}>{l}</li>
        ))}
        <li className="font-semibold text-slate-900">{total}</li>
      </ul>
    </div>
  )
}
