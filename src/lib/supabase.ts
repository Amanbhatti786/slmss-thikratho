import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://jlzjnrvgtjqewhkitcqa.supabase.co';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_pvOaH891vuZNpgMVn2hSog_4sx6GQZk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
