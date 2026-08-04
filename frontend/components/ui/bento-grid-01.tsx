"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lock, Smartphone, Globe, Anchor, Wind, Battery, Package, Target, Minimize2, CloudRain, Clock } from "lucide-react"

// Custom visual components for STORM features

function PrecisionVisual() {
    const [active, setActive] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => !prev)
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex items-center justify-center h-full relative">
            <motion.div
                className="w-24 h-24 border-2 border-dashed border-[#60a5fa]/30 rounded-full flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute"
                animate={{ scale: active ? 1.2 : 1, opacity: active ? 1 : 0.6 }}
            >
                <Anchor className="w-12 h-12 text-[#60a5fa]" />
            </motion.div>
            <motion.div
                className="absolute top-0 w-1 h-24 bg-gradient-to-b from-transparent via-[#60a5fa] to-transparent"
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
        </div>
    )
}

function PayloadAnimation() {
    const [items, setItems] = useState([1, 2, 3])

    useEffect(() => {
        const interval = setInterval(() => {
            setItems((prev) => (prev.length === 3 ? [1] : [1, 2, 3]))
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="h-full flex items-center justify-center">
            <div className="grid grid-cols-3 gap-3 w-full max-w-[180px]">
                <AnimatePresence>
                    {items.map((i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="bg-[#60a5fa]/10 rounded-md h-14 w-full flex items-center justify-center border border-[#60a5fa]/20"
                            layout
                        >
                            <Package className="w-6 h-6 text-[#60a5fa]" />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}

function EnduranceIndicator() {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-2">
            <div className="relative w-20 h-20 flex items-center justify-center">
                <motion.div
                    className="absolute inset-0 border-2 border-[#60a5fa]/20 rounded-full"
                />
                <motion.div
                    className="absolute inset-0 border-2 border-[#60a5fa] rounded-full"
                    style={{ clipPath: 'polygon(50% 0%, 50% 50%, 100% 50%, 100% 100%, 0% 100%, 0% 0%)' }}
                    animate={{
                        clipPath: [
                            'polygon(50% 0%, 50% 50%, 100% 50%, 100% 100%, 0% 100%, 0% 0%)',
                            'polygon(50% 0%, 50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)',
                            'polygon(50% 0%, 50% 50%, 100% 50%, 100% 100%, 0% 100%, 0% 0%)'
                        ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <Clock className="w-7 h-7 text-[#60a5fa]" />
            </div>
            <span className="text-[10px] text-gray-400 font-orbit font-medium">30+ MINS</span>
        </div>
    )
}

function WeatherResilienceVisual() {
    return (
        <div className="flex items-center justify-center h-full gap-6">
            <motion.div
                animate={{
                    x: [-3, 3, -3],
                    y: [-1, 1, -1]
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
            >
                <CloudRain className="w-10 h-10 text-[#60a5fa]" />
            </motion.div>
            <div className="h-12 w-[1px] bg-white/10" />
            <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                <Wind className="w-10 h-10 text-white/50" />
            </motion.div>
        </div>
    )
}

function ReachVisual() {
    const [pulses] = useState([0, 1, 2])

    return (
        <div className="flex items-center justify-center h-full relative">
            <Globe className="w-14 h-14 text-[#60a5fa]/70 z-10" />
            {pulses.map((pulse) => (
                <motion.div
                    key={pulse}
                    className="absolute w-14 h-14 border border-[#60a5fa]/20 rounded-full"
                    initial={{ scale: 0.5, opacity: 1 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: pulse * 1,
                        ease: "easeOut"
                    }}
                />
            ))}
        </div>
    )
}
// dehd
export default function BentoFeatures() {
    return (
        <section className="bg-black w-full py-8 min-h-screen">
            <div className="max-w-7xl w-full px-4 md:px-20 mb-8 md:mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-7xl font-medium tracking-tight text-white leading-tight mb-4" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>
                        Key Features
                    </h2>

                </motion.div>
            </div>

            <div className="max-w-7xl w-full mx-auto px-4 md:px-20">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">

                    {/* 1. Precision Deck Landings - Tall (2x2) */}
                    <motion.div
                        className="col-span-2 row-span-2 md:col-span-2 md:row-span-2 md:col-start-1 md:row-start-1 bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:border-[#60a5fa]/40 transition-all cursor-pointer overflow-hidden group"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5, backgroundColor: "rgba(24, 24, 27, 0.6)" }}
                    >
                        <div className="flex-1">
                            <PrecisionVisual />
                        </div>
                        <div className="mt-4 transition-transform group-hover:translate-x-1 duration-300">
                            <h3 className="text-lg md:text-2xl text-white font-medium group-hover:text-[#60a5fa] transition-colors" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>Precision Deck Landings</h3>
                            <p className="text-[10px] md:text-base text-neutral-600 mt-2 leading-relaxed font-light font-sans">Purpose-built for maritime operations, it lands on decks in motion — bringing secure delivery and recovery.</p>
                        </div>
                    </motion.div>

                    {/* 2. Multi Payload Drop - Standard (2x1) */}
                    <motion.div
                        className="col-span-1 md:col-span-2 md:col-start-3 md:row-start-1 bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-center md:items-center gap-2 md:gap-4 hover:border-[#60a5fa]/40 transition-all cursor-pointer overflow-hidden group"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        whileHover={{ y: -5, backgroundColor: "rgba(24, 24, 27, 0.6)" }}
                    >
                        <div className="flex-1 transition-transform group-hover:translate-x-1 duration-300 text-center md:text-left">
                            <h3 className="text-sm md:text-lg text-white font-medium group-hover:text-[#60a5fa] transition-colors" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>Multi Payload Drop</h3>
                            <p className="text-[10px] text-neutral-600 mt-1 leading-relaxed font-light font-sans hidden md:block">Dynamic delivery with speed and precision.</p>
                        </div>
                        <div className="flex-shrink-0">
                            <PayloadAnimation />
                        </div>
                    </motion.div>

                    {/* 4. Endurance Indicator - Standard (2x1) */}
                    <motion.div
                        className="col-span-1 md:col-span-2 md:col-start-3 md:row-start-2 bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-center md:items-center gap-2 md:gap-4 hover:border-[#60a5fa]/40 transition-all cursor-pointer overflow-hidden group"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ y: -5, backgroundColor: "rgba(24, 24, 27, 0.6)" }}
                    >
                        <div className="flex-1 transition-transform group-hover:translate-x-1 duration-300 text-center md:text-left">
                            <h3 className="text-sm md:text-lg text-white font-medium group-hover:text-[#60a5fa] transition-colors" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>Endurance</h3>
                            <p className="text-[10px] text-neutral-600 mt-1 leading-relaxed font-light font-sans hidden md:block">Stay airborne longer with optimized power.</p>
                        </div>
                        <div className="flex-shrink-0">
                            <EnduranceIndicator />
                        </div>
                    </motion.div>

                    {/* 3. Reach & Resilience - Tall (2x2) */}
                    <motion.div
                        className="col-span-2 md:col-span-2 row-span-1 md:row-span-2 md:col-start-5 md:row-start-1 bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6 md:p-8 flex flex-row md:flex-col justify-between items-center md:items-start hover:border-[#60a5fa]/40 transition-all cursor-pointer overflow-hidden group"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ y: -5, backgroundColor: "rgba(24, 24, 27, 0.6)" }}
                    >
                        <div className="flex-1">
                            <ReachVisual />
                        </div>
                        <div className="flex-1 transition-transform group-hover:translate-x-1 duration-300">
                            <h3 className="text-lg md:text-2xl text-white font-medium group-hover:text-[#60a5fa] transition-colors mb-2" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>Reach & Resilience</h3>
                            <p className="text-[10px] md:text-base text-neutral-600 leading-relaxed font-light font-sans">Built for extended operations, it stays airborne longer, covering vast areas with fewer returns.</p>
                        </div>
                    </motion.div>

                    {/* 5. Weather Resilience - Wide (3x1) */}
                    <motion.div
                        className="col-span-1 md:col-span-3 md:row-span-1 md:col-start-1 md:row-start-3 bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-center md:items-center gap-2 md:gap-6 hover:border-[#60a5fa]/40 transition-all cursor-pointer overflow-hidden group"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        whileHover={{ y: -5, backgroundColor: "rgba(24, 24, 27, 0.6)" }}
                    >
                        <div className="flex-shrink-0">
                            <WeatherResilienceVisual />
                        </div>
                        <div className="flex-1 transition-transform group-hover:translate-x-1 duration-300 text-center md:text-left">
                            <h3 className="text-lg md:text-xl text-white font-medium group-hover:text-[#60a5fa] transition-colors block md:inline" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>
                                Weather Resilience
                            </h3>
                            <span className="text-[10px] md:text-sm text-neutral-600 md:ml-2 leading-relaxed font-light font-sans block md:inline mt-2 md:mt-0">— Tested for extremes.</span>
                        </div>
                    </motion.div>

                    {/* 6. Compact Size - Wide (3x1) */}
                    <motion.div
                        className="col-span-1 md:col-span-3 md:row-span-1 md:col-start-4 md:row-start-3 bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-center md:items-center gap-2 md:gap-6 hover:border-[#60a5fa]/40 transition-all cursor-pointer overflow-hidden group"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ y: -5, backgroundColor: "rgba(24, 24, 27, 0.6)" }}
                    >
                        <div className="flex-shrink-0">
                            <Minimize2 className="w-16 h-16 text-[#60a5fa]/60 group-hover:text-[#60a5fa] transition-all duration-500" />
                        </div>
                        <div className="flex-1 transition-transform group-hover:translate-x-1 duration-300 text-center md:text-left">
                            <h3 className="text-lg md:text-xl text-white font-medium group-hover:text-[#60a5fa] transition-colors block md:inline" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>Compact Size</h3>
                            <span className="text-[10px] md:text-sm text-neutral-600 md:ml-2 leading-relaxed font-light font-sans block md:inline mt-2 md:mt-0">— Easy to deploy.</span>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
