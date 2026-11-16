import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function AnimatedBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 50 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 100;
      const y = (e.clientY / innerHeight - 0.5) * 100;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500 pointer-events-none">
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle_at_center,var(--primary-500,rgba(139,92,246,0.15)),transparent_70%)] opacity-30 dark:opacity-40 transition-colors duration-500 blur-3xl"
      />

      <motion.div
        style={{ x: smoothX, y: smoothY }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle_at_center,var(--primary-600,rgba(59,130,246,0.15)),transparent_70%)] opacity-25 dark:opacity-35 transition-colors duration-500 blur-3xl"
      />

      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.45, 0.25], x: [0, 30, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[20%] left-[20%] w-[70%] h-[70%] rounded-full bg-[radial-gradient(circle_at_center,var(--primary-500,rgba(16,185,129,0.15)),transparent_70%)] opacity-25 dark:opacity-35 transition-colors duration-500 blur-3xl"
      />
    </div>
  );
}
