import React, { useState } from 'react';
import { PERSONAL_INFO, SOCIAL_LINKS, RESUME_PATH } from '../data/portfolioData';
import { ElectricHeading } from './ElectricHeading';
import confetti from 'canvas-confetti';
import { GithubIcon, LinkedinIcon } from './Icons';
import {
  Copy,
  Check,
  Send,
  FileDown,
  Sparkles,
  ArrowUpRight,
  Mail,
} from 'lucide-react';

interface ConnectProps {
  onOpenAiAssistant: () => void;
}

export const Connect: React.FC<ConnectProps> = ({ onOpenAiAssistant }) => {
  const [copied, setCopied] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('sent');
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#e7e9ec', '#10b981', '#3c4045', '#ffffff'],
      });
      window.location.href = `mailto:${PERSONAL_INFO.email}?subject=Portfolio Contact from ${encodeURIComponent(
        formData.name
      )}&body=${encodeURIComponent(formData.message + '\n\nSender Email: ' + formData.email)}`;
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setFormStatus('idle');
      }, 3500);
    }, 600);
  };

  return (
    <section id="connect" className="scroll-mt-16 px-5 pt-12 pb-20 sm:px-8 sm:pt-16 sm:pb-24">
      <div className="mx-auto max-w-[1600px]">
        {/* Section Header */}
        <div id="connect-landing" className="scroll-mt-24">
          <div aria-hidden="true" className="h-px w-full origin-left bg-[var(--line)] mb-5" />
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <span className="font-mono text-[11px] tracking-[0.24em] text-[var(--primary)] uppercase font-semibold">
              S/06 — CONNECT
            </span>
            <div className="flex items-center gap-5 sm:gap-8">
              <a
                href="#connect-social"
                className="label-mono flex items-center gap-1.5 text-[var(--foreground-secondary)] hover:text-white transition-colors cursor-pointer"
              >
                <span>Social channels</span>
                <span className="text-[var(--primary)]">↓</span>
              </a>
              <span className="label-mono">{PERSONAL_INFO.location}</span>
            </div>
          </div>
        </div>

        {/* Interactive Electrical Heading with Lightning Arcs */}
        <ElectricHeading
          lines={[
            { text: "Let's build" },
            { text: "something", className: "text-[var(--primary)]" },
            { text: "intelligent.", className: "chrome-text chrome-spec-hover" }
          ]}
        />

        {/* Bio / Opportunity Note */}
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-base">
          I&apos;m open to Software Development Engineer (SDE), Generative AI, AI/ML, and Full-Stack
          opportunities. If you&apos;re hiring, collaborating, or building something interesting,
          you can mail me directly.
        </p>

        {/* Direct Email Display with Copy Action */}
        <div id="connect-contact" className="relative z-10 mt-6 scroll-mt-24 bg-[#020202]/90 backdrop-blur-sm py-2">
          <p className="label-mono flex items-center gap-2 text-[var(--primary)] font-semibold">
            <span className="inline-block size-1 bg-[var(--primary)]" />
            YOU CAN MAIL ME DIRECTLY AT
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="block break-all text-[clamp(1.35rem,5.6vw,4rem)] leading-[0.95] font-extrabold uppercase transition-colors hover:text-[var(--primary)] text-[var(--foreground)]"
            >
              {PERSONAL_INFO.email}
            </a>

            <button
              type="button"
              onClick={copyEmail}
              aria-label="Copy email address"
              className="inline-flex items-center gap-1.5 border border-[var(--border)] px-3 py-1.5 font-mono text-[11px] tracking-[0.16em] uppercase text-[var(--muted-foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="size-3 text-emerald-400" />
                  <span className="text-emerald-400">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="size-3" />
                  <span>COPY</span>
                </>
              )}
            </button>
          </div>

          <span className="mt-3 block h-px w-full max-w-3xl origin-left scale-x-100 bg-[var(--primary)]/70 shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
        </div>

        {/* Action Buttons Row */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={RESUME_PATH}
            download="Umang-Khandelwal-Resume.pdf"
            className="btn-titanium inline-flex items-center justify-center gap-3 px-6 py-3.5 font-mono text-xs tracking-[0.18em] uppercase"
          >
            <FileDown className="size-3.5" />
            <span>Download Resume</span>
          </a>

          <button
            type="button"
            onClick={() => setFormOpen(!formOpen)}
            className="inline-flex items-center justify-center gap-2.5 border border-[var(--border)] px-6 py-3.5 font-mono text-xs tracking-[0.18em] uppercase text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors cursor-pointer"
          >
            <Mail className="size-3.5" />
            <span>{formOpen ? 'Close Form' : 'Send Direct Message'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenAiAssistant}
            className="inline-flex items-center justify-center gap-2 border border-[var(--border)] bg-[#0c0e12] px-6 py-3.5 font-mono text-xs tracking-[0.18em] uppercase text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all cursor-pointer"
          >
            <Sparkles className="size-3.5 text-emerald-400" />
            <span>Ask AI Assistant</span>
          </button>
        </div>

        {/* Collapsible Contact Form */}
        {formOpen && (
          <div className="mt-10 max-w-xl border border-[var(--border-strong)] bg-[#090b0e] p-6 sm:p-8 titanium">
            <div className="mb-6 flex items-center justify-between border-b border-[var(--line)] pb-3">
              <span className="label-mono text-[var(--primary)] font-bold">SEND TRANSMISSION</span>
              <span className="label-mono text-emerald-400">DISPATCH READY</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label-mono mb-1.5 block">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe / Recruiter"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-[var(--border)] bg-[#040507] px-3.5 py-2.5 font-mono text-xs text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/50 focus:border-[var(--primary)] focus:outline-none"
                />
              </div>

              <div>
                <label className="label-mono mb-1.5 block">Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-[var(--border)] bg-[#040507] px-3.5 py-2.5 font-mono text-xs text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/50 focus:border-[var(--primary)] focus:outline-none"
                />
              </div>

              <div>
                <label className="label-mono mb-1.5 block">Message / Opportunity Details</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell me about your team, role, or project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border border-[var(--border)] bg-[#040507] px-3.5 py-2.5 font-mono text-xs text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/50 focus:border-[var(--primary)] focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="btn-titanium flex w-full items-center justify-center gap-2 py-3.5 font-mono text-xs tracking-[0.18em] uppercase text-[var(--primary-bright)] cursor-pointer"
              >
                {formStatus === 'sending' ? (
                  <span>TRANSMITTING...</span>
                ) : formStatus === 'sent' ? (
                  <>
                    <Check className="size-4 text-emerald-400" />
                    <span>MESSAGE TRANSMITTED!</span>
                  </>
                ) : (
                  <>
                    <Send className="size-3.5" />
                    <span>DISPATCH MESSAGE</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Social Channels List with Glowing Hover Nodes */}
        <ul id="connect-social" className="relative mt-10 sm:mt-12 scroll-mt-24 border-t border-[var(--line)]">
          {/* Vertical Guide Line */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-[3%] w-px origin-top bg-gradient-to-b from-transparent via-[var(--primary)]/20 to-transparent sm:left-[1.5%]"
          />

          {SOCIAL_LINKS.map((item) => {
            let IconComponent: React.ComponentType<{ className?: string }> = Mail;
            if (item.id === 'linkedin') IconComponent = LinkedinIcon;
            if (item.id === 'github') IconComponent = GithubIcon;

            return (
              <li
                key={item.id}
                data-social-row=""
                className="group/node relative border-b border-[var(--line)] transition-colors duration-300 hover:bg-[#0c0e12]"
              >
                {/* Glowing Node Dot on Guide Line */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-[3%] size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary)]/40 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/node:scale-150 group-hover/node:bg-[var(--primary)] group-hover/node:shadow-[0_0_14px_2px_rgba(255,255,255,0.7)] sm:left-[1.5%]"
                />

                <a
                  href={item.href}
                  data-signal-anchor="true"
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="group relative z-10 grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-4 gap-y-1.5 py-5 pr-6 pl-8 sm:grid-cols-12 sm:items-baseline sm:gap-3 sm:py-6 sm:pr-0 sm:pl-0"
                >
                  {/* Number */}
                  <span className="col-start-1 row-start-1 font-mono text-[10px] tracking-[0.2em] text-[var(--primary)] sm:col-span-1">
                    {item.num}
                  </span>

                  {/* Channel Name */}
                  <span className="col-start-2 row-start-1 min-w-0 sm:col-span-5 flex items-center gap-2">
                    <IconComponent className="size-4 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] transition-colors" />
                    <span className="font-display relative inline-block text-[clamp(1.1rem,3vw,2rem)] font-extrabold uppercase transition-transform duration-500 group-hover:translate-x-2 group-hover:text-[var(--primary)]">
                      {item.label}
                    </span>
                  </span>

                  {/* Handle / Value */}
                  <span className="col-span-2 col-start-2 row-start-2 min-w-0 font-mono text-[clamp(0.625rem,3vw,0.75rem)] leading-relaxed tracking-[0.12em] text-[var(--muted-foreground)] uppercase sm:col-span-5 sm:col-start-auto sm:row-auto sm:text-[10px] sm:tracking-[0.18em]">
                    {item.value}
                  </span>

                  {/* Arrow */}
                  <span className="col-start-3 row-start-1 pl-4 text-right font-mono text-[11px] tracking-[0.2em] text-[var(--muted-foreground)] uppercase sm:col-span-1 sm:col-start-auto sm:row-auto sm:pl-0">
                    <ArrowUpRight className="inline-block size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--primary)]" />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
