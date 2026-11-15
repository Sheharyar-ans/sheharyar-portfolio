import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SYSTEM_FLOW_STEPS } from '../../data/portfolioData';
import { ChevronRight, Zap } from 'lucide-react';
import { SpotlightCard } from '../visuals/SpotlightCard';

export const SystemFlow: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  useEffect(() => {
    if (isUserInteracting) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % SYSTEM_FLOW_STEPS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [isUserInteracting]);

  const currentNode = SYSTEM_FLOW_STEPS[activeStep] || SYSTEM_FLOW_STEPS[0];

  return (
    <section
      id="system-flow"
      className="py-24 md:py-32 bg-[#080808] border-y border-white/[0.08] relative overflow-hidden"
    >
      {/* Ambient radial glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-accent/[0.05] blur-[140px] pointer-events-none rounded-full"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8 text-left"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] text-accent uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              SYSTEM ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight leading-[1.05]">
              FROM FIRST CLICK TO CLOSED DEAL.
            </h2>
            <p className="mt-3 text-base text-brand-secondary font-normal max-w-2xl">
              Explore how an integrated AI system operates continuously across every stage of the
              customer lifecycle.
            </p>
          </div>
          <div className="text-xs font-mono text-brand-muted uppercase tracking-widest shrink-0">
            NODE {currentNode.step} / 0{SYSTEM_FLOW_STEPS.length}
          </div>
        </motion.div>

        {/* Neural Pathway Split Layout */}
        <div
          onMouseEnter={() => setIsUserInteracting(true)}
          onMouseLeave={() => setIsUserInteracting(false)}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left: Interactive 8-Node Pipeline */}
          <div className="lg:col-span-7 space-y-2.5">
            {SYSTEM_FLOW_STEPS.map((node, index) => {
              const isActive = activeStep === index;

              return (
                <motion.button
                  type="button"
                  key={node.step}
                  onClick={() => setActiveStep(index)}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isActive
                      ? 'bg-[#121316] border-accent/70 shadow-[0_0_28px_rgba(183,255,60,0.12)]'
                      : 'bg-white/[0.02] border-white/[0.07] hover:border-white/[0.2] hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span
                      className={`w-9 h-9 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-all ${
                        isActive
                          ? 'bg-accent text-black shadow-[0_0_14px_#B7FF3C]'
                          : 'bg-white/[0.05] text-brand-secondary'
                      }`}
                    >
                      {node.step}
                    </span>
                    <div className="min-w-0">
                      <h3
                        className={`text-sm sm:text-base font-heading font-bold transition-colors truncate ${
                          isActive ? 'text-accent' : 'text-white'
                        }`}
                      >
                        {node.name}
                      </h3>
                      <p className="text-xs text-brand-secondary mt-0.5 line-clamp-1">
                        {node.desc}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {isActive ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/15 text-accent text-[10px] font-mono tracking-wider font-semibold border border-accent/30">
                        <Zap size={11} className="animate-pulse" />
                        <span>ACTIVE</span>
                      </span>
                    ) : (
                      <ChevronRight size={16} className="text-brand-muted" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right: Sticky Live Telemetry Inspector */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <SpotlightCard className="p-7 sm:p-9 rounded-3xl bg-[#0e0e10] border border-white/[0.1] shadow-2xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
                <span className="inline-flex items-center gap-2 text-[11px] font-mono tracking-widest text-accent uppercase">
                  <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                  LIVE PIPELINE STAGE
                </span>
                <span className="font-mono text-xs text-brand-muted">
                  STEP {currentNode.step}
                </span>
              </div>

              <div className="font-mono text-5xl sm:text-6xl font-black text-white/10 mb-3">
                {currentNode.step}
              </div>

              <h3 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-tight mb-4">
                {currentNode.name}
              </h3>

              <p className="text-sm sm:text-base text-brand-secondary leading-relaxed mb-8">
                {currentNode.desc}
              </p>

              {/* Progress Bar across 8 stages */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono text-brand-muted uppercase tracking-wider">
                  <span>LIFECYCLE PROGRESS</span>
                  <span className="text-accent">
                    {Math.round(((activeStep + 1) / SYSTEM_FLOW_STEPS.length) * 100)}%
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-500 rounded-full shadow-[0_0_10px_#B7FF3C]"
                    style={{
                      width: `${((activeStep + 1) / SYSTEM_FLOW_STEPS.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
};
