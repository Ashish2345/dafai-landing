import type { Metadata } from 'next'

const SITE_NAME = 'Mero Dafa'
const DEFAULT_OG_IMAGE = '/og-image.png'
const DEFAULT_LOCALE = 'en_NP'

type OgType = 'website' | 'article' | 'profile'

type SocialMetaInput = {
  title: string
  description: string
  url: string
  type?: OgType
  image?: string
}

// Next.js Metadata API replaces (does not merge) the openGraph and twitter
// objects when a child page sets them. Use this helper to ensure every page
// emits a complete og:image / og:site_name / og:locale + matching twitter card.
export function socialMeta(o: SocialMetaInput): Pick<Metadata, 'openGraph' | 'twitter'> {
  const image = o.image ?? DEFAULT_OG_IMAGE
  return {
    openGraph: {
      title: o.title,
      description: o.description,
      url: o.url,
      type: o.type ?? 'website',
      siteName: SITE_NAME,
      locale: DEFAULT_LOCALE,
      images: [{ url: image, width: 1200, height: 630, alt: o.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: o.title,
      description: o.description,
      images: [image],
    },
  }
}
