
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

// Only show error in development if variables are actually missing (not just using fallbacks)
if (!import.meta.env.VITE_SUPABASE_URL) {
  console.warn('VITE_SUPABASE_URL is missing. Using placeholder value. Supabase functionality will not work.');
}

if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('VITE_SUPABASE_ANON_KEY is missing. Using placeholder value. Supabase functionality will not work.');
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
