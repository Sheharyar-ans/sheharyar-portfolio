import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  BarChart3, 
  Sparkles, 
  ArrowRight,
  Maximize2,
  TrendingUp,
  FileSpreadsheet,
  ExternalLink,
  Cpu
} from 'lucide-react';
import { DashboardProject, DASHBOARD_PROJECTS } from '../../data/dashboardPortfolioData';

interface DashboardModalProps {
  project: DashboardProject | null;
  onClose: () => void;
  onOpenInquiry?: () => void;
  onSelectProject: (proj: DashboardProject) => void;
}

export const DashboardModal: React.FC<DashboardModalProps> = ({
  project,
  onClose,
  onOpenInquiry,
  onSelectProject,
}) => {
  // Lock body scroll
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
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

  const currentIndex = DASHBOARD_PROJECTS.findIndex((p) => p.id === project.id);
  const totalProjects = DASHBOARD_PROJECTS.length;

  const navigatePrev = () => {
    const prevIdx = (currentIndex - 1 + totalProjects) % totalProjects;
    onSelectProject(DASHBOARD_PROJECTS[prevIdx]);
  };

  const navigateNext = () => {
    const nextIdx = (currentIndex + 1) % totalProjects;
    onSelectProject(DASHBOARD_PROJECTS[nextIdx]);
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
                  title="Previous dashboard (Left arrow)"
                  aria-label="Previous dashboard"
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
                  title="Next dashboard (Right arrow)"
                  aria-label="Next dashboard"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Center: Tool Pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-1/90 border border-brand-border/50 text-xs font-mono text-brand-secondary">
              {project.category === 'Advanced Excel' ? (
                <FileSpreadsheet size={13} className="text-emerald-400 shrink-0" />
              ) : project.category === 'Python & Machine Learning' ? (
                <Cpu size={13} className="text-accent shrink-0" />
              ) : (
                <BarChart3 size={13} className="text-accent shrink-0" />
              )}
              <span className="text-white/90 font-semibold">{project.tool}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0 ml-1" />
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
            {/* Left: Full High-Res Dashboard Preview (7 Cols) */}
            <div className="lg:col-span-7 bg-[#050505] relative border-b lg:border-b-0 lg:border-r border-brand-border/70 overflow-y-auto custom-scrollbar flex flex-col justify-center p-3 sm:p-6">
              {/* Preview Window Box */}
              <div className="rounded-2xl overflow-hidden border border-brand-border/70 shadow-2xl bg-surface-1 relative group/img">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto block select-none"
                  loading="lazy"
                />
              </div>

              {/* Caption */}
              <div className="mt-3 text-center">
                <span className="text-[11px] font-mono text-brand-muted">
                  Interactive Widescreen View • High-Fidelity Data Architecture
                </span>
              </div>
            </div>

            {/* Right: Analytics Architecture Breakdown (5 Cols) */}
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

                {/* Description */}
                <p className="text-xs sm:text-sm text-brand-secondary leading-relaxed mb-5">
                  {project.fullDesc}
                </p>

                {/* Metrics Highlights */}
                <div className="grid grid-cols-3 gap-2.5 mb-6">
                  <div className="p-3 rounded-xl bg-surface-2 border border-brand-border/60 text-center">
                    <div className="text-xs font-mono font-bold text-accent mb-0.5 truncate">
                      {project.metrics.kpi}
                    </div>
                    <div className="text-[9px] font-mono text-brand-muted uppercase">Primary KPI</div>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-2 border border-brand-border/60 text-center">
                    <div className="text-xs font-mono font-bold text-emerald-400 mb-0.5 truncate">
                      {project.metrics.secondaryKpi}
                    </div>
                    <div className="text-[9px] font-mono text-brand-muted uppercase">Volume / Scope</div>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-2 border border-brand-border/60 text-center">
                    <div className="text-xs font-mono font-bold text-sky-400 mb-0.5 truncate">
                      {project.metrics.impact}
                    </div>
                    <div className="text-[9px] font-mono text-brand-muted uppercase">Business Impact</div>
                  </div>
                </div>

                {/* Included Charts & Visuals */}
                <div className="space-y-2.5 mb-6">
                  <h4 className="text-xs font-mono text-white uppercase tracking-wider font-bold flex items-center gap-1.5">
                    <TrendingUp size={13} className="text-accent" />
                    <span>CHARTS & VISUALIZATIONS INCLUDED:</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {project.chartsIncluded.map((chart, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-brand-secondary">
                        <CheckCircle2 size={13} className="text-accent shrink-0 mt-0.5" />
                        <span>{chart}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stack Implementation */}
                <div>
                  <h4 className="text-[11px] font-mono text-brand-muted uppercase tracking-wider font-bold mb-2">
                    TECHNOLOGIES & TOOLING:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-surface-2 text-brand-secondary border border-brand-border/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA Action */}
              <div className="pt-6 border-t border-brand-border/70 flex flex-col sm:flex-row items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto py-3 px-5 rounded-xl bg-accent text-black font-heading font-extrabold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>Launch Live App</span>
                    <ExternalLink size={14} />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onOpenInquiry) onOpenInquiry();
                  }}
                  className={`w-full ${project.liveUrl ? 'sm:flex-1' : 'sm:w-full'} py-3 px-5 rounded-xl bg-surface-2 hover:bg-accent hover:text-black text-white font-heading font-extrabold text-xs uppercase tracking-wider border border-brand-border/70 hover:border-accent transition-all shadow-lg flex items-center justify-center gap-2`}
                >
                  <span>Request Custom BI Dashboard</span>
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
