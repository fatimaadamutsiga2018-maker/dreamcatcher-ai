import { createClient as supabaseCreateClient } from '@supabase/supabase-js';

/**
 * Supabase client using service_role key.
 * Use ONLY in server-side API routes where Better Auth has already
 * verified the user session. Never expose this client to the browser.
 */
export function createServiceClient() {
  return supabaseCreateClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}
