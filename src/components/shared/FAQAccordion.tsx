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
  onDark?: boolean;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="shrink-0 transition-transform duration-300"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FAQAccordion({ items, className = '', onDark = false }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const headingColor = onDark ? 'var(--color-paper-white)' : 'var(--color-teal)';
  const bodyColor = onDark ? 'var(--color-sand)' : 'var(--color-slate-grey)';
  const borderColor = onDark ? 'var(--color-surface-dark-raised)' : 'var(--color-sand)';

  return (
    <div className={`divide-y ${className}`} style={{ borderColor }}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;

        return (
          <div key={i} style={{ borderColor }}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer"
              style={{ color: headingColor }}
              aria-expanded={isOpen}
            >
              <span
                className="text-base font-bold uppercase tracking-wide"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-h4)' }}
              >
                {item.question}
              </span>
              <ChevronIcon open={isOpen} />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: shouldReduceMotion ? 0 : 0.3, ease: [0.25, 0.1, 0.25, 1.0] },
                    opacity: { duration: shouldReduceMotion ? 0 : 0.2, delay: shouldReduceMotion ? 0 : 0.05 },
                  }}
                  className="overflow-hidden"
                >
                  <p
                    className="pb-5 leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--type-body-base)',
                      color: bodyColor,
                    }}
                  >
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
