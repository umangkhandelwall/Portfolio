import React, { useState } from 'react';
import { PROJECTS, PERSONAL_INFO, Project } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { GithubIcon } from './Icons';
import { ArrowUpRight } from 'lucide-react';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="scroll-mt-16 px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1600px]">
        {/* Section Header */}
        <header className="relative mb-12 sm:mb-16">
          <div aria-hidden="true" className="h-px w-full origin-left bg-[var(--line)] mb-5" />
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
            <span className="font-mono text-[11px] tracking-[0.24em] text-[var(--primary)] uppercase font-semibold">
              S/04 — INDEX
            </span>
            <p className="max-w-sm font-mono text-[11px] leading-relaxed tracking-[0.06em] text-[var(--muted-foreground)] uppercase">
              05 entries · click a row for complete breakdown
            </p>
          </div>
          <h2 className="relative mt-5 text-[clamp(2.1rem,7.6vw,6rem)] font-extrabold uppercase tracking-tight focus:outline-none">
            <span className="block text-[var(--foreground)]">Projects</span>
          </h2>
        </header>

        {/* GitHub Profile Banner CTA matching reference */}
        <div className="mb-8">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Umang Khandelwal's GitHub profile"
            className="gh-cta group relative inline-flex min-h-[48px] w-full max-w-sm items-center gap-3 overflow-hidden border border-[var(--border)] px-4 py-3 sm:w-auto"
          >
            {/* Geometric SVG circuit */}
            <svg
              aria-hidden="true"
              viewBox="0 0 200 48"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
            >
              <path
                d="M8 40 H60 C78 40 78 12 96 12 H150 M96 12 V40 H190"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
            <span aria-hidden="true" className="gh-cta-edge" />
            <span aria-hidden="true" className="gh-cta-pulse" />

            <GithubIcon className="gh-cta-icon relative size-4 shrink-0 text-[#b9bec2] group-hover:text-white transition-colors" />

            <span className="relative flex min-w-0 flex-col leading-tight">
              <span className="gh-cta-label font-mono text-[11px] tracking-[0.2em] whitespace-nowrap text-[var(--foreground)] uppercase">
                View GitHub Profile
              </span>
              <span className="truncate font-mono text-[10px] tracking-[0.16em] text-[var(--muted-foreground)]">
                {PERSONAL_INFO.githubUsername}
              </span>
            </span>

            <span aria-hidden="true" className="gh-cta-line" />
            <ArrowUpRight className="gh-cta-arrow relative ml-auto pl-2 size-4 text-[var(--foreground)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Projects Table List */}
        <ul>
          {PROJECTS.map((proj, idx) => {
            const numStr = `0${idx + 1}`;
            const primaryTech = proj.techStack.slice(0, 4).join(' · ');

            return (
              <li
                key={proj.id}
                className="group relative border-t border-[var(--line)] transition-colors duration-300 last:border-b hover:border-[var(--primary)]/50 hover:bg-[#0c0e12]/80"
              >
                {/* Left accent hover indicator line */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 left-0 h-full w-[2px] origin-top scale-y-0 bg-[var(--primary)] transition-transform duration-300 ease-out group-hover:scale-y-100"
                />

                <button
                  type="button"
                  onClick={() => setSelectedProject(proj)}
                  className="relative grid w-full grid-cols-1 gap-2 py-4 sm:py-4.5 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] sm:grid-cols-12 sm:items-baseline sm:gap-6 pl-3 sm:pl-4 pr-2"
                >
                  {/* Number */}
                  <span className="block font-mono text-[11px] tracking-[0.2em] text-[var(--muted-foreground)] group-hover:text-[var(--primary)] transition-colors sm:col-span-1">
                    {numStr}
                  </span>

                  {/* Title & Metric */}
                  <span className="relative block sm:col-span-7">
                    <span className="font-display block text-[clamp(1.0rem,2.1vw,1.45rem)] font-extrabold uppercase transition-colors duration-300 text-[var(--foreground)] group-hover:text-[var(--primary-bright)]">
                      {proj.title}
                    </span>
                    {proj.highlight && (
                      <span className="font-mono text-[10px] tracking-[0.14em] text-emerald-400/90 uppercase block mt-1">
                        ▸ {proj.highlight}
                      </span>
                    )}
                  </span>

                  {/* Tech stack summary */}
                  <span className="font-mono text-[11px] tracking-[0.14em] text-[var(--foreground-secondary)] uppercase transition-colors duration-300 group-hover:text-[var(--foreground)] sm:col-span-3">
                    {primaryTech}
                  </span>

                  {/* Arrow action */}
                  <span className="font-mono text-sm tracking-[0.2em] text-[var(--primary)] uppercase sm:col-span-1 sm:text-right">
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                      →
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Modal for Deep Project Inspection */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};
