"use client";
import { WorldMap } from "@/components/ui/map";
import { motion } from "framer-motion";

// ─── Tooltip Connector Tuning & Positioning ──────────────────────────────────
const TOOLTIP_LINE_UP = 40;      // rises UP from the right elbow
const TOOLTIP_LINE_RIGHT = 70;   // extends RIGHT from the dot
const TOOLTIP_CARD_WIDTH = 90;   // width of the info card
const TOOLTIP_CARD_HEIGHT = 110; // height of the info card
const TOOLTIP_CARD_OFFSET_X = -40; // shifts card relative to elbow
const TOOLTIP_CARD_OFFSET_Y = -115; // vertical offset (usually -HEIGHT/2 to center)

const BENGALURU_LAT = -2.9716;
const BENGALURU_LNG = 81.5946;
// ─────────────────────────────────────────────────────────────────────────────

export default function OperationsLocation() {
    return (
        // PREVIOUS UI: py-20 plus a fixed 720px map and oversized left inset exceeded one viewport.
        <section aria-labelledby="operations-location-title" className="h-svh min-h-0 overflow-hidden bg-white w-full font-orbit flex flex-col px-6 md:px-12 lg:px-20 pt-[max(80px,10svh)] pb-6">
            <div className="shrink-0 mb-4 md:mb-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    id="operations-location-title"
                    className="text-[clamp(24px,3.5vw,64px)] font-semibold tracking-[0.05em] text-black mb-4 uppercase leading-tight"
                >
                    OPERATIONS LOCATION
                </motion.h2>
                <div className="text-[12px] md:text-[14px] lg:text-[16px] leading-relaxed text-neutral-500 max-w-6xl text-justify">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Headquartered in the heart of India&apos;s aerospace hub, our Bengaluru facility serves as the nerve center for
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mt-2"
                    >
                        innovation, design, and manufacturing of advanced autonomous systems.
                    </motion.p>
                </div>
            </div>

            {/* PREVIOUS UI: Map used pl-40/md:pl-52 and a fixed height of 720px. */}
            <div className="flex-1 min-h-0 w-full flex items-center justify-center">
                <div className="w-full h-full min-h-0 [&>div]:h-full [&>div]:aspect-auto [&>div>img]:object-contain">
                    <WorldMap
                        lineColor="#5ce1e6"
                        showLabels={false}
                        tooltipLineUp={TOOLTIP_LINE_UP}
                        tooltipLineRight={TOOLTIP_LINE_RIGHT}
                        tooltipCardWidth={TOOLTIP_CARD_WIDTH}
                        tooltipCardHeight={TOOLTIP_CARD_HEIGHT}
                        tooltipCardOffsetX={TOOLTIP_CARD_OFFSET_X}
                        tooltipCardOffsetY={TOOLTIP_CARD_OFFSET_Y}
                        dots={[
                            {
                                start: {
                                    lat: BENGALURU_LAT,
                                    lng: BENGALURU_LNG,
                                    label: "Bengaluru, India"
                                },
                                end: {
                                    lat: BENGALURU_LAT,
                                    lng: BENGALURU_LNG,
                                    label: "Bengaluru, India"
                                },
                            },
                        ]}
                    />
                </div>
            </div>
        </section>
    );
}
