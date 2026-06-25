"use client";

import { useEffect, useState } from "react";

interface Particle {
    id: number;
    left: number;
    size: number;
    delay: number;
    duration: number;
    variant: "a" | "b" | "c";
}

export default function EmberParticles({ count = 24 }: { count?: number }) {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const variants = ["a", "b", "c"] as const;
        setParticles(
            Array.from({ length: count }, (_, i) => ({
                id: i,
                left: Math.random() * 94 + 3,
                size: Math.random() * 3.5 + 1.2,
                delay: Math.random() * 14,
                duration: Math.random() * 7 + 8,
                variant: variants[i % 3],
            }))
        );
    }, [count]);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[3]">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${p.left}%`,
                        bottom: "8%",
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        background:
                            p.size > 3.8
                                ? "radial-gradient(circle, #f5d56e 0%, #c9a96e 45%, transparent 80%)"
                                : p.size > 2.8
                                ? "radial-gradient(circle, #e0c48a 0%, rgba(201,169,110,0.55) 60%, transparent)"
                                : "radial-gradient(circle, #c9a96e 0%, transparent 75%)",
                        boxShadow:
                            p.size > 3.2
                                ? `0 0 ${p.size * 3}px rgba(245,213,110,0.75), 0 0 ${p.size * 6}px rgba(201,169,110,0.3)`
                                : p.size > 2.2
                                ? `0 0 ${p.size * 2}px rgba(201,169,110,0.5)`
                                : "none",
                        animation: `ember-rise-${p.variant} ${p.duration}s ease-in-out ${p.delay}s infinite`,
                        filter: p.size > 2.5 ? "blur(0.4px)" : "none",
                    }}
                />
            ))}
        </div>
    );
}
