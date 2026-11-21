"use client"
import React, { useEffect, useRef, useState } from "react"
import type { JSX } from "react"
import { motion, useReducedMotion } from "framer-motion"
import CharacterReveal from "@/components/CharacterReveal"
import { BAT_FOREGROUND_PATHS } from "./batHeroForeground"
// PREVIOUS UI: ProductHeroTitle supplied the shared 1.8s delayed blur entrance.
// import { ProductHeroTitle } from "@/components/ProductHeading"
// PREVIOUS UI: import { fetchBlobWithRetry } from "@/lib/media-retry" (fallback that downloaded the whole scrub video)
import { TANK_TRACK } from "./batHeroTankTrack"
import { createHeroFrameCache } from "@/lib/hero-frame-cache"
import { FRAMES_PER_PACK, FRAME_SIZES } from "./batHeroFramePacks"

// PREVIOUS UI: /product/T-BAT/bat-hero-scenes-scroll-clean.mp4 used the old sensor close-up.
const HERO_VIDEO = "/product/T-BAT/bat-hero-scenes-20261110.mp4"
const HERO_POSTER = "/product/T-BAT/bat-hero-scenes-poster.webp"
// PREVIOUS UI: desktop scrubbed /product/T-BAT/bat-hero-scrub-20261110.mp4 (71 MB, 557 frames, keyframe every 4)
// by seeking the video on every scroll step. Seeks queue up and wait on the network, so frames lagged behind the scroll.
// The same 557 frames are separate full-quality 1920x1080 AVIF images.
// PREVIOUS UI: a second set, low/ (960x540 AVIF), loaded first and was shown while scrolling fast.
const SCRUB_FPS = 24
const FRAME_COUNT = 557
const FRAME_W = 1920, FRAME_H = 1080
// PREVIOUS UI: each frame was its own request:
// const frameUrl = (i: number) => `/product/T-BAT/hero-frames/high/bat-hero-${String(i + 1).padStart(3, "0")}.avif`
// 557 requests made Wix's Cloudflare block the visitor (429) after ~160 frames. The same AVIF files now come
// joined in 35 packs of 16 (scripts/pack-hero-frames.mjs; re-run it whenever the frames in high/ change).
const packUrl = (pack: number) => `/product/T-BAT/hero-frames/packs/bat-hero-pack-${String(pack).padStart(2, "0")}.bin`
// Size of the picture and of the box it is shown in (object-cover), for placing the overlays
// px = horizontal object-position (0 = left edge, 0.5 = centred); defaults to centred
type Geo = { vw: number; vh: number; cw: number; ch: number; px?: number }
// Phones: the looping video sits at object-position 48% (a little right of centre; 42% and 46% were too far). Keep in step with its class.
// PREVIOUS UI: centred (object-position 50%).
const PHONE_VIDEO_X = 0.48
// Upright tablets: the opening drone (centre at x 945 of the 1920px frame, the same anchor as the title mask) sat a
// little left of centre. The frames are shifted so it lands in the middle of the screen; everything placed over the
// footage (title mask, tank box, zoom panel) uses the same shift. Other screens stay centred.
// PREVIOUS UI: frames were always drawn centred (0.5).
const TABLET_PORTRAIT = "(min-width: 768px) and (orientation: portrait)"
const OPENING_DRONE_X = 945
function frameX(cw: number, ch: number) {
  if (!window.matchMedia(TABLET_PORTRAIT).matches) return 0.5
  const scale = Math.max(cw / FRAME_W, ch / FRAME_H)
  const dw = FRAME_W * scale
  if (dw - cw < 1) return 0.5
  return Math.min(1, Math.max(0, (cw / 2 - OPENING_DRONE_X * scale) / (cw - dw)))
}
const videoGeo = (video: HTMLVideoElement): Geo =>({ vw: video.videoWidth || 16, vh: video.videoHeight || 9, cw: video.clientWidth, ch: video.clientHeight, px: PHONE_VIDEO_X })
// PREVIOUS UI: the zoom counter showed from scroll progress 0.756 as a bare "20×" ... "1×" number.

