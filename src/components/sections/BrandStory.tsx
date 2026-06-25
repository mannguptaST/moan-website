"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const paragraphs = [
    "Moan was born from a simple truth: the right ambience changes everything.",
    "We believe that an evening is not just a stretch of time — it is a canvas. And a single flame, placed with intention, can transform that canvas into something tender, alive, and impossible to forget.",
    "Every Moan candle is crafted for the in-between moments — the quiet before the conversation begins, the warmth that lingers long after the night ends.",
    "This is not merely a product. It is a ritual. A permission slip to slow down, to be present, to light the mood.",
    "After one year of research and meaningful conversations, Moan was crafted as a premium mood brand made to create warmth, romance, and an intimate atmosphere. Built with passion, elegance, and a vision to make every moment feel more special.",
];

export default function BrandStory() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-8%" });

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative py-0 overflow-hidden"
        >
            {/* Full height grid: image left, text right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[90vh]">
                {/* Image side */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="relative order-2 lg:order-1"
                    style={{ minHeight: "50vh" }}
                >
                    <Image
                        src="/images/intimate-close-2.jpg"
                        alt="Something Intimate Is Coming — Moan on dark silk"
                        fill
                        className="object-cover object-center"
                        quality={85}
                        style={{ transform: "scale(1.03)" }}
                    />
                    {/* Right-side fade to blend into text column */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: "linear-gradient(90deg, rgba(8,8,10,0.2) 0%, rgba(8,8,10,0.0) 50%, rgba(8,8,10,0.9) 100%)",
                        }}
                    />
                    {/* Top + bottom fade */}
                    <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#08080a] to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#08080a] to-transparent" />

                    {/* "Something Intimate Is Coming" floating text overlay */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="absolute bottom-12 left-10 right-10 lg:hidden"
                    >
                        <p
                            className="text-2xl font-light italic"
                            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f0ece8", textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
                        >
                            Something Intimate
                            <br />Is Coming.
                        </p>
                    </motion.div>
                </motion.div>

                {/* Text side */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="relative order-1 lg:order-2 flex items-center justify-center px-8 md:px-16 py-24 lg:py-0"
                    style={{ background: "linear-gradient(180deg, #08080a 0%, #0e0810 50%, #08080a 100%)" }}
                >
                    {/* Decorative large watermark */}
                    <div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
                        style={{
                            fontFamily: "'Bodoni Moda', 'Cormorant', 'Cormorant Garamond', serif",
                            fontSize: "clamp(6rem, 18vw, 16rem)",
                            color: "rgba(122,28,46,0.04)",
                            fontWeight: 300,
                            lineHeight: 1,
                        }}
                    >
                        Moan
                    </div>

                    <div className="relative z-10 max-w-md">
                        {/* Label */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7 }}
                            className="mb-10"
                        >
                            <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: "#7a1c2e" }}>
                                Our Story
                            </p>
                            <div className="h-px w-10" style={{ background: "linear-gradient(90deg, #7a1c2e, transparent)" }} />
                        </motion.div>

                        {/* Opening quote mark */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="mb-6"
                        >
                            <span
                                className="text-6xl leading-none select-none"
                                style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(122,28,46,0.4)" }}
                            >
                                "
                            </span>
                        </motion.div>

                        {/* Paragraphs */}
                        <div className="space-y-6">
                            {paragraphs.map((para, i) => (
                                <motion.p
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.7, delay: 0.15 + i * 0.12 }}
                                    className="leading-relaxed"
                                    style={{
                                        fontFamily: i === 0 ? "'Cormorant Garamond', serif" : "'Inter', sans-serif",
                                        fontSize: i === 0 ? "1.35rem" : "0.9rem",
                                        color: i === 0 ? "#f0ece8" : "#9a8e8a",
                                        fontWeight: i === 0 ? 300 : 300,
                                    }}
                                >
                                    {para}
                                </motion.p>
                            ))}
                        </div>

                        {/* Closing */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.88 }}
                            className="mt-10 flex flex-col gap-3"
                        >
                            <div className="h-px w-20" style={{ background: "linear-gradient(90deg, rgba(201,169,110,0.35), transparent)" }} />
                            <p
                                className="text-base tracking-[0.2em] uppercase italic"
                                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9a96e" }}
                            >
                                — With Intention
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
