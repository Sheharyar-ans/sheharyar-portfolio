import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Search,
  Copy,
  Check,
  Code2,
  FileText,
  ShieldCheck,
  Zap,
  Terminal,
  Layers,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  Globe,
  Sliders,
  Bot,
  Hash,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { AeoDirectAnswer } from '../components/seo/AeoDirectAnswer';
import { generateSchemaGraph } from '../utils/schemaGenerator';

interface LlmSeoMetaGeneratorPageProps {
  onOpenInquiry: () => void;
}

type SearchIntent = 'commercial' | 'technical_guide' | 'informational' | 'tutorial';
type ModelTarget = 'claude' | 'gpt4o' | 'deepseek';

interface PresetTopic {
  label: string;
  keyword: string;
  intent: SearchIntent;
  audience: string;
}

const PRESET_TOPICS: PresetTopic[] = [
  {
    label: 'n8n Enterprise Webhook Security',
    keyword: 'n8n enterprise webhook security architecture',
    intent: 'technical_guide',
    audience: 'Senior DevOps & Automation Architects'
  },
  {
    label: 'WooCommerce High-Concurrency Redis Caching',
    keyword: 'woocommerce high concurrency redis caching configuration',
    intent: 'technical_guide',
    audience: 'E-commerce Engineers & Store Architects'
  },
  {
    label: 'Sub-600ms AI Voice Telephony Pipeline',
    keyword: 'sub 600ms ai voice agent telephony pipeline vapi retell',
    intent: 'commercial',
    audience: 'B2B Founders & Telephony Systems Engineers'
  }
];

