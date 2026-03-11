import type { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import { allCoachesQuery, foundersQuery, siteSettingsQuery } from '@/lib/sanity/queries';
import type { Coach, SiteSettings } from '@/types/sanity';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About SALTY Retreats | Our Story & Fitness Retreat Team',
  description:
    'Meet the team behind SALTY Retreats. Founded by Erin & Nate, we\'ve hosted 200+ guests across 7 countries. See why we believe fun is essential to wellness.',
  openGraph: {
    title: 'About SALTY Retreats | Our Story & Fitness Retreat Team',
    description:
      'Meet the team behind SALTY Retreats. Founded by Erin & Nate, we\'ve hosted 200+ guests across 7 countries. See why we believe fun is essential to wellness.',
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
