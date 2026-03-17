import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Daily Energy Guide — What Activities Suit Today',
  description:
    "Check today's energy forecast. See which activities are best supported and which to postpone.",
  alternates: { canonical: `${SITE_URL}/almanac` },
  openGraph: {
    title: 'Daily Energy Guide — What Activities Suit Today',
    description:
      "Check today's energy forecast. See which activities are best supported and which to postpone.",
    url: `${SITE_URL}/almanac`,
  },
}

export default function AlmanacLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
