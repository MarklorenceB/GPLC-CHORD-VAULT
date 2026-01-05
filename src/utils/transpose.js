// utils/transpose.js
// ═══════════════════════════════════════════════════════════════════════════
// CHORD TRANSPOSITION UTILITY
// ═══════════════════════════════════════════════════════════════════════════

const SHARP_MAP = {
  C: 0,
  "C#": 1,
  D: 2,
  "D#": 3,
  E: 4,
  F: 5,
  "F#": 6,
  G: 7,
  "G#": 8,
  A: 9,
  "A#": 10,
  B: 11,
};

const FLAT_MAP = {
  C: 0,
  Db: 1,
  D: 2,
  Eb: 3,
  E: 4,
  F: 5,
  Gb: 6,
  G: 7,
  Ab: 8,
  A: 9,
  Bb: 10,
  B: 11,
};

const SHARPS = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

// Regex to match chord patterns like Am7, Cmaj9, F#dim, etc.
const CHORD_REGEX =
  /\b([A-G][#b]?)(m|maj|min|dim|aug|sus|add|7|9|11|13|M|°|ø|\/[A-G][#b]?)*\b/g;

/**
 * Transpose a chord progression by a number of semitones
 * @param {string} progression - The chord progression text
 * @param {number} semitones - Number of semitones to transpose (-11 to +11)
 * @returns {string} - Transposed chord progression
 */
export const transposeChord = (progression, semitones) => {
  if (semitones === 0) return progression;

  return progression.replace(CHORD_REGEX, (match) => {
    const root = match.match(/^[A-G][#b]?/)?.[0];
    if (!root) return match;

    const suffix = match.slice(root.length);
    const isFlat = root.includes("b");
    const semitone = isFlat ? FLAT_MAP[root] : SHARP_MAP[root];

    if (semitone === undefined) return match;

    const newSemitone = (semitone + semitones + 12) % 12;
    return SHARPS[newSemitone] + suffix;
  });
};

/**
 * Generate a unique ID for new chords
 * @returns {string} - Unique identifier
 */
export const generateId = () => {
  return `chord_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
