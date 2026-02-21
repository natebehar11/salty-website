import { retreats } from '@/data/retreats';
import RetreatCard from '@/components/shared/RetreatCard';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function RetreatGrid() {
  const sortedRetreats = [...retreats].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  return (
    <section className="py-24 lg:py-32" id="retreats">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-section text-salty-teal">Upcoming Retreats</h2>
            <p className="font-body text-lg text-salty-teal/70 mt-4 max-w-2xl mx-auto">
              Seven destinations. Thousands of stories waiting to happen.
              Pick your adventure and we&apos;ll handle the rest.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {sortedRetreats.map((retreat, i) => (
            <ScrollReveal key={retreat.slug} delay={i * 0.1}>
              <RetreatCard retreat={retreat} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
