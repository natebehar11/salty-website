import { NextResponse } from 'next/server';

/**
 * POST /api/subscribe
 *
 * Email signup endpoint — forwards to GoHighLevel (GHL) when API keys are configured.
 * Used by the EmailSignup component across the site.
 *
 * Body: { email: string, source?: string }
 * source = page identifier (e.g. "homepage", "retreats-hub", "footer")
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, source } = body as { email?: string; source?: string };

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // GHL integration — uncomment and configure when API keys are available
    const ghlApiKey = process.env.GHL_API_KEY;
    const ghlLocationId = process.env.GHL_LOCATION_ID;

    if (ghlApiKey && ghlLocationId) {
      const ghlResponse = await fetch(
        `https://services.leadconnectorhq.com/contacts/`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${ghlApiKey}`,
            'Content-Type': 'application/json',
            Version: '2021-07-28',
          },
          body: JSON.stringify({
            email,
            locationId: ghlLocationId,
            source: source || 'website',
            tags: ['website-signup', source ? `source:${source}` : ''].filter(Boolean),
          }),
        }
      );

      if (!ghlResponse.ok) {
        console.error('GHL subscribe error:', await ghlResponse.text());
        return NextResponse.json(
          { error: 'Subscription service unavailable' },
          { status: 502 }
        );
      }

      return NextResponse.json({ success: true });
    }

    // GHL not configured — log and return success for dev/preview
    console.log(`[Subscribe] Email: ${email}, Source: ${source || 'unknown'} — GHL not configured`);
    return NextResponse.json({ success: true, _dev: 'GHL not configured — email logged only' });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
