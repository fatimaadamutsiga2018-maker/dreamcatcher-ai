'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface LogEntry {
  date: string;
  beforeTired: number;
  afterTired: number;
  delta: number;
}

export default function LogPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    // Read logs from localStorage
    const storedLogs = JSON.parse(localStorage.getItem('nsdrLogs') || '[]');
    setLogs(storedLogs.sort((a: LogEntry, b: LogEntry) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ));
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            Recovery Log
          </h1>
          <p className="text-gray-600">
            See how your recovery patterns change over time
          </p>
        </div>

        {/* Logs List */}
        {logs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-100">
            <p className="text-gray-500 mb-6">No sessions recorded yet.</p>
            <Link
              href="/try"
              className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Start Your First Session
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {logs.map((log, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-500">
                    {formatDate(log.date)}
                  </div>
                  {log.delta < 0 && (
                    <div className="text-sm text-green-600 font-medium">
                      -{Math.abs(log.delta)} points
                    </div>
                  )}
                </div>

                {/* Visual Delta Display */}
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Before</span>
                      <span>{log.beforeTired}/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gray-400 h-2 rounded-full"
                        style={{ width: `${(log.beforeTired / 10) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-gray-300">→</div>

                  <div className="flex-1">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>After</span>
                      <span>{log.afterTired}/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          log.delta < 0 ? 'bg-green-500' : 'bg-gray-400'
                        }`}
                        style={{ width: `${(log.afterTired / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 text-center space-x-4">
          <Link href="/try" className="text-indigo-600 hover:text-indigo-700 text-sm">
            Start New Session →
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/" className="text-indigo-600 hover:text-indigo-700 text-sm">
            Back to Home →
          </Link>
        </div>
      </div>
    </div>
  );
}

