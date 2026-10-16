import React, { useRef, useEffect } from 'react';

interface ElectricHeadingProps {
  lines?: Array<{ text: string; className?: string }>;
}

export const ElectricHeading: React.FC<ElectricHeadingProps> = ({
  lines = [
    { text: "Let's build" },
    { text: "something", className: "text-[var(--primary)]" },
    { text: "intelligent.", className: "chrome-text chrome-spec-hover" }
  ]
}) => {
  const containerRef = useRef<HTMLHeadingElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let mouse = { x: -9999, y: -9999, active: false };
    let arcs: Array<{ x: number; y: number; tx: number; ty: number; alpha: number; life: number }> = [];

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
    };

    resize();
    window.addEventListener('resize', resize);

    // Collect all individual characters and their coordinates
    const charSpans = Array.from(container.querySelectorAll<HTMLSpanElement>('[data-ch="true"]'));

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;

      // Check proximity of characters and ignite arcs
      charSpans.forEach((span) => {
        const sRect = span.getBoundingClientRect();
        const cx = sRect.left - rect.left + sRect.width / 2;
        const cy = sRect.top - rect.top + sRect.height / 2;
        const dist = Math.hypot(cx - mouse.x, cy - mouse.y);

        if (dist < 120) {
          const lit = Math.max(0, 1 - dist / 120);
          span.style.setProperty('--lit', lit.toFixed(2));

          // Spawn electrical arc
          if (Math.random() < 0.28) {
            arcs.push({
              x: mouse.x,
              y: mouse.y,
              tx: cx,
              ty: cy,
              alpha: lit,
              life: 1,
            });
          }
        } else {
          span.style.setProperty('--lit', '0');
        }
      });
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      charSpans.forEach((span) => span.style.setProperty('--lit', '0'));
    };

    const handlePointerDown = () => {
      // Explosive electrical surge
      charSpans.forEach((span) => {
        const sRect = span.getBoundingClientRect();
        const rect = container.getBoundingClientRect();
        const cx = sRect.left - rect.left + sRect.width / 2;
        const cy = sRect.top - rect.top + sRect.height / 2;
        span.style.setProperty('--lit', '1');
        setTimeout(() => span.style.setProperty('--lit', '0'), 500);

        arcs.push({
          x: mouse.x,
          y: mouse.y,
          tx: cx,
          ty: cy,
          alpha: 1,
          life: 1.5,
        });
      });
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', handlePointerLeave);
    container.addEventListener('pointerdown', handlePointerDown);

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render lightning arcs
      for (let i = arcs.length - 1; i >= 0; i--) {
        const arc = arcs[i];
        arc.life -= 0.08;
        if (arc.life <= 0) {
          arcs.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.moveTo(arc.x, arc.y);

        // Jitter lightning branch
        const midX = (arc.x + arc.tx) / 2 + (Math.random() - 0.5) * 16;
        const midY = (arc.y + arc.ty) / 2 + (Math.random() - 0.5) * 16;
        ctx.lineTo(midX, midY);
        ctx.lineTo(arc.tx, arc.ty);

        ctx.strokeStyle = `rgba(231, 233, 236, ${arc.life * 0.8})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Terminal spark
        ctx.beginPath();
        ctx.arc(arc.tx, arc.ty, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${arc.life})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      container.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  return (
    <h2
      ref={containerRef}
      className="relative mt-6 text-[clamp(2rem,8.4vw,7rem)] leading-[0.88] font-extrabold uppercase tracking-tight select-none cursor-pointer"
    >
      <span className="eh block relative">
        {lines.map((line, lIdx) => (
          <span
            key={lIdx}
            data-line={lIdx}
            className={`eh-line block ${line.className || 'text-[var(--foreground)]'}`}
            style={{ '--i': lIdx } as React.CSSProperties}
          >
            {Array.from(line.text).map((ch, cIdx) =>
              ch === ' ' ? (
                <span key={cIdx} aria-hidden="true">
                  &nbsp;
                </span>
              ) : (
                <span
                  key={cIdx}
                  aria-hidden="true"
                  data-ch="true"
                  className="eh-ch"
                >
                  {ch}
                </span>
              )
            )}
            <span className="sr-only">{line.text}</span>
          </span>
        ))}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        />
      </span>
    </h2>
  );
};
