import React from 'react';
import { motion } from 'framer-motion';
import { TECH_CATEGORIES } from '../../data/portfolioData';
import { Terminal } from 'lucide-react';
import { SpotlightCard } from '../visuals/SpotlightCard';

export const TechStack: React.FC = () => {
  return (
    <section
      id="tech-wall"
      className="py-14 md:py-20 bg-[#080808] border-y border-white/[0.08] relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-8 text-left"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] text-accent uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              TECHNICAL FOUNDATION
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight leading-[1.05]">
              THE STACK BEHIND THE SYSTEMS
            </h2>
            <p className="mt-3 text-base text-brand-secondary font-normal">
              Focused, battle-tested tools used in active production environments.
            </p>
          </div>
          <span className="text-xs font-mono text-brand-muted uppercase tracking-widest">
            PRODUCTION RUNTIME
          </span>
        </motion.div>

        {/* 4 Focused Groups in 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TECH_CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <SpotlightCard className="p-7 sm:p-8 rounded-3xl bg-[#0e0e10]/90 border border-white/[0.08] hover:border-accent/40 transition-colors flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5 pb-3 border-b border-white/[0.07]">
                    <div className="flex items-center gap-2">
                      <Terminal size={14} className="text-accent" />
                      <span className="text-xs font-mono tracking-widest text-accent font-bold uppercase">
                        {cat.category}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-white/30">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-mono bg-black/50 text-white border border-white/[0.08] hover:border-accent/50 hover:text-accent transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
