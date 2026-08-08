import React, { useState } from "react";
import { useTheme } from "./context/ThemeContext";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import AIChat from "./components/AIChat";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ResumeModal from "./components/ResumeModal";

// Animated cursor glow
function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();
  React.useEffect(() => {
    const h = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h, { passive: true });
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return (
    <div style={{
      position: "fixed",
      top: pos.y - 200,
      left: pos.x - 200,
      width: "400px",
      height: "400px",
      borderRadius: "50%",
      background: `radial-gradient(circle, ${theme.primary}0A 0%, transparent 70%)`,
      pointerEvents: "none",
      zIndex: 0,
      transition: "top 0.1s linear, left 0.1s linear",
    }} />
  );
}

// Page loading animation
function PageLoader() {
  const { theme } = useTheme();
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--bg-main)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      <motion.div
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "16px",
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 800,
          fontSize: "1.2rem",
          color: "#000",
        }}
        animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        RS
      </motion.div>
      <div className="gradient-text" style={{
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 700,
        fontSize: "1rem",
        letterSpacing: "0.1em",
      }}>
        LOADING...
      </div>
      <div style={{ display: "flex", gap: "6px" }}>
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            style={{ width: "6px", height: "6px", borderRadius: "50%", background: theme.primary }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const { themeId } = useTheme();

  React.useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!loaded && <PageLoader key="loader" />}
      </AnimatePresence>

      <div style={{ minHeight: "100vh", position: "relative" }}>
        <CursorGlow />
        <Navbar onOpenResume={() => setIsResumeOpen(true)} />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Timeline />
          <AIChat />
          <Contact />
        </main>
        <Footer />
        <ThemeSwitcher />
        <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      </div>
    </>
  );
}
