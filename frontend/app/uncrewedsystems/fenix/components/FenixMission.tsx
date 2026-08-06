"use client"

// PREVIOUS IMPORTS: import React, { useRef, useState, useEffect } from "react"
// PREVIOUS IMPORTS: import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import React, { useCallback, useEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  type MotionValue,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProfileCardProps {
  title: string
  imageUrl: string
  description: string
}

/* PREVIOUS MOTION VALUE SHAPE:
interface MissionMotionValues {
  centerWidth: MotionValue<string>
  neighborWidth: MotionValue<string>
  farWidth: MotionValue<string>
  centerHeight: MotionValue<string>
  neighborHeight: MotionValue<string>
  farHeight: MotionValue<string>
  neighborOpacity: MotionValue<number>
  farOpacity: MotionValue<number>
  textOpacity: MotionValue<number>
  arrowOpacity: MotionValue<number>
  centerGradientOpacity: MotionValue<number>
}
*/

type CardSlot = -2 | -1 | 0 | 1 | 2

interface MissionMotionValues {
  growth: MotionValue<number>
  contentOpacity: MotionValue<number>
  contentY: MotionValue<number>
  sideLabelOpacity: MotionValue<number>
}

interface LegacyMissionMotionValues {
  centerWidth: MotionValue<string>
  neighborWidth: MotionValue<string>
  farWidth: MotionValue<string>
  centerHeight: MotionValue<string>
  neighborHeight: MotionValue<string>
  farHeight: MotionValue<string>
  neighborOpacity: MotionValue<number>
  farOpacity: MotionValue<number>
  textOpacity: MotionValue<number>
  arrowOpacity: MotionValue<number>
  centerGradientOpacity: MotionValue<number>
}

interface CardGeometry {
  width: string
  height: string
  x: string
  y: string
  opacity: number
  rotateY: number
  zIndex: number
  imageScale: number
  imageFilter: string
  overlayOpacity: number
  borderColor: string
  boxShadow: string
}

const CARD_SLOTS: readonly CardSlot[] = [-2, -1, 0, 1, 2]

const clamp = (value: number, minimum = 0, maximum = 1) =>
  Math.min(Math.max(value, minimum), maximum)

const mix = (start: number, end: number, progress: number) =>
  start + (end - start) * progress

const interpolateRole = (distance: number, center: number, neighbor: number, far: number) => {
  const clampedDistance = clamp(distance, 0, 2)
  return clampedDistance <= 1
    ? mix(center, neighbor, clampedDistance)
    : mix(neighbor, far, clampedDistance - 1)
}

const modulo = (value: number, divisor: number) => ((value % divisor) + divisor) % divisor

export function getCardGeometry(
  animatedSlot: number,
  scrollGrowth: number,
  isMobile: boolean,
  prefersReducedMotion: boolean,
): CardGeometry {
  const growth = prefersReducedMotion ? 0.42 : clamp(scrollGrowth)
  const distance = clamp(Math.abs(animatedSlot), 0, 2)
  const direction = animatedSlot === 0 ? 0 : Math.sign(animatedSlot)

  const centerWidth = mix(isMobile ? 68 : 30, isMobile ? 92 : 76, growth)
  const neighborWidth = mix(isMobile ? 18 : 17, isMobile ? 7 : 7.5, growth)
  const farWidth = mix(isMobile ? 10 : 11, isMobile ? 3.5 : 3.75, growth)

  const centerHeight = mix(isMobile ? 48 : 58, isMobile ? 72 : 82, growth)
  const neighborHeight = mix(isMobile ? 34 : 46, isMobile ? 23 : 29, growth)
  const farHeight = mix(isMobile ? 24 : 34, isMobile ? 15 : 19, growth)

  const neighborX = mix(isMobile ? 42 : 27, isMobile ? 47 : 43.5, growth)
  const farX = mix(isMobile ? 51 : 43, isMobile ? 51 : 50, growth)
  const xMagnitude = distance <= 1
    ? neighborX * distance
    : mix(neighborX, farX, distance - 1)

  const centerOpacity = 1
  // PREVIOUS UI: side opacity fell to 0.34 / 0.14, making the fifth card technically present but visually lost.
  const neighborOpacity = mix(0.88, 0.6, growth)
  const farOpacity = mix(0.58, 0.36, growth)
  const opacity = interpolateRole(distance, centerOpacity, neighborOpacity, farOpacity)

  const centerInfluence = 1 - clamp(distance, 0, 1)
  const brightness = interpolateRole(distance, 0.98, 0.62, 0.46)
  const contrast = interpolateRole(distance, 1.04, 1.08, 1.1)
  const saturation = interpolateRole(distance, 1.06, 0.78, 0.62)
  const blur = interpolateRole(distance, 0, 0.12, 0.28)
  const overlayOpacity = interpolateRole(distance, mix(0.28, 0.88, growth), 0.46, 0.56)
  // PREVIOUS UI: const glowStrength = centerInfluence * mix(0.12, 0.52, growth)

  return {
    width: `${interpolateRole(distance, centerWidth, neighborWidth, farWidth)}vw`,
    height: `${interpolateRole(distance, centerHeight, neighborHeight, farHeight)}vh`,
    x: `${direction * xMagnitude}vw`,
    y: `${interpolateRole(distance, mix(1.5, 0, growth), 2.5, 4.5)}vh`,
    opacity,
    rotateY: direction * -interpolateRole(distance, 0, mix(4, 7, growth), mix(7, 10, growth)),
    zIndex: Math.round(50 - distance * 15),
    imageScale: 1 + centerInfluence * mix(0.025, 0.105, growth),
    imageFilter: `brightness(${brightness}) contrast(${contrast}) saturate(${saturation}) blur(${blur}px)`,
    overlayOpacity,
    // PREVIOUS UI: `rgba(103, 232, 249, ${0.12 + glowStrength})` created a cyan edge line around the expanded card.
    borderColor: "rgba(255, 255, 255, 0.12)",
    // PREVIOUS UI: the shadow included `0 0 ${mix(0, 46, glowStrength)}px rgba(34, 211, 238, ${glowStrength})`.
    boxShadow: `0 ${mix(18, 34, centerInfluence)}px ${mix(42, 90, centerInfluence)}px rgba(0, 0, 0, 0.62)`,
  }
}

