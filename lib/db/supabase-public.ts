import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "placeholder-anon-key";

export const isSupabasePublicConfigured = Boolean(
  process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY
);

export function getPublicSupabase(): SupabaseClient {
  return createClient(supabaseUrl, supabaseAnonKey);
}
