"use client";

import { motion } from "framer-motion";

const techStack = [
    { name: "Next.js", icon: "▲" },
    { name: "React", icon: "⚛" },
    { name: "TypeScript", icon: "TS" },
    { name: "Tailwind CSS", icon: "🎨" },
    { name: "Node.js", icon: "⬢" },
    { name: "Framer Motion", icon: "◈" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "MongoDB", icon: "🍃" },
    { name: "GraphQL", icon: "◆" },
    { name: "AWS", icon: "☁" },
    { name: "Vercel", icon: "▲" },
    { name: "Figma", icon: "◐" },
];

export default function Marquee() {
    // Duplicate for seamless loop
    const items = [...techStack, ...techStack];

    return (
        <div className="relative py-16 overflow-hidden bg-[#0a0a0a]">
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

            {/* Marquee Track */}
            <motion.div
                animate={{ x: [0, -50 * techStack.length] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 20,
                        ease: "linear",
                    },
                }}
                className="flex gap-12 w-max"
            >
                {items.map((tech, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 px-6 py-3 rounded-full glass border border-[#222] hover:border-[#d4af37]/30 transition-colors group"
                    >
                        <span className="text-xl opacity-60 group-hover:opacity-100 transition-opacity">
                            {tech.icon}
                        </span>
                        <span className="text-[#a0a0a0] group-hover:text-white font-medium whitespace-nowrap transition-colors">
                            {tech.name}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
