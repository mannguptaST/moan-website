"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import SplitText from "@/components/effects/SplitText";
import MorphingBlob from "@/components/effects/MorphingBlob";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

    return (
        <section
            ref={containerRef}
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Morphing Background */}
            <MorphingBlob />

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.015] pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(212, 175, 55, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.5) 1px, transparent 1px)
          `,
                    backgroundSize: "80px 80px",
                }}
            />

            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0a_70%)] pointer-events-none" />

            {/* Content */}
            <motion.div
                style={{ y, opacity, scale }}
                className="relative z-10 max-w-6xl mx-auto px-6 text-center"
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass mb-10"
                >
                    <Sparkles className="w-4 h-4 text-[#d4af37]" />
                    <span className="text-sm text-[#a0a0a0] tracking-wide">
                        Premium Web Development Agency
                    </span>
                </motion.div>

                {/* Headline with Per-Character Animation */}
                <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold mb-8 tracking-tight leading-[1.1]">
                    <span className="block text-white mb-2">
                        <SplitText delay={0.4} staggerDelay={0.04}>
                            Crafting Digital
                        </SplitText>
                    </span>
                    <span className="block gradient-text">
                        <SplitText delay={0.8} staggerDelay={0.04}>
                            Excellence
                        </SplitText>
                    </span>
                </h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="text-lg md:text-xl text-[#808080] max-w-2xl mx-auto mb-14 leading-relaxed font-light"
                >
                    We transform visionary ideas into stunning digital experiences.
                    <br className="hidden md:block" />
                    Precision engineering meets elegant design.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-5"
                >
                    <a
                        href="#contact"
                        className="group relative px-10 py-4 rounded-full overflow-hidden"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-[#d4af37] to-[#b87333]" />
                        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#e6c65c] to-[#d4af37]" />
                        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-r from-[#d4af37] to-[#b87333]" />
                        <span className="relative flex items-center gap-2 text-black font-semibold tracking-wide">
                            Start Your Project
                            <ArrowDown className="w-4 h-4 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
                        </span>
                    </a>

                    <a
                        href="#portfolio"
                        className="group px-10 py-4 rounded-full border border-[#2a2a2a] hover:border-[#d4af37]/50 transition-all duration-500 hover:bg-[#d4af37]/5"
                    >
                        <span className="text-[#a0a0a0] group-hover:text-white transition-colors font-medium tracking-wide">
                            View Our Work
                        </span>
                    </a>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-3"
                >
                    <span className="text-[10px] text-[#666] uppercase tracking-[0.3em]">
                        Scroll
                    </span>
                    <div className="w-[1px] h-8 bg-gradient-to-b from-[#d4af37] to-transparent" />
                </motion.div>
            </motion.div>
        </section>
    );
}
