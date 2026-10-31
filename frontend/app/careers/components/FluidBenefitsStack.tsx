"use client"
import React from "react"
import { motion } from "framer-motion"

const leftColumn = [
    { id: "01", text: "EXCELLENT MEDICAL COVERAGE" },
    { id: "03", text: "UNLIMITED SNACKS AND BEVERAGES" },
    { id: "05", text: "FLEXIBLE WORK HOURS" },
    { id: "07", text: "FREE PARKING" },
    { id: "09", text: "401K SERVICES AND MATCH" },
]

const rightColumn = [
    { id: "02", text: "RELAXED DRESS CODE" },
    { id: "04", text: "GOOD AQI" },
    { id: "06", text: "GYM DISCOUNT (SD) / ONSITE GYM (DC)" },
    { id: "08", text: "COMPETITIVE COMPENSATION" },
    { id: "10", text: "STOCK BENEFITS" },
]

function BenefitRow({ id, text, delay }: { id: string; text: string; delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className="border-t border-black/25 pt-3 pb-5"
        >
            <span
                className="careers-label text-neutral-700 uppercase"
                style={{ fontFamily: "var(--font-orbit, 'Orbit', monospace)" }}
            >
                {id}&nbsp;/&nbsp;&nbsp;{text}
            </span>
        </motion.div>
    )
}

export default function FluidBenefitsStack() {
    return (
        <section id="benefits" className="min-h-[100svh] flex flex-col justify-center bg-white pt-16 pb-48 md:pt-28 md:pb-28 lg:pt-40 lg:pb-40 overflow-hidden">

            {/* Title — original left edge position */}
            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="careers-section-title px-12 md:px-20 text-neutral-900 mb-12 md:mb-16 lg:mb-20"
            >
                Benefits
            </motion.h2>

            {/* Two-column grid — aligned with title left edge */}
            <div className="px-12 md:px-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 md:gap-x-40 lg:gap-x-56">
                    {[...leftColumn, ...rightColumn]
                        .sort((a, b) => Number(a.id) - Number(b.id))
                        .map((item, i) => (
                            <BenefitRow key={item.id} id={item.id} text={item.text} delay={i * 0.03} />
                        ))}
                </div>
            </div>

        </section>
    )
}
