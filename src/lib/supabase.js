// lib/supabase.js
// ═══════════════════════════════════════════════════════════════════════════
// SUPABASE CLIENT SETUP
// ═══════════════════════════════════════════════════════════════════════════
//
// SETUP INSTRUCTIONS:
// 1. Go to https://supabase.com and create a free account
// 2. Create a new project
// 3. Go to Settings > API and copy your URL and anon key
// 4. Replace the values below
// 5. Go to SQL Editor and run this query to create the table:
//
// CREATE TABLE chords (
//   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//   title TEXT NOT NULL,
//   artist TEXT NOT NULL,
//   key TEXT NOT NULL,
//   capo TEXT,
//   progression TEXT NOT NULL,
//   favorite BOOLEAN DEFAULT false,
//   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
//   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
// );
//
// -- Enable Row Level Security (optional but recommended)
// ALTER TABLE chords ENABLE ROW LEVEL SECURITY;
//
// -- Allow all operations for now (customize based on your auth needs)
// CREATE POLICY "Allow all" ON chords FOR ALL USING (true);
//
// ═══════════════════════════════════════════════════════════════════════════

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bdojudsunnfodlypugbc.supabase.co"; // e.g., https://xxxxx.supabase.co
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkb2p1ZHN1bm5mb2RseXB1Z2JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1OTk3MzIsImV4cCI6MjA4MzE3NTczMn0.Zi5M-JP6bj00zEKzc8sMBx0zoNI8ai-vXsdZZuMcTWY"; // Your anon/public key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
