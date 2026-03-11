'use client';

import ScrollReveal from '@/components/shared/ScrollReveal';
import FAQAccordion from '@/components/shared/FAQAccordion';
import Link from 'next/link';
import { FITNESS_RETREATS_FAQS } from '@/lib/faq-data';

export default function RetreatsFAQ() {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-sand)',
        paddingTop: 'clamp(48px, 8vw, 96px)',
        paddingBottom: 'clamp(48px, 8vw, 96px)',
      }}
    >
      <div className="mx-auto px-6" style={{ maxWidth: 800 }}>
        <ScrollReveal>
          <h2
            className="uppercase mb-10"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4.5vw, 52px)',
              color: 'var(--color-teal)',
              letterSpacing: '-0.02em',
              lineHeight: 0.95,
            }}
          >
            Fitness Retreat FAQ
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.06}>
          <FAQAccordion items={FITNESS_RETREATS_FAQS} />
        </ScrollReveal>

        <ScrollReveal delay={0.12}>
          <div className="mt-8">
            <Link
              href="/faq"
              className="uppercase tracking-wider transition-opacity duration-200 hover:opacity-70"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '14px',
                color: 'var(--color-coral)',
              }}
            >
              See All FAQs →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
