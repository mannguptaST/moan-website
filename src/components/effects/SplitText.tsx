"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SplitTextProps {
    children: string;
    className?: string;
    delay?: number;
    staggerDelay?: number;
    animation?: "fadeUp" | "fadeIn" | "scale";
}

export default function SplitText({
    children,
    className = "",
    delay = 0,
    staggerDelay = 0.03,
    animation = "fadeUp",
}: SplitTextProps) {
    const characters = children.split("");

    const animations = {
        fadeUp: {
            initial: { opacity: 0, y: 40 },
            animate: { opacity: 1, y: 0 },
        },
        fadeIn: {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
        },
        scale: {
            initial: { opacity: 0, scale: 0.5 },
            animate: { opacity: 1, scale: 1 },
        },
    };

    const selectedAnimation = animations[animation];

    return (
        <span className={className} aria-label={children}>
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    initial={selectedAnimation.initial}
                    animate={selectedAnimation.animate}
                    transition={{
                        duration: 0.5,
                        delay: delay + index * staggerDelay,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block"
                    style={{
                        whiteSpace: char === " " ? "pre" : "normal",
                    }}
                    aria-hidden="true"
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </span>
    );
}

// Word-level split for better performance on longer text
interface SplitWordsProps {
    children: string;
    className?: string;
    delay?: number;
    staggerDelay?: number;
}

export function SplitWords({
    children,
    className = "",
    delay = 0,
    staggerDelay = 0.08,
}: SplitWordsProps) {
    const words = children.split(" ");

    return (
        <span className={className} aria-label={children}>
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 30, rotateX: -20 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                        duration: 0.6,
                        delay: delay + index * staggerDelay,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block mr-[0.25em]"
                    style={{ transformOrigin: "bottom" }}
                    aria-hidden="true"
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
}
