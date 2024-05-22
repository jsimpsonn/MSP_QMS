declare module '@supabase/supabase-js' {
    export type SupabaseClient = any;
  
    export function createClient(
      supabaseUrl: string,
      supabaseKey: string
    ): SupabaseClient;
  }
  