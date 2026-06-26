"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function ComingSoon() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-8%" });
    const { user, joinWaitlist, openSignUp } = useAuth();

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState<"male" | "female" | "other" | "">("");
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [guestSubmitted, setGuestSubmitted] = useState(false);
    const [phoneError, setPhoneError] = useState("");
    const [error, setError] = useState("");

    const submitted = !!user?.joinedWaitlist || guestSubmitted;
    const discountCode = user?.discountCode || "MOAN50";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const targetEmail = user?.email || email;
        if (!targetEmail || !gender) return;
        const digits = phone.replace(/\D/g, "");
        if (phone && digits.length !== 10) {
            setPhoneError("Phone number must be exactly 10 digits.");
            return;
        }
        setPhoneError("");
        setError("");
        setIsLoading(true);
        try {
            await joinWaitlist(targetEmail, phone, gender);
            if (!user) setGuestSubmitted(true);
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };


    const copyCode = () => {
        navigator.clipboard.writeText(discountCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section
            id="coming-soon"
            ref={sectionRef}
            className="relative overflow-hidden min-h-screen flex items-center"
        >
            {/* Full background image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero-candles.jpg"
                    alt="Moan candles — Awaken the Mood"
                    fill
                    className="object-cover object-center"
                    quality={85}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(8,8,10,0.82) 0%, rgba(8,8,10,0.62) 50%, rgba(8,8,10,0.90) 100%)",
                    }}
                />
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#08080a] to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#08080a] to-transparent" />
            </div>

            <div className="absolute top-0 left-0 right-0 h-px z-10" style={{ background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)" }} />

            <div className="relative z-10 w-full max-w-2xl mx-auto px-6 py-32 md:py-44 text-center">
                {/* Scarcity badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
                    style={{
                        background: "rgba(122,28,46,0.2)",
                        border: "1px solid rgba(201,169,110,0.3)",
                        backdropFilter: "blur(12px)",
                    }}
                >
                    <span className="text-[10px]" style={{ color: "#c9a96e" }}>✦</span>
                    <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "#c9a96e" }}>
                        Limited First Batch · Only 500 Units
                    </span>
                </motion.div>

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="mb-6"
                >
                    <p className="text-xs tracking-[0.35em] uppercase mb-5" style={{ color: "#9a8e8a" }}>
                        Coming Soon
                    </p>
                    <h2
                        className="font-light leading-tight"
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "clamp(2.8rem, 8vw, 5rem)",
                            color: "#f0ece8",
                            textShadow: "0 4px 30px rgba(0,0,0,0.5)",
                        }}
                    >
                        The flame is
                        <br />
                        <em
                            className="not-italic"
                            style={{
                                background: "linear-gradient(135deg, #e0c48a, #c9a96e)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            almost here.
                        </em>
                    </h2>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-sm md:text-base leading-relaxed font-light mb-12 max-w-sm mx-auto"
                    style={{ color: "#c8b9a8", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
                >
                    Join the private waitlist. First 500 members get early access
                    and exclusive launch pricing — before we go public.
                </motion.p>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.3 }}
                >
                    <AnimatePresence mode="wait">
                        {!submitted ? (
                            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                {/* Nudge to create account */}
                                {!user && (
                                    <p className="text-xs mb-4" style={{ color: "#9a8e8a" }}>
                                        <button
                                            onClick={openSignUp}
                                            className="underline transition-colors"
                                            style={{ color: "#c9a96e" }}
                                        >
                                            Create a free account
                                        </button>{" "}
                                        to save your spot &amp; discount code.
                                    </p>
                                )}
                                <form
                                    id="waitlist-form"
                                    onSubmit={handleSubmit}
                                    className="flex flex-col gap-3 max-w-md mx-auto"
                                >
                                    {!user && (
                                        <input
                                            type="email"
                                            id="waitlist-email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email address"
                                            required
                                            className="flex-1 px-5 py-4 rounded-full text-sm outline-none transition-all duration-300"
                                            style={{
                                                background: "rgba(8,8,10,0.75)",
                                                border: "1px solid rgba(255,255,255,0.12)",
                                                color: "#f0ece8",
                                                fontFamily: "'Inter', sans-serif",
                                                backdropFilter: "blur(12px)",
                                            }}
                                            onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(201,169,110,0.5)"; }}
                                            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
                                        />
                                    )}
                                    {user && (
                                        <div
                                            className="flex items-center gap-3 px-5 py-3.5 rounded-xl"
                                            style={{ background: "rgba(8,8,10,0.75)", border: "1px solid rgba(201,169,110,0.2)", backdropFilter: "blur(12px)" }}
                                        >
                                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0" style={{ background: "linear-gradient(135deg, #7a1c2e, #3a0a14)", color: "#e0c48a" }}>
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="text-left">
                                                <p className="text-xs" style={{ color: "#f0ece8" }}>{user.name}</p>
                                                <p className="text-[10px]" style={{ color: "#9a8e8a" }}>{user.email}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Phone */}
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Phone number (optional)"
                                        className="w-full px-5 py-4 rounded-xl text-sm outline-none transition-all duration-300"
                                        style={{ background: "rgba(8,8,10,0.75)", border: "1px solid rgba(255,255,255,0.12)", color: "#f0ece8", fontFamily: "'Inter', sans-serif", backdropFilter: "blur(12px)" }}
                                        onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(201,169,110,0.5)"; }}
                                        onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
                                    />
                                    {phoneError && (
                                        <p className="text-[11px] mt-1 px-1" style={{ color: "#e07070" }}>{phoneError}</p>
                                    )}

                                    {/* Gender */}
                                    <div>
                                        <p className="text-[10px] tracking-[0.2em] uppercase mb-2 text-left" style={{ color: "#9a8e8a" }}>I identify as *</p>
                                        <div className="grid grid-cols-3 gap-2">
                                            {(["male", "female", "other"] as const).map((g) => (
                                                <button
                                                    key={g}
                                                    type="button"
                                                    onClick={() => setGender(g)}
                                                    className="py-3 rounded-xl text-xs tracking-[0.1em] capitalize transition-all duration-250"
                                                    style={{
                                                        background: gender === g ? "linear-gradient(135deg, #7a1c2e, #3a0a14)" : "rgba(8,8,10,0.75)",
                                                        border: gender === g ? "1px solid rgba(201,169,110,0.3)" : "1px solid rgba(255,255,255,0.1)",
                                                        color: gender === g ? "#e0c48a" : "#9a8e8a",
                                                        backdropFilter: "blur(12px)",
                                                    }}
                                                >
                                                    {g === "male" ? "Male" : g === "female" ? "Female" : "Other"}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        id="waitlist-submit"
                                        disabled={isLoading || !gender}
                                        className="group relative px-7 py-4 rounded-full overflow-hidden inline-flex items-center justify-center gap-2 w-full"
                                        style={{ opacity: (isLoading || !gender) ? 0.6 : 1 }}
                                    >
                                        <span className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(135deg, #7a1c2e, #3a0a14)" }} />
                                        <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: "linear-gradient(135deg, #9a2540, #570f1e)" }} />
                                        <span className="relative text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: "#e0c48a" }}>
                                            {isLoading ? "Joining…" : "Claim My Spot — 50% Off"}
                                        </span>
                                    </button>
                                </form>
                                {error && (
                                    <p className="mt-3 text-xs text-center" style={{ color: "#e07070" }}>
                                        {error}
                                    </p>
                                )}
                                {!user && (
                                    <p className="mt-4 text-[11px]" style={{ color: "#666" }}>
                                        No spam. Unsubscribe anytime.
                                    </p>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="max-w-sm mx-auto"
                            >
                                {/* Success card */}
                                <div
                                    className="py-8 px-8 rounded-2xl mb-4"
                                    style={{
                                        background: "rgba(8,8,10,0.88)",
                                        border: "1px solid rgba(201,169,110,0.3)",
                                        backdropFilter: "blur(16px)",
                                    }}
                                >
                                    <p className="text-2xl mb-3" style={{ color: "#c9a96e" }}>✦</p>
                                    <p className="text-lg font-light mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f0ece8" }}>
                                        You&apos;re on the list.
                                    </p>
                                    <p className="text-sm font-light mb-6" style={{ color: "#9a8e8a" }}>
                                        We&apos;ll reach out the moment the flame is ready.
                                    </p>

                                    {/* Discount code */}
                                    {discountCode && (
                                        <div
                                            className="rounded-xl p-5"
                                            style={{ background: "rgba(122,28,46,0.15)", border: "1px solid rgba(201,169,110,0.25)" }}
                                        >
                                            <p className="text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: "#9a8e8a" }}>
                                                Your exclusive discount
                                            </p>
                                            <button
                                                onClick={copyCode}
                                                className="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 group"
                                                style={{ background: "rgba(8,8,10,0.6)", border: "1px solid rgba(201,169,110,0.2)" }}
                                            >
                                                <span
                                                    className="text-2xl font-light tracking-[0.3em]"
                                                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9a96e" }}
                                                >
                                                    {discountCode}
                                                </span>
                                                <span className="text-[10px] tracking-[0.15em] uppercase transition-colors" style={{ color: copied ? "#6dd49a" : "#9a8e8a" }}>
                                                    {copied ? "Copied!" : "Tap to copy"}
                                                </span>
                                            </button>
                                            <p className="text-xs mt-3 font-light" style={{ color: "#c9a96e" }}>
                                                50% off your first order · Applied at checkout
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Trust badges */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
                >
                    {["Early Access Pricing", "Limited First Batch", "Exclusive Packaging"].map((item) => (
                        <div key={item} className="flex items-center gap-2">
                            <span className="text-[10px]" style={{ color: "#7a1c2e" }}>✦</span>
                            <span className="text-[11px] tracking-[0.15em] uppercase" style={{ color: "#666" }}>{item}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
