"use client"

import React from "react"
import { motion } from "framer-motion"
import { Cpu, Shield, Zap, Target } from "lucide-react"

export default function AICapabilities() {
    const characteristics = [
        {
            title: "1. Modularity",
            desc: "Transforms any next-generation or legacy platform—from UAVs and ground vehicles to fighter aircraft, into a fully autonomous asset capable of navigating evolving threats."
        },
        {
            title: "2. interoperability",
            desc: "Seamlessly integrates across disparate systems and coalition networks to ensure unified mission coordination and real-time data synchronization in contested environments."
        },
        {
            title: "3. Multi-Domain",
            desc: "Delivers consistent, high-performance tactical intelligence across air, land, sea, and sub-surface platforms to maintain persistent operational dominance in any theater of war."
        },
        {
            title: "4. Open Architecture",
            desc: "Built on a non-proprietary framework that enables rapid software deployment, third-party integration, and immediate scaling to meet emerging battlefield requirements."
        }
    ]

    return (
        /* PREVIOUS UI: section className="bg-[#dcdcdc] pt-16 pb-20 lg:pb-32 px-6 lg:px-20 3xl:px-[106px] uw:px-24 overflow-hidden font-orbit" */
        <section className="bg-[#dcdcdc] pt-10 sm:pt-16 pb-12 sm:pb-20 lg:pb-32 px-5 sm:px-6 lg:px-20 3xl:px-[106px] uw:px-24 overflow-hidden font-orbit">
            <div className="max-w-[1600px] mx-auto 3xl:ml-0 3xl:max-w-full">
                {/* Massive Title */}
                {/* PREVIOUS UI: div className="flex flex-col items-center justify-center text-center min-h-[70vh] mb-32 md:mb-60" */}
                <div className="flex flex-col items-center justify-center text-center min-h-[35vh] sm:min-h-[70vh] mb-12 sm:mb-32 md:mb-60">
                    {/* PREVIOUS UI: motion.h2 className="text-[12vw] lg:text-[9vw]... whitespace-nowrap" */}
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-2xl sm:text-4xl md:text-[12vw] lg:text-[9vw] font-bold text-black leading-[1.1] sm:leading-[1.0] uppercase tracking-normal font-orbit sm:whitespace-nowrap"
                    >
                        {/* What it <br /> provides */}
                        tactical Autonomy<br />At The edge
                    </motion.h2>
                </div>

                {/* Characteristics Label */}
                {/* <div className="mb-10">
                    <span className="text-black text-6xl lg:text-4xl uw:text-5xl font-bold tracking-tight font-orbit">
                        Characteristics
                    </span>
                </div> */}

                {/* Simple & Unique Technical Row */}
                <div className="relative border-t border-black pt-6 sm:pt-8 pb-8 sm:pb-12">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 sm:gap-y-12">
                        {characteristics.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                className={`group px-0 lg:px-4 xl:px-8 ${i === 0 ? '3xl:pl-0' : ''} flex flex-col items-start h-full w-full py-6 sm:py-16 md:py-24 lg:py-32 uw:py-24 ${i !== characteristics.length - 1 ? 'lg:border-r lg:border-black/30' : ''
                                    }`}
                            >
                                {/* Item Header */}
                                <div className="min-h-0 sm:min-h-[3.5rem] lg:min-h-[4rem] uw:min-h-[6rem] mb-2 flex items-start">
                                    <h3 className="text-lg sm:text-2xl lg:text-xl xl:text-2xl 2xl:text-xl 3xl:text-2xl uw:text-3xl font-bold text-black uppercase tracking-tight sm:whitespace-nowrap group-hover:translate-x-2 transition-transform duration-500">
                                        {item.title.split('. ')[1]}
                                    </h3>
                                </div>

                                {/* Description */}
                                <p className="text-black/60 text-xs lg:text-sm xl:text-base uw:text-base leading-relaxed text-left sm:text-justify [hyphens:auto] group-hover:text-black transition-colors duration-500 mt-1">
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
