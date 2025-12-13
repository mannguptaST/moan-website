"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section
            ref={containerRef}
            id="contact"
            className="relative py-32 overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]" />

            {/* Gradient Orbs */}
            <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#d4af37] rounded-full opacity-[0.03] blur-[150px] -translate-y-1/2" />
            <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-[#b87333] rounded-full opacity-[0.05] blur-[120px] -translate-y-1/2" />

            <div className="relative z-10 max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="glass rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
                >
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 animate-shimmer pointer-events-none" />

                    {/* Decorative Border */}
                    <div className="absolute inset-0 rounded-3xl border border-[#d4af37]/10" />

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 mb-8">
                            <Sparkles className="w-4 h-4 text-[#d4af37]" />
                            <span className="text-sm text-[#d4af37]">Limited Availability</span>
                        </div>

                        {/* Headline */}
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            Ready to Elevate Your <br />
                            <span className="gradient-text">Digital Presence?</span>
                        </h2>

                        {/* Subtext */}
                        <p className="text-[#a0a0a0] text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                            Let&apos;s collaborate to create something extraordinary.
                            We&apos;re currently accepting new projects for Q1 2025.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <motion.a
                                href="mailto:hello@luxedigital.com"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="group relative px-10 py-5 rounded-full overflow-hidden"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-[#d4af37] to-[#b87333]" />
                                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#b87333] to-[#d4af37]" />
                                <span className="relative flex items-center gap-3 text-black font-semibold text-lg">
                                    Start a Project
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </motion.a>

                            <a
                                href="#"
                                className="px-10 py-5 rounded-full border border-[#333] hover:border-[#d4af37] text-white hover:text-[#d4af37] transition-all duration-300 font-medium text-lg"
                            >
                                Schedule a Call
                            </a>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t border-[#222]">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-white">50+</p>
                                <p className="text-[#a0a0a0] text-sm">Projects Delivered</p>
                            </div>
                            <div className="w-px h-12 bg-[#333] hidden sm:block" />
                            <div className="text-center">
                                <p className="text-3xl font-bold text-white">100%</p>
                                <p className="text-[#a0a0a0] text-sm">Client Satisfaction</p>
                            </div>
                            <div className="w-px h-12 bg-[#333] hidden sm:block" />
                            <div className="text-center">
                                <p className="text-3xl font-bold text-white">5+</p>
                                <p className="text-[#a0a0a0] text-sm">Years Experience</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
