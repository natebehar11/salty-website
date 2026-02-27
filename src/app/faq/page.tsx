import type { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import { allFaqCategoriesQuery } from '@/lib/sanity/queries';
import type { FAQCategory } from '@/types/sanity';
import FAQClient from './FAQClient';

export const metadata: Metadata = {
  title: 'Fitness Retreat Questions Answered | SALTY Retreats FAQ',
  description:
    'Everything you need to know about SALTY fitness retreats — booking, payment plans, solo travel, what\'s included, fitness levels, destinations, and logistics.',
  openGraph: {
    title: 'SALTY Retreats FAQ',
    description:
      'Got questions about fitness retreats? We\'ve got answers. Everything from booking to packing to what to expect.',
    url: '/faq',
  },
};

export default async function FAQPage() {
  let categories: FAQCategory[] = [];

  try {
    categories = (await client.fetch<FAQCategory[]>(allFaqCategoriesQuery)) || [];
  } catch {
    // Sanity not configured yet
  }

  return <FAQClient categories={categories} />;
}
