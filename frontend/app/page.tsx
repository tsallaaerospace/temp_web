import HeroSection from "@/components/HeroSection"
import VelocityComplex from "@/components/VelocityComplex"
import Testimonials from "@/components/Testimonials"
import PageWrapper from "@/components/PageWrapper"
import Missions from "@/components/Missions"
import ProductSection from "@/components/ProductSection"

export default function HomePage() {
  return (
    <PageWrapper hasHero={true} className="font-orbit">
      <HeroSection />
      <Missions />
      <ProductSection />
      <VelocityComplex />
      <Testimonials />
    </PageWrapper>
  )
}
