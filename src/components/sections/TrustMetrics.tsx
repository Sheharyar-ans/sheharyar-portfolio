import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { METRICS, MARQUEE_LOCATIONS, CONTACT_INFO, REAL_RESULTS_DELIVERED } from '../../data/portfolioData';

const CounterItem: React.FC<{ target: number; suffix: string; label: string }> = ({
  target,
  suffix,
  label,
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1800;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div
      ref={ref}
      className="p-6 sm:p-8 rounded-2xl bg-surface-1/70 border border-brand-border/80 hover:border-accent/30 transition-all hover:bg-surface-2/70 group"
    >
      <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white group-hover:text-accent transition-colors flex items-baseline gap-0.5">
        <span>{count}</span>
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="mt-2 text-xs font-mono tracking-wider text-brand-secondary uppercase">
        {label}
      </div>
    </div>
  );
};

export const TrustMetrics: React.FC = () => {
  return (
    <section id="trust" className="py-16 md:py-20 border-y border-brand-border/60 bg-surface-1/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        <div className="mb-10 text-left">
          <span className="text-xs font-mono tracking-widest text-accent uppercase block mb-1">
            PROVEN PERFORMANCE
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
            BUILT FOR REAL BUSINESS PROBLEMS.
          </h2>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {METRICS.map((metric) => (
            <CounterItem
              key={metric.label}
              target={metric.value}
              suffix={metric.suffix}
              label={metric.label}
            />
          ))}
        </div>

        {/* Real Quantified Business Results */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {REAL_RESULTS_DELIVERED.map((res, idx) => (
            <div 
              key={idx} 
              className="p-5 rounded-2xl bg-surface-1/80 border border-brand-border/70 hover:border-accent/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-accent px-2 py-0.5 rounded bg-accent/10 border border-accent/20">
                    {res.category}
                  </span>
                  <span className="text-accent text-xs">✦</span>
                </div>
                <div className="font-heading text-2xl font-black text-white group-hover:text-accent transition-colors mb-1">
                  {res.metric}
                </div>
                <h3 className="font-heading text-xs font-bold text-white mb-1.5 leading-snug">
                  {res.title}
                </h3>
              </div>
              <p className="text-[11px] text-brand-secondary font-body leading-relaxed pt-2 border-t border-brand-border/40">
                {res.description}
              </p>
            </div>
          ))}
        </div>

        {/* Verified Freelance Marketplace Reputation (Upwork, Fiverr & Direct) */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Upwork Card */}
          <a
            href={CONTACT_INFO.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-surface-1/90 border border-brand-border hover:border-[#14a800]/50 transition-all hover:bg-surface-2/90 flex items-center justify-between group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#14a800]/15 text-[#14a800] border border-[#14a800]/30 flex items-center justify-center font-heading font-black text-base group-hover:scale-105 transition-transform shrink-0">
                Up
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono font-bold text-[#14a800] uppercase tracking-wider">
                    UPWORK VERIFIED
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#14a800]/10 text-[#14a800]">
                    5.0 ★
                  </span>
                </div>
                <div className="text-xs font-heading font-bold text-white group-hover:text-accent transition-colors flex items-center gap-1 mt-0.5">
                  <span>AI & WordPress Engineer</span>
                </div>
              </div>
            </div>

            <div className="text-xs font-mono text-brand-secondary group-hover:text-white flex items-center gap-1 shrink-0">
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </div>
          </a>

          {/* Fiverr Card */}
          <a
            href={CONTACT_INFO.fiverr}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-surface-1/90 border border-brand-border hover:border-[#1dbf73]/50 transition-all hover:bg-surface-2/90 flex items-center justify-between group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#1dbf73]/15 text-[#1dbf73] border border-[#1dbf73]/30 flex items-center justify-center font-heading font-black text-base group-hover:scale-105 transition-transform shrink-0">
                fi
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono font-bold text-[#1dbf73] uppercase tracking-wider">
                    FIVERR VERIFIED
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#1dbf73]/10 text-[#1dbf73]">
                    100%
                  </span>
                </div>
                <div className="text-xs font-heading font-bold text-white group-hover:text-accent transition-colors flex items-center gap-1 mt-0.5">
                  <span>Elementor & Speed Expert</span>
                </div>
              </div>
            </div>

            <div className="text-xs font-mono text-brand-secondary group-hover:text-white flex items-center gap-1 shrink-0">
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </div>
          </a>

          {/* Direct Milestone Contracts Card */}
          <a
            href={CONTACT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-surface-1/90 border border-brand-border hover:border-accent/50 transition-all hover:bg-surface-2/90 flex items-center justify-between group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-accent/15 text-accent border border-accent/30 flex items-center justify-center font-heading font-black text-base group-hover:scale-105 transition-transform shrink-0">
                ✓
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono font-bold text-accent uppercase tracking-wider">
                    DIRECT CONTRACTS
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-accent/10 text-accent">
                    NDA
                  </span>
                </div>
                <div className="text-xs font-heading font-bold text-white group-hover:text-accent transition-colors flex items-center gap-1 mt-0.5">
                  <span>Wise & Wire Escrow</span>
                </div>
              </div>
            </div>

            <div className="text-xs font-mono text-brand-secondary group-hover:text-white flex items-center gap-1 shrink-0">
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </div>
          </a>
        </div>

        {/* International Locations Marquee */}
        <div className="mt-10 pt-8 border-t border-brand-border/40 overflow-hidden relative">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

          <div className="flex w-max animate-marquee gap-8 items-center text-xs font-mono tracking-widest text-brand-secondary/80 uppercase">
            {[...MARQUEE_LOCATIONS, ...MARQUEE_LOCATIONS, ...MARQUEE_LOCATIONS].map((loc, i) => (
              <div key={i} className="flex items-center gap-8 whitespace-nowrap">
                <span className="hover:text-accent transition-colors">{loc}</span>
                <span className="text-accent/60">✦</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
