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
    setMobileOpen(false);

    const el = document.getElementById(id);
    if (!el) return;

    // Use requestAnimationFrame for instantaneous and accurate smooth scrolling
    requestAnimationFrame(() => {
      const navHeight = 70;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = Math.max(0, elementPosition - navHeight);

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    });
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
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        background: scrolled
          ? `linear-gradient(135deg, ${theme.primary}1A, ${theme.secondary}1A), var(--bg-nav)`
          : `linear-gradient(135deg, ${theme.primary}0E, ${theme.secondary}0E), var(--bg-nav)`,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: `1px solid ${theme.primary}30`,
        boxShadow: scrolled
          ? `0 8px 32px rgba(0, 0, 0, ${theme.isLight ? "0.08" : "0.35"})`
          : "none",
      }}
    >
      <div className="container nav-container-inner" style={{ padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "70px", gap: "8px" }}>
          {/* Logo */}
          <motion.button
            onClick={() => scrollTo("hero")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexShrink: 0,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "0.9rem",
              color: "#000",
              fontFamily: "'Outfit', sans-serif",
              flexShrink: 0,
            }}>
              RS
            </div>
            <span className="nav-logo-text gradient-text" style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: "1.1rem",
              whiteSpace: "nowrap",
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
          <div className="nav-actions-group" style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
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
              className="btn-secondary nav-action-btn"
              style={{ padding: "8px 18px", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", whiteSpace: "nowrap" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={15} />
              <span>Resume</span>
            </motion.button>

            <motion.button
              onClick={() => scrollTo("contact")}
              className="btn-primary nav-action-btn"
              style={{ padding: "8px 18px", fontSize: "0.82rem", whiteSpace: "nowrap" }}
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
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{
              background: "var(--bg-overlay)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderTop: "1px solid var(--border-main)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
              maxHeight: "calc(100vh - 70px)",
              overflowY: "auto",
            }}
          >
            <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: "6px" }}>
              {navSections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollTo(sec.id)}
                  style={{
                    background: activeSection === sec.id ? "rgba(var(--color-cyan-rgb), 0.12)" : "transparent",
                    border: activeSection === sec.id ? "1px solid rgba(var(--color-cyan-rgb), 0.25)" : "1px solid transparent",
                    textAlign: "left",
                    padding: "12px 18px",
                    borderRadius: "12px",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    color: activeSection === sec.id ? "var(--color-cyan)" : "var(--text-secondary)",
                    fontFamily: "var(--font-main)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    outline: "none",
                    WebkitTapHighlightColor: "transparent",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span>{sec.label}</span>
                  {activeSection === sec.id && (
                    <span style={{ fontSize: "0.75rem", color: "var(--color-cyan)", fontWeight: 700 }}>●</span>
                  )}
                </button>
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
          .nav-container-inner { padding: 0 12px !important; }
          .nav-actions-group { gap: 6px !important; }
          .nav-action-btn {
            padding: 6px 10px !important;
            font-size: 0.76rem !important;
          }
          .nav-logo-text {
            font-size: 0.95rem !important;
          }
        }
        @media (max-width: 400px) {
          .nav-logo-text {
            font-size: 0.85rem !important;
          }
          .nav-action-btn {
            padding: 5px 8px !important;
            font-size: 0.72rem !important;
          }
        }
      `}</style>
    </motion.nav>
  );
}
