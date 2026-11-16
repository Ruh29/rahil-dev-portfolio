import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CircularGallery from "./CircularGallery";

const galleryItems = [
  {
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    text: "Frontend Development",
  },
  {
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
    text: "Backend & APIs",
  },
  {
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
    text: "Mobile Apps",
  },
  {
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    text: "Real-Time & AI",
  },
];

export default function Skills() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        ".skills-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
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
      id="skills"
      ref={containerRef}
      className="w-full min-h-screen bg-black text-white overflow-hidden relative z-10 border-t border-slate-900 flex flex-col items-center py-24"
    >
      {/* Header Section */}
      <div className="w-full flex flex-col items-center text-center px-6 z-20 mb-12">
        <div className="inline-block skills-header">
          <h2 className="text-xs font-black tracking-[0.4em] uppercase text-slate-400 mb-6 border border-slate-800 px-6 py-2 rounded-full bg-white/5 shadow-sm backdrop-blur-md">
            Services & Skills
          </h2>
        </div>
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1] skills-header text-white uppercase mb-4">
          What I Do
        </h3>
      </div>

      {/* Circular Gallery Integration */}
      <div className="relative w-full h-[600px] z-10 mt-8">
        <CircularGallery
          items={galleryItems}
          bend={3}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.02}
        />
      </div>
    </section>
  );
}
