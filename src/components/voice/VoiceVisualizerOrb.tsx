import React from 'react';
import { Mic, Volume2, Sparkles, Loader2, Radio } from 'lucide-react';

export type VisualizerState = 'idle' | 'listening' | 'thinking' | 'speaking';

interface VoiceVisualizerOrbProps {
  state: VisualizerState;
  audioLevel: number; // 0 to 1
  onClick?: () => void;
}

export const VoiceVisualizerOrb: React.FC<VoiceVisualizerOrbProps> = ({
  state,
  audioLevel,
  onClick
}) => {
  // Scale pulse based on audio level
  const pulseScale = 1 + Math.min(0.45, audioLevel * 0.85);

  return (
    <div className="relative flex items-center justify-center w-48 h-48 sm:w-56 sm:h-56 select-none">
      {/* Outer Atmospheric Aura */}
      <div
        className={`absolute inset-0 rounded-full blur-2xl transition-all duration-700 pointer-events-none ${
          state === 'listening'
            ? 'bg-emerald-500/25 scale-110'
            : state === 'speaking'
            ? 'bg-cyan-500/30 scale-125'
            : state === 'thinking'
            ? 'bg-purple-500/25 scale-110'
            : 'bg-emerald-500/10 scale-90'
        }`}
      />

      {/* Dynamic Animated Pulse Rings (Active when Listening or Speaking) */}
      {(state === 'listening' || state === 'speaking') && (
        <>
          <div
            className="absolute rounded-full border border-cyan-400/40 pointer-events-none transition-transform duration-75"
            style={{
              width: '100%',
              height: '100%',
              transform: `scale(${pulseScale * 1.08})`,
              opacity: 0.7 - audioLevel * 0.2
            }}
          />
          <div
            className="absolute rounded-full border border-emerald-400/30 pointer-events-none transition-transform duration-100"
            style={{
              width: '100%',
              height: '100%',
              transform: `scale(${pulseScale * 1.22})`,
              opacity: 0.5 - audioLevel * 0.3
            }}
          />
        </>
      )}

      {/* Rotating Thinking Shimmer */}
      {state === 'thinking' && (
        <div className="absolute inset-2 rounded-full border-2 border-dashed border-purple-400/50 animate-spin duration-3000 pointer-events-none" />
      )}

      {/* Center Interactive Orb Button */}
      <button
        onClick={onClick}
        type="button"
        aria-label={`Voice assistant orb - status: ${state}`}
        className={`relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center p-4 transition-all duration-300 shadow-2xl backdrop-blur-xl border ${
          state === 'listening'
            ? 'bg-gradient-to-tr from-emerald-600/90 to-teal-500/90 border-emerald-300/60 shadow-emerald-500/40'
            : state === 'speaking'
            ? 'bg-gradient-to-tr from-cyan-600/90 to-blue-500/90 border-cyan-300/60 shadow-cyan-500/40'
            : state === 'thinking'
            ? 'bg-gradient-to-tr from-purple-700/90 to-indigo-600/90 border-purple-300/60 shadow-purple-500/40'
            : 'bg-zinc-900/90 border-zinc-700/60 hover:border-emerald-500/50 shadow-black/60'
        }`}
        style={{
          transform: `scale(${state === 'listening' || state === 'speaking' ? pulseScale : 1})`
        }}
      >
        {/* Core State Icon */}
        <div className="text-white drop-shadow-md">
          {state === 'listening' && <Mic className="w-8 h-8 animate-pulse" />}
          {state === 'speaking' && <Volume2 className="w-8 h-8 animate-bounce" />}
          {state === 'thinking' && <Loader2 className="w-8 h-8 animate-spin" />}
          {state === 'idle' && <Radio className="w-8 h-8 text-zinc-400 group-hover:text-emerald-400" />}
        </div>

        {/* State Label */}
        <span className="mt-1 text-[11px] font-mono tracking-wider uppercase font-semibold text-white/90 drop-shadow">
          {state === 'listening' && 'Listening'}
          {state === 'speaking' && 'Speaking'}
          {state === 'thinking' && 'Thinking'}
          {state === 'idle' && 'Tap Mic'}
        </span>
      </button>
    </div>
  );
};
