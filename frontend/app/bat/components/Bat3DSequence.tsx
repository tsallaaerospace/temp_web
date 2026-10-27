"use client";

import React, { useState, useEffect, useRef, Suspense, useLayoutEffect } from "react";
import { motion, AnimatePresence, animate, useMotionValue, useTransform } from "framer-motion";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// One fixed top-down camera frames every phase. PREVIOUS UI: phases 3-7 each had their own camera
// (e.g. phase 4 [4.73, 1.62, 0.05], phase 6 [-0.3, 0.02, 4.79]) and the camera swung while the drone
// rotated, compounding into tumbles. Each phase's drone rotation below is its old pose re-expressed so
// it looks the same from this camera, which turns every transition into one clean single-axis rotation.
const PHASE_CAMERA = { position: [0, 4.96, 0.65], rotation: [-82.5, 0, 0], fov: 45 };

// Define the 7 phases for manual adjustment
const DESKTOP_PHASES = [
    {
        id: 1,
        /* PREVIOUS UI:
        title: "LRV TRANSITIONS TO VERTICAL POSITION",
        subtitle: "Preparing for initial separation sequence",
        */
        title: "VERTICAL TAKEOFF AND LANDING",
        subtitle: "Preparation for launch sequence",
        drone: {
            x: 20, y: 77.7, rotateX: 0, rotateY: 90, rotateZ: 0, size: 990,
            cardX: 2.5, cardY: 64.8,
            ghostOpacity: 0.25,
            lineStartX: 10.2, lineStartY: 84.5,
            lineMidX: 2.5, lineMidY: 84.5,
            lineEndX: 2.5, lineEndY: 72.1
        },
        camera: PHASE_CAMERA
    },
    {
        id: 2,
        /* PREVIOUS UI:
        title: "LRV LAUNCHES BAT STRAIGHT UP",
        */
        title: "PRESET ALTITUDE",
        subtitle: "Vertical ascent phase initiated",
        drone: {
            x: 20, y: 42, rotateX: 0, rotateY: 90, rotateZ: 0, size: 990,
            cardX: 2.5, cardY: 27.5,
            ghostOpacity: 0.25,
            lineStartX: 10.2, lineStartY: 47.2,
            lineMidX: 2.5, lineMidY: 47.2,
            lineEndX: 2.5, lineEndY: 34.8,
            pathStartX: 20, pathStartY: 76,
            pathMidX: 20, pathMidY: 76,
            pathEndX: 20, pathEndY: 56.7,
            pathOpacity: 0.8,
            // pathCurve: 0
        },
        camera: PHASE_CAMERA
    },
    {
        id: 3,
        /* PREVIOUS UI:
        title: "BAT TRANSITIONS TO HORIZONTAL POSITION",
        */
        title: "TRANSITION TO HORIZONTAL POSITION",
        subtitle: "Level flight configuration engaged",
        drone: {
            // x: 22, y: 18, rotateX: 0, rotateY: 90, rotateZ: 0, size: 990,
            // PREVIOUS UI: rotateX 0 here, switched to 90 at runtime while the camera swung to a side view.
            // This pose is that same side-on picture seen from the Phase 1-2 top camera: a single 87 degree
            // roll about the fuselage from Phase 2, so the drone tips over to its left with the camera still.
            // PREVIOUS UI: x 23.6 sat the side-on drone (and its shadow) slightly left of where the dashed curve starts
            x: 24.2, y: 19, rotateX: -86.43, rotateY: 3.45, rotateZ: 90, size: 990,


            //   x: 23, y: 20, rotateX: 0, rotateY: 90, rotateZ: 0, size: 990,


            cardX: 20, cardY: 6.9, cardAlign: "right",
            ghostOpacity: 0.25,
            lineStartX: 19.5, lineStartY: 17.6,
            lineMidX: 19.5, lineMidY: 15.6,
            lineEndX: 19.5, lineEndY: 13.6,
            pathStartX: 20, pathStartY: 41,
            pathEndX: 19.9, pathEndY: 28,
            pathOpacity: 0.8
        },
        camera: PHASE_CAMERA
    },
    {
        id: 4,
        /* PREVIOUS UI:
        title: "CRUISE SPEED OPTIMIZATION",
        title: "CURVE/LOITER MODE",
        */
        title: "CRUISE/LOITER MODE",
        subtitle: "Adjusting for maximum aerodynamic efficiency",
        drone: {
            x: 52, y: 18, rotateX: -63.63, rotateY: 0.61, rotateZ: 0, size: 990, // PREVIOUS: rotateX 0, rotateY 90, rotateZ 0
            // PREVIOUS UI: flew a straight line from Phase 3. It now arcs up through this control point,
            // following the dashed flight path's climb-and-turn.
            via: { x: 27, y: 7 },
            cardX: 40, cardY: 2.8, cardAlign: "right",
            ghostOpacity: 0.25,
            lineStartX: 42.8, lineStartY: 5.6,
            lineMidX: 42, lineMidY: 5.6,
            lineEndX: 40.8, lineEndY: 5.6,
            pathStartX: 21, pathStartY: 21.4,
            pathMidX: 24, pathMidY: 11,
            pathEndX: 45.2, pathEndY: 11.4,
            pathCurve: 0.55,
            pathOpacity: 0.8
        },
        camera: PHASE_CAMERA
    },
    {
        id: 5,
        title: "DECELERATES AND TRANSITIONS TO VERTICAL FLIGHT",
        /* PREVIOUS UI:
        subtitle: "Re-entry and landing preparation",
        */
        subtitle: "Reverse transition and landing preparation",
        drone: {
            // PREVIOUS UI: x 83 left the side-on drone (and its shadow) off the right-hand dashed path
            // PREVIOUS UI: x 86.7 left the side-on drone and its shadow about 1% left of the descent line
            x: 87.2, y: 5, rotateX: -78.23, rotateY: 2.28, rotateZ: 90, size: 990, // PREVIOUS: rotateX 90, rotateY 90, rotateZ 0
            cardX: 78.2, cardY: 2.8, cardAlign: "right",
            ghostOpacity: 0.25,
            lineStartX: 81, lineStartY: 11,
            lineMidX: 79, lineMidY: 11,
            lineEndX: 79, lineEndY: 6.4,
            pathStartX: 52.7, pathStartY: 11.4,
            pathEndX: 75.9, pathEndY: 11.4,
            pathOpacity: 0.8
        },
        camera: PHASE_CAMERA
    },
    {
        id: 6,
        /* PREVIOUS UI:
        title: "MAINTAINS CONTROLLED DESCENT",
        */
        title: "CONTROLLED DESCENT",
        /* PREVIOUS UI:
        subtitle: "Toward flight deck target landing zone",
        */
        subtitle: "Towards target landing zone",
        drone: {
            // PREVIOUS UI: x 83; nudged left so the right wing clears the callout line
            x: 82.7, y: 41, rotateX: 97.7, rotateY: 86.42, rotateZ: -90, size: 990, // PREVIOUS: rotateX 90, rotateY 90, rotateZ 0
            cardX: 97.5, cardY: 27.5, cardAlign: "right",
            ghostOpacity: 0.25,
            lineStartX: 91.5, lineStartY: 47,
            lineMidX: 97.5, lineMidY: 47,
            lineEndX: 97.5, lineEndY: 38.2,
            pathStartX: 83, pathStartY: 17.8,
            pathEndX: 83, pathEndY: 41.8,
            pathOpacity: 0.8
        },
        camera: PHASE_CAMERA
    },
    {
        id: 7,
        title: "Precision landing",
        subtitle: "Secure recovery sequence completed",
        drone: {
            x: 83, y: 77, rotateX: 7.35, rotateY: 90, rotateZ: 0, size: 990, // PREVIOUS: rotateX 0, rotateY 90, rotateZ 0
            cardX: 97.5, cardY: 64.8, cardAlign: "right",
            lineStartX: 93.6, lineStartY: 84.5,
            lineMidX: 97.5, lineMidY: 84.5,
            lineEndX: 97.5, lineEndY: 75.5,
            pathStartX: 82.9, pathStartY: 53,
            pathEndX: 83, pathEndY: 77.7,
            pathOpacity: 0.8
        },
        camera: PHASE_CAMERA
    }
];

