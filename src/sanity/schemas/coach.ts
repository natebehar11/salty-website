import { defineField, defineType } from 'sanity';

export const coach = defineType({
  name: 'coach',
  title: 'Coach',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      description: 'e.g., "Co-Founder, Creative & Guest Experience"',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 5,
      description: '50-75 words. Who they are, what guests expect, humanizing detail, why they love the destination.',
    }),
    defineField({
      name: 'photo',
      title: 'Portrait Photo',
      type: 'image',
      options: { hotspot: true },
      description: '3:4 portrait ratio',
    }),
    defineField({
      name: 'specialties',
      title: 'Specialties / Disciplines',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g., ["CPT", "RYT-200", "Strength & Conditioning"]',
    }),
    defineField({
      name: 'personality',
      title: 'Personality Tag',
      type: 'string',
      description: 'Short personality descriptor for the specialty bar. e.g., "The Hype Queen"',
    }),
    defineField({
      name: 'cardColor',
      title: 'Card Frame Color',
      type: 'string',
      description: 'Hex color for this coach\'s card border/frame. Fixed per coach, not retreat-dependent.',
      validation: (rule) => rule.regex(/^#[0-9A-Fa-f]{6}$/, { name: 'hex color' }),
    }),
    defineField({
      name: 'isFounder',
      title: 'Is Founder?',
      type: 'boolean',
      initialValue: false,
      description: 'Founders appear on the About page with extended bios',
    }),
    defineField({
      name: 'founderBio',
      title: 'Extended Founder Bio',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Longer bio for the About page. Only used if isFounder is true.',
      hidden: ({ parent }) => !parent?.isFounder,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers display first',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
