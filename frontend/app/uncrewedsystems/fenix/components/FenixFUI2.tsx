"use client"

import React, { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface MobileConfig {
    position: { top?: string; bottom?: string; left?: string; right?: string }
    width: number
    height?: number
    connectorStart: { x: number; y: number }
    connectorEnd: { x: number; y: number }
    controlPoint?: { x: number; y: number }
}

interface FeaturePoint {
    id: string
    title: string
    description: string | string[]
    position: { top?: string; bottom?: string; left?: string; right?: string }
    textAlign: "left" | "right"
    connectorStart: { x: number; y: number } // Point near text
    connectorEnd: { x: number; y: number }   // Point on drone
    controlPoint?: { x: number; y: number }  // For curved lines
    // Mobile-specific configuration (manually adjustable)
    mobileConfig?: MobileConfig
}

const FeatureBox = ({
    feature,
    index,
    isActive,
    setActiveId,
    isMobile
}: {
    feature: FeaturePoint;
    index: number;
    isActive: boolean;
    setActiveId: (id: string | null) => void;
    isMobile: boolean;
}) => {
    // Use mobile config if available and on mobile, otherwise use desktop config
    const config = isMobile && feature.mobileConfig ? feature.mobileConfig : {
        position: feature.position,
        width: 320,
        height: undefined
    };

    const handleInteraction = () => {
        if (isMobile) {
            // On mobile, toggle the card
            setActiveId(isActive ? null : feature.id);
        }
    };

    return (
        <motion.div
            className="absolute z-30 pointer-events-auto"
            style={{
                ...config.position,
                transformOrigin: feature.textAlign === "left" ? "top left" : "top right",
                right: feature.textAlign === "right" ? config.position.right : undefined,
                left: feature.textAlign === "left" ? config.position.left : undefined,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 0.8,
                pointerEvents: isActive ? "auto" : "none"
            }}
            transition={{ duration: 0.3 }}
            onMouseEnter={() => !isMobile && setActiveId(feature.id)}
            onMouseLeave={() => !isMobile && setActiveId(null)}
        >
            <motion.div
                layout
                className={`bg-white border-2 border-[#5ce1e6] overflow-hidden shadow-2xl relative z-50`}
                style={{
                    borderRadius: 0,
                    width: config.width,
                    height: config.height || "auto",
                }}
            >
                <div className={`${isMobile ? 'p-1.5' : 'p-6'} min-w-0 md:min-w-[320px]`}>
                    <div className="flex items-center justify-between mb-0.5 md:mb-2">
                        <h3 className={`${isMobile ? 'text-[8px]' : 'text-xl'} font-bold tracking-tight uppercase leading-tight`} style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif", fontWeight: 700 }}>
                            {feature.title}
                        </h3>
                        <span className={`${isMobile ? 'text-[6px]' : 'text-xs'} font-mono text-neutral-400 ml-1`}>
                            {String(index + 1).padStart(2, '0')}
                        </span>
                    </div>

                    <div className={`w-full ${isMobile ? 'h-[0.5px]' : 'h-[2px]'} bg-[#5ce1e6] ${isMobile ? 'mb-1' : 'mb-4'}`} />

                    {Array.isArray(feature.description) ? (
                        <div className={`flex flex-col ${isMobile ? 'gap-0 md:gap-2' : 'gap-2'}`}>
                            {feature.description.map((line, idx) => (
                                <p key={idx} className={`${isMobile ? 'text-[6px]' : 'text-sm'} text-neutral-600 leading-tight line-clamp-2`}>
                                    {line}
                                </p>
                            ))}
                        </div>
                    ) : (
                        <p className={`${isMobile ? 'text-[6px]' : 'text-sm'} text-neutral-600 leading-tight ${isMobile ? 'line-clamp-3' : 'line-clamp-4'}`}>
                            {feature.description}
                        </p>
                    )}
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function FenixFUI2(): React.JSX.Element {
    const containerRef = useRef<HTMLDivElement>(null)
    const [activeId, setActiveId] = useState<string | null>(null)
    const [isMobile, setIsMobile] = useState(false)

    // Detect mobile view
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768) // Adjust breakpoint as needed
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const features: FeaturePoint[] = [
        {
            id: "edge-compute",
            title: "EDGE Compute",
            description: "State of the art companion computer running customized AI & ML algorithms, integrated with the autopilot with active cooling system",
            position: { top: "25.5%", right: "76.7%" },
            textAlign: "right",
            connectorStart: { x: 250, y: 220 },
            connectorEnd: { x: 550, y: 390 },
            controlPoint: { x: 250, y: 390 },
            // MOBILE CONFIG - Adjust these values manually for mobile view
            mobileConfig: {
                position: { top: "30.4%", right: "67%" }, // Card position on mobile
                width: 100, // Card width on mobile
                height: 100, // Auto height, or set specific value
                connectorStart: { x: 240, y: 90 },
                connectorEnd: { x: 567, y: 377 },
                controlPoint: { x: 240, y: 377 }
            }
        },
        {
            id: "propulsion",
            title: "Propulsion",
            description: [
                "Highly Efficient",
                "Custom made motors"
            ],
            position: { top: "20.5%", left: "61.7%" },
            textAlign: "left",
            connectorStart: { x: 750, y: 180 },
            connectorEnd: { x: 420, y: 312 },
            controlPoint: { x: 420, y: 180 },
            // MOBILE CONFIG - Adjust these values manually for mobile view
            mobileConfig: {
                position: { top: "29%", left: "51.4%" },
                width: 100,
                height: 100,
                connectorStart: { x: 600, y: -100 },
                connectorEnd: { x: 370, y: 300 },
                controlPoint: { x: 370, y: -100 }
            }
        },
        {
            id: "collision",
            title: "Collision Resistance",
            description: "Airframe - carbon reinforced aerospace grade nylon",
            position: { top: "33%", left: "81.7%" },
            textAlign: "left",
            connectorStart: { x: 1020, y: 280 },
            connectorEnd: { x: 995, y: 360 },
            controlPoint: { x: 995, y: 280 },
            // MOBILE CONFIG - Adjust these values manually for mobile view
            mobileConfig: {
                position: { top: "31%", left: "45.5%" },
                width: 100,
                height: 100,
                connectorStart: { x: 850, y: -50 },
                connectorEnd: { x: 1080, y: 350 },
                controlPoint: { x: 1080, y: -50 }
            }
        },
        {
            id: "payload",
            title: "Payload",
            description: [
                "High Resolution Camera",
                "Thermal Camera",
                "Equipped with LEDs for operations in low light"
            ],
            position: { bottom: "25.6%", right: "83.3%" },
            textAlign: "right",
            connectorStart: { x: 160, y: 580 },
            connectorEnd: { x: 440, y: 520 },
            controlPoint: { x: 440, y: 580 },
            // MOBILE CONFIG - Adjust these values manually for mobile view
            mobileConfig: {
                position: { top: "62%", right: "29%" },
                width: 100,
                height: 100,
                connectorStart: { x: 550, y: 920 },
                connectorEnd: { x: 406, y: 552 },
                controlPoint: { x: 406, y: 920 }
            }
        },
        {
            id: "sensor",
            title: "Sensor Suite",
            description: "Fusion of visual, inertial and lasers",
            position: { bottom: "23%", left: "80.3%" },
            textAlign: "left",
            connectorStart: { x: 1000, y: 600 },
            connectorEnd: { x: 500, y: 540 },
            controlPoint: { x: 500, y: 600 },
            // MOBILE CONFIG - Adjust these values manually for mobile view
            mobileConfig: {
                position: { top: "61%", left: "55%" },
                width: 100,
                height: 100,
                connectorStart: { x: 650, y: 890 },
                connectorEnd: { x: 470, y: 570 },
                controlPoint: { x: 470, y: 890 }
            }
        }
    ]

    return (
        <div ref={containerRef} className="relative w-full min-h-[120vh] bg-white text-black overflow-hidden font-sans flex flex-col items-center">

            {/* Header Title */}
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative z-40 text-3xl md:text-5xl lg:text-5xl font-bold tracking-[0.1em] text-center mt-12 md:mt-20 mb-8 px-4"
                style={{ maxWidth: "100%", fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif", fontWeight: 700 }}
            >
                <span className="text-[#5ce1e6]">F</span>AST <span className="text-[#5ce1e6]">E</span>NTRY <span className="text-[#5ce1e6]">N</span>AVIGATIONAL <span className="text-[#5ce1e6]">I</span>NTRUSION E<span className="text-[#5ce1e6]">X</span>PLORER
            </motion.h2>

            {/* Background Drone Image */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="w-full max-w-6xl relative z-10"
                >
                    <img
                        src="/images/Fenix/parts.png"
                        alt="Fenix Drone"
                        className="w-full h-auto object-contain drop-shadow-2xl"
                    />
                </motion.div>
            </div>

            {/* SVG Connectors Container */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-20"
                viewBox="0 0 1200 800"
                preserveAspectRatio="xMidYMid meet"
            >
                {features.map((feature, i) => {
                    // Use mobile config connectors if on mobile, otherwise use desktop
                    const config = isMobile && feature.mobileConfig ? feature.mobileConfig : feature;
                    const { connectorStart, connectorEnd, controlPoint } = config;
                    const isActive = activeId === feature.id;

                    // Reversed D path to draw from drone to box
                    let d = "";
                    if (controlPoint) {
                        d = `M ${connectorEnd.x} ${connectorEnd.y} L ${controlPoint.x} ${controlPoint.y} L ${connectorStart.x} ${connectorStart.y}`;
                    } else {
                        d = `M ${connectorEnd.x} ${connectorEnd.y} L ${connectorStart.x} ${connectorStart.y}`;
                    }

                    return (
                        <g key={feature.id} className="pointer-events-auto">
                            {/* Animated Line */}
                            <motion.path
                                d={d}
                                stroke="#5ce1e6"
                                strokeWidth="1.5"
                                strokeDasharray="4 4"
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{
                                    pathLength: isActive ? 1 : 0,
                                    opacity: isActive ? 1 : 0
                                }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            />

                            {/* Continuous Ripple Layer 1 */}
                            <motion.circle
                                cx={connectorEnd.x}
                                cy={connectorEnd.y}
                                r={isMobile ? "20" : "8"}
                                stroke="#5ce1e6"
                                strokeWidth="0.5"
                                fill="none"
                                initial={{ scale: 1, opacity: 0.5 }}
                                animate={{ scale: 2.5, opacity: 0 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                            />
                            {/* Continuous Ripple Layer 2 */}
                            <motion.circle
                                cx={connectorEnd.x}
                                cy={connectorEnd.y}
                                r={isMobile ? "20" : "8"}
                                stroke="#5ce1e6"
                                strokeWidth="0.5"
                                fill="none"
                                initial={{ scale: 1, opacity: 0.3 }}
                                animate={{ scale: 4, opacity: 0 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
                            />

                            {/* Outer Ring */}
                            <circle
                                cx={connectorEnd.x}
                                cy={connectorEnd.y}
                                r={isMobile ? "16" : "8"}
                                fill="none"
                                stroke="#5ce1e6"
                                strokeWidth="1"
                                className="opacity-60"
                            />
                            {/* Inner Dot */}
                            <circle
                                cx={connectorEnd.x}
                                cy={connectorEnd.y}
                                r={isMobile ? "8" : "3"}
                                fill="#5ce1e6"
                                className="cursor-pointer"
                                onMouseEnter={() => !isMobile && setActiveId(feature.id)}
                                onMouseLeave={() => !isMobile && setActiveId(null)}
                                onClick={() => isMobile && setActiveId(isActive ? null : feature.id)}
                            />

                            {/* Hover Expansion Pulse for Dot (More intense on hover) */}
                            {isActive && (
                                <motion.circle
                                    cx={connectorEnd.x}
                                    cy={connectorEnd.y}
                                    r={isMobile ? "20" : "10"}
                                    stroke="#5ce1e6"
                                    strokeWidth="1.5"
                                    fill="none"
                                    initial={{ scale: 0.8, opacity: 1 }}
                                    animate={{ scale: 2.2, opacity: 0 }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                />
                            )}

                            {/* Transparent Hit Area for Dot */}
                            <circle
                                cx={connectorEnd.x}
                                cy={connectorEnd.y}
                                r={isMobile ? "45" : "20"}
                                fill="transparent"
                                className="cursor-pointer"
                                onMouseEnter={() => !isMobile && setActiveId(feature.id)}
                                onMouseLeave={() => !isMobile && setActiveId(null)}
                                onClick={() => isMobile && setActiveId(isActive ? null : feature.id)}
                            />

                            {/* Box Point (End of line) */}
                            <motion.circle
                                cx={connectorStart.x}
                                cy={connectorStart.y}
                                r="4"
                                fill="#5ce1e6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isActive ? 1 : 0 }}
                            />
                        </g>
                    )
                })}
            </svg>

            {/* Interactive Feature Boxes */}
            <div className="absolute inset-0 z-30 pointer-events-none">
                {features.map((feature, i) => (
                    <FeatureBox
                        key={feature.id}
                        feature={feature}
                        index={i}
                        isActive={activeId === feature.id}
                        setActiveId={setActiveId}
                        isMobile={isMobile}
                    />
                ))}
            </div>

        </div>
    )
}
