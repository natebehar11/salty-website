import type { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import { allRetreatsQuery } from '@/lib/sanity/queries';
import type { RetreatCard } from '@/types/sanity';
import BookClient from './BookClient';

export const metadata: Metadata = {
  title: 'Book a Retreat | SALTY Retreats',
  description:
    'Ready to go? Pick a SALTY fitness retreat and book your spot. Flexible payment plans available on all trips.',
  openGraph: {
    title: 'Book a SALTY Retreat',
    description:
      'Pick your retreat, choose your room, and lock in your spot with a deposit.',
    url: '/book',
  },
};

export default async function BookPage() {
  let retreats: RetreatCard[] = [];

  try {
    retreats = (await client.fetch<RetreatCard[]>(allRetreatsQuery)) || [];
  } catch {
    // Sanity not configured yet
  }

  return <BookClient retreats={retreats} />;
}
