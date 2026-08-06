"use client"

import React from "react"
import { motion } from "framer-motion"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import CharacterReveal from "@/components/CharacterReveal"

export default function FenixPtoP(): React.JSX.Element {
    // PREVIOUS UI: <section className="w-full bg-white text-black py-12 md:py-24 overflow-hidden">
    return (
        <section className="w-full overflow-hidden bg-white py-8 text-black sm:py-12 md:py-24 font-orbit">
            <div className="flex flex-col overflow-hidden">
                <ContainerScroll
                    showFrame={false}
                    maxWidth="max-w-4xl"
                    mobileOptimized
                    contentClassName="pt-20 pb-6 sm:pt-40 sm:pb-10 md:py-40"
                    cardClassName="-mt-4 sm:-mt-12"
                    /* PREVIOUS UI: heightClassName="h-[50rem] md:h-[60rem]" */
                    /* PREVIOUS MOBILE UI: min-h-[42rem] */
                    /* PREVIOUS MOBILE UI: min-h-[45rem] */
                    heightClassName="h-auto min-h-[48rem] sm:h-[50rem] sm:min-h-0 md:h-[60rem]"
                    titleComponent={
                        /* PREVIOUS UI: <div className="max-w-4xl mx-auto pb-8"> */
                        <div className="mx-auto w-full max-w-4xl px-3 pb-4 sm:px-0 sm:pb-8">
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                viewport={{ once: true }}
                                /* PREVIOUS UI: className="text-5xl md:text-6xl lg:text-8xl font-medium tracking-tight mb-8 leading-tight text-center" */
                                /* PREVIOUS UI: style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }} */
                                className="mb-4 max-w-full text-center text-[clamp(2rem,11vw,3rem)] font-medium leading-[1.08] tracking-tight sm:mb-8 sm:text-5xl sm:leading-tight md:text-6xl lg:text-8xl"
                            >
                                Autonomous <br />
                                {/* PREVIOUS UI: <CharacterReveal text="Point-to-Point" targetColor="#5ce1e6" glowColor="#5ce1e6" className="text-[#5ce1e6] whitespace-nowrap" stagger={0.06} /> */}
                                <CharacterReveal
                                    text="Point-to-Point"
                                    targetColor="#5ce1e6"
                                    glowColor="#5ce1e6"
                                    flickerColor="#000000"
                                    className="text-[#5ce1e6] whitespace-nowrap"
                                    stagger={0.06}
                                /> <br />
                                Navigation
                            </motion.h2>
                            {/* PREVIOUS UI: className="mx-auto max-w-sm px-2 text-center text-sm font-light leading-6 text-neutral-600 sm:max-w-2xl sm:px-4 sm:text-lg sm:leading-relaxed md:text-xl" */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                viewport={{ once: true }}
                                className="mx-auto max-w-sm px-2 text-justify text-sm font-light leading-6 text-neutral-600 sm:max-w-2xl sm:px-4 sm:text-lg sm:leading-relaxed md:text-xl"
                            >
                                Self-directed movement between mission-critical waypoints &mdash; adapts to dynamic environments with precision routing and obstacle avoidance.
                            </motion.p>
                        </div>
                    }
                >
                    {/* PREVIOUS UI: <div className="relative w-full h-[25rem] md:h-[35rem] mx-auto overflow-hidden rounded-2xl"> */}
                    <div className="relative mx-auto aspect-[1360/1504] h-auto w-[min(100%,22.5rem)] overflow-hidden rounded-xl sm:aspect-auto sm:h-[25rem] sm:w-full sm:rounded-2xl md:h-[35rem]">
                        <video
                            src="/images/Fenix/ptop.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            className="h-full w-full object-cover object-center"
                        >
                            Your browser does not support the video tag.
                        </video>
                        {/* Dramatic inner glow/shadow */}
                        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.3)] pointer-events-none" />
                    </div>
                </ContainerScroll>
            </div>
        </section>
    )
}
