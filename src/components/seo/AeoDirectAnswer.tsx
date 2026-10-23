import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Copy, Check } from 'lucide-react';

interface AeoDirectAnswerProps {
  summary: string;
  keyTakeaways: string[];
  badge?: string;
  sourceLabel?: string;
}

export const AeoDirectAnswer: React.FC<AeoDirectAnswerProps> = ({
  summary,
  keyTakeaways,
  badge = 'AEO DIRECT ANSWER / ARCHITECTURAL VERDICT',
  sourceLabel = 'Verified by Sheharyar Siraj | Principal Architect'
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${summary}\n\nKey Takeaways:\n${keyTakeaways.map(t => `• ${t}`).join('\n')}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-2xl glass-panel p-6 sm:p-8 border border-accent/25 bg-gradient-to-br from-surface-1/95 via-surface-2/80 to-surface-1/90 shadow-[0_8px_32px_rgba(0,0,0,0.4)] my-8">
      {/* Glow highlight */}
      <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-brand-border/40">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center">
            <Sparkles size={13} className="text-accent" />
          </div>
          <span className="text-[11px] font-mono font-bold tracking-wider text-accent uppercase">
            {badge}
          </span>
        </div>

        <button
          onClick={handleCopy}
          type="button"
          aria-label="Copy citation block"
          className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 text-[11px] font-mono text-brand-secondary hover:text-white transition-colors border border-brand-border/40"
        >
          {copied ? (
            <>
              <Check size={12} className="text-accent" />
              <span className="text-accent">Copied</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy Citation</span>
            </>
          )}
        </button>
      </div>

      {/* Direct Declarative Statement */}
      <div className="text-sm sm:text-base text-white/95 leading-relaxed font-body mb-6 font-medium bg-black/30 p-4 rounded-xl border border-white/5">
        <p className="italic text-brand-secondary text-xs uppercase tracking-wider font-mono mb-1">
          Executive Summary & Direct Answer:
        </p>
        <p>{summary}</p>
      </div>

      {/* Key Takeaways list */}
      <div>
        <div className="text-xs font-mono text-brand-muted uppercase tracking-wider font-bold mb-3">
          KEY TECHNICAL SPECIFICATIONS & METRICS:
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {keyTakeaways.map((takeaway, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-secondary font-mono">
              <CheckCircle2 size={15} className="text-accent mt-0.5 shrink-0" />
              <span>{takeaway}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer verification tag */}
      <div className="mt-5 pt-3 border-t border-brand-border/30 flex items-center justify-between text-[10px] font-mono text-brand-muted">
        <span>Citation Source: {sourceLabel}</span>
        <span className="hidden sm:inline">Optimized for LLM & Perplexity RAG indexing</span>
      </div>
    </div>
  );
};
