import type { Metadata } from "next"
import PageWrapper from "@/components/PageWrapper"
import BatHero from "./components/BatHero"
import BatCapabilities from "./components/BatCapabilities"
import BatSpecifications from "./components/BatSpecifications"
import BatLast from "./components/BatLast"
import BatMission from "./components/BatMission"
import Bat3DSequence from "./components/Bat3DSequence"
import BatPayLoad2 from "./components/BatPayLoad2"
import BatBatterySwap from "./components/BatBatterySwap"
import BatCurtainReveal from "./components/BatCurtainReveal"
import SectionSnap from "@/components/SectionSnap"
import BatMultiRole from "./components/BatMultiRole"
import BatSpecs from "./components/BatSpecs"


export const metadata: Metadata = {
  title: "BAT - Battlefield Aerial Tactical UAS - Tsalla Aerospace",
  description: "BAT is a tactical unmanned aerial system optimized for battlefield operations and surveillance.",
}

export default function BatPage() {
  // PREVIOUS UI: <PageWrapper>
  return (
    <PageWrapper hasHero={true} className="bat-page font-orbit">
      <SectionSnap panels={'.bat-page > :not(style):not([data-bat-section="hero"]), footer'} />
      <BatHero />
      <BatMultiRole />
      <BatSpecs />
      {/* Hidden for now: <BatCurtainReveal /> */}
      {/* <BatCapabilities /> */}

      {/* Hidden for now: <BatSpecifications /> */}
      {/* Hidden for now: <BatMission /> */}

      <BatPayLoad2 />
      <BatBatterySwap />
      <div className="bat-sequence-boundary h-screen">
        <Bat3DSequence />
      </div>
      <BatLast />
    </PageWrapper>
  )
}
