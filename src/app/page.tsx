import { client } from '@/lib/sanity/client';
import { allRetreatsQuery, featuredTestimonialsQuery, siteSettingsQuery } from '@/lib/sanity/queries';
import HomepageClient from './HomepageClient';

export default async function Home() {
  const [retreats, testimonials, settings] = await Promise.all([
    client.fetch(allRetreatsQuery).catch(() => []),
    client.fetch(featuredTestimonialsQuery).catch(() => []),
    client.fetch(siteSettingsQuery).catch(() => null),
  ]);

  return (
    <HomepageClient
      retreats={retreats}
      testimonials={testimonials}
      settings={settings}
    />
  );
}
