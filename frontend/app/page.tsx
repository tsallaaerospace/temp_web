import HeroSection from "@/components/HeroSection"
import VelocityComplex from "@/components/VelocityComplex"
import Testimonials from "@/components/Testimonials"
import PageWrapper from "@/components/PageWrapper"
import Missions from "@/components/Missions"
import ProductSection from "@/components/ProductSection"

export default function HomePage() {
  return (
    {/* PREVIOUS UI (Standard PageWrapper without scroll snap):
    <PageWrapper hasHero={true} className="font-orbit">
    */}
    <PageWrapper hasHero={true} className="font-orbit snap-y snap-proximity scroll-smooth">
      <HeroSection />
      <Missions />
      <ProductSection />
      <VelocityComplex />
      <Testimonials />
    </PageWrapper>
  )
}
