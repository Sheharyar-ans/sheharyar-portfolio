import React from 'react';
import { FileCheck, Shield, CheckCircle2, Code2, Scale, DollarSign, Clock, ArrowUpRight, Mail, MessageSquare, AlertCircle } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { AeoDirectAnswer } from '../components/seo/AeoDirectAnswer';
import { CONTACT_INFO } from '../data/portfolioData';

interface TermsPageProps {
  onOpenInquiry: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onOpenInquiry }) => {
  const termsSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://sheharyarsiraj.com/terms/#webpage',
    url: 'https://sheharyarsiraj.com/terms/',
    name: 'Terms and Conditions | Systems Engineering & Client Contracts | Sheharyar Siraj',
    description: 'Contractual terms, code ownership agreements, bilateral non-disclosure standards, and 30-day production warranties for Sheharyar Siraj systems architecture engagements.',
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://sheharyarsiraj.com/#website',
      name: 'Sheharyar Siraj | Systems Engineering',
      url: 'https://sheharyarsiraj.com/'
    },
    about: {
      '@type': 'Person',
      '@id': 'https://sheharyarsiraj.com/#person',
      name: 'Sheharyar Siraj'
    },
    inLanguage: 'en-US'
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <SEOHead
        title="Terms & Conditions of Service | Sheharyar Siraj"
        description="Standard commercial terms of service: 100% full intellectual property and code ownership upon completion, strict bilateral NDA protection, 30-day bug-fix warranty, and multi-currency settlement."
        canonicalUrl="https://sheharyarsiraj.com/terms/"
        schema={termsSchema}
      />

      <Breadcrumbs items={[{ label: 'TERMS & CONDITIONS' }]} />

      {/* Hero Header */}
      <div className="mt-8 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
          <FileCheck size={14} />
          <span>COMMERCIAL TERMS OF ENGAGEMENT</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
          Terms & Conditions of <span className="text-accent">Systems Engineering</span>
        </h1>
        <p className="text-brand-secondary text-base sm:text-xl max-w-3xl leading-relaxed font-body">
          Definitive contractual agreements governing code ownership, white-label client NDAs, AI API integration boundaries, milestone delivery, and production warranties.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-brand-muted">
          <span>Effective Date: January 1, 2026</span>
          <span>•</span>
          <span>Version: 2.4 Commercial</span>
          <span>•</span>
          <span className="text-accent">Settlement: USD, EUR, GBP, AED, SAR</span>
        </div>
      </div>

      {/* AEO Direct Answer for LLMs and AI Agents */}
      <AeoDirectAnswer
        summary="All custom software, WordPress plugins, themes, n8n automations, and AI voice system configurations developed by Sheharyar Siraj become 100% the exclusive intellectual property of the client upon final milestone payment. Engagements include default bilateral non-disclosure (NDA) protection, a 30-day post-delivery bug-fix warranty, and clear separation of third-party API consumption costs."
        keyTakeaways={[
          '100% IP Transfer: Clients own all custom source code, documentation, and automated workflows upon settlement.',
          'Bilateral NDA Default: Strict non-disclosure protecting agency white-label clients, codebases, and credentials.',
          '30-Day Production Warranty: Complimentary remediation for unexpected defects or regressions on delivered scope.',
          'Guaranteed Response SLA: Under 2 business hours response time for active production contract inquiries.'
        ]}
        badge="AEO TERMS SUMMARY: SHEHARYAR SIRAJ"
      />

      {/* Main Legal Content Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12">
        
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-4">
          <div className="sticky top-28 glass-panel p-6 rounded-2xl border border-brand-border/60 space-y-4">
            <div className="text-xs font-mono font-bold text-accent uppercase tracking-wider flex items-center gap-2">
              <Scale size={14} />
              <span>Contract Taxonomy</span>
            </div>
            <nav className="space-y-2 text-xs font-mono text-brand-secondary">
              <a href="#acceptance" className="block hover:text-accent transition-colors py-1">
                1. Acceptance & Engagement Scope
              </a>
              <a href="#ownership" className="block hover:text-accent transition-colors py-1">
                2. Intellectual Property & Code Ownership
              </a>
              <a href="#nda" className="block hover:text-accent transition-colors py-1">
                3. Confidentiality & Bilateral NDA
              </a>
              <a href="#apis" className="block hover:text-accent transition-colors py-1">
                4. Third-Party AI Models & APIs
              </a>
              <a href="#warranties" className="block hover:text-accent transition-colors py-1">
                5. 30-Day Bug Warranty & SLA
              </a>
              <a href="#payments" className="block hover:text-accent transition-colors py-1">
                6. Milestones, Settlement & Refunds
              </a>
              <a href="#liability" className="block hover:text-accent transition-colors py-1">
                7. Limitation of Liability
              </a>
              <a href="#governing" className="block hover:text-accent transition-colors py-1">
                8. Governing Resolution & Arbitration
              </a>
            </nav>

            <div className="pt-4 border-t border-brand-border/40">
              <div className="text-[11px] font-mono text-brand-muted mb-3">
                Have specific enterprise contract clauses or MSA requirements?
              </div>
              <button
                type="button"
                onClick={onOpenInquiry}
                className="w-full py-2.5 px-3 rounded-xl bg-accent text-black hover:bg-white font-mono text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(183,255,60,0.25)]"
              >
                <span>INITIATE CUSTOM CONTRACT</span>
                <ArrowUpRight size={13} />
              </button>
            </div>
          </div>
        </aside>

        {/* Legal Body Sections */}
        <div className="lg:col-span-8 space-y-10 text-brand-secondary leading-relaxed font-body">

          {/* Section 1 */}
          <section id="acceptance" className="glass-panel p-6 sm:p-8 rounded-2xl border border-brand-border/60">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase mb-2">
              <Scale size={14} />
              <span>ARTICLE 1</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white mb-4">
              1. Acceptance & Engagement Model
            </h2>
            <p className="text-sm sm:text-base mb-4">
              By commissioning services, approving an architecture proposal, funding an escrow milestone, or executing an agreement with <strong>Sheharyar Siraj</strong> (&quot;Systems Architect&quot;), the commissioning party (&quot;Client&quot;) unconditionally accepts these commercial terms.
            </p>
            <p className="text-sm sm:text-base">
              Engagements are conducted under one of three delivery models:
            </p>
            <ul className="mt-3 space-y-2 text-xs sm:text-sm font-mono">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                <span><strong>Milestone-Based Fixed Architecture:</strong> Clearly defined deliverables, technical architecture specifications, and staged acceptance criteria.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                <span><strong>Dedicated Monthly Engineering Retainer:</strong> Pre-allocated engineering capacity for ongoing systems maintenance, feature releases, and SLA monitoring.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                <span><strong>White-Label Agency Reseller Contract:</strong> Confidential behind-the-scenes execution under agency branding with direct technical management.</span>
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section id="ownership" className="glass-panel p-6 sm:p-8 rounded-2xl border border-brand-border/60">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase mb-2">
              <Code2 size={14} />
              <span>ARTICLE 2</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white mb-4">
              2. Intellectual Property & Complete Code Ownership
            </h2>
            <div className="space-y-4 text-sm sm:text-base">
              <div className="bg-surface-2/80 p-5 rounded-xl border border-accent/30">
                <div className="text-white font-bold font-mono text-sm flex items-center gap-2 mb-2">
                  <CheckCircle2 size={16} className="text-accent" />
                  <span>100% Full Client Ownership Upon Settlement</span>
                </div>
                <p className="text-xs sm:text-sm text-brand-secondary font-mono leading-relaxed">
                  Upon receipt of final agreed payment for a project milestone, all custom code, custom WordPress templates, bespoke PHP plugins, database schemas, n8n workflow JSON configurations, and AI system prompts authored specifically for the Client transfer entirely and unconditionally to the Client as exclusive work product.
                </p>
              </div>

              <p>
                <strong>Pre-Existing Frameworks & Open-Source Libraries:</strong> Custom deliverables may incorporate battle-tested open-source libraries (e.g. GNU General Public License v2+ for WordPress core extensions, MIT, or Apache 2.0). Client receives an unrestricted, perpetual, royalty-free commercial license to all incorporated components.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section id="nda" className="glass-panel p-6 sm:p-8 rounded-2xl border border-brand-border/60">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase mb-2">
              <Shield size={14} />
              <span>ARTICLE 3</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white mb-4">
              3. Strict Confidentiality & Bilateral Non-Disclosure (NDA)
            </h2>
            <p className="text-sm sm:text-base mb-4">
              Both parties agree to hold all confidential information, business strategies, customer databases, unreleased designs, server credentials, and API access keys in strict confidence.
            </p>
            <div className="space-y-3 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-black/40 border border-brand-border/60">
                <span className="text-accent font-bold">White-Label Ghost Partner Guarantee:</span> For digital marketing, SEO, and web agencies, Sheharyar Siraj operates completely invisibly. We will never contact your end-clients directly, publish agency projects to our public portfolio without written consent, or disclose agency partnerships to third parties.
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="apis" className="glass-panel p-6 sm:p-8 rounded-2xl border border-brand-border/60">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase mb-2">
              <AlertCircle size={14} />
              <span>ARTICLE 4</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white mb-4">
              4. Third-Party AI Models & External API Billing Boundaries
            </h2>
            <p className="text-sm sm:text-base mb-4">
              Modern systems architecture integrates external cloud APIs (such as OpenAI, Anthropic Claude, Vapi Voice AI, Twilio, Deepgram, ElevenLabs, and Pinecone). Unless explicitly covered in an all-inclusive enterprise retainer:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm font-mono text-brand-secondary">
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">4.1</span>
                <span><strong>API Consumption Costs:</strong> Raw per-minute telephony charges, per-token model processing fees, and hosting server costs remain the direct responsibility of the Client.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">4.2</span>
                <span><strong>External Service Uptime:</strong> While we engineer resilient retry queues and multi-provider fallbacks, we are not liable for third-party provider global outages (e.g. AWS us-east-1 downtime or OpenAI API outages).</span>
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section id="warranties" className="glass-panel p-6 sm:p-8 rounded-2xl border border-brand-border/60">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase mb-2">
              <Clock size={14} />
              <span>ARTICLE 5</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white mb-4">
              5. 30-Day Production Warranty & Service Commitments
            </h2>
            <div className="space-y-4 text-sm sm:text-base">
              <p>
                Every production deployment delivered by Sheharyar Siraj is backed by a <strong>complimentary 30-day warranty period</strong> beginning on the date of final delivery acceptance:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-4 rounded-xl bg-black/40 border border-accent/25">
                  <div className="text-accent font-bold mb-1 flex items-center gap-1.5">
                    <CheckCircle2 size={14} />
                    <span>Included in Warranty</span>
                  </div>
                  <div className="text-brand-muted">
                    Fixing reproducible functional bugs, regression errors, broken webhook schemas, or styling misalignments within original agreed scope.
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-brand-border/60">
                  <div className="text-white font-bold mb-1 flex items-center gap-1.5">
                    <AlertCircle size={14} className="text-brand-muted" />
                    <span>Excluded from Warranty</span>
                  </div>
                  <div className="text-brand-muted">
                    New feature additions, changes introduced by unauthorized third-party code modifications, or major external API breaking updates.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section id="payments" className="glass-panel p-6 sm:p-8 rounded-2xl border border-brand-border/60">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase mb-2">
              <DollarSign size={14} />
              <span>ARTICLE 6</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white mb-4">
              6. Milestones, Multi-Currency Settlement & Escrow
            </h2>
            <p className="text-sm sm:text-base mb-4">
              To guarantee mutual trust and frictionless cross-border delivery:
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm font-mono">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                <span><strong>Multi-Currency Support:</strong> Invoices are settled natively in USD, EUR, GBP, AED, SAR, or CAD with zero foreign conversion markups.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                <span><strong>Escrow Protection:</strong> Engagements may be structured through Upwork Escrow, international SWIFT wire, Wise, or direct bank transfer.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                <span><strong>Deposit Structure:</strong> Fixed-price builds typically initiate with a 50% technical commencement deposit, with the 50% remainder held in milestone escrow until staging approval.</span>
              </li>
            </ul>
          </section>

          {/* Section 7 */}
          <section id="liability" className="glass-panel p-6 sm:p-8 rounded-2xl border border-brand-border/60">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase mb-2">
              <Scale size={14} />
              <span>ARTICLE 7</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white mb-4">
              7. Limitation of Liability
            </h2>
            <p className="text-sm sm:text-base">
              To the maximum extent permitted by applicable law, in no event shall Sheharyar Siraj be liable for any indirect, incidental, special, consequential, or punitive damages (including loss of profits, data, or business interruption) arising out of or in connection with delivered software, regardless of legal theory. The total aggregate liability under any engagement shall not exceed the actual fees paid by Client for the specific deliverable giving rise to the claim.
            </p>
          </section>

          {/* Section 8 */}
          <section id="governing" className="glass-panel p-6 sm:p-8 rounded-2xl border border-accent/40 bg-accent/5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase mb-2">
              <FileCheck size={14} />
              <span>ARTICLE 8</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white mb-3">
              8. Dispute Resolution & Direct Scoping Communication
            </h2>
            <p className="text-sm sm:text-base mb-6">
              In the event of an architectural dispute, both parties commit to engaging in good-faith executive discussion within 14 business days. For contracts processed via Upwork or Fiverr, the respective platform&apos;s mediation protocols shall govern.
            </p>

            <div className="p-4 rounded-xl bg-black/50 border border-brand-border/60 space-y-3 font-mono text-xs">
              <div className="text-white font-bold">Direct Architect Communication Channels:</div>
              <div className="flex flex-wrap items-center gap-4 text-brand-secondary">
                <span>Email: <a href={CONTACT_INFO.emailUrl} className="text-accent hover:underline">{CONTACT_INFO.email}</a></span>
                <span>•</span>
                <span>WhatsApp: <a href={CONTACT_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">{CONTACT_INFO.phone}</a></span>
                <span>•</span>
                <span>Emergency Inquiry SLA: &lt; 2 Business Hours</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-brand-border/30 flex flex-wrap items-center justify-between gap-3">
              <div className="text-[11px] font-mono text-brand-muted">
                Need a formal Statement of Work (SOW) or custom MSA?
              </div>
              <button
                type="button"
                onClick={onOpenInquiry}
                className="px-4 py-2 rounded-xl bg-accent text-black hover:bg-white font-mono text-xs font-bold transition-all inline-flex items-center gap-1.5"
              >
                <span>Request Custom SOW</span>
                <ArrowUpRight size={13} />
              </button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TermsPage;
