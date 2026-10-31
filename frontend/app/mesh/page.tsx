"use client"

import React from "react"
import PageWrapper from "@/components/PageWrapper"
import SectionSnap from "@/components/SectionSnap"
import MeshHero from "./components/MeshHero"
import MeshDomains from "./components/MeshDomains"
import MeshCapabilities from "./components/MeshCapabilities"
import MeshHowItWorks from "./components/MeshHowItWorks"
import MeshOperations from "./components/MeshOperations"
import MaverickShip from "../maverick/components/MaverickShip"

export default function MeshPage() {
    return (
        <PageWrapper hasHero={true}>
            <div className="maverick-page min-h-screen bg-black text-white font-orbit overflow-hidden">
                <SectionSnap panels=".maverick-page > :not(style), footer" />
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
