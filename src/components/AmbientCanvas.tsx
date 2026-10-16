import React, { useEffect, useRef } from 'react';

const SECTION_PROFILES: Record<string, { amp: number; freq: number; soft: number }> = {
  intro: { amp: 1, freq: 1, soft: 1 },
  skills: { amp: 1.35, freq: 1.7, soft: 1 },
  experience: { amp: 0.8, freq: 1.15, soft: 1 },
  projects: { amp: 1.15, freq: 2.2, soft: 1 },
  education: { amp: 1.6, freq: 0.65, soft: 0.6 },
  connect: { amp: 0.7, freq: 0.9, soft: 0.85 },
};

const SECTION_OFFSETS: Record<string, number> = {
  intro: 0.3,
  skills: 0.68,
  experience: 0.34,
  projects: 0.58,
  education: 0.44,
  connect: 0.5,
};

export const AmbientCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);

    let width = 0;
    let height = 0;
    let docHeight = 0;
    let sections: Array<{ id: string; top: number; bottom: number }> = [];
    let anchors: Array<{ x: number; y: number; section: string }> = [];

    let pulseTravel = 0;
    let pulseSpeed = 17500; // loop period in ms
    let secondaryTravel = -1200;
    let secondaryPeriod = 19000;
    let activeParticles: Array<{ x: number; y: number; vx: number; vy: number; life: number }> = [];

    const measure = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      docHeight = Math.max(document.documentElement.scrollHeight, height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const scrollY = window.scrollY;
      const ids = ['intro', 'skills', 'experience', 'projects', 'education', 'connect'];
      sections = [];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        sections.push({
          id,
          top: rect.top + scrollY,
          bottom: rect.bottom + scrollY,
        });
      }

      anchors = [];
      const anchorEls = document.querySelectorAll('[data-signal-anchor]');
      anchorEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) return;
        const y = rect.top + scrollY + rect.height / 2;
        const sec = sections.find((s) => y >= s.top && y < s.bottom);
        anchors.push({
          x: rect.left + rect.width / 2,
          y,
          section: sec?.id || '',
        });
      });
    };

    measure();
    window.addEventListener('resize', measure);

    // Helpers to get curve parameters based on current section
    const getSectionAt = (y: number): string => {
      return sections.find((s) => y >= s.top && y < s.bottom)?.id || 'intro';
    };

    const getCarrierX = (docY: number): number => {
      const secId = getSectionAt(docY);
      const profile = SECTION_PROFILES[secId] || SECTION_PROFILES.intro;
      const baseRatio = SECTION_OFFSETS[secId] ?? 0.5;

      const normY = docY / docHeight;
      const amplitude = width * 0.08 * profile.amp;
      let x =
        baseRatio * width +
        Math.sin(normY * Math.PI * 3.1 * profile.freq) * amplitude +
        Math.sin(normY * Math.PI * 7.3 * profile.freq + 1.1) * amplitude * 0.3;

      // Pull curve gently towards nearby anchors
      for (const a of anchors) {
        const dy = Math.abs(a.y - docY);
        if (dy < 220) {
          x += (a.x - x) * (1 - dy / 220) ** 2 * 0.22;
        }
      }

      return x;
    };

    // Draw glowing chrome metallic micro-orb
    const drawChromeOrb = (x: number, y: number, r: number, alpha: number) => {
      // Glow circle
      ctx.beginPath();
      ctx.arc(x, y, r * 1.35, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(41, 44, 48, ${0.66 * alpha})`;
      ctx.fill();

      // Outer metallic ring
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(104, 109, 115, ${0.95 * alpha})`;
      ctx.fill();

      // Gradient sphere
      const grad = ctx.createLinearGradient(x - r, y - r, x + r, y + r);
      grad.addColorStop(0, `rgba(255, 255, 255, ${0.96 * alpha})`);
      grad.addColorStop(0.22, `rgba(183, 188, 192, ${0.93 * alpha})`);
      grad.addColorStop(0.42, `rgba(9, 10, 11, ${0.9 * alpha})`);
      grad.addColorStop(0.58, `rgba(232, 233, 231, ${0.95 * alpha})`);
      grad.addColorStop(0.74, `rgba(41, 44, 48, ${0.9 * alpha})`);
      grad.addColorStop(1, `rgba(183, 188, 192, ${0.9 * alpha})`);

      ctx.beginPath();
      ctx.arc(x, y, r * 0.78, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Center bright highlight
      ctx.beginPath();
      ctx.arc(x, y, r * 0.34, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();
    };

    let lastTime = performance.now();
    let animId: number;

    const render = (time: number) => {
      const dt = Math.min(time - lastTime, 40);
      lastTime = time;

      const scrollY = window.scrollY;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw static faint circuit guide line
      ctx.beginPath();
      for (let sy = -20; sy <= height + 20; sy += 18) {
        const docY = scrollY + sy;
        const cx = getCarrierX(docY);
        if (sy === -20) ctx.moveTo(cx, sy);
        else ctx.lineTo(cx, sy);
      }
      ctx.strokeStyle = 'rgba(216, 218, 221, 0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 2. Main traveling pulse
      pulseTravel = (pulseTravel + dt) % pulseSpeed;
      const pulseDocY = (pulseTravel / pulseSpeed) * (docHeight + height * 0.5) - height * 0.25;
      const pulseScreenY = pulseDocY - scrollY;

      if (pulseScreenY >= -300 && pulseScreenY <= height + 300) {
        const secId = getSectionAt(pulseDocY);
        const profile = SECTION_PROFILES[secId] || SECTION_PROFILES.intro;
        const tailLength = (isMobile ? 90 : 140) * profile.soft;

        // Draw traveling trail
        for (let t = 0; t < tailLength; t += 8) {
          const sy = pulseScreenY - t;
          const dy = pulseDocY - t;
          const ratio = 1 - t / tailLength;
          const alpha = ratio * (isMobile ? 0.62 : 0.75) * profile.soft;

          ctx.beginPath();
          ctx.moveTo(getCarrierX(dy), sy);
          ctx.lineTo(getCarrierX(dy - 8), sy - 8);
          ctx.strokeStyle =
            ratio > 0.75
              ? `rgba(255, 255, 255, ${alpha})`
              : ratio > 0.4
              ? `rgba(216, 218, 221, ${alpha})`
              : `rgba(133, 139, 146, ${alpha})`;
          ctx.lineWidth = (isMobile ? 1.8 : 2.4) * (0.5 + ratio * 0.5);
          ctx.stroke();
        }

        // Head orb + radial aura
        const headX = getCarrierX(pulseDocY);
        const auraRadius = 45 * profile.soft;
        const aura = ctx.createRadialGradient(headX, pulseScreenY, 0, headX, pulseScreenY, auraRadius);
        aura.addColorStop(0, `rgba(216, 218, 221, ${0.28 * profile.soft})`);
        aura.addColorStop(0.4, 'rgba(133, 139, 146, 0.1)');
        aura.addColorStop(1, 'rgba(2, 2, 2, 0)');
        ctx.fillStyle = aura;
        ctx.beginPath();
        ctx.arc(headX, pulseScreenY, auraRadius, 0, Math.PI * 2);
        ctx.fill();

        drawChromeOrb(headX, pulseScreenY, isMobile ? 3 : 4, 0.95);

        // Particle sparks
        if (activeParticles.length < 14 && Math.random() < 0.25) {
          activeParticles.push({
            x: headX + (Math.random() - 0.5) * 12,
            y: pulseScreenY - Math.random() * 14,
            vx: (Math.random() - 0.5) * 0.2,
            vy: -0.1 - Math.random() * 0.2,
            life: 1,
          });
        }
      }

      // 3. Secondary pulse
      secondaryTravel = (secondaryTravel + dt) % secondaryPeriod;
      const secDocY = (secondaryTravel / secondaryPeriod) * (docHeight + height * 0.4) - height * 0.2;
      const secScreenY = secDocY - scrollY;

      if (secScreenY >= -200 && secScreenY <= height + 200) {
        const sx = getCarrierX(secDocY);
        const aura = ctx.createRadialGradient(sx, secScreenY, 0, sx, secScreenY, 30);
        aura.addColorStop(0, 'rgba(216, 218, 221, 0.2)');
        aura.addColorStop(1, 'rgba(2, 2, 2, 0)');
        ctx.fillStyle = aura;
        ctx.beginPath();
        ctx.arc(sx, secScreenY, 30, 0, Math.PI * 2);
        ctx.fill();
        drawChromeOrb(sx, secScreenY, 2.5, 0.8);

        // Branching lightning to active section anchors
        for (const a of anchors) {
          if (Math.abs(a.y - secDocY) < 160) {
            ctx.beginPath();
            ctx.moveTo(sx, secScreenY);
            ctx.quadraticCurveTo(
              sx + (a.x - sx) * 0.5,
              secScreenY + (a.y - scrollY - secScreenY) * 0.2,
              a.x,
              a.y - scrollY
            );
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // 4. Update particles
      for (let i = activeParticles.length - 1; i >= 0; i--) {
        const p = activeParticles[i];
        p.x += p.vx * dt * 0.05;
        p.y += p.vy * dt * 0.05;
        p.life -= dt / 1800;
        if (p.life <= 0) {
          activeParticles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.life * 0.5})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-motion-id="ambient-canvas"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      style={{ mixBlendMode: 'normal', opacity: 1, transition: 'opacity 220ms' }}
    />
  );
};
