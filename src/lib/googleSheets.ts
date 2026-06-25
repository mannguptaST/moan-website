interface WaitlistEntry {
    email: string;
    phone?: string;
    gender?: string;
    source?: string;
}

export async function submitToGoogleSheet(entry: WaitlistEntry): Promise<void> {
    try {
        await fetch("/api/waitlist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: entry.email,
                phone: entry.phone ?? "",
                gender: entry.gender ?? "",
                source: entry.source ?? "website",
            }),
        });
    } catch {
        // Never block the user flow on sheet errors
    }
}
