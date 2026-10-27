"use client"

import React from "react"
// PREVIOUS UI: import { ArrowRight } from "lucide-react"
import TextReveal from "@/components/TextReveal"

export default function AIOperations() {
    return (
        /* PREVIOUS UI: section className="min-h-screen flex flex-col items-center justify-center text-center bg-white px-6 uw:px-16 font-orbit" */
        <section className="min-h-[100svh] flex flex-col items-center justify-center text-center bg-white px-5 sm:px-6 uw:px-16 py-24 font-orbit">
            {/* PREVIOUS UI: <h2 className="text-6xl xs:text-7xl sm:text-4xl md:text-5xl lg:text-9xl uw:text-[12rem] font-black sm:font-bold tracking-tight sm:tracking-tighter text-black uppercase leading-[1.05] sm:leading-[0.9]">
                <span className="block sm:inline">THE FUTURE</span>{" "}
                <span className="block sm:inline">OF FLIGHT HAS</span>{" "}
                <br className="hidden sm:block" />
                <span className="text-[#5ce1e6] block sm:inline">NO COCKPIT.</span>
            </h2> */}
            {/* PREVIOUS UI: <TextReveal lines={[{ text: "THE FUTURE OF FLIGHT" }, { text: "HAS" }, { text: "NO COCKPIT.", color: "#5ce1e6" }]} ... /> */}
            <h2 className="w-full max-w-[1800px] text-[clamp(32px,10vw,72px)] md:text-[clamp(28px,5.5vw,112px)] font-bold tracking-tighter text-black uppercase leading-[1.1] [text-wrap:balance]">
                <span className="block"><span className="block md:inline">THE FUTURE</span><span className="hidden md:inline"> </span><span className="block md:inline">OF FLIGHT</span></span>
                <span className="block">HAS</span>
                <TextReveal
                    lines={[{ text: "NO COCKPIT.", color: "#5ce1e6" }]}
                    lineClassName="block"
                    stagger={0.04}
                    glowColor="#5ce1e6"
                />
            </h2>
        </section>
    )
}
