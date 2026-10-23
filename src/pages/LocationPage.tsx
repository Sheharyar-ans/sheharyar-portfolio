import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, ChevronDown, ChevronUp, MapPin, Globe2, ShieldCheck, Clock, CreditCard, Compass, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { AeoDirectAnswer } from '../components/seo/AeoDirectAnswer';
import { REGIONAL_LOCATIONS } from '../data/taxonomyData';
import { generateSchemaGraph } from '../utils/schemaGenerator';

interface LocationPageProps {
  onOpenInquiry: () => void;
}

export const LocationPage: React.FC<LocationPageProps> = ({ onOpenInquiry }) => {
  const { geoSlug } = useParams<{ geoSlug: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!geoSlug || !REGIONAL_LOCATIONS[geoSlug]) {
    return <Navigate to="/locations/usa/" replace />;
  }

  const data = REGIONAL_LOCATIONS[geoSlug];
  const allLocations = Object.keys(REGIONAL_LOCATIONS);
  const locationSchema = generateSchemaGraph(`/locations/${data.slug}/`);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <SEOHead
        title={data.metaTitle}
        description={data.metaDescription}
        canonicalUrl={`https://sheharyarsiraj.com/locations/${data.slug}/`}
        schema={locationSchema}
      />

      <Breadcrumbs
        items={[
          { label: 'LOCATIONS', href: '/locations/usa/' },
          { label: `${data.flag} ${data.country.toUpperCase()}` }
        ]}
      />

      {/* Header */}
      <div className="mt-8 mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{data.flag}</span>
          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider">
            {data.badge}
          </span>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
          {data.title}
        </h1>

        <p className="text-brand-secondary text-base sm:text-xl max-w-3xl leading-relaxed font-body">
          Specialized B2B engineering and AI systems calibrated for enterprises and digital agencies in {data.country}. Combining international quality standards with regional compliance and timezone overlap.
        </p>
      </div>

      {/* AEO Direct Answer */}
      <AeoDirectAnswer
        summary={data.aeoDirectAnswer}
        keyTakeaways={data.keyTakeaways}
        badge={`AEO VERDICT: B2B ENGINEERING FOR ${data.country.toUpperCase()}`}
      />

      {/* Local Proof Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-12">
        {data.localProofMetrics.map((metric, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-2xl border border-brand-border/60 text-center">
            <div className="font-heading text-3xl sm:text-4xl font-extrabold text-accent mb-1 tracking-tight">
              {metric.value}
            </div>
            <div className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              {metric.label}
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

      {/* Regional Operations & Compliance Breakdown */}
      <div className="my-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Compliance and Terms */}
        <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-2xl border border-brand-border/60 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-brand-border/40">
            <ShieldCheck size={18} className="text-accent" />
            <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              REGIONAL COMPLIANCE & GOVERNANCE
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-brand-secondary leading-relaxed font-body">
            All codebases, user data funnels, and AI RAG knowledge vectors strictly conform to local standards for {data.country}:
          </p>

          <div className="space-y-2.5">
            {data.regulatoryCompliance.map((comp, idx) => (
              <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-2 border border-brand-border/40 text-xs font-mono text-white">
                <CheckCircle2 size={14} className="text-accent shrink-0" />
                <span>{comp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Matrix */}
        <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-2xl border border-brand-border/60 space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-brand-border/40">
            <Compass size={18} className="text-accent" />
            <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              LOCAL OPERATIONAL MATRIX
            </h3>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-surface-2 border border-brand-border/40">
              <div className="flex items-center gap-2 text-brand-muted uppercase font-bold mb-1">
                <Clock size={13} className="text-accent" />
                <span>TIMEZONE OVERLAP & COLLABORATION</span>
              </div>
              <div className="text-white font-medium text-sm">
                {data.timezoneOverlap}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-2 border border-brand-border/40">
              <div className="flex items-center gap-2 text-brand-muted uppercase font-bold mb-1">
                <CreditCard size={13} className="text-accent" />
                <span>CURRENCY & SETTLEMENT CHANNELS</span>
              </div>
              <div className="text-white font-medium text-sm">
                {data.currencySettlement}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-2 border border-brand-border/40">
              <div className="flex items-center gap-2 text-brand-muted uppercase font-bold mb-1">
                <Globe2 size={13} className="text-accent" />
                <span>REGIONAL MARKET PRIORITIES</span>
              </div>
              <div className="text-brand-secondary font-body leading-relaxed text-xs">
                {data.regionalMarketNeeds}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Relocation / On-Site Banner for UAE and Saudi Arabia */}
      {(data.slug === 'uae' || data.slug === 'saudi-arabia') && (
        <div className="my-10 p-6 sm:p-8 rounded-2xl glass-panel border border-accent/40 bg-gradient-to-r from-accent/[0.05] via-surface-1 to-surface-2">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-accent font-bold uppercase tracking-wider block mb-1">
                GCC ON-SITE & RELOCATION READINESS
              </span>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
                Available for On-Site Sprints & Relocation to {data.country}
              </h3>
              <p className="text-xs sm:text-sm text-brand-secondary mt-1 font-body">
                Open to executive consulting contracts, technical leadership roles, and full company relocation in {data.slug === 'uae' ? 'Dubai & Abu Dhabi' : 'Riyadh & Jeddah'}.
              </p>
            </div>
            <button
              onClick={onOpenInquiry}
              type="button"
              className="px-6 py-2.5 rounded-xl bg-accent text-black font-mono text-xs font-bold tracking-wider hover:bg-white transition-all shrink-0"
            >
              DISCUSS RELOCATION / ON-SITE
            </button>
          </div>
        </div>
      )}

      {/* Comparison Section with H2 + Content Capsule */}
      <section className="my-16">
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">
          {data.comparisonH2}
        </h2>
        <p className="content-capsule text-sm sm:text-base text-white/95 font-medium leading-relaxed mb-6 p-4 rounded-xl bg-accent/[0.04] border border-accent/20">
          {data.comparisonCapsule}
        </p>

        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-brand-border/60">
          <div className="text-xs sm:text-sm text-brand-secondary font-body leading-relaxed space-y-2">
            <p>
              By combining international senior systems expertise with comprehensive timezone synchronization across {data.country}, we provide organizations with immediate project momentum, transparent deliverables, and zero recruitment friction.
            </p>
          </div>
        </div>
      </section>

      {/* Centered Regional FAQs with H2 + Content Capsule */}
      <section className="my-20 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-mono text-accent tracking-widest uppercase inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-3">
            VERIFIED REGIONAL ANSWERS
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
            {data.faqH2}
          </h2>
          <p className="content-capsule text-sm sm:text-base text-white/95 font-medium leading-relaxed max-w-3xl mx-auto p-4 rounded-xl bg-accent/[0.04] border border-accent/20 text-left">
            {data.faqCapsule}
          </p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {data.regionalFaqs.map((faq, index) => {
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

      {/* Deployable Regional Architectures Internal Links */}
      <section className="my-16 p-6 sm:p-8 rounded-2xl glass-panel border border-brand-border/60 bg-surface-1/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-brand-border/40">
          <div>
            <span className="text-[10px] font-mono text-accent font-bold uppercase tracking-widest block mb-1">
              REGIONAL SYSTEMS ENGINEERING MATRIX
            </span>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
              Core Architectures Deployed for {data.country} Enterprises
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
            className="p-3.5 rounded-xl bg-surface-2/60 border border-brand-border/50 hover:border-accent transition-all group"
          >
            <span className="text-accent text-[10px] block mb-1">ENTERPRISE CMS</span>
            <span className="text-white group-hover:text-accent font-bold block mb-1">Custom WordPress VIP Architecture</span>
            <span className="text-[11px] text-brand-secondary">Decoupled themes, zero bloat, sub-second TTFB</span>
          </Link>

          <Link
            to="/services/ai-voice-agents/"
            className="p-3.5 rounded-xl bg-surface-2/60 border border-brand-border/50 hover:border-accent transition-all group"
          >
            <span className="text-accent text-[10px] block mb-1">24/7 TELEPHONY</span>
            <span className="text-white group-hover:text-accent font-bold block mb-1">Autonomous AI Voice Agents</span>
            <span className="text-[11px] text-brand-secondary">Sub-600ms latency, local phone intake & booking</span>
          </Link>

          <Link
            to="/services/custom-saas-mvp-development/"
            className="p-3.5 rounded-xl bg-surface-2/60 border border-brand-border/50 hover:border-accent transition-all group"
          >
            <span className="text-accent text-[10px] block mb-1">B2B CLOUD APPS</span>
            <span className="text-white group-hover:text-accent font-bold block mb-1">Custom SaaS & MVP Engineering</span>
            <span className="text-[11px] text-brand-secondary">Multi-tenant PostgreSQL, Stripe billing in 2-4 wks</span>
          </Link>

          <Link
            to="/services/vibe-coding-engineering/"
            className="p-3.5 rounded-xl bg-surface-2/60 border border-brand-border/50 hover:border-accent transition-all group"
          >
            <span className="text-accent text-[10px] block mb-1">AI CODE REMEDIATION</span>
            <span className="text-white group-hover:text-accent font-bold block mb-1">Production Vibe Coding</span>
            <span className="text-[11px] text-brand-secondary">Harden Cursor/v0 prototypes into secure apps</span>
          </Link>

          <Link
            to="/services/ai-video-ads-ugc/"
            className="p-3.5 rounded-xl bg-surface-2/60 border border-brand-border/50 hover:border-accent transition-all group"
          >
            <span className="text-accent text-[10px] block mb-1">PERFORMANCE CREATIVE</span>
            <span className="text-white group-hover:text-accent font-bold block mb-1">AI Video Ads & Synthetic UGC</span>
            <span className="text-[11px] text-brand-secondary">High-ROAS Meta & TikTok creatives, ElevenLabs audio</span>
          </Link>

          <Link
            to="/white-label/marketing-agencies/"
            className="p-3.5 rounded-xl bg-surface-2/60 border border-brand-border/50 hover:border-accent transition-all group"
          >
            <span className="text-accent text-[10px] block mb-1">AGENCY PARTNERSHIP</span>
            <span className="text-white group-hover:text-accent font-bold block mb-1">White-Label Technical Arm</span>
            <span className="text-[11px] text-brand-secondary">Behind-the-scenes engineering for {data.country} agencies</span>
          </Link>
        </div>
      </section>

      {/* Other Regional Hubs cross-linking */}
      <div className="my-16 pt-10 border-t border-brand-border/40">
        <span className="text-xs font-mono text-brand-muted uppercase tracking-wider block mb-4">
          EXPLORE OTHER REGIONAL B2B HUBS:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 font-mono text-xs">
          {allLocations
            .filter((slug) => slug !== data.slug)
            .map((slug) => {
              const loc = REGIONAL_LOCATIONS[slug];
              return (
                <Link
                  key={slug}
                  to={`/locations/${slug}/`}
                  className="glass-panel p-3.5 rounded-xl border border-brand-border/60 hover:border-accent transition-all text-center flex items-center justify-center gap-2 group"
                >
                  <span>{loc.flag}</span>
                  <span className="text-white group-hover:text-accent font-bold">
                    {loc.country}
                  </span>
                </Link>
              );
            })}
        </div>
      </div>

      {/* Inquiry Trigger */}
      <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-accent/30 text-center bg-gradient-to-b from-surface-1 to-surface-2">
        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-3">
          How do organizations in {data.country} initiate a regional technical engagement with Sheharyar Siraj?
        </h2>
        <p className="content-capsule text-sm sm:text-base text-white/95 font-medium leading-relaxed max-w-2xl mx-auto mb-8 p-4 rounded-xl bg-accent/[0.04] border border-accent/20">
          Organizations in {data.country} initiate direct technical engagements with Sheharyar Siraj by scheduling a confidential architecture scoping session, receiving localized technical proposals within 24 hours, guaranteed regional regulatory compliance, and direct collaboration synchronized across {data.country} business hours.
        </p>
        <button
          onClick={onOpenInquiry}
          type="button"
          className="px-8 py-3.5 rounded-full bg-accent text-black font-mono text-xs font-bold tracking-wider hover:bg-white transition-all shadow-[0_0_25px_rgba(183,255,60,0.3)] inline-flex items-center gap-2"
        >
          <span>INITIATE REGIONAL INQUIRY</span>
          <ArrowUpRight size={15} />
        </button>
      </div>
    </div>
  );
};
