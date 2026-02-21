'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getRetreatBySlug } from '@/data/retreats';
import { BookingState, BookingStep } from '@/types/booking';
import { RoomTier } from '@/types/retreat';
import RoomSelection from '@/components/booking/RoomSelection';
import GuestDetailsForm from '@/components/booking/GuestDetailsForm';
import PaymentStep from '@/components/booking/PaymentStep';
import BookingSummary from '@/components/booking/BookingSummary';
import StepIndicator from '@/components/booking/StepIndicator';
import { formatDateRange } from '@/lib/utils';
import { GuestDetails } from '@/types/booking';

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const retreat = getRetreatBySlug(slug);

  const [step, setStep] = useState<BookingStep>('room');
  const [booking, setBooking] = useState<BookingState>({
    retreatSlug: slug,
    retreatTitle: retreat?.subtitle || '',
    retreatDates: retreat ? formatDateRange(retreat.startDate, retreat.endDate) : '',
    selectedRoom: null,
    guestDetails: null,
    paymentComplete: false,
    bookingId: null,
  });

  useEffect(() => {
    if (!retreat || retreat.roomTiers.length === 0) {
      router.push(`/retreats/${slug}`);
    }
  }, [retreat, slug, router]);

  if (!retreat || retreat.roomTiers.length === 0) return null;

  const handleRoomSelect = (room: RoomTier) => {
    setBooking((prev) => ({ ...prev, selectedRoom: room }));
    setStep('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDetailsSubmit = (details: GuestDetails) => {
    setBooking((prev) => ({ ...prev, guestDetails: details }));
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentComplete = async () => {
    const bookingId = crypto.randomUUID().slice(0, 8).toUpperCase();
    setBooking((prev) => ({ ...prev, paymentComplete: true, bookingId }));
    router.push(`/booking/confirmation?id=${bookingId}&retreat=${encodeURIComponent(retreat.subtitle)}&destination=${encodeURIComponent(retreat.destination)}`);
  };

  const handleBack = () => {
    if (step === 'details') setStep('room');
    if (step === 'payment') setStep('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-salty-sand min-h-screen pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl lg:text-4xl text-salty-teal">
            Book {retreat.subtitle}
          </h1>
          <p className="font-body text-salty-teal/60 mt-2">
            {booking.retreatDates}
          </p>
        </div>

        <StepIndicator currentStep={step} />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 'room' && (
              <RoomSelection
                roomTiers={retreat.roomTiers}
                onSelect={handleRoomSelect}
              />
            )}
            {step === 'details' && (
              <GuestDetailsForm
                onSubmit={handleDetailsSubmit}
                onBack={handleBack}
              />
            )}
            {step === 'payment' && (
              <PaymentStep
                deposit={retreat.deposit}
                onComplete={handlePaymentComplete}
                onBack={handleBack}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BookingSummary booking={booking} />
          </div>
        </div>
      </div>
    </div>
  );
}
