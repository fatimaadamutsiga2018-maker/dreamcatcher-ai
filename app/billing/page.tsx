'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import Link from 'next/link';

interface UserRights {
  bonusPoints: number;
  purchasedCredits: number;
  membership: {
    plan_code: string;
    status: string;
    current_period_end: string;
  } | null;
  canRead: boolean;
  readingSource: string;
}

export default function BillingPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [rights, setRights] = useState<UserRights | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;
    if (!session) {
      router.replace('/auth/signin?callbackUrl=/billing');
      return;
    }
    fetch('/api/user/rights')
      .then((r) => r.json())
      .then(setRights)
      .finally(() => setLoading(false));
  }, [session, isPending, router]);

  if (isPending || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  if (!rights) return null;

  const planLabel = rights.membership
    ? rights.membership.plan_code === 'member_yearly'
      ? 'Yearly Member'
      : 'Monthly Member'
    : 'Free';

  const periodEnd = rights.membership?.current_period_end
    ? new Date(rights.membership.current_period_end).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-slate-900">Billing &amp; Credits</h1>

        {/* Current Plan */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Current Plan</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-slate-900">{planLabel}</p>
              {periodEnd && (
                <p className="text-sm text-slate-500">Renews {periodEnd}</p>
              )}
              {rights.membership && (
                <span className="inline-block mt-2 px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                  {rights.membership.status}
                </span>
              )}
            </div>
            {!rights.membership && (
              <Link
                href="/pricing"
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition"
              >
                Upgrade
              </Link>
            )}
          </div>
        </div>

        {/* Balances */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500 mb-1">Bonus Points</p>
            <p className="text-3xl font-bold text-amber-600">{rights.bonusPoints}</p>
            <p className="text-xs text-slate-400 mt-2">5 points = 1 reading</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500 mb-1">Reading Credits</p>
            <p className="text-3xl font-bold text-emerald-600">{rights.purchasedCredits}</p>
            <p className="text-xs text-slate-400 mt-2">1 credit = 1 reading</p>
          </div>
        </div>

        {/* Reading availability */}
        <div className={`rounded-2xl p-6 ${rights.canRead ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'}`}>
          {rights.canRead ? (
            <p className="text-emerald-800 font-medium">
              You can use Decision Guidance.
              {rights.readingSource === 'membership' && ' Unlimited as a member.'}
              {rights.readingSource === 'bonus_points' && ' Using Bonus Points (5 per reading).'}
              {rights.readingSource === 'purchased_credits' && ' Using Reading Credits.'}
            </p>
          ) : (
            <div className="space-y-2">
              <p className="text-red-800 font-medium">No credits available for Decision Guidance.</p>
              <Link href="/pricing" className="text-red-700 underline text-sm">
                Get Reading Credits or Membership
              </Link>
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="flex gap-4">
          <Link
            href="/pricing"
            className="flex-1 text-center py-3 border border-slate-300 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition"
          >
            Buy More Credits
          </Link>
          <Link
            href="/hexagram"
            className="flex-1 text-center py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition"
          >
            Decision Guidance
          </Link>
        </div>
      </div>
    </div>
  );
}
