import { defineField, defineType } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'guestName',
      title: 'Guest Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      description: 'e.g., "Toronto, Canada"',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'retreatAttended',
      title: 'Retreat Attended',
      type: 'reference',
      to: [{ type: 'retreat' }],
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar Photo',
      type: 'image',
      options: { hotspot: true },
      description: '1:1 square crop, displayed as circle',
    }),
    defineField({
      name: 'isVideo',
      title: 'Is Video Testimonial?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'videoId',
      title: 'YouTube Video ID',
      type: 'string',
      description: 'YouTube video ID (not full URL). e.g., "dQw4w9WgXcQ"',
      hidden: ({ parent }) => !parent?.isVideo,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Solo Traveler', value: 'solo' },
          { title: 'Repeat Guest', value: 'repeat' },
          { title: 'Fitness Concerns', value: 'fitness-concerns' },
          { title: 'First Timer', value: 'first-timer' },
          { title: 'Featured', value: 'featured' },
        ],
      },
      description: 'Used for filtering. Retreat pages should show: 1 solo, 1 fitness concerns, 1 repeat.',
    }),
  ],
  preview: {
    select: {
      title: 'guestName',
      subtitle: 'quote',
      media: 'avatar',
    },
    prepare: ({ title, subtitle, media }) => ({
      title: title || 'Anonymous',
      subtitle: subtitle ? `"${subtitle.slice(0, 80)}..."` : '',
      media,
    }),
  },
});
