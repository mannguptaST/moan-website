import type { Metadata } from "next";
import PolicyPageLayout from "@/components/ui/PolicyPageLayout";

export const metadata: Metadata = {
    title: "Refund Policy | Moan",
    description: "Read Moan's refund and return policy for premium mood candles. Understand our refund process for damaged, defective, or wrong products.",
};

const sections = [
    {
        title: "Overview",
        content: `At Moan, every candle is crafted with care and shipped with love. We stand behind the quality of our products and want you to have a seamless experience. Please read our refund policy carefully before placing your order.`,
    },
    {
        title: "Order Cancellation",
        content: `Orders once shipped cannot be cancelled. We begin processing orders quickly to ensure fast delivery, so please review your order carefully before confirming payment.\n\nIf your order has not yet been shipped, you may reach out to us at moanofficials@gmail.com to request a cancellation.`,
    },
    {
        title: "Eligibility for Refund or Replacement",
        content: `We offer a refund or replacement only in the following cases:\n\n• The product received is damaged in transit\n• The product received is defective (e.g., broken vessel, wick issue)\n• A wrong product was delivered to you\n\nUsed or opened candles are not eligible for return or refund under any circumstances. We do not accept returns for change of mind, fragrance preference, or personal taste.`,
    },
    {
        title: "How to Raise a Claim",
        content: `To initiate a refund or replacement request, you must:\n\n1. Record an unboxing video at the time of delivery — this is mandatory\n2. Share clear photographs of the damaged or defective product\n3. Contact us within 24–48 hours of delivery via email at moanofficials@gmail.com or WhatsApp\n\nClaims raised after 48 hours of delivery will not be entertained. The unboxing video/photos are required to process your request — no exceptions.`,
    },
    {
        title: "Refund Processing",
        content: `If your refund request is approved after review, the refund amount will be credited to your original payment method within 5–7 working days.\n\nIn some cases, we may offer a replacement product instead of a refund, at our discretion. You will be notified of the resolution via email or WhatsApp.`,
    },
    {
        title: "Contact Us",
        content: `For any refund or replacement queries, write to us at:\n\nEmail: moanofficials@gmail.com\nInstagram: @moanofficials\n\nWe typically respond within 24–48 business hours.`,
    },
];

export default function RefundPolicyPage() {
    return (
        <PolicyPageLayout
            title="Refund Policy"
            subtitle="Your trust matters. Here's how we handle returns and refunds."
            lastUpdated="July 2026"
            sections={sections}
        />
    );
}
