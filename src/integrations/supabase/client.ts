
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://jgfsyayitqlelvtjresx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnZnN5YXlpdHFsZWx2dGpyZXN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4OTcyMzMsImV4cCI6MjA2MjQ3MzIzM30.DUEdiSMKwd8BSZsNMK_EHMJK_RDo-LAo7YEP_4rGo7E";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true
    },
    // Fixed: Remove incorrect realtime config options
    realtime: {}
  }
);
