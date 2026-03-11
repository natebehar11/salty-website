import type { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import {
  allRetreatsQuery,
  allFaqCategoriesQuery,
  siteSettingsQuery,
} from '@/lib/sanity/queries';
import type { RetreatCard, FAQCategory, SiteSettings } from '@/types/sanity';
import AdventuresClient from './AdventuresClient';

/** Revalidate at most every hour when using Sanity */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Our Adventures | Explore Your Next Adventure — SALTY',
  description:
    'Browse all upcoming SALTY fitness retreats across 7 countries. All-inclusive group travel combining workouts, surfing, yoga, culture, and community.',
  openGraph: {
    title: 'Our Adventures — SALTY Retreats',
    description:
      'Pick your trip, pack your bags, and let\'s go. 7 destinations, all-inclusive fitness retreats for fun-loving people.',
    url: '/adventures',
  },
};

export default async function AdventuresPage() {
  let retreats: RetreatCard[] = [];
  let faqCategories: FAQCategory[] = [];
  let settings: SiteSettings | null = null;

  try {
    [retreats, faqCategories, settings] = await Promise.all([
      client.fetch<RetreatCard[]>(allRetreatsQuery),
      client.fetch<FAQCategory[]>(allFaqCategoriesQuery),
      client.fetch<SiteSettings>(siteSettingsQuery),
    ]);
  } catch {
    // Sanity not configured yet — components use fallback data
  }

  return (
    <AdventuresClient
      retreats={retreats || []}
      faqCategories={faqCategories || []}
      settings={settings}
    />
  );
}
