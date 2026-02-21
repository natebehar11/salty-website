'use client';

import { Retreat } from '@/types/retreat';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQSection({ retreat }: { retreat: Retreat }) {
  if (retreat.faq.length === 0) return null;

  return (
    <section className="bg-salty-sand py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-section text-salty-teal mb-12">Frequently Asked Questions</h2>
        </ScrollReveal>

        <div className="max-w-3xl space-y-3">
          {retreat.faq.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <FAQItem question={item.question} answer={item.answer} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="font-body font-bold text-salty-teal pr-4">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-salty-teal/40"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 font-body text-sm text-salty-teal/70 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
