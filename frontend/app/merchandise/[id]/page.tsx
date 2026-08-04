"use client"

import React, { useState } from "react"
import PageWrapper from "@/components/PageWrapper"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { allProducts } from "../data"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params)
    const product = allProducts.find((p) => p.id === id)
    const [selectedSize, setSelectedSize] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<"details" | "size">("details")
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0)
    const [activeImage, setActiveImage] = useState(0)

    if (!product) {
        return (
            <PageWrapper>
                <div className="min-h-screen flex items-center justify-center bg-white">
                    <div className="text-center">
                        <p className="font-orbit text-sm text-black/30 tracking-widest uppercase mb-4">// Product not found</p>
                        <button 
                            onClick={() => window.history.back()}
                            className="font-orbit text-xs tracking-widest uppercase text-[#5ce1e6] hover:underline"
                        >
                            ← Return to collection
                        </button>
                    </div>
                </div>
            </PageWrapper>
        )
    }

    const getStatusColor = (status: string) => {
        if (status === "LIMITED") return { dot: "bg-[#d97706]", text: "text-[#d97706]" }
        if (status === "CLASSIFIED") return { dot: "bg-[#d90429]", text: "text-[#d90429]" }
        if (status === "IN STOCK") return { dot: "bg-[#16a34a]", text: "text-[#16a34a]" }
        if (status === "DEPLOYED") return { dot: "bg-[#2563eb]", text: "text-[#2563eb]" }
        return { dot: "bg-[#086972]", text: "text-black/60" }
    }

    const colors = getStatusColor(product.status)

    const currentImages = product.variants ? product.variants[selectedVariantIndex].images : product.images
    const currentColor = product.variants ? product.variants[selectedVariantIndex].color : product.color

    return (
        <PageWrapper hasHero={true}>
            <div className="min-h-screen bg-white text-black font-clash pt-20">

                {/* ── TOP NAV BAR ── */}
                <div className="border-b border-black/5 px-10 py-4 flex items-center justify-between">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 font-orbit text-[9px] tracking-[0.25em] uppercase text-black/40 hover:text-black transition-colors"
                    >
                        <ArrowLeft size={12} />
                        Back to Collection
                    </button>
                    <span className="font-orbit text-[8px] tracking-[0.2em] text-black/20 uppercase">
                        Serial: {product.serial}
                    </span>
                </div>

                {/* ── MAIN PRODUCT LAYOUT ── */}
                <div className="max-w-7xl mx-auto px-10 pt-12 pb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                        {/* ── LEFT: DETAILS ── */}
                        <div className="flex flex-col gap-8">

                            {/* Status Badge */}
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-sm ${colors.dot}`} />
                                <span className={`font-orbit text-[9px] tracking-[0.25em] uppercase ${colors.text}`}>
                                    Status: {product.status}
                                </span>
                            </div>

                            {/* Title */}
                            <div>
                                <h1 className="font-orbit text-4xl md:text-5xl font-bold text-black leading-tight uppercase tracking-tight">
                                    {product.title}
                                </h1>
                                <p className="font-orbit text-[11px] tracking-[0.2em] text-black/30 uppercase mt-3">
                                    {product.subtitle}
                                </p>
                            </div>

                            {/* Description Bullets */}
                            <ul className="flex flex-col gap-2">
                                {product.description.map((line, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#5ce1e6] shrink-0" />
                                        <span className="font-orbit text-[12px] tracking-wide text-black/70">{line}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Color Swatch */}
                            <div>
                                <span className="font-orbit text-[9px] tracking-[0.2em] uppercase text-black/40 mb-3 block">Color</span>
                                <div className="flex gap-3">
                                    {product.variants ? (
                                        product.variants.map((variant, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    setSelectedVariantIndex(idx)
                                                    setActiveImage(0)
                                                }}
                                                className={`w-8 h-8 rounded-sm border-2 transition-all duration-200
                                                    ${selectedVariantIndex === idx ? "border-black scale-110 shadow-md" : "border-black/10 hover:border-black/30"}`}
                                                style={{ backgroundColor: variant.color }}
                                            />
                                        ))
                                    ) : (
                                        <div
                                            className="w-8 h-8 rounded-sm border-2 border-black/80 shadow-sm"
                                            style={{ backgroundColor: product.color }}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Size Selector */}
                            {product.sizes && (
                                <div>
                                    <span className="font-orbit text-[9px] tracking-[0.2em] uppercase text-black/40 mb-3 block">Size</span>
                                    <div className="flex flex-wrap gap-2">
                                        {product.sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`px-4 py-2 border font-orbit text-[9px] tracking-[0.15em] uppercase transition-all duration-200
                                                    ${selectedSize === size
                                                        ? "border-black bg-black text-white"
                                                        : "border-black/20 text-black/50 hover:border-black hover:text-black"
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Tabs: Product Details / Size Chart */}
                            <div>
                                <div className="flex gap-8 border-b border-black/10 mb-6">
                                    {(["details", "size"] as const).map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`font-orbit text-[10px] tracking-[0.2em] uppercase pb-3 relative transition-colors
                                                ${activeTab === tab ? "text-black" : "text-black/30 hover:text-black"}`}
                                        >
                                            {tab === "details" ? "Product Details" : "Size Chart"}
                                            {activeTab === tab && (
                                                <span className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-black" />
                                            )}
                                        </button>
                                    ))}
                                </div>

                                {activeTab === "details" && (
                                    <ul className="flex flex-col gap-2">
                                        {product.details.map((line, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <span className="mt-1.5 w-1 h-1 rounded-full bg-black/30 shrink-0" />
                                                <span className="font-orbit text-[11px] tracking-wide text-black/60">{line}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {activeTab === "size" && (
                                    <div className="font-orbit text-[11px] text-black/40 tracking-widest uppercase">
                                        // Size chart coming soon
                                    </div>
                                )}
                            </div>

                            {/* Price + CTA */}
                            <div className="flex items-center justify-between pt-6 border-t border-black/5">
                                <div>
                                    <span className="font-orbit text-[9px] tracking-[0.2em] text-black/30 uppercase block mb-1">Unit Value</span>
                                    <span className="font-orbit text-3xl font-bold text-black tracking-tight">${product.price}</span>
                                </div>
                                <button className="px-10 py-4 bg-[#5ce1e6] text-black font-orbit text-[10px] tracking-[0.25em] uppercase hover:bg-[#3bcdd2] transition-all duration-300">
                                    {product.action}
                                </button>
                            </div>
                        </div>

                        {/* ── RIGHT: IMAGE ── */}
                        <div className="flex flex-col gap-4">
                            {/* Main Image with Zoom Effect */}
                            <div 
                                className="relative aspect-square w-full bg-[#f7f7f7] border border-black/5 overflow-hidden cursor-zoom-in"
                                onMouseMove={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                                    e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                                    e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
                                }}
                            >
                                <div className="w-full h-full relative group transition-transform duration-300 ease-out hover:scale-[2.5]" 
                                     style={{ transformOrigin: 'var(--mouse-x) var(--mouse-y)' }}>
                                    <Image
                                        src={currentImages[activeImage]}
                                        alt={product.title}
                                        fill
                                        className="object-cover p-6"
                                        priority
                                    />
                                </div>
                                {/* Serial watermark */}
                                <div className="absolute bottom-4 left-4 flex items-center gap-2 pointer-events-none">
                                    <div className="w-1 h-1 bg-black/20" />
                                    <span className="font-orbit text-[7px] tracking-[0.2em] text-black/20 uppercase">{product.serial}</span>
                                </div>
                            </div>

                            {/* Thumbnail Strip - Always show 4 slots */}
                            <div className="flex gap-3">
                                {[...Array(Math.max(4, currentImages.length))].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => i < currentImages.length && setActiveImage(i)}
                                        disabled={i >= currentImages.length}
                                        className={`relative w-20 h-20 border transition-all duration-200 overflow-hidden shrink-0
                                            ${i < currentImages.length
                                                ? activeImage === i ? "border-black" : "border-black/10 hover:border-black/30"
                                                : "border-black/[0.05] bg-black/[0.02]"
                                            }`}
                                    >
                                        {i < currentImages.length ? (
                                            <Image src={currentImages[i]} alt={`${product.title} view ${i + 1}`} fill className="object-cover p-1" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <div className="w-1 h-1 bg-black/5 rounded-full" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </PageWrapper>
    )
}
