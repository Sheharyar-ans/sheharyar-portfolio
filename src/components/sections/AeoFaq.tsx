import React from 'react';
import { motion } from 'framer-motion';
import { FAQ_ITEMS } from '../../data/portfolioData';
import { HelpCircle } from 'lucide-react';
import { FaqAccordion } from '../ui/faq-accordion';

export const AeoFaq: React.FC = () => {
  return (
    <section
      id="faq"
      className="py-24 md:py-32 bg-[#080808] border-y border-white/[0.08] relative overflow-hidden"
    >
      {/* Subtle Halftone dot-matrix texture */}
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

        {/* VengeanceUI Left-Accented Interactive FAQ Accordion */}
        <FaqAccordion items={FAQ_ITEMS} defaultOpenIndex={0} />
      </div>
    </section>
  );
};
