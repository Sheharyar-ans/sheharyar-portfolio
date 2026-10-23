import React, { useState, useEffect, useRef } from 'react';
import { FighterChallenge } from '../../data/arcadeChallenges';
import { arcadeAudio } from '../../utils/arcadeAudio';
import { 
  Swords, 
  Shield, 
  Zap, 
  Flame, 
  RotateCcw, 
  Trophy, 
  Skull, 
  Heart,
  Sparkles
} from 'lucide-react';

interface FighterArenaCanvasProps {
  challenge: FighterChallenge;
  isAttacking: boolean;
  attackSuccess: boolean | null; // true = player hit, false = boss counter-attack, null = idle
  attackDamage: number;
  onFightResult: (victory: boolean) => void;
  onNextBoss: () => void;
}

export const FighterArenaCanvas: React.FC<FighterArenaCanvasProps> = ({
  challenge,
  isAttacking,
  attackSuccess,
  attackDamage,
  onFightResult,
  onNextBoss
}) => {
  const [playerHp, setPlayerHp] = useState<number>(100);
  const [bossHp, setBossHp] = useState<number>(100);
  const [comboCount, setComboCount] = useState<number>(0);
  const [playerAction, setPlayerAction] = useState<'idle' | 'attack' | 'hit' | 'victory'>('idle');
  const [bossAction, setBossAction] = useState<'idle' | 'attack' | 'hit' | 'ko'>('idle');
  const [floatingText, setFloatingText] = useState<{ text: string; isCrit: boolean; side: 'left' | 'right' } | null>(null);

  const resetBattle = () => {
    setPlayerHp(100);
    setBossHp(100);
    setPlayerAction('idle');
    setBossAction('idle');
    setFloatingText(null);
  };

  // Reset when challenge changes
  useEffect(() => {
    resetBattle();
  }, [challenge.id]);

  // Handle attack event from code execution
  useEffect(() => {
    if (!isAttacking || attackSuccess === null) return;

    if (attackSuccess) {
      // Player strikes boss!
      setPlayerAction('attack');
      arcadeAudio.playPunch();

      setTimeout(() => {
        setBossAction('hit');
        arcadeAudio.playHit();
        const nextBossHp = Math.max(0, bossHp - attackDamage);
        setBossHp(nextBossHp);
        setComboCount((prev) => prev + 1);

        setFloatingText({
          text: `-${attackDamage} HP! CRITICAL HIT`,
          isCrit: true,
          side: 'right'
        });

        if (nextBossHp <= 0) {
          setTimeout(() => {
            setBossAction('ko');
            setPlayerAction('victory');
            arcadeAudio.playLevelUp();
            onFightResult(true);
          }, 450);
        } else {
          setTimeout(() => {
            setPlayerAction('idle');
            setBossAction('idle');
            setFloatingText(null);
          }, 800);
        }
      }, 350);

    } else {
      // Failed code: Boss counter-attacks player!
      setBossAction('attack');
      arcadeAudio.playLaser();

      setTimeout(() => {
        setPlayerAction('hit');
        arcadeAudio.playHit();
        const counterDmg = 25;
        const nextPlayerHp = Math.max(0, playerHp - counterDmg);
        setPlayerHp(nextPlayerHp);
        setComboCount(0);

        setFloatingText({
          text: `-${counterDmg} HP! COUNTER-STRIKE`,
          isCrit: false,
          side: 'left'
        });

        if (nextPlayerHp <= 0) {
          setTimeout(() => {
            setPlayerAction('hit');
            arcadeAudio.playError();
            onFightResult(false);
          }, 450);
        } else {
          setTimeout(() => {
            setPlayerAction('idle');
            setBossAction('idle');
            setFloatingText(null);
          }, 800);
        }
      }, 350);
    }
  }, [isAttacking, attackSuccess, attackDamage]);

  return (
    <div 
      className="relative flex flex-col h-full w-full bg-black/90 rounded-2xl border border-brand-border/80 overflow-hidden font-mono select-none"
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
    >
      {/* Top Arcade HUD: Health Bars & Fighters Info */}
      <div className="p-4 bg-surface-1/90 border-b border-brand-border/60 z-20">
        <div className="grid grid-cols-12 gap-3 items-center">
          {/* Player HP (Cols 1-5) */}
          <div className="col-span-5 flex flex-col">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-cyan-400 flex items-center gap-1.5 truncate">
                <Heart size={12} className="text-red-400 fill-red-400 flex-shrink-0" />
                <span>P1: CYBER_ADEPT</span>
              </span>
              <span className="text-[10px] text-brand-muted">{playerHp} / 100</span>
            </div>
            {/* HP Bar */}
            <div className="h-3 w-full bg-zinc-900 rounded-full overflow-hidden p-0.5 border border-cyan-500/30">
              <div 
                className="h-full rounded-full transition-all duration-300 shadow-[0_0_10px_#06b6d4]"
                style={{
                  width: `${playerHp}%`,
                  background: playerHp > 40 ? 'linear-gradient(90deg, #06b6d4, #22d3ee)' : 'linear-gradient(90deg, #ef4444, #f97316)'
                }}
              />
            </div>
          </div>

          {/* Center VS Indicator & Combo (Cols 6-7) */}
          <div className="col-span-2 flex flex-col items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-zinc-900 border border-brand-border flex items-center justify-center shadow-lg">
              <span className="text-xs font-black italic text-amber-400">VS</span>
            </div>
            {comboCount > 1 && (
              <span className="text-[9px] font-black text-amber-400 animate-pulse mt-1">
                {comboCount}x COMBO!
              </span>
            )}
          </div>

          {/* Boss HP (Cols 8-12) */}
          <div className="col-span-5 flex flex-col text-right">
            <div className="flex items-center justify-between text-xs mb-1 flex-row-reverse">
              <span className="font-bold text-red-400 flex items-center gap-1.5 truncate">
                <Skull size={12} className="text-red-500 flex-shrink-0" />
                <span className="truncate">{challenge.bossName}</span>
              </span>
              <span className="text-[10px] text-brand-muted">{bossHp} / 100</span>
            </div>
            {/* HP Bar */}
            <div className="h-3 w-full bg-zinc-900 rounded-full overflow-hidden p-0.5 border border-red-500/30">
              <div 
                className="h-full rounded-full transition-all duration-300 ml-auto shadow-[0_0_10px_#ef4444]"
                style={{
                  width: `${bossHp}%`,
                  background: 'linear-gradient(90deg, #ef4444, #f43f5e)'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2D Combat Arena Stage */}
      <div className="relative flex-1 flex items-end justify-between px-6 pb-12 overflow-hidden bg-gradient-to-b from-indigo-950/20 via-black to-zinc-950">
        {/* Retro Grid Floor */}
        <div 
          className="absolute inset-x-0 bottom-0 h-28 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(99, 102, 241, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(99, 102, 241, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px',
            transform: 'perspective(200px) rotateX(60deg)'
          }}
        />

        {/* Ambient CRT Scanline Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black/80 pointer-events-none" />

        {/* Floating Combat Damage Text */}
        {floatingText && (
          <div 
            className={`absolute top-1/3 z-30 font-black text-sm px-3 py-1 rounded-lg backdrop-blur-md shadow-2xl animate-bounce ${
              floatingText.side === 'right' 
                ? 'right-12 bg-amber-500/30 text-amber-300 border border-amber-400 shadow-[0_0_20px_#f59e0b]' 
                : 'left-12 bg-red-500/30 text-red-300 border border-red-400 shadow-[0_0_20px_#ef4444]'
            }`}
          >
            {floatingText.text}
          </div>
        )}

        {/* Player Character (Left) */}
        <div className="relative z-10 flex flex-col items-center">
          <div 
            className={`relative transition-all duration-300 transform ${
              playerAction === 'attack' 
                ? 'translate-x-14 scale-110' 
                : playerAction === 'hit' 
                ? '-translate-x-6 opacity-70 filter brightness-150' 
                : playerAction === 'victory'
                ? 'scale-125 -translate-y-4'
                : 'animate-pulse'
            }`}
          >
            {/* Cyber Ninja Bot Body */}
            <div className="w-20 h-28 rounded-2xl bg-gradient-to-b from-cyan-500 to-blue-700 border-2 border-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.6)] flex flex-col items-center justify-center p-2 relative">
              {/* Visor */}
              <div className="w-14 h-4 rounded-full bg-black border border-cyan-200 flex items-center justify-center mb-2 shadow-inner">
                <div className="w-10 h-1 bg-cyan-300 animate-pulse rounded-full" />
              </div>
              <Swords size={28} className="text-white drop-shadow-[0_0_8px_#ffffff]" />
              {/* Plasma Katana Glow when attacking */}
              {playerAction === 'attack' && (
                <div className="absolute -right-8 top-6 w-16 h-2 bg-gradient-to-r from-cyan-300 to-transparent shadow-[0_0_15px_#22d3ee] rounded-full animate-ping" />
              )}
            </div>

            {/* Shadow under player */}
            <div className="w-20 h-3 bg-cyan-500/20 rounded-full blur-sm mx-auto mt-2" />
          </div>
          <span className="text-[10px] text-cyan-400 font-bold mt-2 tracking-widest uppercase">
            YOU
          </span>
        </div>

        {/* Boss Challenger (Right) */}
        <div className="relative z-10 flex flex-col items-center">
          <div 
            className={`relative transition-all duration-300 transform ${
              bossAction === 'attack' 
                ? '-translate-x-14 scale-110' 
                : bossAction === 'hit' 
                ? 'translate-x-6 opacity-60 filter brightness-200' 
                : bossAction === 'ko'
                ? 'translate-y-8 rotate-90 opacity-40'
                : 'animate-pulse'
            }`}
          >
            {/* Boss Titan Body */}
            <div className="w-24 h-32 rounded-3xl bg-gradient-to-b from-red-600 via-purple-900 to-black border-2 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.7)] flex flex-col items-center justify-center p-2 relative">
              {/* Menacing Eye Cluster */}
              <div className="flex gap-1.5 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400 animate-ping" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-red-400 animate-ping" />
              </div>
              <Flame size={32} className="text-red-400 drop-shadow-[0_0_12px_#ef4444]" />
              {/* Laser blast beam when boss counter-attacks */}
              {bossAction === 'attack' && (
                <div className="absolute -left-10 top-10 w-20 h-3 bg-gradient-to-l from-red-500 to-transparent shadow-[0_0_15px_#ef4444] rounded-full animate-ping" />
              )}
            </div>

            {/* Shadow under boss */}
            <div className="w-24 h-3 bg-red-500/20 rounded-full blur-sm mx-auto mt-2" />
          </div>
          <span className="text-[10px] text-red-400 font-bold mt-2 tracking-widest uppercase truncate max-w-[120px]">
            {challenge.bossName}
          </span>
        </div>

        {/* K.O. Victory Overlay */}
        {bossHp <= 0 && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md z-40 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
            <Trophy size={48} className="text-amber-400 mb-3 animate-bounce shadow-[0_0_30px_#f59e0b]" />
            <h3 className="text-3xl sm:text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 mb-2">
              K.O. - VICTORY!
            </h3>
            <p className="text-xs text-brand-muted max-w-sm mb-6">
              You dismantled <span className="text-red-400 font-bold">{challenge.bossName}</span> with optimal algorithmic precision!
            </p>
            <button
              onClick={() => {
                arcadeAudio.playClick();
                onNextBoss();
              }}
              className="px-6 py-2.5 rounded-xl bg-accent text-black font-bold text-xs uppercase tracking-wider hover:scale-105 transition-all shadow-[0_0_20px_rgba(183,255,60,0.5)] flex items-center gap-2"
            >
              <span>Next Challenger (Endless)</span>
              <Swords size={14} />
            </button>
          </div>
        )}

        {/* Defeat Overlay */}
        {playerHp <= 0 && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md z-40 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
            <Skull size={48} className="text-red-500 mb-3 animate-pulse" />
            <h3 className="text-3xl sm:text-4xl font-black italic text-red-500 mb-2">
              DEFEAT - CRUSHED
            </h3>
            <p className="text-xs text-brand-muted max-w-sm mb-6">
              The boss countered your erroneous algorithm. Inspect your code logic and try again!
            </p>
            <button
              onClick={() => {
                arcadeAudio.playClick();
                resetBattle();
              }}
              className="px-6 py-2.5 rounded-xl bg-surface-2 border border-brand-border text-white font-bold text-xs uppercase tracking-wider hover:border-accent transition-all flex items-center gap-2"
            >
              <RotateCcw size={14} />
              <span>Retry Battle</span>
            </button>
          </div>
        )}
      </div>

      {/* Fight Story & Action Bar Footer */}
      <div className="p-3 bg-surface-1 border-t border-brand-border/60 flex items-center justify-between text-xs text-brand-muted">
        <div className="truncate text-[11px] max-w-[80%]">
          <span className="text-zinc-500 font-bold uppercase">CHALLENGER INFO: </span>
          <span className="text-zinc-300">{challenge.bossTitle}</span>
        </div>
        <button
          onClick={() => {
            arcadeAudio.playClick();
            resetBattle();
          }}
          className="text-[10px] text-brand-muted hover:text-white transition-colors"
          title="Reset Battle"
        >
          Reset Match
        </button>
      </div>
    </div>
  );
};
