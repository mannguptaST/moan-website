"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const brandParagraphs = [
    "Moan was born from a simple truth: the right ambience changes everything.",
    "We believe that an evening is not just a stretch of time — it is a canvas. And a single flame, placed with intention, can transform that canvas into something tender, alive, and impossible to forget.",
    "Every Moan candle is crafted for the in-between moments — the quiet before the conversation begins, the warmth that lingers long after the night ends.",
    "This is not merely a product. It is a ritual. A permission slip to slow down, to be present, to light the mood.",
];

export default function BrandStory() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const founderRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-8%" });
    const founderInView = useInView(founderRef, { once: true, margin: "-8%" });

    return (
        <>
            {/* ── Brand Story ─────────────────────────────────────────────── */}
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
                        {/* Right-side fade */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: "linear-gradient(90deg, rgba(8,8,10,0.2) 0%, rgba(8,8,10,0.0) 50%, rgba(8,8,10,0.9) 100%)",
                            }}
                        />
                        {/* Top + bottom fade */}
                        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#08080a] to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#08080a] to-transparent" />

                        {/* "Something Intimate Is Coming" mobile overlay */}
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
                                    &ldquo;
                                </span>
                            </motion.div>

                            {/* Paragraphs */}
                            <div className="space-y-6">
                                {brandParagraphs.map((para, i) => (
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
                                            fontWeight: 300,
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
                                transition={{ duration: 0.7, delay: 0.7 }}
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

            {/* ── Founder Story ─────────────────────────────────────────── */}
            <section
                id="founders"
                ref={founderRef}
                className="relative py-24 md:py-32 overflow-hidden"
                style={{ background: "linear-gradient(180deg, #08080a 0%, #0e0810 60%, #08080a 100%)" }}
            >
                {/* Ambient glow */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] blur-[140px] pointer-events-none"
                    style={{ background: "radial-gradient(ellipse, rgba(122,28,46,0.12), transparent)" }}
                />

                <div className="relative z-10 max-w-5xl mx-auto px-6">
                    {/* Section label */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={founderInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7 }}
                        className="text-center mb-16"
                    >
                        <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: "#7a1c2e" }}>
                            The Makers
                        </p>
                        <h2
                            className="font-light"
                            style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                                color: "#f0ece8",
                            }}
                        >
                            Crafted by{" "}
                            <em
                                style={{
                                    background: "linear-gradient(135deg, #e0c48a, #c9a96e)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                    fontStyle: "italic",
                                }}
                            >
                                The Founders
                            </em>
                        </h2>
                        <div className="h-px w-16 mx-auto mt-6" style={{ background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)" }} />
                    </motion.div>

                    {/* Two-column founder layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left: Story text */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={founderInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <span
                                className="text-5xl leading-none select-none block mb-4"
                                style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(122,28,46,0.4)" }}
                            >
                                &ldquo;
                            </span>
                            <p
                                className="text-xl font-light leading-relaxed mb-6"
                                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f0ece8" }}
                            >
                                After 1 year of research, testing, and conversations with people who understand mood, intimacy, and ambience — we created Moan.
                            </p>
                            <p className="text-sm font-light leading-relaxed mb-6" style={{ color: "#9a8e8a", fontFamily: "'Inter', sans-serif" }}>
                                A candle made to turn ordinary evenings into something warmer, slower, and more memorable. Not just a product — a feeling you come home to.
                            </p>
                            <p className="text-sm font-light leading-relaxed mb-8" style={{ color: "#9a8e8a", fontFamily: "'Inter', sans-serif" }}>
                                We tested over 40 fragrance blends, spoke with couples, interior designers, and lifestyle creators, and obsessed over every detail — from the pour quality to the burn time to the way the jar catches the light. Every decision was made with one question in mind: does this make the moment feel more special?
                            </p>
                            <div className="h-px w-20 mb-6" style={{ background: "linear-gradient(90deg, rgba(201,169,110,0.35), transparent)" }} />
                            <p
                                className="text-base tracking-[0.15em] uppercase italic"
                                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9a96e" }}
                            >
                                — The Founders of Moan
                            </p>
                        </motion.div>

                        {/* Right: Stats / founder cards */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={founderInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="grid grid-cols-2 gap-4"
                        >
                            {[
                                {
                                    icon: (
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="12" y1="2" x2="12" y2="6" />
                                            <path d="M12 6 C12 6, 8 10, 8 14 a4 4 0 0 0 8 0 C16 10 12 6 12 6z" />
                                            <line x1="9" y1="20" x2="15" y2="20" />
                                            <line x1="10" y1="22" x2="14" y2="22" />
                                        </svg>
                                    ),
                                    value: "40+",
                                    label: "Fragrance Blends Tested",
                                },
                                {
                                    icon: (
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="4" width="18" height="18" rx="2" />
                                            <line x1="16" y1="2" x2="16" y2="6" />
                                            <line x1="8" y1="2" x2="8" y2="6" />
                                            <line x1="3" y1="10" x2="21" y2="10" />
                                            <line x1="8" y1="14" x2="8" y2="14" strokeWidth="2" strokeLinecap="round" />
                                            <line x1="12" y1="14" x2="12" y2="14" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    ),
                                    value: "1 Year",
                                    label: "Of Research & Iteration",
                                },
                                {
                                    icon: (
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 2 C12 2, 6 7, 6 12 a6 6 0 0 0 12 0 C18 7 12 2 12 2z" />
                                            <path d="M12 12 Q14 8 18 8" />
                                        </svg>
                                    ),
                                    value: "100%",
                                    label: "Natural Wax Formula",
                                },
                                {
                                    icon: (
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 2 C8 6 6 10 6 13 a6 6 0 0 0 12 0 C18 10 16 6 12 2z" />
                                            <path d="M10 17 Q10 20 12 20 Q14 20 14 17" />
                                        </svg>
                                    ),
                                    value: "60+hrs",
                                    label: "Premium Burn Time",
                                },
                            ].map((stat, i) => {
                                const [hovered, setHovered] = useState(false);
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={founderInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                                        onMouseEnter={() => setHovered(true)}
                                        onMouseLeave={() => setHovered(false)}
                                        className="p-6 rounded-2xl text-center flex flex-col items-center gap-3 transition-all duration-300"
                                        style={{
                                            background: hovered
                                                ? "rgba(20,10,14,0.95)"
                                                : "rgba(14,8,10,0.8)",
                                            border: hovered
                                                ? "1px solid rgba(201,169,110,0.35)"
                                                : "1px solid rgba(201,169,110,0.12)",
                                            backdropFilter: "blur(12px)",
                                            boxShadow: hovered
                                                ? "0 0 28px rgba(201,169,110,0.10), inset 0 0 20px rgba(201,169,110,0.03)"
                                                : "none",
                                        }}
                                    >
                                        <span
                                            className="flex items-center justify-center transition-colors duration-300"
                                            style={{ color: hovered ? "#e0c48a" : "#a88b52" }}
                                        >
                                            {stat.icon}
                                        </span>
                                        <p
                                            className="text-2xl font-light leading-none"
                                            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9a96e" }}
                                        >
                                            {stat.value}
                                        </p>
                                        <p className="text-[10px] tracking-[0.15em] uppercase leading-tight" style={{ color: "#666" }}>
                                            {stat.label}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}
