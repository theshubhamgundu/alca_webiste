import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://localhost:54321';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'dummy-anon-key';

// Warn if using fallback values (only in development)
if (import.meta.env.PROD) {
  // In production, we should not fall back - throw error to alert misconfiguration
  if (!import.meta.env.VITE_SUPABASE_URL) {
    throw new Error("VITE_SUPABASE_URL is missing from your environment variables.");
  }
  if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
    throw new Error("VITE_SUPABASE_ANON_KEY is missing from your environment variables.");
  }
} else {
  // Development: warn if using fallback
  if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    console.warn('Supabase environment variables are missing. Using local fallback. This is only for development.');
  }
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);