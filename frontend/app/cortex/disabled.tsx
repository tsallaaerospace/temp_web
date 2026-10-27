"use client"

import React from "react"
import PageWrapper from "@/components/PageWrapper"
import SectionSnap from "@/components/SectionSnap"
import CortexHero from "./components/CortexHero"
import CortexDomains from "./components/CortexDomains"
import CortexCapabilities from "./components/CortexCapabilities"
import CortexHowItWorks from "./components/CortexHowItWorks"
import CortexOperations from "./components/CortexOperations"

export default function CortexPage() {
    return (
        <PageWrapper hasHero={true}>
            <div className="maverick-page min-h-screen bg-black text-white font-orbit overflow-hidden">
                <SectionSnap panels=".maverick-page > :not(style), footer" />
                <CortexHero />
                <CortexDomains />
                <CortexCapabilities />
                <CortexHowItWorks />
                <CortexOperations />
            </div>
        </PageWrapper>
    )
}
