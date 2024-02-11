
import { createClient } from '@supabase/supabase-js'

const supabaseURL : string = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey : string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseURL, supabaseAnonKey);