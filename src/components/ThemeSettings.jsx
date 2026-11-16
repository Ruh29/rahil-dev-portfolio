import React, { useState, useEffect } from "react";
import { Moon, Sun, Settings, X, Check } from "lucide-react";
import { useTheme, THEME_COLORS } from "../context/ThemeContext";

export default function ThemeSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const { mode, setMode, color, setColor } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-white dark:bg-slate-900 shadow-xl text-slate-800 dark:text-white hover:scale-110 transition-transform duration-200 border border-slate-200 dark:border-slate-800 glass-panel cursor-pointer"
        aria-label="Theme Settings"
      >
        <Settings className="w-5 h-5 animate-[spin_6s_linear_infinite]" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-slate-950 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-slate-200 dark:border-slate-800 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Theme Settings</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Mode Selection */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Mode</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setMode("light")}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 transition-all cursor-pointer ${
                  mode === "light"
                    ? "border-primary-500 bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 font-bold"
                    : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <Sun className="w-4 h-4" />
                <span className="text-sm">Light</span>
              </button>
              
              <button
                onClick={() => setMode("dark")}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 transition-all cursor-pointer ${
                  mode === "dark"
                    ? "border-primary-500 bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 font-bold"
                    : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <Moon className="w-4 h-4" />
                <span className="text-sm">Dark</span>
              </button>
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Accent Color</h3>
            <div className="grid grid-cols-6 gap-2">
              {THEME_COLORS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 border-2 cursor-pointer ${
                    color === c.name ? "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-950" : ""
                  }`}
                  style={{ 
                    backgroundColor: c.hex, 
                    borderColor: color === c.name ? c.hex : "transparent"
                  }}
                  aria-label={c.label}
                  title={c.label}
                >
                  {color === c.name && <Check className="w-4 h-4 text-white drop-shadow" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
