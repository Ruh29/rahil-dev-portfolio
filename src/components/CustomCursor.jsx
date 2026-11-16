import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Only run on desktop devices with a precision mouse pointer
    if (
      typeof window === "undefined" ||
      window.innerWidth < 1024 ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    let posX = -100,
      posY = -100;
    let mouseX = -100,
      mouseY = -100;
    let rafId = null;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursor.style.opacity === "0" || !cursor.style.opacity) {
        cursor.style.opacity = "1";
      }
    };

    const onMouseLeave = () => {
      if (cursor) cursor.style.opacity = "0";
    };

    const render = () => {
      // Smooth lerp
      posX += (mouseX - posX) * 0.2;
      posY += (mouseY - posY) * 0.2;
      cursor.style.transform = `translate3d(${posX - 14}px, ${posY - 14}px, 0)`;
      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-7 h-7 rounded-full pointer-events-none z-[9999] border-2 border-primary-500/80 backdrop-invert mix-blend-difference hidden lg:block opacity-0 will-change-transform"
      style={{
        transition: "opacity 0.2s ease-out",
      }}
    />
  );
}
