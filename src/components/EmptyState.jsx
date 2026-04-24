import React from "react";
import Icon from "./Icon";

const EmptyState = ({ theme: t, hasChords, onAddClick }) => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "80px 24px 40px",
        maxWidth: "460px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          width: "72px",
          height: "72px",
          borderRadius: "999px",
          background: t.bg,
          border: `1px solid ${t.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 22px",
          color: t.ornament,
        }}
      >
        <Icon name={hasChords ? "search" : "notes"} size={26} />
      </div>

      <div
        className="eyebrow"
        style={{ color: t.ornament, marginBottom: "10px" }}
      >
        {hasChords ? "· No Matches ·" : "· Begin ·"}
      </div>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "26px",
          fontWeight: 400,
          fontStyle: "italic",
          fontVariationSettings: '"opsz" 72, "SOFT" 60',
          letterSpacing: "-0.02em",
          margin: "0 0 10px 0",
          color: t.text,
        }}
      >
        {hasChords ? "Nothing found in the book." : "The book is empty."}
      </h3>

      <p
        style={{
          color: t.textSecondary,
          fontSize: "15px",
          lineHeight: 1.6,
          marginBottom: "26px",
          margin: "0 0 26px 0",
        }}
      >
        {hasChords
          ? "Try a different search, another key, or clear the filters."
          : "Inscribe your first chord sheet to start building your worship hymnal."}
      </p>

      {!hasChords && (
        <button
          onClick={onAddClick}
          style={{
            padding: "14px 22px",
            borderRadius: "12px",
            border: "none",
            background: t.accent,
            color: t.accentInk,
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "0.04em",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Icon name="plus" size={16} />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            Add the first hymn
          </span>
        </button>
      )}
    </div>
  );
};

export default EmptyState;
