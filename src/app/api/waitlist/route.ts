import { NextRequest, NextResponse } from "next/server";

const SHEET_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!SHEET_URL) {
            return NextResponse.json({ error: "Sheet URL not configured" }, { status: 500 });
        }

        const response = await fetch(SHEET_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: body.email ?? "",
                phone: body.phone ?? "",
                gender: body.gender ?? "",
                source: body.source ?? "website",
            }),
        });

        const text = await response.text();
        return NextResponse.json({ ok: true, upstream: text });
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}
