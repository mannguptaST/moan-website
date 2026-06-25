"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function ProductReveal() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
    const parallaxY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

    return (
        <section
            id="product"
            ref={sectionRef}
            className="relative py-28 md:py-40 overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #08080a 0%, #110a0e 50%, #08080a 100%)" }} />

            {/* Ambient glow behind image */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[180px] opacity-15 pointer-events-none"
                style={{ background: "radial-gradient(ellipse, #7a1c2e, transparent)" }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Section label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-20"
                >
                    <p className="text-xs tracking-[0.35em] uppercase mb-5" style={{ color: "#7a1c2e" }}>
                        The Product
                    </p>
                    <h2
                        className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight"
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f0ece8" }}
                    >
                        Made for{" "}
                        <em
                            className="not-italic"
                            style={{
                                background: "linear-gradient(135deg, #e0c48a, #c9a96e, #a8883e)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            After-Dark
                        </em>{" "}
                        Moments
                    </h2>
                </motion.div>

                {/* Content grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Product image */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.9, delay: 0.15 }}
                        style={{ y: parallaxY }}
                        className="relative"
                    >
                        <div
                            className="relative mx-auto w-full max-w-md aspect-square rounded-2xl overflow-hidden"
                            style={{
                                border: "1px solid rgba(201,169,110,0.12)",
                                boxShadow: "0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(122,28,46,0.1)",
                            }}
                        >
                            <Image
                                src="/images/intimate-close.jpg"
                                alt="Moan close-up — matte wine-red jar with gold label on dark silk"
                                fill
                                className="object-cover object-center"
                                quality={85}
                                style={{ filter: "blur(1.2px) brightness(0.92) saturate(1.1)", transform: "scale(1.03)" }}
                            />
                            {/* Cinematic overlay — softens edges and adds depth */}
                            <div
                                className="absolute inset-0"
                                style={{ background: "linear-gradient(135deg, rgba(8,8,10,0.25) 0%, rgba(8,8,10,0.05) 45%, rgba(8,8,10,0.45) 100%)" }}
                            />
                            {/* Soft centre glow — draws eye to subject */}
                            <div
                                className="absolute inset-0"
                                style={{ background: "radial-gradient(ellipse at 50% 45%, transparent 30%, rgba(8,8,10,0.35) 100%)" }}
                            />
                        </div>

                        {/* Floating detail card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.7, delay: 0.5 }}
                            className="absolute -bottom-6 -right-4 md:-right-8 px-6 py-4 rounded-xl"
                            style={{
                                background: "rgba(8,8,10,0.92)",
                                border: "1px solid rgba(201,169,110,0.2)",
                                backdropFilter: "blur(16px)",
                            }}
                        >
                            <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: "#7a1c2e" }}>
                                Crafted
                            </p>
                            <p className="text-sm font-light" style={{ color: "#c8b9a8" }}>
                                Matte Wine-Red Jar
                            </p>
                        </motion.div>

                        {/* Second floating card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.7, delay: 0.65 }}
                            className="absolute -top-4 -left-4 md:-left-8 px-5 py-3 rounded-xl"
                            style={{
                                background: "rgba(122,28,46,0.15)",
                                border: "1px solid rgba(122,28,46,0.3)",
                                backdropFilter: "blur(16px)",
                            }}
                        >
                            <p className="text-xs tracking-[0.15em] uppercase" style={{ color: "#c9a96e" }}>
                                ✦ Gold-Lid Finish
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Descriptive copy */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.9, delay: 0.25 }}
                        className="flex flex-col gap-10"
                    >
                        {[
                            {
                                title: "Matte Wine-Red Jar",
                                body: "A tactile, matte-finished vessel in deep burgundy — weighty in the hand, striking on any surface. Designed to be seen.",
                                icon: "◆",
                            },
                            {
                                title: "Warm, Slow-Burning Flame",
                                body: "Formulated for an extended, clean burn that fills the room slowly — the way a great evening unfolds.",
                                icon: "✦",
                            },
                            {
                                title: "Premium Pour Quality",
                                body: "Each candle is hand-poured with intention. Natural wax, minimal additives, maximum presence.",
                                icon: "◈",
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.35 + i * 0.12 }}
                                className="flex gap-5 group"
                            >
                                <div className="mt-1 flex-shrink-0">
                                    <span className="text-base" style={{ color: "#7a1c2e" }}>{item.icon}</span>
                                </div>
                                <div>
                                    <h3
                                        className="text-lg font-light mb-2"
                                        style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f0ece8", fontSize: "1.25rem" }}
                                    >
                                        {item.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed font-light" style={{ color: "#9a8e8a" }}>
                                        {item.body}
                                    </p>
                                </div>
                            </motion.div>
                        ))}

                        <div className="h-px" style={{ background: "linear-gradient(90deg, rgba(201,169,110,0.3), transparent)" }} />

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.7 }}
                        >
                            <a
                                href="#coming-soon"
                                className="group inline-flex items-center gap-3 text-sm tracking-[0.15em] uppercase transition-colors"
                                style={{ color: "#c9a96e" }}
                            >
                                <span>Reserve Yours Early</span>
                                <span className="transition-transform group-hover:translate-x-1">→</span>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
