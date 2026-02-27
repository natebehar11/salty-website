import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://getsaltyretreats.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/studio/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
