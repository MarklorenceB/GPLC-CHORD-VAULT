// components/ChordCard.jsx
// ═══════════════════════════════════════════════════════════════════════════
// CHORD CARD COMPONENT - Expandable card for each chord entry
// ═══════════════════════════════════════════════════════════════════════════

import React, { useState } from "react";
import { transposeChord } from "../utils/transpose";

const ChordCard = ({
  chord,
  theme: t,
  isExpanded,
  onToggleExpand,
  onToggleFavorite,
  onEdit,
  onDelete,
  onCopy,
  onFullscreen, // ← NEW PROP
  copiedId,
}) => {
  const [transpose, setTranspose] = useState(0);

  const displayProgression =
    transpose !== 0
      ? transposeChord(chord.progression, transpose)
      : chord.progression;

  const handleTranspose = (direction, e) => {
    e?.stopPropagation();
    setTranspose((prev) => {
      const newVal = prev + direction;
      if (newVal > 11) return -11;
      if (newVal < -11) return 11;
      return newVal;
    });
  };

  const resetTranspose = (e) => {
    e?.stopPropagation();
    setTranspose(0);
  };

  const handleCopy = async (e) => {
    e?.stopPropagation();
    const text = `${chord.title} - ${chord.artist}\nKey: ${chord.key}${
      chord.capo ? ` | Capo: ${chord.capo}` : ""
    }${
      transpose !== 0
        ? ` | Transposed: ${transpose > 0 ? "+" : ""}${transpose}`
        : ""
    }\n\n${displayProgression}`;
    onCopy(chord.id, text);
  };

  const handleFullscreen = (e) => {
    e?.stopPropagation();
    onFullscreen(chord);
  };

  return (
    <div
      onClick={onToggleExpand}
      style={{
        background: t.card,
        borderRadius: "16px",
        border: `1px solid ${t.border}`,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
    >
      {/* Card Header */}
      <div
        style={{
          padding: "16px",
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(chord.id);
          }}
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            border: "none",
            background: chord.favorite
              ? "rgba(251,191,36,0.15)"
              : t.surfaceHover,
            color: chord.favorite ? "#fbbf24" : t.textTertiary,
            fontSize: "20px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.2s ease",
          }}
        >
          {chord.favorite ? "★" : "☆"}
        </button>

        {/* Title & Artist */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "4px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              margin: 0,
            }}
          >
            {chord.title}
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: t.textSecondary,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              margin: 0,
            }}
          >
            {chord.artist}
          </p>
        </div>

        {/* Meta Badges */}
        <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
          <span
            style={{
              padding: "6px 10px",
              borderRadius: "8px",
              background: t.accentSoft,
              color: t.accent,
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            {chord.key}
          </span>
          {chord.capo && (
            <span
              style={{
                padding: "6px 10px",
                borderRadius: "8px",
                background: t.surfaceHover,
                color: t.textSecondary,
                fontSize: "12px",
                fontWeight: "600",
              }}
            >
              C{chord.capo}
            </span>
          )}
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div style={{ animation: "fadeIn 0.2s ease" }}>
          {/* Chord Progression */}
          <div
            style={{
              margin: "0 16px 12px",
              padding: "16px",
              background: t.bg,
              borderRadius: "12px",
              border: `1px solid ${t.border}`,
              position: "relative",
            }}
          >
            {/* Fullscreen Button - Top Right of Chord Box */}
            <button
              onClick={handleFullscreen}
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                border: `1px solid ${t.border}`,
                background: t.surface,
                color: t.textSecondary,
                fontSize: "14px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
              title="Fullscreen view"
            >
              ⛶
            </button>

            <pre
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "14px",
                lineHeight: "1.7",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                margin: 0,
                color: t.text,
                maxHeight: "200px",
                overflow: "auto",
                paddingRight: "36px",
              }}
            >
              {displayProgression}
            </pre>
          </div>

          {/* Transpose Controls */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              padding: "12px 16px",
              background: t.surfaceHover,
              borderTop: `1px solid ${t.border}`,
            }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: "600",
                color: t.textSecondary,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Transpose
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: t.bg,
                padding: "4px",
                borderRadius: "10px",
                border: `1px solid ${t.border}`,
              }}
            >
              <button
                onClick={(e) => handleTranspose(-1, e)}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  border: "none",
                  background: t.surface,
                  color: t.text,
                  fontSize: "18px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                −
              </button>
              <span
                onClick={resetTranspose}
                style={{
                  width: "48px",
                  textAlign: "center",
                  fontSize: "15px",
                  fontWeight: "700",
                  color: transpose !== 0 ? t.accent : t.textSecondary,
                  cursor: "pointer",
                }}
              >
                {transpose === 0
                  ? "0"
                  : transpose > 0
                  ? `+${transpose}`
                  : transpose}
              </span>
              <button
                onClick={(e) => handleTranspose(1, e)}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  border: "none",
                  background: t.surface,
                  color: t.text,
                  fontSize: "18px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              borderTop: `1px solid ${t.border}`,
            }}
          >
            {/* Fullscreen Button */}
            <button
              onClick={handleFullscreen}
              style={{
                padding: "16px",
                background: "none",
                border: "none",
                borderRight: `1px solid ${t.border}`,
                color: t.accent,
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <span>⛶</span> View
            </button>
            <button
              onClick={handleCopy}
              style={{
                padding: "16px",
                background: "none",
                border: "none",
                borderRight: `1px solid ${t.border}`,
                color: copiedId === chord.id ? t.success : t.text,
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <span>{copiedId === chord.id ? "✓" : "📋"}</span>
              {copiedId === chord.id ? "Copied!" : "Copy"}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(chord);
              }}
              style={{
                padding: "16px",
                background: "none",
                border: "none",
                borderRight: `1px solid ${t.border}`,
                color: t.text,
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <span>✏️</span> Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(chord.id);
              }}
              style={{
                padding: "16px",
                background: "none",
                border: "none",
                color: t.danger,
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <span>🗑️</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChordCard;
