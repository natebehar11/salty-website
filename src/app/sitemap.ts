import type { MetadataRoute } from 'next';
import { client } from '@/lib/sanity/client';

const BASE_URL = 'https://getsaltyretreats.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/retreats`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/reviews`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/book`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/fitness-retreats`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/destinations`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Dynamic pages from Sanity
  let retreatSlugs: string[] = [];
  let blogPostSlugs: string[] = [];
  let destinationSlugs: string[] = [];

  try {
    [retreatSlugs, blogPostSlugs, destinationSlugs] = await Promise.all([
      client.fetch<string[]>(`*[_type == "retreat" && status != "past"].slug.current`),
      client.fetch<string[]>(`*[_type == "blogPost" && publishedAt <= now()].slug.current`),
      client.fetch<string[]>(`*[_type == "destination"].slug.current`),
    ]);
  } catch {
    // Sanity not configured — return static pages only
  }

  const retreatPages: MetadataRoute.Sitemap = (retreatSlugs || []).map((slug) => ({
    url: `${BASE_URL}/retreats/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const blogPages: MetadataRoute.Sitemap = (blogPostSlugs || []).map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const destinationPages: MetadataRoute.Sitemap = (destinationSlugs || []).map((slug) => ({
    url: `${BASE_URL}/destinations/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...retreatPages, ...blogPages, ...destinationPages];
}
