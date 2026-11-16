import React, { useState } from "react";
import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";
import AnimatedBackground from "./components/AnimatedBackground";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import Experience from "./components/Experience";
import AIChat from "./components/AIChat";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ResumeModal from "./components/ResumeModal";

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <SmoothScroll>
      <CustomCursor />
      <AnimatedBackground />
      <Navigation onOpenResume={() => setIsResumeOpen(true)} />
      <main className="w-full overflow-x-hidden min-h-screen">
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        <Intro />
        <Skills />
        <Projects />
        <TechStack />
        <Experience />
        <AIChat />
        <Contact />
      </main>
      <Footer />
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </SmoothScroll>
  );
}
