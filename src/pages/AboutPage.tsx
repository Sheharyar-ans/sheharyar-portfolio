import React from 'react';
import { 
  ArrowUpRight, 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  ExternalLink, 
  Briefcase, 
  Terminal, 
  Code2, 
  GraduationCap, 
  TrendingUp, 
  Sparkles, 
  Cpu, 
  Check, 
  Layers 
} from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { AeoDirectAnswer } from '../components/seo/AeoDirectAnswer';
import { 
  CONTACT_INFO, 
  METRICS, 
  TIMELINE, 
  CERTIFICATIONS, 
  EDUCATION, 
  REAL_RESULTS_DELIVERED, 
  TECH_CATEGORIES 
} from '../data/portfolioData';

interface AboutPageProps {
  onOpenInquiry: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenInquiry }) => {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': 'https://sheharyarsiraj.com/about/#profilepage',
    url: 'https://sheharyarsiraj.com/about/',
    name: 'About Sheharyar Siraj | Senior WordPress Developer & Agentic AI Automation Engineer',
    mainEntity: {
      '@type': 'Person',
      '@id': 'https://sheharyarsiraj.com/#person',
      name: 'Sheharyar Siraj',
      jobTitle: 'Senior WordPress Developer & Agentic AI Automation Engineer',
      email: 'sherryansari870@gmail.com',
      telephone: '+923132080033',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Karachi',
        addressRegion: 'Sindh',
        addressCountry: 'Pakistan'
      },
      sameAs: [
        'https://www.linkedin.com/in/sheharyar-siraj/',
        'https://www.upwork.com/freelancers/sheharyarsiraj',
        'https://www.fiverr.com/sellers/mr_shehary/'
      ],
      alumniOf: [
        {
          '@type': 'EducationalOrganization',
          name: 'Virtual University of Pakistan',
          url: 'https://www.vu.edu.pk/'
        },
        {
          '@type': 'EducationalOrganization',
          name: 'Sir Syed University of Engineering & Technology (SSUET)',
          url: 'https://www.ssuet.edu.pk/'
        }
      ],
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Cisco Certified Network Professional (CCNP)',
          credentialCategory: 'Professional Certification',
          recognizedBy: {
            '@type': 'Organization',
            name: 'Cisco Systems'
          }
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Networking Academy Learn-A-Thon 2022',
          credentialCategory: 'Professional Certification',
          recognizedBy: {
            '@type': 'Organization',
            name: 'Cisco Networking Academy'
          }
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'AI for App Building & Development Workflows',
          credentialCategory: 'Professional Certification'
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'AI for Data Analysis & Automation',
          credentialCategory: 'Professional Certification'
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'AI for Content Creation',
          credentialCategory: 'Professional Certification'
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Google Cloud Vertex AI Certified Specialist',
          credentialCategory: 'Professional Certification',
          recognizedBy: {
            '@type': 'Organization',
            name: 'Google Cloud',
            url: 'https://cloud.google.com/'
          }
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Anthropic AI Fluency & Prompt Engineering Certification',
          credentialCategory: 'Professional Certification',
          recognizedBy: {
            '@type': 'Organization',
            name: 'Anthropic',
            url: 'https://www.anthropic.com/'
          }
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Cisco Certified CyberOps Associate',
          credentialCategory: 'Professional Certification',
          recognizedBy: {
            '@type': 'Organization',
            name: 'Cisco Systems',
            url: 'https://www.cisco.com/'
          }
        }
      ],
      knowsAbout: [
        'Agentic AI Workflows & Autonomous Tool Calling',
        'Full-Stack Vibe Coding with LLMs',
        'WordPress VIP & Custom Theme Architecture',
        'WooCommerce Systems Engineering & Custom Gateways',
        'Elementor Pro Advanced Design Systems',
        'Conversational AI Voice Agents (Vapi, ElevenLabs, Retell AI)',
        'Vector Search & RAG Knowledge Bases (Pinecone)',
        'Event-Driven Workflow Automation (n8n, Make.com)',
        'Python Data Analytics Pipelines & Machine Learning',
        'Technical SEO, Core Web Vitals & JSON-LD Schemas',
        'WordPress Security Hardening & Malware Recovery'
      ]
    }
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <SEOHead
        title="About Sheharyar Siraj | Senior WordPress Developer & Agentic AI Engineer"
        description="Learn about Sheharyar Siraj: 5+ years remote experience, 1,200+ projects delivered worldwide, n8n automations, Vapi voice agents, Elementor Pro, and full-stack vibe coding."
        canonicalUrl="https://sheharyarsiraj.com/about/"
        schema={aboutSchema}
      />

      <Breadcrumbs items={[{ label: 'ABOUT & CREDENTIALS' }]} />

      {/* Hero Header */}
      <div className="mt-8 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
          <Award size={14} />
          <span>VERIFIED SENIOR ENGINEER & AGENTIC AI ARCHITECT</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
          About <span className="text-accent">Sheharyar Siraj</span>
        </h1>
        <p className="text-brand-secondary text-base sm:text-xl max-w-4xl leading-relaxed font-body">
          Senior WordPress Developer & Agentic AI Automation Engineer with over 5 years of commercial experience delivering 1,200+ high-converting websites, custom web applications, and automated workflows across the USA, UK, UAE, Saudi Arabia, Ireland, and Europe.
        </p>

        {/* Relocation & Status Banner */}
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-mono">
          <span className="px-3 py-1 rounded-md bg-accent/15 border border-accent/30 text-accent flex items-center gap-1.5 font-bold">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            OPEN TO FULL-TIME REMOTE & ON-SITE RELOCATION (UAE / KSA)
          </span>
          <span className="px-3 py-1 rounded-md bg-surface-2 border border-brand-border/60 text-white flex items-center gap-1.5">
            <MapPin size={13} className="text-accent" />
            Karachi West District, Sindh, Pakistan
          </span>
          <span className="px-3 py-1 rounded-md bg-surface-2 border border-brand-border/60 text-white flex items-center gap-1.5">
            <Briefcase size={13} className="text-accent" />
            White-Label Agency Retainers & Custom Projects
          </span>
        </div>
      </div>

      {/* AEO Direct Answer */}
      <AeoDirectAnswer
        summary="Sheharyar Siraj is a Senior WordPress Developer and Agentic AI Automation Engineer with 5+ years of remote experience and 1,200+ verified projects delivered worldwide across Upwork, direct contracts, and white-label agency execution. He specializes in full-stack WordPress and WooCommerce engineering, Elementor Pro, sub-300ms AI voice agents using Vapi and ElevenLabs, event-driven n8n/Make backend workflows, Python data pipelines, and full-stack vibe coding for rapid MVP launches."
        keyTakeaways={[
          '5+ Years of hands-on remote engineering for global founders and enterprise teams in the USA, UK, UAE, KSA, and Europe.',
          '1,200+ Projects delivered with a 100% Job Success Score and 5-Star verified rating across Upwork and Fiverr.',
          'Real Business Impact: 20% Q1 business growth for UAE enterprises, 30%-60% reduction in manual labor, and 40% faster page speeds.',
          'Open to Full-Time Remote Engineering Roles, Relocation to UAE or Saudi Arabia, and White-Label Agency Retainers.'
        ]}
        badge="AEO PROFILE SUMMARY: SHEHARYAR SIRAJ"
      />

      {/* Real Results Delivered Highlight Strip */}
      <div className="my-16">
        <div className="mb-8">
          <span className="text-xs font-mono text-accent tracking-widest uppercase block mb-1">
            VERIFIED BUSINESS OUTCOMES
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Real Quantified Results Delivered
          </h2>
          <p className="text-brand-secondary text-xs sm:text-sm mt-1 font-body">
            Measurable operational improvements achieved across production deployments worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {REAL_RESULTS_DELIVERED.map((res, idx) => (
            <div 
              key={idx} 
              className="glass-panel p-6 rounded-2xl border border-brand-border/70 hover:border-accent/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-accent px-2 py-0.5 rounded bg-accent/10 border border-accent/20">
                    {res.category}
                  </span>
                  <TrendingUp size={16} className="text-accent group-hover:scale-110 transition-transform" />
                </div>
                <div className="font-heading text-2xl sm:text-3xl font-black text-white group-hover:text-accent transition-colors mb-2">
                  {res.metric}
                </div>
                <h3 className="font-heading text-sm font-bold text-white mb-2 leading-snug">
                  {res.title}
                </h3>
              </div>
              <p className="text-xs text-brand-secondary font-body leading-relaxed mt-2 border-t border-brand-border/40 pt-3">
                {res.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-12">
        {METRICS.map((metric, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-2xl border border-brand-border/60 text-center">
            <div className="font-heading text-3xl sm:text-4xl font-extrabold text-accent mb-1 tracking-tight">
              {metric.value}{metric.suffix}
            </div>
            <div className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
              {metric.label}
            </div>
          </div>
        ))}
      </div>

      {/* Philosophy Grid */}
      <div className="my-16">
        <div className="mb-8">
          <span className="text-xs font-mono text-accent tracking-widest uppercase block mb-1">
            CORE PRINCIPLES
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Engineering & Architecture Philosophy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-brand-border/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Code2 className="text-accent" size={20} />
            </div>
            <h3 className="font-heading text-lg font-bold text-white">1. Clean Code Over Plugin Bloat</h3>
            <p className="text-xs sm:text-sm text-brand-secondary font-body leading-relaxed">
              We never stack 40+ third-party plugins that degrade TTFB and introduce CVE vulnerabilities. Every feature is written in modular, object-oriented PHP 8.2+, custom themes, or modern TypeScript interfaces.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-brand-border/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Terminal className="text-accent" size={20} />
            </div>
            <h3 className="font-heading text-lg font-bold text-white">2. Connected Operational Systems</h3>
            <p className="text-xs sm:text-sm text-brand-secondary font-body leading-relaxed">
              A website should not be a static billboard. It must function as an operational machine: capturing leads, answering inquiries via AI voice & chat, and synchronizing CRMs in seconds via automated n8n workflows.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-brand-border/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
              <ShieldCheck className="text-accent" size={20} />
            </div>
            <h3 className="font-heading text-lg font-bold text-white">3. Dependable White-Label Partner</h3>
            <p className="text-xs sm:text-sm text-brand-secondary font-body leading-relaxed">
              For marketing, SEO, and web agencies needing senior engineering support, I work quietly behind the scenes under strict NDA while you maintain the client relationship and brand.
            </p>
          </div>
        </div>
      </div>

      {/* Verified Marketplace Proof Links */}
      <div className="my-16 p-8 rounded-2xl glass-panel border border-brand-border/60 bg-surface-1">
        <h3 className="font-heading text-lg font-bold text-white mb-2">
          Verified Marketplace Profiles & Public Track Record
        </h3>
        <p className="text-xs sm:text-sm text-brand-secondary mb-6 font-body">
          Inspect client reviews, completed contracts, ratings, and escrow-verified delivery records:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <a
            href={CONTACT_INFO.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-surface-2 border border-brand-border/60 hover:border-accent transition-all flex items-center justify-between group"
          >
            <div>
              <div className="font-bold text-white group-hover:text-accent">UPWORK PROFILE</div>
              <div className="text-[11px] text-accent">Top Rated • 5.0 Star • Active Escrow</div>
            </div>
            <ExternalLink size={14} className="text-brand-muted group-hover:text-accent" />
          </a>

          <a
            href={CONTACT_INFO.fiverr}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-surface-2 border border-brand-border/60 hover:border-accent transition-all flex items-center justify-between group"
          >
            <div>
              <div className="font-bold text-white group-hover:text-accent">FIVERR PROFILE</div>
              <div className="text-[11px] text-accent">5-Star Reviews • Speed & Custom Code</div>
            </div>
            <ExternalLink size={14} className="text-brand-muted group-hover:text-accent" />
          </a>

          <a
            href={CONTACT_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-surface-2 border border-brand-border/60 hover:border-accent transition-all flex items-center justify-between group"
          >
            <div>
              <div className="font-bold text-white group-hover:text-accent">LINKEDIN PROFILE</div>
              <div className="text-[11px] text-accent">Professional Network • Recommendations</div>
            </div>
            <ExternalLink size={14} className="text-brand-muted group-hover:text-accent" />
          </a>
        </div>
      </div>

      {/* Technical Skills Matrix */}
      <div className="my-16">
        <div className="mb-8">
          <span className="text-xs font-mono text-accent tracking-widest uppercase block mb-1">
            SKILLS & ARCHITECTURE DOMAINS
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Core Technical Capabilities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECH_CATEGORIES.map((cat, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl border border-brand-border/60">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-brand-border/40">
                <Cpu size={16} className="text-accent" />
                <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  {cat.category}
                </h3>
              </div>
              <ul className="space-y-2">
                {cat.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2 text-xs text-brand-secondary font-body">
                    <Check size={14} className="text-accent shrink-0 mt-0.5" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Career Timeline */}
      <div className="my-16">
        <div className="mb-8">
          <span className="text-xs font-mono text-accent tracking-widest uppercase block mb-1">
            EXPERIENCE MILESTONES
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Professional Timeline & Work History
          </h2>
          <p className="text-brand-secondary text-xs sm:text-sm mt-1 font-body">
            Comprehensive track record across international enterprise contracts, agency leadership, and platform deliveries.
          </p>
        </div>

        <div className="space-y-6">
          {TIMELINE.map((item, idx) => (
            <div key={idx} className="glass-panel p-6 sm:p-8 rounded-2xl border border-brand-border/60 hover:border-accent/40 transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="font-mono text-xs font-bold text-accent px-2.5 py-0.5 rounded bg-accent/10 border border-accent/25">
                  {item.year}
                </span>
                <span className="font-mono text-xs text-brand-muted flex items-center gap-1">
                  <MapPin size={12} className="text-accent" />
                  {item.location}
                </span>
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-1">
                {item.title}
              </h3>
              <div className="font-mono text-xs text-brand-secondary mb-3">
                {item.role} • <strong className="text-white">{item.company}</strong>
              </div>
              <p className="text-xs sm:text-sm text-brand-secondary font-body leading-relaxed mb-4">
                {item.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.highlights.map((hl, i) => (
                  <span key={i} className="text-[11px] font-mono px-2.5 py-1 rounded bg-surface-2 text-white border border-brand-border/40">
                    {hl}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div className="my-16">
        <div className="mb-8">
          <span className="text-xs font-mono text-accent tracking-widest uppercase block mb-1">
            ACADEMIC FOUNDATION
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Education & Academic Degrees
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EDUCATION.map((edu, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl border border-brand-border/60 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                  <GraduationCap className="text-accent" size={20} />
                </div>
                <span className="text-[10px] font-mono font-bold text-accent px-2 py-0.5 rounded bg-accent/10 border border-accent/20 inline-block mb-2">
                  {edu.year}
                </span>
                <h3 className="font-heading text-base sm:text-lg font-bold text-white mb-1 leading-snug">
                  {edu.degree}
                </h3>
                <div className="font-mono text-xs text-brand-secondary mb-3">
                  {edu.institution}
                </div>
                {edu.field && (
                  <div className="text-xs font-mono text-accent/90 mb-3">
                    Focus: {edu.field}
                  </div>
                )}
              </div>
              {edu.description && (
                <p className="text-xs text-brand-secondary font-body leading-relaxed border-t border-brand-border/40 pt-3">
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Section */}
      <div className="my-16">
        <div className="mb-8">
          <span className="text-xs font-mono text-accent tracking-widest uppercase block mb-1">
            CREDENTIALS & AUDITED CERTIFICATIONS
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Professional Certifications
          </h2>
          <p className="text-brand-secondary text-xs sm:text-sm mt-1 font-body">
            Formally completed technical certifications across enterprise networking, artificial intelligence, and systems engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CERTIFICATIONS.map((cert, idx) => (
            <div 
              key={idx} 
              className="p-5 rounded-2xl glass-panel border border-brand-border/60 hover:border-accent/40 transition-all flex items-start gap-3.5 group"
            >
              <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                <Award size={18} className="text-accent" />
              </div>
              <div>
                <h3 className="font-heading text-sm font-bold text-white group-hover:text-accent transition-colors leading-snug">
                  {cert.title}
                </h3>
                <div className="text-xs font-mono text-brand-secondary mt-1">
                  Issuer: <span className="text-white font-medium">{cert.issuer}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-accent/30 text-center bg-gradient-to-b from-surface-1 to-surface-2 mt-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles size={14} />
          <span>START A PROJECT OR HIRE DIRECTLY</span>
        </div>
        <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white mb-3">
          Let’s Build Something Exceptional Together
        </h2>
        <p className="text-xs sm:text-sm text-brand-secondary max-w-2xl mx-auto mb-8 font-body leading-relaxed">
          Available for Full-Time Remote Engineering Roles, On-Site Relocation in Dubai & Saudi Arabia, White-Label Agency Retainers, and Custom High-Converting Systems.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenInquiry}
            type="button"
            className="px-8 py-3.5 rounded-full bg-accent text-black font-mono text-xs font-bold tracking-wider hover:bg-white transition-all shadow-[0_0_25px_rgba(183,255,60,0.3)] inline-flex items-center gap-2"
          >
            <span>CONNECT DIRECTLY WITH SHEHARYAR</span>
            <ArrowUpRight size={15} />
          </button>
          <a
            href={CONTACT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-full bg-surface-2 text-white border border-brand-border/80 font-mono text-xs font-bold tracking-wider hover:border-accent transition-all inline-flex items-center gap-2"
          >
            <span>DIRECT WHATSAPP CHAT</span>
            <ExternalLink size={14} className="text-accent" />
          </a>
        </div>
      </div>
    </div>
  );
};
