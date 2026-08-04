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
        <div className="py-20 bg-white w-full font-orbit">
            <div className="pl-12 md:pl-16 lg:pl-20 mb-12">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl md:text-4xl lg:text-[3.5rem] xl:text-[4rem] font-semibold tracking-[0.05em] text-black mb-6 uppercase"
                    style={{ lineHeight: 0.9 }}
                >
                    OPERATIONS LOCATION
                </motion.h2>
                <div className="text-[10px] md:text-xs lg:text-[1.1rem] text-neutral-500 max-w-6xl text-justify">
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

            <div className="pl-40 md:pl-52 lg:pl-44 pr-12 md:pr-20 lg:pr-28">
                <div className="max-w-6xl" style={{ height: '720px' }}>
                    <WorldMap
                        lineColor="#00A3CC"
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
        </div>
    );
}
