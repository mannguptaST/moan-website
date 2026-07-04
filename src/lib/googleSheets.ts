interface WaitlistEntry {
    email: string;
    phone?: string;
    gender?: string; // kept for backward compat
    mood?: string;   // "what mood are you buying for?"
    source?: string;
}

export async function submitToGoogleSheet(entry: WaitlistEntry): Promise<boolean> {
    try {
        const res = await fetch("/api/waitlist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: entry.email,
                phone: entry.phone ?? "",
                gender: entry.gender ?? "",
                source: entry.source ?? "website",
            }),
        });
        return res.ok;
    } catch {
        // Network error — don't block user flow but return false
        return false;
    }
}

