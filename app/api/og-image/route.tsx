import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const contentType = 'image/png'

// 1200×630 — the standard Open Graph / Twitter summary_large_image size.
export const size = { width: 1200, height: 630 }

const TEAL = '#09383e'
const TEAL_LIGHT = '#0d4f57'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: `linear-gradient(135deg, ${TEAL} 0%, ${TEAL_LIGHT} 100%)`,
          color: 'white',
          padding: '80px',
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        {/* Decorative gradient orb top-right */}
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            right: '-200px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)',
          }}
        />

        {/* Top kicker pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '20px',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div
            style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: '#2DD4BF',
              marginRight: '14px',
            }}
          />
          AI Legal Research for Nepal
        </div>

        {/* Brand wordmark */}
        <div
          style={{
            display: 'flex',
            marginTop: '60px',
            fontSize: '120px',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}
        >
          merodafa
        </div>

        {/* Tagline */}
        <div
          style={{
            display: 'flex',
            marginTop: '32px',
            fontSize: '36px',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.85)',
            maxWidth: '900px',
            lineHeight: 1.3,
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          Cited answers from the Nepal Gazette, NRB directives, and IRD circulars — in seconds.
        </div>

        {/* Bottom metadata row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 'auto',
            paddingTop: '40px',
            borderTop: '1px solid rgba(255,255,255,0.15)',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: '24px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.65)',
            }}
          >
            merodafa.com
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '22px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            <span style={{ display: 'flex' }}>For CAs · Banking · Tax Lawyers</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    },
  )
}
