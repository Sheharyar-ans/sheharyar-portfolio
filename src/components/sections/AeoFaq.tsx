import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ_ITEMS } from '../../data/portfolioData';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const AeoFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-24 md:py-32 bg-[#080808] border-y border-white/[0.08] relative overflow-hidden"
    >
      {/* Subtle Halftone dot-matrix texture inspired by MotionSites Halftone FAQ */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(rgba(244,241,234,0.1)_1px,transparent_1px)] [background-size:22px_22px] opacity-[0.14] pointer-events-none"
      />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Centered Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-[0.18em] text-accent uppercase mb-4 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/25">
            <HelpCircle size={13} />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight mb-3">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-sm sm:text-base text-brand-secondary font-normal max-w-xl mx-auto">
            Direct, factual answers regarding architecture, capabilities, white-label partnerships,
            and working models.
          </p>
        </motion.div>

        {/* Halftone Interactive Accordion List */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className={`rounded-2xl border overflow-hidden transition-all backdrop-blur-md ${
                  isOpen
                    ? 'bg-[#111215]/95 border-accent/45 shadow-[0_0_25px_rgba(183,255,60,0.08)]'
                    : 'bg-[#0e0e10]/85 border-white/[0.08] hover:border-white/[0.2]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span
                      className={`font-mono text-xs font-bold shrink-0 ${
                        isOpen ? 'text-accent' : 'text-brand-muted'
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <h3 className="text-sm sm:text-base font-heading font-semibold text-white">
                      {item.question}
                    </h3>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-accent shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pl-12 sm:pl-14 text-xs sm:text-sm text-brand-secondary leading-relaxed border-t border-white/[0.06] pt-4">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
