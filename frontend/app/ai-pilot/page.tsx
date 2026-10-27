"use client"

import React from "react"
import PageWrapper from "@/components/PageWrapper"
import SectionSnap from "@/components/SectionSnap"
import AIHero from "./components/AIHero"
import AIDomains from "./components/AIDomains"
import AICapabilities from "./components/AICapabilities"
import AIHowItWorks from "./components/AIHowItWorks"
import AIOperations from "./components/AIOperations"

export default function AIPilotPage() {
    return (
        <PageWrapper hasHero={true}>
            <div className="maverick-page min-h-screen bg-black text-white font-orbit overflow-x-clip">
                <SectionSnap panels=".maverick-page > :not(style), footer" />
                <AIHero />
                <AIDomains />
                <AICapabilities />
                <AIHowItWorks />
                <AIOperations />
            </div>
        </PageWrapper>
    )
}
