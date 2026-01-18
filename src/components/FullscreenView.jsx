// components/FullscreenView.jsx
// ═══════════════════════════════════════════════════════════════════════════
// FULLSCREEN VIEW COMPONENT - Zoomed chord viewing with controls
// ═══════════════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from "react";
import { transposeChord } from "../utils/transpose";

const FullscreenView = ({
  chord,
  theme: t,
  isOpen,
  onClose,
  onToggleFavorite,
}) => {
  const [transpose, setTranspose] = useState(0);
  const [fontSize, setFontSize] = useState(18);
  const [scrollMode, setScrollMode] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(50);

  // Reset states when opening new chord
  useEffect(() => {
    if (isOpen) {
      setTranspose(0);
      setFontSize(18);
      setScrollMode(false);
    }
  }, [isOpen, chord?.id]);

  // Auto-scroll functionality
  useEffect(() => {
    let scrollInterval;
    if (scrollMode && isOpen) {
      scrollInterval = setInterval(() => {
        const container = document.getElementById("fullscreen-chord-content");
        if (container) {
          container.scrollTop += 1;
        }
      }, 100 - scrollSpeed);
    }
    return () => clearInterval(scrollInterval);
  }, [scrollMode, scrollSpeed, isOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowUp":
          e.preventDefault();
          setTranspose((prev) => Math.min(prev + 1, 11));
          break;
        case "ArrowDown":
          e.preventDefault();
          setTranspose((prev) => Math.max(prev - 1, -11));
          break;
        case "+":
        case "=":
          setFontSize((prev) => Math.min(prev + 2, 36));
          break;
        case "-":
          setFontSize((prev) => Math.max(prev - 2, 12));
          break;
        case " ":
          e.preventDefault();
          setScrollMode((prev) => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !chord) return null;

  const displayProgression =
    transpose !== 0
      ? transposeChord(chord.progression, transpose)
      : chord.progression;

  const handleTranspose = (direction) => {
    setTranspose((prev) => {
      const newVal = prev + direction;
      if (newVal > 11) return -11;
      if (newVal < -11) return 11;
      return newVal;
    });
  };

  const handleCopy = async () => {
    const text = `${chord.title} - ${chord.artist}\nKey: ${chord.key}${
      chord.capo ? ` | Capo: ${chord.capo}` : ""
    }${
      transpose !== 0
        ? ` | Transposed: ${transpose > 0 ? "+" : ""}${transpose}`
        : ""
    }\n\n${displayProgression}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: t.bg,
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        animation: "fadeIn 0.2s ease",
      }}
    >
      {/* ─────────────────────────────────────────────────────────────────────
          TOP HEADER BAR
      ───────────────────────────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          borderBottom: `1px solid ${t.border}`,
          background: t.surface,
          flexShrink: 0,
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            border: "none",
            background: t.surfaceHover,
            color: t.text,
            fontSize: "20px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ←
        </button>

        {/* Song Info */}
        <div
          style={{
            flex: 1,
            textAlign: "center",
            padding: "0 12px",
            minWidth: 0,
          }}
        >
          <h2
            style={{
              fontSize: "16px",
              fontWeight: "600",
              margin: "0 0 2px 0",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {chord.title}
          </h2>
          <p
            style={{
              fontSize: "13px",
              color: t.textSecondary,
              margin: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {chord.artist}
          </p>
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite(chord.id)}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
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
          }}
        >
          {chord.favorite ? "★" : "☆"}
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────
          META INFO BAR
      ───────────────────────────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "10px 16px",
          borderBottom: `1px solid ${t.border}`,
          background: t.surface,
          flexWrap: "wrap",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            padding: "6px 12px",
            borderRadius: "8px",
            background: t.accentSoft,
            color: t.accent,
            fontSize: "13px",
            fontWeight: "600",
          }}
        >
          Key: {chord.key}
        </span>

        {chord.capo && (
          <span
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              background: t.surfaceHover,
              color: t.textSecondary,
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            Capo: {chord.capo}
          </span>
        )}

        {transpose !== 0 && (
          <span
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              background: "rgba(34,197,94,0.15)",
              color: t.success,
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            Transpose: {transpose > 0 ? "+" : ""}
            {transpose}
          </span>
        )}

        {scrollMode && (
          <span
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              background: "rgba(251,191,36,0.15)",
              color: "#fbbf24",
              fontSize: "13px",
              fontWeight: "600",
              animation: "pulse 1.5s infinite",
            }}
          >
            ⏬ Auto Play
          </span>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────────────
          CHORD CONTENT AREA
      ───────────────────────────────────────────────────────────────────── */}
      <div
        id="fullscreen-chord-content"
        style={{
          flex: 1,
          overflow: "auto",
          padding: "20px 16px 100px",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <pre
          style={{
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontSize: `${fontSize}px`,
            lineHeight: "1.8",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            margin: 0,
            color: t.text,
            maxWidth: "800px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {displayProgression}
        </pre>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────
          BOTTOM CONTROL BAR
      ───────────────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: t.surface,
          borderTop: `1px solid ${t.border}`,
          padding: "12px 16px",
          paddingBottom: "max(12px, env(safe-area-inset-bottom))",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "600px",
            margin: "0 auto",
            gap: "8px",
          }}
        >
          {/* Font Size Controls */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              background: t.bg,
              padding: "4px",
              borderRadius: "10px",
              border: `1px solid ${t.border}`,
            }}
          >
            <button
              onClick={() => setFontSize((prev) => Math.max(prev - 2, 12))}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                border: "none",
                background: t.surface,
                color: t.text,
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              A-
            </button>
            <span
              style={{
                width: "32px",
                textAlign: "center",
                fontSize: "12px",
                color: t.textSecondary,
              }}
            >
              {fontSize}
            </span>
            <button
              onClick={() => setFontSize((prev) => Math.min(prev + 2, 36))}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                border: "none",
                background: t.surface,
                color: t.text,
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              A+
            </button>
          </div>

          {/* Transpose Controls */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              background: t.bg,
              padding: "4px",
              borderRadius: "10px",
              border: `1px solid ${t.border}`,
            }}
          >
            <button
              onClick={() => handleTranspose(-1)}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                border: "none",
                background: t.surface,
                color: t.text,
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              −
            </button>
            <span
              onClick={() => setTranspose(0)}
              style={{
                width: "40px",
                textAlign: "center",
                fontSize: "13px",
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
              onClick={() => handleTranspose(1)}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                border: "none",
                background: t.surface,
                color: t.text,
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              +
            </button>
          </div>

          {/* Auto-scroll Toggle */}
          <button
            onClick={() => setScrollMode((prev) => !prev)}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              border: `1px solid ${scrollMode ? t.accent : t.border}`,
              background: scrollMode ? t.accentSoft : t.bg,
              color: scrollMode ? t.accent : t.text,
              fontSize: "18px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ⏬
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              border: `1px solid ${t.border}`,
              background: t.bg,
              color: t.text,
              fontSize: "18px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            📋
          </button>
        </div>

        {/* Scroll Speed Slider (visible only when auto-scroll is on) */}
        {scrollMode && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginTop: "12px",
              maxWidth: "300px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <span style={{ fontSize: "12px", color: t.textSecondary }}>🐢</span>
            <input
              type="range"
              min="10"
              max="90"
              value={scrollSpeed}
              onChange={(e) => setScrollSpeed(Number(e.target.value))}
              style={{
                flex: 1,
                height: "4px",
                borderRadius: "2px",
                background: t.border,
                cursor: "pointer",
                accentColor: t.accent,
              }}
            />
            <span style={{ fontSize: "12px", color: t.textSecondary }}>🐇</span>
          </div>
        )}
      </div>

      {/* Keyboard Shortcuts Hint (desktop only) */}
      <div
        style={{
          position: "fixed",
          bottom: "100px",
          left: "16px",
          fontSize: "11px",
          color: t.textTertiary,
          display: "none",
        }}
        className="keyboard-hints"
      >
        <style>{`
          @media (min-width: 768px) {
            .keyboard-hints { display: block !important; }
          }
        `}</style>
        ESC close • ↑↓ transpose • +/- zoom • Space scroll
      </div>
    </div>
  );
};

export default FullscreenView;
