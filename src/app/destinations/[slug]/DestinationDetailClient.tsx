'use client';

import { PortableText } from 'next-sanity';
import type { Destination } from '@/types/sanity';
import { urlFor } from '@/lib/sanity/image';
import ScrollReveal from '@/components/shared/ScrollReveal';
import FAQAccordion from '@/components/shared/FAQAccordion';
import Button from '@/components/shared/Button';
import SwoopDivider from '@/components/layout/SwoopDivider';
import Link from 'next/link';

interface DestinationDetailClientProps {
  destination: Destination;
}

export default function DestinationDetailClient({ destination }: DestinationDetailClientProps) {
  const dest = destination;

  return (
    <main>
      {/* ── HERO ── */}
      <section
        className="relative flex items-end px-6"
        style={{ minHeight: '55vh', backgroundColor: '#0E3A2D' }}
      >
        {dest.heroImage && (
          <img
            src={urlFor(dest.heroImage).width(1920).height(1080).url()}
            alt={dest.country}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
        )}
        <div className="relative z-10 w-full pt-32 pb-12 mx-auto" style={{ maxWidth: 800 }}>
          <ScrollReveal>
            <Link
              href="/destinations"
              className="inline-block mb-3 uppercase tracking-wider transition-colors duration-200 hover:opacity-80"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '12px',
                color: '#E7D7C0',
              }}
            >
              ← All Destinations
            </Link>
            <h1
              className="uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 7vw, 64px)',
                color: '#F7F4ED',
                lineHeight: 1.1,
              }}
            >
              {dest.country}
            </h1>
            {dest.vibeSummary && (
              <p
                className="mt-3 max-w-lg"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '18px',
                  color: '#E7D7C0',
                  lineHeight: 1.6,
                }}
              >
                {dest.vibeSummary}
              </p>
            )}
          </ScrollReveal>
        </div>
      </section>

      <SwoopDivider color="#F7F4ED" direction="left" />

      {/* ── DESCRIPTION ── */}
      {dest.description && (
        <section className="py-12 md:py-20 px-6" style={{ backgroundColor: '#F7F4ED' }}>
          <div className="mx-auto" style={{ maxWidth: 720 }}>
            <ScrollReveal>
              <article
                className="prose prose-lg"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: '#0E3A2D',
                  lineHeight: 1.8,
                  fontSize: '17px',
                }}
              >
                <PortableText value={dest.description} />
              </article>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ── RETREATS IN THIS DESTINATION ── */}
      {dest.retreats && dest.retreats.length > 0 && (
        <>
          <SwoopDivider color="#E7D7C0" direction="right" />
          <section className="py-12 md:py-24 px-6" style={{ backgroundColor: '#E7D7C0' }}>
            <div className="mx-auto" style={{ maxWidth: 1000 }}>
              <ScrollReveal>
                <h2
                  className="uppercase mb-8 text-center"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(28px, 4vw, 48px)',
                    color: '#0E3A2D',
                  }}
                >
                  {dest.country} Retreats
                </h2>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dest.retreats.map((retreat) => (
                  <ScrollReveal key={retreat._id}>
                    <Link
                      href={`/retreats/${retreat.slug}`}
                      className="block rounded-2xl overflow-hidden transition-transform duration-200 hover:-translate-y-1"
                      style={{
                        backgroundColor: '#F7F4ED',
                        boxShadow: '0 4px 12px rgba(30,25,20,0.06)',
                      }}
                    >
                      {retreat.heroImage ? (
                        <img
                          src={urlFor(retreat.heroImage).width(500).height(300).url()}
                          alt={retreat.name}
                          className="w-full object-cover"
                          style={{ aspectRatio: '16/9' }}
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className="w-full flex items-center justify-center"
                          style={{
                            aspectRatio: '16/9',
                            backgroundColor: retreat.colorTheme?.dark || '#0E3A2D',
                          }}
                        >
                          <span style={{ color: '#F7F4ED', opacity: 0.3, fontFamily: 'var(--font-display)', fontSize: '24px' }}>
                            {retreat.name}
                          </span>
                        </div>
                      )}
                      <div className="p-5">
                        <h3
                          className="uppercase mb-1"
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '20px',
                            color: '#0E3A2D',
                          }}
                        >
                          {retreat.officialName}
                        </h3>
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '14px',
                            color: '#4A4E58',
                          }}
                        >
                          {retreat.totalDays} days · From ${retreat.lowestPrice?.toLocaleString()}
                        </p>
                        <p
                          className="mt-2 uppercase tracking-wider"
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '12px',
                            color: '#F75A3D',
                          }}
                        >
                          View Trip →
                        </p>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── FAQ ── */}
      {dest.faqs && dest.faqs.length > 0 && (
        <>
          <SwoopDivider color="#F7F4ED" direction="left" />
          <section className="py-12 md:py-24 px-6" style={{ backgroundColor: '#F7F4ED' }}>
            <div className="mx-auto" style={{ maxWidth: 800 }}>
              <ScrollReveal>
                <h2
                  className="uppercase mb-8 text-center"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(28px, 4vw, 48px)',
                    color: '#0E3A2D',
                  }}
                >
                  {dest.country} FAQ
                </h2>
                <FAQAccordion items={dest.faqs} withSchema />
              </ScrollReveal>
            </div>
          </section>
        </>
      )}

      {/* ── RELATED BLOG POSTS ── */}
      {dest.relatedPosts && dest.relatedPosts.length > 0 && (
        <>
          <SwoopDivider color="#0E3A2D" direction="right" />
          <section className="py-12 md:py-24 px-6" style={{ backgroundColor: '#0E3A2D' }}>
            <div className="mx-auto" style={{ maxWidth: 1000 }}>
              <ScrollReveal>
                <h2
                  className="uppercase mb-8 text-center"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(24px, 3vw, 36px)',
                    color: '#F7F4ED',
                  }}
                >
                  Read More About {dest.country}
                </h2>
              </ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dest.relatedPosts.map((post) => (
                  <ScrollReveal key={post._id}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block rounded-2xl overflow-hidden transition-transform duration-200 hover:-translate-y-1"
                      style={{
                        backgroundColor: '#1F4638',
                      }}
                    >
                      <div className="p-5">
                        <h3
                          className="mb-2"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '16px',
                            fontWeight: 700,
                            color: '#F7F4ED',
                            lineHeight: 1.3,
                          }}
                        >
                          {post.title}
                        </h3>
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '13px',
                            color: '#E7D7C0',
                            opacity: 0.7,
                          }}
                        >
                          {post.excerpt}
                        </p>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── CTA ── */}
      <SwoopDivider color="#E7D7C0" direction="left" />
      <section className="py-16 md:py-20 px-6" style={{ backgroundColor: '#E7D7C0' }}>
        <div className="mx-auto text-center" style={{ maxWidth: 600 }}>
          <ScrollReveal>
            <h2
              className="uppercase mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px, 4vw, 40px)',
                color: '#0E3A2D',
              }}
            >
              Ready for {dest.country}?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/retreats">
                <Button variant="primary" size="lg">
                  See the Retreat
                </Button>
              </Link>
              <Link href="/blog">
                <Button variant="secondary" size="lg">
                  Read the Guide
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
