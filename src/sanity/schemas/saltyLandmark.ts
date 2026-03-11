import { defineField, defineType } from 'sanity';

export const socialVideo = defineType({
  name: 'socialVideo',
  title: 'Social Video',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Instagram', value: 'instagram' },
          { title: 'TikTok', value: 'tiktok' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Video URL',
      type: 'url',
      validation: (rule) =>
        rule.required().uri({
          scheme: ['https'],
          allowRelative: false,
        }),
      description: 'Full URL of the Instagram Reel or TikTok video.',
    }),
    defineField({
      name: 'caption',
      title: 'Video Note (optional)',
      type: 'string',
      description:
        'Optional editorial note for this specific video. e.g. "Watch the barrel at 0:08"',
    }),
  ],
  preview: {
    select: { title: 'url', subtitle: 'platform' },
    prepare: ({ title, subtitle }) => ({
      title: title || 'No URL',
      subtitle: subtitle === 'instagram' ? 'Instagram' : 'TikTok',
    }),
  },
});

export const saltyLandmark = defineType({
  name: 'saltyLandmark',
  title: 'SALTY Landmark',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'content', title: 'Content & Video' },
    { name: 'map', title: 'Map Position' },
  ],
  fields: [
    // ── Basic Info ──
    defineField({
      name: 'name',
      title: 'Landmark Name',
      type: 'string',
      group: 'basic',
      description: 'e.g. "La Punta" or "Verse Coffee Roasters"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          { title: 'Surf Break', value: 'surf' },
          { title: 'Café', value: 'cafe' },
          { title: 'Bar', value: 'bar' },
          { title: 'Restaurant', value: 'restaurant' },
          { title: 'Gym / Fitness', value: 'gym' },
          { title: 'Hike / Trail', value: 'hike' },
          { title: 'Waterfall', value: 'waterfall' },
          { title: 'Beach', value: 'beach' },
          { title: 'Market', value: 'market' },
          { title: 'Cultural Site', value: 'cultural' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'destination',
      title: 'Retreat',
      type: 'reference',
      to: [{ type: 'retreat' }],
      group: 'basic',
      validation: (rule) => rule.required(),
      description: 'Which retreat destination this landmark belongs to.',
    }),
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      group: 'basic',
      initialValue: false,
      description:
        'Only published landmarks appear on the site. Requires: SALTY note AND (1+ video OR Google Place ID).',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      group: 'basic',
      description: 'Lower numbers appear first in list view.',
      initialValue: 50,
    }),

    defineField({
      name: 'tags',
      title: 'Discovery Tags',
      type: 'array',
      group: 'basic',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Hidden Gem', value: 'hidden-gem' },
          { title: 'Local Favorite', value: 'local-favorite' },
          { title: 'Sunrise Spot', value: 'sunrise-spot' },
          { title: 'Sunset Spot', value: 'sunset-spot' },
          { title: 'Budget Friendly', value: 'budget-friendly' },
          { title: 'Splurge-Worthy', value: 'splurge-worthy' },
          { title: 'Solo Friendly', value: 'solo-friendly' },
          { title: 'Group Hangout', value: 'group-hangout' },
          { title: 'Walkable', value: 'walkable' },
          { title: 'Worth the Drive', value: 'worth-the-drive' },
        ],
      },
      description: 'Tags for discovery filtering. Helps users find landmarks that match their vibe.',
    }),

    // ── Content & Video ──
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      description:
        'Fallback visual when no video or Google photo exists. Recommended: upload one even if you have videos.',
    }),
    defineField({
      name: 'saltyNote',
      title: 'SALTY Note',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (rule) => rule.required().max(200),
      description:
        'Your personal take. Max 200 chars. e.g. "Best left on the coast. Paddle out at sunrise, thank us later."',
    }),
    defineField({
      name: 'saltyNoteAuthor',
      title: 'Note By',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'Erin', value: 'erin' },
          { title: 'Nate', value: 'nate' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'googlePlaceId',
      title: 'Google Place ID',
      type: 'string',
      group: 'content',
      description:
        'Find at: developers.google.com/maps/documentation/places/web-service/place-id',
    }),
    defineField({
      name: 'socialEmbeds',
      title: 'Social Videos',
      type: 'array',
      group: 'content',
      of: [{ type: 'socialVideo' }],
      validation: (rule) => rule.max(5),
      description: 'Curated videos. Maximum 5. First video is the hero.',
    }),

    // ── Map Position ──
    defineField({
      name: 'coordinates',
      title: 'Map Position',
      type: 'object',
      group: 'map',
      description: 'Percentage position on the SVG map (0–100 for both axes).',
      fields: [
        defineField({
          name: 'x',
          title: 'X Position (%)',
          type: 'number',
          validation: (rule) => rule.required().min(0).max(100),
        }),
        defineField({
          name: 'y',
          title: 'Y Position (%)',
          type: 'number',
          validation: (rule) => rule.required().min(0).max(100),
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      retreatName: 'destination.name',
      published: 'isPublished',
    },
    prepare: ({ title, subtitle, retreatName, published }) => ({
      title: `${published ? '' : '[DRAFT] '}${title || 'Untitled'}`,
      subtitle: [subtitle, retreatName].filter(Boolean).join(' · '),
    }),
  },

  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrder',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
    {
      title: 'Name A–Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Category',
      name: 'category',
      by: [{ field: 'category', direction: 'asc' }],
    },
  ],
});
