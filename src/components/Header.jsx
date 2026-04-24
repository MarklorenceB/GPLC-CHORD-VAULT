import React, { useState } from "react";
import { MUSICAL_KEYS } from "../styles/theme";
import Icon from "./Icon";

const Header = ({
  theme: t,
  darkMode,
  toggleDarkMode,
  searchQuery,
  setSearchQuery,
  filterKey,
  setFilterKey,
  activeTab,
  setActiveTab,
  totalCount,
  favoritesCount,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: `linear-gradient(to bottom, ${t.surface} 60%, ${t.surface}e6)`,
        borderBottom: `1px solid ${t.rule}`,
        backdropFilter: "blur(20px) saturate(1.4)",
        WebkitBackdropFilter: "blur(20px) saturate(1.4)",
      }}
    >
      {/* Masthead */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px 10px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "12px", minWidth: 0 }}>
          <div
            aria-hidden
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontStyle: "italic",
              fontVariationSettings: '"opsz" 144, "SOFT" 80',
              fontSize: "30px",
              lineHeight: 0.9,
              color: t.accent,
              letterSpacing: "-0.03em",
            }}
          >
            G
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", minWidth: 0 }}>
            <span
              className="eyebrow"
              style={{ color: t.textTertiary, fontSize: "9px" }}
            >
              Established · GPLC
            </span>
            <span
              className="wordmark"
              style={{
                fontSize: "20px",
                color: t.text,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Worship Chords
            </span>
          </div>
        </div>

        <button
          onClick={toggleDarkMode}
          aria-label={darkMode ? "Switch to daylight" : "Switch to candlelight"}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "999px",
            border: `1px solid ${t.border}`,
            background: t.bg,
            color: t.accent,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.3s var(--ease-out), background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = t.surfaceHover)}
          onMouseLeave={(e) => (e.currentTarget.style.background = t.bg)}
        >
          <Icon name={darkMode ? "sun" : "moon"} size={18} />
        </button>
      </div>

      {/* Ornamental rule */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: t.ornament,
          opacity: 0.55,
          marginBottom: "14px",
        }}
      >
        <span style={{ flex: 1, height: "1px", background: "currentColor", opacity: 0.4 }} />
        <span style={{ fontSize: "9px", letterSpacing: "0.25em" }}>✦</span>
        <span style={{ flex: 1, height: "1px", background: "currentColor", opacity: 0.4 }} />
      </div>

      {/* Search */}
      <div
        style={{
          padding: "0 20px 14px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: t.textTertiary,
                pointerEvents: "none",
              }}
            >
              <Icon name="search" size={16} />
            </span>
            <input
              type="text"
              placeholder="Search hymns, artists, progressions…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "13px 16px 13px 44px",
                borderRadius: "12px",
                border: `1px solid ${t.border}`,
                background: t.bg,
                color: t.text,
                fontSize: "15px",
                outline: "none",
                transition: "border-color 0.2s, box-shadow 0.2s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = t.accent;
                e.target.style.boxShadow = `0 0 0 3px ${t.accentSoft}`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = t.border;
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            aria-label="Toggle filters"
            aria-expanded={showFilters}
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "12px",
              border: `1px solid ${showFilters || filterKey ? t.accent : t.border}`,
              background: showFilters || filterKey ? t.accentSoft : t.bg,
              color: showFilters || filterKey ? t.accent : t.text,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "all 0.2s",
            }}
          >
            <Icon name="sliders" size={18} />
          </button>
        </div>

        {showFilters && (
          <div
            style={{
              marginTop: "14px",
              padding: "16px",
              background: t.bg,
              borderRadius: "14px",
              border: `1px solid ${t.border}`,
              animation: "scaleIn 0.2s var(--ease-out)",
            }}
          >
            <label
              className="eyebrow"
              style={{
                display: "block",
                color: t.textSecondary,
                marginBottom: "10px",
              }}
            >
              · Filter by Key ·
            </label>
            <select
              value={filterKey}
              onChange={(e) => setFilterKey(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "10px",
                border: `1px solid ${t.border}`,
                background: t.surface,
                color: t.text,
                fontSize: "15px",
                fontFamily: "var(--font-display)",
                cursor: "pointer",
              }}
            >
              <option value="">All Keys</option>
              {MUSICAL_KEYS.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          padding: "0 20px",
          gap: "28px",
          maxWidth: "1400px",
          margin: "0 auto",
          borderTop: `1px solid ${t.rule}`,
        }}
      >
        {[
          { id: "all", label: "All Songs", count: totalCount },
          { id: "favorites", label: "Line Up", count: favoritesCount },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "14px 0 12px",
                background: "none",
                border: "none",
                borderBottom: `2px solid ${isActive ? t.accent : "transparent"}`,
                color: isActive ? t.text : t.textSecondary,
                cursor: "pointer",
                display: "flex",
                alignItems: "baseline",
                gap: "8px",
                transition: "color 0.2s",
                position: "relative",
                marginTop: "-1px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "17px",
                  fontWeight: isActive ? 500 : 400,
                  fontStyle: isActive ? "italic" : "normal",
                  letterSpacing: "-0.01em",
                }}
              >
                {tab.label}
              </span>
              <span
                className="catalog-num"
                style={{
                  fontSize: "11px",
                  color: isActive ? t.accent : t.textTertiary,
                }}
              >
                {String(tab.count).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>
    </header>
  );
};

export default Header;
