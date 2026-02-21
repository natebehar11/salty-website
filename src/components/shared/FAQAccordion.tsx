'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
  withSchema?: boolean;
}

export default function FAQAccordion({ items, className = '', withSchema = true }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const schema = withSchema ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  } : null;

  return (
    <div className={className}>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <div className="divide-y" style={{ borderColor: '#E7D7C0' }}>
        {items.map((item, i) => (
          <div key={i}>
            <button
              className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
              onClick={() => toggle(i)}
              aria-expanded={openIndex === i}
            >
              <span className="font-bold text-base pr-8" style={{ color: '#0E3A2D' }}>
                {item.question}
              </span>
              <span
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200"
                style={{
                  backgroundColor: '#F0E8DB',
                  transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#0E3A2D" strokeWidth="2" strokeLinecap="round">
                  <path d="M7 1v12M1 7h12" />
                </svg>
              </span>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 text-sm leading-relaxed" style={{ color: '#4A4E58' }}>
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
