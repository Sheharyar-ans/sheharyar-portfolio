import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  X,
  PhoneCall,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  MessageSquare,
  Mail,
  Zap,
  Globe2
} from 'lucide-react';
import { CONTACT_INFO } from '../../data/portfolioData';

interface FloatingScopingCtaProps {
  onOpenInquiry: () => void;
}

export const FloatingScopingCta: React.FC<FloatingScopingCtaProps> = ({ onOpenInquiry }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('AI Voice Telephony & Telephony SIP');
  const [submitted, setSubmitted] = useState(false);
  const [callerName, setCallerName] = useState('');
  const [callerEmail, setCallerEmail] = useState('');
  const [callerPhone, setCallerPhone] = useState('');
  const [selectedTimezone, setSelectedTimezone] = useState('Dubai (GST / UTC+4)');

  const topics = [
    'Autonomous AI Voice & Twilio SIP (<500ms)',
    'Deterministic AI Agent Runtime (LangGraph/Temporal)',
    'Enterprise n8n Clusters (Replacing Zapier)',
    'White-Label Headless WordPress (UK & Europe)',
    'Saudi Building Automation & IoT Telemetry'
  ];

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Open the primary inquiry modal or trigger lead sync
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
      onOpenInquiry();
    }, 1200);
  };

  return (
    <>
      {/* Accessible Floating Scoping Call Pill (Bottom-Left) */}
      <div className="fixed bottom-6 left-5 sm:left-6 z-40 print:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-surface-1/95 hover:bg-surface-2 border border-accent/40 hover:border-accent text-white shadow-[0_0_30px_rgba(183,255,60,0.22)] backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label="Book 15-Minute Technical Scoping Call with Sheharyar Siraj"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
        >
          {/* Pulsing online indicator */}
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-accent shadow-[0_0_8px_#B7FF3C]" />
          </span>

          <div className="flex flex-col text-left">
            <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-accent uppercase font-bold flex items-center gap-1">
              <span>PRIORITY ACCESS</span>
              <span className="hidden xs:inline">• THIS WEEK</span>
            </span>
            <span className="font-heading font-extrabold text-xs sm:text-sm text-white group-hover:text-accent transition-colors flex items-center gap-1.5">
              <Calendar size={13} className="text-accent shrink-0" />
              <span>Book 15-Min Scoping Call</span>
            </span>
          </div>
        </button>
      </div>

      {/* High-Converting 15-Minute Scoping Drawer / Modal */}
      <AnimatePresence>
        {isOpen && (
          <div
            data-lenis-prevent="true"
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/80 backdrop-blur-md overflow-hidden animate-fadeIn"
            role="dialog"
            aria-modal="true"
            aria-labelledby="scoping-dialog-title"
          >
            {/* Backdrop Dismiss */}
            <div
              className="absolute inset-0 -z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-[#0F0F0F] border border-brand-border/80 sm:rounded-3xl rounded-t-3xl shadow-[0_0_50px_rgba(183,255,60,0.2)] overflow-hidden flex flex-col max-h-[90dvh]"
            >
              {/* Top Accent Strip */}
              <div className="h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

              {/* Header */}
              <div className="p-5 sm:p-6 pb-4 border-b border-brand-border/60 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#B7FF3C]" />
                    <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold">
                      15-MINUTE TECHNICAL SCOPING SESSION
                    </span>
                  </div>
                  <h2
                    id="scoping-dialog-title"
                    className="font-heading text-lg sm:text-xl font-bold text-white tracking-tight"
                  >
                    Schedule Direct Architecture Discovery
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-surface-2 hover:bg-surface-1 border border-brand-border text-brand-secondary hover:text-white transition-colors cursor-pointer"
                  aria-label="Close scoping dialog"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-left font-body">
                <p className="text-xs sm:text-sm text-brand-secondary leading-relaxed">
                  Direct 1-on-1 architecture scoping with <strong className="text-white">Sheharyar Siraj</strong>. We review your current system stack, identify latency bottlenecks, and design a concrete implementation plan. Zero junior sales reps.
                </p>

                {/* Instant Topic Selector */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-brand-secondary mb-2 font-semibold">
                    SELECT SCOPING FOCUS:
                  </label>
                  <div className="space-y-1.5">
                    {topics.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTopic(t)}
                        className={`w-full text-left p-2.5 rounded-xl text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${
                          selectedTopic === t
                            ? 'bg-accent/15 border border-accent text-white font-bold'
                            : 'bg-surface-2/60 border border-brand-border/60 text-brand-secondary hover:text-white hover:bg-surface-2'
                        }`}
                      >
                        <span className="truncate pr-2">{t}</span>
                        {selectedTopic === t && <Check size={13} className="text-accent shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timezone Overlap Selection */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-brand-secondary mb-1.5 font-semibold">
                    REGIONAL TIMEZONE OVERLAP:
                  </label>
                  <select
                    value={selectedTimezone}
                    onChange={(e) => setSelectedTimezone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-2 border border-brand-border/80 text-white font-mono text-xs focus:border-accent focus:outline-none"
                  >
                    <option value="Dubai (GST / UTC+4)">Dubai, UAE (GST / UTC+4)</option>
                    <option value="Riyadh (AST / UTC+3)">Riyadh & Jeddah, Saudi Arabia (AST / UTC+3)</option>
                    <option value="London (GMT / UTC+0)">London, United Kingdom (GMT / UTC+0)</option>
                    <option value="Amsterdam (CET / UTC+1)">Amsterdam, Netherlands (CET / UTC+1)</option>
                    <option value="New York (EST / UTC-5)">New York, United States (EST / UTC-5)</option>
                  </select>
                </div>

                {/* Direct Action Hub */}
                <div className="pt-2 border-t border-brand-border/40 space-y-3">
                  <div className="grid grid-cols-2 gap-2.5">
                    <a
                      href={CONTACT_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 hover:border-emerald-400 text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                    >
                      <MessageSquare size={14} className="text-emerald-400" />
                      <span>WHATSAPP VIP</span>
                    </a>

                    <a
                      href={`mailto:${CONTACT_INFO.email}?subject=15-Min%20Technical%20Scoping%20Call%20-%20${encodeURIComponent(selectedTopic)}`}
                      className="p-3 rounded-xl bg-surface-2 border border-brand-border/80 hover:border-accent text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                    >
                      <Mail size={14} className="text-accent" />
                      <span>DIRECT EMAIL</span>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      onOpenInquiry();
                    }}
                    className="w-full py-3.5 px-4 rounded-xl bg-accent text-black font-mono text-xs font-black tracking-wider uppercase hover:bg-white transition-all shadow-[0_0_20px_rgba(183,255,60,0.3)] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>OPEN FULL CALENDAR & SCOPE FORM</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-3 text-[10px] font-mono text-brand-secondary pt-1">
                  <span className="flex items-center gap-1 text-white/80">
                    <ShieldCheck size={12} className="text-accent" />
                    <span>Strict Bilateral NDA</span>
                  </span>
                  <span>•</span>
                  <span>1,200+ Projects</span>
                  <span>•</span>
                  <span>Direct Architect Sync</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
