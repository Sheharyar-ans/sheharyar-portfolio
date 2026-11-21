import React from 'react';
import { motion } from 'framer-motion';
import { SpotlightCard } from '../visuals/SpotlightCard';

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'DISCOVER',
    desc: 'Understand business goals, customer journeys, operational bottlenecks, and pinpoint high-leverage automation opportunities.',
  },
  {
    num: '02',
    title: 'DESIGN',
    desc: 'Map out the complete digital, AI agent, voice, and automation workflow architecture prior to writing any production code.',
  },
  {
    num: '03',
    title: 'BUILD',
    desc: 'Develop the website, custom plugins, voice assistants, and automation webhooks with robust security and performance.',
  },
  {
    num: '04',
    title: 'OPTIMIZE',
    desc: 'Launch, monitor real-time conversation logs, refine prompt accuracy, and continuously optimize conversions and speed.',
  },
];

export const Process: React.FC = () => {
  return (
    <section id="process" className="py-14 md:py-20 bg-[#080808] relative">
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
              METHODOLOGY
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight leading-[1.05]">
              HOW I TURN PROBLEMS INTO SYSTEMS.
            </h2>
          </div>
          <span className="text-xs font-mono text-brand-muted uppercase tracking-widest">
            4-PHASE EXECUTION
          </span>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="h-full"
            >
              <SpotlightCard className="p-7 rounded-3xl bg-[#0e0e10]/90 border border-white/[0.08] hover:border-accent/45 transition-all flex flex-col justify-between group h-full">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-4xl font-black text-white/15 group-hover:text-accent transition-colors">
                      {step.num}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-accent group-hover:shadow-[0_0_8px_#B7FF3C] transition-all" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white group-hover:text-accent transition-colors mb-3">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-secondary leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.07] flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest text-brand-muted uppercase">
                    PHASE {step.num}
                  </span>
                  <span className="text-[10px] font-mono text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    ACTIVE →
                  </span>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
