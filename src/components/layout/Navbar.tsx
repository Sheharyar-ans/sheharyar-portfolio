import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, ChevronDown, Globe, Sparkles, Layers, Cpu, Mic, Bot, Workflow, BarChart3, Terminal, Boxes, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenInquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setLocationsOpen(false);
  }, [location.pathname]);

  const aiAutomationServices = [
    { label: 'Autonomous AI Voice Agents', desc: 'Sub-600ms telephony & phone intake', slug: 'ai-voice-agents', icon: Mic },
    { label: 'AI Chatbots & RAG Systems', desc: 'Enterprise contextual vector knowledge', slug: 'ai-chatbots-rag', icon: Bot },
    { label: 'Workflow Automation & n8n', desc: 'Event-driven backend pipelines & CRM sync', slug: 'workflow-automation-n8n', icon: Workflow },
    { label: 'Agentic AI Applications', desc: 'Autonomous multi-agent orchestration', slug: 'agentic-ai-applications', icon: Sparkles },
    { label: 'AI Video Ads & Synthetic UGC', desc: 'High-ROAS Meta, TikTok & Shorts creatives', slug: 'ai-video-ads-ugc', icon: Video },
  ];

  const webEngineeringServices = [
    { label: 'Custom WordPress VIP', desc: 'Zero bloat, sub-second headless & core themes', slug: 'custom-wordpress-development', icon: Layers },
    { label: 'WooCommerce Architecture', desc: 'High-concurrency checkout & inventory engines', slug: 'woocommerce-systems-architecture', icon: Cpu },
    { label: 'Production Vibe Coding', desc: 'AI-assisted code auditing & production hardening', slug: 'vibe-coding-engineering', icon: Terminal },
    { label: 'Custom SaaS & MVP Engineering', desc: 'Multi-tenant apps, PostgreSQL & Stripe billing', slug: 'custom-saas-mvp-development', icon: Boxes },
    { label: 'Data Science & BI Pipelines', desc: 'Predictive analytics & executive dashboards', slug: 'data-science-analytics', icon: BarChart3 },
  ];

  const allServices = [...aiAutomationServices, ...webEngineeringServices];

  const locationItems = [
    { country: 'United States', flag: '🇺🇸', slug: 'usa' },
    { country: 'United Kingdom', flag: '🇬🇧', slug: 'uk' },
    { country: 'Germany & DACH', flag: '🇩🇪', slug: 'germany' },
    { country: 'Canada', flag: '🇨🇦', slug: 'canada' },
    { country: 'Dubai & UAE', flag: '🇦🇪', slug: 'uae' },
    { country: 'Saudi Arabia', flag: '🇸🇦', slug: 'saudi-arabia' },
    { country: 'Singapore', flag: '🇸🇬', slug: 'singapore' },
    { country: 'Malaysia', flag: '🇲🇾', slug: 'malaysia' },
    { country: 'Australia', flag: '🇦🇺', slug: 'australia' },
    { country: 'Netherlands', flag: '🇳🇱', slug: 'netherlands' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 py-4 ${
        isScrolled
          ? 'bg-bg/90 backdrop-blur-md border-b border-brand-border shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-heading font-extrabold text-sm sm:text-base tracking-wider text-white hover:text-accent transition-colors"
        >
          <span>SHEHARYAR SIRAJ</span>
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#B7FF3C]" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-mono tracking-widest text-brand-secondary">
          
          {/* Services Menu with Mega Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              to="/services/"
              className={`hover:text-accent transition-colors py-1 flex items-center gap-1 ${
                location.pathname.startsWith('/services') ? 'text-accent font-bold' : ''
              }`}
            >
              <span>SERVICES</span>
              <ChevronDown size={12} className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180 text-accent' : ''}`} />
            </Link>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-0 mt-2 w-[620px] rounded-2xl glass-panel p-4 border border-brand-border/80 shadow-2xl bg-surface-1/95 backdrop-blur-xl"
                >
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    {/* Column 1: AI & Automations */}
                    <div>
                      <div className="text-[10px] font-mono font-bold tracking-widest text-accent uppercase px-2 mb-2 flex items-center gap-1.5">
                        <Sparkles size={11} />
                        <span>AI & Automation Systems</span>
                      </div>
                      <div className="space-y-1">
                        {aiAutomationServices.map((svc) => {
                          const IconComp = svc.icon;
                          return (
                            <Link
                              key={svc.slug}
                              to={`/services/${svc.slug}/`}
                              className="flex items-start gap-2.5 p-2 rounded-xl text-brand-secondary hover:text-white hover:bg-surface-2 transition-all group"
                            >
                              <div className="p-1.5 rounded-lg bg-surface-2 group-hover:bg-accent/10 border border-brand-border/50 group-hover:border-accent/30 text-accent transition-colors shrink-0 mt-0.5">
                                <IconComp size={13} />
                              </div>
                              <div className="min-w-0">
                                <div className="text-[11px] font-medium tracking-wide text-white group-hover:text-accent transition-colors truncate">
                                  {svc.label}
                                </div>
                                <div className="text-[9px] text-brand-muted tracking-tight truncate">
                                  {svc.desc}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* Column 2: Web Engineering */}
                    <div>
                      <div className="text-[10px] font-mono font-bold tracking-widest text-accent uppercase px-2 mb-2 flex items-center gap-1.5">
                        <Cpu size={11} />
                        <span>Web & Systems Engineering</span>
                      </div>
                      <div className="space-y-1">
                        {webEngineeringServices.map((svc) => {
                          const IconComp = svc.icon;
                          return (
                            <Link
                              key={svc.slug}
                              to={`/services/${svc.slug}/`}
                              className="flex items-start gap-2.5 p-2 rounded-xl text-brand-secondary hover:text-white hover:bg-surface-2 transition-all group"
                            >
                              <div className="p-1.5 rounded-lg bg-surface-2 group-hover:bg-accent/10 border border-brand-border/50 group-hover:border-accent/30 text-accent transition-colors shrink-0 mt-0.5">
                                <IconComp size={13} />
                              </div>
                              <div className="min-w-0">
                                <div className="text-[11px] font-medium tracking-wide text-white group-hover:text-accent transition-colors truncate">
                                  {svc.label}
                                </div>
                                <div className="text-[9px] text-brand-muted tracking-tight truncate">
                                  {svc.desc}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/services/"
                    className="block p-2.5 rounded-xl bg-accent/10 hover:bg-accent hover:text-black text-accent text-[11px] font-bold tracking-wider transition-colors flex items-center justify-between border border-accent/20"
                  >
                    <span>EXPLORE ALL SERVICES & ARCHITECTURES (10 SPECIALIZATIONS)</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/white-label/marketing-agencies/"
            className={`hover:text-accent transition-colors py-1 relative group ${
              location.pathname.startsWith('/white-label') ? 'text-accent font-bold' : ''
            }`}
          >
            WHITE-LABEL
          </Link>

          <Link
            to="/case-studies/"
            className={`hover:text-accent transition-colors py-1 relative group ${
              location.pathname.startsWith('/case-studies') ? 'text-accent font-bold' : ''
            }`}
          >
            CASE STUDIES
          </Link>

          <Link
            to="/tools/"
            className={`hover:text-accent transition-colors py-1 relative group ${
              location.pathname.startsWith('/tools') ? 'text-accent font-bold' : ''
            }`}
          >
            TOOLS
          </Link>

          {/* Locations Menu with Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setLocationsOpen(true)}
            onMouseLeave={() => setLocationsOpen(false)}
          >
            <Link
              to="/locations/"
              className={`hover:text-accent transition-colors py-1 flex items-center gap-1 ${
                location.pathname.startsWith('/locations') ? 'text-accent font-bold' : ''
              }`}
            >
              <span>LOCATIONS</span>
              <ChevronDown size={12} className={`transition-transform duration-200 ${locationsOpen ? 'rotate-180 text-accent' : ''}`} />
            </Link>

            <AnimatePresence>
              {locationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-0 mt-2 w-80 rounded-2xl glass-panel p-3 border border-brand-border/80 shadow-2xl bg-surface-1/95 backdrop-blur-xl"
                >
                  <Link
                    to="/locations/"
                    className="block p-2 rounded-xl bg-accent/10 hover:bg-accent hover:text-black text-accent text-[11px] font-bold tracking-wider mb-2 transition-colors flex items-center justify-between"
                  >
                    <span>GLOBAL LOCATIONS HUB (10)</span>
                    <ArrowUpRight size={13} />
                  </Link>
                  <div className="grid grid-cols-2 gap-1">
                    {locationItems.map((loc) => (
                      <Link
                        key={loc.slug}
                        to={`/locations/${loc.slug}/`}
                        className="flex items-center gap-2 p-2 rounded-lg text-[11px] text-brand-secondary hover:text-white hover:bg-surface-2 transition-all"
                      >
                        <span className="text-base leading-none">{loc.flag}</span>
                        <span className="truncate">{loc.country}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/blog/"
            className={`hover:text-accent transition-colors py-1 relative group ${
              location.pathname.startsWith('/blog') ? 'text-accent font-bold' : ''
            }`}
          >
            BLOG
          </Link>

          <Link
            to="/about/"
            className={`hover:text-accent transition-colors py-1 relative group ${
              location.pathname.startsWith('/about') ? 'text-accent font-bold' : ''
            }`}
          >
            ABOUT
          </Link>

          <Link
            to="/contact/"
            className={`hover:text-accent transition-colors py-1 relative group ${
              location.pathname.startsWith('/contact') ? 'text-accent font-bold' : ''
            }`}
          >
            CONTACT
          </Link>
        </nav>

        {/* Action Button */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            type="button"
            onClick={onOpenInquiry}
            className="px-5 py-2.5 rounded-full text-xs font-bold font-mono tracking-wider bg-accent text-black hover:bg-white transition-all shadow-[0_0_20px_rgba(183,255,60,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] flex items-center gap-1.5 active:scale-95"
          >
            <span>BUILD MY AI SYSTEM</span>
            <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white p-2 focus:outline-none hover:text-accent transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-surface-1/95 backdrop-blur-xl border-b border-brand-border px-6 py-6 shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-3">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-mono tracking-widest py-2 border-b border-brand-border/40 ${
                  location.pathname === '/' ? 'text-accent font-bold' : 'text-brand-secondary hover:text-accent'
                }`}
              >
                HOME
              </Link>

              {/* Mobile Services Accordion */}
              <div className="border-b border-brand-border/40 pb-2">
                <div className="flex items-center justify-between py-2">
                  <Link
                    to="/services/"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm font-mono tracking-widest ${
                      location.pathname === '/services/' ? 'text-accent font-bold' : 'text-brand-secondary hover:text-accent'
                    }`}
                  >
                    <span>SERVICES HUB</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-accent/10 text-accent font-mono text-[10px] font-bold"
                  >
                    <span>10 SERVICES</span>
                    <ChevronDown size={12} className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {mobileServicesOpen && (
                  <div className="pl-2 pt-1 pb-2 space-y-1 bg-surface-2/40 rounded-xl mt-1 border border-brand-border/30">
                    {allServices.map((svc) => {
                      const IconComp = svc.icon;
                      return (
                        <Link
                          key={svc.slug}
                          to={`/services/${svc.slug}/`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 p-1.5 rounded-lg text-xs text-brand-secondary hover:text-white hover:bg-surface-2 transition-all"
                        >
                          <IconComp size={13} className="text-accent shrink-0" />
                          <span className="truncate">{svc.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Link
                to="/locations/"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-mono tracking-widest py-2 border-b border-brand-border/40 flex items-center justify-between ${
                  location.pathname === '/locations/' ? 'text-accent font-bold' : 'text-brand-secondary hover:text-accent'
                }`}
              >
                <span>LOCATIONS HUB</span>
                <span className="text-[10px] text-accent font-bold px-2 py-0.5 rounded bg-accent/10">10 COUNTRIES</span>
              </Link>

              <Link
                to="/white-label/marketing-agencies/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono tracking-widest py-2 border-b border-brand-border/40 text-brand-secondary hover:text-accent"
              >
                WHITE-LABEL PARTNERSHIPS
              </Link>

              <Link
                to="/case-studies/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono tracking-widest py-2 border-b border-brand-border/40 text-brand-secondary hover:text-accent"
              >
                CASE STUDIES
              </Link>

              <Link
                to="/tools/"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-mono tracking-widest py-2 border-b border-brand-border/40 flex items-center justify-between ${
                  location.pathname === '/tools/' ? 'text-accent font-bold' : 'text-brand-secondary hover:text-accent'
                }`}
              >
                <span>SYSTEMS & UTILITY TOOLS</span>
                <span className="text-[10px] text-accent font-bold px-2 py-0.5 rounded bg-accent/10">10 UTILITIES</span>
              </Link>

              <Link
                to="/blog/"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-mono tracking-widest py-2 border-b border-brand-border/40 flex items-center justify-between ${
                  location.pathname.startsWith('/blog') ? 'text-accent font-bold' : 'text-brand-secondary hover:text-accent'
                }`}
              >
                <span>BLOG & GUIDES</span>
                <span className="text-[10px] text-accent font-bold px-2 py-0.5 rounded bg-accent/10">10 ARTICLES</span>
              </Link>

              <Link
                to="/about/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono tracking-widest py-2 border-b border-brand-border/40 text-brand-secondary hover:text-accent"
              >
                ABOUT
              </Link>

              <Link
                to="/contact/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono tracking-widest py-2 border-b border-brand-border/40 text-brand-secondary hover:text-accent"
              >
                CONTACT
              </Link>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="mt-3 w-full py-3.5 rounded-xl text-xs font-bold font-mono tracking-wider bg-accent text-black hover:bg-white flex items-center justify-center gap-2"
              >
                <span>BUILD MY AI SYSTEM</span>
                <ArrowUpRight size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
