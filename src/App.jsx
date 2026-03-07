import React, { Suspense, lazy } from 'react';
const About = lazy(() => import('./sections/About'));
const TechStack = lazy(() => import('./sections/TechStack'));
const Projects = lazy(() => import('./sections/Projects'));
const Reviews = lazy(() => import('./sections/Reviews'));
const Contact = lazy(() => import('./sections/Contact'));
const Hero = lazy(() => import('./sections/Hero'));
const CursorGlow = lazy(() => import('./components/CursorGlow'));
const BackgroundCanvas = lazy(() => import('./components/BackgroundCanvas'));

import SectionWrapper from './sections/SectionWrapper';

function App() {
  return (
    <div className="relative min-h-screen">
      <Suspense fallback={null}>
        <BackgroundCanvas />
        <CursorGlow />
      </Suspense>

      <main className="max-w-7xl mx-auto px-6 py-12 relative">
        {/* Optimized Atmospheric Haze (Reduced blur for performance) */}
        <div className="absolute top-[5%] left-[-25%] w-[70%] h-[70%] bg-[var(--accent-glow)] blur-[100px] rounded-full pointer-events-none opacity-40 animate-pulse transition-colors duration-[var(--transition-speed)]"></div>
        <div className="absolute top-[45%] right-[-25%] w-[70%] h-[70%] bg-[var(--accent-glow)] blur-[100px] rounded-full pointer-events-none opacity-40 animate-pulse transition-colors duration-[var(--transition-speed)]" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-[15%] w-[50%] h-[50%] bg-[var(--accent-glow)] blur-[80px] rounded-full pointer-events-none animate-pulse transition-colors duration-[var(--transition-speed)]" style={{ animationDelay: '4s' }}></div>

        <Suspense fallback={<div className="h-screen flex items-center justify-center text-primary">Loading...</div>}>
          <Hero />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
            <SectionWrapper className="lg:col-span-6">
              <About />
            </SectionWrapper>
            <SectionWrapper className="lg:col-span-6">
              <TechStack />
            </SectionWrapper>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            <SectionWrapper className="lg:col-span-7">
              <Projects />
            </SectionWrapper>
            <SectionWrapper className="lg:col-span-5">
              <Reviews />
            </SectionWrapper>
          </div>

          <SectionWrapper className="mt-8">
            <Contact />
          </SectionWrapper>
        </Suspense>
      </main>

      <footer className="py-16 mt-24 border-t border-white/5 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--accent-glow)]/5 pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <p className="text-text-muted text-sm mb-4 font-medium tracking-wide">
            Designed & Developed with Passion by <span className="text-white font-bold">Rahil</span>
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-[11px] text-[#8E91B3]/60 font-stats uppercase tracking-[0.2em]">
            <p>© {new Date().getFullYear()} All Rights Reserved</p>
            <div className="hidden md:block w-1 h-1 rounded-full bg-white/10"></div>
            <p>Built with React • Three.js • Tailwind</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
