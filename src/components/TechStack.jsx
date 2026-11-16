import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const technologies = [
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "PostgreSQL",
  "TypeORM",
  "Redis",
  "Socket.IO",
  "LiveKit",
  "React Native",
  "Expo",
  "MongoDB",
  "REST APIs",
  "Git & GitHub",
  "Docker",
  "Vercel",
  "Postman",
];

export default function TechStack() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const pills = gsap.utils.toArray(".tech-pill");
      const title = document.querySelector(".tech-title");
      if (pills.length === 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=220%",
          scrub: 1.2,
          pin: true,
        },
      });

      // 1. Initial State: Scattered far outside the viewport
      pills.forEach((pill) => {
        gsap.set(pill, {
          x: () => (Math.random() - 0.5) * window.innerWidth * 2.5,
          y: () => (Math.random() - 0.5) * window.innerHeight * 2.5,
          opacity: 0,
          scale: 0.1,
          rotate: () => (Math.random() - 0.5) * 360,
        });
      });

      gsap.set(title, { opacity: 0, scale: 0.8 });

      // 2. Fly in and form an orderly cluster
      tl.to(title, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }, "enter")
        .to(
          pills,
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            stagger: 0.04,
            duration: 1.5,
            ease: "back.out(1.2)",
          },
          "enter"
        );

      // 3. Roam around - Wiggle effect
      tl.to(
        pills,
        {
          x: () => (Math.random() - 0.5) * 120,
          y: () => (Math.random() - 0.5) * 120,
          rotate: () => (Math.random() - 0.5) * 35,
          scale: () => 0.9 + Math.random() * 0.25,
          duration: 2,
          ease: "sine.inOut",
        },
        "roam"
      );

      // 4. Fly away and disappear off-screen
      tl.to(title, { opacity: 0, scale: 1.4, duration: 1, ease: "power2.in" }, "exit")
        .to(
          pills,
          {
            x: () => (Math.random() - 0.5) * window.innerWidth * 2.5,
            y: () => (Math.random() - 0.5) * window.innerHeight * 2.5,
            opacity: 0,
            scale: 0,
            rotate: () => (Math.random() - 0.5) * 360,
            duration: 1.5,
            ease: "power3.in",
          },
          "exit"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="tech-stack"
      ref={containerRef}
      className="w-full h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden relative z-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-500,139,92,246),0.12),transparent_70%)] pointer-events-none"></div>

      <h2 className="tech-title text-4xl md:text-7xl font-black mb-14 tracking-tighter uppercase text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.25)] text-center px-4">
        Tech Stack
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6 max-w-5xl px-6 relative z-10">
        {technologies.map((tech, i) => (
          <div
            key={i}
            className="tech-pill px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 rounded-full text-sm sm:text-base md:text-2xl font-bold text-white shadow-[0_10px_30px_-10px_rgba(255,255,255,0.2)] transition-colors hover:border-primary-400 hover:text-primary-300"
          >
            {tech}
          </div>
        ))}
      </div>
    </section>
  );
}
