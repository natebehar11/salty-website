import { BookingState } from '@/types/booking';
import { formatCurrency } from '@/lib/utils';

interface BookingSummaryProps {
  booking: BookingState;
}

export default function BookingSummary({ booking }: BookingSummaryProps) {
  return (
    <div className="bg-salty-sand rounded-2xl p-6 sticky top-24">
      <h3 className="font-display text-lg text-salty-teal mb-4">Booking Summary</h3>

      <div className="space-y-3 mb-6">
        <div>
          <p className="font-body text-xs text-salty-teal/50 uppercase tracking-wide font-bold">
            Retreat
          </p>
          <p className="font-body text-sm text-salty-teal font-bold">{booking.retreatTitle}</p>
          <p className="font-body text-xs text-salty-teal/60">{booking.retreatDates}</p>
        </div>

        {booking.selectedRoom && (
          <div className="pt-3 border-t border-salty-sand-dark">
            <p className="font-body text-xs text-salty-teal/50 uppercase tracking-wide font-bold">
              Room
            </p>
            <p className="font-body text-sm text-salty-teal font-bold">{booking.selectedRoom.name}</p>
            <p className="font-body text-xs text-salty-teal/60">
              {booking.selectedRoom.bedType} &middot; Sleeps {booking.selectedRoom.occupancy}
            </p>
          </div>
        )}

        {booking.guestDetails && (
          <div className="pt-3 border-t border-salty-sand-dark">
            <p className="font-body text-xs text-salty-teal/50 uppercase tracking-wide font-bold">
              Guest
            </p>
            <p className="font-body text-sm text-salty-teal font-bold">
              {booking.guestDetails.firstName} {booking.guestDetails.lastName}
            </p>
            <p className="font-body text-xs text-salty-teal/60">{booking.guestDetails.email}</p>
          </div>
        )}
      </div>

      {booking.selectedRoom && (
        <div className="border-t border-salty-sand-dark pt-4 space-y-2">
          <div className="flex justify-between">
            <span className="font-body text-sm text-salty-teal/60">Room price</span>
            <span className="font-body text-sm text-salty-teal">
              {formatCurrency(booking.selectedRoom.priceRegular)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-body text-sm text-salty-teal/60">Deposit due today</span>
            <span className="font-display text-lg text-salty-coral font-bold">$350</span>
          </div>
          <div className="flex justify-between">
            <span className="font-body text-xs text-salty-teal/40">Balance due later</span>
            <span className="font-body text-xs text-salty-teal/40">
              {formatCurrency(booking.selectedRoom.priceRegular - 350)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
