import type { Metadata } from "next";
import PolicyPageLayout from "@/components/ui/PolicyPageLayout";

export const metadata: Metadata = {
    title: "Terms & Conditions | Moan",
    description: "Read Moan's terms and conditions for using our website and purchasing premium mood candles. Understand our usage policies and safety guidelines.",
};

const sections = [
    {
        title: "Acceptance of Terms",
        content: `By accessing or using the Moan website (moanworld.com), you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please discontinue use of our website.\n\nMoan reserves the right to update these terms at any time. Continued use of the website after changes constitutes your acceptance of the revised terms.`,
    },
    {
        title: "Product Description & Images",
        content: `We make every effort to accurately represent our products. However, product images shown on our website are for illustrative purposes and may slightly differ from the actual product in colour, texture, or appearance due to photography lighting, screen calibration, or minor batch variations.\n\nProduct descriptions are written to the best of our knowledge and are subject to change without prior notice.`,
    },
    {
        title: "Pricing, Offers & Discounts",
        content: `All prices displayed on the website are in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise.\n\nMoan reserves the right to change product prices, offers, and discounts at any time without prior notice. Any promotional offer is valid only for the specified period and subject to availability.`,
    },
    {
        title: "Launch Offer — Coupon MOAN51",
        content: `The coupon code MOAN51 grants a 51% discount on eligible products during the Moan launch offer period.\n\nTerms for this offer:\n\n• Valid only during the official launch offer window\n• Applicable on selected products only\n• Cannot be combined with other offers or coupons\n• Moan reserves the right to withdraw or modify this offer at any time\n• Misuse of the coupon code may result in order cancellation`,
    },
    {
        title: "Intended Use of Products",
        content: `Moan products are designed for ambience and lifestyle use only. Our candles are crafted to enhance your space, mood, and experience.\n\nOur products are not intended for:\n\n• Medicinal, therapeutic, or clinical purposes\n• Food, beverage, or topical application\n• Any use not described on the product packaging or website`,
    },
    {
        title: "Candle Safety Guidelines",
        content: `Your safety is our priority. Please follow these candle safety guidelines at all times:\n\n• Always keep burning candles away from children and pets\n• Keep candles away from curtains, fabrics, paper, and other flammable materials\n• Never leave a burning candle unattended — extinguish before leaving the room or going to sleep\n• Place candles on a stable, heat-resistant surface\n• Keep the wax pool free of wick trimmings and debris\n• Do not burn a candle for more than 4 hours at a time\n• Allow the candle to cool completely before handling or relighting\n• Keep out of drafts and ventilated areas to avoid uneven burning\n\nMoan is not liable for any damage, injury, or loss resulting from improper or unsafe use of our products.`,
    },
    {
        title: "Intellectual Property",
        content: `All content on the Moan website — including brand name, logo, product imagery, copy, design, and packaging — is the intellectual property of Moan and is protected under applicable copyright and trademark laws.\n\nYou may not reproduce, distribute, or use any Moan content without prior written permission.`,
    },
    {
        title: "Limitation of Liability",
        content: `To the maximum extent permitted by law, Moan shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use our products or website.\n\nOur total liability in any matter arising out of or related to these terms shall not exceed the purchase price paid by you for the relevant product.`,
    },
    {
        title: "Governing Law",
        content: `These Terms & Conditions are governed by the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of courts in India.`,
    },
    {
        title: "Contact Us",
        content: `For any questions regarding these Terms & Conditions, reach out to us at:\n\nEmail: moanofficials@gmail.com\nInstagram: @moanofficials`,
    },
];

export default function TermsAndConditionsPage() {
    return (
        <PolicyPageLayout
            title="Terms & Conditions"
            subtitle="Simple, transparent terms — because trust is the foundation of every relationship."
            lastUpdated="July 2026"
            sections={sections}
        />
    );
}
