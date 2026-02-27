import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from '@/sanity/schemas';
import { dataset, projectId } from '@/sanity/env';

export default defineConfig({
  name: 'salty-website',
  title: 'SALTY Retreats',

  projectId,
  dataset,

  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Site Settings (singleton)
            S.listItem()
              .title('Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),

            // Retreats
            S.documentTypeListItem('retreat').title('Retreats'),
            S.documentTypeListItem('coach').title('Coaches'),
            S.documentTypeListItem('testimonial').title('Testimonials'),
            S.divider(),

            // Content
            S.documentTypeListItem('blogPost').title('Blog Posts'),
            S.documentTypeListItem('destination').title('Destination Guides'),
            S.documentTypeListItem('faqCategory').title('FAQ Categories'),
            S.divider(),

            // Photo Library
            S.documentTypeListItem('saltyPhoto').title('Photo Library'),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
