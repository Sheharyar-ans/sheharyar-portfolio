import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface SkiperLinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const SmartLink: React.FC<SkiperLinkProps> = ({ href, children, className, target, rel, onClick }) => {
  const isInternal = href.startsWith('/') && !target;
  if (isInternal) {
    return (
      <Link to={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} target={target} rel={rel} onClick={onClick}>
      {children}
    </a>
  );
};

/**
 * @skiper-ui/skiper40 — Link000 (Static baseline underline)
 */
export const Link000: React.FC<SkiperLinkProps> = ({ children, href, className, ...rest }) => (
  <SmartLink
    href={href}
    className={cn(
      'group relative inline-flex items-center',
      'before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:h-[0.06em] before:w-full before:bg-current before:content-[""]',
      className
    )}
    {...rest}
  >
    {children}
  </SmartLink>
);

/**
 * @skiper-ui/skiper40 — Link001 (Underline slides in from left, exits right)
 */
export const Link001: React.FC<SkiperLinkProps> = ({ children, href, className, ...rest }) => (
  <SmartLink
    href={href}
    className={cn(
      'group relative inline-flex items-center',
      'before:pointer-events-none before:absolute before:left-0 before:top-[1.45em] before:h-[0.06em] before:w-full before:bg-current before:content-[""]',
      'before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]',
      'hover:before:origin-left hover:before:scale-x-100',
      className
    )}
    {...rest}
  >
    {children}
  </SmartLink>
);

/**
 * @skiper-ui/skiper40 — Link002 (Underline slides in from right, exits left)
 */
export const Link002: React.FC<SkiperLinkProps> = ({ children, href, className, ...rest }) => (
  <SmartLink
    href={href}
    className={cn(
      'group relative inline-flex items-center',
      'before:pointer-events-none before:absolute before:left-0 before:top-[1.45em] before:h-[0.06em] before:w-full before:bg-current before:content-[""]',
      'before:origin-left before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]',
      'hover:before:origin-right hover:before:scale-x-100',
      className
    )}
    {...rest}
  >
    {children}
  </SmartLink>
);

/**
 * @skiper-ui/skiper40 — Link003 (Underline expands from center)
 */
export const Link003: React.FC<SkiperLinkProps> = ({ children, href, className, ...rest }) => (
  <SmartLink
    href={href}
    className={cn(
      'group relative inline-flex items-center',
      'before:pointer-events-none before:absolute before:left-0 before:top-[1.45em] before:h-[0.06em] before:w-full before:bg-current before:content-[""]',
      'before:origin-center before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]',
      'hover:before:scale-x-100',
      className
    )}
    {...rest}
  >
    {children}
  </SmartLink>
);

/**
 * @skiper-ui/skiper40 — Link004 (Underline with diagonal arrow reveal)
 */
export const Link004: React.FC<SkiperLinkProps> = ({ children, href, className, ...rest }) => (
  <SmartLink
    href={href}
    className={cn(
      'group relative inline-flex items-center gap-1',
      'before:pointer-events-none before:absolute before:left-0 before:bottom-0 before:h-[0.06em] before:w-full before:bg-current before:content-[""]',
      'before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]',
      'hover:before:origin-left hover:before:scale-x-100',
      className
    )}
    {...rest}
  >
    <span>{children}</span>
    <svg
      className="h-[0.85em] w-[0.85em] translate-y-[0.02em] transition-transform duration-300 group-hover:translate-x-[0.15em] group-hover:-translate-y-[0.12em]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  </SmartLink>
);

/**
 * @skiper-ui/skiper40 — Link005 (Inverted highlight sweep)
 */
export const Link005: React.FC<SkiperLinkProps> = ({ children, href, className, ...rest }) => (
  <SmartLink
    href={href}
    className={cn(
      'group relative inline-flex items-center px-1.5 py-0.5 overflow-hidden transition-colors duration-300',
      'before:pointer-events-none before:absolute before:inset-0 before:bg-accent/15 before:origin-left before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]',
      'hover:before:scale-x-100 hover:text-accent',
      className
    )}
    {...rest}
  >
    <span className="relative z-10">{children}</span>
  </SmartLink>
);
