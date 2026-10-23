import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Cpu, HelpCircle, Lightbulb, GitBranch, UserCheck, Tag } from 'lucide-react';
import { CaseStudy } from '../../data/portfolioData';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ caseStudy, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (caseStudy) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [caseStudy, onClose]);

  return (
    <AnimatePresence>
      {caseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto overscroll-contain">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-surface-1 border border-brand-border rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl z-10 my-auto overflow-hidden flex flex-col max-h-[92dvh] sm:max-h-[88vh] overscroll-contain"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 sm:top-5 right-4 sm:right-5 w-8 h-8 rounded-full bg-surface-2 text-brand-secondary hover:text-white hover:bg-surface-3 flex items-center justify-center transition-colors shrink-0 z-10"
              aria-label="Close Case Study Details"
            >
              <X size={18} />
            </button>

            {/* Header Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-2 pr-8">
              <span className="text-[11px] font-mono tracking-widest text-accent uppercase font-bold">
                {caseStudy.category}
              </span>
              <span className="text-brand-muted">•</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-surface-2 border border-brand-border text-white">
                <Tag size={11} className="text-accent" />
                <span>{caseStudy.projectType}</span>
              </span>
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-6 pr-8 leading-snug">
              {caseStudy.title}
            </h2>

            {/* Content Sections */}
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {/* Architecture Flow */}
              <div className="p-4 rounded-xl bg-surface-2/70 border border-brand-border/60">
                <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-accent mb-1.5 font-semibold">
                  <GitBranch size={15} />
                  <span>SYSTEM ARCHITECTURE FLOW</span>
                </div>
                <p className="text-xs sm:text-sm font-mono text-white/90">
                  {caseStudy.architecture}
                </p>
              </div>

              {/* The Problem */}
              <div className="p-4 rounded-xl bg-surface-2/60 border border-brand-border/60">
                <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-rose-400 mb-1.5 font-semibold">
                  <HelpCircle size={15} />
                  <span>THE PROBLEM</span>
                </div>
                <p className="text-sm text-brand-secondary leading-relaxed">
                  {caseStudy.problem}
                </p>
              </div>

              {/* The System */}
              <div className="p-4 rounded-xl bg-surface-2/60 border border-brand-border/60">
                <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-accent mb-1.5 font-semibold">
                  <Lightbulb size={15} />
                  <span>THE SYSTEM BUILT</span>
                </div>
                <p className="text-sm text-brand-secondary leading-relaxed">
                  {caseStudy.system}
                </p>
              </div>

              {/* Technology Used */}
              <div className="p-4 rounded-xl bg-surface-2/60 border border-brand-border/60">
                <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-sky-400 mb-1.5 font-semibold">
                  <Cpu size={15} />
                  <span>TECHNOLOGY STACK</span>
                </div>
                <p className="text-sm text-white font-mono font-medium">
                  {caseStudy.tech}
                </p>
              </div>

              {/* Role */}
              <div className="p-4 rounded-xl bg-surface-2/60 border border-brand-border/60">
                <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-amber-400 mb-1.5 font-semibold">
                  <UserCheck size={15} />
                  <span>ROLE & EXECUTION</span>
                </div>
                <p className="text-sm text-brand-secondary">
                  {caseStudy.role}
                </p>
              </div>

              {/* Documented Outcome Badge */}
              <div className="p-4 rounded-xl bg-accent/10 border border-accent/30 flex items-start gap-3">
                <CheckCircle2 size={20} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-mono tracking-wider text-accent font-bold mb-0.5">
                    DOCUMENTED PROJECT RESULT
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {caseStudy.outcome}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="mt-6 pt-4 border-t border-brand-border/50 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 rounded-full text-xs font-mono font-semibold bg-surface-2 text-white hover:bg-surface-3 transition-colors border border-brand-border"
              >
                CLOSE
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
