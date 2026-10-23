import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 rounded-xl glass-panel border border-brand-border/40 inline-flex items-center gap-2 text-xs font-mono text-brand-secondary">
      <Link to="/" className="flex items-center gap-1.5 hover:text-accent transition-colors">
        <Home size={13} className="text-accent" />
        <span>HOME</span>
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={item.label}>
            <ChevronRight size={12} className="text-brand-muted opacity-60" />
            {isLast || !item.href ? (
              <span className="text-white font-semibold truncate max-w-[200px] sm:max-w-none" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link to={item.href} className="hover:text-accent transition-colors truncate max-w-[150px] sm:max-w-none">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
