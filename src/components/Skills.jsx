import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkillsGrid from "./SkillsGrid";

export default function Skills() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skills-header-anim",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="w-full py-20 sm:py-28 bg-slate-50/70 dark:bg-[#070b14] text-slate-900 dark:text-white overflow-hidden relative z-10 border-t border-slate-200/60 dark:border-slate-800/60 transition-colors duration-500"
    >
      {/* Background glow matching theme */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(var(--primary-500,139,92,246),0.06),transparent_70%)] pointer-events-none"></div>

      {/* Header Section */}
      <div className="w-full flex flex-col items-center text-center px-4 sm:px-6 relative z-10 mb-12 sm:mb-16">
        <div className="inline-block skills-header-anim mb-4">
          <span className="text-[11px] sm:text-xs font-black tracking-[0.3em] uppercase text-primary-600 dark:text-primary-400 border border-primary-500/20 px-5 py-1.5 rounded-full bg-primary-500/10 shadow-xs">
            Technical Expertise
          </span>
        </div>
        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-tight skills-header-anim uppercase mb-4">
          Skills & Tech Stack
        </h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl text-sm sm:text-base font-medium skills-header-anim">
          Production-proven engineering across modern frontend frameworks, scalable backends, real-time WebSockets, and cross-platform mobile apps.
        </p>
      </div>

      {/* High-Performance Skills Grid */}
      <SkillsGrid />
    </section>
  );
}
