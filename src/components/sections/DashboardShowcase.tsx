import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  FileSpreadsheet, 
  Maximize2, 
  ArrowUpRight, 
  Sparkles, 
  TrendingUp, 
  Database,
  Layers
} from 'lucide-react';
import { DASHBOARD_PROJECTS, DashboardProject } from '../../data/dashboardPortfolioData';
import { DashboardModal } from '../modals/DashboardModal';

interface DashboardShowcaseProps {
  onOpenInquiry?: () => void;
  title?: string;
  subtitle?: string;
  filterCategory?: string;
}

const DashboardCard: React.FC<{
  project: DashboardProject;
  index: number;
  onOpenModal: (project: DashboardProject) => void;
}> = ({ project, index, onOpenModal }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group rounded-2xl bg-surface-1 border border-brand-border/70 hover:border-accent/50 transition-all duration-300 shadow-lg hover:shadow-accent/5 flex flex-col overflow-hidden max-w-[380px] mx-auto w-full"
    >
      {/* Mockup Window Header */}
      <div className="px-3.5 py-2.5 bg-surface-2 border-b border-brand-border/60 flex items-center justify-between gap-2.5">
        {/* macOS style traffic dots */}
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>

        {/* Tool Indicator Pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-1/90 border border-brand-border/50 text-[10px] font-mono text-brand-secondary">
          {project.category === 'Advanced Excel' ? (
            <FileSpreadsheet size={10} className="text-emerald-400 shrink-0" />
          ) : (
            <BarChart3 size={10} className="text-accent shrink-0" />
          )}
          <span className="text-white/80 font-medium truncate max-w-[140px]">{project.tool}</span>
        </div>

        {/* Live BI Status */}
        <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-semibold shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px]">VERIFIED</span>
        </div>
      </div>

      {/* 16:9 Widescreen Fixed Dashboard Viewport Box (No Scroll, Crisp Aspect Ratio) */}
      <div
        onClick={() => onOpenModal(project)}
        className="relative w-full aspect-[16/9.5] overflow-hidden bg-[#0a0a0a] cursor-pointer select-none group/img"
        title="Click to inspect dashboard architecture, KPIs & data models"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpenModal(project);
          }
        }}
        aria-label={`Open preview for ${project.title}`}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 block"
          loading="lazy"
        />

        {/* Subtle Hover Overlay with Inspect CTA */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 backdrop-blur-[2px]">
          <span className="px-3.5 py-1.5 rounded-full bg-accent text-black font-mono text-xs font-bold shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Maximize2 size={12} />
            <span>Inspect Dashboard & KPIs</span>
          </span>
        </div>

        {/* Primary KPI Badge on Bottom-Left */}
        <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white font-bold pointer-events-none flex items-center gap-1.5 shadow-md">
          <TrendingUp size={11} className="text-accent" />
          <span>{project.metrics.kpi}</span>
        </div>
      </div>

      {/* Card Info & Details */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-3">
        <div>
          {/* Badge & Category */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[9px] font-mono tracking-widest text-accent uppercase font-bold truncate">
              {project.badge}
            </span>
            <span className="text-[10px] font-mono text-brand-muted shrink-0 truncate max-w-[140px]">
              {project.client}
            </span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onOpenModal(project)}
            className="text-sm sm:text-base font-heading font-bold text-white group-hover:text-accent transition-colors leading-snug cursor-pointer mb-1.5"
          >
            {project.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-brand-secondary line-clamp-2 leading-relaxed mb-3">
            {project.shortDesc}
          </p>

          {/* Tool Tags */}
          <div className="flex flex-wrap gap-1">
            {project.tools.slice(0, 4).map((tool) => (
              <span
                key={tool}
                className="text-[9px] font-mono px-2 py-0.5 rounded bg-surface-2 text-brand-secondary border border-brand-border/60"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer Button */}
        <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono text-emerald-400 font-medium">
            {project.metrics.secondaryKpi}
          </span>
          <button
            type="button"
            onClick={() => onOpenModal(project)}
            className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-white hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0"
          >
            <span>Inspect Details</span>
            <ArrowUpRight size={13} className="text-accent" />
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export const DashboardShowcase: React.FC<DashboardShowcaseProps> = ({
  onOpenInquiry,
  title = 'DATA ANALYTICS & BI DASHBOARDS',
  subtitle = 'Production Power BI, Advanced Excel models, and enterprise telemetry systems built for executive decision intelligence.',
  filterCategory,
}) => {
  const [selectedProject, setSelectedProject] = useState<DashboardProject | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const filterOptions = [
    { key: 'ALL', label: 'ALL DASHBOARDS' },
    { key: 'POWER BI', label: 'POWER BI' },
    { key: 'EXCEL', label: 'EXCEL & FINANCIAL' },
    { key: 'TELEMETRY', label: 'TELEMETRY & SEO' }
  ];

  const filteredProjects = DASHBOARD_PROJECTS.filter((proj) => {
    if (filterCategory) {
      if (filterCategory === 'data-science-analytics') return true;
      if (filterCategory === 'power-bi') return proj.category === 'Power BI';
      if (filterCategory === 'excel') return proj.category === 'Advanced Excel';
    }
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'POWER BI') return proj.category === 'Power BI';
    if (activeFilter === 'EXCEL') return proj.category === 'Advanced Excel';
    if (activeFilter === 'TELEMETRY') return proj.category === 'Data Analytics & SEO';
    return true;
  });

  return (
    <section id="dashboard-showcase" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-3">
              <Database size={13} />
              <span>BUSINESS INTELLIGENCE & ANALYTICS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight">
              {title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-brand-secondary font-normal leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Interactive Filters */}
          {!filterCategory && (
            <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-surface-1 border border-brand-border/60 self-start md:self-auto">
              {filterOptions.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setActiveFilter(f.key)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                    activeFilter === f.key
                      ? 'bg-accent text-black shadow-sm'
                      : 'text-brand-secondary hover:text-white hover:bg-surface-2'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Responsive Grid of Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 max-w-6xl mx-auto">
          {filteredProjects.map((project, idx) => (
            <DashboardCard
              key={project.id}
              project={project}
              index={idx}
              onOpenModal={(p) => setSelectedProject(p)}
            />
          ))}
        </div>

        {/* Bottom Assurance Note */}
        <div className="mt-12 p-6 rounded-2xl bg-surface-1/60 border border-brand-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0">
              <Sparkles size={20} className="text-accent" />
            </div>
            <div>
              <h4 className="text-sm font-heading font-bold text-white">
                Automated ETL Pipelines, Clean Data Modeling & DAX Measures
              </h4>
              <p className="text-xs text-brand-secondary">
                From raw CSV/SQL databases to executive dashboards in Power BI and Excel with automated scheduled refreshes.
              </p>
            </div>
          </div>
          {onOpenInquiry && (
            <button
              type="button"
              onClick={onOpenInquiry}
              className="px-5 py-2.5 rounded-xl bg-surface-2 hover:bg-accent hover:text-black text-white font-mono text-xs font-bold border border-brand-border/70 hover:border-accent transition-all shrink-0"
            >
              Discuss Your Analytics Project →
            </button>
          )}
        </div>
      </div>

      {/* Lightbox Modal for Full View */}
      <DashboardModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenInquiry={onOpenInquiry}
        onSelectProject={(p) => setSelectedProject(p)}
      />
    </section>
  );
};
