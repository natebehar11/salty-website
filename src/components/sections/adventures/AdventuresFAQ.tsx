'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import type { FAQCategory } from '@/types/sanity';
import ScrollReveal from '@/components/shared/ScrollReveal';
import Button from '@/components/shared/Button';

import { HOMEPAGE_FAQS } from '@/lib/faq-data';

/* ─── Accordion Item ─────────────────────────────────────────────────── */

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="border-b"
      style={{ borderColor: 'var(--color-teal)' }}
    >
      <button
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer bg-transparent border-none"
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
          color: 'var(--color-teal)',
          textTransform: 'uppercase',
          lineHeight: 1.3,
          letterSpacing: '0.02em',
        }}
      >
        <span className="pr-4 flex-1">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          className="shrink-0 text-xl leading-none"
          style={{ color: 'var(--color-coral)' }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="overflow-hidden"
          >
            <p
              className="pb-5"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--type-body-base)',
                color: 'var(--color-teal)',
                lineHeight: 1.7,
                opacity: 0.8,
                maxWidth: '48rem',
              }}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────── */

interface AdventuresFAQProps {
  faqCategories?: FAQCategory[];
}

export default function AdventuresFAQ({ faqCategories }: AdventuresFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = useCallback((index: number) => {
    setOpenIndex(prev => prev === index ? null : index);
  }, []);

  // Flatten Sanity FAQ categories or use centralized fallback
  const faqs =
    faqCategories && faqCategories.length > 0
      ? faqCategories.flatMap(cat => cat.questions)
      : HOMEPAGE_FAQS;

  return (
    <section
      className="w-full"
      style={{
        backgroundColor: 'var(--color-surface-base)',
        padding: 'var(--space-section-y) var(--space-section-x)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: '800px' }}>
        {/* Schema.org FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map(faq => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            }),
          }}
        />

        {/* Heading */}
        <ScrollReveal>
          <h2
            className="text-center uppercase mb-2"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--type-h2)',
              color: 'var(--color-teal)',
              lineHeight: 1,
            }}
          >
            FREQUENTLY ASKED QUESTIONS
          </h2>
        </ScrollReveal>

        {/* FAQ Items */}
        <div className="mt-8">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.03}>
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onToggle={() => toggleFAQ(i)}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* CTA Button */}
        <ScrollReveal delay={0.2}>
          <div className="flex justify-center mt-10">
            <Link href="https://wa.me/14318291135" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg">
                Ask Us Anything!
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
