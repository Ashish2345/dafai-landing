import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'
import { PageHero } from '@/components/ui/PageHero'

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
    <main className="bg-white pb-16">
      <PageHero
        kicker="Blog"
        title="The Rajpatra"
        titleAccent="Pulse."
        description="Legal analysis and insights for Nepal's financial professionals."
      />

      {/* Posts grid */}
      <section className="px-4 sm:px-6 pt-8 sm:pt-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200 bg-white px-6 sm:px-10 py-10 sm:py-14">
            {posts.length === 0 ? (
              <div className="flex flex-col items-center text-center gap-3 py-12">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(9,56,62,0.08)' }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} style={{ color: '#09383e' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2zM9 9h6m-6 4h6m-6 4h4" />
                  </svg>
                </div>
                <p className="font-semibold text-slate-900 text-lg">No posts yet.</p>
                <p className="text-slate-600 text-sm max-w-sm">
                  We&apos;re preparing honest, in-depth analysis of Nepal&apos;s regulatory
                  changes. Check back soon.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col bg-white rounded-xl border border-slate-200 hover:border-[#09383e]/30 hover:shadow-[0_4px_18px_rgba(9,56,62,0.06)] transition-all duration-200 overflow-hidden"
                  >
                    <div className="flex flex-col gap-3 p-6 flex-1">
                      <span
                        className="self-start inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider"
                        style={{ backgroundColor: 'rgba(9,56,62,0.08)', color: '#09383e' }}
                      >
                        {post.category}
                      </span>

                      <h2 className="font-display font-semibold text-lg text-slate-900 leading-snug group-hover:text-[#09383e] transition-colors duration-200">
                        {post.title}
                      </h2>

                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
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
                        <span className="text-slate-600 text-xs truncate">{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 text-xs text-slate-400">
                        <span>{formatDate(post.date)}</span>
                        <span>&middot;</span>
                        <span>{post.readingTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
