import type { Metadata } from "next"
import PageWrapper from "@/components/PageWrapper"
import StormHero from "./components/StormHero"
import StormThreePhase from "./components/StormThreePhase"
import StormSpecifications from "./components/StormSpecifications"
import StormLast from "./components/StormLast"
import StormFeatures from "./components/StormFeatures"
import StormMission from "./components/StormMission"
import SectionSnap from "@/components/SectionSnap"




export const metadata: Metadata = {
  title: "STORM - Smart Transport Operations for Rugged Missions - Tsalla Aerospace",
  description: "STORM is a heavy-duty transport system for challenging environments and critical supply missions.",
}

export default function StormPage() {
  // PREVIOUS UI: <PageWrapper>
  return (
    <PageWrapper hasHero={true} className="storm-page font-orbit">
      <SectionSnap panels=".storm-page > section, footer" />
      <StormHero />
      <StormThreePhase />
      <StormSpecifications />
      <StormMission />
      <StormFeatures />
      <StormLast />
    </PageWrapper>
  )
}
