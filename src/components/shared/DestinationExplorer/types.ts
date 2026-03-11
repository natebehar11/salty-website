export type {
  SaltyLandmark,
  LandmarkCategory,
  LandmarkTag,
  SocialEmbed,
  PlacesData,
  OEmbedData,
} from '@/types/landmark';

export type ExplorerView = 'map' | 'list';

export const CATEGORY_LABELS: Record<string, string> = {
  surf: 'Surf',
  cafe: 'Café',
  bar: 'Bar',
  restaurant: 'Restaurant',
  gym: 'Move',
  hike: 'Hike',
  waterfall: 'Waterfall',
  beach: 'Beach',
  market: 'Market',
  cultural: 'Cultural',
};

export const TAG_LABELS: Record<string, string> = {
  'hidden-gem': 'Hidden Gem',
  'local-favorite': 'Local Favorite',
  'sunrise-spot': 'Sunrise Spot',
  'sunset-spot': 'Sunset Spot',
  'budget-friendly': 'Budget Friendly',
  'splurge-worthy': 'Splurge Worthy',
  'solo-friendly': 'Solo Friendly',
  'group-hangout': 'Group Hangout',
  'walkable': 'Walkable',
  'worth-the-drive': 'Worth the Drive',
};

export const CATEGORY_FILTERS = [
  { value: 'all' as const, label: 'All' },
  { value: 'surf' as const, label: 'Surf' },
  { value: 'cafe' as const, label: 'Eat & Drink' },
  { value: 'gym' as const, label: 'Move' },
  { value: 'hike' as const, label: 'Explore' },
] as const;

/** Maps filter value to actual categories (some filters group multiple categories) */
export const FILTER_TO_CATEGORIES: Record<string, string[]> = {
  all: [],
  surf: ['surf', 'beach'],
  cafe: ['cafe', 'bar', 'restaurant'],
  gym: ['gym'],
  hike: ['hike', 'waterfall', 'market', 'cultural'],
};
