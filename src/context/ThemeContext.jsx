import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

// ── Theme Definitions ──────────────────────────────────────────────
const THEMES = {
  cyberpunk: {
    id: "cyberpunk",
    label: "Cyberpunk",
    emoji: "🔮",
    primary: "#00f5ff",
    secondary: "#8b5cf6",
    accent: "#ec4899",
    green: "#10b981",
    amber: "#f59e0b",
    isLight: false,
  },
  light: {
    id: "light",
    label: "Light",
    emoji: "☀️",
    primary: "#2563eb",
    secondary: "#7c3aed",
    accent: "#db2777",
    green: "#059669",
    amber: "#d97706",
    isLight: true,
  },
  sunset: {
    id: "sunset",
    label: "Sunset",
    emoji: "🌅",
    primary: "#ff6b35",
    secondary: "#f7c948",
    accent: "#ff3366",
    green: "#10b981",
    amber: "#f7c948",
    isLight: false,
  },
  ocean: {
    id: "ocean",
    label: "Ocean",
    emoji: "🌊",
    primary: "#00b4d8",
    secondary: "#0077b6",
    accent: "#48cae4",
    green: "#06d6a0",
    amber: "#ffd166",
    isLight: false,
  },
  aurora: {
    id: "aurora",
    label: "Aurora",
    emoji: "🌌",
    primary: "#00ff87",
    secondary: "#60efff",
    accent: "#ff00e5",
    green: "#00ff87",
    amber: "#ffbe0b",
    isLight: false,
  },
  cherry: {
    id: "cherry",
    label: "Cherry",
    emoji: "🌸",
    primary: "#ff6b9d",
    secondary: "#c44dff",
    accent: "#ff3c83",
    green: "#00d68f",
    amber: "#ffc542",
    isLight: false,
  },
  emerald: {
    id: "emerald",
    label: "Emerald",
    emoji: "💎",
    primary: "#34d399",
    secondary: "#06b6d4",
    accent: "#a78bfa",
    green: "#34d399",
    amber: "#fbbf24",
    isLight: false,
  },
  fire: {
    id: "fire",
    label: "Fire",
    emoji: "🔥",
    primary: "#ef4444",
    secondary: "#f97316",
    accent: "#eab308",
    green: "#22c55e",
    amber: "#f97316",
    isLight: false,
  },
  lavender: {
    id: "lavender",
    label: "Lavender",
    emoji: "💜",
    primary: "#a78bfa",
    secondary: "#818cf8",
    accent: "#f472b6",
    green: "#34d399",
    amber: "#fcd34d",
    isLight: false,
  },
  matrix: {
    id: "matrix",
    label: "Matrix",
    emoji: "🟢",
    primary: "#22c55e",
    secondary: "#16a34a",
    accent: "#4ade80",
    green: "#22c55e",
    amber: "#a3e635",
    isLight: false,
  },
  gold: {
    id: "gold",
    label: "Gold",
    emoji: "✨",
    primary: "#f59e0b",
    secondary: "#d97706",
    accent: "#fbbf24",
    green: "#10b981",
    amber: "#f59e0b",
    isLight: false,
  },
};

// Helper: hex to rgb string
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

