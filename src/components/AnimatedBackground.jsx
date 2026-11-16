import React from "react";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500 pointer-events-none">
      {/* Strict Monochrome Ambient Radial Gradients matching reference */}
      <div
        className="absolute -top-[10%] -left-[10%] w-[55vw] h-[55vw] max-w-[850px] max-h-[850px] rounded-full pointer-events-none opacity-50 dark:opacity-40 transition-all duration-700 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)]"
      />

      <div
        className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full pointer-events-none opacity-40 dark:opacity-30 transition-all duration-700 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]"
      />

      <div
        className="absolute -bottom-[20%] left-[20%] w-[65vw] h-[65vw] max-w-[950px] max-h-[950px] rounded-full pointer-events-none opacity-40 dark:opacity-30 transition-all duration-700 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.04),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_70%)]"
      />
    </div>
  );
}
