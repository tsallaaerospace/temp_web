import type { Metadata } from "next"
import PageWrapper from "@/components/PageWrapper"
import DetectionHero from "./components/DetectionHero"
import DetectionOperational from "./components/DetectionOperational"
import DetectionFeatures from "./components/DetectionFeatures"


export const metadata: Metadata = {
    title: "Detection Systems - Tsalla Aerospace",
    description: "Advanced passive wide area search and detection systems featuring ViDAR technology.",
}

export default function DetectionPage() {
    return (
        <PageWrapper hasHero={true}>
            <main className="min-h-screen bg-black text-white">
                <DetectionHero />
                <DetectionOperational />
                <DetectionFeatures />

            </main>
        </PageWrapper>
    )
}
