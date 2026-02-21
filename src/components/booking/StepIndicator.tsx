import { BookingStep } from '@/types/booking';

const steps: { key: BookingStep; label: string; number: number }[] = [
  { key: 'room', label: 'Select Room', number: 1 },
  { key: 'details', label: 'Your Details', number: 2 },
  { key: 'payment', label: 'Payment', number: 3 },
];

export default function StepIndicator({ currentStep }: { currentStep: BookingStep }) {
  const currentIndex = steps.findIndex((s) => s.key === currentStep);

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      {steps.map((step, i) => {
        const isActive = i === currentIndex;
        const isComplete = i < currentIndex;

        return (
          <div key={step.key} className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  isActive
                    ? 'bg-salty-coral text-white'
                    : isComplete
                    ? 'bg-salty-teal text-white'
                    : 'bg-salty-sand text-salty-teal/40'
                }`}
              >
                {isComplete ? '\u2713' : step.number}
              </div>
              <span
                className={`font-body text-sm hidden sm:block ${
                  isActive ? 'text-salty-teal font-bold' : 'text-salty-teal/40'
                }`}
              >
                {step.label}
              </span>
            </div>

            {i < steps.length - 1 && (
              <div
                className={`w-8 sm:w-16 h-0.5 ${
                  isComplete ? 'bg-salty-teal' : 'bg-salty-sand-dark'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
