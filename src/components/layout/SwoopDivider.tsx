interface SwoopDividerProps {
  color?: string;
  direction?: 'left' | 'right';
  height?: number;
  className?: string;
}

export default function SwoopDivider({
  color = '#0E3A2D',
  direction = 'left',
  height = 56,
  className = '',
}: SwoopDividerProps) {
  const path = 'M0,0 C400,100 800,100 1200,0 L1200,100 L0,100 Z';
  const transform = direction === 'right' ? 'scaleX(-1)' : undefined;

  return (
    <div className={`w-full overflow-hidden leading-none ${className}`} style={{ height }}>
      <svg
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        className="w-full h-full block"
        style={{ transform }}
      >
        <path d={path} fill={color} />
      </svg>
    </div>
  );
}
