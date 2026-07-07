"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";

export default function CartDrawer() {
    const { lines, itemCount, subtotal, isCartOpen, closeCart, updateQuantity, removeItem } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 z-[300] bg-black/65 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed top-0 right-0 z-[301] h-full w-full sm:w-[420px] flex flex-col"
                        style={{
                            background: "linear-gradient(160deg, #130c10, #08080a)",
                            borderLeft: "1px solid rgba(201,169,110,0.18)",
                            boxShadow: "0 0 120px rgba(0,0,0,0.85)",
                        }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                            <div className="flex items-center gap-2.5">
                                <ShoppingBag className="w-4 h-4" style={{ color: "#c9a96e" }} />
                                <p className="text-lg font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f0ece8" }}>
                                    Your Bag {itemCount > 0 && `(${itemCount})`}
                                </p>
                            </div>
                            <button
                                onClick={closeCart}
                                className="p-1.5 rounded-full transition-colors"
                                style={{ color: "#666" }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "#f0ece8")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
                                aria-label="Close cart"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Lines */}
                        <div className="flex-1 overflow-y-auto px-6 py-6">
                            {lines.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center gap-3">
                                    <p className="text-3xl" style={{ color: "#3a2a2e" }}>✦</p>
                                    <p className="text-sm font-light" style={{ color: "#9a8e8a" }}>Your bag is empty.</p>
                                    <Link
                                        href="/#sizes"
                                        onClick={closeCart}
                                        className="text-xs tracking-[0.15em] uppercase mt-2"
                                        style={{ color: "#c9a96e" }}
                                    >
                                        Browse the Collection →
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-5">
                                    {lines.map((line) => (
                                        <div key={line.slug} className="flex gap-4">
                                            <div
                                                className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden"
                                                style={{ border: "1px solid rgba(201,169,110,0.15)" }}
                                            >
                                                <Image src={line.image} alt={line.name} fill className="object-cover" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between min-w-0">
                                                <div>
                                                    <p className="text-sm font-light truncate" style={{ color: "#f0ece8" }}>{line.name}</p>
                                                    <p className="text-[11px] tracking-[0.1em] uppercase" style={{ color: "#7a1c2e" }}>{line.label}</p>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div
                                                        className="flex items-center gap-2 rounded-full px-1"
                                                        style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                                                    >
                                                        <button
                                                            onClick={() => updateQuantity(line.slug, line.quantity - 1)}
                                                            className="p-1.5"
                                                            style={{ color: "#9a8e8a" }}
                                                            aria-label="Decrease quantity"
                                                        >
                                                            <Minus className="w-3 h-3" />
                                                        </button>
                                                        <span className="text-xs w-4 text-center" style={{ color: "#f0ece8" }}>{line.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(line.slug, line.quantity + 1)}
                                                            className="p-1.5"
                                                            style={{ color: "#9a8e8a" }}
                                                            aria-label="Increase quantity"
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                    <span className="text-sm font-medium" style={{ color: "#c9a96e" }}>
                                                        {formatPrice(line.price * line.quantity)}
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeItem(line.slug)}
                                                className="self-start p-1 transition-colors"
                                                style={{ color: "#555" }}
                                                onMouseEnter={(e) => (e.currentTarget.style.color = "#e07070")}
                                                onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
                                                aria-label={`Remove ${line.name}`}
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {lines.length > 0 && (
                            <div className="px-6 py-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                                <div className="flex items-center justify-between mb-5">
                                    <span className="text-xs tracking-[0.15em] uppercase" style={{ color: "#9a8e8a" }}>Subtotal</span>
                                    <span className="text-lg font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f0ece8" }}>
                                        {formatPrice(subtotal)}
                                    </span>
                                </div>
                                <Link
                                    href="/checkout"
                                    onClick={closeCart}
                                    className="relative block w-full py-3.5 rounded-full overflow-hidden text-center"
                                >
                                    <span className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(135deg, #7a1c2e, #3a0a14)" }} />
                                    <span className="relative text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: "#e0c48a" }}>
                                        Proceed to Checkout
                                    </span>
                                </Link>
                                <p className="text-center text-[10px] mt-3" style={{ color: "#444" }}>
                                    Shipping and taxes calculated at checkout.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
