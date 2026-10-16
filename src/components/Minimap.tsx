import React from 'react';

interface MinimapProps {
  activeSection: string;
}

export const Minimap: React.FC<MinimapProps> = ({ activeSection }) => {
  const sections = [
    { id: 'intro', num: '01', label: 'Intro' },
    { id: 'skills', num: '02', label: 'Skills' },
    { id: 'experience', num: '03', label: 'Experience' },
    { id: 'projects', num: '04', label: 'Projects' },
    { id: 'education', num: '05', label: 'Education' },
    { id: 'connect', num: '06', label: 'Connect' },
  ];

  const currentItem = sections.find((s) => s.id === activeSection) || sections[0];

  return (
    <nav
      aria-label="Section minimap"
      className="fixed top-1/2 right-6 xl:right-8 2xl:right-10 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 min-[1480px]:flex select-none"
    >
      {sections.map((s) => {
        const isActive = activeSection === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group flex items-center gap-3 py-1"
            aria-current={isActive ? 'true' : undefined}
          >
            <span
              className={`font-mono text-[10px] tracking-[0.2em] uppercase transition-opacity duration-300 ${
                isActive
                  ? 'text-[var(--primary)] opacity-100 font-semibold'
                  : 'text-[var(--muted-foreground)] opacity-0 group-hover:opacity-100'
              }`}
            >
              {s.num} {s.label}
            </span>
            <span
              className={`h-px transition-all duration-300 ${
                isActive
                  ? 'w-8 bg-[var(--primary)] shadow-[0_0_8px_rgba(255,255,255,0.7)]'
                  : 'w-3.5 bg-[var(--border)] group-hover:w-6 group-hover:bg-[var(--primary-strong)]'
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
};
