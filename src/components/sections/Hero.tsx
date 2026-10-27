import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ChevronDown,
  VolumeX,
  Volume2,
  Mic,
  Workflow,
  Layers,
  Zap,
  Globe,
  Bot
} from 'lucide-react';
import { CONTACT_INFO } from '../../data/portfolioData';

interface HeroProps {
  onOpenInquiry: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenInquiry }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // ---------------------------------------------------------------------------
  // NATURAL SCROLL-DRIVEN MOTION PIPELINE (Framer Motion)
  // Zero scroll-jacking: Native browser physics, 100% GPU-accelerated
  // ---------------------------------------------------------------------------
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Stage 1: Initial Centered Hero Heading & Actions dissolve upward smoothly
  const heroOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.28], [1, 0.96]);
  const heroY = useTransform(scrollYProgress, [0, 0.28], [0, -25]);
  const heroPointerEvents = useTransform(scrollYProgress, (v) => (v > 0.25 ? 'none' : 'auto'));

  // Stage 2: Progressive Reveal of High-Value Live Metrics Cards
  const cardsOpacity = useTransform(scrollYProgress, [0.32, 0.48, 0.88, 0.98], [0, 1, 1, 0]);
  const cardsScale = useTransform(scrollYProgress, [0.32, 0.48], [0.96, 1]);
  const cardsY = useTransform(scrollYProgress, [0.32, 0.48], [25, 0]);
  const cardsPointerEvents = useTransform(scrollYProgress, (v) => (v >= 0.32 && v <= 0.95 ? 'auto' : 'none'));

  // Background atmospheric fading as user scrolls into subsequent sections
  const bgOpacity = useTransform(scrollYProgress, [0, 0.85, 1.0], [1, 0.8, 0]);

  // Video autoplay & cross-browser policy enforcement
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const attemptPlay = () => {
      if (video && video.paused) {
        const promise = video.play();
        if (promise !== undefined) {
          promise.catch(() => {
            // Autoplay waiting for user interaction
          });
        }
      }
    };

    attemptPlay();
    video.addEventListener('loadeddata', attemptPlay);
    video.addEventListener('canplay', attemptPlay);

    const onUserInteraction = () => {
      attemptPlay();
      window.removeEventListener('click', onUserInteraction);
      window.removeEventListener('touchstart', onUserInteraction);
    };

    window.addEventListener('click', onUserInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', onUserInteraction, { once: true, passive: true });

    return () => {
      video.removeEventListener('loadeddata', attemptPlay);
      video.removeEventListener('canplay', attemptPlay);
      window.removeEventListener('click', onUserInteraction);
      window.removeEventListener('touchstart', onUserInteraction);
    };
  }, []);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-[180vh] sm:h-[190vh] text-white"
      aria-label="Sheharyar Siraj — Enterprise Systems Architect & Autonomous AI Specialist"
    >
      {/* Sticky 100dvh Viewport Stage */}
      <div className="sticky top-0 w-full h-[100dvh] min-h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col justify-between select-none">
        
        {/* ===================================================================== */}
        {/* BACKGROUND LAYER: FIXED CINEMATIC MEDIA WITH SMOOTH OVERLAY           */}
        {/* ===================================================================== */}
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden select-none will-change-[opacity]"
          aria-hidden="true"
        >
          <video
            ref={videoRef}
            autoPlay
            muted={isMuted}
            playsInline
            loop
            preload="auto"
            poster="/assets/images/hero-developer-poster.webp"
            width={1920}
            height={1080}
            className="w-full h-full object-cover object-center opacity-80 sm:opacity-85 transition-opacity duration-1000"
          >
            <source src="/video/Developer_working.webm" type="video/webm" />
          </video>

          {/* Dark glassmorphic gradient and vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/95 backdrop-blur-[1px] pointer-events-none" />

          {/* Ambient subtle neon glows */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-[350px] h-[250px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />
        </motion.div>

        {/* ===================================================================== */}
        {/* TOP STATUS CONTROLS (Bounded, height-safe)                            */}
        {/* ===================================================================== */}
        <header className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-16 sm:pt-20 pb-1 sm:pb-2 flex items-center justify-between pointer-events-auto shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#B7FF3C]" />
            <span className="text-[9px] sm:text-[11px] font-mono text-brand-muted tracking-widest uppercase truncate max-w-[240px] sm:max-w-none">
              SYSTEM OPERATIONAL • SUB-600MS LATENCY SLA
            </span>
          </div>

          {/* Audio toggle button */}
          <button
            type="button"
            onClick={toggleMute}
            className="p-1 sm:p-1.5 rounded-full bg-surface-2/80 border border-brand-border/80 hover:border-accent/40 text-white/80 hover:text-white transition-all flex items-center gap-1.5 text-[10px] font-mono backdrop-blur-md cursor-pointer shrink-0"
            title={isMuted ? 'Unmute video audio' : 'Mute video audio'}
            aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
          >
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} className="text-accent animate-bounce" />}
            <span className="hidden sm:inline text-[9px] font-mono tracking-wider">
              {isMuted ? 'SOUND OFF' : 'AUDIO ACTIVE'}
            </span>
          </button>
        </header>

        {/* ===================================================================== */}
        {/* MIDDLE DYNAMIC STAGE CONTAINER (Flex-1 bounded: Zero vertical overlap)*/}
        {/* ===================================================================== */}
        <div className="relative z-20 flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-0">

          {/* STAGE 1: CENTERED HERO CONTENT ALIGNMENT & TYPOGRAPHY */}
          <motion.div
            style={{
              opacity: heroOpacity,
              scale: heroScale,
              y: heroY,
              pointerEvents: heroPointerEvents as any
            }}
            className="w-full flex flex-col items-center justify-center text-center will-change-[transform,opacity] py-1"
          >
            {/* Animated Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-surface-2/90 border border-accent/30 text-accent font-mono text-[9px] sm:text-[11px] font-semibold tracking-wider uppercase mb-2 sm:mb-3 lg:mb-4 shadow-[0_0_15px_rgba(183,255,60,0.15)] backdrop-blur-md shrink-0"
            >
              <Sparkles size={12} className="text-accent animate-spin-slow shrink-0" />
              <span className="truncate">Enterprise Systems Architect & Autonomous AI Specialist</span>
            </motion.div>

            {/* Main Headline with High-Impact Gradient Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.08] sm:leading-[1.04] mb-2 sm:mb-3 lg:mb-4 max-w-4xl text-balance"
            >
              SUB-SECOND WEB SYSTEMS.{' '}
              <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-accent text-glow">
                AUTONOMOUS AI VOICE.
              </span>
            </motion.h1>

            {/* Subtitle Value Proposition */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs sm:text-sm md:text-base text-brand-secondary font-body max-w-2xl leading-relaxed mb-3 sm:mb-5 lg:mb-6 text-balance"
            >
              I architect high-converting digital ecosystems where <strong className="text-white font-medium">WordPress VIP</strong> delivers sub-second foundations, <strong className="text-accent font-medium">Autonomous AI Voice</strong> handles real-time qualification, and <strong className="text-white font-medium">Rapid Vibe Coding</strong> accelerates deployment.
            </motion.p>

            {/* Primary Actions: Centered Dual Button Array */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-row items-center justify-center gap-2.5 sm:gap-4 w-full sm:w-auto mb-3 sm:mb-4 lg:mb-5"
            >
              <button
                type="button"
                onClick={() => scrollToSection('trust')}
                className="px-4 py-2 sm:px-6 sm:py-3 rounded-full text-[11px] sm:text-xs font-bold font-mono tracking-wider bg-accent text-black hover:bg-white transition-all shadow-[0_0_20px_rgba(183,255,60,0.3)] flex items-center justify-center gap-1.5 group cursor-pointer active:scale-95"
              >
                <span>EXPLORE ARCHITECTURE</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onOpenInquiry}
                className="px-4 py-2 sm:px-6 sm:py-3 rounded-full text-[11px] sm:text-xs font-bold font-mono tracking-wider bg-surface-1/90 text-white border border-brand-border/80 hover:border-accent/50 hover:bg-surface-2 transition-all backdrop-blur-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-lg group"
              >
                <Bot size={14} className="text-accent group-hover:scale-110 transition-transform" />
                <span>TALK TO AI ASSISTANT</span>
              </button>
            </motion.div>

            {/* Proof Badges Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[9px] sm:text-[11px] font-mono text-brand-secondary"
            >
              <span className="flex items-center gap-1 text-white/90">
                <span className="text-accent font-bold">✦</span>
                <span>5+ Years Remote</span>
              </span>
              <span className="text-white/20 hidden sm:inline">•</span>
              <span className="flex items-center gap-1 text-white/90">
                <span className="text-accent font-bold">1,200+</span>
                <span>Deployments</span>
              </span>
              <span className="text-white/20 hidden sm:inline">•</span>
              <a
                href={CONTACT_INFO.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-accent hover:underline decoration-accent underline-offset-4"
              >
                <span>100% Upwork Success</span>
              </a>
            </motion.div>
          </motion.div>

          {/* STAGE 2: PROGRESSIVE REVEAL LAYER (High-Value Cards & Metrics) */}
          <motion.div
            style={{
              opacity: cardsOpacity,
              scale: cardsScale,
              y: cardsY,
              pointerEvents: cardsPointerEvents as any
            }}
            className="absolute inset-x-0 w-full flex flex-col items-center justify-center will-change-[transform,opacity] py-1"
          >
            {/* Reveal Header */}
            <div className="text-center mb-2.5 sm:mb-4 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/30 text-accent font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mb-1">
                <Zap size={11} className="text-accent" />
                <span>VERIFIED PRODUCTION BENCHMARKS</span>
              </div>
              <h2 className="font-heading text-lg sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Engineered for Speed. <span className="text-accent">Automated for Scale.</span>
              </h2>
            </div>

            {/* 4 Apple-Style Glassmorphic Live Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3.5 w-full">
              
              {/* Card 1: Sub-500ms TTFB */}
              <div className="p-2.5 sm:p-3.5 rounded-xl bg-surface-1/90 border border-brand-border/80 hover:border-accent/40 backdrop-blur-xl transition-all shadow-xl flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-mono tracking-wider text-accent uppercase font-semibold">
                      PERFORMANCE
                    </span>
                    <div className="w-6 h-6 rounded-md bg-surface-2 border border-brand-border/60 flex items-center justify-center text-sky-400">
                      <Layers size={13} />
                    </div>
                  </div>
                  <div className="font-heading text-lg sm:text-2xl font-black text-white group-hover:text-accent transition-colors">
                    &lt; 450ms
                  </div>
                  <h3 className="font-heading text-[11px] sm:text-xs font-bold text-white mb-0.5">
                    Sub-500ms TTFB
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-brand-secondary font-body leading-snug line-clamp-2 sm:line-clamp-none">
                    PHP 8.2 VIP backbones with Redis caching & zero bloat.
                  </p>
                </div>
                <div className="mt-2 pt-1.5 border-t border-brand-border/40 flex items-center justify-between text-[9px] font-mono text-brand-muted">
                  <span>Core Web Vitals</span>
                  <span className="text-emerald-400 font-bold">99+ Green</span>
                </div>
              </div>

              {/* Card 2: 1,200+ Global Deployments */}
              <div className="p-2.5 sm:p-3.5 rounded-xl bg-surface-1/90 border border-brand-border/80 hover:border-accent/40 backdrop-blur-xl transition-all shadow-xl flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-mono tracking-wider text-accent uppercase font-semibold">
                      EXPERIENCE
                    </span>
                    <div className="w-6 h-6 rounded-md bg-surface-2 border border-brand-border/60 flex items-center justify-center text-accent">
                      <Globe size={13} />
                    </div>
                  </div>
                  <div className="font-heading text-lg sm:text-2xl font-black text-white group-hover:text-accent transition-colors">
                    1,200+
                  </div>
                  <h3 className="font-heading text-[11px] sm:text-xs font-bold text-white mb-0.5">
                    Global Deployments
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-brand-secondary font-body leading-snug line-clamp-2 sm:line-clamp-none">
                    Production systems across USA, UK, UAE, and Europe.
                  </p>
                </div>
                <div className="mt-2 pt-1.5 border-t border-brand-border/40 flex items-center justify-between text-[9px] font-mono text-brand-muted">
                  <span>Rating</span>
                  <span className="text-accent font-bold">5.0 ★ Top Rated</span>
                </div>
              </div>

              {/* Card 3: Sub-600ms AI Voice Telephony */}
              <div className="p-2.5 sm:p-3.5 rounded-xl bg-surface-1/90 border border-brand-border/80 hover:border-accent/40 backdrop-blur-xl transition-all shadow-xl flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-mono tracking-wider text-accent uppercase font-semibold">
                      TELEPHONY
                    </span>
                    <div className="w-6 h-6 rounded-md bg-surface-2 border border-brand-border/60 flex items-center justify-center text-purple-400">
                      <Mic size={13} />
                    </div>
                  </div>
                  <div className="font-heading text-lg sm:text-2xl font-black text-white group-hover:text-accent transition-colors">
                    520ms
                  </div>
                  <h3 className="font-heading text-[11px] sm:text-xs font-bold text-white mb-0.5">
                    24/7 Voice Telephony
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-brand-secondary font-body leading-snug line-clamp-2 sm:line-clamp-none">
                    Twilio SIP with Vapi full-duplex WebSockets & Cartesia TTS.
                  </p>
                </div>
                <div className="mt-2 pt-1.5 border-t border-brand-border/40 flex items-center justify-between text-[9px] font-mono text-brand-muted">
                  <span>Turn-Taking SLA</span>
                  <span className="text-purple-400 font-bold">Sub-600ms</span>
                </div>
              </div>

              {/* Card 4: GDPR-Ready Enterprise Automation */}
              <div className="p-2.5 sm:p-3.5 rounded-xl bg-surface-1/90 border border-brand-border/80 hover:border-accent/40 backdrop-blur-xl transition-all shadow-xl flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-mono tracking-wider text-accent uppercase font-semibold">
                      AUTOMATION
                    </span>
                    <div className="w-6 h-6 rounded-md bg-surface-2 border border-brand-border/60 flex items-center justify-center text-amber-400">
                      <Workflow size={13} />
                    </div>
                  </div>
                  <div className="font-heading text-lg sm:text-2xl font-black text-white group-hover:text-accent transition-colors">
                    100% Own
                  </div>
                  <h3 className="font-heading text-[11px] sm:text-xs font-bold text-white mb-0.5">
                    GDPR-Ready Ops
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-brand-secondary font-body leading-snug line-clamp-2 sm:line-clamp-none">
                    Self-hosted n8n clusters syncing CRM with zero Zapier tax.
                  </p>
                </div>
                <div className="mt-2 pt-1.5 border-t border-brand-border/40 flex items-center justify-between text-[9px] font-mono text-brand-muted">
                  <span>Sovereignty</span>
                  <span className="text-amber-400 font-bold">Zero Leakage</span>
                </div>
              </div>

            </div>

            {/* Quick Action in Revealed Stage */}
            <div className="mt-2.5 sm:mt-4 flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={onOpenInquiry}
                className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-mono font-bold bg-accent text-black hover:bg-white transition-all shadow-[0_0_20px_rgba(183,255,60,0.3)] flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span>INITIATE PROJECT SCOPING</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </motion.div>

        </div>

        {/* ===================================================================== */}
        {/* BOTTOM SCROLL-DOWN HINT INDICATOR (Bounded, height-safe)              */}
        {/* ===================================================================== */}
        <footer className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-8 pb-3 sm:pb-4 flex items-center justify-between pointer-events-auto shrink-0">
          <button
            type="button"
            onClick={() => scrollToSection('trust')}
            className="flex items-center gap-2 text-[9px] sm:text-[11px] font-mono text-brand-muted hover:text-accent transition-colors cursor-pointer group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            <span>SCROLL TO EXPLORE ARCHITECTURE</span>
            <ChevronDown size={13} className="group-hover:translate-y-0.5 transition-transform" />
          </button>

          <div className="text-[9px] sm:text-[11px] font-mono text-brand-muted">
            <span>EST. 2021 • </span>
            <span className="text-accent">SHEHARYAR SIRAJ</span>
          </div>
        </footer>

      </div>
    </section>
  );
};

export default Hero;
