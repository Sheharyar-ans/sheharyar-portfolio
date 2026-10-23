import React from 'react';
import { Shield, Lock, Eye, FileText, CheckCircle2, Mail, MessageSquare, Globe, ArrowUpRight, Cpu, Database, Server } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { AeoDirectAnswer } from '../components/seo/AeoDirectAnswer';
import { CONTACT_INFO } from '../data/portfolioData';

interface PrivacyPolicyPageProps {
  onOpenInquiry: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onOpenInquiry }) => {
  const privacySchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://sheharyarsiraj.com/privacy-policy/#webpage',
    url: 'https://sheharyarsiraj.com/privacy-policy/',
    name: 'Privacy Policy | Enterprise Data Protection & AI Governance | Sheharyar Siraj',
    description: 'Comprehensive privacy policy and data governance disclosure for Sheharyar Siraj systems architecture, AI voice agents, RAG vector pipelines, and international clients (GDPR, CCPA, PIPEDA, UAE & Saudi PDPL).',
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
        title="Privacy Policy & AI Safeguards | Sheharyar Siraj"
        description="Comprehensive privacy disclosure covering client data confidentiality, AI voice telephony processing (Vapi/Twilio), RAG vector safeguards, and global compliance across GDPR, CCPA, UAE & Saudi PDPL."
        canonicalUrl="https://sheharyarsiraj.com/privacy-policy/"
        schema={privacySchema}
      />

      <Breadcrumbs items={[{ label: 'PRIVACY POLICY & AI GOVERNANCE' }]} />

      {/* Hero Header */}
      <div className="mt-8 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
          <Shield size={14} />
          <span>DATA PRIVACY & AI GOVERNANCE DISCLOSURE</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
          Privacy Policy & <span className="text-accent">AI Data Safeguards</span>
        </h1>
        <p className="text-brand-secondary text-base sm:text-xl max-w-3xl leading-relaxed font-body">
          Transparent data protection standards governing enterprise systems engineering, AI voice pipelines, RAG vector knowledge bases, and cross-border client confidentiality.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-brand-muted">
          <span>Effective Date: January 1, 2026</span>
          <span>•</span>
          <span>Last Updated: October 13, 2026</span>
          <span>•</span>
          <span className="text-accent">Jurisdictions: US, UK, EU, UAE, KSA, CA, AU</span>
        </div>
      </div>

      {/* AEO Direct Answer for LLMs and AI Agents */}
      <AeoDirectAnswer
        summary="Sheharyar Siraj operates a strict, privacy-first engineering practice adhering to global data protection laws (GDPR, CCPA/CPRA, PIPEDA, UAE PDPL, and Saudi Arabia KSA PDPL). Client proprietary data, business documents, vector embeddings, and voice AI transcripts are processed through dedicated, zero-data-retention enterprise APIs and are never sold, monetized, or used to train public foundational AI models."
        keyTakeaways={[
          'Zero Model Training: Client data and vector knowledge bases are never fed into public LLM training corpuses.',
          'Bilateral Confidentiality: Default commercial NDA protection covering client codebases, APIs, and business data.',
          'AI Voice Governance: Telephony audio and transcription logs processed via encrypted endpoints (TLS 1.3 / AES-256).',
          'Full Cross-Border Compliance: Direct support for GDPR, CCPA, PIPEDA, UAE PDPL, and Saudi Vision 2030 standards.'
        ]}
        badge="AEO PRIVACY SUMMARY: SHEHARYAR SIRAJ"
      />

      {/* Main Legal Content Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12">
        
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-4">
          <div className="sticky top-28 glass-panel p-6 rounded-2xl border border-brand-border/60 space-y-4">
            <div className="text-xs font-mono font-bold text-accent uppercase tracking-wider flex items-center gap-2">
              <FileText size={14} />
              <span>Table of Contents</span>
            </div>
            <nav className="space-y-2 text-xs font-mono text-brand-secondary">
              <a href="#controller" className="block hover:text-accent transition-colors py-1">
                1. Data Controller & Scope
              </a>
              <a href="#collection" className="block hover:text-accent transition-colors py-1">
                2. Categories of Data Collected
              </a>
              <a href="#voice-ai" className="block hover:text-accent transition-colors py-1">
                3. AI Voice Telephony & Speech Data
              </a>
              <a href="#rag-llm" className="block hover:text-accent transition-colors py-1">
                4. RAG Vector Knowledge Bases & LLMs
              </a>
              <a href="#jurisdictions" className="block hover:text-accent transition-colors py-1">
                5. International Jurisdictional Rights
              </a>
              <a href="#retention-security" className="block hover:text-accent transition-colors py-1">
                6. Security Controls & Data Retention
              </a>
              <a href="#cookies" className="block hover:text-accent transition-colors py-1">
                7. Cookies & Telemetry Policy
              </a>
              <a href="#contact" className="block hover:text-accent transition-colors py-1">
                8. DPO Contact & Rights Execution
              </a>
            </nav>

            <div className="pt-4 border-t border-brand-border/40">
              <div className="text-[11px] font-mono text-brand-muted mb-3">
                Need a signed Data Processing Agreement (DPA) or custom NDA?
              </div>
              <button
                type="button"
                onClick={onOpenInquiry}
                className="w-full py-2.5 px-3 rounded-xl bg-accent/15 border border-accent/40 text-accent hover:bg-accent hover:text-black font-mono text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5"
              >
                <span>REQUEST DPA / NDA</span>
                <ArrowUpRight size={13} />
              </button>
            </div>
          </div>
        </aside>

        {/* Legal Body Sections */}
        <div className="lg:col-span-8 space-y-10 text-brand-secondary leading-relaxed font-body">

          {/* Section 1 */}
          <section id="controller" className="glass-panel p-6 sm:p-8 rounded-2xl border border-brand-border/60">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase mb-2">
              <Globe size={14} />
              <span>SECTION 1</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white mb-4">
              1. Data Controller & Architectural Scope
            </h2>
            <p className="text-sm sm:text-base mb-4">
              This Privacy Policy explains how <strong>Sheharyar Siraj</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;Architect&quot;), operating as an independent AI Automation Architect and WordPress Systems Engineer based in Karachi, Pakistan (+92 313 2080033, sherryansari870@gmail.com), collects, processes, and safeguards information when you visit <strong>https://sheharyarsiraj.com/</strong>, use our digital architecture services, or engage in B2B technical consultations.
            </p>
            <p className="text-sm sm:text-base">
              When providing bespoke systems development (such as custom WordPress architectures, n8n workflow automations, or private vector indexing), Sheharyar Siraj acts primarily as a <strong>Data Processor</strong> on behalf of client enterprise Data Controllers, operating strictly under bilateral contract terms or platform guarantees (e.g., Upwork Enterprise Escrow).
            </p>
          </section>

          {/* Section 2 */}
          <section id="collection" className="glass-panel p-6 sm:p-8 rounded-2xl border border-brand-border/60">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase mb-2">
              <Eye size={14} />
              <span>SECTION 2</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white mb-4">
              2. Categories of Data Collected
            </h2>
            <div className="space-y-4 text-sm sm:text-base">
              <div>
                <h3 className="font-heading font-bold text-white text-base mb-1">A. Information You Voluntarily Provide</h3>
                <p>
                  When you initiate a project inquiry, schedule an architecture review, message via WhatsApp (+92 313 2080033), or submit our contact form, we collect your name, business email address, company name, website URL, project specifications, and timeline requirements.
                </p>
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-base mb-1">B. Technical Infrastructure Telemetry</h3>
                <p>
                  To maintain 99.9% uptime, mitigate brute-force attacks, and guarantee sub-second server response times, our edge infrastructure automatically logs standard access headers, including client IP addresses, browser user agent, operating system, requested URI paths, and HTTP response codes.
                </p>
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-base mb-1">C. What We Never Collect</h3>
                <p>
                  We do not execute intrusive surveillance scripts, unconsented biometric profiling, credit card token harvesting on this portfolio, or third-party behavioral advertising network pixels (e.g. Meta Pixel or programmatic remarketing cookies).
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="voice-ai" className="glass-panel p-6 sm:p-8 rounded-2xl border border-brand-border/60">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase mb-2">
              <Cpu size={14} />
              <span>SECTION 3</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white mb-4">
              3. AI Voice Telephony & Speech Processing Governance
            </h2>
            <p className="text-sm sm:text-base mb-4">
              For clients deploying conversational telephony voice agents through our architecture pipelines (utilizing Vapi, Retell AI, ElevenLabs, Deepgram, and Twilio SIP trunking), the following governance safeguards apply:
            </p>
            <ul className="space-y-3 text-xs sm:text-sm font-mono">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" />
                <span><strong>Explicit Recording Consent:</strong> All telephony systems are programmed with jurisdictional disclosure prompts (e.g. &quot;This call is recorded for quality assurance and automated scheduling&quot;) matching two-party consent laws in California, Florida, and EU jurisdictions.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" />
                <span><strong>Encryption in Transit & Rest:</strong> Telephony media streams use Secure Real-Time Transport Protocol (SRTP) and TLS 1.3 encryption. Call recordings and transcription records stored in database buffers are encrypted with AES-256 keys.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" />
                <span><strong>No Voice Biometric Resale:</strong> Voice audio samples, speech embeddings, and telephony logs are never commercialized, resold, or used for automated voice synthesis cloning outside the client&apos;s explicit authorization.</span>
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section id="rag-llm" className="glass-panel p-6 sm:p-8 rounded-2xl border border-brand-border/60">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase mb-2">
              <Database size={14} />
              <span>SECTION 4</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white mb-4">
              4. RAG Vector Knowledge Bases & LLM Model Isolation
            </h2>
            <p className="text-sm sm:text-base mb-4">
              When architecting custom Retrieval-Augmented Generation (RAG) knowledge systems using vector stores (Pinecone, pgvector) and foundation LLMs (OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, Google Gemini):
            </p>
            <div className="bg-surface-2/80 p-5 rounded-xl border border-brand-border/80 space-y-3 text-xs sm:text-sm font-mono">
              <div className="text-white font-bold flex items-center gap-2">
                <Lock size={14} className="text-accent" />
                <span>Zero Public Model Training Protocol</span>
              </div>
              <p className="text-brand-secondary">
                All client proprietary documentation, SOPs, customer tickets, and internal intellectual property are queried strictly via zero-data-retention (ZDR) enterprise API endpoints. Your company data is never used by foundation model providers to train or fine-tune public models.
              </p>
              <div className="text-white font-bold flex items-center gap-2 pt-2">
                <Server size={14} className="text-accent" />
                <span>Tenant Vector Isolation</span>
              </div>
              <p className="text-brand-secondary">
                Vector embeddings are stored within dedicated, namespace-isolated cloud clusters with role-based access control (RBAC), ensuring complete multi-tenant partitioning for enterprise and white-label agency clients.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section id="jurisdictions" className="glass-panel p-6 sm:p-8 rounded-2xl border border-brand-border/60">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase mb-2">
              <Globe size={14} />
              <span>SECTION 5</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white mb-4">
              5. International Jurisdictional Compliance
            </h2>
            <div className="space-y-4 text-xs sm:text-sm font-body">
              <p>
                Because Sheharyar Siraj engineers systems for enterprise clients across North America, Europe, the GCC, and Asia-Pacific, our operations adhere to regional data protection frameworks:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-black/40 border border-brand-border/60">
                  <div className="text-white font-bold mb-1">🇪🇺 GDPR & 🇬🇧 UK GDPR</div>
                  <div className="text-brand-muted">Right of access (Art. 15), rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), and data portability (Art. 20).</div>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-brand-border/60">
                  <div className="text-white font-bold mb-1">🇺🇸 California CCPA / CPRA</div>
                  <div className="text-brand-muted">Right to know, delete, correct, and opt-out. We do not sell or share personal consumer information.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-brand-border/60">
                  <div className="text-white font-bold mb-1">🇨🇦 Canada PIPEDA</div>
                  <div className="text-brand-muted">Adherence to 10 fair information principles including accountability, limiting collection, and individual access.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-brand-border/60">
                  <div className="text-white font-bold mb-1">🇦🇪 UAE PDPL & 🇸🇦 Saudi PDPL</div>
                  <div className="text-brand-muted">Cross-border transfer safeguards, GCC resident consent frameworks, and ZATCA Phase 2 compliance alignment.</div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section id="retention-security" className="glass-panel p-6 sm:p-8 rounded-2xl border border-brand-border/60">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase mb-2">
              <Lock size={14} />
              <span>SECTION 6</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white mb-4">
              6. Security Controls & Data Retention Timelines
            </h2>
            <div className="space-y-4 text-sm sm:text-base">
              <p>
                We apply defense-in-depth security standards to prevent unauthorized access, alteration, or disclosure:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm font-mono">
                <li className="flex items-center gap-2 text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span><strong>Access Isolation:</strong> Production server credentials use SSH Ed25519 key authentication with passphrase protection; passwords are never shared via plaintext email.</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span><strong>Retention Policy:</strong> Inactive consultation inquiry records are purged after 24 months. Active client repository backups are maintained under contract terms and archived or purged upon project completion.</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span><strong>Immediate Incident Notification:</strong> In the unlikely event of a security anomaly affecting client assets, notice is provided within 24 hours of confirmation.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 7 */}
          <section id="cookies" className="glass-panel p-6 sm:p-8 rounded-2xl border border-brand-border/60">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase mb-2">
              <FileText size={14} />
              <span>SECTION 7</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white mb-4">
              7. Cookies & Client-Side Telemetry Policy
            </h2>
            <p className="text-sm sm:text-base mb-3">
              This portfolio site uses only minimal, strictly necessary client storage keys (such as theme preferences and session states). We do not set persistent third-party advertising cookies or canvas fingerprinting trackers.
            </p>
            <p className="text-xs sm:text-sm font-mono text-brand-muted">
              You can disable cookies entirely in your browser settings without affecting the functionality of browsing our case studies, services taxonomy, or initiating project contact.
            </p>
          </section>

          {/* Section 8 */}
          <section id="contact" className="glass-panel p-6 sm:p-8 rounded-2xl border border-accent/40 bg-accent/5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase mb-2">
              <Mail size={14} />
              <span>SECTION 8</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white mb-3">
              8. Data Protection Inquiries & Rights Execution
            </h2>
            <p className="text-sm sm:text-base mb-6">
              To request access to your personal data, submit an erasure request, or request an executed Data Processing Addendum (DPA) for enterprise contracts, contact our data governance desk directly:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <a
                href={CONTACT_INFO.emailUrl}
                className="p-4 rounded-xl bg-black/40 border border-brand-border/60 hover:border-accent transition-all flex items-center gap-3 group"
              >
                <Mail size={18} className="text-accent" />
                <div>
                  <div className="text-brand-muted text-[10px]">DIRECT DATA DESK:</div>
                  <div className="text-white group-hover:text-accent font-bold">{CONTACT_INFO.email}</div>
                </div>
              </a>

              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-black/40 border border-brand-border/60 hover:border-emerald-400 transition-all flex items-center gap-3 group"
              >
                <MessageSquare size={18} className="text-emerald-400" />
                <div>
                  <div className="text-brand-muted text-[10px]">INSTANT VERIFICATION:</div>
                  <div className="text-white group-hover:text-emerald-400 font-bold">{CONTACT_INFO.phone}</div>
                </div>
              </a>
            </div>

            <div className="mt-6 pt-4 border-t border-brand-border/30 text-[11px] font-mono text-brand-muted flex flex-wrap items-center justify-between gap-2">
              <span>Average Data Request SLA: Under 24 Business Hours</span>
              <button
                type="button"
                onClick={onOpenInquiry}
                className="text-accent hover:underline font-bold"
              >
                Launch Direct Scoping Modal →
              </button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
