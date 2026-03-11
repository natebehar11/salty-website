import { retreat, roomTier, itineraryDay, activitySection, saltyMeterScores, retreatColorTheme, videoTestimonial, sampleDayEntry, quickFact } from './retreat';
import { coach } from './coach';
import { testimonial } from './testimonial';
import { faqCategory } from './faqCategory';
import { blogPost } from './blogPost';
import { destination } from './destination';
import { siteSettings } from './siteSettings';
import { saltyPhoto } from './saltyPhoto';
import { saltyLandmark, socialVideo } from './saltyLandmark';

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
  saltyLandmark,

  // Object types (used within documents)
  roomTier,
  itineraryDay,
  activitySection,
  saltyMeterScores,
  retreatColorTheme,
  videoTestimonial,
  sampleDayEntry,
  quickFact,
  socialVideo,
];
