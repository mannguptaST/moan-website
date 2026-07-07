"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut, Instagram, ShoppingBag } from "lucide-react";
import Link from "next/link";
import MagneticButton from "@/components/ui/MagneticButton";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import MoanLogo from "@/components/ui/MoanLogo";

const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "About", href: "/#about" },
    { name: "The Mood", href: "/#product" },
    { name: "Shop", href: "/#sizes" },
    { name: "Mood Notes", href: "/#mood-notes" },
    { name: "FAQ", href: "/#faq" },
    { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { user, openSignUp, logout } = useAuth();
    const { itemCount, openCart } = useCart();
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 50);

            if (isMobileMenuOpen || currentScrollY < 80) {
                setIsHidden(false);
            } else if (currentScrollY > lastScrollY.current + 5) {
                setIsHidden(true);
            } else if (currentScrollY < lastScrollY.current - 5) {
                setIsHidden(false);
            }
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isMobileMenuOpen]);

    return (
        <>
            <motion.nav
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: isHidden ? "-100%" : "0%", opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    isScrolled
                        ? "glass py-4 border-b border-[rgba(122,28,46,0.15)]"
                        : "bg-transparent py-7"
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/#home" className="group">
                        <MoanLogo
                            height={32}
                            glowSize="120px"
                            showTagline
                            tagline="Light the Mood"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) =>
                            link.name === "Shop" ? (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300"
                                    style={{
                                        color: "#e0c48a",
                                        background: "rgba(122,28,46,0.22)",
                                        border: "1px solid rgba(201,169,110,0.4)",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "rgba(122,28,46,0.35)";
                                        e.currentTarget.style.borderColor = "rgba(201,169,110,0.6)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "rgba(122,28,46,0.22)";
                                        e.currentTarget.style.borderColor = "rgba(201,169,110,0.4)";
                                    }}
                                >
                                    {link.name}
                                </a>
                            ) : (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="relative text-[#9a8e8a] hover:text-[#f0ece8] transition-colors duration-300 text-xs font-medium tracking-[0.15em] uppercase group"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#7a1c2e] transition-all duration-400 group-hover:w-full" />
                                </a>
                            )
                        )}
                    </div>

                    {/* CTA / Account */}
                    <div className="hidden lg:flex items-center gap-3">
                        {/* Cart */}
                        <button
                            onClick={openCart}
                            className="relative p-2.5 rounded-full transition-all duration-300"
                            style={{ border: "1px solid rgba(201,169,110,0.2)" }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(122,28,46,0.12)")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                            aria-label="Open cart"
                        >
                            <ShoppingBag className="w-4 h-4" style={{ color: "#c9a96e" }} />
                            {itemCount > 0 && (
                                <span
                                    className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-medium"
                                    style={{ background: "linear-gradient(135deg, #7a1c2e, #3a0a14)", color: "#e0c48a" }}
                                >
                                    {itemCount}
                                </span>
                            )}
                        </button>
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
                                                <Link
                                                    href="/#coming-soon"
                                                    onClick={() => setShowUserMenu(false)}
                                                    className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-xs transition-colors"
                                                    style={{ color: "#c9a96e" }}
                                                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(122,28,46,0.15)")}
                                                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                                                >
                                                    ✦ Join Waitlist — Get 50% Off
                                                </Link>
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
                                {/* Instagram Follow CTA */}
                                <a
                                    href="https://www.instagram.com/moanofficials?igsh=MTZnbngzcWhxZW84bQ==&utm_source=ig_contact_invite"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    id="navbar-instagram-follow"
                                    className="group inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full transition-all duration-300"
                                    style={{
                                        border: "1px solid rgba(201,169,110,0.2)",
                                        color: "#c9a96e",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = "rgba(201,169,110,0.45)";
                                        e.currentTarget.style.background = "rgba(122,28,46,0.12)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = "rgba(201,169,110,0.2)";
                                        e.currentTarget.style.background = "transparent";
                                    }}
                                >
                                    <Instagram className="w-3.5 h-3.5" />
                                    <span className="text-[10px] tracking-[0.12em] uppercase font-medium">@moanofficials</span>
                                </a>
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
                                    <Link
                                        href="/#coming-soon"
                                        className="relative px-6 py-3 rounded-full overflow-hidden group inline-block"
                                    >
                                        <span className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(135deg, #7a1c2e, #3a0a14)" }} />
                                        <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, #9a2540, #7a1c2e)" }} />
                                        <span className="relative text-xs font-medium tracking-[0.15em] uppercase" style={{ color: "#e0c48a" }}>
                                            Join Waitlist
                                        </span>
                                    </Link>
                                </MagneticButton>
                            </>
                        )}
                    </div>

                    {/* Mobile: Cart + Menu Button */}
                    <div className="lg:hidden flex items-center gap-1">
                        <button
                            onClick={openCart}
                            className="relative p-2"
                            style={{ color: "#f0ece8" }}
                            aria-label="Open cart"
                        >
                            <ShoppingBag size={20} />
                            {itemCount > 0 && (
                                <span
                                    className="absolute top-0.5 right-0.5 flex items-center justify-center w-3.5 h-3.5 rounded-full text-[8px] font-medium"
                                    style={{ background: "linear-gradient(135deg, #7a1c2e, #3a0a14)", color: "#e0c48a" }}
                                >
                                    {itemCount}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2"
                            style={{ color: "#f0ece8" }}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
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
                        className="fixed inset-0 z-40 lg:hidden flex flex-col overflow-y-auto"
                        style={{ background: "rgba(8,8,10,0.97)", backdropFilter: "blur(20px)" }}
                    >
                        {/* Close area top */}
                        <div className="pt-24" />

                        <div className="flex flex-col items-center justify-center flex-1 gap-8 py-8 px-6">
                            {/* Brand */}
                            <MoanLogo height={56} glowSize="220px" className="mb-4" />
                            <div className="h-px w-16 mb-4" style={{ background: "linear-gradient(90deg, transparent, #7a1c2e, transparent)" }} />

                            {navLinks.map((link, index) =>
                                link.name === "Shop" ? (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.08 }}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="px-6 py-2 rounded-full text-lg font-medium tracking-[0.2em] uppercase transition-all"
                                        style={{
                                            color: "#e0c48a",
                                            fontFamily: "'Inter', sans-serif",
                                            background: "rgba(122,28,46,0.22)",
                                            border: "1px solid rgba(201,169,110,0.4)",
                                        }}
                                    >
                                        {link.name}
                                    </motion.a>
                                ) : (
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
                                )
                            )}

                            <motion.a
                                href="/#coming-soon"
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
                                Claim My 50% Launch Offer
                            </motion.a>

                            {/* Instagram CTA in mobile menu */}
                            <motion.a
                                href="https://www.instagram.com/moanofficials?igsh=MTZnbngzcWhxZW84bQ==&utm_source=ig_contact_invite"
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.65 }}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm tracking-[0.15em] uppercase"
                                style={{
                                    color: "#c9a96e",
                                    border: "1px solid rgba(201,169,110,0.25)",
                                    background: "rgba(122,28,46,0.08)",
                                }}
                            >
                                <Instagram className="w-4 h-4" />
                                <span>Follow @moanofficials</span>
                            </motion.a>

                            {user ? (
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                    onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                                    className="flex items-center gap-2.5 text-sm tracking-[0.15em] uppercase px-6 py-3 rounded-full"
                                    style={{
                                        color: "#f0ece8",
                                        border: "1px solid rgba(201,169,110,0.3)",
                                        background: "rgba(122,28,46,0.15)",
                                    }}
                                >
                                    <LogOut className="w-4 h-4" style={{ color: "#c9a96e" }} />
                                    <span>Sign Out</span>
                                    <span style={{ color: "#c9a96e" }}>({user.name.split(" ")[0]})</span>
                                </motion.button>
                            ) : (
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                    onClick={() => { openSignUp(); setIsMobileMenuOpen(false); }}
                                    className="flex items-center gap-2.5 text-sm tracking-[0.15em] uppercase px-6 py-3 rounded-full"
                                    style={{
                                        color: "#f0ece8",
                                        border: "1px solid rgba(201,169,110,0.3)",
                                        background: "rgba(201,169,110,0.08)",
                                    }}
                                >
                                    <User className="w-4 h-4" style={{ color: "#c9a96e" }} />
                                    <span>Sign In</span>
                                </motion.button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
