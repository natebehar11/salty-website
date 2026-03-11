'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { FAQCategory } from '@/types/sanity';
import ScrollReveal from '@/components/shared/ScrollReveal';
import FAQAccordion from '@/components/shared/FAQAccordion';
import SwoopDivider from '@/components/layout/SwoopDivider';
import Link from 'next/link';

interface FAQClientProps {
  categories: FAQCategory[];
}

const WHATSAPP_URL = `https://wa.me/14318291135?text=${encodeURIComponent('Hey SALTY! I have a question about your retreats.')}`;
const MAILTO_URL = 'mailto:hello@getsaltyretreats.com?subject=SALTY%20Inquiry';
const NAVBAR_HEIGHT = 72;

export default function FAQClient({ categories }: FAQClientProps) {
  const [activeSlug, setActiveSlug] = useState(categories[0]?.slug || '');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const stickyNavRef = useRef<HTMLElement | null>(null);
  const isScrolling = useRef(false);

  useEffect(() => {
    const elements = Object.values(sectionRefs.current).filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const slug = entry.target.getAttribute('data-slug');
            if (slug) setActiveSlug(slug);
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [categories]);

  const scrollToSection = useCallback((slug: string) => {
    const el = sectionRefs.current[slug];
    if (!el) return;

    isScrolling.current = true;
    setActiveSlug(slug);

    const navHeight = stickyNavRef.current?.offsetHeight ?? 56;
    const offset = NAVBAR_HEIGHT + navHeight + 16;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });

    setTimeout(() => { isScrolling.current = false; }, 1000);
  }, []);

  return (
    <main>
      {/* ── Hero ── */}
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
              Frequently Asked Questions
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
              Everything you need to know before you book your SALTY Retreat. Can&apos;t
              find what you&apos;re looking for? Just ask. We&apos;re real humans, we reply fast.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SwoopDivider color="#F7F4ED" direction="left" />

      {/* ── Anchor Nav + Stacked FAQ Categories ── */}
      <section className="py-12 md:py-24 px-6" style={{ backgroundColor: '#F7F4ED' }}>
        <div className="mx-auto" style={{ maxWidth: 900 }}>
          {/* Sticky Anchor Nav */}
          <nav
            ref={stickyNavRef}
            className="sticky z-30 -mx-6 px-6"
            style={{
              top: NAVBAR_HEIGHT,
              backgroundColor: '#F7F4ED',
              paddingTop: 16,
              paddingBottom: 16,
              boxShadow: '0 4px 12px rgba(14,58,45,0.04)',
            }}
            role="navigation"
            aria-label="FAQ categories"
          >
            <ScrollReveal>
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => scrollToSection(cat.slug)}
                    aria-current={cat.slug === activeSlug ? 'true' : undefined}
                    className="px-4 py-3 min-h-[44px] rounded-full text-sm transition-all duration-200 cursor-pointer"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: cat.slug === activeSlug ? 700 : 500,
                      fontSize: 'clamp(12px, 2.5vw, 14px)',
                      backgroundColor: cat.slug === activeSlug ? '#0E3A2D' : 'transparent',
                      color: cat.slug === activeSlug ? '#F7F4ED' : '#0E3A2D',
                      border: cat.slug === activeSlug ? '1.5px solid #0E3A2D' : '1.5px solid #E7D7C0',
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </ScrollReveal>
          </nav>

          {/* All 6 Category Sections */}
          {categories.map((cat, i) => (
            <div
              key={cat._id}
              id={cat.slug}
              data-slug={cat.slug}
              ref={(el) => { sectionRefs.current[cat.slug] = el; }}
              className={i > 0 ? 'pt-10 md:pt-16' : 'pt-6 md:pt-10'}
              style={i > 0 ? { borderTop: '1px solid #E7D7C0' } : undefined}
            >
              <ScrollReveal delay={i * 0.06}>
                <h2
                  className="uppercase mb-2"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(22px, 3vw, 32px)',
                    color: '#0E3A2D',
                  }}
                >
                  {cat.name}
                </h2>
                {cat.description && (
                  <p
                    className="mb-6"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'clamp(14px, 2vw, 16px)',
                      color: '#4A4E58',
                      lineHeight: 1.6,
                    }}
                  >
                    {cat.description}
                  </p>
                )}
                <FAQAccordion
                  items={cat.questions || []}
                  withSchema={false}
                />
              </ScrollReveal>
            </div>
          ))}
        </div>
      </section>

      <SwoopDivider color="#0E3A2D" direction="right" />

      {/* ── Still Have Questions? CTA ── */}
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
              Still have questions?
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
              We get it — booking a trip like this is a big decision. If you
              didn&apos;t find your answer above, reach out. We&apos;re real humans
              (Erin and Nate, specifically) and we reply fast.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="salty-btn inline-flex items-center justify-center"
                style={{
                  height: 52,
                  paddingLeft: 28,
                  paddingRight: 28,
                  borderRadius: 'var(--radius-button)',
                  border: '1.5px solid var(--color-sand)',
                  backgroundColor: 'var(--color-coral)',
                  color: 'var(--color-teal)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 18,
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'background-color 200ms ease, color 200ms ease, border-color 200ms ease, transform 200ms ease',
                }}
              >
                Chat With Us
              </a>
              <a
                href={MAILTO_URL}
                className="salty-btn inline-flex items-center justify-center"
                style={{
                  height: 52,
                  paddingLeft: 28,
                  paddingRight: 28,
                  borderRadius: 'var(--radius-button)',
                  border: '1.5px solid var(--color-sand)',
                  backgroundColor: 'var(--color-paper-white)',
                  color: 'var(--color-teal)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 18,
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'background-color 200ms ease, color 200ms ease, border-color 200ms ease, transform 200ms ease',
                }}
              >
                Email Us
              </a>
              <Link
                href="/retreats"
                className="salty-btn inline-flex items-center justify-center"
                style={{
                  height: 52,
                  paddingLeft: 28,
                  paddingRight: 28,
                  borderRadius: 'var(--radius-button)',
                  border: '1.5px solid var(--color-sand)',
                  backgroundColor: 'var(--color-paper-white)',
                  color: 'var(--color-teal)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 18,
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'background-color 200ms ease, color 200ms ease, border-color 200ms ease, transform 200ms ease',
                }}
              >
                See Upcoming Trips
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
