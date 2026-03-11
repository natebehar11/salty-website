import type { SanityImage } from './sanity';

// ── Landmark Categories ──

export type LandmarkCategory =
  | 'surf'
  | 'cafe'
  | 'bar'
  | 'restaurant'
  | 'gym'
  | 'hike'
  | 'waterfall'
  | 'beach'
  | 'market'
  | 'cultural';

// ── Discovery Tags ──

export type LandmarkTag =
  | 'hidden-gem'
  | 'local-favorite'
  | 'sunrise-spot'
  | 'sunset-spot'
  | 'budget-friendly'
  | 'splurge-worthy'
  | 'solo-friendly'
  | 'group-hangout'
  | 'walkable'
  | 'worth-the-drive';

// ── Social Embeds ──

export interface SocialEmbed {
  _key: string;
  platform: 'instagram' | 'tiktok';
  url: string;
  caption?: string;
}

// ── Landmark (shape returned by GROQ queries) ──

export interface SaltyLandmark {
  _id: string;
  name: string;
  category: LandmarkCategory;
  tags: LandmarkTag[];
  /** Retreat slug (resolved via GROQ projection) */
  destination: string;
  /** Retreat _id for reference */
  destinationId: string;
  coordinates: {
    x: number;
    y: number;
  };
  heroImage?: SanityImage;
  googlePlaceId?: string;
  saltyNote: string;
  saltyNoteAuthor: 'erin' | 'nate';
  socialEmbeds: SocialEmbed[];
  sortOrder: number;
  isPublished: boolean;
}

// ── API Response Types ──

export interface PlacesData {
  rating: number;
  reviewCount: number;
  photoUrl: string | null;
}

export interface OEmbedData {
  html: string;
  platform: 'instagram' | 'tiktok';
  thumbnailUrl?: string;
}
