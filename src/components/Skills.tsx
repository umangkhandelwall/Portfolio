import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const Skills: React.FC = () => {
  // First item open by default like the reference
  const [openId, setOpenId] = useState<string>('ai-llm');

  const toggleCategory = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="skills" className="scroll-mt-16 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1600px]">
        {/* Section Header */}
        <header className="relative mb-12 sm:mb-16">
          <div aria-hidden="true" className="h-px w-full origin-left bg-[var(--line)] mb-5" />
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
            <span className="font-mono text-[11px] tracking-[0.24em] text-[var(--primary)] uppercase font-semibold">
              S/02 — CAPABILITIES
            </span>
            <p className="max-w-sm font-mono text-[11px] leading-relaxed tracking-[0.06em] text-[var(--muted-foreground)] uppercase">
              Select a discipline to expand its stack.
            </p>
          </div>
          <h2 className="relative mt-5 text-[clamp(2.1rem,7.6vw,6rem)] font-extrabold uppercase tracking-tight focus:outline-none">
            <span className="block text-[var(--foreground)]">Skills</span>
          </h2>
        </header>

        {/* Capabilities Accordion */}
        <ul className="border-t border-[var(--line)]">
          {SKILL_CATEGORIES.map((category) => {
            const isOpen = openId === category.id;
            return (
              <li
                key={category.id}
                className={`group relative border-b border-[var(--line)] transition-colors duration-300 ${
                  isOpen ? 'bg-[#0f1115]/80' : 'hover:bg-white/[0.02]'
                }`}
              >
                {/* Left accent bar */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute top-0 left-0 h-full w-[2px] transition-transform duration-300 ${
                    isOpen ? 'scale-y-100 bg-[var(--primary)]' : 'scale-y-0 group-hover:scale-y-100 bg-[var(--primary-strong)]'
                  }`}
                />

                {/* Radial subtle spotlight when active */}
                {isOpen && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        'radial-gradient(380px circle at 40% 50%, rgba(231, 233, 236, 0.05), transparent 75%)',
                    }}
                  />
                )}

                {/* Header Button */}
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggleCategory(category.id)}
                  className="relative flex w-full items-baseline gap-4 py-6 text-left sm:gap-8 cursor-pointer pl-3 sm:pl-4 pr-2"
                >
                  <span
                    className={`font-mono text-[11px] tracking-[0.2em] transition-colors ${
                      isOpen ? 'text-[var(--primary)] font-bold' : 'text-[var(--muted-foreground)] group-hover:text-[var(--primary)]'
                    }`}
                  >
                    {category.num} /
                  </span>
                  <span
                    className={`stretch-hover font-display flex-1 text-[clamp(1.15rem,3.6vw,2.75rem)] font-extrabold uppercase transition-colors duration-300 ${
                      isOpen
                        ? 'text-[var(--primary-bright)]'
                        : 'text-[var(--foreground-secondary)] group-hover:text-[var(--primary-bright)]'
                    }`}
                  >
                    {category.title}
                  </span>
                  <span
                    className={`font-mono text-[11px] tracking-[0.2em] uppercase transition-colors ${
                      isOpen ? 'text-[var(--primary)] font-semibold' : 'text-[var(--muted-foreground)] group-hover:text-[var(--foreground)]'
                    }`}
                  >
                    {category.count}
                  </span>
                  <span
                    className={`font-mono text-base transition-transform duration-300 ml-2 ${
                      isOpen ? 'text-[var(--primary)] rotate-45 scale-125' : 'text-[var(--muted-foreground)] group-hover:text-[var(--primary)]'
                    }`}
                  >
                    +
                  </span>
                </button>

                {/* Drawer Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-6 pb-10 pt-2 lg:grid-cols-12">
                        {/* Description on left */}
                        <div className="lg:col-span-4">
                          <span className="mb-4 block h-px w-16 bg-[var(--primary)] shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                          <p className="max-w-xs text-sm leading-relaxed text-[var(--muted-foreground)]">
                            {category.description}
                          </p>
                        </div>

                        {/* Skill Pills on right */}
                        <ul className="flex flex-wrap gap-x-6 gap-y-2.5 lg:col-span-8">
                          {category.skills.map((skill, sIdx) => (
                            <li
                              key={sIdx}
                              className="font-mono text-xs tracking-[0.08em] text-[var(--foreground-secondary)] uppercase transition-all duration-200 hover:-translate-y-0.5 hover:text-[var(--primary)] sm:text-[13px] bg-white/[0.02] border border-[var(--border)] px-3 py-1.5 rounded-none"
                            >
                              {skill}
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
