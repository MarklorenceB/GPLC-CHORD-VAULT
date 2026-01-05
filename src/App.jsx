// App.jsx
// ═══════════════════════════════════════════════════════════════════════════
// CHORD VAULT - Main Application Component
// ═══════════════════════════════════════════════════════════════════════════

import React, { useState, useMemo } from "react";
import "./styles/globals.css";

// Hooks
import { useChords } from "./hooks/useChords";
import { useTheme } from "./hooks/useTheme";

// Components
import {
  Header,
  ChordCard,
  ChordForm,
  DeleteModal,
  EmptyState,
  FloatingButton,
  Loading,
  ErrorMessage,
} from "./components";

function App() {
  // ─────────────────────────────────────────────────────────────────────────
  // STATE & HOOKS
  // ─────────────────────────────────────────────────────────────────────────
  const { darkMode, theme, toggleDarkMode } = useTheme();
  const {
    chords,
    loading,
    error,
    addChord,
    updateChord,
    deleteChord,
    toggleFavorite,
    refetch,
  } = useChords();

  // UI State
  const [searchQuery, setSearchQuery] = useState("");
  const [filterKey, setFilterKey] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [expandedCard, setExpandedCard] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Modal State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingChord, setEditingChord] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ─────────────────────────────────────────────────────────────────────────
  // FILTERED CHORDS
  // ─────────────────────────────────────────────────────────────────────────
  const filteredChords = useMemo(() => {
    return chords.filter((chord) => {
      const matchesSearch =
        !searchQuery ||
        chord.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chord.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chord.progression.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesKey = !filterKey || chord.key === filterKey;
      const matchesFavorite = activeTab === "all" ? true : chord.favorite;

      return matchesSearch && matchesKey && matchesFavorite;
    });
  }, [chords, searchQuery, filterKey, activeTab]);

  // ─────────────────────────────────────────────────────────────────────────
  // HANDLERS
  // ─────────────────────────────────────────────────────────────────────────
  const handleOpenAddForm = () => {
    setEditingChord(null);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (chord) => {
    setEditingChord(chord);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingChord(null);
  };

  const handleSubmitForm = async (formData) => {
    setIsSubmitting(true);

    if (editingChord) {
      await updateChord(editingChord.id, formData);
    } else {
      await addChord(formData);
    }

    setIsSubmitting(false);
    handleCloseForm();
  };

  const handleDeleteClick = (id) => {
    setDeleteConfirmId(id);
  };

  const handleConfirmDelete = async () => {
    if (deleteConfirmId) {
      setIsSubmitting(true);
      await deleteChord(deleteConfirmId);
      setIsSubmitting(false);
      setDeleteConfirmId(null);
      setExpandedCard(null);
    }
  };

  const handleToggleFavorite = async (id) => {
    await toggleFavorite(id);
  };

  const handleCopy = async (id, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleToggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.bg,
        color: theme.text,
        paddingBottom: "80px",
        transition: "background 0.3s ease",
      }}
    >
      {/* Header */}
      <Header
        theme={theme}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterKey={filterKey}
        setFilterKey={setFilterKey}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalCount={chords.length}
        favoritesCount={chords.filter((c) => c.favorite).length}
      />

      {/* Main Content */}
      <main
        style={{
          padding: "16px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Loading State */}
        {loading && <Loading theme={theme} />}

        {/* Error State */}
        {error && !loading && (
          <ErrorMessage theme={theme} message={error} onRetry={refetch} />
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            {filteredChords.length > 0 ? (
              <div
                className="grid-cards"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "12px",
                }}
              >
                {filteredChords.map((chord) => (
                  <ChordCard
                    key={chord.id}
                    chord={chord}
                    theme={theme}
                    isExpanded={expandedCard === chord.id}
                    onToggleExpand={() => handleToggleExpand(chord.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onEdit={handleOpenEditForm}
                    onDelete={handleDeleteClick}
                    onCopy={handleCopy}
                    copiedId={copiedId}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                theme={theme}
                hasChords={chords.length > 0}
                onAddClick={handleOpenAddForm}
              />
            )}
          </>
        )}
      </main>

      {/* Floating Action Button */}
      <FloatingButton theme={theme} onClick={handleOpenAddForm} />

      {/* Add/Edit Form Modal */}
      <ChordForm
        theme={theme}
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
        editingChord={editingChord}
        isLoading={isSubmitting}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        theme={theme}
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleConfirmDelete}
        isLoading={isSubmitting}
      />
    </div>
  );
}

export default App;
