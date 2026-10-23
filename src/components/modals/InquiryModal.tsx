import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Send, Loader2 } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    description: '',
    budget: '',
    timeline: '',
    method: 'Email',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your full name';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.service) newErrors.service = 'Please select a primary service';
    if (!formData.description.trim() || formData.description.length < 10) {
      newErrors.description = 'Please describe your project (minimum 10 characters)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      service: '',
      description: '',
      budget: '',
      timeline: '',
      method: 'Email',
    });
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto overscroll-contain">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-surface-1 border border-brand-border rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl z-10 my-auto max-h-[92dvh] sm:max-h-[90vh] overflow-y-auto overscroll-contain"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-white to-accent" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-surface-2 text-brand-secondary hover:text-white hover:bg-surface-3 flex items-center justify-center transition-colors"
              aria-label="Close Project Inquiry Modal"
            >
              <X size={18} />
            </button>

            {!isSubmitted ? (
              <>
                <div className="text-[11px] font-mono tracking-widest text-accent uppercase mb-1">
                  START A PROJECT
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2">
                  LET'S BUILD SOMETHING THAT WORKS.
                </h2>
                <p className="text-xs sm:text-sm text-brand-secondary mb-6 leading-relaxed">
                  Tell me what you're trying to build, automate, or improve. Share a few details and I'll review the project and get back to you with the right next step.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono tracking-wider text-brand-secondary mb-1.5">
                        FULL NAME <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-brand-border text-white text-sm focus:outline-none focus:border-accent transition-colors"
                      />
                      {errors.name && (
                        <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono tracking-wider text-brand-secondary mb-1.5">
                        EMAIL ADDRESS <span className="text-accent">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-brand-border text-white text-sm focus:outline-none focus:border-accent transition-colors"
                      />
                      {errors.email && (
                        <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Company & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono tracking-wider text-brand-secondary mb-1.5">
                        COMPANY / BUSINESS
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Company or project name"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-brand-border text-white text-sm focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono tracking-wider text-brand-secondary mb-1.5">
                        PHONE / WHATSAPP
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+92 3XX XXXXXXX"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-brand-border text-white text-sm focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label className="block text-[11px] font-mono tracking-wider text-brand-secondary mb-1.5">
                      WHAT CAN I HELP YOU WITH? <span className="text-accent">*</span>
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-brand-border text-white text-sm focus:outline-none focus:border-accent transition-colors cursor-pointer"
                    >
                      <option value="" disabled>Select a service</option>
                      <option value="AI Automation">AI Automation (n8n / Make / Zapier)</option>
                      <option value="AI Agents">Contextual AI Agents & Chatbots</option>
                      <option value="AI Voice Agents">AI Voice Phone Agents (Vapi / ElevenLabs)</option>
                      <option value="WordPress Development">Custom WordPress & WooCommerce Development</option>
                      <option value="SEO / GEO / AEO">Technical SEO, GEO & AEO Search Optimization</option>
                      <option value="AI Content Creation">AI Content Creation & Scaled Pipelines</option>
                      <option value="Custom AI Integration">Custom AI API & Webhook Integration</option>
                      <option value="Other">Other Custom Digital Solution</option>
                    </select>
                    {errors.service && (
                      <p className="text-[11px] text-rose-400 mt-1">{errors.service}</p>
                    )}
                  </div>

                  {/* Project Description */}
                  <div>
                    <label className="block text-[11px] font-mono tracking-wider text-brand-secondary mb-1.5">
                      TELL ME ABOUT YOUR PROJECT <span className="text-accent">*</span>
                    </label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="What are you trying to build, automate, improve, or solve?"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-brand-border text-white text-sm focus:outline-none focus:border-accent transition-colors"
                    />
                    {errors.description && (
                      <p className="text-[11px] text-rose-400 mt-1">{errors.description}</p>
                    )}
                  </div>

                  {/* Row 3: Budget & Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono tracking-wider text-brand-secondary mb-1.5">
                        ESTIMATED BUDGET
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-brand-border text-white text-sm focus:outline-none focus:border-accent transition-colors cursor-pointer"
                      >
                        <option value="">Select your budget</option>
                        <option value="Under $500">Under $500</option>
                        <option value="$500 to $1,000">$500 to $1,000</option>
                        <option value="$1,000 to $2,500">$1,000 to $2,500</option>
                        <option value="$2,500 to $5,000">$2,500 to $5,000</option>
                        <option value="$5,000 to $10,000">$5,000 to $10,000</option>
                        <option value="$10,000+">$10,000+</option>
                        <option value="Not sure yet">Not sure yet</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono tracking-wider text-brand-secondary mb-1.5">
                        WHEN DO YOU WANT TO START?
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-brand-border text-white text-sm focus:outline-none focus:border-accent transition-colors cursor-pointer"
                      >
                        <option value="">Select timeline</option>
                        <option value="ASAP">ASAP</option>
                        <option value="Within 1 to 2 weeks">Within 1 to 2 weeks</option>
                        <option value="Within 1 month">Within 1 month</option>
                        <option value="1 to 3 months">1 to 3 months</option>
                        <option value="Just exploring">Just exploring</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-accent text-black font-mono font-bold text-xs tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(183,255,60,0.25)] flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.99]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>SENDING PROJECT DETAILS...</span>
                        </>
                      ) : (
                        <>
                          <span>SEND PROJECT DETAILS</span>
                          <Send size={14} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              /* Success Confirmation View */
              <div className="py-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-accent/15 border border-accent flex items-center justify-center text-accent mb-5">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-heading font-bold text-white mb-2">
                  PROJECT DETAILS RECEIVED.
                </h3>
                <p className="text-sm text-brand-secondary max-w-md mb-8 leading-relaxed">
                  Thanks for reaching out! I've received your project details and will review them carefully. I'll get back to you within 24 hours with next steps.
                </p>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-8 py-3 rounded-full bg-surface-2 text-white font-mono font-semibold text-xs border border-brand-border hover:bg-surface-3 transition-colors"
                >
                  CLOSE WINDOW
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
