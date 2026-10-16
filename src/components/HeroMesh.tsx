import React, { useEffect, useRef } from 'react';

export const HeroMesh: React.FC = () => {
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
    let cols = 0;
    let rows = 0;
    let points: Array<{ x: number; y: number; bx: number; by: number; p: number }> = [];

    const mouse = { x: -9999, y: -9999 };
    const rawMouse = { x: -9999, y: -9999, dirty: false };
    let canvasRect = { left: 0, top: 0 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvasRect = {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
      };
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const spacing = isMobile ? 116 : 72;
      cols = Math.max(4, Math.ceil(width / spacing) + 1);
      rows = Math.max(4, Math.ceil(height / spacing) + 1);
      points = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = (c / (cols - 1)) * width;
          const y = (r / (rows - 1)) * height;
          points.push({
            x,
            y,
            bx: x,
            by: y,
            p: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    resize();

    let animationId: number;
    let phase = 0;

    const render = () => {
      if (rawMouse.dirty) {
        mouse.x = rawMouse.x - (canvasRect.left - window.scrollX);
        mouse.y = rawMouse.y - (canvasRect.top - window.scrollY);
        rawMouse.dirty = false;
      }

      phase += 0.006;
      ctx.clearRect(0, 0, width, height);

      // Update positions
      for (const pt of points) {
        const dx = pt.bx - mouse.x;
        const dy = pt.by - mouse.y;
        const dist = Math.hypot(dx, dy);

        let pushX = 0;
        let pushY = 0;
        if (dist < 230) {
          const force = (1 - dist / 230) ** 2 * 34;
          pushX = (dx / (dist || 1)) * force;
          pushY = (dy / (dist || 1)) * force;
        }

        const wave = Math.sin(phase + pt.p) * 2.4;
        pt.x += (pt.bx + pushX + wave - pt.x) * 0.12;
        pt.y += (pt.by + pushY - pt.y) * 0.12;
      }

      // Render grid lines
      ctx.lineWidth = 0.5;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const pt = points[r * cols + c];
          const rightPt = c < cols - 1 ? points[r * cols + c + 1] : null;
          const bottomPt = r < rows - 1 ? points[(r + 1) * cols + c] : null;

          const distToMouse = Math.hypot(pt.bx - mouse.x, pt.by - mouse.y);
          const prox = Math.max(0, 1 - distToMouse / 260);
          const alpha = 0.035 + prox * 0.4;

          ctx.strokeStyle =
            prox > 0.05
              ? `rgba(216, 218, 221, ${alpha})`
              : 'rgba(235, 238, 242, 0.055)';

          if (rightPt) {
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(rightPt.x, rightPt.y);
            ctx.stroke();
          }

          if (bottomPt) {
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(bottomPt.x, bottomPt.y);
            ctx.stroke();
          }

          // Glowing coordinate pips
          if (prox > 0.35) {
            ctx.fillStyle = `rgba(216, 218, 221, ${prox * 0.7})`;
            ctx.fillRect(pt.x - 1, pt.y - 1, 2, 2);
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    const handlePointerMove = (e: PointerEvent) => {
      rawMouse.x = e.clientX;
      rawMouse.y = e.clientY;
      rawMouse.dirty = true;
    };

    const handlePointerLeave = () => {
      rawMouse.x = -9999;
      rawMouse.y = -9999;
      rawMouse.dirty = true;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    window.addEventListener('resize', resize);

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-motion-id="hero-mesh"
      className="pointer-events-none absolute inset-0 size-full"
      style={{ contain: 'paint' }}
    />
  );
};
