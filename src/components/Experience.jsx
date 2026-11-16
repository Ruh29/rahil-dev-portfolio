import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const experience = [
  {
    role: "Full Stack & Application Developer",
    company: "PurpleSky Infotech — Barwani, MP",
    period: "Dec 2025 — Present",
    desc: [
      "Architect and maintain scalable web and mobile applications using React.js, Next.js, Node.js, Express.js, PostgreSQL, TypeORM, and Redis.",
      "Build secure REST APIs, role-based access control (RBAC), and authentication systems across enterprise applications.",
      "Contribute to AI-powered platforms including Purple Learning, AI Product Auditor, and Seek-N-Hire recruitment system.",
      "Develop cross-platform mobile applications in React Native (Expo) with real-time features, state management, and optimized workflows.",
      "Integrate real-time communications using Socket.IO and LiveKit, reducing latency and enhancing live session collaboration.",
      "Optimize PostgreSQL database queries, schemas, and indexing for high-performance multi-tenant platforms."
    ]
  },
  {
    role: "Frontend Developer Intern (Paid Internship)",
    company: "LogiQlink Technologies — Indore, MP",
    period: "Jun 2025 — Nov 2025",
    desc: [
      "Completed a 6-month hands-on paid internship focused on frontend and client application development.",
      "Built responsive, mobile-first user interfaces using React.js, JavaScript (ES6+), HTML5, CSS3, and Tailwind CSS.",
      "Managed application state with Redux Toolkit and integrated RESTful endpoints with error handling.",
      "Participated in agile sprints, daily standups, code reviews, and Git/GitHub version-controlled releases on Vercel and Netlify."
    ]
  }
];

const education = [
  {
    degree: "Bachelor of Information Technology",
    institution: "LNCT University, Indore",
    period: "2021 — 2025",
    grade: "Major: Full Stack & Software Engineering"
  },
  {
    degree: "AWS Certified Solutions Architect",
    institution: "Amazon Web Services (AWS)",
    period: "2023",
    grade: "Cloud Architecture & Services"
  },
  {
    degree: "MongoDB Certified Developer Associate",
    institution: "MongoDB Inc.",
    period: "2023",
    grade: "Database Design & Queries"
  }
];

const approach = [
  { id: "01", title: "Understand", desc: "Analyze business goals, user journeys, architecture requirements, and edge cases." },
  { id: "02", title: "Design", desc: "Craft intuitive, accessible, responsive interfaces with clean interaction patterns." },
  { id: "03", title: "Develop", desc: "Build scalable codebases using Next.js, React, Node.js, TypeScript, and modern best practices." },
  { id: "04", title: "Integrate", desc: "Connect robust REST APIs, PostgreSQL/MongoDB, Redis caching, and WebSockets." },
  { id: "05", title: "Test", desc: "Ensure rigorous cross-browser compatibility, responsive performance, and reliability." },
  { id: "06", title: "Deploy", desc: "Ship production-ready code with continuous deployment, monitoring, and zero downtime." }
];

const reasons = [
  { title: "Modern Full Stack", desc: "End-to-end expertise spanning React, Next.js, Node.js, Express, PostgreSQL, and TypeScript." },
  { title: "Mobile & Real-Time", desc: "Hands-on experience building mobile apps with React Native (Expo) and real-time Socket.IO/LiveKit." },
  { title: "Clean Architecture", desc: "Component reusability, maintainable service layers, and predictable state management." },
  { title: "Database & Performance", desc: "Relational data modeling, TypeORM migrations, Redis caching, and fast API queries." },
  { title: "Production Proven", desc: "Track record of delivering live client projects and enterprise suites under tight deadlines." },
  { title: "Fast Learner & Adaptable", desc: "Passionate about modern developer tooling, AI platform integrations, and scalable solutions." }
];

