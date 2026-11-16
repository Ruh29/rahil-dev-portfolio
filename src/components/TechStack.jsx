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
      let mm = gsap.matchMedia();

      // Desktop: Pinned Cinematic Scatter & Cluster Animation
      mm.add("(min-width: 768px)", () => {
        const pills = gsap.utils.toArray(".tech-pill");
        const title = document.querySelector(".tech-title");
        if (pills.length === 0) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=200%",
            scrub: 1,
            pin: true,
          },
        });

        // 1. Initial State: Scattered outside
        pills.forEach((pill) => {
          gsap.set(pill, {
            x: () => (Math.random() - 0.5) * window.innerWidth * 1.8,
            y: () => (Math.random() - 0.5) * window.innerHeight * 1.8,
            opacity: 0,
            scale: 0.2,
            rotate: () => (Math.random() - 0.5) * 180,
          });
        });

        gsap.set(title, { opacity: 0, scale: 0.85 });

        // 2. Fly in and cluster
        tl.to(title, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }, "enter")
          .to(
            pills,
            {
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              rotate: 0,
              stagger: 0.03,
              duration: 1.2,
              ease: "back.out(1.1)",
            },
            "enter"
          );

        // 3. Subtle drift
        tl.to(
          pills,
          {
            x: () => (Math.random() - 0.5) * 60,
            y: () => (Math.random() - 0.5) * 60,
            rotate: () => (Math.random() - 0.5) * 20,
            duration: 1.5,
            ease: "sine.inOut",
          },
          "roam"
        );

        // 4. Fly away
        tl.to(title, { opacity: 0, scale: 1.2, duration: 0.8, ease: "power2.in" }, "exit")
          .to(
            pills,
            {
              x: () => (Math.random() - 0.5) * window.innerWidth * 1.8,
              y: () => (Math.random() - 0.5) * window.innerHeight * 1.8,
              opacity: 0,
              scale: 0.2,
              rotate: () => (Math.random() - 0.5) * 180,
              duration: 1.2,
              ease: "power3.in",
            },
            "exit"
          );
      });

      // Mobile: Smooth, Non-Pinned Staggered Scroll Entrance
      mm.add("(max-width: 767px)", () => {
        gsap.from(".tech-pill", {
          opacity: 0,
          scale: 0.8,
          y: 25,
          stagger: 0.03,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="tech-stack"
      ref={containerRef}
      className="w-full min-h-screen md:h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden relative z-20 py-20 md:py-0"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-500,139,92,246),0.12),transparent_70%)] pointer-events-none"></div>

      <h2 className="tech-title text-4xl sm:text-5xl md:text-7xl font-black mb-10 md:mb-14 tracking-tighter uppercase text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.25)] text-center px-4">
        Tech Stack
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3.5 md:gap-5 max-w-5xl px-4 sm:px-6 relative z-10">
        {technologies.map((tech, i) => (
          <div
            key={i}
            className="tech-pill px-4 py-2 sm:px-5 sm:py-2.5 md:px-7 md:py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs sm:text-sm md:text-xl font-bold text-white shadow-[0_5px_15px_-5px_rgba(255,255,255,0.2)] transition-colors hover:border-primary-400 hover:text-primary-300"
          >
            {tech}
          </div>
        ))}
      </div>
    </section>
  );
}
