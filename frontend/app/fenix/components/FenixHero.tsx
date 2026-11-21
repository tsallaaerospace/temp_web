"use client"
import React from "react"
import type { JSX } from "react"
import { motion } from "framer-motion"
import GlitchX from "./GlitchX"
import CharacterReveal from "@/components/CharacterReveal"
import { HERO_4K, useHeroVideoSource } from "@/lib/use-hero-video-source"
// PREVIOUS UI: import { fetchBlobWithRetry } from "@/lib/media-retry" (whole-file download before playback)
// PREVIOUS UI: Hls player loaded the older Cloudinary upload before the updated local file.

// PREVIOUS UI: separate desktop (1920x1080) and mobile (1280x720) copies of the earlier hero clip.
// const fenixVideo = "/product/fenix/Hero_Section/fenix-hero-desktop-20261112.mp4"
// const fenixMobileVideo = "/product/fenix/Hero_Section/fenix-hero-mobile-20261112.mp4"
// New hero clip, used at its original quality (4K, 60 fps, 11 s) on every screen.
// PREVIOUS UI: const fenixVideo = "/product/fenix/Hero_Section/FENIX_hero_video.mp4" (playback index stored at the end of the file).
// FENIX_hero_video-web.mp4 is the same video, byte for byte, repacked with the index at the front so it can start
// playing while it downloads.
// PREVIOUS UI: const fenixVideo = "/product/fenix/Hero_Section/FENIX_hero_video-web.mp4" (streamable copy of FENIX_hero_video.mp4)
// FENIX_hero-video-web.mp4 is FENIX_hero-video.mp4 repacked the same way (identical video data, index moved to the front).
// PREVIOUS UI: const fenixVideo = "/product/fenix/Hero_Section/FENIX_hero-video-web.mp4" (27 MB 4K on every laptop and desktop)
// Web encodes of the same clip: 1080p for most screens, 4K for screens that can show it (HERO_4K).
const fenixVideo = "/product/fenix/Hero_Section/optimized/desktop-1080.mp4"
const fenix4kVideo = "/product/fenix/Hero_Section/optimized/desktop-4k.mp4"

// Upright tablets (768px+ wide, portrait) get the 1440x2160 (2:3) tablet clip; sideways they keep the desktop clip.
// PREVIOUS UI: PHONE and LARGE_PHONE had no orientation, so small phones held sideways got a zoomed, cropped portrait clip.
const PHONE = "(max-width: 767px) and (orientation: portrait)"
const LARGE_PHONE = "(min-width: 400px) and (max-width: 767px) and (min-height: 821px) and (orientation: portrait)"
const TABLET = "(min-width: 768px) and (orientation: portrait)"
// PREVIOUS UI: const tabletVideo = "/product/fenix/Hero_Section/FENIX_Hero_video_tab-web.mp4"
const tabletVideo = "/product/fenix/Hero_Section/optimized/tablet.mp4"

