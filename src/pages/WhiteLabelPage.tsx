import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, ChevronDown, ChevronUp, ShieldCheck, Briefcase, Lock, Clock, Zap, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { AeoDirectAnswer } from '../components/seo/AeoDirectAnswer';
import { WHITE_LABEL_PORTALS } from '../data/taxonomyData';
import { generateSchemaGraph } from '../utils/schemaGenerator';

interface WhiteLabelPageProps {
  onOpenInquiry: () => void;
}

export const WhiteLabelPage: React.FC<WhiteLabelPageProps> = ({ onOpenInquiry }) => {
  const { portalSlug } = useParams<{ portalSlug: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!portalSlug || !WHITE_LABEL_PORTALS[portalSlug]) {
    return <Navigate to="/white-label/marketing-agencies/" replace />;
  }

  const data = WHITE_LABEL_PORTALS[portalSlug];
  const whiteLabelSchema = generateSchemaGraph(`/white-label/${data.slug}/`);
  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <SEOHead
        title={data.metaTitle}
        description={data.metaDescription}
        canonicalUrl={`https://sheharyarsiraj.com/white-label/${data.slug}/`}
        schema={whiteLabelSchema}
      />

      <Breadcrumbs
        items={[
          { label: 'WHITE-LABEL', href: '/white-label/marketing-agencies/' },
          { label: data.targetAudience }
        ]}
      />

      {/* Header */}
      <div className="mt-8 mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center">
            <Lock className="text-accent" size={20} />
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider">
            {data.badge}
          </span>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
          {data.title}
        </h1>

        <p className="text-brand-secondary text-base sm:text-xl max-w-3xl leading-relaxed font-body">
          Strictly behind-the-scenes senior technical execution for {data.targetAudience}. <strong className="text-white">Your agency sells. We build.</strong> No junior mistakes, no missed deadlines, 100% NDA protected.
        </p>
      </div>

      {/* Margin Multiplier Box */}
      <div className="my-8 p-6 sm:p-8 rounded-2xl glass-panel border border-accent/30 bg-gradient-to-r from-surface-1 via-accent/[0.04] to-surface-1">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-accent" />
              <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider">
                AGENCY MARGIN MULTIPLIER
              </span>
            </div>
            <p className="font-heading text-lg sm:text-xl font-bold text-white">
              {data.marginBenefit}
            </p>
          </div>
          <button
            onClick={onOpenInquiry}
            type="button"
            className="px-6 py-3 rounded-full bg-accent text-black font-mono text-xs font-bold tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(183,255,60,0.3)] shrink-0 flex items-center gap-2"
          >
            <span>DISCUSS PARTNERSHIP</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {/* AEO Direct Answer */}
      <AeoDirectAnswer
        summary={data.aeoDirectAnswer}
        keyTakeaways={data.keyTakeaways}
        badge={`AEO VERDICT: WHITE-LABEL FOR ${data.targetAudience.toUpperCase()}`}
      />

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

      {/* SLA & Collaboration Terms */}
      <div className="my-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-2xl border border-brand-border/60">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-brand-border/40">
            <ShieldCheck size={16} className="text-accent" />
            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              PARTNERSHIP SLA & TERMS
            </span>
          </div>

          <dl className="divide-y divide-brand-border/30 text-xs font-mono">
            {data.slaTerms.map((term, i) => (
              <div key={i} className="py-3 flex flex-col gap-1">
                <dt className="text-brand-muted uppercase font-bold">{term.label}</dt>
                <dd className="text-white font-medium text-sm">{term.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Deliverables */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-3 pt-2">
            <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider">
              DELIVERABLE ARCHITECTURAL CAPABILITIES
            </span>
            {data.deliverables.map((deliv, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl glass-panel border border-brand-border/40">
                <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-white font-body">{deliv}</span>
              </div>
            ))}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.workflowSteps.map((wf) => (
            <div key={wf.step} className="glass-panel p-6 rounded-2xl border border-brand-border/60 flex flex-col justify-between">
              <div>
                <span className="font-mono text-accent text-xs font-bold tracking-widest mb-3 block">
                  STEP {wf.step}
                </span>
                <h3 className="font-heading text-base font-bold text-white mb-2">
                  {wf.title}
                </h3>
                <p className="text-xs text-brand-secondary font-body leading-relaxed">
                  {wf.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Switch Portal Banner */}
      <div className="my-12 p-6 rounded-2xl glass-panel border border-brand-border/60 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono text-brand-muted uppercase">ALTERNATIVE AGENCY PROFILE</span>
          <h3 className="font-heading text-base font-bold text-white">
            {data.slug === 'marketing-agencies'
              ? 'Are you an SEO Agency looking for Code Remediation?'
              : 'Are you a Marketing Agency looking for Landing Pages & Funnels?'}
          </h3>
        </div>
        <Link
          to={data.slug === 'marketing-agencies' ? '/white-label/seo-agencies/' : '/white-label/marketing-agencies/'}
          className="px-4 py-2 rounded-xl bg-surface-2 text-white font-mono text-xs font-bold hover:bg-accent hover:text-black transition-all border border-brand-border flex items-center gap-1.5"
        >
          <span>VIEW PORTAL</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* Subcontractable Architectural Services Internal Links */}
      <section className="my-16 p-6 sm:p-8 rounded-2xl glass-panel border border-brand-border/60 bg-surface-1/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-brand-border/40">
          <div>
            <span className="text-[10px] font-mono text-accent font-bold uppercase tracking-widest block mb-1">
              AGENCY WHITE-LABEL SUBCONTRACTING MATRIX
            </span>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
              Architectural Capabilities You Can Resell to Enterprise Clients
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
          <Link
            to="/services/custom-wordpress-development/"
            className="p-4 rounded-xl bg-surface-2/60 border border-brand-border/50 hover:border-accent transition-all group"
          >
            <span className="text-accent text-[10px] block mb-1">WORDPRESS VIP</span>
            <span className="text-white group-hover:text-accent font-bold block mb-1">Custom Theme & Core Architecture</span>
            <span className="text-[11px] text-brand-secondary">Deliver pixel-perfect Figma designs without internal dev hiring</span>
          </Link>

          <Link
            to="/services/ai-video-ads-ugc/"
            className="p-4 rounded-xl bg-surface-2/60 border border-brand-border/50 hover:border-accent transition-all group"
          >
            <span className="text-accent text-[10px] block mb-1">PERFORMANCE ADS</span>
            <span className="text-white group-hover:text-accent font-bold block mb-1">AI Video Ads & Synthetic UGC</span>
            <span className="text-[11px] text-brand-secondary">Offer high-velocity creative testing packages to your DTC clients</span>
          </Link>

          <Link
            to="/services/ai-voice-agents/"
            className="p-4 rounded-xl bg-surface-2/60 border border-brand-border/50 hover:border-accent transition-all group"
          >
            <span className="text-accent text-[10px] block mb-1">TELEPHONY AI</span>
            <span className="text-white group-hover:text-accent font-bold block mb-1">Autonomous Voice Phone Agents</span>
            <span className="text-[11px] text-brand-secondary">Resell 24/7 lead intake phone systems on agency retainer</span>
          </Link>

          <Link
            to="/services/vibe-coding-engineering/"
            className="p-4 rounded-xl bg-surface-2/60 border border-brand-border/50 hover:border-accent transition-all group"
          >
            <span className="text-accent text-[10px] block mb-1">CODE HARDENING</span>
            <span className="text-white group-hover:text-accent font-bold block mb-1">Production Vibe Coding</span>
            <span className="text-[11px] text-brand-secondary">Audit and production-harden client AI applications and MVPs</span>
          </Link>

          <Link
            to="/services/custom-saas-mvp-development/"
            className="p-4 rounded-xl bg-surface-2/60 border border-brand-border/50 hover:border-accent transition-all group"
          >
            <span className="text-accent text-[10px] block mb-1">CUSTOM SAAS</span>
            <span className="text-white group-hover:text-accent font-bold block mb-1">Custom SaaS & Portal Engineering</span>
            <span className="text-[11px] text-brand-secondary">Full multi-tenant React + Stripe web applications in 2-4 weeks</span>
          </Link>

          <Link
            to="/services/workflow-automation-n8n/"
            className="p-4 rounded-xl bg-surface-2/60 border border-brand-border/50 hover:border-accent transition-all group"
          >
            <span className="text-accent text-[10px] block mb-1">BACKEND PIPELINES</span>
            <span className="text-white group-hover:text-accent font-bold block mb-1">Workflow Automation (n8n & Make)</span>
            <span className="text-[11px] text-brand-secondary">Automate client lead routing, CRM enrichment, and billing</span>
          </Link>
        </div>
      </section>

      {/* Centered FAQ Section with H2 + Content Capsule */}
      <section className="my-20 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-mono text-accent tracking-widest uppercase inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-3">
            VERIFIED AGENCY PARTNERSHIP ANSWERS
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
            {data.faqH2}
          </h2>
          <p className="content-capsule text-sm sm:text-base text-white/95 font-medium leading-relaxed max-w-3xl mx-auto p-4 rounded-xl bg-accent/[0.04] border border-accent/20 text-left">
            {data.faqCapsule}
          </p>
        </div>

        <div className="space-y-4">
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

      {/* Inquiry Trigger */}
      <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-accent/30 text-center bg-gradient-to-b from-surface-1 to-surface-2">
        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-3">
          How do agency founders initiate a white-label engineering partnership with Sheharyar Siraj?
        </h2>
        <p className="content-capsule text-sm sm:text-base text-white/95 font-medium leading-relaxed max-w-2xl mx-auto mb-8 p-4 rounded-xl bg-accent/[0.04] border border-accent/20">
          Agency founders initiate confidential white-label partnerships with Sheharyar Siraj by executing a bilateral NDA, establishing direct Slack communication channels, and scoping initial client deliverables within 24 hours while locking in 50% to 70% gross margins with zero client attribution risk.
        </p>
        <button
          onClick={onOpenInquiry}
          type="button"
          className="px-8 py-3.5 rounded-full bg-accent text-black font-mono text-xs font-bold tracking-wider hover:bg-white transition-all shadow-[0_0_25px_rgba(183,255,60,0.3)] inline-flex items-center gap-2"
        >
          <span>REQUEST AGENCY PARTNERSHIP</span>
          <ArrowUpRight size={15} />
        </button>
      </div>
    </div>
  );
};
