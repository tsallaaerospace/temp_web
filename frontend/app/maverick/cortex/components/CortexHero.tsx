"use client"

import React from "react"
import { motion } from "framer-motion"
import TextReveal from "@/components/TextReveal"

export default function CortexHero() {
    return (
        // PREVIOUS UI: section className="relative h-screen flex flex-col items-center justify-center px-6 lg:px-20 overflow-hidden font-orbit"
        <section className="relative h-[100dvh] sm:h-screen flex flex-col items-center justify-center px-5 sm:px-6 lg:px-20 overflow-hidden font-orbit">
            {/* Image Background */}
            <img
                src="/images/cortex/cortex-hero.png"
                alt="Cortex Hero"
                className="absolute inset-0 w-full h-full object-cover object-center z-0"
            />

            {/* Subtle bottom gradient for text readability only */}
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/70 to-transparent z-[1]" />

            {/* PREVIOUS UI: className="absolute bottom-12 left-10 lg:left-20 uw:left-24 uw:bottom-20 z-10 text-left" */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute top-40 sm:top-auto bottom-auto sm:bottom-12 left-5 sm:left-10 lg:left-20 uw:left-24 uw:bottom-20 z-10 text-left"
            >
                <span className="text-white text-[12px] lg:text-[20px] uw:text-[28px] tracking-[0.2em] md:ml-2 uppercase mb-4 sm:mb-8 block font-medium opacity-80">
                    CORTEX
                </span>
                {/* PREVIOUS UI: <h1 className="text-2xl sm:text-4xl lg:text-4xl uw:text-5xl font-bold tracking-tight text-white leading-snug sm:leading-relaxed">Real-time threat intelligence</h1> */}
                <h1 className="text-2xl sm:text-4xl lg:text-4xl uw:text-5xl font-bold tracking-tight text-white leading-snug sm:leading-relaxed">
                    <TextReveal
                        lines={[
                            { text: "Real-time threat intelligence", color: "#ffffff" }
                        ]}
                        lineClassName="inline"
                        stagger={0.02}
                        delay={0.6}
                        glowColor="#5ce1e6"
                    />
                </h1>
            </motion.div>
        </section>
    )
}
