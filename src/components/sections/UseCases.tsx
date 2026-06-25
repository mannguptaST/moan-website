"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Tilt3D from "@/components/effects/Tilt3D";

// No emojis — use refined text symbols for luxury feel
const useCases = [
    {
        id: "date-nights",
        symbol: "✦",
        title: "Date Nights",
        description:
            "Transform your space before the first word is spoken. Let the flame set the tone for an evening they won't forget.",
    },
    {
        id: "bedroom-ambience",
        symbol: "◆",
        title: "Bedroom Ambience",
        description:
            "A single flame on the nightstand can redefine the mood of an entire room. Soft, warm, and deeply inviting.",
    },
    {
        id: "self-care",
        symbol: "◈",
        title: "Self-Care Evenings",
        description:
            "You deserve an evening that feels intentional. Draw a bath, dim the lights, and let Moan hold the space for you.",
    },
    {
        id: "luxury-gifting",
        symbol: "◉",
        title: "Luxury Gifting",
        description:
            "Give someone the gift of atmosphere. Beautifully packaged, instantly understood — a statement of impeccable taste.",
    },
    {
        id: "romantic-surprises",
        symbol: "◇",
        title: "Romantic Surprises",
        description:
            "The best surprises speak before you say a word. Light Moan before they arrive — and let the atmosphere do the rest.",
    },
];

export default function UseCases() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-8%" });

    return (
        <section
            id="use-cases"
            ref={sectionRef}
            className="relative py-28 md:py-44 overflow-hidden"
        >
            {/* Background */}
            <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, #08080a 0%, #110a0e 50%, #08080a 100%)" }}
            />

            {/* Ambient glow */}
            <div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] h-[500px] blur-[150px] pointer-events-none opacity-12"
                style={{ background: "radial-gradient(ellipse, #7a1c2e, transparent)" }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Section header */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-end mb-16 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7 }}
                    >
                        <p className="text-xs tracking-[0.35em] uppercase mb-5" style={{ color: "#7a1c2e" }}>
                            Occasions
                        </p>
                        <h2
                            className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight"
                            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f0ece8" }}
                        >
                            Every Moment
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
                                Deserves a Flame.
                            </em>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 24 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="text-sm md:text-base leading-relaxed font-light lg:pb-2"
                        style={{ color: "#9a8e8a" }}
                    >
                        Moan was designed for every human moment that benefits from warmth,
                        depth, and intention — whether you&apos;re setting the scene for two
                        or simply returning to yourself.
                    </motion.p>
                </div>

                {/* Use case cards — 2 col on mobile, 3 on md, no awkward orphan */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                    {useCases.map((item, index) => (
                        <Tilt3D key={item.id} maxTilt={8}>
                        <motion.div
                            id={`use-case-${item.id}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative p-7 md:p-8 rounded-2xl transition-all duration-500"
                            style={{
                                background: "rgba(14,10,12,0.5)",
                                border: "1px solid rgba(255,255,255,0.05)",
                            }}
                            whileHover={{
                                borderColor: "rgba(122,28,46,0.35)",
                                backgroundColor: "rgba(22,12,18,0.7)",
                            }}
                        >
                            {/* Symbol — premium, no emoji */}
                            <div className="text-lg mb-5 transition-colors duration-400" style={{ color: "#7a1c2e" }}>
                                {item.symbol}
                            </div>

                            {/* Title */}
                            <h3
                                className="text-xl font-light mb-3"
                                style={{
                                    fontFamily: "'Cormorant Garamond', serif",
                                    color: "#c8b9a8",
                                    fontSize: "1.25rem",
                                }}
                            >
                                {item.title}
                            </h3>

                            {/* Divider line */}
                            <div className="h-px w-8 mb-4" style={{ background: "linear-gradient(90deg, rgba(122,28,46,0.5), transparent)" }} />

                            {/* Description */}
                            <p className="text-sm leading-relaxed font-light" style={{ color: "#666560" }}>
                                {item.description}
                            </p>

                            {/* Hover corner accent */}
                            <div
                                className="absolute bottom-0 right-0 w-12 h-12 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                                style={{ background: "linear-gradient(135deg, transparent, rgba(122,28,46,0.15))" }}
                            />
                        </motion.div>
                        </Tilt3D>
                    ))}
                </div>
            </div>
        </section>
    );
}
