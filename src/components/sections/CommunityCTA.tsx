'use client';

import type { SiteSettings } from '@/types/sanity';
import ScrollReveal from '@/components/shared/ScrollReveal';
import EmailSignup from '@/components/shared/EmailSignup';

/* ─── Social Icons ────────────────────────────────────────────────────── */

function InstagramIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-paper-white)">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-paper-white)">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.11V9a6.27 6.27 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 0010.86 4.43V13.4a8.16 8.16 0 005.58 2.19V12.2a4.83 4.83 0 01-3.77-1.74V6.69h3.77z" />
    </svg>
  );
}

/* ─── Component ───────────────────────────────────────────────────────── */

export default function CommunityCTA({
  settings,
}: {
  settings: SiteSettings | null;
}) {
  return (
    <section
      className="relative"
      style={{
        backgroundColor: 'var(--color-surface-dark-deep)',
        paddingTop: 'clamp(48px, 8vw, 96px)',
        paddingBottom: 'clamp(48px, 8vw, 96px)',
      }}
    >
      <div className="mx-auto px-6 text-center" style={{ maxWidth: 640 }}>
        {/* Header */}
        <ScrollReveal>
          <h2
            className="uppercase"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 5vw, 52px)',
              color: 'var(--color-paper-white)',
              letterSpacing: '-0.02em',
              lineHeight: 0.95,
            }}
          >
            Stay In The Loop
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <p
            className="mt-5"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              color: 'var(--color-sand)',
              lineHeight: 1.6,
            }}
          >
            Get trip announcements, behind-the-scenes content, and first dibs
            on new destinations.
          </p>
        </ScrollReveal>

        {/* Email signup */}
        <ScrollReveal delay={0.1}>
          <div className="mt-8">
            <EmailSignup
              onDark
              buttonText="Join the Community"
              placeholder="Your email address"
              source="homepage"
            />
          </div>
        </ScrollReveal>

        {/* Social links */}
        <ScrollReveal delay={0.15}>
          <div className="mt-8">
            <p
              className="uppercase tracking-wider mb-4"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                color: 'var(--color-sand)',
                opacity: 0.6,
                fontWeight: 700,
              }}
            >
              Follow Along
            </p>
            <div className="flex justify-center gap-6">
              <a
                href={
                  settings?.instagram
                    ? `https://instagram.com/${settings.instagram.replace('@', '')}`
                    : 'https://instagram.com/getsaltyretreats'
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SALTY on Instagram"
                className="transition-opacity duration-200 hover:opacity-70"
              >
                <InstagramIcon />
              </a>
              <a
                href={settings?.tiktok || 'https://www.tiktok.com/@getsaltyretreats'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SALTY on TikTok"
                className="transition-opacity duration-200 hover:opacity-70"
              >
                <TikTokIcon />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
