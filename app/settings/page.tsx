'use client';

import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SettingsPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin');
    }
  }, [session, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-600">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-emerald-50/30 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Settings</h1>
          <p className="text-slate-600">Manage your account preferences</p>
        </div>

        {/* Profile Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border-2 border-slate-100 p-8 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Profile Information</h2>

          <div className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="text-sm font-medium text-slate-700 w-32">Avatar</div>
              <div>
                {session.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    className="w-20 h-20 rounded-full border-2 border-emerald-200"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center border-2 border-emerald-200">
                    <span className="text-2xl text-emerald-600">
                      {session.user?.name?.[0] || 'U'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Name */}
            <div className="flex items-center gap-4">
              <div className="text-sm font-medium text-slate-700 w-32">Name</div>
              <div className="flex-1">
                <input
                  type="text"
                  value={session.user?.name || ''}
                  disabled
                  className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg bg-slate-50 text-slate-600"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="text-sm font-medium text-slate-700 w-32">Email</div>
              <div className="flex-1">
                <input
                  type="email"
                  value={session.user?.email || ''}
                  disabled
                  className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg bg-slate-50 text-slate-600"
                />
              </div>
            </div>

            <p className="text-sm text-slate-500 mt-4">
              Profile information is managed by your OAuth provider (Google/GitHub).
            </p>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border-2 border-slate-100 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Preferences</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div>
                <div className="font-medium text-slate-900">Email Notifications</div>
                <div className="text-sm text-slate-500">Receive updates about your readings</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <div className="font-medium text-slate-900">Save Reading History</div>
                <div className="text-sm text-slate-500">Automatically save all your readings</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          </div>

          <p className="text-sm text-slate-500 mt-6">
            Note: These settings are currently for display only. Full functionality will be added in a future update.
          </p>
        </div>
      </div>
    </div>
  );
}
