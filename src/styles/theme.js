// styles/theme.js
// ═══════════════════════════════════════════════════════════════════════════
// THEME CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

export const darkTheme = {
  bg: "#0a0a0c",
  surface: "#141418",
  surfaceHover: "#1a1a1f",
  card: "#18181c",
  cardHover: "#1e1e24",
  border: "rgba(255,255,255,0.08)",
  borderLight: "rgba(255,255,255,0.12)",
  text: "#ffffff",
  textSecondary: "rgba(255,255,255,0.6)",
  textTertiary: "rgba(255,255,255,0.4)",
  accent: "#6366f1",
  accentLight: "#818cf8",
  accentSoft: "rgba(99,102,241,0.15)",
  danger: "#ef4444",
  success: "#22c55e",
  warning: "#f59e0b",
};

export const lightTheme = {
  bg: "#f8f9fa",
  surface: "#ffffff",
  surfaceHover: "#f3f4f6",
  card: "#ffffff",
  cardHover: "#f9fafb",
  border: "rgba(0,0,0,0.08)",
  borderLight: "rgba(0,0,0,0.12)",
  text: "#111827",
  textSecondary: "rgba(17,24,39,0.6)",
  textTertiary: "rgba(17,24,39,0.4)",
  accent: "#6366f1",
  accentLight: "#4f46e5",
  accentSoft: "rgba(99,102,241,0.1)",
  danger: "#ef4444",
  success: "#22c55e",
  warning: "#f59e0b",
};

export const getTheme = (isDark) => (isDark ? darkTheme : lightTheme);

// Musical keys for dropdowns
export const MUSICAL_KEYS = [
  "C",
  "C#/Db",
  "D",
  "D#/Eb",
  "E",
  "F",
  "F#/Gb",
  "G",
  "G#/Ab",
  "A",
  "A#/Bb",
  "B",
];
