'use client';

import { useState } from 'react';
import Script from 'next/script';
import type { Testimonial, SiteSettings } from '@/types/sanity';
import ScrollReveal from '@/components/shared/ScrollReveal';
import Button from '@/components/shared/Button';
import SwoopDivider from '@/components/layout/SwoopDivider';
import Link from 'next/link';

interface ReviewsClientProps {
  videoTestimonials: Testimonial[];
  settings: SiteSettings | null;
}


function ClickToPlayVideo({ videoId, title }: { videoId: string; title: string }) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setActive(true)}
      className="relative w-full cursor-pointer"
      style={{ paddingBottom: '56.25%' }}
      aria-label={`Play ${title}`}
    >
      <img
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
        <div
          className="flex items-center justify-center rounded-full"
          style={{ width: 56, height: 56, backgroundColor: 'rgba(247,244,237,0.9)' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#0E3A2D">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
}

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
  videoTestimonials,
  settings,
}: ReviewsClientProps) {
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
                    fontSize: 'clamp(32px, 10vw, 48px)',
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
                        <ClickToPlayVideo
                          videoId={vt.videoId}
                          title={`${vt.guestName} testimonial`}
                        />
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

      {/* ── 3. GOOGLE REVIEWS — Elfsight widget ── */}
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

          <div className="elfsight-app-bcb6e237-0108-4ffa-a743-3d801a3b39b2" data-elfsight-app-lazy />
          <Script src="https://static.elfsight.com/platform/platform.js" strategy="lazyOnload" />
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
                fontSize: 'clamp(16px, 2.5vw, 18px)',
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
