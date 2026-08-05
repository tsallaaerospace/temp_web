"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

import CharacterReveal from "./CharacterReveal"

export default function VelocityComplex() {
    return (
        <section className="bg-[#3d3d3d] text-white pt-12 lg:pt-16 uw:pt-16 pb-8 uw:pb-12 px-4 md:px-8 lg:px-12 font-orbit overflow-hidden">
            <div className="w-full max-w-[2000px] mx-auto">
                {/* Top Header Row */}
                {/* PREVIOUS UI (Standard flex row without mobile flex-col):
                <div className="flex justify-between items-end mb-4 lg:mb-10 3xl:mb-12 uw:mb-14 px-2 md:px-4">
                */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-0 mb-6 sm:mb-8 lg:mb-10 3xl:mb-12 uw:mb-14 px-2 md:px-4">
                    {/* PREVIOUS UI (Standard title font size & padding):
                    <CharacterReveal text="Velocity Complex" className="text-3xl md:text-4xl lg:text-[4.375rem] 3xl:text-[4.375rem] uw:text-[4.375rem] font-bold tracking-tight pl-4 md:pl-5 lg:pl-8 uw:pl-0 uw:-ml-20 font-orbit text-white" stagger={0.04} triggerOnScroll={true} />
                    */}
                    <CharacterReveal
                        text="Velocity Complex"
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-[4.375rem] 3xl:text-[4.375rem] uw:text-[4.375rem] font-bold tracking-tight pl-0 sm:pl-4 md:pl-5 lg:pl-8 uw:pl-0 uw:-ml-20 font-orbit text-white"
                        stagger={0.04}
                        triggerOnScroll={true}
                    />
                    <motion.button
                        whileHover={{ x: 3 }}
                        className="flex items-center gap-2 text-xs md:text-sm font-normal opacity-50 hover:opacity-100 transition-opacity uppercase tracking-widest mr-0 sm:mr-8 lg:mr-12 3xl:mr-14 uw:mr-16"
                    >
                        Explore Velocity <ArrowUpRight className="w-3.5 h-3.5" />
                    </motion.button>
                </div>

                {/* Main Hero Image */}
                {/* PREVIOUS UI (Standard aspect ratio without mobile aspect-16/9):
                <div className="relative w-full aspect-[21/9] lg:aspect-[3.2/1] uw:aspect-[3.6/1] overflow-hidden grayscale-[20%] hover:grayscale-0 transition-all duration-700">
                */}
                <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[3.2/1] uw:aspect-[3.6/1] overflow-hidden grayscale-[20%] hover:grayscale-0 transition-all duration-700">
                    <img
                        src="/building.avif"
                        alt="Velocity Complex"
                        className="w-full h-full object-cover shadow-2xl"
                    />
                </div>

                {/* Footer Row — right-aligned to match EXPLORE VELOCITY button */}
                {/* PREVIOUS UI (Standard top margin):
                <div className="flex justify-end mt-14 3xl:mt-16 uw:mt-10 px-2 md:px-4">
                */}
                <div className="flex justify-end mt-6 sm:mt-14 3xl:mt-16 uw:mt-10 px-2 md:px-4">
                    <div className="mr-0 sm:mr-5 lg:mr-6 3xl:mr-7 uw:mr-8 flex flex-col items-start">
                        <h3 className="text-[10px] md:text-xs font-bold tracking-[0.4em] mb-4 uppercase opacity-80 font-orbit">VELOCITY COMPLEX</h3>
                        <p className="text-sm md:text-base font-normal opacity-90 leading-tight">
                            A new standard in<br />defense manufacturing.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}