import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  VolumeX,
  Volume2,
  Bot,
  Mic,
  Workflow,
  Layers,
} from 'lucide-react';
import { CONTACT_INFO } from '../../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onOpenInquiry: () => void;
}

const WordPressIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12zm-8.854 12c0-1.472.37-2.856 1.02-4.066l4.757 13.033A8.995 8.995 0 0 1 3.146 12zm8.854 8.948c-1.127 0-2.188-.236-3.153-.66l3.308-9.61 3.39 9.289c-.035.018-.07.033-.106.049a8.966 8.966 0 0 1-3.439.932zm1.658-13.433c.69-.035 1.315-.108 1.315-.108.625-.072.553-.99-.072-.953 0 0-1.878.18-3.09.18-1.176 0-3.053-.18-3.053-.18-.625-.036-.697.881-.072.953 0 0 .59.073 1.242.108l1.854 5.08-2.612 7.828L5.92 7.515c.688-.035 1.314-.108 1.314-.108.625-.072.553-.99-.072-.953 0 0-1.879.18-3.09.18-.328 0-.715-.015-1.118-.042A8.96 8.96 0 0 1 12 3.052c3.486 0 6.505 1.984 7.973 4.887-.04.004-.08.012-.12.012-.99 0-1.692.862-1.692 1.79 0 .827.48 1.52.99 2.348.406.69.863 1.554.863 2.805 0 1.25-.806 3.658-1.993 6.843l-4.363-12.222zm5.727 7.74c.943-1.87 1.469-3.987 1.469-6.255 0-1.393-.21-2.734-.6-3.998l3.655 10.584c-.815 1.636-2.032 3.033-3.524 4.093l-.999-4.424z" />
  </svg>
);

const SERVICES_DATA = [
  {
    num: '01',
    title: 'Custom WordPress & WooCommerce Systems',
    short: 'WordPress & Woo',
    desc: 'High-performance WordPress foundations connecting custom PHP plugins, WooCommerce APIs, and automated commerce operations.',
    icon: WordPressIcon,
    tags: ['Custom Plugins', 'WooCommerce API', 'PHP 8.2', 'REST Endpoints', 'Speed Tuning'],
  },
  {
    num: '02',
    title: 'AI Agents & Intelligent Customer Systems',
    short: 'AI Agents & RAG',
    desc: 'Context-aware AI assistants that answer business questions, qualify leads, and connect directly with your workflows.',
    icon: Bot,
    tags: ['OpenAI GPT-4o', 'Claude 3.5', 'Gemini 1.5', 'RAG Knowledge', 'Vector Search'],
  },
  {
    num: '03',
    title: 'AI Voice Agents & Telephony',
    short: 'AI Voice Systems',
    desc: 'Inbound and outbound voice systems handling real-time booking, instant lead qualification, and hands-free CRM updates.',
    icon: Mic,
    tags: ['Vapi Voice', 'ElevenLabs', 'Twilio SIP', 'Deepgram STT', 'Call Automation'],
  },
  {
    num: '04',
    title: 'AI Automation & Workflow Systems',
    short: 'n8n Workflows',
    desc: 'Self-hosted n8n and Make integrations synchronizing websites, CRMs, forms, and alerts to eliminate manual work.',
    icon: Workflow,
    tags: ['n8n Self-Hosted', 'Make.com', 'HubSpot API', 'GoHighLevel', 'Webhooks'],
  },
];

const CHAPTERS = [
  { id: 'identity', label: '01 IDENTITY' },
  { id: 'mission', label: '02 ARCHITECTURE' },
  { id: 'capabilities', label: '03 CAPABILITIES' },
  { id: 'engage', label: '04 ENGAGE' },
];

const STEP_LABELS = [
  'Identity',
  'Architecture',
  'WordPress & Woo',
  'AI Agents & RAG',
  'AI Voice Systems',
  'n8n Workflows',
  'System Ready'
];

