import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || 'ClarityPath'
  const subtitle = searchParams.get('subtitle') || 'Better Choices, Elevated Energy, Easier Life'
  const icon = searchParams.get('icon') || ''
  const type = searchParams.get('type') || 'default' // default | archetype | blog

  // Read background image
  const bgUrl = new URL('/og-background.png', req.url).toString()

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          position: 'relative',
        }}
      >
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bgUrl}
          alt=""
          width={1200}
          height={630}
          style={{ position: 'absolute', top: 0, left: 0, width: '1200px', height: '630px' }}
        />

        {/* Content overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '1200px',
            height: '630px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 80px',
          }}
        >
          {/* Icon for archetype pages */}
          {icon && type === 'archetype' && (
            <div style={{ fontSize: '72px', marginBottom: '16px', display: 'flex' }}>
              {icon}
            </div>
          )}

          {/* Title */}
          <div
            style={{
              fontSize: type === 'default' ? '56px' : '48px',
              fontWeight: 700,
              color: '#ffffff',
              textAlign: 'center',
              lineHeight: 1.2,
              display: 'flex',
              maxWidth: '900px',
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: type === 'default' ? '24px' : '22px',
              color: '#94a3b8',
              textAlign: 'center',
              marginTop: '20px',
              lineHeight: 1.5,
              display: 'flex',
              maxWidth: '800px',
            }}
          >
            {subtitle}
          </div>

          {/* Domain */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.5)',
              display: 'flex',
            }}
          >
            dreamcatcherai.us
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
