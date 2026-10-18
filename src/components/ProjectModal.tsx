import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../data/portfolioData';
import { GithubIcon } from './Icons';
import { X, ExternalLink, Layers, Target, Cpu, CheckCircle2 } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#090b0e] border border-[var(--border-strong)] shadow-[0_20px_60px_rgba(0,0,0,0.85)] titanium"
        >
          {/* Top chrome bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[var(--border)] bg-[#090b0e]/95 px-5 py-3.5 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="label-mono text-[var(--primary)] font-bold">PROJECT DOSSIER</span>
              <span className="text-[var(--border)]">|</span>
              <span className="label-mono text-[var(--muted-foreground)] truncate max-w-xs sm:max-w-md">
                {project.id}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="border border-[var(--border)] p-1 text-[var(--muted-foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {project.categories.map((cat, idx) => (
                <span
                  key={idx}
                  className="font-mono text-[10px] tracking-[0.2em] uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Title & Subtitle */}
            <h2 className="mt-4 font-display text-[clamp(1.5rem,3.8vw,2.8rem)] font-extrabold uppercase leading-tight text-[var(--foreground)]">
              {project.title}
            </h2>
            <p className="mt-2 font-mono text-xs tracking-[0.14em] text-[var(--primary-strong)] uppercase">
              {project.subtitle}
            </p>

            {/* Overview Description */}
            <div className="mt-6 border-l-2 border-[var(--primary)] pl-4 py-1">
              <p className="text-sm sm:text-base leading-relaxed text-[var(--muted-foreground)]">
                {project.description}
              </p>
            </div>

            {/* Architecture Highlight Callout */}
            {project.highlight && (
              <div className="mt-5 flex items-center gap-3 border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold text-emerald-400 shrink-0">
                  HIGHLIGHT //
                </span>
                <span className="font-mono text-xs tracking-[0.08em] text-[var(--foreground)]">
                  {project.highlight}
                </span>
              </div>
            )}

            {/* Tech Stack Pills */}
            <div className="mt-6">
              <span className="label-mono mb-2.5 block">TECHNOLOGIES & FRAMEWORKS</span>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-xs tracking-[0.1em] text-[var(--foreground-secondary)] bg-white/[0.04] border border-[var(--border)] px-3 py-1.5 uppercase"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="mt-8 space-y-6 border-t border-[var(--line)] pt-6">
              {project.details.map((section, idx) => {
                let IconComponent = Target;
                if (section.label.includes('Architecture')) IconComponent = Layers;
                if (section.label.includes('Pipeline') || section.label.includes('Highlights') || section.label.includes('Capabilities'))
                  IconComponent = Cpu;
                if (section.label.includes('Impact') || section.label.includes('Results') || section.label.includes('Metrics'))
                  IconComponent = CheckCircle2;

                return (
                  <div key={idx} className="bg-white/[0.015] border border-[var(--border)] p-5">
                    <div className="flex items-center gap-2.5 mb-3 text-[var(--primary)] font-mono text-xs tracking-[0.18em] uppercase font-bold">
                      <IconComponent className="size-4 text-emerald-400" />
                      <span>{section.label}</span>
                    </div>

                    <ul className="space-y-2">
                      {section.items.map((item, itIdx) => (
                        <li
                          key={itIdx}
                          className="flex items-start gap-2.5 text-sm text-[var(--foreground)]/85 leading-relaxed"
                        >
                          <span className="mt-2 size-1 shrink-0 bg-[var(--primary)] rounded-full" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Footer Actions */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line)] pt-6">
              <div className="flex flex-wrap items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-titanium inline-flex items-center gap-2.5 px-5 py-3 font-mono text-xs tracking-[0.18em] uppercase"
                  >
                    <GithubIcon className="size-3.5" />
                    <span>View Repository</span>
                    <ExternalLink className="size-3 opacity-70" />
                  </a>
                )}
                {project.liveUrl && project.liveUrl !== project.githubUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-[var(--border)] px-5 py-3 font-mono text-xs tracking-[0.18em] uppercase text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="size-3" />
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="font-mono text-xs tracking-[0.18em] uppercase text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                Close [Esc]
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
