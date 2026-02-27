import type { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import { allDestinationsQuery } from '@/lib/sanity/queries';
import type { SanityImage } from '@/types/sanity';
import DestinationsIndexClient from './DestinationsIndexClient';

type DestinationSummary = {
  _id: string;
  country: string;
  slug: string;
  heroImage: SanityImage;
  vibeSummary: string;
  retreats: { _id: string; name: string; status: string }[];
};

export const metadata: Metadata = {
  title: 'Destinations | SALTY Retreats',
  description:
    'Explore fitness retreat destinations around the world — Costa Rica, Panama, Morocco, Sicily, El Salvador, Sri Lanka, and more.',
  openGraph: {
    title: 'SALTY Retreat Destinations',
    description: 'Where do you want to get SALTY?',
    url: '/destinations',
  },
};

export default async function DestinationsPage() {
  let destinations: DestinationSummary[] = [];

  try {
    destinations = (await client.fetch<DestinationSummary[]>(allDestinationsQuery)) || [];
  } catch {
    // Sanity not configured yet
  }

  return <DestinationsIndexClient destinations={destinations} />;
}