const MISSION_PROFILES: readonly ProfileCardProps[] = [
  {
    title: "Counter Terrorism",
    imageUrl: "/images/Fenix/CounterTerrorism.jpg",
    description:
      "Covertly monitor high-risk environments, track targets, and provide real-time intel to ground teams.",
  },
  {
    title: "Search & Rescue",
    imageUrl: "/images/Fenix/Search_Rescue.jpg",
    description: "Locate missing persons in challenging terrain and guide rescue teams to precise locations.",
  },
  {
    title: "Counter Inversion",
    imageUrl: "/images/Fenix/CounterInversion.webp",
    description:
      "Identify and neutralize inverted threats, providing a clear operational picture in complex aerial engagements.",
  },
  {
    title: "Pipeline & Ductwork Inspection",
    imageUrl: "/images/Fenix/PipelineDuctwork.webp",
    description:
      "Efficiently inspect vast networks, identifying potential leaks or damage with high-resolution visuals.",
  },
  {
    title: "Warehouse Management",
    imageUrl: "/images/Fenix/WarehouseManagement.jpeg",
    description:
      "Automate inventory checks, monitor stock levels, and identify misplaced items in large-scale warehouses.",
  },
  {
    title: "Ongoing Build Surveillance",
    imageUrl: "/images/Fenix/OngoingBuild.webp",
    description:
      "Provide continuous aerial surveillance of construction sites, tracking progress and ensuring security.",
  },
]

export function getVisibleProfileSlots(
  activeIndex: number,
  profileCount = MISSION_PROFILES.length,
) {
  return CARD_SLOTS.map((slot) => ({
    slot,
    profileIndex: modulo(activeIndex + slot, profileCount),
  }))
}

