"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
    {
        id: 1,
        content: "Luxe Digital transformed our vision into a stunning reality. Their attention to detail and commitment to excellence exceeded all expectations. The result is a website that truly represents our brand's premium positioning.",
        author: "Sarah Chen",
        role: "CEO",
        company: "Velvet Studios",
        rating: 5,
    },
    {
        id: 2,
        content: "Working with this team was an absolute pleasure. They understood our needs perfectly and delivered a product that not only looks beautiful but also performs exceptionally well. Our conversion rates increased by 40%.",
        author: "Michael Torres",
        role: "Marketing Director",
        company: "Atlas Ventures",
        rating: 5,
    },
    {
        id: 3,
        content: "The level of professionalism and creativity they bring to every project is remarkable. They don't just build websites; they craft digital experiences that leave lasting impressions on our customers.",
        author: "Emma Richardson",
        role: "Founder",
        company: "Bloom & Co",
        rating: 5,
    },
    {
        id: 4,
        content: "From concept to launch, every step was handled with precision and care. The team's expertise in both design and development resulted in a seamless, beautiful product that our users love.",
        author: "David Kim",
        role: "Product Manager",
        company: "NexGen Tech",
        rating: 5,
    },
];

export default function Testimonials() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section
            ref={containerRef}
            id="testimonials"
            className="relative py-32 overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]" />

            {/* Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d4af37] rounded-full opacity-[0.02] blur-[150px]" />

            <div className="relative z-10 max-w-5xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block text-[#d4af37] text-sm font-medium tracking-widest uppercase mb-4">
                        Testimonials
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Client <span className="gradient-text">Stories</span>
                    </h2>
                    <p className="text-[#a0a0a0] text-lg max-w-2xl mx-auto">
                        Hear what our clients have to say about their experience working with us.
                    </p>
                </motion.div>

                {/* Testimonial Carousel */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    <div className="glass rounded-3xl p-8 md:p-12 relative">
                        {/* Quote Icon */}
                        <div className="absolute top-8 left-8 md:top-12 md:left-12">
                            <Quote className="w-12 h-12 text-[#d4af37]/20" />
                        </div>

                        {/* Testimonial Content */}
                        <div className="relative min-h-[300px] flex flex-col items-center justify-center text-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="max-w-3xl"
                                >
                                    {/* Stars */}
                                    <div className="flex justify-center gap-1 mb-6">
                                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 text-[#d4af37] fill-[#d4af37]" />
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <p className="text-xl md:text-2xl text-white leading-relaxed mb-8 font-light italic"
                                        style={{ fontFamily: "'Playfair Display', serif" }}>
                                        "{testimonials[currentIndex].content}"
                                    </p>

                                    {/* Author */}
                                    <div>
                                        <p className="text-white font-semibold text-lg">
                                            {testimonials[currentIndex].author}
                                        </p>
                                        <p className="text-[#a0a0a0] text-sm">
                                            {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center justify-center gap-4 mt-8">
                            <button
                                onClick={prevTestimonial}
                                className="p-3 rounded-full border border-[#333] hover:border-[#d4af37] text-white hover:text-[#d4af37] transition-all duration-300"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            {/* Dots */}
                            <div className="flex gap-2">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                                ? "w-8 bg-[#d4af37]"
                                                : "bg-[#333] hover:bg-[#555]"
                                            }`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={nextTestimonial}
                                className="p-3 rounded-full border border-[#333] hover:border-[#d4af37] text-white hover:text-[#d4af37] transition-all duration-300"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
