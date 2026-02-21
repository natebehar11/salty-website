'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'retreat';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  retreatAccent?: string;
  retreatDark?: string;
  invertText?: boolean;
  href?: string;
  fullWidth?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-5 py-2 text-sm',
  md: 'px-8 py-3 text-base',
  lg: 'px-10 py-4 text-lg',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  retreatAccent,
  retreatDark,
  invertText = false,
  fullWidth = false,
  className = '',
  style,
  children,
  ...props
}, ref) => {
  const baseClasses = `rounded-full font-bold transition-all duration-200 inline-flex items-center justify-center cursor-pointer ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

  const variantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: '#F75A3D', color: '#0E3A2D' };
      case 'secondary':
        return { backgroundColor: '#F7F4ED', color: '#0E3A2D', border: '1px solid #E7D7C0' };
      case 'retreat':
        return {
          backgroundColor: retreatAccent || '#F75A3D',
          color: invertText ? '#F7F4ED' : '#0E3A2D',
        };
      default:
        return {};
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    if (variant === 'primary') {
      el.style.backgroundColor = '#0E3A2D';
      el.style.color = '#F7F4ED';
    } else if (variant === 'secondary') {
      el.style.backgroundColor = '#0E3A2D';
      el.style.color = '#F7F4ED';
    } else if (variant === 'retreat') {
      el.style.backgroundColor = '#F7F4ED';
      el.style.color = retreatDark || retreatAccent || '#0E3A2D';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    const styles = variantStyles();
    el.style.backgroundColor = styles.backgroundColor || '';
    el.style.color = styles.color || '';
  };

  return (
    <button
      ref={ref}
      className={baseClasses}
      style={{ ...variantStyles(), ...style }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
