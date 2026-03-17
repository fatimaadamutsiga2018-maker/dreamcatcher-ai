import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';
import PricingContent from './PricingContent';

export const metadata: Metadata = {
  title: 'Pricing — Free Energy Tools & Premium Guidance | ClarityPath',
  description:
    'Start free with energy assessments, daily guides, and 10 Bonus Points. Upgrade with Reading Credits or unlimited Membership for deeper decision guidance.',
  alternates: { canonical: `${SITE_URL}/pricing` },
  openGraph: {
    title: 'Pricing — Free Energy Tools & Premium Guidance | ClarityPath',
    description:
      'Free energy tools for everyone. Reading Credits and Membership plans for deeper guidance.',
    url: `${SITE_URL}/pricing`,
  },
};

export default function PricingPage() {
  return <PricingContent />;
}
