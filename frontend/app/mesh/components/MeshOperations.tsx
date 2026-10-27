"use client"

import React from "react"
import TextReveal from "@/components/TextReveal"

export default function MeshOperations() {
    return (
        // PREVIOUS UI: section className="min-h-screen flex flex-col items-center justify-center text-center bg-white px-6 uw:px-16 font-orbit"
        <section className="min-h-[100dvh] sm:min-h-screen flex flex-col items-center justify-center text-center bg-white px-5 sm:px-6 uw:px-16 font-orbit">
            {/* PREVIOUS UI: <h2 className="text-6xl xs:text-7xl sm:text-4xl md:text-5xl lg:text-9xl uw:text-[7.5rem] font-black sm:font-bold tracking-tight sm:tracking-tighter text-black uppercase leading-[1.05] sm:leading-[0.9]">
                <span className="block sm:inline">THE NETWORK</span>{" "}
                <span className="block sm:inline">THAT</span>{" "}
                <br className="hidden sm:block" />
                <span className="text-[#5ce1e6] block sm:inline">NEVER GOES DARK.</span>
            </h2> */}
            {/* PREVIOUS UI: <TextReveal lines={[{ text: "THE NETWORK" }, { text: "THAT" }, { text: "NEVER GOES DARK.", color: "#5ce1e6" }]} ... /> */}
            <h2 className="text-6xl xs:text-7xl sm:text-4xl md:text-5xl lg:text-9xl uw:text-[7.5rem] font-black sm:font-bold tracking-tight sm:tracking-tighter text-black uppercase leading-[1.05] sm:leading-[0.9]">
                <span className="block">THE NETWORK</span>
                <span className="block">THAT</span>
                <TextReveal
                    lines={[{ text: "NEVER GOES DARK.", color: "#5ce1e6" }]}
                    lineClassName="block"
                    stagger={0.04}
                    glowColor="#5ce1e6"
                />
            </h2>
        </section>
    )
}
