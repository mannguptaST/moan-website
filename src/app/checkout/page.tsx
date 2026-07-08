"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Tag, CheckCircle } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";
import { submitOrder } from "@/lib/orders";

const inputStyle: React.CSSProperties = {
    background: "rgba(8,8,10,0.7)",
    border: "1px solid rgba(255,255,255,0.09)",
    color: "#f0ece8",
    fontFamily: "'Inter', sans-serif",
    width: "100%",
    padding: "0.85rem 1rem",
    borderRadius: "0.75rem",
    fontSize: "0.875rem",
    outline: "none",
};

export default function CheckoutPage() {
    const {
        lines, itemCount, subtotal, clearCart,
        couponCode, couponApplied, discountAmount, finalTotal,
        applyCoupon, removeCoupon,
    } = useCart();

    const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", pincode: "" });
    const [paymentMethod, setPaymentMethod] = useState<"cod" | "bank-transfer">("cod");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState("");

    // Coupon state local to checkout (in case user didn't apply in cart)
    const [couponInput, setCouponInput] = useState("");
    const [couponStatus, setCouponStatus] = useState<"idle" | "ok" | "invalid">("idle");

    const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((f) => ({ ...f, [field]: e.target.value }));

    const handleApplyCoupon = () => {
        if (!couponInput.trim()) return;
        const result = applyCoupon(couponInput);
        setCouponStatus(result);
        if (result === "ok") setCouponInput("");
    };

    const handleRemoveCoupon = () => {
        removeCoupon();
        setCouponInput("");
        setCouponStatus("idle");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");
        try {
            const ok = await submitOrder({
                ...form,
                paymentMethod,
                items: lines.map((l) => ({ slug: l.slug, name: l.name, label: l.label, quantity: l.quantity, price: l.price })),
                subtotal,
                couponCode: couponApplied ? couponCode : undefined,
                discountAmount: couponApplied ? discountAmount : undefined,
                finalTotal: couponApplied ? finalTotal : subtotal,
            });
            if (!ok) throw new Error();
            setDone(true);
            clearCart();
        } catch {
            setError("Something went wrong placing your order. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (lines.length === 0 && !done) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen bg-[#08080a] pt-40 pb-32 flex flex-col items-center text-center px-6">
                    <p className="text-3xl mb-4" style={{ color: "#3a2a2e" }}>✦</p>
                    <h1 className="text-3xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f0ece8" }}>
                        Your bag is empty
                    </h1>
                    <p className="text-sm font-light mb-8" style={{ color: "#9a8e8a" }}>
                        Add something to your bag before checking out.
                    </p>
                    <Link
                        href="/#sizes"
                        className="px-8 py-3.5 rounded-full text-xs tracking-[0.18em] uppercase font-medium"
                        style={{ background: "linear-gradient(135deg, #7a1c2e, #3a0a14)", color: "#e0c48a" }}
                    >
                        Browse the Collection
                    </Link>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#08080a] pt-32 pb-32">
                <div className="max-w-6xl mx-auto px-6">
                    <h1
                        className="text-4xl md:text-5xl font-light mb-14 text-center"
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f0ece8" }}
                    >
                        Checkout
                    </h1>

                    <AnimatePresence mode="wait">
                        {done ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="max-w-md mx-auto text-center py-10"
                            >
                                <p className="text-4xl mb-4" style={{ color: "#c9a96e" }}>✦</p>
                                <h2 className="text-2xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f0ece8" }}>
                                    Order Received
                                </h2>
                                <p className="text-sm font-light mb-8" style={{ color: "#9a8e8a" }}>
                                    Thank you — we&apos;ve got your order and will reach out on {form.phone || form.email} to confirm details and delivery.
                                </p>
                                <Link
                                    href="/"
                                    className="inline-block px-8 py-3.5 rounded-full text-xs tracking-[0.18em] uppercase font-medium"
                                    style={{ background: "linear-gradient(135deg, #7a1c2e, #3a0a14)", color: "#e0c48a" }}
                                >
                                    Back to Home
                                </Link>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-14"
                            >
                                {/* ── Shipping Form ── */}
                                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                    <p className="text-xs tracking-[0.25em] uppercase mb-1" style={{ color: "#7a1c2e" }}>
                                        Shipping Details
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] tracking-[0.2em] uppercase mb-1.5" style={{ color: "#7a1c2e" }}>Full Name *</label>
                                            <input required value={form.name} onChange={set("name")} placeholder="Your name" style={inputStyle} />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] tracking-[0.2em] uppercase mb-1.5" style={{ color: "#7a1c2e" }}>Phone *</label>
                                            <input required type="tel" value={form.phone} onChange={set("phone")} placeholder="+91 00000 00000" style={inputStyle} />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] tracking-[0.2em] uppercase mb-1.5" style={{ color: "#7a1c2e" }}>Email *</label>
                                        <input required type="email" value={form.email} onChange={set("email")} placeholder="your@email.com" style={inputStyle} />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] tracking-[0.2em] uppercase mb-1.5" style={{ color: "#7a1c2e" }}>Address *</label>
                                        <input required value={form.address} onChange={set("address")} placeholder="Street, apartment" style={inputStyle} />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] tracking-[0.2em] uppercase mb-1.5" style={{ color: "#7a1c2e" }}>City *</label>
                                            <input required value={form.city} onChange={set("city")} placeholder="City" style={inputStyle} />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] tracking-[0.2em] uppercase mb-1.5" style={{ color: "#7a1c2e" }}>Pincode *</label>
                                            <input required value={form.pincode} onChange={set("pincode")} placeholder="000000" style={inputStyle} />
                                        </div>
                                    </div>

                                    <p className="text-xs tracking-[0.25em] uppercase mt-4 mb-1" style={{ color: "#7a1c2e" }}>
                                        Payment Method
                                    </p>
                                    <div className="grid grid-cols-2 gap-3">
                                        {([
                                            { id: "cod", label: "Cash on Delivery" },
                                            { id: "bank-transfer", label: "Bank Transfer / UPI" },
                                        ] as const).map((opt) => (
                                            <button
                                                key={opt.id}
                                                type="button"
                                                onClick={() => setPaymentMethod(opt.id)}
                                                className="py-3 rounded-xl text-xs tracking-[0.05em] transition-all duration-250"
                                                style={{
                                                    background: paymentMethod === opt.id ? "linear-gradient(135deg, #7a1c2e, #3a0a14)" : "rgba(255,255,255,0.04)",
                                                    border: paymentMethod === opt.id ? "1px solid rgba(201,169,110,0.3)" : "1px solid rgba(255,255,255,0.08)",
                                                    color: paymentMethod === opt.id ? "#e0c48a" : "#9a8e8a",
                                                }}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-[11px]" style={{ color: "#555" }}>
                                        Card / UPI online payment is coming soon. For now, orders are confirmed via {paymentMethod === "cod" ? "cash on delivery" : "bank transfer"}, and our team will follow up to finalize payment.
                                    </p>

                                    {error && <p className="text-[11px]" style={{ color: "#e07070" }}>{error}</p>}

                                    <button
                                        type="submit"
                                        id="checkout-place-order"
                                        disabled={isSubmitting}
                                        className="relative w-full py-4 rounded-full overflow-hidden mt-2 transition-opacity"
                                        style={{ opacity: isSubmitting ? 0.6 : 1 }}
                                    >
                                        <span className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(135deg, #7a1c2e, #3a0a14)" }} />
                                        <span className="relative text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: "#e0c48a" }}>
                                            {isSubmitting
                                                ? "Placing Order…"
                                                : `Place Order — ${formatPrice(couponApplied ? finalTotal : subtotal)}`}
                                        </span>
                                    </button>
                                </form>

                                {/* ── Order Summary ── */}
                                <div>
                                    <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "#7a1c2e" }}>
                                        Order Summary ({itemCount})
                                    </p>
                                    <div
                                        className="rounded-2xl p-6 flex flex-col gap-5"
                                        style={{ background: "rgba(14,10,12,0.5)", border: "1px solid rgba(255,255,255,0.05)" }}
                                    >
                                        {/* Line items */}
                                        {lines.map((line) => (
                                            <div key={line.slug} className="flex gap-4">
                                                <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden" style={{ border: "1px solid rgba(201,169,110,0.15)" }}>
                                                    <Image src={line.image} alt={line.name} fill className="object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-light truncate" style={{ color: "#f0ece8" }}>{line.name}</p>
                                                    <p className="text-[11px] tracking-[0.1em] uppercase" style={{ color: "#7a1c2e" }}>{line.label} · Qty {line.quantity}</p>
                                                </div>
                                                <span className="text-sm" style={{ color: "#c9a96e" }}>{formatPrice(line.price * line.quantity)}</span>
                                            </div>
                                        ))}

                                        <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

                                        {/* ── Coupon input ── */}
                                        {couponApplied ? (
                                            <motion.div
                                                initial={{ opacity: 0, y: -6 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl"
                                                style={{
                                                    background: "rgba(122,28,46,0.12)",
                                                    border: "1px solid rgba(201,169,110,0.25)",
                                                }}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#c9a96e" }} />
                                                    <span className="text-[11px] font-medium tracking-[0.06em]" style={{ color: "#c9a96e" }}>
                                                        MOAN51 applied — 51% off unlocked
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={handleRemoveCoupon}
                                                    className="text-[10px] tracking-[0.08em] uppercase ml-2 flex-shrink-0"
                                                    style={{ color: "#666" }}
                                                    onMouseEnter={(e) => (e.currentTarget.style.color = "#e07070")}
                                                    onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
                                                >
                                                    Remove
                                                </button>
                                            </motion.div>
                                        ) : (
                                            <div>
                                                <div className="flex gap-2">
                                                    <div className="relative flex-1">
                                                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "#555" }} />
                                                        <input
                                                            id="checkout-coupon-input"
                                                            type="text"
                                                            value={couponInput}
                                                            onChange={(e) => {
                                                                setCouponInput(e.target.value);
                                                                setCouponStatus("idle");
                                                            }}
                                                            onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                                                            placeholder="Have a coupon code?"
                                                            className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs"
                                                            style={{
                                                                background: "rgba(255,255,255,0.04)",
                                                                border: couponStatus === "invalid"
                                                                    ? "1px solid rgba(224,112,112,0.5)"
                                                                    : "1px solid rgba(255,255,255,0.09)",
                                                                color: "#f0ece8",
                                                                outline: "none",
                                                            }}
                                                        />
                                                    </div>
                                                    <button
                                                        id="checkout-coupon-apply"
                                                        type="button"
                                                        onClick={handleApplyCoupon}
                                                        className="px-4 py-2.5 rounded-xl text-xs font-semibold tracking-[0.1em] uppercase"
                                                        style={{
                                                            background: "linear-gradient(135deg, #7a1c2e, #3a0a14)",
                                                            color: "#e0c48a",
                                                            border: "1px solid rgba(201,169,110,0.2)",
                                                        }}
                                                    >
                                                        Apply
                                                    </button>
                                                </div>
                                                {couponStatus === "invalid" && (
                                                    <motion.p
                                                        initial={{ opacity: 0, y: -4 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="text-[11px] mt-1.5 ml-1"
                                                        style={{ color: "#e07070" }}
                                                    >
                                                        Invalid coupon code
                                                    </motion.p>
                                                )}
                                            </div>
                                        )}

                                        <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

                                        {/* ── Price breakdown ── */}
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs tracking-[0.15em] uppercase" style={{ color: "#9a8e8a" }}>Subtotal</span>
                                                <span
                                                    className="text-sm font-light"
                                                    style={{
                                                        color: couponApplied ? "#555" : "#f0ece8",
                                                        textDecoration: couponApplied ? "line-through" : "none",
                                                    }}
                                                >
                                                    {formatPrice(subtotal)}
                                                </span>
                                            </div>

                                            {couponApplied && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -4 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="flex items-center justify-between"
                                                >
                                                    <span className="text-xs tracking-[0.15em] uppercase" style={{ color: "#c9a96e" }}>
                                                        Coupon Discount (51%)
                                                    </span>
                                                    <span className="text-sm font-medium" style={{ color: "#c9a96e" }}>
                                                        − {formatPrice(discountAmount)}
                                                    </span>
                                                </motion.div>
                                            )}

                                            <div
                                                className="flex items-center justify-between pt-2"
                                                style={{ borderTop: "1px solid rgba(201,169,110,0.12)" }}
                                            >
                                                <span className="text-xs tracking-[0.15em] uppercase font-semibold" style={{ color: "#f0ece8" }}>
                                                    {couponApplied ? "Final Payable" : "Total"}
                                                </span>
                                                <span className="text-lg font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9a96e" }}>
                                                    {formatPrice(couponApplied ? finalTotal : subtotal)}
                                                </span>
                                            </div>
                                        </div>

                                        <p className="text-[10px]" style={{ color: "#555" }}>
                                            Shipping calculated and confirmed by our team after order placement.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
            <Footer />
        </>
    );
}
