"use client"

import { useEffect } from "react"
import { useLenis } from "lenis/react"

const TOLERANCE = 2
const DURATION = 0.9
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

type Panel = { el: HTMLElement; top: number; end: number }

// Each panel snaps to its top. A panel taller than the viewport also snaps to its
// bottom edge, and scrolls freely between the two so no content is unreachable.
function measure(selector: string): Panel[] {
  const vh = window.innerHeight
  const max = document.documentElement.scrollHeight - vh
  return Array.from(document.querySelectorAll<HTMLElement>(selector)).map((el) => {
    const rect = el.getBoundingClientRect()
    const top = Math.min(Math.round(rect.top + window.scrollY), max)
    const end = Math.min(Math.max(top, Math.round(rect.bottom + window.scrollY - vh)), max)
    return { el, top, end }
  })
}

/**
 * Full-viewport section paging: one wheel gesture or key press moves exactly one section,
 * and any other scroll (touch, scrollbar) settles on the nearest one.
 * `panels` selects the snapping sections in page order. Leave the hero out of it:
 * everything above the first panel scrolls freely.
 */
export default function SectionSnap({ panels: selector }: { panels: string }) {
  const lenis = useLenis()

  useEffect(() => {
    let animating = false
    let touching = false
    let lastWheelTime = 0
    let lastWheelDelta = 0
    let settleTimer: ReturnType<typeof setTimeout> | undefined
    let unlockTimer: ReturnType<typeof setTimeout> | undefined

    const scrollTo = (y: number) => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      animating = true
      clearTimeout(unlockTimer)
      unlockTimer = setTimeout(() => (animating = false), DURATION * 1000 + 100)
      if (lenis) {
        lenis.scrollTo(y, { duration: DURATION, easing: easeInOutCubic, lock: true, force: true, immediate: reduced })
      } else {
        window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" })
      }
    }

    // Returns the snap point one step away, or null when the scroll should stay native
    // (inside a tall panel, held by a section's own scroll interaction, or at the page edge).
    const nextPoint = (direction: 1 | -1): number | null => {
      const y = window.scrollY
      const panels = measure(selector)
      if (!panels.length || y < panels[0].top - TOLERANCE) return null
      const current = panels.find((p) => y >= p.top - TOLERANCE && y <= p.end + TOLERANCE)
      if (current) {
        const edge = direction > 0 ? current.end : current.top
        if ((edge - y) * direction > TOLERANCE) return null
        const hold = current.el.matches("[data-snap-hold]") ? current.el : current.el.querySelector("[data-snap-hold]")
        if (hold?.getAttribute("data-snap-hold")?.includes(direction > 0 ? "down" : "up")) return null
      }
      const points = panels.flatMap((p) => [p.top, p.end])
      const ahead = points.filter((p) => (p - y) * direction > TOLERANCE)
      if (!ahead.length) return null
      return direction > 0 ? Math.min(...ahead) : Math.max(...ahead)
    }

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      const now = performance.now()
      const delta = Math.abs(e.deltaY)
      // A trackpad keeps emitting decaying inertia after the gesture; only a pause,
      // a rising delta, or a full mouse-wheel notch counts as a new gesture.
      const isNewGesture = now - lastWheelTime > 100 || delta > lastWheelDelta || delta >= 80
      lastWheelTime = now
      lastWheelDelta = delta

      if (animating) {
        e.preventDefault()
        e.stopImmediatePropagation()
        return
      }
      const target = nextPoint(e.deltaY > 0 ? 1 : -1)
      if (target === null) return
      e.preventDefault()
      e.stopImmediatePropagation()
      if (isNewGesture && delta >= 4) scrollTo(target)
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return
      const el = e.target as HTMLElement | null
      if (el?.closest("input, textarea, select, button, a, [contenteditable='true']")) return
      const direction =
        e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey) ? 1
        : e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey) ? -1
        : 0
      if (!direction) return
      if (animating) return e.preventDefault()
      const target = nextPoint(direction)
      if (target === null) return
      e.preventDefault()
      scrollTo(target)
    }

    // Touch, scrollbar drags and resizes are not paged; they settle on the nearest point.
    const settle = () => {
      if (animating || touching) return
      const y = window.scrollY
      const panels = measure(selector)
      if (!panels.length || y < panels[0].top) return
      if (panels.some((p) => y >= p.top - TOLERANCE && y <= p.end + TOLERANCE)) return
      const nearest = panels
        .flatMap((p) => [p.top, p.end])
        .reduce((a, b) => (Math.abs(b - y) < Math.abs(a - y) ? b : a))
      scrollTo(nearest)
    }
    const queueSettle = () => {
      clearTimeout(settleTimer)
      settleTimer = setTimeout(settle, 160)
    }
    const onTouchStart = () => (touching = true)
    const onTouchEnd = () => {
      touching = false
      queueSettle()
    }

    window.addEventListener("wheel", onWheel, { passive: false, capture: true })
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("scroll", queueSettle, { passive: true })
    window.addEventListener("resize", queueSettle)
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchend", onTouchEnd, { passive: true })
    window.addEventListener("touchcancel", onTouchEnd, { passive: true })
    return () => {
      clearTimeout(settleTimer)
      clearTimeout(unlockTimer)
      window.removeEventListener("wheel", onWheel, { capture: true })
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("scroll", queueSettle)
      window.removeEventListener("resize", queueSettle)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchend", onTouchEnd)
      window.removeEventListener("touchcancel", onTouchEnd)
    }
  }, [lenis, selector])

  return null
}
