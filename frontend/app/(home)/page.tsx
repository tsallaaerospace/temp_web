import HeroSection from "./components/HeroSection"
import VelocityComplex from "./components/VelocityComplex"
import Testimonials from "./components/Testimonials"
import PageWrapper from "@/components/PageWrapper"
import SectionSnap from "@/components/SectionSnap"
import Missions from "./components/Missions"
import ProductSection from "./components/ProductSection"

export default function HomePage() {
  return (
    <PageWrapper hasHero={true} className="home-page font-orbit snap-y snap-proximity scroll-smooth">
      {/* PREVIOUS UI: PageWrapper hasHero={true} className="font-orbit" */}
      <SectionSnap panels=".home-page > section, footer" />
      <HeroSection />
      <Missions />
      <ProductSection />
      <VelocityComplex />
      <Testimonials />
    </PageWrapper>
  )
}
