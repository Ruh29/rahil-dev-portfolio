import React from 'react';
import { motion } from 'framer-motion';
import profileImg from '../assets/Rahil.jpeg';

const stats = [
  { label: 'Years Experience', value: '1+', icon: '🚀' },
  { label: 'Projects Completed', value: '10+', icon: '🎯' },
  { label: 'Problems Solved', value: '100+', icon: '💻' },
];

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="glass-card-premium p-10 h-full flex flex-col justify-between"
    >
      <div>
        <div className="flex flex-col sm:items-center sm:text-center lg:text-left lg:flex-row items-center gap-6 mb-8">
          <div className="w-24 h-24 flex-shrink-0 rounded-full overflow-hidden border-4 border-[var(--accent-color)]/40 shadow-[0_0_35px_var(--accent-glow)] group-hover:shadow-[0_0_50px_var(--accent-glow)] transition-all duration-[var(--transition-speed)]">
            <img
              src={profileImg}
              alt="Rahil"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold italic tracking-tight text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-colors duration-[var(--transition-speed)]">About Me</h2>
            <div className="h-1 w-14 bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-color)] mt-2 rounded-full overflow-hidden relative">
              <div className="absolute inset-0 bg-white/40 animate-pulse"></div>
            </div>
          </div>
        </div>

        <p className="text-text-muted text-[13px] leading-relaxed mb-10 font-medium">
          Full-stack developer with a passion for clean code and scalable solutions.
          I specialize in turning complex problems into intuitive digital experiences.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-[#030014]/60 border border-white/5 p-4 rounded-xl flex items-center justify-between group hover:bg-white/5 hover:border-[var(--accent-color)]/40 hover:shadow-[0_0_25px_var(--accent-glow)] transition-all duration-[var(--transition-speed)] cursor-default relative overflow-hidden">
            <div className="flex items-center gap-4">
              <span className="text-xl group-hover:scale-110 transition-transform">{stat.icon}</span>
              <span className="text-[10px] uppercase font-stats font-bold tracking-[0.2em] text-[#8E91B3] group-hover:text-white transition-colors">{stat.label}</span>
            </div>
            <span className="text-xl font-stats font-bold text-[var(--accent-color)] tracking-tighter drop-shadow-[0_0_8px_var(--accent-glow)] transition-all duration-[var(--transition-speed)]">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Signature & Lighting */}
      <div className="glass-shine"></div>
      <div className="neon-strip-purple transition-all duration-[var(--transition-speed)]"></div>
    </motion.div>
  );
};

export default About;
