import React from "react";
import Icon from "./Icon";

const FloatingButton = ({ theme: t, onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Add new chord"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        width: "58px",
        height: "58px",
        borderRadius: "999px",
        border: `1px solid ${t.accent}`,
        background: t.accent,
        color: t.accentInk,
        cursor: "pointer",
        boxShadow: `0 12px 28px -8px ${t.accent}80, 0 0 0 6px ${t.accentSoft}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 90,
        transition: "transform 0.25s var(--ease-out), box-shadow 0.25s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.06) rotate(90deg)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1) rotate(0deg)";
      }}
    >
      <Icon name="plus" size={22} strokeWidth={1.8} />
    </button>
  );
};

export default FloatingButton;
