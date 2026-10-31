"use client"

import React from "react"
// PREVIOUS UI: motion.button animated on hover but had no navigation target.
// import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import CharacterReveal from "@/components/CharacterReveal"

export default function VelocityComplex() {
    return (
        /* PREVIOUS UI (Standard section container without mobile 100dvh height):
        <section className="bg-[#3d3d3d] text-white pt-12 lg:pt-16 uw:pt-16 pb-8 uw:pb-12 px-4 md:px-8 lg:px-12 font-orbit overflow-hidden">
        */
        <section className="home-velocity-screen bg-[#3d3d3d] text-white min-h-[100dvh] sm:min-h-0 flex flex-col justify-between pt-16 sm:pt-12 lg:pt-16 uw:pt-16 pb-10 sm:pb-8 uw:pb-12 px-4 md:px-8 lg:px-12 font-orbit overflow-hidden snap-start snap-always">
            <div className="w-full max-w-[2000px] mx-auto flex-1 flex flex-col justify-between">
                {/* Top Header Row */}
                {/* PREVIOUS UI (Standard flex row without mobile flex-col):
                <div className="flex justify-between items-end mb-4 lg:mb-10 3xl:mb-12 uw:mb-14 px-2 md:px-4">
                */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-0 mb-4 sm:mb-8 lg:mb-10 3xl:mb-12 uw:mb-14 px-2 md:px-4">
                    {/* PREVIOUS UI (Standard title font size & padding):
                    <CharacterReveal text="Velocity Complex" className="text-3xl md:text-4xl lg:text-[4.375rem] 3xl:text-[4.375rem] uw:text-[4.375rem] font-bold tracking-tight pl-4 md:pl-5 lg:pl-8 uw:pl-0 uw:-ml-20 font-orbit text-white" stagger={0.04} triggerOnScroll={true} />
                    */}
                    {/* PREVIOUS UI (font-bold title):
                    <CharacterReveal
                        text="Velocity Complex"
                        className="home-section-title text-2xl sm:text-3xl md:text-4xl lg:text-[4.375rem] 3xl:text-[4.375rem] uw:text-[4.375rem] font-bold tracking-tight pl-0 sm:pl-4 md:pl-5 lg:pl-8 uw:pl-0 uw:-ml-20 font-orbit text-white"
                        stagger={0.04}
                        triggerOnScroll={true}
                    />
                    */}
                    <CharacterReveal
                        text="Velocity Complex"
                        className="home-section-title text-2xl sm:text-3xl md:text-4xl lg:text-[4.375rem] 3xl:text-[4.375rem] uw:text-[4.375rem] !font-normal font-normal tracking-tight pl-0 sm:pl-4 md:pl-5 lg:pl-8 uw:pl-0 uw:-ml-20 font-orbit text-white"
                        stagger={0.04}
                        triggerOnScroll={true}
                    />
                    {/* PREVIOUS UI:
                    <motion.button whileHover={{ x: 3 }} className="flex items-center gap-2 text-xs md:text-sm font-normal opacity-50 hover:opacity-100 transition-opacity uppercase tracking-widest mr-0 sm:mr-8 lg:mr-12 3xl:mr-14 uw:mr-16">
                        Explore Velocity <ArrowUpRight className="w-3.5 h-3.5" />
                    </motion.button>
                    */}
                    <Link
                        href="/velocity"
                        className="flex min-h-11 items-center gap-2 text-xs md:text-sm font-normal opacity-70 hover:opacity-100 transition-opacity uppercase tracking-widest mr-0 sm:mr-8 lg:mr-12 3xl:mr-14 uw:mr-16 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5ce1e6]"
                    >
                        Explore Velocity <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5" />
                    </Link>
                </div>

                {/* Main Hero Image */}
                {/* PREVIOUS UI (Standard aspect ratio without mobile full screen fitting):
                <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[3.2/1] uw:aspect-[3.6/1] overflow-hidden grayscale-[20%] hover:grayscale-0 transition-all duration-700">
                */}
                <div className="relative w-full flex-1 min-h-[35vh] sm:min-h-0 aspect-[4/3] sm:aspect-[21/9] lg:aspect-[3.2/1] uw:aspect-[3.6/1] overflow-hidden grayscale-[20%] hover:grayscale-0 transition-all duration-700 my-4 sm:my-0">
                    {/* PREVIOUS UI (Image src using /about/building.avif):
                    <img
                        src="/about/building.avif"
                        alt="Velocity Complex"
                        className="w-full h-full object-cover shadow-2xl"
                    />
                    */}
                    <img
                        src="/home/Velocity-Complex.jpg"
                        alt="Velocity Complex"
                        className="w-full h-full object-cover shadow-2xl"
                    />
                </div>

                {/* Footer Row — right-aligned to match EXPLORE VELOCITY button */}
                {/* PREVIOUS UI (Standard top margin):
                <div className="flex justify-end mt-14 3xl:mt-16 uw:mt-10 px-2 md:px-4">
                */}
                {/* Footer Row — centered on mobile, right-aligned on desktop */}
                {/* PREVIOUS UI (Right-aligned on mobile and desktop):
                <div className="flex justify-end mt-6 sm:mt-14 3xl:mt-16 uw:mt-10 px-2 md:px-4">
                    <div className="mr-0 sm:-mr-5 lg:-mr-4 3xl:-mr-3 uw:-mr-2 flex flex-col items-start">
                        <p className="text-sm md:text-base font-normal opacity-90 leading-tight">
                            A new standard in defense manufacturing.
                        </p>
                    </div>
                </div>
                */}
                <div className="flex justify-center sm:justify-end mt-6 sm:mt-14 3xl:mt-16 uw:mt-10 px-2 md:px-4">
                    <div className="mr-0 sm:-mr-5 lg:-mr-4 3xl:-mr-3 uw:-mr-2 flex flex-col items-center sm:items-start text-center sm:text-left">
                        <p className="text-sm md:text-base font-normal opacity-90 leading-tight">
                            A new standard in defense manufacturing.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
