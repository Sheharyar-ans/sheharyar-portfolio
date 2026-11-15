import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PRIMARY_SERVICES,
  SAAS_CAPABILITY,
  WHITE_LABEL_PARTNERSHIP,
} from '../../data/portfolioData';
import { VoiceWaveform } from '../visuals/VoiceWaveform';
import { SpotlightCard } from '../visuals/SpotlightCard';
import { Layers, ShieldCheck, ArrowRight, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface ServicesProps {
  onOpenInquiry?: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenInquiry }) => {
  return (
    <section id="services" className="py-24 md:py-32 bg-[#080808] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8 text-left"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] text-accent uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              CORE CAPABILITIES
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight leading-[1.02]">
              WHAT I BUILD
            </h2>
            <p className="mt-3 text-base text-brand-secondary font-normal max-w-2xl">
              Connected digital systems where WordPress provides the foundation, AI provides
              intelligence, and automation handles execution.
            </p>
          </div>
          <Link
            to="/services/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-mono font-bold tracking-wider bg-white/[0.03] border border-white/[0.12] text-accent hover:border-accent hover:bg-accent hover:text-black transition-all shrink-0 self-start md:self-auto"
          >
            <span>VIEW ALL 11 SERVICE ARCHITECTURES</span>
            <ArrowUpRight size={14} />
          </Link>
        </motion.div>

        {/* 5 Primary Service Pillars */}
        <div className="space-y-5">
          {PRIMARY_SERVICES.map((service, index) => (
            <motion.article
              key={service.num}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              <SpotlightCard className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#0e0e10]/90 border border-white/[0.08] hover:border-accent/40 transition-all group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* Top ambient hover line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Number Badge */}
                <div className="lg:col-span-1 flex items-center lg:block justify-between">
                  <span className="font-mono text-3xl sm:text-4xl font-bold text-white/20 group-hover:text-accent transition-colors">
                    {service.num}
                  </span>
                </div>

                {/* Main Info */}
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="text-xl sm:text-2xl lg:text-[1.65rem] font-heading font-bold text-white group-hover:text-accent transition-colors tracking-tight leading-snug">
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
                        className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider bg-white/[0.03] border border-white/[0.08] text-brand-secondary group-hover:border-accent/25 group-hover:text-white/90 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Optional Waveform component for Voice AI */}
                  {service.hasWaveform && <VoiceWaveform />}
                </div>

                {/* Secondary Details */}
                <div className="lg:col-span-4 p-5 sm:p-6 rounded-2xl bg-black/40 border border-white/[0.07] lg:self-stretch flex flex-col justify-between backdrop-blur-md">
                  <div>
                    <div className="text-[10px] font-mono tracking-[0.18em] text-brand-muted uppercase mb-3 font-semibold">
                      {service.secondaryTitle}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {service.secondaryTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-mono tracking-wider bg-white/[0.04] text-white/90 border border-white/[0.08]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/[0.06] text-[10px] font-mono tracking-widest text-accent flex items-center justify-between opacity-80 group-hover:opacity-100">
                    <span>PRODUCTION CAPABILITY</span>
                    <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                  </div>
                </div>
              </SpotlightCard>
            </motion.article>
          ))}
        </div>

        {/* Secondary Capability: AI-Powered Web & SaaS Development */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-8"
        >
          <SpotlightCard className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-accent/35 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              <div className="lg:col-span-7 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-brand-secondary text-xs font-mono tracking-widest uppercase">
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
                <div className="text-[10px] font-mono tracking-[0.18em] text-brand-muted uppercase mb-3 font-semibold">
                  SUPPORTING TECHNICAL STACK
                </div>
                <div className="flex flex-wrap gap-2">
                  {SAAS_CAPABILITY.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono bg-black/50 border border-white/[0.1] text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* White-Label Agency Partnership Section */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-10"
        >
          <SpotlightCard className="p-8 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-[#121215] to-[#0a0a0c] border border-white/[0.12] relative shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-mono tracking-widest uppercase">
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
                    className="px-7 py-3.5 rounded-full text-xs font-bold font-mono tracking-wider bg-accent text-black hover:bg-white transition-all shadow-[0_0_24px_rgba(183,255,60,0.35)] flex items-center gap-2"
                  >
                    <span>{WHITE_LABEL_PARTNERSHIP.cta}</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>

              {/* Bullets Grid */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3 p-6 rounded-2xl bg-black/50 border border-white/[0.08] backdrop-blur-md">
                {WHITE_LABEL_PARTNERSHIP.bullets.map((bullet) => (
                  <div
                    key={bullet}
                    className="flex items-center gap-2 text-xs font-mono text-brand-secondary"
                  >
                    <CheckCircle2 size={14} className="text-accent shrink-0" />
                    <span className="text-white/90">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
};
