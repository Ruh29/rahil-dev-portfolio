import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Sparkles, Star, Filter } from "lucide-react";
import { Github } from "./CustomIcons";
import portfolioData from "../data/portfolioData";
import { useTheme } from "../context/ThemeContext";
import ScatterText from "./ScatterText";

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 80, damping: 12, delay: index * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8 }}
      style={{
        background: "var(--bg-card)",
        border: hovered ? "1px solid var(--border-accent)" : "1px solid var(--border-main)",
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "default",
        transition: "border-color 0.3s ease",
        boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.4), var(--shadow-glow-cyan)" : "none",
        position: "relative",
      }}
    >
      {/* Project gradient header */}
      <div style={{
        height: "180px",
        background: `linear-gradient(135deg, ${project.gradient.replace("from-", "").replace(" to-", ", ")})`.replace("cyan-500", "#00f5ff").replace("blue-600", "#2563eb").replace("purple-500", "#8b5cf6").replace("pink-600", "#db2777").replace("sky-500", "#0ea5e9").replace("indigo-600", "#4f46e5").replace("emerald-500", "#10b981").replace("teal-600", "#0d9488").replace("orange-500", "#f97316").replace("rose-600", "#e11d48").replace("violet-500", "#8b5cf6").replace("purple-600", "#9333ea"),
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.3)",
          backdropFilter: "blur(0px)",
        }} />

        {/* Project icon / emoji area */}
        <motion.div
          animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? 5 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          style={{
            fontSize: "3.5rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          {["🛒", "📋", "🌤️", "✍️", "🎨", "🧠"][index] || "💻"}
        </motion.div>

        {/* Featured badge */}
        {project.featured && (
          <div style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(10px)",
            borderRadius: "100px",
            padding: "4px 10px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "0.72rem",
            fontWeight: 600,
            color: "#f59e0b",
            border: "1px solid rgba(245,158,11,0.3)",
          }}>
            <Star size={10} fill="currentColor" />
            Featured
          </div>
        )}

        {/* Category pill */}
        <div style={{
          position: "absolute",
          top: "14px",
          left: "14px",
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(10px)",
          borderRadius: "100px",
          padding: "4px 10px",
          fontSize: "0.72rem",
          fontWeight: 600,
          color: "rgba(255,255,255,0.8)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}>
          {project.category}
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: "24px" }}>
        <h3 style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 700,
          fontSize: "1.1rem",
          color: "var(--text-heading)",
          marginBottom: "10px",
          lineHeight: 1.3,
        }}>
          {project.title}
        </h3>

        <p style={{
          fontSize: "0.87rem",
          color: "var(--text-secondary)",
          lineHeight: 1.7,
          marginBottom: "16px",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {project.description}
        </p>

        {/* Tech stack */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} style={{
              padding: "3px 10px",
              background: "rgba(var(--color-cyan-rgb), 0.06)",
              border: "1px solid rgba(var(--color-cyan-rgb), 0.12)",
              borderRadius: "100px",
              fontSize: "0.72rem",
              fontWeight: 500,
              color: "var(--color-cyan)",
              fontFamily: "var(--font-mono)",
            }}>
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span style={{
              padding: "3px 10px",
              background: "rgba(255,255,255,0.04)",
              borderRadius: "100px",
              fontSize: "0.72rem",
              color: "var(--text-muted)",
            }}>
              +{project.tech.length - 4} more
            </span>
          )}
        </div>

        {/* Action links */}
        <div style={{ display: "flex", gap: "10px" }}>
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "10px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-main)",
              borderRadius: "10px",
              fontSize: "0.83rem",
              fontWeight: 600,
              color: "var(--text-secondary)",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            whileHover={{ borderColor: "rgba(255,255,255,0.3)", color: "var(--text-primary)" }}
          >
            <Github size={15} />
            Code
          </motion.a>
          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "10px",
              background: "linear-gradient(135deg, rgba(var(--color-cyan-rgb), 0.12), rgba(var(--color-purple-rgb), 0.12))",
              border: "1px solid rgba(var(--color-cyan-rgb), 0.2)",
              borderRadius: "10px",
              fontSize: "0.83rem",
              fontWeight: 600,
              color: "var(--color-cyan)",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            whileHover={{ background: "linear-gradient(135deg, rgba(var(--color-cyan-rgb), 0.2), rgba(var(--color-purple-rgb), 0.2))" }}
          >
            <ExternalLink size={15} />
            Live Demo
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { projects } = portfolioData;

  const categories = ["All", ...new Set(projects.map(p => p.category))];
  const filtered = filter === "All" ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="section" style={{ position: "relative" }}>
      <div style={{
        position: "absolute",
        right: "5%",
        top: "20%",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(var(--color-pink-rgb), 0.06), transparent 70%)",
        filter: "blur(60px)",
        pointerEvents: "none",
      }} />

      <div className="container">
        {/* Header */}
        <div ref={ref} style={{ textAlign: "center", marginBottom: "48px" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 100, damping: 12 }}
            style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}
          >
            <div className="section-tag">
              <ScatterText delay={0.05}>
                <Sparkles size={12} style={{ display: "inline-block", marginRight: "6px", verticalAlign: "middle" }} />
                Portfolio
              </ScatterText>
            </div>
          </motion.div>

          <motion.h2
            className="section-title"
            style={{ textAlign: "center" }}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <ScatterText delay={0.1}>My <span>Projects</span></ScatterText>
          </motion.h2>

          <motion.p
            className="section-subtitle"
            style={{ textAlign: "center", margin: "0 auto 32px" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            A collection of projects I've built to learn, grow, and solve real problems.
          </motion.p>

          {/* Filter buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}
          >
            {categories.map(cat => (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "8px 20px",
                  borderRadius: "100px",
                  border: filter === cat ? "1px solid var(--color-cyan)" : "1px solid var(--border-main)",
                  background: filter === cat ? "rgba(var(--color-cyan-rgb), 0.1)" : "var(--bg-card)",
                  color: filter === cat ? "var(--color-cyan)" : "var(--text-secondary)",
                  fontSize: "0.83rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "var(--font-main)",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {cat === "All" && <Filter size={12} />}
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "24px",
            }}
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
