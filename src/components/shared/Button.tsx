import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export default function Button({
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-body font-bold tracking-wide uppercase rounded-full transition-all duration-200 active:scale-[0.98]';

  const variants = {
    primary: 'bg-salty-coral text-white hover:bg-salty-coral-dark',
    secondary:
      'bg-transparent border-2 border-salty-teal text-salty-teal hover:bg-salty-teal hover:text-white',
    ghost: 'bg-transparent text-salty-teal hover:text-salty-coral underline underline-offset-4',
  };

  const sizes = {
    sm: 'px-5 py-2 text-xs',
    md: 'px-8 py-3 text-sm',
    lg: 'px-10 py-4 text-base',
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], disabled && 'opacity-50 cursor-not-allowed', className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} type={type} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
