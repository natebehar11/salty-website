import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('POST /api/contact', () => {
  let POST: (request: Request) => Promise<Response>;

  beforeEach(async () => {
    vi.resetModules();
    delete process.env.GHL_API_KEY;
    delete process.env.GHL_LOCATION_ID;

    const module = await import('@/app/api/contact/route');
    POST = module.POST;
  });

  function makeRequest(body: unknown) {
    return new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  }

  it('returns 400 when name is missing', async () => {
    const res = await POST(makeRequest({ email: 'test@example.com', message: 'Hello' }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe('Name is required');
  });

  it('returns 400 when email is missing', async () => {
    const res = await POST(makeRequest({ name: 'Test', message: 'Hello' }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe('Email is required');
  });

  it('returns 400 for invalid email format', async () => {
    const res = await POST(makeRequest({ name: 'Test', email: 'bad', message: 'Hello' }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe('Invalid email format');
  });

  it('returns 400 when message is missing', async () => {
    const res = await POST(makeRequest({ name: 'Test', email: 'test@example.com' }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe('Message is required');
  });

  it('returns 400 when name is too long', async () => {
    const res = await POST(makeRequest({
      name: 'A'.repeat(201),
      email: 'test@example.com',
      message: 'Hello',
    }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe('Name too long');
  });

  it('returns 400 when message is too long', async () => {
    const res = await POST(makeRequest({
      name: 'Test',
      email: 'test@example.com',
      message: 'A'.repeat(5001),
    }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe('Message too long (max 5000 characters)');
  });

  it('returns success with dev note when GHL is not configured', async () => {
    const res = await POST(makeRequest({
      name: 'Test User',
      email: 'test@example.com',
      message: 'I have a question about retreats',
      retreatSlug: 'costa-rica',
      source: 'retreat-page',
    }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data._dev).toContain('GHL not configured');
  });

  it('returns 500 on malformed JSON', async () => {
    const res = await POST(new Request('http://localhost/api/contact', {
      method: 'POST',
      body: '{{invalid}}',
    }));
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toBe('Internal server error');
  });

  it('returns 400 for empty name (whitespace only)', async () => {
    const res = await POST(makeRequest({
      name: '   ',
      email: 'test@example.com',
      message: 'Hello',
    }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe('Name is required');
  });

  it('returns 400 for empty message (whitespace only)', async () => {
    const res = await POST(makeRequest({
      name: 'Test',
      email: 'test@example.com',
      message: '   ',
    }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe('Message is required');
  });
});
