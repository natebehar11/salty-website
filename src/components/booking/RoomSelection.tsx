'use client';

import Image from 'next/image';
import { RoomTier } from '@/types/retreat';
import { formatCurrency } from '@/lib/utils';

interface RoomSelectionProps {
  roomTiers: RoomTier[];
  onSelect: (room: RoomTier) => void;
}

export default function RoomSelection({ roomTiers, onSelect }: RoomSelectionProps) {
  return (
    <div>
      <h2 className="font-display text-2xl text-salty-teal mb-2">Choose Your Room</h2>
      <p className="font-body text-salty-teal/60 mb-8">
        All rooms include the full retreat experience. Pick your vibe and budget.
      </p>

      <div className="space-y-4">
        {roomTiers.map((room) => (
          <button
            key={room.id}
            onClick={() => onSelect(room)}
            className="w-full text-left bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border-2 border-transparent hover:border-salty-coral overflow-hidden group"
          >
            <div className="flex flex-col sm:flex-row">
              {/* Image */}
              <div className="relative w-full sm:w-48 h-40 sm:h-auto flex-shrink-0">
                <Image
                  src={room.images[0] || '/images/retreats/sri-lanka/accommodation.jpg'}
                  alt={room.name}
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>

              {/* Info */}
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-xl text-salty-teal group-hover:text-salty-coral transition-colors">
                      {room.name}
                    </h3>
                    <p className="font-body text-xs text-salty-teal/50 mt-0.5">
                      {room.bedType} &middot; {room.occupancy} guest{room.occupancy > 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl text-salty-coral">
                      {formatCurrency(room.priceEarlyBird)}
                    </p>
                    <p className="font-body text-xs text-salty-teal/40">
                      Early Bird
                    </p>
                  </div>
                </div>
                <p className="font-body text-sm text-salty-teal/70 mt-3 leading-relaxed">
                  {room.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="font-body text-xs text-salty-teal/40">
                    Regular: {formatCurrency(room.priceRegular)}
                  </p>
                  <span className="font-body text-xs text-salty-coral font-bold uppercase tracking-wide group-hover:underline">
                    Select &rarr;
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
