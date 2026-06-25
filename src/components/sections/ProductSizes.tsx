"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const sizes = [
    {
        id: "trial",
        label: "50ml",
        name: "Trial Flame",
        tagline: "Your First Encounter",
        description:
            "A taste of the Moan experience. Perfect for gifting or discovering your mood. Compact, powerful, personal.",
        burnTime: "15–20 hrs",
        tag: "Best for Gifting",
        featured: false,
    },
    {
        id: "signature",
        label: "200ml",
        name: "Signature Mood",
        tagline: "The Essential",
        description:
            "Our most loved size. Rich presence, slow burn, full experience. The candle your evenings deserve.",
        burnTime: "50–60 hrs",
        tag: "Most Popular",
        featured: true,
    },
    {
        id: "afterdark",
        label: "300ml",
        name: "After Dark Edition",
        tagline: "The Statement Piece",
        description:
            "For the evenings that last until morning. Deep, lasting warmth. A centrepiece for any bedroom or living space.",
        burnTime: "80–90 hrs",
        tag: "Collector's Edition",
        featured: false,
    },
];

export default function ProductSizes() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-8%" });

    return (
        <section
            id="sizes"
            ref={sectionRef}
            className="relative py-32 md:py-44 overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #08080a 0%, #0d0810 50%, #08080a 100%)" }} />

            {/* Top divider */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(122,28,46,0.4), transparent)" }} />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <p className="text-xs tracking-[0.35em] uppercase mb-5" style={{ color: "#7a1c2e" }}>
                        Collections
                    </p>
                    <h2
                        className="text-4xl md:text-6xl font-light mb-5"
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f0ece8" }}
                    >
                        Choose Your Intensity
                    </h2>
                    <p className="text-sm font-light" style={{ color: "#9a8e8a" }}>
                        Three sizes. One intention.
                    </p>
                </motion.div>

                {/* Hero image — all three sizes */}
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 1, delay: 0.1 }}
                    className="relative w-full max-w-3xl mx-auto mb-20 rounded-2xl overflow-hidden"
                    style={{
                        border: "1px solid rgba(201,169,110,0.12)",
                        boxShadow: "0 60px 160px rgba(0,0,0,0.7), 0 0 0 1px rgba(122,28,46,0.08)",
                    }}
                >
                    <div className="relative aspect-square">
                        <Image
                            src="/images/sizes-candles.jpg"
                            alt="Moan collection — three sizes on black silk with rose petals"
                            fill
                            className="object-cover object-center"
                            quality={90}
                        />
                        {/* Edge vignette */}
                        <div
                            className="absolute inset-0"
                            style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(8,8,10,0.6) 100%)" }}
                        />

                        {/* ── Smoke animation overlay ── */}
                        {/* The candle flame sits at roughly 28% left, 58% top in the image */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">

                            {/* Wisp 1 — main centre column */}
                            <div
                                className="absolute animate-smoke"
                                style={{
                                    left: "27%", top: "38%",
                                    width: "38px", height: "60px",
                                    borderRadius: "50% 50% 20% 20%",
                                    background: "radial-gradient(ellipse at center, rgba(220,200,170,0.55) 0%, rgba(200,180,150,0.25) 50%, transparent 80%)",
                                    filter: "blur(7px)",
                                    animationDelay: "0s",
                                }}
                            />

                            {/* Wisp 2 — slightly right, offset */}
                            <div
                                className="absolute animate-smoke-2"
                                style={{
                                    left: "30%", top: "41%",
                                    width: "28px", height: "50px",
                                    borderRadius: "50% 40% 30% 20%",
                                    background: "radial-gradient(ellipse at center, rgba(210,185,155,0.45) 0%, rgba(190,165,135,0.2) 55%, transparent 80%)",
                                    filter: "blur(9px)",
                                    animationDelay: "1.8s",
                                }}
                            />

                            {/* Wisp 3 — thin left drift */}
                            <div
                                className="absolute animate-smoke-3"
                                style={{
                                    left: "25%", top: "43%",
                                    width: "22px", height: "45px",
                                    borderRadius: "40% 60% 30% 20%",
                                    background: "radial-gradient(ellipse at center, rgba(215,195,160,0.40) 0%, transparent 75%)",
                                    filter: "blur(10px)",
                                    animationDelay: "0.9s",
                                }}
                            />

                            {/* Wisp 4 — slow wide billow */}
                            <div
                                className="absolute animate-smoke"
                                style={{
                                    left: "22%", top: "36%",
                                    width: "50px", height: "40px",
                                    borderRadius: "50%",
                                    background: "radial-gradient(ellipse at center, rgba(200,180,150,0.28) 0%, transparent 70%)",
                                    filter: "blur(14px)",
                                    animationDelay: "3s",
                                }}
                            />

                            {/* Wisp 5 — ultra-soft background haze */}
                            <div
                                className="absolute animate-smoke-2"
                                style={{
                                    left: "18%", top: "32%",
                                    width: "70px", height: "35px",
                                    borderRadius: "50%",
                                    background: "radial-gradient(ellipse at center, rgba(190,170,140,0.18) 0%, transparent 65%)",
                                    filter: "blur(20px)",
                                    animationDelay: "2.4s",
                                }}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Size cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {sizes.map((size, index) => (
                        <motion.div
                            key={size.id}
                            id={`size-${size.id}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.25 + index * 0.14 }}
                            className={`relative flex flex-col rounded-2xl p-8 transition-all duration-500 ${size.featured ? "scale-[1.02]" : ""}`}
                            style={{
                                background: size.featured
                                    ? "linear-gradient(160deg, #1a0d12, #0e0810)"
                                    : "rgba(14,10,12,0.5)",
                                border: size.featured
                                    ? "1px solid rgba(201,169,110,0.25)"
                                    : "1px solid rgba(255,255,255,0.05)",
                                boxShadow: size.featured
                                    ? "0 0 60px rgba(122,28,46,0.12), 0 40px 80px rgba(0,0,0,0.4)"
                                    : "none",
                            }}
                            whileHover={{ borderColor: size.featured ? "rgba(201,169,110,0.4)" : "rgba(122,28,46,0.3)", y: -4 }}
                        >
                            {/* Tag */}
                            {size.tag && (
                                <div
                                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase whitespace-nowrap"
                                    style={{
                                        background: size.featured ? "linear-gradient(135deg, #7a1c2e, #3a0a14)" : "rgba(20,14,18,0.9)",
                                        border: `1px solid ${size.featured ? "rgba(201,169,110,0.4)" : "rgba(201,169,110,0.15)"}`,
                                        color: "#e0c48a",
                                    }}
                                >
                                    {size.tag}
                                </div>
                            )}

                            {/* Volume */}
                            <div className="mb-6 mt-4">
                                <span
                                    className="text-5xl font-light"
                                    style={{
                                        fontFamily: "'Cormorant Garamond', serif",
                                        color: size.featured ? "#c9a96e" : "#9a8e8a",
                                    }}
                                >
                                    {size.label}
                                </span>
                            </div>

                            {/* Name + tagline */}
                            <h3
                                className="text-2xl font-light mb-1"
                                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f0ece8" }}
                            >
                                {size.name}
                            </h3>
                            <p className="text-xs tracking-[0.2em] uppercase mb-5" style={{ color: "#7a1c2e" }}>
                                {size.tagline}
                            </p>

                            {/* Description */}
                            <p className="text-sm leading-relaxed font-light mb-8 flex-1" style={{ color: "#9a8e8a" }}>
                                {size.description}
                            </p>

                            {/* Burn time */}
                            <div
                                className="flex items-center justify-between py-4 mb-6 rounded-lg px-4"
                                style={{ background: "rgba(122,28,46,0.08)", border: "1px solid rgba(122,28,46,0.12)" }}
                            >
                                <span className="text-xs tracking-[0.15em] uppercase" style={{ color: "#666" }}>
                                    Burn Time
                                </span>
                                <span className="text-sm font-medium" style={{ color: "#c9a96e" }}>
                                    {size.burnTime}
                                </span>
                            </div>

                            {/* Price */}
                            <div className="text-center">
                                <span className="text-xs tracking-[0.2em] uppercase" style={{ color: "#555" }}>
                                    Pricing — Coming Soon
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.7, delay: 0.7 }}
                    className="text-center mt-12 text-xs tracking-[0.15em] uppercase"
                    style={{ color: "#444" }}
                >
                    All sizes available at launch · Waitlist members get early access
                </motion.p>
            </div>
        </section>
    );
}
