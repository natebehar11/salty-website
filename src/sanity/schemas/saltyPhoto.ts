import { defineField, defineType } from 'sanity';

export const saltyPhoto = defineType({
  name: 'saltyPhoto',
  title: 'Photo Library',
  type: 'document',
  description: 'AI-tagged photo library. Uploaded via scripts/upload-photos-to-sanity.mjs.',
  fields: [
    defineField({
      name: 'asset',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'originalFilename',
      title: 'Original Filename',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'folderPath',
      title: 'Folder Path',
      type: 'string',
      description: 'Relative path from upload root, e.g. "panama/beach-sunset.jpg"',
      readOnly: true,
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
      description: 'AI-generated accessibility description. Edit to improve.',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      description: 'Full country name, e.g. "Panama"',
    }),
    defineField({
      name: 'countryCode',
      title: 'Country Code',
      type: 'string',
      description: 'ISO 3166-1 alpha-2, e.g. "PA"',
      validation: (rule) =>
        rule.max(2).custom((val) => {
          if (!val) return true;
          return /^[A-Z]{2}$/.test(val) ? true : 'Must be 2 uppercase letters (e.g. PA, MX, CR)';
        }),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Hero — Wide scenic/landscape banners', value: 'hero' },
          { title: 'Accommodation — Rooms, beds, pools, property', value: 'accommodation' },
          { title: 'Activity — Yoga, surf, hiking, fitness', value: 'activity' },
          { title: 'Coach — Instructor portraits or action shots', value: 'coach' },
          { title: 'Destination — Cities, landmarks, culture', value: 'destination' },
          { title: 'Food — Meals, drinks, dining', value: 'food' },
          { title: 'Social — Group guests socializing', value: 'social' },
          { title: 'Other', value: 'other' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'AI-generated descriptive tags. Add or remove as needed.',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'visionConfidence',
      title: 'AI Confidence',
      type: 'string',
      readOnly: true,
      description: 'How confident the AI was in its tagging.',
      options: {
        list: [
          { title: 'High', value: 'high' },
          { title: 'Medium', value: 'medium' },
          { title: 'Low', value: 'low' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'originalFilename',
      subtitle: 'category',
      media: 'asset',
      country: 'country',
    },
    prepare: ({ title, subtitle, media, country }) => ({
      title: title || 'Untitled',
      subtitle: [country, subtitle].filter(Boolean).join(' · '),
      media,
    }),
  },
  orderings: [
    {
      title: 'Country A–Z',
      name: 'countryAsc',
      by: [{ field: 'country', direction: 'asc' }],
    },
    {
      title: 'Category A–Z',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
  ],
});
