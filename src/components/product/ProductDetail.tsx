"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Flame } from "lucide-react";
import { Product, products, formatPrice } from "@/lib/products";
import { useCart } from "@/context/CartContext";

export default function ProductDetail({ product }: { product: Product }) {
    const router = useRouter();
    const { addItem } = useCart();
    const [activeImage, setActiveImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [justAdded, setJustAdded] = useState(false);

    const otherSizes = products.filter((p) => p.slug !== product.slug);

    const handleAddToCart = () => {
        addItem(product.slug, quantity);
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 2000);
    };

    const handleBuyNow = () => {
        addItem(product.slug, quantity);
        router.push("/checkout");
    };

    return (
        <main className="min-h-screen bg-[#08080a] pt-32 pb-32">
            <div className="max-w-7xl mx-auto px-6">
                {/* Breadcrumb */}
                <nav className="mb-10 text-xs tracking-[0.15em] uppercase" style={{ color: "#666" }}>
                    <Link href="/" className="hover:opacity-80 transition-opacity" style={{ color: "#9a8e8a" }}>Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/#sizes" className="hover:opacity-80 transition-opacity" style={{ color: "#9a8e8a" }}>Collection</Link>
                    <span className="mx-2">/</span>
                    <span style={{ color: "#c9a96e" }}>{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
                    {/* Gallery */}
                    <div>
                        <motion.div
                            key={activeImage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4"
                            style={{
                                border: "1px solid rgba(201,169,110,0.12)",
                                boxShadow: "0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(122,28,46,0.1)",
                            }}
                        >
                            <Image
                                src={product.images[activeImage]}
                                alt={`${product.name} — ${product.label} Moan mood candle`}
                                fill
                                priority
                                className="object-cover object-center"
                                quality={90}
                            />
                            <div
                                className="absolute inset-0"
                                style={{ background: "linear-gradient(135deg, rgba(8,8,10,0.2) 0%, transparent 45%, rgba(8,8,10,0.35) 100%)" }}
                            />
                            {product.tag && (
                                <div
                                    className="absolute top-5 left-5 px-4 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase"
                                    style={{
                                        background: "rgba(8,8,10,0.85)",
                                        border: "1px solid rgba(201,169,110,0.3)",
                                        color: "#e0c48a",
                                        backdropFilter: "blur(10px)",
                                    }}
                                >
                                    {product.tag}
                                </div>
                            )}
                        </motion.div>

                        {product.images.length > 1 && (
                            <div className="flex gap-3">
                                {product.images.map((img, i) => (
                                    <button
                                        key={img}
                                        onClick={() => setActiveImage(i)}
                                        className="relative w-20 h-20 rounded-lg overflow-hidden transition-all duration-300"
                                        style={{
                                            border: i === activeImage ? "1px solid rgba(201,169,110,0.6)" : "1px solid rgba(255,255,255,0.08)",
                                            opacity: i === activeImage ? 1 : 0.6,
                                        }}
                                    >
                                        <Image src={img} alt="" fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div>
                        <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: "#7a1c2e" }}>
                            {product.tagline}
                        </p>
                        <h1
                            className="text-4xl md:text-5xl font-light mb-2 leading-tight"
                            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f0ece8" }}
                        >
                            {product.name}
                        </h1>
                        <p className="text-sm tracking-[0.2em] uppercase mb-6" style={{ color: "#9a8e8a" }}>
                            {product.label} Mood Candle
                        </p>

                        {/* Price */}
                        <div className="flex flex-col gap-3 mb-8">
                            <span className="text-3xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9a96e" }}>
                                {formatPrice(product.price)}
                            </span>
                            {/* Waitlist CTA — unlock 51% OFF */}
                            <button
                                onClick={() => window.dispatchEvent(new Event("moan:open-waitlist"))}
                                className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full transition-all"
                                style={{
                                    background: "rgba(122,28,46,0.12)",
                                    border: "1px solid rgba(201,169,110,0.22)",
                                    cursor: "pointer",
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(122,28,46,0.25)"; e.currentTarget.style.borderColor = "rgba(201,169,110,0.45)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(122,28,46,0.12)"; e.currentTarget.style.borderColor = "rgba(201,169,110,0.22)"; }}
                            >
                                <span style={{ color: "#c9a96e", fontSize: "13px" }}>🏷</span>
                                <span className="text-[11px] tracking-[0.08em]" style={{ color: "#c9a96e" }}>
                                    Join Waitlist to unlock{" "}
                                    <strong className="font-semibold tracking-[0.12em]">51% OFF</strong>
                                </span>
                            </button>
                        </div>

                        <p className="text-sm leading-relaxed font-light mb-8" style={{ color: "#9a8e8a" }}>
                            {product.description}
                        </p>

                        {/* Burn time */}
                        <div
                            className="flex items-center gap-2.5 py-3.5 px-4 rounded-lg mb-8"
                            style={{ background: "rgba(122,28,46,0.08)", border: "1px solid rgba(122,28,46,0.12)" }}
                        >
                            <Flame className="w-3.5 h-3.5" style={{ color: "#c9a96e" }} />
                            <span className="text-xs tracking-[0.15em] uppercase" style={{ color: "#666" }}>Burn Time</span>
                            <span className="text-sm font-medium ml-auto" style={{ color: "#c9a96e" }}>{product.burnTime}</span>
                        </div>

                        {/* Other sizes */}
                        <div className="mb-8">
                            <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "#666" }}>Choose Your Size</p>
                            <div className="flex gap-3">
                                <div
                                    className="flex-1 text-center py-3 rounded-xl text-sm"
                                    style={{ background: "linear-gradient(135deg, #7a1c2e, #3a0a14)", color: "#e0c48a", border: "1px solid rgba(201,169,110,0.3)" }}
                                >
                                    {product.label}
                                </div>
                                {otherSizes.map((p) => (
                                    <Link
                                        key={p.slug}
                                        href={`/product/${p.slug}`}
                                        className="flex-1 text-center py-3 rounded-xl text-sm transition-all"
                                        style={{ background: "rgba(255,255,255,0.04)", color: "#9a8e8a", border: "1px solid rgba(255,255,255,0.08)" }}
                                    >
                                        {p.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Quantity + CTAs */}
                        <div className="flex items-center gap-4 mb-4">
                            <div
                                className="flex items-center gap-4 rounded-full px-4 py-2.5"
                                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                            >
                                <button
                                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                    style={{ color: "#9a8e8a" }}
                                    aria-label="Decrease quantity"
                                >
                                    <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="text-sm w-4 text-center" style={{ color: "#f0ece8" }}>{quantity}</span>
                                <button
                                    onClick={() => setQuantity((q) => q + 1)}
                                    style={{ color: "#9a8e8a" }}
                                    aria-label="Increase quantity"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                </button>
                            </div>
                            <span className="text-sm" style={{ color: "#555" }}>
                                Subtotal: <strong style={{ color: "#c9a96e" }}>{formatPrice(product.price * quantity)}</strong>
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mb-10">
                            <button
                                onClick={handleAddToCart}
                                className="relative flex-1 py-4 rounded-full overflow-hidden"
                                style={{ border: "1px solid rgba(201,169,110,0.3)" }}
                            >
                                <span className="relative text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: "#c9a96e" }}>
                                    <AnimatePresence mode="wait">
                                        <motion.span
                                            key={justAdded ? "added" : "add"}
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -6 }}
                                            transition={{ duration: 0.2 }}
                                            className="inline-block"
                                        >
                                            {justAdded ? "Added to Bag ✓" : "Add to Bag"}
                                        </motion.span>
                                    </AnimatePresence>
                                </span>
                            </button>
                            <button
                                onClick={handleBuyNow}
                                className="relative flex-1 py-4 rounded-full overflow-hidden"
                            >
                                <span className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(135deg, #7a1c2e, #3a0a14)" }} />
                                <span className="relative text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: "#e0c48a" }}>
                                    Buy Now
                                </span>
                            </button>
                        </div>

                        {/* Story */}
                        <div className="h-px mb-8" style={{ background: "linear-gradient(90deg, rgba(201,169,110,0.3), transparent)" }} />
                        <h2 className="text-2xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f0ece8" }}>
                            The Story
                        </h2>
                        <p className="text-sm leading-relaxed font-light mb-10" style={{ color: "#9a8e8a" }}>
                            {product.story}
                        </p>

                        {/* Notes / features */}
                        <div className="flex flex-col gap-6">
                            {product.notes.map((note) => (
                                <div key={note.title} className="flex gap-4">
                                    <span className="mt-1 flex-shrink-0" style={{ color: "#7a1c2e" }}>◆</span>
                                    <div>
                                        <h3 className="text-base font-light mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f0ece8" }}>
                                            {note.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed font-light" style={{ color: "#9a8e8a" }}>
                                            {note.body}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
