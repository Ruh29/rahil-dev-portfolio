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
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=400%", // 4 screens worth of scrolling
            pin: true,
            scrub: 1,
          }
        });

        tl.to(scrollRef.current, { x: "-25%", ease: "none", duration: 1 })
          .from(".panel-2-content", { opacity: 0, scale: 0.9, rotationY: 10, duration: 0.5 }, "-=0.5");

        tl.to(scrollRef.current, { x: "-50%", ease: "none", duration: 1 })
          .from(".panel-3-content", { opacity: 0, scale: 0.9, rotationY: 10, duration: 0.5 }, "-=0.5");

        tl.to(scrollRef.current, { x: "-75%", ease: "none", duration: 1 })
          .from(".panel-4-content", { opacity: 0, scale: 0.9, rotationY: 10, duration: 0.5 }, "-=0.5");
      });

      // Mobile Animation (Vertical Fade In)
      mm.add("(max-width: 767px)", () => {
        const panels = gsap.utils.toArray(".cinematic-panel");
        panels.forEach((panel) => {
          gsap.from(panel.querySelector(".panel-content"), {
            opacity: 0,
            y: 40,
            duration: 0.8,
            scrollTrigger: {
              trigger: panel,
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          });
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={containerRef} className="relative w-full md:h-[100svh] overflow-hidden bg-white text-black font-sans selection:bg-black selection:text-white">
      <div ref={scrollRef} className="flex flex-col md:flex-row w-full md:w-[400vw] md:h-full will-change-transform">
        
        {/* PANEL 1: EXPERIENCE (White) */}
        <div className="cinematic-panel w-full md:w-screen min-h-[100svh] md:min-h-0 md:h-full flex items-center justify-center py-20 px-6 md:p-24 bg-white text-black border-b md:border-b-0 border-black/10">
          <div className="panel-1-content panel-content w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
            <div className="lg:col-span-5">
              <div className="text-sm font-black tracking-[0.4em] uppercase text-black mb-4 opacity-50">Chapter 01</div>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6">EXPERI<br/>ENCE.</h2>
              <div className="w-24 h-2 bg-black"></div>
            </div>
            
            <div className="lg:col-span-7 flex flex-col gap-8 md:max-h-[60vh] md:overflow-y-auto pr-0 md:pr-4 custom-scrollbar">
              {experience.map((exp, i) => (
                <div key={i} className="relative pl-8 md:pl-12 border-l-4 border-black/20">
                  <div className="absolute w-6 h-6 bg-black rounded-full -left-[15px] top-0 border-4 border-white shadow-[0_0_15px_rgba(0,0,0,0.2)]"></div>
                  <div className="text-sm font-black tracking-widest text-black/50 mb-2 uppercase">{exp.period}</div>
                  <h3 className="text-2xl md:text-3xl font-black text-black mb-1">{exp.role}</h3>
                  <div className="text-black font-black text-lg mb-4 opacity-70">{exp.company}</div>
                  <ul className="flex flex-col gap-2.5">
                    {exp.desc.map((d, j) => (
                      <li key={j} className="text-black/80 text-sm md:text-base leading-relaxed flex items-start gap-3 font-medium">
                        <span className="text-black mt-1 font-black text-lg">▹</span>
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
        <div className="cinematic-panel w-full md:w-screen min-h-[100svh] md:min-h-0 md:h-full flex items-center justify-center py-20 px-6 md:p-24 bg-black text-white">
          <div className="panel-2-content panel-content w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
            <div className="lg:col-span-6 order-last lg:order-first flex flex-col gap-5 md:max-h-[60vh] md:overflow-y-auto pr-0 md:pr-3 custom-scrollbar">
              {education.map((edu, i) => (
                <div key={i} className="relative p-6 md:p-8 rounded-3xl bg-zinc-950 border border-white/20 shadow-2xl">
                  <div className="text-xs font-black tracking-widest text-white/50 mb-2 uppercase">{edu.period}</div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-1">{edu.degree}</h3>
                  <div className="text-white font-bold mb-4 text-base opacity-70">{edu.institution}</div>
                  <div className="text-xs font-black text-black bg-white inline-block px-4 py-1.5 rounded-full shadow-lg">{edu.grade}</div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-6 text-left md:text-right">
              <div className="text-sm font-black tracking-[0.4em] uppercase text-white mb-4 opacity-50">Chapter 02</div>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6 text-white">EDUCA<br/>TION.</h2>
              <div className="w-24 h-2 bg-white mr-auto md:ml-auto md:mr-0"></div>
            </div>
          </div>
        </div>

        {/* PANEL 3: MY APPROACH (White) */}
        <div className="cinematic-panel w-full md:w-screen min-h-[100svh] md:min-h-0 md:h-full flex flex-col items-center justify-center py-20 px-6 md:p-24 bg-white text-black border-b md:border-b-0 border-black/10">
          <div className="panel-3-content panel-content w-full max-w-7xl">
            <div className="text-left md:text-center mb-10 md:mb-14">
              <div className="text-sm font-black tracking-[0.4em] uppercase text-black mb-3 opacity-50">Chapter 03</div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-black">HOW I BUILD.</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {approach.map((step, i) => (
                <div key={i} className="bg-white border-2 border-black/10 rounded-3xl p-6 hover:bg-black hover:text-white hover:border-black transition-colors shadow-sm group">
                  <div className="text-black font-black text-4xl mb-3 opacity-30 group-hover:text-white group-hover:opacity-50 transition-all">{step.id}</div>
                  <h4 className="text-xl font-black mb-2 text-black group-hover:text-white transition-colors">{step.title}</h4>
                  <p className="text-black/70 text-sm font-medium group-hover:text-white/80 transition-colors leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PANEL 4: WHY WORK WITH ME (Black) */}
        <div className="cinematic-panel w-full md:w-screen min-h-[100svh] md:min-h-0 md:h-full flex flex-col items-center justify-center py-20 px-6 md:p-24 bg-black text-white">
          <div className="panel-4-content panel-content w-full max-w-7xl">
            <div className="text-left md:text-center mb-10 md:mb-14">
              <div className="text-sm font-black tracking-[0.4em] uppercase text-white mb-3 opacity-50">Chapter 04</div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">WHY ME?</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {reasons.map((reason, i) => (
                <div key={i} className="flex flex-col gap-3 p-6 rounded-3xl bg-zinc-950 border border-white/20">
                  <div className="text-black bg-white w-12 h-12 rounded-2xl flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-black text-white mb-2">{reason.title}</h4>
                    <p className="text-white/60 text-sm font-medium leading-relaxed">{reason.desc}</p>
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
