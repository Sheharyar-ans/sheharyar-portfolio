import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  ArrowUpRight, 
  ShieldCheck, 
  CheckCircle2,
  Database,
  Phone,
  Mail,
  User,
  FileText,
  BadgePercent
} from 'lucide-react';
import { processRagQuery, ChatMessage, ChatBotMode } from '../../utils/ragEngine';
import { saveLead } from '../../utils/leadStorage';
import { LeadManagementModal } from '../modals/LeadManagementModal';

interface AiChatbotWidgetProps {
  onOpenInquiry: () => void;
}

export const AiChatbotWidget: React.FC<AiChatbotWidgetProps> = ({ onOpenInquiry }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentMode, setCurrentMode] = useState<ChatBotMode>('support');
  const [isLeadVaultOpen, setIsLeadVaultOpen] = useState(false);

  // Lead Form State
  const [leadForm, setLeadForm] = useState({
    name: '',
    whatsapp: '',
    email: '',
    details: ''
  });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadError, setLeadError] = useState('');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: 'Hello! I am Sheharyar Siraj\'s interactive software & AI consultant. I can answer questions about custom WordPress architectures, sub-600ms AI voice agents, and enterprise automations, or help you scope and start a new project. How can I assist you today?',
      timestamp: 'Just now',
      mode: 'support'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    // Secret Admin command to open Lead Vault
    if (text.toLowerCase() === '/leads' || text.toLowerCase() === '/admin') {
      setInputValue('');
      setIsLeadVaultOpen(true);
      return;
    }

    setHasInteracted(true);
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    try {
      const result = await processRagQuery(text, [...messages, userMsg]);
      setCurrentMode(result.mode);

      const botMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: result.answer,
        timestamp: 'Just now',
        mode: result.mode,
        showLeadForm: result.showLeadForm,
        action: result.action,
        sources: result.sources
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error('RAG Query Error:', error);
      const fallbackMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: 'I am ready to help with your project! You can connect with Sheharyar directly on WhatsApp (+92 313 2080033) or email sherryansari870@gmail.com for instant technical scoping with a guaranteed 2-hour SLA.',
        timestamp: 'Just now',
        mode: 'support',
        action: {
          type: 'whatsapp',
          label: 'Chat on WhatsApp (+92 313 2080033)',
          url: 'https://wa.me/923132080033'
        }
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadError('');

    if (!leadForm.name.trim()) {
      setLeadError('Please enter your name.');
      return;
    }
    if (!leadForm.whatsapp.trim()) {
      setLeadError('WhatsApp number is mandatory for instant communication.');
      return;
    }
    if (!leadForm.email.trim() || !leadForm.email.includes('@')) {
      setLeadError('A valid email address is mandatory for project scope documentation.');
      return;
    }

    // Save lead to local storage repository
    const saved = saveLead({
      name: leadForm.name,
      whatsapp: leadForm.whatsapp,
      email: leadForm.email,
      details: leadForm.details || 'Submitted via Chat Sales Agent Form',
      service: 'Custom Architecture Scoping',
      source: 'Interactive Sales Chatbot'
    });

    setLeadSubmitted(true);

    // Add confirmation message from assistant
    const confirmMsg: ChatMessage = {
      id: `assistant-confirm-${Date.now()}`,
      sender: 'assistant',
      text: `Thank you, ${leadForm.name}! Your project details have been recorded in Sheharyar's direct client queue (Ref: ${saved.id.slice(0, 12)}). Sheharyar reviews all submissions within 2 hours. You can also jump straight into WhatsApp to connect immediately!`,
      timestamp: 'Just now',
      leadCaptured: true,
      action: {
        type: 'whatsapp',
        label: 'Message Sheharyar Directly on WhatsApp',
        url: `https://wa.me/923132080033?text=Hi%20Sheharyar,%20my%20name%20is%20${encodeURIComponent(leadForm.name)}.%20I%20just%20submitted%20my%20project%20details%20via%20your%20website:%20${encodeURIComponent(leadForm.details || 'Ready to scope project')}`
      }
    };

    setMessages((prev) => [...prev, confirmMsg]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetChat = () => {
    setCurrentMode('support');
    setLeadSubmitted(false);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: 'Conversation reset. What system architecture or project scoping question can I answer for you?',
        timestamp: 'Just now',
        mode: 'support'
      }
    ]);
  };

  const starterChips = [
    'Scope a New Project',
    'Custom WordPress Architecture',
    'Sub-600ms AI Voice Agents',
    'Workflow Automation (n8n)',
    'Pricing Models & Rates',
    'Turnaround Times'
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-surface-1 border border-brand-border/80 text-white shadow-2xl hover:border-accent hover:shadow-[0_0_30px_rgba(30,144,255,0.3)] transition-all active:scale-95"
            aria-label="Open AI Systems Representative Chat"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
                <MessageSquare size={16} />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-surface-1 animate-pulse" />
            </div>

            <div className="text-left font-mono">
              <div className="text-xs font-bold leading-tight group-hover:text-accent transition-colors">
                AI Project Consultant
              </div>
              <div className="text-[10px] text-brand-muted">Ask anything • Fast Quote</div>
            </div>

            {!hasInteracted && (
              <span className="hidden sm:inline-block ml-1 px-1.5 py-0.5 rounded bg-accent/15 text-accent text-[9px] font-mono font-bold uppercase tracking-wider">
                Online
              </span>
            )}
          </button>
        )}
      </div>

      {/* Main Chat Interface Modal */}
      {isOpen && (
        <div
          data-lenis-prevent="true"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[95vw] sm:w-[420px] h-[600px] max-h-[85vh] bg-surface-1 border border-brand-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in font-body overscroll-contain"
        >
          {/* Header */}
          <div className="p-3.5 bg-surface-2/80 border-b border-brand-border flex items-center justify-between backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
                  <Sparkles size={16} />
                </div>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-surface-2" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold text-xs sm:text-sm text-white">
                    Sheharyar Siraj AI
                  </h3>
                  {/* Adaptive Mode Badge */}
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 ${
                      currentMode === 'sales'
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        : 'bg-accent/15 text-accent border border-accent/30'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    {currentMode === 'sales' ? 'Sales Consultant' : 'Support Assistant'}
                  </span>
                </div>
                <p className="text-[10px] font-mono text-brand-muted">
                  Strictly grounded • Verified technical portfolio
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Discrete Lead Vault Button */}
              <button
                onClick={() => setIsLeadVaultOpen(true)}
                className="w-7 h-7 rounded-lg hover:bg-surface-3 text-brand-muted hover:text-accent transition-colors flex items-center justify-center"
                title="Open Lead Management Vault (Admin)"
              >
                <Database size={13} />
              </button>

              <button
                onClick={resetChat}
                className="w-7 h-7 rounded-lg hover:bg-surface-3 text-brand-muted hover:text-white transition-colors flex items-center justify-center"
                title="Reset conversation"
              >
                <RotateCcw size={13} />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg hover:bg-surface-3 text-brand-muted hover:text-white transition-colors flex items-center justify-center"
                title="Close chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div
            data-lenis-prevent="true"
            className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar bg-black/20 overscroll-contain touch-pan-y"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-[13px] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-accent text-black font-semibold rounded-tr-none shadow-sm'
                      : 'bg-surface-2/90 border border-brand-border/70 text-white rounded-tl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Sources tag if grounded */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-brand-border/40 flex flex-wrap items-center gap-1 text-[9px] font-mono text-brand-muted">
                      <ShieldCheck size={10} className="text-accent" />
                      <span>Grounded in:</span>
                      {msg.sources.map((s, idx) => (
                        <span key={idx} className="text-brand-secondary bg-surface-3 px-1.5 py-0.5 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Interactive Action Button */}
                  {msg.action && msg.action.type !== 'lead_form' && (
                    <div className="mt-2.5 pt-2 border-t border-brand-border/40">
                      {msg.action.url ? (
                        <a
                          href={msg.action.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono font-bold hover:bg-emerald-500/30 transition-colors"
                        >
                          <Phone size={11} />
                          <span>{msg.action.label}</span>
                          <ArrowUpRight size={11} />
                        </a>
                      ) : (
                        <button
                          onClick={onOpenInquiry}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/20 border border-accent/40 text-accent text-[11px] font-mono font-bold hover:bg-accent/30 transition-colors"
                        >
                          <span>{msg.action.label}</span>
                          <ArrowUpRight size={11} />
                        </button>
                      )}
                    </div>
                  )}

                  {/* Inline Interactive Lead Capture Card (Sales Mode) */}
                  {msg.showLeadForm && !leadSubmitted && (
                    <form
                      onSubmit={handleLeadSubmit}
                      className="mt-3 p-3.5 rounded-xl bg-surface-1/95 border border-amber-500/30 space-y-2.5 text-left text-xs"
                    >
                      <div className="flex items-center gap-1.5 text-amber-300 font-mono text-[11px] font-bold uppercase tracking-wider">
                        <BadgePercent size={13} />
                        <span>Instant Project Scoping Form</span>
                      </div>

                      {leadError && (
                        <p className="text-[11px] font-mono text-red-400 bg-red-500/10 p-1.5 rounded border border-red-500/20">
                          {leadError}
                        </p>
                      )}

                      <div>
                        <label className="block text-[10px] font-mono text-brand-muted uppercase mb-1">
                          Your Full Name <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <User size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-brand-muted" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. David Miller"
                            value={leadForm.name}
                            onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                            className="w-full pl-8 pr-2.5 py-1.5 rounded-lg bg-surface-2 border border-brand-border text-white text-xs placeholder-brand-muted focus:outline-none focus:border-accent"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-mono text-brand-muted uppercase mb-1">
                            WhatsApp Number <span className="text-red-400">*</span>
                          </label>
                          <div className="relative">
                            <Phone size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-brand-muted" />
                            <input
                              type="tel"
                              required
                              placeholder="+1 555 0192"
                              value={leadForm.whatsapp}
                              onChange={(e) => setLeadForm({ ...leadForm, whatsapp: e.target.value })}
                              className="w-full pl-8 pr-2.5 py-1.5 rounded-lg bg-surface-2 border border-brand-border text-white text-xs placeholder-brand-muted focus:outline-none focus:border-accent"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono text-brand-muted uppercase mb-1">
                            Email Address <span className="text-red-400">*</span>
                          </label>
                          <div className="relative">
                            <Mail size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-brand-muted" />
                            <input
                              type="email"
                              required
                              placeholder="name@company.com"
                              value={leadForm.email}
                              onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                              className="w-full pl-8 pr-2.5 py-1.5 rounded-lg bg-surface-2 border border-brand-border text-white text-xs placeholder-brand-muted focus:outline-none focus:border-accent"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-brand-muted uppercase mb-1">
                          Brief Requirements / Timeline
                        </label>
                        <div className="relative">
                          <FileText size={12} className="absolute left-2.5 top-2.5 text-brand-muted" />
                          <textarea
                            rows={2}
                            placeholder="Need high-speed WooCommerce architecture or AI voice bot..."
                            value={leadForm.details}
                            onChange={(e) => setLeadForm({ ...leadForm, details: e.target.value })}
                            className="w-full pl-8 pr-2.5 py-1.5 rounded-lg bg-surface-2 border border-brand-border text-white text-xs placeholder-brand-muted focus:outline-none focus:border-accent resize-none"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-lg bg-accent text-black font-mono font-bold text-xs hover:bg-white transition-colors shadow-md shadow-accent/20 flex items-center justify-center gap-1.5 mt-1 active:scale-95"
                      >
                        <CheckCircle2 size={13} />
                        <span>Lock In Scoping Call & Quote</span>
                      </button>
                    </form>
                  )}
                </div>
                <span className="text-[9px] font-mono text-brand-muted mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-surface-2/80 border border-brand-border w-16 text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:0.4s]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Chips */}
          <div className="p-2 bg-surface-2/40 border-t border-brand-border/40 overflow-x-auto whitespace-nowrap flex gap-1.5 no-scrollbar">
            {starterChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                className="px-2.5 py-1 rounded-full bg-surface-2 border border-brand-border/60 hover:border-accent text-brand-secondary hover:text-white text-[11px] font-mono transition-colors shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-surface-2 border-t border-brand-border">
            <div className="relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  currentMode === 'sales'
                    ? 'Enter requirements or ask about rates/turnaround...'
                    : 'Ask about WordPress VIP, AI voice, or automations...'
                }
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-surface-1 border border-brand-border/80 text-white placeholder-brand-muted text-xs focus:outline-none focus:border-accent"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
                className="absolute right-1.5 w-7 h-7 rounded-lg bg-accent text-black flex items-center justify-center hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                title="Send message"
              >
                <Send size={13} />
              </button>
            </div>
            <div className="flex items-center justify-between text-[9px] font-mono text-brand-muted mt-1.5 px-1">
              <span>Strictly Grounded in Website Architecture</span>
              <span>Sub-2h SLA via WhatsApp</span>
            </div>
          </div>
        </div>
      )}

      {/* Embedded Lead Management Modal */}
      <LeadManagementModal
        isOpen={isLeadVaultOpen}
        onClose={() => setIsLeadVaultOpen(false)}
      />
    </>
  );
};
