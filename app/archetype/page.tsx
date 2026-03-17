import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArchetypes } from '@/lib/archetypes'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Energy Archetypes — 8 States of Clarity & Momentum',
  description:
    'Explore the 8 energy archetypes: from the Visionary Architect at peak alignment to the Hibernator in deep restoration. Discover which state matches your current life phase.',
  alternates: { canonical: `${SITE_URL}/archetype` },
  openGraph: {
    title: 'Energy Archetypes — 8 States of Clarity & Momentum',
    description:
      'Explore the 8 energy archetypes and discover which state matches your current life phase.',
    url: `${SITE_URL}/archetype`,
  },
}

const colorMap: Record<string, string> = {
  emerald: 'bg-emerald-50 border-emerald-200 hover:border-emerald-400',
  orange: 'bg-orange-50 border-orange-200 hover:border-orange-400',
  indigo: 'bg-indigo-50 border-indigo-200 hover:border-indigo-400',
  blue: 'bg-blue-50 border-blue-200 hover:border-blue-400',
  red: 'bg-red-50 border-red-200 hover:border-red-400',
  purple: 'bg-purple-50 border-purple-200 hover:border-purple-400',
  gray: 'bg-gray-50 border-gray-200 hover:border-gray-400',
  slate: 'bg-slate-50 border-slate-200 hover:border-slate-400',
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

export default function ArchetypesPage() {
  const archetypes = getAllArchetypes()

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Energy Archetypes
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your energy state is not a personality type — it&apos;s a dynamic snapshot of
              where you are right now. Explore the 8 archetypes to understand your
              current phase and what comes next.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {archetypes.map((archetype) => (
              <Link
                key={archetype.slug}
                href={`/archetype/${archetype.slug}`}
                className={`group block rounded-2xl border-2 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${colorMap[archetype.info.color] || colorMap.gray}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{archetype.info.icon}</span>
                  <h2
                    className={`text-lg font-bold ${textColorMap[archetype.info.color] || textColorMap.gray}`}
                  >
                    {archetype.info.name}
                  </h2>
                </div>
                <p className="text-sm text-gray-600">{archetype.info.tagline}</p>
                <p className="text-xs text-gray-400 mt-2 group-hover:text-gray-600 transition-colors">
                  Learn more →
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Which archetype are you?
            </h2>
            <p className="text-gray-600 mb-6">
              Take our free 2-minute Energy Assessment to discover your current
              state and get personalized guidance.
            </p>
            <Link
              href="/assessment"
              className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors"
            >
              Start My Assessment
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
