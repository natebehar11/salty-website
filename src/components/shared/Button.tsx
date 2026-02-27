'use client';

import { ButtonHTMLAttributes, forwardRef, useId } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'retreat';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  retreatAccent?: string;
  retreatSecondary?: string;
  retreatDark?: string;
  invertText?: boolean;
  fullWidth?: boolean;
}

const SIZE_STYLES: Record<ButtonSize, { height: number; px: number; py: number; fontSize: number; borderWidth: number }> = {
  sm: { height: 36, px: 16, py: 10, fontSize: 14, borderWidth: 1 },
  md: { height: 44, px: 24, py: 14, fontSize: 16, borderWidth: 1.5 },
  lg: { height: 52, px: 28, py: 16, fontSize: 18, borderWidth: 1.5 },
};

const COLORS = {
  coral: 'var(--color-coral)',
  teal: 'var(--color-teal)',
  sand: 'var(--color-sand)',
  sky: 'var(--color-sky)',
  paperWhite: 'var(--color-paper-white)',
} as const;

function getVariantColors(variant: ButtonVariant, retreatAccent?: string, retreatSecondary?: string, invertText?: boolean) {
  switch (variant) {
    case 'primary':
      return {
        default: { bg: COLORS.coral, border: COLORS.sand, text: COLORS.teal },
        hover: { bg: COLORS.teal, border: COLORS.sky, text: COLORS.coral, shadow: 'var(--shadow-btn-primary-hover)' },
        active: { bg: COLORS.teal, border: COLORS.sky, text: COLORS.sky },
        disabled: { bg: 'rgba(247,90,61,0.5)', border: COLORS.paperWhite, text: 'rgba(14,58,45,0.5)' },
      };
    case 'secondary':
      return {
        default: { bg: COLORS.paperWhite, border: COLORS.sand, text: COLORS.teal },
        hover: { bg: COLORS.sky, border: COLORS.sand, text: COLORS.teal, shadow: 'var(--shadow-btn-secondary-hover)' },
        active: { bg: COLORS.sky, border: COLORS.sand, text: COLORS.teal },
        disabled: { bg: 'rgba(247,244,237,0.5)', border: COLORS.sand, text: 'rgba(14,58,45,0.5)' },
      };
    case 'retreat': {
      const accent = retreatAccent || COLORS.coral;
      const secondary = retreatSecondary || accent;
      const textColor = invertText ? COLORS.paperWhite : COLORS.teal;
      const hoverText = invertText ? COLORS.paperWhite : secondary;
      return {
        default: { bg: secondary, border: accent, text: textColor },
        hover: { bg: COLORS.teal, border: accent, text: hoverText, shadow: `1px 2px 6px rgba(${hexToRgb(accent)},0.5)` },
        active: { bg: COLORS.teal, border: accent, text: COLORS.sky },
        disabled: { bg: `${secondary}80`, border: `${accent}80`, text: `${textColor}80` },
      };
    }
  }
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  retreatAccent,
  retreatSecondary,
  retreatDark,
  invertText = false,
  fullWidth = false,
  className = '',
  disabled,
  children,
  style: styleProp,
  ...props
}, ref) => {
  const instanceId = useId();
  const sizeStyle = SIZE_STYLES[size];
  const colors = getVariantColors(variant, retreatAccent, retreatSecondary, invertText);
  const scopeClass = `salty-btn-${instanceId.replace(/:/g, '')}`;

  return (
    <>
      <button
        ref={ref}
        className={`${scopeClass} salty-btn inline-flex items-center justify-center cursor-pointer ${fullWidth ? 'w-full' : ''} ${disabled ? '!cursor-not-allowed' : ''} ${className}`}
        style={{
          height: sizeStyle.height,
          paddingLeft: sizeStyle.px,
          paddingRight: sizeStyle.px,
          paddingTop: sizeStyle.py,
          paddingBottom: sizeStyle.py,
          borderRadius: 'var(--radius-button)',
          borderWidth: sizeStyle.borderWidth,
          borderStyle: 'solid',
          borderColor: disabled ? colors.disabled.border : colors.default.border,
          backgroundColor: disabled ? colors.disabled.bg : colors.default.bg,
          color: disabled ? colors.disabled.text : colors.default.text,
          fontFamily: 'var(--font-body)',
          fontSize: sizeStyle.fontSize,
          fontWeight: 700,
          lineHeight: 'normal',
          transition: 'background-color 200ms ease, color 200ms ease, border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease',
          ...styleProp,
        } as React.CSSProperties}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
      <style>{`
        .${scopeClass}:focus-visible {
          outline: 2px solid ${COLORS.coral};
          outline-offset: 2px;
        }
        .${scopeClass}:hover:not(:disabled) {
          background-color: ${colors.hover.bg} !important;
          border-color: ${colors.hover.border} !important;
          color: ${colors.hover.text} !important;
          transform: scale(1.02);
          ${colors.hover.shadow ? `box-shadow: ${colors.hover.shadow} !important;` : ''}
        }
        .${scopeClass}:active:not(:disabled) {
          background-color: ${colors.active.bg} !important;
          border-color: ${colors.active.border} !important;
          color: ${colors.active.text} !important;
          box-shadow: none !important;
        }
      `}</style>
    </>
  );
});

Button.displayName = 'Button';
export default Button;