// Detection box on the tank in the last scene. Both hero videos share one edit, so scene 7 starts at the same frame.
// PREVIOUS UI: 436; the replacement close-up is 24 frames shorter.
const TANK_SCENE_START = 412
// Scene-7 frames over which the box fades out as the tank shrinks to a speck (about 36px -> 22px wide at 1280).
const TANK_FADE_START = 60
const TANK_FADE_FRAMES = 12

// Positions the box for a frame, matching how object-cover scales and crops the picture.
// PREVIOUS UI: took the <video> element itself; now its sizes (Geo), so the image-sequence canvas can use it too.
function placeTankBox(box: HTMLDivElement | null, confidence: HTMLSpanElement | null, geo: Geo, frame: number) {
  if (!box) return
  const i = frame - TANK_SCENE_START
  const tank = TANK_TRACK[i]
  const fade = !tank ? 0 : i < 3 ? (i + 1) / 3 : 1 - Math.min(1, Math.max(0, (i - TANK_FADE_START) / TANK_FADE_FRAMES))
  box.style.opacity = String(fade)
  if (!tank || !fade) return
  const { vw, vh, cw, ch } = geo
  const scale = Math.max(cw / vw, ch / vh)
  const dw = vw * scale, dh = vh * scale
  const [cx, cy, w, h] = tank
  box.style.transform = `translate(${(cw - dw) * (geo.px ?? 0.5) + (cx - w / 2) * dw}px, ${(ch - dh) / 2 + (cy - h / 2) * dh}px)`
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

function placeZoomPanel(panel: HTMLDivElement | null, value: HTMLSpanElement | null, fill: HTMLDivElement | null, geo: Geo, frame: number) {
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
  const { vw, vh, cw, ch } = geo
  const scale = Math.max(cw / vw, ch / vh)
  const dw = vw * scale, dh = vh * scale
  const ox = (cw - dw) * (geo.px ?? 0.5), oy = (ch - dh) / 2
  const right = ox + (BLUR_AREA.x + BLUR_AREA.w) * dw
  const top = oy + BLUR_AREA.y * dh
  panel.style.width = `${Math.max(288, Math.ceil(right))}px`
  panel.style.height = `${Math.max(72, Math.ceil(ch - top))}px`
}

// PREVIOUS UI: the first scroll movement faded the T-BAT title out before frames started moving.
// Measured in screen heights scrolled, so it is the same on every screen and hero length:
// 0.1 of a screen is about one mouse-wheel step.
// PREVIOUS UI: frames moved from the first pixel of scroll while the title faded over progress 0.04-0.14.
const TITLE_FADE_END = 0.1
// PREVIOUS UI: FRAMES_START = 0.15 held the opening frame while the main title faded away.
const FRAMES_START = 0
// Only the bottom subtitle retains the short scroll fade; the main title follows the ground instead.
// `screens` = scroll distance of the hero track in screen heights
const titleOpacity = (progress: number, screens: number) => String(1 - Math.min(1, Math.max(0, progress * screens / TITLE_FADE_END)))
const frameAt = (progress: number, screens: number) => {
  const start = Math.min(0.5, FRAMES_START / Math.max(screens, 0.01))
  return Math.round(Math.max(0, (progress - start) / (1 - start)) * (FRAME_COUNT - 1))
}
const trackScreens = (track: HTMLElement) => Math.max(0, track.offsetHeight - window.innerHeight) / window.innerHeight

// Ground-plane offsets in source pixels, matched to the opening takeoff camera tilt.
// shortcut: calibrated to this opening edit; re-track these anchors if the footage changes.
/* PREVIOUS UI: title followed the camera tilt vertically.
const GROUND_TITLE_TRACK = [[0, 0], [60, 0], [62, 90], [64, 210], [66, 390], [68, 650], [70, 1000], [72, 1450], [74, 2000]]
export function titleGroundOffset(frame: number) {
  for (let i = 1; i < GROUND_TITLE_TRACK.length; i++) {
    const [end, y] = GROUND_TITLE_TRACK[i]
    if (frame <= end) {
      const [start, previousY] = GROUND_TITLE_TRACK[i - 1]
      return previousY + (y - previousY) * Math.max(0, (frame - start) / (end - start))
    }
  }
  return 2000
}

*/
// PREVIOUS UI: return 0 locked the title to the screen and made it float in the sky.
// Source-pixel ground tracking: the baseline follows the landscape out of view during takeoff.
const GROUND_BASELINE_TRACK = [[0, 0], [60, 0], [62, 180], [64, 480], [66, 820], [68, 1250], [70, 1750], [72, 2200]]
export function titleGroundOffset(frame: number) {
  for (let i = 1; i < GROUND_BASELINE_TRACK.length; i++) {
    const [end, y] = GROUND_BASELINE_TRACK[i], [start, previous] = GROUND_BASELINE_TRACK[i - 1]
    if (frame <= end) return previous + (y - previous) * Math.max(0, (frame - start) / (end - start))
  }
  return 2200
}
// A restrained 6% counter-zoom offsets the opening camera push without moving the baseline.
export function titleScale(frame: number) { return 1 - 0.06 * Math.min(1, Math.max(0, frame / 60)) }

// [frame, nose centre x, nose top y, airframe scale], in the source footage's coordinates.
const DRONE_MASK_TRACK = [[0, 945, 543, 1], [12, 944.5, 545, 1.0273], [24, 944.5, 548, 1.1061], [36, 945, 546, 1.2], [48, 945.5, 548, 1.2758], [60, 942.5, 553, 1.2818], [64, 945, 537, 1.303], [68, 945, 527, 1.212]]
export function droneMaskPose(frame: number) {
  for (let i = 1; i < DRONE_MASK_TRACK.length; i++) {
    const end = DRONE_MASK_TRACK[i], start = DRONE_MASK_TRACK[i - 1]
    if (frame <= end[0]) {
      const t = Math.max(0, (frame - start[0]) / (end[0] - start[0]))
      return start.slice(1).map((value, j) => value + (end[j + 1] - value) * t)
    }
  }
  return DRONE_MASK_TRACK[DRONE_MASK_TRACK.length - 1].slice(1)
}

// Keep the opening silhouette in source coordinates; scaling one outline left cutouts in B.
export function foregroundMask(frame: number) {
  const path = BAT_FOREGROUND_PATHS[frame]
  return path ? `linear-gradient(#fff,#fff), url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080"><path d="${path}"/></svg>`)}")` : "linear-gradient(#fff,#fff), url('/product/T-BAT/bat-hero-title-foreground.svg')"
}

