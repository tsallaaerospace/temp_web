"use client"

import React from "react"
import { motion } from "framer-motion"

export default function MeshCapabilities() {
    const characteristics = [
        {
            title: "1. Self-Organizing Network",
            desc: "Automatically discovers, connects, and reconfigures nodes across the battlefield to maintain a continuous communication fabric without centralized control."
        },
        {
            title: "2. Jam-Resistant",
            desc: "Employs frequency hopping, adaptive routing, and encrypted multi-path protocols that sustain link integrity across heavily contested and electronically denied environments."
        },
        {
            title: "3. Cross-Domain Integration",
            desc: "Bridges air, land, and maritime platforms under a unified data layer, enabling synchronized operations and real-time telemetry sharing across every domain."
        },
        {
            title: "4. Low-Latency Command",
            desc: "Delivers sub-second relay of targeting data, sensor feeds, and mission orders so decision cycles remain faster than adversary response times."
        }
    ]

    return (
        <section className="bg-[#dcdcdc] pt-16 pb-20 lg:pb-32 px-6 lg:px-20 3xl:px-[106px] uw:px-24 overflow-hidden font-orbit">
            <div className="max-w-[1600px] mx-auto 3xl:ml-0 3xl:max-w-full">
                {/* Massive Title */}
                <div className="flex flex-col items-center justify-center text-center min-h-[70vh] mb-32 md:mb-60">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-[12vw] lg:text-[9vw] font-bold text-black leading-[1.0] uppercase tracking-normal font-orbit"
                    >
                        Connected At<br />every edge
                    </motion.h2>
                </div>

                {/* Characteristics Label */}
                <div className="mb-10">
                    <span className="text-black text-6xl lg:text-4xl uw:text-5xl font-bold tracking-tight font-orbit">
                        Characteristics
                    </span>
                </div>

                {/* Simple & Unique Technical Row */}
                <div className="relative border-t border-black pt-8 pb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12">
                        {characteristics.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                className={`group px-0 lg:px-4 xl:px-8 ${i === 0 ? '3xl:pl-0' : ''} flex flex-col items-start h-full w-full py-16 md:py-24 lg:py-32 uw:py-24 ${i !== characteristics.length - 1 ? 'lg:border-r lg:border-black/30' : ''}`}
                            >
                                {/* Item Header */}
                                <div className="min-h-[3.5rem] lg:min-h-[4rem] uw:min-h-[6rem] mb-2 flex items-start">
                                    <h3 className="text-xl lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl uw:text-lg font-bold text-black uppercase tracking-tight whitespace-nowrap group-hover:translate-x-2 transition-transform duration-500">
                                        {item.title.split('. ')[1]}
                                    </h3>
                                </div>

                                {/* Description */}
                                <p className="text-black/60 text-[10px] xl:text-xs uw:text-sm leading-relaxed text-justify [hyphens:auto] group-hover:text-black transition-colors duration-500 mt-1">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}
