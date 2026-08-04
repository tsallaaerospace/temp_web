"use client"

import React from "react"
import { motion } from "framer-motion"
import { Globe, Cpu, Zap } from "lucide-react"

const DOMAINS = [
    {
        title: "Global Connectivity",
        description: "Our detection architecture is built for scale. Through encrypted satellite and mesh networks, sensor data is distributed globally, ensuring that localized detection becomes enterprise-wide intelligence.",
        icon: <Globe className="w-8 h-8" />,
        delay: 0.1
    },
    {
        title: "Edge Computing Power",
        description: "Processing shouldn't happen in the cloud when every millisecond counts. Our systems utilize heavy-lift edge processors to run complex computer vision models locally on the sensor hardware.",
        icon: <Cpu className="w-8 h-8" />,
        delay: 0.2
    },
    {
        title: "Instant Response",
        description: "Detection is only as useful as the action it enables. Our software layer integrates directly with interceptor systems and tactical displays to provide a unified response window to operators.",
        icon: <Zap className="w-8 h-8" />,
        delay: 0.3
    }
]

export default function DetectionOperational() {
    return (
        <section className="bg-white py-24 md:py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

                    {/* Left Side: Editorial Heading */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2"
                    >
                        <span className="text-[#5ce1e6] font-mono text-sm tracking-widest uppercase mb-4 block font-semibold">
                            Operational Backbone
                        </span>
                        <h2
                            className="text-5xl md:text-6xl lg:text-7xl text-black leading-[1.1] tracking-tight mb-8"
                            style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}
                        >
                            Detection without <br />
                            <span className="text-neutral-400">Compromise.</span>
                        </h2>
                        <p className="text-xl text-neutral-600 font-light leading-relaxed max-w-xl">
                            In high-stakes environments, the difference between success and failure is the quality of your awareness. We provide a passive, unjammable intelligence layer that fundamentally changes how you perceive the battlespace.
                        </p>
                    </motion.div>

                    {/* Right Side: Feature List */}
                    <div className="w-full lg:w-1/2 space-y-12">
                        {DOMAINS.map((domain, index) => (
                            <motion.div
                                key={domain.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: domain.delay }}
                                className="flex gap-8 group"
                            >
                                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-neutral-50 flex items-center justify-center text-[#5ce1e6] group-hover:bg-[#5ce1e6] group-hover:text-black transition-all duration-500 shadow-sm border border-neutral-100">
                                    {domain.icon}
                                </div>
                                <div className="space-y-3">
                                    <h3
                                        className="text-2xl text-black font-medium"
                                        style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}
                                    >
                                        {domain.title}
                                    </h3>
                                    <p className="text-neutral-500 font-light leading-relaxed">
                                        {domain.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Subtle Design Element */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-neutral-50/50 -skew-x-12 translate-x-1/2 pointer-events-none" />
        </section>
    )
}
