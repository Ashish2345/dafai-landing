import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllAuthors, getAuthorBySlug } from '@/lib/authors'
import { getPostsByAuthorSlug } from '@/lib/mdx'
import { JsonLd } from '@/components/seo/JsonLd'
import {
  authorPersonSchema,
  breadcrumbListSchema,
  SITE_URL,
} from '@/lib/seo/schema'

export async function generateStaticParams() {
  return getAllAuthors().map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const author = getAuthorBySlug(slug)
  if (!author) {
    return { title: 'Author not found' }
  }
  const url = `/authors/${slug}`
  const description = `${author.role}. ${author.shortBio}`
  return {
    title: `${author.name} — Author`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${author.name} — Mero Dafa`,
      description,
      url,
      type: 'profile',
    },
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const author = getAuthorBySlug(slug)
  if (!author) notFound()

  const posts = getPostsByAuthorSlug(slug)

  return (
    <main className="bg-white pb-16 pt-8">
      <JsonLd id="ld-author" data={authorPersonSchema(author)} />
      <JsonLd
        id="ld-author-breadcrumb"
        data={breadcrumbListSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Blog', url: `${SITE_URL}/blog` },
          { name: author.name, url: `${SITE_URL}/authors/${author.slug}` },
        ])}
      />

      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-[900px]">
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

            {/* Author header */}
            <header className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
              <div
                className="relative w-24 h-24 rounded-full overflow-hidden flex items-center justify-center text-white font-bold text-2xl shadow-md flex-shrink-0"
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

              <div className="text-center sm:text-left flex-1">
                <h1 className="font-display font-bold text-3xl md:text-4xl text-slate-900 leading-tight mb-2">
                  {author.name}
                  {author.credentials && (
                    <span className="text-slate-500 text-2xl md:text-3xl font-medium">
                      , {author.credentials}
                    </span>
                  )}
                </h1>
                <p
                  className="text-base font-medium mb-4"
                  style={{ color: '#09383e' }}
                >
                  {author.role}
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 text-sm text-slate-500">
                  {author.email && (
                    <a
                      href={`mailto:${author.email}`}
                      className="hover:text-[#09383e] transition-colors"
                    >
                      {author.email}
                    </a>
                  )}
                  {author.linkedin && (
                    <a
                      href={author.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#09383e] transition-colors"
                    >
                      LinkedIn
                    </a>
                  )}
                  {author.twitter && (
                    <a
                      href={author.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#09383e] transition-colors"
                    >
                      Twitter
                    </a>
                  )}
                </div>
              </div>
            </header>

            <hr className="border-slate-200 mb-10" />

            {/* Bio */}
            <section className="mb-12">
              <h2 className="font-display font-semibold text-lg text-slate-900 mb-4">
                About {author.name.split(' ')[0]}
              </h2>
              <p className="text-slate-700 text-base leading-relaxed">{author.bio}</p>
            </section>

            {/* Posts */}
            <section>
              <h2 className="font-display font-semibold text-lg text-slate-900 mb-5">
                Articles by {author.name.split(' ')[0]}{' '}
                <span className="text-slate-400 font-normal">({posts.length})</span>
              </h2>

              {posts.length === 0 ? (
                <p className="text-slate-500 text-sm">No articles yet.</p>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {posts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col bg-white rounded-xl border border-slate-200 hover:border-[#09383e]/30 hover:shadow-[0_4px_18px_rgba(9,56,62,0.06)] transition-all duration-200 p-5"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                          style={{ backgroundColor: 'rgba(9,56,62,0.08)', color: '#09383e' }}
                        >
                          {post.category}
                        </span>
                        <span className="text-xs text-slate-400">
                          {formatDate(post.date)} &middot; {post.readingTime}
                        </span>
                      </div>
                      <h3 className="font-display font-semibold text-base text-slate-900 leading-snug group-hover:text-[#09383e] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mt-2">
                        {post.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}
