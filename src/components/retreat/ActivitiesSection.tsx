import { Retreat } from '@/types/retreat';
import ScrollReveal from '@/components/shared/ScrollReveal';

const iconMap: Record<string, string> = {
  surf: '\u{1F3C4}',
  yoga: '\u{1F9D8}',
  fitness: '\u{1F4AA}',
  culture: '\u{1F3DB}',
  train: '\u{1F682}',
  hike: '\u{1F97E}',
  food: '\u{1F35B}',
  default: '\u2728',
};

export default function ActivitiesSection({ retreat }: { retreat: Retreat }) {
  return (
    <section className="bg-salty-sand py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-section text-salty-teal mb-4">What You&apos;ll Do</h2>
          <p className="font-body text-lg text-salty-teal/60 mb-12 max-w-2xl">
            Every day is different. Here&apos;s what&apos;s on the menu.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {retreat.activities.map((activity, i) => (
            <ScrollReveal key={activity.name} delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow h-full">
                <span className="text-3xl block mb-3">
                  {iconMap[activity.icon] || iconMap.default}
                </span>
                <h3 className="font-display text-lg text-salty-teal mb-2">
                  {activity.name}
                </h3>
                <p className="font-body text-sm text-salty-teal/70 leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
