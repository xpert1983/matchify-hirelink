// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://yqphbiaxvnbysvninlih.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxcGhiaWF4dm5ieXN2bmlubGloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4MDIwNjMsImV4cCI6MjA1ODM3ODA2M30.CSak-O1aopSVM9xU3DUE1U8YWr2bf999gmuaeWDiteA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);