import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity/client';
import {
  retreatBySlugQuery,
  retreatSlugsQuery,
  landmarksByRetreatSlugQuery,
} from '@/lib/sanity/queries';
import type { Retreat } from '@/types/sanity';
import type { SaltyLandmark } from '@/types/landmark';
import { sanityRetreatToRetreatData } from '@/lib/retreat-adapter';
import RetreatDetailClient from './RetreatDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(retreatSlugsQuery).catch(() => []);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const retreat = await client.fetch<Retreat | null>(retreatBySlugQuery, { slug }).catch(() => null);

  if (!retreat) {
    return {
      title: 'Fitness Retreat | SALTY Retreats',
      description:
        'Join a SALTY fitness retreat. Surf, yoga, daily workouts, and adventure travel with a group of fun-loving people.',
    };
  }

  return {
    title: retreat.seoTitle || `${retreat.name} Fitness Retreat | SALTY Retreats`,
    description:
      retreat.seoDescription ||
      `Join SALTY's ${retreat.totalDays}-day ${retreat.name} fitness retreat. ${retreat.geoDefinition}`,
    openGraph: {
      images: retreat.ogImage
        ? [{ url: retreat.ogImage.asset._ref }]
        : retreat.heroImage
          ? [{ url: retreat.heroImage.asset._ref }]
          : undefined,
    },
  };
}

export default async function RetreatDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [sanityRetreat, landmarks] = await Promise.all([
    client.fetch<Retreat | null>(retreatBySlugQuery, { slug }).catch(() => null),
    client.fetch<SaltyLandmark[]>(landmarksByRetreatSlugQuery, { slug }).catch(() => [] as SaltyLandmark[]),
  ]);

  if (!sanityRetreat) {
    notFound();
  }

  const retreat = sanityRetreatToRetreatData(sanityRetreat);

  return <RetreatDetailClient retreat={retreat} landmarks={landmarks} />;
}
