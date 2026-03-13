'use client';

import { useState, useEffect } from 'react';
import { useSession } from '@/lib/auth-client';
import Link from 'next/link';

interface Comment {
  id: string;
  content: string;
  author_name: string;
  created_at: string;
  likes_count: number;
  user_id: string | null;
}

export default function BlogComments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    fetchComments();
  }, [slug]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?postSlug=${slug}`);
      if (!res.ok) {
        console.error('Failed to load comments:', res.status);
        return;
      }
      const data = await res.json();
      if (data.comments) {
        setComments(data.comments);
      }
    } catch (err) {
      console.error('Failed to fetch comments:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !session) return;

    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postSlug: slug,
          content: newComment,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || `Failed to post comment (${res.status})`);
        return;
      }

      setNewComment('');
      fetchComments();
    } catch (err) {
      setError('Network error, please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm('Delete this comment?')) return;

    try {
      const res = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || `Failed to delete (${res.status})`);
        return;
      }

      fetchComments();
    } catch (err) {
      setError('Network error, please try again');
    }
  };

  const handleLike = async (commentId: string) => {
    if (!session) return;

    try {
      const res = await fetch(`/api/comments/${commentId}/like`, {
        method: 'POST',
      });

      if (!res.ok) {
        console.error('Like failed:', res.status);
        return;
      }

      fetchComments();
    } catch (err) {
      console.error('Failed to toggle like:', err);
    }
  };

  return (
    <div className="mt-16 border-t border-gray-200 pt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Comments ({comments.length})
      </h2>

      {/* Error banner */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700 ml-4">
            Dismiss
          </button>
        </div>
      )}

      {/* Comment Form */}
      {session ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            rows={4}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none resize-none"
          />
          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || !newComment.trim()}
              className="px-6 py-2 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>
      ) : (
        <div className="mb-8 p-6 bg-gray-50 rounded-xl text-center">
          <p className="text-gray-600 mb-3">
            Sign in to join the conversation
          </p>
          <Link
            href={`/auth/signin?callbackUrl=/blog/${slug}`}
            className="inline-block px-6 py-2 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors"
          >
            Sign In
          </Link>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Be the first to share your thoughts
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white border border-gray-200 rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-medium text-gray-900">
                    {comment.author_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(comment.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                {session?.user?.id === comment.user_id && (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Delete
                  </button>
                )}
              </div>
              <p className="text-gray-700 whitespace-pre-wrap mb-4">
                {comment.content}
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLike(comment.id)}
                  disabled={!session}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-emerald-600 transition-colors disabled:opacity-50"
                >
                  <span>👍</span>
                  <span>{comment.likes_count}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
