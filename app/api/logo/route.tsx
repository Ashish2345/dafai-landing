import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const contentType = 'image/png'

// Square logo for Organization schema. 512×512 — fits Google's
// Knowledge-Graph logo guidance (must be ≥112×112, ideally square,
// readable at small sizes).
export const size = { width: 512, height: 512 }

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
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${TEAL} 0%, ${TEAL_LIGHT} 100%)`,
          color: 'white',
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        {/* Subtle radial accent */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
          }}
        />
        {/* Stacked monogram + wordmark */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: '300px',
              fontWeight: 700,
              letterSpacing: '-0.08em',
              lineHeight: 1,
            }}
          >
            md
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '36px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.65)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            merodafa
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
