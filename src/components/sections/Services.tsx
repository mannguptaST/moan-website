"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Palette, ShoppingBag, Smartphone, ArrowUpRight } from "lucide-react";

const services = [
    {
        icon: Code2,
        title: "Web Development",
        description: "Custom websites and web applications built with cutting-edge technologies. Scalable, performant, and secure.",
        features: ["Next.js & React", "TypeScript", "API Integration"],
        size: "normal",
    },
    {
        icon: Palette,
        title: "UI/UX Design",
        description: "User-centered design that captivates and converts. Beautiful interfaces with intuitive experiences.",
        features: ["User Research", "Wireframing", "Prototyping"],
        size: "large",
    },
    {
        icon: ShoppingBag,
        title: "E-Commerce",
        description: "High-converting online stores that drive sales and delight customers at every touchpoint.",
        features: ["Shopify", "Custom Solutions", "Payment Integration"],
        size: "large",
    },
    {
        icon: Smartphone,
        title: "Mobile Apps",
        description: "Native and cross-platform mobile applications that deliver seamless experiences.",
        features: ["React Native", "iOS & Android", "App Store Ready"],
        size: "normal",
    },
];

export default function Services() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section
            ref={containerRef}
            id="services"
            className="relative py-32 overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <span className="inline-block text-[#d4af37] text-sm font-medium tracking-widest uppercase mb-4">
                        What We Do
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Our <span className="gradient-text">Services</span>
                    </h2>
                    <p className="text-[#a0a0a0] text-lg max-w-2xl mx-auto">
                        We offer comprehensive digital solutions tailored to elevate your brand
                        and achieve your business objectives.
                    </p>
                </motion.div>

                {/* Services Grid - Centered */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative spotlight glass rounded-3xl p-8 hover:border-[#d4af37]/30 transition-all duration-500 cursor-pointer"
                            onMouseMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = ((e.clientX - rect.left) / rect.width) * 100;
                                const y = ((e.clientY - rect.top) / rect.height) * 100;
                                e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
                                e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
                            }}
                        >
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#111] border border-[#333] flex items-center justify-center mb-6 group-hover:border-[#d4af37]/50 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all duration-500">
                                <service.icon className="w-6 h-6 text-[#d4af37]" />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#d4af37] transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-[#a0a0a0] text-sm leading-relaxed mb-6">
                                {service.description}
                            </p>

                            {/* Features */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {service.features.map((feature) => (
                                    <span
                                        key={feature}
                                        className="px-3 py-1 text-xs text-[#a0a0a0] bg-[#1a1a1a] rounded-full border border-[#222]"
                                    >
                                        {feature}
                                    </span>
                                ))}
                            </div>

                            {/* Link */}
                            <div className="flex items-center gap-2 text-[#d4af37] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                <span>Learn More</span>
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
