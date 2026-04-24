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
        gap: "18px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "48px",
          height: "48px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            border: `1px solid ${t.rule}`,
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            border: `1px solid transparent`,
            borderTopColor: t.accent,
            borderRightColor: t.accent,
            borderRadius: "50%",
            animation: "spin 1.1s var(--ease-in-out) infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "16px",
            borderRadius: "50%",
            background: t.accent,
            opacity: 0.5,
            animation: "pulse 1.8s ease-in-out infinite",
          }}
        />
      </div>
      <p
        className="small-caps"
        style={{
          color: t.textSecondary,
          fontSize: "13px",
          letterSpacing: "0.15em",
          margin: 0,
          fontStyle: "italic",
          fontFamily: "var(--font-display)",
        }}
      >
        Gathering the hymns…
      </p>
    </div>
  );
};

export default Loading;
