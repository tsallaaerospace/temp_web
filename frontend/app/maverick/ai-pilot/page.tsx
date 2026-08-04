"use client"

import React from "react"
import PageWrapper from "@/components/PageWrapper"
import AIHero from "./components/AIHero"
import AIDomains from "./components/AIDomains"
import AICapabilities from "./components/AICapabilities"
import AIHowItWorks from "./components/AIHowItWorks"
import AIOperations from "./components/AIOperations"

export default function AIPilotPage() {
    return (
        <PageWrapper hasHero={true}>
            <div className="min-h-screen bg-black text-white font-orbit overflow-hidden">
                <AIHero />
                <AIDomains />
                <AICapabilities />
                <AIHowItWorks />
                <AIOperations />
            </div>
        </PageWrapper>
    )
}