// Playback rate for every timer, tween and lerp in the sequence (1 = original pacing)
// PREVIOUS UI: const SPEED = 1.1;
const SPEED = 1.65;
// Pause between one phase finishing and the next starting (ms)
// PREVIOUS UI: const AUTO_ADVANCE_DELAY = 2000 / SPEED;
const AUTO_ADVANCE_DELAY = 1700 / SPEED;
type DroneState = Omit<(typeof DESKTOP_PHASES)[number]["drone"], "via"> & { via?: { x: number, y: number } };
// Phases whose transition starts with an in-place turn, so the drone only leaves its spot after one transition
const TURNS_IN_PLACE = [3, 6];
const quadratic = (a: number, via: number, b: number, t: number) => (1 - t) * (1 - t) * a + 2 * (1 - t) * t * via + t * t * b;

export default function Bat3DSequence() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const media = window.matchMedia('(max-width: 767px)');
        const update = () => setIsMobile(media.matches);
        update();
        media.addEventListener('change', update);
        return () => media.removeEventListener('change', update);
    }, []);
    const mobileStops = [[24, 80], [24, 51], [24, 31], [50, 25], [76, 31], [76, 51], [76, 80]];
    const PHASES = isMobile ? DESKTOP_PHASES.map((phase, index) => {
        const [x, y] = mobileStops[index];
        const [previousX, previousY] = mobileStops[Math.max(0, index - 1)];
        return { ...phase, drone: { ...phase.drone, x, y, via: undefined,
            pathStartX: previousX, pathStartY: previousY, pathEndX: x, pathEndY: y,
            pathMidX: (previousX + x) / 2, pathMidY: (previousY + y) / 2, pathCurve: 0 } };
    }) : DESKTOP_PHASES;
    const [currentPhase, setCurrentPhase] = useState(0);
    const [prevPhaseIndex, setPrevPhaseIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [targetPhase, setTargetPhase] = useState<number | null>(null);
    const [isManualMode, setIsManualMode] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Single source of truth for drone and card properties
    const [liveDrone, setLiveDrone] = useState<DroneState>(PHASES[0].drone);

    // Shadows are snapshots of the live 3D drone taken as it settles at each phase, so they always match
    // the current model and pose. PREVIOUS UI: static renders of the old model (/images/Bat/phases/phase-N.png).
    const [ghostShots, setGhostShots] = useState<Record<number, string>>({});
    // Switching layout (phone <-> desktop) moves every stop, so the old snapshots no longer fit. PREVIOUS UI only
    // cleared them, and phases already flown were never captured again (no shadows after the switch). The flight
    // now restarts from phase 1 so each shadow is retaken for the new layout.
    useEffect(() => {
        setGhostShots({});
        setTargetPhase(null);
        setPrevPhaseIndex(0);
        setCurrentPhase(0);
    }, [isMobile]);
    const captureRequest = useRef<number | null>(null);
    // The phase the drone is currently settled at (null mid-transition); a snapshot is only valid then
    const settledPhase = useRef<number | null>(null);

    // The drone's screen position runs on a 0-1 progress so a move can follow a curve
    const droneX = useMotionValue(PHASES[0].drone.x);
    const droneY = useMotionValue(PHASES[0].drone.y);
    const droneLeft = useTransform(droneX, (v) => `${v}%`);
    const droneTop = useTransform(droneY, (v) => `${v}%`);
    const [cameraTarget, setCameraTarget] = useState(PHASES[0].camera);

    // Dedicated state for ghosts so they can be adjusted globally
    const [ghostConfigs, setGhostConfigs] = useState<{ [key: string]: any }>({});

    // Helper to build ghost configs from PHASES
    const getInitialGhostConfigs = () => {
        const configs: { [key: string]: any } = {};
        PHASES.slice(0, -1).forEach((p) => {
            configs[p.id.toString()] = {
                x: p.drone.x,
                y: p.drone.y,
                size: p.drone.size,
                opacity: p.drone.ghostOpacity ?? 0.35
            };
        });
        return configs;
    };

    useLayoutEffect(() => {
        setGhostConfigs(getInitialGhostConfigs());
    }, []);

    // Sync state with code configuration when not in manual mode
    useEffect(() => {
        if (!isManualMode) {
            setLiveDrone({ ...PHASES[currentPhase].drone });
            setGhostConfigs(getInitialGhostConfigs());
        }
    }, [isManualMode, currentPhase,
        JSON.stringify(PHASES.map(p => p.drone))
    ]);

    // Responsive scale factor for mobile vs tablet vs desktop to keep 3D drone model appropriately sized
    const [scaleFactor, setScaleFactor] = useState(1);
    useEffect(() => {
        const updateScale = () => {
            const w = window.innerWidth;
            if (w < 480) {
                setScaleFactor(w / 1100);
            } else if (w < 768) {
                setScaleFactor(w / 1100);
            } else if (w < 1024) {
                setScaleFactor(0.78);
            } else {
                setScaleFactor(1);
            }
        };
        updateScale();
        window.addEventListener("resize", updateScale);
        return () => window.removeEventListener("resize", updateScale);
    }, []);

    const executePhaseChange = (index: number, currentPhaseValue: number) => {
        // Transition durations synced for premium pacing
        const duration = 2500 / SPEED;

        setIsAnimating(true);
        setIsManualMode(false);
        setPrevPhaseIndex(currentPhaseValue);
        setCurrentPhase(index);
        // Phase effects set the pose together, preserving the launch position during in-place turns.
        setCameraTarget(PHASES[index].camera);

        // Match timeout exactly to the visual duration
        if (PHASES[index].id === 3) {
            // Animation end state is managed by specialized useEffect orchestration
        } else {
            setTimeout(() => setIsAnimating(false), duration);
        }
    };

    // Handle phase change
    const handlePhaseChange = (index: number) => {
        if (isAnimating) return;

        if (Math.abs(index - currentPhase) > 1) {
            setTargetPhase(index);
            executePhaseChange(index > currentPhase ? currentPhase + 1 : currentPhase - 1, currentPhase);
        } else {
            setTargetPhase(null);
            executePhaseChange(index, currentPhase);
        }
    };

    // Auto-advance sequence for multi-step jumps
    useEffect(() => {
        if (!isAnimating && targetPhase !== null) {
            if (currentPhase !== targetPhase) {
                // Short timeout to allow React layout & render cycle to settle before triggering next animation
                const t = setTimeout(() => {
                    executePhaseChange(targetPhase > currentPhase ? currentPhase + 1 : currentPhase - 1, currentPhase);
                }, 50);
                return () => clearTimeout(t);
            } else {
                setTargetPhase(null);
            }
        }
    }, [isAnimating, currentPhase, targetPhase]);


    // Phase 5 -> 6 uses the shared move/rotation clock without an in-place turn.

    // Special delayed transition for Phase 3 (ID 3)
    useEffect(() => {
        let t1: NodeJS.Timeout, t2: NodeJS.Timeout, t3: NodeJS.Timeout;

        if (PHASES[currentPhase].id === 3 && !isManualMode) {
            // PREVIOUS UI: the drone turned to horizontal while already flying to the Phase 3 position.
            // STEP 1: turn to horizontal in place at the Phase 2 position, camera swinging round with it
            // PREVIOUS UI: the camera also swung to a side view ([4.98, -0.34, 0.3]) during the turn,
            // which compounded with the drone's rotation into a tumble.
            const launch = PHASES[prevPhaseIndex].drone;
            const level = PHASES[currentPhase].drone;
            setLiveDrone({ ...level, x: launch.x, y: launch.y });
            setCameraTarget(PHASES[currentPhase].camera);
            setIsAnimating(true);

            // STEP 2: once level, fly to the Phase 3 position
            t1 = setTimeout(() => {
                setLiveDrone(prev => ({ ...prev, x: level.x, y: level.y }));
                t2 = setTimeout(() => setIsAnimating(false), TRANSITION_MS);
            }, TRANSITION_MS);
        }

        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [currentPhase, isManualMode]);

    // PREVIOUS UI: a Phase 4 effect held the drone at Phase 3 for 1.2s while the camera swung to a side view,
    // then flew it on. With the fixed camera, 3 -> 4 is a normal move: the nose pitches over to the right
    // as the drone flies the curve.

    // Handle manual adjustments
    const handleOverrideChange = (key: string, value: number) => {
        setIsManualMode(true);
        if (key.startsWith('ghost')) {
            // ghost1X, ghost1Y, ghost2X, etc.
            const match = key.match(/ghost(\d+)(\w+)/);
            if (match) {
                const phaseId = parseInt(match[1]);
                const prop = match[2].toLowerCase();
                const actualKey = prop === 'size' ? 'size' : (prop === 'opacity' ? 'opacity' : prop);
                setGhostConfigs(prev => ({
                    ...prev,
                    [phaseId]: {
                        ...prev[phaseId],
                        [actualKey]: value
                    }
                }));
            }
        } else {
            setLiveDrone(prev => ({
                ...prev,
                [key]: value
            }));
        }
    };

    // PREVIOUS UI: a window "wheel" listener trapped the scroll here and stepped one phase per gesture.
    // The sequence now plays by itself while the section is on screen.
    useEffect(() => {
        const from = { x: droneX.get(), y: droneY.get() };
        const to = { x: liveDrone.x, y: liveDrone.y };
        if (from.x === to.x && from.y === to.y) return;
        if (isManualMode) {
            droneX.set(to.x);
            droneY.set(to.y);
            return;
        }
        const via = liveDrone.via ?? { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 };
        const controls = animate(0, 1, {
            duration: TRANSITION_MS / 1000,
            ease: [0.65, 0, 0.35, 1], // easeInOutCubic, the same curve as the drone rotation
            onUpdate: (t) => {
                droneX.set(quadratic(from.x, via.x, to.x, t));
                droneY.set(quadratic(from.y, via.y, to.y, t));
            },
        });
        return () => controls.stop();
    }, [liveDrone.x, liveDrone.y]);

    // Snapshot each phase once the drone has settled there (the last phase never needs a shadow)
    useEffect(() => {
        settledPhase.current = !isAnimating && targetPhase === null ? currentPhase : null;
    }, [isAnimating, targetPhase, currentPhase]);

    useEffect(() => {
        // Only while on screen: a canvas captured before the section is visible comes back blank
        if (!isInView || isAnimating || targetPhase !== null || ghostShots[currentPhase] || currentPhase >= PHASES.length - 1) return;
        const t = setTimeout(() => { captureRequest.current = currentPhase; }, 200);
        return () => clearTimeout(t);
    }, [isInView, isAnimating, targetPhase, currentPhase, ghostShots]);

    useEffect(() => {
        if (!containerRef.current) return;
        // Use the latest entry. PREVIOUS UI took the first: a reload that restores the scroll position delivers
        // "hidden" then "visible" in one batch, so the section stayed "hidden" and the flight never started.
        const observer = new IntersectionObserver((entries) => setIsInView(entries[entries.length - 1].isIntersecting), { threshold: 0.6 });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    // Section size in px, so the dashed-line layer (drawn in 0-100 units) can cut out each shadow at its real size
    const [sectionSize, setSectionSize] = useState({ w: 1, h: 1 });
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new ResizeObserver(() => setSectionSize({ w: el.clientWidth || 1, h: el.clientHeight || 1 }));
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isInView || isAnimating || targetPhase !== null || currentPhase >= PHASES.length - 1) return;
        // Leave only after this phase's shadow has been captured, so it always shows the settled pose
        if (!ghostShots[currentPhase]) return;
        // Dwell on each phase long enough for its caption to appear and be read
        const t = setTimeout(() => handlePhaseChange(currentPhase + 1), AUTO_ADVANCE_DELAY);
        return () => clearTimeout(t);
    }, [isInView, isAnimating, targetPhase, currentPhase, ghostShots]);

    const activePhase = PHASES[currentPhase];
    const isFastTransition = false;

    return (
        <section
            ref={containerRef}
            data-bat-section="sequence"
            className="sticky top-0 w-full h-screen bg-white overflow-hidden font-orbit select-none z-40"
        >
            {/* Background Title - Cinematic Aesthetic */}
            {/* PREVIOUS UI ("Roadborne. Airbound." at 9vw):
            <div className="absolute inset-0 flex items-center justify-center translate-x-[2vw] opacity-[0.3] pointer-events-none">
                <div className="text-[9vw] font-bold text-black tracking-tighter flex flex-col items-center leading-[0.85]">
                    <span>Roadborne.</span>
                    <span>Airbound.</span>
                </div>
            </div>
            */}
            {/* PREVIOUS UI (text-[clamp(2.5rem,6.5vw,7.5rem)]):
            <div className="absolute inset-0 flex items-center justify-center translate-x-[2vw] opacity-[0.3] pointer-events-none">
                <div className="text-[clamp(2.5rem,6.5vw,7.5rem)] font-bold text-black tracking-tighter flex flex-col items-center leading-[0.88] whitespace-nowrap">
                    <span>Transition Forward.</span>
                    <span>Reached Beyond.</span>
                </div>
            </div>
            */}
            {/* PREVIOUS UI (text-[clamp(2rem,5.2vw,5.8rem)] with translate-x-[2vw]):
            <div className="absolute inset-0 flex items-center justify-center translate-x-[2vw] opacity-[0.3] pointer-events-none">
                <div className="text-[clamp(2rem,5.2vw,5.8rem)] font-bold text-black tracking-tighter flex flex-col items-center leading-[0.88] whitespace-nowrap">
                    <span>Transition Forward.</span>
                    <span>Reached Beyond.</span>
                </div>
            </div>
            */}
            {/* PREVIOUS UI (text-[clamp(1.15rem,5.5vw,5.8rem)]):
            <div className="absolute inset-0 flex items-center justify-center translate-x-0 sm:translate-x-[2vw] opacity-[0.3] pointer-events-none px-4">
                <div className="text-[clamp(1.15rem,5.5vw,5.8rem)] font-bold text-black tracking-tighter flex flex-col items-center leading-[0.88] whitespace-nowrap text-center">
                    <span>Transition Forward.</span>
                    <span>Reached Beyond.</span>
                </div>
            </div>
            */}
            <div className="absolute inset-0 flex items-center justify-center translate-x-0 sm:translate-x-[2vw] opacity-[0.16] sm:opacity-[0.3] pointer-events-none px-4">
                {/* PREVIOUS UI: leading-[0.88] on phones too, so the four stacked lines touched. */}
                <div className="text-[clamp(0.85rem,3.8vw,1.4rem)] sm:text-[clamp(2rem,5.2vw,5.8rem)] font-bold text-black tracking-tighter flex flex-col items-center leading-[1.8] sm:leading-[0.88] whitespace-nowrap text-center">
                    <span className="sm:hidden">Transition</span>
                    <span className="sm:hidden">Forward.</span>
                    <span className="sm:hidden">Reach</span>
                    <span className="sm:hidden">Beyond.</span>
                    <span className="hidden sm:inline">Transition Forward.</span>
                    <span className="hidden sm:inline">Reach Beyond.</span>
                </div>
            </div>

            {/* Central Main Title (Optional but matches reference vibe) */}
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none text-center">
                <div className="text-black/5 title-text font-orbit uppercase tracking-[15px] text-[24px]">
                    {/* Autonomous Air-to-Ground Recovery */}
                </div>
            </div>

            {/* 3D Canvas */}
            <div className="absolute inset-0 z-5 pointer-events-none">
                {/* Shadows: each phase's snapshot, placed exactly where the drone settled */}
                <AnimatePresence>
                    {PHASES.slice(0, -1).map((p: any, idx) => {
                        if (currentPhase <= idx || !ghostShots[idx]) return null;
                        // Fade in only once the drone has actually left this spot
                        const leavesAfter = TURNS_IN_PLACE.includes(PHASES[idx + 1].id) ? TRANSITION_MS : 0;
                        return (
                            <motion.img
                                key={`ghost-${p.id}`}
                                src={ghostShots[idx]}
                                alt=""
                                initial={{ opacity: 0 }}
                                animate={{ opacity: p.drone.ghostOpacity ?? 0.25 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: (leavesAfter + TRANSITION_MS * 0.45) / 1000, duration: 0.8 / SPEED }}
                                className="absolute pointer-events-none"
                                /* PREVIOUS UI: desktop used hand-tuned ghostX/ghostY/ghostSize (210-470px) left over from
                                   the old static shadow renders. A snapshot is the whole drone canvas, so shrinking it also
                                   shrank and shifted the drone inside it. It now sits exactly where the drone's canvas was. */
                                style={{
                                    left: `${p.drone.x}%`,
                                    top: `${p.drone.y}%`,
                                    width: p.drone.size * scaleFactor,
                                    height: p.drone.size * scaleFactor,
                                    filter: "grayscale(1) brightness(0.55)",
                                    x: "-50%",
                                    y: "-50%",
                                }}
                            />
                        );
                    })}
                </AnimatePresence>

                <motion.div
                    className="absolute"
                    style={{ left: droneLeft, top: droneTop }}
                    /* PREVIOUS UI (Unscaled desktop size):
                    animate={{
                        width: liveDrone.size,
                        height: liveDrone.size,
                        x: "-50%",
                        y: "-50%",
                    }}
                    */
                    animate={{
                        width: liveDrone.size * scaleFactor,
                        height: liveDrone.size * scaleFactor,
                        x: "-50%",
                        y: "-50%",
                    }}
                    transition={isManualMode ? { duration: 0 } : {
                        duration: isFastTransition ? 1.0 : 2.5 / SPEED,
                        // PREVIOUS UI: ease [0.33, 1, 0.68, 1] front-loaded the move, so the drone arrived before it finished turning
                        ease: [0.65, 0, 0.35, 1] // easeInOutCubic, the same curve as the drone rotation and camera
                    }}
                >
                    <Canvas
                        style={{ pointerEvents: "none" }}
                        gl={{ preserveDrawingBuffer: true }}
                        camera={{
                            position: activePhase.camera.position as [number, number, number],
                            fov: activePhase.camera.fov
                        }}
                    >
                        <ambientLight intensity={1.5} />
                        <directionalLight position={[10, 10, 5]} intensity={1} />
                        <Environment preset="city" />
                        {/* Between phases the controls re-aim the camera at the drone, which the phase camera
                            poses rely on; dragging, zooming and panning stay disabled so visitors can't move it. */}
                        <OrbitControls makeDefault enabled={!isAnimating} enableRotate={false} enableZoom={false} enablePan={false} />
                        <Suspense fallback={null}>
                            <SmoothDrone
                                drone={liveDrone}
                                centered={isMobile}
                                isManualMode={isManualMode}
                                isFastTransition={isFastTransition}
                            />
                        </Suspense>
                        <ShadowCapture
                            request={captureRequest}
                            settled={settledPhase}
                            onCapture={(phase, url) => setGhostShots(prev => ({ ...prev, [phase]: url }))}
                        />
                        <CameraController
                            activePhase={activePhase}
                            prevPhase={PHASES[prevPhaseIndex]}
                            cameraTarget={cameraTarget}
                            isManualMode={isManualMode}
                            isAnimating={isAnimating}
                        />
                    </Canvas>
                </motion.div>
            </div>

            {/* Persistent Paths Layer (No Key to avoid re-animation) */}
            <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full pointer-events-none z-25 overflow-visible"
            >
                {/* The dashed lines are drawn above the shadows; this mask cuts each visible shadow's silhouette out of
                    them, so a line stops at a drone instead of crossing it. PREVIOUS UI: the lines ran through the shadows. */}
                <defs>
                    <filter id="ghost-silhouette">
                        <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
                    </filter>
                    <mask id="ghost-cutout" maskUnits="userSpaceOnUse" x="-50" y="-50" width="200" height="200">
                        <rect x="-50" y="-50" width="200" height="200" fill="white" />
                        {PHASES.slice(0, -1).map((p, idx) => {
                            if (currentPhase <= idx || !ghostShots[idx]) return null;
                            // A square of the drone's px size, expressed in this layer's stretched 0-100 units
                            const w = (p.drone.size * scaleFactor / sectionSize.w) * 100;
                            const h = (p.drone.size * scaleFactor / sectionSize.h) * 100;
                            return (
                                <image
                                    key={`cutout-${p.id}`}
                                    href={ghostShots[idx]}
                                    x={p.drone.x - w / 2}
                                    y={p.drone.y - h / 2}
                                    width={w}
                                    height={h}
                                    preserveAspectRatio="none"
                                    filter="url(#ghost-silhouette)"
                                />
                            );
                        })}
                    </mask>
                </defs>
                <g mask="url(#ghost-cutout)">
                {/* Phase 1 Ghost to Phase 2 Model Path */}
                {currentPhase >= 1 && (
                    <motion.path
                        d={getRoundedCornerPath(
                            {
                                x: (currentPhase === 1 ? liveDrone.pathStartX : PHASES[1].drone.pathStartX) ?? 12.5,
                                y: (currentPhase === 1 ? liveDrone.pathStartY : PHASES[1].drone.pathStartY) ?? 82
                            },
                            {
                                x: (currentPhase === 1 ? liveDrone.pathMidX : PHASES[1].drone.pathMidX) ?? 16,
                                y: (currentPhase === 1 ? liveDrone.pathMidY : PHASES[1].drone.pathMidY) ?? 62
                            },
                            {
                                x: (currentPhase === 1 ? liveDrone.pathEndX : PHASES[1].drone.pathEndX) ?? 20,
                                y: (currentPhase === 1 ? liveDrone.pathEndY : PHASES[1].drone.pathEndY) ?? 42
                            },
                            (currentPhase === 1 ? liveDrone.pathCurve : PHASES[1].drone.pathCurve) ?? 0.1
                        )}
                        fill="none"
                        stroke="#A0A0A0"
                        strokeWidth="0.7"
                        strokeDasharray="9 9"
                        style={{ vectorEffect: "non-scaling-stroke" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: (currentPhase === 1 ? liveDrone.pathOpacity : PHASES[1].drone.pathOpacity) ?? 0.9 }}
                        transition={{ duration: (1.7) / SPEED, delay: (0.8) / SPEED, ease: "easeOut" }}
                        strokeLinecap="round"
                    />
                )}

                {/* Additional Paths for subsequent phases (Supports Straight & Curved) */}
                {PHASES.map((p, idx) => {
                    if (idx < 2 || currentPhase < idx) return null;

                    const pConfig = currentPhase === idx ? liveDrone : p.drone;
                    const startX = pConfig.pathStartX;
                    const startY = pConfig.pathStartY;
                    const endX = pConfig.pathEndX;
                    const endY = pConfig.pathEndY;
                    const midX = pConfig.pathMidX;
                    const midY = pConfig.pathMidY;
                    const curve = pConfig.pathCurve;
                    const opacity = pConfig.pathOpacity ?? 0.4;

                    if (startX === undefined || startY === undefined || endX === undefined || endY === undefined) return null;

                    return (
                        <motion.path
                            key={`path-${p.id}`}
                            d={midX !== undefined && midY !== undefined && curve !== undefined
                                ? getRoundedCornerPath(
                                    { x: startX, y: startY },
                                    { x: midX, y: midY },
                                    { x: endX, y: endY },
                                    curve
                                )
                                : `M ${startX} ${startY} L ${endX} ${endY}`
                            }
                            fill="none"
                            stroke="#A0A0A0"
                            strokeWidth="0.7"
                            strokeDasharray="9 9"
                            style={{ vectorEffect: "non-scaling-stroke" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: opacity > 0.4 ? opacity : 0.8 }}
                            transition={{ duration: 2.0 / SPEED, delay: (p.id === 6 ? 2.5 : 0.8) / SPEED, ease: "easeOut" }}
                            strokeLinecap="round"
                        />
                    );
                })}
                </g>
            </svg>

            {/* PREVIOUS UI: only the active phase showed its callout line and caption; both were replaced on every phase change. */}
            {/* Callout lines: one per reached phase, kept on screen once drawn */}
            <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible"
            >
                <defs>
                    <filter id="glow" filterUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
                        <feGaussianBlur stdDeviation="1" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
                {PHASES.map((p, idx) => {
                    if (idx > currentPhase || isMobile) return null;
                    const d = p.drone;
                    // Phases 3 and 6 start with an in-place turn before moving, so their callouts wait for it
                    const lateStart = p.id === 3 || p.id === 6;
                    return (
                        <g key={`callout-${p.id}`}>
                            {/* 3-Point Path (Dotted/Dashed Polyline) */}
                            <motion.path
                                d={`M ${d.lineStartX} ${d.lineStartY} L ${d.lineMidX} ${d.lineMidY} L ${d.lineEndX} ${d.lineEndY}`}
                                fill="none"
                                stroke="#5ce1e6"
                                strokeWidth="0.12"
                                strokeDasharray="0.6 0.4"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 1.8 / SPEED, delay: (lateStart ? 3.3 : 0.8) / SPEED, ease: "easeOut" }}
                                style={{ filter: "url(#glow)" }}
                                strokeLinecap="butt"
                            />
                            {/* Start Dot */}
                            <motion.circle
                                cx={d.lineStartX}
                                cy={d.lineStartY}
                                r="0.2"
                                fill="#5ce1e6"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: (lateStart ? 3.7 : 1.2) / SPEED }}
                            />
                            {/* End Dot */}
                            <motion.circle
                                cx={d.lineEndX}
                                cy={d.lineEndY}
                                r="0.2"
                                fill="#5ce1e6"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: (lateStart ? 4.7 : 2.2) / SPEED }}
                            />
                        </g>
                    );
                })}
            </svg>

            {/* Phones also get a small title centred under each reached phase's drone/shadow */}
            {isMobile && PHASES.map((p, idx) => {
                if (idx > currentPhase) return null;
                const d = p.drone;
                return (
                    <motion.div
                        key={`label-${p.id}`}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2 / SPEED, delay: (p.id === 3 || p.id === 6 ? 3.9 : 1.4) / SPEED }}
                        style={{
                            position: 'absolute',
                            left: `${d.x}%`,
                            top: `calc(${d.y}% + ${Math.round(110 * scaleFactor)}px)`,
                            x: '-50%',
                            zIndex: 40,
                            pointerEvents: 'none'
                        }}
                        className="w-[9.5rem] text-center text-black font-bold text-[8px] uppercase tracking-wide leading-tight"
                    >
                        {p.title}
                    </motion.div>
                );
            })}

            {/* Phase captions: one per reached phase on desktop, kept on screen once shown; on phones only the
                current phase, top left. cardX is the edge the text aligns to: left by default, right when cardAlign is "right". */}
            {PHASES.map((p, idx) => {
                if (idx > currentPhase || (isMobile && idx !== currentPhase)) return null;
                const d = p.drone;
                const alignRight = d.cardAlign === "right";
                // PREVIOUS UI:
                // <motion.div
                //     key={`caption-${p.id}`}
                //     initial={{ opacity: 0, x: alignRight ? 10 : -10 }}
                //     animate={{ opacity: 1, x: 0 }}
                //     transition={{ duration: 1.8 / SPEED, delay: (p.id === 3 || p.id === 6 ? 3.9 : 1.4) / SPEED }}
                //     style={{
                //         position: 'absolute',
                //         ...(alignRight ? { right: `${100 - d.cardX}%` } : { left: `${d.cardX}%` }),
                //         top: `${d.cardY}%`,
                //         zIndex: 40,
                //         pointerEvents: 'none'
                //     }}
                //     className={`flex flex-col gap-0.5 whitespace-nowrap ${alignRight ? "items-end text-right" : "items-start text-left"}`}
                // >
                //     <span className="text-[#5ce1e6] font-extrabold text-[16px] leading-none mb-1">
                //         {`0${p.id}`}
                //     </span>
                //     <div className="text-black font-bold text-[14px] uppercase tracking-wide leading-tight">
                //         {p.title}
                //     </div>
                //     <div className="text-gray-400 font-medium text-[11px] uppercase tracking-widest leading-snug">
                //         {p.subtitle}
                //     </div>
                // </motion.div>
                return (
                    <motion.div
                        key={`caption-${p.id}`}
                        initial={{ opacity: 0, x: alignRight ? 10 : -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.8 / SPEED, delay: (p.id === 3 || p.id === 6 ? 3.9 : 1.4) / SPEED }}
                        style={{
                            position: 'absolute',
                            ...(isMobile ? { left: '6%', right: '6%', maxWidth: 'none', textAlign: 'left' as const, alignItems: 'flex-start' } : alignRight ? { right: `${100 - d.cardX}%` } : { left: `${d.cardX}%` }),
                            // PREVIOUS UI: top 5% on phones sat under the navbar when it was showing
                            top: isMobile ? '88px' : `${d.cardY}%`,
                            zIndex: 40,
                            pointerEvents: 'none'
                        }}
                        className={`flex flex-col gap-0.5 max-w-[13rem] xs:max-w-[16rem] sm:max-w-none whitespace-normal sm:whitespace-nowrap ${alignRight ? "items-end text-right" : "items-start text-left"}`}
                    >
                        {/* PREVIOUS UI (text-[13px] sm:text-[16px], text-[11px] sm:text-[14px], text-[9.5px] sm:text-[11px]):
                        <span className="text-[#5ce1e6] font-extrabold text-[13px] sm:text-[16px] leading-none mb-0.5 sm:mb-1">
                            {`0${p.id}`}
                        </span>
                        <div className="text-black font-bold text-[11px] sm:text-[14px] uppercase tracking-wide leading-tight">
                            {p.title}
                        </div>
                        <div className="text-gray-400 font-medium text-[9.5px] sm:text-[11px] uppercase tracking-widest leading-snug">
                            {p.subtitle}
                        </div>
                        */}
                        <span className="text-[#5ce1e6] font-extrabold text-[9.5px] sm:text-[16px] leading-none mb-0.5 sm:mb-1">
                            {`0${p.id}`}
                        </span>
                        <div className="text-black font-bold text-[14px] uppercase tracking-wide leading-tight">
                            {p.title}
                        </div>
                        <div className="text-gray-400 font-medium text-[10px] sm:text-[11px] uppercase tracking-widest leading-snug">
                            {p.subtitle}
                        </div>
                    </motion.div>
                );
            })}

        </section>
    );
}

