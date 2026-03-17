import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Energy Assessment — Discover Your Archetype',
  description:
    'A free 1-minute assessment to understand your current energy state. Discover which of 8 archetypes matches your mental clarity, physical vitality, inner harmony, and growth momentum.',
  alternates: { canonical: `${SITE_URL}/assessment` },
  openGraph: {
    title: 'Energy Assessment — Discover Your Archetype',
    description:
      'A free 1-minute assessment to understand your current energy state. Discover which of 8 archetypes matches your mental clarity, physical vitality, inner harmony, and growth momentum.',
    url: `${SITE_URL}/assessment`,
  },
}

export default function AssessmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
