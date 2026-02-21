'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/components/shared/Button';
import { GuestDetails } from '@/types/booking';

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  countryCode: z.string(),
  dietaryRestrictions: z.string(),
  emergencyContactName: z.string().min(1, 'Emergency contact name is required'),
  emergencyContactPhone: z.string().min(7, 'Emergency contact phone is required'),
  specialRequests: z.string(),
});

interface GuestDetailsFormProps {
  onSubmit: (details: GuestDetails) => void;
  onBack: () => void;
}

export default function GuestDetailsForm({ onSubmit, onBack }: GuestDetailsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GuestDetails>({
    resolver: zodResolver(schema),
    defaultValues: { countryCode: '+1', dietaryRestrictions: '', specialRequests: '' },
  });

  return (
    <div>
      <h2 className="font-display text-2xl text-salty-teal mb-2">Your Details</h2>
      <p className="font-body text-salty-teal/60 mb-8">
        Tell us a bit about yourself so we can make this trip perfect for you.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-body text-sm font-bold text-salty-teal block mb-1">
              First Name *
            </label>
            <input
              {...register('firstName')}
              className="w-full px-4 py-3 rounded-xl border border-salty-sand-dark bg-white font-body text-salty-teal focus:border-salty-coral focus:ring-1 focus:ring-salty-coral outline-none transition-colors"
              placeholder="First name"
            />
            {errors.firstName && (
              <p className="font-body text-xs text-salty-rust mt-1">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label className="font-body text-sm font-bold text-salty-teal block mb-1">
              Last Name *
            </label>
            <input
              {...register('lastName')}
              className="w-full px-4 py-3 rounded-xl border border-salty-sand-dark bg-white font-body text-salty-teal focus:border-salty-coral focus:ring-1 focus:ring-salty-coral outline-none transition-colors"
              placeholder="Last name"
            />
            {errors.lastName && (
              <p className="font-body text-xs text-salty-rust mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="font-body text-sm font-bold text-salty-teal block mb-1">
            Email *
          </label>
          <input
            {...register('email')}
            type="email"
            className="w-full px-4 py-3 rounded-xl border border-salty-sand-dark bg-white font-body text-salty-teal focus:border-salty-coral focus:ring-1 focus:ring-salty-coral outline-none transition-colors"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="font-body text-xs text-salty-rust mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="font-body text-sm font-bold text-salty-teal block mb-1">
            Phone Number *
          </label>
          <div className="flex gap-2">
            <select
              {...register('countryCode')}
              className="w-24 px-3 py-3 rounded-xl border border-salty-sand-dark bg-white font-body text-salty-teal text-sm focus:border-salty-coral outline-none"
            >
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+61">+61</option>
              <option value="+33">+33</option>
              <option value="+49">+49</option>
            </select>
            <input
              {...register('phone')}
              type="tel"
              className="flex-1 px-4 py-3 rounded-xl border border-salty-sand-dark bg-white font-body text-salty-teal focus:border-salty-coral focus:ring-1 focus:ring-salty-coral outline-none transition-colors"
              placeholder="(555) 123-4567"
            />
          </div>
          {errors.phone && (
            <p className="font-body text-xs text-salty-rust mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Dietary */}
        <div>
          <label className="font-body text-sm font-bold text-salty-teal block mb-1">
            Dietary Restrictions
          </label>
          <select
            {...register('dietaryRestrictions')}
            className="w-full px-4 py-3 rounded-xl border border-salty-sand-dark bg-white font-body text-salty-teal focus:border-salty-coral outline-none"
          >
            <option value="">None</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten-free">Gluten-Free</option>
            <option value="dairy-free">Dairy-Free</option>
            <option value="other">Other (tell us in special requests)</option>
          </select>
        </div>

        {/* Emergency Contact */}
        <div className="pt-4 border-t border-salty-sand-dark">
          <p className="font-body text-sm font-bold text-salty-teal mb-4">Emergency Contact</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-body text-xs text-salty-teal/60 block mb-1">Name *</label>
              <input
                {...register('emergencyContactName')}
                className="w-full px-4 py-3 rounded-xl border border-salty-sand-dark bg-white font-body text-salty-teal focus:border-salty-coral focus:ring-1 focus:ring-salty-coral outline-none transition-colors"
                placeholder="Emergency contact name"
              />
              {errors.emergencyContactName && (
                <p className="font-body text-xs text-salty-rust mt-1">{errors.emergencyContactName.message}</p>
              )}
            </div>
            <div>
              <label className="font-body text-xs text-salty-teal/60 block mb-1">Phone *</label>
              <input
                {...register('emergencyContactPhone')}
                type="tel"
                className="w-full px-4 py-3 rounded-xl border border-salty-sand-dark bg-white font-body text-salty-teal focus:border-salty-coral focus:ring-1 focus:ring-salty-coral outline-none transition-colors"
                placeholder="Emergency contact phone"
              />
              {errors.emergencyContactPhone && (
                <p className="font-body text-xs text-salty-rust mt-1">{errors.emergencyContactPhone.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <label className="font-body text-sm font-bold text-salty-teal block mb-1">
            Special Requests
          </label>
          <textarea
            {...register('specialRequests')}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-salty-sand-dark bg-white font-body text-salty-teal focus:border-salty-coral focus:ring-1 focus:ring-salty-coral outline-none transition-colors resize-none"
            placeholder="Anything else we should know? Room preferences, travel companions, etc."
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="font-body text-sm text-salty-teal/60 hover:text-salty-teal transition-colors"
          >
            &larr; Back to rooms
          </button>
          <Button type="submit" variant="primary" size="md">
            Continue to Payment
          </Button>
        </div>
      </form>
    </div>
  );
}
