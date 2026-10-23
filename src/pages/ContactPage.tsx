import React, { useState } from 'react';
import { Mail, MessageSquare, MapPin, Clock, ArrowUpRight, CheckCircle2, ShieldCheck, Sparkles, Send, ExternalLink } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { AeoDirectAnswer } from '../components/seo/AeoDirectAnswer';
import { CONTACT_INFO } from '../data/portfolioData';

interface ContactPageProps {
  onOpenInquiry: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenInquiry }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceInterest: 'Custom WordPress & WooCommerce',
    budget: '$3,000 - $5,000',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Direct AJAX delivery to sherryansari870@gmail.com
      await fetch(`https://formsubmit.co/ajax/${CONTACT_INFO.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Project Inquiry: ${formData.serviceInterest} - ${formData.name}`,
          Name: formData.name,
          Email: formData.email,
          Service: formData.serviceInterest,
          Budget: formData.budget,
          Message: formData.message,
          _template: 'table'
        })
      });
    } catch (err) {
      console.warn('Form submission delivery error:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': 'https://sheharyarsiraj.com/contact/#contactpage',
    url: 'https://sheharyarsiraj.com/contact/',
    name: 'Contact Sheharyar Siraj: Direct Project Scoping',
    description: 'Direct inquiry and architecture scoping with Sheharyar Siraj. Sub-2 hour response SLA.',
    mainEntity: {
      '@type': 'Person',
      name: 'Sheharyar Siraj',
      email: 'sherryansari870@gmail.com',
      telephone: '+923132080033',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer & Technical Scoping',
        email: 'sherryansari870@gmail.com',
        telephone: '+923132080033',
        availableLanguage: ['English', 'Urdu', 'Arabic']
      }
    }
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <SEOHead
        title="Contact Sheharyar Siraj | Hire AI & WP Engineer"
        description="Connect directly with Sheharyar Siraj. Sub-2 hour response time SLA, WhatsApp instant channel, email, and scheduled architecture scoping sessions."
        canonicalUrl="https://sheharyarsiraj.com/contact/"
        schema={contactSchema}
      />

      <Breadcrumbs items={[{ label: 'CONTACT & INQUIRY' }]} />

      {/* Header */}
      <div className="mt-8 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
          <Clock size={14} />
          <span>SLA RESPONSE TIME: UNDER 2 HOURS</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
          Direct Project <span className="text-accent">Scoping & Contact</span>
        </h1>
        <p className="text-brand-secondary text-base sm:text-xl max-w-3xl leading-relaxed font-body">
          Connect directly with Principal Architect Sheharyar Siraj. Zero account manager friction, transparent technical evaluation, and rapid turnaround.
        </p>
      </div>

      {/* AEO Direct Answer */}
      <AeoDirectAnswer
        summary="Direct project consultation with Sheharyar Siraj is available via WhatsApp (+923132080033), direct email (sherryansari870@gmail.com), or scheduled architecture scoping sessions. Inquiries receive an initial technical feasibility response within 2 business hours, covering scope, milestone pricing, and architectural requirements."
        keyTakeaways={[
          'Initial technical scoping response guaranteed under 2 business hours.',
          'Direct senior engineer access without junior account managers.',
          'Mutual Non-Disclosure Agreement (NDA) executed on request prior to code review.',
          'Global currency billing in USD, GBP, EUR, AED, SAR, and CAD.'
        ]}
        badge="AEO DIRECT CONTACT & SCOPING PROTOCOL"
      />

      {/* Grid: Direct Channels + Interactive Form */}
      <div className="my-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Direct Channels & Scoping Checklist */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-brand-border/60 space-y-6">
            <h2 className="font-mono text-xs font-bold text-white uppercase tracking-wider pb-3 border-b border-brand-border/40">
              DIRECT VERIFIED CHANNELS
            </h2>

            {/* WhatsApp */}
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-surface-2 border border-emerald-500/30 hover:border-emerald-400 transition-all flex items-center justify-between group block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-white group-hover:text-emerald-400">
                    WHATSAPP DIRECT
                  </div>
                  <div className="font-mono text-xs text-brand-secondary">
                    {CONTACT_INFO.phone}
                  </div>
                </div>
              </div>
              <ArrowUpRight size={16} className="text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Direct Email */}
            <a
              href={CONTACT_INFO.emailUrl}
              className="p-4 rounded-xl bg-surface-2 border border-accent/30 hover:border-accent transition-all flex items-center justify-between group block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-white group-hover:text-accent">
                    DIRECT EMAIL
                  </div>
                  <div className="font-mono text-xs text-brand-secondary truncate max-w-[200px]">
                    {CONTACT_INFO.email}
                  </div>
                </div>
              </div>
              <ArrowUpRight size={16} className="text-accent group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Location & Relocation info */}
            <div className="p-4 rounded-xl bg-surface-2 border border-brand-border/40 space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-white">
                <MapPin size={14} className="text-accent" />
                <span>LOCATION & MOBILITY</span>
              </div>
              <p className="text-xs text-brand-secondary font-body leading-relaxed">
                {CONTACT_INFO.locationDetails}
              </p>
            </div>
          </div>

          {/* Scoping Checklist */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-brand-border/60 space-y-4">
            <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              PROJECT SCOPING CHECKLIST:
            </h3>
            <ul className="space-y-2.5 text-xs text-brand-secondary font-mono">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                <span>Existing website URL or Figma design files</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                <span>Target technical stack or integration requirements (CRMs, APIs)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                <span>Expected launch timeline & milestone deadlines</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                <span>B2B procurement preference (Fixed-Price or Monthly Retainer)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right: Interactive Scoping Form */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-10 rounded-2xl border border-brand-border/60">
          <div className="mb-6 pb-4 border-b border-brand-border/40">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-white mb-1">
              Submit Project Scoping Brief
            </h2>
            <p className="text-xs sm:text-sm text-brand-secondary font-body">
              Fill out the details below to receive a guaranteed response within 2 hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
              <CheckCircle2 size={40} className="text-emerald-400 mx-auto" />
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                Project Scope Transmitted!
              </h3>
              <p className="text-xs sm:text-sm text-brand-secondary font-body max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-white font-semibold">{formData.name}</span>. Your inquiry has been sent directly to Principal Architect Sheharyar Siraj. You will receive an architecture evaluation within 2 hours.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 text-black font-mono text-xs font-bold hover:bg-white transition-all flex items-center gap-1.5"
                >
                  <MessageSquare size={14} />
                  <span>INSTANT CHAT ON WHATSAPP</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      serviceInterest: 'Custom WordPress & WooCommerce',
                      budget: '$3,000 - $5,000',
                      message: ''
                    });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-surface-2 text-white font-mono text-xs hover:bg-surface-3 transition-colors border border-white/10"
                >
                  Submit Another Brief
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-brand-muted uppercase font-bold mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alexander Vance"
                    className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-brand-border text-white text-xs font-mono focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-brand-muted uppercase font-bold mb-1.5">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-brand-border text-white text-xs font-mono focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-brand-muted uppercase font-bold mb-1.5">
                    Service Interest
                  </label>
                  <select
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-brand-border text-white text-xs font-mono focus:outline-none focus:border-accent transition-colors"
                  >
                    <option value="Custom WordPress & WooCommerce">Custom WordPress & WooCommerce</option>
                    <option value="Autonomous AI Voice Agents">Autonomous AI Voice Agents</option>
                    <option value="AI Chatbots & Contextual RAG">AI Chatbots & Contextual RAG</option>
                    <option value="Workflow Automation (n8n/Make)">Workflow Automation (n8n/Make)</option>
                    <option value="Agency White-Label Partnership">Agency White-Label Partnership</option>
                    <option value="Full Digital System Ecosystem">Full Digital System Ecosystem</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-brand-muted uppercase font-bold mb-1.5">
                    Project Budget Bracket
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-brand-border text-white text-xs font-mono focus:outline-none focus:border-accent transition-colors"
                  >
                    <option value="$2,000 - $3,500">$2,000 - $3,500 (Targeted Build / Fast Turnaround)</option>
                    <option value="$3,500 - $7,500">$3,500 - $7,500 (Comprehensive Architecture)</option>
                    <option value="$7,500 - $15,000+">$7,500 - $15,000+ (Full Multi-Channel System)</option>
                    <option value="Monthly Agency Retainer">Monthly Agency Retainer ($2,500 - $6,000/mo)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-brand-muted uppercase font-bold mb-1.5">
                  Project Description & Specifications *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline your existing system, current bottlenecks, integrations needed (CRMs, payment gateways), or agency requirements..."
                  className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-brand-border text-white text-xs font-mono focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-accent text-black font-mono text-xs font-bold tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(183,255,60,0.3)] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>TRANSMITTING INQUIRY...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>TRANSMIT PROJECT SCOPE</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] font-mono text-brand-muted text-center pt-2">
                Protected by strict mutual confidentiality. We will never share your information.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
