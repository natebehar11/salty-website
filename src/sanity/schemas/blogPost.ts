import { defineField, defineType } from 'sanity';

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Destinations', value: 'destinations' },
          { title: 'Fitness', value: 'fitness' },
          { title: 'Solo Travel', value: 'solo-travel' },
          { title: 'Packing & Prep', value: 'packing-prep' },
          { title: 'Behind the Scenes', value: 'behind-the-scenes' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 2,
      description: 'Short summary for cards and meta description',
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'coach' }],
      description: 'Author (usually Erin or Nate)',
    }),
    defineField({
      name: 'relatedRetreats',
      title: 'Related Retreats',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'retreat' }] }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (rule) => rule.required(),
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
      title: 'title',
      subtitle: 'category',
      media: 'heroImage',
    },
  },
  orderings: [
    {
      title: 'Published Date',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
});
