'use client';

import { useState } from 'react';

const creditPacks = [
  {
    sku: 'starter_5',
    name: 'Starter',
    price: '$4.99',
    credits: 5,
    perReading: '$1.00',
    description: 'Try it out',
    deeperNote: '2 readings = 1 deeper insight',
  },
  {
    sku: 'explorer_12',
    name: 'Explorer',
    price: '$9.99',
    credits: 12,
    perReading: '$0.83',
    description: 'Most popular',
    popular: true,
    deeperNote: '2 readings = 1 deeper insight',
  },
  {
    sku: 'deep_dive_30',
    name: 'Deep Dive',
    price: '$19.99',
    credits: 30,
    perReading: '$0.67',
    description: 'Best value',
    deeperNote: '2 readings = 1 deeper insight',
  },
];

const membershipPlans = [
  {
    sku: 'member_monthly',
    name: 'Monthly',
    price: '$19.99',
    period: '/month',
    features: [
      'Unlimited Decision Guidance — no credits consumed',
      'Expanded hexagram analysis with timing & action guidance',
      'Personalized energy-fit recommendations',
      'Priority access to new features',
      'Cancel anytime',
      'Includes 3 Deeper Insight unlocks per month',
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
      'Expanded hexagram analysis with timing & action guidance',
      'Personalized energy-fit recommendations',
      'Priority access to new features',
      'Save 58% vs monthly',
      'Includes 5 Deeper Insight unlocks per year',
    ],
    popular: true,
  },
];

const comparisonFeatures = [
  { name: 'Energy Assessment', free: '✓', credits: '✓', member: '✓' },
  { name: 'Daily Energy Guide', free: '✓', credits: '✓', member: '✓' },
  { name: 'Blog & Glossary', free: '✓', credits: '✓', member: '✓' },
  {
    name: 'Decision Guidance',
    free: '2 free readings on signup',
    credits: 'Buy as you go',
    member: 'Unlimited',
  },
  {
    name: 'Detailed Insights',
    free: '—',
    credits: '2 readings = 1 deeper insight',
    member: 'Bonus sessions: 3 per month / 5 per year',
  },
];

const faqItems = [
  {
    q: 'What are Bonus Points?',
    a: 'Every new user receives 10 free Bonus Points on signup. Each Decision Guidance reading costs 5 points, so you can try 2 readings for free before deciding to purchase.',
  },
  {
    q: "What's the difference between Credits and Membership?",
    a: 'Reading Credits are one-time purchases — buy a pack and use them at your own pace. Two credits unlock one deeper insight. Membership includes unlimited Decision Guidance readings plus the deeper insight allotment (3 per month or 5 per year) without using credits.',
  },
  {
    q: 'Do credits expire?',
    a: 'Yes, Reading Credits are valid for 90 days from purchase. Bonus Points do not expire.',
  },
  {
    q: 'How do Deeper Insights work?',
    a: 'Deeper Insights are unlocked via readings. Members receive 3 (monthly) or 5 (yearly) free deeper insights; once those are used, two Reading Credits unlock one deeper insight. Bonus Points are not accepted.',
  },
  {
    q: 'Can I upgrade from Credits to Membership later?',
    a: 'Absolutely! You can subscribe to a Membership at any time. Any remaining Reading Credits will stay in your account and can still be used.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit and debit cards through our secure payment partner. More payment methods coming soon.',
  },
];

export default function PricingContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white">
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        {/* Feature Comparison Table */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 text-center">
            What&apos;s Included
          </h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="text-left py-2 px-3 font-medium text-slate-500">
                    Feature
                  </th>
                  <th className="text-center py-2 px-3 font-bold text-slate-700">
                    Free
                  </th>
                  <th className="text-center py-2 px-3 font-bold text-slate-700">
                    Credits
                  </th>
                  <th className="text-center py-2 px-3 font-bold text-emerald-700">
                    Member
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, i) => (
                  <tr
                    key={feature.name}
                    className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}
                  >
                    <td className="py-2 px-3 font-medium text-slate-700">
                      {feature.name}
                    </td>
                    <td className="py-2 px-3 text-center text-slate-600">
                      {feature.free}
                    </td>
                    <td className="py-2 px-3 text-center text-slate-600">
                      {feature.credits}
                    </td>
                    <td className="py-2 px-3 text-center font-medium text-emerald-700">
                      {feature.member}
                    </td>
                  </tr>
                ))}
              </tbody>
      </table>
    </div>
    <div className="text-xs text-gray-500 mt-3 text-center">
      Reading Credits expire after 90 days. Two credits unlock one Deeper Insight unlock; Bonus Points cannot be used for deeper insights.
    </div>
  </div>

        {/* Reading Credits */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-1">
            Reading Credits
          </h2>
          <p className="text-slate-500 mb-5 text-sm">
            One-time purchase. Valid for 90 days.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {creditPacks.map((pack) => (
              <div
                key={pack.sku}
                className={`relative p-5 rounded-2xl border-2 transition-all hover:shadow-lg ${
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
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {pack.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {pack.description}
                    </p>
                    {pack.deeperNote && (
                      <p className="text-[10px] text-slate-400 italic mt-1">
                        {pack.deeperNote}
                      </p>
                    )}
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-slate-900">
                      {pack.price}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 space-y-0.5">
                    <p>{pack.credits} readings</p>
                    <p>{pack.perReading} per reading</p>
                  </div>
                  <button
                    className="w-full py-3 rounded-xl font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition"
                  >
                    Buy now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Membership */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-1">
            Membership
          </h2>
          <p className="text-slate-500 mb-5 text-sm">
            Unlimited access. No credits needed.
          </p>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {membershipPlans.map((plan) => (
              <div
                key={plan.sku}
                className={`relative p-6 rounded-2xl border-2 transition-all hover:shadow-lg ${
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
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {plan.name}
                    </h3>
                    {plan.savings && (
                      <span className="text-sm font-medium text-emerald-600">
                        {plan.savings}
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-slate-900">
                      {plan.price}
                    </span>
                    <span className="text-slate-500 text-sm">{plan.period}</span>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <span className="text-emerald-500 mt-0.5">
                          &#10003;
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="w-full py-3 rounded-xl font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition"
                  >
                    Subscribe now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-10 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-5 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="border border-slate-200 rounded-xl bg-white overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left text-sm font-medium text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  {item.q}
                  <span
                    className={`ml-2 text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                  >
                    ▾
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-sm text-slate-600">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="max-w-2xl mx-auto text-center space-y-3 text-sm text-slate-500">
          <p>
            All prices in USD. Reading Credits are valid for 90 days from
            purchase.
          </p>
          <p>
            Questions? Reach out at support@dreamcatcherai.us
          </p>
        </div>
      </div>
    </div>
  );
}
