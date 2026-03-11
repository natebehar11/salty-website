import type { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import { allFaqCategoriesQuery } from '@/lib/sanity/queries';
import type { FAQCategory } from '@/types/sanity';
import { generateFAQSchema, FAQ_CATEGORIES, FAQ_CATEGORIES_FOR_CLIENT } from '@/lib/faq-data';
import FAQClient from './FAQClient';

/** Revalidate FAQ page at most every hour when using Sanity */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'FAQ - Wellness Retreat Questions Answered | SALTY Retreats',
  description:
    "Get answers about SALTY retreats: solo travel, fitness requirements, pricing, what's included, and how to book. Real answers from real humans.",
  openGraph: {
    title: 'FAQ - Wellness Retreat Questions Answered | SALTY Retreats',
    description:
      "Get answers about SALTY retreats: solo travel, fitness requirements, pricing, what's included, and how to book. Real answers from real humans.",
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

  const displayCategories = categories.length > 0 ? categories : FAQ_CATEGORIES_FOR_CLIENT;
  const faqSchema = generateFAQSchema(
    categories.length > 0
      ? categories.flatMap((c) => c.questions || [])
      : FAQ_CATEGORIES
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQClient categories={displayCategories} />
    </>
  );
}
