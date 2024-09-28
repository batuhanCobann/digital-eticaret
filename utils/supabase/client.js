// import { createBrowserClient } from '@supabase/ssr'

// export function createClient() {
//   return createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
//   )
// }


// utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Supabase URL'nizi buraya ekleyin
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Supabase Anon Key'nizi buraya ekleyin

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
