import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Filter, Layers, Cpu, Mic, Bot, Workflow, Sparkles } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { AeoDirectAnswer } from '../components/seo/AeoDirectAnswer';
import { CASE_STUDIES, CaseStudy } from '../data/portfolioData';

interface CaseStudiesPageProps {
  onSelectCaseStudy: (study: CaseStudy) => void;
  onOpenInquiry: () => void;
}

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({
  onSelectCaseStudy,
  onOpenInquiry,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const filterOptions = [
    'ALL',
    'AI VOICE',
    'RAG & CHATBOTS',
    'N8N & AUTOMATION',
    'WORDPRESS & COMMERCE'
  ];

  const filteredStudies = CASE_STUDIES.filter((study) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'AI VOICE') return study.category.includes('VOICE') || study.category.includes('VAPI');
    if (activeFilter === 'RAG & CHATBOTS') return study.category.includes('RAG') || study.category.includes('PINECONE') || study.category.includes('AGENT');
    if (activeFilter === 'N8N & AUTOMATION') return study.category.includes('N8N') || study.category.includes('AUTOMATION') || study.category.includes('MAKE');
    if (activeFilter === 'WORDPRESS & COMMERCE') return study.category.includes('WORDPRESS') || study.category.includes('WOOCOMMERCE');
    return true;
  });

  const caseStudiesSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://sheharyarsiraj.com/case-studies/#page',
    url: 'https://sheharyarsiraj.com/case-studies/',
    name: 'Verified Systems Architecture Case Studies | Sheharyar Siraj',
    description: 'Real-world production case studies across WordPress VIP architectures, sub-600ms AI voice agents, and n8n automations.',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: CASE_STUDIES.map((cs, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        item: {
          '@type': 'CreativeWork',
          name: cs.title,
          description: cs.problem,
          abstract: cs.outcome
        }
      }))
    }
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <SEOHead
        title="AI & WordPress Systems Case Studies | Sheharyar Siraj"
        description="Detailed B2B case studies: enterprise WordPress & WooCommerce migrations, sub-600ms AI voice qualification, and n8n CRM pipelines by Sheharyar Siraj."
        canonicalUrl="https://sheharyarsiraj.com/case-studies/"
        schema={caseStudiesSchema}
      />

      <Breadcrumbs items={[{ label: 'CASE STUDIES' }]} />

      {/* Header */}
      <div className="mt-8 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles size={14} />
          <span>PRODUCTION VERIFICATION HUB</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
          Architectural <span className="text-accent">Case Studies</span>
        </h1>
        <p className="text-brand-secondary text-base sm:text-xl max-w-3xl leading-relaxed font-body">
          Documented benchmarks, architectural blueprints, and measurable operational outcomes from 1,200+ projects delivered worldwide.
        </p>
      </div>

      {/* AEO Direct Answer */}
      <AeoDirectAnswer
        summary="Case studies by Sheharyar Siraj document verified engineering implementations: replacing legacy page-builders with sub-500ms custom PHP 8.2 architectures, deploying sub-600ms Vapi voice agents achieving 80%+ tier-1 resolution, and building n8n automation pipelines saving 15-30 operational hours weekly."
        keyTakeaways={[
          'Average 70% reduction in website Time-To-First-Byte (TTFB) and green Core Web Vitals.',
          'Sub-600ms voice conversational latency integrated with live calendar booking.',
          'Over $15,000/year saved in per-task automation fees via self-hosted n8n.',
          '100% Job Success Score and verified ratings across Upwork and Fiverr.'
        ]}
        badge="AEO VERDICT: PRODUCTION BENCHMARKS & CASE STUDIES"
      />

      {/* Interactive Filters */}
      {/* Production Telemetry Dashboard Visual (0 CLS / Responsive 16:9) */}
      <div className="my-10 w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden border border-brand-border/80 shadow-2xl relative bg-surface-1 group">
        <img
          src="/assets/images/production-telemetry-metrics-dashboard.webp"
          alt="Real-time production telemetry dashboard tracking voice agent call volume, turn-taking latency, and CRM sync success rates"
          width="1200"
          height="675"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-surface-1/90 border border-accent/40 text-accent font-mono text-[11px] font-bold uppercase tracking-wider backdrop-blur-md">
            LIVE PRODUCTION TELEMETRY • SUB-600MS VERIFIED BENCHMARKS
          </span>
        </div>
      </div>

      <div className="my-10 flex flex-wrap items-center gap-2 border-b border-brand-border/40 pb-6">
        <div className="flex items-center gap-1.5 text-xs font-mono text-brand-muted uppercase tracking-wider mr-2">
          <Filter size={13} />
          <span>FILTER BY ARCHITECTURE:</span>
        </div>
        {filterOptions.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            type="button"
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider transition-all ${
              activeFilter === filter
                ? 'bg-accent text-black shadow-[0_0_15px_rgba(183,255,60,0.3)]'
                : 'bg-surface-2 text-brand-secondary hover:text-white hover:bg-surface-3 border border-brand-border/40'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
        {filteredStudies.map((study) => (
          <div
            key={study.id}
            className="glass-panel rounded-2xl p-6 sm:p-8 border border-brand-border/60 hover:border-accent/40 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Category & Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold">
                  {study.category}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-brand-secondary border border-brand-border/40">
                  {study.projectType}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-accent transition-colors">
                {study.title}
              </h2>

              {/* Problem */}
              <div className="mb-4">
                <span className="text-[11px] font-mono text-red-400 uppercase tracking-wider font-bold block mb-1">
                  CHALLENGE & BOTTLENECK:
                </span>
                <p className="text-xs sm:text-sm text-brand-secondary font-body leading-relaxed">
                  {study.problem}
                </p>
              </div>

              {/* Architecture Blueprint */}
              <div className="mb-4 p-4 rounded-xl bg-surface-2 border border-brand-border/40">
                <span className="text-[11px] font-mono text-accent uppercase tracking-wider font-bold block mb-1">
                  ENGINEERED BLUEPRINT:
                </span>
                <p className="text-xs text-white font-mono leading-relaxed">
                  {study.system}
                </p>
              </div>

              {/* Outcome */}
              <div className="mb-6">
                <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-bold block mb-1">
                  MEASURABLE OUTCOME:
                </span>
                <p className="text-xs sm:text-sm text-white font-body font-semibold leading-relaxed">
                  {study.outcome}
                </p>
              </div>
            </div>

            <div>
              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-brand-border/30">
                {study.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-3 text-brand-secondary border border-brand-border/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Inspect modal button */}
              <button
                type="button"
                onClick={() => onSelectCaseStudy(study)}
                className="w-full py-3 px-4 rounded-xl font-mono text-xs font-bold tracking-wider bg-surface-2 hover:bg-accent hover:text-black text-white flex items-center justify-between transition-all border border-brand-border group-hover:border-accent/40"
              >
                <span>VIEW ARCHITECTURAL SPECIFICATION</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="mt-16 rounded-3xl glass-panel p-8 sm:p-12 border border-accent/30 text-center bg-gradient-to-b from-surface-1 to-surface-2">
        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-3">
          Have a Complex Technical Challenge?
        </h2>
        <p className="text-xs sm:text-sm text-brand-secondary max-w-xl mx-auto mb-8 font-body">
          We engineer bespoke solutions for high-stakes business requirements. Reach out to discuss your specific infrastructure needs.
        </p>
        <button
          onClick={onOpenInquiry}
          type="button"
          className="px-8 py-3.5 rounded-full bg-accent text-black font-mono text-xs font-bold tracking-wider hover:bg-white transition-all shadow-[0_0_25px_rgba(183,255,60,0.3)] inline-flex items-center gap-2"
        >
          <span>SUBMIT PROJECT BRIEF</span>
          <ArrowUpRight size={15} />
        </button>
      </div>
    </div>
  );
};
