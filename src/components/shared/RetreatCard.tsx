import Link from 'next/link';
import Image from 'next/image';
import { Retreat } from '@/types/retreat';
import { formatCurrency, formatDateRange } from '@/lib/utils';

interface RetreatCardProps {
  retreat: Retreat;
}

export default function RetreatCard({ retreat }: RetreatCardProps) {
  const hasFullPage = retreat.slug === 'sri-lanka-surf-yoga-retreat';
  const href = hasFullPage ? `/retreats/${retreat.slug}` : '/retreats';

  const statusBadge = () => {
    switch (retreat.status) {
      case 'sold_out':
        return (
          <span className="absolute top-4 right-4 bg-salty-rust text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
            Sold Out
          </span>
        );
      case 'coming_soon':
        return (
          <span className="absolute top-4 right-4 bg-salty-teal text-salty-sand px-3 py-1 rounded-full text-xs font-bold uppercase">
            Coming Soon
          </span>
        );
      case 'tbd':
        return (
          <span className="absolute top-4 right-4 bg-salty-gold text-salty-teal px-3 py-1 rounded-full text-xs font-bold uppercase">
            Pricing TBD
          </span>
        );
      case 'available':
        if (retreat.spotsRemaining && retreat.spotsRemaining <= 10) {
          return (
            <span className="absolute top-4 right-4 bg-salty-coral text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
              {retreat.spotsRemaining} Spots Left
            </span>
          );
        }
        return null;
      default:
        return null;
    }
  };

  return (
    <Link href={href} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={retreat.cardImage}
            alt={`${retreat.destination} retreat`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          {statusBadge()}

          {/* Destination overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="font-display text-2xl text-white leading-tight">
              {retreat.destination}
            </h3>
            <p className="font-body text-sm text-white/80 mt-0.5">{retreat.title}</p>
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          <div className="flex items-center justify-between">
            <p className="font-body text-sm text-salty-teal/70">
              {formatDateRange(retreat.startDate, retreat.endDate)}
            </p>
            <p className="font-display text-lg text-salty-coral">
              {retreat.lowestPrice > 0 ? `From ${formatCurrency(retreat.lowestPrice)}` : 'TBD'}
            </p>
          </div>
          <p className="font-body text-xs text-salty-teal/50 mt-2">
            {retreat.duration.days} days &middot; {retreat.locations[0]?.region}, {retreat.locations[0]?.country}
          </p>
        </div>
      </div>
    </Link>
  );
}
