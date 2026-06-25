"use client";

import { useEffect } from "react";

export default function ClickRipple() {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            // Skip ripple on interactive elements to avoid visual noise
            const target = e.target as HTMLElement;
            if (
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA" ||
                target.tagName === "SELECT"
            )
                return;

            const el = document.createElement("div");
            el.className = "click-ripple-el";
            el.style.left = `${e.clientX}px`;
            el.style.top = `${e.clientY}px`;
            document.body.appendChild(el);
            setTimeout(() => el.remove(), 750);
        };

        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, []);

    return null;
}
