import { NextRequest, NextResponse } from 'next/server';

/**
 * Proxies Google Places photos so the API key stays server-side.
 * The client only sees `/api/places/photo?ref=places/ChIJ.../photos/abc`.
 */

// Validates ref matches the expected Google Places photo resource name
// e.g. "places/ChIJN1t_tDeuEmsR/photos/AelY_Ct7qi-Uk"
const PLACES_PHOTO_REF_PATTERN = /^places\/[A-Za-z0-9_-]+\/photos\/[A-Za-z0-9_-]+$/;

export async function GET(request: NextRequest) {
  const ref = request.nextUrl.searchParams.get('ref');
  if (!ref || !PLACES_PHOTO_REF_PATTERN.test(ref)) {
    return new NextResponse(null, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    console.error('[Places Photo] GOOGLE_PLACES_API_KEY not configured');
    return new NextResponse(null, { status: 503 });
  }

  try {
    const url = `https://places.googleapis.com/v1/${ref}/media?maxHeightPx=400&maxWidthPx=600&key=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`[Places Photo] upstream error ${response.status}`);
      return new NextResponse(null, { status: 502 });
    }

    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  } catch (error) {
    console.error('[Places Photo] Fetch error:', error);
    return new NextResponse(null, { status: 502 });
  }
}
