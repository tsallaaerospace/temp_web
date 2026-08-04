"use client"

import React from "react"
import { motion } from "framer-motion"

export default function AIHero() {
    return (
        <section className="relative h-screen flex flex-col items-center justify-center px-6 lg:px-20 overflow-hidden font-orbit">
            {/* Image Background */}
            <img
                src="/images/AI-Pilot/hero.png"
                alt="AI-Pilot Hero"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* Dark Overlay for readability */}
            <div className="absolute inset-0 bg-black/50 z-[1]" />

            {/* Background Grid Accent */}
            <div className="absolute inset-0 opacity-[0.1] pointer-events-none z-[2]"
                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute bottom-12 left-10 lg:left-20 uw:left-24 uw:bottom-20 z-10 text-left"
            >
                <span className="text-white text-[12px] lg:text-[20px] uw:text-[28px] tracking-[0.2em] md:ml-2 uppercase mb-8 block font-medium opacity-80">
                    AI-PILOT
                </span>
                <h1 className="text-6xl lg:text-4xl uw:text-5xl font-bold tracking-tight text-white leading-relaxed">
                    {/* AI-PILOT
                     */}
                    Imagine a future where the most complex landing in aviation happens without a pilot.
                </h1>
            </motion.div>
        </section>
    )
}
