'use client';

import ScrollReveal from '@/components/shared/ScrollReveal';

/* ─── Data ───────────────────────────────────────────────────────────── */

const FOR_YOU = [
  'Want to move your body daily in ways that actually feel good',
  'Like eating real food without guilt or restriction',
  'Prefer exploring new places to sitting by a pool for seven days',
  'Are curious about solo travel but nervous about going alone',
  'Think "wellness" should include laughter, drinks, dancing, and staying up too late sometimes',
  'Want to come home feeling stronger, not depleted',
];

const THRIVE_IF = [
  'A total beginner (everything scales, we promise)',
  'An experienced athlete (we\u2019ll challenge you)',
  'Traveling solo (most guests are — you won\u2019t be alone for long)',
  'Coming with friends, a partner, or a sibling',
  '26 or 60 (our guests span decades, united by energy, not age)',
];

const NOT_FOR_YOU = [
  'You want a silent, meditative retreat',
  'You need a strict meal plan and calorie tracking',
  'You don\u2019t like meeting new people',
  'You prefer five-star luxury with no surprises',
  'You think fun and fitness can\u2019t coexist',
];

/* ─── Component ──────────────────────────────────────────────────────── */

export default function RetreatsQualifying() {
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
            className="uppercase mb-12 text-center"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4.5vw, 52px)',
              color: 'var(--color-teal)',
              letterSpacing: '-0.02em',
              lineHeight: 0.95,
            }}
          >
            Real Talk
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* For You card */}
          <ScrollReveal>
            <div
              className="rounded-2xl p-7 h-full"
              style={{
                backgroundColor: 'var(--color-golden)',
              }}
            >
              <h3
                className="uppercase mb-5"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '22px',
                  color: 'var(--color-teal)',
                }}
              >
                You&rsquo;ll Fit Right In If You...
              </h3>
              <ul className="flex flex-col gap-3">
                {FOR_YOU.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '15px',
                      color: 'var(--color-teal)',
                    }}
                  >
                    <span
                      className="mt-0.5 flex-shrink-0"
                      style={{ fontSize: '16px', color: 'var(--color-teal)' }}
                    >
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Thrive section */}
              <h4
                className="uppercase mt-7 mb-3"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '16px',
                  color: 'var(--color-teal)',
                }}
              >
                You&rsquo;ll Thrive Here If You&rsquo;re...
              </h4>
              <ul className="flex flex-col gap-2">
                {THRIVE_IF.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: 'var(--color-teal)',
                      opacity: 0.85,
                    }}
                  >
                    <span className="mt-0.5 flex-shrink-0">→</span>
                    {item}
                  </li>
                ))}
              </ul>

              <p
                className="mt-6 uppercase tracking-wider"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '13px',
                  color: 'var(--color-teal)',
                }}
              >
                The only requirement: Show up ready to have fun.
              </p>
            </div>
          </ScrollReveal>

          {/* Not For You card */}
          <ScrollReveal delay={0.08}>
            <div
              className="rounded-2xl p-7 h-full"
              style={{
                backgroundColor: 'var(--color-coral)',
              }}
            >
              <h3
                className="uppercase mb-5"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '22px',
                  color: 'var(--color-paper-white)',
                }}
              >
                Maybe Skip This If...
              </h3>
              <ul className="flex flex-col gap-3">
                {NOT_FOR_YOU.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '15px',
                      color: 'var(--color-paper-white)',
                    }}
                  >
                    <span
                      className="mt-0.5 flex-shrink-0"
                      style={{ fontSize: '16px' }}
                    >
                      ✗
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <p
                className="mt-8"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  color: 'var(--color-paper-white)',
                  lineHeight: 1.6,
                  opacity: 0.9,
                }}
              >
                No hard feelings. We&rsquo;ll be here when you&rsquo;re ready for
                something different.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
