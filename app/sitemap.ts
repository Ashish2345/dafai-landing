import type { MetadataRoute } from 'next'

const BASE_URL = 'https://merodafa.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, lastModified: new Date() },
    { url: `${BASE_URL}/how-it-works`, lastModified: new Date() },
    { url: `${BASE_URL}/pricing`, lastModified: new Date() },
    { url: `${BASE_URL}/blog`, lastModified: new Date() },
    { url: `${BASE_URL}/team`, lastModified: new Date() },
  ]
}
