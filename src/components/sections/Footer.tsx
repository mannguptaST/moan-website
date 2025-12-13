"use client";

import { motion } from "framer-motion";
import {
    Mail,
    Phone,
    MapPin,
    ArrowUpRight,
    Linkedin,
    Twitter,
    Instagram,
    Dribbble
} from "lucide-react";

const footerLinks = {
    services: [
        { name: "Web Development", href: "#" },
        { name: "UI/UX Design", href: "#" },
        { name: "E-Commerce", href: "#" },
        { name: "Mobile Apps", href: "#" },
        { name: "Consulting", href: "#" },
    ],
    company: [
        { name: "About Us", href: "#" },
        { name: "Our Work", href: "#portfolio" },
        { name: "Careers", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Contact", href: "#contact" },
    ],
    resources: [
        { name: "Case Studies", href: "#" },
        { name: "Documentation", href: "#" },
        { name: "FAQ", href: "#" },
        { name: "Support", href: "#" },
    ],
};

const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Dribbble, href: "#", label: "Dribbble" },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative pt-24 pb-8 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[#0a0a0a]" />

            {/* Top Border Gradient */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        {/* Logo */}
                        <a href="#home" className="inline-flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#b87333] flex items-center justify-center">
                                <span className="text-black font-bold text-xl">L</span>
                            </div>
                            <span className="text-xl font-semibold text-white">
                                Luxe<span className="text-[#d4af37]">Digital</span>
                            </span>
                        </a>

                        <p className="text-[#a0a0a0] text-sm leading-relaxed mb-6 max-w-sm">
                            Crafting exceptional digital experiences with precision and elegance.
                            We transform visionary ideas into stunning realities.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <a href="mailto:hello@luxedigital.com" className="flex items-center gap-3 text-[#a0a0a0] hover:text-[#d4af37] transition-colors text-sm">
                                <Mail className="w-4 h-4" />
                                <span>hello@luxedigital.com</span>
                            </a>
                            <a href="tel:+1234567890" className="flex items-center gap-3 text-[#a0a0a0] hover:text-[#d4af37] transition-colors text-sm">
                                <Phone className="w-4 h-4" />
                                <span>+1 (234) 567-890</span>
                            </a>
                            <div className="flex items-center gap-3 text-[#a0a0a0] text-sm">
                                <MapPin className="w-4 h-4" />
                                <span>San Francisco, CA</span>
                            </div>
                        </div>
                    </div>

                    {/* Services Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Services</h4>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-[#a0a0a0] hover:text-[#d4af37] transition-colors text-sm inline-flex items-center gap-1 group"
                                    >
                                        {link.name}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-[#a0a0a0] hover:text-[#d4af37] transition-colors text-sm inline-flex items-center gap-1 group"
                                    >
                                        {link.name}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Resources</h4>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-[#a0a0a0] hover:text-[#d4af37] transition-colors text-sm inline-flex items-center gap-1 group"
                                    >
                                        {link.name}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-[#1a1a1a]">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Copyright */}
                        <p className="text-[#666] text-sm">
                            © {currentYear} LuxeDigital. All rights reserved.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    whileHover={{ y: -3 }}
                                    className="w-10 h-10 rounded-full border border-[#222] hover:border-[#d4af37] flex items-center justify-center text-[#a0a0a0] hover:text-[#d4af37] transition-colors"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>

                        {/* Legal Links */}
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-[#666] hover:text-[#a0a0a0] transition-colors text-sm">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-[#666] hover:text-[#a0a0a0] transition-colors text-sm">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
