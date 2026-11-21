import { useEffect, type RefObject } from "react"

// Screens with more than about 2200 physical pixels across get the 4K hero clip; everything else gets 1080p.
export const HERO_4K =
  "(min-width: 2201px), (min-width: 1761px) and (min-resolution: 1.25dppx), (min-width: 1467px) and (min-resolution: 1.5dppx), (min-width: 1101px) and (min-resolution: 2dppx)"

type Options = {
  // Whether the clip has finished and should stay on its end frame after a swap.
  isFinished?: (video: HTMLVideoElement) => boolean
  // Where to hold a finished clip. Defaults to the end of the clip.
  finishedAt?: number
}

// <source media> is only read when a video loads, so re-pick the clip on mount (some browsers pick before the viewport
// has its final size) and when the device is rotated or the window crosses 768px. The playback position is kept.
// Not on every resize: mobile toolbars collapsing while scrolling change the height, and a swap then would flicker.
export function useHeroVideoSource(videoRef: RefObject<HTMLVideoElement | null>, options: Options = {}) {
  const { isFinished = (video) => video.ended, finishedAt } = options

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const layout = () => `${window.innerWidth < 768}-${window.innerWidth > window.innerHeight}`
    let lastLayout = layout()

    const sync = () => {
      const expected = [...video.querySelectorAll("source")].find((s) => !s.media || window.matchMedia(s.media).matches)
      if (!expected || video.currentSrc === expected.src) return
      const time = video.currentTime
      const finished = isFinished(video)
      video.load()
      video.addEventListener("loadedmetadata", () => {
        video.currentTime = Math.min(finished ? (finishedAt ?? video.duration) : time, video.duration)
        if (finished) video.pause()
        else video.play().catch(() => {})
      }, { once: true })
    }

    if (video.currentSrc) sync()
    else video.addEventListener("loadstart", sync, { once: true })

    const onResize = () => {
      const next = layout()
      if (next === lastLayout) return
      lastLayout = next
      sync()
    }
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("resize", onResize)
      video.removeEventListener("loadstart", sync)
    }
    // Options are constants at each call site.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
