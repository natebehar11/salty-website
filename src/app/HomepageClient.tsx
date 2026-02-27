'use client';

import type { RetreatCard, Testimonial, SiteSettings } from '@/types/sanity';
import ScrollReveal from '@/components/shared/ScrollReveal';
import SocialProofBar from '@/components/shared/SocialProofBar';
import StatBar from '@/components/shared/StatBar';
import FAQAccordion from '@/components/shared/FAQAccordion';
import EmailSignup from '@/components/shared/EmailSignup';
import Button from '@/components/shared/Button';
import TestimonialCard from '@/components/shared/TestimonialCard';
import SwoopDivider from '@/components/layout/SwoopDivider';
import WaveDivider from '@/components/layout/WaveDivider';
import DoubleLineDivider from '@/components/layout/DoubleLineDivider';
import Link from 'next/link';
import HomepageHero from '@/components/sections/HomepageHero';

interface HomepageClientProps {
  retreats: RetreatCard[];
  testimonials: Testimonial[];
  settings: SiteSettings | null;
}

// Hardcoded FAQ teaser — these will move to Sanity later
const FAQ_TEASER = [
  {
    question: 'Can I go on a SALTY retreat solo?',
    answer:
      'Absolutely — over 65% of our guests travel solo. Our retreats are designed to bring people together, so you\'ll make friends fast. Most solo travelers say it\'s the best decision they ever made.',
  },
  {
    question: 'Do I need to be super fit to join?',
    answer:
      'Nope. Our trips welcome all fitness levels. Activities are always optional — do as much or as little as you want. Whether you\'re a seasoned athlete or just getting started, there\'s a pace for you.',
  },
  {
    question: 'What\'s included in the price?',
    answer:
      'Accommodation, daily group workouts, planned activities and excursions, most meals, airport transfers, and a crew of coaches and guides. Flights and travel insurance are not included.',
  },
  {
    question: 'How do I book and what\'s the payment plan?',
    answer:
      'Pick your retreat, choose your room, and lock it in with a deposit. We offer flexible payment plans so you can spread the cost. Full details are on each retreat page.',
  },
];

