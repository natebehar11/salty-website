'use client';

import type { Testimonial, SiteSettings } from '@/types/sanity';
import { urlFor } from '@/lib/sanity/image';
import ScrollReveal from '@/components/shared/ScrollReveal';
import TestimonialCard from '@/components/shared/TestimonialCard';
import Button from '@/components/shared/Button';
import SwoopDivider from '@/components/layout/SwoopDivider';
import Link from 'next/link';

interface ReviewsClientProps {
  testimonials: Testimonial[];
  videoTestimonials: Testimonial[];
  settings: SiteSettings | null;
}

// Placeholder testimonials when Sanity is empty
const PLACEHOLDER_TESTIMONIALS: Testimonial[] = [
  {
    _id: 'pt1',
    guestName: 'Sarah M.',
    city: 'Toronto',
    year: 2024,
    quote:
      'I went solo and came home with 20 new friends. The workouts were tough but fun, the food was incredible, and the vibe was just... electric. Already booked my next one.',
    rating: 5,
    isVideo: false,
    tags: ['featured'],
    retreatName: 'SALTY Costa Rica',
  },
  {
    _id: 'pt2',
    guestName: 'James K.',
    city: 'London',
    year: 2024,
    quote:
      'This was hands down the best trip I\'ve ever taken. The coaches are amazing, the group was incredible, and Panama is paradise. I\'ve already convinced three friends to come next time.',
    rating: 5,
    isVideo: false,
    tags: ['featured'],
    retreatName: 'SALTY Panama',
  },
  {
    _id: 'pt3',
    guestName: 'Megan L.',
    city: 'Austin',
    year: 2024,
    quote:
      'I was nervous about traveling alone, but from the moment I arrived, I felt like part of the crew. The balance of fitness and fun is perfect. Not too intense, not too chill. Just right.',
    rating: 5,
    isVideo: false,
    tags: ['featured'],
    retreatName: 'SALTY Sicily',
  },
  {
    _id: 'pt4',
    guestName: 'David R.',
    city: 'Sydney',
    year: 2023,
    quote:
      'I\'ve done other fitness retreats and they always felt like boot camps. SALTY is the opposite — challenging workouts, sure, but also surfing, exploring, dancing, and actually having fun.',
    rating: 5,
    isVideo: false,
    tags: ['featured'],
    retreatName: 'SALTY Costa Rica',
  },
  {
    _id: 'pt5',
    guestName: 'Priya N.',
    city: 'New York',
    year: 2024,
    quote:
      'The attention to detail blew me away. Every meal, every activity, every sunset spot — all carefully curated. And the WhatsApp group is still going strong months later.',
    rating: 5,
    isVideo: false,
    tags: ['featured'],
    retreatName: 'SALTY Morocco',
  },
  {
    _id: 'pt6',
    guestName: 'Alex T.',
    city: 'Vancouver',
    year: 2024,
    quote:
      'As someone who\'s traveled to 30+ countries, I thought I\'d seen it all. SALTY showed me that how you travel matters just as much as where. The community aspect is what makes it special.',
    rating: 5,
    isVideo: false,
    tags: ['featured'],
    retreatName: 'SALTY El Salvador',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={i < rating ? '#FED260' : '#E7D7C0'}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsClient({
  testimonials,
  videoTestimonials,
  settings,
}: ReviewsClientProps) {
  const displayTestimonials =
    testimonials.length > 0 ? testimonials : PLACEHOLDER_TESTIMONIALS;

  const totalGuests = settings?.totalGuests || 200;
  const avgRating = settings?.averageRating || 4.9;

  return (
    <main>
      {/* Schema.org AggregateRating */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'SALTY Retreats',
            url: 'https://getsaltyretreats.com',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: avgRating.toString(),
              bestRating: '5',
              worstRating: '1',
              ratingCount: totalGuests.toString(),
            },
          }),
        }}
      />

      {/* ── 1. HERO ── */}
      <section
        className="relative flex items-center justify-center text-center px-6"
        style={{ minHeight: '50vh', backgroundColor: '#0E3A2D' }}
      >
        <div className="relative z-10 max-w-3xl mx-auto pt-28 pb-16">
          <ScrollReveal>
            <h1
              className="uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 7vw, 64px)',
                color: '#F7F4ED',
                lineHeight: 1.1,
              }}
            >
              Guest Reviews
            </h1>
            <p
              className="mt-4 max-w-xl mx-auto"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(16px, 2.5vw, 20px)',
                color: '#E7D7C0',
                lineHeight: 1.6,
              }}
            >
              Don&apos;t take our word for it. Here&apos;s what real guests have
              to say about SALTY retreats.
            </p>
          </ScrollReveal>

          {/* Aggregate rating */}
          <ScrollReveal delay={0.1}>
            <div className="mt-8 flex flex-col items-center gap-2">
              <div className="flex items-center gap-3">
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '48px',
                    color: '#FED260',
                  }}
                >
                  {avgRating}
                </span>
                <div className="flex flex-col items-start">
                  <StarRating rating={Math.round(avgRating)} />
                  <p
                    className="mt-1"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: '#E7D7C0',
                      opacity: 0.8,
                    }}
                  >
                    from {totalGuests}+ guests
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SwoopDivider color="#F7F4ED" direction="left" />

      {/* ── 2. VIDEO TESTIMONIALS ── */}
      {videoTestimonials.length > 0 && (
        <>
          <section className="py-12 md:py-24 px-6" style={{ backgroundColor: '#F7F4ED' }}>
            <div className="mx-auto" style={{ maxWidth: 1200 }}>
              <ScrollReveal>
                <h2
                  className="uppercase mb-10 text-center"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(28px, 4vw, 48px)',
                    color: '#0E3A2D',
                  }}
                >
                  See It for Yourself
                </h2>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videoTestimonials.map((vt) => (
                  <ScrollReveal key={vt._id}>
                    <div
                      className="rounded-2xl overflow-hidden"
                      style={{
                        backgroundColor: '#FFFFFF',
                        boxShadow: '0 4px 12px rgba(30,25,20,0.06)',
                      }}
                    >
                      {vt.videoId && (
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                          <iframe
                            src={`https://www.youtube.com/embed/${vt.videoId}`}
                            title={`${vt.guestName} testimonial`}
                            className="absolute inset-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <p
                          className="font-bold"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '15px',
                            color: '#0E3A2D',
                          }}
                        >
                          {vt.guestName}
                        </p>
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '13px',
                            color: '#4A4E58',
                          }}
                        >
                          {vt.city} · {vt.retreatName}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
          <SwoopDivider color="#E7D7C0" direction="right" />
        </>
      )}

      {/* ── 3. IN THEIR WORDS — Written Testimonials ── */}
      <section
        className="py-12 md:py-24 px-6"
        style={{ backgroundColor: videoTestimonials.length > 0 ? '#E7D7C0' : '#F7F4ED' }}
      >
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          <ScrollReveal>
            <h2
              className="uppercase mb-10 text-center"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 48px)',
                color: '#0E3A2D',
              }}
            >
              In Their Words
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayTestimonials.map((t, i) => (
              <ScrollReveal key={t._id} delay={i * 0.04}>
                <TestimonialCard
                  guestName={t.guestName}
                  quote={t.quote}
                  rating={t.rating}
                  city={t.city}
                  retreatAttended={t.retreatName}
                  avatarUrl={
                    t.avatar
                      ? urlFor(t.avatar).width(80).height(80).url()
                      : undefined
                  }
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SwoopDivider color="#0E3A2D" direction="left" />

      {/* ── 4. FINAL CTA ── */}
      <section className="py-16 md:py-24 px-6" style={{ backgroundColor: '#0E3A2D' }}>
        <div className="mx-auto text-center" style={{ maxWidth: 600 }}>
          <ScrollReveal>
            <h2
              className="uppercase mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 5vw, 48px)',
                color: '#F7F4ED',
              }}
            >
              Ready to Write Your Own Review?
            </h2>
            <p
              className="mb-8"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '18px',
                color: '#E7D7C0',
                lineHeight: 1.6,
              }}
            >
              Join {totalGuests}+ guests who&apos;ve experienced SALTY. Your
              adventure is waiting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/retreats">
                <Button variant="primary" size="lg">
                  See Upcoming Trips
                </Button>
              </Link>
              <Link href="/faq">
                <Button variant="secondary" size="lg">
                  Read the FAQ
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
