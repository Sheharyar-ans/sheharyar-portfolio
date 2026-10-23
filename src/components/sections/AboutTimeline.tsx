import React from 'react';
import { motion } from 'framer-motion';
import { TIMELINE, CERTIFICATIONS, CONTACT_INFO, EDUCATION } from '../../data/portfolioData';
import { MapPin, Globe2, Award, CheckCircle2, MessageSquare, ArrowUpRight, GraduationCap } from 'lucide-react';

export const AboutTimeline: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Top Split: Biography & Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Human Biography */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6 text-left"
          >
            <span className="text-xs font-mono tracking-widest text-accent uppercase block">
              BIOGRAPHY & BACKGROUND
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white tracking-tight">
              THE PERSON BEHIND THE SYSTEMS.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-brand-secondary leading-relaxed">
              <p>
                I'm <strong className="text-white font-semibold">Sheharyar Siraj</strong>, a Senior WordPress Developer and Agentic AI Automation Engineer based in Karachi, Pakistan.
              </p>
              <p>
                Over the past 5+ years, I have delivered <strong className="text-accent">1,200+ high-converting websites, custom web applications, and automated workflows</strong> for founders and enterprise teams across the USA, UK, UAE, Saudi Arabia, Ireland, and Europe.
              </p>
              <p>
                I engineer 24/7 AI Voice Agents using Vapi, ElevenLabs, and Retell AI, build custom backend workflows using n8n and Make.com, and develop scalable full-stack WordPress and WooCommerce platforms with custom PHP plugins and Elementor Pro.
              </p>
              <p>
                To move fast, I leverage <strong className="text-white font-semibold">Agentic AI and Full-Stack Vibe Coding</strong> to build MVPs from scratch, clean data pipelines, and craft high-converting systems for digital marketing agencies as a dependable white-label partner.
              </p>
            </div>

            {/* Precise Location & Contact Card */}
            <div className="pt-2 space-y-3">
              <div className="p-4 rounded-2xl bg-surface-1 border border-brand-border space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-white">
                  <MapPin size={15} className="text-accent shrink-0" />
                  <span>Based in Karachi, Pakistan</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <Globe2 size={15} className="shrink-0" />
                  <span>Open to remote work & relocation / on-site in Dubai & Saudi Arabia</span>
                </div>
              </div>

              {/* Instant WhatsApp Link */}
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black font-mono text-xs font-bold border border-emerald-500/30 transition-all group"
              >
                <MessageSquare size={14} />
                <span>Message on WhatsApp: {CONTACT_INFO.phone}</span>
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Right: Career History Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="relative pl-6 sm:pl-8 border-l border-brand-border space-y-8">
              {TIMELINE.map((item) => (
                <div key={item.company + item.year} className="relative group">
                  {/* Timeline Node */}
                  <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-surface-1 border-2 border-brand-border group-hover:border-accent group-hover:bg-accent transition-colors" />

                  <div className="p-5 sm:p-6 rounded-2xl bg-surface-1 border border-brand-border group-hover:border-accent/30 transition-all hover:bg-surface-2/60">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-accent tracking-widest uppercase">
                        {item.year}
                      </span>
                      <span className="text-[11px] font-mono text-brand-muted">
                        {item.location}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-heading font-bold text-white mb-0.5">
                      {item.title}
                    </h3>

                    <div className="text-xs font-mono text-brand-secondary mb-3">
                      <span className="text-white font-semibold">{item.company}</span> • {item.role}
                    </div>

                    <p className="text-xs sm:text-sm text-brand-secondary leading-relaxed mb-4">
                      {item.desc}
                    </p>

                    {/* Defensible Highlights */}
                    <div className="space-y-1.5 pt-2 border-t border-brand-border/40">
                      {item.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs text-brand-secondary">
                          <CheckCircle2 size={13} className="text-accent shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Bottom Section: Audited Certifications & Education Grid */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 pt-12 border-t border-brand-border/60"
        >
          {/* Education Header & Grid */}
          <div className="mb-6 text-left">
            <span className="text-xs font-mono tracking-widest text-accent uppercase block mb-1">
              ACADEMIC BACKGROUND
            </span>
            <h3 className="text-2xl font-heading font-bold text-white tracking-tight">
              EDUCATION & DEGREES
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
            {EDUCATION.map((edu) => (
              <div
                key={edu.institution}
                className="p-5 rounded-2xl bg-surface-1 border border-brand-border hover:border-accent/40 transition-all hover:bg-surface-2/80 flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-3">
                    <GraduationCap size={18} />
                  </div>
                  <span className="text-[10px] font-mono text-accent font-bold px-2 py-0.5 rounded bg-accent/10 border border-accent/20 inline-block mb-2">
                    {edu.year}
                  </span>
                  <h4 className="text-sm font-heading font-bold text-white leading-snug mb-1">
                    {edu.degree}
                  </h4>
                  <p className="text-xs font-mono text-brand-secondary">
                    {edu.institution}
                  </p>
                </div>
                {edu.description && (
                  <p className="text-xs text-brand-secondary font-body mt-3 pt-3 border-t border-brand-border/40 leading-relaxed">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Certifications Header & Grid */}
          <div className="mb-6 text-left">
            <span className="text-xs font-mono tracking-widest text-accent uppercase block mb-1">
              CREDENTIALS & SPECIALIZED TRAINING
            </span>
            <h3 className="text-2xl font-heading font-bold text-white tracking-tight">
              PROFESSIONAL CERTIFICATIONS
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.title}
                className="p-5 rounded-2xl bg-surface-1 border border-brand-border hover:border-accent/40 transition-all hover:bg-surface-2/80 flex flex-col justify-between"
              >
                <div className="w-9 h-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-3">
                  <Award size={18} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-heading font-bold text-white leading-snug mb-1">
                    {cert.title}
                  </h4>
                  <p className="text-[11px] font-mono text-brand-secondary">
                    {cert.issuer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
