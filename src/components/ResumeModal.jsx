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
    phone: "+91 9993995502",
    email: "rahilsheikh73308@gmail.com",
    linkedin: "linkedin.com/in/ruh-sheikh29/",
    github: "github.com/Ruh29",
    location: "Indore, India"
  },
  summary:
    "Full Stack Developer with 1.5+ year of experience in React Native and strong expertise in React.js, Next.js, Node.js, Express.js, PostgreSQL, MongoDB, and Redis. Experienced in developing enterprise applications, cross-platform mobile applications, project management systems, event management platforms, and real-time web solutions. Strong understanding of software architecture, RESTful API development, database design, authentication, state management, and performance optimization. Skilled in building scalable, maintainable, and high-performance web and mobile applications with a focus on clean code, reusable components, and reliable system architecture.",
  experience: [
    {
      title: "Full Stack Developer",
      company: "Purplesky Infotech",
      period: "12/2025 – Present",
      location: "Barwani",
      intro:
        "Working as a Full Stack Developer responsible for designing, developing, and maintaining web applications across frontend and backend systems. Collaborating with cross-functional teams to build scalable solutions and improve user experience.",
      bullets: [
        "Developed and maintained full-stack applications using React.js, Next.js, Node.js, Express.js, PostgreSQL, and Redis",
        "Built secure REST APIs, authentication systems, and role-based access control (RBAC) mechanisms",
        "Designed and optimized database structures for high-performance applications",
        "Developed ticket management, CRM project workflows, and analytics modules for enterprise platforms",
        "Integrated third-party services, real-time communication, and caching mechanisms",
        "Participated in requirement analysis, code reviews, debugging, testing, and deployment processes"
      ]
    },
    {
      title: "Frontend Developer Intern (Paid Internship)",
      company: "LogiQlink Technology",
      period: "06/2025 – 11/2025",
      location: "Indore",
      intro:
        "Completed a 6-month paid internship focused on frontend development and modern web technologies. Gained practical industry experience by working on real-world projects under senior guidance.",
      bullets: [
        "Developed responsive user interfaces using React.js, JavaScript, HTML5, CSS3, and Tailwind CSS",
        "Implemented reusable UI components and optimized application performance",
        "Integrated REST APIs and collaborated with backend developers for seamless functionality",
        "Practiced industry-standard development workflows including Git, GitHub, code reviews, and agile methodologies",
        "Participated in debugging, testing, and feature implementation for client projects"
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
      "React.js", "React Native", "Next.js", "JavaScript", "TypeScript",
      "HTML5", "CSS3", "Tailwind CSS", "Redux Toolkit", "React Router DOM", "Responsive Web Design"
    ],
    backend: [
      "Node.js", "Express.js", "REST APIs", "JWT Authentication",
      "Role-Based Access Control (RBAC)", "Socket.IO", "API Development"
    ],
    database: [
      "PostgreSQL", "MongoDB", "Redis", "TypeORM", "Prisma"
    ],
    tools: [
      "Git", "GitHub", "Jira", "Postman", "VS Code", "npm", "REST Client", "Agile/Scrum", "Debugging", "Code Review"
    ],
    deployment: [
      "Vercel", "Netlify", "Render", "Cloudinary", "GitHub-based Deployment", "Environment Configuration", "Production Deployment"
    ],
    practices: [
      "API Integration", "Authentication & Authorization", "Database Design", "Performance Optimization", "Real-Time Communication", "Version Control", "CI/CD Fundamentals"
    ]
  },
  languages: [
    { name: "Hindi", level: "Native" },
    { name: "English", level: "Professional" }
  ],
  projects: [
    {
      title: "Learning Web / E-Learning Platform",
      tech: "React.js • Next.js • Node.js • Express.js • PostgreSQL • Redis • TypeScript • LiveKit • HLS",
      bullets: [
        "Developed an e-learning platform supporting Admin, Instructor, and Student roles with role-based access and course management.",
        "Implemented video learning workflows with video processing, transcoding, HLS streaming, and Redis/Valkey-based services.",
        "Integrated LiveKit for real-time live classes and implemented scalable backend APIs for courses, users, and learning modules."
      ]
    },
    {
      title: "Seek-N-Hire – Recruitment & Job Management Platform",
      tech: "React.js • Node.js • Express.js • PostgreSQL • Redis • Socket.IO",
      bullets: [
        "Developed features for a recruitment platform covering job management, candidate workflows, notifications, sponsorships, and administrative modules.",
        "Implemented REST APIs, authentication, role-based access control, real-time communication, and database-driven business logic.",
        "Worked on scalable modules including permission management, notification systems, sponsorship management, and reporting workflows."
      ]
    },
    {
      title: "CRM / Project Management System",
      tech: "React.js • Next.js • Node.js • Express.js • PostgreSQL • Redis • TypeScript",
      bullets: [
        "Developed enterprise CRM functionality for lead, client, project, sales, proposal, quotation, purchase order, and reporting workflows.",
        "Designed and integrated REST APIs, database structures, authentication, permissions, and role-based access control.",
        "Built reusable UI components and optimized application workflows for maintainability and performance."
      ]
    },
    {
      title: "Fleet Management Mobile Application",
      tech: "React Native • Expo • Node.js • Express.js • PostgreSQL • REST APIs",
      bullets: [
        "Developed a cross-platform React Native mobile application for fleet and field-management workflows.",
        "Implemented mobile UI, API integration, authentication, location-based workflows, and real-time operational data handling.",
        "Worked on reusable components and optimized mobile application performance and user experience."
      ]
    },
    {
      title: "AI Interview / Interview Preparation Application",
      tech: "React Native • Expo • Node.js • Express.js • REST APIs • AI Integration",
      bullets: [
        "Developed a mobile interview preparation application supporting technical and role-based interview sessions.",
        "Implemented interview session management, question-answer workflows, API integration, and structured interview responses.",
        "Built reusable React Native components and integrated backend services for dynamic interview experiences."
      ]
    },
    {
      title: "Stock Market Application",
      tech: "React Native • Expo • Node.js • Express.js • REST APIs",
      bullets: [
        "Developed a mobile application for stock market data, financial information, and market tracking workflows.",
        "Implemented API integration, dynamic market data presentation, reusable mobile components, and responsive interfaces.",
        "Focused on performance, clean UI architecture, and efficient handling of frequently changing data."
      ]
    }
  ]
};