// PREVIOUS UI: drone rotation and camera chased their targets with a per-frame lerp (0.04 * SPEED),
// so a turn finished in under a second while the drone was still leaving its old position.
// Both now run on the same clock as the drone's move, easing in and out so the turn happens mid-flight.
const TRANSITION_MS = 2500 / SPEED
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const transitionProgress = (start: number) => easeInOutCubic(Math.min(1, (performance.now() - start) / TRANSITION_MS))

// Rotates the drone toward its phase orientation over the same duration as its move across the screen
function SmoothDrone({ drone, isManualMode, centered }: { drone: any, isManualMode: boolean, isFastTransition: boolean, centered: boolean }) {
    const groupRef = useRef<THREE.Group>(null);
    const target = [drone.rotateX, drone.rotateY, drone.rotateZ].map((deg: number) => deg * (Math.PI / 180));
    // Slerping quaternions turns the drone about one fixed axis; per-angle Euler lerps tumbled it
    const targetQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(target[0], target[1], target[2]));
    const tween = useRef<{ from: THREE.Quaternion, start: number } | null>(null);
    const targetKey = target.join(",");
    const positionKey = `${drone.x},${drone.y}`;

    // The model's centre sits off the group's rotation point, so a turn swings it sideways like a lever.
    // A turn made in place (screen position unchanged) is pivoted about the centre instead; the extra
    // offset that leaves is eased back out during the next move so every phase still settles exactly.
    const centre = useRef<THREE.Vector3 | null>(null); // model centre in group-local space
    const pivot = useRef<THREE.Vector3 | null>(null); // world point held still during an in-place turn
    const settle = useRef<{ from: THREE.Vector3, start: number } | null>(null);
    // A turn made while moving carries the centre in a straight line between its two poses
    const glide = useRef<{ from: THREE.Vector3, start: number } | null>(null);

    // PREVIOUS UI: a "mounted" flag skipped the first effect run, but React runs mount effects twice in
    // development, so the second run tweened the drone in from an unrotated (yawed 90 degrees) pose.
    const appliedKey = useRef(targetKey);
    const appliedPosition = useRef(positionKey);

    useEffect(() => {
        const group = groupRef.current;
        if (!group) return;
        const moved = positionKey !== appliedPosition.current;
        const turned = targetKey !== appliedKey.current;
        appliedPosition.current = positionKey;
        appliedKey.current = targetKey;
        const now = performance.now();
        const centreNow = centre.current?.clone().applyQuaternion(group.quaternion).add(group.position);
        if (moved || turned) {
            pivot.current = null;
            settle.current = null;
            glide.current = null;
        }
        if (turned) tween.current = { from: group.quaternion.clone(), start: now };
        if (!centreNow) return;
        if (turned && !moved) pivot.current = centreNow; // turn in place about the centre
        else if (turned && moved) glide.current = { from: centreNow, start: now }; // straight-line centre
        else if (moved && group.position.lengthSq() > 0) settle.current = { from: group.position.clone(), start: now }; // ease out a pivot offset
    }, [targetKey, positionKey]);

    useFrame(() => {
        const group = groupRef.current;
        if (!group) return;
        if (isManualMode || !tween.current) group.quaternion.copy(targetQuat);
        else group.quaternion.slerpQuaternions(tween.current.from, targetQuat, transitionProgress(tween.current.start));

        if (!centre.current && group.children.length) {
            group.updateMatrixWorld(true);
            const box = new THREE.Box3().setFromObject(group.children[0]);
            if (!box.isEmpty()) {
                centre.current = box.getCenter(new THREE.Vector3()).sub(group.position).applyQuaternion(group.quaternion.clone().invert());
            }
        }

        if (centered && centre.current) {
            group.position.copy(centre.current).applyQuaternion(group.quaternion).negate();
        } else if (glide.current && centre.current) {
            const e = transitionProgress(glide.current.start);
            const end = centre.current.clone().applyQuaternion(targetQuat);
            const along = glide.current.from.clone().lerp(end, e);
            group.position.copy(along.sub(centre.current.clone().applyQuaternion(group.quaternion)));
            if (e >= 1) glide.current = null;
        } else if (settle.current) {
            const e = transitionProgress(settle.current.start);
            group.position.copy(settle.current.from).multiplyScalar(1 - e);
            if (e >= 1) settle.current = null;
        } else if (pivot.current && centre.current) {
            group.position.copy(pivot.current).sub(centre.current.clone().applyQuaternion(group.quaternion));
        }
    });

    return (
        <group ref={groupRef}>
            <Model scale={[1, 1, 1]} />
        </group>
    );
}