export default function Experience() {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // Desktop Animation (Horizontal Pinned Scroll)
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=350%",
            pin: true,
            scrub: 1,
          }
        });

        tl.to(scrollRef.current, { x: "-25%", ease: "none", duration: 1 })
          .from(".panel-2-content", { opacity: 0, scale: 0.95, duration: 0.5 }, "-=0.5");

        tl.to(scrollRef.current, { x: "-50%", ease: "none", duration: 1 })
          .from(".panel-3-content", { opacity: 0, scale: 0.95, duration: 0.5 }, "-=0.5");

        tl.to(scrollRef.current, { x: "-75%", ease: "none", duration: 1 })
          .from(".panel-4-content", { opacity: 0, scale: 0.95, duration: 0.5 }, "-=0.5");
      });

      // Mobile / Tablet Animation (Smooth Vertical Fade In)
      mm.add("(max-width: 1023px)", () => {
        const panels = gsap.utils.toArray(".cinematic-panel");
        panels.forEach((panel) => {
          gsap.from(panel.querySelector(".panel-content"), {
            opacity: 0,
            y: 30,
            duration: 0.7,
            scrollTrigger: {
              trigger: panel,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          });
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={containerRef} className="relative w-full lg:h-[100svh] overflow-hidden bg-white text-black font-sans selection:bg-black selection:text-white">
      <div ref={scrollRef} className="flex flex-col lg:flex-row w-full lg:w-[400vw] lg:h-full will-change-transform">
        
        {/* PANEL 1: EXPERIENCE (White) */}
        <div className="cinematic-panel w-full lg:w-screen min-h-[100svh] lg:min-h-0 lg:h-full flex items-center justify-center py-16 px-5 sm:px-8 lg:p-24 bg-white text-black border-b lg:border-b-0 border-black/10">
          <div className="panel-1-content panel-content w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <div className="text-xs sm:text-sm font-black tracking-[0.4em] uppercase text-black mb-3 opacity-50">Chapter 01</div>
              <h2 className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tighter leading-none mb-4 lg:mb-6">EXPERI<br/>ENCE.</h2>
              <div className="w-20 lg:w-24 h-1.5 lg:h-2 bg-black"></div>
            </div>
            
            <div className="lg:col-span-7 flex flex-col gap-8 lg:max-h-[60vh] lg:overflow-y-auto pr-0 lg:pr-4 custom-scrollbar">
              {experience.map((exp, i) => (
                <div key={i} className="relative pl-6 sm:pl-8 lg:pl-12 border-l-3 lg:border-l-4 border-black/20">
                  <div className="absolute w-5 h-5 lg:w-6 lg:h-6 bg-black rounded-full -left-[11px] lg:-left-[15px] top-0 border-3 lg:border-4 border-white shadow-[0_0_15px_rgba(0,0,0,0.2)]"></div>
                  <div className="text-xs sm:text-sm font-black tracking-widest text-black/50 mb-1.5 uppercase">{exp.period}</div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-black mb-1">{exp.role}</h3>
                  <div className="text-black font-black text-base sm:text-lg mb-3 opacity-70">{exp.company}</div>
                  <ul className="flex flex-col gap-2">
                    {exp.desc.map((d, j) => (
                      <li key={j} className="text-black/80 text-xs sm:text-sm lg:text-base leading-relaxed flex items-start gap-2.5 font-medium">
                        <span className="text-black mt-0.5 font-black text-base">▹</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PANEL 2: EDUCATION & CERTIFICATIONS (Black) */}
        <div className="cinematic-panel w-full lg:w-screen min-h-[100svh] lg:min-h-0 lg:h-full flex items-center justify-center py-16 px-5 sm:px-8 lg:p-24 bg-black text-white">
          <div className="panel-2-content panel-content w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-6 order-last lg:order-first flex flex-col gap-4 sm:gap-5 lg:max-h-[60vh] lg:overflow-y-auto pr-0 lg:pr-3 custom-scrollbar">
              {education.map((edu, i) => (
                <div key={i} className="relative p-5 sm:p-7 lg:p-8 rounded-2xl sm:rounded-3xl bg-zinc-950 border border-white/20 shadow-xl">
                  <div className="text-[11px] sm:text-xs font-black tracking-widest text-white/50 mb-1.5 uppercase">{edu.period}</div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white mb-1">{edu.degree}</h3>
                  <div className="text-white font-bold mb-3 text-sm sm:text-base opacity-70">{edu.institution}</div>
                  <div className="text-[11px] sm:text-xs font-black text-black bg-white inline-block px-3.5 py-1 rounded-full shadow-md">{edu.grade}</div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-6 text-left lg:text-right">
              <div className="text-xs sm:text-sm font-black tracking-[0.4em] uppercase text-white mb-3 opacity-50">Chapter 02</div>
              <h2 className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tighter leading-none mb-4 lg:mb-6 text-white">EDUCA<br/>TION.</h2>
              <div className="w-20 lg:w-24 h-1.5 lg:h-2 bg-white mr-auto lg:ml-auto lg:mr-0"></div>
            </div>
          </div>
        </div>

        {/* PANEL 3: MY APPROACH (White) */}
        <div className="cinematic-panel w-full lg:w-screen min-h-[100svh] lg:min-h-0 lg:h-full flex flex-col items-center justify-center py-16 px-5 sm:px-8 lg:p-24 bg-white text-black border-b lg:border-b-0 border-black/10">
          <div className="panel-3-content panel-content w-full max-w-7xl">
            <div className="text-left sm:text-center mb-8 sm:mb-12">
              <div className="text-xs sm:text-sm font-black tracking-[0.4em] uppercase text-black mb-2 opacity-50">Chapter 03</div>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter text-black">HOW I BUILD.</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
              {approach.map((step, i) => (
                <div key={i} className="bg-white border-2 border-black/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 hover:bg-black hover:text-white hover:border-black transition-colors shadow-xs group">
                  <div className="text-black font-black text-3xl sm:text-4xl mb-2 opacity-30 group-hover:text-white group-hover:opacity-50 transition-all">{step.id}</div>
                  <h4 className="text-lg sm:text-xl font-black mb-1.5 text-black group-hover:text-white transition-colors">{step.title}</h4>
                  <p className="text-black/70 text-xs sm:text-sm font-medium group-hover:text-white/80 transition-colors leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PANEL 4: WHY WORK WITH ME (Black) */}
        <div className="cinematic-panel w-full lg:w-screen min-h-[100svh] lg:min-h-0 lg:h-full flex flex-col items-center justify-center py-16 px-5 sm:px-8 lg:p-24 bg-black text-white">
          <div className="panel-4-content panel-content w-full max-w-7xl">
            <div className="text-left sm:text-center mb-8 sm:mb-12">
              <div className="text-xs sm:text-sm font-black tracking-[0.4em] uppercase text-white mb-2 opacity-50">Chapter 04</div>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter text-white">WHY ME?</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
              {reasons.map((reason, i) => (
                <div key={i} className="flex flex-col gap-2.5 p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-zinc-950 border border-white/20">
                  <div className="text-black bg-white w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-black text-white mb-1">{reason.title}</h4>
                    <p className="text-white/60 text-xs sm:text-sm font-medium leading-relaxed">{reason.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
