import { NextResponse } from 'next/server';

/**
 * POST /api/contact
 *
 * Contact form endpoint — forwards to GoHighLevel (GHL) when API keys are configured.
 * Used by any contact or inquiry forms across the site.
 *
 * Body: { name: string, email: string, message: string, retreatSlug?: string, source?: string }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, retreatSlug, source } = body as {
      name?: string;
      email?: string;
      message?: string;
      retreatSlug?: string;
      source?: string;
    };

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

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

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Enforce reasonable length limits
    if (name.length > 200) {
      return NextResponse.json(
        { error: 'Name too long' },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: 'Message too long (max 5000 characters)' },
        { status: 400 }
      );
    }

    // GHL integration — uncomment and configure when API keys are available
    const ghlApiKey = process.env.GHL_API_KEY;
    const ghlLocationId = process.env.GHL_LOCATION_ID;

    if (ghlApiKey && ghlLocationId) {
      // Create or update contact in GHL
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
            name: name.trim(),
            email,
            locationId: ghlLocationId,
            source: source || 'contact-form',
            tags: [
              'website-inquiry',
              retreatSlug ? `retreat:${retreatSlug}` : '',
              source ? `source:${source}` : '',
            ].filter(Boolean),
            customFields: [
              { key: 'message', value: message.trim() },
              retreatSlug ? { key: 'interested_retreat', value: retreatSlug } : null,
            ].filter(Boolean),
          }),
        }
      );

      if (!ghlResponse.ok) {
        console.error('GHL contact error:', await ghlResponse.text());
        return NextResponse.json(
          { error: 'Contact service unavailable' },
          { status: 502 }
        );
      }

      return NextResponse.json({ success: true });
    }

    // GHL not configured — log and return success for dev/preview
    console.log(
      `[Contact] Name: ${name}, Email: ${email}, Retreat: ${retreatSlug || 'none'}, Source: ${source || 'unknown'} — GHL not configured`
    );
    return NextResponse.json({ success: true, _dev: 'GHL not configured — inquiry logged only' });
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
