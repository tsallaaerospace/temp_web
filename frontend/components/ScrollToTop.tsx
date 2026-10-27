"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { useLenis } from "lenis/react"

// Navigating to another page starts it at the top; a refresh keeps the reader on the section they were
// viewing. The position is saved per page in sessionStorage while scrolling and restored on reload, a few
// times over the first ~1.5s while images and videos settle the layout, unless the reader scrolls first.
// PREVIOUS UI: scrolled to the top on every mount, so a refresh always went back to the hero.
const key = (path: string) => `tsalla_scroll:${path}`
const RESTORE_TIMES_MS = [0, 120, 350, 700, 1100, 1600]

export default function ScrollToTop() {
  const pathname = usePathname()
  const lenis = useLenis()
  const lastPath = useRef<string | null>(null)
  // Read before any scroll event can overwrite it, and cleared on the first navigation
  const savedOnLoad = useRef<number | null>(null)

  // Let the page, not the browser, decide where a reload lands
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual"
    if (savedOnLoad.current === null) savedOnLoad.current = Number(sessionStorage.getItem(key(pathname))) || 0
  }, [])

  // Remember where the reader is on this page
  useEffect(() => {
    let frame = 0
    const save = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => sessionStorage.setItem(key(pathname), String(Math.round(window.scrollY))))
    }
    window.addEventListener("scroll", save, { passive: true })
    window.addEventListener("pagehide", save)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", save)
      window.removeEventListener("pagehide", save)
    }
  }, [pathname])

  useEffect(() => {
    if (!lenis) return
    const navigated = lastPath.current !== null && lastPath.current !== pathname
    lastPath.current = pathname

    if (navigated) {
      savedOnLoad.current = 0
      lenis.scrollTo(0, { immediate: true, force: true })
      return
    }

    // Same page as loaded (React may run this effect twice in development): restore the saved spot
    const saved = savedOnLoad.current
    if (!saved) return

    // One-shot: once the restore window ends or the reader scrolls, never pull them back again
    let cancelled = false
    const stop = () => { cancelled = true; savedOnLoad.current = 0 }
    const restore = () => { if (!cancelled) lenis.scrollTo(saved, { immediate: true, force: true }) }
    const timers = RESTORE_TIMES_MS.map(ms => setTimeout(restore, ms))
    timers.push(setTimeout(stop, RESTORE_TIMES_MS[RESTORE_TIMES_MS.length - 1] + 50))
    window.addEventListener("load", restore)
    window.addEventListener("wheel", stop, { passive: true, once: true })
    window.addEventListener("touchstart", stop, { passive: true, once: true })
    window.addEventListener("keydown", stop, { once: true })
    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener("load", restore)
      window.removeEventListener("wheel", stop)
      window.removeEventListener("touchstart", stop)
      window.removeEventListener("keydown", stop)
    }
  }, [pathname, lenis])

  return null
}
