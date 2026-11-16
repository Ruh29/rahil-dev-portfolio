import React, { createContext, useContext, useEffect, useState } from "react";

export const THEME_COLORS = [
  { name: "violet", label: "Violet", hex: "#8b5cf6" },
  { name: "blue", label: "Blue", hex: "#3b82f6" },
  { name: "emerald", label: "Emerald", hex: "#10b981" },
  { name: "rose", label: "Rose", hex: "#f43f5e" },
  { name: "amber", label: "Amber", hex: "#f59e0b" },
];

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState("dark");
  const [color, setColor] = useState("violet");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("theme-mode");
    const savedColor = localStorage.getItem("theme-color");

    if (savedMode) {
      setMode(savedMode);
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setMode("dark");
    } else {
      setMode("dark");
    }

    if (savedColor) setColor(savedColor);

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    root.setAttribute("data-color", color);

    localStorage.setItem("theme-mode", mode);
    localStorage.setItem("theme-color", color);
  }, [mode, color, mounted]);

  // Backward compatibility object for legacy theme consumers (e.g. ResumeModal)
  const activeColorObj = THEME_COLORS.find((c) => c.name === color) || THEME_COLORS[0];
  const legacyTheme = {
    id: color,
    primary: activeColorObj.hex,
    secondary: mode === "dark" ? "#ffffff" : "#0f172a",
    mode: mode,
  };

  return (
    <ThemeContext.Provider value={{ mode, setMode, color, setColor, theme: legacyTheme, themeId: color }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
