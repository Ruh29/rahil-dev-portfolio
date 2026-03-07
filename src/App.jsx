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

      <footer className="py-12 mt-24 border-t border-white/10 text-center text-text-muted">
        <p>© {new Date().getFullYear()} Rahil. Built with React + Three.js</p>
      </footer>
    </div>
  );
}

export default App;
