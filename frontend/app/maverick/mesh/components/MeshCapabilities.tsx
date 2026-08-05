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
                {/* PREVIOUS UI: div className="flex flex-col items-center justify-start pt-28 sm:pt-0 sm:justify-center text-center..." */}
                <div className="flex flex-col items-center justify-center text-center min-h-[100dvh] sm:min-h-[70vh] mb-0 sm:mb-32 md:mb-60 -mt-12 sm:mt-0">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl xs:text-7xl sm:text-4xl md:text-[12vw] lg:text-[9vw] font-black sm:font-bold text-black leading-[1.05] sm:leading-[1.0] uppercase tracking-tight sm:tracking-normal font-orbit sm:whitespace-nowrap"
                    >
                        <span className="block sm:inline">Connected</span>{" "}
                        <span className="block sm:inline">At</span>
                        <br className="hidden sm:block" />
                        <span>every edge</span>
                    </motion.h2>
                </div>

                {/* Characteristics Label */}
                {/* PREVIOUS UI: <div className="mb-6 sm:mb-10"><span className="...">Characteristics</span></div> */}
                {/* <div className="mb-6 sm:mb-10">
                    <span className="text-black text-3xl sm:text-5xl lg:text-4xl uw:text-5xl font-bold tracking-tight font-orbit uppercase">
                        Characteristics
                    </span>
                </div> */}

                {/* Simple & Unique Technical Row */}
                {/* PREVIOUS UI: div className="relative border-t border-black pt-8 pb-12" */}
                <div className="relative border-t border-black pt-4 sm:pt-8 pb-6 sm:pb-12">
                    {/* PREVIOUS UI: div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12" */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-3 sm:gap-y-12">
                        {characteristics.map((item, i) => (
                            /* PREVIOUS UI: className="group px-0 lg:px-4 xl:px-8 ... py-10 sm:py-16 ..." */
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                className={`group px-0 lg:px-4 xl:px-8 ${i === 0 ? '3xl:pl-0' : ''} flex flex-col items-start h-full w-full py-6 sm:py-16 md:py-24 lg:py-32 uw:py-24 ${i !== characteristics.length - 1 ? 'border-b md:border-b-0 border-black/20 lg:border-r lg:border-black/30' : ''}`}
                            >
                                {/* Item Header */}
                                {/* PREVIOUS UI: h3 className="text-lg sm:text-xl ..." */}
                                <div className="min-h-0 sm:min-h-[3.5rem] lg:min-h-[4rem] uw:min-h-[6rem] mb-1 flex items-start">
                                    <h3 className="text-xl sm:text-xl lg:text-base xl:text-lg 2xl:text-lg 3xl:text-xl uw:text-lg font-bold text-black uppercase tracking-tight sm:whitespace-nowrap group-hover:translate-x-2 transition-transform duration-500">
                                        {item.title.split('. ')[1]}
                                    </h3>
                                </div>

                                {/* Description */}
                                {/* PREVIOUS UI: p className="text-black/85 text-base sm:text-[10px] ..." */}
                                <p className="text-black/80 text-sm sm:text-[10px] xl:text-xs uw:text-sm leading-relaxed text-left sm:text-justify [hyphens:auto] group-hover:text-black transition-colors duration-500 mt-1">
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
