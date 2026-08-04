"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Timer, Satellite, Scan, BatteryCharging } from "lucide-react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

import CharacterReveal from "./CharacterReveal";

const PONTANO_SANS = "'Orbit', sans-serif";
const cn = (...classes: (string | boolean | undefined | null)[]) => classes.filter(Boolean).join(' ');

// --- Types ---
interface Product {
    id: number;
    tag: string;
    title: string;
    description: string;
    imageUrl: string;
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
        title: "FENIX",
        description: "Fast Entry Navigational Intrusion eXplorer",
        imageUrl: "/images/drone/fenix.png",
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
        imageUrl: "/images/drone/bat.png",
        isWide: false,
        // animationType: "float",
        glitchEffect: true,
        features: [],
        href: "/bat"
    },
    {
        id: 3,
        tag: "Outdoor Overwatch",
        title: "TEAMING",
        description: "Multi-Role Single Solution",
        imageUrl: "/images/drone/dexter.png",
        isWide: false,
        // animationType: "float",
        glitchEffect: false,
        features: [],
        href: "/dexter"
    },
    {
        id: 4,
        tag: "Crisis Communications",
        title: "STORM",
        description: "Smart Transport Operations for Rugged Missions",
        imageUrl: "/images/drone/storm.png",
        isWide: false,
        animationType: "pulse",
        glitchEffect: false,
        features: [],
        href: "/storm"
    }
];

