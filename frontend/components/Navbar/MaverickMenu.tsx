"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

// href: null = no page yet (shown as "Coming soon", not clickable)
const menuItems: { title: string; subtitle: string; href: string | null }[] = [
    { title: "AI-Pilot", subtitle: "Advanced operation design", href: "/ai-pilot" },
    { title: "Cortex", subtitle: "Real-time mission control", href: "/cortex" },
    { title: "Mesh", subtitle: "Post-mission intelligence", href: "/mesh" },
    { title: "Integration", subtitle: "Coming soon", href: null },
]

// 2x2 grid borders: right edge on the left column, bottom edge on the top row
const borderFor = (index: number) =>
    ["md:border-r border-b", "border-b", "md:border-r border-b md:border-b-0", ""][index] + " border-gray-200"

interface MaverickMenuProps {
    onClose: () => void;
}

export const MaverickMenu: React.FC<MaverickMenuProps> = ({ onClose }) => {
    return (
        <div className="flex flex-col xl:flex-row w-full h-full xl:h-[50vh] bg-white text-black overflow-hidden relative shadow-2xl">
            {/* Left Side - Black Panel */}
            <div className="w-full xl:w-1/3 bg-black text-white p-6 lg:p-12 flex flex-col justify-center relative overflow-hidden z-10 shadow-lg shrink-0">
                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white/10" />
                <div className="absolute right-0 top-0 h-full w-1 bg-white/10" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#5ce1e6]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10"
                >
                    {/* Mobile Header: Back Button + Centered Title */}
                    <div className="xl:hidden flex items-center justify-center relative w-full mb-6">
                        <button
                            onClick={onClose}
                            className="absolute left-0 text-white hover:text-[#5ce1e6] text-[10px] font-orbit flex items-center gap-1 tracking-widest uppercase py-2"
                        >
                            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                            BACK
                        </button>
                        <h2 className="text-xl font-bold tracking-tighter font-orbit text-center">MAVERICK</h2>
                    </div>

                    {/* Desktop Title */}
                    <h2 className="hidden xl:block text-5xl font-bold mb-4 tracking-tighter leading-none font-orbit">MAVERICK</h2>
                    <h3 className="text-[9px] lg:text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2 lg:mb-4 font-mono pl-1">Mission Control Systems</h3>

                    <p className="text-gray-400 leading-relaxed max-w-md mb-2 lg:mb-8 text-xs lg:text-sm font-light border-l-2 border-[#5ce1e6]/30 pl-4 lg:pl-6 font-orbit">
                        Comprehensive mission planning and execution systems for complex autonomous operations.
                    </p>

                </motion.div>
            </div>

            {/* Right Side - Grid */}
            <div className="w-full xl:w-2/3 bg-white grid grid-cols-1 md:grid-cols-2 xl:grid-rows-2 flex-1">
                {menuItems.map((item, index) => {
                    const content = (
                        <div className="relative z-10 w-full">
                            <h4 className={`text-xl lg:text-3xl font-light mb-1 font-orbit ${item.href ? "group-hover:text-[#5ce1e6] transition-colors duration-300" : "text-gray-400"}`}>{item.title}</h4>
                            <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-mono group-hover:text-black transition-colors delay-75">{item.subtitle}</p>
                        </div>
                    )
                    const tileClass = `relative bg-gray-100 p-6 lg:p-8 flex flex-col justify-center overflow-hidden ${borderFor(index)}`

                    if (!item.href) {
                        return <div key={item.title} className={`${tileClass} cursor-default`}>{content}</div>
                    }
                    return (
                        <Link
                            key={item.title}
                            href={item.href}
                            onClick={onClose}
                            className={`${tileClass} hover:bg-white group hover:z-20 transition-all duration-500 ease-out`}
                        >
                            <div className="absolute inset-0 bg-[#5ce1e6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            {content}
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
