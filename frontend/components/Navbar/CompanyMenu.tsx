"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

// --- "Sexy" & Synced 3D Animations ---

const menuItems = [
    {
        title: "Mission",
        subtitle: "BUILDING THE FUTURE",
        href: "/about",
    },
    {
        title: "Leadership",
        subtitle: "MEET OUR FOUNDER",
        href: "/leadership",
    },
    {
        title: "News, Media & Events",
        subtitle: "UNFAIR ADVANTAGES",
        href: "/newsroom",
    },
    {
        title: "Merchandise",
        subtitle: "THE JOURNEY TO EXCELLENCE",
        href: "/merchandise",
    }
]

interface CompanyMenuProps {
    onClose: () => void;
}

export const CompanyMenu: React.FC<CompanyMenuProps> = ({ onClose }) => {
    return (
        <div className="flex flex-col xl:flex-row w-full h-auto xl:h-[50vh] bg-white text-black overflow-hidden relative shadow-2xl">
            {/* Left Side - Black Panel */}
            <div className="w-full xl:w-1/3 bg-black text-white p-4 lg:p-12 flex flex-col justify-center relative overflow-hidden z-10 shadow-lg shrink-0">
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
                    <div className="xl:hidden flex items-center justify-center relative w-full mb-6 text-black">
                        <button
                            onClick={onClose}
                            className="absolute left-0 text-white hover:text-[#5ce1e6] text-[10px] font-orbit flex items-center gap-1 tracking-widest uppercase py-2"
                        >
                            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                            BACK
                        </button>
                        <h2 className="text-xl font-bold tracking-tighter font-orbit text-center text-white uppercase">
                            COMPANY
                        </h2>
                    </div>

                    {/* Desktop Title */}
                    <Link href="/about" onClick={onClose} className="group inline-block">
                        <h2 className="hidden xl:block text-2xl lg:text-5xl font-bold mb-2 lg:mb-4 tracking-tighter uppercase font-orbit text-white group-hover:text-[#5ce1e6] transition-colors">
                            About Us
                        </h2>
                    </Link>
                    <h3 className="text-[10px] lg:text-xs uppercase tracking-[0.3em] text-gray-500 mb-4 lg:mb-6 font-mono font-semibold pl-1">Innovation Without Compromise</h3>

                    <p className="text-gray-400 leading-relaxed max-w-md mb-4 lg:mb-8 text-sm lg:text-base font-light font-orbit border-l-2 border-[#5ce1e6]/30 pl-4 lg:pl-6 text-justify">
                        Learn about Tsalla Aerospace's mission to revolutionize autonomous systems and create unfair advantages in modern warfare.
                    </p>
                </motion.div>
            </div>

            {/* Right Side - Grid - Borders Fixed */}
            <div className="w-full xl:w-2/3 bg-white grid grid-cols-1 md:grid-cols-2 xl:grid-rows-2">
                {menuItems.map((item, index) => {
                    let borderClass = "border-gray-200"
                    if (index === 0) borderClass = "border-r border-b border-gray-200"
                    if (index === 1) borderClass = "border-b border-gray-200"
                    if (index === 2) borderClass = "border-r border-gray-200"
                    if (index === 3) borderClass = ""

                    return (
                        <Link
                            key={item.title}
                            href={item.href}
                            onClick={onClose}
                            className={`
                                relative bg-gray-100 hover:bg-white p-5 lg:p-8 flex flex-col justify-center group hover:z-20 transition-colors duration-500 ease-out overflow-hidden
                                ${borderClass}
                            `}
                        >
                            {/* Content */}
                            <div className="relative z-10 w-full">
                                <h4 className="text-xl lg:text-3xl font-light mb-2 group-hover:text-[#5ce1e6] transition-colors duration-300 font-orbit">{item.title}</h4>
                                <p className="text-[9px] lg:text-[10px] uppercase tracking-[0.2em] text-gray-400 font-mono group-hover:text-black transition-colors delay-75">{item.subtitle}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
