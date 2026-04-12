import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/mdx'
import { marked } from 'marked'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

const CATEGORY_COLORS: Record<string, string> = {
  Analysis: 'bg-electric/10 text-electric',
  News: 'bg-emerald/10 text-emerald',
  Guide: 'bg-purple-100 text-purple-700',
  Update: 'bg-orange-100 text-orange-700',
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
  const colorClass = CATEGORY_COLORS[post.category] ?? 'bg-slate-100 text-slate-600'

  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-midnight transition-colors duration-150 mb-10"
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
            className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-4 ${colorClass}`}
          >
            {post.category}
          </span>

          <h1 className="font-display font-bold text-3xl md:text-4xl text-midnight leading-tight mb-5">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-electric/10 flex items-center justify-center">
                <span className="text-electric text-[10px] font-bold">
                  {post.author
                    .split(' ')
                    .map((w) => w[0])
                    .join('')
                    .slice(0, 2)}
                </span>
              </div>
              <span className="font-medium text-midnight">{post.author}</span>
            </div>
            <span>·</span>
            <span>{formatDate(post.date)}</span>
            <span>·</span>
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
            className="inline-flex items-center gap-1.5 text-sm font-medium text-electric hover:underline"
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
    </main>
  )
}
