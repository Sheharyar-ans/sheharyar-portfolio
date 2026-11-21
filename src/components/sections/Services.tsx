import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PRIMARY_SERVICES,
  SAAS_CAPABILITY,
  WHITE_LABEL_PARTNERSHIP,
} from '../../data/portfolioData';
import { SpotlightCard } from '../visuals/SpotlightCard';
import { GlowBorderCard } from '../ui/glow-border-card';
import { InteractiveHoverButton } from '../ui/interactive-hover-button';
import { ShieldCheck, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface ServicesProps {
  onOpenInquiry?: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenInquiry }) => {
  const pillars = [
    ...PRIMARY_SERVICES.map((s) => ({
      num: s.num,
      title: s.title,
      desc: s.desc,
      tags: s.tags.slice(0, 3),
      stackLabel: s.secondaryTitle,
    })),
    {
      num: '06',
      title: SAAS_CAPABILITY.title,
      desc: SAAS_CAPABILITY.desc,
      tags: SAAS_CAPABILITY.technologies.slice(0, 3),
      stackLabel: SAAS_CAPABILITY.subtitle,
    },
  ];

  return (
    <section id="services" className="py-14 md:py-20 bg-[#080808] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Compact Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-6 text-left"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] text-accent uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              CORE CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight leading-tight">
              WHAT I BUILD
            </h2>
            <p className="mt-2 text-sm sm:text-base text-brand-secondary font-normal max-w-2xl">
              Connected digital systems where WordPress provides the foundation, AI provides
              intelligence, and automation handles execution.
            </p>
          </div>
          <Link
            to="/services/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider bg-white/[0.03] border border-white/[0.12] text-accent hover:border-accent hover:bg-accent hover:text-black transition-all shrink-0 self-start md:self-auto"
          >
            <span>ALL 11 SERVICES</span>
            <ArrowUpRight size={14} />
          </Link>
        </motion.div>

        {/* Compact 3-Column Bento Grid (6 Pillars) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map((pillar, index) => (
            <motion.article
              key={pillar.num}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="group h-full"
            >
              <GlowBorderCard colorPreset="brand" borderRadius="1rem" className="h-full w-full">
                <div className="p-5 flex flex-col justify-between h-full bg-[#0e0e10] space-y-3 text-left">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="font-mono text-xs font-bold text-accent tracking-widest">
                        {pillar.num} // SYSTEM
                      </span>
                      <span className="text-[9px] font-mono text-brand-muted uppercase truncate max-w-[160px]">
                        {pillar.stackLabel}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-heading font-bold text-white group-hover:text-accent transition-colors leading-snug mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-secondary leading-relaxed line-clamp-3">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                    {pillar.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white/[0.04] border border-white/[0.08] text-brand-secondary group-hover:text-white/90"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </GlowBorderCard>
            </motion.article>
          ))}
        </div>

        {/* Compact Single-Row White-Label Agency Bar */}
        <SpotlightCard className="mt-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#121215] to-[#0a0a0c] border border-white/[0.1]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5 text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-accent uppercase">
                <ShieldCheck size={13} />
                <span>WHITE-LABEL B2B PARTNERSHIP</span>
              </div>
              <h3 className="text-lg sm:text-xl font-heading font-bold text-white">
                {WHITE_LABEL_PARTNERSHIP.headline}
              </h3>
              <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
                {WHITE_LABEL_PARTNERSHIP.bullets.slice(0, 4).map((b) => (
                  <span key={b} className="inline-flex items-center gap-1.5 text-[11px] font-mono text-brand-secondary">
                    <CheckCircle2 size={12} className="text-accent shrink-0" />
                    <span>{b}</span>
                  </span>
                ))}
              </div>
            </div>
            {onOpenInquiry && (
              <InteractiveHoverButton type="button" onClick={onOpenInquiry} className="shrink-0 self-start lg:self-center">
                {WHITE_LABEL_PARTNERSHIP.cta}
              </InteractiveHoverButton>
            )}
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
};
