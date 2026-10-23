import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Gamepad2, 
  Terminal, 
  Sparkles, 
  Trophy, 
  ChevronDown, 
  CheckCircle2, 
  ArrowRight, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  HelpCircle, 
  ChevronUp, 
  Layers, 
  ExternalLink,
  Flame,
  Star,
  RefreshCw
} from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { ARCADE_TRACKS, LanguageKey, ArcadeLevel } from '../data/arcadeGameData';
import { ArcadeHero } from '../components/arcade/ArcadeHero';
import { Arcade3DViewport } from '../components/arcade/Arcade3DViewport';
import { ArcadeEditor } from '../components/arcade/ArcadeEditor';
import { InteractiveGameArena } from '../components/arcade/InteractiveGameArena';
import { arcadeAudio } from '../utils/arcadeAudio';

gsap.registerPlugin(ScrollTrigger);

interface CodeArcadePageProps {
  onOpenInquiry: () => void;
}

const ARCADE_FAQS = [
  {
    q: 'Is the 3D Code Arcade 100% free with no sign-up or credit card required?',
    a: 'Yes. The 3D Code Arcade is completely free and executes 100% client-side in your web browser. There is no account creation, no login barrier, and no paywall. You can select any language track and begin practicing immediately.'
  },
  {
    q: 'How does the in-browser code evaluation engine execute code safely?',
    a: 'The engine evaluates code in an isolated JavaScript execution sandbox that captures standard outputs, enforces execution time limits (sub-500ms), and validates outputs against strict deterministic assertions without sending code to an external server.'
  },
  {
    q: 'How does code execution connect with the live 3D game canvas?',
    a: 'When you trigger "Run Code", the execution lifecycle dispatches events to the Three.js WebGL viewport. The 3D cyber-bot charges its arc reactor, emits a targeted laser frequency, and illuminates the corresponding cryptographic data nodes upon passing validation.'
  },
  {
    q: 'How is player progress, XP, and streaks saved across browser sessions?',
    a: 'All player telemetry—including total experience points (XP), player rank, consecutive practice streaks, and cleared sector IDs—is persisted automatically in your browser\'s native localStorage. Your progress remains saved even if you close the tab.'
  },
  {
    q: 'Can beginners practice on this arcade or is it only for senior software engineers?',
    a: 'The challenges are structured progressively from Level 1 (fundamental syntax and array filtering) up to Level 5 (algorithmic state reducers, prime number generators, and regex compilers). Beginners can use the integrated "Tactical Hint" drawer on any level.'
  },
  {
    q: 'Why combine 3D gamification with practical programming practice?',
    a: 'Research in cognitive science demonstrates that immediate visual feedback loops combined with procedural tactile interaction dramatically increase dopamine-driven focus and long-term memory consolidation compared to static textbook problems.'
  },
  {
    q: 'Which programming languages are supported in the 3D Code Arcade?',
    a: 'The arcade supports 5 core disciplines: JavaScript (ES6+ array algorithms and DOM logic), Python 3 (algorithmic data structures and comprehensions), React (JSX, state reducers, and hooks), Modern HTML5/CSS3 (Flexbox, Grid, and fluid typography), and Webhooks & JSON APIs (payload routing and authentication headers).'
  },
  {
    q: 'Who engineered the 3D Code Arcade platform?',
    a: 'The platform was custom-architected by Sheharyar Siraj, an AI Automation Architect and WordPress Systems Engineer with 5+ years of production experience and 1,200+ delivered projects worldwide.'
  }
];

