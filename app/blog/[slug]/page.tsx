import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/mdx'
import { renderMarkdown, type TocEntry } from '@/lib/markdown'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  articleSchema,
  breadcrumbListSchema,
  SITE_URL,
} from '@/lib/seo/schema'
import { socialMeta } from '@/lib/seo/metadata'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) {
    return {
      title: 'Post not found',
      description: 'The article you are looking for is not available.',
    }
  }
  const url = `/blog/${slug}`
  // metaTitle is the full SERP title (no brand suffix appended), used for posts
  // whose title would truncate after the layout-wide "%s — Mero Dafa" template.
  const ogTitle = post.metaTitle ?? post.title
  const social = socialMeta({
    title: ogTitle,
    description: post.excerpt,
    url,
    type: 'article',
  })
  return {
    title: post.metaTitle ? { absolute: post.metaTitle } : post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    authors: post.authorEntity
      ? [{ name: post.authorEntity.name, url: `${SITE_URL}/authors/${post.authorEntity.slug}` }]
      : [{ name: post.author }],
    openGraph: {
      ...social.openGraph,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.dateModified,
      authors: [post.author],
      ...(post.category && { tags: [post.category] }),
    },
    twitter: social.twitter,
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  const { html: htmlContent, toc } = renderMarkdown(post.content)

  const allPosts = getAllPosts()
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .filter((p) => !post.category || p.category === post.category)
    .slice(0, 2)
  if (relatedPosts.length < 2) {
    const fillers = allPosts
      .filter((p) => p.slug !== slug && !relatedPosts.find((r) => r.slug === p.slug))
      .slice(0, 2 - relatedPosts.length)
    relatedPosts.push(...fillers)
  }

  const author = post.authorEntity
  const authorHref = author ? `/authors/${author.slug}` : null

  return (
    <main className="bg-white pb-16 pt-8">
      <JsonLd
        id="ld-article"
        data={articleSchema({
          title: post.title,
          description: post.excerpt,
          slug: post.slug,
          author: author
            ? { name: author.name, slug: author.slug, role: author.role }
            : post.author,
          datePublished: post.date,
          dateModified: post.dateModified,
          category: post.category,
        })}
      />
      <JsonLd
        id="ld-article-breadcrumb"
        data={breadcrumbListSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Blog', url: `${SITE_URL}/blog` },
          { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
        ])}
      />
      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-[1100px]">
          <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200 bg-white px-6 sm:px-10 lg:px-14 py-10 sm:py-14">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#09383e] transition-colors duration-150 mb-8"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>

            {/* Post header */}
            <header className="mb-10 max-w-[760px]">
              <span
                className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider mb-4"
                style={{ backgroundColor: 'rgba(9,56,62,0.08)', color: '#09383e' }}
              >
                {post.category}
              </span>

              <h1 className="font-display font-bold text-3xl md:text-4xl text-slate-900 leading-tight mb-5">
                {post.title}
              </h1>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                <AuthorBadge
                  name={post.author}
                  initials={author?.initials ?? initialsFromName(post.author)}
                  href={authorHref}
                />
                <span aria-hidden>&middot;</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden>&middot;</span>
                <span>{post.readingTime}</span>
                {post.dateModified && post.dateModified !== post.date && (
                  <>
                    <span aria-hidden>&middot;</span>
                    <span className="text-slate-400">
                      Last updated{' '}
                      <time dateTime={post.dateModified}>
                        {formatDate(post.dateModified)}
                      </time>
                    </span>
                  </>
                )}
              </div>
            </header>

            {/* Two-column layout: ToC sidebar + article body */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-10 lg:gap-14">
              {/* Article content */}
              <div className="min-w-0 max-w-[760px]">
                <hr className="border-slate-200 mb-10" />
                <article
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />

                {/* CTA card */}
                <aside
                  className="mt-14 rounded-2xl px-6 sm:px-10 py-10 flex flex-col items-center text-center gap-3"
                  style={{ background: 'linear-gradient(135deg, #09383e 0%, #0d4f57 100%)' }}
                >
                  <h2 className="font-display font-bold text-2xl text-white max-w-md">
                    Stop hunting through PDFs.
                  </h2>
                  <p className="text-slate-300 text-sm leading-relaxed max-w-md">
                    Ask Mero Dafa about anything in this article — get the answer with
                    exact section references and the original Gazette page beside it.
                  </p>
                  <Link
                    href="/pricing"
                    className="mt-3 inline-flex items-center justify-center rounded-full bg-white font-semibold px-6 py-3 text-sm transition-all duration-200 hover:brightness-95 cursor-pointer"
                    style={{ color: '#09383e' }}
                  >
                    Try Mero Dafa free →
                  </Link>
                </aside>

                {/* Author byline card — establishes E-E-A-T */}
                {author && (
                  <section className="mt-12 flex items-start gap-4 rounded-xl border border-slate-200 p-6">
                    <div
                      className="relative w-14 h-14 rounded-full overflow-hidden flex items-center justify-center text-white font-bold text-base shadow-sm flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #09383e 0%, #0d4f57 100%)' }}
                    >
                      <span className="absolute inset-0 flex items-center justify-center">
                        {author.initials}
                      </span>
                      {author.photo && (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={author.photo}
                          alt={author.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <Link
                        href={`/authors/${author.slug}`}
                        className="block font-display font-semibold text-slate-900 hover:text-[#09383e] transition-colors"
                      >
                        {author.name}
                        {author.credentials && (
                          <span className="text-slate-500 font-medium">
                            , {author.credentials}
                          </span>
                        )}
                      </Link>
                      <p className="text-xs font-medium mt-0.5" style={{ color: '#09383e' }}>
                        {author.role}
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed mt-2">
                        {author.shortBio}
                      </p>
                    </div>
                  </section>
                )}

                {/* Related posts */}
                {relatedPosts.length > 0 && (
                  <section className="mt-12">
                    <h2 className="font-display font-semibold text-lg text-slate-900 mb-5">
                      Keep reading
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {relatedPosts.map((rp) => (
                        <Link
                          key={rp.slug}
                          href={`/blog/${rp.slug}`}
                          className="group flex flex-col bg-white rounded-xl border border-slate-200 hover:border-[#09383e]/30 hover:shadow-[0_4px_18px_rgba(9,56,62,0.06)] transition-all duration-200 p-5"
                        >
                          <span
                            className="self-start inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider mb-2"
                            style={{ backgroundColor: 'rgba(9,56,62,0.08)', color: '#09383e' }}
                          >
                            {rp.category}
                          </span>
                          <h3 className="font-display font-semibold text-base text-slate-900 leading-snug group-hover:text-[#09383e] transition-colors">
                            {rp.title}
                          </h3>
                          <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mt-2">
                            {rp.excerpt}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                <div className="mt-14 pt-8 border-t border-slate-200">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                    style={{ color: '#09383e' }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    All articles
                  </Link>
                </div>
              </div>

              {/* Sticky ToC sidebar (desktop only) */}
              {toc.length > 1 && (
                <aside className="hidden lg:block">
                  <nav
                    aria-label="Table of contents"
                    className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-3">
                      On this page
                    </p>
                    <ul className="space-y-1.5 text-sm border-l border-slate-200 pl-4">
                      {toc.map((entry) => (
                        <li
                          key={entry.slug}
                          className={entry.depth === 3 ? 'pl-3' : ''}
                        >
                          <a
                            href={`#${entry.slug}`}
                            className="block text-slate-600 hover:text-[#09383e] transition-colors leading-snug py-0.5"
                          >
                            {entry.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </aside>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function initialsFromName(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0] ?? '')
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function AuthorBadge({
  name,
  initials,
  href,
}: {
  name: string
  initials: string
  href: string | null
}) {
  const inner = (
    <>
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center"
        style={{ backgroundColor: 'rgba(9,56,62,0.08)' }}
      >
        <span className="text-[10px] font-bold" style={{ color: '#09383e' }}>
          {initials}
        </span>
      </div>
      <span className="font-medium text-slate-900">{name}</span>
    </>
  )
  if (!href) return <div className="flex items-center gap-2">{inner}</div>
  return (
    <Link
      href={href}
      className="flex items-center gap-2 hover:text-[#09383e] transition-colors group"
    >
      {inner}
    </Link>
  )
}
