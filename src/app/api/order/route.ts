import { NextRequest, NextResponse } from "next/server";

// Reuses the same Google Sheet webhook as the waitlist form, tagged with
// source: "order". The Apps Script backing this URL should be updated to
// persist the `items`/`address`/`total` fields for real order tracking —
// today it may only be reading the waitlist-shaped fields.
const SHEET_URL =
    process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL?.replace(/^﻿/, "") ||
    "https://script.google.com/macros/s/AKfycbxO8JHissOOFwaqel-v5spot8LX4C52PCeXmQ_uO1d8eaiw7o5fnTpY-Ag-JCZx1CIdYw/exec";

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
                source: "order",
                name: body.name ?? "",
                email: body.email ?? "",
                phone: body.phone ?? "",
                address: body.address ?? "",
                city: body.city ?? "",
                pincode: body.pincode ?? "",
                paymentMethod: body.paymentMethod ?? "",
                items: JSON.stringify(body.items ?? []),
                subtotal: body.subtotal ?? 0,
                timestamp: new Date().toISOString(),
            }),
        });

        const text = await response.text();
        if (!response.ok) {
            return NextResponse.json({ error: "Upstream error", upstream: text }, { status: response.status });
        }
        return NextResponse.json({ ok: true, upstream: text });
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}
