import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

export const VoiceWaveform: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let step = 0;

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = 64;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;

      ctx.lineWidth = 2;
      ctx.strokeStyle = '#B7FF3C';

      ctx.beginPath();
      for (let x = 0; x < width; x += 4) {
        const amplitude = isPlaying ? 16 : 3;
        const y =
          height / 2 +
          Math.sin((x + step) * 0.04) * Math.cos((x - step) * 0.02) * amplitude;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      if (isPlaying) {
        step += 2.2;
      }
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [isPlaying]);

  return (
    <div className="w-full mt-4 p-3 rounded-xl bg-surface-2 border border-brand-border flex items-center gap-3">
      <button
        type="button"
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center hover:bg-accent hover:text-black transition-colors shrink-0"
        aria-label={isPlaying ? 'Pause waveform demo' : 'Play waveform demo'}
      >
        {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
      </button>
      <div className="flex-1 h-12 relative overflow-hidden flex items-center">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
      <span className="text-[11px] font-mono text-accent tracking-wider uppercase shrink-0">
        {isPlaying ? 'VAPI ACTIVE' : 'STANDBY'}
      </span>
    </div>
  );
};