export default function HomepageClient({
  retreats,
  testimonials,
  settings,
}: HomepageClientProps) {
  const stats = settings
    ? [
        { value: `${settings.totalGuests}+`, label: 'Happy Guests' },
        { value: `${settings.averageRating}`, label: 'Avg Rating' },
        { value: `${settings.countriesCount}`, label: 'Countries' },
      ]
    : [
        { value: '200+', label: 'Happy Guests' },
        { value: '4.9', label: 'Avg Rating' },
        { value: '7', label: 'Countries' },
      ];

  return (
    <>
      {/* ── Section 1: Hero ── */}
      <HomepageHero
        whatsapp={settings?.whatsapp?.replace(/\D/g, '') || undefined}
      />

      <SwoopDivider color="var(--color-paper-white)" direction="left" />

      {/* ── Section 2: SALTY Snapshot ── */}
      <section
        className="py-16 md:py-24 px-6"
        style={{ backgroundColor: 'var(--color-surface-base)' }}
      >
        <div className="mx-auto" style={{ maxWidth: 960 }}>
          <ScrollReveal>
            <div className="text-center">
              <h2
                className="uppercase"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(24px, 4vw, 40px)',
                  color: 'var(--color-teal)',
                }}
              >
                What Is a SALTY Retreat?
              </h2>
              <p
                className="mt-4 mx-auto max-w-2xl"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '17px',
                  color: 'var(--color-slate-grey)',
                  lineHeight: 1.7,
                }}
              >
                A SALTY retreat is a group fitness trip designed for people who
                want to train hard, explore new countries, and meet like-minded
                travelers — without the silent meditation or green juice agenda.
                Think surf sessions, jungle hikes, rooftop workouts, and nights
                out with new friends.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="mt-12">
              <StatBar stats={stats} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Section 3: Social Proof Bar ── */}
      <SocialProofBar
        totalGuests={settings?.totalGuests}
        averageRating={settings?.averageRating}
        countriesCount={settings?.countriesCount}
        quotes={settings?.socialProofQuotes || []}
      />

      <WaveDivider color="var(--color-paper-white)" />

      {/* ── Section 4: What Makes SALTY, SALTY ── */}
      <section
        className="py-16 md:py-24 px-6"
        style={{ backgroundColor: 'var(--color-surface-base)' }}
      >
        <div className="mx-auto" style={{ maxWidth: 1100 }}>
          <ScrollReveal>
            <h2
              className="text-center uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px, 4vw, 40px)',
                color: 'var(--color-teal)',
              }}
            >
              What Makes SALTY, SALTY
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                emoji: '🏄‍♀️',
                title: 'Fitness Meets Adventure',
                body: 'Every trip blends workouts with bucket-list experiences. Surf in the morning, hike a volcano after lunch, yoga at sunset.',
              },
              {
                emoji: '🎉',
                title: 'Actually Fun',
                body: 'No silent dinners. No 6am forced meditation. We train hard and celebrate harder. Group dinners, nights out, real connections.',
              },
              {
                emoji: '🌍',
                title: 'Small Groups, Big Trips',
                body: '20-35 guests per trip. Big enough to have a blast, small enough to actually know everyone by name.',
              },
            ].map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 0.1}>
                <div
                  className="rounded-2xl p-8 h-full"
                  style={{
                    backgroundColor: 'var(--color-surface-warm-light)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <span className="text-4xl">{card.emoji}</span>
                  <h3
                    className="mt-4 uppercase"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '20px',
                      color: 'var(--color-teal)',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="mt-3"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '15px',
                      color: 'var(--color-slate-grey)',
                      lineHeight: 1.6,
                    }}
                  >
                    {card.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: How It Works ── */}
      <section
        className="py-16 md:py-24 px-6"
        style={{ backgroundColor: 'var(--color-surface-warm)' }}
      >
        <div className="mx-auto" style={{ maxWidth: 1100 }}>
          <ScrollReveal>
            <h2
              className="text-center uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px, 4vw, 40px)',
                color: 'var(--color-teal)',
              }}
            >
              How It Works
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Pick Your Trip',
                body: 'Browse our upcoming retreats and find the one that speaks to you.',
              },
              {
                step: '02',
                title: 'Book Your Spot',
                body: 'Secure your place with a deposit. Flexible payment plans available.',
              },
              {
                step: '03',
                title: 'Show Up',
                body: 'We handle the logistics — accommodation, activities, transfers, meals.',
              },
              {
                step: '04',
                title: 'Do Your Thing',
                body: 'Train, explore, connect, repeat. Every day is yours to make the most of.',
              },
            ].map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.1}>
                <div className="text-center">
                  <span
                    className="uppercase"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '48px',
                      color: 'var(--color-coral)',
                      lineHeight: 1,
                    }}
                  >
                    {item.step}
                  </span>
                  <h3
                    className="mt-3 uppercase"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '18px',
                      color: 'var(--color-teal)',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="mt-2"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '15px',
                      color: 'var(--color-slate-grey)',
                      lineHeight: 1.6,
                    }}
                  >
                    {item.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SwoopDivider color="var(--color-paper-white)" direction="right" />

      {/* ── Section 6: Upcoming Retreats ── */}
      <section
        id="retreats"
        className="py-16 md:py-24 px-6"
        style={{ backgroundColor: 'var(--color-surface-base)' }}
      >
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          <ScrollReveal>
            <h2
              className="text-center uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px, 4vw, 40px)',
                color: 'var(--color-teal)',
              }}
            >
              Upcoming Retreats
            </h2>
          </ScrollReveal>

          {retreats.length > 0 ? (
            <ScrollReveal delay={0.1}>
              <div className="mt-12 flex flex-wrap justify-center gap-8">
                {/* Retreat cards will be rendered here once new designs are submitted */}
                {retreats.slice(0, 4).map((retreat) => (
                  <Link
                    key={retreat._id}
                    href={`/retreats/${retreat.slug}`}
                    className="block"
                  >
                    <div
                      className="rounded-2xl overflow-hidden cursor-pointer transition-transform duration-200 hover:-translate-y-1"
                      style={{
                        width: 320,
                        backgroundColor: retreat.colorTheme?.accent || '#F75A3D',
                        boxShadow: 'var(--shadow-md)',
                      }}
                    >
                      <div
                        className="h-48"
                        style={{
                          backgroundColor: retreat.colorTheme?.dark || '#0E3A2D',
                        }}
                      />
                      <div className="p-5">
                        <p
                          className="uppercase"
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '24px',
                            color: retreat.colorTheme?.textOnAccent || '#0E3A2D',
                          }}
                        >
                          {retreat.name}
                        </p>
                        <p
                          className="mt-1"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '14px',
                            fontWeight: 700,
                            color: retreat.colorTheme?.textOnAccent || '#0E3A2D',
                          }}
                        >
                          {retreat.totalDays} days &middot; From $
                          {retreat.lowestPrice?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal delay={0.1}>
              <p
                className="mt-8 text-center"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  color: 'var(--color-slate-grey)',
                }}
              >
                Retreats coming soon — connect Sanity CMS to see them here.
              </p>
            </ScrollReveal>
          )}

          <ScrollReveal delay={0.2}>
            <div className="mt-10 text-center">
              <Link href="/retreats">
                <Button variant="primary" size="md">
                  See All Trips →
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <DoubleLineDivider topColor="var(--color-teal)" bottomColor="var(--color-paper-white)" />

      {/* ── Section 7: What People Say ── */}
      <section
        className="py-16 md:py-24 px-6"
        style={{ backgroundColor: 'var(--color-teal)' }}
      >
        <div className="mx-auto" style={{ maxWidth: 1100 }}>
          <ScrollReveal>
            <h2
              className="text-center uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px, 4vw, 40px)',
                color: 'var(--color-paper-white)',
              }}
            >
              What People Say
            </h2>
          </ScrollReveal>

          {testimonials.length > 0 ? (
            <ScrollReveal delay={0.1}>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.slice(0, 3).map((t) => (
                  <TestimonialCard
                    key={t._id}
                    guestName={t.guestName}
                    quote={t.quote}
                    rating={t.rating}
                    city={t.city}
                    retreatAttended={t.retreatName}
                    surface="dark-raised"
                  />
                ))}
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal delay={0.1}>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Placeholder testimonials until Sanity is populated */}
                {[
                  {
                    name: 'Sarah M.',
                    city: 'Toronto',
                    quote: 'Best week of my life. The workouts, the people, the sunsets — I can\'t stop telling everyone about it.',
                    retreat: 'Panama',
                  },
                  {
                    name: 'Jake R.',
                    city: 'London',
                    quote: 'I went solo and left with 20 new friends. Already booked my next SALTY trip.',
                    retreat: 'Morocco',
                  },
                  {
                    name: 'Emma L.',
                    city: 'Sydney',
                    quote: 'If you\'re on the fence, just do it. SALTY is the real deal — no wellness BS, just good vibes and hard workouts.',
                    retreat: 'Sicily',
                  },
                ].map((t) => (
                  <TestimonialCard
                    key={t.name}
                    guestName={t.name}
                    quote={t.quote}
                    rating={5}
                    city={t.city}
                    retreatAttended={t.retreat}
                    surface="dark-raised"
                  />
                ))}
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal delay={0.2}>
            <div className="mt-10 text-center">
              <Link href="/reviews">
                <Button variant="secondary" size="md">
                  See All Reviews →
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SwoopDivider color="var(--color-sand)" direction="left" />

      {/* ── Section 8: FAQ Teaser ── */}
      <section
        className="py-16 md:py-24 px-6"
        style={{ backgroundColor: 'var(--color-sand)' }}
      >
        <div className="mx-auto" style={{ maxWidth: 720 }}>
          <ScrollReveal>
            <h2
              className="text-center uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px, 4vw, 40px)',
                color: 'var(--color-teal)',
              }}
            >
              Got Questions?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="mt-10">
              <FAQAccordion items={FAQ_TEASER} withSchema />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="mt-8 text-center">
              <Link href="/faq">
                <Button variant="secondary" size="md">
                  See Full FAQ →
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Section 9: Community CTA ── */}
      <section
        className="py-16 md:py-24 px-6"
        style={{ backgroundColor: 'var(--color-surface-dark-deep)' }}
      >
        <div className="mx-auto text-center" style={{ maxWidth: 600 }}>
          <ScrollReveal>
            <h2
              className="uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px, 4vw, 36px)',
                color: 'var(--color-paper-white)',
              }}
            >
              Join the SALTY Community
            </h2>
            <p
              className="mt-4"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                color: '#E7D7C0',
                lineHeight: 1.6,
              }}
            >
              Get first dibs on new retreats, early bird pricing, and travel
              tips from the crew.
            </p>
          </ScrollReveal>
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
          <ScrollReveal delay={0.15}>
            <div className="mt-8 flex justify-center gap-6">
              {settings?.instagram && (
                <a
                  href={`https://instagram.com/${settings.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="SALTY on Instagram"
                  className="transition-opacity duration-200 hover:opacity-80"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#F7F4ED">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              )}
              {settings?.tiktok && (
                <a
                  href={settings.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="SALTY on TikTok"
                  className="transition-opacity duration-200 hover:opacity-80"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#F7F4ED">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.11V9a6.27 6.27 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 0010.86 4.43V13.4a8.16 8.16 0 005.58 2.19V12.2a4.83 4.83 0 01-3.77-1.74V6.69h3.77z" />
                  </svg>
                </a>
              )}
              {/* Default social links when settings aren't loaded */}
              {!settings?.instagram && (
                <a
                  href="https://instagram.com/salty.retreats"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="SALTY on Instagram"
                  className="transition-opacity duration-200 hover:opacity-80"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#F7F4ED">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>
      {/* ── Schema.org: Organization ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'SALTY Retreats',
            url: 'https://getsaltyretreats.com',
            logo: 'https://getsaltyretreats.com/images/salty-logo.png',
            description:
              'Group fitness retreats blending surf, yoga, and adventure across 7 countries for 20–35 guests.',
            sameAs: [
              settings?.instagram
                ? `https://instagram.com/${settings.instagram.replace('@', '')}`
                : 'https://instagram.com/salty.retreats',
              settings?.tiktok || '',
            ].filter(Boolean),
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+1-431-829-1135',
              contactType: 'customer service',
              availableLanguage: 'English',
            },
            ...(settings
              ? {
                  aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: settings.averageRating,
                    reviewCount: settings.totalGuests,
                    bestRating: 5,
                    worstRating: 1,
                  },
                }
              : {}),
          }),
        }}
      />
    </>
  );
}
