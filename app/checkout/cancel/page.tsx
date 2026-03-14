'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function CancelContent() {
  const searchParams = useSearchParams();
  const orderNo = searchParams.get('orderNo');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-md w-full mx-4 text-center space-y-6">
        <div className="text-6xl">&#x1F6AB;</div>
        <h1 className="text-2xl font-bold text-gray-900">Payment Canceled</h1>
        <p className="text-gray-600">
          No worries — you haven&apos;t been charged. You can try again whenever you&apos;re ready.
        </p>
        {orderNo && (
          <p className="text-sm text-gray-400">Order: {orderNo}</p>
        )}
        <div className="flex flex-col gap-3 pt-4">
          <Link
            href="/pricing"
            className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            View Plans
          </Link>
          <Link
            href="/"
            className="inline-block px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutCancelPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CancelContent />
    </Suspense>
  );
}
