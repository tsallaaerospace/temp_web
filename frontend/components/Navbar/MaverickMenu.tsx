"use client"
// PREVIOUS UI: named text size utilities used rem units and varied with page root scaling; pixel sizes preserve the 16px-root design.

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Lock } from "lucide-react"

// href: null = no page yet. locked = a project not public yet: shown like the locked systems in the
// UNCREWED SYSTEMS menu (name and line underneath broken up by a filter so they can't be read, plus a lock).
// PREVIOUS UI (until 12 Nov): Cortex -> /cortex and Mesh -> /mesh were links, Integration was greyed out "Coming soon".
// Their pages are switched off (app/cortex, app/mesh: disabled.tsx).
const menuItems: { title: string; subtitle: string; href: string | null; locked?: boolean }[] = [
    { title: "AI-Pilot", subtitle: "Advanced operation design", href: "/ai-pilot" },
    { title: "Cortex", subtitle: "Real-time mission control", href: null, locked: true },
    { title: "Mesh", subtitle: "Post-mission intelligence", href: null, locked: true },
    { title: "Integration", subtitle: "Mission systems integration", href: null, locked: true },
]

// A locked project tile: same layout as the others, with the name and line underneath made unreadable
// (filter #maverick-fragmented-type, styles .maverick-scratched-* in globals.css) and a lock. Not clickable.
// PREVIOUS UI (12 Nov, briefly): a scrambling cipher bar with "Classified · MVK-0x", then a plain grey bar.
function LockedTile({ title, subtitle, className }: { title: string; subtitle: string; className: string }) {
    return (
        <div aria-label={`${title} (locked)`} className={`${className} group cursor-not-allowed select-none`}>
            <div aria-hidden="true" className="relative z-10 w-full">
                <div className="mb-1 flex items-center gap-3">
                    <span className="maverick-scratched-name text-[20px] lg:text-[30px] font-light font-orbit"><span>{title}</span></span>
                    <Lock className="h-4 w-4 text-black/30 transition-colors group-hover:text-amber-500/80" />
                </div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-mono"><span className="maverick-scratched-detail">{subtitle}</span></p>
            </div>
        </div>
    )
}

// 2x2 grid borders: right edge on the left column, bottom edge on the top row
const borderFor = (index: number) =>
    ["md:border-r border-b", "border-b", "md:border-r border-b md:border-b-0", ""][index] + " border-gray-200"

interface MaverickMenuProps {
    onClose: () => void;
}

export const MaverickMenu: React.FC<MaverickMenuProps> = ({ onClose }) => {
    return (
        // PREVIOUS UI: xl:flex-row / xl:w-1/3 / xl:w-2/3 stacked tablet panels, with lg:p-12 padding.
        <div className="flex flex-col md:flex-row w-full h-full md:h-[clamp(300px,45svh,420px)] xl:h-[50vh] bg-white text-black overflow-hidden relative shadow-2xl">
            {/* Breaks up the locked names, like #hangar-fragmented-type in the UNCREWED SYSTEMS menu (stronger: bigger text) */}
            <svg aria-hidden="true" className="pointer-events-none absolute h-0 w-0">
                <defs>
                    <filter id="maverick-fragmented-type" x="-15%" y="-40%" width="130%" height="180%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.09 0.32" numOctaves="2" seed="17" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" xChannelSelector="R" yChannelSelector="G" />
                        <feGaussianBlur stdDeviation="0.9" />
                    </filter>
                </defs>
            </svg>
            {/* Left Side - Black Panel */}
            <div className="w-full md:w-2/5 xl:w-1/3 bg-black text-white p-6 xl:p-12 flex flex-col justify-center relative overflow-hidden z-10 shadow-lg shrink-0">
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
                    <div className="md:hidden flex items-center justify-center relative w-full mb-6">
                        <button
                            onClick={onClose}
                            className="absolute left-0 text-white hover:text-[#5ce1e6] text-[10px] font-orbit flex items-center gap-1 tracking-widest uppercase py-2"
                        >
                            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                            BACK
                        </button>
                        <h2 className="text-[20px] font-bold tracking-tighter font-orbit text-center">MAVERICK</h2>
                    </div>

                    {/* Desktop Title */}
                    {/* PREVIOUS UI: hidden xl:block text-[48px]. */}
                    <h2 className="hidden md:block text-[26px] xl:text-[48px] font-bold mb-4 tracking-tighter leading-none font-orbit">MAVERICK</h2>
                    <h3 className="text-[9px] lg:text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2 lg:mb-4 font-mono pl-1">Mission Control Systems</h3>

                    <p className="text-gray-400 leading-relaxed max-w-md mb-2 lg:mb-8 text-[12px] lg:text-[14px] font-light border-l-2 border-[#5ce1e6]/30 pl-4 lg:pl-6 font-orbit">
                        Comprehensive mission planning and execution systems for complex autonomous operations.
                    </p>

                </motion.div>
            </div>

            {/* Right Side - Grid */}
            <div className="w-full md:w-3/5 xl:w-2/3 bg-white grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 flex-1">
                {menuItems.map((item, index) => {
                    const content = (
                        <div className="relative z-10 w-full">
                            <h4 className={`text-[20px] lg:text-[30px] font-light mb-1 font-orbit ${item.href ? "group-hover:text-[#5ce1e6] transition-colors duration-300" : "text-gray-400"}`}>{item.title}</h4>
                            <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-mono group-hover:text-black transition-colors delay-75">{item.subtitle}</p>
                        </div>
                    )
                    const tileClass = `relative bg-gray-100 p-6 lg:p-8 flex flex-col justify-center overflow-hidden ${borderFor(index)}`

                    if (item.locked) return <LockedTile key={item.title} title={item.title} subtitle={item.subtitle} className={tileClass} />
                    if (!item.href) {
                        return <button key={item.title} type="button" disabled className={`${tileClass} cursor-default text-left`}>{content}</button>
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
