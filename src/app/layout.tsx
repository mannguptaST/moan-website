import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/effects/SmoothScroll";
import Preloader from "@/components/effects/Preloader";
import { AuthProvider } from "@/context/AuthContext";
import AuthModal from "@/components/ui/AuthModal";
import WaitlistPopup from "@/components/ui/WaitlistPopup";
import CustomCursor from "@/components/effects/CustomCursor";
import ClickRipple from "@/components/effects/ClickRipple";

export const metadata: Metadata = {
  title: "Moan | Premium Mood Candles for Intimate Evenings",
  description:
    "Moan is a premium mood candle brand crafted for romantic nights, self-care rituals, warm ambience, and intimate spaces. Launching 23rd July 2026. Join the waitlist and get 50% off your first order.",
  keywords: [
    "luxury candles",
    "mood candles",
    "romantic candles",
    "premium candles",
    "Moan candle",
    "intimate atmosphere",
    "scented candles India",
    "date night candles",
    "self-care candles",
    "bedroom ambience",
    "natural wax candles",
    "mood candles India",
  ],
  icons: {
    icon: [
      { url: "/images/moan-icon.png", type: "image/png", sizes: "512x512" },
      { url: "/images/moan-icon.png", type: "image/png", sizes: "192x192" },
      { url: "/images/moan-icon.png", type: "image/png", sizes: "32x32" },
      { url: "/images/moan-icon.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/images/moan-icon.png", type: "image/png", sizes: "180x180" },
    ],
    shortcut: "/images/moan-icon.png",
  },
  openGraph: {
    title: "Moan | Premium Mood Candles for Intimate Evenings",
    description:
      "A premium mood candle crafted for romantic nights, self-care rituals, and intimate spaces. Launching 23rd July 2026 — Get 50% off your first order.",
    type: "website",
    url: "https://moanworld.com",
    siteName: "Moan",
    images: [
      {
        url: "https://moanworld.com/images/moan-og.png",
        width: 1200,
        height: 630,
        alt: "Moan — Premium Mood Candles. Light the Mood.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moan | Premium Mood Candles for Intimate Evenings",
    description: "Launching 23rd July 2026. Join the waitlist and get 50% off your first order.",
    images: ["https://moanworld.com/images/moan-og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        <AuthProvider>
          <CustomCursor />
          <ClickRipple />
          <Preloader />
          <AuthModal />
          <WaitlistPopup />
          <SmoothScroll>{children}</SmoothScroll>
        </AuthProvider>
      </body>
    </html>
  );
}