// Component rendering the Exact Enhancv PDF Template
function EnhancvWhiteTemplate({ data }) {
  const { header, summary, experience, education, skills, languages, projects } = data;

  const skillCategories = [
    { title: "Frontend", items: skills.frontend },
    { title: "Backend", items: skills.backend },
    { title: "Database & Caching", items: skills.database },
    { title: "Tools & Development", items: skills.tools },
    { title: "Deployment & Cloud", items: skills.deployment },
    { title: "Development Practices", items: skills.practices }
  ];

  return (
    <div 
      className="resume-print-area"
      style={{
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        background: "#ffffff",
        boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
        padding: "28px 34px",
        color: "#1e293b",
        fontFamily: "'Inter', sans-serif",
        boxSizing: "border-box",
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "12px" }}>
        <h1 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "2.1rem",
          fontWeight: 800,
          letterSpacing: "0.02em",
          color: "#0f172a",
          margin: 0,
          lineHeight: 1.1,
        }}>
          {header.name}
        </h1>
        <div style={{
          fontSize: "1.05rem",
          fontWeight: 600,
          color: "#0284c7",
          marginTop: "3px",
          marginBottom: "8px",
        }}>
          {header.role}
        </div>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          fontSize: "0.74rem",
          color: "#475569",
          fontWeight: 500,
        }}>
          <span>📞 {header.phone}</span>
          <span>✉️ {header.email}</span>
          <span>🔗 {header.linkedin}</span>
          <span>💻 {header.github}</span>
          <span>📍 {header.location}</span>
        </div>
        <div style={{
          width: "100%",
          height: "1.5px",
          background: "#334155",
          marginTop: "10px",
        }} />
      </div>

      {/* Main 2-Column Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.55fr 1fr",
        gap: "20px",
        alignItems: "start",
      }}>
        {/* Left Column (Main Content) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* Summary */}
          <div>
            <h2 style={{
              fontSize: "0.8rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#0f172a",
              borderBottom: "1.5px solid #0f172a",
              paddingBottom: "2px",
              marginBottom: "6px",
            }}>
              SUMMARY
            </h2>
            <p style={{
              fontSize: "0.71rem",
              color: "#334155",
              lineHeight: 1.45,
              margin: 0,
              textAlign: "justify",
            }}>
              {summary}
            </p>
          </div>

          {/* Experience */}
          <div>
            <h2 style={{
              fontSize: "0.8rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#0f172a",
              borderBottom: "1.5px solid #0f172a",
              paddingBottom: "2px",
              marginBottom: "8px",
            }}>
              EXPERIENCE
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {experience.map((exp, idx) => (
                <div key={idx}>
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0f172a" }}>
                    {exp.title}
                  </div>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.73rem",
                    color: "#0284c7",
                    fontWeight: 600,
                    marginTop: "1px",
                    marginBottom: "3px",
                  }}>
                    <span>{exp.company}</span>
                    <span>📅 {exp.period} &nbsp; 📍 {exp.location}</span>
                  </div>
                  <p style={{ fontSize: "0.7rem", color: "#475569", lineHeight: 1.35, margin: "0 0 4px 0" }}>
                    {exp.intro}
                  </p>
                  <ul style={{
                    margin: 0,
                    paddingLeft: "14px",
                    fontSize: "0.68rem",
                    color: "#334155",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                    lineHeight: 1.35,
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
              fontSize: "0.8rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#0f172a",
              borderBottom: "1.5px solid #0f172a",
              paddingBottom: "2px",
              marginBottom: "6px",
            }}>
              EDUCATION
            </h2>
            {education.map((edu, idx) => (
              <div key={idx}>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#0f172a" }}>
                  {edu.title}
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.72rem",
                  color: "#0284c7",
                  fontWeight: 600,
                  marginTop: "1px",
                }}>
                  <span>{edu.institute}</span>
                  <span>📅 {edu.period} &nbsp; 📍 {edu.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* Skills Section */}
          <div>
            <h2 style={{
              fontSize: "0.8rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#0f172a",
              borderBottom: "1.5px solid #0f172a",
              paddingBottom: "2px",
              marginBottom: "8px",
            }}>
              SKILLS
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {skillCategories.map((cat, idx) => (
                <div key={idx}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#0284c7", marginBottom: "2px" }}>
                    {cat.title}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "1px 0" }}>
                    {cat.items.map((s) => (
                      <span
                        key={s}
                        style={{
                          fontSize: "0.66rem",
                          fontWeight: 600,
                          color: "#1e293b",
                          borderBottom: "1.5px solid #0284c7",
                          paddingBottom: "1px",
                          marginRight: "8px",
                          marginBottom: "4px",
                          display: "inline-block",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h2 style={{
              fontSize: "0.8rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#0f172a",
              borderBottom: "1.5px solid #0f172a",
              paddingBottom: "2px",
              marginBottom: "6px",
            }}>
              LANGUAGES
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              {languages.map(lang => (
                <div key={lang.name} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem" }}>
                  <span style={{ fontWeight: 600, color: "#334155" }}>{lang.name}</span>
                  <span style={{ color: "#64748b" }}>{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Full Width Projects Section at the Bottom */}
      <div style={{ marginTop: "18px", paddingTop: "10px", borderTop: "1.5px dashed #cbd5e1" }}>
        <h2 style={{
          fontSize: "0.8rem",
          fontWeight: 800,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#0f172a",
          borderBottom: "1.5px solid #0f172a",
          paddingBottom: "2px",
          marginBottom: "8px",
        }}>
          SELECTED PROJECTS
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "10px 14px",
        }}>
          {projects.map((proj, idx) => (
            <div key={idx} style={{
              background: "#f8fafc",
              padding: "8px 10px",
              borderRadius: "6px",
              border: "1px solid #e2e8f0",
              boxSizing: "border-box",
            }}>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#0f172a", marginBottom: "2px" }}>
                {proj.title}
              </div>
              <div style={{ fontSize: "0.65rem", color: "#0284c7", fontWeight: 600, marginBottom: "4px", lineHeight: 1.3 }}>
                <strong>Technologies:</strong> {proj.tech}
              </div>
              <ul style={{
                margin: 0,
                paddingLeft: "14px",
                fontSize: "0.65rem",
                color: "#334155",
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                lineHeight: 1.35,
              }}>
                {proj.bullets.map((b, bIdx) => (
                  <li key={bIdx}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Enhancv Footer Branding */}
      <div style={{
        marginTop: "20px",
        paddingTop: "10px",
        borderTop: "1px solid #e2e8f0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "0.62rem",
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
                {exp.bullets.map((b, bIdx) => (
                  <li key={bIdx}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Selected Projects */}
        <div style={{ marginTop: "8px" }}>
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
            Selected Projects
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {projects.map((proj, idx) => (
              <div key={idx} style={{ background: "#f8fafc", padding: "8px 10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#0f172a" }}>{proj.title}</div>
                <div style={{ fontSize: "0.68rem", color: "#005c53", fontWeight: 600, margin: "2px 0 4px 0" }}>{proj.tech}</div>
                <ul style={{ margin: 0, paddingLeft: "14px", fontSize: "0.68rem", color: "#334155", lineHeight: 1.35 }}>
                  {proj.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
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
    const printArea = document.querySelector(".resume-print-area");
    if (!printArea) {
      window.print();
      return;
    }

    let iframe = document.getElementById("resume-print-iframe");
    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.id = "resume-print-iframe";
      iframe.style.position = "fixed";
      iframe.style.right = "0";
      iframe.style.bottom = "0";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "none";
      iframe.style.opacity = "0";
      iframe.style.pointerEvents = "none";
      document.body.appendChild(iframe);
    }

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Rahil Sheikh - Resume</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet">
          <style>
            * { box-sizing: border-box; }
            html, body {
              margin: 0;
              padding: 0;
              background: #ffffff !important;
              color: #1e293b !important;
              font-family: 'Inter', sans-serif;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .resume-print-area {
              width: 100% !important;
              max-width: 800px !important;
              margin: 0 auto !important;
              padding: 24px 30px !important;
              background: #ffffff !important;
              color: #1e293b !important;
              box-shadow: none !important;
              border: none !important;
            }
            @page {
              size: A4 portrait;
              margin: 6mm 8mm;
            }
            @media print {
              html, body { background: #ffffff !important; margin: 0; padding: 0; }
              .resume-print-area { padding: 0 !important; }
            }
          </style>
        </head>
        <body>
          ${printArea.outerHTML}
        </body>
      </html>
    `);
    doc.close();

    setTimeout(() => {
      try {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      } catch (err) {
        console.error("Print error:", err);
        window.print();
      }
    }, 250);
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
          @page {
            size: A4 portrait;
            margin: 6mm 8mm;
          }

          /* Hide all main page content outside of ResumeModal */
          #root > div > *:not(.resume-modal-container),
          main, nav, footer, .no-print, [style*="radial-gradient"] {
            display: none !important;
          }

          /* Reset root layout for clean block printing */
          html, body, #root, #root > div {
            background: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
            height: auto !important;
            min-height: 0 !important;
            overflow: visible !important;
            display: block !important;
          }

          /* Reset fixed modal container */
          .resume-modal-container {
            position: static !important;
            inset: auto !important;
            padding: 0 !important;
            margin: 0 !important;
            background: #ffffff !important;
            display: block !important;
            overflow: visible !important;
            width: 100% !important;
            height: auto !important;
          }

          .resume-modal-backdrop {
            display: none !important;
          }

          .resume-modal-content {
            position: static !important;
            width: 100% !important;
            max-width: 100% !important;
            max-height: none !important;
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            overflow: visible !important;
            display: block !important;
            background: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          .resume-frame-wrapper {
            padding: 0 !important;
            background: #ffffff !important;
            overflow: visible !important;
            display: block !important;
            height: auto !important;
            max-height: none !important;
          }

          .resume-print-area {
            position: static !important;
            width: 100% !important;
            max-width: 800px !important;
            margin: 0 auto !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            background: #ffffff !important;
            color: #0f172a !important;
            overflow: visible !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </AnimatePresence>
  );
}

