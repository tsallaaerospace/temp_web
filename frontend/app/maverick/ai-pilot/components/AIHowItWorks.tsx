"use client"

import React from "react"
import { motion } from "framer-motion"

const features = [
    {
        num: "01",
        title: "Unified Perception",
        desc: "Fuses inputs from multiple sensors in real time to generate a coherent and reliable understanding of the operating environment.",
        img: "/images/AI-Pilot/hiw_perception.png"
    },
    {
        num: "02",
        title: "Autonomous Navigation",
        desc: "Continuously computes and adapts optimal mission paths based on terrain, obstacles, and mission objectives.",
        img: "/images/AI-Pilot/hiw_navigation.png"
    },
    {
        num: "03",
        title: "Coordinated Teaming",
        desc: "Enables multiple autonomous systems to collaborate dynamically, share intent, and execute missions as a synchronized unit.",
        img: "/images/AI-Pilot/hiw_teaming.png"
    },
    {
        num: "04",
        title: "Resilient Denied Ops",
        desc: "Maintains mission continuity in environments where GPS signals are unavailable and communications are degraded or lost.",
        img: "/images/AI-Pilot/hiw_resilience.png"
    }
]

export default function AIHowItWorks() {
    return (
        <section className="bg-black min-h-screen flex flex-col justify-center py-10 lg:py-12 px-6 lg:px-20 uw:px-24 font-orbit overflow-hidden">
            <div className="w-full">
                {/* Section Label */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-6 lg:mb-8"
                >
                    <h2 className="text-[120px] lg:text-[72px] uw:text-[96px] font-bold text-white tracking-tight uppercase font-orbit">HOW IT WORKS</h2>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {features.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: i * 0.1 }}
                            className="group bg-white flex flex-col overflow-hidden"
                        >
                            {/* Blender Render Image */}
                            <div className="relative overflow-hidden h-[30vh] lg:h-[45vh] 3xl:h-[48vh] uw:h-[35vh]">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Text content */}
                            <div className="p-4 lg:p-5 uw:p-4 flex flex-col gap-2 flex-1">
                                <h3 className="text-black text-sm lg:text-base uw:text-xl font-semibold tracking-tight font-orbit">
                                    {item.title}
                                </h3>
                                <p className="text-black/50 text-xs uw:text-sm leading-relaxed font-light group-hover:text-black transition-colors duration-500">
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
