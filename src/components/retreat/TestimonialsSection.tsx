'use client';

import { Retreat } from '@/types/retreat';
import { getTestimonialsByRetreat } from '@/data/testimonials';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function TestimonialsSection({ retreat }: { retreat: Retreat }) {
  const retreatTestimonials = getTestimonialsByRetreat(retreat.slug);

  if (retreatTestimonials.length === 0) return null;

  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-section text-salty-teal mb-4">What Guests Say</h2>
          <div className="flex items-center gap-2 mb-12">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-salty-gold text-xl">&#9733;</span>
              ))}
            </div>
            <span className="font-body text-sm text-salty-teal/60">
              {retreat.rating.value} from {retreat.rating.count} reviews
            </span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {retreatTestimonials.map((testimonial, i) => (
            <ScrollReveal key={testimonial.id} delay={i * 0.1}>
              <div className="bg-salty-sand rounded-2xl p-6 h-full flex flex-col">
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <span key={j} className="text-salty-gold text-sm">&#9733;</span>
                  ))}
                </div>
                <p className="font-body text-salty-teal/80 leading-relaxed mb-4 flex-1">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div>
                  <p className="font-body text-sm font-bold text-salty-teal">{testimonial.name}</p>
                  <p className="font-body text-xs text-salty-teal/50">
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
