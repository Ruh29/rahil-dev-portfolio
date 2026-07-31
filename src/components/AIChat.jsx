import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Bot, User, Mic, Send, MessageSquare, Mic2, HelpCircle, Loader2 } from "lucide-react";
import portfolioData from "../data/portfolioData";
import { useTheme } from "../context/ThemeContext";
import ScatterText from "./ScatterText";

export default function AIChat() {
  const { personalInfo } = portfolioData;
  const { theme } = useTheme();

  // Dedicated responses for Rahil with 1+ year MERN stack experience
  const chatbotConfig = {
    welcomeMessage: "Hi! I'm Rahil's AI assistant. I can answer questions about his MERN stack experience, frontend/backend skills, projects, certifications, and career journey. What would you like to know?",
    quickQuestions: [
      "Tell me about your MERN tech stack?",
      "What are your featured MERN projects?",
      "What certifications do you have?",
      "What is your experience with Docker & AWS?",
      "How can I hire you?"
    ],
    responses: {
      experience: "Rahil has 1+ year of experience building scalable applications with the MERN stack (MongoDB, Express, React, Node.js) and orchestrating DevOps pipelines.",
      skills: "His technical stack comprises React, Next.js, Redux, and TypeScript on the frontend, and Node.js, Express, Socket.io, NestJS on the backend. For database & storage, he utilizes MongoDB, PostgreSQL, and Redis. DevOps-wise, he works with Docker, Kubernetes, AWS, and Terraform.",
      projects: "Rahil's notable projects include: 1) DevSync - a real-time collaborative workspace utilizing React, Node.js, Socket.io, and Redis. 2) ShopSphere - a distributed event-driven microservices setup using RabbitMQ and Docker. 3) InsightCore - an AI analytics engine translating natural language to MongoDB aggregates.",
      certifications: "He holds several cloud & database certifications: MongoDB Certified Developer Associate, AWS Certified Solutions Architect, AWS Certified Developer, and Certified Kubernetes Administrator (CKA).",
      devops: "Rahil is highly proficient in DevOps. He uses Terraform to manage infrastructure on AWS (EC2/ECS), package components using multi-stage Dockerfiles, orchestrate nodes using Kubernetes, and automate workflows via GitHub Actions.",
      education: "He holds a strong background in Computer Science and software engineering, continually advancing his cloud credentials with first-class certifications from MongoDB, AWS, and the Cloud Native Computing Foundation.",
      career: "His career roadmap is focused on modern MERN stack development: starting with intense coding bootcamps and certifications in early 2023, stepping into full-stack internships, and now designing scalable solutions as an active freelance and open-source developer.",
      contact: "You can easily contact Rahil by using the interactive form at the bottom of this website, or by emailing him at rahil.sheikh@example.com. You can also connect with him on LinkedIn or view his repositories on GitHub.",
      mongodb: "As a MongoDB Certified Developer, Rahil has deep experience in schema design (embedding vs referencing), query optimizations, indexing structures, replica sets, sharding, and writing high-performance MongoDB aggregation pipelines.",
      react: "On the frontend, Rahil is an expert in React, Next.js (SSR/Static Site Generation), and Redux Toolkit. He specializes in creating fluid, high-performance user interfaces with smooth micro-animations, glassmorphic styles, and clean component APIs."
    }
  };

  const [messages, setMessages] = useState([
    {
      id: "msg-init",
      text: chatbotConfig.welcomeMessage,
      sender: "ai",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [listeningPlaceholder, setListeningPlaceholder] = useState("Ask me anything about Rahil's skills...");

  const chatMessagesBoxRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (chatMessagesBoxRef.current) {
      chatMessagesBoxRef.current.scrollTop = chatMessagesBoxRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  // Clean up recognition
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const processChatbotIntent = (input) => {
    const raw = input.toLowerCase();
    const responses = chatbotConfig.responses;

    // Intent checks
    if (raw.includes("experience") || raw.includes("work") || raw.includes("years") || raw.includes("year")) {
      return responses.experience;
    }
    if (raw.includes("stack") || raw.includes("technologies") || raw.includes("skills") || raw.includes("frontend") || raw.includes("backend")) {
      return responses.skills;
    }
    if (raw.includes("project") || raw.includes("portfolio") || raw.includes("demo") || raw.includes("develop")) {
      return responses.projects;
    }
    if (raw.includes("certification") || raw.includes("cert") || raw.includes("aws") || raw.includes("kubernetes")) {
      return responses.certifications;
    }
    if (raw.includes("devops") || raw.includes("pipeline") || raw.includes("docker") || raw.includes("terraform")) {
      return responses.devops;
    }
    if (raw.includes("mongodb") || raw.includes("database") || raw.includes("nosql")) {
      return responses.mongodb;
    }
    if (raw.includes("react") || raw.includes("next") || raw.includes("redux")) {
      return responses.react;
    }
    if (raw.includes("education") || raw.includes("college") || raw.includes("university")) {
      return responses.education;
    }
    if (raw.includes("hire") || raw.includes("opportunity") || raw.includes("available") || raw.includes("job")) {
      return `Rahil is excited to explore new MERN stack opportunities! He specializes in scalable full-stack applications, real-time integrations, and cloud deployments on AWS. Drop him a message using the Contact Form at the bottom of the page, or email him directly at ${personalInfo.email}!`;
    }
    if (raw.includes("contact") || raw.includes("email") || raw.includes("linkedin") || raw.includes("reach")) {
      return responses.contact;
    }
    if (raw.includes("hello") || raw.includes("hi") || raw.includes("hey")) {
      return "Hello! I'm here to share insights on Rahil's full-stack qualifications. You can ask me about his MERN stack skills, certifications, projects, devops experience, or career path. What would you like to know?";
    }

    // Default response
    return "That is a great question! Rahil specializes in designing highly scalable, secure, and clean web systems utilizing the MERN stack integrated with modern cloud ecosystems. Would you like me to elaborate on his frontend React skills, backend microservices, or MongoDB optimizations?";
  };

  const handleSendMessage = (textToSend = inputValue) => {
    const text = textToSend.trim();
    if (!text) return;

    // Append user message
    const userMsg = {
      id: `msg-user-${Date.now()}`,
      text: text,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // Simulate thinking state
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      const replyText = processChatbotIntent(text);
      const aiReply = {
        id: `msg-ai-${Date.now()}`,
        text: replyText,
        sender: "ai",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, aiReply]);
    }, 800 + Math.random() * 600);
  };

  const handleQuickChipClick = (qText) => {
    handleSendMessage(qText);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      handleSendMessage();
    }
  };

  const handleVoiceToggle = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser. Please try on Google Chrome or Safari!");
      return;
    }

    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
    } else {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsRecording(true);
        setListeningPlaceholder("Listening...");
      };

      recognition.onresult = (e) => {
        const text = e.results[0][0].transcript;
        setIsRecording(false);
        setListeningPlaceholder("Ask me anything about Rahil's skills...");
        handleSendMessage(text);
      };

      recognition.onerror = () => {
        setIsRecording(false);
        setListeningPlaceholder("Ask me anything about Rahil's skills...");
      };

      recognition.onend = () => {
        setIsRecording(false);
        setListeningPlaceholder("Ask me anything about Rahil's skills...");
      };

      recognitionRef.current = recognition;
      recognition.start();
    }
  };

  return (
    <section id="ai-chat" className="section" style={{ position: "relative", overflow: "hidden" }}>
      <div className="grid-bg" style={{ opacity: 0.5 }} />

      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
            <div className="section-tag">
              <ScatterText delay={0.05}>
                <Sparkles size={12} style={{ display: "inline-block", marginRight: "6px", verticalAlign: "middle" }} />
                AI Chat Assistant
              </ScatterText>
            </div>
          </div>
          <h2 className="section-title">
            <ScatterText delay={0.1}>Ask My <span>AI Assistant</span></ScatterText>
          </h2>
          <p className="section-subtitle" style={{ maxWidth: "600px", margin: "0 auto" }}>
            Interact with my custom AI chatbot to instantaneously explore details about my full-stack capabilities, cloud deployments, and professional milestones.
          </p>
        </div>

        <div className="ai-layout-container" style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-main)",
          borderRadius: "24px",
          backdropFilter: "blur(20px)",
        }}>
          <div className="chat-panel-container">
            {/* Quick Suggestions */}
            <div className="chat-header-quick-queries">
              <h4 style={{ color: "var(--text-secondary)", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                <Sparkles size={14} style={{ color: "var(--color-cyan)" }} />
                <span>Quick Inquiries</span>
              </h4>
              <div className="quick-chips-wrap" style={{ marginTop: "10px" }}>
                {chatbotConfig.quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    className="quick-chip"
                    onClick={() => handleQuickChipClick(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div 
              className="chat-messages-container" 
              ref={chatMessagesBoxRef}
              style={{ maxHeight: "320px" }}
            >
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`chat-bubble-row ${msg.sender === "user" ? "chat-bubble-row-user" : "chat-bubble-row-ai"}`}
                >
                  <div className="chat-bubble-wrapper">
                    <div className="chat-avatar" style={{
                      background: msg.sender === "user" 
                        ? `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primary}CC 100%)` 
                        : `linear-gradient(135deg, ${theme.secondary} 0%, ${theme.accent} 100%)`
                    }}>
                      {msg.sender === "user" ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div>
                      <div className="chat-bubble-text-box" style={{
                        background: msg.sender === "user"
                          ? `linear-gradient(90deg, ${theme.primary} 0%, ${theme.secondary} 100%)`
                          : "var(--bg-card)",
                        border: msg.sender === "user" ? "none" : "1px solid var(--border-main)",
                        color: msg.sender === "user"
                          ? (["cyberpunk", "aurora", "matrix", "gold"].includes(theme.id) ? "#000000" : "#ffffff")
                          : "var(--text-primary)"
                      }}>
                        <p style={{ margin: 0 }}>{msg.text}</p>
                      </div>
                      <div className="chat-bubble-time" style={{ color: "var(--text-muted)", fontSize: "0.68rem" }}>{msg.time}</div>
                    </div>
                  </div>
                </div>
              ))}

              {isThinking && (
                <div className="chat-bubble-row chat-bubble-row-ai">
                  <div className="chat-bubble-wrapper">
                    <div className="chat-avatar" style={{ background: `linear-gradient(135deg, ${theme.secondary} 0%, ${theme.accent} 100%)` }}>
                      <Bot size={16} />
                    </div>
                    <div className="chat-bubble-text-box" style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-main)",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "14px 20px"
                    }}>
                      <span className="dot-bounce"></span>
                      <span className="dot-bounce"></span>
                      <span className="dot-bounce"></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Toolbar */}
            <div className="chat-input-toolbar" style={{ borderTop: "1px solid var(--border-main)" }}>
              <div className="chat-input-wrap">
                <input 
                  type="text" 
                  placeholder={listeningPlaceholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button 
                  className={`chat-voice-btn ${isRecording ? "recording" : ""}`} 
                  title="Speak question"
                  onClick={handleVoiceToggle}
                >
                  <Mic size={16} />
                </button>
              </div>
              <button 
                className="btn-send"
                disabled={inputValue.trim() === ""}
                onClick={() => handleSendMessage()}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="ai-highlights-grid">
          <div className="ai-highlight-card">
            <MessageSquare size={24} />
            <h3>Natural Chat</h3>
            <p>Converse seamlessly regarding technical frameworks, deployment systems, and career directions.</p>
          </div>
          <div className="ai-highlight-card">
            <Mic2 size={24} />
            <h3>Voice Input</h3>
            <p>Utilize integrated high-performance Web Speech APIs to submit verbal queries directly.</p>
          </div>
          <div className="ai-highlight-card">
            <HelpCircle size={24} />
            <h3>Instant Answers</h3>
            <p>Acquire optimized answers instantly without network or server processing latency.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
