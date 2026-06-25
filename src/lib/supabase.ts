import { createBrowserClient } from "@supabase/ssr";

/**
 * Returns a Supabase browser client, or null if env vars aren't configured.
 * The site runs on localStorage auth when Supabase isn't set up.
 */
export function createClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    return createBrowserClient(url, key);
}
