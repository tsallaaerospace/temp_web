"use client"

import { useRef, useState } from "react"
import Image from "next/image"

export default function StormMaritime() {
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

  return (
    <section
      data-storm-section="maritime"
      aria-label="STORM maritime approach"
      className="storm-maritime relative h-[100svh] w-full overflow-hidden bg-[#086da3]"
      onPointerDown={event => {
        if (!(event.target as HTMLElement).closest("button")) setSelected(null)
      }}
    >
      {/* PREVIOUS UI: Ocean background used a fill Image with src="/product/STORM/final section/ocean.png". */}
      <video
        src="/product/STORM/final%20section/ocean.mp4"
        poster="/product/STORM/final%20section/ocean.png"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="storm-maritime-ocean absolute inset-0 h-full w-full scale-[1.03] object-cover transition-[filter] duration-300 motion-reduce:transition-none"
        style={{ filter: hovered || selected ? "blur(8px)" : "blur(0px)" }}
      />
      <button {...imageInteraction("ship")} className="storm-maritime-ship absolute z-10 border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5ce1e6]">
      <Image
        src="/product/STORM/final section/ship.png"
        alt="Ship positioned at the lower right of the ocean scene"
        width={1688}
        height={932}
        sizes="(max-width: 767px) 110vw, 68vw"
        quality={90}
        className="h-auto w-full max-w-none"
      />
      </button>
      <button {...imageInteraction("STORM drone")} className="storm-maritime-drone absolute z-10 border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5ce1e6]">
      <Image
        src="/product/STORM/final section/STORM_approach_spinning_4096.png"
        alt="STORM drone approaching from the upper left"
        width={4096}
        height={4096}
        sizes="(max-width: 767px) 49vw, 27vw"
        quality={90}
        className="h-auto w-full max-w-none"
      />
      </button>
    </section>
  )
}
