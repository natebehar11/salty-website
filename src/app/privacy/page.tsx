import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | SALTY Retreats',
  description:
    'How SALTY Retreats collects, uses, stores, and shares personal information.',
};

export default function PrivacyPage() {
  const sections = [
    { id: 'info-we-collect', label: 'Information We Collect' },
    { id: 'how-we-use', label: 'How We Use Information' },
    { id: 'sharing', label: 'How Information Is Shared' },
    { id: 'cookies', label: 'Cookies & Analytics' },
    { id: 'retention-security', label: 'Data Retention & Security' },
    { id: 'your-rights', label: 'Your Rights' },
    { id: 'children', label: "Children's Privacy" },
    { id: 'contact', label: 'Contact Us' },
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
            Privacy Policy
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
            This policy explains how SALTY Retreats Inc. collects, uses, stores, and shares information when
            you visit our websites, submit forms, inquire about trips, or make a booking.
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
                <section id="info-we-collect" style={{ marginBottom: 36 }}>
                  <h2
                    className="uppercase"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
                      color: 'var(--color-teal)',
                      marginBottom: 10,
                    }}
                  >
                    Information We Collect
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
                      <strong>Information you provide:</strong> name, email, phone number, trip preferences,
                      booking details, and messages you send to us.
                    </li>
                    <li>
                      <strong>Booking/payment information:</strong> when booking, payment and travel details may be
                      processed by trusted third parties such as Movement Travel, Stripe, and booking platforms.
                    </li>
                    <li>
                      <strong>Automatic website data:</strong> IP address, browser/device type, pages visited,
                      and interactions collected through cookies and analytics tools.
                    </li>
                  </ul>
                </section>

                <section id="how-we-use" style={{ marginBottom: 36 }}>
                  <h2
                    className="uppercase"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
                      color: 'var(--color-teal)',
                      marginBottom: 10,
                    }}
                  >
                    How We Use Information
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
                    <li>To answer inquiries and support requests.</li>
                    <li>To coordinate trips, logistics, and guest communication.</li>
                    <li>To process bookings, deposits, and related payment workflows.</li>
                    <li>To improve site performance, content, and user experience.</li>
                    <li>To send trip updates and marketing communications (you can opt out anytime).</li>
                  </ul>
                </section>

                <section id="sharing" style={{ marginBottom: 36 }}>
                  <h2
                    className="uppercase"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
                      color: 'var(--color-teal)',
                      marginBottom: 10,
                    }}
                  >
                    How Information Is Shared
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--type-body-base)',
                      color: 'var(--color-slate-grey)',
                      lineHeight: 1.75,
                      marginBottom: 10,
                    }}
                  >
                    We do not sell your personal information. We only share information as needed with:
                  </p>
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
                    <li>Travel partners and booking providers (including Movement Travel) to operate retreats.</li>
                    <li>Payment providers (such as Stripe) to process transactions securely.</li>
                    <li>
                      Technology providers (hosting, CMS, email, analytics) that help run our business and website.
                    </li>
                    <li>Legal/regulatory authorities when required by applicable law.</li>
                  </ul>
                </section>

                <section id="cookies" style={{ marginBottom: 36 }}>
                  <h2
                    className="uppercase"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
                      color: 'var(--color-teal)',
                      marginBottom: 10,
                    }}
                  >
                    Cookies &amp; Analytics
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--type-body-base)',
                      color: 'var(--color-slate-grey)',
                      lineHeight: 1.75,
                    }}
                  >
                    We use cookies and similar technologies to keep the site functioning, measure performance,
                    and improve content. You can control cookies in your browser settings. Blocking some cookies
                    may affect parts of site functionality.
                  </p>
                </section>

                <section id="retention-security" style={{ marginBottom: 36 }}>
                  <h2
                    className="uppercase"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
                      color: 'var(--color-teal)',
                      marginBottom: 10,
                    }}
                  >
                    Data Retention &amp; Security
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--type-body-base)',
                      color: 'var(--color-slate-grey)',
                      lineHeight: 1.75,
                    }}
                  >
                    We keep information only as long as needed for legitimate business, legal, or operational
                    purposes. We use commercially reasonable safeguards, but no internet transmission or storage
                    system is guaranteed to be 100% secure.
                  </p>
                </section>

                <section id="your-rights" style={{ marginBottom: 36 }}>
                  <h2
                    className="uppercase"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
                      color: 'var(--color-teal)',
                      marginBottom: 10,
                    }}
                  >
                    Your Rights
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
                    Depending on your location, you may have rights to access, correct, delete, or restrict
                    the use of your personal information.
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--type-body-base)',
                      color: 'var(--color-slate-grey)',
                      lineHeight: 1.75,
                    }}
                  >
                    To request support, email{' '}
                    <a
                      href="mailto:hello@getsaltyretreats.com"
                      style={{ color: 'var(--color-coral)', textDecoration: 'underline', textUnderlineOffset: 3 }}
                    >
                      hello@getsaltyretreats.com
                    </a>
                    .
                  </p>
                </section>

                <section id="children" style={{ marginBottom: 36 }}>
                  <h2
                    className="uppercase"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
                      color: 'var(--color-teal)',
                      marginBottom: 10,
                    }}
                  >
                    Children&apos;s Privacy
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--type-body-base)',
                      color: 'var(--color-slate-grey)',
                      lineHeight: 1.75,
                    }}
                  >
                    SALTY Retreats is not directed to children under 18. We do not knowingly collect personal
                    information from children under 18.
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
                    Contact Us
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--type-body-base)',
                      color: 'var(--color-slate-grey)',
                      lineHeight: 1.75,
                    }}
                  >
                    Questions about this policy? Email{' '}
                    <a
                      href="mailto:hello@getsaltyretreats.com"
                      style={{ color: 'var(--color-coral)', textDecoration: 'underline', textUnderlineOffset: 3 }}
                    >
                      hello@getsaltyretreats.com
                    </a>
                    . SALTY Retreats Inc. is based in Ontario, Canada.
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
