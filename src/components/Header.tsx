import React, { useState } from 'react';
import { PERSONAL_INFO, RESUME_PATH } from '../data/portfolioData';
import { Bot, Sparkles, X, Menu, FileDown, ExternalLink } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  scrollProgress: number;
  onOpenAiAssistant: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  scrollProgress,
  onOpenAiAssistant,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'intro', num: 'S/01', label: 'Intro' },
    { id: 'skills', num: 'S/02', label: 'Skills' },
    { id: 'experience', num: 'S/03', label: 'Experience' },
    { id: 'projects', num: 'S/04', label: 'Projects' },
    { id: 'education', num: 'S/05', label: 'Education' },
    { id: 'connect', num: 'S/06', label: 'Connect' },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[52px] bg-[#020202]/95 backdrop-blur-md border-b border-[var(--line)]">
      <div className="mx-auto flex h-[51px] max-w-[1600px] items-center justify-between gap-3 px-4 sm:gap-8 sm:px-8">
        {/* Brand / Logo */}
        <a
          href="#intro"
          className="group flex shrink-0 items-baseline gap-2 sm:gap-3 transition-opacity hover:opacity-85"
        >
          <span className="font-display shrink-0 text-[clamp(0.75rem,2.5vw,0.925rem)] font-extrabold tracking-[-0.045em] lowercase text-[var(--foreground)]">
            {PERSONAL_INFO.handle}
          </span>
          <span
            className="status-indicator label-mono inline-flex w-max shrink-0 items-baseline gap-1.5 whitespace-nowrap text-[10px] tracking-[0.14em]"
          >
            <span aria-hidden="true" className="status-dot" />
            <span className="text-[var(--muted-foreground)]">SYS:</span>
            <span aria-hidden="true" className="status-link" />
            <span className="status-online font-mono text-[var(--foreground)]">
              {PERSONAL_INFO.status}
            </span>
          </span>
        </a>

        {/* Desktop Navigation (>=1100px matches reference) */}
        <nav
          aria-label="Sections"
          className="hidden min-w-0 items-center gap-3 min-[1100px]:flex min-[1240px]:gap-5"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative pb-1 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 ${
                  isActive
                    ? 'text-[var(--primary)] font-medium'
                    : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                }`}
              >
                <span
                  className={`mr-1.5 transition-opacity duration-300 ${
                    isActive ? 'opacity-90 text-[var(--primary-strong)]' : 'opacity-40'
                  }`}
                >
                  {item.num}
                </span>
                {item.label}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-1 h-px overflow-hidden bg-[var(--primary)] shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                )}
              </a>
            );
          })}

          {/* AI Assistant Quick Trigger */}
          <button
            type="button"
            onClick={onOpenAiAssistant}
            className="inline-flex items-center gap-2 border border-[var(--border)] bg-[#0d0f12] px-3 py-1 font-mono text-[11px] tracking-[0.16em] uppercase text-[var(--foreground)] transition-all hover:border-[var(--primary)] hover:text-[var(--primary)] hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] cursor-pointer"
          >
            <Sparkles className="size-3 text-[var(--primary)]" />
            <span>Ask AI</span>
          </button>

          {/* Resume View / Download Button */}
          <a
            href={RESUME_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[var(--border)] px-3.5 py-1 font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--foreground)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-white/[0.03]"
          >
            Resume
          </a>
        </nav>

        {/* Right side mobile / tablet controls (<1100px) */}
        <div className="flex items-center gap-2.5 min-[1100px]:hidden">
          <button
            type="button"
            onClick={onOpenAiAssistant}
            aria-label="Ask AI"
            className="flex items-center gap-1.5 border border-[var(--border)] px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--foreground)] hover:border-[var(--primary)] cursor-pointer"
          >
            <Sparkles className="size-3 text-[var(--primary)]" />
            <span>AI</span>
          </button>

          <a
            href={RESUME_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[var(--border)] px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--foreground)] hover:border-[var(--primary)]"
          >
            Resume
          </a>

          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="shrink-0 flex items-center gap-1.5 border border-[var(--border)] px-2.5 py-1 font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--foreground)] hover:border-[var(--primary)] hover:text-white transition-colors cursor-pointer"
          >
            <span>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
            {mobileMenuOpen ? <X className="size-3.5" /> : <Menu className="size-3.5" />}
          </button>
        </div>
      </div>

      {/* Scroll Progress Bar + Pulse */}
      <div className="relative h-[1px] w-full bg-[var(--line)]">
        <div
          className="absolute inset-y-0 left-0 bg-[var(--primary)] origin-left transition-transform duration-100 ease-out"
          style={{ transform: `scaleX(${scrollProgress})`, width: '100%' }}
        />
        <span aria-hidden="true" className="hdr-pulse" />
      </div>

      {/* Mobile Menu Overlay (<1100px) */}
      {mobileMenuOpen && (
        <div className="min-[1100px]:hidden fixed inset-x-0 top-[49px] bottom-0 z-40 bg-[#020202]/95 backdrop-blur-xl border-b border-[var(--border)] p-6 overflow-y-auto">
          <div className="mx-auto max-w-lg flex flex-col gap-6">
            <div className="border-b border-[var(--line)] pb-4">
              <span className="label-mono">NAVIGATION MENU</span>
            </div>

            <nav className="flex flex-col gap-4">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-baseline justify-between border-b border-[var(--line)]/50 pb-3 font-mono text-sm tracking-[0.18em] uppercase ${
                      isActive ? 'text-[var(--primary)] font-bold' : 'text-[var(--muted-foreground)]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[11px] text-[var(--primary-strong)]">{item.num}</span>
                  </a>
                );
              })}
            </nav>

            {/* Quick Actions */}
            <div className="flex flex-col gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiAssistant();
                }}
                className="flex items-center justify-center gap-2.5 bg-[#121418] border border-[var(--border)] py-3 font-mono text-xs tracking-[0.18em] uppercase text-[var(--foreground)] hover:border-[var(--primary)]"
              >
                <Sparkles className="size-4 text-emerald-400" />
                <span>Ask AI About Umang</span>
              </button>

              <a
                href={RESUME_PATH}
                download="Umang-Khandelwal-Resume.pdf"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2.5 border border-[var(--border)] py-3 font-mono text-xs tracking-[0.18em] uppercase text-[var(--foreground)] hover:border-[var(--primary)]"
              >
                <FileDown className="size-4" />
                <span>Download Resume (PDF)</span>
              </a>
            </div>

            {/* Direct Links */}
            <div className="border-t border-[var(--line)] pt-4 flex justify-between items-center text-[11px] font-mono text-[var(--muted-foreground)]">
              <span>{PERSONAL_INFO.location}</span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--primary)] flex items-center gap-1"
              >
                GitHub <ExternalLink className="size-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
