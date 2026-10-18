import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL_INFO, RESUME_PATH } from '../data/portfolioData';
import { HeroMesh } from './HeroMesh';
import { ScrambleText } from './ScrambleText';
import { Zap, Sparkles, FileDown } from 'lucide-react';

interface HeroProps {
  onOpenAiAssistant: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAiAssistant }) => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.heroRoles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="intro"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pt-24 pb-8 sm:px-8 lg:pt-28 lg:pb-10"
    >
      {/* Interactive Spring Mesh Canvas in Hero */}
      <HeroMesh />

      <div className="relative mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-10">
          
          {/* Left Column: Intro & Typography */}
          <div className="lg:col-span-7">
            {/* Top Metadata Badges with Matrix Decryption */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="label-mono text-[10px]">
                <ScrambleText text="PORTFOLIO / 2026" delay={100} duration={600} />
              </span>
              <span className="label-mono text-[10px]">
                <ScrambleText text="AI & LLM SYSTEMS" delay={250} duration={700} />
              </span>
              <span className="label-mono text-[10px]">
                <ScrambleText text="FARIDABAD, INDIA" delay={400} duration={650} />
              </span>
              <span className="label-mono text-[10px] flex items-center gap-2 text-emerald-400">
                <span className="inline-block size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                <ScrambleText text="STATUS: AVAILABLE" delay={550} duration={600} />
              </span>
              <span className="label-mono text-[10px] hidden sm:inline text-[var(--muted-foreground)]">
                <ScrambleText text="OPEN TO SDE & AI ROLES" delay={700} duration={800} />
              </span>
            </div>

            {/* Massive Heading with Metallic Sweep */}
            <h1 className="boot-name mt-6 text-[clamp(2.6rem,8.8vw,8rem)] leading-[0.82] font-extrabold uppercase select-none tracking-tight">
              <span className="block">
                <span className="relative block overflow-hidden">
                  <motion.span
                    initial={{ y: '108%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    className="name-matte relative block"
                  >
                    {PERSONAL_INFO.displayNameMatte}
                  </motion.span>
                </span>
                <span className="relative block overflow-hidden">
                  <motion.span
                    initial={{ y: '108%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                    tabIndex={-1}
                    className="chrome-hero relative block outline-hidden"
                  >
                    {PERSONAL_INFO.displayNameChrome}
                  </motion.span>
                </span>
              </span>
              <span aria-hidden="true" className="boot-name-sweep" />
            </h1>

            {/* Looping Role Morph Ticker & Bio */}
            <div className="mt-8 grid gap-6 border-t border-[var(--line)] pt-6 sm:grid-cols-12">
              <div className="font-mono text-xs tracking-[0.2em] text-[var(--primary)] uppercase sm:col-span-5 flex items-center">
                <div className="h-6 relative overflow-hidden flex items-center w-full">
                  <span className="text-[var(--primary-strong)] mr-2 select-none">/</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={roleIndex}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="whitespace-nowrap font-medium text-[var(--foreground)] tracking-[0.16em]"
                    >
                      {PERSONAL_INFO.heroRoles[roleIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              <p className="max-w-lg text-sm leading-relaxed text-[var(--muted-foreground)] sm:col-span-7 sm:text-base">
                {PERSONAL_INFO.bio}
              </p>
            </div>

            {/* CTA Buttons Row */}
            <div className="boot-cta-row relative mt-10 flex flex-wrap items-center gap-3">
              {/* View Projects Button */}
              <a
                href="#projects"
                className="btn-titanium inline-flex items-center justify-center gap-3 px-6 py-3.5 font-mono text-xs tracking-[0.18em] uppercase transition-colors duration-300"
              >
                View Projects
              </a>

              {/* Download Resume Button */}
              <a
                href={RESUME_PATH}
                download="Umang-Khandelwal-Resume.pdf"
                className="inline-flex items-center justify-center gap-2.5 border border-[var(--border)] px-6 py-3.5 font-mono text-xs tracking-[0.18em] uppercase text-[var(--foreground)] transition-colors duration-300 hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-white/[0.02]"
              >
                <FileDown className="size-3.5" />
                <span>Resume</span>
              </a>

              {/* Ask AI Trigger */}
              <button
                type="button"
                onClick={onOpenAiAssistant}
                className="inline-flex items-center justify-center gap-2 border border-[var(--border)] bg-[#0c0e12] px-5 py-3.5 font-mono text-xs tracking-[0.18em] uppercase text-[var(--foreground)] transition-all duration-300 hover:border-[var(--primary)] hover:text-[var(--primary)] cursor-pointer"
              >
                <Sparkles className="size-3.5 text-emerald-400" />
                <span>Ask AI</span>
              </button>

              {/* Initiate Connection Button */}
              <a
                href="#connect"
                className="cta-connect group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 font-mono text-xs tracking-[0.18em] text-[var(--foreground)] uppercase"
              >
                <span aria-hidden="true" className="cta-connect-spark" />
                <span aria-hidden="true" className="cta-connect-mask" />
                <Zap className="cta-connect-bolt relative size-3.5 text-[var(--primary)] group-hover:scale-110 transition-transform" />
                <span className="cta-connect-label relative">Initiate connection</span>
                <span aria-hidden="true" className="cta-connect-arrow relative text-sm">
                  ↘
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Real Portrait Photo Frame */}
          <figure className="lg:col-span-5">
            <div
              data-signal-anchor="true"
              className="mx-auto w-[min(88vw,340px)] lg:mr-0 lg:ml-auto lg:w-[clamp(340px,30vw,430px)]"
              style={{ perspective: '1000px' }}
            >
              <div className="group/glass relative titanium">
                {/* Portrait Screen Frame */}
                <div className="portrait-frame relative aspect-square w-full overflow-hidden border border-[var(--border)] bg-[#040507]">
                  {/* Internal grid */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-[0.14]"
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                      backgroundSize: '36px 36px',
                      color: 'var(--border)',
                    }}
                  />

                  {/* Inner ambient glow */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(220px circle at 50% 50%, rgba(231, 233, 236, 0.14), transparent 70%)',
                    }}
                  />

                  {/* User Real Portrait Photo */}
                  <img
                    src="/umang-portrait.jpg"
                    alt="Umang Khandelwal — Advanced AI Engineer & Full-Stack Developer"
                    width={800}
                    height={900}
                    className="relative h-full w-full object-cover filter grayscale contrast-125 brightness-95"
                  />

                  {/* Chrome Corner Brackets */}
                  <span
                    aria-hidden="true"
                    className="chrome-bracket pointer-events-none absolute size-5 left-0 top-0 border-l-2 border-t-2"
                  />
                  <span
                    aria-hidden="true"
                    className="chrome-bracket pointer-events-none absolute size-5 right-0 top-0 border-r-2 border-t-2"
                  />
                  <span
                    aria-hidden="true"
                    className="chrome-bracket pointer-events-none absolute size-5 left-0 bottom-0 border-l-2 border-b-2"
                  />
                  <span
                    aria-hidden="true"
                    className="chrome-bracket pointer-events-none absolute size-5 right-0 bottom-0 border-r-2 border-b-2"
                  />

                  {/* Corner Targeting Trace & Spark */}
                  <span aria-hidden="true" className="ptrace">
                    <i className="ptrace-c ptrace-c--tl" />
                    <i className="ptrace-c ptrace-c--tr" />
                    <i className="ptrace-c ptrace-c--br" />
                    <i className="ptrace-c ptrace-c--bl" />
                    <i className="ptrace-spark" />
                  </span>

                  {/* Scanning HUD Effects */}
                  <div className="pscan" aria-hidden="true">
                    <span className="pscan-beam" />
                    <span className="pscan-mark pscan-mark--tl">LAT: 28.4089° N</span>
                    <span className="pscan-mark pscan-mark--tr">LON: 77.3178° E</span>
                    <span className="pscan-mark pscan-mark--bl">UK // ENG-AI</span>
                    <span className="pscan-mark pscan-mark--br">+</span>
                  </div>

                  {/* Status dot in frame */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-2.5 right-2.5 size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]"
                  />
                </div>

                {/* Frame Footer */}
                <div className="relative flex items-center justify-between gap-3 border-x border-b border-[var(--border)] px-3 py-2 bg-[#090b0e]">
                  <span className="label-mono text-[var(--foreground)] font-medium text-[10px]">
                    {PERSONAL_INFO.name}
                  </span>
                  <span className="label-mono text-emerald-400 text-[10px]">BENCHMARK ENGINEER</span>
                </div>

                <p className="label-mono mt-2 text-right leading-[1.7] text-[var(--primary)] text-[10px]">
                  {PERSONAL_INFO.openToRoles}
                </p>
              </div>
            </div>
          </figure>
        </div>
      </div>

      {/* Section Footer / Bottom Ticker */}
      <div className="relative mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4 border-t border-[var(--line)] pt-4 mt-8">
        <span className="label-mono flex items-center gap-2">
          <span className="inline-block h-3 w-px bg-[var(--primary)] animate-pulse" />
          Scroll down
        </span>
        <span className="label-mono hidden md:inline text-[var(--muted-foreground)]">
          LLMs · RAG Pipelines · AI Coding Benchmarks · Next.js · TypeScript · Python
        </span>
        <span className="label-mono text-[var(--primary)] font-semibold">S/01</span>
      </div>
    </section>
  );
};
