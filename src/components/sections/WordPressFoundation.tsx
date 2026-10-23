import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Cpu, Workflow, TrendingUp } from 'lucide-react';

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
    <section id="wordpress-foundation" className="py-20 md:py-28 bg-surface-1/50 border-y border-brand-border/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <span className="text-xs font-mono tracking-widest text-accent uppercase block">
              CORE ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white leading-tight">
              WORDPRESS IS THE FOUNDATION.<br />
              <span className="text-accent">AI IS THE INTELLIGENCE.</span>
            </h2>
            <p className="text-sm sm:text-base text-brand-secondary leading-relaxed">
              I use WordPress and WooCommerce as reliable digital foundations, then connect them with AI agents, APIs and automation workflows to create intelligent business systems.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {TECH_PILLS.map((pill) => (
                <span
                  key={pill}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-surface-2 border border-brand-border text-brand-secondary"
                >
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: 4-Layer Architectural System Stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 space-y-3"
          >
            {ARCHITECTURE_LAYERS.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.layer}
                  className="p-5 rounded-2xl bg-surface-2/90 border border-brand-border/80 hover:border-accent/40 transition-all flex items-start gap-4 group"
                >
                  <div className={`w-10 h-10 rounded-xl bg-surface-1 border border-brand-border flex items-center justify-center shrink-0 ${item.color}`}>
                    <Icon size={18} />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-mono font-bold tracking-wider text-accent uppercase">
                        LAYER {index + 1}: {item.layer}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-heading font-bold text-white group-hover:text-accent transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-brand-secondary mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
};