export default function FenixMissionProfiles(): React.JSX.Element {
  // PREVIOUS UI: const [activeIndex, setActiveIndex] = useState(2)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const prefersReducedMotion = useReducedMotion() ?? false

  /* PREVIOUS RESPONSIVE CHECK:
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])
  */
  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)")
    const checkMobile = (event: MediaQueryListEvent | MediaQueryList) => setIsMobile(event.matches)

    checkMobile(mobileQuery)
    mobileQuery.addEventListener("change", checkMobile)
    return () => mobileQuery.removeEventListener("change", checkMobile)
  }, [])

  /* PREVIOUS UI: profiles were recreated on every component render.
  const allProfiles: ProfileCardProps[] = [
    {
      title: "Counter Terrorism",
      imageUrl: "/images/Fenix/CounterTerrorism.jpg",
      description:
        "Covertly monitor high-risk environments, track targets, and provide real-time intel to ground teams.",
    },
    {
      title: "Search & Rescue",
      imageUrl: "/images/Fenix/Search_Rescue.jpg",
      description: "Locate missing persons in challenging terrain and guide rescue teams to precise locations.",
    },
    {
      title: "Counter Inversion",
      imageUrl: "/images/Fenix/CounterInversion.webp",
      description:
        "Identify and neutralize inverted threats, providing a clear operational picture in complex aerial engagements.",
    },
    {
      title: "Pipeline & Ductwork Inspection",
      imageUrl: "/images/Fenix/PipelineDuctwork.webp",
      description:
        "Efficiently inspect vast networks, identifying potential leaks or damage with high-resolution visuals.",
    },
    {
      title: "Warehouse Management",
      imageUrl: "/images/Fenix/WarehouseManagement.jpeg",
      description:
        "Automate inventory checks, monitor stock levels, and identify misplaced items in large-scale warehouses.",
    },
    {
      title: "Ongoing Build Surveillance",
      imageUrl: "/images/Fenix/OngoingBuild.webp",
      description:
        "Provide continuous aerial surveillance of construction sites, tracking progress and ensuring security.",
    },
  ]
  */

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Smooth scroll progress
  /* PREVIOUS UI: stiffness: 100, damping: 30, restDelta: 0.001 */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.35,
    restDelta: 0.0005,
  })

  // Navigation Handlers
  /* PREVIOUS NAVIGATION HANDLERS:
  const handleNext = (e?: React.MouseEvent) => { ... }
  const handlePrev = (e?: React.MouseEvent) => { ... }
  */
  const handleNext = useCallback(() => {
    // PREVIOUS UI: Math.min(previousIndex + 1, MISSION_PROFILES.length - 1)
    setActiveIndex((previousIndex) => modulo(previousIndex + 1, MISSION_PROFILES.length))
  }, [])

  const handlePrev = useCallback(() => {
    // PREVIOUS UI: Math.max(previousIndex - 1, 0)
    setActiveIndex((previousIndex) => modulo(previousIndex - 1, MISSION_PROFILES.length))
  }, [])

  const handleSelect = useCallback((profileIndex: number) => {
    setActiveIndex(profileIndex)
  }, [])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      handlePrev()
    }

    if (event.key === "ArrowRight") {
      event.preventDefault()
      handleNext()
    }
  }

  /* PREVIOUS SCROLL MOTION ARCHITECTURE:
  // Title Animation
  const titleOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0])
  const titleY = useTransform(smoothProgress, [0, 0.1], [0, -30])
  const mobilePadding = useTransform(smoothProgress, [0.1, 0.8], ["1rem", "0.5rem"])

  // These transforms used to be duplicated inside every card. Keeping one shared
  // set dramatically reduces subscriptions and the type work required to compile this route.
  const widthCenterDesktop = useTransform(smoothProgress, [0, 0.4, 0.8], ["28vw", "55vw", "75vw"])
  const widthNeighborDesktop = useTransform(smoothProgress, [0, 0.4, 0.8], ["16vw", "11vw", "7vw"])
  const widthFarDesktop = useTransform(smoothProgress, [0, 0.4, 0.8], ["9vw", "7vw", "4vw"])
  const widthCenterMobile = useTransform(smoothProgress, [0, 0.4, 0.8], ["55vw", "75vw", "88vw"])
  const widthNeighborMobile = useTransform(smoothProgress, [0, 0.4, 0.8], ["25vw", "15vw", "8vw"])
  const widthFarMobile = useTransform(smoothProgress, [0, 0.4, 0.8], ["12vw", "8vw", "5vw"])

  const heightCenterDesktop = useTransform(smoothProgress, [0, 0.4, 0.8], ["70vh", "75vh", "80vh"])
  const heightNeighborDesktop = useTransform(smoothProgress, [0, 0.4, 0.8], ["45vh", "40vh", "30vh"])
  const heightFarDesktop = useTransform(smoothProgress, [0, 0.4, 0.8], ["25vh", "22vh", "20vh"])
  const heightCenterMobile = useTransform(smoothProgress, [0, 0.4, 0.8], ["40vh", "45vh", "60vh"])
  const heightNeighborMobile = useTransform(smoothProgress, [0, 0.4, 0.8], ["30vh", "25vh", "20vh"])
  const heightFarMobile = useTransform(smoothProgress, [0, 0.4, 0.8], ["18vh", "15vh", "12vh"])
  const neighborOpacity = useTransform(smoothProgress, [0, 0.4, 0.8], [0.85, 0.75, 0.5])
  const farOpacity = useTransform(smoothProgress, [0, 0.4, 0.8], [0.5, 0.35, 0.2])
  const textOpacity = useTransform(smoothProgress, [0.2, 0.4], [0, 1])
  const arrowOpacity = useTransform(smoothProgress, [0.4, 0.8], [0, 1])
  const centerGradientOpacity = useTransform(smoothProgress, [0.1, 0.4], [0.4, 0.85])

  const motionValues: MissionMotionValues = {
    centerWidth: isMobile ? widthCenterMobile : widthCenterDesktop,
    neighborWidth: isMobile ? widthNeighborMobile : widthNeighborDesktop,
    farWidth: isMobile ? widthFarMobile : widthFarDesktop,
    centerHeight: isMobile ? heightCenterMobile : heightCenterDesktop,
    neighborHeight: isMobile ? heightNeighborMobile : heightNeighborDesktop,
    farHeight: isMobile ? heightFarMobile : heightFarDesktop,
    neighborOpacity,
    farOpacity,
    textOpacity,
    arrowOpacity,
    centerGradientOpacity,
  }
  */

  const growth = useTransform(smoothProgress, [0.02, 0.84], [0, 1])
  const contentOpacity = useTransform(smoothProgress, [0.16, 0.34, 0.52], [0, 0.12, 1])
  const contentY = useTransform(smoothProgress, [0.18, 0.56], [28, 0])
  const sideLabelOpacity = useTransform(smoothProgress, [0, 0.34, 0.58], [0.9, 0.55, 0])
  const titleOpacity = useTransform(smoothProgress, [0, 0.1, 0.24], [1, 1, 0])
  const titleY = useTransform(smoothProgress, [0, 0.24], [0, -48])
  const titleScale = useTransform(smoothProgress, [0, 0.24], [1, 0.92])
  const ambientGlowOpacity = useTransform(smoothProgress, [0, 0.5, 0.9], [0.2, 0.48, 0.78])
  const scrollCueOpacity = useTransform(smoothProgress, [0, 0.12, 0.24], [1, 0.7, 0])
  const scrollProgressScale = useTransform(smoothProgress, [0, 0.94], [0, 1])

  const motionValues: MissionMotionValues = {
    growth,
    contentOpacity,
    contentY,
    sideLabelOpacity,
  }

  const visibleProfiles = getVisibleProfileSlots(activeIndex).map(({ slot, profileIndex }) => {
    return {
      slot,
      profileIndex,
      profile: MISSION_PROFILES[profileIndex],
    }
  })

  return (
    <>
      <style>{`
        @import url("https://fonts.cdnfonts.com/css/clash-grotesk");
        .font-clash-grotesk {
          font-family: "Clash Grotesk", sans-serif !important;
        }
      `}</style>

      {/* PREVIOUS UI: <div ref={containerRef} className="relative h-[450vh] bg-black font-clash-grotesk overflow-clip"> */}
      <div
        ref={containerRef}
        className={`relative isolate overflow-clip bg-black font-clash-grotesk focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-400 ${
          prefersReducedMotion ? "min-h-[100svh]" : "h-[320svh] md:h-[360vh]"
        }`}
        id="fenix-mission-carousel"
        role="region"
        aria-label="FENIX mission profiles"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {/* PREVIOUS UI: <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center"> */}
        <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden md:h-screen">

          {/* Premium ambient stage */}
          <motion.div
            aria-hidden="true"
            style={{
              opacity: prefersReducedMotion ? 0.42 : ambientGlowOpacity,
              background:
                "radial-gradient(circle at 50% 52%, rgba(8,145,178,0.22) 0%, rgba(6,78,99,0.08) 30%, rgba(0,0,0,0) 66%)",
            }}
            className="pointer-events-none absolute inset-0"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.055]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(103,232,249,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(103,232,249,0.22) 1px, transparent 1px)",
              backgroundSize: "52px 52px",
              maskImage: "radial-gradient(circle at center, black 0%, transparent 72%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.86)_100%)]"
          />

          {/* Section Title */}
          {/* PREVIOUS UI: title used only opacity/y and a static cyan underline. */}
          <motion.header
            style={{
              opacity: prefersReducedMotion ? 1 : titleOpacity,
              y: prefersReducedMotion ? 0 : titleY,
              scale: prefersReducedMotion ? 1 : titleScale,
            }}
            className="absolute top-6 z-[70] px-5 text-center sm:top-7"
          >
            <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.42em] text-cyan-300/70 sm:text-[10px]">
              FENIX / Operational envelope
            </p>
            <h2 className="text-4xl font-medium tracking-tight text-white drop-shadow-2xl sm:text-5xl md:text-7xl" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>
              Mission Profiles
            </h2>
            <div className="mx-auto mt-3 h-px w-28 overflow-hidden bg-white/15 sm:mt-4 sm:w-36">
              <motion.div
                style={{ scaleX: prefersReducedMotion ? 0.42 : growth }}
                className="h-full origin-left bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 shadow-[0_0_16px_rgba(34,211,238,0.9)]"
              />
            </div>
          </motion.header>

          {/* Floating Navigation Controls */}
          {/* PREVIOUS UI: navigation stopped at the first/last card and disabled its edge button. */}
          <div className="absolute left-2 top-1/2 z-[80] -translate-y-1/2 sm:left-5 md:left-8 lg:left-12">
            <motion.button
              type="button"
              onClick={handlePrev}
              whileHover={prefersReducedMotion ? undefined : { x: -3, scale: 1.08 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-colors hover:border-cyan-300/70 hover:bg-cyan-400/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 sm:h-12 sm:w-12 md:h-14 md:w-14"
              aria-label="Previous mission profile"
              aria-controls="fenix-mission-cards"
            >
              <ChevronLeft className="h-5 w-5 text-cyan-300 transition-colors group-hover:text-white sm:h-6 sm:w-6" />
            </motion.button>
          </div>

          <div className="absolute right-2 top-1/2 z-[80] -translate-y-1/2 sm:right-5 md:right-8 lg:right-12">
            <motion.button
              type="button"
              onClick={handleNext}
              whileHover={prefersReducedMotion ? undefined : { x: 3, scale: 1.08 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-colors hover:border-cyan-300/70 hover:bg-cyan-400/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 sm:h-12 sm:w-12 md:h-14 md:w-14"
              aria-label="Next mission profile"
              aria-controls="fenix-mission-cards"
            >
              <ChevronRight className="h-5 w-5 text-cyan-300 transition-colors group-hover:text-white sm:h-6 sm:w-6" />
            </motion.button>
          </div>

          {/* Cards Container */}
          {/* PREVIOUS UI:
          <motion.div
            id="fenix-mission-cards"
            style={{
              paddingLeft: isMobile ? mobilePadding : "",
              paddingRight: isMobile ? mobilePadding : ""
            }}
            className="relative w-full h-full flex items-center justify-center gap-6 md:gap-10 px-4 md:pl-48 md:pr-12"
          >
            {MISSION_PROFILES.map((profile, index) => (
              <ProfileCard
                key={profile.title}
                profile={profile}
                index={index}
                activeIndex={activeIndex}
                smoothProgress={smoothProgress}
                handleNext={handleNext}
                handlePrev={handlePrev}
                isMobile={isMobile}
              />
            ))}
          </motion.div>
          */}
          {/* PREVIOUS UI: raw array distance rendered only three cards at the collection edges. */}
          <div
            id="fenix-mission-cards"
            className="absolute inset-0 z-20 overflow-hidden [perspective:1600px]"
          >
            <AnimatePresence initial={false} mode="popLayout">
              {visibleProfiles.map(({ profile, profileIndex, slot }) => (
                <ProfileCard
                  key={`${profile.title}-${isMobile ? "mobile" : "desktop"}`}
                  profile={profile}
                  profileIndex={profileIndex}
                  slot={slot}
                  motionValues={motionValues}
                  onSelect={handleSelect}
                  isMobile={isMobile}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </AnimatePresence>
          </div>

          <motion.p
            aria-hidden="true"
            style={{ opacity: prefersReducedMotion ? 0 : scrollCueOpacity }}
            className="pointer-events-none absolute bottom-14 left-1/2 z-[70] -translate-x-1/2 whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.38em] text-white/45 sm:bottom-16 sm:text-[9px]"
          >
            Scroll to expand
          </motion.p>

          <div className="absolute bottom-5 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-3 sm:bottom-6">
            <span className="w-5 text-right text-[9px] font-semibold tabular-nums text-cyan-300/90">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <div className="relative flex items-center gap-1.5 rounded-full border border-white/10 bg-black/45 px-3 py-2 backdrop-blur-xl">
              <div className="absolute inset-x-3 top-0 h-px overflow-hidden bg-white/10">
                <motion.div
                  style={{ scaleX: prefersReducedMotion ? 0.42 : scrollProgressScale }}
                  className="h-full origin-left bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.8)]"
                />
              </div>
              {MISSION_PROFILES.map((profile, profileIndex) => (
                <button
                  key={profile.title}
                  type="button"
                  onClick={() => handleSelect(profileIndex)}
                  className={`h-1.5 rounded-full transition-[width,background-color] duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                    profileIndex === activeIndex ? "w-7 bg-cyan-300" : "w-2 bg-white/25 hover:bg-white/55"
                  }`}
                  aria-label={`Show ${profile.title}`}
                  aria-current={profileIndex === activeIndex ? "true" : undefined}
                />
              ))}
            </div>
            <span className="w-5 text-[9px] font-semibold tabular-nums text-white/35">
              {String(MISSION_PROFILES.length).padStart(2, "0")}
            </span>
          </div>

          <p className="sr-only" aria-live="polite">
            Showing {MISSION_PROFILES[activeIndex].title}, profile {activeIndex + 1} of {MISSION_PROFILES.length}
          </p>
        </div>
      </div>
    </>
  )
}

function ProfileCard({
  profile,
  profileIndex,
  slot,
  motionValues,
  onSelect,
  isMobile,
  prefersReducedMotion,
}: {
  profile: ProfileCardProps
  profileIndex: number
  slot: CardSlot
  motionValues: MissionMotionValues
  onSelect: (profileIndex: number) => void
  isMobile: boolean
  prefersReducedMotion: boolean
}) {
  const slotTarget = useMotionValue<number>(slot)
  const springSlot = useSpring(slotTarget, {
    stiffness: 260,
    damping: 30,
    mass: 0.8,
    restDelta: 0.001,
  })

  useEffect(() => {
    slotTarget.set(slot)
  }, [slot, slotTarget])

  const animatedSlot = prefersReducedMotion ? slotTarget : springSlot
  const geometry = useTransform(
    [animatedSlot, motionValues.growth],
    ([latestSlot, latestGrowth]: number[]) =>
      getCardGeometry(latestSlot, latestGrowth, isMobile, prefersReducedMotion),
  )

  const width = useTransform(geometry, (latest) => latest.width)
  const height = useTransform(geometry, (latest) => latest.height)
  const x = useTransform(geometry, (latest) => latest.x)
  const y = useTransform(geometry, (latest) => latest.y)
  const opacity = useTransform(geometry, (latest) => latest.opacity)
  const rotateY = useTransform(geometry, (latest) => latest.rotateY)
  const zIndex = useTransform(geometry, (latest) => latest.zIndex)
  const imageScale = useTransform(geometry, (latest) => latest.imageScale)
  const imageFilter = useTransform(geometry, (latest) => latest.imageFilter)
  const overlayOpacity = useTransform(geometry, (latest) => latest.overlayOpacity)
  const borderColor = useTransform(geometry, (latest) => latest.borderColor)
  const boxShadow = useTransform(geometry, (latest) => latest.boxShadow)

  const isCenterCard = slot === 0
  const isNeighborCard = Math.abs(slot) === 1
  const cardNumber = String(profileIndex + 1).padStart(2, "0")
  const contentOpacity = prefersReducedMotion ? 1 : motionValues.contentOpacity
  const contentY = prefersReducedMotion ? 0 : motionValues.contentY
  const sideLabelOpacity = prefersReducedMotion ? 0.8 : motionValues.sideLabelOpacity

  return (
    <motion.article
      initial={false}
      exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
      transformTemplate={(_, generatedTransform) => `translate(-50%, -50%) ${generatedTransform}`}
      style={{
        left: "50%",
        top: "50%",
        width,
        height,
        x,
        y,
        opacity,
        rotateY,
        zIndex,
        borderColor,
        boxShadow,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        contain: "paint",
      }}
      className="group absolute overflow-hidden rounded-2xl border bg-neutral-950 will-change-[width,height,transform,opacity] md:rounded-[1.4rem]"
      aria-label={`${profile.title}${isCenterCard ? ", active mission profile" : ""}`}
      aria-current={isCenterCard ? "true" : undefined}
    >
      <motion.img
        src={profile.imageUrl}
        alt={profile.title}
        loading={Math.abs(slot) <= 1 ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        style={{ scale: imageScale, filter: imageFilter }}
        className="absolute inset-0 h-full w-full select-none object-cover will-change-transform"
      />

      <motion.div
        aria-hidden="true"
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/35 to-black/10"
      />
      <div aria-hidden="true" className="absolute inset-0 z-10 bg-[linear-gradient(115deg,rgba(255,255,255,0.05),transparent_32%,transparent_68%,rgba(34,211,238,0.06))]" />

      {isCenterCard && (
        <>
          {/* PREVIOUS UI: the active card displayed a cyan gradient edge line.
          <motion.div
            aria-hidden="true"
            style={{ scaleX: prefersReducedMotion ? 0.42 : motionValues.growth }}
            className="absolute inset-x-0 top-0 z-30 h-[2px] origin-left bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_18px_rgba(103,232,249,0.95)]"
          />
          */}
          {!prefersReducedMotion && (
            <motion.div
              aria-hidden="true"
              initial={{ x: "-160%" }}
              animate={{ x: "190%" }}
              transition={{ duration: 3.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 2.8 }}
              className="pointer-events-none absolute inset-y-0 z-20 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
            />
          )}
        </>
      )}

      {!isCenterCard && (
        <button
          type="button"
          onClick={() => onSelect(profileIndex)}
          className="absolute inset-0 z-40 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-300 md:rounded-[1.4rem]"
          aria-label={`Make ${profile.title} the active mission profile`}
        />
      )}

      {isNeighborCard && (
        <>
          <motion.div
            aria-hidden="true"
            style={{ opacity: sideLabelOpacity }}
            className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/45 text-cyan-300 shadow-lg backdrop-blur-md sm:h-12 sm:w-12">
              {slot < 0 ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </div>
          </motion.div>
          <motion.div
            aria-hidden="true"
            style={{ opacity: sideLabelOpacity }}
            className="pointer-events-none absolute inset-x-0 bottom-0 z-30 hidden bg-gradient-to-t from-black/90 to-transparent p-4 md:block"
          >
            <p className="mb-1 text-[8px] font-semibold uppercase tracking-[0.28em] text-cyan-300/70">
              Profile {cardNumber}
            </p>
            <p className="line-clamp-2 text-xs font-semibold leading-tight text-white/80">
              {profile.title}
            </p>
          </motion.div>
        </>
      )}

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="pointer-events-none absolute inset-0 z-30 p-5 sm:p-8 md:p-10 lg:p-12 xl:p-14"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isCenterCard && (
            <motion.div
              key={`premium-content-${profile.title}`}
              className="flex h-full flex-col justify-between"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: prefersReducedMotion ? 0.08 : 0.36, ease: [0.22, 1, 0.36, 1], delay: prefersReducedMotion ? 0 : 0.12 }}
            >
              <div>
                <div className="mb-3 flex items-center justify-between gap-4">
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-cyan-300 sm:text-[10px] md:text-xs">
                    Operational profile
                  </p>
                  <p className="text-[9px] font-semibold tabular-nums tracking-[0.2em] text-white/45 sm:text-[10px]">
                    {cardNumber} / {String(MISSION_PROFILES.length).padStart(2, "0")}
                  </p>
                </div>
                <h3
                  className="max-w-4xl text-2xl font-bold leading-[0.95] tracking-tight text-white drop-shadow-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
                  style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}
                >
                  {profile.title}
                </h3>
              </div>

              <div className="max-w-2xl">
                <div className="mb-4 h-px w-16 bg-gradient-to-r from-cyan-300 to-transparent sm:w-24" />
                <p className="text-sm font-normal leading-relaxed text-white/90 drop-shadow-lg sm:text-base md:text-lg lg:text-xl">
                  {profile.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.article>
  )
}

// PREVIOUS UI IMPLEMENTATION: retained for direct rollback per project preservation rules.
function PreviousProfileCard({
  profile,
  index,
  activeIndex,
  // PREVIOUS PROP: smoothProgress,
  motionValues,
  handleNext,
  handlePrev,
  isMobile
}: {
  profile: ProfileCardProps
  index: number
  activeIndex: number
  // PREVIOUS PROP TYPE: smoothProgress: any
  motionValues: LegacyMissionMotionValues
  // PREVIOUS HANDLER TYPES: (e?: React.MouseEvent) => void
  handleNext: () => void
  handlePrev: () => void
  isMobile: boolean
}) {
  const isCenterCard = index === activeIndex
  const distanceFromCenter = index - activeIndex
  const isNextCard = index === activeIndex + 1
  const isPrevCard = index === activeIndex - 1

  /* PREVIOUS PER-CARD MOTION VALUES:
  // Card Width
  const widthCenterDesktop = useTransform(smoothProgress, [0, 0.4, 0.8], ["28vw", "55vw", "75vw"])
  const widthNeighborDesktop = useTransform(smoothProgress, [0, 0.4, 0.8], ["16vw", "11vw", "7vw"])
  const widthFarDesktop = useTransform(smoothProgress, [0, 0.4, 0.8], ["9vw", "7vw", "4vw"])

  const widthCenterMobile = useTransform(smoothProgress, [0, 0.4, 0.8], ["55vw", "75vw", "88vw"])
  const widthNeighborMobile = useTransform(smoothProgress, [0, 0.4, 0.8], ["25vw", "15vw", "8vw"])
  const widthFarMobile = useTransform(smoothProgress, [0, 0.4, 0.8], ["12vw", "8vw", "5vw"])

  const widthCenter = isMobile ? widthCenterMobile : widthCenterDesktop
  const widthNeighbor = isMobile ? widthNeighborMobile : widthNeighborDesktop
  const widthFar = isMobile ? widthFarMobile : widthFarDesktop

  const width = isCenterCard ? widthCenter : (isPrevCard || isNextCard ? widthNeighbor : widthFar)

  // Card Height
  const heightCenterDesktop = useTransform(smoothProgress, [0, 0.4, 0.8], ["70vh", "75vh", "80vh"])
  const heightNeighborDesktop = useTransform(smoothProgress, [0, 0.4, 0.8], ["45vh", "40vh", "30vh"])
  const heightFarDesktop = useTransform(smoothProgress, [0, 0.4, 0.8], ["25vh", "22vh", "20vh"])

  const heightCenterMobile = useTransform(smoothProgress, [0, 0.4, 0.8], ["40vh", "45vh", "60vh"])
  const heightNeighborMobile = useTransform(smoothProgress, [0, 0.4, 0.8], ["30vh", "25vh", "20vh"])
  const heightFarMobile = useTransform(smoothProgress, [0, 0.4, 0.8], ["18vh", "15vh", "12vh"])

  const heightCenter = isMobile ? heightCenterMobile : heightCenterDesktop
  const heightNeighbor = isMobile ? heightNeighborMobile : heightNeighborDesktop
  const heightFar = isMobile ? heightFarMobile : heightFarDesktop

  const height = isCenterCard ? heightCenter : (isPrevCard || isNextCard ? heightNeighbor : heightFar)

  // X offset translation to ensure activeCard stays 100% centered
  const xTranslateDesktop = useTransform(smoothProgress, [0, 0.4, 0.8], [
    distanceFromCenter * 32,
    distanceFromCenter * 36,
    distanceFromCenter * 42
  ])
  const xTranslateMobile = useTransform(smoothProgress, [0, 0.4, 0.8], [
    distanceFromCenter * 55,
    distanceFromCenter * 65,
    distanceFromCenter * 75
  ])
  const xTransformVal = isMobile ? xTranslateMobile : xTranslateDesktop

  // Card Opacity
  const opacityNeighbor = useTransform(smoothProgress, [0, 0.4, 0.8], [0.85, 0.75, 0.5])
  const opacityFar = useTransform(smoothProgress, [0, 0.4, 0.8], [0.5, 0.35, 0.2])
  const opacity = isCenterCard ? 1 : (isPrevCard || isNextCard ? opacityNeighbor : opacityFar)

  // Text Overlay Opacity
  const textOpacityVal = useTransform(smoothProgress, [0.2, 0.4], [0, 1])
  const textOpacity = isCenterCard ? textOpacityVal : 0

  // Navigation Arrow Opacity
  const arrowOpacity = useTransform(smoothProgress, [0.4, 0.8], [0, 1])

  // Gradient Overlay Opacity
  const gradientOpacityVal = useTransform(smoothProgress, [0.1, 0.4], [0.4, 0.85])
  const gradientOpacity = isCenterCard ? gradientOpacityVal : 0.65

  // Only render cards that are visible
  const isVisible = Math.abs(distanceFromCenter) <= 2
  const finalOpacity = isVisible ? opacity : 0
  const pointerEvents = isVisible ? 'auto' : 'none'
  */

  const isNeighborCard = isPrevCard || isNextCard
  const width = isCenterCard
    ? motionValues.centerWidth
    : isNeighborCard
      ? motionValues.neighborWidth
      : motionValues.farWidth
  const height = isCenterCard
    ? motionValues.centerHeight
    : isNeighborCard
      ? motionValues.neighborHeight
      : motionValues.farHeight
  const finalOpacity = isCenterCard
    ? 1
    : isNeighborCard
      ? motionValues.neighborOpacity
      : motionValues.farOpacity
  const textOpacity = isCenterCard ? motionValues.textOpacity : 0
  const arrowOpacity = motionValues.arrowOpacity
  const gradientOpacity = isCenterCard ? motionValues.centerGradientOpacity : 0.65
  const pointerEvents: React.CSSProperties["pointerEvents"] = isCenterCard || isNeighborCard ? "auto" : "none"

  // PREVIOUS UI:
  // <motion.div layout layoutId={`card-${profile.title}`} style={{ width, height, opacity: finalOpacity, zIndex: isCenterCard ? 40 : 10, pointerEvents: pointerEvents as any }}>
  return (
    <motion.div
      initial={false}
      animate={{
        x: isMobile ? `${distanceFromCenter * 68}vw` : `${distanceFromCenter * 34}vw`,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 28
      }}
      style={{
        position: "absolute",
        width,
        height,
        opacity: finalOpacity,
        zIndex: isCenterCard ? 40 : (Math.abs(distanceFromCenter) === 1 ? 20 : 10),
        // PREVIOUS UI: pointerEvents: pointerEvents as any
        pointerEvents
      }}
      onClick={() => {
        if (isPrevCard) handlePrev()
        if (isNextCard) handleNext()
      }}
      className={`overflow-hidden rounded-xl md:rounded-2xl border border-white/20 shadow-2xl bg-neutral-900 group ${!isCenterCard && (isPrevCard || isNextCard) ? 'cursor-pointer hover:border-cyan-400/50' : ''}`}
    >
      {/* Background Image */}
      <motion.img
        src={profile.imageUrl}
        alt={profile.title}
        loading={isCenterCard ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{
          scale: isCenterCard ? 1.08 : 1,
          filter: isCenterCard ? "brightness(1) contrast(1.05)" : "brightness(0.6) blur(1px)",
        }}
        transition={{
          scale: { duration: 0.8, ease: "easeOut" },
          filter: { duration: 0.5, ease: "easeInOut" }
        }}
      />

      {/* Dark Gradient Overlay for Crisp Text Contrast */}
      <motion.div
        style={{ opacity: gradientOpacity }}
        className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 z-10"
      />

      {/* Navigation Icons for Side Cards */}
      {!isCenterCard && (isNextCard || isPrevCard) && (
        <motion.div
          style={{ opacity: arrowOpacity }}
          className="absolute inset-0 z-30 flex items-center justify-center"
        >
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-cyan-500/40 group-hover:border-cyan-400 transition-all duration-300 pointer-events-auto shadow-lg"
          >
            {isPrevCard && <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-cyan-400 group-hover:text-white transition-colors" />}
            {isNextCard && <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-cyan-400 group-hover:text-white transition-colors" />}
          </div>
        </motion.div>
      )}

      {/* Content for Center Card */}
      {/* PREVIOUS UI: <div className="absolute inset-0 ... flex flex-col justify-between pointer-events-none"> */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="pointer-events-none absolute inset-0 z-20 p-6 sm:p-8 md:p-12 lg:p-14"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isCenterCard && (
            <motion.div
              key={`content-${profile.title}`}
              className="flex h-full flex-col justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* PREVIOUS UI:
              <motion.div key={`text-top-${profile.title}`} ... >
                <p className="text-cyan-400 font-bold ... text-[9px] md:text-xs">Operational Profile</p>
                <h3 className="...">...</h3>
              </motion.div>
              <motion.div key={`text-bot-${profile.title}`} ... >
                <p className="text-lg md:text-xl font-light leading-relaxed text-neutral-600">{profile.description}</p>
              </motion.div>
              */}
              {/* PREVIOUS UI: the title block used style={{ opacity: textOpacity }}, which conflicted with animate.opacity. */}
              <motion.div
                key={`text-top-${profile.title}`}
                className="text-left"
                initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              >
                <p className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs mb-2 drop-shadow-md">Operational Profile</p>
                <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl max-w-3xl" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>
                  {profile.title}
                </h3>
              </motion.div>

              {/* PREVIOUS UI: the description block used style={{ opacity: textOpacity }}, which conflicted with animate.opacity. */}
              <motion.div
                key={`text-bot-${profile.title}`}
                className="max-w-2xl text-left"
                initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
              >
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-relaxed text-white/90 drop-shadow-lg">
                  {profile.description}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
