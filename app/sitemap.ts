import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/mdx'
import { getAllAuthors } from '@/lib/authors'
import { LIVE_TOOLS } from '@/lib/tools-registry'

const BASE_URL = 'https://merodafa.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/how-it-works`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/team`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/tools`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    ...LIVE_TOOLS.map((t) => ({
      url: `${BASE_URL}/tools/${t.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.95,
    })),
  ]

  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.dateModified ?? post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const authors: MetadataRoute.Sitemap = getAllAuthors().map((a) => ({
    url: `${BASE_URL}/authors/${a.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [...staticPages, ...posts, ...authors]
}
