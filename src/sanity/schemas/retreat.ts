import { defineField, defineType, defineArrayMember } from 'sanity';

export const roomTier = defineType({
  name: 'roomTier',
  title: 'Room Tier',
  type: 'object',
  fields: [
    defineField({ name: 'type', title: 'Room Type', type: 'string' }),
    defineField({ name: 'priceUSD', title: 'Price (USD)', type: 'number' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
    defineField({ name: 'highlights', title: 'Highlights', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
    defineField({ name: 'photos', title: 'Room Photos', type: 'array', of: [defineArrayMember({ type: 'image', options: { hotspot: true } })] }),
  ],
  preview: {
    select: { title: 'type', subtitle: 'priceUSD' },
    prepare: ({ title, subtitle }) => ({
      title: title || 'Room',
      subtitle: subtitle ? `$${subtitle} USD` : '',
    }),
  },
});

export const itineraryDay = defineType({
  name: 'itineraryDay',
  title: 'Itinerary Day',
  type: 'object',
  fields: [
    defineField({ name: 'dayNumber', title: 'Day Number', type: 'number', validation: (rule) => rule.required().min(1) }),
    defineField({ name: 'title', title: 'Day Title', type: 'string' }),
    defineField({ name: 'location', title: 'Location', type: 'string', description: 'e.g., "Panama City" or "Santa Catalina"' }),
    defineField({ name: 'summary', title: 'Summary', type: 'string', description: 'Short one-line summary for collapsed view' }),
    defineField({ name: 'description', title: 'Full Description', type: 'text', rows: 4 }),
    defineField({ name: 'photo', title: 'Day Photo', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'mealsIncluded',
      title: 'Meals Included',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        list: [
          { title: 'Breakfast', value: 'breakfast' },
          { title: 'Lunch', value: 'lunch' },
          { title: 'Dinner', value: 'dinner' },
        ],
      },
    }),
    defineField({ name: 'accommodation', title: 'Accommodation Note', type: 'string' }),
  ],
  preview: {
    select: { dayNumber: 'dayNumber', title: 'title', location: 'location' },
    prepare: ({ dayNumber, title, location }) => ({
      title: `Day ${dayNumber}: ${title || 'Untitled'}`,
      subtitle: location || '',
    }),
  },
});

export const activitySection = defineType({
  name: 'activitySection',
  title: 'Activity Section',
  type: 'object',
  fields: [
    defineField({ name: 'name', title: 'Activity Name', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'icon', title: 'Icon', type: 'string', description: 'Activity icon identifier (e.g., sweat, surf, yoga, explore, rest)' }),
    defineField({ name: 'image', title: 'Activity Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'frequency', title: 'Frequency', type: 'string', description: 'e.g., "Daily", "3x per week", "2 sessions"' }),
    defineField({ name: 'videoPlaceholderId', title: 'YouTube Video ID', type: 'string', description: 'YouTube video ID for activity preview' }),
    defineField({ name: 'modalDetails', title: 'Expanded Details', type: 'text', rows: 4, description: 'Longer description shown in the activity detail modal' }),
  ],
});

export const saltyMeterScores = defineType({
  name: 'saltyMeterScores',
  title: 'SALTY Meter Scores',
  type: 'object',
  fields: [
    defineField({ name: 'adventure', title: 'Adventure', type: 'number', validation: (rule) => rule.required().min(1).max(10) }),
    defineField({ name: 'culture', title: 'Culture', type: 'number', validation: (rule) => rule.required().min(1).max(10) }),
    defineField({ name: 'party', title: 'Party', type: 'number', validation: (rule) => rule.required().min(1).max(10) }),
    defineField({ name: 'sweat', title: 'Sweat', type: 'number', validation: (rule) => rule.required().min(1).max(10) }),
    defineField({ name: 'rest', title: 'Rest', type: 'number', validation: (rule) => rule.required().min(1).max(10) }),
    defineField({ name: 'groupSize', title: 'Group Size Scale', type: 'number', description: '1 = ~6 guests, 10 = 60+ guests', validation: (rule) => rule.min(1).max(10) }),
  ],
});

export const videoTestimonial = defineType({
  name: 'videoTestimonial',
  title: 'Video Testimonial',
  type: 'object',
  fields: [
    defineField({ name: 'videoId', title: 'YouTube Video ID', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'guestName', title: 'Guest Name', type: 'string' }),
    defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g., "Panama 2024 Guest"' }),
  ],
  preview: {
    select: { title: 'guestName', subtitle: 'label' },
  },
});

export const sampleDayEntry = defineType({
  name: 'sampleDayEntry',
  title: 'Sample Day Entry',
  type: 'object',
  fields: [
    defineField({ name: 'time', title: 'Time', type: 'string', description: 'e.g., "6:30 AM"' }),
    defineField({ name: 'activity', title: 'Activity', type: 'string', description: 'e.g., "Sunrise yoga on the beach"' }),
  ],
  preview: {
    select: { title: 'time', subtitle: 'activity' },
  },
});

export const quickFact = defineType({
  name: 'quickFact',
  title: 'Quick Fact',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g., "Duration", "Group Size"' }),
    defineField({ name: 'value', title: 'Value', type: 'string', description: 'e.g., "8 days / 7 nights", "35-45 guests"' }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'value' },
  },
});

export const retreatColorTheme = defineType({
  name: 'retreatColorTheme',
  title: 'Retreat Color Theme',
  type: 'object',
  fields: [
    defineField({ name: 'primary', title: 'Primary', type: 'string', validation: (rule) => rule.required().regex(/^#[0-9A-Fa-f]{6}$/, { name: 'hex color' }) }),
    defineField({ name: 'secondary', title: 'Secondary', type: 'string', validation: (rule) => rule.required().regex(/^#[0-9A-Fa-f]{6}$/, { name: 'hex color' }) }),
    defineField({ name: 'accent', title: 'Accent', type: 'string', validation: (rule) => rule.required().regex(/^#[0-9A-Fa-f]{6}$/, { name: 'hex color' }) }),
    defineField({ name: 'surface', title: 'Surface', type: 'string', validation: (rule) => rule.required().regex(/^#[0-9A-Fa-f]{6}$/, { name: 'hex color' }) }),
    defineField({ name: 'dark', title: 'Dark', type: 'string', validation: (rule) => rule.required().regex(/^#[0-9A-Fa-f]{6}$/, { name: 'hex color' }) }),
    defineField({ name: 'textOnAccent', title: 'Text on Accent', type: 'string', validation: (rule) => rule.required().regex(/^#[0-9A-Fa-f]{6}$/, { name: 'hex color' }) }),
    defineField({ name: 'ticketTextColor', title: 'Ticket Text Color', type: 'string', validation: (rule) => rule.required().regex(/^#[0-9A-Fa-f]{6}$/, { name: 'hex color' }) }),
  ],
});

export const retreat = defineType({
  name: 'retreat',
  title: 'Retreat',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'content', title: 'Content' },
    { name: 'pricing', title: 'Pricing & Booking' },
    { name: 'activities', title: 'Activities & Itinerary' },
    { name: 'accommodation', title: 'Accommodation' },
    { name: 'media', title: 'Media & Gallery' },
    { name: 'people', title: 'Coaches & Testimonials' },
    { name: 'seo', title: 'SEO & Meta' },
    { name: 'theme', title: 'Color Theme' },
  ],
  fields: [
    // ── Basic Info ──
    defineField({
      name: 'name',
      title: 'Destination Name',
      type: 'string',
      group: 'basic',
      description: 'e.g., "Panama", "Morocco", "Sicily"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'officialName',
      title: 'Official Retreat Name',
      type: 'string',
      group: 'basic',
      description: 'e.g., "City to Sea", "Beyond the Dunes", "Endless Summer"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'basic',
      description: 'e.g., "panama-fitness-retreat"',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          { title: 'Active — Selling', value: 'active' },
          { title: 'Selling Fast', value: 'selling-fast' },
          { title: 'Sold Out', value: 'sold-out' },
          { title: 'Early Bird', value: 'early-bird' },
          { title: 'New Trip', value: 'new-trip' },
          { title: 'Coming Soon', value: 'coming-soon' },
          { title: 'Past', value: 'past' },
        ],
      },
      initialValue: 'active',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      group: 'basic',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      group: 'basic',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'dateDisplay',
      title: 'Date Display Override',
      type: 'string',
      group: 'basic',
      description: 'Optional. e.g., "Feb 22 – Mar 1, 2026". Auto-generated from dates if empty.',
    }),
    defineField({
      name: 'totalDays',
      title: 'Total Days',
      type: 'number',
      group: 'basic',
      description: 'Number of days (not nights) — used for per-day pricing',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'basic',
      description: 'e.g., "Panama City + Santa Catalina, Panama"',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      group: 'basic',
    }),
    defineField({
      name: 'groupSize',
      title: 'Group Size',
      type: 'object',
      group: 'basic',
      fields: [
        defineField({ name: 'min', title: 'Min', type: 'number' }),
        defineField({ name: 'max', title: 'Max', type: 'number' }),
      ],
    }),
    defineField({
      name: 'skillLevel',
      title: 'Skill Level',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          { title: 'All Levels', value: 'all-levels' },
          { title: 'Beginner Friendly', value: 'beginner-friendly' },
          { title: 'Intermediate', value: 'intermediate' },
        ],
      },
    }),
    defineField({
      name: 'soloTravelerPercent',
      title: 'Solo Traveler %',
      type: 'number',
      group: 'basic',
      description: 'Percentage of guests who come solo (e.g., 65)',
    }),
    defineField({
      name: 'spotsRemaining',
      title: 'Spots Remaining',
      type: 'number',
      group: 'basic',
      description: 'Manual override. Leave empty to hide.',
    }),
    defineField({
      name: 'quickFacts',
      title: 'Quick Facts',
      type: 'array',
      group: 'basic',
      of: [defineArrayMember({ type: 'quickFact' })],
      description: 'Key-value pairs shown as quick reference (Duration, Per Day, etc.)',
    }),
    defineField({
      name: 'coBrand',
      title: 'Co-Brand Partner',
      type: 'object',
      group: 'basic',
      description: 'Optional partner for co-branded retreats (e.g., Hustl+Flow, Synergy Physio)',
      fields: [
        defineField({ name: 'name', title: 'Partner Name', type: 'string' }),
        defineField({ name: 'logo', title: 'Partner Logo', type: 'image' }),
        defineField({ name: 'logoUrl', title: 'Partner Logo URL (fallback)', type: 'url', description: 'External logo URL if not uploaded' }),
      ],
    }),

    // ── Content ──
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Sensory Sentence',
      type: 'string',
      group: 'content',
      description: 'One compelling sensory line below the destination name',
    }),
    defineField({
      name: 'heroVideoUrl',
      title: 'Hero Video URL',
      type: 'url',
      group: 'content',
      description: 'Optional background video for the hero section',
    }),
    defineField({
      name: 'geoDefinition',
      title: 'GEO Definition Block',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'AI-extractable definition. Format: "A [destination] [activity] retreat combines..."',
    }),
    defineField({
      name: 'experienceNarrative',
      title: 'Experience Narrative',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'block' })],
      description: '2-3 paragraphs: sensory details, daily rhythm, transformation',
    }),
    defineField({
      name: 'experienceImage',
      title: 'Experience Section Image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      description: 'Hero image for the experience narrative section',
    }),
    defineField({
      name: 'experienceImageUrl',
      title: 'Experience Image URL (fallback)',
      type: 'url',
      group: 'content',
      description: 'External image URL if not uploaded to Sanity',
    }),
    defineField({
      name: 'forYouIf',
      title: '"This retreat is for you if..." Checklist',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'bestFor',
      title: 'Best For',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Array of bullet points. e.g., "Solo travelers who want surf + social"',
    }),
    defineField({
      name: 'maybeNotFor',
      title: 'Maybe Not For',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Honest self-selection bullets. e.g., "Those seeking silence-only vibes"',
    }),
    defineField({
      name: 'dailyRhythm',
      title: 'Daily Rhythm Summary',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'morning', title: 'Morning', type: 'string' }),
        defineField({ name: 'midday', title: 'Midday', type: 'string' }),
        defineField({ name: 'afternoon', title: 'Afternoon', type: 'string' }),
        defineField({ name: 'evening', title: 'Evening', type: 'string' }),
      ],
    }),

    // ── Pricing & Booking ──
    defineField({
      name: 'roomTiers',
      title: 'Room Pricing Tiers',
      type: 'array',
      group: 'pricing',
      of: [defineArrayMember({ type: 'roomTier' })],
    }),
    defineField({
      name: 'lowestPrice',
      title: 'Lowest Price (USD)',
      type: 'number',
      group: 'pricing',
      description: 'Starting price for cards — should match cheapest room tier',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'depositAmount',
      title: 'Deposit Amount (USD)',
      type: 'number',
      group: 'pricing',
      initialValue: 350,
    }),
    defineField({
      name: 'paymentPolicy',
      title: 'Payment Policy',
      type: 'text',
      group: 'pricing',
      rows: 3,
    }),
    defineField({
      name: 'cancellationPolicy',
      title: 'Cancellation Policy',
      type: 'text',
      group: 'pricing',
      rows: 3,
    }),
    defineField({
      name: 'bookingUrl',
      title: 'Booking Checkout URL',
      type: 'url',
      group: 'pricing',
      description: 'GHL/Stripe embedded checkout URL',
    }),

    // ── Activities & Itinerary ──
    defineField({
      name: 'activities',
      title: 'Activities',
      type: 'array',
      group: 'activities',
      of: [defineArrayMember({ type: 'activitySection' })],
    }),
    defineField({
      name: 'itinerary',
      title: 'Day-by-Day Itinerary',
      type: 'array',
      group: 'activities',
      of: [defineArrayMember({ type: 'itineraryDay' })],
    }),
    defineField({
      name: 'saltyMeter',
      title: 'SALTY Meter Scores',
      type: 'saltyMeterScores',
      group: 'activities',
    }),
    defineField({
      name: 'saltyMeterBlurb',
      title: 'SALTY Meter Blurb',
      type: 'text',
      group: 'activities',
      rows: 3,
      description: 'Plain-English narrative explaining the SALTY Meter scores for this retreat',
    }),
    defineField({
      name: 'sampleDay',
      title: 'Sample Day Timeline',
      type: 'array',
      group: 'activities',
      of: [defineArrayMember({ type: 'sampleDayEntry' })],
      description: 'Hour-by-hour breakdown of a typical day',
    }),

    // ── Accommodation ──
    defineField({
      name: 'accommodationName',
      title: 'Property Name',
      type: 'string',
      group: 'accommodation',
    }),
    defineField({
      name: 'accommodationDescription',
      title: 'Property Description',
      type: 'text',
      group: 'accommodation',
      rows: 3,
    }),
    defineField({
      name: 'accommodationFeatures',
      title: 'Property Features',
      type: 'array',
      group: 'accommodation',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'accommodationPhotos',
      title: 'Property Photos',
      type: 'array',
      group: 'accommodation',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
    }),

    // ── Media & Gallery ──
    defineField({
      name: 'youtubeVideoIds',
      title: 'YouTube Video IDs',
      type: 'array',
      group: 'media',
      of: [defineArrayMember({ type: 'string' })],
      description: 'YouTube video IDs for the retreat video gallery',
    }),
    defineField({
      name: 'videoTestimonials',
      title: 'Video Testimonials',
      type: 'array',
      group: 'media',
      of: [defineArrayMember({ type: 'videoTestimonial' })],
    }),
    defineField({
      name: 'photoStripImages',
      title: 'Photo Strip Images',
      type: 'array',
      group: 'media',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
      description: 'Horizontal scrolling photo strip images',
    }),
    defineField({
      name: 'photoStripUrls',
      title: 'Photo Strip URLs (fallback)',
      type: 'array',
      group: 'media',
      of: [defineArrayMember({ type: 'url' })],
      description: 'External image URLs if not uploaded to Sanity CDN',
    }),
    defineField({
      name: 'villaPhotos',
      title: 'Villa/Property Gallery',
      type: 'array',
      group: 'media',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
      description: 'Additional property photos for the gallery section',
    }),
    defineField({
      name: 'villaPhotoUrls',
      title: 'Villa Photo URLs (fallback)',
      type: 'array',
      group: 'media',
      of: [defineArrayMember({ type: 'url' })],
      description: 'External villa photo URLs if not uploaded to Sanity CDN',
    }),

    // ── Inclusions ──
    defineField({
      name: 'included',
      title: "What's Included",
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'notIncluded',
      title: "What's Not Included",
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'string' })],
    }),

    // ── People ──
    defineField({
      name: 'coaches',
      title: 'Coaches',
      type: 'array',
      group: 'people',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'coach' }] })],
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      group: 'people',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'testimonial' }] })],
    }),

    // ── FAQ ──
    defineField({
      name: 'faqs',
      title: 'Retreat FAQs',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'question', title: 'Question', type: 'string' }),
          defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 3 }),
        ],
        preview: {
          select: { title: 'question' },
        },
      })],
    }),

    // ── Color Theme ──
    defineField({
      name: 'colorTheme',
      title: 'Color Theme',
      type: 'retreatColorTheme',
      group: 'theme',
    }),

    // ── SEO ──
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      description: '50-60 chars. Format: "[Destination] [Activity] Retreat [Year] | [Duration] | SALTY"',
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
      rows: 2,
      description: '150-160 chars.',
      validation: (rule) => rule.max(170),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      group: 'seo',
    }),
  ],

  preview: {
    select: {
      title: 'officialName',
      subtitle: 'name',
      media: 'heroImage',
      status: 'status',
    },
    prepare: ({ title, subtitle, media, status }) => ({
      title: `${title || 'Untitled'} — ${subtitle || ''}`,
      subtitle: status || 'draft',
      media,
    }),
  },

  orderings: [
    {
      title: 'Start Date',
      name: 'startDateAsc',
      by: [{ field: 'startDate', direction: 'asc' }],
    },
  ],
});
