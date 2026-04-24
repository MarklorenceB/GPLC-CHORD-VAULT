import React from "react";
import Icon from "./Icon";

const DeleteModal = ({ theme: t, isOpen, onClose, onConfirm, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(12, 9, 6, 0.6)",
        backdropFilter: "blur(6px)",
        zIndex: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        animation: "fadeIn 0.2s var(--ease-out)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: t.surface,
          borderRadius: "20px",
          padding: "28px 24px 24px",
          textAlign: "center",
          maxWidth: "340px",
          width: "100%",
          animation: "scaleIn 0.25s var(--ease-out)",
          border: `1px solid ${t.borderLight}`,
          boxShadow: "0 30px 80px -20px rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "999px",
            background: t.dangerSoft,
            color: t.danger,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 18px",
          }}
        >
          <Icon name="trash" size={22} />
        </div>

        <div
          className="eyebrow"
          style={{ color: t.ornament, marginBottom: "8px" }}
        >
          · Confirm ·
        </div>

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "24px",
            fontWeight: 400,
            fontStyle: "italic",
            fontVariationSettings: '"opsz" 72',
            letterSpacing: "-0.01em",
            margin: "0 0 8px 0",
            color: t.text,
          }}
        >
          Remove this hymn?
        </h3>

        <p
          style={{
            color: t.textSecondary,
            fontSize: "14px",
            lineHeight: 1.55,
            margin: "0 0 22px 0",
          }}
        >
          Once struck from the book, this entry cannot be restored.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
          }}
        >
          <button
            onClick={onClose}
            disabled={isLoading}
            style={{
              padding: "13px",
              borderRadius: "11px",
              border: `1px solid ${t.border}`,
              background: "transparent",
              color: t.text,
              fontSize: "14px",
              fontWeight: 600,
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.5 : 1,
            }}
          >
            Keep
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            style={{
              padding: "13px",
              borderRadius: "11px",
              border: "none",
              background: t.danger,
              color: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {isLoading && (
              <span
                style={{
                  width: "13px",
                  height: "13px",
                  border: "2px solid rgba(255,255,255,0.4)",
                  borderTopColor: "#fff",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}
              />
            )}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
