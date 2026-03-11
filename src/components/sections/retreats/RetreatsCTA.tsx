'use client';

import ScrollReveal from '@/components/shared/ScrollReveal';
import Button from '@/components/shared/Button';
import Link from 'next/link';

const WHATSAPP_URL = `https://wa.me/14318291135?text=${encodeURIComponent('Hey SALTY! Tell me about your fitness retreats.')}`;

export default function RetreatsCTA() {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-surface-dark-deep)',
        paddingTop: 'clamp(64px, 10vw, 120px)',
        paddingBottom: 'clamp(64px, 10vw, 120px)',
      }}
    >
      <div className="mx-auto text-center px-6" style={{ maxWidth: 640 }}>
        <ScrollReveal>
          <h2
            className="uppercase mb-5"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 6vw, 56px)',
              color: 'var(--color-paper-white)',
              lineHeight: 0.95,
            }}
          >
            Ready to Get{' '}
            <span style={{ color: 'var(--color-coral)' }}>SALTY</span>?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <p
            className="mb-4"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '18px',
              color: 'var(--color-sand)',
              lineHeight: 1.6,
            }}
          >
            Your next adventure is waiting.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.12}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link href="/fitness-retreats#retreats-grid">
              <Button variant="primary" size="lg">
                Browse Retreats
              </Button>
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg">
                Chat With Us
              </Button>
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.16}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--color-sand)',
              opacity: 0.6,
            }}
          >
            Or reach out:{' '}
            <a
              href="mailto:connect@saltyretreats.com"
              className="underline hover:opacity-80 transition-opacity"
              style={{ color: 'var(--color-coral)' }}
            >
              connect@saltyretreats.com
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
