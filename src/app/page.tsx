import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import MoodMarquee from "@/components/effects/Marquee";
import ProductReveal from "@/components/sections/ProductReveal";
import BrandStory from "@/components/sections/BrandStory";
import MoodNotes from "@/components/sections/MoodNotes";
import UseCases from "@/components/sections/UseCases";
import ProductSizes from "@/components/sections/ProductSizes";
import ComingSoon from "@/components/sections/ComingSoon";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main id="home" className="min-h-screen bg-[#08080a]">
      <Navbar />
      <Hero />
      <MoodMarquee />
      <ProductReveal />
      <BrandStory />
      <MoodNotes />
      <UseCases />
      <ProductSizes />
      <ComingSoon />
      <Footer />
    </main>
  );
}
