"use client";

import { useEffect, useRef } from "react";

export default function MorphingBlob() {
    const blobRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Subtle mouse interaction
        const handleMouseMove = (e: MouseEvent) => {
            if (!blobRef.current) return;
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 30;
            const y = (clientY / window.innerHeight - 0.5) * 30;

            blobRef.current.style.transform = `translate(${x}px, ${y}px)`;
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Primary Blob */}
            <div
                ref={blobRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-[2000ms] ease-out"
            >
                <div className="relative w-[800px] h-[800px]">
                    {/* Morphing blob with CSS animation */}
                    <div
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-[#d4af37]/20 via-[#b87333]/10 to-transparent blur-[100px] animate-morph"
                    />

                    {/* Secondary blob - offset timing */}
                    <div
                        className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#b87333]/15 via-[#d4af37]/5 to-transparent blur-[120px] animate-morph-reverse"
                        style={{ animationDelay: "-5s" }}
                    />
                </div>
            </div>

            {/* Floating particles */}
            <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-[#d4af37]/40 animate-float-particle" />
            <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-[#d4af37]/30 animate-float-particle" style={{ animationDelay: "-2s" }} />
            <div className="absolute top-1/3 left-1/4 w-1 h-1 rounded-full bg-[#d4af37]/50 animate-float-particle" style={{ animationDelay: "-4s" }} />
        </div>
    );
}
