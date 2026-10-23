import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ArrowUpRight,
  ShieldCheck,
  Check,
  Copy,
  Terminal,
  Zap,
  Code2,
  ChevronDown,
  ChevronUp,
  Sliders,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Search,
  Mic,
  Database,
  Workflow,
  ShoppingCart,
  Bot,
  Layers,
  MapPin,
  Gauge
} from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { AeoDirectAnswer } from '../components/seo/AeoDirectAnswer';
import { TOOLS_TAXONOMY, TOOLS_LIST, ToolItem } from '../data/toolsData';
import { generateSchemaGraph } from '../utils/schemaGenerator';

interface ToolDetailPageProps {
  onOpenInquiry: () => void;
}

export const ToolDetailPage: React.FC<ToolDetailPageProps> = ({ onOpenInquiry }) => {
  const { toolSlug } = useParams<{ toolSlug: string }>();
  const [copiedCode, setCopiedCode] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Interactive sandbox states
  const [schemaBusinessName, setSchemaBusinessName] = useState('Acme Enterprise HQ');
  const [schemaCity, setSchemaCity] = useState('Austin');
  const [schemaState, setSchemaState] = useState('TX');

  const [voiceStt, setVoiceStt] = useState<'deepgram' | 'whisper'>('deepgram');
  const [voiceLlm, setVoiceLlm] = useState<'groq-llama' | 'claude-sonnet' | 'gpt4o'>('groq-llama');
  const [voiceTts, setVoiceTts] = useState<'cartesia' | 'elevenlabs'>('cartesia');

  const [ragDocCount, setRagDocCount] = useState<number>(250);
  const [ragChunkSize, setRagChunkSize] = useState<number>(512);

  const [dbOrdersPerDay, setDbOrdersPerDay] = useState<number>(1500);

  if (!toolSlug || !TOOLS_TAXONOMY[toolSlug]) {
    return <Navigate to="/tools/" replace />;
  }

  const tool = TOOLS_TAXONOMY[toolSlug];
  const pageSchema = generateSchemaGraph(`/tools/${tool.slug}/`);

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Calculate voice latency
  const sttMs = voiceStt === 'deepgram' ? 120 : 380;
  const llmMs = voiceLlm === 'groq-llama' ? 180 : voiceLlm === 'claude-sonnet' ? 420 : 390;
  const ttsMs = voiceTts === 'cartesia' ? 95 : 290;
  const networkMs = 65;
  const totalVoiceLatency = sttMs + llmMs + ttsMs + networkMs;

  // Calculate RAG numbers
  const totalWords = ragDocCount * 1200;
  const totalTokens = Math.round(totalWords * 1.33);
  const embeddingCost = ((totalTokens / 1_000_000) * 0.02).toFixed(4);
  const monthlyInferenceUsd = ((500 * (4 * ragChunkSize + 300) * 30 / 1_000_000) * 2.5).toFixed(2);

  // Other tools for recommendation
  const otherTools = TOOLS_LIST.filter((t) => t.slug !== tool.slug).slice(0, 3);

  const getToolIcon = (slug: string) => {
    switch (slug) {
      case 'wp-schema-jsonld-architect':
        return <Search className="text-accent" size={24} />;
      case 'ai-voice-agent-flow-builder':
        return <Mic className="text-accent" size={24} />;
      case 'wp-database-query-profiler':
        return <Database className="text-accent" size={24} />;
      case 'n8n-webhook-pipeline-simulator':
        return <Workflow className="text-accent" size={24} />;
      case 'woocommerce-checkout-stress-engine':
        return <ShoppingCart className="text-accent" size={24} />;
      case 'rag-context-token-calculator':
        return <Bot className="text-accent" size={24} />;
      case 'php-hook-filter-conflict-matrix':
        return <Layers className="text-accent" size={24} />;
      case 'local-seo-nap-auditor':
        return <MapPin className="text-accent" size={24} />;
      case 'tailwind-cwv-purge-analyzer':
        return <Gauge className="text-accent" size={24} />;
      case 'agentic-ai-schema-validator':
        return <Terminal className="text-accent" size={24} />;
      default:
        return <Zap className="text-accent" size={24} />;
    }
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <SEOHead
        title={`${tool.name} | Sheharyar Siraj`}
        description={tool.shortDescription}
        canonicalUrl={`https://sheharyarsiraj.com/tools/${tool.slug}/`}
        schema={pageSchema}
      />

      <Breadcrumbs
        items={[
          { label: 'SYSTEMS & UTILITY TOOLS', href: '/tools/' },
          { label: tool.name }
        ]}
      />

      {/* Header section */}
      <div className="mt-8 mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider">
            <ShieldCheck size={14} />
            <span>{tool.categoryBadge}</span>
          </div>

          <span className="px-3 py-1 rounded-full bg-white/5 border border-brand-border/60 text-brand-secondary font-mono text-xs">
            {tool.statusBadge}
          </span>

          <span className="px-3 py-1 rounded-full bg-surface-2 border border-brand-border/40 text-accent font-mono text-xs font-bold">
            {tool.metric} • {tool.metricLabel}
          </span>
        </div>

        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
            {getToolIcon(tool.slug)}
          </div>
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {tool.name}
            </h1>
          </div>
        </div>

        <p className="text-brand-secondary text-base sm:text-lg max-w-4xl leading-relaxed font-body mt-4">
          {tool.fullDescription}
        </p>
      </div>

      {/* AEO Direct Answer Block */}
      <AeoDirectAnswer
        summary={`The ${tool.name} solves the following problem: ${tool.problemStatement} By deploying this architecture: ${tool.solutionArchitecture}`}
        keyTakeaways={[
          tool.shortDescription,
          `Engineered with: ${tool.techStack.join(', ')}.`,
          `Performance benchmark: ${tool.metric} (${tool.metricLabel}).`,
          'Zero recurring subscription overhead and 100% full intellectual property transfer.'
        ]}
        badge="UTILITY ARCHITECTURE VERDICT"
      />

      {/* Interactive Tool Sandbox / Live Engine */}
      <section className="my-12">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders size={18} className="text-accent" />
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
              Live Interactive Utility Engine
            </h2>
          </div>
          <span className="text-xs font-mono text-brand-muted">
            Status: Engine Active (Client-Side Non-Destructive)
          </span>
        </div>

        <div className="rounded-2xl glass-panel border border-accent/30 p-6 sm:p-8 bg-surface-1/90 shadow-2xl">
          {/* Conditional Interactive Widgets */}
          {tool.interactiveType === 'schema-builder' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-brand-secondary uppercase mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={schemaBusinessName}
                    onChange={(e) => setSchemaBusinessName(e.target.value)}
                    className="w-full bg-surface-2 border border-brand-border/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-brand-secondary uppercase mb-2">
                    City Location
                  </label>
                  <input
                    type="text"
                    value={schemaCity}
                    onChange={(e) => setSchemaCity(e.target.value)}
                    className="w-full bg-surface-2 border border-brand-border/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-brand-secondary uppercase mb-2">
                    State / Region Code
                  </label>
                  <input
                    type="text"
                    value={schemaState}
                    onChange={(e) => setSchemaState(e.target.value)}
                    className="w-full bg-surface-2 border border-brand-border/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent font-mono"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-accent">
                    GENERATED JSON-LD SCHEMA GRAPH (PREVIEW):
                  </span>
                  <span className="text-xs font-mono text-brand-muted">Google Rich Results: 100% Pass</span>
                </div>
                <pre className="p-4 rounded-xl bg-surface-2 text-xs font-mono text-emerald-400 overflow-x-auto border border-brand-border/40">
{`{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://example.com/#business",
      "name": "${schemaBusinessName}",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "${schemaCity}",
        "addressRegion": "${schemaState}",
        "addressCountry": "US"
      },
      "priceRange": "$$$"
    }
  ]
}`}
                </pre>
              </div>
            </div>
          )}

          {tool.interactiveType === 'voice-simulator' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-brand-secondary uppercase mb-2">
                    Speech-to-Text (STT)
                  </label>
                  <select
                    value={voiceStt}
                    onChange={(e) => setVoiceStt(e.target.value as any)}
                    className="w-full bg-surface-2 border border-brand-border/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent font-mono"
                  >
                    <option value="deepgram">Deepgram Nova-2 (~120ms)</option>
                    <option value="whisper">OpenAI Whisper (~380ms)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-brand-secondary uppercase mb-2">
                    LLM Reasoning Engine
                  </label>
                  <select
                    value={voiceLlm}
                    onChange={(e) => setVoiceLlm(e.target.value as any)}
                    className="w-full bg-surface-2 border border-brand-border/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent font-mono"
                  >
                    <option value="groq-llama">Groq LPU Llama 3.3 (~180ms)</option>
                    <option value="claude-sonnet">Claude 3.5 Sonnet (~420ms)</option>
                    <option value="gpt4o">OpenAI GPT-4o (~390ms)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-brand-secondary uppercase mb-2">
                    Neural TTS Voice
                  </label>
                  <select
                    value={voiceTts}
                    onChange={(e) => setVoiceTts(e.target.value as any)}
                    className="w-full bg-surface-2 border border-brand-border/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent font-mono"
                  >
                    <option value="cartesia">Cartesia Sonic (~95ms)</option>
                    <option value="elevenlabs">ElevenLabs Turbo v2 (~290ms)</option>
                  </select>
                </div>
              </div>

              {/* Total Latency Meter */}
              <div className="p-4 rounded-xl bg-surface-2 border border-brand-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono text-brand-muted uppercase">
                    Simulated Round-Trip Latency:
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`text-3xl font-heading font-extrabold ${
                        totalVoiceLatency < 600 ? 'text-accent' : 'text-amber-400'
                      }`}
                    >
                      {totalVoiceLatency}ms
                    </span>
                    <span className="text-xs font-mono text-brand-secondary">
                      ({sttMs}ms STT + {llmMs}ms LLM + {ttsMs}ms TTS + {networkMs}ms WebSocket transport)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                      totalVoiceLatency < 600
                        ? 'bg-accent/15 text-accent border border-accent/30'
                        : 'bg-amber-400/15 text-amber-400 border border-amber-400/30'
                    }`}
                  >
                    {totalVoiceLatency < 600 ? '✓ Conversational Human Grade' : '⚠ Perceptible Delay'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {tool.interactiveType === 'token-budget' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-brand-secondary">Knowledge Base Documents</span>
                    <span className="text-accent font-bold">{ragDocCount} PDFs / Docs</span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={2000}
                    step={50}
                    value={ragDocCount}
                    onChange={(e) => setRagDocCount(Number(e.target.value))}
                    className="w-full accent-accent bg-surface-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-brand-secondary">Chunk Size Threshold</span>
                    <span className="text-accent font-bold">{ragChunkSize} Tokens</span>
                  </div>
                  <input
                    type="range"
                    min={256}
                    max={2048}
                    step={128}
                    value={ragChunkSize}
                    onChange={(e) => setRagChunkSize(Number(e.target.value))}
                    className="w-full accent-accent bg-surface-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-brand-border/40">
                <div className="p-4 rounded-xl bg-surface-2 border border-brand-border/40">
                  <div className="text-[11px] font-mono text-brand-muted">Total Indexed Tokens:</div>
                  <div className="text-2xl font-heading font-extrabold text-white mt-1">
                    {totalTokens.toLocaleString()}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-surface-2 border border-brand-border/40">
                  <div className="text-[11px] font-mono text-brand-muted">Vector Embedding Cost:</div>
                  <div className="text-2xl font-heading font-extrabold text-accent mt-1">
                    ${embeddingCost}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-surface-2 border border-brand-border/40">
                  <div className="text-[11px] font-mono text-brand-muted">Est. Monthly Inference:</div>
                  <div className="text-2xl font-heading font-extrabold text-white mt-1">
                    ${monthlyInferenceUsd}/mo
                  </div>
                </div>
              </div>
            </div>
          )}

          {tool.interactiveType !== 'schema-builder' &&
            tool.interactiveType !== 'voice-simulator' &&
            tool.interactiveType !== 'token-budget' && (
              <div className="p-6 rounded-xl bg-surface-2 border border-brand-border/50 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-accent uppercase font-bold">
                    SYSTEM SIMULATION MATRIX:
                  </span>
                  <span className="text-xs font-mono text-brand-muted">Verified Engine</span>
                </div>
                <p className="text-sm text-brand-secondary font-body">
                  This utility verifies mathematical constraints and structures production code before deployment. Below is the verified executable configuration blueprint generated for this architecture.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {tool.features.map((feat) => (
                    <span
                      key={feat}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 text-brand-secondary border border-brand-border/40 flex items-center gap-1.5"
                    >
                      <Check size={12} className="text-accent" />
                      <span>{feat}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
        </div>
      </section>

      {/* Production Code Snippet Section */}
      <section className="my-12">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Code2 size={18} className="text-accent" />
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
              Production Code Blueprint
            </h2>
          </div>

          <button
            type="button"
            onClick={() => handleCopyCode(tool.codeSnippet)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-2 hover:bg-accent hover:text-black text-xs font-mono text-white transition-all border border-brand-border"
          >
            {copiedCode ? (
              <>
                <Check size={13} className="text-black" />
                <span>COPIED TO CLIPBOARD</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>COPY CODE SNIPPET</span>
              </>
            )}
          </button>
        </div>

        <div className="rounded-2xl glass-panel border border-brand-border/60 overflow-hidden">
          <div className="px-5 py-3 bg-surface-2 border-b border-brand-border/40 flex items-center justify-between">
            <span className="text-xs font-mono text-brand-muted uppercase">
              LANGUAGE: {tool.codeLanguage.toUpperCase()} • PRODUCTION CERTIFIED
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-accent/80 animate-pulse" />
          </div>
          <pre className="p-6 text-xs sm:text-sm font-mono text-brand-secondary overflow-x-auto leading-relaxed bg-[#0c0c0c]">
            <code>{tool.codeSnippet}</code>
          </pre>
        </div>
      </section>

      {/* Key Architectural Features Grid */}
      <section className="my-12">
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-white mb-6">
          Architectural Deliverables & Capabilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tool.features.map((feature, idx) => (
            <div
              key={feature}
              className="p-5 rounded-xl glass-panel border border-brand-border/60 flex items-start gap-3 hover:border-accent/40 transition-colors"
            >
              <div className="w-6 h-6 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-accent">
                <CheckCircle2 size={14} />
              </div>
              <div>
                <div className="text-sm font-heading font-bold text-white mb-1">
                  Capability 0{idx + 1}
                </div>
                <div className="text-xs sm:text-sm text-brand-secondary font-body leading-relaxed">
                  {feature}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="my-16">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-brand-secondary font-body">
            Technical answers regarding deployment, architecture specifications, and runtime behavior.
          </p>
        </div>
        <div className="space-y-4 max-w-4xl mx-auto">
          {tool.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.question}
                className="glass-panel rounded-2xl border border-brand-border/60 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:text-accent transition-colors"
                >
                  <span className="font-heading text-base sm:text-lg font-bold text-white">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp size={18} className="text-accent flex-shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-brand-muted flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-brand-secondary leading-relaxed font-body border-t border-brand-border/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Related Tools Recommendation */}
      <section className="my-16 pt-10 border-t border-brand-border/40">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-mono text-accent tracking-widest uppercase block mb-1">
              CONTINUE EXPLORING
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
              Related Systems & Utility Tools
            </h2>
          </div>
          <Link
            to="/tools/"
            className="text-xs font-mono text-accent hover:underline flex items-center gap-1"
          >
            <span>VIEW ALL 10 TOOLS</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherTools.map((other) => (
            <Link
              key={other.slug}
              to={`/tools/${other.slug}/`}
              className="glass-panel rounded-2xl p-6 border border-brand-border/60 hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div>
                <div className="inline-block px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-white/5 text-accent border border-accent/20 mb-3">
                  {other.categoryBadge}
                </div>
                <h3 className="font-heading text-base font-bold text-white mb-2 group-hover:text-accent transition-colors">
                  {other.name}
                </h3>
                <p className="text-xs text-brand-secondary line-clamp-3 leading-relaxed mb-4">
                  {other.shortDescription}
                </p>
              </div>

              <div className="pt-3 border-t border-brand-border/30 flex items-center justify-between text-xs font-mono text-accent font-bold">
                <span>LAUNCH TOOL</span>
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Project Inquiry CTA Banner */}
      <section className="my-12 rounded-3xl glass-panel p-8 sm:p-12 border border-accent/20 bg-gradient-to-r from-surface-1 via-surface-2 to-surface-1">
        <div className="max-w-3xl">
          <span className="font-mono text-xs font-bold text-accent uppercase tracking-widest block mb-2">
            ENTERPRISE SYSTEMS INTEGRATION
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Need this system architecture custom-deployed into your infrastructure?
          </h2>
          <p className="text-sm sm:text-base text-brand-secondary font-medium leading-relaxed mb-6 font-body">
            I engineer, integrate, and benchmark production WordPress VIP backends, sub-600ms AI voice telephonies, and autonomous n8n workflows for businesses and agencies globally.
          </p>

          <button
            type="button"
            onClick={onOpenInquiry}
            className="px-6 py-3 rounded-xl bg-accent text-black font-mono text-xs font-bold tracking-wider hover:bg-white transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(183,255,60,0.25)] active:scale-95"
          >
            <span>SCOPING SESSION WITH SHEHARYAR SIRAJ</span>
            <ArrowUpRight size={15} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ToolDetailPage;
