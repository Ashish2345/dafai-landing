import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
]

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
  // Rewrite the canonical asset URLs to the dynamic next/og generators in
  // app/api/*. Keeps the externally-advertised URLs (og:image, logo schema)
  // stable while letting us iterate on the image design in code.
  async rewrites() {
    return [
      { source: '/og-image.png', destination: '/api/og-image' },
      { source: '/logo.png', destination: '/api/logo' },
    ]
  },
};

export default nextConfig;
