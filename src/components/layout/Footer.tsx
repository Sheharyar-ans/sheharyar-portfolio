import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MessageSquare, MapPin, Linkedin, Globe, Shield, Terminal } from 'lucide-react';
import { CONTACT_INFO } from '../../data/portfolioData';

interface FooterProps {
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInquiry }) => {
  return (
    <footer className="border-t border-brand-border/60 bg-surface-1/90 pt-16 pb-12 text-left relative z-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-brand-border/50">
          
          {/* Col 1: Brand (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-2 font-heading font-extrabold text-base text-white hover:text-accent transition-colors">
              <span>SHEHARYAR SIRAJ</span>
              <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#B7FF3C]" />
            </Link>
            <div className="text-xs font-mono text-accent">
              AI Automation Architect & WordPress Systems Engineer
            </div>
            <p className="text-xs sm:text-sm text-brand-secondary leading-relaxed max-w-sm">
              I build connected digital systems where WordPress provides the foundation, AI provides intelligence, and automation handles execution. 1,200+ projects delivered worldwide.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenInquiry}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-accent text-black hover:bg-white transition-all inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(183,255,60,0.25)]"
              >
                <span>INITIATE PROJECT INQUIRY</span>
                <ArrowUpRight size={13} />
              </button>
            </div>
          </div>

          {/* Col 2: Services Taxonomy (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-mono tracking-widest text-brand-muted uppercase font-bold flex items-center gap-1.5">
              <span>SERVICES TAXONOMY (10)</span>
            </div>
            <ul className="space-y-1.5 text-xs font-mono text-brand-secondary">
              <li>
                <Link to="/services/" className="hover:text-accent transition-colors block py-0.5 text-white font-bold">
                  → All Architectural Services Hub
                </Link>
              </li>
              <li>
                <Link to="/services/custom-wordpress-development/" className="hover:text-accent transition-colors block py-0.5">
                  Custom WordPress Development
                </Link>
              </li>
              <li>
                <Link to="/services/woocommerce-systems-architecture/" className="hover:text-accent transition-colors block py-0.5">
                  WooCommerce Architecture
                </Link>
              </li>
              <li>
                <Link to="/services/ai-voice-agents/" className="hover:text-accent transition-colors block py-0.5">
                  Autonomous AI Voice Agents
                </Link>
              </li>
              <li>
                <Link to="/services/ai-chatbots-rag/" className="hover:text-accent transition-colors block py-0.5">
                  Contextual AI Chatbots & RAG
                </Link>
              </li>
              <li>
                <Link to="/services/workflow-automation-n8n/" className="hover:text-accent transition-colors block py-0.5">
                  Workflow Automation (n8n/Make)
                </Link>
              </li>
              <li>
                <Link to="/services/agentic-ai-applications/" className="hover:text-accent transition-colors block py-0.5">
                  Agentic AI & Multi-Agent Apps
                </Link>
              </li>
              <li>
                <Link to="/services/vibe-coding-engineering/" className="hover:text-accent transition-colors block py-0.5 text-accent">
                  Production Vibe Coding & Hardening
                </Link>
              </li>
              <li>
                <Link to="/services/custom-saas-mvp-development/" className="hover:text-accent transition-colors block py-0.5 text-accent">
                  Custom SaaS Architecture & MVP
                </Link>
              </li>
              <li>
                <Link to="/services/ai-video-ads-ugc/" className="hover:text-accent transition-colors block py-0.5 text-accent">
                  AI Video Ads & Synthetic UGC
                </Link>
              </li>
              <li>
                <Link to="/services/data-science-analytics/" className="hover:text-accent transition-colors block py-0.5">
                  Data Science & BI Pipelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: White-Label & Regional GEO (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-mono tracking-widest text-brand-muted uppercase font-bold">
              PARTNERS & REGIONS
            </div>
            <ul className="space-y-1.5 text-xs font-mono text-brand-secondary">
              <li>
                <Link to="/white-label/marketing-agencies/" className="hover:text-accent transition-colors block py-0.5 text-accent font-semibold">
                  Marketing Agencies
                </Link>
              </li>
              <li>
                <Link to="/white-label/seo-agencies/" className="hover:text-accent transition-colors block py-0.5 text-accent font-semibold">
                  SEO Agencies
                </Link>
              </li>
              <li className="pt-2 text-[10px] text-brand-muted uppercase font-bold">
                REGIONAL HUBS:
              </li>
              <li>
                <Link to="/freelancer-in-pakistan/" className="hover:text-accent transition-colors block py-0.5 text-accent font-semibold">
                  🇵🇰 Freelancer in Pakistan
                </Link>
              </li>
              <li>
                <Link to="/locations/usa/" className="hover:text-white transition-colors block py-0.5">
                  🇺🇸 United States
                </Link>
              </li>
              <li>
                <Link to="/locations/uk/" className="hover:text-white transition-colors block py-0.5">
                  🇬🇧 United Kingdom
                </Link>
              </li>
              <li>
                <Link to="/locations/canada/" className="hover:text-white transition-colors block py-0.5">
                  🇨🇦 Canada
                </Link>
              </li>
              <li>
                <Link to="/locations/uae/" className="hover:text-white transition-colors block py-0.5">
                  🇦🇪 Dubai & UAE
                </Link>
              </li>
              <li>
                <Link to="/locations/saudi-arabia/" className="hover:text-white transition-colors block py-0.5">
                  🇸🇦 Saudi Arabia
                </Link>
              </li>
              <li>
                <Link to="/locations/netherlands/" className="hover:text-white transition-colors block py-0.5">
                  🇳🇱 Netherlands
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Verification & Direct Channels (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-mono tracking-widest text-brand-muted uppercase font-bold">
              VERIFICATION & DIRECT
            </div>
            <ul className="space-y-2 text-xs font-mono text-brand-secondary">
              <li>
                <Link to="/blog/" className="hover:text-accent transition-colors block py-0.5 text-accent font-bold">
                  → Technical Blog & Deep Dives (10)
                </Link>
              </li>
              <li>
                <Link to="/code-arcade/" className="hover:text-accent transition-colors block py-0.5 text-accent font-bold flex items-center gap-1.5 group">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#B7FF3C]" />
                  <span>→ 🎮 Play 3D Code Arcade (Free)</span>
                </Link>
              </li>
              <li>
                <Link to="/tools/" className="hover:text-accent transition-colors block py-0.5 text-accent font-bold">
                  → Systems & Utility Tools (10)
                </Link>
              </li>
              <li>
                <Link to="/case-studies/" className="hover:text-accent transition-colors block py-0.5 text-white font-medium">
                  Verified Case Studies
                </Link>
              </li>
              <li>
                <Link to="/about/" className="hover:text-accent transition-colors block py-0.5 text-white font-medium">
                  About Background & Experience
                </Link>
              </li>
              <li>
                <Link to="/certifications/" className="hover:text-accent transition-colors block py-0.5 text-accent font-semibold">
                  ★ Verified Certifications & CCNP
                </Link>
              </li>
              <li>
                <Link to="/contact/" className="hover:text-accent transition-colors block py-0.5 text-white font-medium">
                  Direct Project Inquiry Center
                </Link>
              </li>
              <li className="pt-2">
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-2 py-0.5 group"
                >
                  <MessageSquare size={13} className="text-emerald-400" />
                  <span className="text-white group-hover:text-emerald-400">WhatsApp: {CONTACT_INFO.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_INFO.emailUrl}
                  className="hover:text-accent transition-colors flex items-center gap-2 py-0.5 group"
                >
                  <Mail size={13} className="text-accent" />
                  <span className="text-white group-hover:text-accent truncate max-w-[200px]">{CONTACT_INFO.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_INFO.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors flex items-center gap-2 py-0.5 text-brand-muted hover:text-white"
                >
                  <span>Upwork: Verified Engineer (1,200+ Delivered)</span>
                  <ArrowUpRight size={11} />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Primary Clean Bottom Navigation */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-brand-muted">
          <div>
            © {new Date().getFullYear()} Sheharyar Siraj. All Rights Reserved. Enterprise Systems Architecture.
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link to="/privacy-policy/" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms/" className="hover:text-accent transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link to="/certifications/" className="hover:text-accent transition-colors">
              Certifications & Credentials
            </Link>
            <span>•</span>
            <Link to="/tools/" className="hover:text-accent transition-colors">
              Tools Hub
            </Link>
            <span>•</span>
            <Link to="/contact/" className="hover:text-accent transition-colors inline-flex items-center gap-1.5 text-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Status: Available</span>
            </Link>
          </div>
        </div>

        {/* Low-Profile Crawler & Machine Metadata Row */}
        <div className="mt-4 pt-3 border-t border-brand-border/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-brand-muted/50">
          <div className="tracking-wider uppercase text-[9px] text-brand-muted/40">
            CRAWLER ENDPOINTS & AI DISCOVERY:
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href="/sitemap.xml" className="hover:text-accent/80 transition-colors">
              sitemap.xml
            </a>
            <span>/</span>
            <a href="/llms.txt" className="hover:text-accent/80 transition-colors">
              llms.txt
            </a>
            <span>/</span>
            <a href="/llms-full.txt" className="hover:text-accent/80 transition-colors">
              llms-full.txt
            </a>
            <span>/</span>
            <a href="/ai-catalog.json" className="hover:text-accent/80 transition-colors">
              ai-catalog.json
            </a>
            <span className="hidden sm:inline">•</span>
            <span className="text-[9px] text-brand-muted/40 hidden sm:inline">ARD 1.0 & Schema.org Compliant</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
