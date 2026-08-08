import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Mail, MapPin, Phone, Sparkles, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { Github, Linkedin } from "./CustomIcons";
import portfolioData from "../data/portfolioData";
import { useTheme } from "../context/ThemeContext";
import ScatterText from "./ScatterText";

export default function Contact() {
  const { personalInfo, socialLinks } = portfolioData;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { theme } = useTheme();

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1000);
    setTimeout(() => setStatus("idle"), 6000);
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}`, color: theme.primary },
    { icon: MapPin, label: "Location", value: personalInfo.location, href: null, color: theme.secondary },
    { icon: Phone, label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone}`, color: theme.accent },
  ];

  const fields = [
    { name: "name", label: "Your Name", type: "text", placeholder: "Rahil Sheikh", span: 1 },
    { name: "email", label: "Email Address", type: "email", placeholder: "hello@example.com", span: 1 },
    { name: "subject", label: "Subject", type: "text", placeholder: "Project Collaboration", span: 2 },
    { name: "message", label: "Message", type: "textarea", placeholder: "Tell me about your project or opportunity...", span: 2 },
  ];

  return (
    <section id="contact" className="section" style={{ position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute",
        left: "10%",
        bottom: "10%",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(var(--color-cyan-rgb), 0.06), transparent 70%)",
        filter: "blur(60px)",
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
                Let's Connect
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
            <ScatterText delay={0.1}>Get In <span>Touch</span></ScatterText>
          </motion.h2>

          <motion.p
            className="section-subtitle"
            style={{ textAlign: "center", margin: "0 auto" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Have a project in mind, a job opportunity, or just want to say hi? I'd love to hear from you! 💌
          </motion.p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.6fr",
          gap: "48px",
          alignItems: "start",
        }}
          className="contact-grid"
        >
          {/* Left — Info panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ type: "spring", stiffness: 80, damping: 12, delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* Contact info cards */}
            {contactInfo.map(({ icon: Icon, label, value, href, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ x: 6, borderColor: `${color}40` }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "16px 20px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-main)",
                  borderRadius: "14px",
                  cursor: href ? "pointer" : "default",
                  transition: "all 0.3s ease",
                  textDecoration: "none",
                }}
                as={href ? "a" : "div"}
                href={href}
              >
                <div style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  background: `${color}12`,
                  border: `1px solid ${color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500 }}>
                    {label}
                  </div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)", marginTop: "2px" }}>
                    {value}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              style={{
                padding: "20px",
                background: "var(--bg-card)",
                border: "1px solid var(--border-main)",
                borderRadius: "14px",
              }}
            >
              <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "14px" }}>
                Find me on
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                {[
                  { href: personalInfo.github, icon: Github, color: "#fff", label: "GitHub" },
                  { href: personalInfo.linkedin, icon: Linkedin, color: "#0A66C2", label: "LinkedIn" },
                  { href: `mailto:${personalInfo.email}`, icon: Mail, color: theme.primary, label: "Email" },
                ].map(({ href, icon: Icon, color, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={label}
                    style={{
                      flex: 1,
                      height: "44px",
                      borderRadius: "10px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid var(--border-main)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--text-secondary)",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                    }}
                    whileHover={{ scale: 1.08, borderColor: color, color }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              style={{
                padding: "20px",
                background: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(var(--color-cyan-rgb), 0.06))",
                border: "1px solid rgba(16,185,129,0.25)",
                borderRadius: "14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <motion.div
                  style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981" }}
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#10b981" }}>
                  Available for opportunities
                </span>
              </div>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Open to full-time, part-time, freelance, and internship opportunities. Response within 24 hours!
              </p>
            </motion.div>
          </motion.div>

          {/* Right — Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ type: "spring", stiffness: 80, damping: 12, delay: 0.3 }}
            style={{
              padding: "36px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-main)",
              borderRadius: "24px",
              backdropFilter: "blur(20px)",
            }}
          >
            <div style={{ marginBottom: "28px" }}>
              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: "1.3rem",
                color: "var(--text-heading)",
                marginBottom: "6px",
              }}>
                Send me a message ✉️
              </h3>
              <p style={{ fontSize: "0.87rem", color: "var(--text-secondary)" }}>
                I'll get back to you as soon as possible.
              </p>
            </div>

            <form
              action={`https://formsubmit.co/${personalInfo.email}`}
              method="POST"
              target="invisible-iframe"
              onSubmit={handleSubmit}
            >
              {/* Custom FormSubmit configurations */}
              <input type="hidden" name="_subject" value={`New Portfolio Lead: ${form.subject || 'Inquiry'}`} />
              <input type="hidden" name="_template" value="box" />
              <input 
                type="hidden" 
                name="_autoresponse" 
                value={`Hi ${form.name || 'there'},

Thank you for reaching out to me! I have successfully received your inquiry about "${form.subject || 'Project collaboration'}".

I am excited about potential opportunities and will review your message shortly. I'll get back to you within 24 hours.

In the meantime, feel free to check out my GitHub (https://github.com/Ruh29) or connect on LinkedIn (https://www.linkedin.com/in/ruh-sheikh29/).

Best regards,
Rahil Sheikh
MERN Stack Developer`}
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {fields.map(({ name, label, type, placeholder, span }) => (
                  <div
                    key={name}
                    style={{ gridColumn: span === 2 ? "1 / -1" : "auto" }}
                  >
                    <label className="form-label">{label}</label>
                    {type === "textarea" ? (
                      <motion.textarea
                        name={name}
                        value={form[name]}
                        onChange={handleChange}
                        onFocus={() => setFocusedField(name)}
                        onBlur={() => setFocusedField(null)}
                        placeholder={placeholder}
                        rows={5}
                        className="form-input"
                        required
                        animate={focusedField === name ? { borderColor: "var(--color-cyan)" } : {}}
                      />
                    ) : (
                      <motion.input
                        name={name}
                        type={type}
                        value={form[name]}
                        onChange={handleChange}
                        onFocus={() => setFocusedField(name)}
                        onBlur={() => setFocusedField(null)}
                        placeholder={placeholder}
                        className="form-input"
                        required
                        animate={focusedField === name ? { borderColor: "var(--color-cyan)" } : {}}
                      />
                    )}
                  </div>
                ))}
              </div>

              <motion.button
                type="submit"
                disabled={status === "sending" || status === "success"}
                className="btn-primary"
                style={{
                  marginTop: "20px",
                  width: "100%",
                  justifyContent: "center",
                  opacity: status === "success" ? 0.8 : 1,
                }}
                whileHover={status === "idle" ? { scale: 1.02 } : {}}
                whileTap={status === "idle" ? { scale: 0.98 } : {}}
              >
                {status === "idle" && <><Send size={18} /><span>Send Message</span></>}
                {status === "sending" && <><Loader size={18} style={{ animation: "spin-slow 1s linear infinite" }} /><span>Sending...</span></>}
                {status === "success" && <><CheckCircle size={18} /><span>Message Sent! 🎉</span></>}
                {status === "error" && <><AlertCircle size={18} /><span>Error — Try Again</span></>}
              </motion.button>

              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    marginTop: "14px",
                    padding: "12px 16px",
                    background: "rgba(16,185,129,0.08)",
                    border: "1px solid rgba(16,185,129,0.2)",
                    borderRadius: "10px",
                    fontSize: "0.85rem",
                    color: "#10b981",
                    textAlign: "center",
                  }}
                >
                  Thanks for reaching out, Rahil will respond within 24 hours! 💌
                </motion.div>
              )}
            </form>
            <iframe name="invisible-iframe" style={{ display: "none" }} />
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
