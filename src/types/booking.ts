import { RoomTier } from './retreat';

export interface GuestDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  dietaryRestrictions: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  specialRequests: string;
}

export interface BookingState {
  retreatSlug: string;
  retreatTitle: string;
  retreatDates: string;
  selectedRoom: RoomTier | null;
  guestDetails: GuestDetails | null;
  paymentComplete: boolean;
  bookingId: string | null;
}

export type BookingStep = 'room' | 'details' | 'payment';
