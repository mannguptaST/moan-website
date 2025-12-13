import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/effects/SmoothScroll";
import Preloader from "@/components/effects/Preloader";

export const metadata: Metadata = {
  title: "Luxe Digital | Premium Web Development Agency",
  description: "Crafting exceptional digital experiences with precision and elegance. Premium web development, UI/UX design, and e-commerce solutions.",
  keywords: ["web development", "premium", "luxury", "UI/UX", "design agency"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        <Preloader />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
