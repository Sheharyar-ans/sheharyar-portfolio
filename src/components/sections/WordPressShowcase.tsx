import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Maximize2, 
  ArrowUpRight, 
  Layers, 
  Zap, 
  Sparkles, 
  MousePointer, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { WORDPRESS_PROJECTS, WordPressProject } from '../../data/wordpressPortfolioData';
import { WordPressProjectModal } from '../modals/WordPressProjectModal';

interface WordPressShowcaseProps {
  onOpenInquiry?: () => void;
  title?: string;
  subtitle?: string;
  filterCategory?: string;
}

const ProjectBrowserCard: React.FC<{
  project: WordPressProject;
  index: number;
  onOpenModal: (project: WordPressProject) => void;
}> = ({ project, index, onOpenModal }) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [scrollDistance, setScrollDistance] = useState<number>(0);
  const [scrollDuration, setScrollDuration] = useState<number>(6500);

  const calculateScroll = () => {
    if (imageRef.current && containerRef.current) {
      const imgHeight = imageRef.current.scrollHeight;
      const boxHeight = containerRef.current.clientHeight;
      const distance = Math.max(0, imgHeight - boxHeight);
      setScrollDistance(distance);
      // Dynamic duration: ~2.2ms per pixel to maintain comfortable visual scanning speed
      const duration = Math.max(5000, Math.min(9500, Math.round(distance * 2.2)));
      setScrollDuration(duration);
    }
  };

  useEffect(() => {
    calculateScroll();
    window.addEventListener('resize', calculateScroll);
    return () => window.removeEventListener('resize', calculateScroll);
  }, []);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group rounded-2xl bg-surface-1 border border-brand-border/70 hover:border-accent/50 transition-all duration-300 shadow-lg hover:shadow-accent/5 flex flex-col overflow-hidden max-w-[360px] mx-auto w-full"
    >
      {/* Mockup Browser Window Header */}
      <div className="px-3.5 py-2.5 bg-surface-2 border-b border-brand-border/60 flex items-center justify-between gap-2.5">
        {/* macOS style traffic dots */}
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>

        {/* Browser URL Pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-1/90 border border-brand-border/50 text-[10px] font-mono text-brand-secondary truncate max-w-[180px] sm:max-w-[220px]">
          <Globe size={10} className="text-accent shrink-0" />
          <span className="truncate text-white/80">{project.domain}</span>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-semibold shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px]">LIVE</span>
        </div>
      </div>

      {/* Auto-Scroll on Hover Viewport Box - Compact & Sharp */}
      <div
        ref={containerRef}
        onMouseEnter={() => {
          calculateScroll();
          setIsHovered(true);
        }}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onOpenModal(project)}
        className="relative w-full h-[260px] sm:h-[280px] overflow-hidden bg-[#0a0a0a] cursor-pointer select-none"
        title="Hover karein poori website scroll dekhne ke liye, ya click karein full view ke liye"
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
        {/* The Long Screenshot Image */}
        <img
          ref={imageRef}
          src={project.image}
          alt={project.title}
          onLoad={calculateScroll}
          className="w-full h-auto block select-none transform-gpu will-change-transform"
          style={{
            transform: isHovered ? `translateY(-${scrollDistance}px)` : 'translateY(0px)',
            transition: isHovered
              ? `transform ${scrollDuration}ms cubic-bezier(0.25, 1, 0.5, 1)`
              : 'transform 800ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          loading="lazy"
        />

        {/* Floating Hover Instruction Badge */}
        <div 
          className={`absolute bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full text-[10px] font-mono font-medium backdrop-blur-md border transition-all duration-300 pointer-events-none flex items-center gap-1.5 whitespace-nowrap shadow-lg ${
            isHovered
              ? 'bg-accent/95 text-black border-accent font-bold'
              : 'bg-black/75 text-white/90 border-white/20'
          }`}
        >
          {isHovered ? (
            <>
              <Sparkles size={11} className="animate-spin text-black" />
              <span>Auto-Scrolling • Click for full</span>
            </>
          ) : (
            <>
              <MousePointer size={11} className="text-accent animate-bounce" />
              <span>Hover karke scroll dekhein</span>
            </>
          )}
        </div>

        {/* Quick Expand Button on Top-Right */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal(project);
          }}
          className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/75 hover:bg-accent hover:text-black text-white border border-white/15 backdrop-blur-md transition-all shadow-md group/btn"
          title="Full layout preview open karein"
          aria-label="Full screen preview"
        >
          <Maximize2 size={13} className="group-hover/btn:scale-110 transition-transform" />
        </button>
      </div>

      {/* Card Info & Details - Compact & Clean */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-3">
        <div>
          {/* Category & Badge */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[9px] font-mono tracking-widest text-accent uppercase font-bold truncate">
              {project.badge}
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-semibold shrink-0 flex items-center gap-1">
              <Zap size={10} />
              <span>{project.metrics.speedScore}</span>
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

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-mono px-2 py-0.5 rounded bg-surface-2 text-brand-secondary border border-brand-border/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer Button */}
        <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono text-brand-muted truncate max-w-[150px]">
            {project.client}
          </span>
          <button
            type="button"
            onClick={() => onOpenModal(project)}
            className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-white hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0"
          >
            <span>Full Layout</span>
            <ArrowUpRight size={13} className="text-accent" />
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export const WordPressShowcase: React.FC<WordPressShowcaseProps> = ({
  onOpenInquiry,
  title = 'WORDPRESS CLIENT WEBSITES',
  subtitle = 'Interactive live layouts: Box pe hover karke poora web page scroll hote dekhein ya click karke full view kholein.',
  filterCategory,
}) => {
  const [selectedProject, setSelectedProject] = useState<WordPressProject | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const filterOptions = [
    { key: 'ALL', label: 'ALL SHOWCASE' },
    { key: 'AGENCY', label: 'AGENCY & CREATIVE' },
    { key: 'COMMERCE', label: 'WOOCOMMERCE & CATALOG' },
    { key: 'PORTAL', label: 'PORTALS & LEAD-GEN' }
  ];

  const filteredProjects = WORDPRESS_PROJECTS.filter((proj) => {
    if (filterCategory) {
      if (filterCategory === 'custom-wordpress-development') return true;
      if (filterCategory === 'woocommerce-systems-architecture') {
        return proj.category.toLowerCase().includes('commerce') || proj.category.toLowerCase().includes('catalog');
      }
    }
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'AGENCY') {
      return proj.category.toLowerCase().includes('agency') || proj.category.toLowerCase().includes('creative');
    }
    if (activeFilter === 'COMMERCE') {
      return proj.category.toLowerCase().includes('commerce') || proj.category.toLowerCase().includes('catalog');
    }
    if (activeFilter === 'PORTAL') {
      return proj.category.toLowerCase().includes('portal') || proj.category.toLowerCase().includes('recruitment') || proj.category.toLowerCase().includes('lead');
    }
    return true;
  });

  return (
    <section id="wordpress-showcase" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-3">
              <Layers size={13} />
              <span>LIVE WORDPRESS PORTFOLIO</span>
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

        {/* Responsive Grid of Interactive Mockup Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 max-w-6xl mx-auto">
          {filteredProjects.map((project, idx) => (
            <ProjectBrowserCard
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
                Bespoke Code & Sub-Second Speeds (Zero Bloated Themes)
              </h4>
              <p className="text-xs text-brand-secondary">
                Har website custom PHP 8.2 standards, custom blocks, responsive CSS aur Core Web Vitals (95+ score) ke sath bani hui hai.
              </p>
            </div>
          </div>
          {onOpenInquiry && (
            <button
              type="button"
              onClick={onOpenInquiry}
              className="px-5 py-2.5 rounded-xl bg-surface-2 hover:bg-accent hover:text-black text-white font-mono text-xs font-bold border border-brand-border/70 hover:border-accent transition-all shrink-0"
            >
              Apna WordPress Project Discuss Karein →
            </button>
          )}
        </div>
      </div>

      {/* Lightbox / Modal for Full View */}
      <WordPressProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenInquiry={onOpenInquiry}
        onSelectProject={(p) => setSelectedProject(p)}
      />
    </section>
  );
};
