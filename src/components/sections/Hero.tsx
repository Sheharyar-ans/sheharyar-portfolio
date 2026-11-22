import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, ArrowDown, Bot } from 'lucide-react';
import { CONTACT_INFO } from '../../data/portfolioData';

interface HeroProps {
  onOpenInquiry: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenInquiry }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Extra-silky spring physics for desktop scroll choreography
  const smoothP = useSpring(scrollYProgress, {
    stiffness: 48,
    damping: 20,
    mass: 0.85,
    restDelta: 0.0005,
  });

  // Desktop 4-Beat Portrait Choreography
  const portraitX = useTransform(
    smoothP,
    [0, 0.16, 0.27, 0.46, 0.56, 0.72, 0.81, 1.0],
    ['0vw', '0vw', '23vw', '23vw', '-23vw', '-23vw', '0vw', '0vw']
  );
  const portraitScale = useTransform(
    smoothP,
    [0, 0.18, 0.45, 0.72, 0.82, 0.94, 1.0],
    [1.0, 0.96, 0.94, 0.94, 1.0, 0.78, 0.72]
  );
  const portraitOpacity = useTransform(smoothP, [0, 0.93, 1.0], [1, 1, 0.15]);

  // Beat 1: Full-Name Headline & Intro Bottom Bar
  const beat1Opacity = useTransform(smoothP, [0, 0.12, 0.20], [1, 1, 0]);
  const beat1Y = useTransform(smoothP, [0, 0.20], [0, -50]);
  const beat1Events = useTransform(smoothP, (v) => (v < 0.18 ? 'auto' : 'none'));

  // Beat 2: Left Storytelling Services while Portrait is Right
  const beat2Opacity = useTransform(smoothP, [0.19, 0.27, 0.43, 0.50], [0, 1, 1, 0]);
  const beat2X = useTransform(smoothP, [0.19, 0.27, 0.50], [-48, 0, -28]);
  const beat2Events = useTransform(smoothP, (v) => (v >= 0.21 && v <= 0.48 ? 'auto' : 'none'));

  // Beat 3: Right Storytelling Proof & Impact while Portrait is Left
  const beat3Opacity = useTransform(smoothP, [0.49, 0.57, 0.70, 0.76], [0, 1, 1, 0]);
  const beat3X = useTransform(smoothP, [0.49, 0.57, 0.76], [48, 0, 28]);
  const beat3Events = useTransform(smoothP, (v) => (v >= 0.51 && v <= 0.74 ? 'auto' : 'none'));

  // Beat 4: Portrait Returns Center & Zooms Out while Left/Right Details Slide BEHIND Portrait
  const beat4Opacity = useTransform(smoothP, [0.75, 0.82, 0.92, 0.99], [0, 1, 0.85, 0]);
  const beat4LeftX = useTransform(smoothP, [0.75, 0.82, 0.98], [-32, 0, 180]);
  const beat4RightX = useTransform(smoothP, [0.75, 0.82, 0.98], [32, 0, -180]);
  const beat4Scale = useTransform(smoothP, [0.75, 0.82, 0.98], [0.96, 1, 0.84]);
  const beat4Events = useTransform(smoothP, (v) => (v >= 0.76 && v <= 0.95 ? 'auto' : 'none'));

  // Living Portrait smooth mouse-follow lean
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMX = useSpring(mouseX, { stiffness: 55, damping: 20 });
  const smoothMY = useSpring(mouseY, { stiffness: 55, damping: 20 });
  const leanRotateY = useTransform(smoothMX, [-0.5, 0.5], [-5.5, 5.5]);
  const leanRotateX = useTransform(smoothMY, [-0.5, 0.5], [3.5, -3.5]);
  const glowX = useTransform(smoothMX, [-0.5, 0.5], [-32, 32]);
  const glowY = useTransform(smoothMY, [-0.5, 0.5], [-22, 22]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  };

  const scrollToPortfolio = () => {
    const el = document.getElementById('wordpress-showcase');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ================================================================= */}
      {/* MOBILE & TABLET HERO (< 1024px): Clean Zero-Overlap Flow          */}
      {/* ================================================================= */}
      <section className="lg:hidden relative w-full bg-[#080808] pt-24 pb-12 px-5 sm:px-8 border-b border-white/[0.08] overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 w-[320px] h-[320px] rounded-full bg-accent/[0.12] blur-[110px]"
        />

        <div className="max-w-xl mx-auto relative z-10 flex flex-col items-center text-center">
          <span className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase mb-2">
            AI AUTOMATION &amp; WORDPRESS ARCHITECT
          </span>

          <h1 className="font-heading font-black uppercase tracking-tight leading-[0.96] text-[10.5vw] sm:text-5xl bg-gradient-to-b from-[#646973] via-[#d7e2ea] to-accent bg-clip-text text-transparent mb-4">
            Hi, I&apos;m Sheharyar
          </h1>

          {/* Centered Portrait on Mobile */}
          <div className="relative w-[240px] sm:w-[290px] mx-auto mb-4">
            <img
              src="/assets/images/sheharyar-portrait-nobg.webp"
              alt="Sheharyar Siraj, AI Automation and WordPress Systems Architect"
              className="w-full h-auto object-contain drop-shadow-[0_18px_45px_rgba(0,0,0,0.9)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#080808] to-transparent"
            />
          </div>

          <p className="text-xs sm:text-sm text-[#D7E2EA] font-normal leading-relaxed max-w-md mb-6">
            Building sub-second WordPress VIP platforms, sub-600ms AI voice receptionists, and automated revenue systems that run 24/7.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full mb-10">
            <button
              type="button"
              onClick={scrollToPortfolio}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-accent text-black font-mono text-xs font-bold tracking-[0.14em] uppercase flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(250,204,21,0.28)]"
            >
              <span>View Portfolio</span>
              <ArrowRight size={14} />
            </button>
            <button
              type="button"
              onClick={onOpenInquiry}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-surface-1 text-white border border-white/15 font-mono text-xs font-bold tracking-[0.14em] uppercase flex items-center justify-center gap-2"
            >
              <Bot size={14} className="text-accent" />
              <span>Contact Me</span>
            </button>
          </div>

          {/* Mobile Story Card 1: Services */}
          <div className="w-full text-left p-5 rounded-2xl bg-surface-1/90 border border-white/[0.08] mb-4">
            <span className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase block mb-1.5">
              01 / WHO I AM &amp; WHAT I BUILD
            </span>
            <h2 className="font-heading text-xl font-black text-white leading-tight mb-3">
              WEBSITES + AI AGENTS THAT WORK FOR YOU.
            </h2>
            <div className="divide-y divide-white/[0.08] border-t border-white/[0.08]">
              <div className="py-2.5 flex items-baseline gap-3">
                <span className="font-mono text-xs font-bold text-accent">01</span>
                <div>
                  <h3 className="font-heading text-xs font-bold text-white uppercase">Custom WordPress &amp; WooCommerce VIP</h3>
                  <p className="text-[11px] text-brand-secondary mt-0.5">Sub-second PHP 8.2 builds with 99+ Core Web Vitals.</p>
                </div>
              </div>
              <div className="py-2.5 flex items-baseline gap-3">
                <span className="font-mono text-xs font-bold text-accent">02</span>
                <div>
                  <h3 className="font-heading text-xs font-bold text-white uppercase">Autonomous AI Voice &amp; RAG Chatbots</h3>
                  <p className="text-[11px] text-brand-secondary mt-0.5">Sub-600ms Vapi &amp; Twilio agents that qualify and book leads.</p>
                </div>
              </div>
              <div className="py-2.5 flex items-baseline gap-3">
                <span className="font-mono text-xs font-bold text-accent">03</span>
                <div>
                  <h3 className="font-heading text-xs font-bold text-white uppercase">n8n Workflows &amp; Executive BI</h3>
                  <p className="text-[11px] text-brand-secondary mt-0.5">Self-hosted CRM automation, Power BI, and Python ML.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Story Card 2: Metrics */}
          <div className="w-full text-left p-5 rounded-2xl bg-surface-1/90 border border-white/[0.08]">
            <span className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase block mb-1.5">
              02 / REAL BUSINESS IMPACT
            </span>
            <h2 className="font-heading text-xl font-black text-white leading-tight mb-4">
              5+ YEARS. 1,200+ SYSTEMS SHIPPED.
            </h2>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-bg border border-white/[0.08]">
                <div className="font-heading text-xl font-black text-accent">1,200+</div>
                <div className="font-mono text-[9px] tracking-widest text-brand-muted uppercase mt-0.5">Projects Delivered</div>
              </div>
              <div className="p-3 rounded-xl bg-bg border border-white/[0.08]">
                <div className="font-heading text-xl font-black text-white">100%</div>
                <div className="font-mono text-[9px] tracking-widest text-brand-muted uppercase mt-0.5">Job Success</div>
              </div>
              <div className="p-3 rounded-xl bg-bg border border-white/[0.08]">
                <div className="font-heading text-xl font-black text-white">&lt;600ms</div>
                <div className="font-mono text-[9px] tracking-widest text-brand-muted uppercase mt-0.5">Voice Latency</div>
              </div>
              <div className="p-3 rounded-xl bg-bg border border-white/[0.08]">
                <div className="font-heading text-xl font-black text-accent">9 Countries</div>
                <div className="font-mono text-[9px] tracking-widest text-brand-muted uppercase mt-0.5">Global Clients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* DESKTOP HERO (>= 1024px): 4-Beat Scroll-Choreographed Stage       */}
      {/* ================================================================= */}
      <section
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          mouseX.set(0);
          mouseY.set(0);
        }}
        className="hidden lg:block relative h-[420vh] w-full bg-[#080808] border-b border-white/[0.08]"
      >
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-between pt-24 pb-10 [perspective:1200px]">
          {/* Architectural Grid & Warm Yellow Ambient Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
          />
          <motion.div
            aria-hidden="true"
            style={{ x: glowX, y: glowY }}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-accent/[0.10] blur-[150px]"
          />

          {/* BEAT 1: FULL SPELLING HEADING + INTRO STATEMENT (SCROLL = 0) */}
          <motion.div
            style={{ opacity: beat1Opacity, y: beat1Y, pointerEvents: beat1Events as any }}
            className="relative z-10 w-full max-w-[1440px] mx-auto px-10 flex-1 flex flex-col justify-between will-change-[transform,opacity]"
          >
            <div className="overflow-hidden pt-6 text-center">
              <motion.h1
                initial={{ opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading font-black uppercase tracking-tight leading-[0.95] whitespace-nowrap select-none text-[7.4vw] xl:text-[7.2vw] bg-gradient-to-b from-[#646973] via-[#d7e2ea] to-accent bg-clip-text text-transparent"
              >
                Hi, I&apos;m Sheharyar
              </motion.h1>
            </div>

            <div className="flex justify-between items-end gap-4 relative z-40 pb-16">
              <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-sm md:text-base max-w-[330px]">
                AI Automation Architect &amp; WordPress VIP Engineer building systems that run 24/7.
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={scrollToPortfolio}
                  className="px-7 py-3.5 rounded-full bg-accent text-black hover:bg-white transition-all font-mono text-xs font-bold tracking-[0.14em] uppercase flex items-center gap-2 shadow-[0_0_28px_rgba(250,204,21,0.3)] cursor-pointer"
                >
                  <span>View Portfolio</span>
                  <ArrowRight size={14} />
                </button>
                <button
                  type="button"
                  onClick={onOpenInquiry}
                  className="px-6 py-3.5 rounded-full bg-surface-1/90 text-white border border-white/15 hover:border-accent transition-all font-mono text-xs font-bold tracking-[0.14em] uppercase flex items-center gap-2 cursor-pointer backdrop-blur-md"
                >
                  <Bot size={14} className="text-accent" />
                  <span>Contact Me</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* CENTER -> RIGHT -> LEFT -> CENTER ZOOM-OUT PORTRAIT (z-30) */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex justify-center">
            <motion.div
              style={{
                x: portraitX,
                scale: portraitScale,
                opacity: portraitOpacity,
                rotateY: leanRotateY,
                rotateX: leanRotateX,
                transformStyle: 'preserve-3d',
              }}
              className="relative w-[min(510px,70vh)] flex items-end justify-center will-change-transform origin-bottom"
            >
              <img
                src="/assets/images/sheharyar-portrait-nobg.webp"
                alt="Sheharyar Siraj, AI Automation and WordPress Systems Architect"
                className="w-full h-auto object-contain drop-shadow-[0_24px_75px_rgba(0,0,0,0.92)] select-none"
                draggable={false}
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent"
              />
            </motion.div>
          </div>

          {/* BEAT 2: WHO I AM & WHAT I BUILD (LEFT SIDE, PORTRAIT ON RIGHT) */}
          <motion.div
            style={{ opacity: beat2Opacity, x: beat2X, pointerEvents: beat2Events as any }}
            className="absolute inset-0 z-20 flex items-center pt-24 pb-12 pointer-events-none will-change-[transform,opacity]"
          >
            <div className="max-w-7xl w-full mx-auto px-10 grid grid-cols-12">
              <div className="col-span-6 text-left max-h-[calc(100svh-128px)] flex flex-col justify-center">
                <span className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase block mb-2">
                  01 / WHO I AM &amp; WHAT I BUILD
                </span>
                <h2 className="font-heading text-[clamp(1.75rem,3.6vh,2.75rem)] font-black text-white tracking-tight leading-[1.04] mb-3">
                  WEBSITES + AI AGENTS <span className="text-accent">THAT WORK FOR YOU.</span>
                </h2>
                <p className="text-[clamp(0.76rem,1.45vh,0.92rem)] text-brand-secondary leading-relaxed mb-4 max-w-xl">
                  I connect high-speed WordPress engineering with autonomous AI voice receptionists and backend automation so businesses capture leads 24/7.
                </p>
                <div className="divide-y divide-white/[0.1] border-t border-b border-white/[0.1]">
                  <div className="py-[clamp(0.45rem,1.15vh,0.8rem)] flex items-baseline gap-3.5">
                    <span className="font-mono text-sm font-bold text-accent shrink-0">01</span>
                    <div>
                      <h3 className="font-heading text-base font-bold text-white uppercase">Custom WordPress &amp; WooCommerce VIP</h3>
                      <p className="text-sm text-brand-secondary mt-0.5 leading-snug">Sub-second PHP 8.2 builds, 99+ Core Web Vitals, and zero bloated page builders.</p>
                    </div>
                  </div>
                  <div className="py-[clamp(0.45rem,1.15vh,0.8rem)] flex items-baseline gap-3.5">
                    <span className="font-mono text-sm font-bold text-accent shrink-0">02</span>
                    <div>
                      <h3 className="font-heading text-base font-bold text-white uppercase">Autonomous AI Voice &amp; RAG Chatbots</h3>
                      <p className="text-sm text-brand-secondary mt-0.5 leading-snug">Sub-600ms Vapi &amp; Twilio agents that qualify callers and book calendars.</p>
                    </div>
                  </div>
                  <div className="py-[clamp(0.45rem,1.15vh,0.8rem)] flex items-baseline gap-3.5">
                    <span className="font-mono text-sm font-bold text-accent shrink-0">03</span>
                    <div>
                      <h3 className="font-heading text-base font-bold text-white uppercase">n8n Workflows &amp; Executive BI</h3>
                      <p className="text-sm text-brand-secondary mt-0.5 leading-snug">Self-hosted CRM pipelines, Power BI telemetry, and Python ML apps.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* BEAT 3: STORYTELLING IMPACT & PROOF (RIGHT SIDE, PORTRAIT LEFT) */}
          <motion.div
            style={{ opacity: beat3Opacity, x: beat3X, pointerEvents: beat3Events as any }}
            className="absolute inset-0 z-20 flex items-center pt-24 pb-12 pointer-events-none will-change-[transform,opacity]"
          >
            <div className="max-w-7xl w-full mx-auto px-10 grid grid-cols-12">
              <div className="col-start-7 col-span-6 text-left max-h-[calc(100svh-128px)] flex flex-col justify-center">
                <span className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase block mb-2">
                  02 / REAL BUSINESS IMPACT
                </span>
                <h2 className="font-heading text-[clamp(1.75rem,3.6vh,2.75rem)] font-black text-white tracking-tight leading-[1.04] mb-3">
                  BUILT TO CUT MANUAL WORK &amp; <span className="text-accent">DOUBLE CONVERSIONS.</span>
                </h2>
                <p className="text-[clamp(0.78rem,1.5vh,0.95rem)] text-brand-secondary leading-relaxed mb-5">
                  Over 5 years of remote delivery across the UK, USA, Saudi Arabia, UAE, Germany, and APAC. Every build replaces slow templates with measurable speed and automation.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-surface-1/90 border border-white/[0.1]">
                    <div className="font-heading text-3xl font-black text-accent">1,200+</div>
                    <div className="font-mono text-[10px] tracking-widest text-brand-muted uppercase mt-1">Projects Delivered</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-surface-1/90 border border-white/[0.1]">
                    <div className="font-heading text-3xl font-black text-white">100%</div>
                    <div className="font-mono text-[10px] tracking-widest text-brand-muted uppercase mt-1">Upwork Job Success</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-surface-1/90 border border-white/[0.1]">
                    <div className="font-heading text-3xl font-black text-white">&lt;600ms</div>
                    <div className="font-mono text-[10px] tracking-widest text-brand-muted uppercase mt-1">AI Voice Latency</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-surface-1/90 border border-white/[0.1]">
                    <div className="font-heading text-3xl font-black text-accent">9 Countries</div>
                    <div className="font-mono text-[10px] tracking-widest text-brand-muted uppercase mt-1">Global Client Base</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* BEAT 4: TEXT TUCKS BEHIND CENTER ZOOMING-OUT PORTRAIT (z-10) */}
          <motion.div
            style={{ opacity: beat4Opacity, scale: beat4Scale, pointerEvents: beat4Events as any }}
            className="absolute inset-0 z-10 flex items-center pointer-events-none will-change-[transform,opacity]"
          >
            <div className="max-w-7xl w-full mx-auto px-10 grid grid-cols-12 gap-6 items-center">
              <motion.div
                style={{ x: beat4LeftX }}
                className="col-span-4 text-left bg-surface-1/80 backdrop-blur-md p-6 rounded-2xl border border-white/[0.08] will-change-transform"
              >
                <span className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase block mb-2">
                  03 / WHITE-LABEL &amp; DIRECT
                </span>
                <h3 className="font-heading text-2xl font-black text-white mb-2">
                  YOUR AGENCY SELLS. I BUILD.
                </h3>
                <p className="text-sm text-brand-secondary leading-relaxed">
                  Invisible senior engineering under strict NDA, fast sprint handoffs, and clean documentation for UK, EU, and US teams.
                </p>
                <div className="mt-4 pt-3 border-t border-white/[0.08] font-mono text-[11px] text-white/90">
                  <a href={CONTACT_INFO.upwork} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    Verified 5.0 ★ Upwork Profile
                  </a>
                </div>
              </motion.div>

              <div className="col-span-4" />

              <motion.div
                style={{ x: beat4RightX }}
                className="col-span-4 justify-self-end max-w-[380px] text-left bg-surface-1/80 backdrop-blur-md p-6 rounded-2xl border border-white/[0.08] will-change-transform"
              >
                <span className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase block mb-2">
                  04 / NEXT STEP
                </span>
                <h3 className="font-heading text-2xl font-black text-white mb-2">
                  EXPLORE THE WORK.
                </h3>
                <p className="text-sm text-brand-secondary leading-relaxed mb-4">
                  Inspect 28 client website redesigns and 6 live BI &amp; ML dashboards directly below.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={scrollToPortfolio}
                    className="px-5 py-2.5 rounded-full bg-accent text-black hover:bg-white transition-all font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>See Portfolio</span>
                    <ArrowDown size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={onOpenInquiry}
                    className="px-5 py-2.5 rounded-full bg-surface-2 text-white border border-white/15 hover:border-accent transition-all font-mono text-[11px] font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Book Call
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom Scroll Indicator */}
          <div className="relative z-40 w-full max-w-7xl mx-auto px-10 flex items-center justify-between text-[10px] font-mono tracking-[0.2em] text-brand-muted uppercase">
            <span>SCROLL TO EXPLORE STORY</span>
            <span className="text-accent">SHEHARYAR SIRAJ</span>
          </div>
        </div>
      </section>
    </>
  );
};
