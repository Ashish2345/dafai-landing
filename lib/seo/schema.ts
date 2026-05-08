export const SITE_URL = 'https://merodafa.com'
export const ORG_ID = `${SITE_URL}/#org`
export const WEBSITE_ID = `${SITE_URL}/#website`

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Mero Dafa',
    alternateName: 'MeroDafa',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "AI legal research for Nepal — hierarchy-aware answers with section-level citations from the Nepal Gazette, NRB directives, and IRD circulars.",
    email: 'support@merodafa.com',
    telephone: '+977-9823380132',
    areaServed: { '@type': 'Country', name: 'Nepal' },
    sameAs: [],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: 'Mero Dafa',
    publisher: { '@id': ORG_ID },
    inLanguage: 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function softwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Mero Dafa',
    description:
      "Nepal's first hierarchy-aware AI for financial-legal compliance. Ask questions, get cited answers, and view the original Nepal Gazette side-by-side.",
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'LegalResearch',
    operatingSystem: 'Web',
    url: SITE_URL,
    publisher: { '@id': ORG_ID },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'NPR',
      lowPrice: '1999',
      highPrice: '7999',
      offerCount: 3,
    },
    audience: {
      '@type': 'BusinessAudience',
      audienceType:
        'Chartered Accountants, Banking Compliance Heads, CFOs, Tax Lawyers',
    },
    featureList: [
      'Hierarchy-aware legal reasoning',
      'Section-level citations',
      'Original Gazette side-by-side view',
      'Bilingual (English & Nepali) search',
      'Table extraction from scanned PDFs',
      'Amended-in-place law tracking',
    ],
  }
}

type PricingPlan = {
  name: string
  description: string
  priceNpr: string | null
  url: string
}

export function pricingProductSchema(plans: PricingPlan[]) {
  const concrete = plans.filter((p) => p.priceNpr !== null)
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Mero Dafa',
    description: 'AI legal research subscription for Nepal compliance professionals.',
    brand: { '@id': ORG_ID },
    offers: plans.map((p) =>
      p.priceNpr === null
        ? {
            '@type': 'Offer',
            name: p.name,
            description: p.description,
            url: p.url,
            priceSpecification: {
              '@type': 'PriceSpecification',
              priceCurrency: 'NPR',
            },
            availability: 'https://schema.org/InStock',
          }
        : {
            '@type': 'Offer',
            name: p.name,
            description: p.description,
            url: p.url,
            price: p.priceNpr,
            priceCurrency: 'NPR',
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: p.priceNpr,
              priceCurrency: 'NPR',
              referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
            },
            availability: 'https://schema.org/InStock',
          },
    ),
    ...(concrete.length > 0 && {
      aggregateOffer: {
        '@type': 'AggregateOffer',
        priceCurrency: 'NPR',
        lowPrice: concrete[0].priceNpr,
        highPrice: concrete[concrete.length - 1].priceNpr,
        offerCount: plans.length,
      },
    }),
  }
}

type FaqItem = { question: string; answer: string }

export function faqPageSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  }
}

type BreadcrumbItem = { name: string; url: string }

export function breadcrumbListSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      item: it.url,
    })),
  }
}

type ArticleAuthor = {
  name: string
  slug?: string
  role?: string
  url?: string
}

type ArticleParams = {
  title: string
  description: string
  slug: string
  author: string | ArticleAuthor
  datePublished: string
  dateModified?: string
  category?: string
}

function buildAuthor(a: string | ArticleAuthor) {
  if (typeof a === 'string') {
    return { '@type': 'Person', name: a }
  }
  return {
    '@type': 'Person',
    name: a.name,
    ...(a.slug && { '@id': `${SITE_URL}/authors/${a.slug}` }),
    ...(a.url && { url: a.url }),
    ...(a.role && { jobTitle: a.role }),
  }
}

export function articleSchema(p: ArticleParams) {
  const url = `${SITE_URL}/blog/${p.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.title,
    description: p.description,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    author: buildAuthor(p.author),
    publisher: { '@id': ORG_ID },
    datePublished: p.datePublished,
    dateModified: p.dateModified ?? p.datePublished,
    inLanguage: 'en',
    image: `${SITE_URL}/og-image.png`,
    ...(p.category && { articleSection: p.category }),
  }
}

type AuthorPersonParams = {
  name: string
  slug: string
  role: string
  bio: string
  credentials?: string
  email?: string
  linkedin?: string
  twitter?: string
}

export function authorPersonSchema(p: AuthorPersonParams) {
  const sameAs: string[] = []
  if (p.linkedin) sameAs.push(p.linkedin)
  if (p.twitter) sameAs.push(p.twitter)
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/authors/${p.slug}`,
    name: p.name,
    jobTitle: p.role,
    description: p.bio,
    url: `${SITE_URL}/authors/${p.slug}`,
    worksFor: { '@id': ORG_ID },
    ...(p.credentials && { honorificSuffix: p.credentials }),
    ...(p.email && { email: p.email }),
    ...(sameAs.length > 0 && { sameAs }),
  }
}

type TeamMember = { name: string; role: string; bio: string }

export function teamPersonSchemas(members: TeamMember[]) {
  return members.map((m) => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: m.name,
    jobTitle: m.role,
    description: m.bio,
    worksFor: { '@id': ORG_ID },
  }))
}

type HowToStep = { name: string; text: string; url?: string }

export function howToSchema(p: {
  name: string
  description: string
  totalTimeIso?: string
  url: string
  steps: HowToStep[]
  tools?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: p.name,
    description: p.description,
    ...(p.totalTimeIso && { totalTime: p.totalTimeIso }),
    url: p.url,
    ...(p.tools && p.tools.length > 0 && {
      tool: p.tools.map((name) => ({ '@type': 'HowToTool', name })),
    }),
    step: p.steps.map((s, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: s.name,
      text: s.text,
      ...(s.url && { url: s.url }),
    })),
  }
}

export function softwareToolSchema(p: {
  name: string
  url: string
  description: string
  applicationCategory?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: p.name,
    url: p.url,
    description: p.description,
    applicationCategory: p.applicationCategory ?? 'FinanceApplication',
    operatingSystem: 'Web',
    publisher: { '@id': ORG_ID },
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'NPR',
    },
  }
}

export function blogListSchema(posts: { slug: string; title: string; excerpt: string; date: string; author: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog`,
    url: `${SITE_URL}/blog`,
    name: 'Mero Dafa Blog — Nepal Tax & Compliance Analysis',
    publisher: { '@id': ORG_ID },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.excerpt,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.date,
      author: { '@type': 'Person', name: p.author },
    })),
  }
}