export default function FenixHero(): React.JSX.Element {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  // Switch clips on rotation, carrying on from the same point in the clip.
  // PREVIOUS UI: matchMedia change listeners here could fire twice on one rotation and restart the clip from 0.
  useHeroVideoSource(videoRef, { isFinished: () => false })
  // PREVIOUS UI: the whole file was downloaded first (fetchBlobWithRetry) and played from memory, so nothing showed
  // until all 28 MB had arrived:
  // const [videoSrc, setVideoSrc] = React.useState<string>()
  // React.useEffect(() => {
  //   const controller = new AbortController()
  //   let objectUrl: string | undefined
  //   const source = window.matchMedia("(max-width: 767px)").matches ? fenixMobileVideo : fenixVideo
  //   void fetchBlobWithRetry(source, { signal: controller.signal, retries: 2 }).then(blob => {
  //     if (controller.signal.aborted) return
  //     if (!blob) { setVideoSrc(source); return }
  //     objectUrl = URL.createObjectURL(blob)
  //     setVideoSrc(objectUrl)
  //   })
  //   return () => { controller.abort(); if (objectUrl) URL.revokeObjectURL(objectUrl) }
  // }, [])
  // Now streamed: playback starts as soon as the first part arrives. Load failures are retried by the
  // page-wide media retry script (layout.tsx).
  const videoSrc = fenixVideo

  // PREVIOUS MOBILE HEIGHT: the hero used `h-screen` (`100vh`), which includes mobile browser chrome on physical phones.
  return (
    <section
      className="relative h-[100svh] w-full text-white overflow-hidden font-orbit md:h-screen"
      data-navbar-text="white"
    >
      {/* Background Video */}
      {/* PREVIOUS UI:
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
        poster="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop"
      >
        <source
          src="https://cdn.sanity.io/files/z5s3oquj/production/f3cab16e70d9afbe1c7a4cef3e496ef06e3dd497.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      */}
      {/* PREVIOUS UI: the hero downloaded the local 24 MB 4K MP4 without a poster or adaptive quality.
      <video autoPlay muted loop playsInline preload="auto">
        <source src="/product/fenix/Hero_Section/QsmnFp2aCayPv4DNQVxUhw.mp4" type="video/mp4" />
      </video>
      */}
      {/* PREVIOUS UI: src={videoSrc} used the desktop clip on every screen. */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        ref={videoRef}
        // PREVIOUS UI: poster="/product/fenix/fenix-hero-poster-20261112.jpg" (frame of the earlier clip)
        // PREVIOUS UI: poster="/product/fenix/fenix-hero-video-poster.jpg" (first frame of FENIX_hero_video.mp4)
        // First frame of FENIX_hero-video.mp4, so the poster hands over to the video without a jump.
        poster="/product/fenix/fenix-hero-video-2-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        {/* PREVIOUS UI: all phone widths used the standard mobile clip. */}
        {/* PREVIOUS UI: FENIX_Hero_large_mobile.mp4 and Fenix_hero_video_mobile.mp4 (index at the end of the file, slow to start). */}
        <source media={LARGE_PHONE} src="/product/fenix/Hero_Section/optimized/phone-tall.mp4" type="video/mp4" />
        <source media={PHONE} src="/product/fenix/Hero_Section/optimized/phone.mp4" type="video/mp4" />
        {/* PREVIOUS UI: upright tablets got the desktop clip below. */}
        <source media={TABLET} src={tabletVideo} type="video/mp4" />
        <source media={HERO_4K} src={fenix4kVideo} type="video/mp4" />
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* PREVIOUS UI: {videoError && <p role="alert" className="absolute inset-x-0 top-1/2 z-20 text-center">Video couldn’t load. Refresh to try again.</p>}
          A failed download now falls back to streaming, so there's no error state to show. */}

      {/* Content */}
      {/* PREVIOUS UI:
      <div className="relative z-20 w-full h-full flex flex-col justify-between pt-28 px-4 sm:px-6 md:px-8 pb-10 sm:pb-12 md:pb-16 lg:flex-row lg:justify-between lg:items-end lg:px-20 lg:pb-16 lg:pt-0">
        <div className="max-w-full lg:max-w-2xl text-left mb-8 lg:mb-0 lg:flex lg:flex-c ol lg:justify-end">
          <h1
            className="text-white font-bold text-[3.25rem] sm:text-[3.75rem] md:text-[3.75rem] lg:text-[4.5rem] leading-none tracking-tight mb-1"
            style={{ letterSpacing: "-0.03em" }}
          >
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 1.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              FENI
            </motion.span>
            <GlitchX delay={1.9} finalColor="#ffffff" />
          </h1>
        </div>

        <div className="fenix-body w-full max-w-full px-4 text-center sm:px-8 text-white lg:max-w-lg lg:px-0 lg:pl-6 lg:text-justify lg:flex lg:flex-col lg:justify-end">
          <motion.p
            className="w-full text-center lg:text-justify"
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 2.2, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            When intelligence fits in the palm of your hand, missions expand far beyond their footprint — agile, discreet, and ready on demand.
          </motion.p>
        </div>
      </div>
      */}
      {/* PREVIOUS UI: FENIx title and its positioned content wrapper removed; full form remains below. */}
      <motion.p
        className="absolute z-20 bottom-[clamp(20px,3svh,40px)] inset-x-0 px-6 text-center font-orbit text-[clamp(14px,1.8vw,30px)] font-normal leading-snug text-white text-balance"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 6.2, duration: 0.6 }}
      >
        Fast Entry Navigational Intrusion e<GlitchX letter="X" delay={6.7} finalColor="#ffffff" />plorer
      </motion.p>
    </section>
  )
}
