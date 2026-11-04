"use client"

// PREVIOUS UI: import { useRef, useState } from "react"
import Image from "next/image"

export default function StormMaritime() {
  /* PREVIOUS UI: Foreground drone interactions, retained with the removed image.
  const [hovered, setHovered] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const masks = useRef(new WeakMap<HTMLImageElement, { src: string; pixels: ImageData }>())
  const isVisiblePixel = (button: HTMLButtonElement, clientX: number, clientY: number) => {
    const image = button.querySelector("img")
    if (!image?.complete || !image.naturalWidth) return false
    let mask = masks.current.get(image)
    if (mask?.src !== image.currentSrc) {
      const canvas = document.createElement("canvas")
      const scale = Math.min(1, 512 / Math.max(image.naturalWidth, image.naturalHeight))
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale))
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale))
      const context = canvas.getContext("2d")
      if (!context) return false
      try {
        context.drawImage(image, 0, 0, canvas.width, canvas.height)
        mask = { src: image.currentSrc, pixels: context.getImageData(0, 0, canvas.width, canvas.height) }
        masks.current.set(image, mask)
      } catch {
        return false
      }
    }
    const bounds = image.getBoundingClientRect()
    const x = Math.floor((clientX - bounds.left) / bounds.width * mask.pixels.width)
    const y = Math.floor((clientY - bounds.top) / bounds.height * mask.pixels.height)
    return x >= 0 && y >= 0 && x < mask.pixels.width && y < mask.pixels.height
      && mask.pixels.data[(y * mask.pixels.width + x) * 4 + 3] > 24
  }
  const imageInteraction = (name: string) => ({
    type: "button" as const,
    "aria-label": `Highlight ${name}`,
    "aria-pressed": selected === name,
    // PREVIOUS UI: onPointerEnter blurred over the entire rectangular PNG, including transparent padding.
    onPointerMove: (event: React.PointerEvent<HTMLButtonElement>) => {
      if (event.pointerType === "mouse") {
        setHovered(isVisiblePixel(event.currentTarget, event.clientX, event.clientY) ? name : null)
      }
    },
    onPointerLeave: (event: React.PointerEvent<HTMLButtonElement>) => {
      if (event.pointerType === "mouse") setHovered(null)
    },
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
      if (event.detail === 0 || !window.matchMedia("(hover: hover)").matches) {
        // PREVIOUS UI: Every tap inside the image rectangle toggled selection.
        const hit = event.detail === 0 || isVisiblePixel(event.currentTarget, event.clientX, event.clientY)
        setSelected(current => hit && current !== name ? name : null)
      }
    },
  })
  */

  return (
    <section
      data-storm-section="maritime"
      aria-label="STORM maritime approach"
      className="storm-maritime relative h-[100svh] w-full overflow-hidden bg-[#086da3]"
      // PREVIOUS UI: onPointerDown cleared the foreground image selection.
    >
      {/* PREVIOUS UI: Ocean background used a fill Image with src="/product/STORM/final section/ocean.png". */}
      {/* PREVIOUS UI: Ocean background was a looping video (ocean.mp4, poster ocean.png) with a separate ship.png
          button at the lower right; the new ocean.png already shows the ship's deck. */}
      <Image
        src="/product/STORM/final section/ocean.png"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        quality={90}
        className="storm-maritime-ocean scale-[1.03] object-cover transition-[filter] duration-300 motion-reduce:transition-none"
        // PREVIOUS UI: style={{ filter: hovered || selected ? "blur(8px)" : "blur(0px)" }}
      />
      {/* PREVIOUS UI: Removed foreground drone image and its interactive button.
      <button {...imageInteraction("STORM drone")} className="storm-maritime-drone absolute z-10 border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5ce1e6]">
      <Image
        src="/product/STORM/final section/STORM_approach_spinning_4096.png"
        alt="STORM drone approaching from the upper left"
        width={4096}
        height={4096}
        // PREVIOUS UI: sizes="(max-width: 767px) 49vw, 27vw"
        // PREVIOUS UI: sizes="(max-width: 767px) 44vw, 24vw"
        sizes="(max-width: 767px) 38vw, 21vw"
        quality={90}
        className="h-auto w-full max-w-none"
      />
      </button>
      */}
    </section>
  )
}
