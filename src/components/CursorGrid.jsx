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
  cellSize = 80,
  color = "#8b5cf6",
  radius = 160,
  falloff = "smooth",
  holdTime = 300,
  fadeDuration = 600,
  lineWidth = 1.2,
  maxOpacity = 0.8,
  fillOpacity = 0.04,
  gridOpacity = 0.05,
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
    clickPulse,
    pulseSpeed,
  };

  useEffect(() => {
    // Disable heavy canvas grid on mobile/touch screens
    if (typeof window !== "undefined" && (window.innerWidth < 768 || "ontouchstart" in window)) {
      return;
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0,
      h = 0,
      cols = 0,
      rows = 0;
    let offX = 0,
      offY = 0;
    let alphas = [];
    let touched = [];
    let pulses = [];
    let rafId = null;
    let isVisible = false;
    let isRunning = false;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const p = propsRef.current;
      cols = Math.ceil(w / p.cellSize);
      rows = Math.ceil(h / p.cellSize);
      offX = (w - cols * p.cellSize) / 2;
      offY = (h - rows * p.cellSize) / 2;

      const total = cols * rows;
      alphas = new Float32Array(total);
      touched = new Float32Array(total);
      drawStaticGrid();
    };

    const drawStaticGrid = () => {
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);
      const p = propsRef.current;
      const [cr, cg, cb] = hexToRgb(p.color);

      ctx.strokeStyle = `rgba(${cr},${cg},${cb},${p.gridOpacity})`;
      ctx.lineWidth = p.lineWidth;
      ctx.beginPath();
      for (let rIdx = 0; rIdx <= rows; rIdx++) {
        const y = offY + rIdx * p.cellSize;
        ctx.moveTo(offX, y);
        ctx.lineTo(offX + cols * p.cellSize, y);
      }
      for (let cIdx = 0; cIdx <= cols; cIdx++) {
        const x = offX + cIdx * p.cellSize;
        ctx.moveTo(x, offY);
        ctx.lineTo(x, offY + rows * p.cellSize);
      }
      ctx.stroke();
      ctx.restore();
    };

    const startLoop = () => {
      if (!isRunning && isVisible) {
        isRunning = true;
        rafId = requestAnimationFrame(loop);
      }
    };

    const stopLoop = () => {
      isRunning = false;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      drawStaticGrid();
    };

    const updatePointer = (clientX, clientY) => {
      if (!isVisible) return;
      const rect = container.getBoundingClientRect();
      const px = clientX - rect.left;
      const py = clientY - rect.top;
      if (px < 0 || px > w || py < 0 || py > h) return;

      const p = propsRef.current;
      const now = performance.now();
      const fn = FALLOFF_CURVES[p.falloff] || FALLOFF_CURVES.smooth;

      const minC = Math.max(0, Math.floor((px - p.radius - offX) / p.cellSize));
      const maxC = Math.min(cols - 1, Math.ceil((px + p.radius - offX) / p.cellSize));
      const minR = Math.max(0, Math.floor((py - p.radius - offY) / p.cellSize));
      const maxR = Math.min(rows - 1, Math.ceil((py + p.radius - offY) / p.cellSize));

      for (let rIdx = minR; rIdx <= maxR; rIdx++) {
        const cy = offY + rIdx * p.cellSize + p.cellSize / 2;
        for (let cIdx = minC; cIdx <= maxC; cIdx++) {
          const cx = offX + cIdx * p.cellSize + p.cellSize / 2;
          const d = Math.hypot(cx - px, cy - py);
          if (d <= p.radius) {
            const val = fn(1 - d / p.radius);
            const idx = rIdx * cols + cIdx;
            if (val > alphas[idx]) {
              alphas[idx] = val;
              touched[idx] = now;
            }
          }
        }
      }
      startLoop();
    };

    const handlePointerMove = (e) => updatePointer(e.clientX, e.clientY);

    const loop = (now) => {
      if (!isRunning) return;
      const p = propsRef.current;
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      const [cr, cg, cb] = hexToRgb(p.color);
      let hasActiveAlphas = false;

      // Draw background grid lines in one path
      ctx.strokeStyle = `rgba(${cr},${cg},${cb},${p.gridOpacity})`;
      ctx.lineWidth = p.lineWidth;
      ctx.beginPath();
      for (let rIdx = 0; rIdx <= rows; rIdx++) {
        const y = offY + rIdx * p.cellSize;
        ctx.moveTo(offX, y);
        ctx.lineTo(offX + cols * p.cellSize, y);
      }
      for (let cIdx = 0; cIdx <= cols; cIdx++) {
        const x = offX + cIdx * p.cellSize;
        ctx.moveTo(x, offY);
        ctx.lineTo(x, offY + rows * p.cellSize);
      }
      ctx.stroke();

      // Only draw highlighted active cells
      for (let rIdx = 0; rIdx < rows; rIdx++) {
        const y = offY + rIdx * p.cellSize;
        for (let cIdx = 0; cIdx < cols; cIdx++) {
          const idx = rIdx * cols + cIdx;
          if (alphas[idx] <= 0.001) continue;

          const elapsed = now - touched[idx];
          if (elapsed > p.holdTime) {
            const fadeProgress = (elapsed - p.holdTime) / p.fadeDuration;
            alphas[idx] = Math.max(0, 1 - fadeProgress);
          }

          if (alphas[idx] > 0.001) {
            hasActiveAlphas = true;
            const x = offX + cIdx * p.cellSize;
            const a = alphas[idx] * p.maxOpacity;

            // Fill active cell
            if (p.fillOpacity > 0) {
              ctx.fillStyle = `rgba(${cr},${cg},${cb},${alphas[idx] * p.fillOpacity})`;
              ctx.fillRect(x, y, p.cellSize, p.cellSize);
            }

            // Stroke active cell
            ctx.strokeStyle = `rgba(${cr},${cg},${cb},${a})`;
            ctx.strokeRect(x, y, p.cellSize, p.cellSize);
          }
        }
      }

      ctx.restore();

      // If no active glowing cells remain, stop animation loop to conserve CPU/battery
      if (!hasActiveAlphas && pulses.length === 0) {
        stopLoop();
      } else {
        rafId = requestAnimationFrame(loop);
      }
    };

    // IntersectionObserver to pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (!isVisible) {
          stopLoop();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      observer.disconnect();
      stopLoop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
