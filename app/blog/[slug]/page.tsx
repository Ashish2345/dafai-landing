import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/mdx'
import { marked } from 'marked'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
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

  const htmlContent = marked(post.content) as string

  return (
    <main className="bg-white pb-16 pt-8">
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

            {/* Post header */}
            <header className="mb-10">
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
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(9,56,62,0.08)' }}
                  >
                    <span className="text-[10px] font-bold" style={{ color: '#09383e' }}>
                      {post.author
                        .split(' ')
                        .map((w) => w[0])
                        .join('')
                        .slice(0, 2)}
                    </span>
                  </div>
                  <span className="font-medium text-slate-900">{post.author}</span>
                </div>
                <span>&middot;</span>
                <span>{formatDate(post.date)}</span>
                <span>&middot;</span>
                <span>{post.readingTime}</span>
              </div>
            </header>

            {/* Divider */}
            <hr className="border-slate-200 mb-10" />

            {/* Article content */}
            <article
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* Footer nav */}
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
        </div>
      </section>
    </main>
  )
}
