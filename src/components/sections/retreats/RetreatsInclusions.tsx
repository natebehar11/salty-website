'use client';

import ScrollReveal from '@/components/shared/ScrollReveal';

const INCLUDED = [
  'Accommodations in your selected room type',
  'Most meals (chef-prepared, fresh, local, delicious)',
  '3–4 daily movement sessions (all optional)',
  'At least one signature excursion',
  'Airport transfers on arrival and departure days',
  'Professional photography and video',
  'Hosted cocktail nights',
  'A community that sticks',
];

const NOT_INCLUDED = [
  'Flights',
  'Additional alcohol beyond hosted events',
  'Spa add-ons',
  'Optional excursions beyond included ones',
  'Travel insurance',
  'Personal spending & souvenirs',
];

export default function RetreatsInclusions() {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-surface-base)',
        paddingTop: 'clamp(48px, 8vw, 96px)',
        paddingBottom: 'clamp(48px, 8vw, 96px)',
      }}
    >
      <div className="mx-auto px-6" style={{ maxWidth: 900 }}>
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
            What&rsquo;s Included
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Included */}
          <ScrollReveal>
            <div
              className="rounded-2xl p-7 h-full"
              style={{
                backgroundColor: 'rgba(58,107,53,0.08)',
                border: '2px solid var(--color-palm-green)',
              }}
            >
              <h3
                className="uppercase mb-5"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '18px',
                  color: 'var(--color-palm-green)',
                }}
              >
                Included
              </h3>
              <ul className="flex flex-col gap-3">
                {INCLUDED.map((item) => (
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
                      style={{ color: 'var(--color-palm-green)' }}
                    >
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Not Included */}
          <ScrollReveal delay={0.08}>
            <div
              className="rounded-2xl p-7 h-full"
              style={{
                backgroundColor: 'rgba(199,66,53,0.06)',
                border: '2px solid var(--color-rust-red)',
              }}
            >
              <h3
                className="uppercase mb-5"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '18px',
                  color: 'var(--color-rust-red)',
                }}
              >
                Not Included
              </h3>
              <ul className="flex flex-col gap-3">
                {NOT_INCLUDED.map((item) => (
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
                      style={{ color: 'var(--color-rust-red)' }}
                    >
                      ✗
                    </span>
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
