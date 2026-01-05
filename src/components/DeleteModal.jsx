// components/DeleteModal.jsx
// ═══════════════════════════════════════════════════════════════════════════
// DELETE CONFIRMATION MODAL COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

import React from "react";

const DeleteModal = ({ theme: t, isOpen, onClose, onConfirm, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
        zIndex: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: t.surface,
          borderRadius: "20px",
          padding: "24px",
          textAlign: "center",
          maxWidth: "320px",
          width: "100%",
          animation: "scaleIn 0.2s ease",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "14px",
            background: "rgba(239,68,68,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            fontSize: "28px",
          }}
        >
          🗑️
        </div>

        <h3
          style={{
            fontSize: "18px",
            fontWeight: "600",
            marginBottom: "8px",
            margin: "0 0 8px 0",
          }}
        >
          Delete Chord?
        </h3>

        <p
          style={{
            color: t.textSecondary,
            fontSize: "14px",
            marginBottom: "20px",
            margin: "0 0 20px 0",
          }}
        >
          This action cannot be undone.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          <button
            onClick={onClose}
            disabled={isLoading}
            style={{
              padding: "14px",
              borderRadius: "12px",
              border: `1px solid ${t.border}`,
              background: "transparent",
              color: t.text,
              fontSize: "15px",
              fontWeight: "600",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.5 : 1,
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            style={{
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              background: t.danger,
              color: "#fff",
              fontSize: "15px",
              fontWeight: "600",
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
                  width: "14px",
                  height: "14px",
                  border: "2px solid rgba(255,255,255,0.3)",
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
