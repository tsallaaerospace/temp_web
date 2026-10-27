"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion, useInView } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);


const PONTANO_SANS = "'Orbit', sans-serif";
const cn = (...classes: (string | boolean | undefined | null)[]) => classes.filter(Boolean).join(' ');

// --- Types ---
interface Product {
    id: number;
    tag: string;
    title: string;
    description: string;
    imageUrl: string;
    /** Extra classes for the card image, e.g. to shift where the drone sits in the frame */
    imageClassName?: string;
    isWide?: boolean;
    features?: string[];
    animationType?: string;
    glitchEffect?: boolean;
    href: string;
}

// --- Static Data ---
const STATIC_PRODUCTS: Product[] = [
    {
        id: 1,
        tag: "Drone As First Responder",
        // PREVIOUS UI: "FENIX" (shown in capitals). The brand writes it with a lowercase x.
        title: "FENIx",
        description: "Fast Entry Navigational Intrusion eXplorer",
        // PREVIOUS UI: "/product/fenix/FENIX_card.png"
        imageUrl: "/product/fenix/FENIX_hero_v3_silver_black_1200x1440.png",
        imageClassName: "translate-x-[25%] translate-y-[20%] scale-[1.62]",
        isWide: false,
        animationType: "scan",
        glitchEffect: true,
        features: [],
        href: "/fenix"
    },
    {
        id: 2,
        tag: "Outdoor Tactical",
        title: "T-BAT",
        description: "Battlefield Aerial Tactical UAS",
        // PREVIOUS UI: "/product/T-BAT/T-Bat%20card.png"
        imageUrl: "/product/T-BAT/Tbat_Front_Glass_Restored_1200x1440.png",
        // Keep the propellers in frame while cropping the landing gear below the card.
        imageClassName: "translate-y-[15%] scale-[2.7]",
        isWide: false,
        // animationType: "float",
        glitchEffect: true,
        features: [],
        href: "/bat"
    },
    {
        id: 3,
        tag: "Outdoor Overwatch",
        title: "MANTIS",
        // PREVIOUS UI:
        // description: "Multi-Role Single Solution",
        // description: "Mission Adaptive networked Targeting and interception system",
        description: "Mission Adaptive Networked Targeting And Interception System",
        imageUrl: "/product/Mantis/Mantis-Card.png",
        imageClassName: "translate-y-[20%] scale-[3.6]",
        isWide: false,
        // animationType: "float",
        glitchEffect: false,
        features: [],
        href: "/mantis"
    },
    {
        id: 4,
        tag: "Crisis Communications",
        title: "STORM",
        description: "Smart Transport Operations for Rugged Missions",
        imageUrl: "/product/STORM/STORM_front_3600x4320_HQ.png",
        imageClassName: "translate-y-[5%]  scale-[2.2]",
        isWide: false,
        animationType: "pulse",
        glitchEffect: false,
        features: [],
        href: "/storm"
    }
];

