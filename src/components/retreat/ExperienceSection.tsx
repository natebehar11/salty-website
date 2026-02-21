import { Retreat } from '@/types/retreat';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function ExperienceSection({ retreat }: { retreat: Retreat }) {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-section text-salty-teal mb-8">
            {retreat.duration.days} Days in {retreat.locations.map(l => l.region).join(' & ')}
          </h2>
        </ScrollReveal>

        <div className="max-w-3xl space-y-6">
          {retreat.experience.paragraphs.map((p, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <p className="font-body text-lg text-salty-teal/80 leading-relaxed">{p}</p>
            </ScrollReveal>
          ))}
        </div>

        {retreat.experience.forYouIf.length > 0 && (
          <ScrollReveal delay={0.3}>
            <div className="mt-12 bg-salty-sand rounded-2xl p-8 max-w-3xl">
              <h3 className="font-display text-xl text-salty-teal mb-4">
                This retreat is for you if:
              </h3>
              <ul className="space-y-3">
                {retreat.experience.forYouIf.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 font-body text-salty-teal/80">
                    <span className="text-salty-coral mt-1 font-bold">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
