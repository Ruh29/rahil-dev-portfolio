import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Send, Menu, X, Moon, Sun, Sparkles } from "lucide-react";
import portfolioData from "../data/portfolioData";
import { useTheme } from "../context/ThemeContext";

export default function Navbar({ onOpenResume }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { theme } = useTheme();

  const { navSections, personalInfo } = portfolioData;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      // Active section tracking
      const sectionEls = navSections.map(s => ({
        id: s.id,
        el: document.getElementById(s.id),
      }));
      const inView = sectionEls
        .filter(s => s.el)
        .find(s => {
          const rect = s.el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom > 120;
        });
      if (inView) setActiveSection(inView.id);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.4s ease",
        backgroundColor: scrolled ? "var(--bg-nav)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-main)" : "none",
        boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.3)" : "none",
      }}
    >
      <div className="container" style={{ padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "70px" }}>
          {/* Logo */}
          <motion.button
            onClick={() => scrollTo("hero")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "0.95rem",
              color: "#000",
              fontFamily: "'Outfit', sans-serif",
            }}>
              RS
            </div>
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: "1.1rem",
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Rahil.dev
            </span>
          </motion.button>

          {/* Desktop Nav */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }} className="desktop-nav">
            {navSections.map((sec) => (
              <motion.button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "0.88rem",
                  fontWeight: 500,
                  fontFamily: "var(--font-main)",
                  color: activeSection === sec.id ? "var(--color-cyan)" : "var(--text-secondary)",
                  backgroundColor: activeSection === sec.id ? "rgba(var(--color-cyan-rgb), 0.08)" : "transparent",
                  position: "relative",
                  transition: "all 0.3s ease",
                }}
                whileHover={{ scale: 1.05 }}
              >
                {sec.label}
                {activeSection === sec.id && (
                  <motion.div
                    layoutId="nav-indicator"
                    style={{
                      position: "absolute",
                      bottom: "4px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "18px",
                      height: "2px",
                      borderRadius: "100px",
                      background: "var(--color-cyan)",
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Available badge */}
            <motion.div
              className="status-badge status-available"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              style={{ fontSize: "0.75rem" }}
            >
              <div style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: "#10b981",
                animation: "pulse-glow 2s ease-in-out infinite",
              }} />
              Open to Work
            </motion.div>

            <motion.button
              onClick={onOpenResume}
              className="btn-secondary"
              style={{ padding: "8px 18px", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={15} />
              <span>Resume</span>
            </motion.button>

            <motion.button
              onClick={() => scrollTo("contact")}
              className="btn-primary"
              style={{ padding: "8px 18px", fontSize: "0.82rem" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send size={15} />
              <span>Hire Me</span>
            </motion.button>

            {/* Mobile menu */}
            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-menu-btn"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-main)",
                borderRadius: "8px",
                padding: "8px",
                cursor: "pointer",
                color: "var(--text-secondary)",
                display: "none",
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: "var(--bg-overlay)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid var(--border-main)",
            }}
          >
            <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: "4px" }}>
              {navSections.map((sec, i) => (
                <motion.button
                  key={sec.id}
                  onClick={() => scrollTo(sec.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    color: activeSection === sec.id ? "var(--color-cyan)" : "var(--text-secondary)",
                    backgroundColor: activeSection === sec.id ? "rgba(var(--color-cyan-rgb), 0.08)" : "transparent",
                    fontFamily: "var(--font-main)",
                  }}
                >
                  {sec.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (max-width: 640px) {
          .status-badge { display: none !important; }
        }
      `}</style>
    </motion.nav>
  );
}
