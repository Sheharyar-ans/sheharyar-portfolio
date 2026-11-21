import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Cpu, Workflow, TrendingUp } from 'lucide-react';
import { SpotlightCard } from '../visuals/SpotlightCard';

const ARCHITECTURE_LAYERS = [
  {
    layer: 'FOUNDATION',
    name: 'WordPress / WooCommerce',
    desc: 'Reliable content, commerce, database, and headless API infrastructure.',
    icon: Layers,
    color: 'text-sky-400',
  },
  {
    layer: 'INTELLIGENCE',
    name: 'AI Agents / RAG / Voice AI',
    desc: 'Trained assistants, vector retrieval, and phone qualification agents.',
    icon: Cpu,
    color: 'text-accent',
  },
  {
    layer: 'AUTOMATION',
    name: 'n8n / Make / APIs',
    desc: 'Multi-step event routing, CRM sync, and automated background jobs.',
    icon: Workflow,
    color: 'text-amber-400',
  },
  {
    layer: 'GROWTH',
    name: 'SEO / GEO / AEO / CRM',
    desc: 'Entity discoverability, search optimization, and automated pipeline progress.',
    icon: TrendingUp,
    color: 'text-emerald-400',
  },
];

const TECH_PILLS = [
  'WordPress Core & Custom PHP 8.2',
  'WooCommerce & Gateways',
  'Elementor Pro Expert',
  'Custom Themes & Plugins',
  'Agentic AI & Vibe Coding',
  'n8n & Make Automation',
  'Vapi Voice AI Receptionists',
  'Python Data Pipelines',
  'Technical SEO & Core Web Vitals',
  'Malware Recovery & Hardening',
];

export const WordPressFoundation: React.FC = () => {
  return (
    <section
      id="wordpress-foundation"
      className="py-14 md:py-20 bg-[#080808] border-y border-white/[0.08] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] text-accent uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              CORE ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white leading-[1.05] tracking-tight">
              WORDPRESS IS THE FOUNDATION.
              <br />
              <span className="text-accent">AI IS THE INTELLIGENCE.</span>
            </h2>
            <p className="text-sm sm:text-base text-brand-secondary leading-relaxed">
              I use WordPress and WooCommerce as reliable digital foundations, then connect them
              with AI agents, APIs and automation workflows to create intelligent business systems.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {TECH_PILLS.map((pill) => (
                <span
                  key={pill}
                  className="px-3 py-1.5 rounded-full text-xs font-mono bg-white/[0.03] border border-white/[0.08] text-brand-secondary hover:border-accent/35 hover:text-white transition-colors"
                >
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: 4-Layer Architectural System Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="lg:col-span-6 space-y-3.5"
          >
            {ARCHITECTURE_LAYERS.map((item, index) => {
              const Icon = item.icon;
              return (
                <SpotlightCard
                  key={item.layer}
                  className="p-5 sm:p-6 rounded-2xl bg-[#0e0e10]/90 border border-white/[0.08] hover:border-accent/40 transition-all flex items-start gap-4 group"
                >
                  <div
                    className={`w-11 h-11 rounded-xl bg-black/60 border border-white/[0.1] flex items-center justify-center shrink-0 ${item.color}`}
                  >
                    <Icon size={19} />
                  </div>
                  <div className="text-left flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold tracking-[0.16em] text-accent uppercase">
                        LAYER {index + 1}: {item.layer}
                      </span>
                      <span className="text-[10px] font-mono text-white/30">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="text-base font-heading font-bold text-white group-hover:text-accent transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-brand-secondary mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </SpotlightCard>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
