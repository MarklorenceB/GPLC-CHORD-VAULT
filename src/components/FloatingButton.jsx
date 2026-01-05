// components/FloatingButton.jsx
// ═══════════════════════════════════════════════════════════════════════════
// FLOATING ACTION BUTTON COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

import React from "react";

const FloatingButton = ({ theme: t, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        width: "60px",
        height: "60px",
        borderRadius: "18px",
        border: "none",
        background: `linear-gradient(135deg, ${t.accent} 0%, ${t.accentLight} 100%)`,
        color: "#fff",
        fontSize: "28px",
        fontWeight: "300",
        cursor: "pointer",
        boxShadow: `0 8px 24px rgba(99,102,241,0.4)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 90,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      +
    </button>
  );
};

export default FloatingButton;
