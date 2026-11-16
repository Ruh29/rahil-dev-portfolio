import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import portfolioData from "../data/portfolioData";

export default function Contact() {
  const containerRef = useRef(null);
  const { personalInfo } = portfolioData;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
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
    <section id="contact" ref={containerRef} className="relative w-full py-32 bg-white dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden transition-colors duration-300">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_60%)] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-primary-500 mb-6">
            Let's Connect
          </h2>
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-8">
            Have a Project<br />in Mind?
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-light leading-relaxed">
            Let's build something scalable and impactful together. I'm always open to discussing new opportunities, full-stack roles, and modern tech architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 contact-card">
          <a
            href={`mailto:${personalInfo.email}`}
            className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm rounded-3xl p-8 hover:border-primary-500/50 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-2">Email</div>
            <div className="text-slate-900 dark:text-slate-100 font-medium break-all">{personalInfo.email}</div>
          </a>
          
          <a
            href={`tel:${personalInfo.phone}`}
            className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm rounded-3xl p-8 hover:border-primary-500/50 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-2">Phone</div>
            <div className="text-slate-900 dark:text-slate-100 font-medium">{personalInfo.phone}</div>
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm rounded-3xl p-8 hover:border-primary-500/50 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </div>
            <div className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-2">LinkedIn</div>
            <div className="text-slate-900 dark:text-slate-100 font-medium">ruh-sheikh29</div>
          </a>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm rounded-3xl p-8 hover:border-primary-500/50 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </div>
            <div className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-2">GitHub</div>
            <div className="text-slate-900 dark:text-slate-100 font-medium break-all">github.com/Ruh29</div>
          </a>
        </div>
      </div>
    </section>
  );
}
