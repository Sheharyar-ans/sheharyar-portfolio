import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  Gamepad2, 
  Sparkles, 
  Trophy, 
  Flame, 
  ArrowDown, 
  ShieldCheck, 
  Zap,
  Terminal,
  Code
} from 'lucide-react';

interface ArcadeHeroProps {
  playerStats: {
    totalXp: number;
    playerLevel: number;
    streakDays: number;
    solvedCount: number;
  };
  onScrollToArena: () => void;
}

export const ArcadeHero: React.FC<ArcadeHeroProps> = ({ playerStats, onScrollToArena }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        hudRef.current,
        { opacity: 0, y: -20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.4'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 px-4 sm:px-6 max-w-7xl mx-auto text-center overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[250px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Live Player HUD Status Banner */}
      <div ref={hudRef} className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 p-2 sm:px-4 sm:py-2 rounded-2xl bg-surface-1/90 border border-brand-border/80 backdrop-blur-xl shadow-2xl mb-8">
        <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-accent/10 text-accent font-mono text-xs font-bold">
          <Gamepad2 size={14} className="animate-pulse" />
          <span>PILOT RANK {playerStats.playerLevel}</span>
        </div>

        <div className="h-4 w-[1px] bg-brand-border/60 hidden sm:block" />

        <div className="flex items-center gap-1.5 text-xs font-mono text-white">
          <Trophy size={13} className="text-amber-400" />
          <span className="text-brand-muted">XP:</span>
          <span className="font-bold text-accent">{playerStats.totalXp}</span>
        </div>

        <div className="h-4 w-[1px] bg-brand-border/60 hidden sm:block" />

        <div className="flex items-center gap-1.5 text-xs font-mono text-white">
          <Flame size={13} className="text-orange-400" />
          <span className="text-brand-muted">STREAK:</span>
          <span className="font-bold text-orange-400">{playerStats.streakDays} DAYS</span>
        </div>

        <div className="h-4 w-[1px] bg-brand-border/60 hidden sm:block" />

        <div className="flex items-center gap-1.5 text-xs font-mono text-white">
          <ShieldCheck size={13} className="text-emerald-400" />
          <span className="text-brand-muted">CLEARED:</span>
          <span className="font-bold text-white">{playerStats.solvedCount} / 25</span>
        </div>
      </div>

      {/* Main Arcade Headline */}
      <div ref={headlineRef} className="space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-2 border border-brand-border text-brand-muted font-mono text-xs font-medium uppercase tracking-widest mb-2">
          <Sparkles size={12} className="text-accent" />
          <span>ZERO LOGIN • 100% IN-BROWSER • 25+ LIVE CHALLENGES</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08]">
          THE 3D CODE ARCADE: <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-emerald-400 to-cyan-400">
            GAMIFIED SOFTWARE MASTERY
          </span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-brand-secondary font-body max-w-2xl mx-auto leading-relaxed pt-2">
          Override cyber-grid security nodes, navigate 3D autonomous bots, and sharpen your algorithms in 
          <strong className="text-white"> JavaScript, Python, React, CSS, and Webhook APIs</strong> in real time.
        </p>
      </div>

      {/* CTA Buttons */}
      <div ref={ctaRef} className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={onScrollToArena}
          className="w-full sm:w-auto px-8 py-4 rounded-xl bg-accent text-black font-mono font-bold text-sm tracking-wider hover:bg-white transition-all shadow-[0_0_30px_rgba(183,255,60,0.4)] flex items-center justify-center gap-2 active:scale-95 group"
        >
          <Zap size={16} fill="currentColor" />
          <span>PLAY CODE ARENA NOW</span>
          <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
        </button>

        <a
          href="#skill-tracks"
          className="w-full sm:w-auto px-6 py-4 rounded-xl bg-surface-1 hover:bg-surface-2 border border-brand-border text-white font-mono text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2"
        >
          <Terminal size={14} className="text-accent" />
          <span>EXPLORE 5 SKILL TRACKS</span>
        </a>
      </div>

      {/* Feature Micro-Badges */}
      <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
        {[
          { label: '5 PROGRAMMING TRACKS', desc: 'JS, Python, React, CSS, APIs' },
          { label: 'REAL-TIME 3D REACTION', desc: 'Watch your code move the bot' },
          { label: 'SYNTHESIZED WEB AUDIO', desc: 'Arcade laser & triumph sound' },
          { label: 'ZERO AUTHENTICATION', desc: 'Instant play with local progress' }
        ].map((item, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-surface-1/70 border border-brand-border/50 text-xs font-mono">
            <div className="text-accent font-bold text-[11px] truncate">{item.label}</div>
            <div className="text-brand-muted text-[10px] mt-0.5">{item.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
