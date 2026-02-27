import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity/client';
import { destinationBySlugQuery, destinationSlugsQuery } from '@/lib/sanity/queries';
import type { Destination } from '@/types/sanity';
import DestinationDetailClient from './DestinationDetailClient';

interface DestinationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<string[]>(destinationSlugsQuery);
    return (slugs || []).map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const dest = await client.fetch<Destination>(destinationBySlugQuery, { slug });
    if (!dest) return { title: 'Destination Not Found | SALTY' };
    return {
      title: dest.seoTitle || `${dest.country} Fitness Retreats | SALTY Retreats`,
      description: dest.seoDescription || dest.vibeSummary,
      openGraph: {
        title: `${dest.country} Fitness Retreats`,
        description: dest.vibeSummary,
        url: `/destinations/${dest.slug}`,
      },
    };
  } catch {
    return { title: 'SALTY Destinations' };
  }
}

export default async function DestinationDetailPage({ params }: DestinationPageProps) {
  const { slug } = await params;

  let destination: Destination | null = null;
  try {
    destination = await client.fetch<Destination>(destinationBySlugQuery, { slug });
  } catch {
    // Sanity not configured
  }

  if (!destination) {
    notFound();
  }

  return <DestinationDetailClient destination={destination} />;
}
