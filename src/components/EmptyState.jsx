// components/EmptyState.jsx
// ═══════════════════════════════════════════════════════════════════════════
// EMPTY STATE COMPONENT - Displayed when no chords exist
// ═══════════════════════════════════════════════════════════════════════════

import React from "react";

const EmptyState = ({ theme: t, hasChords, onAddClick }) => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "60px 20px",
      }}
    >
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "20px",
          background: t.surfaceHover,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 20px",
          fontSize: "36px",
        }}
      >
        {hasChords ? "🔍" : "🎸"}
      </div>

      <h3
        style={{
          fontSize: "20px",
          fontWeight: "600",
          marginBottom: "8px",
          margin: "0 0 8px 0",
        }}
      >
        {hasChords ? "No Results Found" : "Start Your Collection"}
      </h3>

      <p
        style={{
          color: t.textSecondary,
          fontSize: "15px",
          marginBottom: "24px",
          margin: "0 0 24px 0",
        }}
      >
        {hasChords
          ? "Try adjusting your search or filters"
          : "Add your first chord sheet to get started"}
      </p>

      {!hasChords && (
        <button
          onClick={onAddClick}
          style={{
            padding: "14px 28px",
            borderRadius: "12px",
            border: "none",
            background: t.accent,
            color: "#fff",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "18px" }}>+</span>
          Add First Chord
        </button>
      )}
    </div>
  );
};

export default EmptyState;
