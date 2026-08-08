import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Mail, ArrowDown, Sparkles, Code2, Volume2, VolumeX } from "lucide-react";
import { Github, Linkedin } from "./CustomIcons";
import portfolioData from "../data/portfolioData";
import { useTheme } from "../context/ThemeContext";
import FlippingAvatar from "./FlippingAvatar";
import ScatterText from "./ScatterText";

const TECH_ORBIT = [
  { label: "React", color: "#61DAFB" },
  { label: "Next.js", color: "#ffffff" },
  { label: "TS", color: "#3178C6" },
  { label: "Node", color: "#339933" },
  { label: "Postgres", color: "#4169E1" },
  { label: "Redis", color: "#DC382D" },
  { label: "Tailwind", color: "#06B6D4" },
  { label: "Docker", color: "#2496ED" },
];

const TYPING_ROLES = [
  "Full Stack Developer",
  "React & Next.js Specialist",
  "Node.js & PostgreSQL Engineer",
  "TypeScript & AI Systems Dev",
];

function TypeWriter({ texts }) {
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    const current = texts[textIdx];
    let timer;
    if (!deleting) {
      if (charIdx < current.length) {
        timer = setTimeout(() => {
          setDisplayed(current.slice(0, charIdx + 1));
          setCharIdx(c => c + 1);
        }, 65);
      } else {
        timer = setTimeout(() => setDeleting(true), 2200);
      }
    } else {
      if (charIdx > 0) {
        timer = setTimeout(() => {
          setDisplayed(current.slice(0, charIdx - 1));
          setCharIdx(c => c - 1);
        }, 35);
      } else {
        setDeleting(false);
        setTextIdx(i => (i + 1) % texts.length);
      }
    }
    return () => clearTimeout(timer);
  }, [charIdx, deleting, textIdx, texts]);

  return (
    <span>
      <span className="gradient-text">
        {displayed}
      </span>
      <span className="cursor-blink" style={{ color: "var(--color-cyan)" }}>|</span>
    </span>
  );
}

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();

  // Scroll-linked parallax (kept subtle & visible so scrolling doesn't leave blank gaps)
  const blobY1 = useTransform(scrollY, [0, 600], [0, -40]);
  const blobY2 = useTransform(scrollY, [0, 600], [0, -60]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0.6]);
  const heroY = useTransform(scrollY, [0, 600], [0, 30]);

  const { personalInfo } = portfolioData;
  const { theme } = useTheme();

  useEffect(() => {
    const handleMouse = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const handleVoice = () => {
    if (!("speechSynthesis" in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(personalInfo.voiceIntroText);
      u.rate = 0.92;
      u.pitch = 1.1;
      u.onstart = () => setIsSpeaking(true);
      u.onend = () => setIsSpeaking(false);
      u.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(u);
    }
  };

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: "var(--bg-main)",
      }}
    >
      {/* Grid background */}
      <div className="grid-bg" />

      {/* Parallax blobs */}
      <motion.div style={{ y: blobY1 }}>
        <motion.div
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.primary}1F, transparent 70%)`,
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
          animate={{
            x: mousePos.x * 30,
            y: mousePos.y * 30,
          }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
        />
      </motion.div>

      <motion.div style={{ y: blobY2 }}>
        <motion.div
          style={{
            position: "absolute",
            top: "20%",
            right: "5%",
            width: "380px",
            height: "380px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.secondary}1F, transparent 70%)`,
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
          animate={{
            x: mousePos.x * -25,
            y: mousePos.y * -25,
          }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
        />
      </motion.div>

      <motion.div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "30%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.accent}14, transparent 70%)`,
          filter: "blur(50px)",
          pointerEvents: "none",
          y: blobY1,
        }}
      />

      {/* Main content */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY, position: "relative", zIndex: 1, width: "100%" }}
      >
        <div className="container" style={{ paddingTop: "100px", paddingBottom: "60px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
          }}
            className="hero-grid"
          >
            {/* Left — Text Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ display: "flex", flexDirection: "column", gap: "28px" }}
            >
              {/* Greeting badge */}
              <motion.div variants={itemVariants}>
                <div className="section-tag">
                  <ScatterText delay={0.1} speed={1.2}>
                    <Sparkles size={12} style={{ display: "inline-block", marginRight: "6px", verticalAlign: "middle" }} />
                    Hello World! I'm Rahil 👋
                  </ScatterText>
                </div>
              </motion.div>

              {/* Main heading */}
              <motion.div variants={itemVariants}>
                <h1 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  color: "var(--text-heading)",
                  marginBottom: "16px",
                }}>
                  <ScatterText delay={0.15}>Crafting <span className="gradient-text">Beautiful</span></ScatterText>
                  <br />
                  <ScatterText delay={0.4}>
                    Web Experiences
                  </ScatterText>
                </h1>

                {/* Typewriter role */}
                <div style={{
                  fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                  minHeight: "2em",
                }}>
                  <TypeWriter texts={TYPING_ROLES} />
                </div>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                style={{
                  fontSize: "1.05rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.8,
                  maxWidth: "520px",
                }}
              >
                <ScatterText delay={0.65} speed={0.8}>
                  {personalInfo.subtitle}
                </ScatterText>
              </motion.p>

              {/* Stats row */}
              <motion.div
                variants={itemVariants}
                style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}
              >
                {[
                  { value: "1+", label: "Year Exp" },
                  { value: "10+", label: "Projects" },
                  { value: "Full Stack", label: "Primary Focus" },
                ].map((stat, i) => (
                  <div key={i} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}>
                    <span className="gradient-text" style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 800,
                      fontSize: "1.4rem",
                    }}>
                      {stat.value}
                    </span>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      {stat.label}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                variants={itemVariants}
                style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}
              >
                <motion.button
                  className="btn-primary"
                  onClick={() => scrollTo("contact")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Mail size={18} />
                  <span>Get In Touch</span>
                </motion.button>

                <motion.button
                  className="btn-secondary"
                  onClick={() => scrollTo("projects")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Code2 size={18} />
                  <span>View Projects</span>
                </motion.button>

                <motion.button
                  onClick={handleVoice}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "13px 20px",
                    background: "var(--bg-card)",
                    border: `1px solid ${isSpeaking ? `${theme.primary}66` : "var(--border-main)"}`,
                    borderRadius: "12px",
                    color: isSpeaking ? theme.primary : "var(--text-secondary)",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "var(--font-main)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {isSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  <span>{isSpeaking ? "Stop" : "Voice Intro"}</span>
                </motion.button>
              </motion.div>

              {/* Social links */}
              <motion.div
                variants={itemVariants}
                style={{ display: "flex", gap: "12px" }}
              >
                {[
                  { icon: Github, href: personalInfo.github, color: "#fff" },
                  { icon: Linkedin, href: personalInfo.linkedin, color: theme.secondary },
                  { icon: Mail, href: `mailto:${personalInfo.email}`, color: theme.primary },
                ].map(({ icon: Icon, href, color }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-main)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--text-secondary)",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                    }}
                    whileHover={{
                      scale: 1.15,
                      rotate: 5,
                      borderColor: color,
                      color,
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Avatar + Orbit */}
            <motion.div
              className="hero-avatar-orbit"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 80, damping: 12, delay: 0.4 }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                height: "480px",
              }}
            >
              {/* Outer orbit ring */}
              <motion.div
                style={{
                  position: "absolute",
                  width: "420px",
                  height: "420px",
                  borderRadius: "50%",
                  border: `1px dashed ${theme.primary}26`,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />

              {/* Inner orbit ring */}
              <motion.div
                style={{
                  position: "absolute",
                  width: "340px",
                  height: "340px",
                  borderRadius: "50%",
                  border: `1px dashed ${theme.secondary}1F`,
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              {/* Orbiting tech badges */}
              {TECH_ORBIT.map((tech, i) => {
                const angle = (i / TECH_ORBIT.length) * 2 * Math.PI;
                const radius = 190;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                return (
                  <motion.div
                    key={tech.label}
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      x: x - 28,
                      y: y - 28,
                    }}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.12, 1],
                        boxShadow: [
                          `0 0 10px ${tech.color}30`,
                          `0 0 20px ${tech.color}60`,
                          `0 0 10px ${tech.color}30`,
                        ],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut",
                      }}
                      whileHover={{ scale: 1.3 }}
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "14px",
                        background: "var(--bg-card-solid)",
                        border: `1px solid ${tech.color}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "default",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <span style={{
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        color: tech.color,
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.02em",
                      }}>
                        {tech.label}
                      </span>
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* Central avatar circle */}
              <motion.div
                style={{
                  position: "relative",
                  zIndex: 10,
                  width: "220px",
                  height: "220px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: `2px solid ${theme.primary}4D`,
                  boxShadow: `0 0 60px ${theme.primary}26, 0 0 120px ${theme.secondary}1A`,
                }}
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Gradient background for avatar area */}
                <div style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <FlippingAvatar size={200} />
                </div>
              </motion.div>

              {/* Floating code snippets */}
              <motion.div
                className="floating-code-tag"
                style={{
                  position: "absolute",
                  top: "10%",
                  right: "-5%",
                  background: "var(--bg-card-solid)",
                  border: `1px solid ${theme.primary}33`,
                  borderRadius: "10px",
                  padding: "10px 14px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  color: theme.primary,
                  backdropFilter: "blur(10px)",
                }}
                animate={{ y: [0, -8, 0], rotate: [-1, 1, -1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                const <span style={{ color: theme.secondary }}>rahil</span> = 🚀
              </motion.div>

              <motion.div
                className="floating-code-tag"
                style={{
                  position: "absolute",
                  bottom: "15%",
                  left: "-5%",
                  background: "var(--bg-card-solid)",
                  border: `1px solid ${theme.secondary}33`,
                  borderRadius: "10px",
                  padding: "10px 14px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  color: theme.secondary,
                  backdropFilter: "blur(10px)",
                }}
                animate={{ y: [0, 8, 0], rotate: [1, -1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                &lt;<span style={{ color: theme.accent }}>FullStackDev</span> /&gt;
              </motion.div>
            </motion.div>
          </div>

          {/* Tech pills row */}
          <motion.div
            className="tech-pills-row"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 12, delay: 1.2 }}
            style={{
              marginTop: "64px",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {["React.js", "Next.js", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "TypeORM", "Redis", "Socket.IO", "React Native", "Tailwind CSS", "Docker"].map((tech, i) => (
              <motion.span
                key={tech}
                className="tech-badge"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 12,
                  delay: 1.3 + i * 0.04,
                }}
                whileHover={{ scale: 1.08, y: -3 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll-indicator"
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
          color: "var(--text-muted)",
          opacity: heroOpacity,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        onClick={() => scrollTo("about")}
      >
        <span style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={18} style={{ color: "var(--color-cyan)" }} />
        </motion.div>
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 640px) {
          .floating-code-tag {
            display: none !important;
          }
          .hero-avatar-orbit {
            height: 340px !important;
            transform: scale(0.78) !important;
            margin: 0 auto !important;
          }
          .tech-pills-row {
            margin-top: 16px !important;
            margin-bottom: 56px !important;
            padding-bottom: 10px !important;
          }
          .hero-scroll-indicator {
            bottom: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
