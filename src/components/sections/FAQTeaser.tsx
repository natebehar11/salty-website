'use client';

import ScrollReveal from '@/components/shared/ScrollReveal';
import FAQAccordion from '@/components/shared/FAQAccordion';
import Button from '@/components/shared/Button';
import Link from 'next/link';
import { HOMEPAGE_FAQS } from '@/lib/faq-data';

export default function FAQTeaser() {
  return (
    <section
      className="relative"
      style={{
        backgroundColor: 'var(--color-sand)',
        paddingTop: 'clamp(48px, 8vw, 96px)',
        paddingBottom: 'clamp(48px, 8vw, 96px)',
      }}
    >
      <div className="mx-auto px-6" style={{ maxWidth: 760 }}>
        {/* Header — spec: "Questions? We Got You." */}
        <ScrollReveal>
          <h2
            className="uppercase"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4.5vw, 52px)',
              color: 'var(--color-teal)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Questions?
            <br />
            We Got You.
          </h2>
        </ScrollReveal>

        {/* FAQ Accordion — 10 curated questions, no withSchema (homepage schema at page level if needed) */}
        <ScrollReveal delay={0.1}>
          <div className="mt-10">
            <FAQAccordion items={HOMEPAGE_FAQS} />
          </div>
        </ScrollReveal>

        {/* CTA — spec: "Ask us anything!" links to /contact */}
        <ScrollReveal delay={0.15}>
          <div className="mt-8 text-center">
            <Link href="/contact">
              <Button variant="secondary" size="md">
                Ask us anything!
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
