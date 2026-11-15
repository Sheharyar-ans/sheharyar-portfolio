import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { METRICS, MARQUEE_LOCATIONS, CONTACT_INFO, REAL_RESULTS_DELIVERED } from '../../data/portfolioData';
import { SpotlightCard } from '../visuals/SpotlightCard';

const CounterItem: React.FC<{ target: number; suffix: string; label: string; index: number }> = ({
  target,
  suffix,
  label,
  index,
}) => {
  const [count, setCount] = useState<number>(target);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    let start = 0;
    const duration = 1600;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Number.isInteger(target) ? Math.floor(start) : Number(start.toFixed(1)));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  const displayValue = Number.isInteger(count)
    ? count.toLocaleString('en-US')
    : count.toFixed(1);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <SpotlightCard className="p-7 sm:p-8 rounded-2xl bg-[#0e0e10]/90 border border-white/[0.08] hover:border-accent/40 transition-all duration-300 group h-full">
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] font-mono tracking-widest text-brand-muted">
            0{index + 1} // TELEMETRY
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-accent group-hover:shadow-[0_0_8px_#B7FF3C] transition-all" />
        </div>
        <div className="text-4xl sm:text-5xl lg:text-[3.25rem] font-heading font-black text-white group-hover:text-accent transition-colors flex items-baseline gap-0.5 tracking-tight">
          <span>{displayValue}</span>
          <span className="text-accent">{suffix}</span>
        </div>
        <div className="mt-3 text-[11px] font-mono tracking-[0.14em] text-brand-secondary uppercase">
          {label}
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

export const TrustMetrics: React.FC = () => {
  return (
    <section
      id="trust"
      className="py-24 md:py-32 border-y border-white/[0.08] bg-[#080808] relative overflow-hidden"
    >
      {/* Ambient top hairline glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-8"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] text-accent uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              PROVEN PERFORMANCE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight leading-[1.05]">
              BUILT FOR REAL BUSINESS PROBLEMS.
            </h2>
          </div>
          <span className="text-xs font-mono text-brand-muted uppercase tracking-widest">
            VERIFIED PRODUCTION METRICS
          </span>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {METRICS.map((metric, idx) => (
            <CounterItem
              key={metric.label}
              target={metric.value}
              suffix={metric.suffix}
              label={metric.label}
              index={idx}
            />
          ))}
        </div>

        {/* Real Quantified Business Results */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {REAL_RESULTS_DELIVERED.map((res, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
            >
              <SpotlightCard className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.07] hover:border-accent/40 transition-all flex flex-col justify-between group h-full backdrop-blur-sm">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-accent px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20">
                      {res.category}
                    </span>
                    <span className="text-accent/70 group-hover:text-accent text-xs transition-colors">
                      ✦
                    </span>
                  </div>
                  <div className="font-heading text-2xl font-black text-white group-hover:text-accent transition-colors mb-1.5 tracking-tight">
                    {res.metric}
                  </div>
                  <h3 className="font-heading text-xs font-bold text-white/95 mb-2 leading-snug">
                    {res.title}
                  </h3>
                </div>
                <p className="text-[11px] text-brand-secondary font-body leading-relaxed pt-3 border-t border-white/[0.06]">
                  {res.description}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Verified Freelance Marketplace Reputation */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          <a
            href={CONTACT_INFO.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <SpotlightCard
              spotlightColor="rgba(20, 168, 0, 0.14)"
              className="p-5 rounded-2xl bg-[#0e0e10]/90 border border-white/[0.08] hover:border-[#14a800]/50 transition-all flex items-center justify-between"
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
                  <div className="text-xs font-heading font-bold text-white group-hover:text-accent transition-colors mt-0.5">
                    AI &amp; WordPress Engineer
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono text-brand-secondary group-hover:text-white group-hover:translate-x-1 transition-all">
                →
              </span>
            </SpotlightCard>
          </a>

          <a
            href={CONTACT_INFO.fiverr}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <SpotlightCard
              spotlightColor="rgba(29, 191, 115, 0.14)"
              className="p-5 rounded-2xl bg-[#0e0e10]/90 border border-white/[0.08] hover:border-[#1dbf73]/50 transition-all flex items-center justify-between"
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
                  <div className="text-xs font-heading font-bold text-white group-hover:text-accent transition-colors mt-0.5">
                    Elementor &amp; Speed Expert
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono text-brand-secondary group-hover:text-white group-hover:translate-x-1 transition-all">
                →
              </span>
            </SpotlightCard>
          </a>

          <a
            href={CONTACT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <SpotlightCard className="p-5 rounded-2xl bg-[#0e0e10]/90 border border-white/[0.08] hover:border-accent/50 transition-all flex items-center justify-between">
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
                  <div className="text-xs font-heading font-bold text-white group-hover:text-accent transition-colors mt-0.5">
                    Wise &amp; Wire Escrow
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono text-brand-secondary group-hover:text-white group-hover:translate-x-1 transition-all">
                →
              </span>
            </SpotlightCard>
          </a>
        </div>

        {/* International Locations Marquee */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />

          <div className="flex w-max animate-marquee gap-10 items-center text-xs font-mono tracking-[0.2em] text-brand-secondary/80 uppercase">
            {[...MARQUEE_LOCATIONS, ...MARQUEE_LOCATIONS, ...MARQUEE_LOCATIONS].map((loc, i) => (
              <div key={i} className="flex items-center gap-10 whitespace-nowrap">
                <span className="hover:text-accent transition-colors">{loc}</span>
                <span className="text-accent/50 text-[10px]">◆</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
