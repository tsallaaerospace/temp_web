"use client"

import React from "react"
import { motion } from "framer-motion"

export default function AIDomains() {
    return (
        <section className="min-h-screen flex items-center px-6 lg:px-20 uw:px-40 bg-black overflow-hidden font-orbit">
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
                        src="/images/AI-Pilot/pilot.png"
                        alt="Multiple domains supported graphic"
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
                        [MAVERICK]
                    </span>
                    <h2 className="text-3xl lg:text-4xl uw:text-5xl font-light tracking-tight text-white leading-tight">
                        When GPS drops and communications fail, manual control cannot sustain the mission.
                    </h2>
                    <p className="text-white/60 text-sm lg:text-lg uw:text-2xl tracking-wide leading-relaxed max-w-xl uw:max-w-3xl text-justify">
                        AI Pilot delivers hardware - agnostic autonomy that operates without user input, GPS, or comms — ensuring mission completion. <br /><br />
                        <span className="text-white/90">Warfighters remain commanders, not controllers.</span>
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
