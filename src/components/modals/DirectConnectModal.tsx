import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  MessageSquare,
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  Sparkles,
  Clock,
  MapPin,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { CONTACT_INFO } from '../../data/portfolioData';

interface DirectConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DirectConnectModal: React.FC<DirectConnectModalProps> = ({ isOpen, onClose }) => {
  const [copiedType, setCopiedType] = useState<'phone' | 'email' | null>(null);
  const [timeDubai, setTimeDubai] = useState('');
  const [timeKarachi, setTimeKarachi] = useState('');

  // Live dual timezone clocks
  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setTimeDubai(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Dubai',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
      setTimeKarachi(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const copyToClipboard = (text: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div data-lenis-prevent="true" className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden">
          {/* Backdrop with dark blur and grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Holographic Cyber Direct Connect Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full h-[100dvh] max-h-[100dvh] sm:h-auto sm:max-h-[85vh] md:max-h-[88vh] sm:max-w-lg lg:max-w-xl bg-gradient-to-b from-[#141414] to-[#0A0A0A] border-0 sm:border sm:border-brand-border/80 rounded-none sm:rounded-3xl shadow-[0_0_50px_rgba(183,255,60,0.15)] z-10 overflow-hidden flex flex-col overscroll-contain my-auto pb-[env(safe-area-inset-bottom,0px)]"
          >
            {/* Top scanning accent glow bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent shadow-[0_0_15px_#B7FF3C] z-20" />

            {/* Ambient background light spheres */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Pinned Header / Status Bar */}
            <div className="flex items-center justify-between gap-3 p-4 sm:p-6 pb-3 sm:pb-4 border-b border-brand-border/60 bg-[#141414]/90 backdrop-blur-md shrink-0 z-10">
              <div className="flex items-center gap-2 min-w-0">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent shadow-[0_0_8px_#B7FF3C]" />
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono tracking-wider sm:tracking-widest text-accent font-bold uppercase truncate">
                  DIRECT COMMS • NO FORMS, NO DELAYS
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-surface-2 hover:bg-surface-3 text-brand-secondary hover:text-white flex items-center justify-center transition-colors border border-brand-border/50 shrink-0"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable Modal Body */}
            <div className="flex-1 overflow-y-auto overscroll-contain custom-scrollbar p-4 sm:p-6 pt-3 sm:pt-4 space-y-4">
              {/* Title & Introduction */}
              <div className="text-left">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-black text-white tracking-tight flex items-center gap-2">
                  <span>TALK DIRECTLY WITH SHEHARYAR</span>
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm text-brand-secondary leading-relaxed">
                  Skip long inquiry forms. Connect directly via WhatsApp or email for instant project consultations, white-label agency partnerships, or immediate hiring.
                </p>
              </div>

              {/* Two Main Direct Channels */}
              <div className="space-y-3 sm:space-y-4">
                {/* Channel 1: WhatsApp (Primary) */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-surface-1/90 border border-brand-border hover:border-accent/60 transition-all hover:bg-surface-2/90 group relative">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                        <MessageSquare size={20} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] sm:text-xs font-mono tracking-wider text-emerald-400 font-bold uppercase">
                            WHATSAPP DIRECT
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                            FASTEST REPLY
                          </span>
                        </div>
                        <a
                          href={CONTACT_INFO.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm sm:text-base md:text-lg font-heading font-bold text-white hover:text-accent transition-colors block mt-0.5 tracking-wide truncate"
                        >
                          {CONTACT_INFO.phone}
                        </a>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 pt-1 sm:pt-0">
                      <button
                        type="button"
                        onClick={() => copyToClipboard(CONTACT_INFO.phone, 'phone')}
                        className="flex-1 sm:flex-none justify-center px-3 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 text-brand-secondary hover:text-white text-xs font-mono flex items-center gap-1.5 border border-brand-border/60 transition-colors"
                        title="Copy phone number"
                      >
                        {copiedType === 'phone' ? (
                          <>
                            <Check size={13} className="text-accent" />
                            <span className="text-accent">COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>COPY</span>
                          </>
                        )}
                      </button>

                      <a
                        href={CONTACT_INFO.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-none justify-center px-4 py-2 rounded-xl bg-accent text-black hover:bg-white text-xs font-mono font-bold tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(183,255,60,0.3)] transition-all active:scale-95"
                      >
                        <span>CHAT NOW</span>
                        <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Channel 2: Direct Email */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-surface-1/90 border border-brand-border hover:border-accent/60 transition-all hover:bg-surface-2/90 group relative">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0 group-hover:scale-105 group-hover:bg-accent group-hover:text-black transition-all">
                        <Mail size={20} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] sm:text-xs font-mono tracking-wider text-accent font-bold uppercase">
                            DIRECT INBOX
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono bg-accent/10 text-accent border border-accent/20">
                            PROPOSALS & RFPs
                          </span>
                        </div>
                        <a
                          href={CONTACT_INFO.emailUrl}
                          className="text-xs sm:text-sm md:text-base font-heading font-bold text-white hover:text-accent transition-colors block mt-0.5 break-all sm:truncate"
                        >
                          {CONTACT_INFO.email}
                        </a>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 pt-1 sm:pt-0">
                      <button
                        type="button"
                        onClick={() => copyToClipboard(CONTACT_INFO.email, 'email')}
                        className="flex-1 sm:flex-none justify-center px-3 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 text-brand-secondary hover:text-white text-xs font-mono flex items-center gap-1.5 border border-brand-border/60 transition-colors"
                        title="Copy email address"
                      >
                        {copiedType === 'email' ? (
                          <>
                            <Check size={13} className="text-accent" />
                            <span className="text-accent">COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>COPY</span>
                          </>
                        )}
                      </button>

                      <a
                        href={CONTACT_INFO.emailUrl}
                        className="flex-1 sm:flex-none justify-center px-4 py-2 rounded-xl bg-surface-3 hover:bg-white hover:text-black text-white text-xs font-mono font-bold tracking-wider flex items-center gap-1.5 border border-brand-border transition-all active:scale-95"
                      >
                        <span>SEND EMAIL</span>
                        <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Verified Freelance Escrow Platforms (Upwork & Fiverr) */}
                <div className="pt-1">
                  <div className="text-[10px] font-mono tracking-wider sm:tracking-widest text-brand-muted uppercase mb-2 font-semibold">
                    OR HIRE SECURELY VIA ESCROW (UPWORK / FIVERR)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <a
                      href={CONTACT_INFO.upwork}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-surface-1/90 border border-brand-border hover:border-[#14a800]/70 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-[#14a800]/15 text-[#14a800] text-xs font-heading font-black flex items-center justify-center shrink-0">
                          Up
                        </span>
                        <div className="text-left min-w-0">
                          <div className="text-xs font-bold text-white group-hover:text-accent transition-colors truncate">Upwork Profile</div>
                          <div className="text-[10px] font-mono text-brand-muted">Verified Engineer • Escrow</div>
                        </div>
                      </div>
                      <ArrowUpRight size={13} className="text-brand-muted group-hover:text-white transition-colors shrink-0" />
                    </a>

                    <a
                      href={CONTACT_INFO.fiverr}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-surface-1/90 border border-brand-border hover:border-[#1dbf73]/70 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-[#1dbf73]/15 text-[#1dbf73] text-xs font-heading font-black flex items-center justify-center shrink-0">
                          fi
                        </span>
                        <div className="text-left min-w-0">
                          <div className="text-xs font-bold text-white group-hover:text-accent transition-colors truncate">Fiverr Profile</div>
                          <div className="text-[10px] font-mono text-brand-muted">Freelance Work • Custom Code</div>
                        </div>
                      </div>
                      <ArrowUpRight size={13} className="text-brand-muted group-hover:text-white transition-colors shrink-0" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Regional Clocks & Availability Banner */}
              <div className="pt-2 border-t border-brand-border/60 grid grid-cols-2 gap-2.5 text-left">
                <div className="p-2.5 sm:p-3 rounded-xl bg-surface-2/60 border border-brand-border/40 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono text-brand-secondary">
                    <Clock size={13} className="text-accent shrink-0" />
                    <span className="truncate">DUBAI (GST)</span>
                  </div>
                  <span className="text-[11px] sm:text-xs font-mono font-bold text-white shrink-0">
                    {timeDubai || '--:--'}
                  </span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl bg-surface-2/60 border border-brand-border/40 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono text-brand-secondary">
                    <Clock size={13} className="text-accent shrink-0" />
                    <span className="truncate">KARACHI (PKT)</span>
                  </div>
                  <span className="text-[11px] sm:text-xs font-mono font-bold text-white shrink-0">
                    {timeKarachi || '--:--'}
                  </span>
                </div>
              </div>

              {/* Bottom Availability Notes */}
              <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono text-brand-secondary">
                <div className="flex items-center gap-1.5">
                  <MapPin size={12} className="text-accent shrink-0" />
                  <span>Open for On-Site / Remote in Dubai & Saudi Arabia</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-emerald-400 shrink-0" />
                  <span>100% Confidential & White-Label Friendly</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