// PREVIOUS UI: randomized letter flicker. White aviation lighting reveals the cyan word once.
function MaverickStrobe() {
    const ref = React.useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.6 });
    const reduceMotion = useReducedMotion();

    return (
        <span ref={ref} className="aviation-strobe" data-strobe-state={reduceMotion ? "steady" : inView ? "playing" : "waiting"}>
            <span className="aviation-strobe-text">MAVERICK</span>
            <span className="aviation-strobe-flash" aria-hidden="true" />
            <span className="aviation-strobe-led" aria-hidden="true" />
            <span className="aviation-strobe-flash aviation-strobe-right" aria-hidden="true" />
            <span className="aviation-strobe-led aviation-strobe-right" aria-hidden="true" />
            <span className="aviation-strobe-beam" aria-hidden="true" />
            <style jsx>{`
                .aviation-strobe { position: relative; display: inline-block; isolation: isolate; white-space: nowrap; color: #5ce1e6; background: #000; }
                .aviation-strobe-text { position: relative; display: inline-block; color: #5ce1e6; }
                [data-strobe-state="waiting"] .aviation-strobe-text { clip-path: inset(0 100% 0 0); }
                .aviation-strobe-flash { position: absolute; left: 33.333%; top: 50%; transform: translate(-50%, -50%); width: .08em; height: .08em; min-width: 2px; min-height: 2px; border-radius: 50%; background: #fff; opacity: 0; box-shadow: 0 0 .1em .035em #fff, 0 0 .35em .12em #ffffff90, 0 0 .8em .22em #ffffff30; pointer-events: none; }
                .aviation-strobe-led { position: absolute; left: 33.333%; top: 50%; transform: translate(-50%, -50%); width: .065em; height: .065em; min-width: 2px; min-height: 2px; border-radius: 50%; background: #fff; opacity: 0; box-shadow: 0 0 .12em .025em #fff, 0 0 .4em .08em #ffffff60; pointer-events: none; }
                .aviation-strobe-right { left: 66.667%; }
                .aviation-strobe-beam { position: absolute; inset: 0; opacity: 0; pointer-events: none; }
                .aviation-strobe-beam::before { content: ""; position: absolute; left: 0; top: 50%; width: 1.15em; height: max(1px, .025em); transform: translateX(-50%); background: #fff; box-shadow: 0 0 .08em .025em #fff, 0 0 .25em .06em #ffffff70, 0 0 .6em .12em #ffffff20; }
                .aviation-strobe-beam::after { content: ""; position: absolute; left: -.45em; top: -.15em; width: .9em; height: 1.3em; background: radial-gradient(ellipse, #ffffff22 0%, #ffffff0a 35%, transparent 70%); }
                [data-strobe-state="playing"] .aviation-strobe-text { animation: aviation-text-reveal 2s linear both; }
                [data-strobe-state="playing"] .aviation-strobe-flash { animation: aviation-double-flash 2s steps(1, end) both; }
                [data-strobe-state="playing"] .aviation-strobe-led { animation: aviation-led 2s linear both; }
                [data-strobe-state="playing"] .aviation-strobe-beam { animation: aviation-beam 2s linear both; }
                @keyframes aviation-double-flash {
                    0%, 21%, 46%, 100% { opacity: 0; }
                    15%, 40% { opacity: 1; }
                }
                @keyframes aviation-led {
                    0% { opacity: 0; }
                    4%, 14.99% { opacity: .6; }
                    15%, 40% { opacity: 1; }
                    21%, 39.99%, 46% { opacity: .25; }
                    47.5%, 100% { opacity: 0; }
                }
                @keyframes aviation-text-reveal {
                    0%, 47.5% { clip-path: inset(0 100% 0 0); text-shadow: none; }
                    77.5% { clip-path: inset(0 0% 0 0); text-shadow: 0 0 .12em #ffffff60; }
                    100% { clip-path: inset(0 0% 0 0); text-shadow: 0 0 .035em #ffffff18; }
                }
                @keyframes aviation-beam {
                    0%, 47.49% { opacity: 0; transform: translateX(0%); }
                    47.5% { opacity: 1; transform: translateX(0%); }
                    77.49% { opacity: 1; transform: translateX(100%); }
                    77.5%, 100% { opacity: 0; transform: translateX(100%); }
                }
                @media (prefers-reduced-motion: reduce) {
                    .aviation-strobe-text { animation: none !important; clip-path: none !important; text-shadow: none !important; }
                    .aviation-strobe-flash, .aviation-strobe-led, .aviation-strobe-beam { display: none; animation: none !important; }
                }
            `}</style>
        </span>
    );
}

// --- Sub-components ---

const HUDLines = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        <div className="absolute top-4 left-4 w-12 h-12 border-t border-l" style={{ borderColor: '#5ce1e6', opacity: 0.4 }} />
        <div className="absolute top-4 right-4 w-12 h-12 border-t border-r" style={{ borderColor: '#5ce1e6', opacity: 0.4 }} />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l" style={{ borderColor: '#5ce1e6', opacity: 0.4 }} />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r" style={{ borderColor: '#5ce1e6', opacity: 0.4 }} />
        <div className="absolute top-1/2 left-0 w-full h-[1px]" style={{ background: '#5ce1e6', opacity: 0.1 }} />
        <div className="absolute left-1/2 top-0 w-[1px] h-full" style={{ background: '#5ce1e6', opacity: 0.1 }} />
    </div>
);

const GlitchOverlay = () => (
    <div
        className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay"
        style={{ background: '#5ce1e6', opacity: 0.04 }}
    />
);

