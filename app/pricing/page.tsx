'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

const creditPacks = [
  {
    sku: 'starter_5',
    name: 'Starter',
    price: '$4.99',
    credits: 5,
    perReading: '$1.00',
    description: 'Try it out',
  },
  {
    sku: 'explorer_12',
    name: 'Explorer',
    price: '$9.99',
    credits: 12,
    perReading: '$0.83',
    description: 'Most popular',
    popular: true,
  },
  {
    sku: 'deep_dive_30',
    name: 'Deep Dive',
    price: '$19.99',
    credits: 30,
    perReading: '$0.67',
    description: 'Best value',
  },
];

const membershipPlans = [
  {
    sku: 'member_monthly',
    name: 'Monthly',
    price: '$19.99',
    period: '/month',
    features: [
      'Unlimited Decision Guidance',
      'Detailed hexagram insights',
      'Personal energy adaptation',
      'Cancel anytime',
    ],
  },
  {
    sku: 'member_yearly',
    name: 'Yearly',
    price: '$99',
    period: '/year',
    savings: 'Save 58%',
    features: [
      'Everything in Monthly',
      'Priority access to new features',
      'Detailed hexagram insights',
      'Personal energy adaptation',
    ],
    popular: true,
  },
];

export default function PricingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function handlePurchase(sku: string) {
    setLoading(sku);
    try {
      const session = await authClient.getSession();
      if (!session?.data?.user) {
        router.push(`/auth/signin?callbackUrl=${encodeURIComponent('/pricing')}`);
        return;
      }

      const res = await fetch('/api/payment/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sku }),
      });

      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert(data.error || 'Failed to create checkout');
      }
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            Choose Your Path
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Start with free Bonus Points, or unlock deeper guidance with Reading Credits and Membership.
          </p>
        </div>

        {/* Free tier callout */}
        <div className="mb-12 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
          <p className="text-emerald-800 font-medium">
            New users get 10 free Bonus Points on signup — enough for 2 Decision Guidance readings.
          </p>
        </div>

        {/* Reading Credits */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Reading Credits</h2>
          <p className="text-slate-500 mb-8">One-time purchase. Valid for 90 days.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {creditPacks.map((pack) => (
              <div
                key={pack.sku}
                className={`relative p-6 rounded-2xl border-2 transition-all hover:shadow-lg ${
                  pack.popular
                    ? 'border-emerald-500 bg-white shadow-md'
                    : 'border-slate-200 bg-white'
                }`}
              >
                {pack.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                    POPULAR
                  </span>
                )}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{pack.name}</h3>
                    <p className="text-sm text-slate-500">{pack.description}</p>
                  </div>
                  <div>
                    <span className="text-3xl font-bold text-slate-900">{pack.price}</span>
                  </div>
                  <div className="text-sm text-slate-600 space-y-1">
                    <p>{pack.credits} readings</p>
                    <p>{pack.perReading} per reading</p>
                  </div>
                  <button
                    onClick={() => handlePurchase(pack.sku)}
                    disabled={loading === pack.sku}
                    className={`w-full py-3 rounded-xl font-medium transition-all ${
                      pack.popular
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loading === pack.sku ? 'Processing...' : 'Get Started'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Membership */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Membership</h2>
          <p className="text-slate-500 mb-8">Unlimited access. No credits needed.</p>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {membershipPlans.map((plan) => (
              <div
                key={plan.sku}
                className={`relative p-8 rounded-2xl border-2 transition-all hover:shadow-lg ${
                  plan.popular
                    ? 'border-emerald-500 bg-white shadow-md'
                    : 'border-slate-200 bg-white'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                    BEST VALUE
                  </span>
                )}
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                    {plan.savings && (
                      <span className="text-sm font-medium text-emerald-600">{plan.savings}</span>
                    )}
                  </div>
                  <div>
                    <span className="text-3xl font-bold text-slate-900">{plan.price}</span>
                    <span className="text-slate-500">{plan.period}</span>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="text-emerald-500 mt-0.5">&#10003;</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handlePurchase(plan.sku)}
                    disabled={loading === plan.sku}
                    className={`w-full py-3 rounded-xl font-medium transition-all ${
                      plan.popular
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loading === plan.sku ? 'Processing...' : 'Subscribe'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto text-center space-y-6 text-sm text-slate-500">
          <p>All prices in USD. Reading Credits are valid for 90 days from purchase.</p>
          <p>Members enjoy unlimited Decision Guidance — no credits consumed.</p>
          <p>Questions? Reach out at support@dreamcatcherai.us</p>
        </div>
      </div>
    </div>
  );
}
