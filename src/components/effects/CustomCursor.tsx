"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [isHidden, setIsHidden] = useState(true);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setIsHidden(false);
        };

        const handleMouseEnter = () => setIsHidden(false);
        const handleMouseLeave = () => setIsHidden(true);

        const handlePointerCheck = () => {
            const target = document.elementFromPoint(position.x, position.y);
            if (target) {
                const computedStyle = window.getComputedStyle(target);
                setIsPointer(
                    computedStyle.cursor === "pointer" ||
                    target.tagName === "A" ||
                    target.tagName === "BUTTON" ||
                    target.closest("a") !== null ||
                    target.closest("button") !== null
                );
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousemove", handlePointerCheck);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousemove", handlePointerCheck);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [position.x, position.y]);

    // Hide on mobile/touch devices
    if (typeof window !== "undefined" && "ontouchstart" in window) {
        return null;
    }

    return (
        <>
            {/* Main Cursor */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                animate={{
                    x: position.x - (isPointer ? 24 : 8),
                    y: position.y - (isPointer ? 24 : 8),
                    scale: isHidden ? 0 : 1,
                    width: isPointer ? 48 : 16,
                    height: isPointer ? 48 : 16,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5,
                }}
                style={{
                    backgroundColor: "white",
                    borderRadius: "50%",
                }}
            />

            {/* Trailing Cursor */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998] border border-[#d4af37]/50 rounded-full"
                animate={{
                    x: position.x - 20,
                    y: position.y - 20,
                    scale: isHidden ? 0 : isPointer ? 1.5 : 1,
                    opacity: isHidden ? 0 : 0.5,
                }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                    mass: 0.8,
                }}
                style={{
                    width: 40,
                    height: 40,
                }}
            />

            {/* Hide default cursor */}
            <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
        </>
    );
}
