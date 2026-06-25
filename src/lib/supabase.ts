import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase browser client — safe to use in Client Components and hooks.
 * Uses @supabase/ssr so cookies are handled correctly for SSR/hydration.
 */
export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
}
