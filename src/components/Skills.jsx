import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Sparkles, Code2, Palette, Wrench, ChevronRight } from "lucide-react";
import portfolioData from "../data/portfolioData";
import { useTheme } from "../context/ThemeContext";
import ScatterText from "./ScatterText";

function SkillBar({ name, level, color, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ type: "spring", stiffness: 100, damping: 12, delay: index * 0.08 }}
      style={{ marginBottom: "20px" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}80` }} />
          <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)" }}>{name}</span>
        </div>
        <span style={{
          fontSize: "0.78rem",
          fontWeight: 700,
          fontFamily: "var(--font-mono)",
          color,
        }}>
          {level}%
        </span>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: index * 0.08 + 0.3, ease: [0.33, 1, 0.68, 1] }}
          style={{
            background: `linear-gradient(90deg, ${color}80, ${color})`,
            color,
          }}
        />
      </div>
    </motion.div>
  );
}

function ToolBadge({ name, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 200, damping: 12, delay: index * 0.05 }}
      whileHover={{ scale: 1.08, y: -3 }}
      style={{
        padding: "10px 18px",
        background: "var(--bg-card)",
        border: "1px solid var(--border-main)",
        borderRadius: "10px",
        fontSize: "0.85rem",
        fontWeight: 500,
        color: "var(--text-secondary)",
        cursor: "default",
        transition: "all 0.3s ease",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      <ChevronRight size={12} style={{ color: "var(--color-cyan)" }} />
      {name}
    </motion.div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState("primary");
  const { skills } = portfolioData;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const tabs = [
    { id: "primary", label: "Core Skills", icon: Code2 },
    { id: "secondary", label: "Growing Stack", icon: Palette },
    { id: "tools", label: "Tools & Tech", icon: Wrench },
  ];

  return (
    <section id="skills" className="section" style={{ position: "relative", background: "rgba(var(--color-cyan-rgb), 0.01)" }}>
      {/* Subtle cyan glow left */}
      <div style={{
        position: "absolute",
        left: "0",
        top: "30%",
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(var(--color-cyan-rgb), 0.06), transparent 70%)",
        filter: "blur(40px)",
        pointerEvents: "none",
      }} />

      <div className="container">
        {/* Header */}
        <div ref={ref} style={{ textAlign: "center", marginBottom: "60px" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 12 }}
            style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}
          >
            <div className="section-tag">
              <ScatterText delay={0.05}>
                <Sparkles size={12} style={{ display: "inline-block", marginRight: "6px", verticalAlign: "middle" }} />
                My Expertise
              </ScatterText>
            </div>
          </motion.div>

          <motion.h2
            className="section-title"
            style={{ textAlign: "center" }}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 80, damping: 12, delay: 0.1 }}
          >
            <ScatterText delay={0.1}>Skills & <span>Technologies</span></ScatterText>
          </motion.h2>

          <motion.p
            className="section-subtitle"
            style={{ textAlign: "center", margin: "0 auto" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            Focused on Full Stack Engineering (React, Next.js, Node.js, PostgreSQL, TypeScript) with 1+ year of experience building scalable applications.
          </motion.p>
        </div>

        {/* React & Next.js featured skill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 80, damping: 12, delay: 0.3 }}
          style={{
            background: "linear-gradient(135deg, rgba(var(--color-cyan-rgb), 0.06), rgba(97,218,251,0.08))",
            border: "1px solid rgba(var(--color-cyan-rgb), 0.2)",
            borderRadius: "20px",
            padding: "28px",
            marginBottom: "40px",
            display: "flex",
            alignItems: "center",
            gap: "24px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div style={{
            position: "absolute",
            right: "-20px",
            top: "-20px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(97,218,251,0.1), transparent 70%)",
            filter: "blur(20px)",
          }} />

          <motion.div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "20px",
              background: "rgba(97,218,251,0.1)",
              border: "1px solid rgba(97,218,251,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontSize: "2rem",
            }}
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            ⚛️
          </motion.div>

          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "var(--text-heading)" }}>
                React & Next.js — Primary Ecosystem
              </h3>
              <span style={{
                background: "rgba(97,218,251,0.1)",
                border: "1px solid rgba(97,218,251,0.3)",
                borderRadius: "100px",
                padding: "2px 12px",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#61DAFB",
                fontFamily: "var(--font-mono)",
              }}>
                95%
              </span>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "12px" }}>
              1+ year of professional experience building highly scalable full-stack applications with React, Next.js, Node.js, Express, PostgreSQL, and TypeScript. Expert in state management, real-time WebSockets, database design, and API integrations.
            </p>
            <div className="skill-bar" style={{ maxWidth: "400px" }}>
              <motion.div
                className="skill-bar-fill"
                initial={{ width: 0 }}
                animate={inView ? { width: "95%" } : {}}
                transition={{ duration: 1.5, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
                style={{
                  background: "linear-gradient(90deg, #61DAFB80, #61DAFB)",
                  color: "#61DAFB",
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Tab navigation */}
        <motion.div
          className="skills-tabs-container"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "36px",
            padding: "6px",
            background: "var(--bg-card)",
            borderRadius: "14px",
            border: "1px solid var(--border-main)",
            width: "fit-content",
          }}
        >
          {tabs.map(({ id, label, icon: Icon }) => (
            <motion.button
              key={id}
              className="skills-tab-button"
              onClick={() => setActiveTab(id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                padding: "10px 20px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontSize: "0.88rem",
                fontWeight: 600,
                fontFamily: "var(--font-main)",
                transition: "all 0.3s ease",
                background: activeTab === id ? "linear-gradient(135deg, rgba(var(--color-cyan-rgb), 0.15), rgba(var(--color-purple-rgb), 0.15))" : "transparent",
                color: activeTab === id ? "var(--color-cyan)" : "var(--text-secondary)",
                boxShadow: activeTab === id ? "0 0 20px rgba(var(--color-cyan-rgb), 0.1)" : "none",
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Icon size={15} />
              {label}
            </motion.button>
          ))}
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {activeTab !== "tools" ? (
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "40px",
              }}
                className="skills-grid"
              >
                {(activeTab === "primary" ? skills.primary : skills.secondary).map((skill, i) => (
                  <SkillBar key={skill.name} {...skill} index={i} />
                ))}
              </div>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {skills.tools.map((tool, i) => (
                  <ToolBadge key={tool} name={tool} index={i} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .skills-grid { grid-template-columns: 1fr !important; }
          .skills-tabs-container {
            width: 100% !important;
            max-width: 100% !important;
            overflow-x: auto !important;
            display: flex !important;
            flex-wrap: nowrap !important;
            justify-content: flex-start !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
            padding: 4px !important;
            border-radius: 12px !important;
          }
          .skills-tabs-container::-webkit-scrollbar {
            display: none !important;
          }
          .skills-tab-button {
            flex-shrink: 0 !important;
            white-space: nowrap !important;
            padding: 8px 14px !important;
            font-size: 0.82rem !important;
          }
        }
      `}</style>
    </section>
  );
}
