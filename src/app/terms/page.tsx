import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'SALTY Retreats terms of service',
};

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            color: 'var(--color-slate-grey)',
            lineHeight: 1.7,
          }}
        >
          Terms of service content to be added. Trips booked through Movement Travel, TICO Reg. #50026098.
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
