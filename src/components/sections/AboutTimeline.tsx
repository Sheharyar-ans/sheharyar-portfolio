import React from 'react';
import { motion } from 'framer-motion';
import { TIMELINE, CONTACT_INFO } from '../../data/portfolioData';
import { MapPin, Globe2, CheckCircle2, MessageSquare, ArrowUpRight } from 'lucide-react';
import { SpotlightCard } from '../visuals/SpotlightCard';

export const AboutTimeline: React.FC = () => {
  return (
    <section id="about" className="py-14 md:py-20 bg-[#080808] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Split: Biography & Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Human Biography */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-5 lg:sticky lg:top-28 space-y-6 text-left"
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] text-accent uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              BIOGRAPHY &amp; BACKGROUND
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight leading-[1.05]">
              THE PERSON BEHIND THE SYSTEMS.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-brand-secondary leading-relaxed">
              <p>
                I&apos;m <strong className="text-white font-semibold">Sheharyar Siraj</strong>, a
                Senior WordPress Developer and Agentic AI Automation Engineer based in Karachi,
                Pakistan.
              </p>
              <p>
                Over the past 5+ years, I have delivered{' '}
                <strong className="text-accent">
                  1,200+ high-converting websites, custom web applications, and automated workflows
                </strong>{' '}
                for founders and enterprise teams across the USA, UK, UAE, Saudi Arabia, Ireland,
                and Europe.
              </p>
              <p>
                I engineer 24/7 AI Voice Agents using Vapi, ElevenLabs, and Retell AI, build custom
                backend workflows using n8n and Make.com, and develop scalable full-stack WordPress
                and WooCommerce platforms with custom PHP plugins and Elementor Pro.
              </p>
              <p>
                To move fast, I leverage{' '}
                <strong className="text-white font-semibold">
                  Agentic AI and Full-Stack Vibe Coding
                </strong>{' '}
                to build MVPs from scratch, clean data pipelines, and craft high-converting systems
                for digital marketing agencies as a dependable white-label partner.
              </p>
            </div>

            {/* Precise Location & Contact Card */}
            <div className="pt-2 space-y-3">
              <SpotlightCard className="p-4 sm:p-5 rounded-2xl bg-[#0e0e10]/90 border border-white/[0.08] space-y-2.5 text-xs font-mono">
                <div className="flex items-center gap-2 text-white">
                  <MapPin size={15} className="text-accent shrink-0" />
                  <span>Based in Karachi, Pakistan</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <Globe2 size={15} className="shrink-0" />
                  <span>Open to remote work &amp; relocation / on-site in Dubai &amp; Saudi Arabia</span>
                </div>
              </SpotlightCard>

              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black font-mono text-xs font-bold border border-emerald-500/30 transition-all group"
              >
                <MessageSquare size={14} />
                <span>Message on WhatsApp: {CONTACT_INFO.phone}</span>
                <ArrowUpRight
                  size={13}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </a>
            </div>
          </motion.div>

          {/* Right: Career History Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="relative pl-6 sm:pl-8 border-l border-white/[0.12] space-y-6">
              {TIMELINE.map((item) => (
                <div key={item.company + item.year} className="relative group">
                  {/* Timeline Node */}
                  <span className="absolute -left-[31px] sm:-left-[39px] top-6 w-3.5 h-3.5 rounded-full bg-[#080808] border-2 border-white/25 group-hover:border-accent group-hover:bg-accent group-hover:shadow-[0_0_10px_#FACC15] transition-all" />

                  <SpotlightCard className="p-6 sm:p-7 rounded-3xl bg-[#0e0e10]/90 border border-white/[0.08] group-hover:border-accent/40 transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono font-bold text-accent tracking-widest uppercase">
                        {item.year}
                      </span>
                      <span className="text-[11px] font-mono text-brand-muted">
                        {item.location}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-heading font-bold text-white group-hover:text-accent transition-colors mb-1">
                      {item.title}
                    </h3>

                    <div className="text-xs font-mono text-brand-secondary mb-3">
                      <span className="text-white font-semibold">{item.company}</span> • {item.role}
                    </div>

                    <p className="text-xs sm:text-sm text-brand-secondary leading-relaxed mb-4">
                      {item.desc}
                    </p>

                    <div className="space-y-1.5 pt-3 border-t border-white/[0.06]">
                      {item.highlights.map((highlight, hIdx) => (
                        <div
                          key={hIdx}
                          className="flex items-start gap-2 text-xs text-brand-secondary"
                        >
                          <CheckCircle2 size={13} className="text-accent shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </SpotlightCard>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
