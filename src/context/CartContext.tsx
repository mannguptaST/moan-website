"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getProductBySlug } from "@/lib/products";
import { validateCoupon, calcDiscount } from "@/lib/coupon";

export interface CartItem {
    slug: string;
    quantity: number;
}

export interface CartLine extends CartItem {
    name: string;
    label: string;
    price: number;
    image: string;
}

interface CartContextType {
    items: CartItem[];
    lines: CartLine[];
    itemCount: number;
    subtotal: number;
    // Coupon
    couponCode: string;
    couponApplied: boolean;
    discountAmount: number;
    finalTotal: number;
    applyCoupon: (code: string) => "ok" | "invalid";
    removeCoupon: () => void;
    // Cart UI
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    addItem: (slug: string, quantity?: number) => void;
    removeItem: (slug: string) => void;
    updateQuantity: (slug: string, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "moan_cart";

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const [couponApplied, setCouponApplied] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) setItems(JSON.parse(stored));
        } catch {
            // ignore
        }
    }, []);

    const persist = (next: CartItem[]) => {
        setItems(next);
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
            // ignore
        }
    };

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    const addItem = (slug: string, quantity = 1) => {
        const existing = items.find((i) => i.slug === slug);
        if (existing) {
            persist(items.map((i) => (i.slug === slug ? { ...i, quantity: i.quantity + quantity } : i)));
        } else {
            persist([...items, { slug, quantity }]);
        }
        setIsCartOpen(true);
    };

    const removeItem = (slug: string) => {
        persist(items.filter((i) => i.slug !== slug));
    };

    const updateQuantity = (slug: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(slug);
            return;
        }
        persist(items.map((i) => (i.slug === slug ? { ...i, quantity } : i)));
    };

    const clearCart = () => {
        persist([]);
        setCouponCode("");
        setCouponApplied(false);
    };

    const applyCoupon = (code: string): "ok" | "invalid" => {
        if (validateCoupon(code)) {
            setCouponCode("MOAN51");
            setCouponApplied(true);
            return "ok";
        }
        return "invalid";
    };

    const removeCoupon = () => {
        setCouponCode("");
        setCouponApplied(false);
    };

    const lines: CartLine[] = items
        .map((item) => {
            const product = getProductBySlug(item.slug);
            if (!product) return null;
            return {
                ...item,
                name: product.name,
                label: product.label,
                price: product.price,
                image: product.images[0],
            };
        })
        .filter((line): line is CartLine => line !== null);

    const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
    const subtotal = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
    const { discount: discountAmount, final: finalTotal } = couponApplied
        ? calcDiscount(subtotal)
        : { discount: 0, final: subtotal };

    return (
        <CartContext.Provider
            value={{
                items, lines, itemCount, subtotal,
                couponCode, couponApplied, discountAmount, finalTotal,
                applyCoupon, removeCoupon,
                isCartOpen, openCart, closeCart,
                addItem, removeItem, updateQuantity, clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside CartProvider");
    return ctx;
}
