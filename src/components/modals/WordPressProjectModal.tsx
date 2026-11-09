import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  Layers, 
  ArrowRight,
  Globe,
  Maximize2
} from 'lucide-react';
import { WordPressProject, WORDPRESS_PROJECTS } from '../../data/wordpressPortfolioData';

interface WordPressProjectModalProps {
  project: WordPressProject | null;
  onClose: () => void;
  onOpenInquiry?: () => void;
  onSelectProject: (proj: WordPressProject) => void;
}

export const WordPressProjectModal: React.FC<WordPressProjectModalProps> = ({
  project,
  onClose,
  onOpenInquiry,
  onSelectProject,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      // Reset scroll position to top when switching projects
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  // Handle escape & arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!project) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        navigatePrev();
      } else if (e.key === 'ArrowRight') {
        navigateNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project]);

  if (!project) return null;

  const currentIndex = WORDPRESS_PROJECTS.findIndex((p) => p.id === project.id);
  const totalProjects = WORDPRESS_PROJECTS.length;

  const navigatePrev = () => {
    const prevIdx = (currentIndex - 1 + totalProjects) % totalProjects;
    onSelectProject(WORDPRESS_PROJECTS[prevIdx]);
  };

  const navigateNext = () => {
    const nextIdx = (currentIndex + 1) % totalProjects;
    onSelectProject(WORDPRESS_PROJECTS[nextIdx]);
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-6xl max-h-[92vh] bg-surface-1 border border-brand-border/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header / Browser Title Bar */}
          <div className="px-5 py-4 bg-surface-2/95 border-b border-brand-border/70 flex items-center justify-between gap-4 shrink-0">
            {/* Left: Window Dots & Navigation Controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>

              {/* Prev / Next controls */}
              <div className="flex items-center gap-1 ml-2 pl-3 border-l border-brand-border/50">
                <button
                  type="button"
                  onClick={navigatePrev}
                  className="p-1.5 rounded-lg bg-surface-3/80 hover:bg-surface-3 text-brand-secondary hover:text-white transition-colors"
                  title="Previous project (Left arrow)"
                  aria-label="Previous project"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-[11px] font-mono text-brand-muted px-1.5">
                  {currentIndex + 1} / {totalProjects}
                </span>
                <button
                  type="button"
                  onClick={navigateNext}
                  className="p-1.5 rounded-lg bg-surface-3/80 hover:bg-surface-3 text-brand-secondary hover:text-white transition-colors"
                  title="Next project (Right arrow)"
                  aria-label="Next project"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Center: Live Domain URL Bar */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-1/90 border border-brand-border/50 text-xs font-mono text-brand-secondary max-w-sm truncate">
              <Globe size={13} className="text-accent shrink-0" />
              <span className="truncate text-white/90">https://{project.domain}</span>
              <span className="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            </div>

            {/* Right: Close Button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-surface-3/80 hover:bg-surface-3 text-brand-secondary hover:text-white transition-colors"
                title="Close (Esc)"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Modal Body: 2-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden min-h-0">
            {/* Left: Scrollable Full Page Screenshot Preview (7 Cols) */}
            <div className="lg:col-span-7 bg-[#050505] relative border-b lg:border-b-0 lg:border-r border-brand-border/70 overflow-hidden flex flex-col">
              {/* Floating Instruction Banner */}
              <div className="px-4 py-2 bg-surface-2/90 border-b border-brand-border/40 flex items-center justify-between text-[11px] font-mono text-brand-secondary shrink-0">
                <span className="flex items-center gap-1.5 text-accent font-semibold">
                  <Maximize2 size={12} />
                  <span>FULL PAGE WEBSITE PREVIEW</span>
                </span>
                <span className="text-brand-muted">Scroll down to inspect full layout ↓</span>
              </div>

              {/* Scrollable Container */}
              <div 
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto custom-scrollbar p-2 sm:p-5 bg-dot-pattern"
                tabIndex={0}
              >
                <div className="max-w-[360px] sm:max-w-[400px] mx-auto rounded-2xl overflow-hidden border border-brand-border/70 shadow-2xl bg-surface-1">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto block select-none"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Right: Project Specifications & Breakdown (5 Cols) */}
            <div className="lg:col-span-5 overflow-y-auto custom-scrollbar p-6 sm:p-8 flex flex-col justify-between bg-surface-1/95 space-y-6">
              <div>
                {/* Category & Badge */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent font-bold uppercase">
                    {project.badge}
                  </span>
                  <span className="text-[11px] font-mono text-brand-muted uppercase">
                    {project.client}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white leading-snug mb-3">
                  {project.title}
                </h2>

                {/* Description (Roman Urdu / English) */}
                <p className="text-xs sm:text-sm text-brand-secondary leading-relaxed mb-5">
                  {project.fullDesc}
                </p>

                {/* Performance Metrics Cards */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3.5 rounded-xl bg-surface-2 border border-brand-border/60">
                    <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono font-bold mb-1">
                      <Zap size={14} />
                      <span>{project.metrics.speedScore}</span>
                    </div>
                    <div className="text-[10px] font-mono text-brand-muted uppercase">Mobile Google PageSpeed</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-surface-2 border border-brand-border/60">
                    <div className="flex items-center gap-1.5 text-accent text-xs font-mono font-bold mb-1">
                      <Sparkles size={14} />
                      <span>{project.metrics.loadTime}</span>
                    </div>
                    <div className="text-[10px] font-mono text-brand-muted uppercase">Server Response (TTFB)</div>
                  </div>
                </div>

                {/* Architecture Note */}
                <div className="mb-6 p-3 rounded-xl bg-surface-2/60 border border-brand-border/50 text-[11px] font-mono text-brand-secondary flex items-start gap-2">
                  <Layers size={14} className="text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-bold block mb-0.5">Stack Architecture:</span>
                    <span>{project.metrics.architecture}</span>
                  </div>
                </div>

                {/* Key Features List */}
                <div className="space-y-3 mb-6">
                  <h4 className="text-xs font-mono text-white uppercase tracking-wider font-bold">
                    DELIVERED KEY FEATURES:
                  </h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-brand-secondary">
                        <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables Tags */}
                <div>
                  <h4 className="text-[11px] font-mono text-brand-muted uppercase tracking-wider font-bold mb-2">
                    PROJECT DELIVERABLES:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.deliverables.map((deliv, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-surface-2 text-brand-secondary border border-brand-border/70"
                      >
                        {deliv}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA Action */}
              <div className="pt-6 border-t border-brand-border/70 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onOpenInquiry) onOpenInquiry();
                  }}
                  className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-accent text-black font-heading font-extrabold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Build a Similar WordPress System</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
