"use client"

import React from "react"
import ContentWrapper from "@/components/ContentWrapper"
import { motion } from "framer-motion"

export default function MeshDomains() {
    return (
        <section className="bg-white text-black h-screen flex items-center font-orbit overflow-hidden relative">
            <ContentWrapper className="w-full h-full flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 w-full h-full items-center">

                    {/* Left — Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="flex flex-col justify-center gap-8 lg:gap-10 pr-0 lg:pr-8"
                    >
                        <h2
                            className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl uw:text-5xl font-medium tracking-wide leading-tight"
                        >
                            When central command is severed, isolated systems become liabilities.
                        </h2>
                        <div className="flex flex-col gap-5 max-w-lg">
                            <p className="text-xs md:text-sm uw:text-base font-light leading-[1.9] text-neutral-500 text-justify">
                                Mesh delivers a self-organizing, resilient communications backbone that keeps multi-domain assets synchronized — even when the network is jammed, denied, or destroyed.
                            </p>
                            <p className="text-xs md:text-sm uw:text-base font-semibold leading-[1.9] text-neutral-900 tracking-wide text-justify">
                                The mission continues. Every node fights as one.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right — Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
                        className="relative w-full h-[50vh] lg:h-[70vh] overflow-hidden"
                    >
                        <img
                            src="/images/mesh/mesh-network-v2.png"
                            alt="Resilient Mesh Battlefield Network"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                </div>
            </ContentWrapper>
        </section>
    )
}