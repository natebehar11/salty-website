export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
// Fallback hardcoded — NEXT_PUBLIC_ values are not secret and this prevents
// build failures when env vars aren't configured yet.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '8xwsbgjv';

// Warn at build time if projectId is missing — data fetches will silently return null
if (!projectId && typeof window === 'undefined') {
  console.warn(
    '[SALTY] NEXT_PUBLIC_SANITY_PROJECT_ID is not set. ' +
    'Create a project at sanity.io/manage and add the ID to .env.local'
  );
}

// Used for server-side fetching with token (previews, mutations)
export const token = process.env.SANITY_API_READ_TOKEN || '';
