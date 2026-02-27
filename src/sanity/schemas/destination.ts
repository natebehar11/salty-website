import { defineField, defineType } from 'sanity';

export const destination = defineType({
  name: 'destination',
  title: 'Destination Guide',
  type: 'document',
  description: 'SEO landing pages for each destination country (/destinations/[country])',
  fields: [
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'country', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'vibeSummary',
      title: 'Vibe Summary',
      type: 'string',
      description: 'Short vibe description for destination cards. e.g., "Surf, jungle, and city energy"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Rich SEO content about this destination',
    }),
    defineField({
      name: 'retreats',
      title: 'Retreats in this Destination',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'retreat' }] }],
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Blog Posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blogPost' }] }],
    }),
    defineField({
      name: 'faqs',
      title: 'Destination FAQs',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'question', title: 'Question', type: 'string' }),
          defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 3 }),
        ],
        preview: {
          select: { title: 'question' },
        },
      }],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.max(170),
    }),
  ],
  preview: {
    select: {
      title: 'country',
      media: 'heroImage',
    },
  },
});
