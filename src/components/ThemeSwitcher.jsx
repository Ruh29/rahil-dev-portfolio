import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, X, Check } from "lucide-react";
import { useTheme, THEMES } from "../context/ThemeContext";

export default function ThemeSwitcher() {
  const { themeId, setTheme, theme } = useTheme();
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const themeList = Object.values(THEMES);

  return (
    <div ref={panelRef} style={{ position: "fixed", bottom: "28px", right: "28px", zIndex: 9998 }}>
      {/* Floating trigger button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: open
            ? `0 0 30px ${theme.primary}40`
            : [
                `0 4px 20px ${theme.primary}30`,
                `0 4px 30px ${theme.primary}60`,
                `0 4px 20px ${theme.primary}30`,
              ],
        }}
        transition={
          open
            ? { duration: 0.2 }
            : { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "16px",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
          color: "#000",
          position: "relative",
          overflow: "hidden",
        }}
        aria-label="Toggle theme switcher"
        id="theme-switcher-trigger"
      >
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {open ? <X size={22} strokeWidth={2.5} /> : <Palette size={22} strokeWidth={2.5} />}
        </motion.div>
      </motion.button>

      {/* Theme palette panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              position: "absolute",
              bottom: "68px",
              right: "0",
              width: "280px",
              background: "rgba(10, 10, 20, 0.95)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: `1px solid rgba(255,255,255,0.1)`,
              borderRadius: "20px",
              padding: "20px",
              boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${theme.primary}10`,
            }}
          >
            {/* Header */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}>
                <Palette size={16} style={{ color: theme.primary }} />
                <span style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  Choose Theme
                </span>
              </div>
              <span style={{
                fontSize: "0.72rem",
                color: "rgba(255,255,255,0.4)",
                fontFamily: "var(--font-mono)",
              }}>
                {themeList.length} themes
              </span>
            </div>

            {/* Theme grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "8px",
            }}>
              {themeList.map((t) => {
                const isActive = t.id === themeId;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 12px",
                      background: isActive
                        ? `linear-gradient(135deg, ${t.primary}20, ${t.secondary}15)`
                        : "rgba(255,255,255,0.03)",
                      border: isActive
                        ? `1.5px solid ${t.primary}60`
                        : "1px solid rgba(255,255,255,0.06)",
                      borderRadius: "12px",
                      cursor: "pointer",
                      fontFamily: "var(--font-main)",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.15s ease",
                      outline: "none",
                      WebkitTapHighlightColor: "transparent",
                    }}
                    id={`theme-option-${t.id}`}
                  >
                    {/* Color preview dots */}
                    <div style={{
                      display: "flex",
                      gap: "3px",
                      flexShrink: 0,
                    }}>
                      {[t.primary, t.secondary, t.accent].map((color, ci) => (
                        <div
                          key={ci}
                          style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            background: color,
                            boxShadow: isActive ? `0 0 6px ${color}80` : "none",
                          }}
                        />
                      ))}
                    </div>

                    {/* Label */}
                    <span style={{
                      fontSize: "0.78rem",
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? t.primary : "rgba(255,255,255,0.6)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      flex: 1,
                      textAlign: "left",
                    }}>
                      {t.emoji} {t.label}
                    </span>

                    {/* Active indicator */}
                    {isActive && (
                      <Check size={13} style={{ color: t.primary, flexShrink: 0 }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Current theme label */}
            <div style={{
              marginTop: "14px",
              padding: "8px 12px",
              background: `linear-gradient(135deg, ${theme.primary}08, ${theme.secondary}06)`,
              border: `1px solid ${theme.primary}15`,
              borderRadius: "10px",
              textAlign: "center",
            }}>
              <span style={{
                fontSize: "0.72rem",
                color: "rgba(255,255,255,0.4)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.05em",
              }}>
                Active: <span style={{ color: theme.primary, fontWeight: 600 }}>{theme.label}</span>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
