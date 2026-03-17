import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Decision Guidance — Clarity for Your Next Move',
  description:
    'Facing a crossroads? Get personalized guidance on whether to move forward, wait, or change direction. Ancient pattern recognition for modern decisions.',
  alternates: { canonical: `${SITE_URL}/hexagram` },
  openGraph: {
    title: 'Decision Guidance — Clarity for Your Next Move',
    description:
      'Facing a crossroads? Get personalized guidance on whether to move forward, wait, or change direction. Ancient pattern recognition for modern decisions.',
    url: `${SITE_URL}/hexagram`,
  },
}

export default function HexagramLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
