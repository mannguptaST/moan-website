"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [isHidden, setIsHidden] = useState(true);
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        if ("ontouchstart" in window) {
            setIsTouch(true);
            return;
        }

        const onMove = (e: MouseEvent) => {
            setPos({ x: e.clientX, y: e.clientY });
            setIsHidden(false);
            const el = e.target as HTMLElement;
            setIsPointer(
                window.getComputedStyle(el).cursor === "pointer" ||
                    el.tagName === "A" ||
                    el.tagName === "BUTTON" ||
                    !!el.closest("a") ||
                    !!el.closest("button")
            );
        };

        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseleave", () => setIsHidden(true));
        document.addEventListener("mouseenter", () => setIsHidden(false));
        return () => document.removeEventListener("mousemove", onMove);
    }, []);

    if (isTouch) return null;

    return (
        <>
            {/* Precise golden core dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
                animate={{
                    x: pos.x - (isPointer ? 0 : 5),
                    y: pos.y - (isPointer ? 0 : 5),
                    width: isPointer ? 0 : 10,
                    height: isPointer ? 0 : 10,
                    opacity: isHidden ? 0 : 1,
                }}
                transition={{ type: "spring", stiffness: 700, damping: 30, mass: 0.3 }}
                style={{
                    background: "radial-gradient(circle, #f5d56e 0%, #c9a96e 60%, transparent 100%)",
                    boxShadow: "0 0 6px rgba(245,213,110,0.8), 0 0 14px rgba(201,169,110,0.4)",
                }}
            />

            {/* Outer ring — springs behind */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
                animate={{
                    x: pos.x - (isPointer ? 22 : 18),
                    y: pos.y - (isPointer ? 22 : 18),
                    width: isPointer ? 44 : 36,
                    height: isPointer ? 44 : 36,
                    opacity: isHidden ? 0 : isPointer ? 0.75 : 0.45,
                }}
                transition={{ type: "spring", stiffness: 180, damping: 22, mass: 0.6 }}
                style={{
                    border: isPointer
                        ? "1px solid rgba(245,213,110,0.65)"
                        : "1px solid rgba(201,169,110,0.38)",
                    background: isPointer
                        ? "radial-gradient(circle, rgba(201,169,110,0.12), transparent 70%)"
                        : "transparent",
                    boxShadow: isPointer
                        ? "0 0 12px rgba(201,169,110,0.2), inset 0 0 8px rgba(201,169,110,0.06)"
                        : "none",
                    transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
                }}
            />

            {/* Slow trailing glow */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full"
                animate={{ x: pos.x - 30, y: pos.y - 30, opacity: isHidden ? 0 : 0.18 }}
                transition={{ type: "spring", stiffness: 80, damping: 18, mass: 1 }}
                style={{
                    width: 60,
                    height: 60,
                    background: "radial-gradient(circle, rgba(201,169,110,0.25), transparent 70%)",
                    filter: "blur(4px)",
                }}
            />

            <style jsx global>{`
                * { cursor: none !important; }
            `}</style>
        </>
    );
}
