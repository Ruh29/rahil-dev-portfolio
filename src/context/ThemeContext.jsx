import React, { createContext, useContext, useEffect } from "react";

export const THEME_COLORS = [
  { name: "monochrome", label: "Monochrome", hex: "#0f172a" },
  { name: "blue", label: "Blue", hex: "#3b82f6" },
  { name: "violet", label: "Violet", hex: "#8b5cf6" },
  { name: "emerald", label: "Emerald", hex: "#10b981" },
  { name: "rose", label: "Rose", hex: "#f43f5e" },
  { name: "amber", label: "Amber", hex: "#f59e0b" },
];

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark");
    root.setAttribute("data-color", "monochrome");
    try {
      localStorage.setItem("theme-mode", "light");
      localStorage.setItem("theme-color", "monochrome");
    } catch {
      // ignore
    }
  }, []);

  const activeColorObj = THEME_COLORS[0];
  const legacyTheme = {
    id: "monochrome",
    primary: activeColorObj.hex,
    secondary: "#0f172a",
    mode: "light",
  };

  return (
    <ThemeContext.Provider
      value={{
        mode: "light",
        setMode: () => {},
        color: "monochrome",
        setColor: () => {},
        theme: legacyTheme,
        themeId: "monochrome",
      }}
    >
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
