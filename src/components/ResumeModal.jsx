import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Printer, Phone, Mail, MapPin, Globe, Star, Layout, Check } from "lucide-react";
import portfolioData from "../data/portfolioData";
import { useTheme } from "../context/ThemeContext";

// Configurable Enhancv Resume Template Data
const enhancvResumeData = {
  header: {
    name: "RAHIL SHEIKH",
    role: "Full Stack Developer",
    phone: "+919993995502",
    email: "rahilsheikh73308@gmail.com",
    linkedin: "linkedin.com/in/ruh-sheikh29/",
    github: "github.com/Ruh29",
    location: "Barwani / Indore, India"
  },
  summary:
    "Full Stack Developer specializing in React.js, Next.js, Node.js, Express.js, PostgreSQL, MongoDB, and Redis. Experienced in developing enterprise applications, project management systems, event management platforms, and real-time web solutions. Strong understanding of software architecture, API development, database design, authentication, and performance optimization with a focus on delivering scalable and maintainable applications.",
  experience: [
    {
      title: "Frontend Developer Intern (Paid Internship)",
      company: "LogiQlink Technology",
      period: "06/2025 – 11/2025",
      location: "Indore",
      intro:
        "Completed a 6-month paid internship focused on frontend development and modern web technologies. Gained practical industry experience by working on real-world projects under the guidance of senior developers.",
      bullets: [
        "Developed responsive user interfaces using React.js, JavaScript, HTML5, CSS3, and Tailwind CSS",
        "Implemented reusable UI components and optimized application performance",
        "Integrated REST APIs and collaborated with backend developers for seamless functionality",
        "Learned industry-standard development practices including Git, GitHub, code reviews, and agile workflows",
        "Participated in debugging, testing, and feature implementation for client projects",
        "Strengthened problem-solving skills and understanding of scalable frontend architecture"
      ]
    },
    {
      title: "Full Stack Developer",
      company: "Purplesky Infotech",
      period: "12/2025 – Present",
      location: "Barwani",
      intro:
        "Working as a Full Stack Developer responsible for designing, developing, and maintaining web applications across frontend and backend systems. Collaborating with cross-functional teams to build scalable solutions and improve user experience.",
      bullets: [
        "Developed and maintained full-stack applications using React.js, Next.js, Node.js, Express.js, PostgreSQL, and Redis",
        "Built secure REST APIs, authentication systems, and role-based access control mechanisms",
        "Designed and optimized database structures for high-performance applications",
        "Developed ticket management, project management, and analytics modules for enterprise platforms",
        "Integrated third-party services, real-time communication, and caching mechanisms",
        "Participated in requirement analysis, code reviews, debugging, testing, and deployment processes",
        "Worked closely with clients and team members to deliver business-focused solutions"
      ]
    }
  ],
  education: [
    {
      title: "Bachelor of Information Technology",
      institute: "LNCT University",
      period: "08/2021 – 05/2025",
      location: "Indore"
    }
  ],
  skills: {
    frontend: [
      "React.js", "Next.js", "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3",
      "Tailwind CSS", "Redux Toolkit", "React Router DOM", "Responsive Web Design"
    ],
    backend: [
      "Node.js", "Express.js", "REST APIs", "JWT Authentication",
      "Role-Based Access Control (RBAC)", "Socket.IO", "API Development"
    ],
    database: [
      "PostgreSQL", "MongoDB", "Redis", "TypeORM"
    ]
  },
  languages: [
    { name: "Hindi", level: "Native" },
    { name: "English", level: "Native" }
  ],
  projects: [
    {
      title: "AI Auditor Platform",
      period: "05/2026",
      location: "Barwani",
      tech: "Next.js | TypeScript | Node.js | PostgreSQL | Redis | AI",
      description:
        "Developed AI Auditor Platform, an intelligent auditing solution that automates document analysis, compliance verification, risk assessment, and audit report generation. Built secure role-based access control, analytics dashboards, and scalable backend services to streamline auditing workflows and improve operational efficiency.",
      bullets: [
        "Built scalable PostgreSQL database architecture and REST APIs for enterprise-level usage.",
        "Implemented Redis caching to improve report generation speed and system performance.",
        "Designed secure role-based access control for Auditors, Managers, and ADMIN."
      ]
    }
  ]
};

