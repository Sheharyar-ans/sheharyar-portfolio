import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
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
  Bot,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { CONTACT_INFO } from '../../data/portfolioData';

interface HeroProps {
  onOpenInquiry: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenInquiry }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // ---------------------------------------------------------------------------
  // 1. SILKY-SMOOTH SPRING-DRIVEN TIMELINE (Zero Jitter, Organic Momentum)
  // ---------------------------------------------------------------------------
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Spring smoothing for buttery, non-stuttering 60fps animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 22,
    restDelta: 0.001
  });

  // ---------------------------------------------------------------------------
  // 2. 3D VIDEO ZOOM & CINEMATIC DEPTH CAMERA
  // ---------------------------------------------------------------------------
  // Smoothly zoom the background video in 3D as user scrolls (1.0 -> 1.25 scale)
  const videoScale = useTransform(smoothProgress, [0, 0.45, 1.0], [1.0, 1.15, 1.25]);
  const videoY = useTransform(smoothProgress, [0, 1.0], [0, 40]);
  const videoOpacity = useTransform(smoothProgress, [0, 0.85, 1.0], [0.85, 0.75, 0]);
  const vignetteDepth = useTransform(smoothProgress, [0, 0.45, 1.0], [0.65, 0.8, 0.95]);
  const neonScale = useTransform(smoothProgress, [0, 1.0], [1.0, 1.35]);

  // ---------------------------------------------------------------------------
  // 3. STAGE 1: 3D SPATIAL DISSOLVE
  // (Translates on Z-axis into depth, tilts forward, and lifts upward)
  // ---------------------------------------------------------------------------
  const heroOpacity = useTransform(smoothProgress, [0, 0.28], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.28], [1.0, 0.91]);
  const heroY = useTransform(smoothProgress, [0, 0.28], [0, -55]);
  const heroZ = useTransform(smoothProgress, [0, 0.28], [0, -140]);
  const heroRotateX = useTransform(smoothProgress, [0, 0.28], [0, 12]);
  const heroPointerEvents = useTransform(smoothProgress, (v) => (v > 0.25 ? 'none' : 'auto'));

  // ---------------------------------------------------------------------------
  // 4. STAGE 2: 3D HOLOGRAPHIC SPATIAL HUD CARDS
  // (Enters from forward depth plane, tilts into level alignment)
  // ---------------------------------------------------------------------------
  const cardsOpacity = useTransform(smoothProgress, [0.28, 0.44, 0.86, 0.98], [0, 1, 1, 0]);
  const cardsScale = useTransform(smoothProgress, [0.28, 0.44], [0.91, 1.0]);
  const cardsY = useTransform(smoothProgress, [0.28, 0.44], [45, 0]);
  const cardsZ = useTransform(smoothProgress, [0.28, 0.44], [-110, 0]);
  const cardsRotateX = useTransform(smoothProgress, [0.28, 0.44], [-10, 0]);
  const cardsPointerEvents = useTransform(smoothProgress, (v) => (v >= 0.28 && v <= 0.94 ? 'auto' : 'none'));

  // ---------------------------------------------------------------------------
  // 5. INTERACTIVE 3D MOUSE PARALLAX (Desktop & Laptop)
  // ---------------------------------------------------------------------------
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 60, damping: 25 });

  const tiltRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [3.5, -3.5]);
  const tiltRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-3.5, 3.5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only apply on non-touch devices with width >= 1024
    if (window.innerWidth < 1024) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

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
            // Autoplay waiting for interaction
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

  // Mobile horizontal scroll sync for indicator dots
  const handleCardsScroll = () => {
    const container = cardsContainerRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.clientWidth * 0.8;
    const newIdx = Math.min(3, Math.max(0, Math.round(scrollLeft / cardWidth)));
    setActiveCardIndex(newIdx);
  };

  const scrollCardIntoView = (index: number) => {
    const container = cardsContainerRef.current;
    if (!container) return;
    const card = container.children[index] as HTMLElement;
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      setActiveCardIndex(index);
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[180vh] sm:h-[190vh] text-white overflow-visible"
      aria-label="Sheharyar Siraj — Enterprise Systems Architect & Autonomous AI Specialist"
    >
      {/* Sticky 100dvh Viewport Stage */}
      <div className="sticky top-0 w-full h-[100dvh] min-h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col justify-between select-none">
        
        {/* ===================================================================== */}
        {/* 1. 3D CINEMATIC VIDEO BACKGROUND LAYER (Zoom In/Out on Scroll)        */}
        {/* ===================================================================== */}
        <motion.div
          style={{ opacity: videoOpacity }}
          className="absolute inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden select-none will-change-[transform,opacity]"
          aria-hidden="true"
        >
          {/* Zooming Video Element */}
          <motion.div
            style={{
              scale: videoScale,
              y: videoY
            }}
            className="w-full h-full will-change-transform"
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
          </motion.div>

          {/* Dynamic 3D Vignette Overlay that deepens with zoom */}
          <motion.div
            style={{ opacity: vignetteDepth }}
            className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black/95 backdrop-blur-[1px] pointer-events-none"
          />

          {/* 3D Holographic Perspective Ambient Neon Orbs */}
          <motion.div
            style={{ scale: neonScale }}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-accent/6 rounded-full blur-[140px] pointer-events-none will-change-transform"
          />
          <motion.div
            style={{ scale: neonScale }}
            className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-sky-500/6 rounded-full blur-[130px] pointer-events-none will-change-transform"
          />

          {/* Subtle Cyber Grid Texture */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none" />
        </motion.div>

        {/* ===================================================================== */}
        {/* 2. TOP STATUS CONTROLS (Bounded, Mobile-Spaced)                       */}
        {/* ===================================================================== */}
        <header className="relative z-30 w-full max-w-7xl mx-auto px-5 sm:px-8 pt-16 sm:pt-20 pb-1 sm:pb-2 flex items-center justify-between pointer-events-auto shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#B7FF3C] shrink-0" />
            <span className="text-[10px] sm:text-xs font-mono text-brand-muted tracking-wider sm:tracking-widest uppercase truncate max-w-[220px] xs:max-w-none">
              SYSTEM OPERATIONAL • SUB-600MS LATENCY SLA
            </span>
          </div>

          {/* Audio toggle button */}
          <button
            type="button"
            onClick={toggleMute}
            className="p-1.5 sm:p-2 rounded-full bg-surface-2/80 border border-brand-border/80 hover:border-accent/40 text-white/80 hover:text-white transition-all flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono backdrop-blur-md cursor-pointer shrink-0"
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
        {/* 3. MIDDLE DYNAMIC 3D SPATIAL STAGE (Bounded with Perspective)         */}
        {/* ===================================================================== */}
        <div className="relative z-20 flex-1 w-full max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-center min-h-0 [perspective:1200px]">

          {/* Desktop 3D Mouse Parallax Layer Wrapper */}
          <motion.div
            style={{
              rotateX: tiltRotateX,
              rotateY: tiltRotateY,
              transformStyle: 'preserve-3d'
            }}
            className="w-full flex items-center justify-center"
          >

            {/* --------------------------------------------------------------- */}
            {/* STAGE 1: 3D HERO TITLE & ACTIONS                                */}
            {/* --------------------------------------------------------------- */}
            <motion.div
              style={{
                opacity: heroOpacity,
                scale: heroScale,
                y: heroY,
                z: heroZ,
                rotateX: heroRotateX,
                pointerEvents: heroPointerEvents as any,
                transformStyle: 'preserve-3d'
              }}
              className="w-full flex flex-col items-center justify-center text-center will-change-[transform,opacity] py-1"
            >
              {/* Animated 3D Pill Badge (Clean, Mobile-Wrapped without truncation) */}
              <motion.div
                initial={{ opacity: 0, y: -16, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-surface-2/95 border border-accent/40 text-accent font-mono text-[10px] sm:text-xs font-semibold tracking-wider uppercase mb-3 sm:mb-4 lg:mb-5 shadow-[0_0_20px_rgba(183,255,60,0.2)] backdrop-blur-xl shrink-0"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                <Sparkles size={13} className="text-accent animate-spin-slow shrink-0" />
                <span className="text-white/95">Enterprise Systems Architect</span>
                <span className="text-accent font-bold hidden xs:inline">•</span>
                <span className="hidden xs:inline text-accent">Autonomous AI Specialist</span>
              </motion.div>

              {/* Main Headline with High-Impact 3D Gradient Typography */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading text-3xl xs:text-4xl sm:text-5xl md:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.08] sm:leading-[1.04] mb-3 sm:mb-4 lg:mb-5 max-w-4xl text-balance"
              >
                SUB-SECOND WEB SYSTEMS.{' '}
                <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-accent text-glow">
                  AUTONOMOUS AI VOICE.
                </span>
              </motion.h1>

              {/* Subtitle Value Proposition */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs sm:text-sm md:text-base text-brand-secondary font-body max-w-2xl leading-relaxed mb-4 sm:mb-6 text-balance px-1 sm:px-0"
              >
                I architect high-converting digital ecosystems where <strong className="text-white font-medium">WordPress VIP</strong> delivers sub-second foundations, <strong className="text-accent font-medium">Autonomous AI Voice</strong> handles real-time qualification, and <strong className="text-white font-medium">Rapid Vibe Coding</strong> accelerates deployment.
              </motion.p>

              {/* Primary Actions: Centered Dual Button Array (Full-Width on Mobile) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto mb-4 sm:mb-6 px-4 sm:px-0"
              >
                <button
                  type="button"
                  onClick={() => scrollToSection('trust')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold font-mono tracking-wider bg-accent text-black hover:bg-white transition-all shadow-[0_0_25px_rgba(183,255,60,0.35)] flex items-center justify-center gap-2 group cursor-pointer active:scale-95 shrink-0"
                >
                  <span>EXPLORE ARCHITECTURE</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={onOpenInquiry}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold font-mono tracking-wider bg-surface-1/90 text-white border border-brand-border/80 hover:border-accent/50 hover:bg-surface-2 transition-all backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-lg group shrink-0"
                >
                  <Bot size={15} className="text-accent group-hover:scale-110 transition-transform" />
                  <span>TALK TO AI ASSISTANT</span>
                </button>
              </motion.div>

              {/* Proof Badges Strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.32 }}
                className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-mono text-brand-secondary"
              >
                <span className="flex items-center gap-1.5 text-white/90">
                  <span className="text-accent font-bold">✦</span>
                  <span>5+ Years Remote</span>
                </span>
                <span className="text-white/20 hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5 text-white/90">
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

            {/* --------------------------------------------------------------- */}
            {/* STAGE 2: 3D HOLOGRAPHIC SPATIAL HUD CARDS                       */}
            {/* --------------------------------------------------------------- */}
            <motion.div
              style={{
                opacity: cardsOpacity,
                scale: cardsScale,
                y: cardsY,
                z: cardsZ,
                rotateX: cardsRotateX,
                pointerEvents: cardsPointerEvents as any,
                transformStyle: 'preserve-3d'
              }}
              className="absolute inset-x-0 w-full flex flex-col items-center justify-center will-change-[transform,opacity] py-1"
            >
              {/* Reveal Header */}
              <div className="text-center mb-3 sm:mb-5 max-w-xl px-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/40 text-accent font-mono text-[9px] sm:text-xs font-bold uppercase tracking-wider mb-1.5 shadow-[0_0_15px_rgba(183,255,60,0.15)]">
                  <Zap size={12} className="text-accent" />
                  <span>VERIFIED PRODUCTION BENCHMARKS</span>
                </div>
                <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  Engineered for Speed. <span className="text-accent">Automated for Scale.</span>
                </h2>
              </div>

              {/* 3D Glassmorphic HUD Cards: Swipeable on Mobile, 4-Col Grid on Desktop */}
              <div
                ref={cardsContainerRef}
                onScroll={handleCardsScroll}
                className="w-full flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory py-2 px-1 scrollbar-none"
              >
                {/* Card 1: Sub-500ms TTFB */}
                <div className="w-[82vw] xs:w-[280px] sm:w-auto shrink-0 snap-center p-4 sm:p-5 rounded-2xl bg-surface-1/90 border border-brand-border/80 hover:border-accent/50 backdrop-blur-2xl transition-all shadow-2xl flex flex-col justify-between group relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono tracking-wider text-accent uppercase font-semibold">
                        PERFORMANCE
                      </span>
                      <div className="w-7 h-7 rounded-lg bg-surface-2 border border-brand-border/60 flex items-center justify-center text-sky-400 shadow-inner">
                        <Layers size={14} />
                      </div>
                    </div>
                    <div className="font-heading text-2xl sm:text-3xl font-black text-white group-hover:text-accent transition-colors mb-0.5">
                      &lt; 450ms
                    </div>
                    <h3 className="font-heading text-xs sm:text-sm font-bold text-white mb-1">
                      Sub-500ms TTFB
                    </h3>
                    <p className="text-[11px] sm:text-xs text-brand-secondary font-body leading-relaxed">
                      Custom PHP 8.2 VIP backbones with Redis caching & zero bloat.
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-brand-border/40 flex items-center justify-between text-[10px] font-mono text-brand-muted">
                    <span>Core Web Vitals</span>
                    <span className="text-emerald-400 font-bold">99+ Green</span>
                  </div>
                </div>

                {/* Card 2: 1,200+ Global Deployments */}
                <div className="w-[82vw] xs:w-[280px] sm:w-auto shrink-0 snap-center p-4 sm:p-5 rounded-2xl bg-surface-1/90 border border-brand-border/80 hover:border-accent/50 backdrop-blur-2xl transition-all shadow-2xl flex flex-col justify-between group relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono tracking-wider text-accent uppercase font-semibold">
                        EXPERIENCE
                      </span>
                      <div className="w-7 h-7 rounded-lg bg-surface-2 border border-brand-border/60 flex items-center justify-center text-accent shadow-inner">
                        <Globe size={14} />
                      </div>
                    </div>
                    <div className="font-heading text-2xl sm:text-3xl font-black text-white group-hover:text-accent transition-colors mb-0.5">
                      1,200+
                    </div>
                    <h3 className="font-heading text-xs sm:text-sm font-bold text-white mb-1">
                      Global Deployments
                    </h3>
                    <p className="text-[11px] sm:text-xs text-brand-secondary font-body leading-relaxed">
                      Production systems across USA, UK, UAE, Saudi Arabia, and Europe.
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-brand-border/40 flex items-center justify-between text-[10px] font-mono text-brand-muted">
                    <span>Client Rating</span>
                    <span className="text-accent font-bold">5.0 ★ Top Rated</span>
                  </div>
                </div>

                {/* Card 3: Sub-600ms AI Voice Telephony */}
                <div className="w-[82vw] xs:w-[280px] sm:w-auto shrink-0 snap-center p-4 sm:p-5 rounded-2xl bg-surface-1/90 border border-brand-border/80 hover:border-accent/50 backdrop-blur-2xl transition-all shadow-2xl flex flex-col justify-between group relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono tracking-wider text-accent uppercase font-semibold">
                        TELEPHONY
                      </span>
                      <div className="w-7 h-7 rounded-lg bg-surface-2 border border-brand-border/60 flex items-center justify-center text-purple-400 shadow-inner">
                        <Mic size={14} />
                      </div>
                    </div>
                    <div className="font-heading text-2xl sm:text-3xl font-black text-white group-hover:text-accent transition-colors mb-0.5">
                      520ms
                    </div>
                    <h3 className="font-heading text-xs sm:text-sm font-bold text-white mb-1">
                      24/7 Voice Telephony
                    </h3>
                    <p className="text-[11px] sm:text-xs text-brand-secondary font-body leading-relaxed">
                      Twilio SIP with Vapi full-duplex WebSockets & Cartesia TTS.
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-brand-border/40 flex items-center justify-between text-[10px] font-mono text-brand-muted">
                    <span>Turn-Taking SLA</span>
                    <span className="text-purple-400 font-bold">Sub-600ms</span>
                  </div>
                </div>

                {/* Card 4: GDPR-Ready Enterprise Automation */}
                <div className="w-[82vw] xs:w-[280px] sm:w-auto shrink-0 snap-center p-4 sm:p-5 rounded-2xl bg-surface-1/90 border border-brand-border/80 hover:border-accent/50 backdrop-blur-2xl transition-all shadow-2xl flex flex-col justify-between group relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono tracking-wider text-accent uppercase font-semibold">
                        AUTOMATION
                      </span>
                      <div className="w-7 h-7 rounded-lg bg-surface-2 border border-brand-border/60 flex items-center justify-center text-amber-400 shadow-inner">
                        <Workflow size={14} />
                      </div>
                    </div>
                    <div className="font-heading text-2xl sm:text-3xl font-black text-white group-hover:text-accent transition-colors mb-0.5">
                      100% Own
                    </div>
                    <h3 className="font-heading text-xs sm:text-sm font-bold text-white mb-1">
                      GDPR-Ready Ops
                    </h3>
                    <p className="text-[11px] sm:text-xs text-brand-secondary font-body leading-relaxed">
                      Self-hosted n8n clusters syncing CRM with zero Zapier tax.
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-brand-border/40 flex items-center justify-between text-[10px] font-mono text-brand-muted">
                    <span>Sovereignty</span>
                    <span className="text-amber-400 font-bold">Zero Leakage</span>
                  </div>
                </div>
              </div>

              {/* Mobile Carousel Indicators */}
              <div className="flex sm:hidden items-center justify-center gap-2 mt-3">
                {[0, 1, 2, 3].map((idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => scrollCardIntoView(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeCardIndex === idx
                        ? 'w-6 bg-accent shadow-[0_0_8px_#B7FF3C]'
                        : 'w-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to metric card ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Action Button */}
              <div className="mt-3 sm:mt-5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenInquiry}
                  className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs font-mono font-bold bg-accent text-black hover:bg-white transition-all shadow-[0_0_20px_rgba(183,255,60,0.3)] flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>INITIATE PROJECT SCOPING</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </motion.div>

          </motion.div>

        </div>

        {/* ===================================================================== */}
        {/* 4. BOTTOM SCROLL-DOWN HINT INDICATOR (Bounded, Safe)                  */}
        {/* ===================================================================== */}
        <footer className="relative z-30 w-full max-w-7xl mx-auto px-5 sm:px-8 pb-3 sm:pb-4 flex items-center justify-between pointer-events-auto shrink-0">
          <button
            type="button"
            onClick={() => scrollToSection('trust')}
            className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-brand-muted hover:text-accent transition-colors cursor-pointer group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            <span>SCROLL TO EXPLORE ARCHITECTURE</span>
            <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
          </button>

          <div className="text-[10px] sm:text-xs font-mono text-brand-muted">
            <span>EST. 2021 • </span>
            <span className="text-accent">SHEHARYAR SIRAJ</span>
          </div>
        </footer>

      </div>
    </section>
  );
};

export default Hero;
