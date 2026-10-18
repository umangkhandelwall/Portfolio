import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PERSONAL_INFO, RESUME_PATH } from '../data/portfolioData';
import { HeroMesh } from './HeroMesh';
import { ScrambleText } from './ScrambleText';
import { Zap, Sparkles, FileDown } from 'lucide-react';

interface HeroProps {
  onOpenAiAssistant: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAiAssistant }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-2.8, 2.8]), { stiffness: 220, damping: 25 });
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [2.8, -2.8]), { stiffness: 220, damping: 25 });
  const lineX = useTransform(mouseX, [0, 1], ['0%', '70%']);
  const lineY = useTransform(mouseY, [0, 1], ['0%', '70%']);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(Math.max(0, Math.min(1, x)));
    mouseY.set(Math.max(0, Math.min(1, y)));
    if (cardRef.current) {
      cardRef.current.style.setProperty('--lx', `${(x * 100).toFixed(1)}%`);
      cardRef.current.style.setProperty('--ly', `${(y * 100).toFixed(1)}%`);
    }
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') setIsCardHovered(true);
  };

  const handlePointerLeave = () => {
    setIsCardHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
    if (cardRef.current) {
      cardRef.current.style.setProperty('--lx', '50%');
      cardRef.current.style.setProperty('--ly', '50%');
    }
  };

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

          {/* Right Column: Interactive Real Portrait HUD Dossier Frame */}
          <figure className="lg:col-span-5">
            <div
              ref={cardRef}
              data-signal-anchor="true"
              className="mx-auto w-[min(88vw,340px)] lg:mr-0 lg:ml-auto lg:w-[clamp(340px,30vw,430px)] select-none"
              style={{ perspective: '1000px', '--lx': '50%', '--ly': '50%' } as React.CSSProperties}
              onPointerMove={handlePointerMove}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            >
              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                className="group/glass relative titanium"
              >
                {/* Dossier Header with System Index & Verified Location */}
                <figcaption className="relative flex items-center justify-between border-x border-t border-[var(--border)] px-3 py-2 bg-[#090b0e]">
                  <motion.span
                    animate={{ x: isCardHovered ? 4 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="label-mono inline-flex items-center gap-2 text-[var(--primary)] text-[10px]"
                  >
                    <span className="inline-block size-1 bg-[var(--primary)] shadow-[0_0_6px_var(--primary)]" />
                    IMG / 001
                  </motion.span>
                  <motion.span
                    animate={{ x: isCardHovered ? -4 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="label-mono text-[10px] text-[var(--muted-foreground)]"
                  >
                    {PERSONAL_INFO.location}
                  </motion.span>
                </figcaption>

                {/* Portrait Screen Frame */}
                <div
                  className="portrait-frame relative aspect-square w-full overflow-hidden border border-[var(--border)] bg-[#040507]"
                  style={{
                    boxShadow: isCardHovered
                      ? '0 0 0 1px rgba(255, 255, 255, 0.22), 0 20px 45px -12px rgba(0, 0, 0, 0.85)'
                      : undefined,
                  }}
                >
                  {/* Internal grid */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.14] z-10"
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                      backgroundSize: '36px 36px',
                      color: 'var(--border)',
                    }}
                  />

                  {/* Real Portrait Photo of Umang with optimized face framing & rich tone */}
                  <img
                    src="/umang-portrait.jpg"
                    alt="Umang Khandelwal — Advanced AI Engineer & Full-Stack Developer"
                    width={800}
                    height={900}
                    loading="eager"
                    decoding="async"
                    className="relative h-full w-full object-cover object-[center_18%] filter grayscale-[20%] contrast-[1.04] brightness-[0.98] group-hover/glass:grayscale-0 group-hover/glass:contrast-100 group-hover/glass:brightness-100 transition-all duration-700 ease-out"
                  />

                  {/* Cinematic Dark Edge Vignette - seamlessly dissolves daytime foliage/background into the deep dark HUD chamber */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-10"
                    style={{
                      background:
                        'radial-gradient(circle at 50% 30%, transparent 35%, rgba(4, 5, 7, 0.45) 58%, rgba(4, 5, 7, 0.86) 78%, #040507 98%)',
                    }}
                  />

                  {/* Interactive Cursor Spotlight */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
                    style={{
                      background:
                        'radial-gradient(220px circle at var(--lx) var(--ly), rgba(231, 233, 236, 0.16), transparent 70%)',
                      opacity: isCardHovered ? 1 : 0.4,
                    }}
                  />

                  {/* Sliding Hairline Laser Crosshairs tracking mouse coordinates */}
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-0 left-0 h-px w-[30%] bg-[var(--primary)] z-20 shadow-[0_0_8px_var(--primary)]"
                    style={{ x: lineX }}
                    animate={{ opacity: isCardHovered ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-0 right-0 h-[30%] w-px bg-[var(--primary)] z-20 shadow-[0_0_8px_var(--primary)]"
                    style={{ y: lineY }}
                    animate={{ opacity: isCardHovered ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* Chrome Corner Brackets */}
                  <span
                    aria-hidden="true"
                    className="chrome-bracket pointer-events-none absolute size-5 left-0 top-0 border-l-2 border-t-2 z-20 transition-all duration-300"
                    style={{ margin: isCardHovered ? 2 : 0, opacity: isCardHovered ? 1 : 0.6 }}
                  />
                  <span
                    aria-hidden="true"
                    className="chrome-bracket pointer-events-none absolute size-5 right-0 top-0 border-r-2 border-t-2 z-20 transition-all duration-300"
                    style={{ margin: isCardHovered ? 2 : 0, opacity: isCardHovered ? 1 : 0.6 }}
                  />
                  <span
                    aria-hidden="true"
                    className="chrome-bracket pointer-events-none absolute size-5 left-0 bottom-0 border-l-2 border-b-2 z-20 transition-all duration-300"
                    style={{ margin: isCardHovered ? 2 : 0, opacity: isCardHovered ? 1 : 0.6 }}
                  />
                  <span
                    aria-hidden="true"
                    className="chrome-bracket pointer-events-none absolute size-5 right-0 bottom-0 border-r-2 border-b-2 z-20 transition-all duration-300"
                    style={{ margin: isCardHovered ? 2 : 0, opacity: isCardHovered ? 1 : 0.6 }}
                  />

                  {/* Corner Targeting Reticle Trace & Spark */}
                  <span aria-hidden="true" className="ptrace z-20">
                    <i className="ptrace-c ptrace-c--tl" />
                    <i className="ptrace-c ptrace-c--tr" />
                    <i className="ptrace-c ptrace-c--br" />
                    <i className="ptrace-c ptrace-c--bl" />
                    <i className="ptrace-spark" />
                  </span>

                  {/* Scanning HUD Effects with Corner Glints & Telemetry */}
                  <div className="pscan z-20" aria-hidden="true">
                    <span className="pscan-beam" />
                    <span className="pscan-glint pscan-glint--tl" />
                    <span className="pscan-glint pscan-glint--tr" />
                    <span className="pscan-glint pscan-glint--bl" />
                    <span className="pscan-glint pscan-glint--br" />
                    <span className="pscan-mark pscan-mark--tl">LAT: 28.4089° N</span>
                    <span className="pscan-mark pscan-mark--tr">LON: 77.3178° E</span>
                    <span className="pscan-mark pscan-mark--bl">UK // ENG-AI</span>
                    <span className="pscan-mark pscan-mark--br">+</span>
                  </div>

                  {/* Status dot in frame */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-2.5 right-2.5 size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] z-20"
                  />
                </div>

                {/* Frame Footer */}
                <div className="relative flex items-center justify-between gap-3 border-x border-b border-[var(--border)] px-3 py-2 bg-[#090b0e]">
                  <motion.span
                    animate={{ x: isCardHovered ? 4 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="label-mono text-[var(--foreground)] font-medium text-[10px]"
                  >
                    {PERSONAL_INFO.name}
                  </motion.span>
                  <motion.span
                    animate={{ x: isCardHovered ? -4 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="label-mono text-emerald-400 text-[10px] flex items-center gap-1.5"
                  >
                    <span className="inline-block size-1 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
                    AI ENGINEER
                  </motion.span>
                </div>

                <p className="label-mono mt-2 text-right leading-[1.7] text-[var(--primary)] text-[10px]">
                  {PERSONAL_INFO.openToRoles}
                </p>
              </motion.div>
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
