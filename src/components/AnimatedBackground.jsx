import React from "react";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-50 dark:bg-[#070b14] transition-colors duration-500 pointer-events-none">
      {/* Soft ambient radial gradients - pure CSS without heavy GPU blur filters */}
      <div
        className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] rounded-full pointer-events-none opacity-40 dark:opacity-30 transition-all duration-700"
        style={{
          background: "radial-gradient(circle at center, var(--color-primary-500, rgba(139, 92, 246, 0.15)) 0%, transparent 70%)",
        }}
      />

      <div
        className="absolute top-[25%] -right-[15%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full pointer-events-none opacity-30 dark:opacity-25 transition-all duration-700"
        style={{
          background: "radial-gradient(circle at center, var(--color-primary-600, rgba(59, 130, 246, 0.15)) 0%, transparent 70%)",
        }}
      />

      <div
        className="absolute -bottom-[20%] left-[15%] w-[65vw] h-[65vw] max-w-[950px] max-h-[950px] rounded-full pointer-events-none opacity-25 dark:opacity-20 transition-all duration-700"
        style={{
          background: "radial-gradient(circle at center, var(--color-primary-400, rgba(16, 185, 129, 0.12)) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
