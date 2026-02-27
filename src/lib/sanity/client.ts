import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use CDN for published content (faster)
});

// Client for draft/preview content (bypasses CDN)
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
});

export function getClient(preview?: boolean) {
  return preview ? previewClient : client;
}
