import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import BlogComments from '@/components/blog/BlogComments';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.title} | Dreamcatcher Blog`,
    description: post.description,
  };
}

const categoryColors: Record<string, string> = {
  Timing: 'bg-blue-100 text-blue-700',
  Energy: 'bg-emerald-100 text-emerald-700',
  Alignment: 'bg-purple-100 text-purple-700',
  Guidance: 'bg-amber-100 text-amber-700',
  General: 'bg-gray-100 text-gray-700',
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800 mb-8 transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          {/* Article header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category] || categoryColors.General}`}
              >
                {post.category}
              </span>
              <span className="text-sm text-gray-500">{post.publishDate}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-gray-600">{post.excerpt}</p>
            <div className="mt-4 text-sm text-gray-500">
              By {post.author}
            </div>
          </header>

          {/* Article content */}
          <div className="overflow-x-auto">
            <article
              className="prose prose-lg prose-gray max-w-none
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900
                prose-blockquote:border-indigo-300 prose-blockquote:text-gray-700
                prose-table:text-sm prose-table:w-full
                prose-td:break-words prose-th:break-words"
              dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
            />
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          <BlogComments slug={post.slug} />

          {/* Bottom CTA */}
          <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Want to go deeper?
            </h2>
            <p className="text-gray-600 mb-6">
              Take our free Energy Assessment to discover your current state and
              get personalized guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/assessment"
                className="px-6 py-3 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors"
              >
                Start Assessment
              </Link>
              <Link
                href="/blog"
                className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-full font-medium hover:bg-indigo-50 transition-colors"
              >
                More Articles
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
