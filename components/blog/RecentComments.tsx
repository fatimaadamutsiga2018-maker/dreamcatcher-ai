'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Comment {
  id: string;
  post_slug: string;
  author_name: string;
  content: string;
  likes_count: number;
  created_at: string;
}

const slugToTitle: Record<string, string> = {};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function RecentComments() {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetch('/api/comments?latest=6')
      .then((r) => r.json())
      .then((d) => setComments(d.comments || []))
      .catch(() => {});
  }, []);

  if (comments.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-lg font-bold text-gray-900 mb-4">
        Recent Conversations
      </h2>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {comments.map((c) => (
          <Link
            key={c.id}
            href={`/blog/${c.post_slug}`}
            className="block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                {c.author_name.charAt(0).toUpperCase()}
              </span>
              <span className="text-sm font-medium text-gray-900">
                {c.author_name}
              </span>
              <span className="text-xs text-gray-400 ml-auto">
                {timeAgo(c.created_at)}
              </span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">{c.content}</p>
            {c.likes_count > 0 && (
              <span className="inline-block mt-2 text-xs text-gray-400">
                ♥ {c.likes_count}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
