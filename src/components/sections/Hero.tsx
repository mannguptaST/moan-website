"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";
import { SplitWords } from "@/components/effects/SplitText";
import Image from "next/image";
import EmberParticles from "@/components/effects/EmberParticles";
import CandleFlame from "@/components/effects/CandleFlame";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
    const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.55], [1, 0.96]);
    const imgY = useTransform(scrollYProgress, [0, 1], [0, 80]);

    return (
        <section
            ref={containerRef}
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Full-bleed hero image — parallax */}
            <motion.div style={{ y: imgY }} className="absolute inset-0 z-0">
                <Image
                    src="/images/hero-candles.jpg"
                    alt="Moan premium mood — three burgundy jars on silk with lit flame"
                    fill
                    priority
                    className="object-cover object-center"
                    quality={90}
                    style={{ filter: "blur(3px)", transform: "scale(1.06)" }}
                />
                {/* Cinematic dark overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(8,8,10,0.70) 0%, rgba(8,8,10,0.38) 45%, rgba(8,8,10,0.80) 100%)",
                    }}
                />
                {/* Bottom fade to site bg */}
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#08080a] to-transparent" />
            </motion.div>

            {/* Floating ember particles */}
            <EmberParticles count={20} />

            {/* Subtle grain overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03] z-[1]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundSize: "200px 200px",
                }}
            />

            {/* Content */}
            <motion.div
                style={{ y, opacity, scale }}
                className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center pt-24 md:pt-28"
            >
                {/* Premium badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.9, delay: 0.2 }}
                    className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-10 md:mb-12"
                    style={{
                        background: "rgba(122,28,46,0.18)",
                        border: "1px solid rgba(201,169,110,0.25)",
                        backdropFilter: "blur(12px)",
                    }}
                >
                    <Flame className="w-3.5 h-3.5" style={{ color: "#c9a96e" }} />
                    <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "#c9a96e" }}>
                        Premium Mood · Limited Edition
                    </span>
                </motion.div>

                {/* Main headline */}
                <h1 className="mb-6 md:mb-8">
                    {/* Line 1: "Light the" */}
                    <span
                        className="block"
                        style={{
                            fontFamily: "'Bodoni Moda', 'Cormorant', 'Cormorant Garamond', serif",
                            fontSize: "clamp(2.8rem, 7vw, 7rem)",
                            fontWeight: 300,
                            fontStyle: "italic",
                            lineHeight: 1.05,
                            color: "#e0c48a",
                            WebkitTextFillColor: "#e0c48a",
                            textShadow: "0 0 20px rgba(240,210,140,0.35), 0 4px 40px rgba(0,0,0,0.55)",
                        }}
                    >
                        <SplitWords delay={0.4} staggerDelay={0.12}>
                            Light the
                        </SplitWords>
                    </span>
                    {/* Line 2: "Mood." — slightly larger for emphasis */}
                    <span
                        className="block"
                        style={{
                            fontFamily: "'Bodoni Moda', 'Cormorant', 'Cormorant Garamond', serif",
                            fontSize: "clamp(3.5rem, 9vw, 9rem)",
                            fontWeight: 300,
                            fontStyle: "italic",
                            lineHeight: 1,
                            color: "#c9a96e",
                            WebkitTextFillColor: "#c9a96e",
                            textShadow: "0 0 30px rgba(240,210,140,0.40), 0 4px 50px rgba(0,0,0,0.5)",
                        }}
                    >
                        <SplitWords delay={0.65} staggerDelay={0.15}>
                            Mood.
                        </SplitWords>
                    </span>
                </h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.9, delay: 1.4 }}
                    className="max-w-md mx-auto mb-10 md:mb-14 leading-relaxed font-light text-sm md:text-base"
                    style={{
                        color: "#d4c8be",
                        fontFamily: "'Inter', sans-serif",
                        textShadow: "0 2px 20px rgba(0,0,0,0.7)",
                    }}
                >
                    A premium mood brand crafted to turn ordinary evenings into
                    intimate, unforgettable moments.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.7 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
                >
                    <a
                        href="#coming-soon"
                        id="hero-join-waitlist"
                        className="group relative w-full sm:w-auto px-10 py-4 rounded-full overflow-hidden inline-flex items-center justify-center gap-3 transition-all duration-500"
                        style={{ border: "1px solid rgba(201,169,110,0.35)" }}
                    >
                        <span className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(135deg, #7a1c2e, #3a0a14)" }} />
                        <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, #9a2540, #570f1e)" }} />
                        <span className="relative text-sm font-medium tracking-[0.12em] uppercase" style={{ color: "#e0c48a" }}>
                            Join the Waitlist
                        </span>
                        <ArrowRight className="relative w-4 h-4 transition-transform group-hover:translate-x-1" style={{ color: "#c9a96e" }} />
                    </a>

                    <a
                        href="#product"
                        id="hero-discover-candle"
                        className="group w-full sm:w-auto px-10 py-4 rounded-full inline-flex items-center justify-center gap-3 transition-all duration-500"
                        style={{ border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}
                    >
                        <span
                            className="text-sm font-light tracking-[0.12em] uppercase transition-colors group-hover:text-[#f0ece8]"
                            style={{ color: "#c8b9a8" }}
                        >
                            Discover More
                        </span>
                    </a>
                </motion.div>

                {/* Stats — mobile-safe with flex-wrap */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.1, duration: 1 }}
                    className="mt-16 md:mt-20 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-12"
                >
                    {[
                        { value: "100%", label: "Natural Wax" },
                        { value: "60+", label: "Hour Burn" },
                        { value: "Premium", label: "Pour Quality" },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <p
                                className="text-xl md:text-2xl font-light mb-1"
                                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9a96e" }}
                            >
                                {stat.value}
                            </p>
                            <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "#888" }}>
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Interactive candle — ambient focal point */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.6, duration: 1.2 }}
                className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-20"
            >
                <CandleFlame />
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.4, duration: 1 }}
                className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-20"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-3"
                >
                    <span className="text-[9px] tracking-[0.35em] uppercase" style={{ color: "#888" }}>Scroll</span>
                    <div className="w-[1px] h-8" style={{ background: "linear-gradient(to bottom, #c9a96e, transparent)" }} />
                </motion.div>
            </motion.div>
        </section>
    );
}
