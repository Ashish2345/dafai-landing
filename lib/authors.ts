export type Author = {
  slug: string
  name: string
  role: string
  credentials?: string
  bio: string
  shortBio: string
  photo?: string
  initials: string
  linkedin?: string
  twitter?: string
  email?: string
}

export const AUTHORS: Record<string, Author> = {
  'aashish-rayamajhi': {
    slug: 'aashish-rayamajhi',
    name: 'Aashish Rayamajhi',
    role: 'Co-founder & CTO, Mero Dafa',
    bio:
      "Aashish builds the AI and infrastructure behind Mero Dafa. His focus is on retrieval systems for legal text, hierarchy-aware reasoning over Nepal's tax acts and directives, and making scanned Gazette PDFs searchable at the section level. He writes about how AI changes the day-to-day of finance professionals — and where it still falls short.",
    shortBio:
      "Builds the AI and infrastructure behind Mero Dafa. Writes about retrieval, citations, and how AI changes a CA's workday.",
    photo: '/team/aashish-rayamajhi.jpg',
    initials: 'AR',
    email: 'aashish@merodafa.com',
  },
  'sabin-adhikari': {
    slug: 'sabin-adhikari',
    name: 'Sabin Adhikari',
    role: 'Co-founder & CA, Mero Dafa',
    credentials: 'CA',
    bio:
      "Sabin is a practicing Chartered Accountant who reviews how Mero Dafa interprets Nepal's tax law. He writes the Tax Guide series — covering the Income Tax Act 2058, every Finance Act amendment, NRB directives, and IRD circulars — translating regulatory change into what working CAs actually need to do differently this week.",
    shortBio:
      "Practicing CA. Reviews Mero Dafa's legal interpretations and writes the Tax Guide series for working CAs.",
    photo: '/team/sabin-adhikari.jpg',
    initials: 'SA',
    email: 'sabin@merodafa.com',
  },
}

const NAME_TO_SLUG: Record<string, string> = Object.fromEntries(
  Object.values(AUTHORS).map((a) => [a.name, a.slug]),
)

export function getAuthorByName(name: string): Author | null {
  const slug = NAME_TO_SLUG[name]
  if (!slug) return null
  return AUTHORS[slug] ?? null
}

export function getAuthorBySlug(slug: string): Author | null {
  return AUTHORS[slug] ?? null
}

export function getAllAuthors(): Author[] {
  return Object.values(AUTHORS)
}
