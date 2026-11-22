import React, { useState } from 'react';
import { cn } from '../../lib/utils';

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

export interface FaqAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: FaqItem[];
  defaultOpenIndex?: number | null;
}

/**
 * VengeanceUI FaqAccordion — adapted to dark #080808 / #111111 / #FACC15 architecture
 */
export function FaqAccordion({
  items,
  defaultOpenIndex = 0,
  className,
  ...props
}: FaqAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(defaultOpenIndex);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={cn('w-full relative', className)} {...props}>
      <ul className="w-full list-none p-0 flex flex-col gap-3">
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <li
              key={item.question}
              className={cn(
                'w-full relative rounded-2xl overflow-hidden border transition-all duration-300',
                isActive
                  ? 'border-accent/45 bg-[#111215]/95 shadow-[0_0_25px_rgba(250,204,21,0.08)]'
                  : 'border-white/[0.08] bg-[#0e0e10]/85 hover:border-white/[0.2]'
              )}
            >
              <button
                type="button"
                className={cn(
                  'flex flex-row items-center justify-between w-full min-h-[60px] py-4 sm:py-5 relative px-5 pl-14 cursor-pointer',
                  'border-l-[5px] transition-colors duration-200 text-left outline-none',
                  isActive
                    ? 'border-l-accent text-white font-semibold'
                    : 'border-l-white/15 text-white/90 hover:border-l-accent/50'
                )}
                onClick={() => toggleItem(index)}
                aria-expanded={isActive}
              >
                <span
                  className={cn(
                    'absolute left-5 top-1/2 -translate-y-1/2 transition-all duration-200 leading-none font-mono',
                    isActive ? 'text-2xl text-accent' : 'text-xl text-brand-muted'
                  )}
                >
                  {isActive ? '−' : '+'}
                </span>

                <span className="pr-8 text-sm sm:text-base font-heading">{item.question}</span>

                <span
                  className={cn(
                    'shrink-0 block w-2 h-2 border-t-2 border-r-2 transition-transform duration-200 ease-in-out',
                    isActive ? 'rotate-[-45deg] border-accent' : 'rotate-[135deg] border-brand-muted'
                  )}
                />
              </button>

              <div
                className={cn(
                  'grid transition-all duration-300 ease-in-out w-full border-l-[5px]',
                  isActive ? 'grid-rows-[1fr] border-l-accent' : 'grid-rows-[0fr] border-l-white/15'
                )}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pl-14 pb-5 pt-1 text-xs sm:text-sm text-brand-secondary leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FaqAccordion;
