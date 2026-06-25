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
  title: "Moan — Light the Mood. Premium Mood Candles.",
  description:
    "Moan is a premium mood candle brand crafted to turn ordinary nights into intimate, unforgettable moments. Discover the art of atmosphere.",
  keywords: [
    "luxury candles",
    "mood candles",
    "romantic candles",
    "premium candles",
    "Moan candle",
    "intimate atmosphere",
    "scented candles India",
  ],
  openGraph: {
    title: "Moan — Light the Mood.",
    description:
      "A premium mood candle crafted to turn ordinary nights into intimate, unforgettable moments.",
    type: "website",
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
