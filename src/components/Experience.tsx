import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EXPERIENCES } from '../data/portfolioData';

export const Experience: React.FC = () => {
  // First role open by default
  const [openId, setOpenId] = useState<string>('crossing-hurdles');

  const toggleExperience = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="experience" className="scroll-mt-16 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1600px]">
        {/* Section Header */}
        <header className="relative mb-12 sm:mb-16">
          <div aria-hidden="true" className="h-px w-full origin-left bg-[var(--line)] mb-5" />
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
            <span className="font-mono text-[11px] tracking-[0.24em] text-[var(--primary)] uppercase font-semibold">
              S/03 — TRACK RECORD
            </span>
            <p className="max-w-sm font-mono text-[11px] leading-relaxed tracking-[0.06em] text-[var(--muted-foreground)] uppercase">
              Expand a role to read responsibilities and stack.
            </p>
          </div>
          <h2 className="relative mt-5 text-[clamp(2.1rem,7.6vw,6rem)] font-extrabold uppercase tracking-tight focus:outline-none">
            <span className="block text-[var(--foreground)]">Experience</span>
          </h2>
        </header>

        {/* Roles List */}
        <ul>
          {EXPERIENCES.map((exp, idx) => {
            const isOpen = openId === exp.id;
            const numStr = `0${idx + 1}`;

            return (
              <li
                key={exp.id}
                className={`group/row relative border-t border-[var(--line)] transition-colors duration-500 last:border-b hover:border-[var(--primary)]/30 ${
                  isOpen ? 'bg-[#0f1115]/60' : 'hover:bg-white/[0.015]'
                }`}
              >
                {/* Gradient background when active */}
                {isOpen && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 transition-opacity duration-700 opacity-100"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(231, 233, 236, 0.04), transparent 60%)',
                    }}
                  />
                )}

                {/* Header row button */}
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggleExperience(exp.id)}
                  className="relative grid w-full grid-cols-1 gap-2 py-6 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] sm:grid-cols-12 sm:items-baseline sm:gap-6"
                >
                  {/* Number */}
                  <span className="sm:col-span-1">
                    <span
                      className={`block font-mono text-[11px] tracking-[0.2em] transition-opacity duration-500 ${
                        isOpen ? 'text-[var(--primary)] opacity-100 font-bold' : 'text-[var(--muted-foreground)] opacity-60'
                      }`}
                    >
                      {numStr}
                    </span>
                  </span>

                  {/* Title & Company */}
                  <span className="sm:col-span-6">
                    <span
                      className={`font-display block text-[clamp(1.2rem,2.9vw,2.1rem)] font-extrabold uppercase transition-all duration-300 ${
                        isOpen
                          ? 'text-[var(--primary)] translate-x-1'
                          : 'text-[var(--foreground)] group-hover/row:text-[var(--primary)] group-hover/row:translate-x-1'
                      }`}
                    >
                      {exp.role}
                    </span>
                    <span className="mt-1 block font-mono text-[11px] tracking-[0.16em] text-[var(--muted-foreground)] uppercase transition-colors duration-300 group-hover/row:text-[var(--foreground)]">
                      {exp.company}
                    </span>
                  </span>

                  {/* Period & Active badge */}
                  <span className="sm:col-span-4">
                    <span className="block font-mono text-[11px] tracking-[0.16em] text-[var(--muted-foreground)] uppercase transition-colors duration-300 group-hover/row:text-[var(--foreground)]">
                      {exp.period}
                      {exp.active && (
                        <span className="ml-2.5 inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          ACTIVE
                        </span>
                      )}
                    </span>
                  </span>

                  {/* Toggle Indicator */}
                  <span className="font-mono text-base text-[var(--muted-foreground)] sm:col-span-1 sm:text-right">
                    <span
                      aria-hidden="true"
                      className={`inline-block transition-transform duration-300 ${
                        isOpen
                          ? 'rotate-45 text-[var(--primary)] scale-125 font-bold'
                          : 'group-hover/row:scale-110 group-hover/row:text-[var(--primary)]'
                      }`}
                    >
                      +
                    </span>
                  </span>
                </button>

                {/* Expanded Details Drawer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-10 sm:grid-cols-12 pt-2">
                        {/* Summary & Tech badges */}
                        <div className="sm:col-span-5 sm:col-start-2">
                          <p className="max-w-md text-sm leading-relaxed text-[var(--muted-foreground)]">
                            {exp.description}
                          </p>
                          <div className="mt-5 flex flex-wrap gap-x-2 gap-y-2">
                            {exp.skills.map((skill, skIdx) => (
                              <span
                                key={skIdx}
                                className="font-mono text-[10px] tracking-[0.16em] text-[var(--foreground-secondary)] uppercase bg-white/[0.03] border border-[var(--border)] px-2.5 py-1"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Bulleted Points */}
                        <ul className="sm:col-span-6 space-y-1">
                          {exp.bulletPoints.map((pt, pIdx) => (
                            <li
                              key={pIdx}
                              className="flex gap-3 border-b border-[var(--line)] py-3 text-sm text-[var(--foreground)]/85 leading-relaxed"
                            >
                              <span className="mt-2 inline-block size-1 shrink-0 bg-[var(--primary)]" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
