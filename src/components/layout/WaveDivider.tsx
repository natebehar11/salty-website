interface WaveDividerProps {
  color?: string;
  height?: number;
  className?: string;
}

export default function WaveDivider({
  color = '#E7D7C0',
  height = 28,
  className = '',
}: WaveDividerProps) {
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`} style={{ height }}>
      <svg
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        className="w-full h-full block"
      >
        <path
          d="M0,50 Q300,0 600,50 T1200,50 L1200,100 L0,100 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