export const Hero: React.FC<HeroProps> = ({ onOpenInquiry }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Discrete 7-step sequence:
  // 0: Identity
  // 1: Architecture
  // 2: Capabilities (WordPress & Woo)
  // 3: Capabilities (AI Agents & RAG)
  // 4: Capabilities (AI Voice Systems)
  // 5: Capabilities (n8n Workflows)
  // 6: Engage
  const [currentStep, setCurrentStep] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const stepRef = useRef(0);
  const lastTriggerRef = useRef(0);
  const wheelAccumulatorRef = useRef(0);
  const wheelResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep stepRef in sync with currentStep
  useEffect(() => {
    stepRef.current = currentStep;
  }, [currentStep]);

  // Derived chapter and service indices
  const activeChapter = currentStep === 0 ? 0 : currentStep === 1 ? 1 : currentStep <= 5 ? 2 : 3;
  const activeService = currentStep >= 2 && currentStep <= 5 ? currentStep - 2 : 0;
  const progressPercent = Math.round(((currentStep + 1) / 7) * 100);

  const goToStep = (target: number) => {
    const clamped = Math.max(0, Math.min(6, target));
    stepRef.current = clamped;
    setCurrentStep(clamped);
  };

  const goNext = () => {
    if (stepRef.current < 6) {
      goToStep(stepRef.current + 1);
    } else {
      const nextSection = document.getElementById('work') || document.querySelector('section');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
      }
    }
  };

  const goPrev = () => {
    if (stepRef.current > 0) {
      goToStep(stepRef.current - 1);
    }
  };

  const jumpToChapter = (index: number) => {
    let target = 0;
    if (index === 0) target = 0;
    else if (index === 1) target = 1;
    else if (index === 2) target = 2;
    else if (index === 3) target = 6;
    goToStep(target);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  // 1-Scroll = 1-Step Precision Interaction Engine
  // Works flawlessly on laptop trackpad, physical mouse wheel, and mobile touch swipe
  useEffect(() => {
    const isAtTop = () => window.scrollY <= 25;

    const onWheel = (e: WheelEvent) => {
      // If user is scrolled down reading other page sections, let normal scroll occur
      if (!isAtTop()) return;

      const now = Date.now();
      const delta = e.deltaY;

      if (delta > 0) {
        // Scrolling DOWN
        if (stepRef.current < 6) {
          // Trap scroll inside hero steps immediately so native scroll never starts
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();

          // Reset decay timer
          if (wheelResetTimeoutRef.current) {
            clearTimeout(wheelResetTimeoutRef.current);
          }
          wheelResetTimeoutRef.current = setTimeout(() => {
            wheelAccumulatorRef.current = 0;
          }, 280);

          wheelAccumulatorRef.current += delta;

          // Mouse wheel produces ~100 per notch; laptop trackpad produces streams of 2..15
          // Threshold of 40 ensures 1 mouse wheel notch OR a deliberate trackpad stroke advances 1 step
          if (wheelAccumulatorRef.current >= 40 && now - lastTriggerRef.current > 300) {
            lastTriggerRef.current = now;
            wheelAccumulatorRef.current = 0;
            const next = stepRef.current + 1;
            stepRef.current = next;
            setCurrentStep(next);
          }
        }
        // When at step 6 (Engage), scrolling down passes through naturally into the page!
      } else if (delta < 0) {
        // Scrolling UP
        if (stepRef.current > 0) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();

          if (wheelResetTimeoutRef.current) {
            clearTimeout(wheelResetTimeoutRef.current);
          }
          wheelResetTimeoutRef.current = setTimeout(() => {
            wheelAccumulatorRef.current = 0;
          }, 280);

          wheelAccumulatorRef.current += delta;

          if (wheelAccumulatorRef.current <= -40 && now - lastTriggerRef.current > 300) {
            lastTriggerRef.current = now;
            wheelAccumulatorRef.current = 0;
            const prev = stepRef.current - 1;
            stepRef.current = prev;
            setCurrentStep(prev);
          }
        }
      }
    };

    let touchStartY = 0;
    let touchStartX = 0;
    let isTouchActive = false;

    const onTouchStart = (e: TouchEvent) => {
      if (isAtTop() && e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
        isTouchActive = true;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isAtTop() || !isTouchActive || e.touches.length === 0) return;

      const currentY = e.touches[0].clientY;
      const currentX = e.touches[0].clientX;
      const diffY = touchStartY - currentY; // diffY > 0: swipe up / advance down
      const diffX = touchStartX - currentX;

      // Ensure it's primarily vertical gesture
      if (Math.abs(diffY) > Math.abs(diffX)) {
        if (diffY > 0 && stepRef.current < 6) {
          if (e.cancelable) {
            e.preventDefault();
          }
          e.stopPropagation();
          e.stopImmediatePropagation();

          const now = Date.now();
          if (diffY > 32 && now - lastTriggerRef.current > 280) {
            lastTriggerRef.current = now;
            touchStartY = currentY;
            const next = stepRef.current + 1;
            stepRef.current = next;
            setCurrentStep(next);
          }
        } else if (diffY < 0 && stepRef.current > 0) {
          if (e.cancelable) {
            e.preventDefault();
          }
          e.stopPropagation();
          e.stopImmediatePropagation();

          const now = Date.now();
          if (diffY < -32 && now - lastTriggerRef.current > 280) {
            lastTriggerRef.current = now;
            touchStartY = currentY;
            const prev = stepRef.current - 1;
            stepRef.current = prev;
            setCurrentStep(prev);
          }
        }
        // When at step 6 and swiping up, native scroll occurs freely!
      }
    };

    const onTouchEnd = () => {
      isTouchActive = false;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!isAtTop()) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (stepRef.current < 6) {
          e.preventDefault();
          const next = stepRef.current + 1;
          stepRef.current = next;
          setCurrentStep(next);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (stepRef.current > 0) {
          e.preventDefault();
          const prev = stepRef.current - 1;
          stepRef.current = prev;
          setCurrentStep(prev);
        }
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false, capture: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true, capture: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false, capture: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true, capture: true });
    window.addEventListener('keydown', onKeyDown, { capture: true });

    return () => {
      window.removeEventListener('wheel', onWheel, { capture: true });
      window.removeEventListener('touchstart', onTouchStart, { capture: true });
      window.removeEventListener('touchmove', onTouchMove, { capture: true });
      window.removeEventListener('touchend', onTouchEnd, { capture: true });
      window.removeEventListener('keydown', onKeyDown, { capture: true });
      if (wheelResetTimeoutRef.current) {
        clearTimeout(wheelResetTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="hero"
      className="relative w-full bg-[#080808] text-white"
    >
      {/* 
        Fully responsive viewport: 
        Uses h-[100dvh] min-h-[100dvh] max-h-[100dvh] with strict containment so nothing ever overflows 
        regardless of screen height (mobile browsers with dynamic address bars, laptops, or large displays).
      */}
      <div className="relative w-full h-[100dvh] min-h-[100dvh] max-h-[100dvh] overflow-hidden bg-[#080808] flex flex-col justify-between select-none">
        
        {/* Layer 1: Dark base */}
        <div className="absolute inset-0 bg-[#080808]" aria-hidden="true" />
        <div
          className="absolute -top-20 right-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-accent/8 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none"
          aria-hidden="true"
        />

        {/* Layer 2: Hero Video - On mobile perfectly framed on developer with cinematic gradient, on desktop pushed right */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <video
            ref={videoRef}
            src="/video/Developer_working.webm"
            autoPlay
            muted={isMuted}
            playsInline
            loop
            preload="metadata"
            poster="/assets/images/hero-poster.webp"
            width={1920}
            height={1080}
            className="w-full h-full object-cover object-[52%_10%] sm:object-[68%_center] lg:object-[78%_center] opacity-85 sm:opacity-90 transition-all duration-700"
          />

          {/* Desktop Left Mask: covers left side cleanly so text is 100% legible while developer shines on right */}
          <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/95 via-38% lg:via-42% to-transparent pointer-events-none" />
          <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent via-75% to-[#080808]/70 pointer-events-none" />

          {/* Mobile Masks: Highlights developer in upper section, ensures 100% text contrast in lower section */}
          <div className="sm:hidden absolute inset-0 bg-gradient-to-b from-[#080808]/85 via-transparent via-25% to-transparent pointer-events-none" />
          <div className="sm:hidden absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/95 via-55% to-transparent pointer-events-none" />
        </div>

        {/* TOP HUD BAR: Responsive spacing below navbar */}
        <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-20 sm:pt-24 flex items-center justify-between pointer-events-auto">
          {/* Chapter Chips: Compact on mobile to never crowd mute button, full labels on tablet/desktop */}
          <nav aria-label="Hero timeline" className="flex items-center gap-1 sm:gap-2">
            {CHAPTERS.map((ch, idx) => {
              const isActive = activeChapter === idx;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => jumpToChapter(idx)}
                  className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-mono tracking-wider transition-all ${
                    isActive
                      ? 'bg-accent text-black font-bold shadow-[0_0_10px_rgba(183,255,60,0.3)]'
                      : 'bg-white/5 text-brand-secondary hover:text-white border border-white/10'
                  }`}
                >
                  <span className="hidden sm:inline">{ch.label}</span>
                  <span className="sm:hidden">
                    {isActive ? ch.label.replace(/^\d+\s*/, '') : `0${idx + 1}`}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Sound control */}
          <button
            type="button"
            onClick={toggleMute}
            className="p-1 sm:p-1.5 rounded-full bg-surface-2/80 border border-white/10 hover:border-accent/40 text-white/70 hover:text-white transition-all flex items-center gap-1 text-[10px] font-mono"
            title={isMuted ? 'Unmute video' : 'Mute video'}
            aria-label="Toggle sound"
          >
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} className="text-accent" />}
          </button>
        </div>

        {/* LAYER 3: RESPONSIVE CONTENT COLUMN */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 flex-1 flex items-center py-2">
          <div className="w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[480px]">
            <AnimatePresence mode="wait">

              {/* -------------------------------------------------------- */}
              {/* CHAPTER 01: IDENTITY                                     */}
              {/* -------------------------------------------------------- */}
              {activeChapter === 0 && (
                <motion.div
                  key="chapter-1"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="space-y-2.5 sm:space-y-3"
                >
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-2 border border-brand-border text-accent text-[9px] sm:text-[10px] font-mono tracking-wider uppercase">
                    <Sparkles size={11} className="text-accent" />
                    <span>WORDPRESS × AI × AUTOMATION</span>
                  </div>

                  <h1 
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-black tracking-tight text-white leading-[1.05]"
                    aria-label="Sheharyar Siraj — AI Automation Architect & WordPress Systems Engineer"
                  >
                    SHEHARYAR{' '}
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-accent">
                      SIRAJ
                    </span>
                  </h1>

                  <div className="text-[11px] sm:text-xs font-mono text-accent tracking-wider font-semibold">
                    {CONTACT_INFO.title}
                  </div>

                  <p className="text-xs sm:text-sm text-brand-secondary leading-relaxed">
                    Connecting high-performance web systems with autonomous AI agents, voice pipelines, and automated business operations.
                  </p>

                  <div className="inline-flex items-center gap-1.5 text-[9.5px] sm:text-[11px] font-mono text-white/90 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                    <span className="text-accent">✦</span>
                    <span>5+ Years <span className="hidden sm:inline">Experience </span>• 1,200+ Projects<span className="hidden sm:inline"> Worldwide</span></span>
                  </div>

                  <div className="pt-1 flex items-center gap-2 sm:gap-2.5 flex-wrap">
                    <button
                      type="button"
                      onClick={onOpenInquiry}
                      className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold font-mono tracking-wider bg-accent text-black hover:bg-white transition-all shadow-[0_0_15px_rgba(183,255,60,0.3)] flex items-center gap-1.5 active:scale-95"
                    >
                      <span>BUILD MY AI SYSTEM</span>
                      <ArrowRight size={12} />
                    </button>

                    <button
                      type="button"
                      onClick={() => jumpToChapter(1)}
                      className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-semibold font-mono tracking-wider bg-surface-1 text-white border border-brand-border hover:border-accent/40 transition-all flex items-center gap-1"
                    >
                      <span>EXPLORE</span>
                      <ChevronDown size={12} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* -------------------------------------------------------- */}
              {/* CHAPTER 02: ARCHITECTURE                                 */}
              {/* -------------------------------------------------------- */}
              {activeChapter === 1 && (
                <motion.div
                  key="chapter-2"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="space-y-2 sm:space-y-3"
                >
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-2 border border-brand-border text-accent text-[9px] sm:text-[10px] font-mono tracking-wider uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                    <span>02 // ARCHITECTURE & VISION</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-black tracking-tight text-white leading-tight">
                    I BUILD AI-POWERED
                    <br />
                    DIGITAL SYSTEMS
                    <br />
                    THAT CONNECT YOUR WEBSITE
                    <br />
                    <span className="text-accent text-glow">TO YOUR BUSINESS.</span>
                  </h2>

                  <p className="text-[11px] sm:text-xs md:text-sm text-brand-secondary leading-relaxed">
                    Turning digital traffic into automated customer journeys through custom WordPress backbones, autonomous AI agents, and deep n8n workflow integrations.
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[9px] sm:text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-surface-2 border border-white/10 text-white">
                      01 WordPress & Woo
                    </span>
                    <span className="px-2 py-0.5 rounded bg-accent/10 border border-accent/30 text-accent font-semibold">
                      02 Autonomous AI Agents
                    </span>
                    <span className="px-2 py-0.5 rounded bg-surface-2 border border-white/10 text-white">
                      03 n8n Workflow Ops
                    </span>
                  </div>
                </motion.div>
              )}

              {/* -------------------------------------------------------- */}
              {/* CHAPTER 03: CAPABILITIES                                 */}
              {/* -------------------------------------------------------- */}
              {activeChapter === 2 && (
                <motion.div
                  key="chapter-3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="space-y-2 sm:space-y-2.5"
                >
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-2 border border-brand-border text-accent text-[9px] sm:text-[10px] font-mono tracking-wider uppercase">
                    <Layers size={11} className="text-accent" />
                    <span>03 // CORE CAPABILITIES</span>
                  </div>

                  {/* Pills */}
                  <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
                    {SERVICES_DATA.map((svc, sIdx) => {
                      const isSel = activeService === sIdx;
                      return (
                        <button
                          key={svc.num}
                          type="button"
                          onClick={() => {
                            const target = 2 + sIdx;
                            stepRef.current = target;
                            setCurrentStep(target);
                          }}
                          className={`px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono tracking-wider transition-all whitespace-nowrap ${
                            isSel
                              ? 'bg-accent text-black font-bold shadow-[0_0_8px_rgba(183,255,60,0.3)]'
                              : 'bg-surface-2 text-brand-secondary hover:text-white border border-white/10'
                          }`}
                        >
                          {svc.short}
                        </button>
                      );
                    })}
                  </div>

                  {/* Compact Card */}
                  {(() => {
                    const currentSvc = SERVICES_DATA[activeService];
                    const IconComponent = currentSvc.icon;
                    return (
                      <div className="p-3 sm:p-4 rounded-xl bg-surface-1/95 backdrop-blur-md border border-white/15 shadow-xl relative overflow-hidden">
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <h3 className="text-xs sm:text-sm md:text-base font-heading font-bold text-white leading-tight">
                            {currentSvc.title}
                          </h3>
                          <div className="w-6 h-6 rounded bg-surface-2 border border-white/10 flex items-center justify-center text-accent flex-shrink-0">
                            <IconComponent />
                          </div>
                        </div>

                        <p className="text-[10.5px] sm:text-xs text-brand-secondary leading-relaxed mb-2 sm:mb-2.5">
                          {currentSvc.desc}
                        </p>

                        <div className="flex flex-wrap gap-1">
                          {currentSvc.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="px-1.5 py-0.5 rounded text-[8.5px] sm:text-[9px] font-mono bg-white/5 border border-white/10 text-white/80"
                            >
                              {tag}
                            </span>
                          ))}
                          {currentSvc.tags.length > 4 && (
                            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/5 border border-white/10 text-white/80">
                              {currentSvc.tags[4]}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              )}

              {/* -------------------------------------------------------- */}
              {/* CHAPTER 04: ENGAGE                                       */}
              {/* -------------------------------------------------------- */}
              {activeChapter === 3 && (
                <motion.div
                  key="chapter-4"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="space-y-2.5 sm:space-y-3"
                >
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/40 text-accent text-[9px] sm:text-[10px] font-mono tracking-wider uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span>04 // SYSTEM READY TO SCALE</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-black tracking-tight text-white leading-tight">
                    READY TO CONNECT
                    <br />
                    YOUR DIGITAL
                    <br />
                    <span className="text-accent text-glow">INFRASTRUCTURE?</span>
                  </h2>

                  <p className="text-[11px] sm:text-xs md:text-sm text-brand-secondary leading-relaxed">
                    Direct engineer access. High-speed delivery with production-grade reliability across custom WordPress and autonomous AI systems.
                  </p>

                  <div className="pt-1 flex items-center gap-2 sm:gap-2.5 flex-wrap">
                    <button
                      type="button"
                      onClick={onOpenInquiry}
                      className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold font-mono tracking-wider bg-accent text-black hover:bg-white transition-all shadow-[0_0_20px_rgba(183,255,60,0.35)] flex items-center gap-1.5 active:scale-95"
                    >
                      <span>BUILD MY AI SYSTEM</span>
                      <ArrowRight size={12} />
                    </button>

                    <a
                      href="#work"
                      onClick={() => {
                        stepRef.current = 6;
                        setCurrentStep(6);
                      }}
                      className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-semibold font-mono tracking-wider bg-surface-1 text-white border border-brand-border hover:border-accent/40 transition-all flex items-center gap-1"
                    >
                      <span>EXPLORE WORK</span>
                      <ChevronDown size={12} />
                    </a>
                  </div>

                  <div className="pt-0.5 flex flex-wrap items-center gap-2 text-[9.5px] sm:text-[11px] font-mono text-brand-secondary">
                    <span className="text-accent font-bold">1,200+ Delivered</span>
                    <span className="text-white/20">•</span>
                    <a
                      href={CONTACT_INFO.upwork}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#14a800] transition-colors flex items-center gap-0.5 underline decoration-brand-border hover:decoration-[#14a800] underline-offset-4"
                    >
                      <span>Upwork Verified</span>
                      <ArrowUpRight size={10} />
                    </a>
                    <span className="text-white/20">•</span>
                    <span className="text-brand-muted">5+ Years Experience</span>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

        {/* BOTTOM HUD FOOTER: Clean, interactive progress controls */}
        <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-8 pb-2.5 sm:pb-3.5 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono text-brand-muted tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>1 SCROLL / SWIPE = 1 STEP</span>
            </div>

            {/* Step Navigation Arrows */}
            <div className="flex items-center gap-1 ml-1 sm:ml-2">
              <button
                type="button"
                onClick={goPrev}
                disabled={currentStep === 0}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-surface-2/90 border border-white/10 hover:border-accent/40 text-brand-secondary hover:text-white disabled:opacity-25 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer"
                aria-label="Previous Hero Step"
                title="Previous step"
              >
                <ChevronDown size={12} className="rotate-180" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-surface-2/90 border border-white/10 hover:border-accent/40 text-accent hover:text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Next Hero Step"
                title={currentStep === 6 ? 'Explore Site' : 'Next step'}
              >
                <ChevronDown size={12} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-mono">
            <span className="text-brand-muted hidden sm:inline">
              {STEP_LABELS[currentStep]}
            </span>
            <span className="text-white/20 hidden sm:inline">•</span>
            <div className="text-brand-secondary">
              <span>STEP </span>
              <span className="text-accent font-bold">
                0{currentStep + 1} / 07
              </span>
            </div>
          </div>
        </div>

        {/* Interactive 7-Segment Bottom Progress Bar */}
        <div
          role="progressbar"
          aria-valuenow={currentStep + 1}
          aria-valuemin={1}
          aria-valuemax={7}
          aria-label="Hero Showcase Steps"
          className="relative z-40 w-full bg-white/15 h-1 sm:h-1.5 flex items-stretch pointer-events-auto"
        >
          {[0, 1, 2, 3, 4, 5, 6].map((idx) => {
            const isCompletedOrActive = idx <= currentStep;
            const isCurrent = idx === currentStep;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => goToStep(idx)}
                className="flex-1 h-full relative group cursor-pointer border-r border-black/40 last:border-r-0 transition-all p-0"
                aria-label={`Jump to step ${idx + 1}: ${STEP_LABELS[idx]}`}
                title={`Step 0${idx + 1}: ${STEP_LABELS[idx]}`}
              >
                <div
                  className={`w-full h-full transition-all duration-200 ${
                    isCurrent
                      ? 'bg-accent shadow-[0_0_12px_#B7FF3C]'
                      : isCompletedOrActive
                      ? 'bg-accent/80'
                      : 'bg-white/10 group-hover:bg-white/30'
                  }`}
                />
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Hero;
