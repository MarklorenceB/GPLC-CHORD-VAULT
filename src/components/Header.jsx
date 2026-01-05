// components/Header.jsx
// ═══════════════════════════════════════════════════════════════════════════
// HEADER COMPONENT - App bar, search, tabs
// ═══════════════════════════════════════════════════════════════════════════

import React, { useState } from "react";
import { MUSICAL_KEYS } from "../styles/theme";

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
        background: t.surface,
        borderBottom: `1px solid ${t.border}`,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "24px" }}>🎸</span>
          <span
            style={{
              fontSize: "18px",
              fontWeight: "700",
              letterSpacing: "-0.02em",
            }}
          >
            GPLC Worship Chords
          </span>
        </div>

        <button
          onClick={toggleDarkMode}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            border: "none",
            background: t.surfaceHover,
            color: t.text,
            fontSize: "18px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      {/* Search Bar */}
      <div
        style={{
          padding: "0 16px 12px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1, position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "16px",
                opacity: 0.5,
              }}
            >
              🔍
            </span>
            <input
              type="text"
              placeholder="Search songs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 12px 12px 44px",
                borderRadius: "12px",
                border: `1px solid ${t.border}`,
                background: t.bg,
                color: t.text,
                fontSize: "16px",
                outline: "none",
              }}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              border: `1px solid ${
                showFilters || filterKey ? t.accent : t.border
              }`,
              background: showFilters || filterKey ? t.accentSoft : t.bg,
              color: showFilters || filterKey ? t.accent : t.text,
              fontSize: "18px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            ⚙️
          </button>
        </div>

        {/* Filter Dropdown */}
        {showFilters && (
          <div
            style={{
              marginTop: "12px",
              padding: "12px",
              background: t.bg,
              borderRadius: "12px",
              border: `1px solid ${t.border}`,
              animation: "scaleIn 0.2s ease",
            }}
          >
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: "600",
                color: t.textSecondary,
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Filter by Key
            </label>
            <select
              value={filterKey}
              onChange={(e) => setFilterKey(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                border: `1px solid ${t.border}`,
                background: t.surface,
                color: t.text,
                fontSize: "15px",
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

      {/* Tab Bar */}
      <div
        style={{
          display: "flex",
          padding: "0 16px",
          gap: "4px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {[
          { id: "all", label: "All Songs", icon: "🎵", count: totalCount },
          {
            id: "favorites",
            label: "Favorites",
            icon: "⭐",
            count: favoritesCount,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: "12px 16px",
              background: "none",
              border: "none",
              borderBottom: `2px solid ${
                activeTab === tab.id ? t.accent : "transparent"
              }`,
              color: activeTab === tab.id ? t.accent : t.textSecondary,
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              transition: "all 0.2s ease",
            }}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            <span
              style={{
                background: t.accentSoft,
                color: t.accent,
                padding: "2px 8px",
                borderRadius: "10px",
                fontSize: "12px",
                fontWeight: "700",
              }}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;
