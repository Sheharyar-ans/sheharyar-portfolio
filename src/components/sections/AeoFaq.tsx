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
    <section id="faq" className="py-20 md:py-28 bg-surface-1/60 border-y border-brand-border/80">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        
        {/* Centered Section Header */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest text-accent uppercase mb-3 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
            <HelpCircle size={14} />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-white tracking-tight mb-3">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-sm text-brand-secondary font-normal max-w-xl mx-auto">
            Direct, factual answers regarding architecture, capabilities, white-label partnerships, and working models.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className="rounded-2xl bg-surface-2/70 border border-brand-border/70 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <h3 className="text-sm sm:text-base font-heading font-semibold text-white">
                    {item.question}
                  </h3>
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
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-brand-secondary leading-relaxed border-t border-brand-border/30 pt-4">
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
