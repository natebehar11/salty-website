'use client';

import ScrollReveal from '@/components/shared/ScrollReveal';
import TestimonialCard from '@/components/shared/TestimonialCard';
import Button from '@/components/shared/Button';

interface Testimonial {
  guestName: string;
  quote: string;
  rating: number;
  retreatLabel: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  className?: string;
}

export default function TestimonialsSection({ testimonials, className = '' }: TestimonialsSectionProps) {
  return (
    <div className={className}>
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2
            className="uppercase mb-10 text-center"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--type-h2)',
              color: 'var(--color-teal)',
              letterSpacing: '-0.03em',
            }}
          >
            What People Say
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center mb-10">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.guestName} delay={i * 0.1} className="w-full flex justify-center">
              <TestimonialCard
                guestName={t.guestName}
                quote={t.quote}
                rating={t.rating}
                retreatLabel={t.retreatLabel}
              />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <div className="text-center">
            <Button variant="secondary" size="md">
              Read More Reviews
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
