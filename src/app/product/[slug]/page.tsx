import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import ProductDetail from "@/components/product/ProductDetail";
import { products, getProductBySlug, formatPrice } from "@/lib/products";

export function generateStaticParams() {
    return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const product = getProductBySlug(slug);
    if (!product) return { title: "Product Not Found | Moan" };

    const title = `${product.name} (${product.label}) — ${formatPrice(product.price)} | Moan`;
    const description = `${product.description} Burn time: ${product.burnTime}.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "website",
            url: `https://moanworld.com/product/${product.slug}`,
            images: [{ url: `https://moanworld.com${product.images[0]}`, width: 1200, height: 1200, alt: product.name }],
        },
    };
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = getProductBySlug(slug);
    if (!product) notFound();

    return (
        <>
            <Navbar />
            <ProductDetail product={product} />
            <Footer />
        </>
    );
}
