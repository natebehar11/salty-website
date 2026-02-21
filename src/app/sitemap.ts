import { MetadataRoute } from 'next';
import { retreats } from '@/data/retreats';

const BASE_URL = 'https://getsaltyretreats.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const retreatPages = retreats.map((retreat) => ({
    url: `${BASE_URL}/retreats/${retreat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [
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
      priority: 0.8,
    },
    ...retreatPages,
  ];
}
