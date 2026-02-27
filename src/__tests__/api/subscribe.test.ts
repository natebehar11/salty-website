import { describe, it, expect, vi, beforeEach } from 'vitest';

// We test the route handler by importing and calling it directly
// Next.js API routes export POST/GET functions that accept Request objects

describe('POST /api/subscribe', () => {
  let POST: (request: Request) => Promise<Response>;

  beforeEach(async () => {
    vi.resetModules();
    // Clear env vars
    delete process.env.GHL_API_KEY;
    delete process.env.GHL_LOCATION_ID;

    const module = await import('@/app/api/subscribe/route');
    POST = module.POST;
  });

  function makeRequest(body: unknown) {
    return new Request('http://localhost/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  }

  it('returns 400 when email is missing', async () => {
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe('Email is required');
  });

  it('returns 400 for invalid email format', async () => {
    const res = await POST(makeRequest({ email: 'notanemail' }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe('Invalid email format');
  });

  it('returns 400 for email without domain', async () => {
    const res = await POST(makeRequest({ email: 'user@' }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe('Invalid email format');
  });

  it('returns success with dev note when GHL is not configured', async () => {
    const res = await POST(makeRequest({ email: 'test@example.com', source: 'homepage' }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data._dev).toContain('GHL not configured');
  });

  it('returns 500 on unexpected error', async () => {
    const res = await POST(new Request('http://localhost/api/subscribe', {
      method: 'POST',
      body: 'invalid json{{{',
    }));
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toBe('Internal server error');
  });
});
