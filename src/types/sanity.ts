import type { PortableTextBlock, Image } from 'sanity';

// ── Shared primitives ──

export type SanityImage = Image & {
  asset: {
    _ref: string;
    _type: 'reference';
  };
};

// ── Retreat ──

export type RetreatStatus =
  | 'active'
  | 'selling-fast'
  | 'sold-out'
  | 'early-bird'
  | 'new-trip'
  | 'coming-soon'
  | 'past';

export type RoomTier = {
  type: string;
  priceUSD: number;
  description: string;
  highlights: string[];
  photos: SanityImage[];
};

export type ItineraryDay = {
  dayNumber: number;
  title: string;
  description: string;
  photo?: SanityImage;
  mealsIncluded: ('breakfast' | 'lunch' | 'dinner')[];
  accommodation?: string;
};

export type ActivitySection = {
  name: string;
  description: string;
  icon?: string;
};

export type SaltyMeterScores = {
  adventure: number;
  culture: number;
  party: number;
  sweat: number;
  rest: number;
};

export type RetreatColorTheme = {
  primary: string;
  secondary: string;
  accent: string;
  surface: string;
  dark: string;
  textOnAccent: string;
  ticketTextColor: string;
};

export type DailyRhythm = {
  morning: string;
  midday: string;
  afternoon: string;
  evening: string;
};

export type RetreatFAQ = {
  question: string;
  answer: string;
};

/** Full retreat document (for detail pages) */
export type Retreat = {
  _id: string;
  name: string;
  officialName: string;
  slug: string;
  status: RetreatStatus;
  startDate: string;
  endDate: string;
  totalDays: number;
  location: string;
  country: string;
  groupSize: { min: number; max: number };
  skillLevel: 'all-levels' | 'beginner-friendly' | 'intermediate';
  soloTravelerPercent: number;
  spotsRemaining?: number;

  heroImage: SanityImage;
  heroHeadline: string;
  geoDefinition: string;
  experienceNarrative: PortableTextBlock[];
  forYouIf: string[];
  bestFor: string;
  maybeNotFor: string;
  dailyRhythm: DailyRhythm;

  roomTiers: RoomTier[];
  lowestPrice: number;
  depositAmount: number;
  paymentPolicy: string;
  cancellationPolicy: string;
  bookingUrl?: string;

  activities: ActivitySection[];
  itinerary: ItineraryDay[];
  saltyMeter: SaltyMeterScores;

  accommodationName: string;
  accommodationDescription: string;
  accommodationFeatures: string[];
  accommodationPhotos: SanityImage[];

  included: string[];
  notIncluded: string[];

  coaches: Coach[];
  testimonials: Testimonial[];
  faqs: RetreatFAQ[];

  colorTheme: RetreatColorTheme;

  seoTitle: string;
  seoDescription: string;
  ogImage?: SanityImage;
};

/** Retreat card data (for lists/grids) */
export type RetreatCard = Pick<
  Retreat,
  | '_id'
  | 'name'
  | 'officialName'
  | 'slug'
  | 'status'
  | 'startDate'
  | 'endDate'
  | 'totalDays'
  | 'location'
  | 'country'
  | 'lowestPrice'
  | 'groupSize'
  | 'soloTravelerPercent'
  | 'spotsRemaining'
  | 'heroImage'
  | 'colorTheme'
  | 'saltyMeter'
>;

// ── Coach ──

export type Coach = {
  _id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  photo: SanityImage;
  specialties: string[];
  personality: string;
  cardColor: string;
  isFounder: boolean;
  founderBio?: PortableTextBlock[];
};

// ── Testimonial ──

export type Testimonial = {
  _id: string;
  guestName: string;
  city: string;
  year: number;
  quote: string;
  rating: number;
  avatar?: SanityImage;
  isVideo: boolean;
  videoId?: string;
  tags: string[];
  retreatName?: string; // Resolved from reference
};

// ── FAQ ──

export type FAQQuestion = {
  question: string;
  answer: string;
};

export type FAQCategory = {
  _id: string;
  name: string;
  slug: string;
  questions: FAQQuestion[];
};

// ── Blog ──

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  category: 'destinations' | 'fitness' | 'solo-travel' | 'packing-prep' | 'behind-the-scenes';
  excerpt: string;
  heroImage: SanityImage;
  content: PortableTextBlock[];
  publishedAt: string;
  author: Pick<Coach, '_id' | 'name' | 'photo' | 'bio'>;
  relatedRetreats?: RetreatCard[];
  seoTitle?: string;
  seoDescription?: string;
};

/** Blog post card data (for lists) */
export type BlogPostCard = Pick<
  BlogPost,
  '_id' | 'title' | 'slug' | 'category' | 'excerpt' | 'heroImage' | 'publishedAt'
> & {
  authorName: string;
};

// ── Destination ──

export type Destination = {
  _id: string;
  country: string;
  slug: string;
  heroImage: SanityImage;
  vibeSummary: string;
  description: PortableTextBlock[];
  retreats: RetreatCard[];
  relatedPosts: BlogPostCard[];
  faqs: FAQQuestion[];
  seoTitle?: string;
  seoDescription?: string;
};

// ── Site Settings ──

export type SocialProofQuote = {
  quote: string;
  author: string;
};

export type SiteSettings = {
  title: string;
  tagline: string;
  totalGuests: number;
  averageRating: number;
  countriesCount: number;
  soloTravelerPercent: number;
  email: string;
  whatsapp: string;
  instagram: string;
  tiktok: string;
  socialProofQuotes: SocialProofQuote[];
  defaultOgImage?: SanityImage;
  seoDescription: string;
};
