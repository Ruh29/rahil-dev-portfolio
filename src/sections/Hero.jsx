import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Stars, Float, ContactShadows, Environment } from '@react-three/drei';
import NeuralSphere from '../components/NeuralSphere';
import Magnetic from '../components/Magnetic';

const Hero = () => {
  return (
    <section className="relative min-h-[500px] lg:h-[480px] w-full mb-12 overflow-hidden rounded-[3rem] glass-card-premium border-none">
      {/* Hero section is now transparent to show global nebula */}

      <div className="relative z-10 flex flex-col lg:flex-row h-full items-center justify-between px-8 lg:px-20 py-16 lg:py-0">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-3/5 text-center lg:text-left mb-12 lg:mb-0"
        >
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 tracking-tight text-white leading-tight">
            Hi, I’m <span className="text-white">Rahil</span> 👋
          </h2>
          <h1 className="text-lg md:text-2xl lg:text-3xl text-white font-bold tracking-tight mb-5 opacity-95">
            Full-Stack Developer & Problem Solver
          </h1>
          <p className="text-[#8E91B3] text-xs md:text-base mb-8 lg:mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
            I build scalable web apps with React, Node.js & MongoDB.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-6">
            <Magnetic strength={0.2}>
              <button className="px-10 py-4 bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-color)] brightness-110 text-white rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-[0_15px_30px_var(--accent-glow)] cursor-pointer">
                View Projects
              </button>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a
                href="/resume.pdf"
                download="Rahil_Resume.pdf"
                className="px-10 py-4 bg-[#030014]/60 backdrop-blur-xl border border-white/10 text-white rounded-xl font-bold text-sm transition-all hover:bg-white/10 hover:border-white/20 active:scale-95 flex items-center justify-center cursor-pointer"
              >
                Download Resume
              </a>
            </Magnetic>
          </div>
        </motion.div>

        <div className="w-full lg:w-2/5 h-[400px] lg:h-[450px] relative mt-8 lg:mt-0 flex items-center justify-center pointer-events-none">
          <Canvas
            key="hero-canvas"
            dpr={[1, 2]} // Safe range for all displays
            camera={{ position: [0, 0, 8], fov: 35 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance"
            }}
          >
            <Suspense fallback={null}>
              <NeuralSphere />
            </Suspense>
          </Canvas>
        </div>
      </div>

      {/* Glass Card Signature */}
      <div className="glass-shine"></div>
      <div className="neon-strip-purple"></div>
    </section>
  );
};

export default Hero;