// --- MaverickBlink Component ---
function MaverickBlink() {
    const ref = React.useRef<HTMLSpanElement>(null);
    const played = React.useRef(false);

    React.useEffect(() => {
        if (!ref.current) return;

        const el = ref.current;
        const chars = el.querySelectorAll<HTMLElement>(".char");
        if (chars.length === 0) return;

        // Start invisible
        chars.forEach(c => { c.style.opacity = "0"; });

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !played.current) {
                    played.current = true;
                    observer.disconnect();

                    // Run digital signal lock blink sequence with GSAP
                    gsap.to(chars, {
                        keyframes: [
                            { opacity: 1, color: "#5ce1e6", textShadow: "0 0 15px #5ce1e6", duration: 0.12, ease: "none" },
                            { opacity: 0, color: "#ffffff", textShadow: "none", duration: 0.08, ease: "none" },
                            { opacity: 1, color: "#5ce1e6", textShadow: "0 0 25px #5ce1e6", duration: 0.14, ease: "none" },
                            { opacity: 0, color: "#ffffff", textShadow: "none", duration: 0.07, ease: "none" },
                            { opacity: 1, color: "#5ce1e6", textShadow: "0 0 10px #5ce1e6", duration: 0.10, ease: "none" },
                            { opacity: 1, color: "#5ce1e6", textShadow: "none", duration: 0.30, ease: "power2.out" },
                        ],
                        stagger: { each: 0.06, from: "random" },
                        delay: 0.1,
                        overwrite: true,
                    });
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <span ref={ref} className="inline-flex whitespace-pre">
            {"MAVERICK".split("").map((char, i) => (
                <span key={i} className="char inline-block will-change-[opacity,color,filter]">
                    {char}
                </span>
            ))}
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
    const isWide = product.isWide;

    if (isWide) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className="col-span-1 md:col-span-2 relative group overflow-hidden rounded-none bg-black border border-white/20 transition-all duration-500 shadow-2xl shadow-[inset_0_0_30px_rgba(255,255,255,0.05)] hover:border-[#5ce1e6]/50"
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

    const isFenix = product.title === "FENIX";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            className={cn(
                /* PREVIOUS UI (vh-based card height - causes size difference between localhost and production):
                "group relative aspect-[2/3] lg:aspect-auto lg:h-[62vh] 3xl:h-[68vh] uw:h-[72vh] overflow-hidden rounded-none bg-black border border-white/20 hover:border-white/40 transition-all duration-500 shadow-[inset_0_0_30px_rgba(255,255,255,0.05)]",
                */
                "group relative aspect-[2/3] lg:aspect-auto lg:h-[480px] 3xl:h-[520px] uw:h-[560px] overflow-hidden rounded-none bg-black border border-white/20 hover:border-white/40 transition-all duration-500 shadow-[inset_0_0_30px_rgba(255,255,255,0.05)]",
                isFenix && "cursor-pointer hover:border-[#5ce1e6]/60"
            )}
        >
            {isFenix && (
                <Link href="/fenix" className="absolute inset-0 z-30" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <motion.img
                src={product.imageUrl}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                animate={product.animationType === 'float' ? { y: [0, -15, 0] } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative z-20 p-8 lg:p-5 xl:p-6 2xl:p-8 h-full flex flex-col justify-between">
                <div className="flex-1" />
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-end gap-2 xl:gap-3">
                        <h3 className="text-2xl lg:text-base xl:text-lg 2xl:text-2xl uw:text-3xl font-black text-white uppercase tracking-tighter truncate" style={{ fontFamily: PONTANO_SANS }}>
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
                    <p className="text-xs text-gray-400 font-medium leading-relaxed" style={{ fontFamily: PONTANO_SANS }}>
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
            <div className="max-w-7xl 2xl:max-w-[90rem] 3xl:max-w-[110rem] uw:max-w-[150rem] mx-auto px-6 3xl:px-4 uw:px-4 pt-12 pb-24">
            {/* PREVIOUS UI: px-6 at all breakpoints */}

                {/* Header Section */}
                <div className="text-left mb-16 lg:-ml-2 3xl:ml-14">
                    {/* PREVIOUS UI (Standard h1 static title):
                    <h1 className="text-4xl md:text-5xl lg:text-[4.375rem] 3xl:text-[4.375rem] uw:text-[4.375rem] font-bold tracking-tighter leading-[0.9] font-orbit">
                        Powered by <span style={{ color: '#5ce1e6' }}>MAVERICK</span>
                    </h1>
                    */}
                    <h1 className="text-4xl md:text-5xl lg:text-[4.375rem] 3xl:text-[4.375rem] uw:text-[4.375rem] font-bold tracking-tighter leading-[0.9] font-orbit text-white flex items-center gap-3">
                        <span>Powered by</span>
                        <span style={{ color: '#5ce1e6' }}>
                            <MaverickBlink />
                        </span>
                    </h1>
                </div>

                {/* Grid Layout - 4 columns in a row */}
                {/* PREVIOUS UI: gap-6 at all breakpoints */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 3xl:gap-3 uw:gap-3 mb-32">
                    {STATIC_PRODUCTS.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            index={index}
                        />
                    ))}
                </div>

                {/* Bento Grid Section */}
                <div className="w-full mt-32">
                    <div className="text-left mb-16 lg:-ml-2 3xl:ml-14">
                        {/* PREVIOUS UI (Whole title character reveal):
                        <CharacterReveal
                            text="Powered by MAVERICK"
                            cyanHighlight="MAVERICK"
                            className="text-4xl md:text-5xl lg:text-[4.375rem] 3xl:text-[4.375rem] uw:text-[4.375rem] font-bold tracking-tighter leading-[0.9] font-orbit text-white"
                            stagger={0.04}
                            triggerOnScroll={true}
                        />
                        */}
                        {/* PREVIOUS UI (CharacterReveal wrapper):
                        <CharacterReveal
                            text="MAVERICK"
                            className="text-[#5ce1e6]"
                            targetColor="#5ce1e6"
                            stagger={0.06}
                            triggerOnScroll={true}
                        />
                        */}
                        <h1 className="text-4xl md:text-5xl lg:text-[4.375rem] 3xl:text-[4.375rem] uw:text-[4.375rem] font-bold tracking-tighter leading-[0.9] font-orbit text-white flex items-center gap-3">
                            <span>Powered by</span>
                            <span style={{ color: '#5ce1e6' }}>
                                <MaverickBlink />
                            </span>
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

                        {/* ── FENIx — large left card ── */}
                        <div className="lg:col-span-7 bg-[#0d0d0d] border border-white/5 p-6 lg:p-8 uw:p-5 flex flex-col justify-between min-h-[420px] uw:min-h-[300px] relative group hover:border-[#5ce1e6]/40 transition-colors cursor-pointer">
                            <Link href="/fenix" className="absolute inset-0 z-30" />
                            {/* Card header */}
                            <div className="flex items-center justify-between mb-6 relative z-10">
                                <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] uppercase tracking-widest font-bold bg-white/5 border border-white/10 text-white/70">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                    Drone As First Responder
                                </span>
                                {/* PREVIOUS UI (Explore Button - Commented out):
                                <Link href="#" onClick={(e) => e.preventDefault()}>
                                    <button className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-white/50 hover:text-white transition-colors">
                                        Explore <ChevronRight className="w-3.5 h-3.5" />
                                    </button>
                                </Link>
                                */}
                            </div>

                            {/* Main content */}
                            <div className="flex flex-col md:flex-row items-center gap-6 flex-1">
                                {/* Acronym */}
                                <div className="shrink-0">
                                    <p className="text-3xl uw:text-3xl font-black tracking-tighter text-white font-orbit mb-3">FENIx</p>
                                    <div className="text-sm font-bold leading-relaxed">
                                        {[['F', 'ast'], ['E', 'ntry'], ['N', 'avigational'], ['I', 'ntrusion'], ['e', 'X', 'plorer']].map((parts, i) => (
                                            <div key={i}>
                                                {i < 4
                                                    ? <span><span style={{ color: '#5ce1e6' }}>{parts[0]}</span>{parts[1]}</span>
                                                    : <span>{parts[0]}<span style={{ color: '#5ce1e6' }}>{parts[1]}</span>{parts[2]}</span>
                                                }
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Image */}
                                <div className="flex-1 flex justify-center">
                                    <img src="/product/fenix.png" alt="FENIx Drone" className="w-full max-w-xs object-contain" />
                                </div>

                                {/* Specs 2×2 */}
                                <div className="shrink-0 w-full md:w-auto border border-white/10 bg-white/[0.02]">
                                    <div className="grid grid-cols-2 divide-x divide-y divide-white/10">
                                        {[
                                            { icon: <Timer className="w-4 h-4 text-cyan-400" />, title: "62 min", sub: "Flight Time" },
                                            { icon: <Satellite className="w-4 h-4 text-cyan-400" />, title: "Unlimited", sub: "Range (Starlink)" },
                                            { icon: <Scan className="w-4 h-4 text-cyan-400" />, title: "640x Zoom", sub: "64x HD Thermal" },
                                            { icon: <BatteryCharging className="w-4 h-4 text-cyan-400" />, title: "Robotic", sub: "Battery Swap" },
                                        ].map((f, i) => (
                                            <div key={i} className="flex flex-col gap-1.5 p-3 hover:bg-white/[0.04] transition-colors">
                                                <div className="w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10">{f.icon}</div>
                                                <p className="text-white text-[11px] font-bold leading-snug">{f.title}</p>
                                                <p className="text-gray-500 text-[10px]">{f.sub}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── T-BAT — right top card ── */}
                        <div className="lg:col-span-5 bg-[#0d0d0d] border border-white/5 p-6 uw:p-5 flex flex-col min-h-[420px] uw:min-h-[300px]">
                            {/* Card header */}
                            <div className="flex items-center justify-between mb-4">
                                <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] uppercase tracking-widest font-bold bg-white/5 border border-white/10 text-white/70">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                    Outdoor Tactical
                                </span>
                                {/* PREVIOUS UI (Explore Button - Commented out):
                                <Link href="#" onClick={(e) => e.preventDefault()}>
                                    <button className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-white/50 hover:text-white transition-colors">
                                        Explore <ChevronRight className="w-3.5 h-3.5" />
                                    </button>
                                </Link>
                                */}
                            </div>
                            <p className="text-2xl uw:text-2xl font-black tracking-tighter text-white font-orbit mb-1">T-BAT</p>
                            <p className="text-gray-500 text-xs mb-4">Battlefield Aerial Tactical UAS</p>

                            {/* Image */}
                            <div className="flex-1 flex items-center justify-center py-2">
                                <img src="/images/drone/bat.png" alt="T-BAT Drone" className="max-h-44 uw:max-h-44 object-contain" />
                            </div>
                            {/* su */}

                            {/* Specs row */}
                            <div className="grid grid-cols-2 gap-2 mt-4">
                                {[
                                    { label: "Low Acoustic", value: "Near-Silent" },
                                    { label: "AI Detection", value: "Object Track" },
                                    { label: "Solo Deploy", value: "1 Operator" },
                                    { label: "Payload", value: "Modular Swap" },
                                ].map((s, i) => (
                                    <div key={i} className="border border-white/10 bg-white/[0.02] px-3 py-2">
                                        <p className="text-white text-[11px] font-bold">{s.value}</p>
                                        <p className="text-gray-500 text-[10px] mt-0.5">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── TEAMING — bottom left card ── */}
                        <div className="lg:col-span-5 bg-[#0d0d0d] border border-white/5 p-6 uw:p-10 flex flex-col min-h-[380px] uw:min-h-[550px]">
                            {/* Card header */}
                            <div className="flex items-center justify-between mb-4">
                                <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] uppercase tracking-widest font-bold bg-white/5 border border-white/10 text-white/70">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                    Outdoor Overwatch
                                </span>
                                {/* PREVIOUS UI (Explore Button - Commented out):
                                <Link href="#" onClick={(e) => e.preventDefault()}>
                                    <button className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-white/50 hover:text-white transition-colors">
                                        Explore <ChevronRight className="w-3.5 h-3.5" />
                                    </button>
                                </Link>
                                */}
                            </div>
                            <p className="text-2xl uw:text-2xl font-black tracking-tighter text-white font-orbit mb-1">TEAMING</p>
                            <p className="text-gray-500 text-xs mb-4">Multi-Role Single Solution</p>

                            {/* Image */}
                            <div className="flex-1 flex items-center justify-center py-2">
                                <img src="/images/drone/dexter.png" alt="TEAMING Drone" className="max-h-40 uw:max-h-60 object-contain" />
                            </div>

                            {/* Specs row */}
                            <div className="grid grid-cols-2 gap-2 mt-4">
                                {[
                                    { label: "EO Zoom", value: "40x Optical" },
                                    { label: "Thermal", value: "640×480" },
                                    { label: "Mapping", value: "61MP Sensor" },
                                    { label: "Navigation", value: "Waypoint Auto" },
                                ].map((s, i) => (
                                    <div key={i} className="border border-white/10 bg-white/[0.02] px-3 py-2">
                                        <p className="text-white text-[11px] font-bold">{s.value}</p>
                                        <p className="text-gray-500 text-[10px] mt-0.5">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── STORM — large right card ── */}
                        <div className="lg:col-span-7 bg-[#0d0d0d] border border-white/5 p-6 lg:p-8 uw:p-12 flex flex-col min-h-[380px] uw:min-h-[550px]">
                            {/* Card header */}
                            <div className="flex items-center justify-between mb-4">
                                <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] uppercase tracking-widest font-bold bg-white/5 border border-white/10 text-white/70">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                    Crisis Communications
                                </span>
                                {/* PREVIOUS UI (Explore Button - Commented out):
                                <Link href="#" onClick={(e) => e.preventDefault()}>
                                    <button className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-white/50 hover:text-white transition-colors">
                                        Explore <ChevronRight className="w-3.5 h-3.5" />
                                    </button>
                                </Link>
                                */}
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-6 flex-1">
                                {/* Left — acronym + specs */}
                                <div className="shrink-0 flex flex-col gap-4">
                                    <div>
                                        <p className="text-2xl uw:text-2xl font-black tracking-tighter text-white font-orbit mb-1">STORM</p>
                                        <div className="text-sm font-bold leading-relaxed">
                                            {[['S', 'mart'], ['T', 'ransport'], ['O', 'perations'], ['R', 'ugged'], ['M', 'issions']].map(([h, rest], i) => (
                                                <div key={i}><span style={{ color: '#5ce1e6' }}>{h}</span>{rest}</div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Spec list */}
                                    <div className="flex flex-col divide-y divide-white/10 border border-white/10 bg-white/[0.02]">
                                        {[
                                            { label: "Endurance", value: "30+ mins" },
                                            { label: "Cruise Speed", value: "15 m/s" },
                                            { label: "Altitude", value: "500 m AGL" },
                                            { label: "Lift Capacity", value: "20–25 kg" },
                                            { label: "LOS Range", value: "15 km" },
                                        ].map((s, i) => (
                                            <div key={i} className="flex justify-between gap-8 px-3 py-1.5">
                                                <span className="text-gray-500 text-[10px]">{s.label}</span>
                                                <span className="text-white text-[11px] font-bold">{s.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Image */}
                                <div className="flex-1 flex justify-center items-center">
                                    <img src="/images/drone/storm.png" alt="STORM Drone" className="max-h-52 uw:max-h-72 w-full object-contain" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

