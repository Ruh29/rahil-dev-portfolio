import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Mail, Code2, Heart, Sparkles, BookOpen, Coffee, Star } from "lucide-react";
import FlippingAvatar from "./FlippingAvatar";
import portfolioData from "../data/portfolioData";
import { useTheme } from "../context/ThemeContext";
import ScatterText from "./ScatterText";


function AnimatedSection({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const initial = {
    opacity: 0,
    y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
    x: direction === "left" ? 60 : direction === "right" ? -60 : 0,
    clipPath: "inset(0 0 30% 0)",
  };
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0, clipPath: "inset(0 0 0% 0)" } : initial}
      transition={{ type: "spring", stiffness: 80, damping: 12, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const { personalInfo, stats, certifications } = portfolioData;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { theme } = useTheme();

  const traits = [
    { icon: Code2, text: "MERN Stack Specialist", color: "#61DAFB" },
    { icon: Heart, text: "System Architect", color: "#ec4899" },
    { icon: BookOpen, text: "Always Learning", color: "#8b5cf6" },
    { icon: Coffee, text: "Coffee Powered Dev ☕", color: "#f59e0b" },
  ];

  return (
    <section id="about" className="section" style={{ position: "relative", overflow: "hidden" }}>
      <div className="grid-bg" style={{ opacity: 0.5 }} />

      {/* Purple blob */}
      <div style={{
        position: "absolute",
        right: "10%",
        top: "20%",
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${theme.secondary}14, transparent 70%)`,
        filter: "blur(40px)",
        pointerEvents: "none",
      }} />

      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: "80px",
          alignItems: "center",
        }}
          className="about-grid"
        >
          {/* Left — Avatar */}
          <AnimatedSection direction="right">
            <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
              {/* Decorative rings */}
              <motion.div
                style={{
                  position: "absolute",
                  width: "380px",
                  height: "380px",
                  borderRadius: "50%",
                  border: `1px solid ${theme.primary}14`,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                style={{
                  position: "absolute",
                  width: "300px",
                  height: "300px",
                  borderRadius: "50%",
                  border: `1px solid ${theme.secondary}14`,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              />

              {/* Avatar container */}
              <motion.div
                style={{
                  width: "280px",
                  height: "280px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: `2px solid ${theme.primary}40`,
                  boxShadow: `0 0 80px ${theme.primary}1F, 0 0 40px ${theme.secondary}1A`,
                  position: "relative",
                  zIndex: 1,
                }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <FlippingAvatar size={260} />
                </div>
              </motion.div>

              {/* Floating badges around avatar */}
              {[
                { text: "MERN Stack", color: "#61DAFB", x: -90, y: -60 },
                { text: "1+ Yr Exp", color: "#8b5cf6", x: 80, y: -40 },
                { text: "Cloud & DevOps", color: "#ec4899", x: -80, y: 80 },
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    x: badge.x,
                    y: badge.y,
                    background: "var(--bg-card-solid)",
                    border: `1px solid ${badge.color}40`,
                    borderRadius: "8px",
                    padding: "6px 12px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: badge.color,
                    fontFamily: "var(--font-mono)",
                    backdropFilter: "blur(10px)",
                    zIndex: 2,
                    whiteSpace: "nowrap",
                  }}
                  animate={{ y: [badge.y, badge.y - 6, badge.y] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                >
                  {badge.text}
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Right — Text content */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <AnimatedSection delay={0.1}>
              <div className="section-tag">
                <ScatterText delay={0.1}>
                  <Sparkles size={12} style={{ display: "inline-block", marginRight: "6px", verticalAlign: "middle" }} />
                  About Me
                </ScatterText>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h2 className="section-title">
                <ScatterText delay={0.2}>Passionate About <span>Creating Impact</span> Through Code</ScatterText>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <p className="section-subtitle">
                {personalInfo.bio}
              </p>
            </AnimatedSection>

            {/* Trait pills */}
            <AnimatedSection delay={0.4}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {traits.map(({ icon: Icon, text, color }, i) => (
                  <motion.div
                    key={i}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "7px",
                      padding: "8px 14px",
                      background: "var(--bg-card)",
                      border: `1px solid ${color}25`,
                      borderRadius: "10px",
                      fontSize: "0.83rem",
                      fontWeight: 500,
                      color: "var(--text-secondary)",
                    }}
                    whileHover={{ scale: 1.05, borderColor: `${color}60` }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <Icon size={14} style={{ color }} />
                    {text}
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            {/* Info rows */}
            <AnimatedSection delay={0.5}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}>
                {[
                  { label: "Location", value: personalInfo.location, icon: MapPin },
                  { label: "Email", value: personalInfo.email, icon: Mail },
                  { label: "Experience", value: "1+ Year", icon: Star },
                  { label: "Status", value: "Open to Work 🟢", icon: Sparkles },
                ].map(({ label, value, icon: Icon }, i) => (
                  <div key={i} style={{
                    padding: "14px 16px",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-main)",
                    borderRadius: "12px",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                      <Icon size={12} style={{ color: "var(--color-cyan)" }} />
                      <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 500 }}>
                        {label}
                      </span>
                    </div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)" }}>
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Stats */}
            <AnimatedSection delay={0.6}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "12px",
              }}>
                {portfolioData.stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    style={{
                      padding: "16px 12px",
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-main)",
                      borderRadius: "14px",
                      textAlign: "center",
                    }}
                    whileHover={{ scale: 1.05, borderColor: "rgba(var(--color-cyan-rgb), 0.3)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <div style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 800,
                      fontSize: "1.4rem",
                      background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "4px", lineHeight: 1.3 }}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
