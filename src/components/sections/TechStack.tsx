import React from 'react';
import { motion } from 'framer-motion';
import { TECH_CATEGORIES } from '../../data/portfolioData';
import { Terminal } from 'lucide-react';

export const TechStack: React.FC = () => {
  return (
    <section id="tech-wall" className="py-20 md:py-28 bg-surface-1/40 border-y border-brand-border/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        <div className="mb-14 text-left">
          <span className="text-xs font-mono tracking-widest text-accent uppercase block mb-2">
            TECHNICAL FOUNDATION
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight">
            THE STACK BEHIND THE SYSTEMS
          </h2>
          <p className="mt-2 text-base text-brand-secondary font-normal">
            Focused, battle-tested tools used in active production environments.
          </p>
        </div>

        {/* 4 Focused Groups in 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TECH_CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="p-6 sm:p-7 rounded-2xl bg-surface-1 border border-brand-border hover:border-accent/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Terminal size={14} className="text-accent" />
                  <span className="text-xs font-mono tracking-widest text-accent font-bold uppercase">
                    {cat.category}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono bg-surface-2 text-white border border-brand-border/80 hover:border-accent/50 hover:bg-surface-3 transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
