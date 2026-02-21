'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { testimonials } from '@/data/testimonials';
import ScrollReveal from '@/components/shared/ScrollReveal';

function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-4xl lg:text-5xl text-salty-coral">
        {isInView ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {value}
            {suffix}
          </motion.span>
        ) : (
          <span className="opacity-0">0</span>
        )}
      </p>
      <p className="font-body text-sm text-salty-teal/60 mt-1">{label}</p>
    </div>
  );
}

export default function SocialProof() {
  const featured = testimonials.slice(0, 3);

  return (
    <section className="bg-salty-sand py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Stats Strip */}
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            <AnimatedStat value={200} suffix="+" label="Happy Guests" />
            <AnimatedStat value={4.9} suffix="" label="Average Rating" />
            <AnimatedStat value={65} suffix="%" label="Travel Solo" />
            <AnimatedStat value={7} suffix="" label="Destinations" />
          </div>
        </ScrollReveal>

        {/* Testimonials */}
        <ScrollReveal>
          <h2 className="text-section text-salty-teal text-center mb-12">
            Don&apos;t Take Our Word for It
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((testimonial, i) => (
            <ScrollReveal key={testimonial.id} delay={i * 0.15}>
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg
                      key={j}
                      className="w-5 h-5 text-salty-gold"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="font-body text-salty-teal/80 leading-relaxed italic mb-6">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                <div>
                  <p className="font-body font-bold text-salty-teal text-sm">
                    {testimonial.name}
                  </p>
                  <p className="font-body text-salty-teal/50 text-xs">
                    {testimonial.city}, {testimonial.year}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
