'use client';

import { Retreat } from '@/types/retreat';
import Image from 'next/image';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { useState } from 'react';

export default function AccommodationSection({ retreat }: { retreat: Retreat }) {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-section text-salty-teal mb-4">Where You&apos;ll Stay</h2>
          <p className="font-body text-lg text-salty-teal/60 mb-12 max-w-2xl">
            {retreat.locations.length > 1
              ? `${retreat.locations.length} unique properties, each chosen for a reason.`
              : 'Your home base for the trip.'}
          </p>
        </ScrollReveal>

        <div className="space-y-16">
          {retreat.locations.map((location, i) => (
            <ScrollReveal key={location.name} delay={i * 0.2}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <LocationGallery location={location} />
                <div className="lg:pt-4">
                  <h3 className="font-display text-2xl text-salty-teal mb-2">{location.name}</h3>
                  <p className="font-body text-sm text-salty-coral font-bold mb-4">
                    {location.region}, {location.country} &middot; {location.nights} nights
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {location.features.map((feature) => (
                      <span
                        key={feature}
                        className="inline-block px-3 py-1 rounded-full bg-salty-sand font-body text-xs text-salty-teal/70 font-bold"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocationGallery({ location }: { location: Retreat['locations'][0] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = location.images.length > 0 ? location.images : ['/images/lifestyle-1.jpg'];

  return (
    <div>
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3">
        <Image
          src={images[activeIndex]}
          alt={`${location.name} - ${activeIndex + 1}`}
          fill
          className="object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-colors ${
                i === activeIndex ? 'border-salty-coral' : 'border-transparent'
              }`}
            >
              <Image src={img} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
