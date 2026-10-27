"use client"
import React, { useEffect, useRef, useState } from "react"
import type { JSX } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ProductHeroTitle } from "@/components/ProductHeading"
import { fetchBlobWithRetry } from "@/lib/media-retry"
import { TANK_TRACK } from "./batHeroTankTrack"

const HERO_VIDEO = "/product/T-BAT/bat-hero-scenes-scroll-clean.mp4"
const HERO_POSTER = "/product/T-BAT/bat-hero-scenes-poster.webp"
// Same footage as HERO_VIDEO, rebuilt at 1080p from the original clips in "HERO video" with a keyframe
// every 4 frames (x264 keyint=4, bframes=0, crf 18), so a seek decodes at most 4 frames. 581 frames at 24 fps.
const SCRUB_VIDEO = "/product/T-BAT/bat-hero-scrub.mp4"
const SCRUB_FPS = 24
// PREVIOUS UI: the zoom counter showed from scroll progress 0.756 as a bare "20×" ... "1×" number.

// Detection box on the tank in the last scene. Both hero videos share one edit, so scene 7 starts at the same frame.
const TANK_SCENE_START = 436
// Scene-7 frames over which the box fades out as the tank shrinks to a speck (about 36px -> 22px wide at 1280).
const TANK_FADE_START = 60
const TANK_FADE_FRAMES = 12

// Positions the box for a frame of `video`, matching how object-cover scales and crops it.
function placeTankBox(box: HTMLDivElement | null, confidence: HTMLSpanElement | null, video: HTMLVideoElement, frame: number) {
  if (!box) return
  const i = frame - TANK_SCENE_START
  const tank = TANK_TRACK[i]
  const fade = !tank ? 0 : i < 3 ? (i + 1) / 3 : 1 - Math.min(1, Math.max(0, (i - TANK_FADE_START) / TANK_FADE_FRAMES))
  box.style.opacity = String(fade)
  if (!tank || !fade) return
  const vw = video.videoWidth || 16, vh = video.videoHeight || 9
  const scale = Math.max(video.clientWidth / vw, video.clientHeight / vh)
  const dw = vw * scale, dh = vh * scale
  const [cx, cy, w, h] = tank
  box.style.transform = `translate(${(video.clientWidth - dw) / 2 + (cx - w / 2) * dw}px, ${(video.clientHeight - dh) / 2 + (cy - h / 2) * dh}px)`
  box.style.width = `${w * dw}px`
  box.style.height = `${h * dh}px`
  // Confidence eases down a little as the tank gets smaller, like a live detector
  if (confidence) confidence.textContent = (0.97 - 0.06 * Math.min(1, Math.max(0, (i - 30) / 40))).toFixed(2)
}

// The last scene's bottom-left corner is blurred in the video (garbled AI text in the source, at x 0-340,
// y 620-720 of 1280x720). The zoom readout is a HUD panel docked over exactly that area.
const BLUR_AREA = { x: 0, y: 620 / 720, w: 340 / 1280, h: 100 / 720 }
const LAST_SCENE_FRAMES = 145
const MAX_ZOOM = 20

function placeZoomPanel(panel: HTMLDivElement | null, value: HTMLSpanElement | null, fill: HTMLDivElement | null, video: HTMLVideoElement, frame: number) {
  if (!panel) return
  const i = frame - TANK_SCENE_START
  const inScene = i >= 0 && i < LAST_SCENE_FRAMES
  panel.style.opacity = inScene ? "1" : "0"
  if (!inScene) return
  // Camera zoom-out is geometric: 20x falls quickly at first, then eases towards 1x
  const zoom = Math.pow(MAX_ZOOM, 1 - i / (LAST_SCENE_FRAMES - 1))
  if (value) value.textContent = `${zoom.toFixed(1)}×`
  if (fill) fill.style.transform = `scaleX(${(zoom - 1) / (MAX_ZOOM - 1)})`
  // Cover the blurred area as the video is cropped on this screen; never smaller than the panel's content
  const vw = video.videoWidth || 16, vh = video.videoHeight || 9
  const scale = Math.max(video.clientWidth / vw, video.clientHeight / vh)
  const dw = vw * scale, dh = vh * scale
  const ox = (video.clientWidth - dw) / 2, oy = (video.clientHeight - dh) / 2
  const right = ox + (BLUR_AREA.x + BLUR_AREA.w) * dw
  const top = oy + BLUR_AREA.y * dh
  panel.style.width = `${Math.max(288, Math.ceil(right))}px`
  panel.style.height = `${Math.max(72, Math.ceil(video.clientHeight - top))}px`
}

