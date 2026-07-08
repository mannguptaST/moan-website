"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        q: "What is Moan?",
        a: "Moan is a premium mood candle brand crafted for romantic evenings, self-care rituals, and intimate spaces. Every candle is made to transform the atmosphere of a room — designed to slow your evening down and make it feel more present, more warm, more memorable.",
    },
    {
        q: "When is Moan launching?",
        a: "Moan launches on 23rd July 2026. Join the waitlist now to secure your spot and receive your exclusive 51% off launch offer.",
    },
    {
        q: "How do I get the 51% off offer?",
        a: "Simply join our waitlist above. Once you sign up, you'll receive a unique discount code — MOAN51 — which applies 51% off your first order at checkout when we launch.",
    },
    {
        q: "What is the candle made of?",
        a: "Every Moan candle is made with 100% natural wax and a carefully selected premium fragrance blend. No synthetic additives, no harmful chemicals. Clean, intentional, and skin-safe in any enclosed space.",
    },
    {
        q: "Is it safe for bedroom ambience?",
        a: "Yes. Moan candles are specifically designed for bedroom and intimate spaces. We use clean-burning natural wax with fragrance levels calibrated for enclosed rooms — warm, sensual, and never overpowering. Always burn on a stable surface and follow safe candle practices.",
    },
    {
        q: "What is the burn time?",
        a: "Our candles have a premium burn time of 60+ hours, ensuring your Moan experience lasts through many long, slow evenings.",
    },
    {
        q: "Where do you deliver?",
        a: "We are launching across India first. Delivery details and shipping zones will be confirmed at launch. Join the waitlist to be notified the moment orders open.",
    },
    {
        q: "Is this a limited launch?",
        a: "Yes. The first batch is limited to 500 units only. This is a deliberate choice — every candle in the first drop is hand-finished with extra care. Once the first batch is gone, the next drop may be months away.",
    },
];

const trustPoints = [
    { icon: "🌿", label: "100% Natural Wax", sub: "Clean burn. No toxins." },
    { icon: "💎", label: "Premium Fragrance", sub: "Calibrated for intimacy." },
    { icon: "🔥", label: "60+ Hour Burn", sub: "Long, slow evenings." },
    { icon: "🛏️", label: "Bedroom Safe", sub: "Designed for enclosed spaces." },
    { icon: "🎁", label: "Limited First Drop", sub: "Only 500 units." },
    { icon: "✨", label: "Mood-First Design", sub: "Crafted for warmth & atmosphere." },
];

function FAQItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
    const [open, setOpen] = useState(false);
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.06 }}
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(201,169,110,0.1)", background: "rgba(14,8,10,0.7)" }}
        >
            <button
                onClick={() => setOpen(!open)}
                id={`faq-${index}`}
                className="w-full flex items-center justify-between px-6 py-5 text-left transition-all duration-300 group"
                style={{ background: open ? "rgba(122,28,46,0.1)" : "transparent" }}
            >
                <span
                    className="text-sm font-light pr-4 leading-snug"
                    style={{ fontFamily: "'Inter', sans-serif", color: open ? "#f0ece8" : "#c8b9a8" }}
                >
                    {faq.q}
                </span>
                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex-shrink-0"
                >
                    <ChevronDown className="w-4 h-4" style={{ color: "#c9a96e" }} />
                </motion.div>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div
                            className="px-6 pb-5"
                            style={{ borderTop: "1px solid rgba(201,169,110,0.08)" }}
                        >
                            <p
                                className="text-sm font-light leading-relaxed pt-4"
                                style={{ color: "#9a8e8a", fontFamily: "'Inter', sans-serif" }}
                            >
                                {faq.a}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function FAQTrust() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-8%" });

    return (
        <section
            id="faq"
            ref={sectionRef}
            className="relative py-24 md:py-32 overflow-hidden"
            style={{ background: "linear-gradient(180deg, #08080a 0%, #0c0810 60%, #08080a 100%)" }}
        >
            {/* Top border */}
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(122,28,46,0.4), transparent)" }}
            />

            {/* Ambient glow */}
            <div
                className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] blur-[160px] pointer-events-none opacity-10"
                style={{ background: "radial-gradient(ellipse, #7a1c2e, transparent)" }}
            />

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* ── Product Trust Details ── */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-14"
                >
                    <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: "#7a1c2e" }}>
                        The Candle
                    </p>
                    <h2
                        className="font-light mb-5"
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(2rem, 5vw, 3.5rem)",
                            color: "#f0ece8",
                        }}
                    >
                        Made for{" "}
                        <em
                            style={{
                                background: "linear-gradient(135deg, #e0c48a, #c9a96e)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                fontStyle: "italic",
                            }}
                        >
                            Mood, Warmth &amp; Atmosphere
                        </em>
                    </h2>
                </motion.div>

                {/* Trust grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-20">
                    {trustPoints.map((point, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.55, delay: 0.1 + i * 0.08 }}
                            className="p-6 rounded-2xl text-center"
                            style={{
                                background: "rgba(14,8,10,0.75)",
                                border: "1px solid rgba(201,169,110,0.1)",
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <p className="text-2xl mb-3">{point.icon}</p>
                            <p
                                className="text-sm font-light mb-1"
                                style={{ color: "#e0c48a", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem" }}
                            >
                                {point.label}
                            </p>
                            <p className="text-[11px]" style={{ color: "#666", fontFamily: "'Inter', sans-serif" }}>
                                {point.sub}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* ── FAQ ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center mb-10"
                >
                    <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: "#7a1c2e" }}>
                        Got Questions?
                    </p>
                    <h2
                        className="font-light"
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(1.8rem, 4vw, 3rem)",
                            color: "#f0ece8",
                        }}
                    >
                        Everything You Need to Know
                    </h2>
                    <div className="h-px w-16 mx-auto mt-5" style={{ background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)" }} />
                </motion.div>

                <div className="max-w-2xl mx-auto space-y-3">
                    {faqs.map((faq, i) => (
                        <FAQItem key={i} faq={faq} index={i} />
                    ))}
                </div>

                {/* Contact nudge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.7, delay: 0.7 }}
                    className="text-center mt-12"
                >
                    <p className="text-sm font-light" style={{ color: "#666" }}>
                        Still have a question?{" "}
                        <a
                            href="mailto:hello@moanworld.com"
                            className="transition-colors"
                            style={{ color: "#c9a96e" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#e0c48a")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "#c9a96e")}
                        >
                            Write to us
                        </a>{" "}
                        and we&apos;ll respond within 24 hours.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
