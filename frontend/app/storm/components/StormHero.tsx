"use client"
import React, { useEffect, useRef, useState } from "react"
import type { JSX } from "react"
import { HERO_4K, useHeroVideoSource } from "@/lib/use-hero-video-source"

// PREVIOUS UI: const mobileVideo = "/product/STORM/Hero_Section/STORM_hero_video_mobile.mp4" (index at the end of the file)
// optimized/phone.mp4 is that clip repacked to start streaming at once (identical video data).
const mobileVideo = "/product/STORM/Hero_Section/optimized/phone.mp4"
// The phone clip ends with 4 black frames (5.433 s onwards); its last real frame is at 5.417 s.
// The phone video is stopped on that frame so it freezes on the drone like the desktop clip, without re-encoding it.
const MOBILE_LAST_FRAME = 5.417
// Tablets held upright (768px+ wide, portrait) get the 2:3 tablet clip. Tablets held sideways keep the 16:9 desktop clip.
// It has the same 4 black end frames, so it freezes on 5.417 s too.
// PREVIOUS UI: const tabletVideo = "/product/STORM/Hero_Section/STORM_Hero_mobile_Tab-web.mp4"
const tabletVideo = "/product/STORM/Hero_Section/optimized/tablet.mp4"
// PREVIOUS UI: const PHONE = "(max-width: 767px)"; small phones held sideways got the portrait clip, zoomed and cropped.
const PHONE = "(max-width: 767px) and (orientation: portrait)"
const TABLET = "(min-width: 768px) and (orientation: portrait)"

