import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../../data/portfolioData';
import { Star, ShieldCheck } from 'lucide-react';
import { SpotlightCard } from '../visuals/SpotlightCard';

export const Testimonials: React.FC = () => {
  return (
    <section
      id="testimonials"
      className="py-24 md:py-32 bg-[#080808] border-y border-white/[0.08] relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-8 text-left"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] text-accent uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              CLIENT &amp; PARTNER FEEDBACK
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight leading-[1.05]">
              VERIFIED REPUTATION
            </h2>
            <p className="mt-3 text-base text-brand-secondary font-normal">
              Feedback from international business owners and agency partners across Upwork and
              Fiverr.
            </p>
          </div>
          <span className="text-xs font-mono text-brand-muted uppercase tracking-widest">
            5.0 ★ AVERAGE RATING
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={t.client + t.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="h-full"
            >
              <SpotlightCard className="p-7 rounded-3xl bg-[#0e0e10]/90 border border-white/[0.08] hover:border-accent/40 transition-all flex flex-col justify-between group h-full">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="flex items-center gap-1 text-accent">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
                      <ShieldCheck size={11} />
                      <span>{t.source}</span>
                    </span>
                  </div>

                  <p className="text-sm text-white/90 leading-relaxed italic mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.07]">
                  <div className="font-heading font-bold text-sm text-white group-hover:text-accent transition-colors">
                    {t.client}
                  </div>
                  <div className="text-xs font-mono text-brand-secondary mt-0.5">
                    {t.role} • <span className="text-brand-muted">{t.company}</span>
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
