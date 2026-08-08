import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Sparkles, Star, Filter, CheckCircle2, Clock, Terminal, ChevronDown, ChevronUp } from "lucide-react";
import { Github } from "./CustomIcons";
import portfolioData from "../data/portfolioData";
import ScatterText from "./ScatterText";

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);
  const [showImplemented, setShowImplemented] = useState(false);

  // Status Badge configurations
  const getStatusBadge = (status) => {
    switch (status) {
      case "Live":
        return (
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "4px 10px",
            borderRadius: "100px",
            background: "rgba(16, 185, 129, 0.18)",
            border: "1px solid rgba(16, 185, 129, 0.4)",
            color: "#10b981",
            fontSize: "0.72rem",
            fontWeight: 700,
            fontFamily: "var(--font-mono)",
            backdropFilter: "blur(10px)",
          }}>
            <span style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#10b981",
              boxShadow: "0 0 8px #10b981",
            }} />
            Live
          </div>
        );
      case "API":
        return (
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "4px 10px",
            borderRadius: "100px",
            background: "rgba(14, 165, 233, 0.18)",
            border: "1px solid rgba(14, 165, 233, 0.4)",
            color: "#0ea5e9",
            fontSize: "0.72rem",
            fontWeight: 700,
            fontFamily: "var(--font-mono)",
            backdropFilter: "blur(10px)",
          }}>
            <Terminal size={10} />
            API
          </div>
        );
      case "In Progress":
      default:
        return (
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "4px 10px",
            borderRadius: "100px",
            background: "rgba(245, 158, 11, 0.18)",
            border: "1px solid rgba(245, 158, 11, 0.4)",
            color: "#f59e0b",
            fontSize: "0.72rem",
            fontWeight: 700,
            fontFamily: "var(--font-mono)",
            backdropFilter: "blur(10px)",
          }}>
            <Clock size={10} />
            In Progress
          </div>
        );
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 80, damping: 14, delay: index * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
      style={{
        background: "var(--bg-card)",
        border: hovered ? "1px solid var(--border-accent)" : "1px solid var(--border-main)",
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "default",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: hovered ? "0 20px 40px rgba(0,0,0,0.5), 0 0 25px rgba(var(--color-cyan-rgb), 0.15)" : "0 4px 20px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
      }}
    >
      {/* Project Banner Header */}
      <div style={{
        height: "150px",
        background: `linear-gradient(135deg, ${project.gradient.replace("from-", "").replace(" to-", ", ")})`.replace("cyan-500", "#00f5ff").replace("blue-600", "#2563eb").replace("purple-500", "#8b5cf6").replace("pink-600", "#db2777").replace("sky-500", "#0ea5e9").replace("indigo-600", "#4f46e5").replace("emerald-500", "#10b981").replace("teal-600", "#0d9488").replace("orange-500", "#f97316").replace("rose-600", "#e11d48").replace("amber-500", "#f59e0b").replace("red-600", "#dc2626"),
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(2px)",
        }} />

        {/* Project Emoji / Icon */}
        <motion.div
          animate={{ scale: hovered ? 1.15 : 1, rotate: hovered ? 4 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          style={{
            fontSize: "3.2rem",
            position: "relative",
            zIndex: 1,
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))",
          }}
        >
          {project.icon || "🚀"}
        </motion.div>

        {/* Top Badges Bar */}
        <div style={{
          position: "absolute",
          top: "12px",
          left: "12px",
          right: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 2,
        }}>
          {/* Status Badge */}
          {getStatusBadge(project.status)}

          {/* Featured Badge */}
          {project.featured && (
            <div style={{
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(10px)",
              borderRadius: "100px",
              padding: "4px 10px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "#f59e0b",
              border: "1px solid rgba(245,158,11,0.4)",
            }}>
              <Star size={10} fill="#f59e0b" />
              Featured
            </div>
          )}
        </div>
      </div>

      {/* Card Content Body */}
      <div style={{
        padding: "20px 24px 24px",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        justifyContent: "space-between",
      }}>
        <div>
          {/* Title & Subtitle */}
          <div style={{ marginBottom: "12px" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "8px",
              marginBottom: "4px",
            }}>
              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: "1.2rem",
                color: "var(--text-heading)",
                lineHeight: 1.25,
                margin: 0,
              }}>
                {project.title}
              </h3>
              <span style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                color: "var(--text-muted)",
                background: "rgba(255,255,255,0.05)",
                padding: "2px 8px",
                borderRadius: "6px",
                border: "1px solid var(--border-main)",
                whiteSpace: "nowrap",
              }}>
                {project.category}
              </span>
            </div>
            {project.subtitle && (
              <div style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "var(--color-cyan)",
                lineHeight: 1.3,
              }}>
                {project.subtitle}
              </div>
            )}
          </div>

          {/* Description */}
          <p style={{
            fontSize: "0.85rem",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            marginBottom: "14px",
          }}>
            {project.description}
          </p>

          {/* Portfolio Highlight Box */}
          {project.highlight && (
            <div style={{
              padding: "10px 14px",
              background: "linear-gradient(135deg, rgba(var(--color-cyan-rgb), 0.05), rgba(var(--color-purple-rgb), 0.05))",
              borderLeft: "3px solid var(--color-cyan)",
              borderRadius: "0 10px 10px 0",
              marginBottom: "16px",
              fontSize: "0.8rem",
              color: "var(--text-primary)",
              lineHeight: 1.5,
              fontWeight: 500,
            }}>
              <span style={{ color: "var(--color-cyan)", fontWeight: 700 }}>Key Highlight: </span>
              {project.highlight}
            </div>
          )}

          {/* Key Contributions Toggle */}
          {project.implemented && project.implemented.length > 0 && (
            <div style={{ marginBottom: "16px" }}>
              <button
                onClick={() => setShowImplemented(!showImplemented)}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  color: "var(--text-secondary)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: showImplemented ? "10px" : "0",
                  fontFamily: "var(--font-main)",
                }}
              >
                <span>{showImplemented ? "Hide key implementation details" : "Show key implementation details"}</span>
                {showImplemented ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              <AnimatePresence>
                {showImplemented && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      margin: 0,
                      paddingLeft: "0",
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      overflow: "hidden",
                    }}
                  >
                    {project.implemented.map((item, idx) => (
                      <li key={idx} style={{
                        fontSize: "0.78rem",
                        color: "var(--text-secondary)",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "6px",
                        lineHeight: 1.4,
                      }}>
                        <CheckCircle2 size={12} style={{ color: "var(--color-cyan)", marginTop: "2px", flexShrink: 0 }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Tech Stack Badges */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            marginBottom: "20px",
          }}>
            {project.tech.map((t) => (
              <span key={t} style={{
                padding: "3px 9px",
                background: "rgba(var(--color-cyan-rgb), 0.06)",
                border: "1px solid rgba(var(--color-cyan-rgb), 0.18)",
                borderRadius: "100px",
                fontSize: "0.72rem",
                fontWeight: 500,
                color: "var(--color-cyan)",
                fontFamily: "var(--font-mono)",
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Card Action Links Footer */}
        <div style={{
          display: "flex",
          gap: "10px",
          paddingTop: "12px",
          borderTop: "1px solid var(--border-divider)",
        }}>
          {/* Render GitHub button ONLY if project.github exists */}
          {project.github && project.github.trim() !== "" && (
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
                padding: "9px 14px",
                background: "var(--bg-card)",
                border: "1px solid var(--border-main)",
                borderRadius: "10px",
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              whileHover={{ borderColor: "rgba(255,255,255,0.4)", color: "var(--text-primary)" }}
            >
              <Github size={15} />
              Code
            </motion.a>
          )}

          {/* Live / API button */}
          {(project.live || project.apiLink) ? (
            <motion.a
              href={project.live || project.apiLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: project.github ? 1 : 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "9px 14px",
                background: "linear-gradient(135deg, rgba(var(--color-cyan-rgb), 0.15), rgba(var(--color-purple-rgb), 0.15))",
                border: "1px solid rgba(var(--color-cyan-rgb), 0.3)",
                borderRadius: "10px",
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "var(--color-cyan)",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              whileHover={{
                background: "linear-gradient(135deg, rgba(var(--color-cyan-rgb), 0.25), rgba(var(--color-purple-rgb), 0.25))",
                borderColor: "var(--color-cyan)",
              }}
            >
              <ExternalLink size={14} />
              {project.status === "API" ? "Live API" : "Live Demo"}
            </motion.a>
          ) : (
            <div style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "9px 14px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid var(--border-main)",
              borderRadius: "10px",
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "var(--text-muted)",
              cursor: "default",
            }}>
              <Clock size={14} />
              In Development
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("Featured");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { projects } = portfolioData;

  const filterOptions = ["Featured", "All", ...new Set(projects.map(p => p.category))];

  const filtered = filter === "Featured"
    ? projects.filter(p => p.featured)
    : filter === "All"
      ? projects
      : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="section" style={{ position: "relative" }}>
      {/* Background Radial Glow */}
      <div style={{
        position: "absolute",
        right: "5%",
        top: "20%",
        width: "450px",
        height: "450px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(var(--color-cyan-rgb), 0.06), transparent 70%)",
        filter: "blur(60px)",
        pointerEvents: "none",
      }} />

      <div className="container">
        {/* Header Section */}
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
                Portfolio Showcase
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
            <ScatterText delay={0.1}>Featured <span>Projects</span></ScatterText>
          </motion.h2>

          {/* Requested Intro text */}
          <motion.p
            className="section-subtitle"
            style={{
              textAlign: "center",
              margin: "0 auto 32px",
              maxWidth: "750px",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              color: "var(--text-secondary)",
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            I build scalable full-stack products ranging from AI-powered platforms and recruitment systems to enterprise business applications and mobile-first experiences.
          </motion.p>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}
          >
            {filterOptions.map(cat => (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "8px 20px",
                  borderRadius: "100px",
                  border: filter === cat ? "1px solid var(--color-cyan)" : "1px solid var(--border-main)",
                  background: filter === cat ? "rgba(var(--color-cyan-rgb), 0.12)" : "var(--bg-card)",
                  color: filter === cat ? "var(--color-cyan)" : "var(--text-secondary)",
                  fontSize: "0.83rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "var(--font-main)",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  boxShadow: filter === cat ? "0 0 15px rgba(var(--color-cyan-rgb), 0.2)" : "none",
                }}
              >
                {cat === "Featured" && <Star size={12} fill="currentColor" />}
                {cat === "All" && <Filter size={12} />}
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Projects Equal Height Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "28px",
              alignItems: "stretch",
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

