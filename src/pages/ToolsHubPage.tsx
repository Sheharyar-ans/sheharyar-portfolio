import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Wrench,
  Search,
  Mic,
  Database,
  Workflow,
  ShoppingCart,
  Bot,
  Layers,
  MapPin,
  Gauge,
  Terminal,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap,
  CheckCircle2,
  Code2,
  PhoneCall
} from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { AeoDirectAnswer } from '../components/seo/AeoDirectAnswer';
import { TOOLS_LIST, ToolItem } from '../data/toolsData';
import { generateSchemaGraph } from '../utils/schemaGenerator';

interface ToolsHubPageProps {
  onOpenInquiry: () => void;
}

export const ToolsHubPage: React.FC<ToolsHubPageProps> = ({ onOpenInquiry }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const hubSchema = generateSchemaGraph('/tools/');

  const categories = [
    'ALL',
    'Local SEO',
    'Database Optimization',
    'WordPress & PHP',
    'AI & Voice',
    'Workflow Automation',
    'E-Commerce'
  ];

  const filteredTools =
    selectedCategory === 'ALL'
      ? TOOLS_LIST
      : TOOLS_LIST.filter((tool) => tool.category === selectedCategory);

  const getToolIcon = (slug: string) => {
    switch (slug) {
      case 'local-schema-generator':
        return <Search className="text-accent" size={22} />;
      case 'wordpress-database-bloat-estimator':
        return <Database className="text-amber-400" size={22} />;
      case 'wordpress-cpt-code-exporter':
        return <Code2 className="text-sky-400" size={22} />;
      case 'wordpress-plugin-boilerplate-generator':
        return <Terminal className="text-emerald-400" size={22} />;
      case 'voice-agent-roi-calculator':
        return <PhoneCall className="text-purple-400" size={22} />;
      case 'ai-voice-prompt-designer':
        return <Mic className="text-accent" size={22} />;
      case 'webhook-payload-tester':
        return <Workflow className="text-cyan-400" size={22} />;
      case 'n8n-error-handler-generator':
        return <Zap className="text-amber-400" size={22} />;
      case 'llm-seo-meta-generator':
        return <Sparkles className="text-emerald-400" size={22} />;
      case 'woocommerce-seo-sku-auditor':
        return <ShoppingCart className="text-sky-400" size={22} />;
      default:
        return <Wrench className="text-accent" size={22} />;
    }
  };

  const toolFaqs = [
    {
      question: 'Are these tools safe to run against production WordPress and WooCommerce systems?',
      answer:
        'Yes. All architectural utilities are non-destructive analysis and generation tools. Schema generators and configuration compilers output clean, audited PHP code and JSON schemas that you inspect and test before committing to your staging or production environments.'
    },
    {
      question: 'How do these utility tools connect with AI voice workflows and n8n pipelines?',
      answer:
        'Each tool is engineered to produce strict, standardized interface specifications (such as Vapi assistant JSON manifests, HMAC webhook signature validators, and strict JSON Schema function definitions) that plug directly into self-hosted n8n workflows and telephony gateways without custom glue code.'
    },
    {
      question: 'Why build custom tools instead of using existing WordPress plugins or SaaS calculators?',
      answer:
        'Standard WordPress plugins add database weight, render-blocking scripts, and recurrent subscription costs. These interactive utility systems provide zero-overhead, mathematically verified configurations that give you 100% intellectual property ownership and uncompromising runtime speed.'
    },
    {
      question: 'Can Sheharyar Siraj custom-engineer proprietary internal tools for my agency or enterprise?',
      answer:
        'Yes. In addition to these 10 public utilities, we architect proprietary private developer dashboards, multi-agent evaluation suites, automated billing reconcilers, and client intake portals custom-tailored to your exact tech stack.'
    }
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <SEOHead
        title="Free WordPress & AI Systems Tools | Sheharyar Siraj"
        description="Production-grade interactive tools designed to accelerate development, optimize databases, structure local SEO schemas, and orchestrate AI voice workflows."
        canonicalUrl="https://sheharyarsiraj.com/tools/"
        schema={hubSchema}
      />

      <Breadcrumbs items={[{ label: 'SYSTEMS & UTILITY TOOLS' }]} />

      {/* Hero Header Section */}
      <header className="mt-8 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
          <ShieldCheck size={14} />
          <span>PRODUCTION-GRADE DEVELOPER UTILITY SUITE</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
          SYSTEMS & UTILITY TOOLS:{' '}
          <span className="text-accent">Built for WordPress, AI, & Automation</span>
        </h1>

        <p className="text-brand-secondary text-base sm:text-xl max-w-4xl leading-relaxed font-body">
          Production-grade interactive tools designed to accelerate development, optimize databases, structure local SEO schemas, and orchestrate AI voice workflows. Zero fluff, zero bloated dependencies, 100% client code ownership.
        </p>

        {/* Quick System Telemetry Bar */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl glass-panel border border-brand-border/60 bg-surface-1/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Zap size={18} />
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-white">10 Systems</div>
              <div className="text-[11px] font-mono text-brand-muted">Active Standalone Tools</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Sparkles size={18} />
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-white">Sub-600ms</div>
              <div className="text-[11px] font-mono text-brand-muted">Voice Latency Target</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Database size={18} />
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-white">14.2x Faster</div>
              <div className="text-[11px] font-mono text-brand-muted">Indexed Query Seeks</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-white">0KB Bloat</div>
              <div className="text-[11px] font-mono text-brand-muted">Zero Plugin Overhead</div>
            </div>
          </div>
        </div>
      </header>

      {/* AEO Direct Answer Block */}
      <AeoDirectAnswer
        summary="Sheharyar Siraj has engineered a suite of 10 production-grade systems and utility tools covering WordPress performance tuning, local SEO schema generation, sub-600ms AI voice flow modeling, n8n webhook testing, database index optimization, and agentic JSON Schema validation, providing software teams and digital agencies with verified zero-bloat developer utilities."
        keyTakeaways={[
          'Generates mathematically validated Schema.org JSON-LD graphs with zero WordPress database write queries.',
          'Visualizes sub-600ms latency budgets across Deepgram Nova-2, Llama 3.3, and Cartesia voice pipelines.',
          'Provides composite MySQL indexing scripts that accelerate high-traffic WooCommerce checkout lookups by 14x.',
          'Eliminates trial-and-error webhook debugging with production-ready exportable n8n workflow JSON.'
        ]}
      />

      {/* Filter Category Chips (Clean interactive tags, NO dropdowns!) */}
      {/* Developer Tools Suite Visual (0 CLS / Responsive 16:9) */}
      <div className="my-10 w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden border border-brand-border/80 shadow-2xl relative bg-surface-1 group">
        <img
          src="/assets/images/developer-tools-code-profiler.webp"
          alt="Automated developer tools suite profiling SQL queries, JSON-LD schemas, and real-time voice latency benchmarks"
          width="1200"
          height="675"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-surface-1/90 border border-accent/40 text-accent font-mono text-[11px] font-bold uppercase tracking-wider backdrop-blur-md">
            INTERACTIVE DEVELOPER UTILITIES • ZERO-LATENCY PROFILING
          </span>
        </div>
      </div>

      <section className="my-8" aria-label="Tool Category Filters">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="text-xs font-mono text-accent tracking-widest uppercase font-bold">
            CAPABILITY MATRIX (NO DROPDOWNS: ALL 10 TOOLS DISPLAYED ON GRID)
          </span>
          <span className="text-xs font-mono text-brand-muted">
            Displaying {filteredTools.length} of {TOOLS_LIST.length} Production Utilities
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all border ${
                  isActive
                    ? 'bg-accent text-black border-accent font-bold shadow-[0_0_15px_rgba(183,255,60,0.3)]'
                    : 'bg-surface-2 text-brand-secondary border-brand-border/60 hover:text-white hover:border-brand-borderHover'
                }`}
              >
                {cat}
                {cat === 'ALL' && ` (${TOOLS_LIST.length})`}
              </button>
            );
          })}
        </div>
      </section>

      {/* All 10 Standalone Production Tools Grid */}
      <main className="my-10" aria-label="Interactive Developer Tools Grid">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => {
            return (
              <article
                key={tool.slug}
                className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-brand-border/60 hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
              >
                <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Top Bar: Icon + Index + Metric */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getToolIcon(tool.slug)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-surface-2 text-brand-secondary border border-brand-border/40">
                        {tool.metric}
                      </span>
                      <span className="font-mono text-xs text-brand-muted tracking-widest font-bold">
                        {tool.id.replace('tool-', '#')}
                      </span>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider bg-white/5 text-accent border border-accent/20 mb-3">
                    {tool.categoryBadge}
                  </div>

                  {/* Tool Name */}
                  <h2 className="font-heading text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors leading-snug">
                    {tool.name}
                  </h2>

                  {/* Human-authored problem statement & solution summary */}
                  <p className="text-xs sm:text-sm text-brand-secondary leading-relaxed font-body mb-6">
                    {tool.shortDescription}
                  </p>
                </div>

                <div>
                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-brand-border/30">
                    {tool.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-2 text-brand-secondary border border-brand-border/40"
                      >
                        {tech}
                      </span>
                    ))}
                    {tool.techStack.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-brand-muted">
                        +{tool.techStack.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Primary CTA button linking directly to its respective standalone landing page */}
                  <Link
                    to={`/tools/${tool.slug}/`}
                    className="w-full py-2.5 px-4 rounded-xl font-mono text-xs font-bold tracking-wider bg-surface-2 hover:bg-accent hover:text-black text-white flex items-center justify-between transition-all border border-brand-border group-hover:border-accent/50 group-hover:shadow-[0_0_20px_rgba(183,255,60,0.15)] active:scale-[0.98]"
                  >
                    <span>{tool.ctaText}</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      {/* Bespoke Systems Engineering Callout */}
      <section className="my-16 rounded-3xl glass-panel p-8 sm:p-12 border border-accent/20 relative overflow-hidden bg-gradient-to-r from-surface-1 via-surface-2 to-surface-1">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={13} />
            <span>CUSTOM DEVELOPER TOOLS ARCHITECTURE</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white mb-4">
            Need a proprietary utility tool engineered for your agency or SaaS?
          </h2>
          <p className="text-sm sm:text-base text-brand-secondary font-medium leading-relaxed mb-6 font-body">
            In addition to these open utilities, we architect dedicated internal tooling, including multi-tenant client onboarding portals, real-time telephony dashboards, automated CRM reconcilers, and proprietary AI agent evaluation benches.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={onOpenInquiry}
              className="px-6 py-3 rounded-xl bg-accent text-black font-mono text-xs font-bold tracking-wider hover:bg-white transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(183,255,60,0.25)] active:scale-95"
            >
              <span>DISCUSS CUSTOM TOOL ARCHITECTURE</span>
              <ArrowUpRight size={15} />
            </button>
            <Link
              to="/case-studies/"
              className="px-6 py-3 rounded-xl bg-surface-3 text-white font-mono text-xs font-bold tracking-wider hover:bg-white hover:text-black transition-all border border-brand-border flex items-center gap-2"
            >
              <span>VIEW VERIFIED CASE STUDIES</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Systems Hub FAQ Section */}
      <section className="my-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-mono text-accent tracking-widest uppercase block mb-2">
            UTILITY GOVERNANCE & ARCHITECTURE
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2">
            Frequently Asked Questions Regarding Utility Tools
          </h2>
          <p className="text-sm text-brand-secondary font-body">
            Technical answers concerning non-destructive execution, API limits, and deployment workflows.
          </p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {toolFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.question}
                className="glass-panel rounded-2xl border border-brand-border/60 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:text-accent transition-colors"
                >
                  <span className="font-heading text-base sm:text-lg font-bold text-white">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp size={18} className="text-accent flex-shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-brand-muted flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-brand-secondary leading-relaxed font-body border-t border-brand-border/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ToolsHubPage;
