"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { HERO_4K, useHeroVideoSource } from "@/lib/use-hero-video-source"

// MANTIS hero video plus its subtitle. The subtitle fades in once the video has played 4 seconds.
// PREVIOUS UI: both lived in app/mantis/page.tsx and the subtitle showed as soon as the page loaded.
const SUBTITLE_AT = 4 // seconds of video
// If the video can't play (e.g. autoplay blocked), show the subtitle anyway after this long on the page
const FALLBACK_MS = 8000

// Which clip each screen gets. Width/height of the hero decides it, so the clip is always close to the screen's shape:
//   tall portrait phones (width/height <= 0.54, e.g. iPhone X-16, Pixel, Galaxy)  -> 1080x2340 clip (0.46)
//   shorter portrait phones and small tablets (iPhone SE, Safari with bars showing) -> 1080x1920 clip (0.5625)
//   landscape phones and everything 768px+                                          -> 3840x1920 desktop clip
// Fit and crop rules per shape live with .mantis-hero-video in globals.css.
// PREVIOUS UI: one phone source for every (max-width: 767px) screen, including phones held sideways.
const TALL_PHONE = "(max-width: 767px) and (orientation: portrait) and (max-aspect-ratio: 27/50)"
const PHONE = "(max-width: 767px) and (orientation: portrait)"
//   upright tablets (768px+ wide, portrait, e.g. iPad)                            -> 1440x2160 tablet clip (0.667)
const TABLET = "(min-width: 768px) and (orientation: portrait)"

export default function MantisHeroMedia() {
  const reduceMotion = useReducedMotion()
  const [showSubtitle, setShowSubtitle] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setShowSubtitle(true), FALLBACK_MS)
    return () => clearTimeout(timer)
  }, [])

  // PREVIOUS UI: this component had its own copy of the clip re-pick logic, now shared with STORM and FENIX.
  useHeroVideoSource(videoRef)

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        muted
        // PREVIOUS UI: loop replayed the hero indefinitely. Native ended playback retains the final frame.
        playsInline
        preload="auto"
        onTimeUpdate={({ currentTarget: video }) => { if (video.currentTime >= SUBTITLE_AT) setShowSubtitle(true) }}
        onEnded={() => setShowSubtitle(true)}
        // PREVIOUS UI: object-cover cropped the sides on taller laptop viewports.
        // PREVIOUS UI: className="absolute inset-0 h-full w-full object-cover md:object-contain object-center"; on phones
        // taller than 9:16 (e.g. iPhone 16 Pro Max, 440x956) cover cut ~49px off each side, cropping the MANTIS title
        // and the drone's arms.
        // PREVIOUS UI: className="mantis-hero-video absolute inset-0 h-full w-full object-cover object-center md:object-contain"
        // (single 1080x2340 phone clip; short phones lost the top LED bar, 21:9 phones the side LEDs).
        // object-fit / object-position / bottom fade now come from .mantis-hero-video in globals.css.
        className="mantis-hero-video absolute inset-0 h-full w-full"
      >
        {/* PREVIOUS UI: desktop clip was the only source at every viewport width. */}
        {/* PREVIOUS UI: <source media="(max-width: 767px)" src="/product/Mantis/Hero_Section/MANTIS_hero_mobile_1080x2340.mp4" /> */}
        {/* PREVIOUS UI: full-size masters: MANTIS_hero_mobile_1080x2340.mp4, MANTIS_hero_video_mobile.mp4,
            MANTIS_hero_video_tab.mp4, and MANTIS_hero_vedio.mp4?v=20261112 (18 MB 4K on every laptop and desktop). */}
        <source media={TALL_PHONE} src="/product/Mantis/Hero_Section/optimized/phone-tall.mp4" type="video/mp4" />
        <source media={PHONE} src="/product/Mantis/Hero_Section/optimized/phone.mp4" type="video/mp4" />
        {/* PREVIOUS UI: upright tablets got the desktop clip below. Now they get the 1440x2160 (2:3) tablet clip;
            turned sideways they switch back to the desktop clip (useHeroVideoSource re-picks on rotation). */}
        <source media={TABLET} src="/product/Mantis/Hero_Section/optimized/tablet.mp4" type="video/mp4" />
        <source media={HERO_4K} src="/product/Mantis/Hero_Section/optimized/desktop-4k.mp4" type="video/mp4" />
        <source src="/product/Mantis/Hero_Section/optimized/desktop-1080.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
      <motion.p
        className="absolute z-30 bottom-[clamp(20px,3svh,40px)] inset-x-0 px-6 text-center font-orbit text-[clamp(14px,1.8vw,30px)] font-normal leading-snug text-white text-balance"
        initial={reduceMotion ? false : { opacity: 0, filter: "blur(6px)" }}
        animate={showSubtitle || reduceMotion ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(6px)" }}
        transition={{ duration: reduceMotion ? 0 : 0.8 }}
      >
        Mission Adaptive Networked Targeting and Interception System
      </motion.p>
    </>
  )
}
