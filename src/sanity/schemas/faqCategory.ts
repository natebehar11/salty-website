import { defineField, defineType } from 'sanity';

export const faqCategory = defineType({
  name: 'faqCategory',
  title: 'FAQ Category',
  type: 'document',
  description: 'FAQ categories for the /faq page. Each category becomes a tab.',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      description: 'e.g., "About Fitness Retreats", "Solo Travel", "Booking & Payment"',
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
      name: 'order',
      title: 'Tab Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
    defineField({
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'question', title: 'Question', type: 'string', validation: (rule) => rule.required() }),
          defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: (rule) => rule.required() }),
        ],
        preview: {
          select: { title: 'question' },
        },
      }],
    }),
  ],
  preview: {
    select: { title: 'name', questions: 'questions' },
    prepare: ({ title, questions }) => ({
      title: title || 'Untitled Category',
      subtitle: `${questions?.length || 0} questions`,
    }),
  },
  orderings: [
    {
      title: 'Tab Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
