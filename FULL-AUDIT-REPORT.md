# Mero Dafa — Full SEO Audit

**Site:** https://merodafa.com
**Audited:** 2026-05-08
**Stack detected:** Next.js (App Router), Cloudflare CDN, GA4 (G-5FM2BL5MXR), Inter + Lora fonts, hand-rolled MDX blog
**Indexable routes (live):** 5 + 3 blog posts = 8 URLs
**Business type detected:** B2B SaaS — vertical AI / RegTech for Nepal financial-legal compliance

---

## Executive Summary

**SEO Health Score: 38 / 100**

The site is technically a clean Next.js render (SSR HTML present, fast TTFB via Cloudflare, prerendered pages, 200 OK, 404 returns 404), but **it ships virtually no per-route SEO metadata**. Every URL — homepage, pricing, blog posts — returns the same `<title>` and `<meta description>`, and there is **zero structured data** anywhere on the site. Combined with a Cloudflare-managed `robots.txt` that blocks every major AI crawler (GPTBot, ClaudeBot, Google-Extended, Bytespider, CCBot, Apple Extended, Meta), Mero Dafa is currently invisible to both classical SERPs at the post level *and* to AI Overviews / ChatGPT / Claude / Perplexity citations. For a product whose entire wedge is "cited AI answers," this is an existential GTM gap.

The good news: every issue is fixable inside the existing Next.js codebase, most in <2 hours each, and the content (3 MDX posts on TDS rates, lost-hours research, weekly CA questions) is well-targeted and deserves to rank.

### Top 5 Critical Issues
1. **Duplicate metadata across all routes** — only [`app/layout.tsx`](app/layout.tsx) exports `metadata`; no route segment overrides it. Every page ships the homepage title.
2. **Zero JSON-LD structured data** — no `Organization`, `SoftwareApplication`, `Product`, `FAQPage`, `BreadcrumbList`, `Article`, `Offer` schema anywhere.
3. **AI crawlers blocked** in `robots.txt` (Cloudflare Managed Content) — GPTBot, ClaudeBot, Google-Extended, CCBot, Bytespider, Applebot-Extended, meta-externalagent, Amazonbot all `Disallow: /`. Plus `Content-Signal: ai-train=no`.
4. **Sitemap hardcoded to 5 URLs** in [`app/sitemap.ts`](app/sitemap.ts) — does not enumerate the 3 (and growing) blog posts. Blog content is effectively undiscoverable except through internal links.
5. **No canonical URLs** on any page (`<link rel="canonical">` absent everywhere). www subdomain returns HTTP 200 separately — duplicate-host risk.

### Top 5 Quick Wins
1. Add `generateMetadata` to `app/blog/[slug]/page.tsx` and `metadata` exports to the four other route pages — **resolves issues 1 + 5 in ~90 min**.
2. Add a `JsonLd` component and inject `Organization` + `SoftwareApplication` on the home, `Product`/`Offer` on `/pricing`, `Article` on blog posts.
3. Edit `robots.ts` to **explicitly allow** AI training/inference bots (override Cloudflare default), and ship `/llms.txt` + `/llms-full.txt`.
4. Convert `app/sitemap.ts` to dynamically include `getAllPosts()` slugs and use real `lastModified` from MDX frontmatter.
5. Set `metadataBase` correctly and add `alternates: { canonical }` per route.

---

## Score Breakdown

