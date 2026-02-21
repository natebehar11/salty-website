interface Stat {
  value: string;
  label: string;
}

interface StatBarProps {
  stats: Stat[];
  className?: string;
  onDark?: boolean;
}

export default function StatBar({ stats, className = '', onDark = false }: StatBarProps) {
  return (
    <div
      className={`grid grid-cols-2 gap-8 lg:gap-4 text-center ${className}`}
      style={{ gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, minmax(0, 1fr))` }}
    >
      {stats.map((stat) => (
        <div key={stat.label}>
          <p
            className="text-4xl lg:text-5xl font-bold uppercase"
            style={{
              fontFamily: 'var(--font-display)',
              color: onDark ? '#F7F4ED' : '#0E3A2D',
            }}
          >
            {stat.value}
          </p>
          <p
            className="text-sm mt-2"
            style={{ color: onDark ? '#E7D7C0' : '#4A4E58' }}
          >
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
