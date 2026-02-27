import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity/client';
import { blogPostBySlugQuery, blogPostSlugsQuery } from '@/lib/sanity/queries';
import type { BlogPost } from '@/types/sanity';
import BlogPostClient from './BlogPostClient';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<string[]>(blogPostSlugsQuery);
    return (slugs || []).map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await client.fetch<BlogPost>(blogPostBySlugQuery, { slug });
    if (!post) return { title: 'Post Not Found | SALTY Blog' };
    return {
      title: post.seoTitle || `${post.title} | SALTY Retreats Blog`,
      description: post.seoDescription || post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        url: `/blog/${post.slug}`,
      },
    };
  } catch {
    return { title: 'SALTY Blog' };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  let post: BlogPost | null = null;
  try {
    post = await client.fetch<BlogPost>(blogPostBySlugQuery, { slug });
  } catch {
    // Sanity not configured
  }

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
