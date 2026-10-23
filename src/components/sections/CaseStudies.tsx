import React from 'react';
import { motion } from 'framer-motion';
import { CASE_STUDIES, CaseStudy } from '../../data/portfolioData';
import { ArrowUpRight, CheckCircle2, GitBranch } from 'lucide-react';

interface CaseStudiesProps {
  onSelectCaseStudy: (study: CaseStudy) => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onSelectCaseStudy }) => {
  return (
    <section id="work" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-16 text-left">
          <span className="text-xs font-mono tracking-widest text-accent uppercase block mb-2">
            PORTFOLIO & CASE STUDIES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight">
            SELECTED SYSTEMS
          </h2>
          <p className="mt-2 text-base text-brand-secondary font-normal">
            Real-world implementations that connect websites to business operations and deliver documented outcomes.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CASE_STUDIES.map((study, index) => (
            <motion.article
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="p-6 sm:p-7 rounded-2xl bg-surface-1 border border-brand-border hover:border-accent/40 transition-all hover:bg-surface-2/80 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Glow Accent */}
              <div className="absolute -right-16 -top-16 w-32 h-32 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/15 transition-all pointer-events-none" />

              <div>
                {/* Header: Category & Project Type Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold truncate">
                    {study.category}
                  </span>
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                      study.projectType === 'Client Project'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-surface-3 text-brand-secondary border border-brand-border'
                    }`}
                  >
                    {study.projectType}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-heading font-bold text-white group-hover:text-accent transition-colors leading-snug mb-4">
                  {study.title}
                </h3>

                {/* Architecture Snippet */}
                <div className="mb-4 p-2.5 rounded-lg bg-surface-2/60 border border-brand-border/40 flex items-center gap-2 text-[11px] font-mono text-brand-secondary">
                  <GitBranch size={13} className="text-accent shrink-0" />
                  <span className="truncate text-white/90">{study.architecture}</span>
                </div>

                {/* Problem & System Snippet */}
                <div className="space-y-3 mb-6">
                  <div>
                    <span className="text-[10px] font-mono tracking-wider text-rose-400 font-semibold block mb-0.5">
                      THE PROBLEM
                    </span>
                    <p className="text-xs text-brand-secondary line-clamp-2">
                      {study.problem}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-wider text-accent font-semibold block mb-0.5">
                      THE SYSTEM
                    </span>
                    <p className="text-xs text-brand-secondary line-clamp-2">
                      {study.system}
                    </p>
                  </div>
                </div>

                {/* Documented Outcome Badge */}
                <div className="p-3 rounded-xl bg-accent/10 border border-accent/20 mb-6 flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-accent shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-white leading-relaxed">
                    {study.outcome}
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {study.tags.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-3 text-brand-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => onSelectCaseStudy(study)}
                  className="text-xs font-mono font-bold text-accent hover:text-white flex items-center gap-1 group/btn shrink-0"
                >
                  <span>EXPAND</span>
                  <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>

            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
};
