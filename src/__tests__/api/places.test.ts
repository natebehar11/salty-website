import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';

// Reset modules between tests so cache state doesn't leak
let GET: typeof import('@/app/api/places/[placeId]/route').GET;

beforeEach(async () => {
  vi.resetModules();
  vi.restoreAllMocks();
  const mod = await import('@/app/api/places/[placeId]/route');
  GET = mod.GET;
});

afterEach(() => {
  vi.restoreAllMocks();
});

function makeRequest(placeId: string) {
  const request = new NextRequest(`http://localhost:3000/api/places/${placeId}`);
  const params = Promise.resolve({ placeId });
  return { request, params };
}

describe('GET /api/places/[placeId]', () => {
  it('returns null with 400 for an empty placeId', async () => {
    const { request, params } = makeRequest('');
    const response = await GET(request, { params });
    expect(response.status).toBe(400);
    expect(await response.json()).toBeNull();
  });

  it('returns null with 400 for invalid placeId characters', async () => {
    const { request, params } = makeRequest('ChIJ<script>alert(1)</script>');
    const response = await GET(request, { params });
    expect(response.status).toBe(400);
  });

  it('returns null when GOOGLE_PLACES_API_KEY is not configured', async () => {
    delete process.env.GOOGLE_PLACES_API_KEY;
    const { request, params } = makeRequest('ChIJN1t_tDeuEmsRUsoyG83frY4');
    const response = await GET(request, { params });
    expect(await response.json()).toBeNull();
  });

  it('returns PlacesData on successful API response', async () => {
    process.env.GOOGLE_PLACES_API_KEY = 'test-key';

    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          rating: 4.7,
          userRatingCount: 2412,
          photos: [{ name: 'places/ChIJ123/photos/abc' }],
        }),
        { status: 200 }
      )
    );

    const { request, params } = makeRequest('ChIJ123');
    const response = await GET(request, { params });
    const data = await response.json();

    expect(data).toEqual({
      rating: 4.7,
      reviewCount: 2412,
      photoUrl: '/api/places/photo?ref=places%2FChIJ123%2Fphotos%2Fabc',
    });
    expect(fetchSpy).toHaveBeenCalledOnce();

    delete process.env.GOOGLE_PLACES_API_KEY;
  });

  it('returns null photoUrl when no photos in response', async () => {
    process.env.GOOGLE_PLACES_API_KEY = 'test-key';

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          rating: 4.2,
          userRatingCount: 100,
          photos: [],
        }),
        { status: 200 }
      )
    );

    const { request, params } = makeRequest('ChIJ456');
    const response = await GET(request, { params });
    const data = await response.json();

    expect(data.photoUrl).toBeNull();

    delete process.env.GOOGLE_PLACES_API_KEY;
  });

  it('returns null when Google API returns non-200', async () => {
    process.env.GOOGLE_PLACES_API_KEY = 'test-key';

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response('Not Found', { status: 404 })
    );

    const { request, params } = makeRequest('ChIJbad');
    const response = await GET(request, { params });
    expect(await response.json()).toBeNull();

    delete process.env.GOOGLE_PLACES_API_KEY;
  });

  it('returns null when fetch throws a network error', async () => {
    process.env.GOOGLE_PLACES_API_KEY = 'test-key';

    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network error'));

    const { request, params } = makeRequest('ChIJerror');
    const response = await GET(request, { params });
    expect(await response.json()).toBeNull();

    delete process.env.GOOGLE_PLACES_API_KEY;
  });

  it('sets Cache-Control header on success', async () => {
    process.env.GOOGLE_PLACES_API_KEY = 'test-key';

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ rating: 4.0, userRatingCount: 50 }), {
        status: 200,
      })
    );

    const { request, params } = makeRequest('ChIJcache');
    const response = await GET(request, { params });

    expect(response.headers.get('Cache-Control')).toBe(
      'public, s-maxage=86400, stale-while-revalidate=3600'
    );

    delete process.env.GOOGLE_PLACES_API_KEY;
  });
});
