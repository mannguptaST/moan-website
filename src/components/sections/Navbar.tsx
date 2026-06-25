"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { useAuth } from "@/context/AuthContext";
import MoanLogo from "@/components/ui/MoanLogo";

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "The Mood", href: "#product" },
    { name: "Mood Notes", href: "#mood-notes" },
    { name: "Coming Soon", href: "#coming-soon" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { user, openSignUp, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    isScrolled
                        ? "glass py-4 border-b border-[rgba(122,28,46,0.15)]"
                        : "bg-transparent py-7"
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <a href="#home" className="group">
                        <MoanLogo
                            height={32}
                            glowSize="120px"
                            showTagline
                            tagline="Light the Mood"
                        />
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="relative text-[#9a8e8a] hover:text-[#f0ece8] transition-colors duration-300 text-xs font-medium tracking-[0.15em] uppercase group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#7a1c2e] transition-all duration-400 group-hover:w-full" />
                            </a>
                        ))}
                    </div>

                    {/* CTA / Account */}
                    <div className="hidden lg:flex items-center gap-3">
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-full transition-all duration-300"
                                    style={{ border: "1px solid rgba(201,169,110,0.2)", background: "rgba(122,28,46,0.12)" }}
                                >
                                    <div
                                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium"
                                        style={{ background: "linear-gradient(135deg, #7a1c2e, #3a0a14)", color: "#e0c48a" }}
                                    >
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-xs tracking-[0.1em]" style={{ color: "#c9a96e" }}>
                                        {user.name.split(" ")[0]}
                                    </span>
                                </button>

                                <AnimatePresence>
                                    {showUserMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 top-full mt-2 w-56 rounded-xl p-2"
                                            style={{
                                                background: "rgba(12,8,10,0.97)",
                                                border: "1px solid rgba(201,169,110,0.15)",
                                                backdropFilter: "blur(20px)",
                                                boxShadow: "0 20px 60px rgba(0,0,0,0.7)",
                                            }}
                                        >
                                            <div className="px-3 py-2 mb-1">
                                                <p className="text-xs font-medium" style={{ color: "#f0ece8" }}>{user.name}</p>
                                                <p className="text-[10px] mt-0.5" style={{ color: "#666" }}>{user.email}</p>
                                            </div>
                                            {user.joinedWaitlist && user.discountCode && (
                                                <div
                                                    className="mx-2 mb-2 px-3 py-2.5 rounded-lg"
                                                    style={{ background: "rgba(122,28,46,0.2)", border: "1px solid rgba(201,169,110,0.2)" }}
                                                >
                                                    <p className="text-[9px] tracking-[0.2em] uppercase mb-1" style={{ color: "#9a8e8a" }}>Your Discount</p>
                                                    <p className="text-sm font-semibold tracking-[0.2em]" style={{ color: "#c9a96e" }}>
                                                        {user.discountCode}
                                                    </p>
                                                    <p className="text-[9px] mt-0.5" style={{ color: "#666" }}>50% off first order</p>
                                                </div>
                                            )}
                                            {!user.joinedWaitlist && (
                                                <a
                                                    href="#coming-soon"
                                                    onClick={() => setShowUserMenu(false)}
                                                    className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-xs transition-colors"
                                                    style={{ color: "#c9a96e" }}
                                                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(122,28,46,0.15)")}
                                                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                                                >
                                                    ✦ Join Waitlist — Get 50% Off
                                                </a>
                                            )}
                                            <div className="h-px mx-2 my-1" style={{ background: "rgba(255,255,255,0.06)" }} />
                                            <button
                                                onClick={() => { logout(); setShowUserMenu(false); }}
                                                className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-xs transition-colors"
                                                style={{ color: "#9a8e8a" }}
                                                onMouseEnter={(e) => (e.currentTarget.style.color = "#f0ece8")}
                                                onMouseLeave={(e) => (e.currentTarget.style.color = "#9a8e8a")}
                                            >
                                                <LogOut className="w-3 h-3" /> Sign Out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <>
                                <button
                                    onClick={openSignUp}
                                    className="text-xs tracking-[0.12em] uppercase transition-colors"
                                    style={{ color: "#9a8e8a" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = "#f0ece8")}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = "#9a8e8a")}
                                >
                                    Sign Up
                                </button>
                                <MagneticButton>
                                    <a
                                        href="#coming-soon"
                                        className="relative px-6 py-3 rounded-full overflow-hidden group inline-block"
                                    >
                                        <span className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(135deg, #7a1c2e, #3a0a14)" }} />
                                        <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, #9a2540, #7a1c2e)" }} />
                                        <span className="relative text-xs font-medium tracking-[0.15em] uppercase" style={{ color: "#e0c48a" }}>
                                            Join Waitlist
                                        </span>
                                    </a>
                                </MagneticButton>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2"
                        style={{ color: "#f0ece8" }}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.35 }}
                        className="fixed inset-0 z-40 lg:hidden flex flex-col"
                        style={{ background: "rgba(8,8,10,0.97)", backdropFilter: "blur(20px)" }}
                    >
                        {/* Close area top */}
                        <div className="pt-24" />

                        <div className="flex flex-col items-center justify-center flex-1 gap-8 pb-16">
                            {/* Brand */}
                            <MoanLogo height={56} glowSize="220px" className="mb-4" />
                            <div className="h-px w-16 mb-4" style={{ background: "linear-gradient(90deg, transparent, #7a1c2e, transparent)" }} />

                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.08 }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-light tracking-[0.2em] uppercase transition-colors"
                                    style={{ color: "#9a8e8a", fontFamily: "'Inter', sans-serif" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = "#f0ece8")}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = "#9a8e8a")}
                                >
                                    {link.name}
                                </motion.a>
                            ))}

                            <motion.a
                                href="#coming-soon"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="mt-4 px-10 py-4 rounded-full text-sm tracking-[0.2em] uppercase font-medium"
                                style={{
                                    background: "linear-gradient(135deg, #7a1c2e, #3a0a14)",
                                    color: "#e0c48a",
                                    border: "1px solid rgba(201,169,110,0.2)",
                                }}
                            >
                                Join Waitlist
                            </motion.a>

                            {user ? (
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                    onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                                    className="flex items-center gap-2 text-sm tracking-[0.15em] uppercase"
                                    style={{ color: "#9a8e8a" }}
                                >
                                    <LogOut className="w-4 h-4" /> Sign Out ({user.name.split(" ")[0]})
                                </motion.button>
                            ) : (
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                    onClick={() => { openSignUp(); setIsMobileMenuOpen(false); }}
                                    className="flex items-center gap-2 text-sm tracking-[0.15em] uppercase"
                                    style={{ color: "#9a8e8a" }}
                                >
                                    <User className="w-4 h-4" /> Create Account
                                </motion.button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
