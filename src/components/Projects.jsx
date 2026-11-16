import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const rahilProjects = [
  {
    id: "01",
    name: "Purple Learning",
    subtitle: "AI-Powered Learning & Mentorship Platform",
    desc: "Enterprise e-learning platform supporting Admin, Instructor, and Student portals with LiveKit live video classrooms, HLS streaming, and Redis caching.",
    focus: ["Next.js", "Node.js", "PostgreSQL", "LiveKit", "Redis"],
    link: "https://learning-dev.purpleagentic.in/",
  },
  {
    id: "02",
    name: "AI Product Auditor",
    subtitle: "AI-Based Product Quality & Audit Tool",
    desc: "AI-powered product audit dashboard converting UI, UX, and accessibility analysis into structured, actionable enterprise reports.",
    focus: ["Next.js", "TypeScript", "Tailwind CSS", "AI APIs"],
    link: "https://ai-product-auditor-6qjxufcqf-meetlychats-projects.vercel.app/",
  },
  {
    id: "03",
    name: "Seek-N-Hire",
    subtitle: "Recruitment & Job Management Platform",
    desc: "AI recruitment platform with candidate workflows, sponsorship rotation, real-time Socket.IO notifications, and RBAC permissions.",
    focus: ["React.js", "Node.js", "Express.js", "PostgreSQL", "Socket.IO"],
    link: "https://seek-n-hire-api.purpleagentic.in/",
  },
  {
    id: "04",
    name: "PurpleSuite",
    subtitle: "Enterprise Business Management Suite",
    desc: "Lead, client, sales, proposal, quotation, purchase order, and advanced reporting workflows with high-volume relational schemas.",
    focus: ["React.js", "TypeScript", "Node.js", "PostgreSQL", "TypeORM"],
    link: "https://purplesuite-staging.purpleagentic.in/",
  },
  {
    id: "05",
    name: "PurpleHire",
    subtitle: "AI Mock Interview & Speech Coach",
    desc: "Mobile interview prep application with dynamic technical mock interviews, voice capture pipelines, and automated performance insights.",
    focus: ["React Native", "Expo", "AI Integration", "Node.js", "REST APIs"],
    link: "#",
  },
  {
    id: "06",
    name: "FitZo",
    subtitle: "Fitness & Nutrition Mobile Ecosystem",
    desc: "Personalized fitness application with multi-step onboarding profiling, macro calculations, and offline-first state synchronization.",
    focus: ["React Native", "TypeScript", "Zustand", "Express.js"],
    link: "#",
  },
  {
    id: "07",
    name: "Fleet Management App",
    subtitle: "Field Logistics & Tracking",
    desc: "Cross-platform mobile application powering fleet operations, location-based GPS workflows, and real-time operational data handling.",
    focus: ["React Native", "Expo", "PostgreSQL", "REST APIs"],
    link: "#",
  },
  {
    id: "08",
    name: "Stock Market Tracker",
    subtitle: "Financial Data & Analytics",
    desc: "High-frequency market tracking mobile interface delivering live quotes, interactive charts, and optimized client-side caching.",
    focus: ["React Native", "Expo", "REST APIs", "Node.js"],
    link: "#",
  },
  {
    id: "09",
    name: "E-Commerce & Storefront",
    subtitle: "Full-Stack Retail System",
    desc: "Scalable e-commerce web platform with authentication, catalog browsing, cart state management, and payment checkout flows.",
    focus: ["React.js", "Tailwind CSS", "Express.js", "MongoDB"],
    link: "#",
  },
];