export const LlmSeoMetaGeneratorPage: React.FC<LlmSeoMetaGeneratorPageProps> = ({ onOpenInquiry }) => {
  const [keyword, setKeyword] = useState('programmatic seo architecture nextjs typescript');
  const [intent, setIntent] = useState<SearchIntent>('technical_guide');
  const [audience, setAudience] = useState('Technical SEO Directors & Full-Stack Engineers');
  const [brandName, setBrandName] = useState('Sheharyar Siraj');
  const [modelTarget, setModelTarget] = useState<ModelTarget>('claude');
  const [activeTab, setActiveTab] = useState<'all' | 'meta' | 'prompt' | 'schema'>('all');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const applyPreset = (preset: PresetTopic) => {
    setKeyword(preset.keyword);
    setIntent(preset.intent);
    setAudience(preset.audience);
  };

  const copyToClipboard = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(identifier);
    setTimeout(() => {
      setCopiedItem(null);
    }, 2000);
  };

  // Capitalize words cleanly
  const toTitleCase = (str: string): string => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => {
        if (['and', 'or', 'the', 'in', 'on', 'at', 'to', 'for', 'with', 'by'].includes(word)) {
          return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  };

  const generatedData = useMemo(() => {
    const cleanKeyword = keyword.trim() || 'enterprise software systems';
    const titleCaseTopic = toTitleCase(cleanKeyword);

    // Meta Title Generation based on intent
    let title = '';
    let description = '';

    if (intent === 'commercial') {
      title = `${titleCaseTopic}: Architecture, Pricing & ROI Review`;
      if (title.length > 58) {
        title = `${titleCaseTopic}: Architecture & ROI`;
      }
      description = `Evaluate ${cleanKeyword.toLowerCase()} for enterprise teams. Compare infrastructure benchmarks, deployment timelines, operational cost models, and production ROI.`;
    } else if (intent === 'technical_guide') {
      title = `${titleCaseTopic}: Production Engineering Guide`;
      if (title.length > 58) {
        title = `${titleCaseTopic}: Deep Technical Guide`;
      }
      description = `Complete technical architecture breakdown for ${cleanKeyword.toLowerCase()}. Implementation patterns, error handling protocols, configuration files, and benchmarks.`;
    } else if (intent === 'tutorial') {
      title = `How to Build ${titleCaseTopic}: Step-by-Step Code Tutorial`;
      if (title.length > 58) {
        title = `${titleCaseTopic}: Step-by-Step Tutorial`;
      }
      description = `Step-by-step implementation tutorial for ${cleanKeyword.toLowerCase()}. Production code snippets, common architectural pitfalls, testing steps, and deployment.`;
    } else {
      title = `What Is ${titleCaseTopic}? Complete Technical Overview`;
      if (title.length > 58) {
        title = `${titleCaseTopic}: Complete Overview`;
      }
      description = `In-depth analysis of ${cleanKeyword.toLowerCase()}. Explore core system concepts, architectural trade-offs, real-world case studies, and engineering requirements.`;
    }

    // Ensure ideal length boundaries
    if (title.length < 48 && brandName) {
      title = `${title} | ${brandName}`;
    }
    if (title.length > 60) {
      title = title.slice(0, 57) + '...';
    }

    if (description.length > 158) {
      description = description.slice(0, 155) + '...';
    }

    // URL slug simulation
    const simulatedSlug = cleanKeyword
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // LLM Prompt Generation
    let llmPrompt = '';
    if (modelTarget === 'claude') {
      llmPrompt = `<task>
Write an exhaustive, production-grade technical article targeting "${cleanKeyword}".
Target Audience: ${audience}.
Search Intent: ${intent.replace('_', ' ').toUpperCase()}.
Author / Engineering Anchor: ${brandName || 'Senior Systems Architect'}.
</task>

<style_and_voice>
1. Write in a sharp, authoritative, developer-to-developer tone.
2. Absolutely no AI cliches: forbid phrases like "In today's fast-paced world", "delve into", "tapestry", "game-changer", "revolutionize", or "vital role".
3. Prioritize information density. Use precise nomenclature, technical trade-offs, and concrete metrics.
4. Do not use em-dashes. Maintain clean, structured sentence composition.
</style_and_voice>

<structural_requirements>
1. Introduction: State the operational problem immediately in the first 2 sentences. Include an executive summary table comparing before vs after metrics.
2. Core Architectural Pillars: Provide 3 to 4 distinct sections with technical implementation steps.
3. Code / Configuration Block: Include a fully commented, secure, production-ready code sample or configuration snippet.
4. Failure Modes & Edge Cases: Explicitly break down at least 3 edge cases that break naive implementations in high-traffic production environments.
5. Technical FAQ: Provide 4 high-intent questions and answers optimized for search engine featured snippets and AI Overviews.
</structural_requirements>

<semantic_entities_to_anchor>
Anchor the article with the following contextual entities:
- Infrastructure layer and memory bottlenecks
- Idempotency, rate limits, and latency targets
- Automated testing, telemetry monitoring, and fallback routing
</semantic_entities_to_anchor>`;
    } else if (modelTarget === 'gpt4o') {
      llmPrompt = `You are a Principal Software Engineer and Technical SEO Architect.

ASSIGNMENT:
Write a comprehensive, authoritative technical guide covering: "${cleanKeyword}"
Target Audience: ${audience}
Primary Intent: ${intent.replace('_', ' ').toUpperCase()}

EDITORIAL RULES:
1. Zero filler sentences. Every paragraph must deliver concrete technical value.
2. Ban all generic marketing adjectives ("revolutionary", "cutting-edge", "seamless", "effortless").
3. Include real architectural numbers (e.g. latency in milliseconds, throughput per second, memory allocations).
4. Do not use em-dashes. Use clear punctuation and precise phrasing.

OUTLINE BLUEPRINT:
- H1: ${title}
- Overview: The Root Problem and Production Architecture
- System Flow: ASCII or text-based architecture diagram
- Implementation: Hardened code snippet with error handling
- Edge-Case Matrix: 3 production landmines and defensive patterns
- 4 High-Value FAQ questions formatted for Google AI Overviews and Perplexity search answers`;
    } else {
      llmPrompt = `[SYSTEM: DEEPSEEK REASONING PROTOCOL]
Analyze search intent for: "${cleanKeyword}"
Targeting: ${audience}

PHASE 1: REASONING & INFORMATION GAIN AUDIT
1. Identify common generic content covering this topic across top 10 search results.
2. Isolate missing technical perspectives (e.g., connection pooling, retry stampedes, concurrency locks).
3. Formulate unique engineering thesis providing higher information gain than existing competitors.

PHASE 2: CONTENT PRODUCTION
Write the final article adhering to this exact title:
"${title}"

Ensure:
- Zero promotional fluff. Pure engineering mechanics.
- Concrete configuration blocks with line-by-line annotations.
- Failure recovery protocols under high load.
- Strict avoidance of em-dashes across all text.
- 4 authoritative FAQs directly answering user search queries.`;
    }

    // Article JSON-LD Schema
    const schemaJson = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description: description,
      keywords: cleanKeyword,
      inLanguage: 'en-US',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://sheharyarsiraj.com/articles/${simulatedSlug}/`
      },
      author: {
        '@type': 'Person',
        name: brandName || 'Sheharyar Siraj',
        url: 'https://sheharyarsiraj.com/'
      },
      publisher: {
        '@type': 'Organization',
        name: brandName || 'Sheharyar Siraj',
        url: 'https://sheharyarsiraj.com/'
      },
      datePublished: new Date().toISOString().split('T')[0],
      dateModified: new Date().toISOString().split('T')[0],
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '.article-summary', '.faq-answer']
      }
    };

    return {
      title,
      description,
      simulatedSlug,
      llmPrompt,
      schemaString: JSON.stringify(schemaJson, null, 2)
    };
  }, [keyword, intent, audience, brandName, modelTarget]);

  const pageSchema = generateSchemaGraph('/tools/llm-seo-meta-generator');

  const faqs = [
    {
      question: 'Why do naive LLM prompts generate low-ranking SEO content?',
      answer:
        'Standard prompts lack negative constraints, entity constraints, and information gain directives. When prompted casually, large language models default to median probabilistic training text, generating repetitive transitional fluff and superficial definitions. Search engine quality filters like Google Helpful Content algorithms flag and down-rank generic text because it provides zero original insight or verifiable technical depth.'
    },
    {
      question: 'What is the optimal character and pixel budget for modern Google SEO meta titles?',
      answer:
        'Google truncates search result titles that exceed 600 pixels on desktop screens and 580 pixels on mobile viewports. In character terms, this equates to 50 to 60 characters. Keeping your primary keyword within the first 35 characters ensures critical topic visibility even on compact mobile displays before brand name delimiters.'
    },
    {
      question: 'How does structured Article schema improve visibility in Google AI Overviews and Perplexity?',
      answer:
        'AI search engines use structured JSON-LD data to verify authoritative authorship, publication timestamps, and semantic entity relationships without guessing. Adding Speakable specifications and explicit entity attributes allows retrieval-augmented generation (RAG) engines to extract factual claims with high confidence scores, significantly increasing citation probability in AI Overviews.'
    },
    {
      question: 'Why does eliminating em-dashes improve readability and AI prompt precision?',
      answer:
        'Overusing punctuation like em-dashes leads to fragmented clauses, run-on sentences, and disjointed reading flow on mobile devices. In LLM prompts, enforcing clear, concise sentences with standard punctuation produces cleaner token generation, reduces rambling outputs, and prevents models from generating repetitive parenthetical commentary.'
    }
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <SEOHead
        title="LLM Prompt & SEO Meta Generator | Sheharyar Siraj"
        description="Generate high-converting SEO meta titles, meta descriptions, deep-research LLM prompts, and Schema.org Article JSON-LD graphs for programmatic content scaling."
        canonicalUrl="https://sheharyarsiraj.com/tools/llm-seo-meta-generator/"
        schema={pageSchema}
      />

      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { label: 'Systems & Utility Tools', href: '/tools/' },
          { label: 'LLM SEO Meta Generator' }
        ]}
      />

      {/* Hero Header Section */}
      <div className="mt-8 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles size={14} />
          <span>PROGRAMMATIC SEO & CONTENT ARCHITECTURE</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
          Dynamic LLM Prompt Generator &{' '}
          <span className="text-accent">SEO Meta Optimizer</span>
        </h1>

        <p className="text-brand-secondary text-base sm:text-xl max-w-4xl leading-relaxed font-body">
          Programmatic meta title, description, and deep-research LLM prompt compiler. Build search-optimized metadata, structured prompts with negative constraints, and verified Article JSON-LD schema graphs that rank across traditional SERPs and AI search engines.
        </p>

        {/* System Capability Badges */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl glass-panel border border-brand-border/60 bg-surface-1/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Eye size={18} />
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-white">Live SERP</div>
              <div className="text-[11px] font-mono text-brand-muted">Pixel-Accurate Preview</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Bot size={18} />
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-white">3 LLM Specs</div>
              <div className="text-[11px] font-mono text-brand-muted">Claude, GPT-4o, DeepSeek</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Code2 size={18} />
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-white">Article JSON-LD</div>
              <div className="text-[11px] font-mono text-brand-muted">Speakable Specification</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <ShieldCheck size={18} />
            </div>
            <div>
              <div className="font-mono text-lg font-bold text-white">Zero Em-Dashes</div>
              <div className="text-[11px] font-mono text-brand-muted">Clean Syntax Standard</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Tool Section */}
      <div className="my-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Configuration Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl glass-panel border border-brand-border bg-surface-1">
              <div className="flex items-center justify-between pb-4 border-b border-brand-border/60 mb-5">
                <div className="flex items-center gap-2 text-white font-mono text-sm font-bold">
                  <Sliders size={16} className="text-accent" />
                  <span>TARGET CONFIGURATION</span>
                </div>
                <span className="text-[10px] font-mono text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20 font-bold">
                  DYNAMIC COMPILER
                </span>
              </div>

              {/* Quick Presets */}
              <div className="mb-6">
                <label className="block text-xs font-mono font-bold text-brand-secondary uppercase tracking-wider mb-2">
                  Sample High-Intent Presets
                </label>
                <div className="flex flex-col gap-2">
                  {PRESET_TOPICS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      className="text-left p-2.5 rounded-xl text-xs font-mono bg-surface-2 hover:bg-surface-3 border border-brand-border/60 hover:border-accent/40 text-brand-secondary hover:text-white transition-all flex items-center justify-between group"
                    >
                      <span className="truncate">{preset.label}</span>
                      <ArrowUpRight size={13} className="text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Keyword / Topic Input */}
              <div className="mb-5">
                <label className="block text-xs font-mono font-bold text-brand-secondary uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Target Keyword or Article Topic</span>
                  <span className="text-[11px] font-mono text-brand-muted">{keyword.length} chars</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="e.g. programmatic seo nextjs typescript"
                    className="w-full bg-surface-2 border border-brand-border rounded-xl px-4 py-3 text-white text-sm font-body focus:outline-none focus:border-accent transition-colors"
                  />
                  <Search size={16} className="absolute right-3.5 top-3.5 text-brand-muted" />
                </div>
              </div>

              {/* Search Intent Selector */}
              <div className="mb-5">
                <label className="block text-xs font-mono font-bold text-brand-secondary uppercase tracking-wider mb-2">
                  Search Intent Class
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'technical_guide', label: 'Technical Guide' },
                    { id: 'commercial', label: 'Commercial / ROI' },
                    { id: 'tutorial', label: 'Step Tutorial' },
                    { id: 'informational', label: 'Informational' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setIntent(item.id as SearchIntent)}
                      className={`px-3 py-2 rounded-xl text-xs font-mono border transition-all text-left ${
                        intent === item.id
                          ? 'bg-accent/15 border-accent text-accent font-bold'
                          : 'bg-surface-2 border-brand-border/60 text-brand-secondary hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Audience */}
              <div className="mb-5">
                <label className="block text-xs font-mono font-bold text-brand-secondary uppercase tracking-wider mb-2">
                  Target Audience Persona
                </label>
                <input
                  type="text"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="e.g. Technical SEO Directors & Full-Stack Engineers"
                  className="w-full bg-surface-2 border border-brand-border rounded-xl px-4 py-2.5 text-white text-xs font-body focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              {/* Author / Brand Name */}
              <div className="mb-5">
                <label className="block text-xs font-mono font-bold text-brand-secondary uppercase tracking-wider mb-2">
                  Brand or Author Entity Name
                </label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="e.g. Sheharyar Siraj"
                  className="w-full bg-surface-2 border border-brand-border rounded-xl px-4 py-2.5 text-white text-xs font-body focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              {/* Model Target Architecture */}
              <div>
                <label className="block text-xs font-mono font-bold text-brand-secondary uppercase tracking-wider mb-2">
                  Target LLM Output Protocol
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'claude', label: 'Claude 3.5' },
                    { id: 'gpt4o', label: 'GPT-4o' },
                    { id: 'deepseek', label: 'DeepSeek-R1' }
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setModelTarget(m.id as ModelTarget)}
                      className={`py-2 px-2 text-center rounded-xl text-xs font-mono border transition-all ${
                        modelTarget === m.id
                          ? 'bg-accent text-black border-accent font-bold shadow-[0_0_15px_rgba(183,255,60,0.3)]'
                          : 'bg-surface-2 border-brand-border/60 text-brand-secondary hover:text-white'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Google Search Engine Preview Simulator */}
            <div className="p-6 rounded-2xl glass-panel border border-brand-border bg-surface-1">
              <div className="flex items-center gap-2 text-white font-mono text-xs font-bold uppercase tracking-wider mb-3">
                <Globe size={15} className="text-accent" />
                <span>Google Desktop SERP Simulator</span>
              </div>

              <div className="p-4 rounded-xl bg-[#1c1c1c] border border-[#2e2e2e] space-y-1.5 font-sans">
                <div className="flex items-center gap-2 text-xs text-[#bdc1c6]">
                  <div className="w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center text-[9px] text-accent font-mono font-bold">
                    S
                  </div>
                  <div className="truncate">
                    <span className="text-[#dadce0]">sheharyarsiraj.com</span>
                    <span className="text-[#9aa0a6]"> › articles › {generatedData.simulatedSlug}</span>
                  </div>
                </div>

                <div className="text-[#8ab4f8] hover:underline text-base font-medium leading-snug cursor-pointer line-clamp-1">
                  {generatedData.title}
                </div>

                <p className="text-[#bdc1c6] text-xs leading-relaxed line-clamp-2">
                  {generatedData.description}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-brand-muted">
                <span>Pixel Limit: 600px Max</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={12} /> SERP Truncation Safe
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Output Engine */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tab Navigation */}
            <div className="flex items-center justify-between flex-wrap gap-2 p-1.5 rounded-xl bg-surface-1 border border-brand-border">
              <div className="flex items-center gap-1">
                {[
                  { id: 'all', label: 'All Artifacts' },
                  { id: 'meta', label: 'SEO Meta' },
                  { id: 'prompt', label: 'LLM Prompt' },
                  { id: 'schema', label: 'Article Schema' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all ${
                      activeTab === tab.id
                        ? 'bg-accent text-black font-bold shadow-[0_0_15px_rgba(183,255,60,0.3)]'
                        : 'text-brand-secondary hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() =>
                  copyToClipboard(
                    `SEO TITLE: ${generatedData.title}\n\nSEO DESCRIPTION: ${generatedData.description}\n\nLLM PROMPT:\n${generatedData.llmPrompt}\n\nARTICLE SCHEMA:\n${generatedData.schemaString}`,
                    'all'
                  )
                }
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-surface-2 hover:bg-surface-3 border border-brand-border text-white flex items-center gap-1.5 transition-colors"
              >
                {copiedItem === 'all' ? (
                  <>
                    <Check size={13} className="text-accent" />
                    <span className="text-accent">COPIED ALL</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>COPY ALL ARTIFACTS</span>
                  </>
                )}
              </button>
            </div>

            {/* Block 1: SEO Meta Tags */}
            {(activeTab === 'all' || activeTab === 'meta') && (
              <div className="p-6 rounded-2xl glass-panel border border-brand-border bg-surface-1 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-brand-border/60">
                  <div className="flex items-center gap-2 text-white font-mono text-sm font-bold">
                    <FileText size={16} className="text-accent" />
                    <span>OPTIMIZED SEO META TAGS</span>
                  </div>
                  <span className="text-[11px] font-mono text-brand-muted">HTML HEAD READY</span>
                </div>

                {/* Title Box */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className="text-brand-secondary font-bold uppercase tracking-wider">
                      Meta Title Tag (50-60 characters ideal)
                    </span>
                    <span
                      className={`font-bold ${
                        generatedData.title.length >= 50 && generatedData.title.length <= 60
                          ? 'text-emerald-400'
                          : generatedData.title.length < 50
                          ? 'text-amber-400'
                          : 'text-red-400'
                      }`}
                    >
                      {generatedData.title.length} / 60 chars
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-surface-2 border border-brand-border flex items-center justify-between gap-3">
                    <code className="text-sm font-mono text-white select-all break-all">
                      {generatedData.title}
                    </code>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(generatedData.title, 'title')}
                      className="p-2 rounded-lg bg-surface-3 hover:bg-surface-1 border border-brand-border text-brand-secondary hover:text-white transition-colors flex-shrink-0"
                      title="Copy Title"
                    >
                      {copiedItem === 'title' ? (
                        <Check size={14} className="text-accent" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Description Box */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className="text-brand-secondary font-bold uppercase tracking-wider">
                      Meta Description Tag (145-160 characters ideal)
                    </span>
                    <span
                      className={`font-bold ${
                        generatedData.description.length >= 140 && generatedData.description.length <= 160
                          ? 'text-emerald-400'
                          : 'text-amber-400'
                      }`}
                    >
                      {generatedData.description.length} / 160 chars
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-surface-2 border border-brand-border flex items-start justify-between gap-3">
                    <p className="text-sm font-body text-brand-secondary select-all leading-relaxed">
                      {generatedData.description}
                    </p>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(generatedData.description, 'description')}
                      className="p-2 rounded-lg bg-surface-3 hover:bg-surface-1 border border-brand-border text-brand-secondary hover:text-white transition-colors flex-shrink-0 mt-0.5"
                      title="Copy Description"
                    >
                      {copiedItem === 'description' ? (
                        <Check size={14} className="text-accent" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>
                </div>

                {/* HTML Output Snippet */}
                <div>
                  <div className="text-xs font-mono text-brand-muted uppercase tracking-wider mb-1.5">
                    Production HTML Snippet
                  </div>
                  <pre className="p-3 rounded-xl bg-black/60 border border-brand-border/60 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                    {`<title>${generatedData.title}</title>\n<meta name="description" content="${generatedData.description}" />`}
                  </pre>
                </div>
              </div>
            )}

            {/* Block 2: Deep LLM Generation Prompt */}
            {(activeTab === 'all' || activeTab === 'prompt') && (
              <div className="p-6 rounded-2xl glass-panel border border-brand-border bg-surface-1 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-brand-border/60">
                  <div className="flex items-center gap-2 text-white font-mono text-sm font-bold">
                    <Bot size={16} className="text-accent" />
                    <span>STRUCTURED LLM PROMPT ARCHITECTURE</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(generatedData.llmPrompt, 'prompt')}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-surface-2 hover:bg-surface-3 border border-brand-border text-white flex items-center gap-1.5 transition-colors"
                  >
                    {copiedItem === 'prompt' ? (
                      <>
                        <Check size={12} className="text-accent" />
                        <span className="text-accent">COPIED PROMPT</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>COPY PROMPT</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-brand-muted">
                  <span className="px-2 py-0.5 rounded bg-surface-2 border border-brand-border text-accent">
                    Negative Constraints Active
                  </span>
                  <span>Zero em-dashes. Anti-fluff filters. High information density.</span>
                </div>

                <div className="relative">
                  <pre className="p-4 rounded-xl bg-black/70 border border-brand-border text-xs font-mono text-brand-secondary overflow-x-auto max-h-80 leading-relaxed whitespace-pre-wrap">
                    {generatedData.llmPrompt}
                  </pre>
                </div>
              </div>
            )}

            {/* Block 3: Article JSON-LD Schema */}
            {(activeTab === 'all' || activeTab === 'schema') && (
              <div className="p-6 rounded-2xl glass-panel border border-brand-border bg-surface-1 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-brand-border/60">
                  <div className="flex items-center gap-2 text-white font-mono text-sm font-bold">
                    <Code2 size={16} className="text-accent" />
                    <span>ARTICLE JSON-LD SCHEMA WITH SPEAKABLE TARGETS</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(generatedData.schemaString, 'schema')}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-surface-2 hover:bg-surface-3 border border-brand-border text-white flex items-center gap-1.5 transition-colors"
                  >
                    {copiedItem === 'schema' ? (
                      <>
                        <Check size={12} className="text-accent" />
                        <span className="text-accent">COPIED SCHEMA</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>COPY JSON-LD</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-4 rounded-xl bg-black/70 border border-brand-border text-xs font-mono text-sky-400 overflow-x-auto max-h-72 leading-relaxed">
                  {`<script type="application/ld+json">\n${generatedData.schemaString}\n</script>`}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AEO Direct Answer Block */}
      <AeoDirectAnswer
        summary="Dynamic programmatic SEO meta optimization combined with structured LLM prompt architecture enables websites to publish high-information-gain content at scale without generic AI penalties. By constraining character counts to exact SERP pixel boundaries, enforcing negative prompt rules against cliché adjectives, and attaching Schema.org Article structured data with Speakable specifications, engineering teams secure high-authority rankings across both Google and generative AI search engines."
        keyTakeaways={[
          'Restricts meta title width to 600 pixels to prevent truncation on desktop and mobile SERPs.',
          'Enforces negative prompt constraints forbidding conversational filler and em-dashes.',
          'Attaches valid Article JSON-LD graphs with Speakable targets for Google AI Overviews and Perplexity citations.',
          'Eliminates duplicate programmatic pages through strict canonical URL mapping and entity anchoring.'
        ]}
      />

      {/* Deep Technical Guide: Programmatic SEO & LLM Prompting */}
      <div className="my-16 space-y-16">
        {/* Section 1 */}
        <section className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider">
            <Zap size={14} />
            <span>ARCHITECTURAL FOUNDATION</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Shift from String Matching to Entity Vector Retrieval
          </h2>

          <div className="text-brand-secondary text-base sm:text-lg leading-relaxed font-body space-y-4">
            <p>
              Traditional search engine optimization relied heavily on keyword frequency, exact-match URL structures, and repetitive header tags. Contemporary search engines like Google, along with answer engines like Perplexity and OpenAI Search, evaluate documents using dense vector embeddings and structured knowledge graphs.
            </p>
            <p>
              When a crawler evaluates an article, it compares the high-dimensional vector representations of your text against known authority nodes in its knowledge graph. Merely mentioning a keyword three times does not establish topical authority. Your content must exhibit strong vector proximity to related entities, technical trade-offs, and operational failure scenarios.
            </p>
            <p>
              Programmatic SEO succeeds when each generated page provides genuine information gain. If your programmatic pages are simply variations of the same template with swapped city or software names, search engines group them as doorway pages and suppress their indexation. The solution is dynamic, entity-dense prompt architecture that generates unique technical examples and architectural trade-offs for each target keyword.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider">
            <Layers size={14} />
            <span>METRIC BOUNDARIES</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Mathematics of SERP Pixel Budgets and CTR Optimization
          </h2>

          <div className="text-brand-secondary text-base sm:text-lg leading-relaxed font-body space-y-4">
            <p>
              Search engine result pages allocate physical screen pixels rather than fixed character limits. Google desktop search interfaces reserve approximately 600 pixels of horizontal width for titles before applying an ellipsis truncation. Because proportional characters like capital W or M consume more horizontal pixels than lowercase i or l, character counts between 50 and 60 characters serve as the standard safety threshold.
            </p>
            <p>
              Truncated titles diminish organic click-through rates by hiding the primary value proposition. Placing critical topic modifiers within the first 35 characters guarantees that mobile users see the core context even on narrow viewports.
            </p>
            <p>
              For meta descriptions, the optimal target sits between 145 and 160 characters. Descriptions under 120 characters underutilize available SERP real estate, while descriptions exceeding 160 characters are severed mid-sentence. Including an active verb, an operational benefit, and a clear secondary entity ensures that Google highlights your snippet when matching search query terms.
            </p>
          </div>
        </section>

        {/* 4 Core Pillars of Modern Search Optimization */}
        <section className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider">
            <ShieldCheck size={14} />
            <span>ENGINEERING SPECIFICATION</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Four Core Pillars of Programmatic AI Content Optimization
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="p-6 rounded-2xl glass-panel border border-brand-border bg-surface-1">
              <div className="flex items-center gap-2.5 text-accent font-mono text-sm font-bold mb-3">
                <Hash size={18} />
                <span>1. Strict Negative Prompt Constraints</span>
              </div>
              <p className="text-sm text-brand-secondary font-body leading-relaxed mb-3">
                Unconstrained LLM outputs are easily detected by quality classifiers due to repetitive transitional phrasing and cliché metaphors.
              </p>
              <div className="p-3 rounded-xl bg-surface-2 border border-brand-border/60 text-xs font-mono text-brand-muted">
                Always supply explicit negative lists banning words like "revolutionize", "tapestry", "delve", and parenthetical em-dash structures.
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-brand-border bg-surface-1">
              <div className="flex items-center gap-2.5 text-accent font-mono text-sm font-bold mb-3">
                <Code2 size={18} />
                <span>2. Article Schema with Speakable Specifications</span>
              </div>
              <p className="text-sm text-brand-secondary font-body leading-relaxed mb-3">
                Generative AI bots crawl structured data to verify facts and citation provenance before generating conversational responses.
              </p>
              <div className="p-3 rounded-xl bg-surface-2 border border-brand-border/60 text-xs font-mono text-brand-muted">
                Embed Schema.org Article nodes with Speakable CSS selectors targeting the executive summary and core FAQ answers.
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-brand-border bg-surface-1">
              <div className="flex items-center gap-2.5 text-accent font-mono text-sm font-bold mb-3">
                <Zap size={18} />
                <span>3. Unique Information Gain per Page</span>
              </div>
              <p className="text-sm text-brand-secondary font-body leading-relaxed mb-3">
                Search engines down-rank template-heavy programmatic directories that provide no original data or proprietary benchmarks.
              </p>
              <div className="p-3 rounded-xl bg-surface-2 border border-brand-border/60 text-xs font-mono text-brand-muted">
                Inject unique telemetry figures, benchmark graphs, or reproducible code snippets into each programmatic page variant.
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-brand-border bg-surface-1">
              <div className="flex items-center gap-2.5 text-accent font-mono text-sm font-bold mb-3">
                <Globe size={18} />
                <span>4. Canonical and Sitemap Integrity</span>
              </div>
              <p className="text-sm text-brand-secondary font-body leading-relaxed mb-3">
                Deploying thousands of programmatic URLs without self-referential canonical tags causes severe crawl budget waste.
              </p>
              <div className="p-3 rounded-xl bg-surface-2 border border-brand-border/60 text-xs font-mono text-brand-muted">
                Ensure every generated page serves a self-referencing canonical tag and is indexed in a partitioned XML sitemap index.
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Technical FAQ Accordion */}
      <div className="my-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-3">
            <Terminal size={14} />
            <span>TECHNICAL SPECIFICATIONS & FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Programmatic SEO & LLM Prompting FAQ
          </h2>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl glass-panel border border-brand-border bg-surface-1 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-heading text-base sm:text-lg font-bold text-white">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-surface-2 border border-brand-border flex items-center justify-center flex-shrink-0 text-accent">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-brand-secondary font-body text-sm sm:text-base leading-relaxed border-t border-brand-border/40 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Conversion Banner */}
      <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-accent/30 bg-gradient-to-r from-accent/10 via-surface-2 to-surface-1 text-center max-w-5xl mx-auto my-12">
        <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          Scale Your Programmatic SEO Architecture
        </h2>
        <p className="text-brand-secondary text-base sm:text-lg max-w-2xl mx-auto mb-8 font-body">
          Connect directly with Sheharyar Siraj. We architect high-converting programmatic SEO pipelines, custom content models, and verified Schema.org entity graphs that rank sustainably.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            type="button"
            onClick={onOpenInquiry}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-mono text-sm font-bold tracking-wider bg-accent text-black hover:bg-white transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(183,255,60,0.4)] active:scale-95"
          >
            <Zap size={18} />
            <span>DISCUSS SEO ARCHITECTURE</span>
          </button>

          <Link
            to="/tools/local-schema-generator/"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-mono text-sm font-bold tracking-wider bg-surface-2 hover:bg-surface-3 border border-brand-border text-white transition-all flex items-center justify-center gap-2"
          >
            <span>LOCAL SCHEMA GENERATOR</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LlmSeoMetaGeneratorPage;
