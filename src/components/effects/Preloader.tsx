"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                    }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]"
                >
                    {/* Logo Animation */}
                    <div className="relative">
                        {/* Glow Effect */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.5 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0 w-24 h-24 bg-[#d4af37] rounded-2xl blur-[60px]"
                        />

                        {/* Logo Box */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                                duration: 0.8,
                                ease: [0.22, 1, 0.36, 1],
                                delay: 0.1,
                            }}
                            className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#b87333] flex items-center justify-center"
                        >
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.4 }}
                                className="text-black font-bold text-4xl"
                            >
                                L
                            </motion.span>
                        </motion.div>

                        {/* Loading Bar */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                            className="absolute -bottom-8 left-0 h-[2px] bg-gradient-to-r from-[#d4af37] to-[#b87333] rounded-full"
                        />
                    </div>

                    {/* Brand Name */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="absolute bottom-12 text-[#333] text-sm tracking-[0.3em] uppercase"
                    >
                        Loading Experience
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
