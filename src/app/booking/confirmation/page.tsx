'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import { motion } from 'framer-motion';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const retreatTitle = searchParams.get('retreat') || 'your SALTY retreat';
  const destination = searchParams.get('destination') || '';

  return (
    <main className="min-h-screen bg-salty-sand flex items-center justify-center px-6 py-20">
      <div className="max-w-lg w-full text-center">
        {/* Checkmark animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="mx-auto mb-8 w-20 h-20 rounded-full bg-salty-coral flex items-center justify-center"
        >
          <motion.svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.path
              d="M8 18L15 25L28 11"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
          </motion.svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h1 className="font-display text-3xl lg:text-4xl text-salty-teal mb-4">
            You&apos;re going{destination ? ` to ${destination}` : ''}!
          </h1>
          <p className="font-body text-lg text-salty-teal/70 mb-8">
            Your deposit has been received and your spot on {retreatTitle} is confirmed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl p-6 mb-8 text-left"
        >
          <h2 className="font-display text-lg text-salty-teal mb-4">What happens next?</h2>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-salty-coral/10 flex items-center justify-center">
                <span className="font-body text-xs text-salty-coral font-bold">1</span>
              </span>
              <div>
                <p className="font-body text-sm text-salty-teal font-bold">Confirmation email</p>
                <p className="font-body text-xs text-salty-teal/60">
                  Check your inbox for a booking confirmation with all the details.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-salty-coral/10 flex items-center justify-center">
                <span className="font-body text-xs text-salty-coral font-bold">2</span>
              </span>
              <div>
                <p className="font-body text-sm text-salty-teal font-bold">Personal outreach</p>
                <p className="font-body text-xs text-salty-teal/60">
                  Lisa from Movement Travel will contact you within 48 hours to finalize details and answer any questions.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-salty-coral/10 flex items-center justify-center">
                <span className="font-body text-xs text-salty-coral font-bold">3</span>
              </span>
              <div>
                <p className="font-body text-sm text-salty-teal font-bold">Pre-trip guide</p>
                <p className="font-body text-xs text-salty-teal/60">
                  A detailed packing list, travel tips, and group chat invite will arrive closer to your trip date.
                </p>
              </div>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/">
            <Button variant="primary" size="md">
              Back to Home
            </Button>
          </Link>
          <Link href="https://www.instagram.com/joinsalty/" target="_blank">
            <Button variant="ghost" size="md">
              Follow @joinsalty
            </Button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-salty-sand flex items-center justify-center">
        <div className="font-body text-salty-teal/60">Loading...</div>
      </main>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