const scrollProgress = (track: HTMLElement) => {
  const rect = track.getBoundingClientRect()
  const distance = rect.height - window.innerHeight
  return distance > 0 ? Math.min(1, Math.max(0, -rect.top / distance)) : 0
}

export default function BatHero(): React.JSX.Element {
  const trackRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const scrubRef = useRef<HTMLVideoElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const zoomRef = useRef<HTMLDivElement>(null)
  const zoomValueRef = useRef<HTMLSpanElement>(null)
  const zoomFillRef = useRef<HTMLDivElement>(null)
  const tankBoxRef = useRef<HTMLDivElement>(null)
  const tankConfidenceRef = useRef<HTMLSpanElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)")
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    const video = videoRef.current
    const scrub = scrubRef.current
    if (!track || !video || !scrub) return
    if (reduceMotion) {
      // The hero is one screen tall here, so the poster (the opening frame) is shown on its own.
      video.pause()
      video.style.opacity = "0"
      if (contentRef.current) contentRef.current.style.opacity = "1"
      return
    }
    video.style.opacity = "1"
    if (isMobile || window.matchMedia("(max-width: 767px)").matches) {
      let visible = false
      const syncPlayback = () => {
        if (visible && !document.hidden) void video.play().catch(() => {})
        else video.pause()
      }
      const observer = new IntersectionObserver((entries) => {
        // Latest entry: one batch can also hold an older state (e.g. after a reload restores the scroll position)
        const entry = entries[entries.length - 1]
        visible = entry.isIntersecting
        syncPlayback()
      })
      observer.observe(track)
      document.addEventListener("visibilitychange", syncPlayback)
      // The looping phone video moves the tank box with every frame it shows
      let frameHandle = 0
      const onVideoFrame = (_now: number, meta: { mediaTime: number }) => {
        placeTankBox(tankBoxRef.current, tankConfidenceRef.current, video, Math.round(meta.mediaTime * SCRUB_FPS))
        frameHandle = video.requestVideoFrameCallback(onVideoFrame)
      }
      const onTimeUpdate = () => placeTankBox(tankBoxRef.current, tankConfidenceRef.current, video, Math.round(video.currentTime * SCRUB_FPS))
      // Older browsers (Firefox before 132) lack per-frame callbacks and fall back to timeupdate
      const hasFrameCallback = typeof video.requestVideoFrameCallback === "function"
      if (hasFrameCallback) frameHandle = video.requestVideoFrameCallback(onVideoFrame)
      else video.addEventListener("timeupdate", onTimeUpdate)
      return () => {
        observer.disconnect()
        video.pause()
        document.removeEventListener("visibilitychange", syncPlayback)
        if (hasFrameCallback) video.cancelVideoFrameCallback(frameHandle)
        else video.removeEventListener("timeupdate", onTimeUpdate)
        if (tankBoxRef.current) tankBoxRef.current.style.opacity = "0"
      }
    }

    // The scroll position picks a time in one video. The whole file is downloaded once into memory,
    // so scrubbing never goes back to Wix (which rate-limits uncached requests).
    const abort = new AbortController()
    let objectUrl = ""
    let ready = false
    let wantedTime = 0

    // Latest position wins: a new seek starts only after the previous one has finished.
    const seek = () => {
      if (!ready || scrub.seeking) return
      if (Math.abs(scrub.currentTime - wantedTime) > 0.5 / SCRUB_FPS) scrub.currentTime = wantedTime
    }
    // The frame actually on screen (seeks aim at frame middles), for the tank box
    const shownFrame = () => Math.floor(scrub.currentTime * SCRUB_FPS)
    const onSeeked = () => {
      scrub.style.opacity = "1"
      placeTankBox(tankBoxRef.current, tankConfidenceRef.current, scrub, shownFrame())
      placeZoomPanel(zoomRef.current, zoomValueRef.current, zoomFillRef.current, scrub, shownFrame())
      seek()
    }

    const onScroll = () => {
      const progress = scrollProgress(track)
      if (ready) {
        const lastFrame = Math.round(scrub.duration * SCRUB_FPS) - 1
        // Aim at the middle of a frame so the browser never lands between two of them.
        wantedTime = (Math.round(progress * lastFrame) + 0.5) / SCRUB_FPS
        seek()
      }
      if (contentRef.current) contentRef.current.style.opacity = String(1 - Math.min(1, Math.max(0, (progress - .04) / .1)))
    }

    const onLoaded = () => {
      ready = true
      onScroll()
      // Always jump once, even at the top, so the sharp video replaces the poster straight away.
      scrub.currentTime = wantedTime
    }
    scrub.addEventListener("seeked", onSeeked)
    scrub.addEventListener("loadeddata", onLoaded)
    // Wix answers part-file (Range) requests with the whole file, so a <video> loading the URL itself
    // cannot seek on the live site. The in-memory download is therefore retried (Wix also sends 429 when
    // busy); the plain URL is only a last resort, where the video at least shows.
    void fetchBlobWithRetry(SCRUB_VIDEO, { signal: abort.signal }).then((blob) => {
      if (abort.signal.aborted) return
      objectUrl = blob ? URL.createObjectURL(blob) : ""
      scrub.src = objectUrl || SCRUB_VIDEO
    })

    const onResize = () => {
      onScroll()
      if (!ready) return
      placeTankBox(tankBoxRef.current, tankConfidenceRef.current, scrub, shownFrame())
      placeZoomPanel(zoomRef.current, zoomValueRef.current, zoomFillRef.current, scrub, shownFrame())
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    onScroll()
    return () => {
      if (tankBoxRef.current) tankBoxRef.current.style.opacity = "0"
      if (zoomRef.current) zoomRef.current.style.opacity = "0"
      abort.abort()
      scrub.removeEventListener("seeked", onSeeked)
      scrub.removeEventListener("loadeddata", onLoaded)
      scrub.removeAttribute("src")
      scrub.load()
      if (objectUrl) URL.revokeObjectURL(objectUrl)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
    }
  }, [reduceMotion, isMobile])

  return (
    <section
      ref={trackRef}
      data-bat-section="hero" data-navbar-text="white" className={`bat-hero-track relative h-[100dvh] md:h-[400dvh] w-full text-white font-orbit${reduceMotion ? " bat-hero-reduced" : ""}`}
    >
      {/* PREVIOUS UI: a looping background <video> (v-bat-hero-3.mp4) filled a single h-screen hero. */}
      <div
        className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-black bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_POSTER})` }}
      >
      <video ref={scrubRef} muted playsInline preload="auto" className="absolute inset-0 hidden md:block w-full h-full object-cover z-0 opacity-0" aria-hidden="true" />
      <video ref={videoRef} src={HERO_VIDEO} poster={HERO_POSTER} muted playsInline loop preload="metadata" className="absolute inset-0 md:hidden w-full h-full object-cover z-0" aria-hidden="true" />
      {/* Detection box that follows the tank in the last scene, placed by placeTankBox */}
      <div ref={tankBoxRef} aria-hidden="true" className="absolute left-0 top-0 z-10 pointer-events-none opacity-0 border border-[#f4a582]/70 will-change-transform">
        <span className="absolute -left-px -top-px w-2 h-2 border-l-2 border-t-2 border-[#f4a582]" />
        <span className="absolute -right-px -top-px w-2 h-2 border-r-2 border-t-2 border-[#f4a582]" />
        <span className="absolute -left-px -bottom-px w-2 h-2 border-l-2 border-b-2 border-[#f4a582]" />
        <span className="absolute -right-px -bottom-px w-2 h-2 border-r-2 border-b-2 border-[#f4a582]" />
        <span className="absolute left-0 bottom-full mb-1 whitespace-nowrap font-mono text-[9px] md:text-[12px] leading-none tracking-wide text-[#f4a582] [text-shadow:0_1px_2px_rgba(0,0,0,0.55)]">
          T-90 MBT&nbsp;&nbsp;<span ref={tankConfidenceRef}>0.97</span>
        </span>
      </div>
      {/* PREVIOUS UI: <div ref={zoomRef} aria-label="Zoom level" className="hidden md:block absolute left-[6vw] bottom-[7svh] z-30 font-mono text-xl md:text-2xl text-white pointer-events-none opacity-0 [text-shadow:0_1px_4px_#000]">20×</div> */}
      {/* Zoom readout: a flat HUD panel docked bottom-left over the scene's blurred corner, sized by placeZoomPanel */}
      <div ref={zoomRef} aria-label="Zoom level" className="hidden md:flex absolute left-0 bottom-0 z-30 flex-col justify-center gap-2 px-6 py-3 bg-black/45 backdrop-blur-md border-t border-r border-white/15 rounded-tr-sm text-white pointer-events-none opacity-0 transition-opacity duration-300">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-orbit text-[10px] uppercase tracking-[0.3em] text-white/60">EO Zoom</span>
          <span ref={zoomValueRef} className="font-mono text-2xl leading-none tabular-nums">20.0×</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-white/50">
          <span>1×</span>
          <div className="relative h-1 flex-1 bg-white/15">
            <div ref={zoomFillRef} className="absolute inset-0 origin-left bg-[#5ce1e6]" />
          </div>
          <span>20×</span>
        </div>
      </div>

      {/* Content */}
      {/* PREVIOUS UI:
      <div className="relative z-20 w-full h-full flex flex-col justify-end px-4 sm:px-6 md:px-8 pb-[26%] sm:pb-[20%] md:pb-[22%] lg:flex-row lg:justify-between lg:items-end lg:px-20 lg:pb-[12%]">
      */}
      {/* PREVIOUS UI:
      <div className="relative z-20 w-full h-full flex flex-col justify-end px-4 sm:px-6 md:px-8 pb-10 sm:pb-12 md:pb-16 lg:flex-row lg:justify-between lg:items-end lg:px-20 lg:pb-16">
      */}
      {/* PREVIOUS UI:
      <div className="relative z-20 w-full h-full flex flex-col justify-start pt-28 px-4 sm:px-6 md:px-8 pb-10 sm:pb-12 md:pb-16 lg:flex-row lg:justify-between lg:items-end lg:px-20 lg:pb-16 lg:pt-0">
      */}
      {/* PREVIOUS UI:
      <div ref={contentRef} className="bat-hero-content relative z-20 w-full h-full flex flex-col justify-between pt-28 px-4 sm:px-6 md:px-8 pb-10 sm:pb-12 md:pb-16 lg:flex-row lg:justify-between lg:items-end lg:px-20 lg:pb-16 lg:pt-0">
      */}
      <div ref={contentRef} className="bat-hero-content relative z-20 w-full h-full flex flex-col justify-between pt-20 xs:pt-24 sm:pt-28 px-4 sm:px-6 md:px-8 pb-8 xs:pb-10 sm:pb-12 md:pb-16 lg:flex-row lg:justify-between lg:items-end lg:px-20 lg:pb-16 lg:pt-0 max-w-[120rem] 3xl:max-w-[140rem] mx-auto">
        {/* Left Side: Title & Subtitle */}
        <div className="max-w-full lg:max-w-2xl text-left mb-8 lg:mb-0 lg:flex lg:flex-col lg:justify-end">
          {/* PREVIOUS UI:
          <h1
            className="text-white font-bold text-[2rem] sm:text-[2.75rem] md:text-[3.75rem] lg:text-[4.5rem] leading-tight tracking-tight mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            T - BAT
          </h1>
          */}
          {/* PREVIOUS UI:
          <h1
            className="text-white font-bold text-[2rem] sm:text-[2.75rem] md:text-[3.75rem] lg:text-[4.5rem] leading-none tracking-tight mb-1"
            style={{ letterSpacing: "-0.03em" }}
          >
            T - BAT
          </h1>
          */}
          {/* PREVIOUS UI: Clash Grotesk bold hero; now the FENIx Orbit hero entrance. */}
          {/* PREVIOUS UI (Title with spaces around hyphen "T - BAT"):
          <ProductHeroTitle className="text-white mb-1">
            T - BAT
          </ProductHeroTitle>
          */}
          <ProductHeroTitle className="text-white mb-1">
            T-BAT
          </ProductHeroTitle>
          <p
            className="product-body text-white tracking-wide text-balance"
            style={{ letterSpacing: "0.01em" }}
          >
            Battlefield Airborne Tactical - Uncrewed Systems
          </p>
        </div>

        {/* Right Side: Paragraph */}
        {/* PREVIOUS UI: paragraph grew from text-sm to md:text-lg without an entrance. */}
        {/* PREVIOUS TEXT-JUSTIFY ON MOBILE:
        <motion.div className="product-body max-w-2xl lg:max-w-lg text-white text-justify lg:flex lg:flex-col lg:justify-end" initial={reduceMotion ? false : { opacity: 0, y: 16, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: reduceMotion ? 0 : 1.1, delay: reduceMotion ? 0 : 2.2, ease: [0.16, 1, 0.3, 1] }}>
        */}
        <motion.div className="product-body max-w-2xl lg:max-w-lg text-white text-left sm:text-justify lg:flex lg:flex-col lg:justify-end" initial={reduceMotion ? false : { opacity: 0, y: 16, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: reduceMotion ? 0 : 1.1, delay: reduceMotion ? 0 : 2.2, ease: [0.16, 1, 0.3, 1] }}>
          Where advanced autonomy meets agile design, missions stay silent, precise, and ready for anything. This is
          tactical innovation that expands what's achievable in the toughest conditions.
        </motion.div>
      </div>
      </div>
    </section>
  )
}
