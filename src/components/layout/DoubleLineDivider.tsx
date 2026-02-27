interface DoubleLineDividerProps {
  topColor?: string;
  bottomColor?: string;
  className?: string;
}

export default function DoubleLineDivider({
  topColor = '#F75A3D',
  bottomColor = '#FED260',
  className = '',
}: DoubleLineDividerProps) {
  return (
    <div className={`flex flex-col items-center gap-1 py-6 ${className}`}>
      <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: topColor }} />
      <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: bottomColor }} />
    </div>
  );
}
