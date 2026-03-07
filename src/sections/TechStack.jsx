import React from 'react';
import { motion } from 'framer-motion';
import {
  Atom,
  Cpu,
  Server,
  Database,
  ShieldCheck,
  Smartphone,
  Layers,
  Github,
  Trello,
  GitBranch
} from 'lucide-react';

const techs = [
  { name: 'React', icon: <Atom />, color: '#61DAFB' },
  { name: 'Node.js', icon: <Cpu />, color: '#68A063' },
  { name: 'Express', icon: <Server />, color: '#ffffff' },
  { name: 'MongoDB', icon: <Database />, color: '#4DB33D' },
  { name: 'JWT', icon: <ShieldCheck />, color: '#d946ef' },
  { name: 'Native', icon: <Smartphone />, color: '#61DAFB' },
  { name: 'Postgres', icon: <Database />, color: '#336791' },
  { name: 'TypeORM', icon: <Layers />, color: '#f59e0b' },
  { name: 'GitHub', icon: <Github />, color: '#ffffff' },
  { name: 'Jira', icon: <Trello />, color: '#0052cc' },
  { name: 'Bitbucket', icon: <GitBranch />, color: '#2684ff' },
];

const TechStack = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="glass-card-premium p-8 h-full transition-all duration-[var(--transition-speed)]"
    >
      <div className="flex items-center gap-3 mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl font-bold italic tracking-tight text-white flex items-center gap-2 transition-colors duration-[var(--transition-speed)]">
          Tech Stack
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-color)] animate-pulse shadow-[0_0_10px_var(--accent-glow)] transition-all duration-[var(--transition-speed)]"></div>
        </h2>
      </div>

      <div className="relative pt-12 pb-16 px-4 md:px-8 rounded-[2rem] bg-[#030014]/40 border border-white/5 overflow-hidden transition-all duration-[var(--transition-speed)]">
        {/* The Shelf / Icons Grid */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-5 relative z-20">
          {techs.map((tech, index) => (
            <div key={index} className="flex flex-col items-center group">
              <motion.div
                whileHover={{ y: -5, scale: 1.05 }}
                className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center relative transition-all duration-300"
              >
                {/* Optimized Rounded Square Base (Removed backdrop-blur for performance) */}
                <div className="absolute inset-0 bg-white/10 border border-white/10 rounded-xl group-hover:border-[var(--accent-color)]/40 transition-all duration-300 shadow-lg"></div>

                {/* Glow Halo */}
                <div
                  className="absolute inset-1 opacity-0 group-hover:opacity-20 blur-xl transition-opacity rounded-full"
                  style={{ backgroundColor: tech.color }}
                ></div>

                <div className="relative z-10 transition-transform group-hover:scale-110">
                  {React.cloneElement(tech.icon, { size: 22, color: tech.color, strokeWidth: 2 })}
                </div>
              </motion.div>

              <span className="text-[9px] font-bold uppercase tracking-widest text-[#8E91B3] mt-3 group-hover:text-white transition-colors duration-300">
                {tech.name}
              </span>
            </div>
          ))}
        </div>

        {/* Advanced Reflective Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute bottom-1 left-[10%] right-[10%] h-[30px] bg-gradient-to-t from-[var(--accent-glow)]/10 to-transparent blur-xl opacity-30 transition-all duration-[var(--transition-speed)]"></div>
        <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[90%] h-[60px] bg-[var(--accent-color)]/5 blur-[50px] rounded-full transition-all duration-[var(--transition-speed)]"></div>
      </div>

      {/* Card Signature */}
      <div className="glass-shine"></div>
      <div className="neon-strip-cyan transition-all duration-[var(--transition-speed)] !via-[var(--accent-color)] !shadow-[0_0_40px_var(--accent-glow)]"></div>
    </motion.div>
  );
};

export default TechStack;
