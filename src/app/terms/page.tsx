import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | SALTY Retreats',
  description:
    'Terms governing use of SALTY Retreats websites, bookings, and retreat participation.',
};

export default function TermsPage() {
  const sections = [
    { id: 'acceptance', label: 'Acceptance of Terms' },
    { id: 'eligibility', label: 'Eligibility' },
    { id: 'bookings-payments', label: 'Bookings & Payments' },
    { id: 'cancellations', label: 'Cancellation & Refunds' },
    { id: 'travel-health', label: 'Travel, Health & Insurance' },
    { id: 'conduct', label: 'Guest Conduct' },
    { id: 'changes', label: 'Itinerary Changes' },
    { id: 'liability', label: 'Liability Limitations' },
    { id: 'governing-law', label: 'Governing Law' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <main style={{ backgroundColor: 'var(--color-surface-base)' }}>
      <section
        style={{
          padding: 'clamp(48px, 8vw, 96px) var(--space-section-x) clamp(24px, 4vw, 40px)',
          backgroundColor: 'var(--color-surface-warm-light)',
          borderBottom: '1px solid rgba(14,58,45,0.12)',
        }}
      >
        <div className="mx-auto" style={{ maxWidth: 'var(--space-container-max)' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-coral)',
              marginBottom: 10,
            }}
          >
            Legal
          </p>
          <h1
            className="uppercase"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              color: 'var(--color-teal)',
              lineHeight: 0.95,
              marginBottom: 12,
            }}
          >
            Terms of Service
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--type-body-base)',
              color: 'var(--color-slate-grey)',
              lineHeight: 1.7,
              maxWidth: 820,
            }}
          >
            These Terms govern use of SALTY Retreats Inc. websites, communications, and trip bookings.
            By using our site or booking a retreat, you agree to these Terms.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              color: 'var(--color-slate-grey)',
              marginTop: 16,
              opacity: 0.85,
            }}
          >
            Last updated: March 5, 2026
          </p>
        </div>
      </section>

      <section style={{ padding: 'clamp(28px, 5vw, 56px) var(--space-section-x)' }}>
        <div className="mx-auto" style={{ maxWidth: 'var(--space-container-max)' }}>
          <div className="grid gap-8 md:grid-cols-[260px_minmax(0,1fr)]">
            <aside className="max-md:order-2">
              <div
                style={{
                  position: 'sticky',
                  top: 90,
                  border: '1px solid rgba(14,58,45,0.1)',
                  borderRadius: 16,
                  backgroundColor: 'var(--color-paper-white)',
                  padding: 16,
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--color-coral)',
                    marginBottom: 10,
                  }}
                >
                  On This Page
                </p>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 14,
                        color: 'var(--color-teal)',
                        textDecoration: 'underline',
                        textUnderlineOffset: 3,
                      }}
                    >
                      {section.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            <article className="max-md:order-1" style={{ minWidth: 0 }}>
              <div
                style={{
                  border: '1px solid rgba(14,58,45,0.1)',
                  borderRadius: 20,
                  backgroundColor: 'var(--color-paper-white)',
                  padding: 'clamp(20px, 3vw, 36px)',
                }}
              >
                <section id="acceptance" style={{ marginBottom: 36 }}>
                  <h2
                    className="uppercase"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
                      color: 'var(--color-teal)',
                      marginBottom: 10,
                    }}
                  >
                    Acceptance of Terms
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--type-body-base)',
                      color: 'var(--color-slate-grey)',
                      lineHeight: 1.75,
                    }}
                  >
                    By accessing or using this website, submitting inquiries, or booking a SALTY Retreat,
                    you agree to these Terms and our Privacy Policy.
                  </p>
                </section>

                <section id="eligibility" style={{ marginBottom: 36 }}>
                  <h2
                    className="uppercase"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
                      color: 'var(--color-teal)',
                      marginBottom: 10,
                    }}
                  >
                    Eligibility
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--type-body-base)',
                      color: 'var(--color-slate-grey)',
                      lineHeight: 1.75,
                    }}
                  >
                    SALTY Retreats are intended for adults 18 years or older. You are responsible for ensuring
                    your personal details, travel documents, and booking information are accurate and complete.
                  </p>
                </section>

                <section id="bookings-payments" style={{ marginBottom: 36 }}>
                  <h2
                    className="uppercase"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
                      color: 'var(--color-teal)',
                      marginBottom: 10,
                    }}
                  >
                    Bookings &amp; Payments
                  </h2>
                  <ul
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--type-body-base)',
                      color: 'var(--color-slate-grey)',
                      lineHeight: 1.75,
                      paddingLeft: 20,
                      display: 'grid',
                      gap: 8,
                    }}
                  >
                    <li>
                      A deposit is generally required to secure your retreat spot. Deposit and payment schedules
                      may vary by retreat and are shown on the relevant retreat page.
                    </li>
                    <li>
                      Payments may be processed via third-party booking and payment providers, including Movement
                      Travel and Stripe.
                    </li>
                    <li>
                      You agree to pay all applicable retreat fees, taxes, and charges connected to your booking.
                    </li>
                  </ul>
                </section>

                <section id="cancellations" style={{ marginBottom: 36 }}>
                  <h2
                    className="uppercase"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
                      color: 'var(--color-teal)',
                      marginBottom: 10,
                    }}
                  >
                    Cancellation &amp; Refunds
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--type-body-base)',
                      color: 'var(--color-slate-grey)',
                      lineHeight: 1.75,
                    }}
                  >
                    All payments are non-refundable. This includes deposits and any remaining balance payments,
                    except where a refund is required by applicable law. We strongly recommend travel insurance
                    with cancellation and interruption coverage.
                  </p>
                </section>

                <section id="travel-health" style={{ marginBottom: 36 }}>
                  <h2
                    className="uppercase"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
                      color: 'var(--color-teal)',
                      marginBottom: 10,
                    }}
                  >
                    Travel, Health &amp; Insurance
                  </h2>
                  <ul
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--type-body-base)',
                      color: 'var(--color-slate-grey)',
                      lineHeight: 1.75,
                      paddingLeft: 20,
                      display: 'grid',
                      gap: 8,
                    }}
                  >
                    <li>
                      You are responsible for passports, visas, vaccines, and other entry requirements.
                    </li>
                    <li>
                      Retreat activities can involve physical exertion and inherent risk. You should participate
                      within your own limits and seek medical advice if needed.
                    </li>
                    <li>
                      You are responsible for maintaining appropriate travel and medical insurance.
                    </li>
                  </ul>
                </section>

                <section id="conduct" style={{ marginBottom: 36 }}>
                  <h2
                    className="uppercase"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
                      color: 'var(--color-teal)',
                      marginBottom: 10,
                    }}
                  >
                    Guest Conduct
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--type-body-base)',
                      color: 'var(--color-slate-grey)',
                      lineHeight: 1.75,
                    }}
                  >
                    We want a safe, respectful, high-vibe environment for everyone. We reserve the right to
                    refuse participation or remove guests for unsafe, illegal, abusive, or disruptive behavior.
                  </p>
                </section>

                <section id="changes" style={{ marginBottom: 36 }}>
                  <h2
                    className="uppercase"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
                      color: 'var(--color-teal)',
                      marginBottom: 10,
                    }}
                  >
                    Itinerary Changes
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--type-body-base)',
                      color: 'var(--color-slate-grey)',
                      lineHeight: 1.75,
                    }}
                  >
                    Retreat schedules, accommodations, activities, and coaches may change due to weather,
                    safety, local operations, partner availability, or other factors outside our control.
                    We will make commercially reasonable efforts to provide comparable alternatives.
                  </p>
                </section>

                <section id="liability" style={{ marginBottom: 36 }}>
                  <h2
                    className="uppercase"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
                      color: 'var(--color-teal)',
                      marginBottom: 10,
                    }}
                  >
                    Liability Limitations
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--type-body-base)',
                      color: 'var(--color-slate-grey)',
                      lineHeight: 1.75,
                      marginBottom: 8,
                    }}
                  >
                    To the maximum extent permitted by law, SALTY Retreats is not liable for indirect,
                    incidental, special, consequential, or punitive damages, or for losses caused by third-party
                    providers, travel disruptions, weather events, or force majeure circumstances.
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--type-body-base)',
                      color: 'var(--color-slate-grey)',
                      lineHeight: 1.75,
                    }}
                  >
                    These Terms do not limit rights that cannot be lawfully excluded under applicable consumer
                    protection laws.
                  </p>
                </section>

                <section id="governing-law" style={{ marginBottom: 36 }}>
                  <h2
                    className="uppercase"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
                      color: 'var(--color-teal)',
                      marginBottom: 10,
                    }}
                  >
                    Governing Law
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--type-body-base)',
                      color: 'var(--color-slate-grey)',
                      lineHeight: 1.75,
                    }}
                  >
                    These Terms are governed by the laws of Ontario, Canada and the applicable laws of Canada.
                  </p>
                </section>

                <section id="contact">
                  <h2
                    className="uppercase"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
                      color: 'var(--color-teal)',
                      marginBottom: 10,
                    }}
                  >
                    Contact
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--type-body-base)',
                      color: 'var(--color-slate-grey)',
                      lineHeight: 1.75,
                    }}
                  >
                    Questions about these Terms? Email{' '}
                    <a
                      href="mailto:hello@getsaltyretreats.com"
                      style={{ color: 'var(--color-coral)', textDecoration: 'underline', textUnderlineOffset: 3 }}
                    >
                      hello@getsaltyretreats.com
                    </a>
                    . These Terms apply to SALTY Retreats Inc. Trips are booked through Movement Travel
                    (TICO Reg. #50026098).
                  </p>
                </section>
              </div>
            </article>
          </div>

          <Link
            href="/"
            className="inline-block mt-8"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              color: 'var(--color-coral)',
              textDecoration: 'underline',
              textUnderlineOffset: 3,
            }}
          >
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