// Component rendering the Exact Enhancv PDF Template
function EnhancvWhiteTemplate({ data }) {
  const { header, summary, experience, education, skills, languages, projects } = data;

  return (
    <div 
      className="resume-print-area"
      style={{
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        background: "#ffffff",
        boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
        padding: "36px 40px",
        color: "#1e293b",
        fontFamily: "'Inter', sans-serif",
        boxSizing: "border-box",
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "16px" }}>
        <h1 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "2.4rem",
          fontWeight: 800,
          letterSpacing: "0.02em",
          color: "#0f172a",
          margin: 0,
          lineHeight: 1.1,
        }}>
          {header.name}
        </h1>
        <div style={{
          fontSize: "1.1rem",
          fontWeight: 600,
          color: "#0284c7",
          marginTop: "4px",
          marginBottom: "10px",
        }}>
          {header.role}
        </div>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          fontSize: "0.78rem",
          color: "#475569",
          fontWeight: 500,
        }}>
          <span>📞 {header.phone}</span>
          <span>✉️ {header.email}</span>
        </div>
        <div style={{
          width: "100%",
          height: "1.5px",
          background: "#334155",
          marginTop: "14px",
        }} />
      </div>

      {/* Main 2-Column Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.65fr 1fr",
        gap: "28px",
        alignItems: "start",
      }}>
        {/* Left Column (Main Content) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Summary */}
          <div>
            <h2 style={{
              fontSize: "0.85rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#0f172a",
              borderBottom: "1.5px solid #0f172a",
              paddingBottom: "3px",
              marginBottom: "8px",
            }}>
              SUMMARY
            </h2>
            <p style={{
              fontSize: "0.75rem",
              color: "#334155",
              lineHeight: 1.55,
              margin: 0,
              textAlign: "justify",
            }}>
              {summary}
            </p>
          </div>

          {/* Experience */}
          <div>
            <h2 style={{
              fontSize: "0.85rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#0f172a",
              borderBottom: "1.5px solid #0f172a",
              paddingBottom: "3px",
              marginBottom: "12px",
            }}>
              EXPERIENCE
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {experience.map((exp, idx) => (
                <div key={idx}>
                  <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#0f172a" }}>
                    {exp.title}
                  </div>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.76rem",
                    color: "#0284c7",
                    fontWeight: 600,
                    marginTop: "2px",
                    marginBottom: "4px",
                  }}>
                    <span>{exp.company}</span>
                    <span>📅 {exp.period} &nbsp; 📍 {exp.location}</span>
                  </div>
                  <p style={{ fontSize: "0.73rem", color: "#475569", lineHeight: 1.45, margin: "0 0 6px 0" }}>
                    {exp.intro}
                  </p>
                  <ul style={{
                    margin: 0,
                    paddingLeft: "14px",
                    fontSize: "0.72rem",
                    color: "#334155",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    lineHeight: 1.4,
                  }}>
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 style={{
              fontSize: "0.85rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#0f172a",
              borderBottom: "1.5px solid #0f172a",
              paddingBottom: "3px",
              marginBottom: "10px",
            }}>
              EDUCATION
            </h2>
            {education.map((edu, idx) => (
              <div key={idx}>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f172a" }}>
                  {edu.title}
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.76rem",
                  color: "#0284c7",
                  fontWeight: 600,
                  marginTop: "2px",
                }}>
                  <span>{edu.institute}</span>
                  <span>📅 {edu.period} &nbsp; 📍 {edu.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Skills */}
          <div>
            <h2 style={{
              fontSize: "0.85rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#0f172a",
              borderBottom: "1.5px solid #0f172a",
              paddingBottom: "3px",
              marginBottom: "10px",
            }}>
              SKILLS
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div>
                <div style={{ fontSize: "0.76rem", fontWeight: 700, color: "#0284c7", marginBottom: "4px" }}>
                  Frontend
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {skills.frontend.map(s => (
                    <span key={s} style={{
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      background: "#f1f5f9",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      color: "#334155",
                    }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: "0.76rem", fontWeight: 700, color: "#0284c7", marginBottom: "4px" }}>
                  Backend
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {skills.backend.map(s => (
                    <span key={s} style={{
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      background: "#f1f5f9",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      color: "#334155",
                    }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: "0.76rem", fontWeight: 700, color: "#0284c7", marginBottom: "4px" }}>
                  Database
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {skills.database.map(s => (
                    <span key={s} style={{
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      background: "#f1f5f9",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      color: "#334155",
                    }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div>
            <h2 style={{
              fontSize: "0.85rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#0f172a",
              borderBottom: "1.5px solid #0f172a",
              paddingBottom: "3px",
              marginBottom: "8px",
            }}>
              LANGUAGES
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {languages.map(lang => (
                <div key={lang.name} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.74rem" }}>
                  <span style={{ fontWeight: 600, color: "#334155" }}>{lang.name}</span>
                  <span style={{ color: "#64748b" }}>{lang.level}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 style={{
              fontSize: "0.85rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#0f172a",
              borderBottom: "1.5px solid #0f172a",
              paddingBottom: "3px",
              marginBottom: "10px",
            }}>
              PROJECTS
            </h2>
            {projects.map((proj, idx) => (
              <div key={idx}>
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0f172a" }}>
                  {proj.title}
                </div>
                <div style={{ fontSize: "0.72rem", color: "#64748b", margin: "2px 0" }}>
                  📅 {proj.period} &nbsp; 📍 {proj.location}
                </div>
                <div style={{ fontSize: "0.7rem", color: "#0284c7", fontWeight: 600, marginBottom: "4px" }}>
                  {proj.tech}
                </div>
                <p style={{ fontSize: "0.71rem", color: "#334155", lineHeight: 1.4, margin: "0 0 6px 0" }}>
                  {proj.description}
                </p>
                <ul style={{
                  margin: 0,
                  paddingLeft: "14px",
                  fontSize: "0.7rem",
                  color: "#334155",
                  display: "flex",
                  flexDirection: "column",
                  gap: "3px",
                  lineHeight: 1.4,
                }}>
                  {proj.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhancv Footer Branding */}
      <div style={{
        marginTop: "28px",
        paddingTop: "12px",
        borderTop: "1px solid #e2e8f0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "0.65rem",
        color: "#94a3b8",
      }}>
        <span>www.enhancv.com</span>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span>Powered by</span>
          <span style={{ fontWeight: 800, color: "#0f172a", letterSpacing: "0.05em" }}>enhancv</span>
        </div>
      </div>
    </div>
  );
}

// Split Teal Sidebar Template Component
function TealSplitTemplate({ data }) {
  const { header, summary, experience, education, skills, languages, projects } = data;

  return (
    <div 
      className="resume-print-area"
      style={{
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        background: "#ffffff",
        boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
        borderRadius: "4px",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "270px 1fr",
        minHeight: "1050px",
        color: "#1e293b",
        fontFamily: "'Inter', sans-serif",
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
      }}
    >
      {/* Left Teal Sidebar */}
      <div style={{
        background: "#005c53",
        color: "#ffffff",
        padding: "36px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        height: "100%",
        boxSizing: "border-box",
      }}>
        <div>
          <h1 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "2.1rem",
            fontWeight: 800,
            letterSpacing: "0.03em",
            margin: 0,
            lineHeight: 1.1,
          }}>
            {header.name}
          </h1>
          <div style={{
            width: "100%",
            height: "1px",
            background: "rgba(255,255,255,0.25)",
            marginTop: "16px",
          }} />
        </div>

        {/* Education Sidebar */}
        <div>
          <h3 style={{
            fontSize: "0.85rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#ffffff",
            borderBottom: "1.5px solid rgba(255,255,255,0.25)",
            paddingBottom: "4px",
            marginBottom: "12px",
          }}>
            Education
          </h3>
          {education.map((edu, i) => (
            <div key={i}>
              <h4 style={{ fontSize: "0.82rem", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                {edu.title}
              </h4>
              <div style={{ fontSize: "0.75rem", color: "#ffffff", fontWeight: 600, marginTop: "2px" }}>
                {edu.institute}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "#cbd5e1", marginTop: "4px" }}>
                <span>{edu.period}</span>
                <span>{edu.location}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Languages */}
        <div>
          <h3 style={{
            fontSize: "0.85rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#ffffff",
            borderBottom: "1.5px solid rgba(255,255,255,0.25)",
            paddingBottom: "4px",
            marginBottom: "12px",
          }}>
            Languages
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {languages.map((lang) => (
              <div key={lang.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem" }}>
                <span style={{ fontWeight: 700 }}>{lang.name}</span>
                <span style={{ color: "#cbd5e1", fontSize: "0.68rem" }}>{lang.level}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Sidebar */}
        <div>
          <h3 style={{
            fontSize: "0.85rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#ffffff",
            borderBottom: "1.5px solid rgba(255,255,255,0.25)",
            paddingBottom: "4px",
            marginBottom: "12px",
          }}>
            Recent Roles
          </h3>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: "14px" }}>
              <h4 style={{ fontSize: "0.82rem", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                {exp.title}
              </h4>
              <div style={{ fontSize: "0.75rem", color: "#e2e8f0", fontWeight: 600, marginTop: "2px" }}>
                {exp.company}
              </div>
              <div style={{ fontSize: "0.7rem", color: "#cbd5e1", marginTop: "2px" }}>
                {exp.period}
              </div>
            </div>
          ))}
        </div>

        {/* Enhancv Branding */}
        <div style={{
          marginTop: "auto",
          paddingTop: "24px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "0.62rem",
          color: "rgba(255,255,255,0.45)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}>
          <span>Powered by</span>
          <span style={{ fontWeight: 800, letterSpacing: "0.05em", color: "#ffffff" }}>enhancv</span>
        </div>
      </div>

      {/* Right Column */}
      <div style={{
        padding: "36px 30px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        background: "#ffffff",
        height: "100%",
        boxSizing: "border-box",
      }}>
        <div>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "1.15rem",
            fontWeight: 700,
            color: "#005c53",
            margin: 0,
          }}>
            {header.role}
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 16px", marginTop: "8px", fontSize: "0.75rem", color: "#475569" }}>
            <span>📞 {header.phone}</span>
            <span>✉️ {header.email}</span>
          </div>
        </div>

        {/* Summary */}
        <div>
          <h3 style={{
            fontSize: "0.85rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#005c53",
            borderBottom: "1.5px solid #005c53",
            paddingBottom: "4px",
            marginBottom: "8px",
          }}>
            Summary
          </h3>
          <p style={{ fontSize: "0.75rem", color: "#334155", lineHeight: 1.5, margin: 0 }}>
            {summary}
          </p>
        </div>

        {/* Experience */}
        <div>
          <h3 style={{
            fontSize: "0.85rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#005c53",
            borderBottom: "1.5px solid #005c53",
            paddingBottom: "4px",
            marginBottom: "10px",
          }}>
            Experience Details
          </h3>
          {experience.map((exp, idx) => (
            <div key={idx} style={{ marginBottom: "12px" }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0f172a" }}>{exp.title}</div>
              <div style={{ fontSize: "0.73rem", color: "#005c53", fontWeight: 600, marginBottom: "4px" }}>
                {exp.company} ({exp.period})
              </div>
              <ul style={{ margin: 0, paddingLeft: "14px", fontSize: "0.7rem", color: "#334155", lineHeight: 1.4 }}>
                {exp.bullets.slice(0, 4).map((b, bIdx) => (
                  <li key={bIdx}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ marginTop: "auto", paddingTop: "12px", display: "flex", justifyContent: "flex-end", fontSize: "0.62rem", color: "#94a3b8" }}>
          <span>www.enhancv.com</span>
        </div>
      </div>
    </div>
  );
}

export default function ResumeModal({ isOpen, onClose }) {
  const [activeTemplate, setActiveTemplate] = useState("enhancvWhite");
  const { theme } = useTheme();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div 
        className="resume-modal-container"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          overflowY: "auto",
        }}
      >
        {/* Backdrop overlay */}
        <motion.div
          className="resume-modal-backdrop no-print"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        />

        {/* Modal content */}
        <motion.div
          className="resume-modal-content"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{
            position: "relative",
            zIndex: 10001,
            width: "100%",
            maxWidth: "960px",
            background: "var(--bg-card-solid)",
            borderRadius: "20px",
            border: "1px solid var(--border-main)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            maxHeight: "92vh",
          }}
        >
          {/* Controls Header */}
          <div style={{
            padding: "14px 24px",
            borderBottom: "1px solid var(--border-main)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "var(--bg-darker)",
            flexShrink: 0,
            flexWrap: "wrap",
            gap: "12px",
          }} className="no-print">
            {/* Title & Template Switcher */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                color: "var(--text-heading)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}>
                <Layout size={16} style={{ color: "var(--color-cyan)" }} />
                Resume Preview:
              </span>

              {/* Template selection tabs */}
              <div style={{
                display: "flex",
                background: "var(--bg-card)",
                padding: "3px",
                borderRadius: "8px",
                border: "1px solid var(--border-main)",
              }}>
                <button
                  onClick={() => setActiveTemplate("enhancvWhite")}
                  style={{
                    padding: "5px 12px",
                    borderRadius: "6px",
                    border: "none",
                    background: activeTemplate === "enhancvWhite" ? "rgba(var(--color-cyan-rgb), 0.15)" : "transparent",
                    color: activeTemplate === "enhancvWhite" ? "var(--color-cyan)" : "var(--text-secondary)",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  {activeTemplate === "enhancvWhite" && <Check size={12} />}
                  Enhancv PDF Format
                </button>
                <button
                  onClick={() => setActiveTemplate("tealSplit")}
                  style={{
                    padding: "5px 12px",
                    borderRadius: "6px",
                    border: "none",
                    background: activeTemplate === "tealSplit" ? "rgba(var(--color-cyan-rgb), 0.15)" : "transparent",
                    color: activeTemplate === "tealSplit" ? "var(--color-cyan)" : "var(--text-secondary)",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  {activeTemplate === "tealSplit" && <Check size={12} />}
                  Teal Split Format
                </button>
              </div>
            </div>

            {/* Print & Close Action Buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                onClick={handlePrint}
                className="btn-primary"
                style={{
                  padding: "8px 16px",
                  fontSize: "0.82rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  borderRadius: "8px",
                  background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                  color: "#000000",
                  border: "none",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                <Printer size={14} />
                <span>Print / Save PDF</span>
              </button>
              <button
                onClick={onClose}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-main)",
                  borderRadius: "8px",
                  padding: "6px",
                  cursor: "pointer",
                  color: "var(--text-secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Resume Frame Container */}
          <div className="resume-frame-wrapper" style={{ flex: 1, overflowY: "auto", padding: "24px", background: "rgba(0,0,0,0.2)" }}>
            {activeTemplate === "enhancvWhite" ? (
              <EnhancvWhiteTemplate data={enhancvResumeData} />
            ) : (
              <TealSplitTemplate data={enhancvResumeData} />
            )}
          </div>
        </motion.div>
      </div>

      {/* Global Print Styling CSS */}
      <style>{`
        @media print {
          /* Hide website chrome */
          nav, main, footer, .no-print, [style*="radial-gradient"] {
            display: none !important;
          }
          
          /* Reset root layout for printing */
          html, body, #root, #root > div {
            height: auto !important;
            min-height: 0 !important;
            overflow: visible !important;
            background: #ffffff !important;
          }

          /* Reset modal fixed containers to block */
          .resume-modal-container {
            position: static !important;
            inset: auto !important;
            padding: 0 !important;
            overflow: visible !important;
            display: block !important;
            z-index: auto !important;
          }

          /* Hide backdrop */
          .resume-modal-backdrop {
            display: none !important;
          }

          /* Reset modal content box for full page print */
          .resume-modal-content {
            position: static !important;
            width: 100% !important;
            max-width: none !important;
            max-height: none !important;
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            overflow: visible !important;
            display: block !important;
            background: #ffffff !important;
          }

          /* Reset frame wrapper */
          .resume-frame-wrapper {
            padding: 0 !important;
            background: none !important;
            overflow: visible !important;
            display: block !important;
          }

          /* Format the print area */
          .resume-print-area {
            width: 100% !important;
            max-width: 800px !important;
            margin: 0 auto !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            overflow: visible !important;
            min-height: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </AnimatePresence>
  );
}

