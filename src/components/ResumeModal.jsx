import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Printer, Phone, Mail, MapPin, Globe, Award, Star } from "lucide-react";
import portfolioData from "../data/portfolioData";
import { useTheme } from "../context/ThemeContext";

export default function ResumeModal({ isOpen, onClose }) {
  const { personalInfo, skills, projects, timeline } = portfolioData;
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
            background: "rgba(0,0,0,0.7)",
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
            maxHeight: "90vh",
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
          }} className="no-print">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                color: "var(--text-heading)",
              }}>
                Resume Template Preview
              </span>
            </div>
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

          {/* Resume Frame */}
          <div className="resume-frame-wrapper" style={{ flex: 1, overflowY: "auto", padding: "24px", background: "rgba(0,0,0,0.15)" }}>
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
              {/* Left Sidebar (Teal background) */}
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
                {/* Header Name */}
                <div>
                  <h1 style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "2.1rem",
                    fontWeight: 800,
                    letterSpacing: "0.03em",
                    margin: 0,
                    lineHeight: 1.1,
                  }}>
                    RAHIL SHEIKH
                  </h1>
                  <div style={{
                    width: "100%",
                    height: "1px",
                    background: "rgba(255,255,255,0.25)",
                    marginTop: "16px",
                  }} />
                </div>

                {/* Key Achievements */}
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
                    Key Achievements
                  </h3>
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <Star size={14} style={{ color: "#ffffff", marginTop: "2px", flexShrink: 0 }} />
                    <div>
                      <h4 style={{ fontSize: "0.78rem", fontWeight: 700, color: "#ffffff", marginBottom: "4px" }}>
                        Web Application Development
                      </h4>
                      <p style={{ fontSize: "0.72rem", color: "#cbd5e1", lineHeight: 1.4, margin: 0 }}>
                        Successfully designed and developed an e-Commerce platform and a Meetly Interview Portal, implementing key features like email verification, JWT authentication, and real-time communication.
                      </p>
                    </div>
                  </div>
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
                    {[
                      { name: "English", level: "Proficient" },
                      { name: "Hindi", level: "Proficient" },
                    ].map((lang) => (
                      <div key={lang.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem" }}>
                        <span style={{ fontWeight: 700 }}>{lang.name}</span>
                        <span style={{ color: "#cbd5e1", marginRight: "auto", marginLeft: "20px", fontSize: "0.68rem" }}>{lang.level}</span>
                        <div style={{ display: "flex", gap: "4px" }}>
                          {[...Array(5)].map((_, i) => (
                            <div 
                              key={i}
                              style={{
                                width: "7px",
                                height: "7px",
                                borderRadius: "50%",
                                background: "#ffffff",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
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
                  <div>
                    <h4 style={{ fontSize: "0.82rem", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                      B.TECH
                    </h4>
                    <div style={{ fontSize: "0.75rem", color: "#ffffff", fontWeight: 600, marginTop: "2px" }}>
                      LNCT UNIVERSITY
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "#cbd5e1", marginTop: "4px" }}>
                      <span>08/2023 - 05/2027</span>
                      <span>Indore, MP</span>
                    </div>
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
                    Experience
                  </h3>
                  <div>
                    <h4 style={{ fontSize: "0.82rem", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                      FRONTEND DEVELOPER INTERN
                    </h4>
                    <div style={{ fontSize: "0.75rem", color: "#ffffff", fontWeight: 600, marginTop: "2px" }}>
                      LogiQlink Technologies INDORE
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "#cbd5e1", marginTop: "4px" }}>
                      <span>08/2022 - 06/2023</span>
                      <span>Barwani</span>
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#cbd5e1", fontStyle: "italic", marginTop: "4px", marginBottom: "8px" }}>
                      Technical internship focusing on frontend development
                    </div>
                    <ul style={{
                      margin: 0,
                      paddingLeft: "14px",
                      fontSize: "0.7rem",
                      color: "#cbd5e1",
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      lineHeight: 1.45,
                    }}>
                      <li>Worked on real-world live projects focusing on React.js, Redux Toolkit, Tailwind CSS, and JavaScript (ES6+).</li>
                      <li>Hands-on experience with Git/GitHub (branching, version control), Jira (task tracking), and deployments on Netlify & Vercel.</li>
                      <li>Improved debugging skills by solving issues like CORS, token expiry, and network request handling authentication and authorization.</li>
                      <li>Worked On Native App development and QA testing for web/app.</li>
                      <li>Worked on modern technologies and libs for web/app.</li>
                    </ul>
                  </div>
                </div>

                {/* Enhancv Branding left column */}
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

              {/* Right Content Column (White background) */}
              <div style={{
                padding: "36px 30px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                background: "#ffffff",
                height: "100%",
                boxSizing: "border-box",
              }}>
                {/* Header Subtitles / Contact */}
                <div>
                  <h2 style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "#005c53",
                    margin: 0,
                  }}>
                    Frontend Developer (REACT)
                  </h2>
                  
                  {/* Contacts */}
                  <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px 20px",
                    marginTop: "12px",
                    fontSize: "0.75rem",
                    color: "#475569",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Phone size={12} style={{ color: "#005c53" }} />
                      <span>+919993995502</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Mail size={12} style={{ color: "#005c53" }} />
                      <a href={`mailto:${personalInfo.email}`} style={{ color: "inherit", textDecoration: "none" }}>
                        {personalInfo.email}
                      </a>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Globe size={12} style={{ color: "#005c53" }} />
                      <span>
                        <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none" }}>LinkedIn</a>
                        {" | "}
                        <a href={personalInfo.github} target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none" }}>GitHub</a>
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", width: "100%" }}>
                      <MapPin size={12} style={{ color: "#005c53" }} />
                      <span>Indore, India</span>
                    </div>
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
                  <p style={{
                    fontSize: "0.75rem",
                    color: "#334155",
                    lineHeight: 1.5,
                    margin: 0,
                    textAlign: "justify",
                  }}>
                    I am a passionate Frontend-Focused Full Stack Developer with expertise in React.js, Redux Toolkit, Tailwind CSS, and JavaScript (ES6+). My practical experience extends to Node.js, Express, and MongoDB. I am committed to honing my skills in problem-solving, backend integration, and authentication systems. I aim to contribute to projects that merge creativity with technical proficiency.
                  </p>
                </div>

                {/* Skills */}
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
                    Skills
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#1e293b", display: "block", marginBottom: "2px" }}>Frontend</span>
                      <span style={{ fontSize: "0.72rem", color: "#334155", lineHeight: 1.45 }}>
                        React-Native · ReactJs · Redux Toolkit · Tailwind · JavaScript · ES6+ · Bit-Bucket · GitHub · Redux · HTML · CSS · JIRA · Netlify · Vercel · SPA · ECommerce · TypeScript · Axios · JSON · Javascript ES6 · REST · Socket.IO · WebSockets · QA testing.
                      </span>
                    </div>
                    <div style={{ marginTop: "4px" }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#1e293b", display: "block", marginBottom: "2px" }}>Backend</span>
                      <span style={{ fontSize: "0.72rem", color: "#334155", lineHeight: 1.45 }}>
                        MongoDB · Node.js · Routing · Express.js · JWT authentication/authorization · multer · Mongoose · Middleware · schema designing · File uploading.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Projects */}
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
                    Projects
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {/* TradAstra */}
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <h4 style={{ fontSize: "0.78rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                          TradAstra App for Trading
                        </h4>
                        <span style={{ fontSize: "0.7rem", color: "#64748b" }}>01/2023 - 04/2023</span>
                      </div>
                      <div style={{ fontSize: "0.72rem", color: "#475569", fontStyle: "italic", marginTop: "2px", marginBottom: "4px" }}>
                        Build its full frontend according to the wireframe.
                      </div>
                      <ul style={{
                        margin: 0,
                        paddingLeft: "14px",
                        fontSize: "0.7rem",
                        color: "#334155",
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                        lineHeight: 1.4,
                      }}>
                        <li>Architected a modular and scalable structure using <strong>React Native</strong>, <strong>TypeScript</strong>, and <strong>NativeWind</strong> ensuring maintainable components.</li>
                        <li>Implemented core functionalities: Added <strong>email verification</strong> and refresh token.</li>
                        <li>Implemented <strong>centralized data fetching</strong> with error boundaries, fallback UIs, and retry logic to improve app stability.</li>
                        <li><strong>Perfomance optimization</strong> avoide unnessasry <strong>re-render,cahing/on-loading</strong> and more modern tech.</li>
                        <li>Developed core authentication features, including , and secure API communication with Axios interceptors.</li>
                      </ul>
                    </div>

                    {/* Meet */}
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <h4 style={{ fontSize: "0.78rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                          Meet web/App (Meetly Interview Portal)
                        </h4>
                        <span style={{ fontSize: "0.7rem", color: "#64748b" }}>05/2023 - 08/2023</span>
                      </div>
                      <div style={{ fontSize: "0.72rem", color: "#475569", fontStyle: "italic", marginTop: "2px", marginBottom: "4px" }}>
                        Meetly Interview Portal (Full Stack Project)
                      </div>
                      <ul style={{
                        margin: 0,
                        paddingLeft: "14px",
                        fontSize: "0.7rem",
                        color: "#334155",
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                        lineHeight: 1.4,
                      }}>
                        <li>Full Stack Project built with <strong>React</strong> (frontend) and <strong>Express.js + MongoDB</strong> (backend).</li>
                        <li>Create Interview (<strong>schedule & invite candidates</strong>), Added email <strong>verification</strong> and refresh token support, Dynamic Navbar with <strong>Redux</strong> slices for Admin & Candidate login states.</li>
                        <li>Implemented <strong>JWT authentication</strong> with <strong>refresh tokens</strong>, Role-based login system for <strong>Admin</strong> & <strong>user</strong> with dynamic Navbar, Integrated <strong>Socket</strong>.IO for video calls and <strong>screen sharing</strong>.</li>
                        <li>Added <strong>real-time</strong> chat and <strong>video calling</strong> systems using <strong>websockets</strong> and <strong>socket.io</strong>.</li>
                      </ul>
                    </div>

                    {/* Fleet Management */}
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <h4 style={{ fontSize: "0.78rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>
                          Fleet Management (Doctor Appointment Management)
                        </h4>
                        <span style={{ fontSize: "0.7rem", color: "#64748b" }}>09/2023</span>
                      </div>
                      <div style={{ fontSize: "0.72rem", color: "#475569", fontStyle: "italic", marginTop: "2px", marginBottom: "4px" }}>
                        Doctor Appointment Management System
                      </div>
                      <ul style={{
                        margin: 0,
                        paddingLeft: "14px",
                        fontSize: "0.7rem",
                        color: "#334155",
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                        lineHeight: 1.4,
                      }}>
                        <li>Architected a scalable <strong>web-based Fleet Management System</strong> using <strong>ReactJS (JavaScript)</strong> for the frontend and <strong>Node.js/Express</strong> backend.</li>
                        <li>Delivered core fleet features: <strong>vehicle CRUD, driver assignment, trip logs, alerts, and live GPS tracking</strong>.</li>
                        <li>Built secure authentication using <strong>JWT + refresh token rotation</strong> and implemented role-based access controls.</li>
                        <li>Designed responsive UI components, integrated interactive maps, and developed operational dashboards.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Enhancv Branding right column */}
                <div style={{
                  marginTop: "auto",
                  paddingTop: "20px",
                  display: "flex",
                  justifyContent: "flex-end",
                  fontSize: "0.62rem",
                  color: "#94a3b8",
                }}>
                  <span>www.enhancv.com</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Global Print Styling CSS */}
      <style>{`
        @media print {
          /* Hide main website components */
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

          /* Hide modal backdrop overlay */
          .resume-modal-backdrop {
            display: none !important;
          }

          /* Reset modal content box for full layout printing */
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

          /* Format the print area to take full page space */
          .resume-print-area {
            width: 100% !important;
            max-width: 800px !important;
            margin: 0 auto !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            overflow: visible !important;
            min-height: 0 !important;
            display: grid !important;
            grid-template-columns: 270px 1fr !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </AnimatePresence>
  );
}
