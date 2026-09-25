
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: any;

// Safe initialization
if (supabaseUrl && supabaseUrl.startsWith('http') && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('Supabase credentials missing or invalid. Supabase functionality disabled.');
  // Mock client to prevent crashes
  supabase = {
    from: () => ({
      select: () => Promise.resolve({ data: [], error: new Error('Supabase not configured') }),
      insert: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    }),
  };
}

export { supabase };
