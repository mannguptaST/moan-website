const SHEET_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;

interface WaitlistEntry {
    email: string;
    phone?: string;
    gender?: string;
    source?: string;
}

/**
 * Submits a waitlist entry to Google Sheets via Apps Script Web App.
 * Fails silently so it never blocks the user flow.
 */
export async function submitToGoogleSheet(entry: WaitlistEntry): Promise<void> {
    if (!SHEET_URL) return;
    try {
        await fetch(SHEET_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: entry.email,
                phone: entry.phone ?? "",
                gender: entry.gender ?? "",
                source: entry.source ?? "website",
            }),
            mode: "no-cors",
        });
    } catch {
        // Never block the user flow on sheet errors
    }
}
