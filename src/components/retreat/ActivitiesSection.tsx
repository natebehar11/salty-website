'use client';

import ScrollReveal from '@/components/shared/ScrollReveal';

interface Activity {
  name: string;
  description: string;
  imageUrl?: string;
}

interface DailyRhythm {
  period: string;
  description: string;
}

interface ActivitiesSectionProps {
  activities: Activity[];
  dailyRhythm: DailyRhythm[];
  className?: string;
}

const PERIOD_ICONS: Record<string, string> = {
  Morning: '☀️',
  Midday: '🌤',
  Afternoon: '🌊',
  Evening: '🌙',
};

export default function ActivitiesSection({
  activities,
  dailyRhythm,
  className = '',
}: ActivitiesSectionProps) {
  return (
    <div className={className}>
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2
            className="uppercase mb-10 text-center"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--type-h2)',
              color: 'var(--color-paper-white)',
              letterSpacing: '-0.03em',
            }}
          >
            {"What You'll Do"}
          </h2>
        </ScrollReveal>

        {/* Activity cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {activities.map((activity, i) => (
            <ScrollReveal key={activity.name} delay={i * 0.08}>
              <div
                className="rounded-2xl overflow-hidden h-full transition-transform duration-200 hover:-translate-y-1"
                style={{
                  backgroundColor: 'var(--color-surface-dark-raised)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                {activity.imageUrl && (
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={activity.imageUrl}
                      alt={activity.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-6">
                <h4
                  className="uppercase mb-3"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--type-h4)',
                    color: 'var(--color-golden)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {activity.name}
                </h4>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-sand)',
                  }}
                >
                  {activity.description}
                </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Daily Rhythm */}
        <ScrollReveal>
          <h3
            className="uppercase mb-8 text-center"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--type-h3)',
              color: 'var(--color-paper-white)',
              letterSpacing: '-0.03em',
            }}
          >
            Daily Rhythm
          </h3>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dailyRhythm.map((slot, i) => (
            <ScrollReveal key={slot.period} delay={i * 0.08}>
              <div className="text-center p-5">
                <div className="text-3xl mb-3" aria-hidden="true">
                  {PERIOD_ICONS[slot.period] || '•'}
                </div>
                <h4
                  className="uppercase mb-2"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--type-h5)',
                    color: 'var(--color-coral)',
                  }}
                >
                  {slot.period}
                </h4>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-sand)',
                  }}
                >
                  {slot.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
