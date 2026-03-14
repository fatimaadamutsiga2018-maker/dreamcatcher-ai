'use client';

import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { History, TrendingUp, Calendar } from 'lucide-react';

interface RecentItem {
  id: string;
  reading_type: string;
  question: string | null;
  input_numbers: string | null;
  consumed_source: string;
  created_at: string;
}

interface DashboardData {
  totalReadings: number;
  totalAssessments: number;
  thisMonth: number;
  recentActivity: RecentItem[];
}

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [dashData, setDashData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace('/auth/signin?callbackUrl=/dashboard');
    }
  }, [isPending, router, session]);

  useEffect(() => {
    if (!session) return;
    fetch('/api/user/dashboard')
      .then(res => res.json())
      .then(data => { setDashData(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [session]);

  if (isPending || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-600">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const totalReadings = dashData?.totalReadings ?? 0;
  const totalAssessments = dashData?.totalAssessments ?? 0;
  const thisMonth = dashData?.thisMonth ?? 0;
  const recentActivity = dashData?.recentActivity ?? [];

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const sourceLabel = (source: string) => {
    if (source === 'membership') return 'Membership';
    if (source === 'bonus_points') return 'Bonus Points';
    if (source === 'purchased_credits') return 'Credits';
    return source;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-emerald-50/30 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Welcome back, {session.user?.name?.split(' ')[0] || 'User'}!
          </h1>
          <p className="text-slate-600">
            Here's your ClarityPath journey
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border-2 border-emerald-100 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <History className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Total Readings</p>
                <p className="text-2xl font-bold text-slate-900">{totalReadings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border-2 border-amber-100 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Assessments</p>
                <p className="text-2xl font-bold text-slate-900">{totalAssessments}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border-2 border-indigo-100 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">This Month</p>
                <p className="text-2xl font-bold text-slate-900">{thisMonth}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border-2 border-slate-100 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Recent Activity</h2>

          {recentActivity.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <History className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-600 mb-6">
                No readings yet. Start your journey!
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/assessment"
                  className="px-6 py-3 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors"
                >
                  Energy Assessment
                </Link>
                <Link
                  href="/hexagram"
                  className="px-6 py-3 border-2 border-emerald-600 text-emerald-600 rounded-full font-medium hover:bg-emerald-50 transition-colors"
                >
                  Decision Guidance
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      item.reading_type === 'hexagram' ? 'bg-emerald-100' : 'bg-amber-100'
                    }`}>
                      <span className="text-lg">
                        {item.reading_type === 'hexagram' ? '☰' : '⚡'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {item.reading_type === 'hexagram' ? 'Decision Guidance' : 'Energy Assessment'}
                      </p>
                      <p className="text-xs text-slate-500">
                        {item.question || 'General guidance'}
                        {item.input_numbers ? ` · ${item.input_numbers}` : ''}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">{formatDate(item.created_at)}</p>
                    <p className="text-xs text-slate-400">{sourceLabel(item.consumed_source)}</p>
                  </div>
                </div>
              ))}
              <div className="flex gap-4 justify-center pt-4">
                <Link
                  href="/assessment"
                  className="px-6 py-3 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors"
                >
                  Energy Assessment
                </Link>
                <Link
                  href="/hexagram"
                  className="px-6 py-3 border-2 border-emerald-600 text-emerald-600 rounded-full font-medium hover:bg-emerald-50 transition-colors"
                >
                  Decision Guidance
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
