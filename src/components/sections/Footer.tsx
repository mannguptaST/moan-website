"use client";

import { motion } from "framer-motion";
import { Instagram, Facebook, Mail, ArrowUpRight } from "lucide-react";
import MoanLogo from "@/components/ui/MoanLogo";

const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "The Mood", href: "#product" },
    { name: "Mood Notes", href: "#mood-notes" },
    { name: "Follow the Mood", href: "#follow-the-mood" },
    { name: "FAQ", href: "#faq" },
    { name: "Join Waitlist", href: "#coming-soon" },
];

const legalLinks = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Contact", href: "mailto:moanofficials@gmail.com" },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            id="contact"
            className="relative pt-20 pb-8 overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0" style={{ background: "#08080a" }} />

            {/* Top border */}
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(122,28,46,0.5), rgba(201,169,110,0.2), rgba(122,28,46,0.5), transparent)" }}
            />

            {/* Ambient glow */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] blur-[120px] pointer-events-none opacity-15"
                style={{ background: "radial-gradient(ellipse, #7a1c2e, transparent)" }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* ── Instagram Follow Block ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 py-12 px-6 rounded-3xl"
                    style={{
                        background: "linear-gradient(135deg, rgba(122,28,46,0.15), rgba(58,10,20,0.1))",
                        border: "1px solid rgba(201,169,110,0.15)",
                        backdropFilter: "blur(10px)",
                    }}
                >
                    <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: "#7a1c2e" }}>
                        Stay Connected
                    </p>
                    <h2
                        className="font-light mb-4"
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
                            color: "#f0ece8",
                        }}
                    >
                        Don&apos;t Miss the{" "}
                        <em
                            style={{
                                background: "linear-gradient(135deg, #e0c48a, #c9a96e)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                fontStyle: "italic",
                            }}
                        >
                            First Drop
                        </em>
                    </h2>
                    <p className="text-sm font-light mb-8 max-w-sm mx-auto" style={{ color: "#9a8e8a" }}>
                        Follow @moanofficials on Instagram for launch updates, mood content, and early access to our 23rd July drop.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="https://www.instagram.com/moanofficials?igsh=MTZnbngzcWhxZW84bQ==&utm_source=ig_contact_invite"
                            target="_blank"
                            rel="noopener noreferrer"
                            id="footer-instagram-follow-cta"
                            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full overflow-hidden transition-all duration-500"
                            style={{ border: "1px solid rgba(201,169,110,0.3)" }}
                        >
                            <span className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(135deg, #7a1c2e, #3a0a14)" }} />
                            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, #9a2540, #570f1e)" }} />
                            <Instagram className="relative w-4 h-4" style={{ color: "#e0c48a" }} />
                            <span className="relative text-sm font-medium tracking-[0.12em] uppercase" style={{ color: "#e0c48a" }}>
                                Follow @moanofficials
                            </span>
                        </a>
                        <a
                            href="#coming-soon"
                            id="footer-waitlist-hero-cta"
                            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm tracking-[0.12em] uppercase transition-all duration-300"
                            style={{
                                color: "#c9a96e",
                                border: "1px solid rgba(201,169,110,0.2)",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(122,28,46,0.12)";
                                e.currentTarget.style.borderColor = "rgba(201,169,110,0.4)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.borderColor = "rgba(201,169,110,0.2)";
                            }}
                        >
                            Claim 50% Off →
                        </a>
                    </div>
                </motion.div>

                {/* Main footer grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand column */}
                    <div className="lg:col-span-2">
                        {/* Logo */}
                        <a href="#home" className="inline-block mb-4">
                            <MoanLogo
                                height={44}
                                glowSize="180px"
                                showTagline
                                tagline="Light the Mood."
                            />
                        </a>

                        <p
                            className="text-sm leading-relaxed font-light mb-3 max-w-xs"
                            style={{ color: "#9a8e8a" }}
                        >
                            A premium mood candle brand designed to create sensual, romantic,
                            and intimate atmospheres. Crafted with intention. Lit with purpose.
                        </p>

                        {/* Launch date */}
                        <p
                            className="text-xs tracking-[0.2em] uppercase mb-6"
                            style={{ color: "#7a1c2e" }}
                        >
                            ✦ Launching 23rd July 2026
                        </p>

                        {/* Social icons */}
                        <div className="flex items-center gap-4">
                            {/* Instagram */}
                            <motion.a
                                href="https://www.instagram.com/moanofficials?igsh=MTZnbngzcWhxZW84bQ==&utm_source=ig_contact_invite"
                                target="_blank"
                                rel="noopener noreferrer"
                                id="footer-instagram"
                                whileHover={{ y: -3 }}
                                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                                style={{
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    color: "#9a8e8a",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = "rgba(122,28,46,0.5)";
                                    e.currentTarget.style.color = "#f0ece8";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                                    e.currentTarget.style.color = "#9a8e8a";
                                }}
                                aria-label="Instagram @moanofficials"
                            >
                                <Instagram className="w-4 h-4" />
                            </motion.a>

                            {/* Facebook */}
                            <motion.a
                                href="https://www.facebook.com/share/1L8DABDG6K/?mibextid=wwXIfr"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -3 }}
                                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                                style={{ border: "1px solid rgba(255,255,255,0.08)", color: "#9a8e8a" }}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(122,28,46,0.5)"; e.currentTarget.style.color = "#f0ece8"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#9a8e8a"; }}
                                aria-label="Facebook"
                            >
                                <Facebook className="w-4 h-4" />
                            </motion.a>

                            {/* Email */}
                            <motion.a
                                href="mailto:moanofficials@gmail.com"
                                id="footer-email"
                                whileHover={{ y: -3 }}
                                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                                style={{
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    color: "#9a8e8a",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = "rgba(122,28,46,0.5)";
                                    e.currentTarget.style.color = "#f0ece8";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                                    e.currentTarget.style.color = "#9a8e8a";
                                }}
                                aria-label="Email"
                            >
                                <Mail className="w-4 h-4" />
                            </motion.a>
                        </div>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h4
                            className="text-xs tracking-[0.25em] uppercase mb-7"
                            style={{ color: "#7a1c2e" }}
                        >
                            Navigation
                        </h4>
                        <ul className="space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="inline-flex items-center gap-1.5 text-sm font-light transition-colors group"
                                        style={{ color: "#9a8e8a" }}
                                        onMouseEnter={(e) => (e.currentTarget.style.color = "#f0ece8")}
                                        onMouseLeave={(e) => (e.currentTarget.style.color = "#9a8e8a")}
                                    >
                                        {link.name}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Stay Close */}
                    <div>
                        <h4
                            className="text-xs tracking-[0.25em] uppercase mb-7"
                            style={{ color: "#7a1c2e" }}
                        >
                            Stay Close
                        </h4>
                        <p className="text-sm font-light leading-relaxed mb-3" style={{ color: "#9a8e8a" }}>
                            Be the first to know when the flame is ready.
                        </p>

                        {/* Instagram handle prominent */}
                        <a
                            href="https://www.instagram.com/moanofficials?igsh=MTZnbngzcWhxZW84bQ==&utm_source=ig_contact_invite"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase mb-4 transition-colors"
                            style={{ color: "#c9a96e" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#e0c48a")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "#c9a96e")}
                        >
                            <Instagram className="w-3.5 h-3.5" />
                            @moanofficials
                        </a>

                        <br />

                        <a
                            href="#coming-soon"
                            id="footer-waitlist-cta"
                            className="group inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase transition-colors mt-2"
                            style={{ color: "#c9a96e" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#e0c48a")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "#c9a96e")}
                        >
                            Join the Waitlist
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                        </a>

                        <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                            <p className="text-xs font-light leading-relaxed" style={{ color: "#555" }}>
                                moanworld.com
                                <br />
                                moanofficials@gmail.com
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div
                    className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
                >
                    <p className="text-xs" style={{ color: "#444" }}>
                        © {currentYear} Moan. All rights reserved. · Launching 23rd July 2026
                    </p>

                    <div className="flex items-center gap-6">
                        {legalLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-xs transition-colors"
                                style={{ color: "#444" }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "#9a8e8a")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
