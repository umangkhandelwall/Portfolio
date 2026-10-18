import React, { useState, useEffect } from 'react';

export const CursorReadout: React.FC = () => {
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [scrollPct, setScrollPct] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);

      const handleMouseMove = (e: MouseEvent) => {
        setCoords({ x: e.clientX, y: e.clientY });
      };

      const handleScroll = () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? Math.round((window.scrollY / docHeight) * 100) : 0;
        setScrollPct(pct);
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();

      return () => {
        mediaQuery.removeEventListener('change', listener);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  if (prefersReducedMotion) return null;

  const pad = (n: number, width: number = 4) => String(n).padStart(width, '0');

  return (
    <aside
      aria-label="Cursor & Telemetry Readout"
      className="pointer-events-none fixed bottom-4 left-6 z-40 hidden font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--muted-foreground)] md:flex items-center gap-3 rounded border border-white/[0.08] bg-[#050608]/85 px-3 py-1.5 backdrop-blur-md shadow-lg"
    >
      <span className="flex items-center gap-1.5 text-emerald-400">
        <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[9px] font-bold">ONLINE</span>
      </span>
      <span className="text-[var(--border)]">|</span>
      <span className="text-[var(--foreground)]">
        X:<span className="text-[var(--primary)]">{pad(coords.x)}</span> Y:<span className="text-[var(--primary)]">{pad(coords.y)}</span>
      </span>
      <span className="text-[var(--border)]">|</span>
      <span>
        SCR:<span className="text-[var(--primary)]">{scrollPct}%</span>
      </span>
    </aside>
  );
};
