"use client"

import React from "react"
import { motion } from "framer-motion"

const FEATURES = [
    {
        number: "01",
        title: "AI-Powered Target Detection",
        description: "Real-time object detection using onboard AI to identify vehicles, vessels, aircraft, and ground activity with high precision in complex environments.",
    },
    {
        number: "02",
        title: "Multi-Sensor Fusion",
        description: "Combines EO/IR, thermal, radar, and RF sensing to deliver reliable detection across day/night operations and in low-visibility conditions.",
    },
    {
        number: "03",
        title: "Long-Range Wide-Area Surveillance",
        description: "Covers large operational zones with automated scanning and persistent tracking of multiple moving targets simultaneously.",
    },
    {
        number: "04",
        title: "Maritime & Littoral Detection",
        description: "Optimized to detect small boats, low-profile vessels, and surface movement in cluttered sea states and coastal environments.",
    },
    {
        number: "05",
        title: "Autonomous Threat Recognition",
        description: "Onboard models classify and prioritize objects of interest, reducing operator workload and accelerating decision cycles.",
    },
    {
        number: "06",
        title: "Networked ISR Sharing",
        description: "Streams detection data, imagery, and coordinates to command systems and allied units for synchronized, real-time situational awareness.",
    },
]

export default function DetectionFeatures() {
    return (
        <section className="bg-black pt-8 pb-24 md:pt-10 md:pb-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto mb-6 px-2 md:px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-7xl font-medium tracking-tight text-white leading-tight mb-4 px-2" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>
                        Capabilities
                    </h2>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto border-r border-b border-white/10">
                <div className="grid grid-cols-2 md:grid-cols-3">
                    {FEATURES.map((feature, index) => (
                        <motion.div
                            key={feature.number}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className={`
                                relative p-4 md:p-8 min-h-[140px] md:min-h-[320px] flex flex-col gap-2 md:gap-4 group
                                border-t border-l border-white/10 hover:bg-white/[0.02] transition-colors duration-500
                            `}
                        >
                            <span className="text-[10px] md:text-xs font-mono text-neutral-600 uppercase tracking-widest group-hover:text-white/60 transition-colors duration-500">
                                {feature.number}
                            </span>

                            <div className="space-y-1 md:space-y-4">
                                <h3
                                    className="text-sm md:text-2xl text-white leading-tight font-light group-hover:text-white transition-colors duration-500"
                                    style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}
                                >
                                    {feature.title}
                                </h3>
                                <p className="text-[10px] md:text-[13px] text-neutral-500 font-light leading-relaxed max-w-full group-hover:text-neutral-400 transition-colors duration-500">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
