"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2400);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                    }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#08080a]"
                >
                    <div className="relative flex flex-col items-center">

                        {/* Wide ambient glow behind the logo */}
                        <div
                            aria-hidden
                            className="absolute pointer-events-none"
                            style={{
                                width: "520px",
                                height: "200px",
                                borderRadius: "50%",
                                background:
                                    "radial-gradient(ellipse at 42% 50%, rgba(201,169,110,0.35) 0%, rgba(122,28,46,0.18) 50%, transparent 75%)",
                                filter: "blur(40px)",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                            }}
                        />

                        {/* Logo image */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            style={{ position: "relative" }}
                        >
                            <Image
                                src="/images/moan-logo.png"
                                alt="Moan"
                                width={340}
                                height={80}
                                priority
                                style={{
                                    objectFit: "contain",
                                    filter:
                                        "drop-shadow(0 0 12px rgba(240,210,140,0.6)) drop-shadow(0 0 40px rgba(212,175,100,0.25))",
                                }}
                            />
                        </motion.div>

                        {/* Tagline */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.65 }}
                            transition={{ delay: 0.9, duration: 0.6 }}
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "10px",
                                letterSpacing: "0.38em",
                                textTransform: "uppercase",
                                color: "#c9a96e",
                                marginTop: "14px",
                            }}
                        >
                            Light the Mood
                        </motion.p>

                        {/* Loading progress bar */}
                        <motion.div
                            className="mt-8 h-[1px] rounded-full"
                            style={{ background: "linear-gradient(90deg, #7a1c2e, #c9a96e)" }}
                            initial={{ width: 0 }}
                            animate={{ width: "120px" }}
                            transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
