import React from 'react';
import { EDUCATION, ACHIEVEMENTS } from '../data/portfolioData';

export const Education: React.FC = () => {
  return (
    <section id="education" className="scroll-mt-16 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1600px]">
        {/* Section Header */}
        <header className="relative mb-12 sm:mb-16">
          <div aria-hidden="true" className="h-px w-full origin-left bg-[var(--line)] mb-5" />
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
            <span className="font-mono text-[11px] tracking-[0.24em] text-[var(--primary)] uppercase font-semibold">
              S/05 — RECORD
            </span>
            <p className="max-w-sm font-mono text-[11px] leading-relaxed tracking-[0.06em] text-[var(--muted-foreground)] uppercase">
              Degrees, focus areas and verified achievements.
            </p>
          </div>
          <h2 className="relative mt-5 text-[clamp(2.1rem,7.6vw,6rem)] font-extrabold uppercase tracking-tight focus:outline-none">
            <span className="block text-[var(--foreground)]">Education</span>
          </h2>
        </header>

        {/* Two-Column Grid */}
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          
          {/* Left Column: Degree Cards */}
          <div className="grid gap-6 lg:col-span-7">
            {EDUCATION.map((edu, idx) => {
              const numStr = `0${idx + 1}`;
              return (
                <div
                  key={edu.id}
                  className="group/card relative titanium brushed overflow-hidden border border-[var(--border)] transition-all duration-500 hover:border-[var(--primary)]/50 bg-[#0a0c0f]"
                >
                  {/* Subtle hover glow */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
                    style={{
                      background:
                        'radial-gradient(340px circle at 50% 50%, rgba(231, 233, 236, 0.06), transparent 72%)',
                    }}
                  />

                  <article className="relative px-5 py-7 sm:px-7">
                    {/* Number & Period */}
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-mono text-[11px] tracking-[0.2em] text-[var(--primary)] font-bold">
                        {numStr}
                      </span>
                      <span className="font-mono text-[11px] tracking-[0.16em] text-[var(--muted-foreground)] uppercase group-hover/card:text-[var(--foreground)] transition-colors">
                        {edu.period}
                      </span>
                    </div>

                    {/* Degree */}
                    <h3 className="mt-3 text-[clamp(1.1rem,2.6vw,1.9rem)] font-extrabold uppercase transition-colors duration-500 text-[var(--foreground)] group-hover/card:text-[var(--primary)]">
                      {edu.degree}
                    </h3>

                    {/* Institution */}
                    <p className="mt-2 font-mono text-[11px] tracking-[0.16em] text-[var(--foreground-secondary)] uppercase">
                      {edu.institution} · <span className="text-[var(--muted-foreground)]">{edu.location}</span>
                    </p>

                    {/* Focus areas */}
                    <p className="mt-4 font-mono text-[11px] leading-relaxed tracking-[0.12em] text-[var(--foreground-secondary)] uppercase">
                      {edu.focus}
                    </p>

                    {/* Highlight */}
                    {edu.highlight && (
                      <p className="mt-4 border-t border-[var(--line)] pt-3 text-sm text-[var(--muted-foreground)] leading-relaxed">
                        <span className="label-mono mr-2 text-[var(--primary)]">HIGHLIGHT</span>
                        {edu.highlight}
                      </p>
                    )}
                  </article>
                </div>
              );
            })}
          </div>

          {/* Right Column: Verified Achievements */}
          <div className="lg:col-span-5">
            <p className="label-mono text-[var(--primary)] font-semibold">VERIFIED ACHIEVEMENTS</p>
            <ol className="mt-5 border-t border-[var(--line)]">
              {ACHIEVEMENTS.map((ach, idx) => {
                const numStr = `0${idx + 1}`;
                return (
                  <li
                    key={idx}
                    className="group/ach flex gap-5 border-b border-[var(--line)] py-5 pl-1 transition-colors duration-300 hover:border-[var(--primary)]/40 hover:bg-white/[0.01]"
                  >
                    <span className="w-10 shrink-0 font-mono text-2xl leading-none font-extrabold tabular-nums text-[var(--primary)]/50 transition-colors duration-300 group-hover/ach:text-[var(--primary)]">
                      {numStr}
                    </span>
                    <span className="flex-1 text-sm leading-relaxed text-[var(--foreground)]/80 transition-all duration-300 group-hover/ach:translate-x-1.5 group-hover/ach:text-[var(--foreground)]">
                      {ach}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

        </div>
      </div>
    </section>
  );
};
