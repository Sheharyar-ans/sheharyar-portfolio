import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  Globe2, 
  ShieldCheck, 
  Clock, 
  MessageSquare, 
  Phone, 
  Star, 
  Code2, 
  Layers, 
  Workflow, 
  Bot, 
  Zap, 
  Award, 
  Briefcase, 
  ExternalLink,
  Laptop,
  Check,
  Server
} from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { AeoDirectAnswer } from '../components/seo/AeoDirectAnswer';
import { CONTACT_INFO } from '../data/portfolioData';
import { generateSchemaGraph } from '../utils/schemaGenerator';

interface FreelancerInPakistanPageProps {
  onOpenInquiry: () => void;
}

export const FreelancerInPakistanPage: React.FC<FreelancerInPakistanPageProps> = ({ onOpenInquiry }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const schema = generateSchemaGraph('/freelancer-in-pakistan/');

  const faqs = [
    {
      question: 'How can international businesses verify credibility and quality when hiring a freelancer in Pakistan?',
      answer: 'Credibility is established through transparent, verifiable public track records. I have successfully delivered over 1,200 projects for international clients across Upwork, direct corporate contracts, and agency partnerships. International clients can verify client reviews, inspect production case studies, review live code repositories, and start with a paid technical discovery sprint or escrow-backed milestone before committing to large-scale architecture builds.'
    },
    {
      question: 'What is your communication cadence and timezone overlap with clients in the US, UK, and Middle East?',
      answer: 'Based in Karachi, Pakistan (PKT / UTC+5), I provide strategic synchronous working overlap across global timezones. For UK and European clients, I offer 5 to 6 hours of real-time overlap every afternoon. For UAE and Saudi Arabia clients, our timezones are within 1 to 2 hours of each other, providing full business-day collaboration. For North American clients (EST/PST), I conduct dedicated morning alignment calls and deliver overnight code turnarounds, guaranteeing responses within 2 hours during active sprints.'
    },
    {
      question: 'How are international contracts, milestone deliverables, and payments structured?',
      answer: 'Engagements are structured using secure, transparent milestone frameworks. Contracts can be executed directly via bilateral agreements with milestone escrow, through Upwork Escrow, or using direct corporate invoicing with Wise, SWIFT wire transfer, or Payoneer. Every project includes clearly defined functional specifications, documented deliverables, and a 30-day post-launch warranty with complete intellectual property transfer.'
    },
    {
      question: 'Can you work as an invisible white-label engineer for our digital agency under an NDA?',
      answer: 'Yes. A substantial portion of my work is white-label development for digital marketing and SEO agencies across the United States, United Kingdom, and Australia. I operate under strict non-disclosure agreements (NDAs), commit code directly to agency GitHub or GitLab repositories under your organization handles, and collaborate directly in agency Slack or Microsoft Teams channels without client poaching.'
    }
  ];

  const coreSkills = [
    {
      title: 'WordPress & Custom PHP 8.2',
      badge: 'Core Foundation',
      icon: Layers,
      description: 'Object-oriented WordPress architecture, custom theme engineering with Tailwind CSS, custom plugins with nonce security, and database index optimization achieving sub-600ms TTFB.',
      deliverables: ['Custom Themes & Plugins', 'PHP 8.2+ Strict Typing', 'Sub-600ms TTFB Optimization', 'Zero-Bloat Codebases']
    },
    {
      title: 'WooCommerce High-Concurrency',
      badge: 'E-Commerce',
      icon: Server,
      description: 'High-performance WooCommerce setups utilizing High-Performance Order Storage (HPOS), Redis object caching, custom checkout funnels, and automated inventory sync.',
      deliverables: ['HPOS Table Architecture', 'Redis Object Caching', 'Custom Checkout Funnels', 'Inventory Sync Pipelines']
    },
    {
      title: 'Workflow Automation (n8n & Make)',
      badge: 'Integration',
      icon: Workflow,
      description: 'Event-driven workflow automations connecting webhooks, CRMs, ERPs, billing processors, and notification channels with automated error recovery sub-workflows.',
      deliverables: ['Self-Hosted n8n Clusters', 'Webhook Payload Parsers', 'Multi-Step Error Handlers', 'CRM & Payment Integration']
    },
    {
      title: 'AI Voice Agents & Telephony',
      badge: 'Conversational AI',
      icon: Bot,
      description: 'Sub-600ms conversational AI voice assistants built on Vapi and Retell AI with Twilio SIP trunking, real-time CRM tool calling, and appointment booking automation.',
      deliverables: ['Vapi & Retell AI Agents', 'Sub-600ms Spoken Latency', 'Tool Calling & CRM Updates', 'Twilio SIP Trunking']
    },
    {
      title: 'Modern Frontends (React & TypeScript)',
      badge: 'Web Applications',
      icon: Code2,
      description: 'Component-driven user interfaces, client portals, interactive calculators, and dashboards built with React, TypeScript, Vite SSR, and clean state machines.',
      deliverables: ['React 18 & TypeScript', 'Custom Client Portals', 'Interactive Data Tools', 'Clean Design Systems']
    },
    {
      title: 'Technical SEO & AEO Systems',
      badge: 'Search Intelligence',
      icon: Zap,
      description: 'Entity-first search engine optimization, connected JSON-LD schemas, LLMs.txt AI manifests, and Core Web Vitals remediation scoring 95+ on Google PageSpeed Insights.',
      deliverables: ['JSON-LD Entity Graphs', 'LLMs.txt AI Manifests', 'Core Web Vitals 95+', 'Programmatic SEO Frameworks']
    }
  ];

  const globalImpact = [
    {
      region: 'United States',
      flag: '🇺🇸',
      focus: 'SaaS Platforms & AI Customer Support',
      description: 'Architected automated customer support voice systems and refactored high-traffic WordPress websites for American B2B tech and service companies.'
    },
    {
      region: 'United Kingdom',
      flag: '🇬🇧',
      focus: 'Agency White-Label & Technical SEO',
      description: 'Provided senior backend engineering for London digital agencies, delivering custom plugins, speed remediation, and enterprise headless setups.'
    },
    {
      region: 'United Arab Emirates & Saudi Arabia',
      flag: '🇦🇪 🇸🇦',
      focus: 'Enterprise Portals & Bilingual Workflows',
      description: 'Built Arabic/English corporate portals, real estate lead distribution engines, and automated billing workflows compliant with regional standards.'
    },
    {
      region: 'Germany & Netherlands',
      flag: '🇩🇪 🇳🇱',
      focus: 'GDPR Compliance & E-Commerce Scaling',
      description: 'Engineered privacy-first data handling pipelines, WooCommerce multi-currency architectures, and automated inventory sync across European logistics hubs.'
    }
  ];

  const whyPakistanHighlights = [
    {
      title: 'World-Class Engineering Rigor',
      description: 'Pakistan has developed a strong reputation for producing software engineers with solid computer science foundations. I bring disciplined architecture, clean object-oriented code, and strict security practices to every project, avoiding the bloated quick fixes common in marketplace development.'
    },
    {
      title: 'Cost Efficiency Without Technical Compromise',
      description: 'Working with a senior engineer in Pakistan allows global businesses and agencies to achieve top-tier development quality at realistic rates. You get the caliber of an in-house tech lead without the massive overhead of Silicon Valley or London agencies.'
    },
    {
      title: 'Clear, Fluent English Communication',
      description: 'Clear communication is the difference between a successful release and a failed project. I provide fluent English documentation, proactive milestone updates, Loom video walkthroughs, and responsive messaging across your preferred collaboration channels.'
    },
    {
      title: 'Strategic Timezone Position (PKT / UTC+5)',
      description: 'Located in Karachi, Pakistan, my working hours naturally bridge Asian, Middle Eastern, European, and North American schedules. Sprints progress continuously, enabling daytime collaboration with European clients and overnight turnaround for US teams.'
    }
  ];

  const agencyBenefits = [
    {
      title: 'Strict Bilateral NDA Protection',
      text: 'Your client relationships and agency reputation are fully protected. All subcontracted work is governed by binding non-disclosure agreements.'
    },
    {
      title: 'Invisible Team Integration',
      text: 'I integrate directly into your internal tools, including Slack, GitHub, Asana, ClickUp, or Jira, working as an invisible extension of your technical team.'
    },
    {
      title: 'Fixed Sprint Rates or Retainers',
      text: 'Scale your engineering capacity up or down as needed with transparent weekly sprint pricing or dedicated monthly retainer agreements.'
    },
    {
      title: 'Complete Intellectual Property Transfer',
      text: 'All custom source code, documentation, and architectural designs become 100% owned by your agency or end client upon milestone completion.'
    }
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <SEOHead
        title="Freelancer in Pakistan | AI & WordPress Architect"
        description="Hire Sheharyar Siraj, a senior systems freelancer in Pakistan. 5+ years of experience, 1,200+ projects delivered, specializing in custom WordPress VIP and AI automation."
        canonicalUrl="https://sheharyarsiraj.com/freelancer-in-pakistan/"
        schema={schema}
      />

      <Breadcrumbs
        items={[
          { label: 'GLOBAL NETWORK', href: '/locations/' },
          { label: 'FREELANCER IN PAKISTAN' }
        ]}
      />

      {/* Hero Section */}
      <section className="mt-8 mb-16 relative">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider">
            <Award size={13} />
            ELITE FREELANCER IN PAKISTAN
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-2 border border-brand-border/60 text-brand-secondary font-mono text-xs">
            <MapPin size={13} className="text-accent" />
            Karachi, Pakistan (PKT / UTC+5)
          </span>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
          Freelancer in Pakistan: Senior WordPress Developer & Agentic AI Automation Engineer
        </h1>

        <p className="text-brand-secondary text-base sm:text-xl max-w-4xl leading-relaxed font-body mb-8">
          Operating from Karachi, Pakistan, I engineer custom enterprise WordPress solutions, high-converting WooCommerce stores, Elementor Pro builds, n8n/Make backend automations, and sub-300ms AI voice agents for businesses across North America, Europe, the UAE, and Saudi Arabia. Over 5 years of verified remote experience, 1,200+ delivered projects, and open to full-time remote or relocation to UAE / KSA.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-4 mb-10">
          <button
            type="button"
            onClick={onOpenInquiry}
            className="px-6 py-3.5 rounded-xl text-sm font-mono font-bold bg-accent text-black hover:bg-white transition-all inline-flex items-center gap-2 shadow-[0_0_20px_rgba(183,255,60,0.3)] cursor-pointer"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight size={16} />
          </button>

          <button
            type="button"
            onClick={onOpenInquiry}
            className="px-6 py-3.5 rounded-xl text-sm font-mono font-semibold bg-surface-2 text-white hover:border-accent/40 border border-brand-border/70 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>DISCUSS A PARTNERSHIP</span>
            <Briefcase size={16} className="text-accent" />
          </button>

          <a
            href="https://wa.me/923132080033?text=Hi%20Sheharyar,%20I'm%20reaching%20out%20via%20your%20Freelancer%20in%20Pakistan%20page%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl text-sm font-mono font-semibold bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all inline-flex items-center gap-2"
          >
            <MessageSquare size={16} />
            <span>WHATSAPP: +92 313 2080033</span>
          </a>
        </div>

        {/* Live Trust Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-surface-1 border border-brand-border/60">
          <div>
            <div className="font-heading text-2xl sm:text-3xl font-extrabold text-accent">5+ Years</div>
            <div className="text-xs font-mono text-brand-muted mt-1 uppercase">Active Experience</div>
          </div>
          <div>
            <div className="font-heading text-2xl sm:text-3xl font-extrabold text-white">1,200+</div>
            <div className="text-xs font-mono text-brand-muted mt-1 uppercase">Projects Delivered</div>
          </div>
          <div>
            <div className="font-heading text-2xl sm:text-3xl font-extrabold text-accent">Verified</div>
            <div className="text-xs font-mono text-brand-muted mt-1 uppercase">Engineer & Architect</div>
          </div>
          <div>
            <div className="font-heading text-2xl sm:text-3xl font-extrabold text-white">100%</div>
            <div className="text-xs font-mono text-brand-muted mt-1 uppercase">Client Satisfaction</div>
          </div>
        </div>
      </section>

      {/* AEO Direct Answer Block */}
      <AeoDirectAnswer
        summary="Sheharyar Siraj is an elite freelance systems engineer and AI automation architect based in Karachi, Pakistan. Specializing in high-performance WordPress VIP development, custom PHP 8.2 code, sub-600ms conversational AI voice agents, and event-driven n8n automations, he has delivered over 1,200 commercial projects globally for businesses in the US, UK, UAE, and Australia."
        keyTakeaways={[
          'Karachi, Pakistan location providing 4 to 6 hours of daily working overlap with Europe, Middle East, and North America.',
          'Full-stack mastery spanning custom WordPress themes, WooCommerce HPOS, custom PHP 8.2, React, and Python.',
          'Specialist in production AI systems: Vapi telephony voice agents, RAG knowledge bases, and n8n webhook automations.',
          'Trusted white-label engineering partner for marketing and SEO agencies across the United States, UK, and Australia.'
        ]}
        badge="AEO DIRECT ANSWER: FREELANCER IN PAKISTAN"
      />

      {/* Section 1: Why Global Businesses Hire Top Technical Talent from Pakistan */}
      <section className="my-20">
        <div className="mb-10">
          <span className="text-xs font-mono text-accent uppercase tracking-wider font-bold block mb-2">
            GLOBAL HIRING ADVANTAGE
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Global Businesses Hire Top Technical Talent from Pakistan
          </h2>
          <p className="text-brand-secondary text-sm sm:text-base max-w-3xl mt-3 font-body">
            International founders, enterprise teams, and digital agencies choose Pakistani engineers for their deep technical foundations, strong work ethic, and exceptional value. Here is why hiring top-tier technical talent from Pakistan accelerates growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {whyPakistanHighlights.map((item, idx) => (
            <div key={idx} className="glass-panel p-6 sm:p-8 rounded-2xl border border-brand-border/60 hover:border-accent/40 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-mono text-sm font-bold">
                  0{idx + 1}
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-white tracking-tight">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-brand-secondary leading-relaxed font-body">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Core Expertise & Technical Stack */}
      <section className="my-20">
        <div className="mb-10">
          <span className="text-xs font-mono text-accent uppercase tracking-wider font-bold block mb-2">
            TECHNICAL CAPABILITIES
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Core Expertise & Technical Stack
          </h2>
          <p className="text-brand-secondary text-sm sm:text-base max-w-3xl mt-3 font-body">
            I build resilient digital architectures using modern software standards. No bloated page builders, no unstable third-party plugins, and no fragile shortcuts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreSkills.map((skill, idx) => {
            const Icon = skill.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-surface-1 border border-brand-border/60 hover:border-accent/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                      <Icon size={20} />
                    </div>
                    <span className="text-[11px] font-mono text-accent bg-accent/5 px-2.5 py-1 rounded-full border border-accent/15 font-semibold">
                      {skill.badge}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-white mb-2">
                    {skill.title}
                  </h3>

                  <p className="text-xs text-brand-secondary leading-relaxed font-body mb-6">
                    {skill.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-border/40">
                  <div className="text-[10px] font-mono text-brand-muted uppercase tracking-wider mb-2 font-bold">
                    Key Deliverables:
                  </div>
                  <ul className="space-y-1.5">
                    {skill.deliverables.map((d, dIdx) => (
                      <li key={dIdx} className="text-xs font-mono text-white/90 flex items-center gap-2">
                        <Check size={12} className="text-accent shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 3: Proven Track Record & Global Reach */}
      <section className="my-20">
        <div className="mb-10">
          <span className="text-xs font-mono text-accent uppercase tracking-wider font-bold block mb-2">
            INTERNATIONAL PORTFOLIO
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Proven Track Record & Global Reach
          </h2>
          <p className="text-brand-secondary text-sm sm:text-base max-w-3xl mt-3 font-body">
            Headquartered in Karachi, Pakistan, I provide uninterrupted engineering execution for international founders and enterprise teams across four continents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {globalImpact.map((item, idx) => (
            <div key={idx} className="glass-panel p-6 sm:p-8 rounded-2xl border border-brand-border/60">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{item.flag}</span>
                  <h3 className="font-heading text-lg font-bold text-white">
                    {item.region}
                  </h3>
                </div>
                <span className="text-xs font-mono text-accent font-semibold">
                  {item.focus}
                </span>
              </div>
              <p className="text-sm text-brand-secondary leading-relaxed font-body">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Verification badges */}
        <div className="p-8 rounded-2xl bg-surface-2 border border-brand-border/70 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-accent font-bold uppercase tracking-wider">
              <ShieldCheck size={14} />
              VERIFIED MARKETPLACE CREDENTIALS
            </div>
            <h4 className="font-heading text-xl font-bold text-white">
              Hire Directly or Through Protected Marketplaces
            </h4>
            <p className="text-sm text-brand-secondary max-w-xl font-body">
              Clients can collaborate directly through corporate wire contracts, or engage via Upwork Escrow for platform-backed milestone protection.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://www.upwork.com/freelancers/sheharyarsiraj"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl text-xs font-mono font-bold bg-[#14a800]/15 text-[#65d956] border border-[#14a800]/30 hover:bg-[#14a800]/25 transition-all inline-flex items-center gap-1.5"
            >
              <span>UPWORK PROFILE</span>
              <ExternalLink size={12} />
            </a>
            <a
              href="https://www.fiverr.com/sellers/mr_shehary/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl text-xs font-mono font-bold bg-[#1dbf73]/15 text-[#2ee68f] border border-[#1dbf73]/30 hover:bg-[#1dbf73]/25 transition-all inline-flex items-center gap-1.5"
            >
              <span>FIVERR PROFILE</span>
              <ExternalLink size={12} />
            </a>
            <a
              href="https://www.linkedin.com/in/sheharyar-siraj/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl text-xs font-mono font-bold bg-[#0077b5]/15 text-[#54b5f0] border border-[#0077b5]/30 hover:bg-[#0077b5]/25 transition-all inline-flex items-center gap-1.5"
            >
              <span>LINKEDIN</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </section>

      {/* Section 4: White-Label Agency Partnerships */}
      <section className="my-20">
        <div className="mb-10">
          <span className="text-xs font-mono text-accent uppercase tracking-wider font-bold block mb-2">
            AGENCY SUBCONTRACTING
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            White-Label Agency Partnerships
          </h2>
          <p className="text-brand-secondary text-sm sm:text-base max-w-3xl mt-3 font-body">
            I act as an invisible technical director and lead developer for digital marketing agencies, SEO consultancies, and design studios across the US, UK, and Australia. You handle client acquisition and strategy; I deliver flawless code and automated systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {agencyBenefits.map((benefit, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-surface-1 border border-brand-border/60">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={16} className="text-accent" />
                <h3 className="font-heading text-base font-bold text-white">
                  {benefit.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-brand-secondary leading-relaxed font-body">
                {benefit.text}
              </p>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-2xl bg-accent/[0.04] border border-accent/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-sm font-heading font-bold text-white">
              Ready to expand your agency development capacity?
            </div>
            <div className="text-xs text-brand-secondary font-body">
              Book a private discovery call to discuss sprint models, retainers, and mutual NDA execution.
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenInquiry}
            className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-accent text-black hover:bg-white transition-all shrink-0 cursor-pointer"
          >
            DISCUSS AGENCY RETAINER
          </button>
        </div>
      </section>

      {/* Section 5: Technical FAQ Accordion */}
      <section className="my-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-mono text-accent uppercase tracking-wider font-bold block mb-2">
            HIRING VERIFICATION
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-brand-secondary text-sm sm:text-base font-body">
            Everything international clients need to know about remote contracts, timezone synchronization, and project workflows with a top freelancer in Pakistan.
          </p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-brand-border/60 rounded-2xl bg-surface-1 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-surface-2/50 transition-colors"
                >
                  <span className="font-heading text-base sm:text-lg font-bold text-white">
                    {faq.question}
                  </span>
                  <span className="p-2 rounded-xl bg-surface-2 text-accent border border-brand-border/40 shrink-0">
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm text-brand-secondary font-body leading-relaxed border-t border-brand-border/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="mt-20 p-8 sm:p-12 rounded-3xl bg-surface-1 border border-brand-border/80 text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase">
            <span>DIRECT AVAILABILITY FOR Q1 2026</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let Us Engineer Your Next High-Performance System
          </h2>

          <p className="text-brand-secondary text-sm sm:text-base font-body leading-relaxed">
            Whether you need a custom WordPress platform, an autonomous conversational voice agent, or an ongoing white-label engineering partnership, I provide reliable, world-class execution from Karachi, Pakistan to your doorstep.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={onOpenInquiry}
              className="px-6 py-3.5 rounded-xl text-sm font-mono font-bold bg-accent text-black hover:bg-white transition-all inline-flex items-center gap-2 shadow-[0_0_20px_rgba(183,255,60,0.3)] cursor-pointer"
            >
              <span>GET A SCOPED PROPOSAL</span>
              <ArrowUpRight size={16} />
            </button>

            <a
              href="https://wa.me/923132080033?text=Hi%20Sheharyar,%20I'm%20reaching%20out%20via%20your%20Freelancer%20in%20Pakistan%20page%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl text-sm font-mono font-semibold bg-surface-2 text-white hover:text-emerald-400 border border-brand-border/70 hover:border-emerald-500/40 transition-all inline-flex items-center gap-2"
            >
              <MessageSquare size={16} className="text-emerald-400" />
              <span>WHATSAPP DIRECT</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
