import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';

let GET: typeof import('@/app/api/oembed/route').GET;
let sanitizeEmbedHtml: typeof import('@/lib/sanitize-embed').sanitizeEmbedHtml;

beforeEach(async () => {
  vi.resetModules();
  vi.restoreAllMocks();
  const mod = await import('@/app/api/oembed/route');
  GET = mod.GET;
  const sanitizeMod = await import('@/lib/sanitize-embed');
  sanitizeEmbedHtml = sanitizeMod.sanitizeEmbedHtml;
});

afterEach(() => {
  vi.restoreAllMocks();
});

function makeRequest(url?: string) {
  const searchParams = url ? `?url=${encodeURIComponent(url)}` : '';
  return new NextRequest(`http://localhost:3000/api/oembed${searchParams}`);
}

describe('GET /api/oembed', () => {
  it('returns 400 when url param is missing', async () => {
    const response = await GET(makeRequest());
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Missing url parameter');
  });

  it('returns 403 for non-allowed domains', async () => {
    const response = await GET(makeRequest('https://youtube.com/watch?v=123'));
    expect(response.status).toBe(403);
    const data = await response.json();
    expect(data.error).toBe('URL not allowed');
  });

  it('returns 403 for http (non-HTTPS) URLs', async () => {
    const response = await GET(
      makeRequest('http://www.instagram.com/reel/abc123')
    );
    expect(response.status).toBe(403);
  });

  it('returns 403 for malformed URLs', async () => {
    const response = await GET(makeRequest('not-a-url'));
    expect(response.status).toBe(403);
  });

  it('returns null when FACEBOOK_APP_TOKEN is not set for Instagram', async () => {
    delete process.env.FACEBOOK_APP_TOKEN;
    const response = await GET(
      makeRequest('https://www.instagram.com/reel/abc123/')
    );
    expect(await response.json()).toBeNull();
  });

  it('returns OEmbedData for successful TikTok response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          html: '<blockquote class="tiktok-embed">video</blockquote><script src="https://evil.js"></script>',
          thumbnail_url: 'https://p16.tiktok.com/thumb.jpg',
        }),
        { status: 200 }
      )
    );

    const response = await GET(
      makeRequest('https://www.tiktok.com/@user/video/12345')
    );
    const data = await response.json();

    expect(data.platform).toBe('tiktok');
    expect(data.html).toContain('tiktok-embed');
    expect(data.html).toContain('https://www.tiktok.com/embed.js');
    expect(data.html).not.toContain('evil.js');
    expect(data.thumbnailUrl).toBe('https://p16.tiktok.com/thumb.jpg');
  });

  it('returns OEmbedData for successful Instagram response', async () => {
    process.env.FACEBOOK_APP_TOKEN = 'test-token';

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          html: '<blockquote class="instagram-media">reel</blockquote><script async src="https://www.instagram.com/embed.js"></script>',
          thumbnail_url: 'https://scontent.cdninstagram.com/thumb.jpg',
        }),
        { status: 200 }
      )
    );

    const response = await GET(
      makeRequest('https://www.instagram.com/reel/abc123/')
    );
    const data = await response.json();

    expect(data.platform).toBe('instagram');
    expect(data.html).toContain('instagram-media');
    expect(data.html).toContain('https://www.instagram.com/embed.js');
    expect(data.thumbnailUrl).toBe(
      'https://scontent.cdninstagram.com/thumb.jpg'
    );

    delete process.env.FACEBOOK_APP_TOKEN;
  });

  it('returns null when upstream returns non-200', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response('Not Found', { status: 404 })
    );

    const response = await GET(
      makeRequest('https://www.tiktok.com/@user/video/deleted')
    );
    expect(await response.json()).toBeNull();
  });

  it('returns null when upstream returns no html field', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ title: 'Video' }), { status: 200 })
    );

    const response = await GET(
      makeRequest('https://www.tiktok.com/@user/video/nohtml')
    );
    expect(await response.json()).toBeNull();
  });

  it('returns null when fetch throws', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(
      new Error('Network error')
    );

    const response = await GET(
      makeRequest('https://www.tiktok.com/@user/video/error')
    );
    expect(await response.json()).toBeNull();
  });

  it('sets Cache-Control header on success', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({ html: '<blockquote>video</blockquote>' }),
        { status: 200 }
      )
    );

    const response = await GET(
      makeRequest('https://www.tiktok.com/@user/video/cache')
    );
    expect(response.headers.get('Cache-Control')).toBe(
      'public, s-maxage=86400, stale-while-revalidate=3600'
    );
  });

  it('omits thumbnailUrl when not in upstream response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({ html: '<blockquote>video</blockquote>' }),
        { status: 200 }
      )
    );

    const response = await GET(
      makeRequest('https://www.tiktok.com/@user/video/nothumb')
    );
    const data = await response.json();
    expect(data.thumbnailUrl).toBeUndefined();
  });
});

describe('sanitizeEmbedHtml', () => {
  it('strips arbitrary script tags', () => {
    const input = '<blockquote>content</blockquote><script>alert("xss")</script>';
    const result = sanitizeEmbedHtml(input, 'instagram');
    expect(result).not.toContain('alert("xss")');
    expect(result).toContain('blockquote');
  });

  it('strips script tags with src attributes', () => {
    const input = '<div>ok</div><script src="https://evil.com/bad.js"></script>';
    const result = sanitizeEmbedHtml(input, 'tiktok');
    expect(result).not.toContain('evil.com');
  });

  it('preserves non-script HTML content', () => {
    const input =
      '<blockquote class="instagram-media"><div>content</div></blockquote>';
    const result = sanitizeEmbedHtml(input, 'instagram');
    expect(result).toContain('instagram-media');
    expect(result).toContain('<div>content</div>');
  });

  it('appends Instagram embed script for instagram platform', () => {
    const result = sanitizeEmbedHtml('<div>test</div>', 'instagram');
    expect(result).toContain(
      '<script async src="https://www.instagram.com/embed.js"></script>'
    );
    expect(result).not.toContain('tiktok.com/embed.js');
  });

  it('appends TikTok embed script for tiktok platform', () => {
    const result = sanitizeEmbedHtml('<div>test</div>', 'tiktok');
    expect(result).toContain(
      '<script async src="https://www.tiktok.com/embed.js"></script>'
    );
    expect(result).not.toContain('instagram.com/embed.js');
  });
});
