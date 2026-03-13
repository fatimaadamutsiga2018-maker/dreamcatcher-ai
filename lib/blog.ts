import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  category: string;
  tags: string[];
  publishDate: string;
  author: string;
  content: string;       // raw markdown
  contentHtml?: string;  // rendered HTML (only in detail view)
}

const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const filePath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug: data.slug || fileName.replace(/\.md$/, ''),
        title: data.title || 'Untitled',
        excerpt: data.excerpt || data.description || '',
        description: data.description || data.excerpt || '',
        category: data.category || 'General',
        tags: data.tags || data.keywords || [],
        publishDate: data.publishDate || '',
        author: data.author || 'Dreamcatcher Team',
        content,
      };
    });

  return posts.sort((a, b) =>
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;

  const processedContent = await remark().use(html).process(post.content);

  return {
    ...post,
    contentHtml: processedContent.toString(),
  };
}
