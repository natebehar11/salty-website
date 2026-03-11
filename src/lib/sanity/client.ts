import { createClient, type SanityClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';

function buildClient(useCdn: boolean, token?: string): SanityClient {
  if (!projectId) {
    // Return a stub that won't crash — fetch calls will throw at runtime,
    // but module-level imports (sitemap, layout) won't blow up the build.
    return createClient({
      projectId: 'not-configured',
      dataset: dataset || 'production',
      apiVersion,
      useCdn,
    });
  }
  return createClient({ projectId, dataset, apiVersion, useCdn, token });
}

export const client = buildClient(true);

export const previewClient = buildClient(false, process.env.SANITY_API_READ_TOKEN);

export function getClient(preview?: boolean) {
  return preview ? previewClient : client;
}
