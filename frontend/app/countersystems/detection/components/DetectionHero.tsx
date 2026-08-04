"use client"

import React from "react"
import { motion } from "framer-motion"

export default function DetectionHero() {
    return (
        <section className="relative h-screen w-full text-white overflow-hidden bg-black">
            {/* Background Image */}
            <div
                className="absolute inset-0 w-full h-full"
            >
                <img
                    src="/images/Counter-systems/Detection/detection.png"
                    alt="Detection System Hero"
                    className="w-full h-full object-cover"
                />
                {/* Subtle Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative z-20 h-full w-full flex flex-col justify-end px-6 md:px-12 lg:px-24 pb-12 md:pb-24">
                <div className="w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-12">

                    {/* Left Side: Title and Tagline */}
                    <motion.div
                        className="flex flex-col gap-2 w-full md:w-auto"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="text-[10px] md:text-sm font-mono tracking-[0.2em] text-white/80 uppercase">
                            [INTELLIGENT THREAT AWARENESS]
                        </span>
                        <h1
                            className="text-5xl md:text-8xl lg:text-[7.5rem] font-medium leading-[0.9] md:leading-[0.85] tracking-tighter md:tracking-tight uppercase break-words md:break-normal"
                            style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}
                        >
                            DETECTION
                        </h1>
                    </motion.div>

                    {/* Right Side: Description */}
                    <motion.div
                        className="max-w-[180px] md:max-w-xs lg:max-w-sm ml-0 md:ml-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        <p className="text-[10px] md:text-sm text-neutral-400 font-light leading-relaxed text-left md:text-right uppercase tracking-wider">
                            Advanced sensor fusion and intelligence for rapid threat detection.
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
