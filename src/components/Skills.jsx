import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Server, Database, Cloud, Smartphone, Radio, Wrench } from "lucide-react";
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
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=800&auto=format&fit=crop",
    text: "Databases & Caching",
  },
  {
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=800&auto=format&fit=crop",
    text: "DevOps & Cloud",
  },
  {
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
    text: "Mobile Apps",
  },
  {
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    text: "Real-Time & AI",
  },
  {
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop",
    text: "Tools & Workflow",
  },
];

const categorizedSkills = [
  {
    category: "Frontend Development",
    subtitle: "Modern Responsive Client Applications",
    icon: <Code2 className="w-4 h-4 text-black" />,
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "Bootstrap",
      "jQuery",
      "HTML5",
      "CSS3",
      "Redux Toolkit",
      "Zustand",
    ],
  },
  {
    category: "Backend & APIs",
    subtitle: "Scalable Microservices & Architecture",
    icon: <Server className="w-4 h-4 text-black" />,
    skills: [
      "Node.js",
      "Express.js",
      "RESTful APIs",
      "JWT Authentication",
      "Role-Based Access (RBAC)",
      "API Security",
      "Microservices",
    ],
  },
  {
    category: "Databases & Caching",
    subtitle: "High-Throughput Relational & NoSQL",
    icon: <Database className="w-4 h-4 text-black" />,
    skills: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "TypeORM",
      "Prisma",
      "Schema Design",
      "Query Optimization",
    ],
  },
  {
    category: "DevOps & Cloud",
    subtitle: "Deployment, Containers & CI/CD",
    icon: <Cloud className="w-4 h-4 text-black" />,
    skills: [
      "Docker",
      "CI/CD Pipelines",
      "Vercel",
      "Netlify",
      "Render",
      "Cloudinary",
      "GitHub Actions",
      "Environment Config",
    ],
  },
  {
    category: "Mobile App Development",
    subtitle: "Cross-Platform iOS & Android",
    icon: <Smartphone className="w-4 h-4 text-black" />,
    skills: [
      "React Native",
      "Expo",
      "Cross-Platform UI",
      "Mobile State",
      "Offline Sync",
      "Native Device APIs",
    ],
  },
  {
    category: "Real-Time & AI Systems",
    subtitle: "WebSockets, Video Streaming & LLMs",
    icon: <Radio className="w-4 h-4 text-black" />,
    skills: [
      "Socket.IO",
      "WebSockets",
      "LiveKit (WebRTC)",
      "HLS Video Streaming",
      "AI APIs Integration",
      "Event-Driven Architecture",
    ],
  },
  {
    category: "Tools & Engineering Practices",
    subtitle: "Production Tooling & QA",
    icon: <Wrench className="w-4 h-4 text-black" />,
    skills: [
      "Git & GitHub",
      "Postman",
      "Jira",
      "VS Code",
      "npm",
      "Agile / Scrum",
      "Code Review",
      "Performance Tuning",
    ],
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

      // Category cards animation
      gsap.fromTo(
        ".skill-cat-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-grid-wrapper",
            start: "top 85%",
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
      <div className="w-full flex flex-col items-center text-center px-6 z-20 mb-10">
        <div className="inline-block skills-header">
          <h2 className="text-xs font-black tracking-[0.4em] uppercase text-slate-400 mb-6 border border-slate-800 px-6 py-2 rounded-full bg-white/5 shadow-sm backdrop-blur-md">
            Services & Skills
          </h2>
        </div>
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1] skills-header text-white uppercase mb-4">
          What I Do
        </h3>
        <p className="text-slate-400 max-w-2xl text-sm sm:text-base font-medium skills-header">
          End-to-end full-stack engineering across modern client interfaces, high-throughput microservices, mobile apps, real-time media, and automated DevOps.
        </p>
      </div>

      {/* Circular Gallery Integration */}
      <div className="relative w-full h-[600px] z-10">
        <CircularGallery
          items={galleryItems}
          bend={3}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.02}
        />
      </div>

      {/* Comprehensive Tech Stack, Tools & DevOps Breakdown */}
      <div className="skills-grid-wrapper w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {categorizedSkills.map((cat, idx) => (
            <div
              key={idx}
              className="skill-cat-card p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-zinc-950/90 border border-white/10 hover:border-white/30 transition-all duration-300 shadow-xl flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-3 mb-3.5">
                  <div className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                    {cat.icon}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm sm:text-base font-black text-white uppercase tracking-tight truncate">
                      {cat.category}
                    </h4>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 block truncate">
                      {cat.subtitle}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/5 border border-white/10 text-slate-200 group-hover:border-white/20 hover:bg-white hover:text-black transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
