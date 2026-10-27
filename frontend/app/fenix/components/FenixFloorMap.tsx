"use client"

import React from "react"
import { motion } from "framer-motion"
import CharacterReveal from "@/components/CharacterReveal"

export default function FenixFloorMap(): React.JSX.Element {
    // PREVIOUS UI:
    // <section className="relative w-full min-h-screen flex items-center justify-center text-white overflow-hidden bg-black font-orbit">
    return (
        <section className="relative w-full min-h-[100svh] md:min-h-screen flex items-center justify-center text-white overflow-hidden bg-black font-orbit">
            {/* Background Video */}
            <video
        // PREVIOUS UI: src="/product/fenix/3d-mapping/Recording-2026-10-24-152408.mp4" (102.5s, 106 MB, real time).
        // Same recording speed-ramped by motion: slow map build-up 8-16x, camera moves 3x, fly-throughs 1.5x
        // (25s, 82 MB, crf 16: ~42 dB vs the original frames, visually identical).
        // PREVIOUS ramps: 3-6x / 1.5x / 1x (48s), then 5-10x / 2x / 1.25x (34s).
        src="/product/fenix/3d-mapping/floor-map-generation.mp4"
                autoPlay
                loop
                muted
                playsInline
                // PREVIOUS UI: object-cover on every screen, which cut off the top and bottom of the recording (its
                // 3D/2D View toggle) whenever the window was wider than 16:9. Desktop now shows the whole frame; the
                // recording's background is black like the section, so any side strips blend in. Phones keep cover.
                className="absolute top-0 left-0 w-full h-full object-cover md:object-contain bg-black z-0"
            >
                Your browser does not support the video tag.
            </video>

            {/* Dark Overlay for Text Readability */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />

            {/* Content */}
            {/* PREVIOUS UI:
            <div className="absolute inset-0 z-20 w-full" style={{ paddingTop: "var(--fenix-title-top)", paddingInline: "var(--fenix-title-inset)" }}>
                    <div className="flex flex-col items-start max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="w-full flex flex-col items-start text-left"
                        >
                            <h2 className="fenix-section-title leading-[1.1] font-normal tracking-tight mb-4 sm:mb-8 text-white flex flex-wrap items-center justify-start gap-x-3 text-left">
                                <CharacterReveal
                                    text="Floor Map"
                                    targetColor="#5ce1e6"
                                    glowColor="#5ce1e6"
                                    className="text-[#5ce1e6]"
                                    stagger={0.06}
                                />
                                <span>Generation</span>
                            </h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                            viewport={{ once: true }}
                            className="pb-6 sm:pb-0 w-full"
                        >
                            <p className="fenix-body text-neutral-300 md:text-neutral-600 max-w-2xl text-justify w-full">
                                Mapping for mission planning and situational awareness — creates detailed floor layouts to support navigation, coordination, and post-op analysis.
                            </p>
                        </motion.div>
                    </div>
            </div>
            */}
            <div className="absolute inset-0 z-20 w-full max-w-[120rem] 3xl:max-w-[140rem] uw:max-w-[170rem] mx-auto pointer-events-none" style={{ paddingTop: "var(--fenix-title-top)", paddingInline: "var(--fenix-title-inset)" }}>
                <div className="flex flex-col items-start max-w-4xl 3xl:max-w-5xl pointer-events-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="w-full flex flex-col items-start text-left"
                    >
                        <h2 className="fenix-section-title leading-[1.1] font-normal tracking-tight mb-4 sm:mb-6 lg:mb-8 3xl:mb-10 text-white flex flex-wrap items-center justify-start gap-x-2 sm:gap-x-3 text-left">
                            <CharacterReveal
                                text="Floor Map"
                                targetColor="#5ce1e6"
                                glowColor="#5ce1e6"
                                className="text-[#5ce1e6]"
                                stagger={0.06}
                            />
                            <span>Generation</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true }}
                        className="pb-6 sm:pb-0 w-full"
                    >
                        <p className="fenix-body text-neutral-300 md:text-neutral-400 max-w-2xl 3xl:max-w-3xl text-left sm:text-justify w-full">
                            Mapping for mission planning and situational awareness — creates detailed floor layouts to support navigation, coordination, and post-op analysis.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
