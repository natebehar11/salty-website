import type { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import { allCoachesQuery, foundersQuery, siteSettingsQuery } from '@/lib/sanity/queries';
import type { Coach, SiteSettings } from '@/types/sanity';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About SALTY | How We Made Fun of Wellness',
  description:
    'Meet the team behind SALTY Retreats. We started with a simple idea: fitness should be fun, travel should be social, and wellness doesn\'t need to be serious.',
  openGraph: {
    title: 'About SALTY Retreats',
    description:
      'Meet the founders and coaches behind SALTY — fitness retreats for fun-loving people.',
    url: '/about',
  },
};

export default async function AboutPage() {
  let coaches: Coach[] = [];
  let founders: Coach[] = [];
  let settings: SiteSettings | null = null;

  try {
    [coaches, founders, settings] = await Promise.all([
      client.fetch<Coach[]>(allCoachesQuery),
      client.fetch<Coach[]>(foundersQuery),
      client.fetch<SiteSettings>(siteSettingsQuery),
    ]);
  } catch {
    // Sanity not configured yet
  }

  return (
    <AboutClient
      coaches={coaches || []}
      founders={founders || []}
      settings={settings}
    />
  );
}
