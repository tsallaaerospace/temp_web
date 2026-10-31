import ProductHeading from "@/components/ProductHeading"
import CharacterReveal from "@/components/CharacterReveal"

export default function StormThreePhase() {
  return (
    <section data-storm-section="three-phase" aria-labelledby="storm-three-phase-title" className="storm-three-phase relative h-[100svh] w-full overflow-hidden bg-black">
      <picture>
        <source media="(max-width: 767px)" srcSet="/product/STORM/3%20phase%20mobile.png" />
        <img
          src="/product/STORM/3%20phase%20destop.png"
          alt="Three panels showing an offshore flight deck, desert dunes and snowy mountains"
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
      </picture>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/50 to-transparent" />
      <ProductHeading id="storm-three-phase-title" className="storm-three-heading product-title-position product-title-fit grid grid-cols-3 text-center text-white">
        {/* PREVIOUS UI: Built / Beyond / Boundaries. */}
        <span className="flex items-center justify-center">Ready.</span>{" "}
        <span className="flex items-center justify-center"><CharacterReveal text="Rugged." targetColor="#5ce1e6" glowColor="#5ce1e6" stagger={0.06} /></span>{" "}
        <span className="flex items-center justify-center">Relentless.</span>
      </ProductHeading>
    </section>
  )
}
