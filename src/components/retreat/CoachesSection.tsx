import { Retreat } from '@/types/retreat';
import { getCoachesByIds } from '@/data/coaches';
import Image from 'next/image';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function CoachesSection({ retreat }: { retreat: Retreat }) {
  const retreatCoaches = getCoachesByIds(retreat.coaches);

  return (
    <section className="bg-salty-sand py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-section text-salty-teal mb-4">Your Coaches</h2>
          <p className="font-body text-lg text-salty-teal/60 mb-12 max-w-2xl">
            The people who make SALTY what it is.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {retreatCoaches.map((coach, i) => (
            <ScrollReveal key={coach.id} delay={i * 0.15}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="relative h-72">
                  <Image
                    src={coach.image}
                    alt={coach.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl text-salty-teal">{coach.name}</h3>
                  <p className="font-body text-sm text-salty-coral font-bold mb-1">{coach.title}</p>
                  <p className="font-body text-xs text-salty-teal/50 mb-4">{coach.certification}</p>
                  <p className="font-body text-sm text-salty-teal/70 leading-relaxed">{coach.bio}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
