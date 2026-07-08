import type { Metadata } from "next";
import PolicyPageLayout from "@/components/ui/PolicyPageLayout";

export const metadata: Metadata = {
    title: "Shipping Policy | Moan",
    description: "Learn about Moan's shipping timelines, delivery partners, and order tracking for premium mood candles delivered across India.",
};

const sections = [
    {
        title: "Overview",
        content: `We want your Moan candle to arrive safely and swiftly. This policy outlines our shipping timelines, delivery process, and what to expect after you place your order.`,
    },
    {
        title: "Order Processing Time",
        content: `All orders are processed within 1–3 working days after payment confirmation.\n\nOrders placed on weekends or public holidays will begin processing on the next working day. You will receive an order confirmation on your registered email or WhatsApp number once your order is placed.`,
    },
    {
        title: "Delivery Timeline",
        content: `Standard delivery across India typically takes 3–7 working days from the date of dispatch, depending on your location.\n\n• Metro cities: 3–5 working days\n• Tier 2 & Tier 3 cities: 5–7 working days\n• Remote areas: May take up to 10 working days\n\nDelivery timelines are estimates and may vary during peak seasons, festive periods, or due to factors beyond our control.`,
    },
    {
        title: "Shipping Charges",
        content: `Shipping charges, if applicable, will be clearly displayed at checkout before you complete your payment. We periodically offer free shipping promotions — check for active offers at the time of purchase.\n\nNo hidden charges will be added after order placement.`,
    },
    {
        title: "Order & Shipping Updates",
        content: `Once your order is dispatched, you will receive tracking details via email or WhatsApp. You can use the tracking link to monitor your delivery in real time.\n\nFor any shipping queries, reach out to us at moanofficials@gmail.com or DM us on Instagram @moanofficials.`,
    },
    {
        title: "Delivery Delays & Liability",
        content: `Moan is not responsible for delays caused by:\n\n• Courier partner operations or logistics issues\n• Adverse weather conditions or natural events\n• Incorrect or incomplete delivery address provided by the customer\n• Public holidays or government-imposed restrictions\n\nPlease ensure your delivery address and contact number are accurate at the time of ordering. Address corrections after dispatch are not guaranteed.`,
    },
    {
        title: "Undeliverable Packages",
        content: `If a package is returned to us due to an incorrect address, failed delivery attempts, or customer unavailability, we will contact you to arrange re-shipment. Re-shipping charges may apply.`,
    },
];

export default function ShippingPolicyPage() {
    return (
        <PolicyPageLayout
            title="Shipping Policy"
            subtitle="Fast, careful delivery — because every candle deserves a grand arrival."
            lastUpdated="July 2026"
            sections={sections}
        />
    );
}
