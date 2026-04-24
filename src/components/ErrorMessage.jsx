import React from "react";
import Icon from "./Icon";

const ErrorMessage = ({ theme: t, message, onRetry }) => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px 28px",
        margin: "24px auto",
        maxWidth: "460px",
        background: t.dangerSoft,
        borderRadius: "18px",
        border: `1px solid ${t.danger}40`,
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "999px",
          background: t.surface,
          color: t.danger,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 14px",
        }}
      >
        <Icon name="alert" size={22} />
      </div>

      <div
        className="eyebrow"
        style={{ color: t.danger, marginBottom: "6px" }}
      >
        · Error ·
      </div>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "20px",
          fontWeight: 400,
          fontStyle: "italic",
          margin: "0 0 10px 0",
          color: t.text,
        }}
      >
        Something went wrong.
      </h3>

      <p
        style={{
          color: t.textSecondary,
          fontSize: "14px",
          lineHeight: 1.55,
          margin: "0 0 18px 0",
        }}
      >
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: "11px 18px",
            borderRadius: "10px",
            border: `1px solid ${t.border}`,
            background: t.surface,
            color: t.text,
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.04em",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Icon name="retry" size={14} />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