// Moves the camera to each phase's viewpoint on the shared transition clock, always aimed at the drone
function CameraController({ activePhase, cameraTarget, isAnimating }: { activePhase: any, prevPhase: any, cameraTarget: any, isManualMode: boolean, isAnimating: boolean }) {
    const { camera } = useThree();
    const targetConfig = cameraTarget || activePhase.camera;
    const targetKey = JSON.stringify(targetConfig?.position);
    const tween = useRef<{ from: THREE.Spherical, start: number } | null>(null);

    useEffect(() => {
        tween.current = { from: new THREE.Spherical().setFromVector3(camera.position), start: performance.now() };
    }, [targetKey, camera]);

    useFrame(() => {
        if (!isAnimating || !tween.current || !targetConfig) return;
        const from = tween.current.from;
        const to = new THREE.Spherical().setFromVector3(new THREE.Vector3(...targetConfig.position));
        // Orbit the short way round so large swings never loop backwards
        let dTheta = to.theta - from.theta;
        while (dTheta > Math.PI) dTheta -= Math.PI * 2;
        while (dTheta < -Math.PI) dTheta += Math.PI * 2;
        // Interpolating on the sphere keeps the camera from dipping toward the drone mid-swing
        const e = transitionProgress(tween.current.start);
        camera.position.setFromSpherical(new THREE.Spherical(
            from.radius + (to.radius - from.radius) * e,
            from.phi + (to.phi - from.phi) * e,
            from.theta + dTheta * e,
        ));
        // Same aim the idle OrbitControls hold, so nothing jumps when a phase settles
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
    });

    return null;
}

