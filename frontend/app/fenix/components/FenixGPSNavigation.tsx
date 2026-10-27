"use client"

import CharacterReveal from "@/components/CharacterReveal"

export default function FenixGPSNavigation() {
    return (
        <section className="relative h-[100svh] bg-[#0a0a0a] flex flex-col items-center overflow-hidden px-4 pb-4 sm:px-[3vw] sm:pb-[3svh] font-orbit">
            <div className="relative z-10 shrink-0 w-full max-w-5xl px-5 pt-[max(4.5rem,8svh)] pb-[clamp(1rem,3svh,2rem)] text-center flex flex-col items-center">
                <h3 className="fenix-section-title leading-[1.1] text-white font-normal tracking-tight mb-4 sm:mb-6">
                    <span className="block sm:inline">No GPS ? </span>
                    <CharacterReveal
                        text="No problem!"
                        targetColor="#34d399"
                        glowColor="#34d399"
                        className="text-emerald-400 block sm:inline"
                        stagger={0.06}
                    />
                </h3>
                <p className="fenix-body mt-2 w-full max-w-2xl text-neutral-400 text-left sm:text-center">
                    Reliable positioning without GPS using SLAM, sensor fusion, and real-time mapping built for tunnels, urban canyons, and signal-jammed zones.
                </p>
            </div>
            <div className="relative w-full flex-1 min-h-0">
                <picture className="block w-full h-full">
                <source media="(max-width: 767px)" srcSet="/product/fenix/hf_20261024_065857_320eac2f-747f-48c6-8b33-78438486c149.png" />
                <img
                    src="/product/fenix/GBS-destop.png"
                    alt="FENIx navigating and mapping a cave without GPS"
                    width={3168}
                    height={1344}
                    loading="eager"
                    decoding="async"
                    className="block w-full h-full object-cover object-center"
                />
                </picture>
            </div>
        </section>
    )
}
