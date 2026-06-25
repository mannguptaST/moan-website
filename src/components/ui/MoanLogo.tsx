"use client";

import Image from "next/image";

interface MoanLogoProps {
    fontSize?: string;       // kept for backward-compat (controls image height proportionally)
    glowSize?: string;
    className?: string;
    showTagline?: boolean;
    tagline?: string;
    /** px height of the logo image. Defaults to 48 */
    height?: number;
}

export default function MoanLogo({
    glowSize = "180px",
    className = "",
    showTagline = false,
    tagline = "Light the Mood",
    height = 48,
}: MoanLogoProps) {
    // The image is naturally ~680×160 px, so width = height * (680/160)
    const aspectRatio = 680 / 160;
    const width = Math.round(height * aspectRatio);

    return (
        <div className={`relative inline-flex flex-col items-center justify-center ${className}`}>

            {/* Outer ambient haze */}
            <div
                aria-hidden
                style={{
                    position: "absolute",
                    width: `calc(${glowSize} * 2.2)`,
                    height: `calc(${glowSize} * 0.9)`,
                    background:
                        "radial-gradient(ellipse at 42% 50%, rgba(224,196,120,0.13) 0%, rgba(201,169,110,0.07) 40%, transparent 70%)",
                    filter: "blur(22px)",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -52%)",
                    pointerEvents: "none",
                }}
            />

            {/* Inner warm core */}
            <div
                aria-hidden
                style={{
                    position: "absolute",
                    width: `calc(${glowSize} * 0.85)`,
                    height: `calc(${glowSize} * 0.45)`,
                    background:
                        "radial-gradient(ellipse at 38% 50%, rgba(242,216,148,0.28) 0%, rgba(220,186,110,0.12) 45%, transparent 72%)",
                    filter: "blur(10px)",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-52%, -52%)",
                    pointerEvents: "none",
                }}
            />

            {/* Logo image */}
            <Image
                src="/images/moan-logo.png"
                alt="Moan"
                width={width}
                height={height}
                priority
                style={{
                    position: "relative",
                    objectFit: "contain",
                    // Subtle drop-shadow to reinforce the gold glow
                    filter: "drop-shadow(0 0 6px rgba(240,210,140,0.45)) drop-shadow(0 0 20px rgba(212,175,100,0.18))",
                }}
            />

            {/* Optional tagline */}
            {showTagline && (
                <span
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: `${Math.round(height * 0.22)}px`,
                        letterSpacing: "0.38em",
                        textTransform: "uppercase",
                        color: "#c9a96e",
                        marginTop: "0.55em",
                        position: "relative",
                        opacity: 0.75,
                        fontWeight: 300,
                    }}
                >
                    {tagline}
                </span>
            )}
        </div>
    );
}
