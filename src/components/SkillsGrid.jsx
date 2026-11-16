import React, { useState } from "react";
import {
  Atom,
  Zap,
  FileCode2,
  Palette,
  Code2,
  Smartphone,
  Server,
  GitBranch,
  GitPullRequest,
  Send,
  Network,
  MonitorSmartphone,
  Puzzle,
  Users,
  Cpu,
  Database,
  Radio,
  Boxes,
  ShieldCheck,
  Cloud,
} from "lucide-react";

const skillCategories = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    skills: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5 & CSS3"],
  },
  {
    id: "backend",
    title: "Backend & Real-Time",
    skills: ["Node.js", "Express.js", "REST APIs", "Socket.IO", "LiveKit WebRTC"],
  },
  {
    id: "database",
    title: "Database & Caching",
    skills: ["PostgreSQL", "MongoDB", "Redis", "TypeORM", "Prisma"],
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    skills: ["React Native", "Expo", "Mobile UI", "Real-Time Sync"],
  },
  {
    id: "tools",
    title: "Tools & Cloud",
    skills: ["Git", "GitHub", "Postman", "Vercel", "Docker", "Jira"],
  },
  {
    id: "architecture",
    title: "Architecture & Practices",
    skills: ["RBAC Auth", "Database Design", "Performance Optimization", "Clean Code"],
  },
];

const skillIconMap = {
  "React.js": Atom,
  "Next.js": Cpu,
  "TypeScript": Code2,
  "JavaScript": Code2,
  "Tailwind CSS": Palette,
  "HTML5 & CSS3": FileCode2,
  "Node.js": Server,
  "Express.js": Server,
  "REST APIs": Network,
  "Socket.IO": Radio,
  "LiveKit WebRTC": Radio,
  "PostgreSQL": Database,
  "MongoDB": Database,
  "Redis": Zap,
  "TypeORM": Boxes,
  "Prisma": Boxes,
  "React Native": Smartphone,
  "Expo": Smartphone,
  "Mobile UI": MonitorSmartphone,
  "Real-Time Sync": Zap,
  "Git": GitBranch,
  "GitHub": GitPullRequest,
  "Postman": Send,
  "Vercel": Cloud,
  "Docker": Boxes,
  "Jira": Puzzle,
  "RBAC Auth": ShieldCheck,
  "Database Design": Database,
  "Performance Optimization": Zap,
  "Clean Code": Users,
};

export default function SkillsGrid() {
  const [activeTab, setActiveTab] = useState("all");

  const displayedCategories =
    activeTab === "all"
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === activeTab);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
      {/* Category Filter Pills for Quick Browsing */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-12 sm:mb-16">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
            activeTab === "all"
              ? "bg-primary-600 text-white shadow-md shadow-primary-500/25 scale-105"
              : "bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
          }`}
        >
          All Skills
        </button>
        {skillCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              activeTab === cat.id
                ? "bg-primary-600 text-white shadow-md shadow-primary-500/25 scale-105"
                : "bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Categorized Cards Grid */}
      <div className="space-y-12 sm:space-y-16">
        {displayedCategories.map((category) => (
          <div key={category.id} className="flex flex-col items-center">
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <span className="w-8 sm:w-12 h-px bg-slate-300 dark:bg-slate-700"></span>
              <h4 className="text-xs sm:text-sm font-black tracking-[0.25em] uppercase text-primary-600 dark:text-primary-400 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/40 border border-primary-500/20 shadow-xs">
                {category.title}
              </h4>
              <span className="w-8 sm:w-12 h-px bg-slate-300 dark:bg-slate-700"></span>
            </div>

            {/* Responsive Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5 w-full max-w-6xl">
              {category.skills.map((skill, sIdx) => {
                const Icon = skillIconMap[skill] || Code2;
                return (
                  <div
                    key={sIdx}
                    className="group relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 transform-gpu hover:-translate-y-1.5 hover:shadow-xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 hover:border-primary-500/60 dark:hover:border-primary-400/60"
                  >
                    {/* Icon container */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary-500/10 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 shadow-xs">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2} />
                    </div>

                    {/* Skill Name */}
                    <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {skill}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