// ── Apply theme to CSS custom properties ───────────────────────────
function applyThemeToCSSVars(themeId) {
  const root = document.documentElement;
  const t = THEMES[themeId];
  if (!t) return;

  const pRgb = hexToRgb(t.primary);
  const sRgb = hexToRgb(t.secondary);
  const aRgb = hexToRgb(t.accent);

  // Set data-theme attribute for CSS light/dark mode
  root.setAttribute("data-theme", t.isLight ? "light" : "dark");

  // Core colors
  root.style.setProperty("--color-cyan", t.primary);
  root.style.setProperty("--color-purple", t.secondary);
  root.style.setProperty("--color-pink", t.accent);
  root.style.setProperty("--color-green", t.green);
  root.style.setProperty("--color-amber", t.amber);

  // RGB triplets for alpha compositing in CSS
  root.style.setProperty("--color-cyan-rgb", pRgb);
  root.style.setProperty("--color-purple-rgb", sRgb);
  root.style.setProperty("--color-pink-rgb", aRgb);

  // Background and text colors for light/dark
  if (t.isLight) {
    root.style.setProperty("--bg-main", "#f8fafc");
    root.style.setProperty("--bg-card", "rgba(0,0,0,0.03)");
    root.style.setProperty("--bg-card-solid", "#ffffff");
    root.style.setProperty("--bg-darker", "#f1f5f9");
    root.style.setProperty("--bg-nav", "rgba(248,250,252,0.9)");
    root.style.setProperty("--bg-overlay", "rgba(248,250,252,0.95)");
    root.style.setProperty("--text-heading", "#0f172a");
    root.style.setProperty("--text-primary", "#1e293b");
    root.style.setProperty("--text-secondary", "#475569");
    root.style.setProperty("--text-muted", "#94a3b8");
    root.style.setProperty("--border-main", "rgba(0,0,0,0.08)");
    root.style.setProperty("--border-divider", "rgba(0,0,0,0.06)");
    root.style.setProperty("--shadow-card", "0 8px 32px rgba(0,0,0,0.08)");
  } else {
    root.style.setProperty("--bg-main", "#050508");
    root.style.setProperty("--bg-card", "rgba(255,255,255,0.04)");
    root.style.setProperty("--bg-card-solid", "#0e0e18");
    root.style.setProperty("--bg-darker", "#030306");
    root.style.setProperty("--bg-nav", "rgba(5,5,8,0.85)");
    root.style.setProperty("--bg-overlay", "rgba(5,5,8,0.92)");
    root.style.setProperty("--text-heading", "#f8fafc");
    root.style.setProperty("--text-primary", "#e2e8f0");
    root.style.setProperty("--text-secondary", "#94a3b8");
    root.style.setProperty("--text-muted", "#64748b");
    root.style.setProperty("--border-main", "rgba(255,255,255,0.08)");
    root.style.setProperty("--border-divider", "rgba(255,255,255,0.05)");
    root.style.setProperty("--shadow-card", "0 8px 32px rgba(0,0,0,0.4)");
  }

  // Borders
  root.style.setProperty("--border-accent", `rgba(${pRgb}, 0.2)`);

  // Gradients
  root.style.setProperty("--gradient-primary", `linear-gradient(135deg, ${t.primary}, ${t.secondary})`);
  root.style.setProperty("--gradient-secondary", `linear-gradient(135deg, ${t.secondary}, ${t.accent})`);
  root.style.setProperty(
    "--gradient-hero",
    `radial-gradient(ellipse at 20% 50%, rgba(${pRgb}, 0.08) 0%, transparent 60%),
     radial-gradient(ellipse at 80% 20%, rgba(${sRgb}, 0.08) 0%, transparent 60%),
     radial-gradient(ellipse at 50% 80%, rgba(${aRgb}, 0.06) 0%, transparent 60%)`
  );

  // Shadows
  root.style.setProperty("--shadow-glow-cyan", `0 0 40px rgba(${pRgb}, 0.15)`);
  root.style.setProperty("--shadow-glow-purple", `0 0 40px rgba(${sRgb}, 0.15)`);
}

// ── Context ────────────────────────────────────────────────────────
const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(() => {
    try {
      return localStorage.getItem("portfolio-theme") || "light";
    } catch {
      return "light";
    }
  });

  const theme = THEMES[themeId] || THEMES.light;

  useEffect(() => {
    applyThemeToCSSVars(themeId);
    try {
      localStorage.setItem("portfolio-theme", themeId);
    } catch {
      // ignore
    }
  }, [themeId]);

  const setTheme = useCallback((id) => {
    if (THEMES[id]) setThemeId(id);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, themeId, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export { THEMES };
export default ThemeContext;
