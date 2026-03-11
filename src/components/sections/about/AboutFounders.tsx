'use client';

import type { Coach } from '@/types/sanity';
import { urlFor } from '@/lib/sanity/image';
import ScrollReveal from '@/components/shared/ScrollReveal';
import CoachCard from '@/components/shared/CoachCard';

/* ─── Placeholder founders (when CMS has none) ─────────────────────────── */

const PLACEHOLDER_FOUNDERS: Array<{
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  photo?: never;
}> = [
  {
    name: 'Erin Harris',
    role: 'Co-Founder | Creative & Guest Experience',
    bio: 'Erin started SoulSpeak Yoga in 2019 and spent seven years building one of Ottawa\u2019s most loved yoga studios. Somewhere along the way, she realized she was better at building communities than holding poses \u2014 so she took that talent global with SALTY in 2023.\n\nFifteen years of teaching yoga and growing up in the fitness world taught her one thing: there\u2019s a lot of bullshit out there. She\u2019s not here for any of it. Her job is to make it simple \u2014 great workouts, real variety, and a seamless experience that\u2019s been planned down to the last detail so you can just show up and enjoy yourself.',
    specialties: ['Fitness Programming', 'Retreat Design', 'Community Building'],
  },
  {
    name: 'Nate Behar',
    role: 'Co-Founder | Growth & Operations',
    bio: 'Nate retired from an 8-year career as a pro football player in the CFL to build SALTY with Erin. His resume reads like someone who couldn\u2019t sit still: pro sports, marketing, sports marketing, bartending (because why not?), and teaching yoga and strength classes.\n\nNow he works to put SALTY in front of as many people as possible \u2014 because he knows the ones who come, love it. And when you love something, it\u2019s usually because it changed your life a little. There\u2019s nothing more meaningful than that.',
    specialties: ['Operations', 'Travel Planning', 'Digital Strategy'],
  },
];

const FOUNDER_CARD_COLORS = ['var(--color-coral)', 'var(--color-golden)'];

/* ─── Component ──────────────────────────────────────────────────────── */

interface AboutFoundersProps {
  founders: Coach[];
}

export default function AboutFounders({ founders }: AboutFoundersProps) {
  const displayFounders = founders.length > 0 ? founders : PLACEHOLDER_FOUNDERS;

  return (
    <section
      style={{
        backgroundColor: 'var(--color-surface-base)',
        paddingTop: 'clamp(48px, 8vw, 96px)',
        paddingBottom: 'clamp(48px, 8vw, 96px)',
      }}
    >
      <div className="mx-auto px-6" style={{ maxWidth: 1100 }}>
        <ScrollReveal>
          <h2
            className="uppercase mb-14 text-center"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 60px)',
              color: 'var(--color-teal)',
              letterSpacing: '-0.02em',
              lineHeight: 0.95,
            }}
          >
            Meet the Founders
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {displayFounders.map((founder, i) => {
            const fromCms = founders.length > 0;
            const coach = founder as Coach;
            const cardColor = fromCms && coach.cardColor ? coach.cardColor : FOUNDER_CARD_COLORS[i % FOUNDER_CARD_COLORS.length];
            const photoUrl = fromCms && coach.photo
              ? urlFor(coach.photo).width(504).height(670).url()
              : undefined;
            return (
              <ScrollReveal key={fromCms ? coach._id : founder.name} delay={i * 0.1}>
                <h3 className="sr-only">{founder.name}</h3>
                <CoachCard
                  name={founder.name}
                  bio={founder.bio}
                  photoUrl={photoUrl}
                  specialties={founder.specialties ?? []}
                  personality={founder.role}
                  cardColor={cardColor}
                  size="large"
                />
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
