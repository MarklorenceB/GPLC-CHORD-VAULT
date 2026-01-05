// components/ErrorMessage.jsx
// ═══════════════════════════════════════════════════════════════════════════
// ERROR MESSAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

import React from "react";

const ErrorMessage = ({ theme: t, message, onRetry }) => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px 20px",
        margin: "20px",
        background: "rgba(239, 68, 68, 0.1)",
        borderRadius: "16px",
        border: `1px solid rgba(239, 68, 68, 0.2)`,
      }}
    >
      <div
        style={{
          fontSize: "32px",
          marginBottom: "12px",
        }}
      >
        ⚠️
      </div>

      <h3
        style={{
          fontSize: "16px",
          fontWeight: "600",
          marginBottom: "8px",
          color: t.danger,
          margin: "0 0 8px 0",
        }}
      >
        Something went wrong
      </h3>

      <p
        style={{
          color: t.textSecondary,
          fontSize: "14px",
          marginBottom: "16px",
          margin: "0 0 16px 0",
        }}
      >
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            border: `1px solid ${t.border}`,
            background: t.surface,
            color: t.text,
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
