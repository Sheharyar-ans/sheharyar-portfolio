import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, ChevronDown, ChevronUp, Layers, Cpu, Mic, Bot, Workflow, ShieldCheck, ArrowRight, Sparkles, BarChart3, Terminal, Boxes, Video, Wrench, Building2, Globe } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { AeoDirectAnswer } from '../components/seo/AeoDirectAnswer';
import { ComparisonTable } from '../components/seo/ComparisonTable';
import { SUB_SERVICES } from '../data/taxonomyData';
import { generateSchemaGraph } from '../utils/schemaGenerator';

interface SubServicePageProps {
  onOpenInquiry: () => void;
}

export const SubServicePage: React.FC<SubServicePageProps> = ({ onOpenInquiry }) => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!serviceSlug || !SUB_SERVICES[serviceSlug]) {
    return <Navigate to="/services/" replace />;
  }

  const data = SUB_SERVICES[serviceSlug];
  const serviceSchema = generateSchemaGraph(`/services/${data.slug}/`);

  const getServiceIcon = () => {
    switch (data.slug) {
      case 'custom-wordpress-development':
        return <Layers className="text-accent" size={28} />;
      case 'woocommerce-systems-architecture':
        return <Cpu className="text-accent" size={28} />;
      case 'ai-voice-agents':
        return <Mic className="text-accent" size={28} />;
      case 'ai-chatbots-rag':
        return <Bot className="text-accent" size={28} />;
      case 'workflow-automation-n8n':
        return <Workflow className="text-accent" size={28} />;
      case 'agentic-ai-applications':
        return <Sparkles className="text-accent" size={28} />;
      case 'data-science-analytics':
        return <BarChart3 className="text-accent" size={28} />;
      case 'vibe-coding-engineering':
        return <Terminal className="text-accent" size={28} />;
      case 'custom-saas-mvp-development':
        return <Boxes className="text-accent" size={28} />;
      case 'ai-video-ads-ugc':
        return <Video className="text-accent" size={28} />;
      default:
        return <Cpu className="text-accent" size={28} />;
    }
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <SEOHead
        title={data.metaTitle}
        description={data.metaDescription}
        canonicalUrl={`https://sheharyarsiraj.com/services/${data.slug}/`}
        schema={serviceSchema}
      />

      <Breadcrumbs
        items={[
          { label: 'SERVICES', href: '/services/' },
          { label: data.title }
        ]}
      />

      {/* Hero Header */}
      <div className="mt-8 mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center">
            {getServiceIcon()}
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider">
            {data.badge}
          </span>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
          {data.title}
        </h1>

        <p className="text-brand-secondary text-base sm:text-xl max-w-3xl leading-relaxed font-body">
          {data.shortDesc}
        </p>
      </div>

      {/* AEO Direct Answer Block */}
      <AeoDirectAnswer
        summary={data.aeoDirectAnswer}
        keyTakeaways={data.keyTakeaways}
        badge={`AEO ANSWER: ${data.title.toUpperCase()}`}
      />

      {/* Benchmarks Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-12">
        {data.benchmarks.map((bench, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-2xl border border-brand-border/60 text-center">
            <div className="font-heading text-3xl sm:text-4xl font-extrabold text-accent mb-1 tracking-tight">
              {bench.metric}
            </div>
            <div className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-0.5">
              {bench.value}
            </div>
            <div className="font-mono text-[11px] text-brand-muted">
              {bench.label}
            </div>
          </div>
        ))}
      </div>

      {/* Content Capsule Sections */}
      {data.contentSections && data.contentSections.length > 0 && (
        <div className="my-16 space-y-12">
          {data.contentSections.map((sec, idx) => (
            <section key={idx} className="glass-panel p-6 sm:p-8 rounded-2xl border border-brand-border/60">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">
                {sec.h2Question}
              </h2>
              <p className="content-capsule text-sm sm:text-base text-white/95 font-medium leading-relaxed mb-4 p-4 rounded-xl bg-accent/[0.04] border border-accent/20">
                {sec.capsuleAnswer}
              </p>
              <div className="technical-breakdown text-xs sm:text-sm text-brand-secondary font-body leading-relaxed pt-2">
                <p>{sec.technicalBreakdown}</p>
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Technical Specifications Matrix */}
      <div className="my-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="pt-2">
            <h3 className="font-mono text-xs font-bold text-white tracking-wider uppercase mb-4">
              DELIVERABLE ARCHITECTURAL CAPABILITIES:
            </h3>
            <div className="space-y-3">
              {data.coreCapabilities.map((cap, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl glass-panel border border-brand-border/40">
                  <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-white font-body">{cap}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-2xl border border-brand-border/60">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-brand-border/40">
            <ShieldCheck size={16} className="text-accent" />
            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              TECHNICAL SPECIFICATIONS
            </span>
          </div>

          <dl className="divide-y divide-brand-border/30 text-xs font-mono">
            {data.specs.map((spec, i) => (
              <div key={i} className="py-3 flex flex-col gap-1">
                <dt className="text-brand-muted uppercase font-bold">{spec.label}</dt>
                <dd className="text-white font-medium text-sm">{spec.value}</dd>
                {spec.detail && (
                  <dd className="text-brand-secondary text-[11px]">{spec.detail}</dd>
                )}
              </div>
            ))}
          </dl>

          <div className="mt-6 pt-4 border-t border-brand-border/40">
            <div className="text-[11px] font-mono text-brand-muted uppercase font-bold mb-2">
              STACK IMPLEMENTATION:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {data.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded text-xs font-mono bg-surface-2 text-accent border border-accent/25"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Section with H2 + Content Capsule */}
      <section className="my-16">
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">
          {data.comparisonH2}
        </h2>
        <p className="content-capsule text-sm sm:text-base text-white/95 font-medium leading-relaxed mb-6 p-4 rounded-xl bg-accent/[0.04] border border-accent/20">
          {data.comparisonCapsule}
        </p>
        <ComparisonTable
          title={data.comparisonTitle}
          items={data.comparisonItems}
        />
      </section>

      {/* Centered Direct Answer FAQ Accordion with H2 + Content Capsule */}
      <section className="my-20 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-mono text-accent tracking-widest uppercase inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-3">
            VERIFIED DIRECT ANSWERS
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
            {data.faqH2}
          </h2>
          <p className="content-capsule text-sm sm:text-base text-white/95 font-medium leading-relaxed max-w-3xl mx-auto p-4 rounded-xl bg-accent/[0.04] border border-accent/20 text-left">
            {data.faqCapsule}
          </p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {data.faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-xl glass-panel border border-brand-border/60 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-mono text-sm text-white hover:text-accent transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp size={16} className="text-accent shrink-0" />
                  ) : (
                    <ChevronDown size={16} className="text-brand-muted shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-brand-secondary font-body leading-relaxed border-t border-brand-border/30">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Related Architectures */}
      {data.relatedSlugs && data.relatedSlugs.length > 0 && (
        <div className="my-16 pt-10 border-t border-brand-border/40">
          <span className="text-xs font-mono text-brand-muted uppercase tracking-wider block mb-4">
            RELATED COMPONENT ARCHITECTURES:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {data.relatedSlugs.map((relSlug) => {
              const rel = SUB_SERVICES[relSlug];
              if (!rel) return null;
              return (
                <Link
                  key={relSlug}
                  to={`/services/${relSlug}/`}
                  className="glass-panel p-5 rounded-xl border border-brand-border/60 hover:border-accent transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono text-accent uppercase tracking-wider block mb-1">
                      {rel.badge}
                    </span>
                    <h3 className="font-heading text-sm font-bold text-white group-hover:text-accent transition-colors mb-2">
                      {rel.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-mono text-brand-secondary group-hover:text-white pt-2">
                    <span>Inspect Architecture</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Internal SEO Linking Ecosystem Directory */}
      <section className="my-16 p-6 sm:p-8 rounded-2xl glass-panel border border-brand-border/60 bg-surface-1/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-brand-border/40">
          <div>
            <span className="text-[10px] font-mono text-accent font-bold uppercase tracking-widest block mb-1">
              SYSTEMS ARCHITECTURE & TOOLS NETWORK
            </span>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
              Explore Connected Enterprise Systems & Diagnostics
            </h3>
          </div>
          <Link
            to="/services/"
            className="text-xs font-mono text-accent hover:text-white transition-colors flex items-center gap-1"
          >
            <span>All 10 Services Hub</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono">
          {/* Related Free Diagnostic Tools */}
          <div className="space-y-3">
            <div className="text-white font-bold tracking-wider uppercase flex items-center gap-1.5 text-brand-muted">
              <Wrench size={13} className="text-accent" />
              <span>Diagnostic Utilities</span>
            </div>
            <ul className="space-y-2 text-brand-secondary">
              <li>
                <Link to="/tools/voice-agent-roi-calculator/" className="hover:text-accent transition-colors block">
                  • AI Voice ROI Calculator
                </Link>
              </li>
              <li>
                <Link to="/tools/llm-seo-meta-generator/" className="hover:text-accent transition-colors block">
                  • LLM SEO Meta Generator
                </Link>
              </li>
              <li>
                <Link to="/tools/local-schema-generator/" className="hover:text-accent transition-colors block">
                  • Local Business Schema Architect
                </Link>
              </li>
              <li>
                <Link to="/tools/wordpress-database-bloat-estimator/" className="hover:text-accent transition-colors block">
                  • WP Database Bloat Estimator
                </Link>
              </li>
              <li>
                <Link to="/tools/" className="text-accent hover:underline block pt-1 font-bold">
                  → View All 10 Systems Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* White-Label Partnerships */}
          <div className="space-y-3">
            <div className="text-white font-bold tracking-wider uppercase flex items-center gap-1.5 text-brand-muted">
              <Building2 size={13} className="text-accent" />
              <span>Agency Subcontracting</span>
            </div>
            <ul className="space-y-2 text-brand-secondary">
              <li>
                <Link to="/white-label/marketing-agencies/" className="hover:text-accent transition-colors block">
                  • For Growth Marketing Agencies
                </Link>
              </li>
              <li>
                <Link to="/white-label/seo-agencies/" className="hover:text-accent transition-colors block">
                  • For Technical SEO Agencies
                </Link>
              </li>
              <li>
                <Link to="/case-studies/" className="hover:text-accent transition-colors block">
                  • Production Case Studies & Metrics
                </Link>
              </li>
              <li>
                <Link to="/code-arcade/" className="text-accent hover:underline block pt-1 font-bold flex items-center gap-1">
                  <span>🎮 Practice in 3D Code Arcade</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Regional Market Hubs */}
          <div className="space-y-3">
            <div className="text-white font-bold tracking-wider uppercase flex items-center gap-1.5 text-brand-muted">
              <Globe size={13} className="text-accent" />
              <span>Global Delivery Hubs</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-brand-secondary">
              <Link to="/locations/usa/" className="hover:text-accent transition-colors">
                🇺🇸 United States
              </Link>
              <Link to="/locations/uk/" className="hover:text-accent transition-colors">
                🇬🇧 United Kingdom
              </Link>
              <Link to="/locations/germany/" className="hover:text-accent transition-colors">
                🇩🇪 Germany & DACH
              </Link>
              <Link to="/locations/uae/" className="hover:text-accent transition-colors">
                🇦🇪 Dubai & UAE
              </Link>
              <Link to="/locations/netherlands/" className="hover:text-accent transition-colors">
                🇳🇱 Netherlands
              </Link>
              <Link to="/locations/australia/" className="hover:text-accent transition-colors">
                🇦🇺 Australia
              </Link>
            </div>
            <Link to="/locations/" className="text-accent hover:underline block pt-1 font-bold">
              → View All 10 Regional Hubs
            </Link>
          </div>
        </div>
      </section>

      {/* Inquiry Trigger */}
      <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-accent/30 text-center bg-gradient-to-b from-surface-1 to-surface-2 relative">
        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-3">
          How do enterprise clients initiate an architectural engagement with Sheharyar Siraj?
        </h2>
        <p className="content-capsule text-sm sm:text-base text-white/95 font-medium leading-relaxed max-w-2xl mx-auto mb-8 p-4 rounded-xl bg-accent/[0.04] border border-accent/20">
          Enterprise clients initiate direct technical engagements with Sheharyar Siraj through a confidential engineering roadmap consultation, receiving verified technical scoping within 24 hours, guaranteed NDA discretion, direct GitHub architectural oversight, and zero junior handoffs across all custom WordPress, WooCommerce, and AI automation deliverables.
        </p>
        <button
          onClick={onOpenInquiry}
          type="button"
          className="px-8 py-3.5 rounded-full bg-accent text-black font-mono text-xs font-bold tracking-wider hover:bg-white transition-all shadow-[0_0_25px_rgba(183,255,60,0.3)] inline-flex items-center gap-2"
        >
          <span>REQUEST ARCHITECTURAL PROPOSAL</span>
          <ArrowUpRight size={15} />
        </button>
      </div>
    </div>
  );
};
