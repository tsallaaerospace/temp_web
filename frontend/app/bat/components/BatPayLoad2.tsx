"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import ProductHeading from "@/components/ProductHeading"
import CharacterReveal from "@/components/CharacterReveal"

// PREVIOUS UI: "/product/T-BAT/payload-motion-hq", packed from the earlier render (white propellers).
// Packed by scripts/pack-bat-payload-frames.py from /product/T-BAT/frames.
const MEDIA_ROOT = "/product/T-BAT/payload-motion"
const PAYLOADS = [
  { name: "RE", type: "Multispectral", image: "Button_A_RE.png" },
  { name: "Sony", type: "Mapping camera", image: "Button_B_ADTI.png" },
  { name: "EO+IR", type: "Optical sensor", image: "Button_C_DE2.png" },
  { name: "EO+IR", type: "Stabilized imaging", image: "Button_D_Colibri2.png" },
  /* PREVIOUS UI:
  { name: "Bomb", type: "Bomb payload", image: "Button_E_Drop.png" },
  */
  { name: "Munition", type: "HE Explosive payload", image: "Button_E_Drop.png" },
]

// Each "-in"/"-out" sheet is 32 frames of 2016x720 (8064x5760, ~2 MB, ~0.35 s to decode on a fast PC).
const loadSheet = async (name: string) => {
  const response = await fetch(MEDIA_ROOT + "/" + name + ".webp", { cache: "force-cache" })
  if (!response.ok) throw new Error(`Could not load payload animation: ${name}`)
  return createImageBitmap(await response.blob())
}

