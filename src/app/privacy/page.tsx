import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'SALTY Retreats privacy policy',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen py-16 px-6" style={{ backgroundColor: 'var(--color-surface-base)' }}>
      <div className="mx-auto max-w-3xl" style={{ maxWidth: 'var(--space-container-max)' }}>
        <h1
          className="uppercase mb-8"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 48px)',
            color: 'var(--color-teal)',
          }}
        >
          Privacy Policy
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            color: 'var(--color-slate-grey)',
            lineHeight: 1.7,
          }}
        >
          Privacy policy content to be added. Contact hello@getsaltyretreats.com for questions.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 font-bold underline"
          style={{ color: 'var(--color-coral)' }}
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
