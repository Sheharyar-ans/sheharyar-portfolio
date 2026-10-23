import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Mail, Sparkles } from 'lucide-react';
import { CONTACT_INFO } from '../../data/portfolioData';

interface CtaContactProps {
  onOpenInquiry: () => void;
}

export const CtaContact: React.FC<CtaContactProps> = ({ onOpenInquiry }) => {
  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[350px] bg-accent/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-14 rounded-3xl bg-surface-1/90 border border-brand-border/90 shadow-2xl backdrop-blur-md relative overflow-hidden"
        >
          {/* Top border glow */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-2 border border-brand-border text-accent text-xs font-mono tracking-widest uppercase mb-6">
            <Sparkles size={13} />
            <span>START A PROJECT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white tracking-tight leading-tight mb-6">
            WHAT SHOULD WE<br />
            <span className="text-accent text-glow">AUTOMATE NEXT?</span>
          </h2>

          <p className="text-sm sm:text-base text-brand-secondary max-w-xl mx-auto leading-relaxed mb-8">
            Have a repetitive process, missed leads, or a digital system that isn't working hard enough? Let's identify what can be automated and design the right system.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenInquiry}
              className="px-8 py-3.5 rounded-full text-xs font-bold font-mono tracking-wider bg-accent text-black hover:bg-white transition-all shadow-[0_0_25px_rgba(183,255,60,0.35)] flex items-center gap-2 active:scale-95"
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
              className="px-6 py-3.5 rounded-full text-xs font-semibold font-mono tracking-wider bg-surface-2 hover:bg-surface-3 text-white border border-brand-border transition-all flex items-center gap-2"
            >
              <Mail size={14} className="text-accent" />
              <span>SEND AN INQUIRY</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