export default function Projects() {
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  const [activeCards, setActiveCards] = useState([]);
  const [activeLines, setActiveLines] = useState([]);
  const [cardRects, setCardRects] = useState([]);

  const timeoutsRef = useRef([]);

  const measureCards = () => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".featured-card");
    const gridRect = gridRef.current.getBoundingClientRect();

    const rects = Array.from(cards).map((card) => {
      const rect = card.getBoundingClientRect();
      return {
        x: rect.left - gridRect.left + rect.width / 2,
        y: rect.top - gridRect.top + rect.height / 2,
      };
    });
    setCardRects(rects);
  };

  useEffect(() => {
    measureCards();
    window.addEventListener("resize", measureCards);
    return () => window.removeEventListener("resize", measureCards);
  }, []);

  const handleMouseEnter = (startIndex) => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    setActiveCards([startIndex]);
    setActiveLines([]);

    let currentIndex = startIndex;

    const animateNext = () => {
      if (currentIndex >= rahilProjects.length - 1) return;

      setActiveLines((prev) => [...prev, currentIndex]);

      const t1 = setTimeout(() => {
        currentIndex++;
        setActiveCards((prev) => [...prev, currentIndex]);

        const t2 = setTimeout(animateNext, 50);
        timeoutsRef.current.push(t2);
      }, 300);

      timeoutsRef.current.push(t1);
    };

    const t = setTimeout(animateNext, 50);
    timeoutsRef.current.push(t);
  };

  const handleMouseLeaveGrid = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setActiveCards([]);
    setActiveLines([]);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".projects-header",
        { opacity: 0, y: 30 },
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
      id="projects"
      ref={containerRef}
      className="relative w-full py-28 bg-white dark:bg-[#070b14] text-slate-900 dark:text-white overflow-hidden transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="inline-block projects-header">
            <h2 className="text-xs font-black tracking-[0.4em] uppercase text-slate-500 dark:text-slate-400 mb-6 border border-slate-200 dark:border-slate-800 px-6 py-2 rounded-full bg-white dark:bg-slate-900 shadow-sm">
              Portfolio
            </h2>
          </div>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1] projects-header text-slate-900 dark:text-white uppercase mb-4">
            Selected Projects
          </h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl text-sm md:text-base font-medium projects-header">
            Enterprise platforms, AI systems, and mobile applications built for performance and scale.
          </p>
        </div>

        <div
          ref={gridRef}
          className="featured-projects-container relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          onMouseLeave={handleMouseLeaveGrid}
        >
          {/* SVG Overlay for Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden lg:block">
            {cardRects.map((rect, i) => {
              if (i === cardRects.length - 1) return null;
              const nextRect = cardRects[i + 1];
              if (!nextRect) return null;
              const isActive = activeLines.includes(i);
              const length = Math.sqrt(
                Math.pow(nextRect.x - rect.x, 2) + Math.pow(nextRect.y - rect.y, 2)
              );

              return (
                <line
                  key={i}
                  x1={rect.x}
                  y1={rect.y}
                  x2={nextRect.x}
                  y2={nextRect.y}
                  stroke="currentColor"
                  className="text-primary-500 dark:text-primary-400"
                  strokeWidth="2.5"
                  strokeDasharray={length}
                  strokeDashoffset={isActive ? 0 : length}
                  style={{ transition: "stroke-dashoffset 0.3s linear" }}
                />
              );
            })}
          </svg>

          {rahilProjects.map((project, index) => {
            const isActive = activeCards.includes(index);

            return (
              <a
                href={project.link !== "#" ? project.link : undefined}
                target={project.link !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                className={`block z-10 ${
                  index === 0 || index === 1 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div
                  className={`featured-card relative bg-white dark:bg-slate-900/80 border rounded-3xl p-8 md:p-10 h-full flex flex-col overflow-hidden origin-center transition-all duration-300 ${
                    isActive
                      ? "border-primary-500 dark:border-primary-400 shadow-xl shadow-primary-500/10 -translate-y-1.5"
                      : "border-slate-200 dark:border-slate-800 shadow-sm"
                  }`}
                >
                  {/* Watermark Number */}
                  <div
                    className={`absolute -right-4 -bottom-10 text-[120px] font-black transition-colors duration-300 pointer-events-none tracking-tighter leading-none select-none ${
                      isActive
                        ? "text-primary-500/10 dark:text-primary-400/10"
                        : "text-slate-100 dark:text-slate-800/40"
                    }`}
                  >
                    {project.id}
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${
                          isActive
                            ? "text-primary-600 dark:text-primary-400"
                            : "text-slate-400 dark:text-slate-500"
                        }`}
                      >
                        PROJECT {project.id}
                      </div>
                      <div
                        className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-300 ${
                          isActive
                            ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`transition-transform duration-300 ${
                            isActive ? "rotate-45" : ""
                          }`}
                        >
                          <path d="M7 17l9.2-9.2M17 17V7H7" />
                        </svg>
                      </div>
                    </div>

                    <h4 className="text-2xl md:text-3xl font-black tracking-tighter mb-2 text-slate-900 dark:text-white">
                      {project.name}
                    </h4>
                    <div className="text-primary-600 dark:text-primary-400 text-xs font-bold tracking-wide uppercase mb-5">
                      {project.subtitle}
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 font-medium text-sm leading-relaxed mb-8 flex-1">
                      {project.desc}
                    </p>

                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2">
                        {project.focus.map((f, i) => (
                          <span
                            key={i}
                            className={`text-[10px] font-bold px-3 py-1.5 border rounded-full transition-colors duration-300 ${
                              isActive
                                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white"
                                : "bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                            }`}
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
