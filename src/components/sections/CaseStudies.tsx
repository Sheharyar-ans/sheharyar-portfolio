import React from 'react';
import { motion } from 'framer-motion';
import { CASE_STUDIES, CaseStudy } from '../../data/portfolioData';
import { ArrowUpRight, CheckCircle2, GitBranch } from 'lucide-react';
import { SpotlightCard } from '../visuals/SpotlightCard';

interface CaseStudiesProps {
  onSelectCaseStudy: (study: CaseStudy) => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onSelectCaseStudy }) => {
  return (
    <section id="work" className="py-24 md:py-32 bg-[#080808] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8 text-left"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] text-accent uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              PORTFOLIO &amp; CASE STUDIES
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight leading-[1.02]">
              SELECTED SYSTEMS
            </h2>
            <p className="mt-3 text-base text-brand-secondary font-normal max-w-2xl">
              Real-world implementations that connect websites to business operations and deliver
              documented outcomes.
            </p>
          </div>
          <span className="text-xs font-mono text-brand-muted uppercase tracking-widest shrink-0">
            0{CASE_STUDIES.length} DOCUMENTED BUILDS
          </span>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CASE_STUDIES.map((study, index) => (
            <motion.article
              key={study.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="h-full"
            >
              <SpotlightCard className="p-6 sm:p-7 rounded-3xl bg-[#0e0e10]/90 border border-white/[0.08] hover:border-accent/45 transition-all flex flex-col justify-between group h-full">
                <div>
                  {/* Header: Category & Project Type Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold truncate">
                      {study.category}
                    </span>
                    <span
                      className={`text-[9px] font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                        study.projectType === 'Client Project'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-white/[0.05] text-brand-secondary border border-white/[0.1]'
                      }`}
                    >
                      {study.projectType}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-heading font-bold text-white group-hover:text-accent transition-colors leading-snug mb-4">
                    {study.title}
                  </h3>

                  {/* Architecture Snippet */}
                  <div className="mb-5 p-3 rounded-xl bg-black/50 border border-white/[0.07] flex items-center gap-2 text-[11px] font-mono text-brand-secondary">
                    <GitBranch size={13} className="text-accent shrink-0" />
                    <span className="truncate text-white/90">{study.architecture}</span>
                  </div>

                  {/* Problem & System Snippet */}
                  <div className="space-y-3 mb-6">
                    <div>
                      <span className="text-[10px] font-mono tracking-wider text-rose-400 font-semibold block mb-0.5">
                        THE PROBLEM
                      </span>
                      <p className="text-xs text-brand-secondary line-clamp-2 leading-relaxed">
                        {study.problem}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-wider text-accent font-semibold block mb-0.5">
                        THE SYSTEM
                      </span>
                      <p className="text-xs text-brand-secondary line-clamp-2 leading-relaxed">
                        {study.system}
                      </p>
                    </div>
                  </div>

                  {/* Documented Outcome Badge */}
                  <div className="p-3.5 rounded-xl bg-accent/[0.08] border border-accent/20 mb-6 flex items-start gap-2.5">
                    <CheckCircle2 size={15} className="text-accent shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-white leading-relaxed">
                      {study.outcome}
                    </span>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-white/[0.07] flex items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {study.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.04] border border-white/[0.06] text-brand-secondary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectCaseStudy(study)}
                    className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] hover:border-accent hover:bg-accent hover:text-black text-xs font-mono font-bold text-accent flex items-center gap-1 group/btn shrink-0 transition-all"
                  >
                    <span>EXPAND</span>
                    <ArrowUpRight
                      size={13}
                      className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                    />
                  </button>
                </div>
              </SpotlightCard>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
