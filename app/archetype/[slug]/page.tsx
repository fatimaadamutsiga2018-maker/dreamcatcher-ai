import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArchetypeBySlug, getAllArchetypeSlugs } from '@/lib/archetypes'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

export function generateStaticParams() {
  return getAllArchetypeSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const archetype = getArchetypeBySlug(slug)
  if (!archetype) return { title: 'Archetype Not Found' }

  return {
    title: archetype.seoTitle,
    description: archetype.metaDescription,
    alternates: { canonical: `${SITE_URL}/archetype/${archetype.slug}` },
    openGraph: {
      type: 'article',
      title: archetype.seoTitle,
      description: archetype.metaDescription,
      url: `${SITE_URL}/archetype/${archetype.slug}`,
      section: 'Energy Archetypes',
    },
    twitter: {
      card: 'summary',
      title: archetype.seoTitle,
      description: archetype.metaDescription,
    },
  }
}

const sectionColorMap: Record<string, string> = {
  emerald: 'bg-emerald-50 border-emerald-200',
  orange: 'bg-orange-50 border-orange-200',
  indigo: 'bg-indigo-50 border-indigo-200',
  blue: 'bg-blue-50 border-blue-200',
  red: 'bg-red-50 border-red-200',
  purple: 'bg-purple-50 border-purple-200',
  gray: 'bg-gray-50 border-gray-200',
  slate: 'bg-slate-50 border-slate-200',
}

const textColorMap: Record<string, string> = {
  emerald: 'text-emerald-700',
  orange: 'text-orange-700',
  indigo: 'text-indigo-700',
  blue: 'text-blue-700',
  red: 'text-red-700',
  purple: 'text-purple-700',
  gray: 'text-gray-700',
  slate: 'text-slate-700',
}

export default async function ArchetypeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const archetype = getArchetypeBySlug(slug)
  if (!archetype) notFound()

  const color = archetype.info.color
  const heroColor = sectionColorMap[color] || sectionColorMap.gray
  const headingColor = textColorMap[color] || textColorMap.gray

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: archetype.h1,
    description: archetype.metaDescription,
    author: { '@type': 'Organization', name: 'DreamCatcher AI' },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    url: `${SITE_URL}/archetype/${archetype.slug}`,
    articleSection: 'Energy Archetypes',
  }

  const related0 = getArchetypeBySlug(archetype.relatedSlugs[0])
  const related1 = getArchetypeBySlug(archetype.relatedSlugs[1])

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/archetype"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-800 mb-8 transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Archetypes
          </Link>

          {/* Hero */}
          <header className={`rounded-2xl border-2 p-8 mb-10 ${heroColor}`}>
            <span className="text-5xl mb-4 block">{archetype.info.icon}</span>
            <h1 className={`text-3xl md:text-4xl font-bold mb-3 ${headingColor}`}>
              {archetype.h1}
            </h1>
            <p className="text-lg text-gray-600 italic">{archetype.subtitle}</p>
          </header>

          {/* Overview */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            {archetype.overview.map((p, i) => (
              <p key={i} className="text-gray-700 mb-3 leading-relaxed">{p}</p>
            ))}
          </section>

          {/* Signs */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Signs You&apos;re in This State
            </h2>
            <ul className="space-y-3">
              {archetype.signs.map((sign, i) => (
                <li key={i} className="flex gap-3 text-gray-700">
                  <span className="text-gray-400 mt-1 shrink-0">•</span>
                  <span>{sign}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Why This Happens */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Why This Happens
            </h2>
            {archetype.whyThisHappens.map((p, i) => (
              <p key={i} className="text-gray-700 mb-3 leading-relaxed">{p}</p>
            ))}
          </section>

          {/* Hidden Risk */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              The Hidden Risk
            </h2>
            {archetype.hiddenRisk.map((p, i) => (
              <p key={i} className="text-gray-700 mb-3 leading-relaxed">{p}</p>
            ))}
          </section>

          {/* What You Need Now */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What You Need Now
            </h2>
            {archetype.whatYouNeedNow.map((p, i) => (
              <p key={i} className="text-gray-700 mb-3 leading-relaxed">{p}</p>
            ))}
          </section>

          {/* Reset Step */}
          <section className="mb-10 bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-amber-800 mb-2">
              Your Next Step
            </h2>
            <p className="text-amber-900">{archetype.resetStep}</p>
          </section>

          {/* Related States */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Related States
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { data: related0, desc: archetype.relatedDescriptions[0], slug: archetype.relatedSlugs[0] },
                { data: related1, desc: archetype.relatedDescriptions[1], slug: archetype.relatedSlugs[1] },
              ].map(({ data, desc, slug: rSlug }) =>
                data ? (
                  <Link
                    key={rSlug}
                    href={`/archetype/${rSlug}`}
                    className="block rounded-xl border border-gray-200 bg-white p-4 hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{data.info.icon}</span>
                      <span className="font-semibold text-gray-900 text-sm">
                        {data.info.name}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{desc}</p>
                  </Link>
                ) : null
              )}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Discover your current state
            </h2>
            <p className="text-gray-600 mb-6">
              Energy states shift over time. Take the free assessment to see
              where you are today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/assessment"
                className="px-6 py-3 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors"
              >
                Take the Assessment
              </Link>
              <Link
                href="/archetype"
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors"
              >
                Explore All Archetypes
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
