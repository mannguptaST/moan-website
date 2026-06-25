"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const moodCards = [
    {
        id: "desire",
        title: "Desire",
        symbol: "◆",
        copy: "A warmth that stirs quietly. The feeling of wanting something beautiful to linger just a little longer.",
        hoverColor: "rgba(122,28,46,0.25)",
        borderColor: "rgba(122,28,46,0.35)",
    },
    {
        id: "warmth",
        title: "Warmth",
        symbol: "✦",
        copy: "Not just heat — the kind of glow that makes a room feel lived-in, safe, and exactly where you want to be.",
        hoverColor: "rgba(201,169,110,0.12)",
        borderColor: "rgba(201,169,110,0.25)",
    },
    {
        id: "intimacy",
        title: "Intimacy",
        symbol: "◈",
        copy: "The space between two people when the lights are low and time slows down. Moan holds that space for you.",
        hoverColor: "rgba(86,10,25,0.3)",
        borderColor: "rgba(122,28,46,0.3)",
    },
    {
        id: "mystery",
        title: "Mystery",
        symbol: "◉",
        copy: "An allure that doesn't announce itself. It simply settles in the air — and stays.",
        hoverColor: "rgba(30,15,25,0.5)",
        borderColor: "rgba(100,60,70,0.3)",
    },
];

export default function MoodNotes() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-8%" });
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    return (
        <section
            id="mood-notes"
            ref={sectionRef}
            className="relative py-32 md:py-44 overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0" style={{ background: "#08080a" }} />

            {/* Top divider */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(122,28,46,0.4), transparent)" }} />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-20"
                >
                    <p className="text-xs tracking-[0.35em] uppercase mb-5" style={{ color: "#7a1c2e" }}>
                        Mood Notes
                    </p>
                    <h2
                        className="text-4xl md:text-6xl font-light"
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f0ece8" }}
                    >
                        Four Notes.
                        <br />
                        <em
                            className="not-italic"
                            style={{
                                background: "linear-gradient(135deg, #e0c48a, #c9a96e)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            One Experience.
                        </em>
                    </h2>
                </motion.div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {moodCards.map((card, index) => (
                        <motion.div
                            key={card.id}
                            id={`mood-card-${card.id}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: index * 0.12 }}
                            onMouseEnter={() => setHoveredCard(card.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                            className="relative p-8 rounded-2xl cursor-default transition-all duration-500 flex flex-col gap-6 group"
                            style={{
                                background:
                                    hoveredCard === card.id
                                        ? card.hoverColor
                                        : "rgba(14,10,12,0.6)",
                                border: `1px solid ${hoveredCard === card.id ? card.borderColor : "rgba(255,255,255,0.05)"}`,
                                backdropFilter: "blur(12px)",
                                transform: hoveredCard === card.id ? "translateY(-4px)" : "translateY(0)",
                            }}
                        >
                            {/* Symbol */}
                            <div
                                className="text-2xl transition-colors duration-500"
                                style={{ color: hoveredCard === card.id ? "#c9a96e" : "#7a1c2e" }}
                            >
                                {card.symbol}
                            </div>

                            {/* Title */}
                            <h3
                                className="text-3xl font-light"
                                style={{
                                    fontFamily: "'Cormorant Garamond', serif",
                                    color: hoveredCard === card.id ? "#f0ece8" : "#c8b9a8",
                                    transition: "color 0.4s",
                                }}
                            >
                                {card.title}
                            </h3>

                            {/* Separator */}
                            <div
                                className="h-px w-8 transition-all duration-500"
                                style={{
                                    background: hoveredCard === card.id
                                        ? "linear-gradient(90deg, #c9a96e, transparent)"
                                        : "linear-gradient(90deg, rgba(122,28,46,0.5), transparent)",
                                    width: hoveredCard === card.id ? "48px" : "32px",
                                }}
                            />

                            {/* Copy */}
                            <p
                                className="text-sm leading-relaxed font-light"
                                style={{
                                    color: hoveredCard === card.id ? "#c8b9a8" : "#666560",
                                    transition: "color 0.4s",
                                }}
                            >
                                {card.copy}
                            </p>

                            {/* Hover glow */}
                            {hoveredCard === card.id && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 rounded-2xl pointer-events-none"
                                    style={{
                                        background: "radial-gradient(ellipse at top left, rgba(201,169,110,0.06), transparent 70%)",
                                    }}
                                />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
