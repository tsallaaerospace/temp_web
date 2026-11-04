import type { Metadata } from "next"
import PageWrapper from "@/components/PageWrapper"
import Founders from "../about/components/Founders"
// PREVIOUS UI: import AwardsAndCertification from "../about/components/AwardsAndCertification" ("GET IN TOUCH" section)
import FounderLetter from "./components/FounderLetter"
// Hidden section (see below): import FenixLast from "../fenix/components/FenixLast"
// Hidden section (see below): import InsideTsallaLeadership from "./components/dummy"

export const metadata: Metadata = {
    title: "Leadership - Tsalla Aerospace",
    description: "Meet the leadership behind Tsalla Aerospace, driving innovation in autonomous aerospace solutions.",
}

export default function LeadershipPage() {
    // PREVIOUS UI: <PageWrapper> (hero started below the navbar). hasHero lets the hero photo run under the navbar.
    return (
        <PageWrapper hasHero={true}>
            <div className="font-orbit">
                <Founders />
                <FounderLetter />
                {/* Hidden for now: "INSIDE TSALLA AEROSPACE" section. Uncomment to show it again. */}
                {/* <InsideTsallaLeadership /> */}
                {/* Hidden for now: "Ready to deploy where others cannot" section (shared with the FENIX page). */}
                {/* <FenixLast /> */}
            </div>
        </PageWrapper>
    )
}
