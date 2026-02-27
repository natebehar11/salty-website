import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  description: 'Global site configuration. Only one instance should exist.',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'SALTY Retreats',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'Fitness Retreats for Fun-Loving People',
    }),

    // ── Stats (displayed in social proof, footer, etc.) ──
    defineField({
      name: 'totalGuests',
      title: 'Total Guests',
      type: 'number',
      description: 'e.g., 200',
    }),
    defineField({
      name: 'averageRating',
      title: 'Average Rating',
      type: 'number',
      description: 'e.g., 4.9',
    }),
    defineField({
      name: 'countriesCount',
      title: 'Countries Count',
      type: 'number',
      description: 'e.g., 7',
    }),
    defineField({
      name: 'soloTravelerPercent',
      title: 'Global Solo Traveler %',
      type: 'number',
      description: 'e.g., 65',
    }),

    // ── Contact ──
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'hello@getsaltyretreats.com',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp Number',
      type: 'string',
      initialValue: '+14318291135',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'tiktok',
      title: 'TikTok URL',
      type: 'url',
    }),

    // ── Homepage Social Proof Quotes ──
    defineField({
      name: 'socialProofQuotes',
      title: 'Social Proof Quotes (Homepage bar)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'quote', title: 'Quote', type: 'string' }),
          defineField({ name: 'author', title: 'Author', type: 'string' }),
        ],
      }],
    }),

    // ── SEO defaults ──
    defineField({
      name: 'defaultOgImage',
      title: 'Default OG Image',
      type: 'image',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Default Meta Description',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
});
