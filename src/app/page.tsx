import { HeroSection } from "@/components/home/hero-section";
import { CategoriesGrid } from "@/components/home/categories-grid";
import { FeaturedProducts } from "@/components/home/featured-products";
import { UspBanner } from "@/components/home/usp-banner";
import { TrendingProducts } from "@/components/home/trending-products";
import { BestSellers } from "@/components/home/best-sellers";
import { Testimonials } from "@/components/home/testimonials";
import { InstagramGallery } from "@/components/home/instagram-gallery";
import { Newsletter } from "@/components/home/newsletter";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesGrid />
      <FeaturedProducts />
      <UspBanner />
      <TrendingProducts />
      <BestSellers />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />
    </>
  );
}
