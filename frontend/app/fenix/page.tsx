import type { Metadata } from "next"
import PageWrapper from "@/components/PageWrapper"
import SectionSnap from "@/components/SectionSnap"
import FenixHero from "./components/FenixHero"
import FenixCapabilities from "./components/FenixCapabilities"
import FenixSpecifications from "./components/FenixSpecifications"
import FenixFeatures from "./components/FenixFeatures"
import FenixTurtleMode from "./components/FenixTurtleMode"
import FenixGPSNavigation from "./components/FenixGPSNavigation"
import FenixLast from "./components/FenixLast"
import FenixResponder1 from "./components/FenixResponder1"
import FenixFloorMap from "./components/FenixFloorMap"
import FenixAwareness from "./components/FenixAwareness"




export const metadata: Metadata = {
  title: "FENIX - Fast Entry Navigational Intrusion eXplorer - Tsalla Aerospace",
  description: "FENIX is a high-speed reconnaissance and infiltration system for rapid deployment scenarios.",
}

export default function FenixPage() {
  return (
    // <PageWrapper>
    //   <FenixHero />
    //   <FenixCapabilities />
    //   <FenixResponder1 />
    //   <FenixResponder2 />
    //   <FenixSpecifications />
    //   <FenixMission />
    //   <FenixTurtleMode />
    //   <FenixGPSNavigation />
    //   <FenixFeatures />
    //   <FenixLast />
    // </PageWrapper>

    <PageWrapper hasHero={true} className="fenix-page">
      <SectionSnap panels=".fenix-page > :not(style), footer" />
      <FenixHero />
      <FenixCapabilities />
      <FenixGPSNavigation />
      <FenixTurtleMode />
      <FenixFloorMap />
      <FenixAwareness />
      {/* Temporarily hidden on 22 October 2026: FenixPtoP and FenixMission. See docs/FENIX/FENIX.docx. */}
      <FenixResponder1 />
      {/* Temporarily hidden: FenixResponder2. Component files and assets are retained for restoration. */}


      <FenixSpecifications />
      <FenixLast backgroundVideoSrc="/product/fenix/smoke-Trim-2.mp4" />
    </PageWrapper>
  )
}
