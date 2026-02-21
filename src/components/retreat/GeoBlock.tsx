import { Retreat } from '@/types/retreat';
import { formatDateRange, formatCurrency } from '@/lib/utils';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function GeoBlock({ retreat }: { retreat: Retreat }) {
  const facts = [
    { label: 'Duration', value: `${retreat.duration.days} days / ${retreat.duration.nights} nights` },
    { label: 'Dates', value: formatDateRange(retreat.startDate, retreat.endDate) },
    { label: 'Location', value: retreat.locations.map(l => `${l.region}, ${l.country}`).join(' + ') },
    { label: 'Price', value: `${formatCurrency(retreat.lowestPrice)} - ${formatCurrency(retreat.roomTiers[0]?.priceRegular || 0)} per person` },
    { label: 'Group Size', value: `${retreat.saltyMeter.groupSize.min}-${retreat.saltyMeter.groupSize.max} guests` },
    { label: 'Skill Level', value: 'All levels welcome' },
    { label: 'Solo Travelers', value: '65% of guests come alone' },
  ];

  return (
    <section className="bg-salty-sand py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl">
            <h2 className="text-section text-salty-teal mb-6">About This Retreat</h2>
            <p className="font-body text-lg text-salty-teal/80 leading-relaxed">
              A <strong>{retreat.destination.toLowerCase()} surf and yoga retreat</strong> that
              combines daily surf sessions with yoga, fitness, and cultural exploration across
              {retreat.locations.length > 1 ? ' two distinct locations' : ` ${retreat.locations[0].region}`}.
              SALTY&apos;s {retreat.duration.days}-day retreat includes accommodation, most meals,
              and daily activities for groups of {retreat.saltyMeter.groupSize.min}-{retreat.saltyMeter.groupSize.max} guests.
              Prices start at {formatCurrency(retreat.lowestPrice)} per person.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {facts.map((fact) => (
              <div key={fact.label} className="bg-white rounded-xl p-5 shadow-sm">
                <p className="font-body text-xs text-salty-teal/50 uppercase tracking-wide font-bold">
                  {fact.label}
                </p>
                <p className="font-body text-salty-teal font-bold mt-1">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