| Category | Weight | Raw | Weighted | Notes |
|---|---:|---:|---:|---|
| Technical SEO | 22% | 65 | 14.3 | Render OK, 404s OK, Cloudflare cache headers good. Penalised: no canonicals, hardcoded sitemap, no `lang` switching for bilingual claim. |
| Content Quality | 23% | 60 | 13.8 | 3 well-written MDX posts with real expertise; thin total volume; no author entity/E-E-A-T signals beyond a name string. |
| On-Page SEO | 20% | 25 | 5.0 | Catastrophic: every page same title/desc/OG. Pricing page missing H1 entirely. |
| Schema | 10% | 0 | 0.0 | No JSON-LD detected on any audited URL. |
| Performance (CWV) | 10% | 70 | 7.0 | Inferred from build output — prerendered, Cloudflare cache, Inter+Lora via next/font. PSI quota exhausted; recommend re-test post-fix. |
| AI Search Readiness | 10% | 5 | 0.5 | All major AI bots blocked; no llms.txt; no semantic markup; no FAQ blocks; descriptions duplicated. |
| Images | 5% | 50 | 2.5 | Homepage has 0 `<img>` (CSS/SVG-only design — neutral). OG image present. No image SEO opportunities surfaced. |
| **Total** | | | **43.1** | Rounded down to **38** after penalty for AI-search blocking on a product whose entire pitch is AI citations. |

---

## 1. Technical SEO

### What works
- Server returns valid SSR HTML (`x-nextjs-prerender: 1`, `x-nextjs-cache: HIT`).
- 200 OK on all 5 sitemap routes; non-existent routes return 404 cleanly.
- `robots.txt` exposes `Sitemap:` line correctly.
- Cloudflare in front, `Cache-Control: s-maxage=31536000` on home — TTFB will be excellent globally.
- `meta viewport` present.
- GA4 wired via `next/script` with `afterInteractive` strategy.

### Issues

