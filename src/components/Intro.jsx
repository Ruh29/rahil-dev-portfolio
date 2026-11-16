import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CursorGrid from "./CursorGrid";

export default function Intro() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="w-full py-24 md:py-32 bg-white dark:bg-[#070b14] text-slate-900 dark:text-white overflow-hidden relative z-10 transition-colors duration-500"
    >
      {/* Interactive Background Grid - Clean Neutral Monochrome */}
      <div className="absolute inset-0 z-0">
        <CursorGrid
          cellSize={100}
          color="#000000"
          radius={180}
          falloff="smooth"
          holdTime={300}
          fadeDuration={600}
          lineWidth={1.2}
          maxOpacity={0.6}
          fillOpacity={0.03}
          gridOpacity={0.05}
          clickPulse={true}
          pulseSpeed={600}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 pointer-events-none">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 pointer-events-none">
          {/* Left: Experience Badge */}
          <div className="flex-shrink-0 reveal-item relative z-20 pointer-events-auto">
            <div className="relative group w-48 h-48 lg:w-56 lg:h-56 rounded-full border border-slate-800 dark:border-slate-700 flex flex-col items-center justify-center overflow-hidden cursor-default bg-black shadow-[0_10px_40px_-15px_rgba(0,0,0,0.3)] transition-all duration-500">
              <div className="absolute top-0 left-0 w-12 h-12 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-[15] transition-transform duration-700 ease-out z-0 origin-center"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <span className="text-5xl lg:text-7xl font-black text-white group-hover:text-black transition-colors duration-300">
                  1.5+
                </span>
                <span className="text-xs lg:text-sm font-bold text-slate-300 group-hover:text-slate-800 transition-colors duration-300 mt-2">
                  Years of Experience
                </span>
              </div>
            </div>
          </div>

          {/* Center: Text Content */}
          <div className="flex-1 flex flex-col gap-6 lg:gap-8 text-slate-900 dark:text-slate-100 text-lg md:text-xl lg:text-2xl font-bold leading-relaxed text-center px-4 lg:px-8">
            <p className="reveal-item">
              I'm a <span className="text-black dark:text-white font-black underline decoration-slate-400 dark:decoration-slate-600 underline-offset-4">Full Stack Developer</span> with 1.5+ years of experience building scalable, responsive and production-ready web applications.
            </p>
            <p className="reveal-item">
              I specialize in React.js, Next.js, TypeScript, Tailwind CSS and Node.js, with hands-on expertise in REST APIs, PostgreSQL, Redis, real-time communication with Socket.IO & LiveKit, and modular component architecture.
            </p>
            <p className="reveal-item">
              I also build cross-platform mobile apps with React Native & Expo, focusing on high-performance operational workflows, location-based services, and fluid 60fps user experiences.
            </p>
          </div>

          {/* Right: Projects Badge */}
          <div className="flex-shrink-0 reveal-item relative z-20 pointer-events-auto">
            <div className="relative group w-48 h-48 lg:w-56 lg:h-56 rounded-full border border-slate-800 dark:border-slate-700 flex flex-col items-center justify-center overflow-hidden cursor-default bg-black shadow-[0_10px_40px_-15px_rgba(0,0,0,0.3)] transition-all duration-500">
              <div className="absolute top-0 left-0 w-12 h-12 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-[15] transition-transform duration-700 ease-out z-0 origin-center"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <span className="text-5xl lg:text-7xl font-black text-white group-hover:text-black transition-colors duration-300">
                  10+
                </span>
                <span className="text-xs lg:text-sm font-bold text-slate-300 group-hover:text-slate-800 transition-colors duration-300 mt-2">
                  Live Projects
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
