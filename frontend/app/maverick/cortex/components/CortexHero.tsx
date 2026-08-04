"use client"

import React from "react"
import { motion } from "framer-motion"

export default function CortexHero() {
    return (
        <section className="relative h-screen flex flex-col items-center justify-center px-6 lg:px-20 overflow-hidden font-orbit">
            {/* Image Background */}
            <img
                src="/images/cortex/cortex-hero.png"
                alt="Cortex Hero"
                className="absolute inset-0 w-full h-full object-cover object-center z-0"
            />

            {/* Subtle bottom gradient for text readability only */}
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/70 to-transparent z-[1]" />

            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute bottom-12 left-10 lg:left-20 uw:left-24 uw:bottom-20 z-10 text-left"
            >
                <span className="text-white text-[12px] lg:text-[20px] uw:text-[28px] tracking-[0.2em] md:ml-2 uppercase mb-8 block font-medium opacity-80">
                    CORTEX
                </span>
                <h1 className="text-6xl lg:text-4xl uw:text-5xl font-bold tracking-tight text-white leading-relaxed">
                    Real-time threat intelligence
                </h1>
            </motion.div>
        </section>
    )
}