export default function StormHero(): React.JSX.Element {
  const [showSubtitle, setShowSubtitle] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  // PREVIOUS UI: only the phone clip was checked: video.currentSrc.includes(mobileVideo)
  const isMobileClip = (video: HTMLVideoElement) => [mobileVideo, tabletVideo].some((src) => video.currentSrc.includes(src))
  // Hold the last real frame: pause and step back if playback has gone past it.
  const freezeOnLastFrame = (video: HTMLVideoElement) => {
    video.pause()
    if (video.currentTime > MOBILE_LAST_FRAME) video.currentTime = MOBILE_LAST_FRAME
    setShowSubtitle(true)
  }
  // Watches every drawn frame and pauses on the last real one, before any black frame is shown.
  useEffect(() => {
    const video = videoRef.current
    if (!video || !("requestVideoFrameCallback" in video)) return
    let handle = 0
    const onFrame = (_now: number, frame: VideoFrameCallbackMetadata) => {
      if (isMobileClip(video) && frame.mediaTime >= MOBILE_LAST_FRAME - 0.005) return freezeOnLastFrame(video)
      handle = video.requestVideoFrameCallback(onFrame)
    }
    handle = video.requestVideoFrameCallback(onFrame)
    return () => video.cancelVideoFrameCallback(handle)
  }, [])
  // Switch clips on rotation, carrying on from the same point, or holding the last frame if it had already finished.
  // PREVIOUS UI: matchMedia change listeners here reloaded the video on any breakpoint change, even for the same clip.
  useHeroVideoSource(videoRef, { isFinished: (video) => video.paused && video.currentTime > 5, finishedAt: MOBILE_LAST_FRAME })
  // PREVIOUS UI: const [finished, setFinished] = useState(false) (showed the end image)
  // Dynamically load the Clash Grotesk font
  useEffect(() => {
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Clash+Grotesk:wght@400;500;700&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)
    return () => {
      document.head.removeChild(link)
    }
  }, [])

  return (
    <section
      aria-label="STORM hero video"
      className="storm-hero relative h-screen w-full text-white overflow-hidden"
      style={{ fontFamily: "'Clash Grotesk', Arial, sans-serif" }}
    >

      {/* PREVIOUS UI: video used loop for continuous playback. */}
      {/* PREVIOUS POSTER: https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        controlsList="nodownload"
        onContextMenu={(event) => event.preventDefault()}
        onTimeUpdate={({ currentTarget: video }) => {
          if (!showSubtitle && video.currentTime >= 5.1) setShowSubtitle(true)
          // Backup for browsers without requestVideoFrameCallback.
          if (isMobileClip(video) && video.currentTime > MOBILE_LAST_FRAME && !video.paused) freezeOnLastFrame(video)
        }}
        onEnded={({ currentTarget: video }) => {
          // PREVIOUS UI: video.pause() only; the phone clip then stayed on its final black frame.
          // Stay on the last frame: no loop. The phone clip steps back to its last real frame.
          if (isMobileClip(video)) return freezeOnLastFrame(video)
          video.pause()
          setShowSubtitle(true)
        }}
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        {/* PREVIOUS VIDEO: https://shield.ai/wp-content/uploads/2025/03/avenger-3.mp4 */}
        {/* PREVIOUS VIDEO: /product/STORM/Hero_Section/STORM%20V2.mp4 included black ending frames. */}
        {/* PREVIOUS UI: the desktop clip was used at every viewport width. */}
        <source media={PHONE} src={mobileVideo} type="video/mp4" />
        {/* PREVIOUS UI: tablets got the desktop clip below. */}
        <source media={TABLET} src={tabletVideo} type="video/mp4" />
        {/* PREVIOUS UI: <source src="/product/STORM/Hero_Section/storm-v2-hero.mp4" /> (9 MB 4K on every laptop and desktop) */}
        <source media={HERO_4K} src="/product/STORM/Hero_Section/optimized/desktop-4k.mp4" type="video/mp4" />
        <source src="/product/STORM/Hero_Section/optimized/desktop-1080.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* The video simply stops on its last frame when it ends (browsers keep showing it), so the drone keeps
          exactly the video's colours. PREVIOUS UI: an end image was swapped in when the video ended; the
          storm-hero-end.jpg version had BT.601 colours (darker red than the BT.709 video), then a colour-corrected
          storm-hero-end.webp. Both files are still in public/product/STORM.
      <img
        src="/product/STORM/storm-hero-end.webp"
        alt=""
        aria-hidden="true"
        loading="eager"
        onContextMenu={(event) => event.preventDefault()}
        className={`absolute inset-0 h-full w-full object-cover z-0 ${finished ? "visible" : "invisible"}`}
      />
      */}


      {/* PREVIOUS UI:
      <div className="relative z-20 w-full h-full flex flex-col justify-end px-4 sm:px-6 md:px-8 pb-[26%] sm:pb-[20%] md:pb-[22%] lg:flex-row lg:justify-between lg:items-end lg:px-20 lg:pb-[12%]">
      */}
      {/* PREVIOUS UI:
      <div className="relative z-20 w-full h-full flex flex-col justify-end px-4 sm:px-6 md:px-8 pb-10 sm:pb-12 md:pb-16 lg:flex-row lg:justify-between lg:items-end lg:px-20 lg:pb-16">
      */}
      {/* PREVIOUS UI:
      <div className="relative z-20 w-full h-full flex flex-col justify-start pt-28 px-4 sm:px-6 md:px-8 pb-10 sm:pb-12 md:pb-16 lg:flex-row lg:justify-between lg:items-end lg:px-20 lg:pb-16 lg:pt-0">
      */}
      {/* PREVIOUS UI: subtitle was left-aligned in a full-height flex container. */}
      {/* PREVIOUS UI: bottom padding was pb-10 md:pb-16. */}
      {/* PREVIOUS UI: bottom padding was pb-7 md:pb-[52px]. */}
      {/* PREVIOUS UI: bottom padding was pb-4 md:pb-10. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-2 md:pb-8">

        <div className="w-full text-center">
          {/* PREVIOUS UI:
          <h1
            className="text-white font-bold text-[2rem] sm:text-[2.75rem] md:text-[3.75rem] lg:text-[4.5rem] leading-tight tracking-tight mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            STORM
          </h1>
          */}
          {/* PREVIOUS UI:
          <h1
            className="text-white font-bold text-[2rem] sm:text-[2.75rem] md:text-[3.75rem] lg:text-[4.5rem] leading-none tracking-tight mb-1"
            style={{ letterSpacing: "-0.03em" }}
          >
            STORM
          </h1>
          */}
          {/* PREVIOUS UI:
          <h1
            className="text-white font-bold text-[3.25rem] sm:text-[3.75rem] md:text-[3.75rem] lg:text-[4.5rem] leading-none tracking-tight mb-1"
            style={{ letterSpacing: "-0.03em" }}
          >
            STORM
          </h1>
          */}
          {/* PREVIOUS UI: subtitle was always visible, text-base through md:text-xl, inheriting the section font. */}
          {showSubtitle && <p
            // PREVIOUS UI: Subtitle appeared immediately when the video reached 5.1 seconds.
            className="storm-hero-subtitle font-orbit text-white text-[clamp(20px,2.2vw,36px)] font-normal tracking-wide text-balance drop-shadow-md"
            style={{ letterSpacing: "0.01em" }}
          >
            Smart Transport Operations for Rugged Missions
          </p>}
        </div>


        {/* PREVIOUS UI:
        <div className="max-w-full lg:max-w-md text-left text-neutral-600 text-sm sm:text-base md:text-lg font-light leading-relaxed tracking-wide text-balance lg:flex lg:flex-col lg:justify-end">
          Where intelligent flight meets relentless endurance, offshore operations stay connected, supplied, and secure
          — even when the weather turns against you. This is aerial logistics, redefined for the world's toughest
          environments.
        </div>
        */}
        {/* PREVIOUS UI:
        <div className="max-w-full lg:max-w-md text-left text-white text-sm sm:text-base md:text-lg font-light leading-relaxed tracking-wide text-balance lg:flex lg:flex-col lg:justify-end">
          Where intelligent flight meets relentless endurance, offshore operations stay connected, supplied, and secure
          — even when the weather turns against you. This is aerial logistics, redefined for the world's toughest
          environments.
        </div>
        */}
      </div>
    </section>
  )
}