export const CodeArcadePage: React.FC<CodeArcadePageProps> = ({ onOpenInquiry }) => {
  // Game State
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageKey>('javascript');
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // 3D Viewport Reactive State
  const [isExecuting, setIsExecuting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Victory Modal State
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [lastEarnedXp, setLastEarnedXp] = useState(0);

  // Player Progress (LocalStorage)
  const [playerStats, setPlayerStats] = useState({
    totalXp: 0,
    playerLevel: 1,
    streakDays: 1,
    solvedCount: 0
  });

  const arenaRef = useRef<HTMLDivElement>(null);
  const tiltCardsRef = useRef<HTMLDivElement>(null);

  // Load progress from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedXp = Number(localStorage.getItem('sheharyar_arcade_xp') || 0);
      const savedSolved = Number(localStorage.getItem('sheharyar_arcade_solved') || 0);
      const calculatedLevel = Math.max(1, Math.floor(savedXp / 500) + 1);

      setPlayerStats({
        totalXp: savedXp,
        playerLevel: calculatedLevel,
        streakDays: 1,
        solvedCount: savedSolved
      });
    }
  }, []);

  const currentTrack = ARCADE_TRACKS[selectedLanguage];
  const currentLevel = currentTrack.levels[currentLevelIndex] || currentTrack.levels[0];

  // GSAP ScrollTrigger for 3D tilt cards
  useEffect(() => {
    // Refresh ScrollTrigger after layout settles
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    const ctx = gsap.context(() => {
      if (tiltCardsRef.current && tiltCardsRef.current.children.length > 0) {
        gsap.fromTo(
          tiltCardsRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: tiltCardsRef.current,
              start: 'top 95%',
              once: true
            },
            clearProps: 'all'
          }
        );
      }
    });

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const handleScrollToArena = () => {
    arenaRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLanguageChange = (lang: LanguageKey) => {
    arcadeAudio.playClick();
    setSelectedLanguage(lang);
    setCurrentLevelIndex(0);
    setLanguageDropdownOpen(false);
    setIsSuccess(false);
    setHasError(false);
    setIsExecuting(false);
  };

  const handleLevelSelect = (index: number) => {
    arcadeAudio.playClick();
    setCurrentLevelIndex(index);
    setIsSuccess(false);
    setHasError(false);
    setIsExecuting(false);
  };

  const handleLevelSuccess = (xp: number) => {
    setIsSuccess(true);
    setHasError(false);
    setLastEarnedXp(xp);
    setShowVictoryModal(true);

    // Update player progress
    setPlayerStats((prev) => {
      const nextXp = prev.totalXp + xp;
      const nextSolved = prev.solvedCount + 1;
      const nextLevel = Math.max(1, Math.floor(nextXp / 500) + 1);

      if (typeof window !== 'undefined') {
        localStorage.setItem('sheharyar_arcade_xp', String(nextXp));
        localStorage.setItem('sheharyar_arcade_solved', String(nextSolved));
      }

      return {
        ...prev,
        totalXp: nextXp,
        solvedCount: nextSolved,
        playerLevel: nextLevel
      };
    });
  };

  const handleNextLevel = () => {
    arcadeAudio.playClick();
    setShowVictoryModal(false);
    if (currentLevelIndex < currentTrack.levels.length - 1) {
      setCurrentLevelIndex(currentLevelIndex + 1);
    } else {
      // Loop to first level or switch track
      setCurrentLevelIndex(0);
    }
    setIsSuccess(false);
    setHasError(false);
  };

  // Structured Schema for Google & AEO
  const arcadeSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'VideoGame',
        '@id': 'https://sheharyarsiraj.com/code-arcade/#game',
        name: '3D Code Arcade: Gamified Software Practice Arena',
        description: 'Free browser-based 3D coding game to practice JavaScript, Python, React, HTML/CSS, and Webhook APIs with zero login.',
        genre: ['Educational', 'Coding Practice', 'Puzzle', 'Arcade'],
        gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
        operatingSystem: 'Any (Chrome, Firefox, Safari, Edge)',
        inLanguage: 'en-US',
        author: {
          '@type': 'Person',
          '@id': 'https://sheharyarsiraj.com/#person',
          name: 'Sheharyar Siraj',
          url: 'https://sheharyarsiraj.com/'
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock'
        }
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Sheharyar Siraj 3D Code Arcade',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web Browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        }
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://sheharyarsiraj.com/code-arcade/#faq',
        mainEntity: ARCADE_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a
          }
        }))
      }
    ]
  };

  return (
    <div className="relative min-h-screen bg-bg text-white selection:bg-accent/30 selection:text-white">
      <SEOHead
        title="Free 3D Coding Game Online: Practice JS, Python & React | Sheharyar Siraj"
        description="Play the ultimate free 3D coding practice game in your browser. Select Python, JavaScript, React, or CSS from the dropdown and level up your programming skills."
        canonicalUrl="https://sheharyarsiraj.com/code-arcade/"
        schema={arcadeSchema}
      />

      {/* Hero Section */}
      <ArcadeHero
        playerStats={playerStats}
        onScrollToArena={handleScrollToArena}
      />

      {/* ================= SECTION 2: THE INTERACTIVE GAME ARENA ================= */}
      <section
        ref={arenaRef}
        id="arcade-arena"
        className="pt-8 pb-20 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-24"
      >
        <InteractiveGameArena
          onXpGained={(xp) => {
            setPlayerStats((prev) => {
              const nextXp = prev.totalXp + xp;
              const nextSolved = prev.solvedCount + 1;
              const nextLevel = Math.max(1, Math.floor(nextXp / 500) + 1);

              if (typeof window !== 'undefined') {
                localStorage.setItem('sheharyar_arcade_xp', String(nextXp));
                localStorage.setItem('sheharyar_arcade_solved', String(nextSolved));
              }

              return {
                ...prev,
                totalXp: nextXp,
                solvedCount: nextSolved,
                playerLevel: nextLevel
              };
            });
          }}
        />
      </section>

      {/* ================= VICTORY CELEBRATION MODAL ================= */}
      {showVictoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-surface-1 border border-accent/40 shadow-[0_0_50px_rgba(183,255,60,0.25)] text-center font-mono">
            {/* Mascot Avatar */}
            <div className="w-24 h-24 rounded-2xl bg-black border border-accent/40 p-1 mx-auto mb-4 overflow-hidden shadow-xl">
              <img
                src="/assets/images/arcade/arcade-cyber-bot.jpg"
                alt="Cyber-Bot Pilot"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-bold uppercase tracking-wider mb-2">
              <Trophy size={13} />
              <span>SECTOR PROTOCOL CLEARED</span>
            </div>

            <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mb-2">
              EXCELLENT WORK, PILOT!
            </h3>

            <p className="text-xs text-brand-secondary font-body leading-relaxed mb-6">
              You successfully injected the algorithmic payload, decrypted the target nodes, and secured the telemetry stream.
            </p>

            <div className="p-4 rounded-xl bg-surface-2/80 border border-brand-border/60 mb-6 flex items-center justify-around text-xs">
              <div>
                <div className="text-brand-muted text-[10px]">XP HARVESTED</div>
                <div className="text-accent font-bold text-base">+{lastEarnedXp} XP</div>
              </div>
              <div className="h-6 w-[1px] bg-brand-border/60" />
              <div>
                <div className="text-brand-muted text-[10px]">NEXT RANK AT</div>
                <div className="text-cyan-400 font-bold text-base">{playerStats.playerLevel * 500} XP</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowVictoryModal(false)}
                className="flex-1 py-3 rounded-xl bg-surface-2 border border-brand-border text-white text-xs font-bold hover:bg-surface-3 transition-colors"
              >
                Review Code
              </button>
              <button
                onClick={handleNextLevel}
                className="flex-1 py-3 rounded-xl bg-accent text-black font-bold text-xs hover:bg-white transition-all shadow-md shadow-accent/20 flex items-center justify-center gap-1.5 active:scale-95"
              >
                <span>NEXT SECTOR</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 3: HOW THE CODE ARENA WORKS ================= */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-brand-border/60">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-accent font-bold uppercase tracking-wider mb-2">
            <Zap size={13} />
            <span>THE 3-STEP GAME LOOP</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            HOW THE 3D CODE ARENA WORKS
          </h2>
          <p className="text-xs sm:text-sm text-brand-secondary font-body mt-2 leading-relaxed">
            Deliberate practice engineered around low latency, real-time visual feedback, and zero cognitive friction.
          </p>
        </div>

        <div ref={tiltCardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              num: '01',
              title: 'Choose Mode & Language',
              desc: 'Select between Step-by-Step Puzzle Solver and 1v1 Arcade Fighter. Practice Python, JavaScript, React, CSS, or JSON APIs with Easy, Medium, or Hard difficulty.',
              badge: 'ZERO PRE-FILLED CODE',
              icon: Gamepad2,
              glowColor: 'from-cyan-500/20 to-blue-500/0',
              accentColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40'
            },
            {
              num: '02',
              title: 'Write Algorithmic Logic',
              desc: 'Start with a completely blank IDE. Type your own logic from scratch. Strict sandbox compilers evaluate syntax, navigation vectors, and test assertions.',
              badge: 'STRICT EVALUATION',
              icon: Cpu,
              glowColor: 'from-amber-500/20 to-yellow-500/0',
              accentColor: 'text-amber-400 border-amber-500/30 bg-amber-950/40'
            },
            {
              num: '03',
              title: 'Watch Real-Time Simulation',
              desc: 'Execute your code to watch the drone navigate step-by-step or strike enemy bosses in 1v1 combat with HP bars, combo meters, and infinite endless replay.',
              badge: 'ENDLESS GAMEPLAY',
              icon: Zap,
              glowColor: 'from-lime-500/20 to-emerald-500/0',
              accentColor: 'text-accent border-accent/30 bg-accent/10'
            }
          ].map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.num}
                className="p-6 sm:p-7 rounded-2xl bg-surface-1 border border-brand-border/80 hover:border-accent transition-all duration-300 group relative overflow-hidden flex flex-col justify-between shadow-xl"
              >
                {/* Subtle top neon ambient glow */}
                <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${card.glowColor} blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500`} />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold border ${card.accentColor}`}>
                      {card.badge}
                    </span>
                    <div className="text-3xl font-heading font-black text-white/20 group-hover:text-accent/40 transition-colors font-mono">
                      {card.num}
                    </div>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-surface-2 border border-brand-border/80 flex items-center justify-center mb-4 text-white group-hover:text-accent group-hover:scale-110 transition-all shadow-md">
                    <IconComponent size={22} />
                  </div>

                  <h3 className="font-heading font-bold text-lg text-white mb-2.5 group-hover:text-accent transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-secondary font-body leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-brand-border/40 flex items-center justify-between text-[11px] font-mono text-brand-muted">
                  <span>STEP {card.num} / 03</span>
                  <span className="text-accent group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-bold">
                    ACTIVE &gt;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= SECTION 4: SUPPORTED LANGUAGES & SKILL TRACKS ================= */}
      <section id="skill-tracks" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-brand-border/60">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-2">
            <Layers size={13} />
            <span>DISCIPLINE MATRIX</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            5 DEDICATED CODING TRACKS
          </h2>
          <p className="text-xs sm:text-sm text-brand-secondary font-body mt-2">
            Each track includes 5 progressive algorithmic sectors specifically calibrated for real-world software engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(Object.keys(ARCADE_TRACKS) as LanguageKey[]).map((key) => {
            const track = ARCADE_TRACKS[key];
            return (
              <div
                key={key}
                onClick={() => {
                  handleLanguageChange(key);
                  handleScrollToArena();
                }}
                className="p-6 rounded-2xl bg-surface-1 border border-brand-border/80 hover:border-accent transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{track.icon}</span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-surface-2 text-brand-muted">
                      5 SECTORS
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white group-hover:text-accent transition-colors mb-2">
                    {track.name}
                  </h3>
                  <p className="text-xs text-brand-secondary font-body leading-relaxed">
                    {track.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-brand-border/40 flex items-center justify-between text-xs font-mono text-accent">
                  <span>LAUNCH TRACK</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}

          {/* Bonus Track: Architecture Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-surface-1 via-surface-2 to-black border border-accent/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">🛡️</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-accent/20 text-accent">
                  COMING SOON
                </span>
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">
                SQL & Database Indexing
              </h3>
              <p className="text-xs text-brand-secondary font-body leading-relaxed">
                Query profiler puzzles, deadlocks resolution, and InnoDB buffer tuning challenges.
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-brand-border/40 text-xs font-mono text-brand-muted">
              EXPANDING IN SEASON 02
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 5: WHY GAMIFIED CODING ACCELERATES MASTERY (SEO/AEO HUB) ================= */}
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto border-t border-brand-border/60 text-left">
        <article className="space-y-8 font-body">
          <header className="space-y-3">
            <span className="text-xs font-mono text-accent font-bold uppercase tracking-wider">
              EDUCATIONAL COGNITIVE ARCHITECTURE
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
              Why Gamified Coding Practice Accelerates Software Engineering Mastery
            </h2>
          </header>

          <p className="text-sm sm:text-base text-brand-secondary leading-relaxed">
            Traditional software engineering education suffers from an acute feedback latency problem. When developers read syntax manuals or work through disconnected documentation tutorials, the cognitive gap between writing logic and observing its systemic consequence can span minutes or hours. In high-performance software engineering, mastery is governed by <em>deliberate practice</em>—tight feedback loops where every line of code immediately yields an observable, deterministic reaction.
          </p>

          <div className="p-6 rounded-2xl bg-surface-1 border border-brand-border space-y-4">
            <h3 className="font-heading font-bold text-lg text-white">
              The Cognitive Science of 3D Real-Time Code Execution
            </h3>
            <p className="text-xs sm:text-sm text-brand-secondary leading-relaxed">
              By coupling an in-browser code editor with a real-time Three.js WebGL simulation canvas, the 3D Code Arcade activates procedural memory pathways. Rather than merely evaluating a boolean return value on a console line, the developer observes their algorithm translating directly into physical mechanical actuation: an autonomous robot firing its plasma array, cryptographic nodes shifting state, and firewalls collapsing.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-white/90 pl-4 list-disc marker:text-accent">
              <li><strong>Zero Friction Deliberate Practice:</strong> Eliminates environment setup, dependency installations, and authentication gates so developers can practice algorithms within seconds.</li>
              <li><strong>Immediate Dopaminergic Reinforcement:</strong> Synthesized Web Audio API acoustics and dynamic 3D particle bursts create strong cognitive reinforcement signals upon code optimization.</li>
              <li><strong>Cross-Disciplinary Versatility:</strong> Rotating through JavaScript, Python, React, CSS, and API Webhooks prevents cognitive specialization blindness, developing well-rounded full-stack mental models.</li>
            </ul>
          </div>
        </article>
      </section>

      {/* ================= SECTION 6: FAQ ACCORDION ================= */}
      <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto border-t border-brand-border/60">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-accent font-bold uppercase tracking-wider mb-2">
            <HelpCircle size={13} />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            ARCADE TECHNICAL INTEL
          </h2>
        </div>

        <div className="space-y-3">
          {ARCADE_FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-surface-1 border border-brand-border/60 overflow-hidden text-left"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 sm:p-5 font-heading font-bold text-sm sm:text-base text-white hover:text-accent transition-colors flex items-center justify-between gap-4 text-left"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp size={16} className="text-accent shrink-0" />
                ) : (
                  <ChevronDown size={16} className="text-brand-muted shrink-0" />
                )}
              </button>

              {openFaq === idx && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-brand-secondary font-body leading-relaxed border-t border-brand-border/30">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ================= SECTION 7: ARCHITECT CREDIT BANNER ================= */}
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto border-t border-brand-border/60">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-surface-1 via-surface-2 to-surface-1 border border-brand-border relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 text-left">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-accent font-bold uppercase tracking-wider">
              <Cpu size={14} />
              <span>ARCHITECTED BY SHEHARYAR SIRAJ</span>
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
              Need High-Performance Web Architecture or Custom AI Systems?
            </h3>
            <p className="text-xs sm:text-sm text-brand-secondary font-body leading-relaxed">
              From zero-bloat custom WordPress VIP platforms to sub-600ms conversational AI voice agents and autonomous n8n pipelines, Sheharyar Siraj engineers mission-critical digital systems for international enterprises.
            </p>
          </div>

          <button
            onClick={onOpenInquiry}
            className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-accent text-black font-mono font-bold text-xs hover:bg-white transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2 shrink-0 active:scale-95"
          >
            <span>Initiate Project Consultation</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </section>
    </div>
  );
};
