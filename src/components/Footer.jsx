import React from "react";
import { motion } from "framer-motion";
import { Mail, Heart, ArrowUp, Code2 } from "lucide-react";
import { Github, Linkedin } from "./CustomIcons";
import portfolioData from "../data/portfolioData";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const { personalInfo, navSections } = portfolioData;
  const { theme } = useTheme();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer style={{
      borderTop: "1px solid var(--border-main)",
      background: "rgba(0,0,0,0.3)",
      backdropFilter: "blur(20px)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Top gradient line */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "1px",
        background: `linear-gradient(90deg, transparent, ${theme.primary}, ${theme.secondary}, ${theme.accent}, transparent)`,
      }} />

      <div className="container" style={{ padding: "40px 24px 24px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr",
          gap: "40px",
          marginBottom: "40px",
        }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "14px",
            }}>
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
              }}>
                RS
              </div>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Rahil Sheikh
              </span>
            </div>
            <p style={{ fontSize: "0.87rem", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "280px", marginBottom: "18px" }}>
              Full Stack Developer building high-performance scalable products, AI applications, and robust web/mobile experiences.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {[
                { href: personalInfo.github, icon: Github },
                { href: personalInfo.linkedin, icon: Linkedin },
                { href: `mailto:${personalInfo.email}`, icon: Mail },
              ].map(({ href, icon: Icon }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-main)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                  whileHover={{ scale: 1.1, color: "var(--color-cyan)", borderColor: "rgba(var(--color-cyan-rgb), 0.3)" }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "14px" }}>
              Navigate
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {navSections.map(sec => (
                <button
                  key={sec.id}
                  onClick={() => scrollTo(sec.id)}
                  style={{
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    fontSize: "0.87rem",
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                    fontFamily: "var(--font-main)",
                    padding: "2px 0",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={e => e.target.style.color = "var(--color-cyan)"}
                  onMouseLeave={e => e.target.style.color = "var(--text-secondary)"}
                >
                  {sec.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "14px" }}>
              Built With
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {["React.js", "Framer Motion", "Vite", "Lucide React", "Vanilla CSS"].map(tech => (
                <div key={tech} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Code2 size={12} style={{ color: "var(--color-cyan)" }} />
                  <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid var(--border-divider)",
          paddingTop: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}>
          <p style={{ fontSize: "0.83rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px" }}>
            Made with <Heart size={14} style={{ color: "#ec4899", fill: "#ec4899" }} /> by{" "}
            <span style={{ color: "var(--color-cyan)", fontWeight: 600 }}>Rahil Sheikh</span>
            {" "}© {new Date().getFullYear()}
          </p>

          <motion.button
            onClick={scrollToTop}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-main)",
              borderRadius: "8px",
              color: "var(--text-secondary)",
              fontSize: "0.82rem",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "var(--font-main)",
              transition: "all 0.3s ease",
            }}
            whileHover={{ scale: 1.05, borderColor: "rgba(var(--color-cyan-rgb), 0.3)", color: "var(--color-cyan)" }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp size={14} />
            Back to Top
          </motion.button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
