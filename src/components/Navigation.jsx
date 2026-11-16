import React from "react";
import { motion } from "framer-motion";

export default function Navigation({ onOpenResume }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
      className="fixed top-16 md:top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] md:w-full max-w-full px-1 md:px-4 flex justify-center pointer-events-none"
    >
      <div
        className="glass-panel px-4 py-2.5 md:px-6 md:py-3 flex flex-row items-center justify-start md:justify-center gap-3 md:gap-7 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 overflow-x-auto w-full md:w-max max-w-full no-scrollbar pointer-events-auto"
      >
        <button
          onClick={() => scrollTo("hero")}
          className="whitespace-nowrap text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
        >
          Home
        </button>
        <button
          onClick={() => scrollTo("about")}
          className="whitespace-nowrap text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
        >
          About
        </button>
        <button
          onClick={() => scrollTo("skills")}
          className="whitespace-nowrap text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
        >
          Skills
        </button>
        <button
          onClick={() => scrollTo("projects")}
          className="whitespace-nowrap text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
        >
          Projects
        </button>
        <button
          onClick={() => scrollTo("tech-stack")}
          className="whitespace-nowrap text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
        >
          Tech Stack
        </button>
        <button
          onClick={() => scrollTo("experience")}
          className="whitespace-nowrap text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
        >
          Experience
        </button>
        <button
          onClick={() => scrollTo("ai-chat")}
          className="whitespace-nowrap text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-black dark:hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <span>Ask AI</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        </button>
        <button
          onClick={() => scrollTo("contact")}
          className="whitespace-nowrap text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
        >
          Contact
        </button>
        <button
          onClick={onOpenResume}
          className="whitespace-nowrap text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-85 transition-opacity cursor-pointer ml-1"
        >
          Resume
        </button>
      </div>
    </motion.nav>
  );
}