// Grabs the rendered drone as an image when a phase asks for its shadow
function ShadowCapture({ request, settled, onCapture }: { request: React.MutableRefObject<number | null>, settled: React.MutableRefObject<number | null>, onCapture: (phase: number, url: string) => void }) {
    const { gl, scene } = useThree();
    const drawnFrames = useRef(0);
    useFrame(() => {
        // The model needs a few rendered frames after it is added before the canvas shows it
        if (!scene.getObjectByProperty("type", "Mesh")) return;
        drawnFrames.current += 1;
        const phase = request.current;
        if (phase === null || drawnFrames.current < 10) return;
        // Drop a request the drone has already moved on from rather than capture the wrong pose
        if (settled.current !== phase) {
            request.current = null;
            return;
        }
        const url = gl.domElement.toDataURL("image/webp", 0.9);
        // A near-empty image means nothing was drawn yet; keep the request and try next frame
        if (url.length < 2000) return;
        request.current = null;
        onCapture(phase, url);
    });
    return null;
}

// PREVIOUS MODEL: '/product/T-BAT/BATMAN.glb', whose geometry sat on y = 0 (no position offset needed).
const BAT_MODEL = '/product/T-BAT/T_Bat_Updated.glb'
// The updated model is centred vertically (y -0.321..0.302); lift it so its base sits on y = 0
// like the previous model, keeping every phase's framing and pivot unchanged.
const BAT_MODEL_BASE_OFFSET = 0.321

function Model(props: any) {
    const { scene } = useGLTF(BAT_MODEL)
    return (
        <group {...props} dispose={null}>
            <primitive object={scene} position={[0, BAT_MODEL_BASE_OFFSET, 0]} rotation={[0, Math.PI / 2, 0]} />
        </group>
    )
}

useGLTF.preload(BAT_MODEL)

function getRoundedCornerPath(start: { x: number, y: number }, mid: { x: number, y: number }, end: { x: number, y: number }, curve: number) {
    const p1x = mid.x + (start.x - mid.x) * curve;
    const p1y = mid.y + (start.y - mid.y) * curve;
    const p2x = mid.x + (end.x - mid.x) * curve;
    const p2y = mid.y + (end.y - mid.y) * curve;
    return `M ${start.x} ${start.y} L ${p1x} ${p1y} Q ${mid.x} ${mid.y} ${p2x} ${p2y} L ${end.x} ${end.y}`;
}
