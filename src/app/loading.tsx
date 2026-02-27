import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function Loading() {
  return (
    <div
      className="flex items-center justify-center"
      style={{ minHeight: '60vh' }}
    >
      <LoadingSpinner />
    </div>
  );
}
