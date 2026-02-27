interface LoadingSkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'none';
}

const radiusMap = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '16px',
  xl: '24px',
  full: '9999px',
};

export default function LoadingSkeleton({
  className = '',
  width,
  height,
  rounded = 'lg',
}: LoadingSkeletonProps) {
  return (
    <div
      className={`animate-pulse ${className}`}
      style={{
        backgroundColor: '#E7D7C0',
        width,
        height,
        borderRadius: radiusMap[rounded],
        backgroundImage: 'linear-gradient(90deg, #E7D7C0 25%, #F0E8DB 50%, #E7D7C0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite ease-in-out',
      }}
    >
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