const scrollProgress = (track: HTMLElement) => {
  const rect = track.getBoundingClientRect()
  const distance = rect.height - window.innerHeight
  return distance > 0 ? Math.min(1, Math.max(0, -rect.top / distance)) : 0
}

export default function BatHero(): React.JSX.Element {
  const trackRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  // PREVIOUS UI: const scrubRef = useRef<HTMLVideoElement>(null) (scrub video)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const zoomRef = useRef<HTMLDivElement>(null)
  const zoomValueRef = useRef<HTMLSpanElement>(null)
  const zoomFillRef = useRef<HTMLDivElement>(null)
  const tankBoxRef = useRef<HTMLDivElement>(null)
  const tankConfidenceRef = useRef<HTMLSpanElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const reduceMotion = useReducedMotion()
  // Set when the title/subtitle entrance has finished (onAnimationComplete on the subtitle)
  const [introShown, setIntroShown] = useState(false)
  const introHidden = useRef(false)
  const groundTitleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const titleMaskRef = useRef<HTMLDivElement>(null)
  /* PREVIOUS UI: whole-line flicker instead of the home hero's random character reveal.
  // Reuse the site's white/cyan flicker beats, with an earlier synchronized entrance for both lines.
  const textEntrance = {
    initial: reduceMotion ? false as const : { opacity: 0 },
    animate: reduceMotion ? { opacity: 1, color: "#ffffff", textShadow: "none" } : {
      opacity: [0, 1, 1, 1, 1, 1, 1, 1],
      color: ["#ffffff", "#ffffff", "#ffffff", "#5ce1e6", "#ffffff", "#5ce1e6", "#ffffff", "#ffffff"],
      textShadow: ["none", "0 0 15px #ffffff", "none", "0 0 25px #5ce1e6", "0 0 10px #ffffff", "0 0 10px #5ce1e6", "none", "none"],
    },
    transition: { delay: reduceMotion ? 0 : 0.6, duration: reduceMotion ? 0 : 1, times: [0, 0.12, 0.22, 0.4, 0.48, 0.6, 0.7, 1], ease: "linear" as const },
  }
  */

  // Phones: once the T-BAT title and subtitle have appeared, they stay for 4 seconds, then fade out over the
  // video and stay hidden. Counted from the end of their entrance, so slow page start-up can't eat into it.
  // PREVIOUS UI: they stayed on screen the whole time.
  useEffect(() => {
    const content = contentRef.current
    if (!content || reduceMotion || !isMobile || !introShown) return
    if (introHidden.current) { content.style.opacity = "0"; return }
    const timer = setTimeout(() => {
      introHidden.current = true
      content.style.transition = "opacity 0.8s ease"
      content.style.opacity = "0"
    }, 4000)
    return () => {
      clearTimeout(timer)
      // Desktop sets the opacity from the scroll position, without a delay
      content.style.transition = ""
    }
  }, [isMobile, reduceMotion, introShown])

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
    if (!track || !video) return
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
        placeTankBox(tankBoxRef.current, tankConfidenceRef.current, videoGeo(video), Math.round(meta.mediaTime * SCRUB_FPS))
        frameHandle = video.requestVideoFrameCallback(onVideoFrame)
      }
      const onTimeUpdate = () => placeTankBox(tankBoxRef.current, tankConfidenceRef.current, videoGeo(video), Math.round(video.currentTime * SCRUB_FPS))
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

    // Keep full-quality compressed frames; bound decoded images to the current scroll window.
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    let target = 0
    let shown = -1
    let raf = 0
    // PREVIOUS UI: no px (always centred).
    const geo = (): Geo => ({ vw: FRAME_W, vh: FRAME_H, cw: canvas.clientWidth, ch: canvas.clientHeight, px: frameX(canvas.clientWidth, canvas.clientHeight) })

    const draw = (force = false) => {
      raf = 0
      const ready = cache.nearest()
      if (!ready) return
      const i = ready.frame
      if (!force && i === shown) return
      const { width: cw, height: ch } = canvas
      const scale = Math.max(cw / FRAME_W, ch / FRAME_H)
      const dw = FRAME_W * scale, dh = FRAME_H * scale
      // PREVIOUS UI: ctx.drawImage(ready.image, (cw - dw) / 2, (ch - dh) / 2, dw, dh) (always centred)
      const px = frameX(canvas.clientWidth, canvas.clientHeight)
      ctx.drawImage(ready.image, (cw - dw) * px, (ch - dh) / 2, dw, dh)
      shown = i
      // Use the displayed frame, not requested scroll progress, so buffering cannot detach the title from the scenery.
      if (groundTitleRef.current) {
        // PREVIOUS UI: transform = "none" kept the screen size fixed.
        groundTitleRef.current.style.transform = `translateY(${titleGroundOffset(i) / FRAME_H * 100}%) scale(${titleScale(i)})`
        // The title stays on the ground and moves below the viewport as that ground leaves the camera.
        groundTitleRef.current.style.visibility = i <= 95 ? "visible" : "hidden"
      }
      const mask = titleMaskRef.current
      if (mask) {
        // PREVIOUS UI: every frame reused a scaled opening silhouette.
        mask.style.maskImage = mask.style.webkitMaskImage = foregroundMask(i)
        const [x, y, size] = i < BAT_FOREGROUND_PATHS.length ? [945, 543, 1] : droneMaskPose(i)
        const maskSize = `100% 100%, ${size * 100}% ${size * 100}%`
        const maskPosition = `0 0, ${(x - 945 * size) / FRAME_W * mask.clientWidth}px ${(y - 543 * size) / FRAME_H * mask.clientHeight}px`
        mask.style.maskSize = mask.style.webkitMaskSize = maskSize
        mask.style.maskPosition = mask.style.webkitMaskPosition = maskPosition
        // Follow the frames' tablet shift (0 when centred), so the title cut-out stays on the drone.
        mask.style.marginLeft = `${(canvas.clientWidth - mask.clientWidth) * (px - 0.5)}px`
      }
      canvas.style.opacity = "1"
      placeTankBox(tankBoxRef.current, tankConfidenceRef.current, geo(), i)
      placeZoomPanel(zoomRef.current, zoomValueRef.current, zoomFillRef.current, geo(), i)
    }
    const requestDraw = () => { if (!raf) raf = requestAnimationFrame(() => draw()) }

    const cache = createHeroFrameCache(FRAME_COUNT, { url: packUrl, perPack: FRAMES_PER_PACK, sizes: FRAME_SIZES }, requestDraw)

    const fitCanvas = () => {
      // Upscaling beyond the source resolution adds canvas work without adding image detail.
      const dpr = Math.min(window.devicePixelRatio || 1, 2, FRAME_W / canvas.clientWidth, FRAME_H / canvas.clientHeight)
      const w = Math.round(canvas.clientWidth * dpr), h = Math.round(canvas.clientHeight * dpr)
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        ctx.imageSmoothingQuality = "high"
        return true
      }
      return false
    }
    const onScroll = () => {
      const progress = scrollProgress(track)
      const screens = trackScreens(track)
      const next = frameAt(progress, screens)
      if (next !== target) {
        target = next
        requestDraw()
        cache.seek(target)
      }
      // PREVIOUS UI: fading contentRef hid the main title before takeoff began.
      if (contentRef.current) contentRef.current.style.opacity = "1"
      if (subtitleRef.current) subtitleRef.current.style.opacity = titleOpacity(progress, screens)
    }
    const onResize = () => {
      // PREVIOUS UI: overlays were refreshed only when backing canvas dimensions changed.
      // Large viewports can share the same capped bitmap size while their CSS mask size changes.
      fitCanvas()
      draw(true)
      onScroll()
      if (shown >= 0) {
        placeTankBox(tankBoxRef.current, tankConfidenceRef.current, geo(), shown)
        placeZoomPanel(zoomRef.current, zoomValueRef.current, zoomFillRef.current, geo(), shown)
      }
    }

    fitCanvas()
    target = frameAt(scrollProgress(track), trackScreens(track))
    cache.seek(target)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    onScroll()
    return () => {
      cache.dispose()
      cancelAnimationFrame(raf)
      canvas.style.opacity = "0"
      if (tankBoxRef.current) tankBoxRef.current.style.opacity = "0"
      if (zoomRef.current) zoomRef.current.style.opacity = "0"
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
        // PREVIOUS UI: tablets showed the poster centred; upright tablets now match the frames' shift (about 48.7%).
        className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-black bg-cover bg-center [@media(max-width:767px)]:bg-[position:48%_50%] [@media(min-width:768px)_and_(orientation:portrait)]:bg-[position:48.7%_50%]"
        style={{ backgroundImage: `url(${HERO_POSTER})` }}
      >
      {/* PREVIOUS UI: <video ref={scrubRef} muted playsInline preload="auto" className="absolute inset-0 hidden md:block w-full h-full object-cover z-0 opacity-0" aria-hidden="true" /> */}
      {/* Desktop: scroll-driven image sequence, drawn cover-cropped like object-cover */}
      <canvas ref={canvasRef} className="absolute inset-0 hidden md:block w-full h-full z-0 opacity-0" aria-hidden="true" />
      {/* PREVIOUS UI: object-cover centred. Phones now show the video a little to the right (object-[48%_50%], PHONE_VIDEO_X; 42% and 46% were too far). */}
      <video ref={videoRef} src={HERO_VIDEO} poster={HERO_POSTER} muted playsInline loop preload="metadata" className="absolute inset-0 md:hidden w-full h-full object-cover object-[48%_50%] z-0" aria-hidden="true" />
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
      {/* PREVIOUS UI: max-w-[120rem] 3xl:max-w-[140rem] capped the mask independently of the full-width video. */}
      <div ref={contentRef} className="bat-hero-content relative z-20 w-full h-full flex flex-col justify-between pt-20 xs:pt-24 sm:pt-28 px-4 sm:px-6 md:px-8 pb-8 xs:pb-10 sm:pb-12 md:pb-16 lg:flex-row lg:justify-between lg:items-end lg:px-20 lg:pb-16 lg:pt-0 mx-auto">
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
          {/* PREVIOUS UI: Large T-BAT title was placed at the lower left. */}
          {/* Mask uses the same cover framing as the video, rather than cutting a rectangular hole in the letter. */}
          {/* PREVIOUS UI: inset-0 mask used cover, while the title independently used 23vw with a 500px cap. */}
          {/* Match the video's centered 1920x1080 cover canvas, including cropping on wider/taller screens. */}
          {/* Phones: the whole title, unmasked and solid, near the top (the masked one cut letters away behind the drone). */}
          <h1 className="md:hidden font-orbit font-normal pointer-events-none absolute inset-x-0 top-[clamp(96px,15svh,150px)] text-center text-white !text-[min(22vw,15svh)] !leading-none !tracking-[-0.04em] whitespace-nowrap">
            {reduceMotion ? "T-BAT" : <CharacterReveal text="T-BAT" delay={0.6} stagger={0.16} staggerFrom="start" durationScale={1.25} triggerOnScroll={false} targetColor="#ffffff" flickerColor="#5CE1E6" />}
          </h1>
          {/* PREVIOUS UI: no hidden md:block (the masked, centred title also showed on phones). */}
          <div className="pointer-events-none absolute inset-0 hidden md:block" style={{ containerType: "size" }}>
          {/* PREVIOUS UI: a fixed luminance mask matched only frame zero and left notches in B as the drone grew. */}
          <div ref={titleMaskRef} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: "max(100cqw, calc(100cqh * 16 / 9))", height: "max(100cqh, calc(100cqw * 9 / 16))", containerType: "inline-size", maskImage: foregroundMask(0), WebkitMaskImage: foregroundMask(0), maskMode: "alpha", maskComposite: "exclude", WebkitMaskComposite: "xor", maskSize: "100% 100%, 100% 100%", WebkitMaskSize: "100% 100%, 100% 100%", maskPosition: "0 0, 0 0", WebkitMaskPosition: "0 0, 0 0", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat" }}>
          {/* PREVIOUS UI: Small bottom-center caption, rather than oversized hero lettering. */}
          {/* PREVIOUS UI: Opaque white text at 24% covered the aircraft. Soft-light retains the footage's silhouettes and surface detail. */}
          {/* PREVIOUS UI: top-[12%] moved the title higher. */}
          {/* PREVIOUS UI: top-[24%], font clamp(72px,23vw,500px). Source-relative centering and viewport limits prevent cropped letters. */}
          {/* PREVIOUS UI: top-[48%]. Move only the lettering up; the aircraft mask stays registered to the footage. */}
          {/* PREVIOUS UI: top-[calc(48%_-_40px)]; raised a further 60px at the user's request. */}
          {/* PREVIOUS UI: 100px upward offset and min(23cqw,23vw,46svh) font size. */}
          {/* PREVIOUS UI: top-[calc(48%_-_120px)] -translate-y-1/2 made the baseline shift with font size. */}
          {/* Anchor the lettering's lower edge to the higher ground plane behind the aircraft. */}
          <div ref={groundTitleRef} className="absolute inset-0 will-change-transform" style={{ transformOrigin: "50% calc(55% - 20px)" }}>
          <h1 className="font-orbit font-normal pointer-events-none absolute inset-x-0 top-[calc(55%_-_20px)] -translate-y-full text-center text-white !text-[min(22cqw,22vw,44svh)] !leading-none !tracking-[-0.04em] whitespace-nowrap mix-blend-soft-light">
            {reduceMotion ? "T-BAT" : <CharacterReveal text="T-BAT" delay={0.6} stagger={0.16} staggerFrom="start" durationScale={1.25} triggerOnScroll={false} targetColor="#ffffff" flickerColor="#5CE1E6" />}
          </h1>
          </div>
          </div>
          </div>
          {/* PREVIOUS UI: a plain <p>, visible as soon as the page loaded; then a 0.7s, then a 1s fade-in delay.
              It now appears together with the T-BAT title, using ProductHeroTitle's entrance (blur fade, 0.8s, 1.8s delay). */}
          <div ref={subtitleRef}>
          {/* PREVIOUS UI: caption used the same per-letter cyan flicker as the main title.
          <p
            // PREVIOUS UI: product-body text at lower left with 0.01em letter spacing.
            className="absolute z-20 bottom-[clamp(20px,3svh,40px)] inset-x-0 px-6 text-center font-orbit text-[clamp(14px,1.8vw,30px)] font-normal leading-snug text-white text-balance"
            // PREVIOUS UI: 1.8s delay followed by a 0.8s blur fade; now shares the title's earlier flicker.
            // PREVIOUS UI: onAnimationComplete on the whole-line motion element.
          >
            {reduceMotion ? "Battlefield Airborne Tactical - Uncrewed Systems" : <CharacterReveal text="Battlefield Airborne Tactical - Uncrewed Systems" delay={0.6} stagger={0.065} staggerFrom="start" durationScale={1.25} triggerOnScroll={false} targetColor="#ffffff" flickerColor="#5CE1E6" onComplete={() => setIntroShown(true)} />}
          </p>
          */}
          <motion.p
            className="absolute z-20 bottom-[clamp(20px,3svh,40px)] inset-x-0 px-6 text-center font-orbit text-[clamp(14px,1.8vw,30px)] font-normal leading-snug text-white text-balance"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduceMotion ? 0 : 0.6, duration: reduceMotion ? 0 : 0.8, ease: "easeOut" }}
            onAnimationComplete={() => setIntroShown(true)}
          >
            Battlefield Airborne Tactical - Uncrewed Systems
          </motion.p>
          </div>
        </div>

        {/* Right Side: Paragraph */}
        {/* PREVIOUS UI: paragraph grew from text-sm to md:text-lg without an entrance. */}
        {/* PREVIOUS TEXT-JUSTIFY ON MOBILE:
        <motion.div className="product-body max-w-2xl lg:max-w-lg text-white text-justify lg:flex lg:flex-col lg:justify-end" initial={reduceMotion ? false : { opacity: 0, y: 16, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: reduceMotion ? 0 : 1.1, delay: reduceMotion ? 0 : 2.2, ease: [0.16, 1, 0.3, 1] }}>
        */}
        {/* PREVIOUS UI: Removed the right-hand mission paragraph.
        <motion.div className="product-body max-w-2xl lg:max-w-lg text-white text-left sm:text-justify lg:flex lg:flex-col lg:justify-end" initial={reduceMotion ? false : { opacity: 0, y: 16, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: reduceMotion ? 0 : 1.1, delay: reduceMotion ? 0 : 2.2, ease: [0.16, 1, 0.3, 1] }}>
          Where advanced autonomy meets agile design, missions stay silent, precise, and ready for anything. This is
          tactical innovation that expands what's achievable in the toughest conditions.
        </motion.div>
        */}
      </div>
      </div>
    </section>
  )
}
