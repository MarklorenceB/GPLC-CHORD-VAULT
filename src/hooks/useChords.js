// hooks/useChords.js
// ═══════════════════════════════════════════════════════════════════════════
// CUSTOM HOOK FOR CHORD CRUD OPERATIONS WITH SUPABASE
// ═══════════════════════════════════════════════════════════════════════════

import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";

export const useChords = () => {
  const [chords, setChords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ─────────────────────────────────────────────────────────────────────────
  // FETCH ALL CHORDS
  // ─────────────────────────────────────────────────────────────────────────
  const fetchChords = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("chords")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setChords(data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching chords:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // ADD NEW CHORD
  // ─────────────────────────────────────────────────────────────────────────
  const addChord = async (chordData) => {
    try {
      setError(null);

      const newChord = {
        title: chordData.title,
        artist: chordData.artist,
        key: chordData.key,
        capo: chordData.capo || null,
        progression: chordData.progression,
        favorite: false,
      };

      const { data, error } = await supabase
        .from("chords")
        .insert([newChord])
        .select()
        .single();

      if (error) throw error;

      setChords((prev) => [data, ...prev]);
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      console.error("Error adding chord:", err);
      return { success: false, error: err.message };
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // UPDATE CHORD
  // ─────────────────────────────────────────────────────────────────────────
  const updateChord = async (id, chordData) => {
    try {
      setError(null);

      const updates = {
        title: chordData.title,
        artist: chordData.artist,
        key: chordData.key,
        capo: chordData.capo || null,
        progression: chordData.progression,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("chords")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      setChords((prev) => prev.map((c) => (c.id === id ? data : c)));
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      console.error("Error updating chord:", err);
      return { success: false, error: err.message };
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // DELETE CHORD
  // ─────────────────────────────────────────────────────────────────────────
  const deleteChord = async (id) => {
    try {
      setError(null);

      const { error } = await supabase.from("chords").delete().eq("id", id);

      if (error) throw error;

      setChords((prev) => prev.filter((c) => c.id !== id));
      return { success: true };
    } catch (err) {
      setError(err.message);
      console.error("Error deleting chord:", err);
      return { success: false, error: err.message };
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // TOGGLE FAVORITE
  // ─────────────────────────────────────────────────────────────────────────
  const toggleFavorite = async (id) => {
    try {
      setError(null);

      const chord = chords.find((c) => c.id === id);
      if (!chord) return { success: false, error: "Chord not found" };

      const { data, error } = await supabase
        .from("chords")
        .update({ favorite: !chord.favorite })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      setChords((prev) => prev.map((c) => (c.id === id ? data : c)));
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      console.error("Error toggling favorite:", err);
      return { success: false, error: err.message };
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // INITIAL FETCH
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    fetchChords();
  }, [fetchChords]);

  return {
    chords,
    loading,
    error,
    addChord,
    updateChord,
    deleteChord,
    toggleFavorite,
    refetch: fetchChords,
  };
};
