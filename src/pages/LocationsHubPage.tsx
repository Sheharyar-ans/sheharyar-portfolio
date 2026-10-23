import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, ArrowUpRight, ShieldCheck, Clock, CheckCircle2, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { AeoDirectAnswer } from '../components/seo/AeoDirectAnswer';
import { REGIONAL_LOCATIONS } from '../data/taxonomyData';
import { generateSchemaGraph } from '../utils/schemaGenerator';

interface LocationsHubPageProps {
  onOpenInquiry: () => void;
}

export const LOCATIONS_HUB_FAQS = [
  {
    question: 'How do you coordinate real-time collaboration across multiple international timezones?',
    answer: 'We schedule daily live collaboration windows aligned with each client territory: 4 to 6 hours overlap with US East and West Coast, full-day alignment with UK (GMT) and Europe (CET), seamless integration with the GCC (UAE/Saudi Arabia), and 5 to 7 hours overlap with Asia-Pacific (Singapore, Malaysia, Australia) via Slack, Microsoft Teams, and Google Meet.'
  },
  {
    question: 'What currencies and corporate payment rails are supported for international clients?',
    answer: 'Invoicing is settled in local or preferred reserve currencies including USD ($), GBP (£), EUR (€), AED (AED), SAR (SAR), SGD ($), and AUD ($) via international bank wire, Stripe corporate invoicing, Wise Business, or escrow-protected Upwork Enterprise contracts.'
  },
  {
    question: 'How is data sovereignty and statutory privacy compliance guaranteed across jurisdictions?',
    answer: 'Every architecture is tailored to local regulatory mandates: European/German systems enforce EU GDPR and German BDSG with EU-only vector storage; US systems satisfy CCPA/SOC-2; GCC systems comply with UAE PDPL and Saudi ZATCA Phase 2; and APAC platforms adhere strictly to Singapore PDPA and Malaysia PDPA 2010.'
  },
  {
    question: 'Are you available for on-site deployment and relocation opportunities in the Middle East?',
    answer: 'Yes. In addition to remote retained engineering, Sheharyar Siraj is available for on-site consulting sprints, corporate workshops, and relocation opportunities for qualified technology firms and agencies in Dubai (UAE) and Riyadh (Saudi Arabia).'
  }
];

