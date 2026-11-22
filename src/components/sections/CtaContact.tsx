import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Mail, Sparkles } from 'lucide-react';
import { CONTACT_INFO } from '../../data/portfolioData';
import { SpotlightCard } from '../visuals/SpotlightCard';

interface CtaContactProps {
  onOpenInquiry: () => void;
}

export const CtaContact: React.FC<CtaContactProps> = ({ onOpenInquiry }) => {
  return (
    <section id="contact" className="py-14 md:py-20 bg-[#080808] relative overflow-hidden">
      {/* Cybernetic grid backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:48px_48px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[620px] h-[360px] bg-accent/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <SpotlightCard className="p-8 sm:p-14 rounded-3xl bg-[#0e0e10]/95 border border-white/[0.12] shadow-2xl backdrop-blur-xl">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-accent text-xs font-mono tracking-widest uppercase mb-6">
              <Sparkles size={13} />
              <span>START A PROJECT</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight leading-[1.03] mb-6">
              WHAT SHOULD WE
              <br />
              <span className="text-accent">AUTOMATE NEXT?</span>
            </h2>

            <p className="text-sm sm:text-base text-brand-secondary max-w-xl mx-auto leading-relaxed mb-9">
              Have a repetitive process, missed leads, or a digital system that isn&apos;t working
              hard enough? Let&apos;s identify what can be automated and design the right system.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={onOpenInquiry}
                className="px-8 py-3.5 rounded-full text-xs font-bold font-mono tracking-wider bg-accent text-black hover:bg-white transition-all shadow-[0_0_26px_rgba(250,204,21,0.35)] flex items-center gap-2 active:scale-95"
              >
                <span>BUILD MY AI SYSTEM</span>
                <ArrowRight size={15} />
              </button>

              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full text-xs font-bold font-mono tracking-wider bg-emerald-500/15 hover:bg-emerald-500 text-emerald-400 hover:text-black border border-emerald-500/30 transition-all flex items-center gap-2"
              >
                <MessageSquare size={14} />
                <span>MESSAGE ON WHATSAPP</span>
              </a>

              <a
                href={CONTACT_INFO.emailUrl}
                className="px-6 py-3.5 rounded-full text-xs font-semibold font-mono tracking-wider bg-white/[0.04] hover:bg-white/[0.1] text-white border border-white/[0.12] transition-all flex items-center gap-2"
              >
                <Mail size={14} className="text-accent" />
                <span>SEND AN INQUIRY</span>
              </a>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
};
