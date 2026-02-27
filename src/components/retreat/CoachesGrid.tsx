'use client';

import ScrollReveal from '@/components/shared/ScrollReveal';
import CoachCard from '@/components/shared/CoachCard';

interface Coach {
  name: string;
  bio: string;
  specialties: string[];
  personality: string;
  photoUrl?: string;
  cardColor: string;
}

interface CoachesGridProps {
  coaches: Coach[];
  className?: string;
}

export default function CoachesGrid({ coaches, className = '' }: CoachesGridProps) {
  return (
    <div className={className}>
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2
            className="uppercase mb-10 text-center"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--type-h2)',
              color: 'var(--color-teal)',
              letterSpacing: '-0.03em',
            }}
          >
            Your Coaches
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {coaches.map((coach, i) => (
            <ScrollReveal key={coach.name} delay={i * 0.1} className="w-full max-w-sm">
              <CoachCard
                name={coach.name}
                bio={coach.bio}
                specialties={coach.specialties}
                personality={coach.personality}
                photoUrl={coach.photoUrl}
                cardColor={coach.cardColor}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
