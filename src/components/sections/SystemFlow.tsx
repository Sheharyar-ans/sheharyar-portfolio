import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SYSTEM_FLOW_STEPS } from '../../data/portfolioData';
import { ArrowDown, ChevronRight, Zap } from 'lucide-react';

export const SystemFlow: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  // Auto-cycle active node unless user is hovering
  useEffect(() => {
    if (isUserInteracting) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % SYSTEM_FLOW_STEPS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [isUserInteracting]);

  return (
    <section id="system-flow" className="py-20 md:py-28 bg-surface-1/40 border-y border-brand-border/60 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-14 text-left">
          <span className="text-xs font-mono tracking-widest text-accent uppercase block mb-2">
            SYSTEM ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight">
            FROM FIRST CLICK TO CLOSED DEAL.
          </h2>
          <p className="mt-2 text-base text-brand-secondary font-normal max-w-2xl">
            Explore how an integrated AI system operates continuously across every stage of the customer lifecycle.
          </p>
        </div>

        {/* Interactive Flow Container */}
        <div 
          onMouseEnter={() => setIsUserInteracting(true)}
          onMouseLeave={() => setIsUserInteracting(false)}
          className="space-y-3"
        >
          {SYSTEM_FLOW_STEPS.map((node, index) => {
            const isActive = activeStep === index;

            return (
              <div key={node.step} className="flex flex-col items-center">
                {/* Flow Card */}
                <motion.div
                  onClick={() => setActiveStep(index)}
                  className={`w-full p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    isActive
                      ? 'bg-surface-2 border-accent shadow-[0_0_25px_rgba(183,255,60,0.15)] ring-1 ring-accent/50'
                      : 'bg-surface-1/80 border-brand-border hover:border-brand-borderHover hover:bg-surface-2/60'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`w-10 h-10 rounded-xl font-mono text-sm font-bold flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? 'bg-accent text-black shadow-[0_0_15px_#B7FF3C]'
                          : 'bg-surface-3 text-brand-secondary'
                      }`}
                    >
                      {node.step}
                    </span>
                    <div>
                      <h3
                        className={`text-base sm:text-lg font-heading font-bold transition-colors ${
                          isActive ? 'text-accent' : 'text-white'
                        }`}
                      >
                        {node.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-brand-secondary mt-0.5 max-w-xl">
                        {node.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    {isActive ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-mono tracking-wider font-semibold border border-accent/30">
                        <Zap size={13} className="animate-pulse" />
                        <span>ACTIVE NODE</span>
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-brand-muted hover:text-brand-secondary flex items-center gap-1">
                        <span>INSPECT</span>
                        <ChevronRight size={14} />
                      </span>
                    )}
                  </div>
                </motion.div>

                {/* Connector pulse line between nodes */}
                {index < SYSTEM_FLOW_STEPS.length - 1 && (
                  <div className="h-6 w-[2px] bg-brand-border relative my-1 overflow-hidden">
                    {isActive && (
                      <motion.div
                        initial={{ y: -24 }}
                        animate={{ y: 24 }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                        className="w-full h-4 bg-accent shadow-[0_0_8px_#B7FF3C]"
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
