import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard',
          '/settings',
          '/billing',
          '/checkout/',
          '/auth/',
          '/api/',
          '/assessment/results',
          '/hexagram/reading',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
