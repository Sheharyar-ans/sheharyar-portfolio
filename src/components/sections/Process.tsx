import React from 'react';
import { motion } from 'framer-motion';

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
    <section id="process" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        <div className="mb-16 text-left">
          <span className="text-xs font-mono tracking-widest text-accent uppercase block mb-2">
            METHODOLOGY
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight">
            HOW I TURN PROBLEMS INTO SYSTEMS.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 sm:p-7 rounded-2xl bg-surface-1 border border-brand-border hover:border-accent/40 transition-all hover:bg-surface-2/70 flex flex-col justify-between group"
            >
              <div>
                <span className="font-mono text-3xl font-bold text-brand-muted group-hover:text-accent transition-colors block mb-4">
                  {step.num}
                </span>
                <h3 className="text-lg font-heading font-bold text-white group-hover:text-accent transition-colors mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-secondary leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-brand-border/40 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-60 group-hover:opacity-100" />
                <span className="text-[10px] font-mono tracking-wider text-brand-muted uppercase">
                  PHASE {step.num}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
