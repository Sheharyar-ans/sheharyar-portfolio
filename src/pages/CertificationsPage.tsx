import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  GraduationCap, 
  ExternalLink, 
  ArrowUpRight, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Globe2, 
  Terminal, 
  FileText, 
  Check, 
  Briefcase,
  Layers,
  TrendingUp,
  Download
} from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { AeoDirectAnswer } from '../components/seo/AeoDirectAnswer';
import { 
  CONTACT_INFO, 
  CERTIFICATIONS, 
  EDUCATION, 
  REAL_RESULTS_DELIVERED,
  METRICS 
} from '../data/portfolioData';

interface CertificationsPageProps {
  onOpenInquiry: () => void;
}

export const CertificationsPage: React.FC<CertificationsPageProps> = ({ onOpenInquiry }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'networking' | 'ai' | 'iot' | 'business'>('all');

  const credentialsWithMeta = [
    {
      title: 'Cisco Certified Network Professional (CCNP)',
      issuer: 'Cisco Systems',
      category: 'networking',
      badge: 'Enterprise Networking',
      credentialType: 'Professional Engineering Certification',
      skills: ['Routing & Switching', 'Enterprise Network Design', 'BGP / OSPF', 'Network Troubleshooting', 'Infrastructure Security'],
      description: 'Advanced networking credential verifying rigorous capabilities in planning, configuring, securing, and troubleshooting high-concurrency enterprise routing, switching, and distributed network architectures.'
    },
    {
      title: 'Networking Academy Learn-A-Thon 2022',
      issuer: 'Cisco Networking Academy',
      category: 'networking',
      badge: 'Cisco Academy Honors',
      credentialType: 'Competitive Technical Award',
      skills: ['Network Fundamentals', 'TCP/IP Architecture', 'Packet Analysis', 'Subnetting', 'Network Protocols'],
      description: 'Formal competitive technical training award for high-scoring achievement across comprehensive enterprise networking, infrastructure configuration, and network virtualization modules.'
    },
    {
      title: 'AI for App Building & Modern Development Workflows',
      issuer: 'Professional Certification Program',
      category: 'ai',
      badge: 'Agentic AI & Engineering',
      credentialType: 'Professional AI Certification',
      skills: ['Agentic Workflows', 'LLM API Integration', 'Full-Stack Vibe Coding', 'OpenAI & Claude APIs', 'Automated Tool Calling'],
      description: 'Certified expertise in building production AI-powered web applications, autonomous agent workflows, tool-calling APIs, and full-stack vibe coding architectures.'
    },
    {
      title: 'AI for Data Analysis & Automation',
      issuer: 'Professional Certification Program',
      category: 'ai',
      badge: 'Data Intelligence',
      credentialType: 'Professional AI Certification',
      skills: ['Python Data Cleaning', 'Pandas & NumPy', 'Automated Analytics Pipelines', 'Business Intelligence', 'Predictive Modeling'],
      description: 'Advanced training in building automated data cleaning pipelines, business intelligence dashboards, and machine learning telemetry systems for high-growth enterprises.'
    },
    {
      title: 'AI for Content Creation',
      issuer: 'Professional Certification Program',
      category: 'ai',
      badge: 'Synthetic Media & SEO',
      credentialType: 'Professional AI Certification',
      skills: ['AI Commercial Video Ads', 'ElevenLabs Voice Cloning', 'SaaS Motion Graphics', 'Structured SEO Copywriting', 'Entity Graph Modeling'],
      description: 'Certification in high-converting commercial AI video generation, synthetic voice cloning, SaaS motion graphics, and algorithmic content intelligence.'
    },
    {
      title: 'Internet of Things (IoT) Systems Architecture (6-Month Course)',
      issuer: 'Sir Syed University of Engineering & Technology (SSUET)',
      category: 'iot',
      badge: 'IoT & Embedded Systems',
      credentialType: 'University Professional Certification',
      skills: ['Microcontrollers & Telemetry', 'Sensor Ingestion Pipelines', 'MQTT & HTTP Protocols', 'Hardware-to-Cloud Integration', 'Edge Architecture'],
      description: '6-month intensive university engineering course covering sensor telemetry, embedded hardware programming, cloud telemetry bridges, and distributed hardware systems.'
    },
    {
      title: 'Information Technology and Business World Certificate',
      issuer: 'Professional Training Program',
      category: 'business',
      badge: 'IT & Enterprise Strategy',
      credentialType: 'Professional Business Credential',
      skills: ['Digital Transformation', 'Enterprise Systems Integration', 'B2B Client Strategy', 'Process Optimization', 'Software Licensing'],
      description: 'Professional qualification focused on aligning enterprise business objectives with modern software architecture, automated workflows, and digital operations.'
    },
    {
      title: 'DigiSkills Professional Training Program Certificate',
      issuer: 'DigiSkills Training Program',
      category: 'business',
      badge: 'Digital Commerce',
      credentialType: 'Government-Recognized Credential',
      skills: ['Full-Stack WordPress', 'WooCommerce Stores', 'Digital Freelancing', 'SEO Best Practices', 'Client Communication'],
      description: 'Verified professional certificate program focused on full-stack WordPress architecture, e-commerce stores, client account delivery, and international digital execution.'
    },
    {
      title: 'Google Cloud Vertex AI Certified Specialist',
      issuer: 'Google Cloud',
      category: 'ai',
      badge: 'Cloud AI Architecture',
      credentialType: 'Cloud Platform Certification',
      skills: ['Google Vertex AI', 'Model Tuning', 'Gemini Multimodal Models', 'Vector Search & Embeddings', 'Enterprise AI Deployment'],
      description: 'Specialized cloud AI certification covering Google Cloud Vertex AI infrastructure, custom prompt pipelines, vector index deployments, and enterprise Gemini integrations.'
    },
    {
      title: 'Anthropic AI Fluency & Prompt Engineering Certification',
      issuer: 'Anthropic',
      category: 'ai',
      badge: 'LLM Reasoning & Safety',
      credentialType: 'AI Model Certification',
      skills: ['Claude 3.5 Sonnet / Opus', 'System Prompt Optimization', 'Chain-of-Thought Reasoning', 'Structured JSON Output', 'Constitutional AI'],
      description: 'Rigorous certification validating deep expertise in prompt architecture, Claude model fine-tuning, complex tool calling, and deterministic JSON Schema generation.'
    },
    {
      title: 'Cisco Certified CyberOps Associate',
      issuer: 'Cisco Systems',
      category: 'networking',
      badge: 'Cybersecurity Operations',
      credentialType: 'Security Professional Certification',
      skills: ['Security Operations Center (SOC)', 'Malware Analysis', 'Endpoint Security', 'WordPress Hardening', 'CVE Incident Response'],
      description: 'Audited cybersecurity certification in threat analysis, server hardening, malware remediation, and security incident response for mission-critical web platforms.'
    }
  ];

  const filteredCredentials = activeFilter === 'all' 
    ? credentialsWithMeta 
    : credentialsWithMeta.filter(c => c.category === activeFilter);

  const certSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': 'https://sheharyarsiraj.com/certifications/#profilepage',
    url: 'https://sheharyarsiraj.com/certifications/',
    name: 'Verified Technical Certifications & Credentials | Sheharyar Siraj',
    mainEntity: {
      '@type': 'Person',
      '@id': 'https://sheharyarsiraj.com/#person',
      name: 'Sheharyar Siraj',
      jobTitle: 'Senior WordPress Developer & Agentic AI Automation Engineer',
      hasCredential: credentialsWithMeta.map((cred) => ({
        '@type': 'EducationalOccupationalCredential',
        name: cred.title,
        credentialCategory: cred.credentialType,
        recognizedBy: {
          '@type': 'Organization',
          name: cred.issuer
        }
      }))
    }
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <SEOHead
        title="Verified Certifications & Credentials | Sheharyar Siraj (CCNP & AI)"
        description="Explore Sheharyar Siraj's verified certifications: Cisco Certified Network Professional (CCNP), AI for App Building & Data Analysis, SSUET IoT, and Virtual University BBIT."
        canonicalUrl="https://sheharyarsiraj.com/certifications/"
        schema={certSchema}
      />

      <Breadcrumbs 
        items={[
          { label: 'ABOUT', href: '/about/' },
          { label: 'CERTIFICATIONS & CREDENTIALS' }
        ]} 
      />

      {/* Hero Header */}
      <div className="mt-8 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
          <Award size={14} />
          <span>VERIFIED TECHNICAL CREDENTIALS & ACADEMIC AUDIT</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
          Certifications & <span className="text-accent">Technical Credentials</span>
        </h1>
        <p className="text-brand-secondary text-base sm:text-xl max-w-3xl leading-relaxed font-body">
          Formally audited credentials spanning enterprise networking (Cisco CCNP), agentic AI workflows, data analysis pipelines, IoT hardware telemetry, and academic software engineering.
        </p>

        {/* Status Pills */}
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-mono">
          <span className="px-3 py-1 rounded-md bg-accent/15 border border-accent/30 text-accent flex items-center gap-1.5 font-bold">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            100% AUDITED & VERIFIED CREDENTIALS
          </span>
          <span className="px-3 py-1 rounded-md bg-surface-2 border border-brand-border/60 text-white flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-accent" />
            Cisco Certified Network Professional (CCNP)
          </span>
          <span className="px-3 py-1 rounded-md bg-surface-2 border border-brand-border/60 text-white flex items-center gap-1.5">
            <GraduationCap size={13} className="text-accent" />
            Virtual University of Pakistan (BBIT)
          </span>
        </div>
      </div>

      {/* AEO Direct Answer */}
      <AeoDirectAnswer
        summary="Sheharyar Siraj holds verified professional credentials across Cisco Enterprise Networking (CCNP & Learn-A-Thon), Artificial Intelligence (AI for App Building, AI for Data Analysis, AI for Content Creation), Internet of Things (SSUET IoT Systems), and Cloud AI (Google Vertex AI & Anthropic AI Fluency). He is completing a Bachelor of Business and Information Technology (BBIT, Computer Software Engineering) at Virtual University of Pakistan."
        keyTakeaways={[
          'Cisco Certified Network Professional (CCNP) verifying enterprise routing, switching, and distributed systems architecture.',
          'Comprehensive AI certifications in autonomous agent development, Python data analytics, and generative media creation.',
          '6-Month university specialization in Internet of Things (IoT) Systems Architecture from Sir Syed University (SSUET).',
          'Bachelor of Business & IT (BBIT) in Computer Software Engineering from Virtual University of Pakistan.'
        ]}
        badge="AEO VERIFIED CREDENTIALS DOSSIER"
      />

      {/* Real Outcomes Summary Strip */}
      <div className="my-14 grid grid-cols-2 md:grid-cols-4 gap-4">
        {REAL_RESULTS_DELIVERED.map((res, idx) => (
          <div key={idx} className="glass-panel p-5 rounded-2xl border border-brand-border/60 text-left">
            <div className="text-[10px] font-mono text-accent uppercase tracking-wider mb-1">
              {res.category}
            </div>
            <div className="font-heading text-2xl font-black text-white mb-1">
              {res.metric}
            </div>
            <p className="text-xs text-brand-secondary font-body leading-snug">
              {res.title}
            </p>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="my-10 flex flex-wrap items-center gap-2 border-b border-brand-border/50 pb-4">
        {[
          { id: 'all', label: 'All Credentials (11)' },
          { id: 'networking', label: 'Cisco & Networking (3)' },
          { id: 'ai', label: 'AI & Automation (5)' },
          { id: 'iot', label: 'IoT & Hardware (1)' },
          { id: 'business', label: 'Business & Digital (2)' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveFilter(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all cursor-pointer ${
              activeFilter === tab.id
                ? 'bg-accent text-black shadow-[0_0_15px_rgba(183,255,60,0.3)]'
                : 'bg-surface-2 text-brand-secondary hover:text-white border border-brand-border/60 hover:border-accent/40'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
        {filteredCredentials.map((cred, idx) => (
          <div 
            key={idx}
            className="p-6 sm:p-8 rounded-2xl glass-panel border border-brand-border/70 hover:border-accent/50 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-accent px-2.5 py-0.5 rounded bg-accent/10 border border-accent/25 font-bold">
                  {cred.badge}
                </span>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 size={13} />
                  Verified
                </span>
              </div>

              <h2 className="font-heading text-lg sm:text-xl font-bold text-white group-hover:text-accent transition-colors mb-1 leading-snug">
                {cred.title}
              </h2>

              <div className="text-xs font-mono text-brand-secondary mb-3">
                Issuing Body: <strong className="text-white">{cred.issuer}</strong>
              </div>

              <p className="text-xs sm:text-sm text-brand-secondary font-body leading-relaxed mb-4">
                {cred.description}
              </p>
            </div>

            {/* Skills Validated */}
            <div className="pt-4 border-t border-brand-border/40">
              <span className="text-[10px] font-mono text-brand-muted uppercase tracking-wider block mb-2">
                SKILLS & COMPETENCIES VALIDATED:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {cred.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx}
                    className="text-[10.5px] font-mono px-2 py-0.5 rounded bg-surface-2 text-white/90 border border-brand-border/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Academic Education Section */}
      <div className="my-20 pt-12 border-t border-brand-border/60">
        <div className="mb-8 text-left">
          <span className="text-xs font-mono tracking-widest text-accent uppercase block mb-1">
            ACADEMIC FOUNDATION
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Formal University Degrees & Education
          </h2>
          <p className="text-brand-secondary text-sm sm:text-base max-w-2xl mt-2 font-body">
            Grounded in rigorous computer software engineering, distributed systems, and telemetry architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EDUCATION.map((edu, idx) => (
            <div 
              key={idx} 
              className="glass-panel p-6 sm:p-7 rounded-2xl border border-brand-border/70 hover:border-accent/40 transition-all flex flex-col justify-between"
            >
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
                  <div className="text-xs font-mono text-accent/90 mb-3 font-semibold">
                    Major: {edu.field}
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

      {/* Verified Marketplace Proof Strip */}
      <div className="my-16 p-8 rounded-2xl glass-panel border border-brand-border/70 bg-surface-1">
        <h3 className="font-heading text-lg font-bold text-white mb-2">
          Third-Party Escrow & Marketplace Verification
        </h3>
        <p className="text-xs sm:text-sm text-brand-secondary mb-6 font-body">
          You can inspect our verified public track record, ratings, client recommendations, and completed contracts across international freelancing networks:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <a
            href={CONTACT_INFO.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-surface-2 border border-brand-border/60 hover:border-accent transition-all flex items-center justify-between group"
          >
            <div>
              <div className="font-bold text-white group-hover:text-accent">UPWORK VERIFIED PROFILE</div>
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
              <div className="font-bold text-white group-hover:text-accent">FIVERR VERIFIED PROFILE</div>
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
              <div className="font-bold text-white group-hover:text-accent">LINKEDIN NETWORK</div>
              <div className="text-[11px] text-accent">Professional Recommendations</div>
            </div>
            <ExternalLink size={14} className="text-brand-muted group-hover:text-accent" />
          </a>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-accent/30 text-center bg-gradient-to-b from-surface-1 to-surface-2 mt-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles size={14} />
          <span>START A VERIFIED ENGAGEMENT</span>
        </div>
        <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white mb-3">
          Hire a Formally Certified Senior Engineer
        </h2>
        <p className="text-xs sm:text-sm text-brand-secondary max-w-2xl mx-auto mb-8 font-body leading-relaxed">
          Open to Full-Time Remote Roles, Relocation to UAE / Saudi Arabia, Agency White-Label Retainers, and Custom High-Converting Systems Architecture.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenInquiry}
            type="button"
            className="px-8 py-3.5 rounded-full bg-accent text-black font-mono text-xs font-bold tracking-wider hover:bg-white transition-all shadow-[0_0_25px_rgba(183,255,60,0.3)] inline-flex items-center gap-2 cursor-pointer"
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
            <span>DISCUSS ON WHATSAPP (+92 313 2080033)</span>
            <ExternalLink size={14} className="text-accent" />
          </a>
        </div>
      </div>
    </div>
  );
};
