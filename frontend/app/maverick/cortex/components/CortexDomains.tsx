"use client"

import React from "react"
import { motion } from "framer-motion"

export default function CortexDomains() {
    return (
        <section className="min-h-screen flex items-center px-6 lg:px-20 uw:px-24 bg-black overflow-hidden font-orbit">
            <div className="w-full max-w-7xl uw:max-w-[110rem] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-24 py-24 lg:py-0">
                {/* Left Side - Image */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="relative w-full max-w-md mx-auto flex items-center justify-center order-2 lg:order-1"
                >
                    <img
                        src="/images/cortex/cortex-domains.png"
                        alt="Cortex mission control graphic"
                        className="w-full max-h-[70vh] object-contain opacity-80 hover:opacity-100 transition-opacity duration-700"
                    />
                </motion.div>

                {/* Right Side - Content */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col gap-6 order-1 lg:order-2"
                >
                    <span className="text-white/40 text-[10px] lg:text-[12px] tracking-[0.3em] font-mono">
                        [CORTEX]
                    </span>
                    <h2 className="text-3xl lg:text-4xl uw:text-5xl font-light tracking-tight text-white leading-tight">
                        When conditions shift mid-mission, delayed decisions become fatal outcomes.
                    </h2>
                    <p className="text-white/60 text-sm lg:text-lg uw:text-lg tracking-wide leading-relaxed max-w-xl uw:max-w-3xl text-justify">
                        Cortex delivers high-fidelity situational awareness by transforming raw sensor data into actionable intelligence at the tactical edge. This autonomous engine eliminates cognitive load to provide a decisive command advantage, ensuring mission success in the most contested environments where
                        <span className="block text-white mt-4 font-semibold">Data overwhelms warfighters before threats do.</span>
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
