"use client"

import React from "react"
import PageWrapper from "@/components/PageWrapper"
import MeshHero from "./components/MeshHero"
import MeshDomains from "./components/MeshDomains"
import MeshCapabilities from "./components/MeshCapabilities"
import MeshHowItWorks from "./components/MeshHowItWorks"
import MeshOperations from "./components/MeshOperations"
import MaverickShip from "../components/MaverickShip"

export default function MeshPage() {
    return (
        <PageWrapper hasHero={true}>
            <div className="min-h-screen bg-black text-white font-orbit overflow-hidden">
                <MeshHero />
                <MeshDomains />
                <MaverickShip />
                <MeshCapabilities />
                <MeshHowItWorks />
                <MeshOperations />
            </div>
        </PageWrapper>
    )
}
