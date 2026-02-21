import { Metadata } from 'next';
import { retreats } from '@/data/retreats';
import RetreatCard from '@/components/shared/RetreatCard';
import ScrollReveal from '@/components/shared/ScrollReveal';

export const metadata: Metadata = {
  title: 'All Retreats',
  description:
    'Browse all SALTY fitness and adventure retreats worldwide. Costa Rica, Sri Lanka, Panama, Morocco, Sicily, El Salvador. From $1,949. 65% of guests come solo.',
};

export default function RetreatsPage() {
  const sorted = [...retreats].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-salty-teal pt-32 pb-20 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-display text-4xl lg:text-6xl text-salty-sand">
            Our Retreats
          </h1>
          <p className="font-body text-lg text-salty-sand/70 mt-4 max-w-2xl">
            Every trip is different. The people, the place, the vibe. Pick the one
            that calls to you and we&apos;ll handle everything else. 65% of guests
            come solo. You&apos;ll leave with a crew.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {sorted.map((retreat, i) => (
              <ScrollReveal key={retreat.slug} delay={i * 0.08}>
                <RetreatCard retreat={retreat} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
