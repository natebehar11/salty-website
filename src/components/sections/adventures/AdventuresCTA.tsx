'use client';

import Link from 'next/link';
import Button from '@/components/shared/Button';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function AdventuresCTA() {
  return (
    <section
      className="w-full"
      style={{
        backgroundColor: 'var(--color-surface-dark-deep)',
        padding: 'var(--space-section-y) var(--space-section-x)',
      }}
    >
      <div
        className="mx-auto flex flex-col items-center text-center"
        style={{ maxWidth: '700px' }}
      >
        <ScrollReveal>
          <h2
            className="uppercase"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--type-h2)',
              lineHeight: 1,
              color: 'var(--color-coral)',
            }}
          >
            READY TO GET{' '}
            <span style={{ color: 'var(--color-golden)' }}>SALTY</span>?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p
            className="mt-4 mb-2"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--type-body-lg)',
              color: 'var(--color-paper-white)',
              opacity: 0.8,
              lineHeight: 1.6,
            }}
          >
            Your next adventure is waiting. Pick a trip, pack light, and show up ready to have fun.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p
            className="mb-8 italic"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--type-body-base)',
              color: 'var(--color-paper-white)',
              opacity: 0.6,
            }}
          >
            Because the <em>right</em> trip can change everything.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="#retreat-grid">
              <Button variant="primary" size="lg">
                Browse Retreats
              </Button>
            </Link>
            <Link href="https://wa.me/14318291135" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg">
                Chat With Us
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        {/* Contact */}
        <ScrollReveal delay={0.3}>
          <p
            className="mt-8"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--type-body-sm)',
              color: 'var(--color-paper-white)',
              opacity: 0.5,
            }}
          >
            Or email us at{' '}
            <a
              href="mailto:hello@getsaltyretreats.com"
              className="underline"
              style={{ color: 'var(--color-golden)', opacity: 1 }}
            >
              hello@getsaltyretreats.com
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
