"use client"

import React from "react"
import { motion } from "framer-motion"
import TextReveal from "@/components/TextReveal"

const features = [
    {
        num: "01",
        title: "Dynamic Routing",
        desc: "Autonomously re-routes traffic through the best available node path when links degrade or fail, keeping data flowing without human intervention.",
        img: "/images/AI-Pilot/hiw_perception.png"
    },
    {
        num: "02",
        title: "Secure Relay",
        desc: "End-to-end encrypted communications ensure mission-critical data cannot be intercepted, spoofed, or exploited across the tactical network.",
        img: "/images/AI-Pilot/hiw_navigation.png"
    },
    {
        num: "03",
        title: "Swarm Sync",
        desc: "Coordinates simultaneous tasking and shared situational awareness across entire swarms, enabling synchronized multi-platform engagement.",
        img: "/images/AI-Pilot/hiw_teaming.png"
    },
    {
        num: "04",
        title: "Resilient Denied Ops",
        desc: "Sustains connectivity and command authority in GPS-denied, comms-degraded, and fully contested electromagnetic environments.",
        img: "/images/AI-Pilot/hiw_resilience.png"
    }
]

export default function MeshHowItWorks() {
    return (
        // PREVIOUS UI: section className="bg-black min-h-screen flex flex-col justify-center py-10 lg:py-12 px-6 lg:px-20 uw:px-24 font-orbit overflow-hidden"
        <section className="bg-black min-h-[100dvh] sm:min-h-screen flex flex-col justify-center py-12 sm:py-10 lg:py-12 px-5 sm:px-6 lg:px-20 uw:px-24 font-orbit overflow-hidden">
            <div className="w-full">
                {/* Section Label */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-6 lg:mb-8"
                >
                    {/* PREVIOUS UI: <h2 className="text-3xl sm:text-5xl md:text-[72px] lg:text-[72px] uw:text-[96px] font-bold text-white tracking-tight uppercase font-orbit">HOW IT WORKS</h2> */}
                    <h2 className="text-3xl sm:text-5xl md:text-[72px] lg:text-[72px] uw:text-[96px] font-bold text-white tracking-tight uppercase font-orbit">
                        <TextReveal
                            lines={[{ text: "HOW IT WORKS", color: "#ffffff" }]}
                            lineClassName="inline"
                            stagger={0.04}
                            glowColor="#5ce1e6"
                        />
                    </h2>
                </motion.div>

                {/* Cards Grid */}
                {/* PREVIOUS UI: div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3" */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-3">
                    {features.map((item, i) => (
                        /* PREVIOUS UI: className="group bg-white flex flex-col overflow-hidden" */
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: i * 0.1 }}
                            className="group bg-white flex flex-col overflow-hidden border border-white/30 sm:border-none"
                        >
                            {/* Image */}
                            {/* PREVIOUS UI: div className="relative overflow-hidden h-[30vh] lg:h-[45vh]..." */}
                            <div className="relative overflow-hidden h-[32vh] sm:h-[30vh] lg:h-[45vh] 3xl:h-[48vh] uw:h-[35vh]">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                                {/* Number Overlay */}
                                <div className="absolute top-4 left-5">
                                    <span className="text-white text-3xl font-bold font-mono tracking-tight">
                                        {item.num}
                                    </span>
                                </div>
                            </div>

                            {/* Text content */}
                            {/* PREVIOUS UI: div className="p-4 lg:p-5 uw:p-4 flex flex-col gap-2 flex-1" */}
                            <div className="p-5 sm:p-4 lg:p-5 uw:p-4 flex flex-col gap-2 flex-1">
                                <h3 className="text-black text-sm lg:text-base uw:text-xl font-semibold tracking-tight font-orbit">
                                    {item.title}
                                </h3>
                                <p className="text-black/50 text-xs uw:text-sm leading-relaxed font-light">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
