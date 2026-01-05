// hooks/useTheme.js
// ═══════════════════════════════════════════════════════════════════════════
// CUSTOM HOOK FOR THEME MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════

import { useState, useEffect } from "react";
import { getTheme } from "../styles/theme";

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(true);
  const theme = getTheme(darkMode);

  // Load preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("chordVaultDark");
    if (saved !== null) {
      setDarkMode(saved === "true");
    }
  }, []);

  // Save preference to localStorage
  useEffect(() => {
    localStorage.setItem("chordVaultDark", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return {
    darkMode,
    theme,
    toggleDarkMode,
  };
};
