import React, { useState } from 'react';
import { CheckCircle2, MessageSquare, Mail, Phone, Sparkles, Send, X } from 'lucide-react';
import { ClientInquiryArgs } from '../../services/voiceGeminiBrain';
import { ARCHITECT_IDENTITY } from '../../data/groundTruthKnowledge';

interface LeadConfirmationModalProps {
  lead: ClientInquiryArgs;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LeadConfirmationModal: React.FC<LeadConfirmationModalProps> = ({
  lead,
  isOpen,
  onClose,
  onConfirm
}) => {
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const whatsappMessage = encodeURIComponent(
    `Hi Sheharyar, I discussed a project with Elena regarding: ${lead.recommendedArchitecture || 'Custom Architecture Scoping'}.\n\nMy details:\nEmail: ${lead.email}\nPhone: ${lead.phoneOrWhatsApp}`
  );

  const whatsappUrl = `https://wa.me/923132080033?text=${whatsappMessage}`;

  const handleConfirmClick = () => {
    setConfirmed(true);
    onConfirm();
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-zinc-950/90 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-emerald-950/40 text-white backdrop-blur-xl transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/60 transition-colors"
          aria-label="Close confirmation modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Status Pill */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                Dispatched to Sheharyar's Desk
              </span>
            </div>
            <h3 id="confirmation-modal-title" className="text-xl font-bold text-white mt-1">
              Project Brief Documented
            </h3>
          </div>
        </div>

        <p className="text-sm text-zinc-300 mb-6 leading-relaxed">
          Elena has compiled your technical parameters and dispatched them directly under bilateral NDA. Sheharyar reviews all incoming briefs with a guaranteed 2-hour SLA.
        </p>

        {/* Pre-Filled Details Card */}
        <div className="space-y-3 bg-zinc-900/70 border border-zinc-800 rounded-xl p-4 mb-6 text-sm">
          {lead.clientName && (
            <div className="flex items-center justify-between text-zinc-300">
              <span className="text-zinc-500 font-mono text-xs">Client Name:</span>
              <span className="font-medium text-white">{lead.clientName}</span>
            </div>
          )}

          <div className="flex items-center justify-between text-zinc-300">
            <span className="text-zinc-500 font-mono text-xs flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-emerald-400" /> Email:
            </span>
            <span className="font-mono text-xs text-emerald-300 truncate max-w-[240px]">
              {lead.email || 'Provided on Call'}
            </span>
          </div>

          <div className="flex items-center justify-between text-zinc-300">
            <span className="text-zinc-500 font-mono text-xs flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-400" /> WhatsApp / Phone:
            </span>
            <span className="font-mono text-xs text-white">
              {lead.phoneOrWhatsApp || '+92 313 2080033'}
            </span>
          </div>

          <div className="border-t border-zinc-800/80 pt-2.5 mt-2.5">
            <div className="text-xs font-mono text-zinc-500 mb-1">Recommended Architecture:</div>
            <div className="text-sm font-semibold text-emerald-400">
              {lead.recommendedArchitecture || 'Custom Engineering Scoping'}
            </div>
          </div>

          {lead.budgetRange && (
            <div className="flex items-center justify-between text-zinc-300">
              <span className="text-zinc-500 font-mono text-xs">Target Tier:</span>
              <span className="text-xs text-zinc-300">{lead.budgetRange}</span>
            </div>
          )}

          {lead.timeline && (
            <div className="flex items-center justify-between text-zinc-300">
              <span className="text-zinc-500 font-mono text-xs">Timeline:</span>
              <span className="text-xs text-zinc-300">{lead.timeline}</span>
            </div>
          )}
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleConfirmClick}
            disabled={confirmed}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all shadow-lg ${
              confirmed
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold shadow-emerald-500/20 hover:scale-[1.02]'
            }`}
          >
            {confirmed ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Scope Confirmed!</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Confirm Project Scope</span>
              </>
            )}
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-sm bg-zinc-900 hover:bg-zinc-800 text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/60 transition-all hover:scale-[1.02]"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
