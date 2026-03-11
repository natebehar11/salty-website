/**
 * Adapter: Sanity Retreat → RetreatData (component shape)
 *
 * All retreat child-components consume `RetreatData` from retreat-data.ts.
 * This adapter maps the Sanity CMS document shape to that interface so
 * we can fetch from Sanity without rewriting 15+ components.
 */

import type { Retreat as SanityRetreat } from '@/types/sanity';
import type { RetreatData, RetreatStatus as ComponentStatus } from '@/components/retreat/retreat-data';
import { urlFor } from '@/lib/sanity/image';
import type { PortableTextBlock } from 'sanity';

// ── Helpers ──

function sanityImageUrl(image: unknown): string {
  if (!image) return '';
  try {
    return urlFor(image).url();
  } catch {
    return '';
  }
}

function portableTextToStrings(blocks?: PortableTextBlock[]): string[] {
  if (!blocks?.length) return [];
  return blocks
    .filter((b) => b._type === 'block')
    .map((block) => {
      const children = block.children as Array<{ text: string }> | undefined;
      return children?.map((c) => c.text).join('') ?? '';
    })
    .filter(Boolean);
}

function mapStatus(s: SanityRetreat['status']): ComponentStatus {
  switch (s) {
    case 'past':
      return 'complete';
    case 'early-bird':
    case 'new-trip':
      return 'active';
    default:
      return s as ComponentStatus;
  }
}

function formatDateDisplay(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  const sStr = s.toLocaleDateString('en-US', opts);
  const eStr = e.toLocaleDateString('en-US', { ...opts, year: 'numeric' });
  return `${sStr} – ${eStr}`;
}

// ── Main Adapter ──

export function sanityRetreatToRetreatData(r: SanityRetreat): RetreatData {
  return {
    slug: r.slug,
    destination: r.name,
    officialName: r.officialName,
    heroImageUrl: sanityImageUrl(r.heroImage),
    status: mapStatus(r.status),

    dates: {
      start: r.startDate,
      end: r.endDate,
      display: r.dateDisplay || formatDateDisplay(r.startDate, r.endDate),
    },
    duration: r.totalDays,
    priceFrom: r.lowestPrice,
    groupSize: r.groupSize ? `${r.groupSize.min}-${r.groupSize.max}` : '20-35',
    country: r.country,
    location: r.location,
    skillLevel: r.skillLevel,
    soloTravelerPercent: r.soloTravelerPercent,
    spotsRemaining: r.spotsRemaining,
    depositAmount: r.depositAmount,
    bookingUrl: r.bookingUrl,

    geoDescription: r.geoDefinition,
    quickFacts: (r.quickFacts ?? []).map((f) => ({ label: f.label, value: f.value })),

    included: r.included ?? [],
    notIncluded: r.notIncluded ?? [],

    experienceNarrative: portableTextToStrings(r.experienceNarrative),
    experienceImageUrl: r.experienceImageUrl || sanityImageUrl(r.experienceImage),

    forYouIf: r.forYouIf ?? [],
    bestFor: r.bestFor ?? [],
    maybeNotFor: r.maybeNotFor ?? [],

    activities: (r.activities ?? []).map((a) => ({
      name: a.name,
      description: a.description,
      imageUrl: sanityImageUrl(a.image),
      frequency: a.frequency,
      videoPlaceholderId: a.videoPlaceholderId,
      modalDetails: a.modalDetails,
    })),

    dailyRhythm: r.dailyRhythm
      ? [
          { period: 'Morning', description: r.dailyRhythm.morning },
          { period: 'Midday', description: r.dailyRhythm.midday },
          { period: 'Afternoon', description: r.dailyRhythm.afternoon },
          { period: 'Evening', description: r.dailyRhythm.evening },
        ]
      : [],

    itinerary: (r.itinerary ?? []).map((d) => ({
      day: d.dayNumber,
      title: d.title,
      location: d.location ?? '',
      summary: d.summary ?? '',
      details: d.description,
      photoUrl: sanityImageUrl(d.photo),
    })),

    roomTiers: (r.roomTiers ?? []).map((t) => ({
      name: t.type,
      price: t.priceUSD,
      description: t.description,
      features: t.highlights,
      imageUrl: t.photos?.length ? sanityImageUrl(t.photos[0]) : undefined,
    })),

    accommodation: {
      name: r.accommodationName,
      description: r.accommodationDescription,
      features: r.accommodationFeatures ?? [],
    },

    coaches: (r.coaches ?? []).map((c) => ({
      name: c.name,
      bio: c.bio,
      specialties: c.specialties ?? [],
      personality: c.personality,
      cardColor: c.cardColor,
      starColor: c.starColor ?? '#FED260',
      textColor: c.textColor,
      photoUrl: sanityImageUrl(c.photo),
    })),

    saltyMeter: {
      sweat: r.saltyMeter?.sweat ?? 5,
      adventure: r.saltyMeter?.adventure ?? 5,
      party: r.saltyMeter?.party ?? 5,
      rest: r.saltyMeter?.rest ?? 5,
      culture: r.saltyMeter?.culture ?? 5,
      groupSize: r.groupSize?.max ?? 35,
    },
    saltyMeterBlurb: r.saltyMeterBlurb ?? '',

    testimonials: (r.testimonials ?? []).map((t) => ({
      guestName: t.guestName,
      quote: t.quote,
      rating: t.rating,
      retreatLabel: t.retreatName ?? r.name,
    })),

    faqs: (r.faqs ?? []).map((f) => ({ question: f.question, answer: f.answer })),

    youtubeVideoIds: r.youtubeVideoIds ?? [],
    paymentPolicy: r.paymentPolicy,
    cancellationPolicy: r.cancellationPolicy,

    villaPhotos: (r.villaPhotoUrls ?? []).length > 0
      ? r.villaPhotoUrls!
      : (r.villaPhotos ?? []).map(sanityImageUrl),

    sampleDay: (r.sampleDay ?? []).map((s) => ({
      time: s.time,
      label: s.activity,
    })),

    videoTestimonials: (r.videoTestimonials ?? []).map((v) => ({
      id: v.videoId,
      name: v.name,
      label: v.label ?? '',
    })),

    photoStripImages: (r.photoStripUrls ?? []).length > 0
      ? r.photoStripUrls!
      : (r.photoStripImages ?? []).map(sanityImageUrl),

    coBrand: r.coBrand
      ? { name: r.coBrand.name, logoUrl: r.coBrand.logo ? sanityImageUrl(r.coBrand.logo) : undefined }
      : undefined,
  };
}
