"use client";

import { useRef, ReactNode } from "react";

interface Tilt3DProps {
    children: ReactNode;
    maxTilt?: number;
    className?: string;
    style?: React.CSSProperties;
}

export default function Tilt3D({ children, maxTilt = 10, className = "", style }: Tilt3DProps) {
    const ref = useRef<HTMLDivElement>(null);
    const shineRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        ref.current.style.transform = `perspective(900px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg) scale3d(1.015, 1.015, 1.015)`;
        if (shineRef.current) {
            shineRef.current.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(201,169,110,0.09) 0%, transparent 65%)`;
            shineRef.current.style.opacity = "1";
        }
    };

    const handleMouseLeave = () => {
        if (!ref.current) return;
        ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
        if (shineRef.current) shineRef.current.style.opacity = "0";
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative ${className}`}
            style={{ transition: "transform 0.12s ease-out", transformStyle: "preserve-3d", ...style }}
        >
            {children}
            <div
                ref={shineRef}
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0"
                style={{ transition: "opacity 0.3s ease" }}
            />
        </div>
    );
}
