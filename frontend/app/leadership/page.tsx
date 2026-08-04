import type { Metadata } from "next"
import PageWrapper from "@/components/PageWrapper"
import Founders from "../about/components/Founders"
import AwardsAndCertification from "../about/components/AwardsAndCertification"
import FenixLast from "../uncrewedsystems/fenix/components/FenixLast"
import InsideTsallaLeadership from "./components/dummy"

export const metadata: Metadata = {
    title: "Leadership - Tsalla Aerospace",
    description: "Meet the leadership behind Tsalla Aerospace, driving innovation in autonomous aerospace solutions.",
}

export default function LeadershipPage() {
    return (
        <PageWrapper>
            <div className="font-orbit">
                <Founders />
                <AwardsAndCertification />
                <InsideTsallaLeadership />
                <FenixLast />
            </div>
        </PageWrapper>
    )
}
