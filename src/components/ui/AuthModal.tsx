"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff, Flame } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import MoanLogo from "@/components/ui/MoanLogo";

export default function AuthModal() {
    const { isAuthModalOpen, authModalTab, closeAuthModal, openSignUp, openLogin, signUp, login } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const reset = () => { setName(""); setEmail(""); setPassword(""); setError(""); setIsLoading(false); };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !password) return;
        if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
        setIsLoading(true); setError("");
        try { await signUp(name, email, password); reset(); }
        catch { setError("Something went wrong. Please try again."); setIsLoading(false); }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) return;
        setIsLoading(true); setError("");
        try { await login(email, password); reset(); }
        catch { setError("Invalid email or password."); setIsLoading(false); }
    };

    const inputStyle = {
        background: "rgba(8,8,10,0.7)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "#f0ece8",
        fontFamily: "'Inter', sans-serif",
    };

    return (
        <AnimatePresence>
            {isAuthModalOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeAuthModal}
                        className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[201] flex items-center justify-center p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div
                            className="relative w-full max-w-md rounded-2xl p-8"
                            style={{
                                background: "linear-gradient(160deg, #110a0e, #08080a)",
                                border: "1px solid rgba(201,169,110,0.15)",
                                boxShadow: "0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(122,28,46,0.1)",
                            }}
                        >
                            {/* Close */}
                            <button
                                onClick={closeAuthModal}
                                className="absolute top-4 right-4 p-2 rounded-full transition-colors"
                                style={{ color: "#9a8e8a" }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "#f0ece8")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = "#9a8e8a")}
                            >
                                <X className="w-4 h-4" />
                            </button>

                            {/* Brand */}
                            <div className="text-center mb-8">
                                <Flame className="w-5 h-5 mx-auto mb-3" style={{ color: "#c9a96e" }} />
                                <MoanLogo height={36} glowSize="140px" />
                                <p className="text-[10px] tracking-[0.3em] uppercase mt-1" style={{ color: "#c9a96e" }}>
                                    {authModalTab === "signup" ? "Create Your Account" : "Welcome Back"}
                                </p>
                            </div>

                            {/* Waitlist perk banner */}
                            {authModalTab === "signup" && (
                                <div
                                    className="mb-7 px-4 py-3 rounded-xl text-center"
                                    style={{
                                        background: "rgba(122,28,46,0.15)",
                                        border: "1px solid rgba(201,169,110,0.2)",
                                    }}
                                >
                                    <p className="text-xs tracking-[0.12em]" style={{ color: "#c9a96e" }}>
                                        ✦ Sign up &amp; join the waitlist — get{" "}
                                        <strong style={{ color: "#e0c48a" }}>50% off</strong> your first order
                                    </p>
                                </div>
                            )}

                            {/* Tabs */}
                            <div
                                className="flex rounded-full p-1 mb-7"
                                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                            >
                                {(["signup", "login"] as const).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => { tab === "signup" ? openSignUp() : openLogin(); setError(""); }}
                                        className="flex-1 py-2.5 rounded-full text-xs tracking-[0.15em] uppercase transition-all duration-300"
                                        style={{
                                            background: authModalTab === tab ? "linear-gradient(135deg, #7a1c2e, #3a0a14)" : "transparent",
                                            color: authModalTab === tab ? "#e0c48a" : "#9a8e8a",
                                            border: authModalTab === tab ? "1px solid rgba(201,169,110,0.2)" : "1px solid transparent",
                                        }}
                                    >
                                        {tab === "signup" ? "Sign Up" : "Log In"}
                                    </button>
                                ))}
                            </div>

                            {/* Form */}
                            <form onSubmit={authModalTab === "signup" ? handleSignUp : handleLogin} className="space-y-4">
                                {authModalTab === "signup" && (
                                    <div>
                                        <label className="block text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: "#7a1c2e" }}>
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Your name"
                                            required
                                            className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-300"
                                            style={inputStyle}
                                            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.4)")}
                                            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: "#7a1c2e" }}>
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        required
                                        className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-300"
                                        style={inputStyle}
                                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.4)")}
                                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: "#7a1c2e" }}>
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder={authModalTab === "signup" ? "Min. 6 characters" : "Your password"}
                                            required
                                            className="w-full px-4 py-3.5 pr-11 rounded-xl text-sm outline-none transition-all duration-300"
                                            style={inputStyle}
                                            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.4)")}
                                            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2"
                                            style={{ color: "#9a8e8a" }}
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                {error && (
                                    <p className="text-xs text-center py-2" style={{ color: "#e07070" }}>{error}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="relative w-full py-4 rounded-full overflow-hidden mt-2 transition-opacity"
                                    style={{ opacity: isLoading ? 0.7 : 1 }}
                                >
                                    <span className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(135deg, #7a1c2e, #3a0a14)" }} />
                                    <span className="relative text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#e0c48a" }}>
                                        {isLoading
                                            ? (authModalTab === "signup" ? "Creating Account…" : "Signing In…")
                                            : (authModalTab === "signup" ? "Create Account" : "Sign In")
                                        }
                                    </span>
                                </button>
                            </form>

                            {/* Switch link */}
                            <p className="text-center mt-6 text-xs" style={{ color: "#666" }}>
                                {authModalTab === "signup" ? "Already have an account? " : "New here? "}
                                <button
                                    onClick={() => { authModalTab === "signup" ? openLogin() : openSignUp(); setError(""); }}
                                    className="underline transition-colors"
                                    style={{ color: "#c9a96e" }}
                                >
                                    {authModalTab === "signup" ? "Sign In" : "Create Account"}
                                </button>
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
