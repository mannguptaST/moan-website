export interface Product {
    slug: string;
    label: string; // volume, e.g. "200ml"
    name: string;
    tagline: string;
    description: string;
    story: string;
    price: number; // INR — placeholder, update before going live
    compareAtPrice?: number;
    burnTime: string;
    tag?: string;
    featured: boolean;
    notes: { title: string; body: string }[];
    images: string[];
}

// Prices are placeholders — update with real pricing before launch.
export const products: Product[] = [
    {
        slug: "trial-flame",
        label: "50ml",
        name: "Trial Flame",
        tagline: "Your First Encounter",
        description:
            "A taste of the Moan experience. Perfect for gifting or discovering your mood. Compact, powerful, personal.",
        story:
            "The Trial Flame is where every Moan story begins — a single, focused pour meant to introduce you to the scent before you commit to a room-filling size. Light it once and you'll understand why our smallest jar still makes the biggest impression.",
        price: 699,
        compareAtPrice: 999,
        burnTime: "4–6 hrs",
        tag: "Best for Gifting",
        featured: false,
        notes: [
            { title: "Matte Wine-Red Jar", body: "The same tactile, weighted vessel as our full-size candles, scaled down for travel and gifting." },
            { title: "Warm, Slow-Burning Flame", body: "A clean, even burn engineered to fill smaller spaces without overwhelming them." },
            { title: "Premium Pour Quality", body: "Hand-poured natural wax with minimal additives — no compromise for the smaller size." },
        ],
        images: ["/images/intimate-close-2.jpg", "/images/intimate-close.jpg"],
    },
    {
        slug: "signature-mood",
        label: "200ml",
        name: "Signature Mood",
        tagline: "The Essential",
        description:
            "Our most loved size. Rich presence, slow burn, full experience. The candle your evenings deserve.",
        story:
            "Signature Mood is Moan at its truest — the size built for the evenings that matter. A deep, even pour that fills a bedroom or living space with warmth for hours, in a jar designed to sit proudly on your nightstand long after the flame goes out.",
        price: 1499,
        compareAtPrice: 1999,
        burnTime: "10–12 hrs",
        tag: "Most Popular",
        featured: true,
        notes: [
            { title: "Matte Wine-Red Jar", body: "A tactile, matte-finished vessel in deep burgundy — weighty in the hand, striking on any surface." },
            { title: "Warm, Slow-Burning Flame", body: "Formulated for an extended, clean burn that fills the room slowly — the way a great evening unfolds." },
            { title: "Premium Pour Quality", body: "Each candle is hand-poured with intention. Natural wax, minimal additives, maximum presence." },
        ],
        images: ["/images/intimate-close.jpg", "/images/product-reveal.jpg", "/images/intimate-close-2.jpg"],
    },
    {
        slug: "after-dark-edition",
        label: "300ml",
        name: "After Dark Edition",
        tagline: "The Statement Piece",
        description:
            "For the evenings that last until morning. Deep, lasting warmth. A centrepiece for any bedroom or living space.",
        story:
            "After Dark is our largest and longest-burning pour — a centrepiece candle for the nights you don't want to end. Built for collectors and for anyone who wants their space held in warm light from dusk until well past midnight.",
        price: 2199,
        compareAtPrice: 2799,
        burnTime: "18–20 hrs",
        tag: "Collector's Edition",
        featured: false,
        notes: [
            { title: "Matte Wine-Red Jar", body: "Our largest vessel — the same matte burgundy finish, scaled up into a true statement piece." },
            { title: "Warm, Slow-Burning Flame", body: "The longest burn in the collection, designed for extended sessions and repeat lighting." },
            { title: "Premium Pour Quality", body: "Hand-poured natural wax, finished with the same gold-lid detailing across every size." },
        ],
        images: ["/images/sizes-candles.jpg", "/images/hero-candles.jpg"],
    },
];

export function getProductBySlug(slug: string): Product | undefined {
    return products.find((p) => p.slug === slug);
}

export function formatPrice(amount: number): string {
    return `₹${amount.toLocaleString("en-IN")}`;
}
