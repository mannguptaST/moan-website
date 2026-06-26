"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Flame } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function WaitlistPopup() {
    const { user, joinWaitlist } = useAuth();
    const [visible, setVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState<"male" | "female" | "other" | "">("");
    const [isLoading, setIsLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        // Don't show if already joined or dismissed this session
        if (user?.joinedWaitlist) return;
        if (sessionStorage.getItem("moan_popup_dismissed")) return;

        const delay = Math.random() * 2000 + 5000; // 5–7 seconds
        const timer = setTimeout(() => setVisible(true), delay);
        return () => clearTimeout(timer);
    }, [user]);

    const dismiss = () => {
        sessionStorage.setItem("moan_popup_dismissed", "1");
        setVisible(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const targetEmail = user?.email || email;
        if (!targetEmail || !gender) return;
        const digits = phone.replace(/\D/g, "");
        if (phone && digits.length !== 10) {
            setError("Phone number must be exactly 10 digits.");
            return;
        }
        setIsLoading(true);
        setError("");
        try {
            await joinWaitlist(targetEmail, phone, gender);
            setDone(true);
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const copyCode = () => {
        navigator.clipboard.writeText("MOAN50");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };


    const inputStyle: React.CSSProperties = {
        background: "rgba(8,8,10,0.7)",
        border: "1px solid rgba(255,255,255,0.09)",
        color: "#f0ece8",
        fontFamily: "'Inter', sans-serif",
        width: "100%",
        padding: "0.85rem 1rem",
        borderRadius: "0.75rem",
        fontSize: "0.875rem",
        outline: "none",
    };

    return (
        <AnimatePresence>
            {visible && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={dismiss}
                        className="fixed inset-0 z-[300] bg-black/65 backdrop-blur-sm"
                    />

                    {/* Popup */}
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.96 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[301] flex items-end sm:items-center justify-center p-4 sm:p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div
                            className="relative w-full max-w-sm rounded-2xl overflow-hidden"
                            style={{
                                background: "linear-gradient(160deg, #130c10, #08080a)",
                                border: "1px solid rgba(201,169,110,0.18)",
                                boxShadow: "0 40px 120px rgba(0,0,0,0.85), 0 0 0 1px rgba(122,28,46,0.12)",
                            }}
                        >
                            {/* Top accent line */}
                            <div className="h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.5), transparent)" }} />

                            <div className="p-6">
                                {/* Close */}
                                <button
                                    onClick={dismiss}
                                    className="absolute top-4 right-4 p-1.5 rounded-full transition-colors"
                                    style={{ color: "#666" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = "#f0ece8")}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
                                >
                                    <X className="w-4 h-4" />
                                </button>

                                <AnimatePresence mode="wait">
                                    {!done ? (
                                        <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                            {/* Header */}
                                            <div className="flex items-center gap-2.5 mb-5">
                                                <Flame className="w-4 h-4 flex-shrink-0" style={{ color: "#c9a96e" }} />
                                                <div>
                                                    <p
                                                        className="text-lg font-light leading-tight"
                                                        style={{ fontFamily: "'Bodoni Moda', 'Cormorant Garamond', serif", color: "#f0ece8" }}
                                                    >
                                                        Light the Mood Early
                                                    </p>
                                                    <p className="text-[10px] tracking-[0.2em] uppercase mt-0.5" style={{ color: "#c9a96e" }}>
                                                        Join waitlist · Get 50% off first order
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Scarcity */}
                                            <div
                                                className="flex items-center gap-2 px-3 py-2 rounded-lg mb-5"
                                                style={{ background: "rgba(122,28,46,0.15)", border: "1px solid rgba(201,169,110,0.12)" }}
                                            >
                                                <span className="text-[10px]" style={{ color: "#c9a96e" }}>✦</span>
                                                <p className="text-[11px] tracking-[0.08em]" style={{ color: "#c9a96e" }}>
                                                    Limited first batch — only <strong style={{ color: "#e0c48a" }}>500 spots</strong> available
                                                </p>
                                            </div>

                                            <form onSubmit={handleSubmit} className="space-y-3">
                                                {/* Email */}
                                                <div>
                                                    <label className="block text-[10px] tracking-[0.2em] uppercase mb-1.5" style={{ color: "#7a1c2e" }}>
                                                        Email Address *
                                                    </label>
                                                    <input
                                                        type="email"
                                                        value={user?.email || email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="your@email.com"
                                                        required
                                                        readOnly={!!user?.email}
                                                        style={inputStyle}
                                                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.4)")}
                                                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
                                                    />
                                                </div>

                                                {/* Phone */}
                                                <div>
                                                    <label className="block text-[10px] tracking-[0.2em] uppercase mb-1.5" style={{ color: "#7a1c2e" }}>
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        placeholder="+91 00000 00000"
                                                        style={inputStyle}
                                                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.4)")}
                                                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
                                                    />
                                                    {error.includes("10 digits") && (
                                                        <p className="text-[11px] mt-1" style={{ color: "#e07070" }}>{error}</p>
                                                    )}
                                                </div>

                                                {/* Gender */}
                                                <div>
                                                    <label className="block text-[10px] tracking-[0.2em] uppercase mb-1.5" style={{ color: "#7a1c2e" }}>
                                                        I identify as *
                                                    </label>
                                                    <div className="grid grid-cols-3 gap-2">
                                                        {(["male", "female", "other"] as const).map((g) => (
                                                            <button
                                                                key={g}
                                                                type="button"
                                                                onClick={() => setGender(g)}
                                                                className="py-2.5 rounded-xl text-xs tracking-[0.1em] capitalize transition-all duration-250"
                                                                style={{
                                                                    background: gender === g ? "linear-gradient(135deg, #7a1c2e, #3a0a14)" : "rgba(255,255,255,0.04)",
                                                                    border: gender === g ? "1px solid rgba(201,169,110,0.3)" : "1px solid rgba(255,255,255,0.08)",
                                                                    color: gender === g ? "#e0c48a" : "#9a8e8a",
                                                                }}
                                                            >
                                                                {g === "male" ? "Male" : g === "female" ? "Female" : "Other"}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={isLoading || !gender}
                                                    className="relative w-full py-3.5 rounded-full overflow-hidden mt-1 transition-opacity"
                                                    style={{ opacity: (isLoading || !gender) ? 0.6 : 1 }}
                                                >
                                                    <span className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(135deg, #7a1c2e, #3a0a14)" }} />
                                                    <span className="relative text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: "#e0c48a" }}>
                                                        {isLoading ? "Joining…" : "Claim My Spot — 50% Off"}
                                                    </span>
                                                </button>
                                            </form>

                                            {error && (
                                                <p className="text-center text-[11px] mt-2" style={{ color: "#e07070" }}>
                                                    {error}
                                                </p>
                                            )}

                                            <p className="text-center text-[10px] mt-3" style={{ color: "#444" }}>
                                                No spam. Unsubscribe anytime.
                                            </p>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="py-2 text-center"
                                        >
                                            <p className="text-3xl mb-3" style={{ color: "#c9a96e" }}>✦</p>
                                            <p className="text-xl font-light mb-2" style={{ fontFamily: "'Bodoni Moda', 'Cormorant Garamond', serif", color: "#f0ece8" }}>
                                                You&apos;re in.
                                            </p>
                                            <p className="text-sm font-light mb-6" style={{ color: "#9a8e8a" }}>
                                                We&apos;ll reach out the moment the flame is ready.
                                            </p>

                                            <button
                                                onClick={copyCode}
                                                className="w-full flex items-center justify-between px-5 py-3.5 rounded-xl transition-all"
                                                style={{
                                                    background: "rgba(122,28,46,0.15)",
                                                    border: "1px solid rgba(201,169,110,0.25)",
                                                }}
                                            >
                                                <span className="text-xl tracking-[0.3em]" style={{ fontFamily: "'Bodoni Moda', 'Cormorant Garamond', serif", color: "#c9a96e" }}>
                                                    MOAN50
                                                </span>
                                                <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: copied ? "#6dd49a" : "#666" }}>
                                                    {copied ? "Copied!" : "Tap to copy"}
                                                </span>
                                            </button>
                                            <p className="text-[11px] mt-3" style={{ color: "#c9a96e" }}>
                                                50% off your first order
                                            </p>

                                            <button
                                                onClick={dismiss}
                                                className="mt-5 text-xs underline"
                                                style={{ color: "#555" }}
                                            >
                                                Close
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
