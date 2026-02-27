import type { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import { allBlogPostsQuery } from '@/lib/sanity/queries';
import type { BlogPostCard } from '@/types/sanity';
import BlogIndexClient from './BlogIndexClient';

export const metadata: Metadata = {
  title: 'Blog | SALTY Retreats',
  description:
    'Travel guides, fitness tips, solo travel advice, and behind-the-scenes stories from SALTY Retreats.',
  openGraph: {
    title: 'SALTY Retreats Blog',
    description: 'Destinations, fitness tips, solo travel advice, and more.',
    url: '/blog',
  },
};

export default async function BlogPage() {
  let posts: BlogPostCard[] = [];

  try {
    posts = (await client.fetch<BlogPostCard[]>(allBlogPostsQuery)) || [];
  } catch {
    // Sanity not configured yet
  }

  return <BlogIndexClient posts={posts} />;
}
