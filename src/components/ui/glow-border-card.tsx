import React from 'react';
import { cn } from '../../lib/utils';

export interface GlowBorderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  borderRadius?: string;
  animationDuration?: number;
  gradientColors?: string[];
  colorPreset?: 'brand' | 'aurora' | 'ocean' | 'custom';
  paused?: boolean;
}

const colorPresets: Record<string, string[]> = {
  brand: [
    '#B7FF3C',
    '#8CE626',
    '#4ADE80',
    '#22D3EE',
    '#171717',
    '#262626',
    '#B7FF3C',
    '#A3E635',
    '#22D3EE',
    '#B7FF3C',
  ],
  aurora: ['#B7FF3C', '#22ffaa', '#44ffcc', '#60efff', '#88ddff', '#B7FF3C', '#4ade80', '#22d3ee', '#a3e635', '#B7FF3C'],
  ocean: ['#006699', '#1177aa', '#2288bb', '#3399cc', '#44aadd', '#55bbee', '#66ccff', '#44bbee', '#2299cc', '#006699'],
  custom: ['#B7FF3C', '#9ef01a', '#4ade80', '#22d3ee', '#111111', '#222222', '#B7FF3C', '#84cc16', '#22d3ee', '#B7FF3C'],
};

/**
 * VengeanceUI GlowBorderCard — adapted for dark luxury #080808 / #111111 / #B7FF3C theme
 */
export const GlowBorderCard = React.forwardRef<HTMLDivElement, GlowBorderCardProps>(
  (
    {
      children,
      className,
      borderRadius = '1rem',
      animationDuration = 6,
      gradientColors,
      colorPreset = 'brand',
      paused = false,
      style,
      ...props
    },
    ref
  ) => {
    const colors = gradientColors || colorPresets[colorPreset] || colorPresets.brand;

    const colorVars: Record<string, string> = {};
    for (let i = 0; i < 10; i++) {
      colorVars[`--vng-glow-${i + 1}`] = colors[i % colors.length];
    }

    return (
      <div
        ref={ref}
        className={cn(
          'vng-glow-card relative overflow-hidden p-[1px] transition-all duration-300',
          paused && 'vng-glow-paused',
          className
        )}
        style={{
          borderRadius,
          '--vng-glow-duration': `${animationDuration}s`,
          ...colorVars,
          ...style,
        } as React.CSSProperties}
        {...props}
      >
        <div
          aria-hidden="true"
          className="vng-glow-ring pointer-events-none absolute -inset-[1px] z-0 opacity-30 transition-opacity duration-300 group-hover:opacity-95"
          style={{ borderRadius }}
        />
        <div
          className="relative z-10 h-full w-full bg-surface-1 overflow-hidden"
          style={{ borderRadius: `calc(${borderRadius} - 1px)` }}
        >
          {children}
        </div>
      </div>
    );
  }
);

GlowBorderCard.displayName = 'GlowBorderCard';
