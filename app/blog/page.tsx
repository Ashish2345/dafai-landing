import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'

const CATEGORY_COLORS: Record<string, string> = {
  Analysis: 'bg-electric/10 text-electric',
  News: 'bg-emerald/10 text-emerald',
  Guide: 'bg-purple-100 text-purple-700',
  Update: 'bg-orange-100 text-orange-700',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      {/* Page header */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center mb-16">
        <span className="text-electric text-xs uppercase tracking-widest font-semibold mb-4 block">
          BLOG
        </span>
        <h1 className="font-display font-bold text-4xl md:text-5xl text-midnight leading-tight mb-5">
          The Rajpatra Pulse
        </h1>
        <p className="text-slate-500 text-lg leading-relaxed">
          Legal analysis and insights for Nepal&apos;s financial professionals.
        </p>
      </div>

      {/* Posts grid */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {posts.length === 0 ? (
          <p className="text-center text-slate-400 py-16">No posts yet. Check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => {
              const colorClass =
                CATEGORY_COLORS[post.category] ?? 'bg-slate-100 text-slate-600'

              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-white rounded-xl border border-slate-200 hover:shadow-md transition-shadow duration-200 overflow-hidden"
                >
                  <div className="flex flex-col gap-3 p-6 flex-1">
                    {/* Category badge */}
                    <span
                      className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full ${colorClass}`}
                    >
                      {post.category}
                    </span>

                    {/* Title */}
                    <h2 className="font-display font-semibold text-lg text-midnight leading-snug group-hover:text-electric transition-colors duration-200">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Bottom row */}
                  <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-electric/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-electric text-[10px] font-bold">
                          {post.author
                            .split(' ')
                            .map((w) => w[0])
                            .join('')
                            .slice(0, 2)}
                        </span>
                      </div>
                      <span className="text-slate-500 text-xs truncate">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 text-xs text-slate-400">
                      <span>{formatDate(post.date)}</span>
                      <span>·</span>
                      <span>{post.readingTime}</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
