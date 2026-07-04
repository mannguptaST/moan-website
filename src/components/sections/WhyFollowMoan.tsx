"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Instagram } from "lucide-react";

const followReasons = [
    {
        icon: "🕯️",
        title: "Romantic Room Ideas",
        desc: "Transform any space into an intimate atmosphere. Styling tips, scent pairings, and mood setups delivered to your feed.",
    },
    {
        icon: "🌹",
        title: "Date Night Mood Setups",
        desc: "Curated setups for evenings that deserve to be felt. From the lighting to the scent — we help you set the scene.",
    },
    {
        icon: "✨",
        title: "Candle Styling Inspiration",
        desc: "Beautiful, editorial-style content showing how to style your Moan candle for maximum visual and sensory impact.",
    },
    {
        icon: "🎬",
        title: "Behind the Flame",
        desc: "Watch how Moan candles are hand-poured, fragranced, and finished. An intimate look at the craft behind every jar.",
    },
    {
        icon: "🎁",
        title: "Launch Offers & Limited Drops",
        desc: "Followers get first access to limited drops, early-bird offers, and exclusive launch codes before they go public.",
    },
    {
        icon: "🛁",
        title: "Self-Care & Intimate Evening Ideas",
        desc: "Slow down rituals, self-care routines, and ideas for making your evenings feel intentional and luxurious.",
    },
];

export default function WhyFollowMoan() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-8%" });

    return (
        <section
            id="why-follow"
            ref={sectionRef}
            className="relative py-24 md:py-32 overflow-hidden"
            style={{ background: "linear-gradient(180deg, #08080a 0%, #0c0810 50%, #08080a 100%)" }}
        >
            {/* Ambient glow top */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] blur-[120px] pointer-events-none opacity-20"
                style={{ background: "radial-gradient(ellipse, #7a1c2e, transparent)" }}
            />

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 md:mb-20"
                >
                    <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: "#7a1c2e" }}>
                        On Instagram
                    </p>
                    <h2
                        className="font-light mb-5"
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(2rem, 5vw, 3.5rem)",
                            color: "#f0ece8",
                        }}
                    >
                        Why Follow{" "}
                        <em
                            style={{
                                background: "linear-gradient(135deg, #e0c48a, #c9a96e)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                fontStyle: "italic",
                            }}
                        >
                            Moan?
                        </em>
                    </h2>
                    <p className="text-sm font-light max-w-md mx-auto" style={{ color: "#9a8e8a", fontFamily: "'Inter', sans-serif" }}>
                        Our Instagram is a slow, warm, and intimate space — curated for people who believe evenings deserve intention.
                    </p>
                    <div className="h-px w-16 mx-auto mt-6" style={{ background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)" }} />
                </motion.div>

                {/* Reasons grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
                    {followReasons.map((reason, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 28 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.1 + i * 0.09 }}
                            className="group p-7 rounded-2xl transition-all duration-400 relative overflow-hidden"
                            style={{
                                background: "rgba(14,8,10,0.7)",
                                border: "1px solid rgba(201,169,110,0.08)",
                                backdropFilter: "blur(12px)",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "rgba(201,169,110,0.22)";
                                e.currentTarget.style.background = "rgba(122,28,46,0.08)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "rgba(201,169,110,0.08)";
                                e.currentTarget.style.background = "rgba(14,8,10,0.7)";
                            }}
                        >
                            {/* Subtle shimmer on hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none animate-shimmer" />
                            <p className="text-2xl mb-4">{reason.icon}</p>
                            <h3
                                className="text-base font-light mb-3"
                                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#e0c48a" }}
                            >
                                {reason.title}
                            </h3>
                            <p className="text-xs leading-relaxed font-light" style={{ color: "#9a8e8a", fontFamily: "'Inter', sans-serif" }}>
                                {reason.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.7 }}
                    className="text-center"
                >
                    <a
                        href="https://www.instagram.com/moanofficials?igsh=MTZnbngzcWhxZW84bQ==&utm_source=ig_contact_invite"
                        target="_blank"
                        rel="noopener noreferrer"
                        id="why-follow-instagram-cta"
                        className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full overflow-hidden transition-all duration-500"
                        style={{ border: "1px solid rgba(201,169,110,0.3)" }}
                    >
                        <span className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(135deg, #7a1c2e, #3a0a14)" }} />
                        <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, #9a2540, #570f1e)" }} />
                        <Instagram className="relative w-4 h-4" style={{ color: "#e0c48a" }} />
                        <span className="relative text-sm font-medium tracking-[0.12em] uppercase" style={{ color: "#e0c48a" }}>
                            Follow @moanofficials for the First Drop
                        </span>
                    </a>
                    <p className="mt-4 text-xs" style={{ color: "#555", fontFamily: "'Inter', sans-serif" }}>
                        Launching 23rd July 2026 · First 500 members get 50% off
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
