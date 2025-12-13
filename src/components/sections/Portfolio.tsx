"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ExternalLink, Github, ArrowRight, ArrowLeft } from "lucide-react";

const projects = [
    {
        id: 1,
        title: "Luxe E-Commerce",
        category: "E-Commerce",
        description: "A premium fashion e-commerce platform with immersive product experiences.",
        image: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        tags: ["Next.js", "Stripe", "Tailwind"],
    },
    {
        id: 2,
        title: "FinTech Dashboard",
        category: "Web App",
        description: "Real-time financial analytics dashboard for enterprise clients.",
        image: "linear-gradient(135deg, #0d1b2a 0%, #1b263b 50%, #415a77 100%)",
        tags: ["React", "D3.js", "Node.js"],
    },
    {
        id: 3,
        title: "AI Platform",
        category: "SaaS",
        description: "Machine learning platform interface with intuitive workflow builder.",
        image: "linear-gradient(135deg, #10002b 0%, #240046 50%, #3c096c 100%)",
        tags: ["TypeScript", "Python", "AWS"],
    },
    {
        id: 4,
        title: "Health & Wellness",
        category: "Mobile App",
        description: "Comprehensive wellness app focusing on mental health and fitness.",
        image: "linear-gradient(135deg, #003049 0%, #023e58 50%, #0a5068 100%)",
        tags: ["React Native", "Firebase", "Health API"],
    },
    {
        id: 5,
        title: "Real Estate Portal",
        category: "Web Platform",
        description: "Luxury property listings with virtual tour integration.",
        image: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #404040 100%)",
        tags: ["Next.js", "Three.js", "MongoDB"],
    },
];

export default function Portfolio() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
        }
    };

    return (
        <section
            ref={containerRef}
            id="portfolio"
            className="relative py-32 overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-[#0a0a0a]" />

            <div className="relative z-10">
                {/* Section Header */}
                <div className="max-w-7xl mx-auto px-6 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col md:flex-row md:items-end md:justify-between"
                    >
                        <div>
                            <span className="inline-block text-[#d4af37] text-sm font-medium tracking-widest uppercase mb-4">
                                Portfolio
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                                Selected <span className="gradient-text">Work</span>
                            </h2>
                        </div>

                        {/* Navigation Arrows */}
                        <div className="flex gap-3 mt-6 md:mt-0">
                            <button
                                onClick={scrollLeft}
                                className="w-12 h-12 rounded-full border border-[#333] hover:border-[#d4af37] flex items-center justify-center text-white hover:text-[#d4af37] transition-all duration-300 hover:bg-[#d4af37]/5"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={scrollRight}
                                className="w-12 h-12 rounded-full border border-[#333] hover:border-[#d4af37] flex items-center justify-center text-white hover:text-[#d4af37] transition-all duration-300 hover:bg-[#d4af37]/5"
                            >
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Horizontal Scroll Gallery */}
                <motion.div
                    ref={scrollContainerRef}
                    className="horizontal-scroll gap-6 px-6 pb-8"
                    style={{ x }}
                >
                    {/* Spacer */}
                    <div className="w-[calc((100vw-1280px)/2)] min-w-6 flex-shrink-0" />

                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative distort-hover w-[400px] md:w-[500px] flex-shrink-0"
                            onMouseEnter={() => setHoveredId(project.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer">
                                {/* Project Image/Gradient with Distortion */}
                                <div
                                    className="absolute inset-0 transition-all duration-700 group-hover:scale-110"
                                    style={{ background: project.image }}
                                />

                                {/* Overlay */}
                                <div
                                    className={`absolute inset-0 bg-black/50 transition-opacity duration-500 ${hoveredId === project.id ? "opacity-80" : "opacity-30"
                                        }`}
                                />

                                {/* Content */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    <motion.div
                                        initial={false}
                                        animate={{
                                            y: hoveredId === project.id ? 0 : 10,
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <span className="text-[#d4af37] text-xs font-medium uppercase tracking-wider">
                                            {project.category}
                                        </span>
                                        <h3 className="text-2xl font-semibold text-white mt-2 mb-3">
                                            {project.title}
                                        </h3>
                                        <p
                                            className={`text-[#a0a0a0] text-sm mb-5 transition-all duration-300 ${hoveredId === project.id
                                                    ? "opacity-100 translate-y-0"
                                                    : "opacity-0 translate-y-2"
                                                }`}
                                        >
                                            {project.description}
                                        </p>

                                        {/* Tags */}
                                        <div
                                            className={`flex flex-wrap gap-2 mb-5 transition-all duration-300 ${hoveredId === project.id
                                                    ? "opacity-100 translate-y-0"
                                                    : "opacity-0 translate-y-2"
                                                }`}
                                        >
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 text-xs text-white/70 bg-white/10 rounded-full backdrop-blur-sm"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Links */}
                                        <div
                                            className={`flex gap-3 transition-all duration-300 delay-100 ${hoveredId === project.id
                                                    ? "opacity-100 translate-y-0"
                                                    : "opacity-0 translate-y-4"
                                                }`}
                                        >
                                            <button className="p-2.5 rounded-full bg-white/10 hover:bg-[#d4af37] hover:text-black transition-all duration-300 backdrop-blur-sm">
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                            <button className="p-2.5 rounded-full bg-white/10 hover:bg-[#d4af37] hover:text-black transition-all duration-300 backdrop-blur-sm">
                                                <Github className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Border Glow */}
                                <div
                                    className={`absolute inset-0 rounded-2xl border transition-all duration-500 ${hoveredId === project.id
                                            ? "border-[#d4af37]/40 shadow-[0_0_40px_rgba(212,175,55,0.15)]"
                                            : "border-white/5"
                                        }`}
                                />
                            </div>
                        </motion.div>
                    ))}

                    {/* End Spacer */}
                    <div className="w-[calc((100vw-1280px)/2)] min-w-6 flex-shrink-0" />
                </motion.div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center mt-12"
                >
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[#333] hover:border-[#d4af37] text-white hover:text-[#d4af37] transition-all duration-300 hover:bg-[#d4af37]/5"
                    >
                        <span className="font-medium">View All Projects</span>
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
