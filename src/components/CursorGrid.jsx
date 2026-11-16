import React, { useRef, useEffect } from "react";

const FALLOFF_CURVES = {
  linear: (t) => t,
  smooth: (t) => t * t * (3 - 2 * t),
  sharp: (t) => t * t * t,
};

const hexToRgb = (hex) => {
  const h = hex.replace("#", "");
  const v = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const num = parseInt(v.slice(0, 6), 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
};

export default function CursorGrid({
  cellSize = 70,
  color = "#D946EF",
  radius = 140,
  falloff = "smooth",
  holdTime = 400,
  fadeDuration = 800,
  lineWidth = 1.2,
  maxOpacity = 1,
  fillOpacity = 0,
  gridOpacity = 0,
  cellRadius = 0,
  clickPulse = true,
  pulseSpeed = 600,
  className = "",
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const propsRef = useRef({});

  propsRef.current = {
    cellSize,
    color,
    radius,
    falloff,
    holdTime,
    fadeDuration,
    lineWidth,
    maxOpacity,
    fillOpacity,
    gridOpacity,
    cellRadius,
    clickPulse,
    pulseSpeed,
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let cols = 0;
    let rows = 0;
    let offX = 0;
    let offY = 0;
    let alphas = new Float32Array(0);
    let touched = new Float64Array(0);
    let w = 0;
    let h = 0;
    const pulses = [];
    let raf = 0;
    let running = false;
    let lastFrame = 0;

    const rebuild = () => {
      const p = propsRef.current;
      w = container.offsetWidth;
      h = container.offsetHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      cols = Math.ceil(w / p.cellSize);
      rows = Math.ceil(h / p.cellSize);
      offX = (w - cols * p.cellSize) / 2;
      offY = (h - rows * p.cellSize) / 2;

      const total = cols * rows;
      alphas = new Float32Array(total);
      touched = new Float64Array(total);
    };

    const wake = () => {
      if (!running) {
        running = true;
        lastFrame = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };

    const updatePointer = (clientX, clientY) => {
      const p = propsRef.current;
      const rect = container.getBoundingClientRect();
      const px = clientX - rect.left;
      const py = clientY - rect.top;
      if (px < 0 || px > w || py < 0 || py > h) return;

      const now = performance.now();
      const r = p.radius;
      const rSq = r * r;
      const curve = FALLOFF_CURVES[p.falloff] || FALLOFF_CURVES.smooth;

      const minC = Math.max(0, Math.floor((px - r - offX) / p.cellSize));
      const maxC = Math.min(cols - 1, Math.floor((px + r - offX) / p.cellSize));
      const minR = Math.max(0, Math.floor((py - r - offY) / p.cellSize));
      const maxR = Math.min(rows - 1, Math.floor((py + r - offY) / p.cellSize));

      for (let rIdx = minR; rIdx <= maxR; rIdx++) {
        const cy = offY + rIdx * p.cellSize + p.cellSize / 2;
        for (let cIdx = minC; cIdx <= maxC; cIdx++) {
          const cx = offX + cIdx * p.cellSize + p.cellSize / 2;
          const distSq = (cx - px) ** 2 + (cy - py) ** 2;
          if (distSq < rSq) {
            const d = Math.sqrt(distSq);
            const intensity = curve(1 - d / r);
            const idx = rIdx * cols + cIdx;
            if (intensity > alphas[idx]) {
              alphas[idx] = intensity;
              touched[idx] = now;
            }
          }
        }
      }
      wake();
    };

    const handlePointerMove = (e) => updatePointer(e.clientX, e.clientY);

    const handleClick = (e) => {
      if (!propsRef.current.clickPulse) return;
      const rect = container.getBoundingClientRect();
      pulses.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        t0: performance.now(),
      });
      wake();
    };

    const loop = (now) => {
      const p = propsRef.current;
      const _dt = now - lastFrame;
      lastFrame = now;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      const [cr, cg, cb] = hexToRgb(p.color);
      let active = false;

      // Pulse handling
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        const age = now - pulse.t0;
        const maxDist = Math.max(w, h) * 1.5;
        const curR = (age / 1000) * p.pulseSpeed;

        if (curR > maxDist) {
          pulses.splice(i, 1);
          continue;
        }

        active = true;
        const waveW = p.cellSize * 2;
        for (let rIdx = 0; rIdx < rows; rIdx++) {
          const cy = offY + rIdx * p.cellSize + p.cellSize / 2;
          for (let cIdx = 0; cIdx < cols; cIdx++) {
            const cx = offX + cIdx * p.cellSize + p.cellSize / 2;
            const dist = Math.hypot(cx - pulse.x, cy - pulse.y);
            const diff = Math.abs(dist - curR);
            if (diff < waveW) {
              const val = (1 - diff / waveW) * 0.8;
              const idx = rIdx * cols + cIdx;
              if (val > alphas[idx]) {
                alphas[idx] = val;
                touched[idx] = now;
              }
            }
          }
        }
      }

      // Draw grid
      for (let rIdx = 0; rIdx < rows; rIdx++) {
        const y = offY + rIdx * p.cellSize;
        for (let cIdx = 0; cIdx < cols; cIdx++) {
          const x = offX + cIdx * p.cellSize;
          const idx = rIdx * cols + cIdx;

          const elapsed = now - touched[idx];
          if (elapsed > p.holdTime) {
            const fadeProgress = (elapsed - p.holdTime) / p.fadeDuration;
            alphas[idx] = Math.max(0, 1 - fadeProgress);
          }

          if (alphas[idx] > 0.001) active = true;

          const a = Math.max(alphas[idx] * p.maxOpacity, p.gridOpacity);

          if (a > 0.001) {
            // Fill cell if fillOpacity > 0
            if (p.fillOpacity > 0 && alphas[idx] > 0.001) {
              ctx.fillStyle = `rgba(${cr},${cg},${cb},${alphas[idx] * p.fillOpacity})`;
              ctx.fillRect(x, y, p.cellSize, p.cellSize);
            }

            // Stroke cell border
            ctx.strokeStyle = `rgba(${cr},${cg},${cb},${a})`;
            ctx.lineWidth = p.lineWidth;
            ctx.strokeRect(x, y, p.cellSize, p.cellSize);
          }
        }
      }

      ctx.restore();

      if (active) {
        raf = requestAnimationFrame(loop);
      } else {
        running = false;
      }
    };

    rebuild();
    wake();

    const ro = new ResizeObserver(() => {
      rebuild();
      wake();
    });
    ro.observe(container);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    container.addEventListener("click", handleClick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div ref={containerRef} className={`cursor-grid ${className}`}>
      <canvas ref={canvasRef} className="cursor-grid__canvas" />
    </div>
  );
}
