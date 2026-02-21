'use client';

import { Retreat } from '@/types/retreat';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function ItinerarySection({ retreat }: { retreat: Retreat }) {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-section text-salty-teal mb-4">Day by Day</h2>
          <p className="font-body text-lg text-salty-teal/60 mb-12 max-w-2xl">
            {retreat.duration.days} days. Two locations. One unforgettable journey.
          </p>
        </ScrollReveal>

        <div className="max-w-3xl">
          {retreat.itinerary.map((day, i) => {
            const isLocationChange = i > 0 && retreat.itinerary[i - 1].location !== day.location;
            return (
              <div key={day.day}>
                {isLocationChange && (
                  <ScrollReveal delay={0.1}>
                    <div className="my-8 flex items-center gap-4">
                      <div className="flex-1 h-px bg-salty-coral/30" />
                      <span className="font-body text-sm font-bold text-salty-coral uppercase tracking-wide">
                        {day.location}
                      </span>
                      <div className="flex-1 h-px bg-salty-coral/30" />
                    </div>
                  </ScrollReveal>
                )}
                <ScrollReveal delay={i * 0.05}>
                  <div className="flex gap-6 pb-8 relative">
                    {/* Timeline line */}
                    {i < retreat.itinerary.length - 1 && (
                      <div className="absolute left-5 top-10 bottom-0 w-px bg-salty-sand-dark" />
                    )}
                    {/* Day number */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-salty-teal flex items-center justify-center">
                      <span className="font-display text-sm text-white">{day.day}</span>
                    </div>
                    {/* Content */}
                    <div className="pt-1">
                      <h3 className="font-display text-lg text-salty-teal mb-1">{day.title}</h3>
                      <p className="font-body text-sm text-salty-teal/50 mb-2">{day.location}</p>
                      <p className="font-body text-salty-teal/70 leading-relaxed">{day.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
