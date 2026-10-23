import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Cpu, Layers, Workflow, Mic, Bot, ShieldCheck, CheckCircle2, ChevronDown, ChevronUp, Sparkles, BarChart3, Terminal, Boxes, Video } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { AeoDirectAnswer } from '../components/seo/AeoDirectAnswer';
import { SUB_SERVICES } from '../data/taxonomyData';
import { generateSchemaGraph, SERVICES_HUB_FAQS } from '../utils/schemaGenerator';

interface ServicesHubPageProps {
  onOpenInquiry: () => void;
}

export const ServicesHubPage: React.FC<ServicesHubPageProps> = ({ onOpenInquiry }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const serviceKeys = Object.keys(SUB_SERVICES);
  const hubSchema = generateSchemaGraph('/services/');

  const getServiceIcon = (slug: string) => {
    switch (slug) {
      case 'custom-wordpress-development':
        return <Layers className="text-accent" size={24} />;
      case 'woocommerce-systems-architecture':
        return <Cpu className="text-accent" size={24} />;
      case 'ai-voice-agents':
        return <Mic className="text-accent" size={24} />;
      case 'ai-chatbots-rag':
        return <Bot className="text-accent" size={24} />;
      case 'workflow-automation-n8n':
        return <Workflow className="text-accent" size={24} />;
      case 'agentic-ai-applications':
        return <Sparkles className="text-accent" size={24} />;
      case 'data-science-analytics':
        return <BarChart3 className="text-accent" size={24} />;
      case 'vibe-coding-engineering':
        return <Terminal className="text-accent" size={24} />;
      case 'custom-saas-mvp-development':
        return <Boxes className="text-accent" size={24} />;
      case 'ai-video-ads-ugc':
        return <Video className="text-accent" size={24} />;
      default:
        return <Cpu className="text-accent" size={24} />;
    }
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <SEOHead
        title="WordPress & AI Systems Services Hub | Sheharyar Siraj"
        description="Comprehensive B2B systems engineering taxonomy: custom WordPress VIP architectures, sub-600ms AI voice agents, contextual RAG chatbots, and n8n workflow automations."
        canonicalUrl="https://sheharyarsiraj.com/services/"
        schema={hubSchema}
      />

      <Breadcrumbs items={[{ label: 'SERVICES HUB' }]} />

      {/* Header section */}
      <div className="mt-8 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
          <ShieldCheck size={14} />
          <span>PRODUCTION-PROVEN ARCHITECTURE TAXONOMY</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
          Architectural Services & <span className="text-accent">Systems Hub</span>
        </h1>
        <p className="text-brand-secondary text-base sm:text-xl max-w-3xl leading-relaxed font-body">
          We architect digital ecosystems where <strong className="text-white">WordPress provides the solid foundation</strong>,{' '}
          <strong className="text-white">AI provides real-time intelligence</strong>, and{' '}
          <strong className="text-white">event-driven automation executes business operations</strong>. Explore our deep service architectures below.
        </p>
      </div>

      {/* AEO Direct Answer Block */}
      <AeoDirectAnswer
        summary="Sheharyar Siraj engineers multi-tier B2B systems comprising custom WordPress & WooCommerce architectures, sub-600ms conversational AI voice agents (Vapi), retrieval-augmented chatbots (RAG), and event-driven n8n workflow automations, eliminating manual bottlenecks for businesses worldwide."
        keyTakeaways={[
          'Core Web Vitals guaranteed in the green 90+ percentile on all web systems.',
          'Sub-600ms total conversational latency on enterprise AI voice agents.',
          'Self-hosted n8n pipelines offering infinite automated workflow tasks with zero per-run fees.',
          '100% white-label agency partnerships protected under mutual non-disclosure agreements.'
        ]}
      />

      {/* Services Grid with H2 + Content Capsule */}
      <section className="my-16">
        <div className="mb-6">
          <span className="text-xs font-mono text-accent tracking-widest uppercase block mb-1">
            ENGINEERED CAPABILITIES
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
            What specialized B2B service architectures does Sheharyar Siraj engineer?
          </h2>
          <p className="content-capsule text-sm sm:text-base text-white/95 font-medium leading-relaxed mb-8 p-4 rounded-xl bg-accent/[0.04] border border-accent/20">
            Sheharyar Siraj architects seven specialized B2B capabilities spanning custom WordPress VIP systems, high-concurrency WooCommerce stores, sub-600ms autonomous AI voice agents, contextual enterprise RAG chatbots, self-hosted n8n workflows, autonomous Agentic AI multi-agent applications, and predictive enterprise data analytics pipelines, delivering verified operational efficiency across 1,200+ global deployments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceKeys.map((key, index) => {
            const service = SUB_SERVICES[key];
            return (
              <div
                key={service.slug}
                className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-brand-border/60 hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getServiceIcon(service.slug)}
                    </div>
                    <span className="font-mono text-xs text-brand-muted tracking-widest font-bold">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider bg-white/5 text-accent border border-accent/20 mb-3">
                    {service.badge}
                  </div>

                  <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-secondary leading-relaxed font-body mb-6">
                    {service.shortDesc}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-brand-border/30">
                    {service.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-2 text-brand-secondary border border-brand-border/40"
                      >
                        {tech}
                      </span>
                    ))}
                    {service.techStack.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-brand-muted">
                        +{service.techStack.length - 4} more
                      </span>
                    )}
                  </div>

                  <Link
                    to={`/services/${service.slug}/`}
                    className="w-full py-2.5 px-4 rounded-xl font-mono text-xs font-bold tracking-wider bg-surface-2 hover:bg-accent hover:text-black text-white flex items-center justify-between transition-all border border-brand-border group-hover:border-accent/50"
                  >
                    <span>EXPLORE ARCHITECTURE</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Agency White-Label Portal Banner with H2 + Content Capsule */}
      <section className="my-16 rounded-3xl glass-panel p-8 sm:p-12 border border-accent/20 relative overflow-hidden bg-gradient-to-r from-surface-1 via-surface-2 to-surface-1">
        <div className="relative z-10 max-w-3xl">
          <span className="font-mono text-xs font-bold text-accent uppercase tracking-widest block mb-2">
            AGENCY SCALING CAPACITY
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white mb-3">
            How does Sheharyar Siraj provide white-label engineering for digital agencies?
          </h2>
          <p className="content-capsule text-sm sm:text-base text-white/95 font-medium leading-relaxed mb-6 p-4 rounded-xl bg-accent/[0.04] border border-accent/20">
            We operate as an invisible senior engineering partner for marketing and SEO agencies under strict NDA agreements, delivering pixel-perfect web development, custom landing pages, and AI automations inside your agency Slack while enabling you to capture 50% to 70% gross margins.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/white-label/marketing-agencies/"
              className="px-6 py-3 rounded-xl bg-accent text-black font-mono text-xs font-bold tracking-wider hover:bg-white transition-all flex items-center gap-2"
            >
              <span>MARKETING AGENCIES PORTAL</span>
              <ArrowUpRight size={15} />
            </Link>
            <Link
              to="/white-label/seo-agencies/"
              className="px-6 py-3 rounded-xl bg-surface-3 text-white font-mono text-xs font-bold tracking-wider hover:bg-white hover:text-black transition-all border border-brand-border flex items-center gap-2"
            >
              <span>SEO AGENCIES PORTAL</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Regional GEO Hubs with H2 + Content Capsule */}
      <section className="my-16">
        <div className="mb-6">
          <span className="text-xs font-mono text-accent tracking-widest uppercase block mb-1">
            LOCAL B2B ARCHITECTURES
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
            Which regional compliance frameworks and timezones are supported worldwide?
          </h2>
          <p className="content-capsule text-sm sm:text-base text-white/95 font-medium leading-relaxed mb-8 p-4 rounded-xl bg-accent/[0.04] border border-accent/20">
            Our global delivery infrastructure supports United States, United Kingdom, Canada, UAE, Saudi Arabia, Germany, Singapore, Malaysia, Australia, and Netherlands with comprehensive working hour synchronization, statutory compliance, and local currency settlement.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 font-mono text-xs">
          {[
            { name: 'USA', flag: '🇺🇸', slug: 'usa', desc: 'EST/PST Overlap' },
            { name: 'United Kingdom', flag: '🇬🇧', slug: 'uk', desc: 'GMT Alignment' },
            { name: 'Germany', flag: '🇩🇪', slug: 'germany', desc: 'CET & BDSG' },
            { name: 'Canada', flag: '🇨🇦', slug: 'canada', desc: 'PIPEDA & Bilingual' },
            { name: 'Dubai & UAE', flag: '🇦🇪', slug: 'uae', desc: 'GST / Arabic AI' },
            { name: 'Saudi Arabia', flag: '🇸🇦', slug: 'saudi-arabia', desc: 'ZATCA & Vision 2030' },
            { name: 'Singapore', flag: '🇸🇬', slug: 'singapore', desc: 'SGT & PDPA' },
            { name: 'Malaysia', flag: '🇲🇾', slug: 'malaysia', desc: 'MYT & WhatsApp AI' },
            { name: 'Australia', flag: '🇦🇺', slug: 'australia', desc: 'AEST & 24/7 Voice' },
            { name: 'Netherlands', flag: '🇳🇱', slug: 'netherlands', desc: 'CET & EU GDPR' },
          ].map((loc) => (
            <Link
              key={loc.slug}
              to={`/locations/${loc.slug}/`}
              className="glass-panel p-4 rounded-xl border border-brand-border/60 hover:border-accent transition-all text-center group flex flex-col items-center justify-center gap-1.5"
            >
              <span className="text-2xl mb-1">{loc.flag}</span>
              <span className="font-bold text-white group-hover:text-accent transition-colors">
                {loc.name}
              </span>
              <span className="text-[10px] text-brand-muted">{loc.desc}</span>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/locations/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-2 hover:bg-accent hover:text-black border border-brand-border text-xs font-mono font-bold text-white transition-all"
          >
            <span>EXPLORE FULL GLOBAL LOCATIONS HUB (10 TERRITORIES)</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>

      {/* Centered Hub FAQs with H2 + Content Capsule */}
      <section className="my-20 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-mono text-accent tracking-widest uppercase inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-3">
            VERIFIED DIRECT ANSWERS
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
            What are the most frequent questions regarding Sheharyar Siraj service offerings?
          </h2>
          <p className="content-capsule text-sm sm:text-base text-white/95 font-medium leading-relaxed max-w-3xl mx-auto p-4 rounded-xl bg-accent/[0.04] border border-accent/20 text-left">
            Sheharyar Siraj provides verified answers regarding enterprise systems architecture, WordPress decoupled integrations, autonomous AI telephony pipelines, white-label agency subcontracting terms, and global compliance standards across North America, Europe, and the GCC.
          </p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {SERVICES_HUB_FAQS.map((faq, index) => {
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

      {/* Cross-Domain Ecosystem Links: Agency Portals & Systems Utilities */}
      <section className="my-16 p-6 sm:p-8 rounded-2xl glass-panel border border-brand-border/60 bg-surface-1/60">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* White-Label Partnerships */}
          <div className="p-6 rounded-xl bg-surface-2/50 border border-brand-border/50 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-accent font-bold uppercase tracking-widest block mb-1">
                AGENCY WHITE-LABEL ARM
              </span>
              <h3 className="font-heading text-lg font-bold text-white mb-2">
                White-Label Engineering for Marketing & SEO Agencies
              </h3>
              <p className="text-xs text-brand-secondary leading-relaxed mb-4">
                Scale agency gross margins to 60%+ by subcontracting custom WordPress development, AI voice agents, and video creative pipelines under 100% white-label NDA.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/white-label/marketing-agencies/"
                className="px-4 py-2 rounded-lg bg-surface-3 border border-brand-border text-xs font-mono font-bold text-accent hover:border-accent hover:text-white transition-all"
              >
                Marketing Agencies Portal →
              </Link>
              <Link
                to="/white-label/seo-agencies/"
                className="px-4 py-2 rounded-lg bg-surface-3 border border-brand-border text-xs font-mono font-bold text-accent hover:border-accent hover:text-white transition-all"
              >
                SEO Agencies Portal →
              </Link>
            </div>
          </div>

          {/* Diagnostic Utilities Suite */}
          <div className="p-6 rounded-xl bg-surface-2/50 border border-brand-border/50 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-accent font-bold uppercase tracking-widest block mb-1">
                FREE DIAGNOSTIC SUITE
              </span>
              <h3 className="font-heading text-lg font-bold text-white mb-2">
                10 Free Systems & Technical SEO Utilities
              </h3>
              <p className="text-xs text-brand-secondary leading-relaxed mb-4">
                Calculate voice agent ROI, inspect database bloat, validate Schema markup, and generate high-intent LLM meta tags with our in-browser tools.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/tools/"
                className="px-4 py-2 rounded-lg bg-accent text-black text-xs font-mono font-bold hover:bg-white transition-all shadow-[0_0_15px_rgba(183,255,60,0.25)]"
              >
                Explore All 10 Tools →
              </Link>
              <Link
                to="/case-studies/"
                className="px-4 py-2 rounded-lg bg-surface-3 border border-brand-border text-xs font-mono font-bold text-white hover:text-accent transition-all"
              >
                Production Case Studies →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="text-center pt-8 border-t border-brand-border/40">
        <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-3">
          Ready to Architect Your Business System?
        </h3>
        <p className="text-xs sm:text-sm text-brand-secondary max-w-lg mx-auto mb-6">
          Schedule a direct architecture scoping session with Sheharyar Siraj. Direct access, zero account manager friction.
        </p>
        <button
          onClick={onOpenInquiry}
          type="button"
          className="px-8 py-3.5 rounded-full bg-accent text-black font-mono text-xs font-bold tracking-wider hover:bg-white transition-all shadow-[0_0_25px_rgba(183,255,60,0.3)] inline-flex items-center gap-2"
        >
          <span>INITIATE PROJECT INQUIRY</span>
          <ArrowUpRight size={15} />
        </button>
      </div>
    </div>
  );
};