export const LocationsHubPage: React.FC<LocationsHubPageProps> = ({ onOpenInquiry }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'americas' | 'europe' | 'gcc' | 'apac'>('all');
  const locationKeys = Object.keys(REGIONAL_LOCATIONS);
  const hubSchema = generateSchemaGraph('/locations/');

  const REGIONS_MAP: Record<string, { label: string; filter: 'americas' | 'europe' | 'gcc' | 'apac' }> = {
    usa: { label: 'Americas', filter: 'americas' },
    canada: { label: 'Americas', filter: 'americas' },
    uk: { label: 'Europe', filter: 'europe' },
    germany: { label: 'Europe', filter: 'europe' },
    netherlands: { label: 'Europe', filter: 'europe' },
    uae: { label: 'GCC / Middle East', filter: 'gcc' },
    'saudi-arabia': { label: 'GCC / Middle East', filter: 'gcc' },
    singapore: { label: 'Asia-Pacific', filter: 'apac' },
    malaysia: { label: 'Asia-Pacific', filter: 'apac' },
    australia: { label: 'Asia-Pacific', filter: 'apac' },
  };

  const filteredKeys = locationKeys.filter((key) => {
    if (selectedFilter === 'all') return true;
    return REGIONS_MAP[key]?.filter === selectedFilter;
  });

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <SEOHead
        title="Global Engineering Hubs & Locations | Sheharyar Siraj"
        description="Systems architecture hubs across the US, UK, Germany, Canada, UAE, Saudi Arabia, Singapore, Malaysia, Australia, and Netherlands with timezone overlap."
        canonicalUrl="https://sheharyarsiraj.com/locations/"
        schema={hubSchema}
      />

      <Breadcrumbs items={[{ label: 'LOCATIONS HUB' }]} />

      {/* Header section */}
      <div className="mt-8 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
          <Globe size={14} />
          <span>GLOBAL ENTERPRISE ARCHITECTURE TAXONOMY</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
          Global Locations & <span className="text-accent">Regional Engineering Hub</span>
        </h1>
        <p className="text-brand-secondary text-base sm:text-xl max-w-3xl leading-relaxed font-body">
          Delivering high-performance custom WordPress systems, sub-600ms AI voice agents, and autonomous n8n workflows for mid-market enterprises and digital agencies across <strong className="text-white">10 primary international territories</strong> with localized regulatory compliance, extensive timezone overlap, and multi-currency billing.
        </p>
      </div>

      {/* AEO Direct Answer Block */}
      <AeoDirectAnswer
        summary="Sheharyar Siraj provides enterprise digital architecture and AI automation engineering across North America, Europe, the GCC, and Asia-Pacific, delivering dedicated business hours overlap, local statutory compliance (GDPR, CCPA, PDPA, ZATCA), multi-currency settlement, and 100% remote reliability across 1,200+ worldwide deployments."
        keyTakeaways={[
          'Extensive real-time collaboration overlap with US (EST/PST), UK (GMT), Europe (CET), GCC (GST), and APAC (SGT/AEST).',
          'Rigorous compliance with statutory privacy frameworks: EU GDPR/BDSG, CCPA, Singapore PDPA, and Saudi ZATCA Phase 2.',
          'Multi-currency invoicing settled in USD, GBP, EUR, AED, SAR, SGD, or AUD via Wire, Stripe, and Upwork Enterprise.',
          'Available for remote strategic engineering retainers and on-site corporate consulting in Dubai and Riyadh.'
        ]}
      />

      {/* Filter Tabs */}
      <div className="my-10 flex flex-wrap items-center gap-2 border-b border-brand-border/40 pb-4">
        {[
          { key: 'all', label: 'All Global Territories (10)' },
          { key: 'americas', label: 'Americas (US & Canada)' },
          { key: 'europe', label: 'Europe (UK, Germany, Netherlands)' },
          { key: 'gcc', label: 'GCC / Middle East (UAE & Saudi Arabia)' },
          { key: 'apac', label: 'Asia-Pacific (Singapore, Malaysia, Australia)' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedFilter(tab.key as any)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all ${
              selectedFilter === tab.key
                ? 'bg-accent text-black font-bold shadow-[0_0_12px_rgba(183,255,60,0.3)]'
                : 'bg-surface-1 text-brand-secondary hover:text-white border border-brand-border/60 hover:border-accent/40'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Locations Grid with H2 + Content Capsule */}
      <section className="my-12">
        <div className="mb-8">
          <span className="text-xs font-mono text-accent tracking-widest uppercase block mb-1">
            LOCALIZED TECHNICAL CAPABILITIES
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
            Which international territories does Sheharyar Siraj engineer digital architectures for?
          </h2>
          <p className="content-capsule text-sm sm:text-base text-white/95 font-medium leading-relaxed p-4 rounded-xl bg-accent/[0.04] border border-accent/20">
            Sheharyar Siraj delivers specialized technical architectures across ten commercial regions spanning the United States, United Kingdom, Canada, United Arab Emirates, Saudi Arabia, Germany, Singapore, Malaysia, Australia, and the Netherlands, pairing deep custom WordPress VIP engineering with sub-600ms AI automation pipelines tailored to local market regulations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredKeys.map((key) => {
            const loc = REGIONAL_LOCATIONS[key];
            if (!loc) return null;
            return (
              <div
                key={loc.slug}
                className="glass-panel rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-brand-border/60 hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="text-3xl">{loc.flag}</span>
                      <div>
                        <h3 className="font-heading text-lg font-bold text-white group-hover:text-accent transition-colors">
                          {loc.country}
                        </h3>
                        <span className="text-[10px] font-mono text-brand-muted">
                          {REGIONS_MAP[loc.slug]?.label || loc.badge}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-surface-2 border border-brand-border text-accent">
                      {loc.regionCode}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-secondary line-clamp-3 mb-5 leading-relaxed font-body">
                    {loc.metaDescription}
                  </p>

                  <div className="space-y-2 mb-6 pt-4 border-t border-brand-border/30">
                    <div className="flex items-center gap-2 text-xs font-mono text-brand-secondary">
                      <Clock size={13} className="text-accent shrink-0" />
                      <span className="truncate">{loc.timezoneOverlap}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-brand-secondary">
                      <ShieldCheck size={13} className="text-emerald-400 shrink-0" />
                      <span className="truncate">{loc.regulatoryCompliance[0]}</span>
                    </div>
                  </div>
                </div>

                <Link
                  to={`/locations/${loc.slug}/`}
                  className="w-full py-2.5 px-4 rounded-xl bg-surface-2 group-hover:bg-accent group-hover:text-black border border-brand-border/80 group-hover:border-accent font-mono text-xs font-bold transition-all flex items-center justify-between"
                >
                  <span>EXPLORE REGIONAL ARCHITECTURE</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Global Delivery Architecture Grid */}
      <section className="my-20 p-8 sm:p-10 rounded-2xl glass-panel border border-brand-border/60 bg-gradient-to-br from-surface-1/90 via-surface-2/60 to-surface-1/80">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-mono text-accent tracking-widest uppercase block mb-1">
            ENTERPRISE GLOBAL DELIVERY SLA
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2">
            Engineered for High-Reliability International Engagements
          </h2>
          <p className="text-xs sm:text-sm text-brand-secondary font-body">
            How we maintain flawless standards across 10 global territories simultaneously.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-xl bg-surface-2/70 border border-brand-border/50">
            <div className="font-mono text-accent text-sm font-bold mb-1">01 / TIMEZONE SYNCHRONIZATION</div>
            <p className="text-xs text-brand-secondary leading-relaxed">
              4 to 7 hours of daily live overlap with US, UK, European, GCC, and APAC corporate hours for agile standups and real-time sprint execution.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-surface-2/70 border border-brand-border/50">
            <div className="font-mono text-accent text-sm font-bold mb-1">02 / EDGE-CACHED PERFORMANCE</div>
            <p className="text-xs text-brand-secondary leading-relaxed">
              Global CDN edge deployment via Cloudflare and AWS regional nodes, ensuring sub-500ms TTFB regardless of end-user geographic location.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-surface-2/70 border border-brand-border/50">
            <div className="font-mono text-accent text-sm font-bold mb-1">03 / MULTI-CURRENCY SETTLEMENT</div>
            <p className="text-xs text-brand-secondary leading-relaxed">
              Transparent invoicing settled in USD, GBP, EUR, AED, SAR, SGD, or AUD via Stripe corporate payments, SEPA, Wire, and Upwork Enterprise.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-surface-2/70 border border-brand-border/50">
            <div className="font-mono text-accent text-sm font-bold mb-1">04 / STATUTORY DATA PROTECTION</div>
            <p className="text-xs text-brand-secondary leading-relaxed">
              Strict privacy-by-design architectures satisfying EU GDPR, German BDSG, US CCPA, Singapore PDPA, and Saudi ZATCA standards.
            </p>
          </div>
        </div>
      </section>

      {/* Centered Hub FAQs with H2 + Content Capsule */}
      <section className="my-20 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-mono text-accent tracking-widest uppercase inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-3">
            VERIFIED DIRECT ANSWERS
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
            What are the most frequent questions regarding Sheharyar Siraj global delivery and international engagements?
          </h2>
          <p className="content-capsule text-sm sm:text-base text-white/95 font-medium leading-relaxed max-w-3xl mx-auto p-4 rounded-xl bg-accent/[0.04] border border-accent/20 text-left">
            Sheharyar Siraj answers enterprise inquiries regarding real-time international timezone overlap, multi-currency corporate invoicing, statutory privacy compliance across global jurisdictions, and remote versus on-site consulting terms for organizations in North America, Europe, the Middle East, and Asia-Pacific.
          </p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {LOCATIONS_HUB_FAQS.map((faq, index) => {
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

      {/* Bottom CTA */}
      <div className="text-center pt-8 border-t border-brand-border/40">
        <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-3">
          Expanding Your Digital Infrastructure Internationally?
        </h3>
        <p className="text-xs sm:text-sm text-brand-secondary max-w-lg mx-auto mb-6">
          Schedule an international technical architecture scoping session with Sheharyar Siraj. Direct access, zero account manager bureaucracy.
        </p>
        <button
          onClick={onOpenInquiry}
          type="button"
          className="px-8 py-3.5 rounded-full bg-accent text-black font-mono text-xs font-bold tracking-wider hover:bg-white transition-all shadow-[0_0_25px_rgba(183,255,60,0.3)] inline-flex items-center gap-2"
        >
          <span>INITIATE GLOBAL PROJECT INQUIRY</span>
          <ArrowUpRight size={15} />
        </button>
      </div>
    </div>
  );
};