export default function BatPayLoad2() {
  const [selected, setSelected] = useState(2)
  const [displayed, setDisplayed] = useState(2)
  const [hasFrame, setHasFrame] = useState(false)
  const [switching, setSwitching] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const currentRef = useRef(2)
  const targetRef = useRef(2)
  const runningRef = useRef(false)
  const animationRef = useRef(0)
  const generationRef = useRef(0)
  const instantRef = useRef(false)
  const sectionRef = useRef<HTMLElement>(null)
  // PREVIOUS UI: a click first downloaded and decoded the current payload's exit sheet, so nothing moved for
  // ~0.4 s (much longer on slower devices or a first visit). While the section is near the screen, that sheet
  // is now decoded ahead of time and every entry sheet is downloaded, so a click starts the exit immediately.
  const readyOutRef = useRef<{ index: number, image: ImageBitmap } | null>(null)
  const nearRef = useRef(false)
  const reducedMotion = useReducedMotion()
  const payload = PAYLOADS[selected]
  targetRef.current = selected

  const releaseReadyOut = () => {
    readyOutRef.current?.image.close()
    readyOutRef.current = null
  }
  const prepareOut = (index: number) => {
    if (reducedMotion || !nearRef.current || readyOutRef.current?.index === index) return
    releaseReadyOut()
    loadSheet(index + "-out").then((image) => {
      // Keep it only if it is still the payload on screen and the section is still close by
      if (nearRef.current && currentRef.current === index && !readyOutRef.current) readyOutRef.current = { index, image }
      else image.close()
    }, () => {})
  }

  useEffect(() => () => {
    generationRef.current += 1
    cancelAnimationFrame(animationRef.current)
    releaseReadyOut()
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section || reducedMotion) return
    let downloaded = false
    const observer = new IntersectionObserver((entries) => {
      // Latest entry: one batch can also hold an older state (e.g. after a reload restores the scroll position)
      nearRef.current = entries[entries.length - 1].isIntersecting
      if (!nearRef.current) {
        // Decoded sheets are ~186 MB each, so free the ready one while the section is off screen
        releaseReadyOut()
        return
      }
      if (!downloaded) {
        downloaded = true
        PAYLOADS.forEach((_, index) => { void fetch(`${MEDIA_ROOT}/${index}-in.webp`, { cache: "force-cache" }).catch(() => {}) })
      }
      if (!runningRef.current) prepareOut(currentRef.current)
    }, { rootMargin: "400px 0px" })
    observer.observe(section)
    return () => observer.disconnect()
  }, [reducedMotion])

  useEffect(() => {
    if (runningRef.current || currentRef.current === selected) return
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d", { alpha: false })
    if (!canvas || !context) return
    const generation = generationRef.current
    const alive = () => generation === generationRef.current
    const load = loadSheet
    const drawStill = async (index: number, prepared?: ImageBitmap) => {
      const image = prepared ?? await load(index + "-still")
      if (!alive()) return
      context.drawImage(image, 0, 0, 3024, 1080)
      image.close()
      canvas.dataset.phase = "hold"
      canvas.dataset.payload = String(index)
      setHasFrame(true)
    }
    const play = (image: ImageBitmap, phase: string, dockingMs = 750) => new Promise<void>(resolve => {
      const started = performance.now()
      let previousFrame = -1
      canvas.dataset.phase = phase
      const tick = (now: number) => {
        if (!alive()) { resolve(); return }
        const elapsed = now - started
        // Keep the approach speed, then give the final docking movement more time.
        const progress = Math.min(phase === "enter-right" && elapsed > 450
          ? 0.5 + (elapsed - 450) / (dockingMs * 2)
          : elapsed / 900, 1)
        const frame = Math.min(31, Math.floor(progress * 32))
        if (frame !== previousFrame) {
          context.drawImage(image, (frame % 4) * 2016, Math.floor(frame / 4) * 720, 2016, 720, 0, 0, 3024, 1080)
          previousFrame = frame
          setHasFrame(true)
        }
        if (progress < 1) animationRef.current = requestAnimationFrame(tick)
        else resolve()
      }
      animationRef.current = requestAnimationFrame(tick)
    })

    runningRef.current = true
    setSwitching(true)
    const swap = async () => {
      try {
        while (alive() && currentRef.current !== targetRef.current) {
          if (reducedMotion || instantRef.current) {
            instantRef.current = false
            const target = targetRef.current
            await drawStill(target)
            if (!alive()) return
            currentRef.current = target
            setDisplayed(target)
            continue
          }
          // Decode before playback; the current payload exits only once.
          const requested = targetRef.current
          const incomingPromise = load(requested + "-in").catch(() => null)
          // Use the exit sheet decoded ahead of time when it is ready; otherwise load it now
          const ready = readyOutRef.current?.index === currentRef.current ? readyOutRef.current : null
          readyOutRef.current = null
          if (!ready) releaseReadyOut()
          const outgoing = ready ? ready.image : await load(currentRef.current + "-out")
          if (!alive()) {
            outgoing.close()
            ;(await incomingPromise)?.close()
            return
          }
          await play(outgoing, "exit-left")
          outgoing.close()
          let target = requested
          let incoming = await incomingPromise
          if (!incoming) throw new Error(`Could not load payload animation: ${target}-in`)
          let stillPromise = load(target + "-still").catch(() => null)
          while (alive() && target !== targetRef.current) {
            target = targetRef.current
            incoming.close()
            ;[incoming] = await Promise.all([load(target + "-in")])
            stillPromise = load(target + "-still").catch(() => null)
          }
          if (!alive()) { incoming.close(); return }
          await play(incoming, "enter-right", target === 3 ? 1000 : 750)
          incoming.close()
          await drawStill(target, (await stillPromise) ?? undefined)
          if (!alive()) return
          currentRef.current = target
          setDisplayed(target)
        }
      } catch {
        if (alive()) {
          currentRef.current = targetRef.current
          setDisplayed(targetRef.current)
          setHasFrame(false)
          canvas.dataset.phase = "fallback"
        }
      } finally {
        if (alive()) {
          runningRef.current = false
          setSwitching(false)
          // Get the next click's exit ready for the payload now on screen
          prepareOut(currentRef.current)
        }
      }
    }
    void swap()
  }, [selected, reducedMotion])

  // PREVIOUS UI:
  // <section data-payload-viewer className="bat-payload-viewer bg-black text-white font-orbit" aria-labelledby="bat-payload-title">
  return (
    <section ref={sectionRef} data-payload-viewer className="bat-payload-viewer bg-black text-white font-orbit max-w-[120rem] 3xl:max-w-[140rem] mx-auto" aria-labelledby="bat-payload-title">
      <header className="bat-payload-heading">
        <div>
          {/* PREVIOUS UI: only the ampersand was cyan; heading had no entrance. */}
          <ProductHeading id="bat-payload-title">Payloads & <CharacterReveal text="Sensors" targetColor="#5ce1e6" glowColor="#5ce1e6" stagger={0.06} /></ProductHeading>
        </div>
      </header>

      <div className="bat-payload-stage" aria-label={`${payload.name} payload preview`} aria-busy={switching}>
        {!hasFrame && <img src={MEDIA_ROOT + "/" + displayed + "-still.webp"} alt="" aria-hidden="true" className="bat-payload-film" />}
        <canvas
          ref={canvasRef}
          width={3024}
          height={1080}
          data-phase="hold"
          data-payload={displayed}
          aria-label="T-BAT payload frame animation"
          className={"bat-payload-film " + (hasFrame ? "opacity-100" : "opacity-0")}
        />
        <div className="bat-payload-stage-caption" aria-live="polite" aria-atomic="true">
          <span className="bat-payload-caption-index">0{selected + 1} <span>/ 05</span></span>
          <span>{payload.name}<small>{payload.type}</small></span>
        </div>
      </div>

      <div className="bat-payload-controls" role="group" aria-label="Choose a payload">
        {PAYLOADS.map((item, index) => (
          <button
            key={`${item.name}-${index}`}
            type="button"
            aria-pressed={selected === index}
            aria-label={`Select ${item.name} payload`}
            className={`bat-payload-button ${selected === index ? "is-selected" : ""}`}
            onClick={(event) => { instantRef.current = event.detail === 0; setSelected(index) }}
            style={{ backgroundImage: `url("/product/T-BAT/${item.image}")` }}
          >
            <span className="bat-payload-button-index">0{index + 1}</span>
            <span className="bat-payload-button-label">{item.name}<small>{item.type}</small></span>
            {selected === index && (
              <motion.span
                layoutId="bat-payload-selection"
                className="bat-payload-selection"
                transition={reducedMotion ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  )
}