function ProductCard({ product, index }: { product: Product; index: number }) {
    const cardRef = React.useRef<HTMLDivElement>(null);
    const cardInView = useInView(cardRef, { amount: 0.3 });
    const reduceMotion = useReducedMotion();
    const isMantis = product.id === 3;
    const isStorm = product.href === "/storm";
    const hasArrival = product.href === "/fenix" || product.href === "/bat" || isMantis || isStorm;
    const isWide = product.isWide;

    if (isWide) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: hasArrival ? 0 : index * 0.1, ease: "easeOut" }}
                /* PREVIOUS UI:
                className="col-span-1 md:col-span-2 relative group overflow-hidden rounded-none bg-black border border-white/20 transition-all duration-500 shadow-2xl shadow-[inset_0_0_30px_rgba(255,255,255,0.05)] hover:border-[#5ce1e6]/50"
                */
                className="col-span-1 md:col-span-2 relative group overflow-hidden rounded-none bg-black border border-white/60 transition-all duration-500 shadow-2xl shadow-[inset_0_0_30px_rgba(255,255,255,0.05)] hover:border-[#5ce1e6]/80"
            >

                <AnimatePresence>
                    {product.glitchEffect && <GlitchOverlay />}
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none" />


                <div className="relative z-30 p-4 h-full min-h-[180px] flex flex-col">
                    <div className="flex justify-start mb-2">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold bg-white/5 backdrop-blur-xl border border-white/10 text-white/80"
                        >
                            <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: '#5ce1e6' }} />
                            {product.tag}
                        </motion.div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center items-center">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full items-center">
                            <div className="lg:col-span-3 flex flex-col gap-3">
                                {product.features?.slice(0, 3).map((feature, i) => (
                                    <motion.div key={i} whileHover={{ x: 10 }} className="flex items-center gap-4 group/item cursor-default">
                                        <div className="h-[1px] w-8 bg-[#5ce1e6]/30 group-hover/item:w-12 transition-all" />
                                        <span className="text-sm font-medium text-gray-400 group-hover/item:text-white transition-colors uppercase tracking-wider">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="lg:col-span-6 relative flex justify-center">
                                <div className="relative w-full aspect-video rounded-none overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm shadow-2xl group-hover:border-[#5ce1e6]/50 transition-colors">
                                    <img src={product.imageUrl} className="w-full h-full object-cover opacity-80" alt="Live View" />
                                    <div className="absolute inset-0 animate-pulse" style={{ background: '#5ce1e6', opacity: 0.05 }} />
                                    <div className="absolute top-2 left-2 flex gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                        <span className="text-[8px] text-white/50 uppercase font-bold">Live Stream 04</span>
                                    </div>
                                </div>
                                <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" viewBox="0 0 100 100">
                                    <path d="M 25 30 L 10 30" stroke="#5ce1e6" fill="transparent" strokeWidth="0.5" opacity="0.2" />
                                    <path d="M 25 50 L 10 50" stroke="#5ce1e6" fill="transparent" strokeWidth="0.5" opacity="0.2" />
                                    <path d="M 25 70 L 10 70" stroke="#5ce1e6" fill="transparent" strokeWidth="0.5" opacity="0.2" />
                                    <path d="M 75 30 L 90 30" stroke="#5ce1e6" fill="transparent" strokeWidth="0.5" opacity="0.2" />
                                    <path d="M 75 50 L 90 50" stroke="#5ce1e6" fill="transparent" strokeWidth="0.5" opacity="0.2" />
                                    <path d="M 75 70 L 90 70" stroke="#5ce1e6" fill="transparent" strokeWidth="0.5" opacity="0.2" />
                                </svg>
                            </div>

                            <div className="lg:col-span-3 flex flex-col gap-3 items-end">
                                {product.features?.slice(3).map((feature, i) => (
                                    <motion.div key={i} whileHover={{ x: -10 }} className="flex items-center gap-4 group/item cursor-default text-right">
                                        <span className="text-sm font-medium text-gray-400 group-hover/item:text-white transition-colors uppercase tracking-wider">{feature}</span>
                                        <div className="h-[1px] w-8 bg-[#5ce1e6]/30 group-hover/item:w-12 transition-all" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-2 flex flex-col md:flex-row justify-end items-end gap-4">
                        <Link href="#" onClick={(e) => e.preventDefault()}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-2.5 rounded-none bg-white text-black text-[10px] font-black tracking-widest transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:bg-neutral-100 hover:text-black"
                            >
                                Learn More
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        );
    }

    // PREVIOUS UI: product.title === "FENIX"; keyed on the link so the display name can change freely
    const isFenix = product.href === "/fenix";
    const isLinked = isFenix || isMantis || product.href === "/bat";
    const image = (
        <motion.img
            src={product.imageUrl}
            alt={product.title}
            // PREVIOUS UI: opacity-60 group-hover:opacity-100 (dim at rest, bright on hover); now reversed
            className={cn("absolute inset-0 w-full h-full object-cover opacity-100 group-hover:opacity-60 transition-opacity duration-700", product.imageClassName)}
            animate={product.animationType === 'float' ? { y: [0, -15, 0] } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
    );

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: hasArrival ? 0 : index * 0.1, ease: "easeOut" }}
            className={cn(
                /* PREVIOUS UI (Fixed pixel height without mobile adjustment):
                "group relative aspect-[2/3] lg:aspect-auto lg:h-[480px] 3xl:h-[520px] uw:h-[560px] overflow-hidden rounded-none bg-black border border-white/20 hover:border-white/40 transition-all duration-500 shadow-[inset_0_0_30px_rgba(255,255,255,0.05)]",
                */
                /* PREVIOUS UI (h-[420px] sm:h-[460px] with border-white/20):
                "group relative h-[420px] sm:h-[460px] lg:h-[480px] 3xl:h-[520px] uw:h-[560px] overflow-hidden rounded-none bg-black border border-white/20 hover:border-white/40 transition-all duration-500 shadow-[inset_0_0_30px_rgba(255,255,255,0.05)]",
                */
                /* PREVIOUS UI (border-white/20):
                "group relative h-[480px] sm:h-[520px] lg:h-[500px] 3xl:h-[560px] uw:h-[620px] overflow-hidden rounded-none bg-black border border-white/20 hover:border-white/40 transition-all duration-500 shadow-[inset_0_0_30px_rgba(255,255,255,0.05)]",
                */
                "group relative h-[480px] sm:h-[520px] lg:h-[500px] 3xl:h-[560px] uw:h-[620px] overflow-hidden rounded-none bg-black border border-white/60 hover:border-white transition-all duration-500 shadow-[inset_0_0_30px_rgba(255,255,255,0.05)]",
                isLinked && "cursor-pointer hover:border-[#5ce1e6]"
            )}
        >
            {isLinked && (
                <Link href={product.href} aria-label={`Explore ${product.title}`} className="absolute inset-0 z-30" />
            )}
            {/* PREVIOUS UI: bg-gradient-to-t (dark at the bottom, under the old bottom-aligned title) */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent z-10" />
            {/* PREVIOUS UI (STORM without fade-in, opacity 1, transform scale 2.2):
            <motion.div
                className="product-image-arrival absolute inset-0"
                variants={{ hidden: { opacity: isStorm && !reduceMotion ? 1 : 0, transform: reduceMotion ? "translate3d(0%, 0%, 0) scale(1) rotate(0deg)" : isStorm ? "translate3d(0%, 0%, 0) scale(2.2) rotate(0deg)" : isMantis ? "translate3d(0%, 0%, 0) scale(0.45) rotate(0deg)" : isFenix ? "translate3d(65%, 0%, 0) scale(1) rotate(0deg)" : "translate3d(0%, 65%, 0) scale(1) rotate(0deg)" }, shown: { opacity: 1, transform: "translate3d(0%, 0%, 0) scale(1) rotate(0deg)" } }}
                initial={hasArrival ? "hidden" : false}
                animate={cardInView ? "shown" : "hidden"}
                transition={{ duration: reduceMotion ? 0.2 : 1.15, delay: reduceMotion ? 0 : 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
                {image}
            </motion.div>
            */}
            <motion.div
                className="product-image-arrival absolute inset-0"
                variants={{ hidden: { opacity: 0, transform: reduceMotion ? "translate3d(0%, 0%, 0) scale(1) rotate(0deg)" : (isMantis || isStorm) ? "translate3d(0%, 0%, 0) scale(0.45) rotate(0deg)" : isFenix ? "translate3d(65%, 0%, 0) scale(1) rotate(0deg)" : "translate3d(0%, 65%, 0) scale(1) rotate(0deg)" }, shown: { opacity: 1, transform: "translate3d(0%, 0%, 0) scale(1) rotate(0deg)" } }}
                initial={hasArrival ? "hidden" : false}
                animate={cardInView ? "shown" : "hidden"}
                transition={{ duration: reduceMotion ? 0.2 : 1.15, delay: reduceMotion ? 0 : 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
                {image}
            </motion.div>
            <div className="relative z-20 p-8 lg:p-5 xl:p-6 2xl:p-8 h-full flex flex-col justify-between">
                {/* PREVIOUS UI: a flex-1 spacer above pushed this block to the bottom of the card (translate-y-3).
                    The title and description now sit at the top. */}
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-end gap-2 xl:gap-3">
                        {/* PREVIOUS UI: the heading also had `uppercase`, which forced "FENIx" back to "FENIX";
                            the other titles are already written in capitals */}
                        <h3 className="text-2xl lg:text-base xl:text-lg 2xl:text-2xl uw:text-3xl font-black text-white tracking-tighter truncate" style={{ fontFamily: PONTANO_SANS }}>
                            {product.title}
                        </h3>
                        {/* PREVIOUS UI (Learn More Button inside Product Card - Commented out):
                        <Link href="#" onClick={(e) => e.preventDefault()} className="shrink-0">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-4 py-1.5 rounded-none bg-[#111] border border-white/10 text-white/90 text-[10px] font-bold tracking-widest transition-all hover:bg-white hover:text-black hover:border-white"
                                style={{ fontFamily: PONTANO_SANS }}
                            >
                                Learn More
                                <ChevronRight className="w-3.5 h-3.5" />
                            </motion.button>
                        </Link>
                        */}
                    </div>
                    {/* PREVIOUS UI (Truncated description with line-clamp-1):
                    <p className="text-xs text-gray-500 font-medium line-clamp-1 h-4" style={{ fontFamily: PONTANO_SANS }}>
                        {product.description}
                    </p>
                    */}
                    <p className="min-h-[3.25em] lg:min-h-[4.875em] 2xl:min-h-[3.25em] text-xs text-gray-400 font-medium leading-relaxed" style={{ fontFamily: PONTANO_SANS }}>
                        {product.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

// --- Main Section Component ---

export default function ProductSection() {
    return (
        <section className="bg-black text-white relative overflow-hidden">
            {/* PREVIOUS UI (Standard container padding):
            <div className="max-w-7xl 2xl:max-w-[90rem] 3xl:max-w-[110rem] uw:max-w-[150rem] mx-auto px-6 pt-12 pb-24">
            */}
            <div className="home-product-stack max-w-7xl 2xl:max-w-[90rem] 3xl:max-w-[110rem] uw:max-w-[150rem] mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-16 sm:pb-24">

                <div className="home-product-screen">

                    {/* Header Section */}
                    {/* PREVIOUS UI (Standard header margin & font size):
                <div className="text-left mb-16 lg:-ml-2 3xl:ml-14">
                    <h1 className="text-4xl md:text-5xl lg:text-[4.375rem] 3xl:text-[4.375rem] uw:text-[4.375rem] font-bold tracking-tighter leading-[0.9] font-orbit text-white flex items-center gap-3">
                */}
                    <div className="text-left mb-8 sm:mb-16 lg:-ml-2 3xl:ml-14">
                        <h1 className="home-section-title text-3xl sm:text-4xl md:text-5xl lg:text-[4.375rem] 3xl:text-[4.375rem] uw:text-[4.375rem] font-bold tracking-tighter leading-[0.9] font-orbit text-white flex flex-wrap items-center gap-2 sm:gap-3">
                            <span className="font-normal">Powered by </span>
                            <span className="font-normal">
                                <MaverickStrobe />
                            </span>
                        </h1>
                    </div>

                    {/* Grid Layout - 4 columns in a row */}
                    {/* PREVIOUS UI (Standard grid bottom margin):
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
                */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 sm:mb-32">
                        {STATIC_PRODUCTS.map((product, index) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                index={index}
                            />
                        ))}
                    </div>
                </div>

                {/* PREVIOUS UI: a second "Powered by MAVERICK" block (bento grid of FENIx, T-BAT, TEAMING and STORM
                    feature cards) followed here. Removed on request; recover it from git history (HEAD before this change). */}
            </div>
        </section>
    );
}

