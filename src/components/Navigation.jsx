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
        className="glass-panel px-4 py-2.5 md:px-6 md:py-3.5 flex flex-row items-center justify-start md:justify-center gap-3 md:gap-7 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/60 dark:border-slate-800/80 overflow-x-auto w-full md:w-max max-w-full no-scrollbar pointer-events-auto"
      >
        <button
          onClick={() => scrollTo("hero")}
          className="whitespace-nowrap text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
        >
          Home
        </button>
        <button
          onClick={() => scrollTo("about")}
          className="whitespace-nowrap text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
        >
          About
        </button>
        <button
          onClick={() => scrollTo("skills")}
          className="whitespace-nowrap text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
        >
          Skills
        </button>
        <button
          onClick={() => scrollTo("projects")}
          className="whitespace-nowrap text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
        >
          Projects
        </button>
        <button
          onClick={() => scrollTo("tech-stack")}
          className="whitespace-nowrap text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
        >
          Tech Stack
        </button>
        <button
          onClick={() => scrollTo("experience")}
          className="whitespace-nowrap text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
        >
          Experience
        </button>
        <button
          onClick={() => scrollTo("ai-chat")}
          className="whitespace-nowrap text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer flex items-center gap-1"
        >
          Ask AI
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        </button>
        <button
          onClick={() => scrollTo("contact")}
          className="whitespace-nowrap text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
        >
          Contact
        </button>
        {onOpenResume && (
          <button
            onClick={onOpenResume}
            className="whitespace-nowrap text-[11px] sm:text-xs md:text-sm font-bold text-primary-600 dark:text-primary-400 hover:underline transition-all cursor-pointer"
          >
            Resume
          </button>
        )}
      </div>
    </motion.nav>
  );
}
