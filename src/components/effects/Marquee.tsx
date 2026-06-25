"use client";

import { motion } from "framer-motion";

const moodWords = [
    { name: "Desire", symbol: "✦" },
    { name: "Warmth", symbol: "✦" },
    { name: "Intimacy", symbol: "✦" },
    { name: "Mystery", symbol: "✦" },
    { name: "Romance", symbol: "✦" },
    { name: "Ambience", symbol: "✦" },
    { name: "After Dark", symbol: "✦" },
    { name: "Flame", symbol: "✦" },
    { name: "Luxury", symbol: "✦" },
    { name: "Serenity", symbol: "✦" },
];

export default function MoodMarquee() {
    const items = [...moodWords, ...moodWords];

    return (
        <div className="relative py-10 overflow-hidden border-y border-[#1a1215]">
            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#08080a] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#08080a] to-transparent z-10 pointer-events-none" />

            {/* Marquee track */}
            <motion.div
                animate={{ x: [0, -160 * moodWords.length] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 30,
                        ease: "linear",
                    },
                }}
                className="flex gap-10 w-max"
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4"
                    >
                        <span
                            className="text-xs tracking-[0.3em] uppercase whitespace-nowrap"
                            style={{ color: "#9a8e8a", fontFamily: "'Inter', sans-serif" }}
                        >
                            {item.name}
                        </span>
                        <span className="text-[#7a1c2e] text-xs">
                            {item.symbol}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
