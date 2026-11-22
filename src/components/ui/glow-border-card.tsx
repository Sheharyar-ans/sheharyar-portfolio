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
    '#FACC15',
    '#F59E0B',
    '#FBBF24',
    '#FEF08A',
    '#171717',
    '#262626',
    '#FACC15',
    '#FDE047',
    '#FEF08A',
    '#FACC15',
  ],
  aurora: ['#FACC15', '#22ffaa', '#44ffcc', '#60efff', '#88ddff', '#FACC15', '#4ade80', '#22d3ee', '#a3e635', '#FACC15'],
  ocean: ['#006699', '#1177aa', '#2288bb', '#3399cc', '#44aadd', '#55bbee', '#66ccff', '#44bbee', '#2299cc', '#006699'],
  custom: ['#FACC15', '#9ef01a', '#4ade80', '#22d3ee', '#111111', '#222222', '#FACC15', '#84cc16', '#22d3ee', '#FACC15'],
};

/**
 * VengeanceUI GlowBorderCard — adapted for dark luxury #080808 / #111111 / #FACC15 theme
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
