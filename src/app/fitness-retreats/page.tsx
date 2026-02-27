import type { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import {
  allRetreatsQuery,
  featuredTestimonialsQuery,
  siteSettingsQuery,
} from '@/lib/sanity/queries';
import type { RetreatCard, Testimonial, SiteSettings } from '@/types/sanity';
import FitnessRetreatsClient from './FitnessRetreatsClient';

export const metadata: Metadata = {
  title: 'Fitness Retreats for People Who Still Know How to Have Fun | SALTY',
  description:
    'All-inclusive fitness retreats combining daily workouts, surfing, hiking, yoga, local culture, and community travel. SALTY Retreats: sweat, adventure, connection.',
  openGraph: {
    title: 'Fitness Retreats | SALTY Retreats',
    description:
      'Group fitness travel for fun-loving people. Surf, sweat, explore. 7 destinations, 200+ happy guests.',
    url: '/fitness-retreats',
  },
};

export default async function FitnessRetreatsPage() {
  let retreats: RetreatCard[] = [];
  let testimonials: Testimonial[] = [];
  let settings: SiteSettings | null = null;

  try {
    [retreats, testimonials, settings] = await Promise.all([
      client.fetch<RetreatCard[]>(allRetreatsQuery),
      client.fetch<Testimonial[]>(featuredTestimonialsQuery),
      client.fetch<SiteSettings>(siteSettingsQuery),
    ]);
  } catch {
    // Sanity not configured yet
  }

  return (
    <FitnessRetreatsClient
      retreats={retreats || []}
      testimonials={testimonials || []}
      settings={settings}
    />
  );
}
