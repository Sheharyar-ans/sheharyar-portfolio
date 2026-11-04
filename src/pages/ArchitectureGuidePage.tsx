import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  User,
  Sparkles,
  BookOpen,
  ShieldCheck,
  Tag,
  Copy,
  Check,
  Cpu,
  Layers,
  PhoneCall,
  Workflow,
  Database,
  Lock,
  ArrowUpRight,
  Server
} from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/seo/Breadcrumbs';
import { ARCHITECTURE_GUIDES, ArchitectureGuide } from '../data/architectureData';
import { generateSchemaGraph } from '../utils/schemaGenerator';

interface ArchitectureGuidePageProps {
  onOpenInquiry: () => void;
}

export const ArchitectureGuidePage: React.FC<ArchitectureGuidePageProps> = ({ onOpenInquiry }) => {
  const { slug } = useParams<{ slug: string }>();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  const guide = slug ? ARCHITECTURE_GUIDES[slug] : null;

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (totalScroll / windowHeight) * 100)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!guide) {
    return <Navigate to="/blog/" replace />;
  }

  const guideSchema = generateSchemaGraph(`/architecture/${guide.slug}/`);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleCopyCode = (code: string, index: number) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCodeIndex(index);
      setTimeout(() => setCopiedCodeIndex(null), 2500);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-bg text-white min-h-screen selection:bg-accent selection:text-black">
      {/* Scroll Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-accent z-50 transition-all duration-100 ease-out shadow-[0_0_12px_#B7FF3C]"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <SEOHead
        title={guide.metaTitle}
        description={guide.metaDescription}
        canonicalUrl={guide.canonicalUrl}
        schema={guideSchema}
      />

      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Breadcrumb & Return Action */}
        <div className="flex items-center justify-between gap-4 mb-6 pt-4">
          <Breadcrumbs
            items={[
              { label: 'HOME', href: '/' },
              { label: 'SYSTEM ARCHITECTURE', href: '/blog/' },
              { label: guide.badge }
            ]}
          />
          <Link
            to="/blog/"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-brand-secondary hover:text-accent transition-colors"
          >
            <ArrowLeft size={13} />
            <span>ALL ARTICLES & BLUEPRINTS</span>
          </Link>
        </div>

        {/* Header Hero Section */}
        <header className="mb-10 pb-8 border-b border-brand-border/60">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent font-mono text-xs font-bold uppercase tracking-wider">
              {guide.badge}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-surface-2 border border-brand-border/80 text-brand-secondary font-mono text-[11px]">
              {guide.proficiencyLevel}
            </span>
            <span className="flex items-center gap-1 text-xs font-mono text-brand-secondary">
              <Clock size={12} className="text-accent" />
              <span>{guide.readTime}</span>
            </span>
            <span className="flex items-center gap-1 text-xs font-mono text-brand-secondary">
              <Calendar size={12} className="text-accent" />
              <time dateTime={guide.publishedDate}>{guide.publishedDate}</time>
            </span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.12] mb-4 text-balance">
            {guide.headline}
          </h1>

          <p className="text-brand-secondary text-base sm:text-xl leading-relaxed font-body max-w-4xl mb-6">
            {guide.subheading}
          </p>

          {/* Author Byline & Verification Credentials */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-brand-border/40">
            <div className="flex items-center gap-3.5">
              <img
                src={guide.author.avatar}
                alt={guide.author.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full border-2 border-accent/40 object-cover"
                loading="eager"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-white text-sm sm:text-base">
                    {guide.author.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent/10 border border-accent/20 text-accent font-semibold">
                    VERIFIED ARCHITECT
                  </span>
                </div>
                <div className="text-xs font-mono text-brand-secondary">
                  {guide.author.role}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleShare}
                className="px-3 py-1.5 rounded-full bg-surface-2 border border-brand-border/70 hover:border-accent text-brand-secondary hover:text-white transition-all text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                title="Copy permanent canonical URL"
              >
                {copiedLink ? <Check size={13} className="text-accent" /> : <Share2 size={13} />}
                <span>{copiedLink ? 'LINK COPIED' : 'SHARE BLUEPRINT'}</span>
              </button>

              <button
                type="button"
                onClick={onOpenInquiry}
                className="px-4 py-1.5 rounded-full bg-accent text-black font-mono text-xs font-bold hover:bg-white transition-all shadow-[0_0_15px_rgba(183,255,60,0.3)] flex items-center gap-1 cursor-pointer active:scale-95"
              >
                <span>BOOK SCOPING CALL</span>
                <ArrowUpRight size={13} />
              </button>
            </div>
          </div>
        </header>

        {/* AEO / GEO Direct Answer Capsule (Target for Answer Engine Snippets) */}
        <section
          aria-label="AEO Direct Answer Summary"
          className="mb-12 p-6 sm:p-8 rounded-2xl glass-panel border border-accent/40 bg-gradient-to-br from-surface-1 via-accent/[0.05] to-surface-1 shadow-[0_0_30px_rgba(183,255,60,0.08)]"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
                AEO DIRECT ANSWER CAPSULE • 45-WORD SNIPPET TARGET
              </span>
            </div>
            <span className="text-xs font-mono text-brand-secondary">PRECISION SPECIFICATION</span>
          </div>

          <p className="text-base sm:text-lg font-medium text-white/95 leading-relaxed tracking-normal p-4 rounded-xl bg-black/40 border border-brand-border/80">
            &ldquo;{guide.directAnswerCapsule}&rdquo;
          </p>

          {/* Key Architectural Takeaways */}
          <div className="mt-6 pt-6 border-t border-brand-border/40">
            <h2 className="font-mono text-xs uppercase tracking-wider text-brand-secondary mb-3 flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-accent" />
              <span>CORE ARCHITECTURAL TAKEAWAYS FOR PRODUCTION</span>
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {guide.keyTakeaways.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs sm:text-sm text-brand-secondary leading-relaxed bg-surface-2/40 p-2.5 rounded-lg border border-brand-border/40"
                >
                  <span className="text-accent font-bold mt-0.5">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Technical Architecture Flow Diagram */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-1">
                SYSTEM TOPOLOGY & PIPELINE
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight">
                {guide.svgDiagramType === 'sub-500ms-telephony'
                  ? 'Sub-500ms Full-Duplex SIP Telephony Architecture Diagram'
                  : 'Deterministic Agentic State Engine & Database Lock Pipeline'}
              </h2>
            </div>
            <span className="text-xs font-mono text-brand-muted hidden sm:inline">
              RFC 6455 / STREAMING WEBSOCKETS
            </span>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-brand-border/80 bg-surface-1/90 shadow-2xl overflow-x-auto">
            {guide.svgDiagramType === 'sub-500ms-telephony' ? (
              <div className="min-w-[680px]">
                {/* SVG Visual Flow: Sub-500ms Voice Telephony */}
                <svg viewBox="0 0 900 240" className="w-full h-auto font-mono text-xs select-none">
                  <defs>
                    <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#B7FF3C" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
                    </linearGradient>
                    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1 L 8 5 L 0 9 z" fill="#B7FF3C" />
                    </marker>
                  </defs>

                  {/* Nodes */}
                  {/* Step 1: Inbound SIP */}
                  <g transform="translate(10, 50)">
                    <rect width="140" height="90" rx="12" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
                    <text x="70" y="32" textAnchor="middle" fill="#B7FF3C" fontWeight="bold">SIP INBOUND CALL</text>
                    <text x="70" y="52" textAnchor="middle" fill="#a1a1aa" fontSize="10">PSTN Phone Network</text>
                    <text x="70" y="70" textAnchor="middle" fill="#71717a" fontSize="9">G.711u 8kHz Audio</text>
                  </g>

                  {/* Arrow 1 */}
                  <path d="M 150 95 L 180 95" stroke="#B7FF3C" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* Step 2: Twilio SIP Trunk */}
                  <g transform="translate(185, 50)">
                    <rect width="140" height="90" rx="12" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
                    <text x="70" y="32" textAnchor="middle" fill="#ffffff" fontWeight="bold">TWILIO SIP TRUNK</text>
                    <text x="70" y="52" textAnchor="middle" fill="#a1a1aa" fontSize="10">Elastic Carrier SBC</text>
                    <text x="70" y="70" textAnchor="middle" fill="#B7FF3C" fontSize="9">RFC 3261 Signaling</text>
                  </g>

                  {/* Arrow 2 */}
                  <path d="M 325 95 L 355 95" stroke="#B7FF3C" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* Step 3: WebSocket Gateway & Deepgram */}
                  <g transform="translate(360, 40)">
                    <rect width="165" height="110" rx="12" fill="#111827" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="82" y="30" textAnchor="middle" fill="#38bdf8" fontWeight="bold">WEBSOCKET GATEWAY</text>
                    <rect x="15" y="42" width="135" height="28" rx="6" fill="#1e293b" />
                    <text x="82" y="60" textAnchor="middle" fill="#B7FF3C" fontWeight="bold">DEEPGRAM NOVA-2</text>
                    <text x="82" y="90" textAnchor="middle" fill="#a1a1aa" fontSize="10">Latency: &lt;300ms STT</text>
                    <text x="82" y="104" textAnchor="middle" fill="#38bdf8" fontSize="9">Streaming Partial Tokens</text>
                  </g>

                  {/* Arrow 3 */}
                  <path d="M 525 95 L 555 95" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* Step 4: LLM Function Reasoning */}
                  <g transform="translate(560, 50)">
                    <rect width="150" height="90" rx="12" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
                    <text x="75" y="32" textAnchor="middle" fill="#ffffff" fontWeight="bold">LLM INFERENCE</text>
                    <text x="75" y="52" textAnchor="middle" fill="#B7FF3C" fontSize="10">Speculative Tokens</text>
                    <text x="75" y="70" textAnchor="middle" fill="#a1a1aa" fontSize="9">Pydantic Tool Calling</text>
                  </g>

                  {/* Arrow 4 */}
                  <path d="M 710 95 L 735 95" stroke="#B7FF3C" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* Step 5: Cartesia TTS Audio Stream */}
                  <g transform="translate(740, 50)">
                    <rect width="150" height="90" rx="12" fill="#18181b" stroke="#B7FF3C" strokeWidth="1.5" />
                    <text x="75" y="30" textAnchor="middle" fill="#B7FF3C" fontWeight="bold">CARTESIA / 11LABS</text>
                    <text x="75" y="50" textAnchor="middle" fill="#ffffff" fontSize="10">Sonic TTS (&lt;200ms)</text>
                    <text x="75" y="72" textAnchor="middle" fill="#38bdf8" fontSize="9">Chunked Audio Back to SIP</text>
                  </g>

                  {/* Bottom Latency Budget Summary Strip */}
                  <rect x="10" y="180" width="880" height="42" rx="8" fill="#18181b" stroke="#27272a" />
                  <text x="25" y="206" fill="#71717a" fontSize="10">ROUNDTRIP BUDGET:</text>
                  <text x="160" y="206" fill="#B7FF3C" fontSize="11" fontWeight="bold">STT: ~250ms</text>
                  <text x="270" y="206" fill="#ffffff" fontSize="11">+</text>
                  <text x="290" y="206" fill="#38bdf8" fontSize="11" fontWeight="bold">LLM First Token: ~110ms</text>
                  <text x="460" y="206" fill="#ffffff" fontSize="11">+</text>
                  <text x="480" y="206" fill="#B7FF3C" fontSize="11" fontWeight="bold">TTS Synthesis: ~90ms</text>
                  <text x="630" y="206" fill="#ffffff" fontSize="11">=</text>
                  <text x="650" y="206" fill="#B7FF3C" fontSize="12" fontWeight="black">TOTAL TURN-TAKING LATENCY: 450ms (SUB-500ms SLA)</text>
                </svg>
              </div>
            ) : (
              <div className="min-w-[680px]">
                {/* SVG Visual Flow: Deterministic AI Agent Runtime */}
                <svg viewBox="0 0 900 240" className="w-full h-auto font-mono text-xs select-none">
                  <defs>
                    <marker id="arrow2" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1 L 8 5 L 0 9 z" fill="#B7FF3C" />
                    </marker>
                  </defs>

                  {/* Node 1: Ingress & Validation */}
                  <g transform="translate(10, 45)">
                    <rect width="145" height="95" rx="12" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
                    <text x="72" y="30" textAnchor="middle" fill="#B7FF3C" fontWeight="bold">USER INTENT</text>
                    <text x="72" y="50" textAnchor="middle" fill="#ffffff" fontSize="10">Voice / API Ingress</text>
                    <text x="72" y="70" textAnchor="middle" fill="#a1a1aa" fontSize="9">SHA-256 Idempotency Key</text>
                  </g>

                  <path d="M 155 92 L 185 92" stroke="#B7FF3C" strokeWidth="2" markerEnd="url(#arrow2)" />

                  {/* Node 2: Database Lock & WAL */}
                  <g transform="translate(190, 45)">
                    <rect width="165" height="95" rx="12" fill="#111827" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="82" y="28" textAnchor="middle" fill="#38bdf8" fontWeight="bold">DATABASE ENGINE</text>
                    <text x="82" y="48" textAnchor="middle" fill="#ffffff" fontSize="10">Postgres WAL Stream</text>
                    <text x="82" y="68" textAnchor="middle" fill="#B7FF3C" fontSize="9">pg_advisory_xact_lock()</text>
                    <text x="82" y="84" textAnchor="middle" fill="#a1a1aa" fontSize="8">Redis Redlock Algorithm</text>
                  </g>

                  <path d="M 355 92 L 385 92" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow2)" />

                  {/* Node 3: Orchestrator State Machine */}
                  <g transform="translate(390, 35)">
                    <rect width="170" height="115" rx="12" fill="#18181b" stroke="#B7FF3C" strokeWidth="2" />
                    <text x="85" y="26" textAnchor="middle" fill="#B7FF3C" fontWeight="black">STATE ORCHESTRATOR</text>
                    <rect x="15" y="38" width="140" height="24" rx="6" fill="#27272a" />
                    <text x="85" y="54" textAnchor="middle" fill="#ffffff" fontSize="10">Temporal / LangGraph</text>
                    <text x="85" y="80" textAnchor="middle" fill="#a1a1aa" fontSize="9">Finite State Machine Gates</text>
                    <text x="85" y="98" textAnchor="middle" fill="#38bdf8" fontSize="9">Pydantic v2 Type Contract</text>
                  </g>

                  <path d="M 560 92 L 590 92" stroke="#B7FF3C" strokeWidth="2" markerEnd="url(#arrow2)" />

                  {/* Node 4: Voice RAG Tier */}
                  <g transform="translate(595, 45)">
                    <rect width="145" height="95" rx="12" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
                    <text x="72" y="30" textAnchor="middle" fill="#ffffff" fontWeight="bold">VOICE RAG TIER</text>
                    <text x="72" y="50" textAnchor="middle" fill="#38bdf8" fontSize="10">Redis JSON (&lt;5ms)</text>
                    <text x="72" y="70" textAnchor="middle" fill="#B7FF3C" fontSize="9">pgvector HNSW (&lt;35ms)</text>
                  </g>

                  <path d="M 740 92 L 765 92" stroke="#B7FF3C" strokeWidth="2" markerEnd="url(#arrow2)" />

                  {/* Node 5: Output Execution & Audit */}
                  <g transform="translate(770, 45)">
                    <rect width="120" height="95" rx="12" fill="#18181b" stroke="#B7FF3C" strokeWidth="1.5" />
                    <text x="60" y="28" textAnchor="middle" fill="#B7FF3C" fontWeight="bold">COMMIT &</text>
                    <text x="60" y="44" textAnchor="middle" fill="#ffffff" fontSize="10">EXECUTE</text>
                    <text x="60" y="66" textAnchor="middle" fill="#a1a1aa" fontSize="9">Event Sourcing</text>
                    <text x="60" y="84" textAnchor="middle" fill="#38bdf8" fontSize="8">Audit Record</text>
                  </g>

                  {/* Bottom Guarantee Banner */}
                  <rect x="10" y="180" width="880" height="42" rx="8" fill="#18181b" stroke="#27272a" />
                  <text x="25" y="206" fill="#B7FF3C" fontSize="11" fontWeight="bold">DETERMINISTIC GUARANTEE:</text>
                  <text x="240" y="206" fill="#ffffff" fontSize="11">Zero Duplicate Tool Calls</text>
                  <text x="440" y="206" fill="#ffffff" fontSize="11">• Instant Crash Recovery from WAL</text>
                  <text x="680" y="206" fill="#38bdf8" fontSize="11">• 100% Transactional Repeatability</text>
                </svg>
              </div>
            )}
          </div>
        </section>

        {/* Deep Architectural Sections */}
        <div className="space-y-16 my-16">
          {guide.sections.map((sec, idx) => (
            <section
              key={sec.id}
              id={sec.id}
              className="scroll-mt-24 p-6 sm:p-10 rounded-2xl glass-panel border border-brand-border/70 bg-surface-1/60 hover:border-accent/30 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider">
                  SECTION 0{idx + 1}
                </span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                {sec.title}
              </h2>

              {sec.subheading && (
                <p className="font-heading text-base sm:text-lg text-brand-secondary font-semibold mb-6">
                  {sec.subheading}
                </p>
              )}

              {/* Callout box if present */}
              {sec.callout && (
                <div
                  className={`my-6 p-4 sm:p-5 rounded-xl border flex items-start gap-3.5 ${
                    sec.callout.type === 'warning'
                      ? 'bg-rose-950/20 border-rose-500/40 text-rose-200'
                      : sec.callout.type === 'blueprint'
                      ? 'bg-sky-950/20 border-sky-500/40 text-sky-200'
                      : 'bg-accent/[0.06] border-accent/30 text-white'
                  }`}
                >
                  <ShieldCheck
                    size={20}
                    className={`shrink-0 mt-0.5 ${
                      sec.callout.type === 'warning'
                        ? 'text-rose-400'
                        : sec.callout.type === 'blueprint'
                        ? 'text-sky-400'
                        : 'text-accent'
                    }`}
                  />
                  <div>
                    <div className="font-heading font-bold text-sm sm:text-base text-white mb-1">
                      {sec.callout.title}
                    </div>
                    <div className="text-xs sm:text-sm font-body leading-relaxed opacity-90">
                      {sec.callout.body}
                    </div>
                  </div>
                </div>
              )}

              {/* Prose Content with Markdown Parsing */}
              <div className="text-sm sm:text-base text-brand-secondary leading-relaxed space-y-4 font-body pt-2">
                {sec.content.split('\n\n').map((paragraph, pIdx) => {
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3
                        key={pIdx}
                        className="font-heading text-lg sm:text-xl font-bold text-white pt-4 tracking-tight"
                      >
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ')) {
                    const items = paragraph.split('\n');
                    return (
                      <ol key={pIdx} className="list-decimal pl-5 space-y-2 text-brand-secondary">
                        {items.map((it, itIdx) => (
                          <li key={itIdx}>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: it
                                  .replace(/^\d+\.\s+/, '')
                                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                                  .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-surface-2 font-mono text-accent text-xs">$1</code>')
                              }}
                            />
                          </li>
                        ))}
                      </ol>
                    );
                  }
                  return (
                    <p
                      key={pIdx}
                      dangerouslySetInnerHTML={{
                        __html: paragraph
                          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                          .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-surface-2 font-mono text-accent text-xs">$1</code>')
                      }}
                    />
                  );
                })}
              </div>

              {/* Code Snippet Box */}
              {sec.codeSnippet && (
                <div className="mt-8 rounded-xl overflow-hidden border border-brand-border/80 bg-black/80">
                  <div className="px-4 py-2.5 bg-surface-2/80 border-b border-brand-border/80 flex items-center justify-between text-xs font-mono">
                    <span className="text-accent flex items-center gap-2">
                      <Server size={13} />
                      <span>{sec.codeSnippet.fileName}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(sec.codeSnippet!.code, idx)}
                      className="flex items-center gap-1.5 text-brand-secondary hover:text-white transition-colors cursor-pointer"
                    >
                      {copiedCodeIndex === idx ? (
                        <>
                          <Check size={12} className="text-accent" />
                          <span className="text-accent">COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>COPY CODE</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 sm:p-6 text-xs sm:text-[13px] font-mono text-sky-300 overflow-x-auto leading-relaxed select-all">
                    <code>{sec.codeSnippet.code}</code>
                  </pre>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Structured Comparison Table */}
        <section className="my-16 p-6 sm:p-10 rounded-2xl glass-panel border border-brand-border/80">
          <div className="mb-6">
            <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-1">
              ENGINEERING BENCHMARK MATRIX
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {guide.comparisonTable.title}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm font-body border-collapse min-w-[620px]">
              <thead>
                <tr className="border-b border-brand-border/80 bg-surface-2/60">
                  {guide.comparisonTable.headers.map((hdr, hIdx) => (
                    <th
                      key={hIdx}
                      className="py-3 px-4 font-mono text-xs font-bold text-white uppercase tracking-wider"
                    >
                      {hdr}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/40">
                {guide.comparisonTable.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-surface-2/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-accent text-xs">
                      {row[0]}
                    </td>
                    {row.slice(1).map((cell, cIdx) => (
                      <td key={cIdx} className="py-3.5 px-4 text-brand-secondary">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ Accordion targeting GSC queries */}
        <section className="my-16">
          <div className="mb-8">
            <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-1">
              FREQUENTLY ASKED ARCHITECTURAL QUESTIONS
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Enterprise Technical Answers & Implementation Guidance
            </h2>
          </div>

          <div className="space-y-3">
            {guide.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl glass-panel border border-brand-border/70 overflow-hidden transition-all hover:border-accent/40"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-heading text-base sm:text-lg font-bold text-white">
                      {faq.question}
                    </span>
                    <span className="shrink-0 p-1.5 rounded-full bg-surface-2 text-accent">
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-brand-secondary leading-relaxed font-body border-t border-brand-border/30 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Call to Action: Book 15-Minute Scoping Call */}
        <section className="my-16 p-8 sm:p-12 rounded-3xl glass-panel border border-accent/40 bg-gradient-to-r from-surface-1 via-accent/[0.08] to-surface-1 text-center relative overflow-hidden shadow-[0_0_50px_rgba(183,255,60,0.15)]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block px-3.5 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-4">
              ENTERPRISE ARCHITECTURE CONSULTING
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Need a Production-Hardened AI Telephony or Deterministic Agent Runtime?
            </h2>
            <p className="text-brand-secondary text-sm sm:text-base leading-relaxed mb-8 font-body">
              Eliminate stochastic failures, fragile Zapier workflows, and speech latency bottlenecks. Collaborate directly with Sheharyar Siraj on an end-to-end architecture sprint.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={onOpenInquiry}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-accent text-black font-mono text-xs sm:text-sm font-bold tracking-wider hover:bg-white transition-all shadow-[0_0_25px_rgba(183,255,60,0.35)] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>SCHEDULE 15-MIN TECHNICAL SCOPING CALL</span>
                <ArrowRight size={15} />
              </button>
              <Link
                to="/case-studies/"
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-surface-2 border border-brand-border/80 hover:border-accent text-white font-mono text-xs sm:text-sm font-semibold tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <span>INSPECT PRODUCTION BENCHMARKS</span>
              </Link>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
};
