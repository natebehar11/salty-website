import { Retreat } from '@/types/retreat';
import { formatCurrency, formatDateRange } from '@/lib/utils';
import ScrollReveal from '@/components/shared/ScrollReveal';
import Button from '@/components/shared/Button';
import Link from 'next/link';

export default function FinalCTASection({ retreat }: { retreat: Retreat }) {
  return (
    <section className="bg-salty-teal py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <ScrollReveal>
          <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">
            Ready for {retreat.destination}?
          </h2>
          <p className="font-body text-lg text-white/70 mb-2 max-w-xl mx-auto">
            {formatDateRange(retreat.startDate, retreat.endDate)} &middot;{' '}
            {retreat.duration.days} days &middot; From {formatCurrency(retreat.lowestPrice)}
          </p>
          {retreat.spotsRemaining !== null && retreat.spotsRemaining <= 10 && (
            <p className="font-body text-sm text-salty-coral font-bold mb-8">
              Only {retreat.spotsRemaining} spots remaining
            </p>
          )}
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {retreat.status === 'available' && (
              <Link href={`/retreats/${retreat.slug}/book`}>
                <Button variant="primary" size="lg">
                  Book Your Spot
                </Button>
              </Link>
            )}
            <Link href="https://wa.me/16139145693" target="_blank">
              <Button variant="ghost" size="lg" className="text-white border-white/30 hover:bg-white/10">
                Ask a Question
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <p className="font-body text-xs text-white/40 mt-8">
            {formatCurrency(retreat.deposit)} deposit to reserve. Free cancellation up to 60 days before departure.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
