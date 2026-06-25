"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CandleFlameProps {
    className?: string;
}

export default function CandleFlame({ className = "" }: CandleFlameProps) {
    const [isLit, setIsLit] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const [showHint, setShowHint] = useState(false);

    useEffect(() => {
        const t1 = setTimeout(() => setShowHint(true), 4000);
        return () => clearTimeout(t1);
    }, []);

    useEffect(() => {
        if (!showHint) return;
        const t = setTimeout(() => setShowHint(false), 4500);
        return () => clearTimeout(t);
    }, [showHint]);

    const handleClick = () => {
        setIsLit(false);
        setTimeout(() => setIsLit(true), 3200);
    };

    return (
        <div className={`relative flex flex-col items-center gap-2 ${className}`}>
            {/* Hint */}
            <AnimatePresence>
                {showHint && (
                    <motion.p
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] tracking-[0.22em] uppercase px-3 py-1 rounded-full pointer-events-none"
                        style={{
                            background: "rgba(22,12,18,0.92)",
                            border: "1px solid rgba(201,169,110,0.2)",
                            color: "#c9a96e",
                        }}
                    >
                        click to blow out
                    </motion.p>
                )}
            </AnimatePresence>

            {/* Candle + flame container */}
            <div
                onClick={handleClick}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="relative flex flex-col items-center cursor-pointer select-none"
                style={{ width: 28 }}
            >
                {/* Ambient glow halo */}
                <AnimatePresence>
                    {isLit && (
                        <motion.div
                            key="glow"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="absolute rounded-full pointer-events-none"
                            style={{
                                width: 80,
                                height: 80,
                                top: -20,
                                left: "50%",
                                transform: "translateX(-50%)",
                                background: `radial-gradient(ellipse at 50% 60%, rgba(201,169,110,${isHovering ? 0.5 : 0.3}) 0%, rgba(122,28,46,0.15) 45%, transparent 70%)`,
                                filter: "blur(6px)",
                                transition: "background 0.3s ease",
                            }}
                        />
                    )}
                </AnimatePresence>

                {/* Flame */}
                <AnimatePresence mode="wait">
                    {isLit ? (
                        <motion.div
                            key="flame"
                            initial={{ scaleY: 0, opacity: 0 }}
                            animate={{ scaleY: 1, opacity: 1 }}
                            exit={{ scaleY: 0, opacity: 0, x: [0, 5, -3, 0] }}
                            style={{ transformOrigin: "bottom center" }}
                        >
                            <svg
                                width="28"
                                height="44"
                                viewBox="0 0 28 44"
                                fill="none"
                                style={{
                                    animation: isHovering
                                        ? "candle-flicker 0.28s ease-in-out infinite alternate"
                                        : "candle-flicker 1.8s ease-in-out infinite alternate",
                                }}
                            >
                                {/* Outer warm aura */}
                                <path
                                    d="M14 2C14 2,24 14,24 28C24 38,20 43,14 43C8 43,4 38,4 28C4 14,14 2,14 2Z"
                                    fill="url(#outerF)"
                                    filter="url(#gBlur)"
                                />
                                {/* Mid flame */}
                                <path
                                    d="M14 8C14 8,21 18,21 28C21 36,18 42,14 43C10 42,7 36,7 28C7 18,14 8,14 8Z"
                                    fill="url(#midF)"
                                />
                                {/* Bright inner core */}
                                <path
                                    d="M14 12C14 12,18 21,18 28C18 35,16 41,14 43C12 41,10 35,10 28C10 21,14 12,14 12Z"
                                    fill="url(#innerF)"
                                />
                                {/* White hot tip */}
                                <ellipse cx="14" cy="13" rx="2.5" ry="4" fill="rgba(255,255,240,0.85)" filter="url(#gBlur)" />

                                <defs>
                                    <linearGradient id="outerF" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#c9a96e" stopOpacity="0" />
                                        <stop offset="60%" stopColor="#9a2540" stopOpacity="0.5" />
                                        <stop offset="100%" stopColor="#3a0a14" stopOpacity="0.6" />
                                    </linearGradient>
                                    <linearGradient id="midF" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#fffde0" stopOpacity="0.95" />
                                        <stop offset="25%" stopColor="#f5d56e" />
                                        <stop offset="60%" stopColor="#e06030" />
                                        <stop offset="100%" stopColor="#7a1c2e" />
                                    </linearGradient>
                                    <linearGradient id="innerF" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="white" stopOpacity="0.95" />
                                        <stop offset="40%" stopColor="#fff9d0" stopOpacity="0.8" />
                                        <stop offset="100%" stopColor="#f5c060" stopOpacity="0.4" />
                                    </linearGradient>
                                    <filter id="gBlur">
                                        <feGaussianBlur stdDeviation="1.2" />
                                    </filter>
                                </defs>
                            </svg>
                        </motion.div>
                    ) : (
                        /* Smoke when blown out */
                        <motion.div key="smoke" className="relative h-[44px] w-[28px]">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="absolute rounded-full"
                                    style={{
                                        width: 6,
                                        height: 20,
                                        bottom: 0,
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        background:
                                            "linear-gradient(to top, rgba(180,170,165,0.45), transparent)",
                                        filter: "blur(3px)",
                                    }}
                                    initial={{ opacity: 0, y: 0, x: 0, scale: 0.6 }}
                                    animate={{
                                        opacity: [0, 0.55, 0],
                                        y: [0, -(28 + i * 14)],
                                        x: [0, i % 2 === 0 ? 5 : -5, i % 2 === 0 ? -3 : 3],
                                        scale: [0.6, 1.4, 2.2],
                                    }}
                                    transition={{
                                        duration: 2.2,
                                        delay: i * 0.18,
                                        ease: "easeOut",
                                        repeat: Infinity,
                                        repeatDelay: 0.4,
                                    }}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Wick */}
                <div
                    className="w-[2px] h-3 rounded-full"
                    style={{ background: "linear-gradient(to bottom, #888, #333)", marginTop: -2 }}
                />

                {/* Wax pool reflection */}
                <div
                    className="rounded-full opacity-40"
                    style={{
                        width: 24,
                        height: 5,
                        background: "radial-gradient(ellipse, rgba(201,169,110,0.5), transparent 80%)",
                        filter: "blur(2px)",
                        marginTop: -1,
                    }}
                />
            </div>

            {/* Relight hint when out */}
            <AnimatePresence>
                {!isLit && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-[9px] tracking-[0.2em] uppercase"
                        style={{ color: "#666", marginTop: 4 }}
                    >
                        relighting…
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}
