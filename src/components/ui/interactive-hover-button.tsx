import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export function InteractiveHoverButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'group relative w-auto cursor-pointer overflow-hidden rounded-full border border-accent/40 bg-surface-1 px-6 py-2.5 text-center font-mono text-xs font-bold uppercase tracking-wider text-white transition-colors hover:border-accent',
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-center gap-2.5">
        <div className="h-2 w-2 rounded-full bg-accent transition-all duration-300 group-hover:scale-[100.8]" />
        <span className="inline-block transition-all duration-300 group-hover:translate-x-10 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className="absolute inset-0 z-10 flex translate-x-10 items-center justify-center gap-2 text-black opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        <span>{children}</span>
        <ArrowRight size={14} />
      </div>
    </button>
  );
}
