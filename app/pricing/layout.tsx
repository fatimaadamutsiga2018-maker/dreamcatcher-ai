import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo'

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do Reading Credits work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Reading Credits are used to unlock personalized Decision Guidance readings. Each reading costs 1 credit. Credits can be purchased in packs or included with a Membership plan.',
      },
    },
    {
      '@type': 'Question',
      name: 'What can I use for free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every new user gets 10 Bonus Points for free. The Energy Assessment, Daily Energy Guide, and Blog are always free to access. Bonus Points can be used to try Decision Guidance readings.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does Membership include?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Membership includes monthly Reading Credits, access to premium features, and priority support. Check the pricing page for current plan details.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I cancel my membership?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, you can cancel anytime. Your membership benefits remain active until the end of your current billing period. Unused Reading Credits expire 90 days after purchase.',
      },
    },
  ],
}

export const metadata: Metadata = {
  title: 'Plans & Pricing',
  description:
    'Start free with Bonus Points, or unlock unlimited decision guidance with Reading Credits and Membership.',
  alternates: { canonical: `${SITE_URL}/pricing` },
  openGraph: {
    title: 'Plans & Pricing',
    description:
      'Start free with Bonus Points, or unlock unlimited decision guidance with Reading Credits and Membership.',
    url: `${SITE_URL}/pricing`,
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  )
}
