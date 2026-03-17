import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/seo'
import {
  glossaryTerms,
  GLOSSARY_CATEGORIES,
  getTermsByCategory,
} from '@/lib/glossary'

const title = 'Energy Glossary — Key Terms for Personal Energy Management'
const description =
  'Explore definitions of personal energy concepts: the four dimensions, eight archetypes, energy states, quality metrics, and personal types. Your reference guide to the ClarityPath energy framework.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/glossary` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/glossary`,
    siteName: SITE_NAME,
    type: 'website',
  },
}

function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'ClarityPath Energy Glossary',
    description,
    url: `${SITE_URL}/glossary`,
    hasDefinedTerm: glossaryTerms.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.term,
      description: t.definition,
      url: `${SITE_URL}/glossary#${t.id}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

const categoryOrder = [
  'core',
  'dimensions',
  'states',
  'archetypes',
  'quality',
  'types',
] as const

export default function GlossaryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white">
      <JsonLd />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Energy Glossary
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A complete reference to the concepts, terms, and frameworks behind
              personal energy management. Bookmark this page and come back
              whenever you need clarity.
            </p>
          </div>

          {/* Category navigation */}
          <nav className="flex flex-wrap justify-center gap-2 mb-12 sticky top-0 bg-gradient-to-b from-amber-50/90 to-amber-50/70 backdrop-blur-sm py-3 z-10">
            {categoryOrder.map((key) => {
              const cat = GLOSSARY_CATEGORIES[key]
              return (
                <a
                  key={key}
                  href={`#cat-${key}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-700 hover:border-emerald-400 hover:text-emerald-700 transition-colors"
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </a>
              )
            })}
          </nav>

          {/* Term sections */}
          <div className="space-y-14">
            {categoryOrder.map((key) => {
              const cat = GLOSSARY_CATEGORIES[key]
              const terms = getTermsByCategory(key)
              return (
                <section key={key} id={`cat-${key}`} className="scroll-mt-20">
                  <div className="mb-5">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <span>{cat.icon}</span>
                      {cat.label}
                    </h2>
                    <p className="text-gray-500 mt-1">{cat.description}</p>
                  </div>

                  <div className="grid gap-3">
                    {terms.map((term) => (
                      <div
                        key={term.id}
                        id={term.id}
                        className="scroll-mt-20 rounded-xl border border-gray-200 bg-white p-5 hover:border-gray-300 transition-colors"
                      >
                        <h3 className="text-lg font-semibold text-gray-900">
                          {term.term}
                        </h3>
                        <p className="text-gray-600 mt-1">{term.definition}</p>
                        {term.link && (
                          <Link
                            href={term.link}
                            className="inline-block mt-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                          >
                            {term.linkLabel || 'Learn more →'}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 grid gap-4 md:grid-cols-2">
            <div className="text-center bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Discover your archetype
              </h2>
              <p className="text-gray-600 mb-5 text-sm">
                Take our free 2-minute Energy Assessment to find out which of
                the 8 archetypes matches your current state.
              </p>
              <Link
                href="/assessment"
                className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors"
              >
                Start My Assessment
              </Link>
            </div>
            <div className="text-center bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Explore all archetypes
              </h2>
              <p className="text-gray-600 mb-5 text-sm">
                Read the full profiles of all 8 energy archetypes — from the
                Visionary Architect to the Hibernator.
              </p>
              <Link
                href="/archetype"
                className="inline-block px-6 py-3 bg-white text-emerald-700 border-2 border-emerald-600 rounded-full font-medium hover:bg-emerald-50 transition-colors"
              >
                View Archetypes
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
