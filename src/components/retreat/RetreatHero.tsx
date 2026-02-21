'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '@/components/shared/Button';
import { Retreat } from '@/types/retreat';
import { formatDateRange, formatCurrency } from '@/lib/utils';

export default function RetreatHero({ retreat }: { retreat: Retreat }) {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-end overflow-hidden">
      <Image
        src={retreat.heroImage}
        alt={`${retreat.destination} retreat`}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

      <div className="relative z-10 w-full pb-16 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-body text-salty-coral font-bold text-sm uppercase tracking-widest mb-3">
              {retreat.duration.days} Days in {retreat.locations.map(l => l.region).join(' & ')}, {retreat.locations[0].country}
            </p>
            <h1 className="font-display text-5xl lg:text-7xl text-white leading-tight">
              {retreat.subtitle}
            </h1>
            <p className="font-body text-xl text-white/80 mt-4 max-w-2xl">
              {retreat.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-6 text-white/70 font-body text-sm">
              <span>{formatDateRange(retreat.startDate, retreat.endDate)}</span>
              <span className="w-1 h-1 rounded-full bg-white/50" />
              <span>From {formatCurrency(retreat.lowestPrice)}</span>
              <span className="w-1 h-1 rounded-full bg-white/50" />
              <span>{retreat.saltyMeter.groupSize.min}-{retreat.saltyMeter.groupSize.max} guests</span>
              {retreat.spotsRemaining && (
                <>
                  <span className="w-1 h-1 rounded-full bg-white/50" />
                  <span className="text-salty-coral font-bold">{retreat.spotsRemaining} spots left</span>
                </>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button href={`/retreats/${retreat.slug}/book`} variant="primary" size="lg">
                Book This Retreat
              </Button>
              <Button
                href="mailto:connect@saltyretreats.com"
                variant="secondary"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-salty-teal"
              >
                Ask a Question
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
