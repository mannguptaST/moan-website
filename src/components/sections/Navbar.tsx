"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Work", href: "#portfolio" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? "glass py-4"
                    : "bg-transparent py-6"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <a href="#home" className="group flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#b87333] flex items-center justify-center">
                            <span className="text-black font-bold text-xl">L</span>
                        </div>
                        <span className="text-xl font-semibold text-white group-hover:text-[#d4af37] transition-colors">
                            Luxe<span className="text-[#d4af37]">Digital</span>
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="relative text-[#a0a0a0] hover:text-white transition-colors duration-300 text-sm font-medium group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#d4af37] to-[#b87333] transition-all duration-300 group-hover:w-full" />
                            </a>
                        ))}
                    </div>

                    {/* CTA Button with Magnetic Effect */}
                    <MagneticButton className="hidden md:block">
                        <a
                            href="#contact"
                            className="relative px-6 py-3 rounded-full overflow-hidden group inline-block"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-[#d4af37] to-[#b87333]" />
                            <span className="absolute inset-0 bg-gradient-to-r from-[#d4af37] to-[#b87333] opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                            <span className="relative text-black font-semibold text-sm">
                                Get Started
                            </span>
                        </a>
                    </MagneticButton>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-white"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 glass pt-24 md:hidden"
                    >
                        <div className="flex flex-col items-center gap-8 py-8">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-2xl font-medium text-white hover:text-[#d4af37] transition-colors"
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            <motion.a
                                href="#contact"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b87333] text-black font-semibold"
                            >
                                Get Started
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
