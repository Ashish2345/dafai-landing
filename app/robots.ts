import type { MetadataRoute } from 'next'

// NOTE: Cloudflare's "Block AI Bots / AI Audit" feature can override this file
// at the edge. Verify with `curl https://merodafa.com/robots.txt` after deploy
// — if a "Cloudflare Managed content" block appears, disable AI Audit in the
// Cloudflare dashboard (Security → Settings → Block AI Bots).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      // Explicit allowlist for AI crawlers — Mero Dafa wants AI search citations.
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'Amazonbot', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
      { userAgent: 'meta-externalagent', allow: '/' },
    ],
    sitemap: 'https://merodafa.com/sitemap.xml',
    host: 'https://merodafa.com',
  }
}
