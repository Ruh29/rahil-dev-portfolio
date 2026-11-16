import React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
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
    title: "Frontend Engineering",
    skills: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5 & CSS3"],
  },
  {
    title: "Backend & Real-Time",
    skills: ["Node.js", "Express.js", "REST APIs", "Socket.IO", "LiveKit WebRTC"],
  },
  {
    title: "Database & Caching",
    skills: ["PostgreSQL", "MongoDB", "Redis", "TypeORM", "Prisma"],
  },
  {
    title: "Mobile Development",
    skills: ["React Native", "Expo", "Mobile UI", "Real-Time Sync"],
  },
  {
    title: "Tools & Cloud",
    skills: ["Git", "GitHub", "Postman", "Vercel", "Docker", "Jira"],
  },
  {
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

function SkillCard({ skill }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);

  const rotateX = useSpring(rotateXValue, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(rotateYValue, { stiffness: 300, damping: 30 });

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const rect = currentTarget.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    rotateXValue.set(((y - centerY) / centerY) * -12);
    rotateYValue.set(((x - centerX) / centerX) * 12);
  }

  function handleMouseLeave() {
    rotateXValue.set(0);
    rotateYValue.set(0);
  }

  const Icon = skillIconMap[skill] || Code2;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      className="group relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-2xl md:rounded-3xl cursor-pointer pointer-events-auto"
    >
      <div className="absolute inset-0 glass-panel overflow-hidden rounded-2xl md:rounded-3xl border border-white/60 dark:border-slate-800/60 group-hover:border-primary-500/70 dark:group-hover:border-primary-400/70 transition-all duration-300 shadow-sm group-hover:shadow-[0_0_25px_rgba(var(--primary-500,139,92,246),0.25)] flex flex-col items-center justify-center p-3 text-center">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <span className="text-[11px] md:text-xs font-bold text-slate-800 dark:text-slate-200 tracking-tight leading-tight">
          {skill}
        </span>
      </div>
    </motion.div>
  );
}

export default function SkillsGrid() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mt-16">
      <div className="space-y-12">
        {skillCategories.map((cat, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <h4 className="text-xs font-black tracking-[0.3em] uppercase text-primary-600 dark:text-primary-400 mb-6 border border-slate-200 dark:border-slate-800 px-5 py-1.5 rounded-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
              {cat.title}
            </h4>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 max-w-5xl">
              {cat.skills.map((s, sIdx) => (
                <SkillCard key={sIdx} skill={s} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
