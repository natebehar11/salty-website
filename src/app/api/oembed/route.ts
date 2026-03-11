import { NextRequest, NextResponse } from 'next/server';
import { MemoryCache } from '@/lib/cache';
import { sanitizeEmbedHtml } from '@/lib/sanitize-embed';
import type { OEmbedData } from '@/types/landmark';

const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
const cache = new MemoryCache<OEmbedData>({ ttlMs: TWENTY_FOUR_HOURS });

const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
} as const;

const ALLOWED_HOSTS = new Set([
  'instagram.com',
  'www.instagram.com',
  'tiktok.com',
  'www.tiktok.com',
]);

function validateUrl(urlString: string): {
  valid: boolean;
  platform?: 'instagram' | 'tiktok';
} {
  try {
    const url = new URL(urlString);
    if (url.protocol !== 'https:') return { valid: false };
    const host = url.hostname.toLowerCase();
    if (!ALLOWED_HOSTS.has(host)) return { valid: false };
    const platform = host.includes('instagram') ? 'instagram' : 'tiktok';
    return { valid: true, platform };
  } catch {
    return { valid: false };
  }
}

export async function GET(request: NextRequest) {
  const urlParam = request.nextUrl.searchParams.get('url');

  if (!urlParam) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  const decodedUrl = decodeURIComponent(urlParam);
  const { valid, platform } = validateUrl(decodedUrl);

  if (!valid || !platform) {
    return NextResponse.json({ error: 'URL not allowed' }, { status: 403 });
  }

  const cached = cache.get(decodedUrl);
  if (cached) {
    return NextResponse.json(cached, { headers: CACHE_HEADERS });
  }

  try {
    let oembedUrl: string;

    if (platform === 'instagram') {
      const appToken = process.env.FACEBOOK_APP_TOKEN;
      if (!appToken) {
        console.error('[oEmbed] FACEBOOK_APP_TOKEN not configured');
        return NextResponse.json(null);
      }
      oembedUrl = `https://graph.facebook.com/v18.0/instagram_oembed?url=${encodeURIComponent(decodedUrl)}&access_token=${appToken}`;
    } else {
      oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(decodedUrl)}`;
    }

    const response = await fetch(oembedUrl);

    if (!response.ok) {
      console.error(`[oEmbed] ${platform} API error ${response.status}`);
      return NextResponse.json(null);
    }

    const data = await response.json();

    if (!data.html) {
      return NextResponse.json(null);
    }

    const result: OEmbedData = {
      html: sanitizeEmbedHtml(data.html, platform),
      platform,
      thumbnailUrl: data.thumbnail_url || undefined,
    };

    cache.set(decodedUrl, result);

    return NextResponse.json(result, { headers: CACHE_HEADERS });
  } catch (error) {
    console.error('[oEmbed] Fetch error:', error);
    return NextResponse.json(null);
  }
}
