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
    desc: "Scalable recruitment workflow platform with candidate pipelines, sponsorship rotation, and granular role-based permissions.",
    focus: ["React", "Express.js", "PostgreSQL", "TypeORM"],
    link: "https://seek-n-hire-api.purpleagentic.in/",
  },
  {
    id: "04",
    name: "PurpleSuite",
    subtitle: "Enterprise Business Management ERP",
    desc: "Unified business suite featuring BOQ proposals, quotation generation, automated invoice PDF pipelines, and date-range operational reporting.",
    focus: ["React", "TypeScript", "PostgreSQL", "TypeORM"],
    link: "https://purplesuite-staging.purpleagentic.in/",
  },
  {
    id: "05",
    name: "PurpleHire",
    subtitle: "AI Interview Coach Mobile App",
    desc: "Cross-platform mobile application conducting voice-based mock interviews with speech-to-text feedback and answer analysis.",
    focus: ["React Native", "Expo", "Node.js", "AI APIs"],
    link: "#",
  },
  {
    id: "06",
    name: "FitZo",
    subtitle: "Fitness & Macro Nutrition Mobile App",
    desc: "Mobile fitness app with multi-step health onboarding, BMR calorie calculators, personalized workout splits, and hydration tracking.",
    focus: ["React Native", "TypeScript", "Node.js", "Zustand"],
    link: "#",
  },
  {
    id: "07",
    name: "Fleet Management App",
    subtitle: "Cross-Platform Field Logistics Mobile App",
    desc: "Field operational application managing fleet dispatching, location checkpoints, ticket assignments, and driver status updates.",
    focus: ["React Native", "Expo", "REST APIs", "Node.js"],
    link: "#",
  },
  {
    id: "08",
    name: "Stock Market Tracker",
    subtitle: "Real-Time Equity Analysis App",
    desc: "Mobile market tracker displaying dynamic stock charts, price alerts, watchlists, and portfolio performance analytics.",
    focus: ["React Native", "Expo", "WebSockets", "REST APIs"],
    link: "#",
  },
  {
    id: "09",
    name: "Enterprise Client Portal",
    subtitle: "Client Onboarding & Project Management Portal",
    desc: "Responsive web portal built during Developers Point internship featuring modular dashboard components, state caching, and responsive data tables.",
    focus: ["React.js", "JavaScript", "Tailwind CSS", "Bootstrap"],
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
    const cards = gridRef.current.querySelectorAll(".project-card");
    const containerRect = gridRef.current.getBoundingClientRect();

    const rects = Array.from(cards).map((card) => {
      const r = card.getBoundingClientRect();
      return {
        x: r.left - containerRect.left + r.width / 2,
        y: r.top - containerRect.top + r.height / 2,
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
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
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
          duration: 0.8,
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
                  className="text-black dark:text-white opacity-40"
                  strokeWidth="2"
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
                rel={project.link !== "#" ? "noopener noreferrer" : undefined}
                key={project.id}
                onMouseEnter={() => handleMouseEnter(index)}
                className={`project-card group relative flex flex-col justify-between bg-white dark:bg-slate-900 rounded-3xl p-8 border transition-all duration-300 z-10 ${
                  isActive
                    ? "border-black dark:border-white shadow-xl scale-[1.02]"
                    : "border-slate-200 dark:border-slate-800 shadow-sm hover:border-black/50 dark:hover:border-white/50"
                }`}
              >
                <div>
                  {/* Top Bar: Project ID & Link Arrow */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-3xl font-black text-slate-300 dark:text-slate-700 group-hover:text-black dark:group-hover:text-white transition-colors">
                      {project.id}
                    </span>
                    {project.link !== "#" && (
                      <div className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-black dark:group-hover:text-white group-hover:border-black dark:group-hover:border-white transition-all">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Project Title & Subtitle */}
                  <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-black dark:group-hover:text-white transition-colors">
                    {project.name}
                  </h4>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                    {project.subtitle}
                  </div>

                  {/* Project Description */}
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 font-medium">
                    {project.desc}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                  {project.focus.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
