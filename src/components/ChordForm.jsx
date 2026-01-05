// components/ChordForm.jsx
// ═══════════════════════════════════════════════════════════════════════════
// CHORD FORM COMPONENT - Bottom sheet modal for add/edit
// ═══════════════════════════════════════════════════════════════════════════

import React, { useState, useEffect } from "react";
import { MUSICAL_KEYS } from "../styles/theme";

const ChordForm = ({
  theme: t,
  isOpen,
  onClose,
  onSubmit,
  editingChord,
  isLoading,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    key: "C",
    capo: "",
    progression: "",
  });

  // Reset form when opening/closing or editing different chord
  useEffect(() => {
    if (editingChord) {
      setFormData({
        title: editingChord.title,
        artist: editingChord.artist,
        key: editingChord.key,
        capo: editingChord.capo || "",
        progression: editingChord.progression,
      });
    } else {
      setFormData({
        title: "",
        artist: "",
        key: "C",
        capo: "",
        progression: "",
      });
    }
  }, [editingChord, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
        zIndex: 200,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "600px",
          maxHeight: "90vh",
          background: t.surface,
          borderRadius: "24px 24px 0 0",
          overflow: "hidden",
          animation: "slideUp 0.3s ease",
        }}
      >
        {/* Handle */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "12px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "4px",
              background: t.border,
              borderRadius: "2px",
            }}
          />
        </div>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px 16px",
            borderBottom: `1px solid ${t.border}`,
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "700",
              margin: 0,
            }}
          >
            {editingChord ? "Edit Chord" : "Add New Chord"}
          </h2>
          <button
            onClick={onClose}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              border: "none",
              background: t.surfaceHover,
              color: t.textSecondary,
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            padding: "20px",
            overflowY: "auto",
            maxHeight: "calc(90vh - 140px)",
          }}
        >
          {/* Title */}
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "600",
                color: t.textSecondary,
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Song Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter song title"
              required
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: "12px",
                border: `1px solid ${t.border}`,
                background: t.bg,
                color: t.text,
                fontSize: "16px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Artist */}
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "600",
                color: t.textSecondary,
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Artist *
            </label>
            <input
              type="text"
              value={formData.artist}
              onChange={(e) =>
                setFormData({ ...formData, artist: e.target.value })
              }
              placeholder="Enter artist name"
              required
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: "12px",
                border: `1px solid ${t.border}`,
                background: t.bg,
                color: t.text,
                fontSize: "16px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Key & Capo Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: t.textSecondary,
                  marginBottom: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Key
              </label>
              <select
                value={formData.key}
                onChange={(e) =>
                  setFormData({ ...formData, key: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  border: `1px solid ${t.border}`,
                  background: t.bg,
                  color: t.text,
                  fontSize: "16px",
                  cursor: "pointer",
                  boxSizing: "border-box",
                }}
              >
                {MUSICAL_KEYS.map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: t.textSecondary,
                  marginBottom: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Capo
              </label>
              <input
                type="text"
                value={formData.capo}
                onChange={(e) =>
                  setFormData({ ...formData, capo: e.target.value })
                }
                placeholder="e.g., 2"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  border: `1px solid ${t.border}`,
                  background: t.bg,
                  color: t.text,
                  fontSize: "16px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* Progression */}
          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "600",
                color: t.textSecondary,
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Chord Progression *
            </label>
            <textarea
              value={formData.progression}
              onChange={(e) =>
                setFormData({ ...formData, progression: e.target.value })
              }
              placeholder={"Verse: G  Em  C  D\nChorus: C  G  Am  F"}
              required
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: "12px",
                border: `1px solid ${t.border}`,
                background: t.bg,
                color: t.text,
                fontSize: "15px",
                fontFamily: "'JetBrains Mono', monospace",
                lineHeight: "1.6",
                minHeight: "160px",
                resize: "vertical",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              style={{
                padding: "16px",
                borderRadius: "12px",
                border: `1px solid ${t.border}`,
                background: "transparent",
                color: t.text,
                fontSize: "16px",
                fontWeight: "600",
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.5 : 1,
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                padding: "16px",
                borderRadius: "12px",
                border: "none",
                background: t.accent,
                color: "#fff",
                fontSize: "16px",
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
                    width: "16px",
                    height: "16px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "#fff",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
              )}
              {editingChord ? "Save Changes" : "Add Chord"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChordForm;
