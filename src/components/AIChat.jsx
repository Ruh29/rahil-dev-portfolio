import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, Mic, MicOff, Loader2 } from "lucide-react";
import Waves from "./Waves";
import portfolioData from "../data/portfolioData";
import { useTheme } from "../context/ThemeContext";

export default function AIChat() {
  const { personalInfo } = portfolioData;
  const { mode } = useTheme();

  const quickPrompts = [
    "Tell me about your tech stack",
    "What is Purple Learning?",
    "Real-time & DB architecture?",
    "Are you available for hire?"
  ];

  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "agent",
      content: `Hey there! 👋 I'm Rahil's AI assistant. Ask me anything about Rahil's full-stack work (React, Next.js, Node.js, PostgreSQL, TypeScript), featured projects (Purple Learning, AI Product Auditor, Seek-N-Hire), or his availability!`
    }
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const generateResponse = (userMessage) => {
    const text = userMessage.toLowerCase();

    if (text.includes("hi") || text.includes("hello") || text.includes("hey")) {
      return "Hello! Great to meet you. What would you like to know about Rahil's engineering background or full-stack projects?";
    }

    if (text.includes("stack") || text.includes("tech") || text.includes("skills") || text.includes("technologies")) {
      return "Rahil's core stack covers React.js, Next.js (SSR/App Router), TypeScript, Tailwind CSS, and React Native (Expo) on frontend/mobile, and Node.js, Express.js, PostgreSQL, TypeORM, Redis caching, and WebSockets (Socket.IO, LiveKit) on the backend.";
    }

    if (text.includes("purple learning") || text.includes("learning")) {
      return "Purple Learning is an enterprise-grade AI-powered learning and mentorship platform built with Next.js, Node.js, PostgreSQL, TypeORM, Redis, Socket.IO, and LiveKit. Rahil architected real-time sessions, role management, and scalable backend workflows.";
    }

    if (text.includes("project") || text.includes("auditor") || text.includes("seek") || text.includes("portfolio")) {
      return "Rahil has delivered 10+ live projects! Highlights include: 1) Purple Learning (AI learning platform), 2) AI Product Auditor (automated UX/performance inspection reports), 3) Seek-N-Hire (recruitment & hiring platform with sponsorship workflows), and 4) PurpleSuite (enterprise ERP suite).";
    }

    if (text.includes("database") || text.includes("real-time") || text.includes("architecture") || text.includes("backend")) {
      return "For databases, Rahil designs structured relational schemas with PostgreSQL and TypeORM migrations, as well as MongoDB. He uses Redis for high-speed caching and session states, and Socket.IO/LiveKit for real-time video and streaming events.";
    }

    if (text.includes("experience") || text.includes("work") || text.includes("job") || text.includes("company") || text.includes("crm")) {
      return "Rahil has 1.5+ years of engineering experience: 1 year as Full Stack Developer at Purple Sky Infotech, Barwani (building multiple CRM platforms, e-learning systems, video streaming, and scalable APIs) and a 6-month frontend internship at Developers Point, Barwani (learning & building with React.js, JavaScript, HTML5/CSS3, Tailwind CSS, jQuery, and Bootstrap on live projects).";
    }

    if (text.includes("education") || text.includes("college") || text.includes("degree") || text.includes("certif")) {
      return "Rahil holds a Bachelor of Information Technology degree from LNCT University, Indore (2021-2025) with a focus on Full Stack & Software Engineering, complemented by intensive hands-on frontend and full-stack product engineering experience.";
    }

    if (text.includes("hire") || text.includes("available") || text.includes("contact") || text.includes("email") || text.includes("phone")) {
      return `Rahil is available for high-impact full-stack and mobile roles! You can email him at ${personalInfo.email}, call ${personalInfo.phone}, or connect on LinkedIn (in/ruh-sheikh29).`;
    }

    return "That's a great question! Rahil's engineering focus is on building resilient, scalable web and mobile applications with Next.js, React, Node.js, and PostgreSQL. Feel free to connect directly via the Contact section below!";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    setInput("");
    const userMsg = { id: Date.now().toString(), role: "user", content: userText };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateResponse(userText);
      const agentMsg = {
        id: (Date.now() + 1).toString(),
        role: "agent",
        content: botResponse
      };
      setMessages((prev) => [...prev, agentMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleQuickPrompt = (prompt) => {
    setInput(prompt);
  };

  const waveColor = mode === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)";

  return (
    <section id="ai-chat" className="relative w-full py-28 bg-[#F8F9FA] dark:bg-[#070b14] text-slate-900 dark:text-white overflow-hidden transition-colors duration-500">
      {/* Dynamic interactive waves in background */}
      <Waves lineColor={waveColor} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-black tracking-widest uppercase mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            AI Interactive Assistant
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-black dark:text-white">
            Ask My Digital Clone.
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg max-w-xl font-medium">
            Explore Rahil's full-stack stack, architecture choices, real-time modules, and project milestones in real-time.
          </p>
        </div>

        {/* Chat Container */}
        <div className="glass-panel bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden flex flex-col h-[560px]">
          {/* Messages Box */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                      msg.role === "user"
                        ? "bg-black dark:bg-white text-white dark:text-black"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div
                    className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-black dark:bg-white text-white dark:text-black rounded-tr-sm shadow-md"
                        : "bg-white dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 rounded-tl-sm border border-slate-200/80 dark:border-slate-700/80 shadow-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-slate-400 text-xs font-semibold py-2 px-3"
              >
                <Loader2 className="w-3.5 h-3.5 animate-spin text-black dark:text-white" />
                Rahil's AI is typing...
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-4 py-2 bg-slate-100/50 dark:bg-slate-900/50 border-t border-slate-200/60 dark:border-slate-800/60 overflow-x-auto no-scrollbar flex items-center gap-2">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickPrompt(prompt)}
                className="whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors shadow-xs cursor-pointer shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSend}
            className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Rahil's full-stack experience..."
              className="flex-1 bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
            />

            {recognitionRef.current && (
              <button
                type="button"
                onClick={toggleListening}
                className={`p-3 rounded-2xl transition-all cursor-pointer ${
                  isListening
                    ? "bg-rose-500 text-white animate-pulse"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"
                }`}
                title="Voice Input"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            )}

            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-3 rounded-2xl bg-black dark:bg-white hover:opacity-85 disabled:opacity-40 text-white dark:text-black font-bold transition-all shadow-md cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
