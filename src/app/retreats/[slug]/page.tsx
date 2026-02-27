import type { Metadata } from 'next';
import RetreatDetailClient from './RetreatDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const titles: Record<string, string> = {
    'panama-fitness-retreat': 'Panama Fitness Retreat 2026 | 9-Day City to Sea Adventure | SALTY',
  };

  const descriptions: Record<string, string> = {
    'panama-fitness-retreat':
      'Join SALTY\'s 9-day Panama fitness retreat. Surf, daily workouts, yoga, and coastal exploration from Panama City to Santa Catalina. March 8–16, 2026.',
  };

  return {
    title: titles[slug] || 'Fitness Retreat | SALTY Retreats',
    description:
      descriptions[slug] ||
      'Join a SALTY fitness retreat. Surf, yoga, daily workouts, and adventure travel with a group of fun-loving people.',
  };
}

export default async function RetreatDetailPage({ params }: PageProps) {
  const { slug } = await params;

  return <RetreatDetailClient slug={slug} />;
}
