'use client';

import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import Button from '@/components/shared/Button';

interface PaymentStepProps {
  deposit: number;
  onComplete: () => void;
  onBack: () => void;
}

export default function PaymentStep({ deposit, onComplete, onBack }: PaymentStepProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    onComplete();
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 16);
    return cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length >= 3) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    return cleaned;
  };

  return (
    <div>
      <h2 className="font-display text-2xl text-salty-teal mb-2">Payment</h2>
      <p className="font-body text-salty-teal/60 mb-8">
        Secure your spot with a {formatCurrency(deposit)} deposit. The remaining balance is due 60 days before departure.
      </p>

      <div className="bg-salty-sand rounded-xl p-4 mb-8">
        <div className="flex items-center justify-between">
          <span className="font-body text-sm text-salty-teal/60">Deposit due today</span>
          <span className="font-display text-2xl text-salty-teal">{formatCurrency(deposit)}</span>
        </div>
      </div>

      <form onSubmit={handlePayment} className="space-y-6">
        <div>
          <label className="font-body text-sm font-bold text-salty-teal block mb-1">
            Card Number
          </label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            className="w-full px-4 py-3 rounded-xl border border-salty-sand-dark bg-white font-body text-salty-teal focus:border-salty-coral focus:ring-1 focus:ring-salty-coral outline-none transition-colors"
            placeholder="4242 4242 4242 4242"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-body text-sm font-bold text-salty-teal block mb-1">
              Expiry
            </label>
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-salty-sand-dark bg-white font-body text-salty-teal focus:border-salty-coral focus:ring-1 focus:ring-salty-coral outline-none transition-colors"
              placeholder="MM/YY"
              required
            />
          </div>
          <div>
            <label className="font-body text-sm font-bold text-salty-teal block mb-1">
              CVC
            </label>
            <input
              type="text"
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
              className="w-full px-4 py-3 rounded-xl border border-salty-sand-dark bg-white font-body text-salty-teal focus:border-salty-coral focus:ring-1 focus:ring-salty-coral outline-none transition-colors"
              placeholder="123"
              required
            />
          </div>
        </div>

        <div className="bg-salty-sand/50 rounded-xl p-4 border border-salty-sand-dark">
          <p className="font-body text-xs text-salty-teal/50 text-center">
            This is a prototype. No real payment will be processed.
            <br />
            Use any card number to continue.
          </p>
        </div>

        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="font-body text-sm text-salty-teal/60 hover:text-salty-teal transition-colors"
          >
            &larr; Back to details
          </button>
          <Button type="submit" variant="primary" size="md" disabled={isProcessing}>
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </span>
            ) : (
              `Pay ${formatCurrency(deposit)} Deposit`
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
