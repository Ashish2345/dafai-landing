import { marked, type Tokens } from 'marked'

export type TocEntry = { depth: 2 | 3; text: string; slug: string }

// Devanagari-friendly slugger: keep [\p{L}\p{N}], drop other punctuation,
// collapse whitespace into hyphens.
function slugifyUnicode(text: string): string {
  const cleaned = text
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z]+;/gi, '')
    .toLowerCase()
    .trim()
  const slug = cleaned
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
  return slug || 'section'
}

/**
 * Render markdown to HTML and emit a flat ToC of H2/H3 headings.
 *
 * Strategy: parse markdown twice — once with the default renderer to get HTML,
 * then post-process the HTML with a regex pass that injects `id="<slug>"` on
 * every <h2> and <h3> and wraps the inner text in an anchor link. Capturing
 * the headings via the lexer also feeds the ToC array.
 *
 * Why post-process instead of a Renderer override? marked v18's renderer
 * inline-rendering path is awkward and easy to break across versions; a
 * regex pass over a known-shape <h2>…</h2> is small, fast, and stable.
 */
export function renderMarkdown(md: string): { html: string; toc: TocEntry[] } {
  // 1. Walk tokens to collect H2/H3 plaintext for the ToC, in document order.
  const tokens = marked.lexer(md)
  const headingPlain: { depth: 2 | 3; text: string }[] = []
  for (const tok of tokens) {
    if (tok.type === 'heading') {
      const h = tok as Tokens.Heading
      if (h.depth === 2 || h.depth === 3) {
        headingPlain.push({ depth: h.depth as 2 | 3, text: h.text })
      }
    }
  }

  // 2. Generate unique slugs for the ToC entries.
  const seen = new Map<string, number>()
  const toc: TocEntry[] = headingPlain.map(({ depth, text }) => {
    const base = slugifyUnicode(text)
    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)
    const slug = count === 0 ? base : `${base}-${count + 1}`
    return { depth, text, slug }
  })

  // 3. Render to HTML with the default renderer, then inject ids + anchors.
  let html = marked.parse(md, { async: false }) as string

  // Rebuild a separate slug counter for the regex pass so it re-derives
  // identical slugs in the same document order.
  const seenInPass = new Map<string, number>()
  html = html.replace(
    /<h([23])>([\s\S]*?)<\/h\1>/g,
    (match, levelStr: string, inner: string) => {
      const depth = Number(levelStr) as 2 | 3
      // strip tags to compute slug
      const plain = inner.replace(/<[^>]+>/g, '').replace(/&[a-z]+;/gi, '').trim()
      const base = slugifyUnicode(plain)
      const count = seenInPass.get(base) ?? 0
      seenInPass.set(base, count + 1)
      const slug = count === 0 ? base : `${base}-${count + 1}`
      return `<h${depth} id="${slug}"><a class="heading-anchor" href="#${slug}" aria-label="Link to ${plain}">${inner}</a></h${depth}>`
    },
  )

  return { html, toc }
}
