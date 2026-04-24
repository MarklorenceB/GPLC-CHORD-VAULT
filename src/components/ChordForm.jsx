import React, { useState, useEffect } from "react";
import { MUSICAL_KEYS } from "../styles/theme";
import Icon from "./Icon";

const labelStyle = (t) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontFamily: "var(--font-ui)",
  fontSize: "10px",
  fontWeight: 700,
  color: t.textSecondary,
  marginBottom: "8px",
  textTransform: "uppercase",
  letterSpacing: "0.18em",
});

const inputStyle = (t) => ({
  width: "100%",
  padding: "13px 16px",
  borderRadius: "12px",
  border: `1px solid ${t.border}`,
  background: t.bg,
  color: t.text,
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s, box-shadow 0.2s",
});

const focusOn = (t) => (e) => {
  e.target.style.borderColor = t.accent;
  e.target.style.boxShadow = `0 0 0 3px ${t.accentSoft}`;
};
const focusOff = (t) => (e) => {
  e.target.style.borderColor = t.border;
  e.target.style.boxShadow = "none";
};

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
        background: "rgba(12, 9, 6, 0.55)",
        backdropFilter: "blur(6px)",
        zIndex: 200,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        animation: "fadeIn 0.25s var(--ease-out)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "560px",
          maxHeight: "92vh",
          background: t.surface,
          borderRadius: "24px 24px 0 0",
          overflow: "hidden",
          animation: "slideUp 0.35s var(--ease-out)",
          boxShadow: "0 -20px 60px -10px rgba(0,0,0,0.4)",
          borderTop: `1px solid ${t.borderLight}`,
        }}
      >
        {/* Handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
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
            alignItems: "flex-start",
            justifyContent: "space-between",
            padding: "0 24px 18px",
            borderBottom: `1px solid ${t.rule}`,
          }}
        >
          <div>
            <div
              className="eyebrow"
              style={{ color: t.ornament, marginBottom: "6px" }}
            >
              {editingChord ? "· Revise ·" : "· New Entry ·"}
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "26px",
                fontWeight: 400,
                fontStyle: "italic",
                fontVariationSettings: '"opsz" 72, "SOFT" 60',
                letterSpacing: "-0.02em",
                margin: 0,
                color: t.text,
              }}
            >
              {editingChord ? "Edit Chord" : "Add New Chord"}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              border: `1px solid ${t.border}`,
              background: t.bg,
              color: t.textSecondary,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon name="close" size={16} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            padding: "22px 24px 24px",
            overflowY: "auto",
            maxHeight: "calc(92vh - 150px)",
          }}
        >
          <div style={{ marginBottom: "18px" }}>
            <label style={labelStyle(t)}>
              <span style={{ color: t.ornament }}>—</span> Song Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Great is Thy Faithfulness"
              required
              style={{
                ...inputStyle(t),
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                fontWeight: 500,
              }}
              onFocus={focusOn(t)}
              onBlur={focusOff(t)}
            />
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label style={labelStyle(t)}>
              <span style={{ color: t.ornament }}>—</span> Artist *
            </label>
            <input
              type="text"
              value={formData.artist}
              onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
              placeholder="e.g. Hillsong Worship"
              required
              style={inputStyle(t)}
              onFocus={focusOn(t)}
              onBlur={focusOff(t)}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "14px",
              marginBottom: "18px",
            }}
          >
            <div>
              <label style={labelStyle(t)}>
                <span style={{ color: t.ornament }}>—</span> Key
              </label>
              <select
                value={formData.key}
                onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                style={{
                  ...inputStyle(t),
                  fontFamily: "var(--font-display)",
                  cursor: "pointer",
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
              <label style={labelStyle(t)}>
                <span style={{ color: t.ornament }}>—</span> Capo
              </label>
              <input
                type="text"
                value={formData.capo}
                onChange={(e) => setFormData({ ...formData, capo: e.target.value })}
                placeholder="2"
                style={inputStyle(t)}
                onFocus={focusOn(t)}
                onBlur={focusOff(t)}
              />
            </div>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle(t)}>
              <span style={{ color: t.ornament }}>—</span> Chord Progression *
            </label>
            <textarea
              value={formData.progression}
              onChange={(e) => setFormData({ ...formData, progression: e.target.value })}
              placeholder={"Verse:    G   Em   C   D\nChorus:   C   G   Am  F"}
              required
              style={{
                ...inputStyle(t),
                fontFamily: "var(--font-mono)",
                fontSize: "14px",
                lineHeight: 1.75,
                minHeight: "170px",
                resize: "vertical",
              }}
              onFocus={focusOn(t)}
              onBlur={focusOff(t)}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "12px" }}>
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              style={{
                padding: "15px",
                borderRadius: "12px",
                border: `1px solid ${t.border}`,
                background: "transparent",
                color: t.text,
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.04em",
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
                padding: "15px",
                borderRadius: "12px",
                border: "none",
                background: t.accent,
                color: t.accentInk,
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.04em",
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.7 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                transition: "transform 0.15s",
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {isLoading && (
                <span
                  style={{
                    width: "14px",
                    height: "14px",
                    border: `2px solid ${t.accentInk}`,
                    borderTopColor: "transparent",
                    opacity: 0.7,
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
              )}
              <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "16px", fontWeight: 500 }}>
                {editingChord ? "Save Changes" : "Add Chord"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChordForm;
