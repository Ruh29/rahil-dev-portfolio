import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "../assets/hero-portrait.png";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ onOpenResume }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        navRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.1 }
      )
        .fromTo(
          ".hero-char",
          { opacity: 0, y: 35, rotateX: -40 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.025, ease: "back.out(1.8)" },
          "-=0.7"
        )
        .fromTo(
          imageRef.current,
          { y: 60, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
          "-=0.4"
        );

      // Mouse parallax only on desktop with pointer device
      const handleMouseMove = (e) => {
        if (window.innerWidth < 1024) return;
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to(textRef.current, {
          x: xPos,
          y: yPos,
          duration: 1.2,
          ease: "power2.out",
        });

        gsap.to(imageRef.current, {
          x: -xPos * 0.3,
          y: -yPos * 0.3,
          duration: 1.2,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[92svh] md:min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-white overflow-hidden flex flex-col font-sans transition-colors duration-500 selection:bg-slate-900 selection:text-white"
    >
      {/* Top Header */}
      <header
        ref={navRef}
        className="w-full flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6 md:px-12 md:py-8 z-50 absolute top-0 left-0 right-0 opacity-0"
      >
        <div className="text-xl md:text-2xl font-black tracking-tighter uppercase cursor-pointer hover:opacity-75 transition-opacity">
          RAHIL<span className="text-primary-500">.</span>
        </div>

        <button
          onClick={onOpenResume}
          className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3.5 rounded-full text-[10px] sm:text-xs font-bold tracking-[0.2em] hover:bg-primary-600 hover:text-white dark:hover:bg-primary-500 dark:hover:text-white hover:shadow-xl hover:shadow-primary-500/25 transition-all duration-300 uppercase cursor-pointer active:scale-95"
        >
          Download CV
        </button>
      </header>

      {/* Main Hero Body */}
      <div className="flex-1 flex items-center justify-center relative w-full h-full pt-20 md:pt-16">
        {/* Giant Background Typography */}
        <h1
          ref={textRef}
          className="absolute inset-0 z-10 text-[18vw] md:text-[14vw] font-black leading-[0.85] tracking-tighter text-slate-900/80 dark:text-white/85 whitespace-nowrap select-none flex flex-col items-center justify-center w-full pointer-events-none mt-4 md:mt-0 will-change-transform"
          style={{ perspective: "1000px" }}
        >
          <span className="block text-center w-full">
            {"FULL STACK".split("").map((char, i) => (
              <span key={`1-${i}`} className="hero-char inline-block origin-bottom">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
          <span className="block text-center w-full">
            {"DEVELOPER".split("").map((char, i) => (
              <span key={`2-${i}`} className="hero-char inline-block origin-bottom">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        </h1>

        {/* Foreground Portrait Image */}
        <div
          ref={imageRef}
          className="absolute bottom-0 left-0 right-0 z-20 w-full h-[55vh] sm:h-[62vh] md:h-[78vh] flex items-end justify-center pointer-events-none opacity-0 will-change-transform"
        >
          <img
            src={heroImg}
            alt="Rahil Sheikh - Full Stack Developer"
            className="h-full w-auto max-w-[92vw] sm:max-w-[80vw] md:max-w-none object-contain object-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)]"
            style={{
              maxHeight: "82vh",
            }}
          />
        </div>
      </div>
    </section>
  );
}
