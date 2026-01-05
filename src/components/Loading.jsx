// components/Loading.jsx
// ═══════════════════════════════════════════════════════════════════════════
// LOADING SPINNER COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

import React from "react";

const Loading = ({ theme: t }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 20px",
        gap: "16px",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          border: `3px solid ${t.border}`,
          borderTopColor: t.accent,
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <p
        style={{
          color: t.textSecondary,
          fontSize: "15px",
          margin: 0,
        }}
      >
        Loading chords...
      </p>
    </div>
  );
};

export default Loading;
