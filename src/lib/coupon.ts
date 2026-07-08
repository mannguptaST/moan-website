// ── Coupon utility ────────────────────────────────────────────────────────────
// Single source of truth for coupon validation and discount calculation.

export const VALID_COUPON = "MOAN51";
export const COUPON_DISCOUNT_PCT = 51;

/** Returns true if the entered code matches MOAN51 (case-insensitive). */
export function validateCoupon(code: string): boolean {
    return code.trim().toUpperCase() === VALID_COUPON;
}

/**
 * Calculate the discount and final payable amount for a given subtotal.
 * Final amount is rounded to the nearest rupee.
 */
export function calcDiscount(subtotal: number): { discount: number; final: number } {
    const discount = Math.round(subtotal * COUPON_DISCOUNT_PCT / 100);
    const final = subtotal - discount;
    return { discount, final };
}
