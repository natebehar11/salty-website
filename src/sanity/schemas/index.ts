import { retreat, roomTier, itineraryDay, activitySection, saltyMeterScores, retreatColorTheme } from './retreat';
import { coach } from './coach';
import { testimonial } from './testimonial';
import { faqCategory } from './faqCategory';
import { blogPost } from './blogPost';
import { destination } from './destination';
import { siteSettings } from './siteSettings';
import { saltyPhoto } from './saltyPhoto';

export const schemaTypes = [
  // Documents
  retreat,
  coach,
  testimonial,
  faqCategory,
  blogPost,
  destination,
  siteSettings,
  saltyPhoto,

  // Object types (used within documents)
  roomTier,
  itineraryDay,
  activitySection,
  saltyMeterScores,
  retreatColorTheme,
];
