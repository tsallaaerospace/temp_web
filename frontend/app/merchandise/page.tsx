"use client"

import React, { useRef } from "react"
import PageWrapper from "@/components/PageWrapper"
import Image from "next/image"
import Link from "next/link"
import { allProducts, type Product } from "./data"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Permanent_Marker } from "next/font/google"

const permanentMarker = Permanent_Marker({ weight: "400", subsets: ["latin"] });

gsap.registerPlugin(useGSAP, ScrollTrigger);

function getStatusColor(status: string) {
    return {
        dot:
            status === "CLASSIFIED" ? "bg-[#d90429]" :
                status === "LIMITED" ? "bg-[#d97706]" :
                    status === "IN STOCK" ? "bg-[#16a34a]" :
                        status === "DEPLOYED" ? "bg-[#2563eb]" : "bg-[#086972]",
        text:
            status === "CLASSIFIED" ? "text-[#d90429]" :
                status === "LIMITED" ? "text-[#d97706]" :
                    status === "IN STOCK" ? "text-[#16a34a]" :
                        status === "DEPLOYED" ? "text-[#2563eb]" : "text-black/60",
    }
}

function ProductCard({ product }: { product: Product }) {
    const colors = getStatusColor(product.status)
    return (
        <Link href={`/merchandise/${product.id}`} className="block">
            <div className="relative bg-white border border-black/10 rounded-sm overflow-hidden group transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] cursor-pointer">
                {/* Corner Dots */}
                <div className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-black/10" />
                <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-black/10" />
                <div className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-black/10" />
                <div className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full bg-black/10" />

                {/* Header: Serial & Status */}
                <div className="flex justify-between items-center px-4 py-3 border-b border-black/5">
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-black/5" />
                        <span className="font-orbit text-[8px] tracking-[0.2em] text-black/40 uppercase">
                            Serial: {product.serial}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-sm ${colors.dot}`} />
                        <span className={`font-orbit text-[8px] tracking-[0.2em] uppercase ${colors.text}`}>
                            Status: {product.status}
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-black/5" />
                    </div>
                </div>

                <div className="p-6 flex flex-col gap-4">
                    {/* Title - fixed height for cross-card alignment */}
                    <div className="h-[96px] xl:h-[110px] 2xl:h-[120px] flex flex-col items-start gap-1 relative">
                        <h3 className="font-orbit text-2xl font-bold text-black leading-tight uppercase tracking-tight transition-colors duration-300">
                            {product.title}
                        </h3>
                        {product.title === "ADVANCED STRIKE AR-15" && (
                            <div className="font-orbit text-sm font-medium tracking-widest text-[#d90429] mt-5 uppercase pt-2">
                                <span className="text-black text-[13px]">This is</span>
                                <span className="relative inline-block w-1.5 mx-0.5">
                                    <span className={`${permanentMarker.className} absolute bottom-5 left-[60%] -translate-x-1/2 text-[#d90429] text-base md:text-lg -rotate-[12deg] whitespace-nowrap tracking-wider capitalize normal-case drop-shadow-sm z-10`}>
                                        Not
                                    </span>
                                    <span className="absolute bottom-3 left-[60%] -translate-x-1/2 rotate-[5deg]">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#d90429]">
                                            <path d="M4 16L12 8L20 16" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </span>
                                <span className="text-black text-[13px]"> a Gun</span>
                            </div>
                        )}
                    </div>

                    {/* Image */}
                    <div className="relative aspect-square w-full bg-white flex items-center justify-center overflow-hidden group-hover:scale-[1.02] transition-transform duration-500 border border-black/5">
                        <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className={`object-cover p-3 transition-opacity duration-500 ${product.images.length > 1 ? "group-hover:opacity-0" : ""}`}
                        />
                        {product.images?.[1] && (
                            <Image
                                src={product.images[1]}
                                alt={`${product.title} hover`}
                                fill
                                className="object-cover p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            />
                        )}
                    </div>

                    {/* Footer */}
                    <div className="mt-auto pt-4 border-t border-black/5 flex items-end justify-between">
                        <div className="flex flex-col">
                            <span className="font-orbit text-[8px] tracking-[0.2em] text-black/30 uppercase mb-0.5">Unit Value</span>
                            <span className="font-orbit text-xl font-bold text-black tracking-tight">${product.price}</span>
                        </div>
                        <button className="px-6 py-2.5 bg-[#5ce1e6] text-black font-orbit text-[9px] tracking-[0.2em] uppercase hover:bg-[#3bcdd2] transition-all duration-300">
                            {product.action}
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

function SectionHeader({ title }: { title: string }) {
    return (
        <div className="mb-12">
            <CharacterReveal as="h2" text={title} className="font-orbit text-4xl font-semibold uppercase tracking-tight text-black" stagger={0.04} />
        </div>
    )
}



function CharacterReveal({ text, className, stagger = 0.04, delay = 0, as = "h1" }: { text: string; className?: string; stagger?: number; delay?: number; as?: "h1" | "h2" | "div" | "span" }) {
    const containerRef = useRef<any>(null)

    useGSAP(() => {
        if (!containerRef.current) return

        const chars = containerRef.current.querySelectorAll(".char")
        if (chars.length === 0) return

        // Characters start invisible
        gsap.set(chars, { opacity: 0 })

        // Digital signal lock / blink effect
        gsap.to(chars, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 90%", // Trigger when it enters viewport
                toggleActions: "play none none none"
            },
            keyframes: [
                { opacity: 1, color: "#5ce1e6", textShadow: "0 0 15px #5ce1e6", duration: 0.12, ease: "none" },
                { opacity: 1, color: "#000000", textShadow: "none", duration: 0.1, ease: "none" },
                { opacity: 1, color: "#5ce1e6", textShadow: "0 0 25px #5ce1e6", duration: 0.18, ease: "none" },
                { opacity: 1, color: "#000000", textShadow: "none", duration: 0.08, ease: "none" },
                { opacity: 1, color: "#5ce1e6", textShadow: "0 0 10px #5ce1e6", duration: 0.12, ease: "none" },
                { opacity: 1, color: "#000000", textShadow: "none", duration: 0.1, ease: "none" },
                { opacity: 1, color: "", textShadow: "none", duration: 0.3, ease: "power2.out" } // Final stable state
            ],
            stagger: {
                each: stagger,
                from: "random",
                // Randomizes the order so it doesn't look like left-to-right typing
            },
            delay: delay,
            overwrite: true
        })
    }, { scope: containerRef })

    const Tag = as as any

    return (
        <Tag ref={containerRef} className={className + " flex whitespace-pre"}>
            {text.split("").map((char, i) => (
                <span
                    key={i}
                    className="char inline-block will-change-[opacity,color,filter]"
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </Tag>
    )
}

export default function MerchandisePage() {
    const accessoriesProducts = allProducts.filter((p) => p.section === "accessories")
    const apparelProducts = allProducts.filter((p) => p.section === "apparel")

    const logoRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        gsap.fromTo(logoRef.current,
            {
                x: "-100vw",
                opacity: 0,
                rotation: -15 // Add a slight tilt while flying in
            },
            {
                x: 0,
                opacity: 1,
                rotation: 0,
                duration: 2.2,
                ease: "power3.out"
            }
        )
    })

    return (
        <PageWrapper hasHero={true}>
            <div className="min-h-screen bg-white text-black font-clash text-center md:text-left relative">

                {/* ── HERO ── */}
                <section className="relative h-screen flex items-end justify-start overflow-hidden bg-white px-0 md:px-0">
                    {/* Background Logo */}
                    <div ref={logoRef} className="absolute inset-0 z-10 pointer-events-none opacity-0">
                        <div
                            className="absolute top-0 left-0 w-[75vw] lg:w-[50vw] max-w-[800px] aspect-square opacity-30 select-none transition-transform duration-75 ease-out origin-center -translate-x-[147px] -translate-y-[53px] -rotate-90 scale-[0.6] hidden md:hidden lg:block"
                        >
                            <Image src="/merch/logo_only.png" alt="Aerospace Logo" fill className="object-contain object-left-top brightness-0" />
                        </div>
                    </div>

                    <div className="relative z-20 w-full max-w-screen-2xl pl-0 md:pl-0 pr-8 pb-4 md:pb-4 select-none">
                        <div className="flex items-baseline gap-6 md:gap-10 ml-6 md:ml-20">
                            <CharacterReveal
                                text="MERCH"
                                className="font-orbit text-[24vw] md:text-[18vw] font-bold tracking-tighter text-black leading-none uppercase"
                                stagger={0.06}
                                delay={1.4}
                            />
                            <CharacterReveal
                                text="X"
                                className="font-orbit text-[45vw] md:text-[40vw] font-extrabold text-[#5ce1e6] leading-none mt-4 md:mt-0 ml-4 md:ml-12"
                                stagger={0.06}
                                delay={1.4}
                            />
                        </div>
                    </div>
                </section>

                {/* ── TSALLA ACCESSORIES ── */}
                <div className="max-w-7xl mx-auto px-10 pt-6 pb-10">
                    <SectionHeader title="Tsalla Accessories" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {accessoriesProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>

                {/* ── TSALLA APPAREL ── */}
                <div className="max-w-7xl mx-auto px-10 pt-16 pb-24">
                    <SectionHeader title="Tsalla Apparel" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {apparelProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>

            </div>
        </PageWrapper>
    )
}
