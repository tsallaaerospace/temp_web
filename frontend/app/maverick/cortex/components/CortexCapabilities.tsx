"use client"

import React from "react"
import { motion } from "framer-motion"

export default function CortexCapabilities() {
    const characteristics = [
        {
            title: "1. Detection",
            desc: "Scan complex environments to isolate potential threats and anomalies in real time."
        },
        {
            title: "2. Recognition",
            desc: "Distinguish specific behaviors and object classes from background noise with high-fidelity precision."
        },
        {
            title: "3. Identification",
            desc: "Verify friend, foe, or neutral entities to provide the certainty required for decisive action."
        }
    ]

    return (
        <section className="bg-[#dcdcdc] pt-16 pb-20 lg:pb-32 px-6 lg:px-20 3xl:px-[106px] uw:px-24 overflow-hidden font-orbit">
            <div className="max-w-[1600px] mx-auto 3xl:ml-0 3xl:max-w-full">
                {/* PREVIOUS UI: div className="flex flex-col items-center justify-center text-center min-h-[100dvh] sm:min-h-[70vh] mb-0 sm:mb-32 md:mb-60" */}
                <div className="flex flex-col items-center justify-center text-center min-h-[100dvh] sm:min-h-[70vh] mb-0 sm:mb-32 md:mb-60 -mt-12 sm:mt-0">
                    {/* PREVIOUS UI: <motion.h2 className="... -translate-y-20">Intelligence At<br />Mission Speed</motion.h2> */}
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl xs:text-7xl sm:text-4xl md:text-[12vw] lg:text-[7vw] font-black sm:font-bold text-black leading-[1.05] sm:leading-[1.0] uppercase tracking-tight sm:tracking-normal font-orbit sm:whitespace-nowrap"
                    >
                        <span className="block sm:inline">Intelligence</span>{" "}
                        <span className="block sm:inline">At</span>
                        <br className="hidden sm:block" />
                        <span>Mission Speed</span>
                    </motion.h2>
                </div>

                {/* Characteristics Label */}
                {/* PREVIOUS UI: <div className="mb-6 sm:mb-10"><span className="...">Characteristics</span></div> */}
                {/* <div className="mb-6 sm:mb-10">
                    <span className="text-black text-3xl sm:text-5xl lg:text-4xl uw:text-5xl font-bold tracking-tight font-orbit uppercase">
                        Characteristics
                    </span>
                </div> */}

                {/* 3-Column Row */}
                {/* PREVIOUS UI: div className="relative border-t border-black pt-8 pb-12" */}
                <div className="relative border-t border-black pt-4 lg:pt-8 pb-6 lg:pb-12">
                    {/* Vertical Dividers with Gap */}
                    <div className="absolute top-8 bottom-0 left-1/3 w-[1px] bg-black/20 hidden lg:block" />
                    <div className="absolute top-8 bottom-0 left-2/3 w-[1px] bg-black/20 hidden lg:block" />

                    {/* PREVIOUS UI: div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 lg:gap-y-0" */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-8 lg:gap-y-0">
                        {characteristics.map((item, i) => (
                            /* PREVIOUS UI: className="group px-0 lg:px-12 py-10 lg:py-32 ..." */
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                className={`group px-0 lg:px-12 py-14 lg:py-32 uw:py-24 flex flex-col items-start ${i < 2 ? 'border-b lg:border-b-0 border-black/20' : ''} ${i === 0 ? '3xl:pl-0' : ''}`}
                            >

                                {/* Item Header */}
                                {/* PREVIOUS UI: h3 className="text-lg lg:text-2xl ..." */}
                                <div className="min-h-0 lg:min-h-[4rem] uw:min-h-[6rem] mb-1 flex items-start">
                                    <h3 className="text-xl lg:text-2xl 3xl:text-3xl uw:text-4xl font-bold text-black uppercase tracking-tight whitespace-nowrap group-hover:translate-x-2 transition-transform duration-500">
                                        {item.title.split('. ')[1]}
                                    </h3>
                                </div>

                                {/* Description */}
                                {/* PREVIOUS UI: p className="text-black/80 text-sm lg:text-sm ..." */}
                                <p className="text-black/85 text-base lg:text-sm uw:text-base leading-relaxed text-left lg:text-justify [hyphens:auto] group-hover:text-black transition-colors duration-500 mt-1">
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
