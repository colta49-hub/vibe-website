import { createClient } from '@supabase/supabase-js'

// Client cu service role — folosit DOAR în API routes (server-side)
// Ocolește RLS, nu expune cheia în browser
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabaseServer = createClient(supabaseUrl, serviceRoleKey)
