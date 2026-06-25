"use client";

import { useEffect, useRef } from "react";

export default function MorphingBlob() {
    const blobRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!blobRef.current) return;
            const x = (e.clientX / window.innerWidth - 0.5) * 25;
            const y = (e.clientY / window.innerHeight - 0.5) * 25;
            blobRef.current.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Primary wine-red morphing blob */}
            <div
                ref={blobRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-[2500ms] ease-out"
            >
                <div className="relative w-[700px] h-[700px]">
                    <div
                        className="absolute inset-0 rounded-full blur-[120px] animate-morph"
                        style={{ background: "radial-gradient(ellipse, rgba(122,28,46,0.22), rgba(58,10,20,0.12), transparent)" }}
                    />
                    <div
                        className="absolute inset-0 rounded-full blur-[140px] animate-morph-reverse"
                        style={{ background: "radial-gradient(ellipse, rgba(201,169,110,0.10), rgba(122,28,46,0.08), transparent)", animationDelay: "-6s" }}
                    />
                </div>
            </div>

            {/* Candle glow accent — center bottom */}
            <div
                className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[500px] h-[300px] blur-[100px] animate-pulse-glow"
                style={{ background: "radial-gradient(ellipse, rgba(122,28,46,0.18), transparent)" }}
            />

            {/* Floating dust particles */}
            <div className="absolute top-1/4 right-1/3 w-1.5 h-1.5 rounded-full bg-[#c9a96e]/30 animate-float-particle" />
            <div className="absolute bottom-1/3 left-1/4 w-1 h-1 rounded-full bg-[#c9a96e]/25 animate-float-particle" style={{ animationDelay: "-3s" }} />
            <div className="absolute top-1/3 left-1/3 w-2 h-2 rounded-full bg-[#7a1c2e]/40 animate-float-particle" style={{ animationDelay: "-6s" }} />
            <div className="absolute top-2/3 right-1/4 w-1 h-1 rounded-full bg-[#c9a96e]/20 animate-float-particle" style={{ animationDelay: "-9s" }} />
        </div>
    );
}
