import type { MetadataRoute } from 'next'

// Blog articles data - this should match your blog posts
const blogPosts = [
  {
    slug: 'timing-matters-more-than-effort',
    date: '2025-01-12',
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  },
  {
    slug: 'rest-is-not-quitting',
    date: '2025-01-12',
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  },
  {
    slug: 'momentum-not-confidence',
    date: '2025-01-12',
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  },
  {
    slug: 'why-timing-changes-everything',
    date: '2025-01-12',
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  },
  {
    slug: 'why-doing-nothing-is-rational',
    date: '2025-01-08',
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  },
  {
    slug: 'architecture-of-resonance',
    date: '2025-01-05',
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  },
  {
    slug: 'the-speed-of-clarity',
    date: '2024-12-28',
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  },
]

const siteUrl = 'https://dreamcatcher-ai-nine.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  // Blog pages
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: post.changeFrequency,
    priority: post.priority,
  }))

  return [...staticPages, ...blogPages]
}
