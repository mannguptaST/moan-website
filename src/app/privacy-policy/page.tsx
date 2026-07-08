import type { Metadata } from "next";
import PolicyPageLayout from "@/components/ui/PolicyPageLayout";

export const metadata: Metadata = {
    title: "Privacy Policy | Moan",
    description: "Moan's privacy policy — how we collect, use, and protect your personal information when you shop with us.",
};

const sections = [
    {
        title: "Introduction",
        content: `At Moan, your privacy is of the utmost importance to us. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or make a purchase.\n\nBy using our website, you consent to the practices described in this policy.`,
    },
    {
        title: "Information We Collect",
        content: `We collect only the information necessary to process your order and provide you with a smooth shopping experience. This includes:\n\n• Full name\n• Phone number\n• Email address\n• Delivery address\n• Order and payment details\n\nWe do not collect sensitive personal data beyond what is required for order fulfilment.`,
    },
    {
        title: "How We Use Your Information",
        content: `Your personal information is used solely for the following purposes:\n\n• Processing and fulfilling your order\n• Sending order confirmation and shipping updates via email or WhatsApp\n• Providing customer support and resolving disputes\n• Sharing launch offers, new product announcements, or exclusive deals (you may opt out at any time)`,
    },
    {
        title: "Payment Security",
        content: `All payment transactions are processed securely through our trusted payment gateway partners. Moan does not store your payment card details on our servers.\n\nPayment information is encrypted and handled in compliance with applicable payment security standards.`,
    },
    {
        title: "Data Sharing & Third Parties",
        content: `We do not sell, trade, or rent your personal data to any third party.\n\nYour information may be shared only with:\n\n• Our delivery/courier partners (to fulfil your order)\n• Our payment gateway provider (for secure transaction processing)\n\nThese third parties are contractually obligated to keep your information confidential and use it only for the stated purpose.`,
    },
    {
        title: "Data Retention",
        content: `We retain your personal information only as long as necessary to provide our services or as required by applicable law. If you wish to have your data deleted, you may contact us at moanofficials@gmail.com.`,
    },
    {
        title: "Cookies",
        content: `Our website may use cookies to improve your browsing experience, remember preferences, and analyse site traffic. You may disable cookies through your browser settings, though some features of the site may not function optimally.`,
    },
    {
        title: "Your Rights",
        content: `You have the right to:\n\n• Access the personal data we hold about you\n• Request correction of inaccurate data\n• Request deletion of your data\n• Opt out of marketing communications\n\nTo exercise any of these rights, write to us at moanofficials@gmail.com.`,
    },
    {
        title: "Changes to This Policy",
        content: `We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this page periodically.`,
    },
];

export default function PrivacyPolicyPage() {
    return (
        <PolicyPageLayout
            title="Privacy Policy"
            subtitle="We respect your data as much as you respect a burning candle — with care and intention."
            lastUpdated="July 2026"
            sections={sections}
        />
    );
}
