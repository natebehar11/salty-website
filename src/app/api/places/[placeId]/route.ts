import { NextRequest, NextResponse } from 'next/server';
import { MemoryCache } from '@/lib/cache';
import type { PlacesData } from '@/types/landmark';

const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
const cache = new MemoryCache<PlacesData>({ ttlMs: TWENTY_FOUR_HOURS });

const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
} as const;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ placeId: string }> }
) {
  const { placeId } = await params;

  if (!placeId || !/^[A-Za-z0-9_-]+$/.test(placeId)) {
    return NextResponse.json(null, { status: 400 });
  }

  const cached = cache.get(placeId);
  if (cached) {
    return NextResponse.json(cached, { headers: CACHE_HEADERS });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    console.error('[Places] GOOGLE_PLACES_API_KEY not configured');
    return NextResponse.json(null);
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${placeId}`;
    const response = await fetch(url, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'rating,userRatingCount,photos',
      },
    });

    if (!response.ok) {
      console.error(`[Places] API error ${response.status} for ${placeId}`);
      return NextResponse.json(null);
    }

    const place = await response.json();

    // Places API (New) returns photos[].name — proxy through our photo route
    let photoUrl: string | null = null;
    if (place.photos?.[0]?.name) {
      photoUrl = `/api/places/photo?ref=${encodeURIComponent(place.photos[0].name)}`;
    }

    const result: PlacesData = {
      rating: place.rating ?? 0,
      reviewCount: place.userRatingCount ?? 0,
      photoUrl,
    };

    cache.set(placeId, result);

    return NextResponse.json(result, { headers: CACHE_HEADERS });
  } catch (error) {
    console.error('[Places] Fetch error:', error);
    return NextResponse.json(null);
  }
}
