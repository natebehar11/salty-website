'use client';

import ScrollReveal from '@/components/shared/ScrollReveal';

/* ─── Activity Data ──────────────────────────────────────────────────── */

const ACTIVITIES = [
  {
    name: 'Strength & Conditioning',
    short: 'Circuits, tempo work, partner drills, beach sprints. Challenging and fun.',
    accent: 'var(--color-coral)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 6.5h11M6.5 17.5h11M3.5 11h17M2 8.5V15.5M22 8.5V15.5M5 6.5V17.5M19 6.5V17.5" />
      </svg>
    ),
  },
  {
    name: 'Yoga Flow',
    short: 'Dynamic sequences synced to music. Heat-building movement followed by deep stretches.',
    accent: 'var(--color-teal)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="4" r="2" /><path d="M12 6v4M8 22l4-10 4 10M6 14h12" />
      </svg>
    ),
  },
  {
    name: 'Pilates / Burn',
    short: 'Mat-based, beat-driven sculpt. Ankle weights, bands, bodyweight.',
    accent: 'var(--color-golden)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20M6 6l12 12M18 6L6 18" />
      </svg>
    ),
  },
  {
    name: 'Soul Work',
    short: 'Sweaty meditation, SALTY style. High-intensity sequences or guided breathwork.',
    accent: 'var(--color-aquamarine)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
  },
  {
    name: 'Boxing',
    short: 'Music-led, high-energy, zero experience required. Just gloves and endorphins.',
    accent: 'var(--color-rust-red)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 4a3 3 0 00-3 3v4a3 3 0 003 3h1a2 2 0 002-2V6a2 2 0 00-2-2h-1zM6 4a3 3 0 013 3v4a3 3 0 01-3 3H5a2 2 0 01-2-2V6a2 2 0 012-2h1z" />
        <path d="M9 14v4a2 2 0 002 2h2a2 2 0 002-2v-4" />
      </svg>
    ),
  },
  {
    name: 'Beach Sweat',
    short: 'Group HIIT on the sand. Sprints, games, partner challenges.',
    accent: 'var(--color-sky)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
  {
    name: 'Surf Lessons',
    short: 'Local instructors, all skill levels, no pressure. The best workout is chasing waves.',
    accent: 'var(--color-palm-green)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20c2-2 4-3 7-3s5 2 8 2 4-1 5-2" /><path d="M17 3l-5 18" /><path d="M7 3l5 18" />
      </svg>
    ),
  },
];

/* ─── Component ──────────────────────────────────────────────────────── */

export default function RetreatsActivities() {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-surface-warm)',
        paddingTop: 'clamp(48px, 8vw, 96px)',
        paddingBottom: 'clamp(48px, 8vw, 96px)',
      }}
    >
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        <ScrollReveal>
          <h2
            className="uppercase mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4.5vw, 52px)',
              color: 'var(--color-teal)',
              letterSpacing: '-0.02em',
              lineHeight: 0.95,
              maxWidth: '18ch',
            }}
          >
            Movement That Meets You Where You Are
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.06}>
          <p
            className="mb-12 max-w-2xl"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(15px, 1.5vw, 17px)',
              color: 'var(--color-slate-grey)',
              lineHeight: 1.7,
            }}
          >
            We offer 3–4 movement sessions daily. Everything is optional.
            Everything scales. You don&rsquo;t need to be fit to come.
          </p>
        </ScrollReveal>

        {/* Activity grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ACTIVITIES.map((act, i) => (
            <ScrollReveal key={act.name} delay={i * 0.05}>
              <div
                className="relative rounded-xl overflow-hidden h-full flex flex-col"
                style={{
                  backgroundColor: 'var(--color-surface-base)',
                  borderTop: `4px solid ${act.accent}`,
                  boxShadow: '0 4px 16px rgba(30,25,20,0.05)',
                }}
              >
                {/* Icon header */}
                <div
                  className="flex items-center justify-center py-5"
                  style={{ color: act.accent }}
                >
                  {act.icon}
                </div>

                {/* Content */}
                <div className="px-5 pb-5 flex-1 flex flex-col">
                  <h3
                    className="uppercase mb-2"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '16px',
                      color: 'var(--color-teal)',
                    }}
                  >
                    {act.name}
                  </h3>
                  <p
                    className="flex-1"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: 'var(--color-slate-grey)',
                      lineHeight: 1.55,
                    }}
                  >
                    {act.short}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
