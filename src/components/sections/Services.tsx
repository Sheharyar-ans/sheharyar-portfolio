import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PRIMARY_SERVICES,
  SAAS_CAPABILITY,
  WHITE_LABEL_PARTNERSHIP,
} from '../../data/portfolioData';
import { VoiceWaveform } from '../visuals/VoiceWaveform';
import { Layers, ShieldCheck, ArrowRight, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface ServicesProps {
  onOpenInquiry?: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenInquiry }) => {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
          <div>
            <span className="text-xs font-mono tracking-widest text-accent uppercase block mb-2">
              CORE CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight">
              WHAT I BUILD
            </h2>
            <p className="mt-2 text-base text-brand-secondary font-normal max-w-2xl">
              Connected digital systems where WordPress provides the foundation, AI provides intelligence, and automation handles execution.
            </p>
          </div>
          <Link
            to="/services/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider bg-surface-2 border border-brand-border text-accent hover:border-accent hover:bg-accent/10 transition-all shrink-0 self-start md:self-auto"
          >
            <span>VIEW ALL 11 SERVICE ARCHITECTURES</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* 5 Primary Service Pillars */}
        <div className="space-y-6">
          {PRIMARY_SERVICES.map((service, index) => (
            <motion.article
              key={service.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="p-6 sm:p-8 lg:p-10 rounded-2xl bg-surface-1 border border-brand-border hover:border-accent/40 transition-all hover:bg-surface-2/80 group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start relative overflow-hidden"
            >
              {/* Top ambient hover line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Number Badge */}
              <div className="lg:col-span-1">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-brand-muted group-hover:text-accent transition-colors">
                  {service.num}
                </span>
              </div>

              {/* Main Info */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white group-hover:text-accent transition-colors tracking-tight">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-brand-secondary leading-relaxed">
                  {service.desc}
                </p>

                {/* Primary Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-mono tracking-wider bg-surface-2 border border-brand-border/60 text-brand-secondary group-hover:border-accent/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Optional Waveform component for Voice AI */}
                {service.hasWaveform && <VoiceWaveform />}
              </div>

              {/* Secondary Details (Tech / Capabilities) */}
              <div className="lg:col-span-4 p-5 rounded-xl bg-surface-2/60 border border-brand-border/40 lg:self-stretch flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono tracking-widest text-brand-muted uppercase mb-3 font-semibold">
                    {service.secondaryTitle}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.secondaryTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-xs font-mono tracking-wider bg-surface-3 text-white border border-brand-border/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 text-[11px] font-mono text-accent flex items-center gap-1.5 opacity-80 group-hover:opacity-100">
                  <span>PRODUCTION CAPABILITY</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                </div>
              </div>

            </motion.article>
          ))}
        </div>

        {/* Secondary Capability: AI-Powered Web & SaaS Development */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 p-6 sm:p-8 lg:p-10 rounded-2xl bg-surface-1/70 border border-brand-border hover:border-brand-borderHover transition-all"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-2 border border-brand-border text-brand-secondary text-xs font-mono tracking-widest uppercase">
                <Layers size={13} className="text-accent" />
                <span>{SAAS_CAPABILITY.subtitle}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">
                {SAAS_CAPABILITY.title}
              </h3>
              <p className="text-sm sm:text-base text-brand-secondary leading-relaxed">
                {SAAS_CAPABILITY.desc}
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="text-[11px] font-mono tracking-widest text-brand-muted uppercase mb-3 font-semibold">
                SUPPORTING TECHNICAL STACK
              </div>
              <div className="flex flex-wrap gap-2">
                {SAAS_CAPABILITY.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-surface-2 border border-brand-border/80 text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* White-Label Agency Partnership Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 p-8 sm:p-10 lg:p-12 rounded-3xl bg-surface-2/90 border border-brand-border relative overflow-hidden shadow-2xl"
        >
          {/* Subtle glow edge */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/20 via-accent to-accent/20" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-3 border border-brand-border text-accent text-xs font-mono tracking-widest uppercase">
                <ShieldCheck size={14} />
                <span>WHITE-LABEL B2B PARTNERSHIP</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-white tracking-tight">
                {WHITE_LABEL_PARTNERSHIP.headline}
              </h3>

              <p className="text-sm sm:text-base text-brand-secondary leading-relaxed max-w-xl">
                {WHITE_LABEL_PARTNERSHIP.description}
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenInquiry}
                  className="px-7 py-3.5 rounded-full text-xs font-bold font-mono tracking-wider bg-accent text-black hover:bg-white transition-all shadow-[0_0_20px_rgba(183,255,60,0.3)] flex items-center gap-2"
                >
                  <span>{WHITE_LABEL_PARTNERSHIP.cta}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* Bullets Grid */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3 p-5 rounded-2xl bg-surface-1/90 border border-brand-border/80">
              {WHITE_LABEL_PARTNERSHIP.bullets.map((bullet) => (
                <div key={bullet} className="flex items-center gap-2 text-xs font-mono text-brand-secondary">
                  <CheckCircle2 size={14} className="text-accent shrink-0" />
                  <span className="text-white/90">{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
