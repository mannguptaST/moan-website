export interface OrderItem {
    slug: string;
    name: string;
    label: string;
    quantity: number;
    price: number;
}

export interface OrderPayload {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
    paymentMethod: "cod" | "bank-transfer";
    items: OrderItem[];
    subtotal: number;
    couponCode?: string;
    discountAmount?: number;
    finalTotal?: number;
}

export async function submitOrder(order: OrderPayload): Promise<boolean> {
    try {
        const res = await fetch("/api/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order),
        });
        return res.ok;
    } catch {
        return false;
    }
}
