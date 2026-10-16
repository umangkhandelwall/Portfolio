import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 mx-auto max-w-[1600px] px-5 sm:px-8 border-t border-[var(--line)] pt-6 pb-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="label-mono">{PERSONAL_INFO.footerText}</span>

        <span className="label-mono text-center hidden md:inline">
          {PERSONAL_INFO.openToRoles}
        </span>

        <a
          href="#intro"
          onClick={scrollToTop}
          className="label-mono px-2 py-1 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors flex items-center gap-1"
        >
          <span>Back to top</span>
          <span>↑</span>
        </a>
      </div>
    </footer>
  );
};
