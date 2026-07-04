"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Instagram } from "lucide-react";

const instaTiles = [
    {
        id: 1,
        tag: "Launch Drop",
        headline: "Launching 23rd July",
        sub: "Mark your calendar. The flame is almost ready.",
        emoji: "🔥",
        accent: "#7a1c2e",
    },
    {
        id: 2,
        tag: "For Two",
        headline: "For Date Nights",
        sub: "Set the scene. Light the mood. Let the evening unfold.",
        emoji: "🌹",
        accent: "#5a1020",
    },
    {
        id: 3,
        tag: "Slow Evenings",
        headline: "For Slow Evenings",
        sub: "When the world outside goes quiet and you go still.",
        emoji: "🕯️",
        accent: "#3a0a14",
    },
    {
        id: 4,
        tag: "Exclusive Offer",
        headline: "50% Off First Order",
        sub: "Join the waitlist now. Your discount is waiting.",
        emoji: "✨",
        accent: "#7a1c2e",
    },
    {
        id: 5,
        tag: "Behind the Scenes",
        headline: "Behind the Flame",
        sub: "Hand-poured. Intentionally crafted. Made for mood.",
        emoji: "🎬",
        accent: "#4a0f1c",
    },
    {
        id: 6,
        tag: "Ritual",
        headline: "Mood Rituals by Moan",
        sub: "Self-care, ambience, and the art of being present.",
        emoji: "🛁",
        accent: "#600f22",
    },
];

export default function InstagramTiles() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-8%" });

    return (
        <section
            id="follow-the-mood"
            ref={sectionRef}
            className="relative py-24 md:py-32 overflow-hidden"
            style={{ background: "#08080a" }}
        >
            {/* Top border */}
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.25), transparent)" }}
            />

            {/* Ambient glow */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] blur-[140px] pointer-events-none opacity-15"
                style={{ background: "radial-gradient(ellipse, #7a1c2e, transparent)" }}
            />

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-14 md:mb-16"
                >
                    <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: "#7a1c2e" }}>
                        @moanofficials
                    </p>
                    <h2
                        className="font-light mb-5"
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(2rem, 5vw, 3.5rem)",
                            color: "#f0ece8",
                        }}
                    >
                        Follow the{" "}
                        <em
                            style={{
                                background: "linear-gradient(135deg, #e0c48a, #c9a96e)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                fontStyle: "italic",
                            }}
                        >
                            Mood
                        </em>
                    </h2>
                    <p className="text-sm font-light max-w-sm mx-auto" style={{ color: "#9a8e8a", fontFamily: "'Inter', sans-serif" }}>
                        A curated feed of warmth, mood, and intimate living. Follow along for the full Moan experience.
                    </p>
                </motion.div>

                {/* Tiles grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5 mb-12">
                    {instaTiles.map((tile, i) => (
                        <motion.a
                            key={tile.id}
                            href="https://www.instagram.com/moanofficials?igsh=MTZnbngzcWhxZW84bQ==&utm_source=ig_contact_invite"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 24, scale: 0.97 }}
                            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                            transition={{ duration: 0.65, delay: 0.1 + i * 0.08 }}
                            whileHover={{ y: -4, scale: 1.02 }}
                            className="group relative rounded-2xl overflow-hidden aspect-square flex flex-col justify-end p-5 cursor-pointer"
                            style={{
                                background: `linear-gradient(160deg, ${tile.accent}cc 0%, rgba(8,8,10,0.95) 100%)`,
                                border: "1px solid rgba(201,169,110,0.1)",
                            }}
                            aria-label={tile.headline}
                        >
                            {/* Instagram-style grid glow */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ background: "radial-gradient(ellipse at 30% 30%, rgba(201,169,110,0.08), transparent 70%)" }}
                            />

                            {/* Tag */}
                            <div
                                className="absolute top-4 left-4 px-3 py-1 rounded-full"
                                style={{
                                    background: "rgba(8,8,10,0.65)",
                                    border: "1px solid rgba(201,169,110,0.2)",
                                    backdropFilter: "blur(8px)",
                                }}
                            >
                                <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: "#c9a96e" }}>
                                    {tile.tag}
                                </span>
                            </div>

                            {/* Instagram icon top-right */}
                            <div className="absolute top-4 right-4 opacity-40 group-hover:opacity-80 transition-opacity duration-300">
                                <Instagram className="w-4 h-4" style={{ color: "#c9a96e" }} />
                            </div>

                            {/* Emoji */}
                            <p className="text-3xl mb-3 relative z-10">{tile.emoji}</p>

                            {/* Content */}
                            <div className="relative z-10">
                                <p
                                    className="font-light mb-1 leading-snug"
                                    style={{
                                        fontFamily: "'Cormorant Garamond', serif",
                                        fontSize: "clamp(0.9rem, 2.5vw, 1.15rem)",
                                        color: "#f0ece8",
                                    }}
                                >
                                    {tile.headline}
                                </p>
                                <p
                                    className="text-[11px] leading-relaxed font-light opacity-0 group-hover:opacity-100 transition-all duration-400"
                                    style={{ color: "#c8b9a8", fontFamily: "'Inter', sans-serif" }}
                                >
                                    {tile.sub}
                                </p>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.65 }}
                    className="text-center"
                >
                    <a
                        href="https://www.instagram.com/moanofficials?igsh=MTZnbngzcWhxZW84bQ==&utm_source=ig_contact_invite"
                        target="_blank"
                        rel="noopener noreferrer"
                        id="follow-mood-instagram-cta"
                        className="group inline-flex items-center gap-2.5 text-sm tracking-[0.12em] uppercase transition-all duration-300"
                        style={{ color: "#c9a96e" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#e0c48a")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#c9a96e")}
                    >
                        <Instagram className="w-4 h-4" />
                        <span>See More on @moanofficials</span>
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
