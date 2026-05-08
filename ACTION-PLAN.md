# Mero Dafa — SEO Action Plan

Prioritized fix list with file references, effort estimates, and concrete code patterns. Execute top-to-bottom; items inside the same priority bucket are mostly independent and can be parallelized.

Effort key: **S** = ≤30 min, **M** = ≤2 hr, **L** = half-day.

---

## 🔴 Critical — fix this week

### C1. Per-route metadata (M, ~90 min)
**Why:** Every URL on the site currently ships the homepage `<title>` and meta description. Without unique titles, blog posts will never rank for their actual topics, and the pricing page will never rank for "[brand] pricing" queries.

**Where:** [`app/layout.tsx`](app/layout.tsx), and one new `metadata` export in each of:
[`app/pricing/page.tsx`](app/pricing/page.tsx), [`app/how-it-works/page.tsx`](app/how-it-works/page.tsx), [`app/team/page.tsx`](app/team/page.tsx), [`app/blog/page.tsx`](app/blog/page.tsx), and a `generateMetadata` in [`app/blog/[slug]/page.tsx`](app/blog/[slug]/page.tsx).

**1a. Update root layout to use a title template** ([`app/layout.tsx:11`](app/layout.tsx#L11)):

```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://merodafa.com'),
  title: {
    default: 'Mero Dafa — AI Legal Research for Nepal',
    template: '%s — Mero Dafa',
  },
  description: "Ask questions about Nepal's tax acts, NRB directives, and IRD circulars. Get AI-powered answers with exact citations, page numbers, and section references — in English or Nepali.",
  alternates: { canonical: '/' },
  // …rest unchanged
}
```

**1b. Add to each static route page**, e.g. `app/pricing/page.tsx`:

```ts
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Pricing — Plans for CAs, Audit Firms & Banks',
  description: "Transparent firm-based pricing for Nepal's tax & compliance professionals. From Rs 1,999/mo for solo CAs to enterprise BFSI deployments.",
  alternates: { canonical: '/pricing' },
}
```

(Repeat with the titles/descriptions tabled in `FULL-AUDIT-REPORT.md` § 2.)

**1c. Add `generateMetadata` to** [`app/blog/[slug]/page.tsx:6`](app/blog/[slug]/page.tsx#L6):

```ts
import type { Metadata } from 'next'

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}
```

---

### C2. Restore AI-crawler access (S, but requires Cloudflare dashboard, ~20 min)
**Why:** Mero Dafa's positioning is "AI legal research with citations." Yet `https://merodafa.com/robots.txt` blocks GPTBot, ClaudeBot, Google-Extended, CCBot, Bytespider, Applebot-Extended, meta-externalagent, and Amazonbot. The block is being added by Cloudflare's Managed Content (the "Block AI Bots" feature), not by your `app/robots.ts`. Your custom rule (`Allow: /`) is appended after the managed block.

**Action — Cloudflare side (must be done by an admin of the zone):**
1. Log into Cloudflare → `merodafa.com` zone → **Security → Settings → Block AI Bots / AI Audit**.
2. Set to **Disabled** (or in "AI Audit" mode set policies per-bot to *Allow*: GPTBot, ClaudeBot, OAI-SearchBot, PerplexityBot, Google-Extended, anthropic-ai).
3. Cloudflare → **Scrape Shield → Hotlink Protection / robots.txt Generator** — make sure no managed `robots.txt` is being injected.

**Action — code side** ([`app/robots.ts`](app/robots.ts)): make your own intent explicit so future Cloudflare changes don't silently override:

```ts
import type { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      // Explicit allowlist for AI crawlers we want citing Mero Dafa
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
    ],
    sitemap: 'https://merodafa.com/sitemap.xml',
  }
}
```

Note: `app/robots.ts` is only authoritative when Cloudflare isn't injecting its own. Verify with `curl https://merodafa.com/robots.txt` post-deploy — the "Cloudflare Managed Content" header block must be gone.

---

### C3. Dynamic sitemap with all blog posts (S, ~30 min)
**Why:** Live `/sitemap.xml` lists 5 URLs and misses every blog post.

**Where:** [`app/sitemap.ts`](app/sitemap.ts):

```ts
import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/mdx'

const BASE_URL = 'https://merodafa.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                     lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/how-it-works`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/pricing`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/blog`,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/team`,           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]
  const posts: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))
  return [...staticPages, ...posts]
}
```

If you add a `dateModified` frontmatter field later (recommended — see C5), use that for `lastModified` instead.

---

### C4. JSON-LD structured data (M, ~2 hr)
**Why:** Zero structured data on any page. This is the highest-ROI fix for both classical SERPs (rich results) and AI search (entity grounding).

**4a. Create reusable JsonLd component** at `components/seo/JsonLd.tsx`:

```tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

**4b. Add Organization + WebSite to root** ([`app/layout.tsx`](app/layout.tsx) inside `<body>`):

```tsx
<JsonLd data={{
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://merodafa.com/#org',
      name: 'Mero Dafa',
      url: 'https://merodafa.com',
      logo: 'https://merodafa.com/logo.png',
      sameAs: [/* twitter, linkedin, github */],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://merodafa.com/#website',
      url: 'https://merodafa.com',
      name: 'Mero Dafa',
      publisher: { '@id': 'https://merodafa.com/#org' },
    },
  ],
}} />
```

**4c. Add SoftwareApplication on home** ([`app/page.tsx`](app/page.tsx)):

```ts
{
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Mero Dafa',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'LegalResearch',
  operatingSystem: 'Web',
  offers: { '@type': 'AggregateOffer', priceCurrency: 'NPR', lowPrice: '1999', highPrice: '7999' },
  audience: { '@type': 'BusinessAudience', audienceType: 'Chartered Accountants, Banking Compliance, CFOs, Tax Lawyers' },
  areaServed: { '@type': 'Country', name: 'Nepal' },
}
```

**4d. Add Product + 3 Offers on `/pricing`** — one Offer per plan (Starter Rs 1,999, Pro Rs 7,999, Enterprise contact-sales).

**4e. Add Article on `/blog/[slug]`** ([`app/blog/[slug]/page.tsx`](app/blog/[slug]/page.tsx)):

```ts
{
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  description: post.excerpt,
  author: { '@type': 'Person', name: post.author },
  datePublished: post.date,
  publisher: { '@id': 'https://merodafa.com/#org' },
  mainEntityOfPage: `https://merodafa.com/blog/${post.slug}`,
}
```

**4f. Add FAQPage on `/how-it-works`** — convert the 4-step explanation into Q&A pairs.

**4g. Add BreadcrumbList everywhere except home.**

Validate each at https://search.google.com/test/rich-results before deploy.

---

### C5. Pricing page H1 (S, ~10 min)
**Why:** `/pricing` returns no `<h1>` element at all. Search engines and screen readers both penalize this.

**Where:** [`app/pricing/page.tsx`](app/pricing/page.tsx) — wrap the top heading with `<h1>` and demote any duplicate `<h2>` if present.

---

## 🟠 High — fix within 2 weeks

### H1. Add `/llms.txt` (S, ~30 min)
Create `app/llms.txt/route.ts`:

```ts
import { getAllPosts } from '@/lib/mdx'

export const dynamic = 'force-static'

export async function GET() {
  const posts = getAllPosts()
  const body = `# Mero Dafa

> AI legal research for Nepal — ask questions about tax acts, NRB directives, and IRD circulars. Get cited answers with exact section references.

## About
Mero Dafa is a hierarchy-aware AI for Nepali financial professionals. Built for CAs, banking compliance heads, CFOs, and tax lawyers. We index the Nepal Gazette, NRB directives, and IRD circulars and surface section-level citations alongside scanned source images.

## Core pages
- [Home](https://merodafa.com): Product overview
- [How It Works](https://merodafa.com/how-it-works): Scrape → Parse → Verify → Answer
- [Pricing](https://merodafa.com/pricing): Starter (Rs 1,999/mo), Pro (Rs 7,999/mo), Enterprise
- [Team](https://merodafa.com/team): Engineers + CA verification network

## Blog
${posts.map((p) => `- [${p.title}](https://merodafa.com/blog/${p.slug}): ${p.excerpt}`).join('\n')}
`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
```

Optionally also ship `/llms-full.txt` with the full markdown of every blog post.

---

### H2. Author entity & E-E-A-T ✅ DONE
Implemented:
- `lib/authors.ts` — author registry keyed by slug (`aashish-rayamajhi`, `sabin-adhikari`) with role, credentials, bio, photo, contact channels.
- `lib/mdx.ts` — resolves the MDX `author:` string to the registry entry (`PostMeta.authorEntity`); also reads optional `dateModified:` frontmatter.
- `app/authors/[slug]/page.tsx` — author profile pages with bio, social links, and a list of their articles.
- `lib/seo/schema.ts` — `authorPersonSchema()` for author pages, plus a richer `articleSchema` whose `author` is a `Person` with `@id` pointing to the author page (entity graph).
- `app/blog/[slug]/page.tsx` — author byline links to `/authors/{slug}`, "Last updated …" appears when `dateModified` differs from `date`, full author bio card at the end of every post.
- `app/sitemap.ts` — author pages included; blog `lastModified` now respects `dateModified` if set.

To use `dateModified` going forward, add it to MDX frontmatter when you revise a post:

```yaml
---
title: "TDS Rates in Nepal (2081) — The Complete Reference"
date: "2026-04-10"
dateModified: "2026-05-08"   # add when content materially changes
excerpt: "..."
author: "Sabin Adhikari"
category: "Tax Guide"
---
```

---

### H3. Anchor links + table of contents on blog posts ✅ DONE
Implemented in [`lib/markdown.ts`](lib/markdown.ts) — kept the existing `marked` dependency (no new packages), added a post-render regex pass that:
- Injects `id="<slug>"` on every H2 and H3 (Devanagari-friendly slugger so Nepali headings get readable slugs).
- Wraps each heading in an `<a class="heading-anchor" href="#slug">` for click-to-copy linking.
- Returns a flat ToC array consumed by the blog post page.

The blog post page now renders a sticky desktop ToC sidebar (auto-hidden on mobile), and `scroll-margin-top: 6rem` is set on heading elements so anchor jumps don't hide under the navbar.

Each section is now citable as `https://merodafa.com/blog/{post}#{section-slug}` — exactly what AI engines and Reddit/Twitter quote-shares need.

---

### H4. Related posts + product CTA on every blog post ✅ DONE
Implemented in `app/blog/[slug]/page.tsx`:
- 2 related cards (same `category`, excluding self; falls back to most-recent if same-category yields fewer than 2).
- "Stop hunting through PDFs" CTA card linking to `/pricing`.

---

### H5. Canonical URLs everywhere ✅ DONE
Every route now exports `alternates.canonical`. Verified in the production build artifacts.

---

### H6. Decide www vs apex (S, ~15 min) — *requires Cloudflare admin*
`https://www.merodafa.com` returns 200 OK independently. Add a Cloudflare Page Rule: `www.merodafa.com/*` → 301 → `https://merodafa.com/$1`. Or deal with it via your DNS host's redirect feature. (Cannot be done in code — needs zone-level access.)

---

## 🟡 Medium — fix within 4 weeks

### M1. Security headers (S, ~30 min)
Add to [`next.config.ts`](next.config.ts):

```ts
async headers() {
  return [{
    source: '/:path*',
    headers: [
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ],
  }]
}
```

### M2. Add Nepali landing + hreflang (M, ~half-day) — *bilingual product is real*
The product supports bilingual search (English ↔ Nepali) — confirmed by the team. The gap is that the marketing site is English-only HTML, so Google has no Nepali signal to match Nepali queries to.

Action:
1. Create `app/(ne)/page.tsx` (or `app/ne/page.tsx`) with a Nepali-translated home + how-it-works.
2. Add `<link rel="alternate" hreflang="en" href="https://merodafa.com/" />` and `<link rel="alternate" hreflang="ne-NP" href="https://merodafa.com/ne/" />` plus `hreflang="x-default"` on both versions — wire via Next.js `metadata.alternates.languages`:

```ts
alternates: {
  canonical: '/',
  languages: {
    'en': '/',
    'ne-NP': '/ne',
    'x-default': '/',
  },
}
```

3. Translate the 4 highest-intent pages first: `/`, `/how-it-works`, `/pricing`, top blog post (TDS guide).
4. Update sitemap to include both language versions.

This is a half-day for translation + a second half-day to wire. Worth doing in Phase 2 — pulls in the Nepali long-tail (e.g., "नेपालमा टीडीएस दर", "आयकर ऐन २०५८ धारा").

### M3. Tag/category archive pages (M, ~half-day)
The MDX `category` field exists but no `/blog/category/[slug]` route. Add one — improves topical authority and gives Google more pages to index per content piece.

### M4. Footer link map (S, ~30 min)
Verify the footer links to: Documentation, ToS, Privacy, Newsletter (per spec). Add: Sitemap (HTML), Contact, Status page once these exist.

### M5. Re-run PageSpeed + Lighthouse (S, ~15 min)
Once daily PSI quota resets or via Lighthouse locally:
```
npx unlighthouse-cli --site https://merodafa.com
```
Target: LCP < 2.5s mobile, INP < 200ms, CLS < 0.1.

### M6. Add OG images per blog post (M, ~2 hr)
Currently every page returns the same `/og-image.png`. Use Next.js `opengraph-image.tsx` route convention or `@vercel/og` to generate per-post OG images at build time pulling from the title + author + date.

---

## 🟢 Low — backlog

- Remove `keywords` meta tag (Google ignores it; ranks slightly negative on aggressive SEO heuristics).
- Move GA4 ID to `NEXT_PUBLIC_GA_ID` env var.
- Add HTML `Sitemap` page (`/sitemap`) for users — different from `/sitemap.xml`.
- Set up `claude-seo:seo-drift` baseline so deploy regressions get caught (`npx claude-seo seo-drift baseline https://merodafa.com`).
- Consider migrating blog from `marked` + `dangerouslySetInnerHTML` to compiled MDX for richer components (callouts, embeds).

---

## Suggested execution order (1 week sprint)

| Day | Tasks |
|---|---|
| Mon AM | C2 (Cloudflare AI bot allowlist — coordinate with admin) |
| Mon PM | C1 (per-route metadata for 5 static pages + blog slug) |
| Tue AM | C5 (pricing H1) + C3 (dynamic sitemap) + H6 (www redirect) |
| Tue PM | C4a + C4b (JsonLd component + root Organization/WebSite) |
| Wed | C4c–C4g (per-page schema: SoftwareApplication, Product/Offers, Article, FAQPage, BreadcrumbList) |
| Thu | H1 (`/llms.txt`) + H4 (related posts + CTA) + H5 (canonical verify) |
| Fri | H2 (author entity, `dateModified`, Person schema) — start; M1 security headers |

After Friday: validate with Google Rich Results Test on every page type, request re-indexing in Search Console, baseline a drift snapshot.

---

## Validation checklist (run after every fix)

- [ ] `curl -sL https://merodafa.com/$page | grep -E '<title>|name="description"|rel="canonical"'` returns unique values per page.
- [ ] `curl -sL https://merodafa.com/sitemap.xml | grep -c '<url>'` returns 8+ (5 static + ≥3 blog).
- [ ] `curl -sL https://merodafa.com/robots.txt` shows no `Disallow` for GPTBot/ClaudeBot/Google-Extended.
- [ ] `curl -sL https://merodafa.com/llms.txt` returns 200 with markdown body.
- [ ] Google Rich Results Test passes for: home, pricing, one blog post, how-it-works.
- [ ] `<h1>` count = 1 on every page (use `grep -c '<h1' page.html`).
- [ ] PageSpeed Insights mobile ≥85 perf, ≥95 SEO.

Once all green, expected SEO Health Score: **85+** (from current 38).
