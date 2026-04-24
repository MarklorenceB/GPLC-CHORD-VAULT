import React, { useState, useEffect } from "react";
import { transposeChord } from "../utils/transpose";
import Icon from "./Icon";

const FullscreenView = ({
  chord,
  theme: t,
  isOpen,
  onClose,
  onToggleFavorite,
}) => {
  const [transpose, setTranspose] = useState(0);
  const [fontSize, setFontSize] = useState(20);
  const [scrollMode, setScrollMode] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(50);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTranspose(0);
      setFontSize(20);
      setScrollMode(false);
    }
  }, [isOpen, chord?.id]);

  useEffect(() => {
    let scrollInterval;
    if (scrollMode && isOpen) {
      scrollInterval = setInterval(() => {
        const container = document.getElementById("fullscreen-chord-content");
        if (container) container.scrollTop += 1;
      }, 100 - scrollSpeed);
    }
    return () => clearInterval(scrollInterval);
  }, [scrollMode, scrollSpeed, isOpen]);

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
          setFontSize((prev) => Math.min(prev + 2, 40));
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
    const text = `${chord.title} — ${chord.artist}\nKey: ${chord.key}${
      chord.capo ? ` · Capo: ${chord.capo}` : ""
    }${
      transpose !== 0
        ? ` · Transposed: ${transpose > 0 ? "+" : ""}${transpose}`
        : ""
    }\n\n${displayProgression}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
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
        animation: "fadeIn 0.25s var(--ease-out)",
      }}
    >
      {/* Decorative vignette */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(ellipse at top, ${t.accentSoft} 0%, transparent 55%)`,
          opacity: 0.6,
        }}
      />

      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 18px",
          borderBottom: `1px solid ${t.rule}`,
          background: t.surface,
          flexShrink: 0,
          position: "relative",
          zIndex: 2,
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            border: `1px solid ${t.border}`,
            background: t.bg,
            color: t.text,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="arrowLeft" size={18} />
        </button>

        <div
          style={{
            flex: 1,
            textAlign: "center",
            padding: "0 14px",
            minWidth: 0,
          }}
        >
          <div
            className="eyebrow"
            style={{
              color: t.ornament,
              marginBottom: "2px",
              fontSize: "9px",
            }}
          >
            · Now reading ·
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "17px",
              fontWeight: 500,
              fontStyle: "italic",
              fontVariationSettings: '"opsz" 36',
              letterSpacing: "-0.01em",
              margin: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: t.text,
            }}
          >
            {chord.title}
          </h2>
          <p
            style={{
              fontSize: "12px",
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

        <button
          onClick={() => onToggleFavorite(chord.id)}
          aria-label="Toggle favorite"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            border: `1px solid ${chord.favorite ? t.accent : t.border}`,
            background: chord.favorite ? t.accentSoft : t.bg,
            color: chord.favorite ? t.accent : t.textTertiary,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name={chord.favorite ? "starFill" : "star"} size={17} />
        </button>
      </div>

      {/* Meta badges */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "12px 16px",
          borderBottom: `1px solid ${t.rule}`,
          background: t.surface,
          flexWrap: "wrap",
          flexShrink: 0,
          position: "relative",
          zIndex: 2,
        }}
      >
        <Badge theme={t} tone="accent">
          Key · {chord.key}
        </Badge>

        {chord.capo && (
          <Badge theme={t} tone="muted">
            Capo · {chord.capo}
          </Badge>
        )}

        {transpose !== 0 && (
          <Badge theme={t} tone="success">
            Transposed {transpose > 0 ? "+" : ""}
            {transpose}
          </Badge>
        )}

        {scrollMode && (
          <Badge theme={t} tone="warning" pulse>
            ⏵ Auto-scrolling
          </Badge>
        )}
      </div>

      {/* Content */}
      <div
        id="fullscreen-chord-content"
        style={{
          flex: 1,
          overflow: "auto",
          padding: "40px 24px 140px",
          WebkitOverflowScrolling: "touch",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: "820px",
            margin: "0 auto",
          }}
        >
          {/* Opening flourish */}
          <div
            aria-hidden
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              color: t.ornament,
              opacity: 0.6,
              marginBottom: "32px",
            }}
          >
            <span style={{ flex: 1, height: "1px", background: "currentColor", opacity: 0.35 }} />
            <span style={{ fontSize: "11px", letterSpacing: "0.4em" }}>✦ ✦ ✦</span>
            <span style={{ flex: 1, height: "1px", background: "currentColor", opacity: 0.35 }} />
          </div>

          <pre
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: `${fontSize}px`,
              fontWeight: 500,
              lineHeight: 1.9,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              margin: 0,
              color: t.text,
              letterSpacing: "0.01em",
            }}
          >
            {displayProgression}
          </pre>

          {/* Closing flourish */}
          <div
            aria-hidden
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              color: t.ornament,
              opacity: 0.6,
              marginTop: "48px",
            }}
          >
            <span style={{ flex: 1, height: "1px", background: "currentColor", opacity: 0.35 }} />
            <span style={{ fontSize: "11px", letterSpacing: "0.4em" }}>✦</span>
            <span style={{ flex: 1, height: "1px", background: "currentColor", opacity: 0.35 }} />
          </div>
        </div>
      </div>

      {/* Bottom controls */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: `linear-gradient(to top, ${t.surface} 70%, ${t.surface}e6 100%)`,
          borderTop: `1px solid ${t.rule}`,
          padding: "14px 16px",
          paddingBottom: "max(14px, env(safe-area-inset-bottom))",
          backdropFilter: "blur(14px)",
          zIndex: 3,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "620px",
            margin: "0 auto",
            gap: "10px",
          }}
        >
          {/* Font size */}
          <ControlGroup theme={t}>
            <CircleBtn
              theme={t}
              onClick={() => setFontSize((prev) => Math.max(prev - 2, 12))}
              aria-label="Decrease text"
            >
              <Icon name="aSmall" size={14} />
            </CircleBtn>
            <span
              className="catalog-num"
              style={{
                minWidth: "26px",
                textAlign: "center",
                fontSize: "12px",
                color: t.textSecondary,
              }}
            >
              {fontSize}
            </span>
            <CircleBtn
              theme={t}
              onClick={() => setFontSize((prev) => Math.min(prev + 2, 40))}
              aria-label="Increase text"
            >
              <Icon name="aBig" size={16} />
            </CircleBtn>
          </ControlGroup>

          {/* Transpose */}
          <ControlGroup theme={t}>
            <CircleBtn
              theme={t}
              onClick={() => handleTranspose(-1)}
              aria-label="Transpose down"
            >
              <Icon name="minus" size={14} />
            </CircleBtn>
            <span
              onClick={() => setTranspose(0)}
              title="Reset"
              className="catalog-num"
              style={{
                minWidth: "40px",
                textAlign: "center",
                fontSize: "13px",
                fontWeight: 700,
                color: transpose !== 0 ? t.accent : t.textSecondary,
                cursor: "pointer",
              }}
            >
              {transpose === 0 ? "±0" : transpose > 0 ? `+${transpose}` : `${transpose}`}
            </span>
            <CircleBtn
              theme={t}
              onClick={() => handleTranspose(1)}
              aria-label="Transpose up"
            >
              <Icon name="plus" size={14} />
            </CircleBtn>
          </ControlGroup>

          {/* Auto-scroll */}
          <button
            onClick={() => setScrollMode((prev) => !prev)}
            aria-label="Toggle auto-scroll"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              border: `1px solid ${scrollMode ? t.accent : t.border}`,
              background: scrollMode ? t.accentSoft : t.bg,
              color: scrollMode ? t.accent : t.text,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
            }}
          >
            <Icon name="scroll" size={18} />
          </button>

          {/* Copy */}
          <button
            onClick={handleCopy}
            aria-label="Copy chord sheet"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              border: `1px solid ${copied ? t.success : t.border}`,
              background: copied ? `${t.success}18` : t.bg,
              color: copied ? t.success : t.text,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
            }}
          >
            <Icon name={copied ? "check" : "copy"} size={17} />
          </button>
        </div>

        {scrollMode && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "14px",
              marginTop: "14px",
              maxWidth: "320px",
              marginLeft: "auto",
              marginRight: "auto",
              animation: "riseIn 0.3s var(--ease-out)",
            }}
          >
            <span
              className="eyebrow"
              style={{ color: t.textTertiary, fontSize: "9px" }}
            >
              Slow
            </span>
            <input
              type="range"
              min="10"
              max="90"
              value={scrollSpeed}
              onChange={(e) => setScrollSpeed(Number(e.target.value))}
              style={{
                flex: 1,
                height: "3px",
                borderRadius: "3px",
                background: t.border,
                cursor: "pointer",
                accentColor: t.accent,
              }}
            />
            <span
              className="eyebrow"
              style={{ color: t.textTertiary, fontSize: "9px" }}
            >
              Fast
            </span>
          </div>
        )}
      </div>

      {/* Desktop keyboard hints */}
      <div
        style={{
          position: "fixed",
          bottom: "104px",
          left: "20px",
          fontSize: "10px",
          color: t.textTertiary,
          display: "none",
          letterSpacing: "0.1em",
          fontFamily: "var(--font-mono)",
        }}
        className="keyboard-hints"
      >
        <style>{`
          @media (min-width: 900px) {
            .keyboard-hints { display: flex !important; gap: 14px; }
          }
        `}</style>
        <span>ESC · close</span>
        <span>↑↓ · transpose</span>
        <span>+/− · zoom</span>
        <span>␣ · scroll</span>
      </div>
    </div>
  );
};

const Badge = ({ theme: t, tone = "muted", pulse, children }) => {
  const map = {
    accent: { bg: t.accentSoft, color: t.accent },
    muted: { bg: t.surfaceHover, color: t.textSecondary },
    success: { bg: `${t.success}22`, color: t.success },
    warning: { bg: `${t.warning}20`, color: t.warning },
  };
  const c = map[tone];
  return (
    <span
      style={{
        padding: "5px 11px",
        borderRadius: "6px",
        background: c.bg,
        color: c.color,
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        animation: pulse ? "pulse 1.8s ease-in-out infinite" : "none",
      }}
    >
      {children}
    </span>
  );
};

const ControlGroup = ({ theme: t, children }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "2px",
      background: t.bg,
      padding: "4px",
      borderRadius: "12px",
      border: `1px solid ${t.border}`,
    }}
  >
    {children}
  </div>
);

const CircleBtn = ({ theme: t, onClick, children, ...rest }) => (
  <button
    onClick={onClick}
    style={{
      width: "34px",
      height: "32px",
      borderRadius: "9px",
      border: "none",
      background: "transparent",
      color: t.text,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background 0.15s",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.background = t.surfaceHover)}
    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    {...rest}
  >
    {children}
  </button>
);

export default FullscreenView;
