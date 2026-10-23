import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../../data/portfolioData';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-surface-1/30 border-y border-brand-border/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-14 text-left">
          <span className="text-xs font-mono tracking-widest text-accent uppercase block mb-2">
            CLIENT & PARTNER FEEDBACK
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight">
            VERIFIED REPUTATION
          </h2>
          <p className="mt-2 text-base text-brand-secondary font-normal">
            Feedback from international business owners and agency partners across Upwork and Fiverr.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={t.client + t.company}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 sm:p-7 rounded-2xl bg-surface-1 border border-brand-border hover:border-accent/40 transition-all hover:bg-surface-2/70 flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                {/* Top Row: Stars & Verified Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1 text-accent">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-2 border border-brand-border text-emerald-400">
                    <ShieldCheck size={11} />
                    <span>{t.source}</span>
                  </span>
                </div>

                {/* Quote */}
                <p className="text-sm text-white/90 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Details */}
              <div className="pt-4 border-t border-brand-border/40">
                <div className="font-heading font-bold text-sm text-white group-hover:text-accent transition-colors">
                  {t.client}
                </div>
                <div className="text-xs font-mono text-brand-secondary mt-0.5">
                  {t.role} • <span className="text-brand-muted">{t.company}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
