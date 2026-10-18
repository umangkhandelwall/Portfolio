import React from 'react';

const TICKER_ITEMS = [
  'FULL-STACK ARCHITECT',
  'NEXT.JS APP ROUTER',
  'POSTGRESQL & PRISMA',
  'LLM BENCHMARKING',
  'TERMINALBENCH 2 & HARBOR FORMAT',
  'DETERMINISTIC VERIFIERS',
  'RAG & VECTOR SEARCH',
  '95+ LIGHTHOUSE SCORES',
  'REDIS SLIDING-WINDOW RATE LIMITING',
  'DOCKER TESTBEDS',
  'OPEN TO SDE & AI ROLES',
  'SYSTEM ONLINE // 2026',
];

export const TelemetryTicker: React.FC = () => {
  return (
    <div
      aria-label="Engineering Status Ticker"
      className="relative z-10 w-full overflow-hidden border-y border-[var(--line)] bg-[#050608]/90 py-3 backdrop-blur-sm"
    >
      <div className="flex w-max animate-ticker items-center gap-8 font-mono text-[11px] tracking-[0.24em] uppercase text-[var(--muted-foreground)] hover:[animation-play-state:paused]">
        {/* Double array for infinite loop illusion */}
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 shrink-0">
            <span className="hover:text-[var(--primary)] transition-colors">
              {item}
            </span>
            <span className="text-[var(--primary)]/60 text-[9px]" aria-hidden="true">
              ◆
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