| Severity | Finding | Evidence | Fix location |
|---|---|---|---|
| **Critical** | No `<link rel="canonical">` on any page. Risk: www.merodafa.com returns 200 OK independently — duplicate host. | `curl -I https://www.merodafa.com` → 200 OK; `<link rel="canonical">` absent in all 5 fetched pages | [`app/layout.tsx:11`](app/layout.tsx#L11) — add `alternates: { canonical: '/' }`; per-route metadata for the rest |
| **Critical** | Sitemap hardcoded to 5 URLs; misses all blog posts. | [`app/sitemap.ts`](app/sitemap.ts) is a static array; `/sitemap.xml` returns only home + 4 sections | [`app/sitemap.ts:5-13`](app/sitemap.ts#L5-L13) — call `getAllPosts()` and append |
| **High** | No `lastModified` accuracy — every URL stamped with `new Date()` (build time), not content time. | All 5 sitemap entries share `2026-04-16T20:13:02.690Z` | [`app/sitemap.ts`](app/sitemap.ts) — use MDX frontmatter `date` for posts, file `mtime` for static pages |
| **High** | No `metadataBase` mismatch but missing `alternates.canonical` declarations. | `metadataBase: new URL('https://merodafa.com')` is set in [`app/layout.tsx:12`](app/layout.tsx#L12) but no canonical alternates declared | Same |
| **High** | Bilingual claim ("Search in English; we find the answer in the original Nepali Rajpatra") not reflected in HTML — `<html lang="en">` is the only language declaration; no hreflang, no `/ne/` route. | [`app/layout.tsx:43`](app/layout.tsx#L43) | Decide: separate Nepali pages with hreflang OR drop the bilingual marketing claim until shipped |
| Medium | `keywords` meta tag still present. Google ignores; Bing partly weights. Low harm, low value. | [`app/layout.tsx:14`](app/layout.tsx#L14) | Remove (cosmetic) |
| Medium | No security headers visible from origin (`Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`). Cloudflare may add some. | `curl -I` output | Add via [`next.config.ts`](next.config.ts) `headers()` or Cloudflare Transform Rules |
| Low | GA4 script loaded `afterInteractive`. Fine, but tag ID hardcoded in source — not env-driven. | [`app/layout.tsx:46-54`](app/layout.tsx#L46-L54) | Optional: move to `process.env.NEXT_PUBLIC_GA_ID` |

---

## 2. On-Page SEO — the worst category

This is the single highest-leverage area to fix.

### Evidence
Live HTTP fetches of 5 pages, all return identical `<title>` and `<meta description>`:

| URL | Title returned | H1 |
|---|---|---|
| `/` | "Mero Dafa — AI Legal Research for Nepal" | "Your smart AI legal research partner." ✓ |
| `/pricing` | "Mero Dafa — AI Legal Research for Nepal" | **(none)** ✗ |
| `/how-it-works` | "Mero Dafa — AI Legal Research for Nepal" | "From question to…" ✓ |
| `/team` | "Mero Dafa — AI Legal Research for Nepal" | "Built by the people who…" ✓ |
| `/blog` | "Mero Dafa — AI Legal Research for Nepal" | "The Rajpatra…" ✓ |
| `/blog/tds-rates-…-2081…` | "Mero Dafa — AI Legal Research for Nepal" | "TDS Rates in Nepal (2081) — The Complete Reference" ✓ |
| `/blog/why-nepals-finance…` | "Mero Dafa — AI Legal Research for Nepal" | "Why Nepal's Finance Professionals Waste 40+ Hours…" ✓ |
| `/blog/5-questions…` | "Mero Dafa — AI Legal Research for Nepal" | "5 Questions Every CA Asks Weekly…" ✓ |

### Root cause
[`app/layout.tsx:11`](app/layout.tsx#L11) is the **only** file in `app/` that exports `metadata`. None of `pricing/page.tsx`, `how-it-works/page.tsx`, `team/page.tsx`, `blog/page.tsx`, or `blog/[slug]/page.tsx` exports its own `metadata` or implements `generateMetadata`. Next.js inherits the layout's metadata for every leaf, so every URL ships the homepage title.

### Required per-route metadata (proposed)

| Route | Title (≤60 chars) | Description (≤155 chars) |
|---|---|---|
| `/` (keep current) | "Mero Dafa — AI Legal Research for Nepal" | (current) |
| `/pricing` | "Mero Dafa Pricing — Plans for CAs, Audit Firms & Banks" | "Transparent firm-based pricing for Nepal's tax & compliance professionals. From Rs 1,999/mo for solo CAs to enterprise BFSI deployments." |
| `/how-it-works` | "How Mero Dafa Works — From Question to Cited Answer" | "See how Mero Dafa scrapes the Gazette, parses scanned PDFs, verifies with CAs, and answers your tax questions with section-level citations." |
| `/team` | "Team & Mission — Mero Dafa" | "Built by engineers, verified by CAs. Meet the team eliminating Nepal's compliance risk gap." |
| `/blog` | "Mero Dafa Blog — Nepal Tax & Compliance Analysis" | "Weekly analysis of Nepal Gazette updates, NRB circulars, IRD notices, and tax law changes — written for working CAs." |
| `/blog/[slug]` | `${post.title}` | `${post.excerpt}` (already in MDX frontmatter) |

### Other on-page issues
- **Pricing has no `<h1>`** — the page is rendering, but the heading is structured as `<h2>` or `<div>`. Search engines need an explicit single `<h1>` for ranking.
- **`<title>` brand-suffix pattern not applied** — recommend `Page Title — Mero Dafa` template via Next.js `title.template`.
- **No breadcrumb component** — blog posts deep-link as second-level URLs but show no breadcrumb trail (impacts AI citation eligibility and rich-result breadcrumb display).

---

## 3. Schema / Structured Data — currently zero

`grep "application/ld+json"` across all 8 fetched pages: **0 matches**.

### Recommended additions (priority order)

| Page | Schema type | Why |
|---|---|---|
| `/` (and via root layout) | `Organization` + `WebSite` with `SearchAction` | Establishes the entity, eligible for sitelinks search box |
| `/` body | `SoftwareApplication` (subtype: `BusinessApplication`) with `applicationCategory: "LegalService"` | Sets up Mero Dafa as a discoverable software product, surfaces in Google's Software/Tools facets |
| `/pricing` | `Product` + 3× `Offer` (Starter, Pro, Enterprise) | Price-rich snippets in SERPs |
| `/blog/[slug]` | `Article` (subtype `NewsArticle` if regulatory news, else `Article`) with `author` as `Person`, `publisher` as `Organization` | Eligible for Top Stories / Article rich results |
| `/blog` | `Blog` + list of `BlogPosting` items | Hub-page typing |
| `/how-it-works` | `FAQPage` (rephrase the 4 steps as Q&A) | High-value rich-result format |
| All non-home | `BreadcrumbList` | Breadcrumb trails in SERPs |
| `/team` | Per-member `Person` schema with `jobTitle`, `affiliation`, `sameAs` (LinkedIn) | Author E-E-A-T entity graph |

A reusable `<JsonLd data={...} />` server component should be added under `components/seo/JsonLd.tsx`. Each page injects only its relevant blocks. Organization + WebSite go in the root layout once.

---

## 4. AI Search Readiness — the strategic gap

For a product whose entire wedge is "Ask questions, get cited answers," the inability to be cited *by* AI search engines is a market-positioning own-goal.

### Evidence (from `/robots.txt`)
```
User-agent: GPTBot           Disallow: /
User-agent: ClaudeBot        Disallow: /
User-agent: Google-Extended  Disallow: /
User-agent: CCBot            Disallow: /
User-agent: Bytespider       Disallow: /
User-agent: Applebot-Extended Disallow: /
User-agent: meta-externalagent Disallow: /
User-agent: Amazonbot        Disallow: /
User-agent: CloudflareBrowserRenderingCrawler Disallow: /
Content-Signal: search=yes,ai-train=no
```

This is the default Cloudflare "AI Audit" or "Block AI Bots" feature output. It was almost certainly enabled by accident at the Cloudflare zone level — your custom `app/robots.ts` (which says `Allow: /` for `*`) is being **overridden by Cloudflare Managed robots.txt at the edge**.

### Impact
- **AI Overviews (Google SGE):** Cannot cite Mero Dafa pages. `Google-Extended` is the gate for AI training and grounding-citation eligibility.
- **ChatGPT browsing / OpenAI search:** Cannot cite. `GPTBot` and `OAI-SearchBot` excluded.
- **Claude / Anthropic:** Cannot cite or learn. `ClaudeBot` excluded.
- **Perplexity:** Likely fetched via `PerplexityBot` (not in your blocklist explicitly — depends on Cloudflare's evolving managed list).
- **Bing Chat / Copilot:** `Bingbot` not blocked → still works.

### `llms.txt`
- `https://merodafa.com/llms.txt` → **HTTP 404**.
- `llms.txt` is the emerging convention for declaring "what this site is and how AI agents should navigate it." Mero Dafa is exactly the kind of site that benefits from a curated index: a homepage description in plain markdown, a "core products" list, and a "knowledge base" pointer (each blog post as a one-liner).

### Citability of existing content
The blog content is well-suited to passage-level AI citation:
- TDS rates table is structured, directly answers a high-volume query.
- 40-hours-research piece is a clean problem/solution narrative.
- 5-questions piece is already Q&A-shaped (perfect for `FAQPage`).

But all of it is currently behind a wall.

---

## 5. Content Quality & E-E-A-T

### Inventory
3 MDX posts:
- `tds-rates-nepal-2081-complete-guide.mdx` (Sabin Adhikari, 2026-04-10) — strong commercial intent target
- `why-nepals-finance-professionals-waste-40-hours-a-month-on-legal-research.mdx` — top-of-funnel
- `5-questions-every-ca-asks-weekly-and-how-ai-answers-them.mdx` — Q&A, high citation potential

### Strengths
- Specific section references (e.g., "Sections 87–89", "Income Tax Act 2058", "Finance Act 2081") — strong **Expertise** signal, the "E" in E-E-A-T.
- Author byline present in MDX frontmatter.
- Genuine domain knowledge visible.

### Gaps
- **No author entity.** `author: "Sabin Adhikari"` is a string. No `/authors/[slug]` page, no `Person` schema, no LinkedIn `sameAs`, no credentials line ("CA, ICAN registered" or whatever applies). Google's E-E-A-T heavily weights author identity.
- **No `Article` schema** → loses Top Stories / Article rich-result eligibility.
- **No update timestamps shown.** Blog posts have a `date` but no `dateModified`. For tax content that changes annually with the Finance Act, "Last updated 2081-XX-XX" is a critical trust signal.
- **No internal "Related articles" / "Cited acts" sidebar.** Blog post template ([`app/blog/[slug]/page.tsx:99-117`](app/blog/[slug]/page.tsx#L99-L117)) has only a "Back to blog" link.
- **Blog content uses `dangerouslySetInnerHTML` from `marked()`** ([`app/blog/[slug]/page.tsx:96`](app/blog/[slug]/page.tsx#L96)). Functional, but you lose easy h2/h3-id slugging, table-of-contents, copy-link buttons, and per-section anchor URLs that AI search loves to cite. Consider `next-mdx-remote` or compiled MDX with `rehype-slug` + `rehype-autolink-headings`.
- **No FAQ blocks** in marketing pages despite obvious candidates ("Is my data sent to OpenAI?", "Do you cover NRB Unified Directives?", "Is the 2081 Finance Act fully indexed?").

### Volume problem
3 posts at 8 months pre-launch is a soft start. To compete in Nepal compliance SEO you need **30–50 indexed answer-shaped pages within 6 months**. See `CONTENT-CALENDAR.md` (separate, recommended next step).

---

## 6. Internal Linking & Site Architecture

### Observed
- Top nav: Home, How it Works, Pricing, Team, Blog (5 links).
- Blog index → blog posts → "Back to blog" only.
- No footer link map beyond "Documentation, ToS, Privacy, Newsletter" (per spec — not verified live in this audit).
- No "Related to TDS" or "Other tax guides" cross-links between the 3 blog posts.

### Issues
- Blog posts are **dead-end pages** — every internal link from a post goes back to `/blog`. No flow back to product pages (`/pricing`, `/how-it-works`) or laterally to other posts.
- No tag/category archive pages despite `category` existing in MDX frontmatter (`Tax Guide`).
- Pricing CTA block missing from blog post template — wastes the highest-intent moment.

---

## 7. Performance (Core Web Vitals)

PageSpeed Insights API hit daily quota during this audit; lab metrics not retrieved.

### Indirect signals (positive)
- Next.js prerender (`x-nextjs-prerender: 1`).
- Cloudflare edge cache (`x-nextjs-cache: HIT`, `cf-cache-status: DYNAMIC` on first hit, then HIT).
- Fonts via `next/font/google` ([`app/layout.tsx:8-9`](app/layout.tsx#L8-L9)) — automatic self-host + preload.
- No images on homepage → no LCP image risk.
- HTML body ~78KB compressed-equivalent → reasonable.

### Recommendations
- Re-run PageSpeed after fixes (or use `npx unlighthouse-cli --site https://merodafa.com`).
- Set explicit `display: 'swap'` on Google Fonts (already default for `next/font/google`, verify).
- Add `<Script>` GA tag with a consent gate before EU traffic begins (irrelevant for Nepal-first launch but flag for later).

---

## 8. International / Bilingual

The marketing claim is **"Search in English; we find the answer in the original Nepali Rajpatra."** This claim is **accurate** — the product genuinely supports bilingual search.

The gap is purely on the marketing site: `<html lang="en">`, zero Nepali HTML content, no `/ne/` routes, no `hreflang` annotations. So Google can't match Nepali queries (e.g., "टीडीएस दर नेपाल", "आयकर ऐन धारा ८८") to your pages even though the product would answer them.

Recommendation: add a Nepali mirror with `hreflang` annotations in Phase 2 — translate the 4 highest-intent pages first (home, how-it-works, pricing, top TDS guide). See `ACTION-PLAN.md` § M2.

---

## 9. Local / Maps

Mero Dafa is a SaaS product, not a local business — no GBP, NAP, citation, or maps audit applies. Skip the local-SEO subagent. If you eventually open a Kathmandu office and want to win "compliance software Nepal" map-pack queries, file a single Google Business Profile then; do not build location pages.

---

## 10. Backlinks (cursory)

Out-of-scope without API credentials, but a manual inspection suggestion: search `link:merodafa.com` and Google `"merodafa"` to count current mentions — this audit assumes near-zero referring domains given the pre-launch posture. Phase 3 of the roadmap should drive backlinks via:
- Guest posts on ICAN's website / The Kathmandu Post / Nepali Times tech section.
- Sponsorship of ICAN events.
- A free "TDS Calculator" or "VAT Threshold Checker" mini-tool — naturally linkable.

---

## 11. Drift / Monitoring

No baseline exists yet. After the action plan ships, run `claude-seo:seo-drift` baseline so future deploys can flag regressions (especially title/canonical/schema drift, which is exactly the failure mode that produced today's findings).

---

## Appendix A — Live HTTP fingerprint

```
HTTP/1.1 200 OK
Server: cloudflare
x-nextjs-prerender: 1
x-nextjs-cache: HIT
Cache-Control: s-maxage=31536000
X-Powered-By: Next.js
Vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch, Accept-Encoding
```

## Appendix B — Pages crawled (8)

`/`, `/pricing`, `/how-it-works`, `/team`, `/blog`,
`/blog/tds-rates-nepal-2081-complete-guide`,
`/blog/why-nepals-finance-professionals-waste-40-hours-a-month-on-legal-research`,
`/blog/5-questions-every-ca-asks-weekly-and-how-ai-answers-them`

## Appendix C — Files where fixes land

| File | Why |
|---|---|
| [`app/layout.tsx`](app/layout.tsx) | Add `title.template`, `alternates.canonical`, root JSON-LD (Organization + WebSite) |
| [`app/page.tsx`](app/page.tsx) | (No change needed if root metadata stays as homepage default — but add SoftwareApplication JSON-LD) |
| [`app/pricing/page.tsx`](app/pricing/page.tsx) | Export `metadata`; add `<h1>`; add Product+Offer JSON-LD |
| [`app/how-it-works/page.tsx`](app/how-it-works/page.tsx) | Export `metadata`; add FAQPage JSON-LD |
| [`app/team/page.tsx`](app/team/page.tsx) | Export `metadata`; add Person JSON-LD per member |
| [`app/blog/page.tsx`](app/blog/page.tsx) | Export `metadata`; add Blog JSON-LD |
| [`app/blog/[slug]/page.tsx`](app/blog/[slug]/page.tsx) | Add `generateMetadata`; add Article JSON-LD; add BreadcrumbList; add related-posts block |
| [`app/sitemap.ts`](app/sitemap.ts) | Replace static array with dynamic enumeration via `getAllPosts()` + per-page `lastModified` |
| [`app/robots.ts`](app/robots.ts) | Explicitly allow GPTBot/ClaudeBot/Google-Extended; **also requires Cloudflare zone change** |
| [`app/llms.txt/route.ts`](app/llms.txt/route.ts) (new) | Create `/llms.txt` route handler |
| [`components/seo/JsonLd.tsx`](components/seo/JsonLd.tsx) (new) | Reusable JSON-LD injector |
| [`lib/seo/schema.ts`](lib/seo/schema.ts) (new) | Schema builder helpers (`buildOrganization`, `buildArticle`, `buildOffer`, …) |
| [`next.config.ts`](next.config.ts) | Add security headers, optional `trailingSlash` decision |

See `ACTION-PLAN.md` for the prioritized execution order.
