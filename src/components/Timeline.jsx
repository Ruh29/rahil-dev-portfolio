import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, Code2, BookOpen, Briefcase, GraduationCap, Rocket, GitCommit } from "lucide-react";
import portfolioData from "../data/portfolioData";
import { useTheme } from "../context/ThemeContext";
import ScatterText from "./ScatterText";

const ICON_MAP = { Code2, BookOpen, Briefcase, GraduationCap, Rocket };

function TimelineItem({ item, index, isLast }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const Icon = ICON_MAP[item.icon] || GitCommit;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ type: "spring", stiffness: 80, damping: 12, delay: index * 0.12 }}
      className="timeline-item"
      style={{
        position: "relative",
        paddingLeft: "80px",
        marginBottom: isLast ? 0 : "36px",
      }}
    >
      {/* Timeline dot */}
      <div
        className="timeline-dot"
        style={{
          position: "absolute",
          left: "12px",
          top: "20px",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          background: item.color,
          boxShadow: `0 0 20px ${item.color}60, 0 0 40px ${item.color}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        <motion.div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "white",
          }}
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
        />
      </div>

      {/* Connector line segment */}
      {!isLast && (
        <motion.div
          className="timeline-connector"
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.6, delay: index * 0.12 + 0.3 }}
          style={{
            position: "absolute",
            left: "23px",
            top: "44px",
            bottom: "-36px",
            width: "2px",
            background: `linear-gradient(to bottom, ${item.color}80, transparent)`,
            transformOrigin: "top",
          }}
        />
      )}

      {/* Card */}
      <motion.div
        className="timeline-card"
        whileHover={{ x: 6, borderColor: `${item.color}40` }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-main)",
          borderRadius: "16px",
          padding: "20px 24px",
          cursor: "default",
          transition: "border-color 0.3s ease",
        }}
      >
        <div className="timeline-card-header" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "10px", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: `${item.color}15`,
              border: `1px solid ${item.color}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <Icon size={16} style={{ color: item.color }} />
            </div>
            <div>
              <div className="timeline-card-title" style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-heading)", lineHeight: 1.2 }}>
                {item.title}
              </div>
              <div style={{ fontSize: "0.82rem", color: item.color, fontWeight: 600, marginTop: "2px" }}>
                {item.company}
              </div>
            </div>
          </div>
          <div className="timeline-card-period" style={{
            background: `${item.color}12`,
            border: `1px solid ${item.color}25`,
            borderRadius: "8px",
            padding: "4px 10px",
            fontSize: "0.72rem",
            fontWeight: 600,
            color: item.color,
            fontFamily: "var(--font-mono)",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}>
            {item.period}
          </div>
        </div>

        <p className="timeline-card-desc" style={{ fontSize: "0.87rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "12px" }}>
          {item.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {item.skills.map((skill) => (
            <span key={skill} style={{
              padding: "3px 10px",
              background: `${item.color}08`,
              border: `1px solid ${item.color}20`,
              borderRadius: "100px",
              fontSize: "0.72rem",
              fontWeight: 500,
              color: item.color,
              fontFamily: "var(--font-mono)",
            }}>
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Timeline() {
  const { timeline } = portfolioData;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { theme } = useTheme();

  return (
    <section id="timeline" className="section" style={{ position: "relative", background: "rgba(var(--color-purple-rgb), 0.01)" }}>
      <div style={{
        position: "absolute",
        left: "50%",
        top: "10%",
        transform: "translateX(-50%)",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${theme.secondary}0D, transparent 70%)`,
        filter: "blur(60px)",
        pointerEvents: "none",
      }} />

      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }} className="timeline-layout">
          {/* Left — Header + Description */}
          <div ref={ref} style={{ position: "sticky", top: "100px" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 100, damping: 12 }}
              style={{ marginBottom: "16px" }}
            >
              <div className="section-tag">
                <ScatterText delay={0.05}>
                  <Sparkles size={12} style={{ display: "inline-block", marginRight: "6px", verticalAlign: "middle" }} />
                  My Journey
                </ScatterText>
              </div>
            </motion.div>

            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              <ScatterText delay={0.1}>My Coding <span>Journey</span></ScatterText>
            </motion.h2>

            <motion.p
              className="section-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              style={{ marginBottom: "36px" }}
            >
              From writing my first line of HTML to building full React.js applications — here's how my developer story unfolds.
            </motion.p>

            {/* Year markers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {[
                { year: "2026", label: "Full Stack Developer at PurpleSky", color: theme.primary },
                { year: "2025", label: "Paid Internship at LogiQlink", color: theme.secondary },
                { year: "2024", label: "Advanced React & Backend Learning", color: theme.accent },
                { year: "2023", label: "Projects & Skill Building", color: theme.primary },
                { year: "2021", label: "Started B.Tech Journey", color: theme.secondary },
              ].map(({ year, label, color }, i) => (
                <div key={year} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "56px",
                    height: "28px",
                    borderRadius: "6px",
                    background: `${color}15`,
                    border: `1px solid ${color}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color,
                    fontFamily: "var(--font-mono)",
                    flexShrink: 0,
                  }}>
                    {year}
                  </div>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{label}</span>
                </div>
              ))}
            </motion.div>

            {/* Fun fact card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              style={{
                marginTop: "32px",
                padding: "20px",
                background: "linear-gradient(135deg, rgba(var(--color-pink-rgb), 0.06), rgba(var(--color-purple-rgb), 0.06))",
                border: "1px solid rgba(var(--color-pink-rgb), 0.2)",
                borderRadius: "16px",
              }}
            >
              <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>💪</div>
              <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--text-heading)", marginBottom: "6px" }}>
                Self-Taught & Production-Driven Developer
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Built real-world applications through continuous learning, internships, client projects, and production deployments. Strong believer that consistency, problem solving, and hands-on development create real engineering skills.
              </div>
            </motion.div>
          </div>

          {/* Right — Timeline */}
          <div style={{ position: "relative", paddingLeft: "0" }}>
            {/* Vertical line */}
            <motion.div
              className="timeline-main-line"
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{
                position: "absolute",
                left: "23px",
                top: "20px",
                bottom: "20px",
                width: "2px",
                background: `linear-gradient(to bottom, transparent, ${theme.primary}, ${theme.secondary}, ${theme.accent}, transparent)`,
                transformOrigin: "top",
              }}
            />

            {timeline.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} isLast={i === timeline.length - 1} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .timeline-layout {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .timeline-layout > div:first-child {
            position: static !important;
          }
        }
        @media (max-width: 640px) {
          .timeline-item {
            padding-left: 32px !important;
            margin-bottom: 24px !important;
          }
          .timeline-dot {
            left: 0px !important;
            width: 18px !important;
            height: 18px !important;
            top: 16px !important;
          }
          .timeline-connector {
            left: 8px !important;
            top: 34px !important;
          }
          .timeline-main-line {
            left: 8px !important;
          }
          .timeline-card {
            padding: 14px 16px !important;
            border-radius: 14px !important;
          }
          .timeline-card-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
          }
          .timeline-card-period {
            align-self: flex-start !important;
          }
          .timeline-card-title {
            font-size: 0.95rem !important;
          }
          .timeline-card-desc {
            font-size: 0.82rem !important;
            line-height: 1.55 !important;
          }
        }
      `}</style>
    </section>
  );
}
