import type { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import {
  allRetreatsQuery,
  pastRetreatsQuery,
  allFaqCategoriesQuery,
  siteSettingsQuery,
} from '@/lib/sanity/queries';
import type { RetreatCard, FAQCategory, SiteSettings, SanityImage } from '@/types/sanity';
import RetreatsHubClient from './RetreatsHubClient';

type PastRetreat = {
  _id: string;
  name: string;
  officialName: string;
  slug: string;
  startDate: string;
  heroImage: SanityImage;
};

/** Revalidate at most every hour when using Sanity */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Upcoming Fitness Retreats 2025–2026 | SALTY Retreats',
  description:
    'Browse all SALTY fitness retreats. Surf, sweat, and explore with a crew of fun-loving travelers in destinations like Costa Rica, Panama, Morocco, Sicily, and more.',
  openGraph: {
    title: 'Upcoming Fitness Retreats | SALTY Retreats',
    description:
      'Find your next adventure. All-inclusive fitness retreats in stunning destinations worldwide.',
    url: '/retreats',
  },
};

export default async function RetreatsPage() {
  let retreats: RetreatCard[] = [];
  let pastRetreats: PastRetreat[] = [];
  let faqCategories: FAQCategory[] = [];
  let settings: SiteSettings | null = null;

  try {
    [retreats, pastRetreats, faqCategories, settings] = await Promise.all([
      client.fetch<RetreatCard[]>(allRetreatsQuery),
      client.fetch<PastRetreat[]>(pastRetreatsQuery),
      client.fetch<FAQCategory[]>(allFaqCategoriesQuery),
      client.fetch<SiteSettings>(siteSettingsQuery),
    ]);
  } catch {
    // Sanity not configured yet — render with fallback data
  }

  return (
    <RetreatsHubClient
      retreats={retreats || []}
      pastRetreats={pastRetreats || []}
      faqCategories={faqCategories || []}
      settings={settings}
    />
  );
}
