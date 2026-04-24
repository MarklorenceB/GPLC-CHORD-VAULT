import React, { useState } from "react";
import { transposeChord } from "../utils/transpose";
import Icon from "./Icon";

const ChordCard = ({
  chord,
  theme: t,
  isExpanded,
  onToggleExpand,
  onToggleFavorite,
  onEdit,
  onDelete,
  onCopy,
  onFullscreen,
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
    const text = `${chord.title} — ${chord.artist}\nKey: ${chord.key}${
      chord.capo ? ` · Capo: ${chord.capo}` : ""
    }${
      transpose !== 0
        ? ` · Transposed: ${transpose > 0 ? "+" : ""}${transpose}`
        : ""
    }\n\n${displayProgression}`;
    onCopy(chord.id, text);
  };

  const handleFullscreen = (e) => {
    e?.stopPropagation();
    onFullscreen(chord);
  };

  return (
    <article
      onClick={onToggleExpand}
      style={{
        background: t.card,
        borderRadius: "18px",
        border: `1px solid ${t.border}`,
        overflow: "hidden",
        cursor: "pointer",
        transition: "border-color 0.25s, transform 0.25s, box-shadow 0.25s",
        boxShadow: isExpanded ? t.shadow : "none",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        if (!isExpanded) e.currentTarget.style.borderColor = t.borderLight;
      }}
      onMouseLeave={(e) => {
        if (!isExpanded) e.currentTarget.style.borderColor = t.border;
      }}
    >
      {/* Gilt edge on expanded */}
      {isExpanded && (
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "3px",
            background: `linear-gradient(to bottom, transparent, ${t.accent}, transparent)`,
          }}
        />
      )}

      <div
        style={{
          padding: "18px 18px 16px",
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          columnGap: "14px",
          alignItems: "start",
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(chord.id);
          }}
          aria-label={chord.favorite ? "Remove from Line Up" : "Add to Line Up"}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            border: "none",
            background: chord.favorite ? t.accentSoft : "transparent",
            color: chord.favorite ? t.accent : t.textTertiary,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
            marginTop: "2px",
          }}
        >
          <Icon name={chord.favorite ? "starFill" : "star"} size={17} />
        </button>

        {/* Title & artist */}
        <div style={{ minWidth: 0 }}>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "20px",
              fontWeight: 500,
              fontVariationSettings: '"opsz" 36',
              letterSpacing: "-0.015em",
              lineHeight: 1.15,
              margin: "0 0 4px 0",
              color: t.text,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {chord.title}
          </h3>
          <p
            style={{
              fontSize: "13px",
              fontStyle: "italic",
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

        {/* Key & capo */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "6px",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              padding: "5px 10px",
              borderRadius: "6px",
              background: t.accentSoft,
              color: t.accent,
              fontFamily: "var(--font-display)",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.02em",
              minWidth: "32px",
              textAlign: "center",
            }}
          >
            {chord.key}
          </span>
          {chord.capo && (
            <span
              className="eyebrow"
              style={{
                color: t.textTertiary,
                fontSize: "9px",
              }}
            >
              Capo {chord.capo}
            </span>
          )}
        </div>
      </div>

      {isExpanded && (
        <div style={{ animation: "fadeIn 0.3s var(--ease-out)" }}>
          {/* Ornamental divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "0 20px",
              color: t.ornament,
            }}
          >
            <span style={{ flex: 1, height: "1px", background: "currentColor", opacity: 0.25 }} />
            <span style={{ fontSize: "10px", opacity: 0.65 }}>✦</span>
            <span style={{ flex: 1, height: "1px", background: "currentColor", opacity: 0.25 }} />
          </div>

          {/* Progression */}
          <div
            style={{
              margin: "14px 18px 14px",
              padding: "18px 18px 18px",
              background: t.bg,
              borderRadius: "12px",
              border: `1px solid ${t.rule}`,
              position: "relative",
            }}
          >
            <button
              onClick={handleFullscreen}
              aria-label="Open fullscreen"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                width: "30px",
                height: "30px",
                borderRadius: "8px",
                border: `1px solid ${t.border}`,
                background: t.surface,
                color: t.textSecondary,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
              }}
            >
              <Icon name="expand" size={14} />
            </button>

            <pre
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "13.5px",
                fontWeight: 500,
                lineHeight: 1.8,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                margin: 0,
                color: t.text,
                maxHeight: "200px",
                overflow: "auto",
                paddingRight: "36px",
                letterSpacing: "0.01em",
              }}
            >
              {displayProgression}
            </pre>
          </div>

          {/* Transpose */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "14px",
              padding: "0 20px 14px",
            }}
          >
            <span
              className="eyebrow"
              style={{ color: t.textSecondary, fontSize: "10px" }}
            >
              Transpose
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                background: t.bg,
                padding: "3px",
                borderRadius: "10px",
                border: `1px solid ${t.border}`,
              }}
            >
              <button
                onClick={(e) => handleTranspose(-1, e)}
                aria-label="Transpose down"
                style={{
                  width: "34px",
                  height: "32px",
                  borderRadius: "8px",
                  border: "none",
                  background: "transparent",
                  color: t.text,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name="minus" size={14} />
              </button>
              <span
                onClick={resetTranspose}
                title="Reset"
                className="catalog-num"
                style={{
                  minWidth: "44px",
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: transpose !== 0 ? t.accent : t.textSecondary,
                  cursor: "pointer",
                }}
              >
                {transpose === 0
                  ? "±0"
                  : transpose > 0
                  ? `+${transpose}`
                  : `${transpose}`}
              </span>
              <button
                onClick={(e) => handleTranspose(1, e)}
                aria-label="Transpose up"
                style={{
                  width: "34px",
                  height: "32px",
                  borderRadius: "8px",
                  border: "none",
                  background: "transparent",
                  color: t.text,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name="plus" size={14} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              borderTop: `1px solid ${t.rule}`,
            }}
          >
            <CardAction
              theme={t}
              icon="expand"
              label="View"
              onClick={handleFullscreen}
              isAccent
            />
            <CardAction
              theme={t}
              icon={copiedId === chord.id ? "check" : "copy"}
              label={copiedId === chord.id ? "Copied" : "Copy"}
              onClick={handleCopy}
              isSuccess={copiedId === chord.id}
            />
            <CardAction
              theme={t}
              icon="pencil"
              label="Edit"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(chord);
              }}
            />
            <CardAction
              theme={t}
              icon="trash"
              label="Delete"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(chord.id);
              }}
              isDanger
              noBorder
            />
          </div>
        </div>
      )}
    </article>
  );
};

const CardAction = ({ theme: t, icon, label, onClick, isAccent, isDanger, isSuccess, noBorder }) => {
  const color = isAccent ? t.accent : isDanger ? t.danger : isSuccess ? t.success : t.text;
  return (
    <button
      onClick={onClick}
      style={{
        padding: "14px 6px",
        background: "none",
        border: "none",
        borderRight: noBorder ? "none" : `1px solid ${t.rule}`,
        color,
        fontSize: "12px",
        fontWeight: 500,
        letterSpacing: "0.04em",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        transition: "background 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = t.surfaceHover)}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <Icon name={icon} size={15} />
      <span>{label}</span>
    </button>
  );
};

export default ChordCard;
