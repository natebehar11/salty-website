import type { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import {
  featuredTestimonialsQuery,
  videoTestimonialsQuery,
  siteSettingsQuery,
} from '@/lib/sanity/queries';
import type { Testimonial, SiteSettings } from '@/types/sanity';
import ReviewsClient from './ReviewsClient';

export const metadata: Metadata = {
  title: 'Guest Reviews & Testimonials | SALTY Retreats',
  description:
    'Hear from real SALTY retreat guests. Video testimonials, written reviews, and the stories behind the trips. Rated 4.9/5 by 200+ travelers.',
  openGraph: {
    title: 'SALTY Retreats Reviews',
    description:
      'Real reviews from real guests. See what people say about SALTY fitness retreats.',
    url: '/reviews',
  },
};

export default async function ReviewsPage() {
  let testimonials: Testimonial[] = [];
  let videoTestimonials: Testimonial[] = [];
  let settings: SiteSettings | null = null;

  try {
    [testimonials, videoTestimonials, settings] = await Promise.all([
      client.fetch<Testimonial[]>(featuredTestimonialsQuery),
      client.fetch<Testimonial[]>(videoTestimonialsQuery),
      client.fetch<SiteSettings>(siteSettingsQuery),
    ]);
  } catch {
    // Sanity not configured yet
  }

  return (
    <ReviewsClient
      testimonials={testimonials || []}
      videoTestimonials={videoTestimonials || []}
      settings={settings}
    />
  );
}
