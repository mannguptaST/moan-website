"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

interface PolicySection {
    title: string;
    content: string;
}

interface PolicyPageLayoutProps {
    title: string;
    subtitle: string;
    lastUpdated: string;
    sections: PolicySection[];
}

const policyNavLinks = [
    { name: "Refund Policy", href: "/refund-policy" },
    { name: "Shipping Policy", href: "/shipping-policy" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms-and-conditions" },
];

export default function PolicyPageLayout({
    title,
    subtitle,
    lastUpdated,
    sections,
}: PolicyPageLayoutProps) {
    return (
        <div style={{ background: "#08080a", minHeight: "100vh" }}>
            <Navbar />

            {/* Hero header */}
            <section
                className="relative pt-36 pb-20 px-6 overflow-hidden"
                style={{
                    background: "linear-gradient(180deg, #0e0509 0%, #08080a 100%)",
                }}
            >
                {/* Ambient glow top */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse at top, rgba(122,28,46,0.2) 0%, transparent 70%)",
                        filter: "blur(40px)",
                    }}
                />

                {/* Decorative top line */}
                <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{
                        background: "linear-gradient(90deg, transparent, rgba(122,28,46,0.4), rgba(201,169,110,0.15), rgba(122,28,46,0.4), transparent)",
                    }}
                />

                <div className="relative z-10 max-w-4xl mx-auto">
                    {/* Back to home */}
                    <motion.div
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-10"
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase transition-colors"
                            style={{ color: "#7a1c2e" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a96e")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "#7a1c2e")}
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            Back to Moan
                        </Link>
                    </motion.div>

                    {/* Eyebrow */}
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-xs tracking-[0.4em] uppercase mb-5"
                        style={{ color: "#7a1c2e" }}
                    >
                        ✦ Legal & Policies
                    </motion.p>

                    {/* Page title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                        className="font-light mb-5"
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
                            lineHeight: 1.1,
                            background: "linear-gradient(135deg, #f0ece8 30%, #c9a96e 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        {title}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.25 }}
                        className="text-base font-light max-w-xl mb-6"
                        style={{
                            color: "#9a8e8a",
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "1.15rem",
                            fontStyle: "italic",
                        }}
                    >
                        {subtitle}
                    </motion.p>

                    {/* Last updated */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="text-xs"
                        style={{ color: "#555" }}
                    >
                        Last updated: {lastUpdated}
                    </motion.p>
                </div>
            </section>

            {/* Main content */}
            <section className="px-6 pb-24">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                        {/* Sidebar — other policies */}
                        <motion.aside
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="lg:col-span-1 lg:sticky lg:top-28 self-start"
                        >
                            <div
                                className="rounded-2xl p-6"
                                style={{
                                    background: "linear-gradient(135deg, rgba(122,28,46,0.08), rgba(14,10,12,0.6))",
                                    border: "1px solid rgba(201,169,110,0.1)",
                                    backdropFilter: "blur(12px)",
                                }}
                            >
                                <p
                                    className="text-xs tracking-[0.3em] uppercase mb-6"
                                    style={{ color: "#7a1c2e" }}
                                >
                                    Our Policies
                                </p>
                                <nav className="space-y-1">
                                    {policyNavLinks.map((link) => {
                                        const isActive =
                                            typeof window !== "undefined" &&
                                            window.location.pathname === link.href;
                                        return (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                className="group flex items-center justify-between px-4 py-3 rounded-xl text-sm font-light transition-all duration-200"
                                                style={{
                                                    color: link.name === title ? "#c9a96e" : "#9a8e8a",
                                                    background:
                                                        link.name === title
                                                            ? "rgba(122,28,46,0.15)"
                                                            : "transparent",
                                                    borderLeft:
                                                        link.name === title
                                                            ? "2px solid #7a1c2e"
                                                            : "2px solid transparent",
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (link.name !== title) {
                                                        e.currentTarget.style.color = "#f0ece8";
                                                        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (link.name !== title) {
                                                        e.currentTarget.style.color = "#9a8e8a";
                                                        e.currentTarget.style.background = "transparent";
                                                    }
                                                }}
                                            >
                                                <span>{link.name}</span>
                                                <ChevronRight
                                                    className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    style={{ color: "#c9a96e" }}
                                                />
                                            </Link>
                                        );
                                    })}
                                </nav>
                            </div>

                            {/* Contact card */}
                            <div
                                className="rounded-2xl p-6 mt-6"
                                style={{
                                    background: "rgba(14,10,12,0.5)",
                                    border: "1px solid rgba(255,255,255,0.05)",
                                }}
                            >
                                <p
                                    className="text-xs tracking-[0.25em] uppercase mb-3"
                                    style={{ color: "#555" }}
                                >
                                    Need Help?
                                </p>
                                <p className="text-xs font-light leading-relaxed mb-4" style={{ color: "#9a8e8a" }}>
                                    Have a question about your order or our policies? We&apos;re here to help.
                                </p>
                                <a
                                    href="mailto:moanofficials@gmail.com"
                                    className="text-xs tracking-[0.1em] uppercase transition-colors"
                                    style={{ color: "#c9a96e" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = "#e0c48a")}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = "#c9a96e")}
                                >
                                    moanofficials@gmail.com →
                                </a>
                            </div>
                        </motion.aside>

                        {/* Policy sections */}
                        <div className="lg:col-span-3 space-y-8">
                            {sections.map((section, index) => (
                                <motion.div
                                    key={section.title}
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1 + index * 0.07 }}
                                    className="rounded-2xl p-8"
                                    style={{
                                        background:
                                            index === 0
                                                ? "linear-gradient(135deg, rgba(122,28,46,0.12), rgba(14,10,12,0.7))"
                                                : "rgba(14,10,12,0.45)",
                                        border: `1px solid ${index === 0 ? "rgba(122,28,46,0.2)" : "rgba(255,255,255,0.04)"}`,
                                        backdropFilter: "blur(8px)",
                                    }}
                                >
                                    {/* Section number + title */}
                                    <div className="flex items-start gap-4 mb-5">
                                        <span
                                            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium"
                                            style={{
                                                background: "rgba(122,28,46,0.25)",
                                                color: "#c9a96e",
                                                border: "1px solid rgba(122,28,46,0.3)",
                                                fontFamily: "'Cormorant Garamond', serif",
                                                fontSize: "0.95rem",
                                            }}
                                        >
                                            {index + 1}
                                        </span>
                                        <h2
                                            className="font-light pt-1"
                                            style={{
                                                fontFamily: "'Cormorant Garamond', serif",
                                                fontSize: "clamp(1.15rem, 3vw, 1.5rem)",
                                                color: "#c9a96e",
                                                letterSpacing: "0.02em",
                                            }}
                                        >
                                            {section.title}
                                        </h2>
                                    </div>

                                    {/* Divider */}
                                    <div
                                        className="h-px mb-6"
                                        style={{
                                            background: "linear-gradient(90deg, rgba(122,28,46,0.3), transparent)",
                                        }}
                                    />

                                    {/* Content */}
                                    <div className="space-y-3">
                                        {section.content.split("\n\n").map((paragraph, pIndex) => {
                                            const isBulletBlock = paragraph.includes("\n•") || paragraph.startsWith("•");
                                            const isNumberedBlock = /^\d+\./.test(paragraph.trim());

                                            if (isBulletBlock) {
                                                const lines = paragraph.split("\n");
                                                return (
                                                    <div key={pIndex} className="space-y-1">
                                                        {lines.map((line, lIndex) => {
                                                            if (line.startsWith("•")) {
                                                                return (
                                                                    <div key={lIndex} className="flex items-start gap-3">
                                                                        <span
                                                                            className="flex-shrink-0 mt-2 w-1 h-1 rounded-full"
                                                                            style={{ background: "#7a1c2e" }}
                                                                        />
                                                                        <p
                                                                            className="text-sm font-light leading-relaxed"
                                                                            style={{ color: "#c8b9a8" }}
                                                                        >
                                                                            {line.replace("• ", "")}
                                                                        </p>
                                                                    </div>
                                                                );
                                                            }
                                                            return (
                                                                <p
                                                                    key={lIndex}
                                                                    className="text-sm font-light leading-relaxed"
                                                                    style={{ color: "#9a8e8a" }}
                                                                >
                                                                    {line}
                                                                </p>
                                                            );
                                                        })}
                                                    </div>
                                                );
                                            }

                                            if (isNumberedBlock) {
                                                const lines = paragraph.split("\n");
                                                return (
                                                    <div key={pIndex} className="space-y-2">
                                                        {lines.map((line, lIndex) => {
                                                            const match = line.match(/^(\d+)\. (.*)/);
                                                            if (match) {
                                                                return (
                                                                    <div key={lIndex} className="flex items-start gap-3">
                                                                        <span
                                                                            className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                                                                            style={{
                                                                                background: "rgba(122,28,46,0.2)",
                                                                                color: "#7a1c2e",
                                                                                fontFamily: "'Cormorant Garamond', serif",
                                                                                fontSize: "0.75rem",
                                                                                marginTop: "2px",
                                                                            }}
                                                                        >
                                                                            {match[1]}
                                                                        </span>
                                                                        <p
                                                                            className="text-sm font-light leading-relaxed"
                                                                            style={{ color: "#c8b9a8" }}
                                                                        >
                                                                            {match[2]}
                                                                        </p>
                                                                    </div>
                                                                );
                                                            }
                                                            return (
                                                                <p
                                                                    key={lIndex}
                                                                    className="text-sm font-light leading-relaxed"
                                                                    style={{ color: "#9a8e8a" }}
                                                                >
                                                                    {line}
                                                                </p>
                                                            );
                                                        })}
                                                    </div>
                                                );
                                            }

                                            return (
                                                <p
                                                    key={pIndex}
                                                    className="text-sm font-light leading-relaxed"
                                                    style={{ color: "#9a8e8a" }}
                                                >
                                                    {paragraph}
                                                </p>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Bottom CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.5 }}
                                className="rounded-2xl p-8 text-center"
                                style={{
                                    background: "linear-gradient(135deg, rgba(122,28,46,0.12), rgba(58,10,20,0.08))",
                                    border: "1px solid rgba(201,169,110,0.12)",
                                }}
                            >
                                <p
                                    className="text-xs tracking-[0.3em] uppercase mb-3"
                                    style={{ color: "#7a1c2e" }}
                                >
                                    ✦ Questions?
                                </p>
                                <p
                                    className="font-light mb-2"
                                    style={{
                                        fontFamily: "'Cormorant Garamond', serif",
                                        fontSize: "1.4rem",
                                        color: "#f0ece8",
                                    }}
                                >
                                    We&apos;re Always Here
                                </p>
                                <p className="text-sm font-light mb-6" style={{ color: "#9a8e8a" }}>
                                    Couldn&apos;t find what you were looking for? Reach out — we respond within 24–48 hours.
                                </p>
                                <a
                                    href="mailto:moanofficials@gmail.com"
                                    id="policy-contact-cta"
                                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm tracking-[0.12em] uppercase transition-all duration-300"
                                    style={{
                                        background: "linear-gradient(135deg, #7a1c2e, #3a0a14)",
                                        color: "#e0c48a",
                                        border: "1px solid rgba(201,169,110,0.2)",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "linear-gradient(135deg, #9a2540, #570f1e)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "linear-gradient(135deg, #7a1c2e, #3a0a14)";
                                    }}
                                >
                                    Email Us →
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
