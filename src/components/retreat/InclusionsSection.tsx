import { Retreat } from '@/types/retreat';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function InclusionsSection({ retreat }: { retreat: Retreat }) {
  return (
    <section className="bg-salty-sand py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-section text-salty-teal mb-12">What&apos;s Included</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ScrollReveal>
            <div>
              <h3 className="font-display text-xl text-salty-teal mb-6 flex items-center gap-2">
                <span className="text-salty-coral text-2xl">&#10003;</span> Included
              </h3>
              <ul className="space-y-3">
                {retreat.inclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 font-body text-salty-teal/80">
                    <span className="text-salty-coral mt-0.5 flex-shrink-0">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div>
              <h3 className="font-display text-xl text-salty-teal mb-6 flex items-center gap-2">
                <span className="text-salty-teal/40 text-2xl">&#10007;</span> Not Included
              </h3>
              <ul className="space-y-3">
                {retreat.exclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 font-body text-salty-teal/50">
                    <span className="text-salty-teal/30 mt-0.5 flex-shrink-0">&#10007;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
