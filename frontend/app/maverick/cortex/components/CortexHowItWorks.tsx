"use client"

import React from "react"
import { motion } from "framer-motion"

const features = [
    {
        num: "01",
        title: "Decision Advantage",
        desc: "Transforms complex battlefield data into clear, actionable intelligence for superior command-level execution.",
        img: "/images/cortex/hiw_decision.png"
    },
    {
        num: "02",
        title: "Denied Ops",
        desc: "Maintain mission continuity and operational integrity across contested or communication-severed environments.",
        img: "/images/cortex/hiw_denied.png"
    },
    {
        num: "03",
        title: "Precision Tracking",
        desc: "Execute high-fidelity target locking and continuous monitoring to enable successful kinetic or non-kinetic interceptions.",
        img: "/images/cortex/hiw_tracking.png"
    },
    {
        num: "04",
        title: "Persistent Oversight",
        desc: "Provide 24/7 multi-domain awareness through autonomous sensors that scan, detect, and report across land, sea, and air.",
        img: "/images/cortex/hiw_oversight.png"
    }
]

export default function CortexHowItWorks() {
    return (
        <section className="bg-black min-h-screen flex flex-col justify-center py-10 lg:py-12 px-6 lg:px-20 uw:px-24 font-orbit overflow-hidden">
            <div className="w-full">
                {/* Section Label */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-6 lg:mb-8"
                >
                    <h2 className="text-[120px] lg:text-[72px] uw:text-[96px] font-bold text-white tracking-tight uppercase font-orbit">FEATURES</h2>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {features.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: i * 0.1 }}
                            className="group bg-white flex flex-col overflow-hidden"
                        >
                            {/* Image */}
                            <div className="relative overflow-hidden h-[30vh] lg:h-[45vh] 3xl:h-[48vh] uw:h-[35vh]">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                                {/* Number Overlay */}
                                <div className="absolute top-4 left-5">
                                    <span className="text-white text-3xl font-bold font-mono tracking-tight">
                                        {item.num}
                                    </span>
                                </div>
                            </div>

                            {/* Text content */}
                            <div className="p-4 lg:p-5 uw:p-4 flex flex-col gap-2 flex-1">
                                <h3 className="text-black text-sm lg:text-base uw:text-xl font-semibold tracking-tight font-orbit">
                                    {item.title}
                                </h3>
                                <p className="text-black/50 text-xs uw:text-sm leading-relaxed font-light">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
